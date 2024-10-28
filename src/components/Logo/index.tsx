import Image from 'next/image';
import Link from 'next/link';
import Logo from '@assets/icons/Logo.svg';
import styles from './Logo.module.css';

export const LogoComponent = () => {
  return (
    <picture className={styles.logo}>
      <Link href="/">
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          priority
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </Link>
    </picture>
  );
};
