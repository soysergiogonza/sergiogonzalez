import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Post } from '@/types/blog/post';

interface ArticleState {
  articles: Post[];
  selectedArticle: Post | null;
  isLoading: boolean;
  error: string | null;
  setArticles: (articles: Post[]) => void;
  setSelectedArticle: (article: Post) => void;
  fetchArticles: () => Promise<void>;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set) => ({
      articles: [],
      selectedArticle: null,
      isLoading: false,
      error: null,
      setArticles: (articles) => set({ articles }),
      setSelectedArticle: (article) => set({ selectedArticle: article }),
      fetchArticles: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch('/api/notion/pages');
          const data = await response.json();
          
          if (data.error) {
            throw new Error(data.error);
          }
          
          set({ articles: data.results || [], isLoading: false });
        } catch (error) {
          set({ 
            error: 'Error al cargar los artículos desde Notion', 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'article-storage',
    }
  )
); 