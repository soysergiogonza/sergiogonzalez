import { create } from "zustand";
import type { Post } from "@/types/blog/post";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface DashboardStore {
  posts: Post[];
  currentPost: Post | null;
  isSaving: boolean;
  setPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  updatePostTitle: (postId: string, title: string) => void;
  syncTitleToServer: (postId: string, title: string) => Promise<void>;
  addPost: (categoryId: string) => Promise<Post | null>;
  deletePost: (postId: string) => Promise<boolean>;
  getPostsByCategory: (categoryId: string) => Post[];
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  posts: [],
  currentPost: null,
  isSaving: false,

  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),

  updatePostTitle: (postId, title) => {
    set(state => ({
      currentPost: state.currentPost ? { ...state.currentPost, title } : null,
      posts: state.posts.map(post => 
        post.id === postId ? { ...post, title } : post
      )
    }));
  },

  syncTitleToServer: async (postId, title) => {
    const supabase = createClientComponentClient();
    
    set({ isSaving: true });
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({ title })
        .eq('id', postId);

      if (error) throw error;
    } catch (error) {
      console.error('Error al sincronizar título:', error);
    } finally {
      set({ isSaving: false });
    }
  },

  getPostsByCategory: (categoryId: string) => {
    const { posts } = get();
    return posts.filter(post => post.category_id === categoryId);
  },

  addPost: async (categoryId: string) => {
    const supabase = createClientComponentClient();
    try {
      const newPost = {
        title: 'Nuevo Artículo',
        category_id: categoryId
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        set(state => ({ posts: [data, ...state.posts] }));
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error al crear post:', error);
      return null;
    }
  },

  deletePost: async (postId: string) => {
    const supabase = createClientComponentClient();
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      set(state => ({
        posts: state.posts.filter(post => post.id !== postId)
      }));
      return true;
    } catch (error) {
      console.error('Error al eliminar post:', error);
      return false;
    }
  }
})); 