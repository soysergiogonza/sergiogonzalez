"use client";

import { NavItem } from "../NavItem";
import styles from "./Navigation.module.css";
import { pages } from "@/data/routes";
import clsx from 'clsx';
import type { NavItemProps } from '@/types/navigation';

interface NavigationProps {
  onNavigate?: () => void;
  className?: string;
  isScrolled?: boolean;
  isMobile?: boolean;
}

export const Navigation = ({ onNavigate, className, isScrolled, isMobile }: NavigationProps) => {
  return (
    <nav className={clsx(
      styles.nav,
      isMobile && styles['mobile-nav']
    )}>
      <ul className={styles.navList}>
        {pages.map(({ href, label, icon }) => (
          <li key={label} onClick={onNavigate}>
            <NavItem href={href} label={label} icon={icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
