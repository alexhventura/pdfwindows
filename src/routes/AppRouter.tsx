import { lazy, useMemo } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import type { LanguageType } from '../types';
import { MainLayout } from '../layouts/MainLayout';
import { TOOL_PAGES } from '../seo/toolCatalog';
import {
  getLegacySlugSegments,
  getLocalizedSlug,
} from '../seo/pathLocalization';
import { LocaleGate, RootLocaleRedirect } from './LocaleGate';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const ToolsCatalogPage = lazy(() => import('../pages/ToolsCatalogPage').then((m) => ({ default: m.ToolsCatalogPage })));
const ConverterToolPage = lazy(() => import('../pages/ConverterToolPage').then((m) => ({ default: m.ConverterToolPage })));
const SuiteToolPage = lazy(() => import('../pages/SuiteToolPage').then((m) => ({ default: m.SuiteToolPage })));
const FullConverterPage = lazy(() => import('../pages/FullConverterPage').then((m) => ({ default: m.FullConverterPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const PrivacyPage = lazy(() => import('../pages/LegalPages').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('../pages/LegalPages').then((m) => ({ default: m.TermsPage })));

const LOCALES: LanguageType[] = ['en', 'pt', 'es'];

function LocalizedRedirect({ to, hash }: { to: string; hash?: string }) {
  const lp = useLocalizedPath();
  return <Navigate to={`${lp(to)}${hash ?? ''}`} replace />;
}

function buildLocalizedToolRoutes() {
  const segmentToKind = new Map<string, 'converter' | 'suite'>();

  for (const tool of TOOL_PAGES) {
    if (tool.kind !== 'converter' && tool.kind !== 'suite') continue;
    for (const lang of LOCALES) {
      const segment = getLocalizedSlug(lang, tool.path);
      if (segment) segmentToKind.set(segment, tool.kind);
    }
  }

  const converterSegments = [...segmentToKind.entries()]
    .filter(([, kind]) => kind === 'converter')
    .map(([segment]) => segment);

  const suiteSegments = [...segmentToKind.entries()]
    .filter(([, kind]) => kind === 'suite')
    .map(([segment]) => segment);

  return {
    converterRoutes: converterSegments.map((path) => ({
      path,
      element: <ConverterToolPage />,
    })),
    suiteRoutes: suiteSegments.map((path) => ({
      path,
      element: <SuiteToolPage />,
    })),
  };
}

function LocalizedRoutes() {
  const { converterRoutes, suiteRoutes } = useMemo(() => buildLocalizedToolRoutes(), []);

  const catalogSegments = useMemo(
    () => [...new Set(LOCALES.map((lang) => getLocalizedSlug(lang, '/ferramentas')).filter(Boolean))],
    []
  );

  const converterSegments = useMemo(
    () => [...new Set(LOCALES.map((lang) => getLocalizedSlug(lang, '/conversor')).filter(Boolean))],
    []
  );

  const privacySegments = useMemo(
    () => [...new Set(LOCALES.map((lang) => getLocalizedSlug(lang, '/privacy')).filter(Boolean))],
    []
  );

  const termsSegments = useMemo(
    () => [...new Set(LOCALES.map((lang) => getLocalizedSlug(lang, '/terms')).filter(Boolean))],
    []
  );

  const legacyRedirects = useMemo(
    () =>
      getLegacySlugSegments().map(({ segment, canonical }) => ({
        path: segment,
        element: <LocalizedRedirect to={canonical} />,
      })),
    []
  );

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
              ...catalogSegments.map((path) => ({
                path,
                element: <ToolsCatalogPage />,
              })),
              ...converterSegments.map((path) => ({
                path,
                element: <FullConverterPage />,
              })),
              ...privacySegments.map((path) => ({
                path,
                element: <PrivacyPage />,
              })),
              ...termsSegments.map((path) => ({
                path,
                element: <TermsPage />,
              })),
              {
                path: 'gerador-recibos',
                element: <LocalizedRedirect to="/gerador-relatorios" hash="#recibo" />,
              },
              {
                path: 'capturador-cores',
                element: <LocalizedRedirect to="/capturador-de-cores" />,
              },
              ...legacyRedirects,
              ...converterRoutes,
              ...suiteRoutes,
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
      },
    ],
    [catalogSegments, converterSegments, converterRoutes, legacyRedirects, privacySegments, suiteRoutes, termsSegments]
  );

  return useRoutes(routes);
}

export default function App() {
  return (
    <BrowserRouter>
      <LocalizedRoutes />
    </BrowserRouter>
  );
}
