import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../src/theme/theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { guardRoute } from '../utils/auth';
import RouteLoading from '../components/RouteLoading';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const publicPaths = ['/login'];
    const isPublic = publicPaths.includes(router.pathname);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!isPublic && !token) {
      setAllowed(false);
      setAuthChecked(true);
      router.replace('/login');
      return;
    }
    if (isPublic && token) {
      setAllowed(false);
      setAuthChecked(true);
      router.replace('/dashboard');
      return;
    }
    setAllowed(true);
    setAuthChecked(true);
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteLoading />
      {authChecked && allowed ? <Component {...pageProps} /> : null}
    </ThemeProvider>
  );
}


