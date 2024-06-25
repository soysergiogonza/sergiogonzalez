import { getArticles } from '@/app/blog/utils/getArticles';
import Link from 'next/link';
import styles from './Blog.module.css';

const BlogPage = async () => {
 const articles = await getArticles();
 return (
  <>
   {articles?.map((article) => {
    const { slug, frontMatter, excerpt } = article;

    const date = new Date(frontMatter.date).toLocaleDateString('es-CO', {
     year: 'numeric',
     month: 'long',
     day: 'numeric',
    });

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
         {frontMatter.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
           {tag}
          </span>
         ))}
        </div>
       </header>
       <article className={styles.cardDescription}>{excerpt}</article>
       <Link href={`/blog/${slug}`} className={styles.readMore}>
        Read more →
       </Link>
      </section>
     </div>
    );
   })}
  </>
 );
};

export default BlogPage;
