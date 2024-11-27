import { create } from "zustand";
import type { Post } from "@/types/blog/post";

interface DashboardStore {
  posts: Post[];
  user: any; // Podemos tipar esto mejor después
  setPosts: (posts: Post[]) => void;
  setUser: (user: any) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  posts: [],
  user: null,
  setPosts: (posts) => set({ posts }),
  setUser: (user) => set({ user }),
})); 