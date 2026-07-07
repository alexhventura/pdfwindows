import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { useNearViewport } from '../hooks/useNearViewport';

const GlobalFaq = lazy(() => import('../components/GlobalFaq').then((m) => ({ default: m.GlobalFaq })));

function DeferredGlobalFaq() {
  const { ref, isNear } = useNearViewport('240px');

  return (
    <div ref={ref}>
      {isNear ? (
        <Suspense fallback={null}>
          <GlobalFaq />
        </Suspense>
      ) : null}
    </div>
  );
}

export function MainLayout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      <SiteHeader />
      <main id="main-content" className="flex-1 flex flex-col">
        <Outlet />
        <DeferredGlobalFaq />
      </main>
      <SiteFooter />
    </div>
  );
}
