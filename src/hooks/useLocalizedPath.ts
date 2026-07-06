import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { localizedPath } from '../i18n/routes';

export function useLocalizedPath() {
  const { lang } = useLanguage();

  return useCallback((path: string = '/') => localizedPath(lang, path), [lang]);
}
