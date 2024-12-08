"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavItem.module.css";
import type { IconType } from 'react-icons';

interface NavItemProps {
  url: string;
  name: string;
  Icon: IconType;
}

export const NavItem = ({ url, name, Icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={`${styles.link} ${isActive ? styles.active : ""}`}
    >
      <Icon />
      <span>{name}</span>
    </Link>
  );
};
