import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { TOOL_PAGES } from '../seo/toolCatalog';
import { LocaleGate, RootLocaleRedirect } from './LocaleGate';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const ToolsCatalogPage = lazy(() => import('../pages/ToolsCatalogPage').then((m) => ({ default: m.ToolsCatalogPage })));
const ConverterToolPage = lazy(() => import('../pages/ConverterToolPage').then((m) => ({ default: m.ConverterToolPage })));
const SuiteToolPage = lazy(() => import('../pages/SuiteToolPage').then((m) => ({ default: m.SuiteToolPage })));
const FullConverterPage = lazy(() => import('../pages/FullConverterPage').then((m) => ({ default: m.FullConverterPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center py-28">
      <div className="flex flex-col items-center gap-4 premium-surface !py-8 !px-10">
        <img src="/logo.png" alt="PDFWINDOWS" width={56} height={56} className="w-14 h-14 rounded-2xl animate-pulse shadow-md" />
        <p className="text-xs font-semibold text-slate-500">PDFWINDOWS</p>
      </div>
    </div>
  );
}

function LocalizedRedirect({ to, hash }: { to: string; hash?: string }) {
  const lp = useLocalizedPath();
  return <Navigate to={`${lp(to)}${hash ?? ''}`} replace />;
}

function LocalizedRoutes() {
  const routes = useMemo(
    () => [
      {
        path: '/',
        element: <RootLocaleRedirect />,
      },
      {
        path: '/:lang',
        element: <LocaleGate />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <HomePage /> },
              { path: 'ferramentas', element: <ToolsCatalogPage /> },
              { path: 'conversor', element: <FullConverterPage /> },
              {
                path: 'gerador-recibos',
                element: <LocalizedRedirect to="/gerador-relatorios" hash="#recibo" />,
              },
              {
                path: 'capturador-cores',
                element: <LocalizedRedirect to="/capturador-de-cores" />,
              },
              ...TOOL_PAGES.filter((p) => p.kind === 'converter').map((tool) => ({
                path: tool.path.replace(/^\//, ''),
                element: <ConverterToolPage />,
              })),
              ...TOOL_PAGES.filter((p) => p.kind === 'suite').map((tool) => ({
                path: tool.path.replace(/^\//, ''),
                element: <SuiteToolPage />,
              })),
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
      },
    ],
    []
  );

  return useRoutes(routes);
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <LocalizedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
