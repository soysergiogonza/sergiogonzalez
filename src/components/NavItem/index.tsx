import type { CSSProperties } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.css';

interface Props {
  name: string;
  url: string;
  style?: CSSProperties;
}

export const NavItem = ({ name, url }: Props) => {
  const pathname = usePathname();
  let isActive;

  url === '/'
    ? (isActive = pathname === url)
    : (isActive = pathname.includes(url));

  return (
    <Link href={url} className={`${styles.link} ${isActive && styles.active}`}>
      {name}
    </Link>
  );
};
