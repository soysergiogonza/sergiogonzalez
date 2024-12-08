import styles from './Blog.module.css';
import { Aside } from '@/components/blog/Aside';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
