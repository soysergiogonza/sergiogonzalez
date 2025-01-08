import { IconProps } from "@/types/blog";
import clsx from "clsx";

export const Icon = ({ icon, size, className }: IconProps) => {
  return (
    <picture
      className={clsx(className)}
      style={{ display: "block", width: size, height: size }}
    >
      <img
        src={icon}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </picture>
  );
};
