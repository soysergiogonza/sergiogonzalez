import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';

export const getArticles = async () => {
 const files: string[] = fs.readdirSync(
  path.join(process.cwd(), 'src/data/blog'),
 );

 interface MatterFile {
  slug: string;
  frontMatter: {};
  content: string;
  shortDescription: string;
 }

 return files.map((filename: string): MatterFile => {
  const markdownWithMeta: string = fs.readFileSync(
   path.join(process.cwd(), 'src/data/blog', filename),
   'utf-8',
  );

  const { data: frontMatter, content }: GrayMatterFile<string> =
   matter(markdownWithMeta);

  const shortDescription: string = `${content.slice(0, 200)}...`;
  const slug: string = filename.replace('.mdx', '');
  return {
   slug,
   frontMatter,
   content,
   shortDescription,
  };
 });
};
