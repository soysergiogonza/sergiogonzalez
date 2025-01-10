import { create } from "zustand";
import type { BlogState } from "../types";
import { BlogService } from "../services/blogService";

export const useBlogStore = create<BlogState>((set) => ({
  articles: [],
  categories: [],
  isLoading: false,
  error: null,
  
  fetchArticles: async () => {
    set({ isLoading: true, error: null });
    try {
      const blogService = new BlogService();
      const categories = await blogService.getArticles();
      const articles = categories.flatMap(category => category.articles);
      set({ articles, categories, isLoading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      set({ error: errorMessage, isLoading: false });
    }
  }
})); 