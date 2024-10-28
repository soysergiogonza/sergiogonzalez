import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemProps } from '@/types/navigation';

import styles from './NavItem.module.css';
import { useActiveRoute } from '@/hooks/useActiveRoute';

export const NavItem = ({ name, url }: NavItemProps) => {
  const { isActive } = useActiveRoute(url);

  return (
    <Link href={url} className={`${styles.link} ${isActive && styles.active}`}>
      {name}
    </Link>
  );
};
