import type { Metadata } from "next";
import "./globals.css";
import { BackgroundCircle } from "@/components/ui/BackgroundCircle";
import { Header } from "@/components/ui/Header";
import { Navigation } from "@/components/ui/Header/Navigation";
import { Inter } from "@/utils/utils";
import clsx from "clsx";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sergio González Sánchez",
  description: "Frontend Developer",
  icons: {
    icon: "assets/icons/favicon.svg",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang='es'>
      <body
        className={clsx(
          Inter.className,
          "overflow-x-hidden min-h-screen w-full bg-background",
        )}
        suppressHydrationWarning={true}
      >
        <BackgroundCircle />
        <Header />
        <Navigation isMobile={true} />
        <main className='pb-20 md:pb-0 max-w-full overflow-x-hidden'>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
