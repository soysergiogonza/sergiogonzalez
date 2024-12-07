import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Category } from '@/types/blog/categories';

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: Category) => void;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      selectedCategory: null,
      isLoading: false,
      error: null,
      setCategories: (categories) => set({ categories }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      fetchCategories: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch('/api/notion/pages');
          const data = await response.json();
          
          if (!data.success || !data.results) {
            throw new Error('No se encontraron categorías');
          }

          const formattedCategories = data.results.map((page: any) => ({
            category: page.properties.Title?.title[0]?.plain_text || 'Sin título',
            position: page.properties.Position?.number || 0,
            icon: page.icon,
            articles: page.articles || []
          }));

          set({ 
            categories: formattedCategories, 
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Error detallado:', error);
          set({ 
            error: error.message || 'Error al cargar las categorías', 
            isLoading: false,
            categories: [] 
          });
        }
      },
    }),
    {
      name: 'category-storage',
    }
  )
); 