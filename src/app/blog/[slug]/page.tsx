import { NotionRenderer } from '@/components/blog/NotionRenderer';
import { getNotionContent } from '@/lib/notion/client';
import styles from './Article.module.css';
import type { ArticleBlogParams } from '@/types/blog';

const ArticlePage = async ({ params }: ArticleBlogParams) => {
  const { slug } = params;
  
  try {
    const notionData = await getNotionContent(slug);

    return (
      <article className={styles.article}>
        <NotionRenderer notionData={notionData} />
      </article>
    );
  } catch (error) {
    console.error('Error al cargar el artículo:', error);
    return <div>Error al cargar el artículo</div>;
  }
};

export default ArticlePage;
