import type { LanguageType } from '../../types';
import { countRichContentWords } from '../content/types';
import { RICH_CONTENT_REGISTRY } from '../content/registry';
import { TOOL_PAGES } from '../toolCatalog';
import { resolveToolContent } from '../content/resolveToolContent';

export interface PageSeoAudit {
  path: string;
  lang: LanguageType;
  wordCount: number;
  hasRichContent: boolean;
  meetsWordTarget: boolean;
  hasSections: boolean;
  hasFaq: boolean;
  hasRelated: boolean;
  issues: string[];
}

const MIN_WORDS = 800;
const TARGET_PATHS = ['/', '/conversor', ...TOOL_PAGES.map((p) => p.path)];

export function auditSeoContent(): PageSeoAudit[] {
  const langs: LanguageType[] = ['en', 'pt', 'es'];
  const results: PageSeoAudit[] = [];

  for (const path of TARGET_PATHS) {
    for (const lang of langs) {
      const hasRich = Boolean(RICH_CONTENT_REGISTRY[path]?.[lang]);
      let content;
      try {
        content = resolveToolContent(path, lang);
      } catch {
        continue;
      }
      const wordCount = countRichContentWords(content);
      const issues: string[] = [];
      if (wordCount < MIN_WORDS) issues.push(`Word count ${wordCount} below ${MIN_WORDS}`);
      if (content.sections.length < 3) issues.push('Fewer than 3 content sections');
      if (content.faq.length < 5) issues.push('Fewer than 5 FAQ items');
      if (content.relatedTools.length < 2) issues.push('Missing related tool links');
      if (content.tips.length < 4) issues.push('Fewer than 4 tips');

      results.push({
        path,
        lang,
        wordCount,
        hasRichContent: hasRich,
        meetsWordTarget: wordCount >= MIN_WORDS,
        hasSections: content.sections.length >= 3,
        hasFaq: content.faq.length >= 5,
        hasRelated: content.relatedTools.length >= 2,
        issues,
      });
    }
  }

  return results;
}

export function formatAuditReport(audits: PageSeoAudit[]): string {
  const failing = audits.filter((a) => a.issues.length > 0);
  const passing = audits.length - failing.length;
  const lines = [
    `SEO Content Audit`,
    `==================`,
    `Total pages audited: ${audits.length}`,
    `Passing: ${passing}`,
    `Need improvement: ${failing.length}`,
    ``,
  ];

  if (failing.length > 0) {
    lines.push('Pages needing improvement:');
    for (const row of failing) {
      lines.push(`- ${row.path} [${row.lang}] (${row.wordCount} words): ${row.issues.join('; ')}`);
    }
  }

  return lines.join('\n');
}
