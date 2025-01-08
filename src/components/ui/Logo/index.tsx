import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/icons/Logo.svg";

export const LogoComponent = () => {
  return (
    <div className="flex justify-center items-center md:justify-start">
      <Link href='/'>
        <Image
          src={Logo}
          alt='logo'
          width={100}
          height={100}
          priority
          className="w-16 h-16"
        />
      </Link>
    </div>
  );
};
