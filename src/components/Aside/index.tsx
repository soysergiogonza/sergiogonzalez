'use client';

import { Categories } from '@/components/Categories';
import { useArticles } from '@/services/articles';
import { ArticleProps } from '@/types/blog';
import { useMemo } from 'react';
import styles from './Aside.module.css';

export const Aside = () => {
 const { data: articles = [] } = useArticles();

 const categories = useMemo(() => {
  return Array.from(
   new Set(
    articles.flatMap(({ frontMatter }: ArticleProps) => frontMatter.category),
   ),
  );
 }, [articles]);

 return (
  <div className={styles.MainContainer}>
   <div className={styles.sidebar}>
    <Categories categories={categories} articles={articles} />
   </div>
  </div>
 );
};
