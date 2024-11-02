"use client";

import { ProfessionalExperience } from "@/components/home";
import { Krypton } from "@/utils/utils";
import Link from "next/link";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <article className={styles.title}>
          <h2 className={styles.titleName}>Sergio González Sánchez</h2>
          <h1 className={styles.professionalTitle}>
            Frontend Developer | Frontend Architect
          </h1>
        </article>
        <Link href={"/contact"} className={styles.callToActionButton}>
          Contact
        </Link>
      </header>
      <article className={styles.skills}>
        <h2 className={`${styles.sectionTitle} ${Krypton.className}`}>
          Skills
        </h2>
        <ul className={styles.skillsList}>
          <li className={styles.skill}>HTML</li>
          <li className={styles.skill}>CSS</li>
          <li className={styles.skill}>JavaScript</li>
          <li className={styles.skill}>TypeScript</li>
          <li className={styles.skill}>React</li>
          <li className={styles.skill}>Next.js</li>
          <li className={styles.skill}>Node.js</li>
          <li className={styles.skill}>MySQL</li>
        </ul>
      </article>
      <article className={styles.about}>
        <h2 className={`${styles.sectionTitle} ${Krypton.className}`}>About</h2>
        <div className={styles.aboutDescription}>
          <p className={styles.paragraph}>
            Desarrollador Frontend con 3 años de experiencia, apasionado por
            crear productos escalables y fáciles de usar, utilizo las mejores
            prácticas de la industria con un enfoque en Micro-Frontend y
            Arquitectura Limpia. Poseo sólidas habilidades en React, Next.js,
            JavaScript, y TypeScript. también he trabajando constantemente con
            State Management como Redux y React Query.
          </p>
          <p className={styles.paragraph}>
            Poseo conocimientos en UX/UI, y he usado librerías de CSS como
            Material UI, Tailwind CSS y Bootstrap.Por ahora todos mis
            conocimientos los he conseguido con el tiempo trabajando
            especialmente en startups ubicadas en Estados Unidos en proyectos
            e-commerce y plataformas de administración. Actualmente trabajo en
            el desarrollo de una aplicación de Telecomunicaciones desde cero con
            React + Next + TypeScript.
          </p>
          <p className={styles.paragraph}>
            Por último tengo experiencia como docente en Análisis y Desarrollo
            de Software, lo que me ha permitido desarrollar fuertes habilidades
            para resolver problemas, comunicarme asertivamente y liderar
            proyectos de software.
          </p>
        </div>
      </article>
      <ProfessionalExperience />
    </main>
  );
};

export default Home;
