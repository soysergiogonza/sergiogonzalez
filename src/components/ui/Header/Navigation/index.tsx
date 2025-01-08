"use client";

import { pages } from "@/components/ui/Header/routes";
import type { NavigationProps } from "@/components/ui/Header/types";
import clsx from "clsx";
import { NavItem } from "../NavItem";

export const Navigation = ({
  onNavigate,
  className,
  isScrolled,
  isMobile,
}: NavigationProps) => {
  return (
    <nav
      className={clsx(
        // Estilos base
        "flex justify-end w-full",
        // Variante móvil
        isMobile
          ? [
              "fixed bottom-0 left-0 right-0 bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.05)]",
              "p-3 z-50 md:hidden",
              "overflow-x-hidden w-screen",
            ]
          : ["max-md:hidden"],
        className,
      )}
    >
      <ul
        className={clsx(
          // Estilos base
          "flex items-center w-full list-none",
          // Desktop
          "md:p-2 md:m-0 md:rounded-3xl md:bg-background-elevated",
          isScrolled && "md:bg-white md:scale-120 md:shadow-lg",
          // Móvil
          "max-md:justify-around max-md:bg-transparent max-md:p-0 max-md:m-0 max-md:gap-0",
          "max-md:[&>li]:flex-1 max-md:[&>li]:text-center",
          "max-w-screen-xl mx-auto px-4",
        )}
      >
        {pages.map(({ href, label, icon }) => (
          <li key={label} onClick={onNavigate}>
            <NavItem href={href} label={label} icon={icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
