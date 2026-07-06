import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

const GlobalFaq = lazy(() => import('../components/GlobalFaq').then((m) => ({ default: m.GlobalFaq })));

export function MainLayout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      <SiteHeader />
      <Outlet />
      <Suspense fallback={null}>
        <GlobalFaq />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
