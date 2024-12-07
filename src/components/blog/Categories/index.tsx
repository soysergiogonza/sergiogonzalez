"use client";

import styles from '@/app/blog/Blog.module.css';
import Link from "next/link";
import { useCategoryStore } from '@/store/categoryStore';
import { useEffect } from 'react';

const renderIcon = (icon: any) => {
  if (!icon) return null;
  
  switch (icon.type) {
    case 'emoji':
      return <span>{icon.emoji}</span>;
    case 'file':
      return <img src={icon.file.url} alt="" className={styles.categoryIcon} />;
    case 'external':
      return <img src={icon.external.url} alt="" className={styles.categoryIcon} />;
    default:
      return null;
  }
};

export const Categories = () => {
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.routes}>
      {categories.map(({ category, position, icon, articles }) => (
        <div key={category} className={styles.categoryContainer}>
          <details name='category'>
            <summary className={styles.category}>
              {renderIcon(icon)}
              <span>{category}</span>
              {articles.length > 0 && (
                <span className={styles.articleCount}>
                  {articles.length}
                </span>
              )}
            </summary>
            <div className={styles.articles}>
              {articles.map((article) => (
                <Link 
                  key={article.title}
                  href={`/blog/${article.url}`}
                  className={styles.article}
                >
                  <span>{article.title}</span>
                </Link>
              ))}
            </div>
          </details>
        </div>
      ))}
    </section>
  );
};
