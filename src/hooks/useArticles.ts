import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Article = {
  id: string;
  title: string;
  content: string;
  category_id: string;
  created_at: string;
};

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al cargar artículos:', error);
      return;
    }

    if (data) {
      setArticles(data);
    }
  };

  const addArticle = async (categoryId: string) => {
    try {
      const newArticle = {
        title: 'Nuevo Artículo',
        content: '',
        category_id: categoryId,
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([newArticle])
        .select()
        .single();

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }

      if (data) {
        setArticles(prev => [data, ...prev]);
        return data;
      }
    } catch (error) {
      console.error('Error al crear artículo:', error);
      return null;
    }
  };

  const getArticlesByCategory = (categoryId: string) => {
    return articles.filter(article => article.category_id === categoryId);
  };

  return {
    articles,
    addArticle,
    getArticlesByCategory
  };
}; 