import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider, isValidLocale } from '../context/LanguageContext';
import { localizedPath } from '../i18n/routes';
import type { LanguageType } from '../types';

/**
 * Bare `/` should HTTP-301 to `/en` via Vercel. This client fallback keeps SPA
 * navigations consistent with the official English home canonical.
 */
export function RootLocaleRedirect() {
  const location = useLocation();
  const target = localizedPath('en', '/') + location.search + location.hash;
  return <Navigate to={target} replace />;
}

export function LocaleGate() {
  const { lang: param } = useParams<{ lang: string }>();
  const location = useLocation();

  if (!isValidLocale(param)) {
    const locale: LanguageType = 'en';
    const legacyPath = location.pathname + location.search + location.hash;
    return <Navigate to={localizedPath(locale, legacyPath) + location.search + location.hash} replace />;
  }

  return (
    <LanguageProvider localeFromRoute={param as LanguageType}>
      <Outlet />
    </LanguageProvider>
  );
}
