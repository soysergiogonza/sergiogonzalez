import fs from 'fs';
import path from 'path';
import { readDirectory } from '@/infrastructure/filesystem/fileReader';
import { ArticleProps } from '@/types/blog';
import matter, { GrayMatterFile } from 'gray-matter';

export const getArticles = async () => {
 const files: string[] = readDirectory();

 return files.map((filename: string): ArticleProps => {
  const markdownWithMeta: string = fs.readFileSync(
   path.join(process.cwd(), 'src/data/blog', filename),
   'utf-8',
  );

  const { data: frontMatter, content }: GrayMatterFile<string> =
   matter(markdownWithMeta);

  console.log({ markdownWithMeta });

  const shortDescription: string = `${content.slice(0, 200)}...`;
  const slug: string = filename.replace('.mdx', '');

  const date: string = new Date(frontMatter.date)
   .toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
   })
   .toUpperCase();

  return <ArticleProps>{
   frontMatter,
   date,
   content,
   shortDescription,
   slug,
  };
 });
};
