'use client';

import { Categories } from '@/components/Categories';
import { useArticles } from '@/services/articles';
import { ArticleProps } from '@/types/blog';
import Logo from '@assets/icons/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
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
  <aside className={styles.aside}>
   <picture className={styles.logo}>
    <Link href='/'>
     <Image src={Logo} alt='logo' width={100} height={100} priority />
    </Link>
   </picture>
   <div className={styles.separator}></div>
   <div className={styles.sidebar}>
    <Categories categories={categories} articles={articles} />
   </div>
  </aside>
 );
};
