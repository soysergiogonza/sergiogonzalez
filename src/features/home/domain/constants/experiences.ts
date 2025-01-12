export enum CompanyType {
  STARTUP = 'Startup',
  ENTERPRISE = 'Enterprise',
  FREELANCE = 'Freelance',
  EDUCATION = 'Education',
  CONTRACT = 'Contract',
  TEMPORAL = 'Temporal'
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  type: CompanyType;
  location: string;
  link: string;
  startDate: string;
  endDate?: string;
  duration: string;
  logo: string;
  description: string[];
  skills: string[];
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "job1",
    title: "Profesor en Desarrollo Frontend",
    company: "Politécnico ASYS",
    type: CompanyType.TEMPORAL,
    location: "Rionegro, Antioquia, Colombia",
    link: "https://asys.edu.co/",
    startDate: "Febrero 2024",
    endDate: "Presente",
    duration: "11 meses",
    logo: "/assets/images/asys.jpeg",
    description: [
      "Diseño e implementación de currículum para desarrollo web frontend siguiendo estándares del SENA",
      "Instrucción en tecnologías fundamentales: HTML, CSS, JavaScript y control de versiones",
      "Mentoría en lógica de programación y principios de diseño UI/UX",
      "Evaluación continua del progreso y adaptación de materiales según necesidades del estudiante",
      "Implementación de proyectos prácticos para fortalecer el aprendizaje hands-on",
      "Desarrollo de habilidades blandas y pensamiento lógico en los estudiantes"
    ],
    skills: [
      "Frontend Development",
      "HTML",
      "CSS",
      "JavaScript",
      "UI/UX",
      "Git",
      "Teaching",
      "Mentoring"
    ]
  },
  {
    id: "job2",
    title: "Profesor en Desarrollo Frontend",
    company: "Centro de Sistemas de Antioquia - CENSA",
    type: CompanyType.TEMPORAL,
    location: "Rionegro, Antioquia, Colombia",
    link: "https://www.censa.edu.co/",
    startDate: "Noviembre 2024",
    endDate: "Diciembre 2024",
    duration: "1 mes",
    logo: "/assets/images/censa.jpeg",
    description: [
      "Diseño e implementación de un programa de estudios enfocado en tecnologías web modernas, incluyendo HTML, CSS y JavaScript.",
      "Capacitación práctica en el desarrollo de interfaces de usuario y experiencia de usuario (UI/UX).",
      "Guía en la implementación de mejores prácticas de desarrollo y metodologías ágiles.",
      "Mentoría personalizada para ayudar a los estudiantes a desarrollar proyectos web prácticos.",
      "Evaluación continua del progreso de los estudiantes y adaptación del material didáctico según sus necesidades.",
      "Introducción a herramientas modernas de desarrollo como Git, GitHub y editores de código."
    ],
    skills: [
      "Frontend Development",
      "HTML",
      "CSS",
      "JavaScript",
      "UI/UX",
      "Git"
    ]
  },
  {
    id: "job3",
    title: "Frontend Developer Lead",
    company: "Wyncell",
    type: CompanyType.ENTERPRISE,
    location: "Miami, Florida, United States",
    link: "https://wyncell.com/",
    startDate: "Junio 2024",
    endDate: "Agosto 2024",
    duration: "3 meses",
    logo: "/assets/images/wyncell.jpeg",
    description: [
      "Lideré el desarrollo frontend de la plataforma de telecomunicaciones desde cero utilizando React, Next.js y Tailwind",
      "Implementé una arquitectura limpia y escalable, estableciendo patrones y mejores prácticas para el equipo",
      "Desarrollé la internacionalización completa del sitio utilizando i18n para Next.js",
      "Colaboré con equipos de backend y DevOps para la integración y despliegue en AWS",
      "Gestioné el equipo de desarrollo frontend, incluyendo code reviews y mentoría",
      "Optimicé el rendimiento del sitio y aseguré las mejores prácticas de SEO para Next.js"
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Clean Architecture",
      "AWS",
      "i18n",
      "Team Leadership"
    ]
  },
  {
    id: "job4",
    title: "Frontend Developer",
    company: "Ark 305",
    type: CompanyType.FREELANCE,
    location: "Colombia - Remote",
    link: "https://ark305.com/",
    startDate: "Abril 2024",
    endDate: "Junio 2024",
    duration: "3 meses",
    logo: "/assets/images/ark.jpg",
    description: [
      "Asesorar y guiar a estudiantes de Desarrollo de Software en sus proyectos.",
      "Ofrecer servicios de asesoría individual y grupal para abordar necesidades específicas."
    ],
    skills: [
      "TypeScript",
      "Front-End Development"
    ]
  },
  {
    id: "job5",
    title: "React Frontend Developer",
    company: "EvolutionCode",
    type: CompanyType.ENTERPRISE,
    location: "Miami, Florida, United States",
    link: "https://evolutioncode.com/",
    startDate: "Septiembre 2022",
    endDate: "Septiembre 2023",
    duration: "1 año 1 mes",
    logo: "/assets/images/evolutioncode.jpeg",
    description: [
      "Crear componentes y funcionalidades según los diseños y requerimientos del cliente.",
      "Colaborar con el equipo de Desarrollo Backend y participar en los daily para garantizar que la aplicación cumpla con los requisitos y expectativas del cliente."
    ],
    skills: [
      "React",
      "TypeScript",
      "Material UI"
    ]
  },
  {
    id: "job6",
    title: "Profesor Desarrollo Web",
    company: "Cetasdi",
    type: CompanyType.CONTRACT,
    location: "Rionegro, Antioquia, Colombia",
    link: "https://cetasdi.edu.co/",
    startDate: "Noviembre 2020",
    endDate: "Noviembre 2021",
    duration: "1 año 1 mes",
    logo: "/assets/images/cetasdi.jpg",
    description: [
      "Guiar a los estudiantes en el aprendizaje de las habilidades necesarias para desarrollar una aplicación web y desplegarla.",
      "Ayudar a mis estudiantes a desarrollar su sentido de la lógica y diseño."
    ],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Git"
    ]
  }
]; 