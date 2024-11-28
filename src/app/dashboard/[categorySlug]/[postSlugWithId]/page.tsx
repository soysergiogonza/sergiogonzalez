"use client";

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import { EditableTitle } from '@/components/dashboard/EditableTitle';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EditableDescription } from '@/components/dashboard/EditableDescription';
import styles from "./Post.module.css";
import type { Post } from '@/types/blog/post';  // Añade esta línea al inicio del archivo

export default function PostPage({ params }: { 
  params: { categorySlug: string; postSlugWithId: string } 
}) {
  const { setCurrentPost } = useDashboardStore();
  const supabase = createClientComponentClient();
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const matches = params.postSlugWithId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        const postId = matches ? matches[0] : null;

        if (!postId) {
          console.error('No se pudo extraer un UUID válido');
          return;
        }

        const { data, error } = await supabase
        .from('posts')
        .select('id, title, description, category_id, created_at')
        .eq('id', postId)
        .single();

        if (error) {
          console.error('Error al obtener el post:', error);
          return;
        }

        if (data) {
          const completePost: Post = {
            id: data.id,
            title: data.title,
            description: data.description,
            category_id: data.category_id,
            created_at: data.created_at,
          };
          setCurrentPost(completePost);
        }
      } catch (error) {
        console.error('Error en fetchPost:', error);
      }
    };

    fetchPost();
  }, [params.postSlugWithId, setCurrentPost]);

  return (
    <div className={styles.container}>
      <EditableTitle postId={params.postSlugWithId} />
      <hr className={styles.separator} />
      <EditableDescription postId={params.postSlugWithId} />
    </div>
  );
} 