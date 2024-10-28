import fs from 'fs/promises'; // Cambiamos a la versión con promesas
import path from 'path';
import matter from 'gray-matter';
import type { ArticleProps } from '@/types/blog';

export const getArticles = async () => {
  try {
    const blogDirectory = path.join(process.cwd(), 'src/data/blog');

    const files = await fs.readdir(blogDirectory);

    const articles = await Promise.all(
      files
        .filter((filename) => filename.endsWith('.mdx'))
        .map(async (filename): Promise<ArticleProps> => {
          const markdownWithMeta = await fs.readFile(
            path.join(blogDirectory, filename),
            'utf-8',
          );

          const { data: frontMatter, content } = matter(markdownWithMeta);
          const shortDescription = `${content.slice(0, 200)}...`;
          const slug = filename.replace('.mdx', '');

          const date = new Date(frontMatter.date)
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
        }),
    );

    return articles;
  } catch (error) {
    console.error('Error reading blog articles:', error);
    throw error;
  }
};
