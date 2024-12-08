import { create } from 'zustand';
import { Category, Article } from '@/types/notion';

interface CategoryStore {
  categories: Category[];
  selectedCategory: string | null;
  selectedArticle: string | null;
  isLoading: boolean;
  error: string | null;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedArticle: (articleUrl: string | null) => void;
  getArticlesByCategory: (category: string) => Article[];
  getAllArticles: () => Article[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  selectedCategory: null,
  selectedArticle: null,
  isLoading: false,
  error: null,

  setCategories: (categories) => {
    const formattedCategories = categories.map(category => ({
      ...category,
      articles: category.articles || []
    }));
    set({ categories: formattedCategories });
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSelectedArticle: (articleUrl) => set({ selectedArticle: articleUrl }),

  getArticlesByCategory: (category) => {
    const { categories } = get();
    const categoryData = categories.find(cat => cat.category === category);
    return categoryData?.articles || [];
  },

  getAllArticles: () => {
    const { categories } = get();
    return categories.flatMap(category => category.articles);
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/blog/articles');
      const data = await response.json();
      if (data.success) {
        get().setCategories(data.results);
      } else {
        set({ error: 'Error al cargar las categorías' });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido' });
    } finally {
      set({ isLoading: false });
    }
  }
}));
