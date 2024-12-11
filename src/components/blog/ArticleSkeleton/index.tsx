import styles from './ArticleSkeleton.module.css';

export const ArticleSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      {/* Título */}
      <div className={styles.titleSkeleton} />
      
      {/* Metadata */}
      <div className={styles.metaSkeleton}>
        <div className={styles.dateSkeleton} />
        <div className={styles.authorSkeleton} />
      </div>
      
      {/* Contenido */}
      <div className={styles.contentSkeleton}>
        <div className={styles.paragraph} />
        <div className={styles.paragraph} />
        <div className={styles.paragraph} />
      </div>
    </div>
  );
}; 