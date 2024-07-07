import { Provider } from '@/store';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import styles from './Blog.module.css';

export const metadata: Metadata = {
 title: 'Blog',
 description: 'Frontend Developer',
 icons: {
  icon: 'assets/icons/favicon.svg',
 },
};

const LayoutBlog = async ({
 children,
}: Readonly<{
 children: ReactNode;
}>) => {
 return (
  <Provider>
   <main className={styles.main}>{children}</main>
  </Provider>
 );
};

export default LayoutBlog;
