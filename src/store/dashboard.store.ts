import { create } from "zustand";
import type { Post } from "@/types/blog/post";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface DashboardStore {
  posts: Post[];
  currentPost: Post | null;
  isSaving: boolean;
  setPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  addPost: (categoryId: string) => Promise<Post | null>;
  deletePost: (postId: string) => Promise<boolean>;
  getPostsByCategory: (categoryId: string) => Post[];
}

export const useDashboardStore = create<DashboardStore>((set, get) => {
  let saveTimeout: NodeJS.Timeout;

  const saveToServer = async (postId: string, updates: Partial<Post>) => {
    const supabase = createClientComponentClient();
    try {
      const { error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId);

      if (error) throw error;
      
      set({ isSaving: true });
      setTimeout(() => set({ isSaving: false }), 500);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      set({ isSaving: false });
    }
  };

  return {
    posts: [],
    currentPost: null,
    isSaving: false,

    setPosts: (posts) => set({ posts }),
    setCurrentPost: (post) => set({ currentPost: post }),

    updatePost: (postId, updates) => {
      set(state => ({
        currentPost: state.currentPost?.id === postId 
          ? { ...state.currentPost, ...updates }
          : state.currentPost,
        posts: state.posts.map(post => 
          post.id === postId ? { ...post, ...updates } : post
        ),
        isSaving: false
      }));

      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveToServer(postId, updates);
      }, 2000);
    },

    getPostsByCategory: (categoryId) => {
      const { posts } = get();
      return posts.filter(post => post.category_id === categoryId);
    },

    addPost: async (categoryId) => {
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

    deletePost: async (postId) => {
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
  };
}); 