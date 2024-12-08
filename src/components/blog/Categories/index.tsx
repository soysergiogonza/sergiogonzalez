"use client";

import styles from '@/app/blog/Blog.module.css';
import Link from "next/link";
import { useCategoryStore } from '@/store/categoryStore';
import { useEffect } from 'react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { Article } from '@/types/notion';

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
  const { 
    categories, 
    isLoading, 
    error, 
    fetchCategories,
    selectedArticle,
    setSelectedArticle 
  } = useCategoryStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const currentArticleUrl = pathname.replace('/blog/', '');
    setSelectedArticle(currentArticleUrl);
  }, [pathname, setSelectedArticle]);

  const getCurrentCategory = (articles: Article[]) => {
    return articles.some(article => `/blog/${article.url}` === pathname);
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLDetailsElement>, articles: Article[]) => {
    const details = e.currentTarget;
    
    if (!details.open && articles.length > 0) {
      const targetArticle = articles.find(article => article.url === selectedArticle) || articles[0];
      router.push(`/blog/${targetArticle.url}`);
    }
  };

  if (isLoading) return <div className={clsx(styles.loading)}>Cargando categorías...</div>;
  if (error) return <div className={clsx(styles.error)}>Error: {error}</div>;

  return (
    <section className={styles.routes}>
      {categories.map(({ category, icon, articles }) => {
        const isActive = getCurrentCategory(articles);
        return (
          <div 
            key={category} 
            className={clsx(styles.categoryContainer, {
              [styles.active]: isActive
            })}
          >
            <details 
              name='category' 
              open={isActive}
              onClick={(e) => handleCategoryClick(e, articles)}
            >
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
        );
      })}
    </section>
  );
};
