"use client";

import styles from '@/app/blog/Blog.module.css';
import Link from "next/link";
import { useCategoryStore } from '@/store/categoryStore';
import { useEffect } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) return <div className={clsx(styles.loading)}>Cargando categorías...</div>;
  if (error) return <div className={clsx(styles.error)}>Error: {error}</div>;

  return (
    <section className={styles.routes}>
      {categories.map(({ category, icon, articles }) => (
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
                  className={clsx(styles.article, {
                    [styles.active]: pathname === `/blog/${article.url}`
                  })}
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
