import { readFileSync } from 'node:fs';

/** Keep sitemap paths in sync with TOOL_PAGES in src/seo/toolCatalog.ts */
export function extractPublicBarePaths() {
  const src = readFileSync('src/seo/toolCatalog.ts', 'utf8');
  const toolPaths = [...src.matchAll(/\bpage\('([^']+)'/g)].map((match) => match[1]);
  const uniqueToolPaths = [...new Set(toolPaths)];

  return ['/', '/ferramentas', '/conversor', ...uniqueToolPaths];
}
