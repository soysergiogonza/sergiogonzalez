export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo: string;
  github?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  featured?: boolean;
} 