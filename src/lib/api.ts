import { ArticlesResponse } from "@/types/notion";

export async function getArticles() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articles`,
    );
    const data: ArticlesResponse = await response.json();
    return data.results;
  } catch (error) {
    return [];
  }
}
