import type { NavItemProps } from "@/components/ui/Header/types";
import { FaEnvelope, FaHome, FaProjectDiagram } from "react-icons/fa";

export const pages: NavItemProps[] = [
  {
    label: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FaProjectDiagram,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: FaEnvelope,
  },
];
