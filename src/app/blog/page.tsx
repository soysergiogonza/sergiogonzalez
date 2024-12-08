"use client";

import { Suspense } from 'react';
import styles from './Blog.module.css';
import { Category } from '@/types/notion';
import { getArticles } from '@/lib/api';

export default async function BlogPage() {
  const categories = await getArticles();
  const allArticles = categories.flatMap((category: Category) => category.articles);

  return (
    <div>
      <h1 className={styles.title}>Blog</h1>
      <Suspense fallback={<p>Cargando artículos...</p>}>
        <div className={styles.articlesGrid}>
          {categories.map((category) => (
            <div key={category.category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{category.category}</h2>
              <div className={styles.articlesGrid}>
                {category.articles.map((article) => (
                  <article key={article.id} className={styles.articleCard}>
                    {article.coverImage && (
                      <img 
                        src={article.coverImage}
                        alt={article.title}
                        className={styles.coverImage}
                      />
                    )}
                    <div className={styles.articleContent}>
                      <h2 className={styles.articleTitle}>{article.title}</h2>
                      {article.excerpt && (
                        <p className={styles.articleExcerpt}>{article.excerpt}</p>
                      )}
                      <div className={styles.articleMeta}>
                        <span className={styles.articleCategory}>{article.category}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
