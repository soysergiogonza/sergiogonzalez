import { IconType } from 'react-icons';
import { 
  FaReact, FaJs, FaNode, FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss 
} from 'react-icons/si';
import { v4 as uuid } from 'uuid';

export enum TechCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
}

export interface TechStack {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  category: TechCategory;
}

export const TECH_STACK: TechStack[] = [
  {
    id: uuid(),
    name: 'react',
    icon: FaReact,
    color: '#61DAFB',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'javascript',
    icon: FaJs,
    color: '#F7DF1E',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'typescript',
    icon: SiTypescript,
    color: '#3178C6',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'nextjs',
    icon: SiNextdotjs,
    color: '#ffffff',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'html',
    icon: FaHtml5,
    color: '#E34F26',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'css',
    icon: FaCss3Alt,
    color: '#1572B6',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'tailwind',
    icon: SiTailwindcss,
    color: '#06B6D4',
    category: TechCategory.FRONTEND,
  },
  {
    id: uuid(),
    name: 'node',
    icon: FaNode,
    color: '#339933',
    category: TechCategory.BACKEND,
  }
]; 