"use client";

import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight, MoreVertical, X } from 'lucide-react';
import styles from './Aside.module.css';
import { useCategories } from '@/hooks/dashboard/useCategories';
import { useDashboardStore } from '@/store/dashboard.store';
import { useRouter } from 'next/navigation';
import { slugify } from '@/utils/slugify';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Category = {
  id: string;
  name: string;
  icon: string;
};

export const Aside = () => {
  const router = useRouter();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { posts, setPosts, getPostsByCategory, addPost, deletePost } = useDashboardStore();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newName, setNewName] = useState('');
  const [activeArticleMenu, setActiveArticleMenu] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      const supabase = createClientComponentClient();
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

    loadPosts();
  }, [setPosts]);

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
    
    const fileInput = document.getElementById('icon-upload') as HTMLInputElement;
    const iconFile = fileInput?.files?.[0];
    
    const success = await updateCategory(editingCategory.id, newName, iconFile);
    
    if (success) {
      setIsEditModalOpen(false);
      setEditingCategory(null);
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      await deleteCategory(categoryId);
      setActiveMenu(null);
    }
  };

  const handleAddPost = async (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newPost = await addPost(categoryId);
    if (newPost) {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        const categorySlug = slugify(category.name);
        const postSlug = slugify(newPost.title);
        
        router.push(`/dashboard/${categorySlug}/${postSlug}-${newPost.id}`);
        router.refresh();
      }
    }
  };

  const handleArticleMenuClick = (e: React.MouseEvent, articleId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveArticleMenu(activeArticleMenu === articleId ? null : articleId);
  };

  const handleDeleteArticle = async (e: React.MouseEvent, articleId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      await deletePost(articleId);
      setActiveArticleMenu(null);
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
              onClick={addCategory}
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
                      className={styles.addArticleButton}
                      onClick={(e) => handleAddPost(e, category.id)}
                      title="Agregar post"
                    >
                      <Plus size={16} />
                    </button>
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
                  {getPostsByCategory(category.id).map((post) => (
                    <div 
                      key={post.id} 
                      className={styles.articleItem}
                    >
                      <div 
                        className={styles.articleTitle}
                        onClick={() => {
                          const categorySlug = slugify(category.name);
                          const postSlug = slugify(post.title);
                          router.push(`/dashboard/${categorySlug}/${postSlug}-${post.id}`);
                          router.refresh();
                        }}
                      >
                        {post.title}
                      </div>
                      <div className={styles.articleActions}>
                        <button 
                          className={styles.menuButton}
                          onClick={(e) => handleArticleMenuClick(e, post.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        {activeArticleMenu === post.id && (
                          <div 
                            className={styles.dropdownMenu}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button 
                              className={`${styles.menuItem} ${styles.deleteButton}`}
                              onClick={(e) => handleDeleteArticle(e, post.id)}
                            >
                              Eliminar artículo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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