import { NotionService } from "@/core/services/notion/client";
import type { Article, Category } from "../types";
import { ENV } from "@/core/config/env";

export class BlogService {
  private notionService: NotionService;

  constructor() {
    this.notionService = new NotionService();
  }

  async getArticles(): Promise<Category[]> {
    if (!ENV.NOTION_DATABASE_ID) {
      throw new Error("NOTION_DATABASE_ID no configurado");
    }

    const response = await this.notionService.databases.query({
      database_id: ENV.NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Position",
          direction: "ascending",
        },
      ],
    });

    const categoriesWithArticles = await Promise.all(
      response.results.map(async (category: any) => {
        try {
          const pages = await this.notionService.blocks.children.list({
            block_id: category.id,
          });

          const articles = pages.results
            .filter((block): block is any => "type" in block && block.type === "child_page")
            .map((page) => ({
              id: page.id,
              title: page.child_page.title,
              url: page.id,
              category: category.properties.Title.title[0]?.plain_text,
            }));

          return {
            category: category.properties.Title.title[0]?.plain_text,
            position: category.properties.Position?.number || 0,
            icon: category.icon,
            articles,
          };
        } catch (error) {
          console.error("Error fetching articles for category:", error);
          return {
            category: category.properties.Title.title[0]?.plain_text,
            position: category.properties.Position?.number || 0,
            icon: category.icon,
            articles: [],
          };
        }
      })
    );

    return categoriesWithArticles;
  }
} 