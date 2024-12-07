import styles from './Blog.module.css';
import { Aside } from '@/components/blog/Aside';
import { getNotionContent } from '@/lib/notion/client';
import { NOTION_DATABASE_ID } from '@/environments/environments';
import { notion } from '@/lib/notion';

interface Article {
  title: string;
  created: string;
  tags: string[];
  category: string;
  date: string;
  language: string;
}

interface NotionCategory {
  category: any;
  position: any;
  icon: any;
  articles: Article[];
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: NotionCategory[] = [];

  if (NOTION_DATABASE_ID) {
    try {
      categories = await getNotionContent(NOTION_DATABASE_ID);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

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
