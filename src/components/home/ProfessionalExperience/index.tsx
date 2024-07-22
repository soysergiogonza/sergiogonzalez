import { experience } from '@/data/home/experience';
import { Krypton } from '@/utils/utils';
import styles from './ProfessionalExperience.module.css';

export const ProfessionalExperience = () => {
 return (
  <article>
   <h2 className={`${styles.sectionTitle} ${Krypton.className}`}>
    Professional Experience
   </h2>
   <ul className={styles.timeline}>
    {experience.map((project, index) => (
     <li className={styles.timelineEvent}>
      <picture className={styles.companyImage}>
       <img src={project.image} alt='' className={styles.image} />
      </picture>
      <div className={styles.timelineEventCopy}>
       <p className={styles.titleExperienceItem}>{project.title}</p>
       <div className={styles.bodyExperienceItem}>
        <span className={styles.companyDetails}>
         {project.companyName} · {project.scheduleType}
        </span>
        <span className={styles.date}>
         {project.startDate} - {project.endDate || 'Present'}
        </span>
       </div>
      </div>
     </li>
    ))}
   </ul>
  </article>
 );
};
