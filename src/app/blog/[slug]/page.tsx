import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
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

 if (!fs.existsSync(filePath)) {
  notFound();
 }

 const markdownWithMeta: string = fs.readFileSync(filePath, 'utf-8');
 const { data: frontMatter, content } = matter(markdownWithMeta);
 const mdxSource = await (await import('next-mdx-remote/serialize')).serialize(
  content,
 );

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
    }}
   >
    {/*@ts-ignore*/}
    {frontMatter?.tags.map((tag) => (
     <span
      key={tag}
      className={styles.tag}
      style={{
       backgroundColor: frontMatter?.colors[1],
      }}
     >
      {tag}
     </span>
    ))}
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
   <div className={styles.articlesDirections}>
    <div className={styles.previousLinkContainer}>
     {frontMatter.anterior && (
      <Link href={frontMatter.anterior} className={styles.directionLink}>
       <FaLongArrowAltLeft />
       <span>Anterior artículo</span>
      </Link>
     )}
    </div>
    <div className={styles.nextLinkContainer}>
     {frontMatter.siguiente && (
      <Link href={frontMatter.siguiente} className={styles.directionLink}>
       <span>Siguiente artículo</span>
       <FaLongArrowAltRight />
      </Link>
     )}
    </div>
   </div>
  </article>
 );
};

export default ArticlePage;

export const generateStaticParams = async () => {
 const files = fs.readdirSync(path.join(process.cwd(), 'src/data/blog'));
 return files.map((filename) => ({
  params: { slug: filename.replace('.mdx', '.mdx') },
 }));
};
