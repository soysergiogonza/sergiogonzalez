import { CSSProperties } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavItem.module.css';

interface Props {
 name: string;
 url: string;
 style?: CSSProperties;
}

export const NavItem = ({ name, url }: Props) => {
 const pathname = usePathname() === url;

 return (
  <Link href={url} className={`${styles.link} ${pathname && styles.active}`}>
   {name}
  </Link>
 );
};
