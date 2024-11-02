import { usePathname } from "next/navigation";

export const useActiveRoute = (url: string) => {
  const pathname = usePathname();

  const isActive = url === "/" ? pathname === url : pathname.includes(url);

  return {
    isActive,
    activeClass: isActive ? "active" : "",
  };
};
