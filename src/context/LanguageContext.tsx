import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { LanguageType } from '../types';
import { getBrowserLanguage } from '../utils/translations';

interface LanguageContextValue {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageType>('en');

  useEffect(() => {
    setLang(getBrowserLanguage());
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
