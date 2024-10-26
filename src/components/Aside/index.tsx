'use client';

import { Categories } from '@/components/Categories';
import Logo from '@assets/icons/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Aside.module.css';

export const Aside = () => {

 return (
  <aside className={styles.aside}>
   <picture className={styles.logo}>
    <Link href='/'>
     <Image
      src={Logo}
      alt='logo'
      width={100}
      height={100}
      priority
      style={{
       width: 'auto',
       height: 'auto',
      }}
     />
    </Link>
   </picture>
   <div className={styles.sidebar}>
    {/* @ts-ignore*/}
   </div>
  </aside>
 );
};
