import { readFileSync } from 'node:fs';

/** Router paths that only redirect — must never appear in the sitemap. */
export const NON_INDEXABLE_ROUTER_SEGMENTS = new Set(['gerador-recibos', 'capturador-cores']);

/**
 * Discovers indexable bare paths from AppRouter.tsx + toolCatalog.ts.
 * Keeps sitemap generation in sync when new public routes are added to the router.
 */
export function discoverPublicBarePaths() {
  const routerSrc = readFileSync('src/routes/AppRouter.tsx', 'utf8');
  const catalogSrc = readFileSync('src/seo/toolCatalog.ts', 'utf8');

  const routerSegments = [...routerSrc.matchAll(/\{\s*path:\s*'([^']+)'/g)]
    .map((match) => match[1])
    .filter(
      (segment) =>
        !NON_INDEXABLE_ROUTER_SEGMENTS.has(segment) &&
        !segment.includes(':') &&
        !segment.includes('*') &&
        segment !== '/'
    );

  const toolPaths = [...new Set([...catalogSrc.matchAll(/\bpage\('([^']+)'/g)].map((match) => match[1]))];

  const bare = new Set(['/']);
  for (const segment of routerSegments) {
    bare.add(`/${segment}`);
  }
  for (const toolPath of toolPaths) {
    bare.add(toolPath.startsWith('/') ? toolPath : `/${toolPath}`);
  }

  return sortBarePaths([...bare]);
}

/** @deprecated Use discoverPublicBarePaths */
export const extractPublicBarePaths = discoverPublicBarePaths;

export function sortBarePaths(paths) {
  const priority = (path) => {
    if (path === '/') return 0;
    if (path === '/ferramentas') return 1;
    if (path === '/conversor') return 2;
    return 3;
  };

  return [...paths].sort((a, b) => {
    const delta = priority(a) - priority(b);
    return delta !== 0 ? delta : a.localeCompare(b);
  });
}
