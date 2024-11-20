import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { theme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
      //   staleTime: 1000 * 60 * 5 // 5 minutes
    },
  },
});

const Provider = ({ children }: IProvider) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Toaster position="bottom-right" />
          <HelmetProvider>{children}</HelmetProvider>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

interface IProvider {
  children: React.ReactNode;
}

export default Provider;
