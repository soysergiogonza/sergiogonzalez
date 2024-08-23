import styles from '@/components/Aside/Aside.module.css';
import { ArticleProps } from '@/types/blog';
import Link from 'next/link';

export const Categories = ({ categories, articles }) => {
 return (
  <section className={styles.routes}>
   {categories.map((category, index) => (
    <div key={index}>
     <div>{category}</div>
     <div className={styles.articleList}>
      {articles
       .filter(
        ({ frontMatter }: ArticleProps) => frontMatter.category === category,
       )
       .map(({ slug, frontMatter }: ArticleProps) => (
        <Link href={`/blog/${slug}`} key={slug}>
         <div key={slug} className={styles.articleTitle}>
          {frontMatter.title}
         </div>
        </Link>
       ))}
     </div>
    </div>
   ))}
  </section>
 );
};
