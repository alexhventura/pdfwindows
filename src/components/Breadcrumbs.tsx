import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const lp = useLocalizedPath();
  const { lang } = useLanguage();
  const homeLabel = translations[lang].homeLabel;

  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-slate-500 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center gap-1.5">
          <Link
            to={lp('/')}
            className="inline-flex items-center gap-1 hover:text-blue-700 transition-colors font-medium"
          >
            <Home size={13} aria-hidden />
            <span className="sr-only sm:not-sr-only">{homeLabel}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5 min-w-0">
              <ChevronRight size={12} className="shrink-0 text-slate-300" aria-hidden />
              {isLast || !item.path ? (
                <span className="font-semibold text-slate-700 truncate" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={lp(item.path)} className="hover:text-blue-700 transition-colors font-medium truncate">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
