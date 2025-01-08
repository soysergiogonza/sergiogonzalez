"use client";

import type { NavItemProps } from "@/components/ui/Header/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItem = ({ href, icon: Icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={clsx(
        // Estilos base
        "relative flex items-center gap-2 text-text-secondary transition-all duration-300",

        // Estilos desktop (>768px)
        "md:px-6 md:py-2 md:text-lg md:rounded-lg",
        "md:before:content-[''] md:before:absolute md:before:left-0 md:before:bottom-0 md:before:w-0.5 md:before:h-0",
        "md:after:content-[''] md:after:absolute md:after:left-0 md:after:bottom-0 md:after:w-0 md:after:h-0.5",
        "md:before:bg-gradient-to-b md:before:from-primary/80 md:before:to-primary/20",
        "md:after:bg-gradient-to-r md:after:from-primary/80 md:after:to-primary/20",
        "md:before:opacity-0 md:after:opacity-0",
        "md:before:transition-all md:after:transition-all",

        // Hover estados (desktop)
        "md:hover:text-primary md:hover:bg-primary/10",
        "md:hover:before:h-full md:hover:before:opacity-100",
        "md:hover:after:w-full md:hover:after:opacity-100",
        "md:[&>svg]:transition-transform md:hover:[&>svg]:translate-y-[-2px]",

        // Estilos móvil (<=768px)
        "max-md:flex-col max-md:p-2 max-md:text-xs max-md:rounded-xl",
        "max-md:bg-gradient-to-b max-md:from-transparent max-md:to-primary/5",
        "max-md:[&>svg]:text-2xl max-md:[&>svg]:mb-1",
        "max-md:hover:from-transparent max-md:hover:to-primary/10",

        // Estados activos
        isActive && [
          "text-primary",
          // Desktop activo
          "md:bg-primary/10",
          "md:before:h-full md:before:opacity-100",
          "md:after:w-full md:after:opacity-100",
          // Móvil activo
          "max-md:bg-gradient-to-b max-md:from-transparent max-md:to-primary/15",
          "max-md:border max-md:border-primary/20",
          "max-md:shadow-sm max-md:shadow-primary/10",
          "[&>svg]:text-primary",
        ],
      )}
    >
      <Icon className='text-xl md:text-2xl transition-transform' />
      <span>{label}</span>
    </Link>
  );
};
