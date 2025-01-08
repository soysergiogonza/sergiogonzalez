import { NextResponse } from "next/server";
import { notion } from "@/lib/notion";
import { NOTION_DATABASE_ID } from "@/environments/environments";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export async function GET() {
  try {
    if (!NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "NOTION_DATABASE_ID no configurado" },
        { status: 500 },
      );
    }

    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
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
          const pages = await notion.blocks.children.list({
            block_id: category.id,
          });

          const articles = pages.results
            .filter(
              (block): block is BlockObjectResponse & { type: "child_page" } =>
                "type" in block && block.type === "child_page",
            )
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
            articles: articles,
          };
        } catch (error) {
          return {
            category: category.properties.Title.title[0]?.plain_text,
            position: category.properties.Position?.number || 0,
            icon: category.icon,
            articles: [],
          };
        }
      }),
    );

    return NextResponse.json({
      success: true,
      results: categoriesWithArticles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error al obtener artículos",
      },
      { status: 500 },
    );
  }
}
