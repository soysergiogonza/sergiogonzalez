"use client";

import { FaBarsStaggered } from "react-icons/fa6";
import styles from "./Header.module.css";
import { Navigation } from "@/components/Navigation";
import { LogoComponent } from "@/components/Logo";
import { useUIStore } from '@/store/uiStore';

export const Header = () => {
  const { isMenuOpen, toggleMenu } = useUIStore();

  return (
    <header className={styles.header}>
      <LogoComponent />
      {isMenuOpen && <Navigation />}
      <FaBarsStaggered
        size='32px'
        className={styles.icon}
        onClick={toggleMenu}
      />
    </header>
  );
};
