import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isMenuOpen: boolean;
  isDarkMode: boolean;
  toggleMenu: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      isDarkMode: true,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'ui-storage',
    }
  )
); 