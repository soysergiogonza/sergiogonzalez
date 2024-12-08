"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavItem.module.css";
import clsx from "clsx";
import type { NavItemProps } from "@/types/navigation";

export const NavItem = ({ href, icon: Icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || 
    (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={clsx(styles.link, isActive && styles.active)}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
};