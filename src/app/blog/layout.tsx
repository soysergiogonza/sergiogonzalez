'use client';
import styles from './Blog.module.css';
import { Aside } from '@/components/blog/Aside';
import { useEffect } from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add(styles.blogBody);
    
    return () => {
      document.body.classList.remove(styles.blogBody);
    };
  }, []);

  return (
    <div className={styles.blog}>
      <div className={styles.blogContainer}>
        <div className={styles.blogContent}>
          <Aside />
          <main className={styles.blogMain}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
