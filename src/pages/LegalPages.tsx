import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { translations } from '../utils/translations';
import { SEO } from '../seo/SEO';
import { getPageCopy } from '../seo/content/getPageCopy';
import { ToolBackNav } from '../components/ToolBackNav';

type LegalKind = 'privacy' | 'terms';

const PATH_BY_KIND: Record<LegalKind, '/privacy' | '/terms'> = {
  privacy: '/privacy',
  terms: '/terms',
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const t = translations[lang];
  const path = PATH_BY_KIND[kind];
  const copy = getPageCopy(path, lang);
  const paragraphs = kind === 'privacy' ? t.privacyBody : t.termsBody;
  const otherKind: LegalKind = kind === 'privacy' ? 'terms' : 'privacy';
  const otherLabel = kind === 'privacy' ? t.footerTerms : t.footerPrivacy;

  return (
    <>
      <SEO
        title={copy.title}
        description={copy.description}
        keywords={copy.keywords}
        path={path}
        lang={lang}
        toolName={copy.h1}
        breadcrumbs={[
          { label: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : 'Home', path: '/' },
          { label: copy.h1, path },
        ]}
      />
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <ToolBackNav className="mb-4" />
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient-brand mb-3">
            {copy.h1}
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">{copy.intro}</p>
        </header>
        <div className="space-y-4 text-sm leading-relaxed text-slate-700">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-10 text-xs text-slate-500">
          <Link to={lp(PATH_BY_KIND[otherKind])} className="text-blue-700 hover:underline font-medium">
            {otherLabel}
          </Link>
        </p>
      </article>
    </>
  );
}

export function PrivacyPage() {
  return <LegalPage kind="privacy" />;
}

export function TermsPage() {
  return <LegalPage kind="terms" />;
}
