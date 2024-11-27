"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { articlesService } from "@/services/articles/articles.services";
import type { Post } from "@/types/blog/post";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Post | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Necesitarás agregar este método en tu servicio
        const data = await articlesService.getById(id as string);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      {/* Aquí puedes agregar un editor de contenido */}
    </div>
  );
};

export default ArticlePage; 