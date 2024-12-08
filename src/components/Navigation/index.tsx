"use client";

import { NavItem } from "../NavItem";
import styles from "./Navigation.module.css";
import { pages } from "@/data/routes";
import clsx from 'clsx';
import type { IconType } from 'react-icons';

interface NavigationProps {
  onNavigate?: () => void;
  className?: string;
  isScrolled?: boolean;
  isMobile?: boolean;
}

interface PageType {
  url: string;
  name: string;
  icon: IconType;
}

export const Navigation = ({ onNavigate, className, isScrolled, isMobile }: NavigationProps) => {
  return (
    <nav className={clsx(
      styles.nav,
      isMobile && styles['mobile-nav']
    )}>
      <ul className={styles.navList}>
        {(pages as PageType[]).map(({ url, name, icon }) => (
          <li key={name} onClick={onNavigate}>
            <NavItem url={url} name={name} Icon={icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
