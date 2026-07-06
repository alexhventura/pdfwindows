import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { translations } from '../utils/translations';

interface ToolBackNavProps {
  className?: string;
}

/** Consistent back navigation to the main tool catalog */
export function ToolBackNav({ className = '' }: ToolBackNavProps) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const lp = useLocalizedPath();

  return (
    <Link to={lp('/')} className={`tool-back-nav ${className}`}>
      <ArrowLeft size={16} strokeWidth={2} />
      <span>{t.backToCatalog}</span>
    </Link>
  );
}
