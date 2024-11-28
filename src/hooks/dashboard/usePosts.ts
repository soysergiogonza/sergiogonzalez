import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Post = {
  id: string;
  title: string;
  category_id: string;
  created_at: string;
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al cargar posts:', error);
      return;
    }

    if (data) {
      setPosts(data);
    }
  };

  const addPost = async (categoryId: string) => {
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
        setPosts(prev => [data, ...prev]);
        return data;
      }
    } catch (error) {
      console.error('Error al crear post:', error);
      return null;
    }
  };

  const getPostsByCategory = (categoryId: string) => {
    return posts.filter(post => post.category_id === categoryId);
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== postId));
      return true;
    } catch (error) {
      console.error('Error al eliminar post:', error);
      return false;
    }
  };

  return {
    posts,
    addPost,
    deletePost,
    getPostsByCategory
  };
}; 