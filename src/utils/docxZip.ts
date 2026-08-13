import JSZip from 'jszip';

const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/** ZIP local signature "PK" */
export function looksLikeZip(bytes: ArrayBuffer | Uint8Array): boolean {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return u8.length >= 4 && u8[0] === 0x50 && u8[1] === 0x4b;
}

export function looksLikePdf(bytes: ArrayBuffer | Uint8Array): boolean {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (u8.length < 5) return false;
  const head = String.fromCharCode(u8[0], u8[1], u8[2], u8[3], u8[4]);
  return head === '%PDF-';
}

export async function openDocxZip(file: File | ArrayBuffer): Promise<JSZip> {
  const buf = file instanceof File ? await file.arrayBuffer() : file;
  if (!looksLikeZip(buf)) {
    throw new Error('INVALID_DOCX');
  }
  const zip = await JSZip.loadAsync(buf);
  if (!zip.file('word/document.xml') && !zip.file('[Content_Types].xml')) {
    throw new Error('INVALID_DOCX');
  }
  return zip;
}

export async function readZipText(zip: JSZip, path: string): Promise<string | null> {
  const entry = zip.file(path);
  if (!entry) return null;
  return entry.async('string');
}

export async function zipToDocxBlob(zip: JSZip): Promise<Blob> {
  const out = await zip.generateAsync({
    type: 'blob',
    mimeType: DOCX_MIME,
    compression: 'DEFLATE',
  });
  return out;
}

export { DOCX_MIME };
