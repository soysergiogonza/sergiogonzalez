import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Inter } from "@/utils/utils";
import type { ReactNode } from "react";
import styles from "@/components/Header/Header.module.css";
import { Navigation } from "@/components/Navigation";

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
      <body className={Inter.className} suppressHydrationWarning={true}>
          <Header />
          <Navigation isMobile={true} />
          <main className="content">
            {children}
          </main>
      </body>
    </html>
  );
};

export default RootLayout;
