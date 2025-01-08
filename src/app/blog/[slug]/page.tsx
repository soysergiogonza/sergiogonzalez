import { ArticleSkeleton } from "@/components/pages/blog/ArticleSkeleton";
import { NotionRenderer } from "@/components/pages/blog/NotionRenderer";
import { getNotionContent } from "@/lib/notion/client";
import type { ArticleBlogParams } from "@/types/blog";
import { isFullPage } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Suspense } from "react";
import styles from "./Article.module.css";

export async function generateMetadata({ params }: ArticleBlogParams) {
  try {
    const notionData = await getNotionContent(params.slug);

    let title = "Artículo";
    if (isFullPage(notionData.page)) {
      const titleProperty = notionData.page.properties.title as {
        type: "title";
        title: Array<{
          plain_text: string;
        }>;
      };
      title = titleProperty.title?.[0]?.plain_text || title;
    }

    return {
      title,
      description: "Artículo del blog",
    };
  } catch (error) {
    return {
      title: "Artículo",
      description: "Artículo del blog",
    };
  }
}

const ArticlePage = async ({ params }: ArticleBlogParams) => {
  const { slug } = params;

  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <article className={styles.article}>
        <NotionRenderer notionData={await getNotionContent(slug)} />
      </article>
    </Suspense>
  );
};

export default ArticlePage;
