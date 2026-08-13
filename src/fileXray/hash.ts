export async function computeHashes(buffer: ArrayBuffer): Promise<{
  sha256: string;
  sha1: string;
}> {
  const sha256Buf = await crypto.subtle.digest('SHA-256', buffer);
  const sha1Buf = await crypto.subtle.digest('SHA-1', buffer);
  return {
    sha256: bufferToHex(sha256Buf),
    sha1: bufferToHex(sha1Buf),
  };
}

function bufferToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
