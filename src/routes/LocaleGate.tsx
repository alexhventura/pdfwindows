import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider, isValidLocale } from '../context/LanguageContext';
import { getInitialLocale } from '../i18n/language';
import { localizedPath } from '../i18n/routes';
import type { LanguageType } from '../types';

export function RootLocaleRedirect() {
  const location = useLocation();
  const locale = getInitialLocale();
  const target = localizedPath(locale, '/') + location.search + location.hash;
  return <Navigate to={target} replace />;
}

export function LocaleGate() {
  const { lang: param } = useParams<{ lang: string }>();
  const location = useLocation();

  if (!isValidLocale(param)) {
    const locale = getInitialLocale();
    const legacyPath = location.pathname + location.search + location.hash;
    return <Navigate to={localizedPath(locale, legacyPath) + location.search + location.hash} replace />;
  }

  return (
    <LanguageProvider localeFromRoute={param as LanguageType}>
      <Outlet />
    </LanguageProvider>
  );
}
