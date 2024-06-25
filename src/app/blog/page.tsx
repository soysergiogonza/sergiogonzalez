import { getArticles } from '@/app/blog/utils/getArticles';
import Link from 'next/link';
import styles from './Blog.module.css';

const BlogPage = async () => {
 const articles = await getArticles();
 return (
  <div>
   {articles?.map((article) => (
    <div key={article.slug} className={styles.card}>
     <h2>
      <Link href={`/blog/${article.slug}`}>{article.frontMatter.title}</Link>
     </h2>
     <p>{article.frontMatter.date}</p>
     <div className={styles.tags}>
      {article.frontMatter.tags.map((tag, index) => (
       <span key={index} className={styles.tag}>
        {tag}
       </span>
      ))}
     </div>
     <p>{article.excerpt}</p>
     <Link href={`/blog/${article.slug}`}>Read more →</Link>
    </div>
   ))}
  </div>
 );
};

export default BlogPage;
