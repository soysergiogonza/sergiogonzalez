import { experience } from '@/data/home/experience';
import { Krypton } from '@/utils/utils';
import styles from './Education.module.css';

export const Education = () => {
 return (
  <article>
   <h2 className={`${styles.sectionTitle} ${Krypton.className}`}>Education</h2>
   <ul className={styles.timeline}>
    {experience.map((project, index) => (
     <li className={styles.timelineEvent}>
      <label className={styles.timelineEventIcon}></label>
      <div className={styles.timelineEventCopy}>
       <p className={styles.timelineEventThumbnail}>{project.date}</p>
       <h4 className={styles.companyName}>{project.companyName}</h4>
       <div className={styles.headExperience}>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.responsibilities}>👨Responsabilidades</span>
       </div>
       <ol className={styles.responsibilitiesList}>
        {project.responsibilities.map((responsibility) => (
         <li className={styles.responsibility}>{responsibility}</li>
        ))}
       </ol>
      </div>
     </li>
    ))}
   </ul>
  </article>
 );
};
