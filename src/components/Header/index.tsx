'use client';

import { NavItem } from '@/components/NavItem';
import { pages } from '@/data/routes';
import Logo from '@assets/icons/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import styles from './Header.module.css';

export const Header = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 useEffect(() => {
  const eventMediaQuery: MediaQueryList =
   window.matchMedia('(min-width: 768px)');

  const handleMediaQueryChange = (event: MediaQueryListEvent) => {
   if (event.matches) {
    setIsMenuOpen(true);
   } else {
    setIsMenuOpen(false);
   }
  };

  const setInitialMenuState = () => {
   if (eventMediaQuery.matches) {
    setIsMenuOpen(true);
   } else {
    setIsMenuOpen(false);
   }
  };

  setInitialMenuState();
  eventMediaQuery.addEventListener('change', handleMediaQueryChange);

  return () => {
   eventMediaQuery.removeEventListener('change', handleMediaQueryChange);
  };
 }, []);

 const handleOpenMenu = () => {
  setIsMenuOpen(!isMenuOpen);
  console.log(!isMenuOpen);
 };

 return (
  <header className={styles.header}>
   <picture className={styles.logo}>
    <Link href='/'>
     <Image src={Logo} alt='logo' width={100} height={100} priority />
    </Link>
   </picture>
   {isMenuOpen && (
    <nav className={styles.nav}>
     <ul className={styles.navList}>
      {pages.map(({ url, name }) => (
       <NavItem url={url} name={name} key={name} />
      ))}
     </ul>
    </nav>
   )}
   <FaBarsStaggered
    size='32px'
    className={styles.icon}
    onClick={handleOpenMenu}
   />
  </header>
 );
};
