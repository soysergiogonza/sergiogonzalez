import { NavItem } from "@/components/NavItem";
import { pages } from "@/data/routes";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {pages.map(({ url, name }) => (
          <NavItem url={url} name={name} key={name} />
        ))}
      </ul>
    </nav>
  );
};
