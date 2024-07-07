import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { NextFont } from 'next/dist/compiled/@next/font';
import { ReactNode } from 'react';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
 title: 'Sergio González Sánchez',
 description: 'Frontend Developer',
 icons: {
  icon: 'assets/icons/favicon.svg',
 },
};

const RootLayout = ({
 children,
}: Readonly<{
 children: ReactNode;
}>) => {
 return (
  <html lang='en'>
   <body className={inter.className}>
    <Header />
    {children}
   </body>
  </html>
 );
};

export default RootLayout;
