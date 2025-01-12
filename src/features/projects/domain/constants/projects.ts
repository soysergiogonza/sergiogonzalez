export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo?: string;
  github?: string;
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'planned';
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Personal',
    description: 'Portfolio profesional construido con Next.js, TypeScript y Clean Architecture',
    image: '/assets/images/projects/portfolio.png',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/username/portfolio',
    demo: 'https://portfolio.dev',
    featured: true,
    status: 'completed'
  },
  // Añade más proyectos aquí...
]; 