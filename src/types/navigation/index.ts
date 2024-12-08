import type { CSSProperties } from "react";
import { IconType } from "react-icons";

export interface NavItemProps {
  label: string;
  href: string;
  icon: IconType;
}

export interface NavigateUtils {
  articlesInCategory: any;
  previousArticle: any;
  nextArticle: any;
}
