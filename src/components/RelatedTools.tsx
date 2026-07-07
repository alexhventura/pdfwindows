import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { getToolPageByPath } from '../seo/toolCatalog';

interface RelatedToolsProps {
  paths: string[];
  title?: string;
}

export function RelatedTools({ paths, title }: RelatedToolsProps) {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();

  const tools = paths
    .map((path) => getToolPageByPath(path))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (tools.length === 0) return null;

  const heading = title ?? translations[lang].relatedToolsTitle;

  return (
    <section className="premium-surface" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="text-sm font-bold text-slate-900 mb-4">
        {heading}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => {
          const copy = tool.copy[lang];
          return (
            <li key={tool.path}>
              <Link
                to={lp(tool.path)}
                className="tool-card group flex items-start justify-between gap-2 p-3 md:p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 tool-card-title">{copy.h1}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{copy.intro}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-slate-300 group-hover:text-orange-500 transition-colors mt-0.5"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
