import type { NavItemProps } from "../navigation";

export interface HeaderProps {
  className?: string;
}

export interface LogoProps {
  width?: number;
  height?: number;
}

export interface NavigationComponentProps {
  pages: NavItemProps[];
}
