'use client';

import Neovim from '@assets/icons/neovim.svg';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

export const BlogCard = () => {
 return (
  <div className={styles.card}>
   <header className={styles.header}>
    <div>
     <Link className={styles.title} href='/blog/building-saas-product'>
      Building a SaaS product as a software developer
     </Link>
     <p className={styles.name}>By Sergio González Sánchez</p>
    </div>
    <Image className={styles.image} src={Neovim} alt='Neovim' />
   </header>
   <p className={styles.description}>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
    provident a, ipsa maiores deleniti consectetur nobis et eaque.
   </p>
   <dl className={styles.postInfo}>
    <div className={styles.cr}>
     <dt className={styles.dt}>Published 31st June, 2021</dt>
    </div>
    <div className={styles.cr}>
     <dt className={styles.dt}>Reading time 3 minute</dt>
    </div>
   </dl>
  </div>
 );
};
