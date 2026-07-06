import { describe, expect, it } from 'vitest';
import { auditSeoContent } from '../../seo/audit/seoAudit';
import { countRichContentWords } from '../../seo/content/types';
import { PDF_MERGE_CONTENT } from '../../seo/content/tools/pdf-merge';
import { RICH_CONTENT_REGISTRY } from '../../seo/content/registry';

describe('SEO content quality', () => {
  it('pdf-merge English content meets word target', () => {
    const words = countRichContentWords(PDF_MERGE_CONTENT.en);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(words).toBeLessThanOrEqual(1500);
  });

  it('all registered tools have rich content in en, pt, es', () => {
    const paths = Object.keys(RICH_CONTENT_REGISTRY);
    expect(paths.length).toBeGreaterThanOrEqual(26);
    for (const path of paths) {
      expect(RICH_CONTENT_REGISTRY[path].en).toBeDefined();
      expect(RICH_CONTENT_REGISTRY[path].pt).toBeDefined();
      expect(RICH_CONTENT_REGISTRY[path].es).toBeDefined();
    }
  });

  it('all tool pages meet minimum SEO content standards', () => {
    const audit = auditSeoContent();
    const failing = audit.filter((row) => row.issues.length > 0);
    if (failing.length > 0) {
      const summary = failing
        .map((r) => `${r.path} [${r.lang}] (${r.wordCount}w): ${r.issues.join(', ')}`)
        .join('\n');
      expect.fail(`SEO audit failures:\n${summary}`);
    }
    expect(audit.length).toBeGreaterThan(0);
  });
});
