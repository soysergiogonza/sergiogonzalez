"use client";

import { Categories } from '@/components/blog/Categories';
import styles from '@/app/blog/Blog.module.css';

export const Aside = () => {
  return (
    <aside className={styles.blogAside}>
      <Categories />
    </aside>
  );
};