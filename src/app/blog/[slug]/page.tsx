import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { serialize } from 'next-mdx-remote/serialize';

const ArticlePage = async ({ params }) => {
 const { slug } = params;
 const filePath = path.join(process.cwd(), 'src/data/blog', `${slug}.mdx`);
 const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
 const { data: frontMatter, content } = matter(markdownWithMeta);
 const mdxSource = await serialize(content);

 return (
  <div>
   <h1>{frontMatter.title}</h1>
   <p>{frontMatter.date}</p>
   <div>
    {frontMatter.tags.map((tag, index) => (
     <span key={index}>{tag}</span>
    ))}
   </div>
   <MDXRemote {...mdxSource} />
  </div>
 );
};

export default ArticlePage;
