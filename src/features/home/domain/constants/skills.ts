import { IconType } from 'react-icons';
import { 
  FaReact, FaJs, FaNode, FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss 
} from 'react-icons/si';

export enum TechCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  TOOLS = 'Tools'
}

export enum TechLevel {
  BASIC = 'Básico',
  INTERMEDIATE = 'Intermedio',
  ADVANCED = 'Avanzado'
}

export interface TechStack {
  id: string;
  icon: IconType;
  color: string;
  category: TechCategory;
  level: TechLevel;
}

export const TECH_STACK: TechStack[] = [
  {
    id: 'react',
    icon: FaReact,
    color: '#61DAFB',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'javascript',
    icon: FaJs,
    color: '#F7DF1E',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'typescript',
    icon: SiTypescript,
    color: '#3178C6',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'nextjs',
    icon: SiNextdotjs,
    color: '#ffffff',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'html',
    icon: FaHtml5,
    color: '#E34F26',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'css',
    icon: FaCss3Alt,
    color: '#1572B6',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'tailwind',
    icon: SiTailwindcss,
    color: '#06B6D4',
    category: TechCategory.FRONTEND,
    level: TechLevel.ADVANCED
  },
  {
    id: 'node',
    icon: FaNode,
    color: '#339933',
    category: TechCategory.BACKEND,
    level: TechLevel.ADVANCED
  }
]; 