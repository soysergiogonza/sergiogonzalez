'use client';

import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.errorContainer}>
      <h2>Algo salió mal al cargar el artículo</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className={styles.retryButton}
      >
        Intentar de nuevo
      </button>
    </div>
  );
} 