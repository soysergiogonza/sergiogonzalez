import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Category = {
  id: string;
  name: string;
  icon: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al cargar categorías:', error);
      return;
    }

    if (data) {
      setCategories(data);
    }
  };

  const addCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([
          { name: 'Nueva Categoría', icon: '' }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setCategories([data, ...categories]);
      }
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const updateCategory = async (categoryId: string, newName: string, iconFile?: File) => {
    try {
      let iconUrl = categories.find(cat => cat.id === categoryId)?.icon || '';
      
      if (iconFile) {
        const fileExt = iconFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data, error: uploadError } = await supabase.storage
          .from('icons')
          .upload(`${categoryId}/${fileName}`, iconFile, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('icons')
          .getPublicUrl(`${categoryId}/${fileName}`);
        
        iconUrl = publicUrl;
      }

      const { error } = await supabase
        .from('categories')
        .update({ 
          name: newName.trim(),
          icon: iconUrl 
        })
        .eq('id', categoryId);

      if (error) throw error;

      setCategories(categories.map(cat =>
        cat.id === categoryId 
          ? { ...cat, name: newName.trim(), icon: iconUrl }
          : cat
      ));

      return true;
    } catch (error) {
      console.error('Error al actualizar:', error);
      return false;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await supabase.storage
        .from('icons')
        .remove([`${categoryId}`]);

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      setCategories(categories.filter(cat => cat.id !== categoryId));
      return true;
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      return false;
    }
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  };
};