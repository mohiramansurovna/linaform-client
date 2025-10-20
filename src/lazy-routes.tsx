import {lazy} from 'react';

export const RegisterPage=lazy(()=>import('@/pages/register'))
export const LoginPage = lazy(() => import('@/pages/login'));
export const DashboardPage=lazy(() => import('@/pages/dashboard'));
export const NotesPage=lazy(()=>import('@/pages/note'))
export const PostsPage=lazy(()=>import('@/pages/post'))
export const ResultsPage=lazy(()=>import('@/pages/results'))
export const SearchPage=lazy(()=>import('@/pages/results/ui/search'))
export const AboutPage=lazy(()=>import("@/pages/about"))