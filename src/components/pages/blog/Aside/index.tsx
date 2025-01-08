"use client";

import styles from "@/app/blog/Blog.module.css";
import { Categories } from "@/components/pages/blog/Categories";

export const Aside = () => {
  return (
    <aside className={styles.blogAside}>
      <Categories />
    </aside>
  );
};
