/**
 * Bundled PDF.js — no CDN. Worker loaded from same origin via Vite asset URL.
 */
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

let configured = false;

function ensureWorker(): void {
  if (configured) return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  configured = true;
}

export async function loadPdfJS(): Promise<typeof pdfjsLib> {
  ensureWorker();
  return pdfjsLib;
}

export { pdfjsLib };
