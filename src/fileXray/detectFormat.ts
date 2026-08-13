import type { DetectedFormat } from './types';

export interface FormatDetection {
  format: DetectedFormat;
  mime: string;
  signature: string;
  container?: string;
}

function hexPreview(u8: Uint8Array, n = 16): string {
  return [...u8.slice(0, n)].map((b) => b.toString(16).padStart(2, '0')).join(' ').toUpperCase();
}

function asciiStartsWith(u8: Uint8Array, s: string): boolean {
  if (u8.length < s.length) return false;
  for (let i = 0; i < s.length; i++) {
    if (u8[i] !== s.charCodeAt(i)) return false;
  }
  return true;
}

export function detectFormat(buffer: ArrayBuffer, fileName: string, browserMime: string): FormatDetection {
  const u8 = new Uint8Array(buffer);
  const sig = hexPreview(u8);
  const ext = (fileName.split('.').pop() || '').toLowerCase();

  if (asciiStartsWith(u8, '%PDF-')) {
    return { format: 'pdf', mime: 'application/pdf', signature: sig };
  }

  // ZIP / OOXML
  if (u8[0] === 0x50 && u8[1] === 0x4b) {
    const text = new TextDecoder('latin1').decode(u8.slice(0, Math.min(u8.length, 8000)));
    if (text.includes('word/')) {
      return {
        format: 'docx',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        signature: sig,
        container: 'ZIP/OOXML',
      };
    }
    if (text.includes('xl/')) {
      return {
        format: 'xlsx',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        signature: sig,
        container: 'ZIP/OOXML',
      };
    }
    if (text.includes('ppt/')) {
      return {
        format: 'pptx',
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        signature: sig,
        container: 'ZIP/OOXML',
      };
    }
    return { format: 'zip', mime: 'application/zip', signature: sig, container: 'ZIP' };
  }

  // JPEG
  if (u8[0] === 0xff && u8[1] === 0xd8 && u8[2] === 0xff) {
    return { format: 'jpeg', mime: 'image/jpeg', signature: sig };
  }
  // PNG
  if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4e && u8[3] === 0x47) {
    return { format: 'png', mime: 'image/png', signature: sig };
  }
  // GIF
  if (asciiStartsWith(u8, 'GIF87a') || asciiStartsWith(u8, 'GIF89a')) {
    return { format: 'gif', mime: 'image/gif', signature: sig };
  }
  // WEBP (RIFF....WEBP)
  if (asciiStartsWith(u8, 'RIFF') && u8.length > 12 && asciiStartsWith(u8.slice(8), 'WEBP')) {
    return { format: 'webp', mime: 'image/webp', signature: sig };
  }

  // Text-ish
  const sample = new TextDecoder('utf-8', { fatal: false }).decode(u8.slice(0, Math.min(u8.length, 4096)));
  const printableRatio =
    sample.length === 0
      ? 0
      : [...sample].filter((c) => {
          const code = c.charCodeAt(0);
          return code === 9 || code === 10 || code === 13 || (code >= 32 && code < 127) || code > 160;
        }).length / sample.length;

  if (printableRatio > 0.9) {
    const comma = (sample.match(/,/g) || []).length;
    const semi = (sample.match(/;/g) || []).length;
    const tabs = (sample.match(/\t/g) || []).length;
    const lines = sample.split(/\r?\n/).filter(Boolean).length;
    if (ext === 'csv' || (lines > 1 && (comma > lines || semi > lines || tabs > lines))) {
      return { format: 'csv', mime: 'text/csv', signature: sig };
    }
    if (ext === 'txt' || printableRatio > 0.95) {
      return { format: 'txt', mime: 'text/plain', signature: sig };
    }
  }

  // Extension fallback with inconsistency flag handled by caller
  const byExt: Record<string, FormatDetection> = {
    pdf: { format: 'pdf', mime: 'application/pdf', signature: sig },
    docx: {
      format: 'docx',
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      signature: sig,
    },
    xlsx: {
      format: 'xlsx',
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      signature: sig,
    },
    pptx: {
      format: 'pptx',
      mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      signature: sig,
    },
    jpg: { format: 'jpeg', mime: 'image/jpeg', signature: sig },
    jpeg: { format: 'jpeg', mime: 'image/jpeg', signature: sig },
    png: { format: 'png', mime: 'image/png', signature: sig },
    webp: { format: 'webp', mime: 'image/webp', signature: sig },
    gif: { format: 'gif', mime: 'image/gif', signature: sig },
    csv: { format: 'csv', mime: 'text/csv', signature: sig },
    txt: { format: 'txt', mime: 'text/plain', signature: sig },
    zip: { format: 'zip', mime: 'application/zip', signature: sig },
  };

  if (byExt[ext]) {
    return { ...byExt[ext], signature: `${sig} (ext-fallback)` };
  }

  void browserMime;
  return { format: 'unknown', mime: browserMime || 'application/octet-stream', signature: sig };
}

export function extensionOf(name: string): string {
  return (name.split('.').pop() || '').toLowerCase();
}
