/**
 * Local Tesseract.js bootstrap — no CDN (jsdelivr) at runtime.
 * Assets are vendored into public/tesseract via scripts/vendor-tesseract.mjs
 */
import { createWorker, OEM, type Worker } from 'tesseract.js';

function tessBase(): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/tesseract`;
}

export const localTesseractOptions = {
  workerPath: `${tessBase()}/worker.min.js`,
  corePath: `${tessBase()}/core`,
  langPath: `${tessBase()}/lang`,
  workerBlobURL: false,
  gzip: true,
} as const;

/**
 * Creates an OCR worker using only same-origin assets under /tesseract/.
 */
export async function createLocalOcrWorker(
  language: string = 'por+eng',
  logger?: (m: { status: string; progress: number }) => void
): Promise<Worker> {
  return createWorker(language, OEM.LSTM_ONLY, {
    workerPath: localTesseractOptions.workerPath,
    corePath: localTesseractOptions.corePath,
    langPath: localTesseractOptions.langPath,
    workerBlobURL: localTesseractOptions.workerBlobURL,
    gzip: localTesseractOptions.gzip,
    ...(logger ? { logger } : {}),
  });
}
