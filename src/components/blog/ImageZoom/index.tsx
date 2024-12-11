'use client';

import { useState, useEffect } from 'react';
import styles from './ImageZoom.module.css';
import { IoMdSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import clsx from 'clsx';

interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
}

export const ImageZoom = ({ src, alt, caption }: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        handleClose();
      }
    };

    if (isZoomed) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isZoomed]);

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsZoomed(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <figure className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <img 
          src={src} 
          alt={alt} 
          className={styles.image}
        />
        <button 
          className={styles.zoomButton}
          onClick={handleZoom}
          aria-label="Zoom imagen"
        >
          <IoMdSearch />
        </button>
      </div>
      {caption && (
        <figcaption className={styles.imageCaption}>
          {caption}
        </figcaption>
      )}
      
      <div 
        className={clsx(styles.modal, {
          [styles.active]: isZoomed
        })}
        onClick={handleModalClick}
      >
        <img
          src={src}
          alt={alt}
          className={styles.zoomedImage}
          onClick={(e) => e.stopPropagation()}
        />
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar zoom"
        >
          <MdClose size={24} />
        </button>
      </div>
    </figure>
  );
}; 