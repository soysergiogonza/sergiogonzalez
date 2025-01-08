import type { ComponentType, SVGProps } from "react";

export interface NavigationProps {
  onNavigate?: () => void;
  className?: string;
  isScrolled?: boolean;
  isMobile?: boolean;
}

export interface NavItemProps {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}
