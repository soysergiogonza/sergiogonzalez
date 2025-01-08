import { Krypton } from "@/utils";

export const About = () => {
  return (
    <article className='relative flex flex-col gap-8'>
      <div className='absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-secondary/5 rounded-3xl blur-3xl' />
      <h2 className={`text-3xl font-bold text-primary ${Krypton.className}`}>
        Sobre mí
      </h2>
      <div className='relative flex flex-col gap-6 text-base md:text-xl text-text-secondary'>
        <p className='text-pretty'>
          Desarrollador Frontend con 3 años de experiencia, apasionado por crear
          productos escalables y fáciles de usar, utilizo las mejores prácticas
          de la industria con un enfoque en Micro-Frontend y Arquitectura
          Limpia. Poseo sólidas habilidades en React, Next.js, JavaScript, y
          TypeScript. también he trabajando constantemente con State Management
          como Redux y React Query.
        </p>
        <p className='text-pretty'>
          Poseo conocimientos en UX/UI, y he usado librerías de CSS como
          Material UI, Tailwind CSS y Bootstrap. Por ahora todos mis
          conocimientos los he conseguido con el tiempo trabajando especialmente
          en startups ubicadas en Estados Unidos en proyectos e-commerce y
          plataformas de administración. Actualmente trabajo en el desarrollo de
          una aplicación de Telecomunicaciones desde cero con React + Next +
          TypeScript.
        </p>
        <p className='text-pretty'>
          Por último tengo experiencia como docente en Análisis y Desarrollo de
          Software, lo que me ha permitido desarrollar fuertes habilidades para
          resolver problemas, comunicarme asertivamente y liderar proyectos de
          software.
        </p>
      </div>
    </article>
  );
};
