'use client';

import { FaBarsStaggered } from 'react-icons/fa6';
import styles from './Header.module.css';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { Navigation } from '@/components/Navigation';
import { LogoComponent } from '@/components/Logo';

export const Header = () => {
  const { isMenuOpen, toggleMenu } = useMenuToggle();

  return (
    <header className={styles.header}>
      <LogoComponent />
      {isMenuOpen && <Navigation />}
      <FaBarsStaggered
        size="32px"
        className={styles.icon}
        onClick={toggleMenu}
      />
    </header>
  );
};
