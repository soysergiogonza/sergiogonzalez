'use client';

import type { Article } from '@/types';
import Link from 'next/link';
import styles from './BlogCard.module.css';

export const BlogCard = ({ frontMatter, date, slug }: Article) => {
 return (
  <div key={slug} className={styles.card}>
   <time dateTime={frontMatter.date} className={styles.time}>
    {date}
   </time>
   <section className={styles.bodyCard}>
    <header className={styles.header}>
     <h2 className={styles.articleTitle}>
      <Link href={`/blog/${slug}`}>{frontMatter.title}</Link>
     </h2>
     <div className={styles.tags}>
      {frontMatter.tags.map((tag: string) => (
       <span key={tag} className={styles.tag}>
        {tag}
       </span>
      ))}
     </div>
    </header>
    <article className={styles.cardDescription}>
     {frontMatter.description}
    </article>
    <Link href={`/blog/${slug}`} className={styles.readMore}>
     Read more →
    </Link>
   </section>
  </div>
 );
};
