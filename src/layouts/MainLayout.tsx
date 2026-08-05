import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { RouteErrorBoundary } from '../components/RouteErrorBoundary';
import { RouteFallback } from '../components/RouteFallback';
import { useNearViewport } from '../hooks/useNearViewport';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

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

function OutletWithBoundary() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <RouteErrorBoundary
      resetKey={pathname}
      labels={{
        title: t.routeErrorTitle,
        description: t.routeErrorDescription,
        retry: t.routeErrorRetry,
      }}
    >
      {/* Keyed Suspense so each navigation shows a real loading UI instead of a blank transition. */}
      <Suspense fallback={<RouteFallback message={t.openingWorkspace} />} key={pathname}>
        <Outlet />
      </Suspense>
    </RouteErrorBoundary>
  );
}

export function MainLayout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      <SiteHeader />
      <main id="main-content" className="flex-1 flex flex-col">
        <OutletWithBoundary />
        <DeferredGlobalFaq />
      </main>
      <SiteFooter />
    </div>
  );
}
