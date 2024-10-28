'use client';

import { Categories } from '@/components/blog';

import styles from './Aside.module.css';

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.sidebar}>
        {/* @ts-ignore*/}
        <div className={styles.contentWrapper}>
          <Categories />
        </div>
      </div>
    </aside>
  );
};
