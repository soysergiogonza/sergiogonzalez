"use client";

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import { EditableTitle } from '@/components/dashboard/EditableTitle';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./Post.module.css";

export default function PostPage({ params }: { 
  params: { categorySlug: string; postSlugWithId: string } 
}) {
  const { setCurrentPost } = useDashboardStore();
  const supabase = createClientComponentClient();

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
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          console.error('Error al obtener el post:', error);
          return;
        }

        if (data) {
          setCurrentPost(data);
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
    </div>
  );
} 