import { lazy, Suspense, useEffect, useState } from 'react';
import type { LanguageType } from '../types';
import type { ToolRichContent } from '../seo/content/types';
import { loadRichContent } from '../seo/content/lazyRichContent';

const ToolLandingBody = lazy(() =>
  import('./ToolLandingPage').then((m) => ({ default: m.ToolLandingBody }))
);

function SeoBodyPlaceholder() {
  return (
    <div
      className="w-full max-w-3xl mx-auto mt-10 pb-4 min-h-[28rem] rounded-2xl bg-slate-100/40 animate-pulse"
      aria-hidden="true"
    />
  );
}

export function LazyToolLandingBody({ path, lang }: { path: string; lang: LanguageType }) {
  const [content, setContent] = useState<ToolRichContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadRichContent(path, lang).then((rich) => {
      if (!cancelled) setContent(rich);
    });
    return () => {
      cancelled = true;
    };
  }, [path, lang]);

  if (!content) {
    return <SeoBodyPlaceholder />;
  }

  return (
    <Suspense fallback={<SeoBodyPlaceholder />}>
      <ToolLandingBody content={content} />
    </Suspense>
  );
}
