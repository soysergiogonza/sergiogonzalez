import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Category } from '@/types/blog/categories';

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: Category) => void;
  fetchCategories: () => Promise<void>;
}

const CACHE_TIME = 5 * 60 * 1000; // 5 minutos en milisegundos

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: [],
      selectedCategory: null,
      isLoading: false,
      error: null,
      lastFetched: null,

      setCategories: (categories) => set({ categories }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      fetchCategories: async () => {
        const now = Date.now();
        const lastFetched = get().lastFetched;
        const categories = get().categories;

        // Si hay datos en caché y no han pasado 5 minutos, usar caché
        if (categories.length > 0 && lastFetched && (now - lastFetched) < CACHE_TIME) {
          return;
        }

        try {
          set({ isLoading: true, error: null });
          const response = await fetch('/api/notion/pages');
          const data = await response.json();

          if (!data.success || !data.results) {
            throw new Error('No se encontraron categorías');
          }

          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          const formattedCategories = data.results.map((page: any) => ({
            category: page.properties.Title?.title[0]?.plain_text || 'Sin título',
            position: page.properties.Position?.number || 0,
            icon: page.icon,
            articles: page.articles || []
          }));

          set({
            categories: formattedCategories,
            lastFetched: now,
            isLoading: false
          });
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
          console.error('Error detallado:', error);
          set({
            error: error.message || 'Error al cargar las categorías',
            isLoading: false
          });
        }
      },
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        categories: state.categories,
        lastFetched: state.lastFetched
      })
    }
  )
);
