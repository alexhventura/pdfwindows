/** Limits and validation for the only intentional network path: remote PDF import. */

export const REMOTE_IMPORT_MAX_BYTES = 50 * 1024 * 1024; // 50 MB
export const REMOTE_IMPORT_TIMEOUT_MS = 30_000;

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '[::1]',
]);

function isPrivateIpv4(host: string): boolean {
  const parts = host.split('.').map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

export type RemoteUrlValidationResult =
  | { ok: true; url: URL }
  | { ok: false; code: 'INVALID_URL' | 'HTTPS_ONLY' | 'PRIVATE_HOST' | 'CREDENTIALS' };

export function validateRemotePdfUrl(raw: string): RemoteUrlValidationResult {
  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return { ok: false, code: 'INVALID_URL' };
  }

  if (parsed.protocol !== 'https:') {
    return { ok: false, code: 'HTTPS_ONLY' };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, code: 'CREDENTIALS' };
  }

  const host = parsed.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(host) || host.endsWith('.local')) {
    return { ok: false, code: 'PRIVATE_HOST' };
  }
  if (isPrivateIpv4(host)) {
    return { ok: false, code: 'PRIVATE_HOST' };
  }

  return { ok: true, url: parsed };
}

export async function fetchRemotePdfBlob(
  url: URL,
  signal?: AbortSignal
): Promise<{ blob: Blob; fileName: string }> {
  const response = await fetch(url.toString(), {
    method: 'GET',
    signal,
    credentials: 'omit',
    mode: 'cors',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const pathLooksPdf = url.pathname.toLowerCase().endsWith('.pdf');
  if (!contentType.includes('pdf') && !pathLooksPdf) {
    throw new Error('NOT_A_PDF');
  }

  const contentLength = response.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > REMOTE_IMPORT_MAX_BYTES) {
    throw new Error('FILE_TOO_LARGE');
  }

  const reader = response.body?.getReader();
  if (!reader) {
    const blob = await response.blob();
    if (blob.size > REMOTE_IMPORT_MAX_BYTES) throw new Error('FILE_TOO_LARGE');
    const fileName =
      url.pathname.split('/').pop()?.split('?')[0] || 'remote_document.pdf';
    return { blob, fileName };
  }

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > REMOTE_IMPORT_MAX_BYTES) {
      reader.cancel();
      throw new Error('FILE_TOO_LARGE');
    }
    chunks.push(value);
  }

  const blob = new Blob(chunks, { type: 'application/pdf' });
  const fileName =
    url.pathname.split('/').pop()?.split('?')[0] || 'remote_document.pdf';
  return { blob, fileName };
}
