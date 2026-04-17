import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

interface QueryClientProviderWrapperProps {
  children: React.ReactNode;
}

export const QueryClientProviderWrapper = ({ children }: QueryClientProviderWrapperProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
