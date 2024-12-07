import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CategoriesState {
  openCategories: string[];
  toggleCategory: (category: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
}

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set) => ({
      openCategories: [],
      toggleCategory: (category) =>
        set((state) => ({
          openCategories: state.openCategories.includes(category)
            ? state.openCategories.filter((c) => c !== category)
            : [...state.openCategories, category],
        })),
      addCategory: (category) =>
        set((state) => ({
          openCategories: [...state.openCategories, category],
        })),
      removeCategory: (category) =>
        set((state) => ({
          openCategories: state.openCategories.filter((c) => c !== category),
        })),
      setCategories: (categories) =>
        set({
          openCategories: categories,
        }),
    }),
    {
      name: 'categories-storage',
    }
  )
); 