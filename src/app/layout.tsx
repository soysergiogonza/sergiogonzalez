import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Inter } from '@/utils/utils';
import { ReactNode } from 'react';

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
  <html lang='es'>
   <body className={Inter.className} suppressHydrationWarning={true}>
    <Header />
    <main>{children}</main>
   </body>
  </html>
 );
};

export default RootLayout;
