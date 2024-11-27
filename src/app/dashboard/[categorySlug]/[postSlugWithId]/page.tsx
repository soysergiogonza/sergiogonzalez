"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./Post.module.css";

interface Post {
  id: string;
  title: string;
  category_id: string;
  created_at: string;
}

export default function PostPage({ 
  params 
}: { 
  params: { categorySlug: string; postSlugWithId: string } 
}) {
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Extraer el UUID completo del slug
        const matches = params.postSlugWithId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        const postId = matches ? matches[0] : null;

        console.log('UUID extraído:', postId);

        if (!postId) {
          console.error('No se pudo extraer un UUID válido de:', params.postSlugWithId);
          return;
        }

        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          console.error('Error al obtener el post:', error);
          return;
        }

        if (data) {
          console.log('Post encontrado:', data);
          setPost(data);
          setNewTitle(data.title);
        }
      } catch (error) {
        console.error('Error en fetchPost:', error);
      }
    };

    fetchPost();
  }, [params.postSlugWithId]);

  const handleTitleUpdate = async () => {
    if (!post || newTitle.trim() === post.title) return;

    try {
      const { error } = await supabase
        .from('posts')
        .update({ title: newTitle.trim() })
        .eq('id', post.id);

      if (error) {
        console.error('Error al actualizar el título:', error);
        return;
      }

      setPost({ ...post, title: newTitle.trim() });
      setIsEditing(false);

      // Actualizar la URL con el nuevo título
      const newSlug = newTitle.trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      window.history.replaceState(
        {}, 
        '', 
        `/dashboard/${params.categorySlug}/${newSlug}-${post.id}`
      );
    } catch (error) {
      console.error('Error en handleTitleUpdate:', error);
    }
  };

  if (!post) {
    return (
      <div className={styles.loading}>
        <p>Cargando...</p>
        <p>Buscando post en la base de datos...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isEditing ? (
        <div className={styles.titleEdit}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.titleInput}
            autoFocus
            onBlur={handleTitleUpdate}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleTitleUpdate();
              }
            }}
          />
        </div>
      ) : (
        <h1 onClick={() => setIsEditing(true)}>{post.title}</h1>
      )}
      <p className={styles.date}>
        Creado: {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
} 