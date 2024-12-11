'use client';

import { useState, useEffect } from 'react';

interface ImageSize {
  width: number;
  height: number;
}

export const useImageSize = (url: string): ImageSize | null => {
  const [size, setSize] = useState<ImageSize | null>(null);

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      setSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [url]);

  return size;
}; 