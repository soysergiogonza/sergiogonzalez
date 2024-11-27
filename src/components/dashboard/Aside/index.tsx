"use client";

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus, ChevronDown, ChevronRight, MoreVertical, FileText, X } from 'lucide-react';
import styles from './Aside.module.css';

type Category = {
  id: string;
  name: string;
  icon: string;
};

export const Aside = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newName, setNewName] = useState('');
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

  const handleAddCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([
          { name: 'Nueva Categoría', icon: '' }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error al crear categoría:', error);
        return;
      }

      if (data) {
        setCategories([data, ...categories]); // Añade la nueva categoría al inicio
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMenuClick = (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === categoryId ? null : categoryId);
  };

  const handleEditClick = (e: React.MouseEvent, category: Category) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingCategory(category);
    setNewName(category.name);
    setIsEditModalOpen(true);
    setActiveMenu(null);
  };

  const handleSaveChanges = async () => {
    if (!editingCategory || !newName.trim()) return;

    try {
      let iconUrl = editingCategory.icon;
      const fileInput = document.getElementById('icon-upload') as HTMLInputElement;
      
      if (fileInput?.files?.length) {
        const file = fileInput.files[0];
        // Generar un nombre único para el archivo
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data, error: uploadError } = await supabase.storage
          .from('icons')
          .upload(`${editingCategory.id}/${fileName}`, file, {
            cacheControl: '3600',
            upsert: true // Sobrescribir si existe
          });

        if (uploadError) throw uploadError;
        
        // Obtener la URL pública del icono
        const { data: { publicUrl } } = supabase.storage
          .from('icons')
          .getPublicUrl(`${editingCategory.id}/${fileName}`);
        
        iconUrl = publicUrl;
      }

      // Actualizar la categoría con el nuevo nombre y/o icono
      const { error } = await supabase
        .from('categories')
        .update({ 
          name: newName.trim(),
          icon: iconUrl 
        })
        .eq('id', editingCategory.id);

      if (error) throw error;

      // Actualizar el estado local
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id 
          ? { ...cat, name: newName.trim(), icon: iconUrl }
          : cat
      ));

      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      // Primero eliminamos los archivos asociados del storage
      await supabase.storage
        .from('icons')
        .remove([`${categoryId}`]);

      // Luego eliminamos la categoría de la base de datos
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      // Actualizamos el estado local
      setCategories(categories.filter(cat => cat.id !== categoryId));
      setActiveMenu(null);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      await handleDeleteCategory(categoryId);
    }
  };

  return (
    <>
      <aside className={styles.aside}>
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <h3 className={styles.title}>Categorías</h3>
            <button 
              className={styles.addButton}
              onClick={handleAddCategory}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className={styles.contentWrapper}>
            {categories.map((category) => (
              <details key={category.id} className={styles.categoryDetails}>
                <summary 
                  className={styles.categorySummary}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest(`.${styles.categoryActions}`)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className={styles.categoryLeft}>
                    <div className={styles.iconWrapper}>
                      <img 
                        src={category.icon || '/default-icon.png'} 
                        alt="" 
                        className={styles.categoryIcon} 
                      />
                      <ChevronRight size={12} className={styles.chevron} />
                    </div>
                    <span className={styles.categoryTitle}>{category.name}</span>
                  </div>
                  <div className={styles.categoryActions}>
                    <button 
                      className={styles.menuButton}
                      onClick={(e) => handleMenuClick(e, category.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeMenu === category.id && (
                      <div 
                        className={styles.dropdownMenu}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button 
                          className={styles.menuItem}
                          onClick={(e) => handleEditClick(e, category)}
                        >
                          Editar categoría
                        </button>
                        <button 
                          className={`${styles.menuItem} ${styles.deleteButton}`}
                          onClick={(e) => handleDeleteClick(e, category.id)}
                        >
                          Eliminar categoría
                        </button>
                      </div>
                    )}
                  </div>
                </summary>
                <div className={styles.categoryContent}>
                  {/* Aquí irían los artículos de la categoría */}
                </div>
              </details>
            ))}
          </div>
        </div>
      </aside>

      {/* Modal de edición */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Editar categoría</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.formGroup}>
                <label htmlFor="category-name">Nombre</label>
                <input
                  id="category-name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="icon-upload">Icono</label>
                <input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  className={styles.input}
                />
              </div>
              <div className={styles.modalFooter}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancelar
                </button>
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveChanges}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 