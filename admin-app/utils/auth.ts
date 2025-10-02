import { NextRouter } from 'next/router';

export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

export const redirectByAuth = (router: NextRouter) => {
  const token = isLoggedIn();
  if (token) router.replace('/dashboard');
  else router.replace('/login');
};

export const guardRoute = (router: NextRouter, publicPaths: string[] = ['/login']) => {
  const isPublic = publicPaths.includes(router.pathname);
  const token = isLoggedIn();
  if (!isPublic && !token) router.replace('/login');
  if (isPublic && token) router.replace('/dashboard');
};



















