import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { LanguageType } from '../types';
import { getInitialLocale, isValidLocale, saveStoredLanguage } from '../i18n/language';
import { localizedPath, parseLocaleFromPath, stripLocalePrefix } from '../i18n/routes';

interface LanguageContextValue {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
  /** When rendered inside a localized route, sync from the URL param. */
  localeFromRoute?: LanguageType;
}

export function LanguageProvider({ children, localeFromRoute }: LanguageProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const localeFromPath = parseLocaleFromPath(location.pathname);
  const [lang, setLangState] = useState<LanguageType>(localeFromRoute ?? localeFromPath ?? getInitialLocale());

  useEffect(() => {
    const resolved = localeFromRoute ?? localeFromPath;
    if (resolved) setLangState(resolved);
  }, [localeFromRoute, localeFromPath]);

  const setLang = useCallback(
    (next: LanguageType) => {
      saveStoredLanguage(next);
      setLangState(next);
      const bare = stripLocalePrefix(location.pathname);
      const target = localizedPath(next, bare) + location.search + location.hash;
      if (target !== location.pathname + location.search + location.hash) {
        navigate(target, { replace: true });
      }
    },
    [location.hash, location.pathname, location.search, navigate]
  );

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}

export { isValidLocale };
