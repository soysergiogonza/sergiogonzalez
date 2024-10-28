import { useEffect, useState } from 'react';

export const useMenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const eventMediaQuery: MediaQueryList =
      window.matchMedia('(min-width: 768px)');

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMenuOpen(event.matches);
    };

    const setInitialMenuState = () => {
      setIsMenuOpen(eventMediaQuery.matches);
    };

    setInitialMenuState();
    eventMediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      eventMediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return {
    isMenuOpen,
    toggleMenu,
  };
};
