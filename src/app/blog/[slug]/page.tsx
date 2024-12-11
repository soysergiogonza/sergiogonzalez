import { Suspense } from 'react';
import { NotionRenderer } from '@/components/blog/NotionRenderer';
import { getNotionContent } from '@/lib/notion/client';
import styles from './Article.module.css';
import type { ArticleBlogParams } from '@/types/blog';
import { ArticleSkeleton } from '@/components/blog/ArticleSkeleton';

export async function generateMetadata({ params }: ArticleBlogParams) {
  try {
    const notionData = await getNotionContent(params.slug);
    // Asumiendo que el primer bloque contiene la información del artículo
    const title = notionData[0]?.paragraph?.rich_text[0]?.plain_text || 'Artículo';
    
    return {
      title,
      description: 'Artículo del blog',
    };
  } catch (error) {
    return {
      title: 'Artículo',
      description: 'Artículo del blog',
    };
  }
}

const ArticlePage = async ({ params }: ArticleBlogParams) => {
  const { slug } = params;
  
  if (!slug) {
    throw new Error('Slug no proporcionado');
  }

  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <article className={styles.article}>
        <NotionRenderer notionData={await getNotionContent(slug)} />
      </article>
    </Suspense>
  );
};

export default ArticlePage;
