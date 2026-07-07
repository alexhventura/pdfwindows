import { describe, expect, it } from 'vitest';
import type { LanguageType } from '../../types';
import { getPageCopy } from '../../seo/content/getPageCopy';
import { getPublicBarePaths } from '../../seo/publicBarePaths';
import { resolveToolContent } from '../../seo/content/resolveToolContent';

const LANGS: LanguageType[] = ['en', 'pt', 'es'];

describe('SEO meta uniqueness and quality', () => {
  it('has unique titles and descriptions per page and locale', () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const paths = getPublicBarePaths();

    for (const path of paths) {
      for (const lang of LANGS) {
        const copy = getPageCopy(path, lang);
        expect(titles.has(copy.title), `duplicate title: ${copy.title} (${path} ${lang})`).toBe(false);
        expect(descriptions.has(copy.description), `duplicate description (${path} ${lang})`).toBe(false);
        titles.add(copy.title);
        descriptions.add(copy.description);
      }
    }

    expect(titles.size).toBe(paths.length * LANGS.length);
    expect(descriptions.size).toBe(paths.length * LANGS.length);
  });

  it('keeps meta descriptions within the 140–160 character SEO range', () => {
    const paths = getPublicBarePaths();
    const outOfRange: string[] = [];

    for (const path of paths) {
      for (const lang of LANGS) {
        const { description } = getPageCopy(path, lang);
        const len = description.length;
        if (len < 140 || len > 160) {
          outOfRange.push(`${path} [${lang}]: ${len} chars`);
        }
      }
    }

    expect(outOfRange, outOfRange.join('\n')).toEqual([]);
  });

  it('provides FAQ content for every indexable tool page', () => {
    const paths = getPublicBarePaths().filter((path) => path !== '/' && path !== '/conversor');
    let faqCount = 0;

    for (const path of paths) {
      for (const lang of LANGS) {
        const content = resolveToolContent(path, lang);
        expect(content.faq.length).toBeGreaterThanOrEqual(5);
        faqCount += content.faq.length;
      }
    }

    expect(faqCount).toBeGreaterThanOrEqual(paths.length * LANGS.length * 5);
  });
});
