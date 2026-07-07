import localizedPaths from '../src/seo/localizedPaths.json' with { type: 'json' };

/** Router paths that only redirect — must never appear in the sitemap. */
export const NON_INDEXABLE_ROUTER_SEGMENTS = new Set(['gerador-recibos', 'capturador-cores']);

const NON_INDEXABLE_CANONICAL_PATHS = new Set(['/ferramentas', '/gerador-recibos', '/capturador-cores']);

/**
 * Indexable canonical paths from localizedPaths.json.
 * Single source of truth for sitemap generation.
 */
export function discoverPublicBarePaths() {
  return sortBarePaths(
    Object.keys(localizedPaths).filter((path) => !NON_INDEXABLE_CANONICAL_PATHS.has(path))
  );
}

/** @deprecated Use discoverPublicBarePaths */
export const extractPublicBarePaths = discoverPublicBarePaths;

export function sortBarePaths(paths) {
  const priority = (path) => {
    if (path === '/') return 0;
    if (path === '/conversor') return 1;
    return 2;
  };

  return [...paths].sort((a, b) => {
    const delta = priority(a) - priority(b);
    return delta !== 0 ? delta : a.localeCompare(b);
  });
}
