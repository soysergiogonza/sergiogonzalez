import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/data/blog/");

export const getArticleBySlug = async (slug: string) => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const markdownWithMeta = await fs.readFile(filePath, "utf-8");
  const { data: frontMatter, content } = matter(markdownWithMeta);

  return { frontMatter, content };
};

export const getAllArticles = async () => {
  const files = await fs.readdir(BLOG_DIR);
  const articles = await Promise.all(
    files
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const filePath = path.join(BLOG_DIR, filename);
        const markdownWithMeta = await fs.readFile(filePath, "utf-8");
        const { data: frontMatter, content } = matter(markdownWithMeta);

        return {
          slug: filename.replace(".mdx", ""),
          frontMatter,
          content,
        };
      }),
  );

  return articles;
};
