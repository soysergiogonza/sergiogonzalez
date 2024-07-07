'use client';
import { getQueryClient } from '@/store/QueryClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

export const Provider = ({ children }: { children: ReactNode }) => {
 const queryClient: QueryClient = getQueryClient();

 return (
  <QueryClientProvider client={queryClient}>
   {children}
   <ReactQueryDevtools />
  </QueryClientProvider>
 );
};
