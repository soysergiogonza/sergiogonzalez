import { FaHome, FaProjectDiagram, FaEnvelope, FaBlog } from 'react-icons/fa';
import type { NavItemProps } from "@/types/navigation";

export const pages: NavItemProps[] = [
  {
    label: "Home",
    href: "/",
    icon: FaHome
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FaProjectDiagram
  },
  {
    label: "Contact",
    href: "/contact",
    icon: FaEnvelope
  },
  {
    label: "Blog",
    href: "/blog",
    icon: FaBlog
  },
];
