'use client';

import { Header } from '@/components/Header';
import { useSearchParams } from 'next/navigation';

export const ClientLayout = ({ children }) => {
 const searchParams = useSearchParams();
 const showHeader = searchParams.get('blog') === 'false';

 return <>{children}</>;
};
