const CACHE_NAME = 'pdf-windows-v5';
const SHELL_URL = '/index.html';
const PRECACHE_URLS = [SHELL_URL, '/manifest.json', '/icon.svg', '/logo-80.webp', '/logo.png'];
const BYPASS_PATHS = new Set(['/sitemap.xml', '/robots.txt']);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function serveShell() {
  const shell = await caches.match(SHELL_URL);
  if (shell) return shell;
  try {
    const response = await fetch(SHELL_URL);
    if (response.ok) return response;
  } catch {
    /* offline */
  }
  return new Response('Offline', { status: 503, statusText: 'Offline', headers: { 'Content-Type': 'text/plain' } });
}

async function handleNavigate(request) {
  try {
    const response = await fetch(request);
    if (response.ok) return response;
  } catch {
    /* network error — fall through to SPA shell */
  }
  return serveShell();
}

async function handleAsset(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response);
          }
        })
        .catch(() => undefined);
      return cached;
    }

    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('', { status: 408, statusText: 'Network unavailable' });
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (BYPASS_PATHS.has(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigate(request));
    return;
  }

  event.respondWith(handleAsset(request));
});
