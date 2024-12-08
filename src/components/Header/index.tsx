"use client";

import { FaBarsStaggered } from "react-icons/fa6";
import styles from "./Header.module.css";
import navStyles from "../Navigation/Navigation.module.css";
import { Navigation } from "@/components/Navigation";
import { LogoComponent } from "@/components/Logo";
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={clsx(
        styles.header,
        isScrolled && styles.headerScrolled
      )}
    >
      <div className={styles.logo}>
        <LogoComponent />
      </div>
      <div className={styles.navigation}>
        <Navigation isScrolled={isScrolled} />
      </div>
    </header>
  );
};
