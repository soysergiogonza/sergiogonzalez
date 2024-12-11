'use client';

import { useState } from 'react';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={styles.copyButton}
      title="Copiar código"
    >
      {copied ? (
        <span className={styles.copied}>¡Copiado!</span>
      ) : (
        <span>Copiar</span>
      )}
    </button>
  );
}; 