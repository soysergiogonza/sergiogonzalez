"use client";

import { useBlogStore } from '@/store/blogStore';
import { useEffect } from 'react';
import styles from './Blog.module.css';

const BlogPage = () => {
  const { articles, isLoading, error, fetchArticles } = useBlogStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (isLoading) return <div className={styles.loading}>Cargando artículos...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.blogPage}>
      <h1 className={styles.title}>Blog</h1>
      <div className={styles.articlesGrid}>
        {articles.map((article) => (
          <article key={article.url} className={styles.articleCard}>
            {article.coverImage && (
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className={styles.articleImage}
              />
            )}
            <div className={styles.articleContent}>
              <h2 className={styles.articleTitle}>{article.title}</h2>
              {article.excerpt && (
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
              )}
              <div className={styles.articleMeta}>
                <span className={styles.articleDate}>{article.date}</span>
                <span className={styles.articleCategory}>{article.category}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
