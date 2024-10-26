import styles from '@/components/Aside/Aside.module.css';
import type { ArticleProps } from '@/types/blog';
import Link from 'next/link';

interface CategoriesProps {
  categories: string[];
  articles: ArticleProps[];
}

export const Categories = ({ categories, articles }: CategoriesProps) => {
  console.log({ articles });
  return (
    <section className={styles.routes}>
      {categories?.map((category, index) => (
        <div key={index}>
          <div>{category}</div>
          <div className={styles.articleList}>
            {articles
              .filter(({ frontMatter }: ArticleProps) =>
                frontMatter?.category?.includes(category),
              )
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
        </div>
      ))}
    </section>
  );
};
