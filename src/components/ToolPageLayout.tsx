import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { ToolLandingHero, ToolLandingBody } from './ToolLandingPage';
import { ToolBackNav } from './ToolBackNav';
import { resolveToolContent } from '../seo/content/resolveToolContent';
import type { LanguageType } from '../types';

const CATALOG_LABEL: Record<LanguageType, string> = {
  en: 'Tools',
  pt: 'Ferramentas',
  es: 'Herramientas',
};

export function toolBreadcrumbs(lang: LanguageType, toolLabel: string, toolPath: string) {
  return [
    { label: CATALOG_LABEL[lang], path: '/' },
    { label: toolLabel, path: toolPath },
  ];
}

export function ToolPageSeoBlocks({
  toolPath,
  lang,
  children,
}: {
  toolPath: string;
  lang: LanguageType;
  children: ReactNode;
}) {
  const content = resolveToolContent(toolPath, lang);
  const crumbs = toolBreadcrumbs(lang, content.toolName, toolPath);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <ToolBackNav className="mb-4" />
        <Breadcrumbs items={crumbs} className="mb-5" />
        <ToolLandingHero content={content} />
      </div>
      <div id="tool-workspace" className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-6 scroll-mt-4">
        {children}
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <ToolLandingBody content={content} />
      </div>
    </>
  );
}

export { resolveToolContent };
