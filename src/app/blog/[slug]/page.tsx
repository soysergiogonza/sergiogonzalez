// src/app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import styles from '../Blog.module.css';
import { ArticleContent } from './ClientContent';

interface Params {
 params: {
  slug: string;
 };
}

const ArticlePage = async ({ params }: Params) => {
 const { slug } = params;
 const filePath: string = path.join(
  process.cwd(),
  'src/data/blog',
  `${slug}.mdx`,
 );
 const markdownWithMeta: string = fs.readFileSync(filePath, 'utf-8');
 const { data: frontMatter, content } = matter(markdownWithMeta);
 const mdxSource = await serialize(content);

 const date: string = new Date(frontMatter.date)
  .toLocaleDateString('es-CO', {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
  })
  .toUpperCase();

 return (
  <article className={styles.article}>
   <p
    className={styles.category}
    style={{
     color: frontMatter?.colors[0],
     backgroundColor: frontMatter?.colors[1],
    }}
   >
    {frontMatter?.category}
   </p>
   <div className={styles.articleHead}>
    <time dateTime={date} className={styles.date}>
     {date}
    </time>
    <h1 className={styles.title}>{frontMatter.title}</h1>
   </div>
   <picture className={styles.picture}>
    <Image
     src={frontMatter.banner}
     alt={frontMatter.title}
     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
     width={500}
     height={500}
    />
   </picture>
   <ArticleContent mdxSource={mdxSource} />
  </article>
 );
};

export default ArticlePage;

export const generateStaticParams = async () => {
 const files = fs.readdirSync(path.join(process.cwd(), 'src/data/blog'));
 return files.map((filename) => ({
  params: { slug: filename.replace('.mdx', '') },
 }));
};
