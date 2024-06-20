import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
 title: 'Sergio González Sánchez',
 description: 'Frontend Developer',
 icons: {
  icon: 'assets/icons/favicon.svg',
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: ReactNode;
}>) {
 return (
  <html lang='en'>
   <body className={inter.className}>
    <Header />
    {children}
   </body>
  </html>
 );
}
