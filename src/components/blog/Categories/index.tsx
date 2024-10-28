import styles from './Categories.module.css';
import { useCategories } from '@/services/categories/categories.hooks';
import type { ArticleProps } from '@/types/blog';
import Link from 'next/link';

export const Categories = () => {
  const { categories, articles } = useCategories();
  return (
    <section className={styles.routes}>
      {categories?.map((category, index) => (
        <div key={index}>
          <details name="category" className={styles.details}>
            <summary className={styles.summary}>
              <h4 className={styles.categoryTitle}>{category}</h4>
            </summary>
            <div className={styles.articleList}>
              {articles
                .filter(({ frontMatter }: ArticleProps) =>
                  frontMatter?.category?.includes(category),
                )
                  .sort((a, b) => (a?.frontMatter?.position || 0) - (b?.frontMatter?.position || 0))
                  .map(({ slug, frontMatter }: ArticleProps) => (
                  <Link
                    href={`/blog/${slug}`}
                    key={slug}
                    className={styles.articleTitle}
                  >
                    {frontMatter?.title}
                  </Link>
                ))}
            </div>
          </details>
        </div>
      ))}
    </section>
  );
};
