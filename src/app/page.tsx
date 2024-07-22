import { Education, ProfessionalExperience } from '@/components/home';
import { Krypton } from '@/utils/utils';
import Link from 'next/link';
import styles from './Home.module.css';

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
    <Link href={'/contact'} className={styles.callToActionButton}>
     Contact
    </Link>
   </header>
   <article className={styles.skills}>
    <h2 className={`${styles.sectionTitle} ${Krypton.className}`}>Skills</h2>
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
    <p className={styles.aboutDescription}>
     Frontend developer with 2+ years of experience, specialized in React,
     Next.js, JavaScript and TypeScript. I work with API integration using Rest
     and Axios, state management with Redux and React-Query. I apply unit
     testing with Playwright and with a focus on a clean software architecture.
     Currently, I am constantly improving my skills studying Technology in
     Software Analysis and Development at SENA with a focus on Frontend
     Architecture. I am passionate about teaching and constant development in
     IT.
    </p>
   </article>
   <ProfessionalExperience />
   {/*<Education />*/}
  </main>
 );
};

export default Home;
