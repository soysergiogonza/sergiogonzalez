"use client";

import { Navigation } from "@/components/ui/Header/Navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { LogoComponent } from "../Logo";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        // Layout base
        "flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50",
        // Estilos base
        "h-16 px-4 text-text-primary bg-background transition-all duration-300",
        // Responsive
        "md:h-20 md:px-8 lg:px-16",
        // Mobile
        "max-md:hidden",
        // Scrolled state
        isScrolled && "md:bg-transparent",
        // Clases condicionales para el estado scrolled
        isScrolled && "md:[&_.logo]:opacity-0 md:[&_.logo]:translate-x-[-20px]",
        isScrolled &&
          "md:[&_.navigation]:absolute md:[&_.navigation]:left-1/2 md:[&_.navigation]:-translate-x-1/2",
        isScrolled &&
          "md:[&_.navList]:bg-white md:[&_.navList]:scale-150 md:[&_.navList]:shadow-lg",
      )}
    >
      <div className='logo transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) opacity-100 translate-x-0'>
        <LogoComponent />
      </div>
      <div className='navigation flex items-center ml-auto transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)'>
        <Navigation isScrolled={isScrolled} />
      </div>
    </header>
  );
};
