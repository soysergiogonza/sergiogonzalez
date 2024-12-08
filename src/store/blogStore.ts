import { create } from 'zustand';

interface Article {
  title: string;
  created: string;
  tags: string[];
  category: string;
  date: string;
  language: string;
  url: string;
  excerpt?: string;
  coverImage?: string;
}

interface BlogStore {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  filterArticlesByCategory: (category: string) => Article[];
  filterArticlesByTag: (tag: string) => Article[];
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  articles: [],
  isLoading: false,
  error: null,
  
  fetchArticles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/blog/articles');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al cargar los artículos');
      }
      
      set({ articles: data.articles, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar los artículos', 
        isLoading: false 
      });
    }
  },

  filterArticlesByCategory: (category: string) => {
    return get().articles.filter(article => article.category === category);
  },

  filterArticlesByTag: (tag: string) => {
    return get().articles.filter(article => article.tags.includes(tag));
  }
})); 