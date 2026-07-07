import { useEffect, useState, type ComponentType } from 'react';
import type { LanguageType } from '../types';
import type { ToolRichContent } from '../seo/content/types';
import { loadRichContent } from '../seo/content/lazyRichContent';
import { useNearViewport } from '../hooks/useNearViewport';
import { TOOL_CATALOG_ID, TOOL_START_ID } from '../utils/scrollToToolStart';

/** Below-the-fold SEO article — loaded only when scrolled near to protect LCP/CLS. */
export function LazyToolLandingBody({ path, lang }: { path: string; lang: LanguageType }) {
  const { ref, isNear } = useNearViewport('480px');
  const [content, setContent] = useState<ToolRichContent | null>(null);
  const [Body, setBody] = useState<ComponentType<{ content: ToolRichContent }> | null>(null);

  useEffect(() => {
    if (!isNear) return;

    let cancelled = false;
    Promise.all([loadRichContent(path, lang), import('./ToolLandingPage')]).then(([rich, mod]) => {
      if (!cancelled) {
        setContent(rich);
        setBody(() => mod.ToolLandingBody);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isNear, path, lang]);

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const ctaTargetId = normalizedPath === '/' ? TOOL_CATALOG_ID : TOOL_START_ID;

  return (
    <div
      ref={ref}
      className="w-full max-w-3xl mx-auto mt-10 pb-4"
      style={Body ? undefined : { contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}
    >
      {content && Body ? <Body content={content} ctaTargetId={ctaTargetId} /> : null}
    </div>
  );
}
