import type { Metadata } from 'next';
import styles from './Blog.module.css';

export const metadata: Metadata = {
 title: 'Sergio González Sánchez',
 description: 'Frontend Developer',
 icons: {
  icon: 'assets/icons/favicon.svg',
 },
};

const LayoutArticleList = async ({ children }) => {
 return <main className={styles.main}>{children}</main>;
};

export default LayoutArticleList;
