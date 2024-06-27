// src/app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { ArticleContent } from './ClientContent';

interface Params {
 params: {
  slug: string;
 };
}

const ArticlePage = async ({ params }: Params) => {
 const { slug } = params;
 const filePath = path.join(process.cwd(), 'src/data/blog', `${slug}.mdx`);
 const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
 const { data: frontMatter, content } = matter(markdownWithMeta);
 const mdxSource = await serialize(content);

 return (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
   <h1>{frontMatter.title}</h1>
   <p>{new Date(frontMatter.created).toLocaleDateString()}</p>
   <p>{frontMatter.category}</p>
   <div>
    {frontMatter.tags.map((tag: string, index: number) => (
     <span key={index} style={{ marginRight: '10px' }}>
      {tag}
     </span>
    ))}
   </div>
   <ArticleContent mdxSource={mdxSource} />
  </div>
 );
};

export default ArticlePage;

export const generateStaticParams = async () => {
 const files = fs.readdirSync(path.join(process.cwd(), 'src/data/blog'));
 return files.map((filename) => ({
  params: { slug: filename.replace('.mdx', '') },
 }));
};
