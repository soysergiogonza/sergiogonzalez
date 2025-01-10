"use client";
import { Aside } from "@/components/pages/blog/Aside";
import styles from "./Blog.module.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.blog}>
      <div className={styles.blogContainer}>
        <div className={styles.blogContent}>
          <Aside />
          <main className={styles.blogMain}>{children}</main>
        </div>
      </div>
    </div>
  );
}
