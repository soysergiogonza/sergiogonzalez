import { FaHome, FaProjectDiagram, FaEnvelope, FaBlog } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { Page } from "@/types";

export const pages: Page[] = [
  {
    name: "Home",
    url: "/",
    icon: FaHome
  },
  {
    name: "Projects",
    url: "/projects",
    icon: FaProjectDiagram
  },
  {
    name: "Contact",
    url: "/contact",
    icon: FaEnvelope
  },
  {
    name: "Blog",
    url: "/blog",
    icon: FaBlog
  },
];
