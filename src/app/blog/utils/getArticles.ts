import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getArticles = async () => {
 const files = fs.readdirSync(path.join(process.cwd(), 'src/data/blog'));
 return files.map((filename) => {
  const markdownWithMeta = fs.readFileSync(
   path.join(process.cwd(), 'src/data/blog', filename),
   'utf-8',
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const excerpt = `${content.slice(0, 100)}...`;
  return {
   slug: filename.replace('.mdx', ''),
   frontMatter,
   excerpt,
  };
 });
};
