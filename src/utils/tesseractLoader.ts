/**
 * Local Tesseract.js bootstrap — no CDN (jsdelivr) at runtime.
 * Assets are vendored into public/tesseract via scripts/vendor-tesseract.mjs
 */
import { createWorker, OEM, type Worker } from 'tesseract.js';

function tessBase(): string {
  // Prefer absolute same-origin URLs so Worker importScripts never falls back to CDN.
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/tesseract`;
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/tesseract`;
}

export function getLocalTesseractOptions() {
  const base = tessBase();
  return {
    workerPath: `${base}/worker.min.js`,
    corePath: `${base}/core`,
    langPath: `${base}/lang`,
    workerBlobURL: false as const,
    gzip: true as const,
  };
}

/** @deprecated Prefer getLocalTesseractOptions() — kept for unit tests */
export const localTesseractOptions = {
  get workerPath() {
    return getLocalTesseractOptions().workerPath;
  },
  get corePath() {
    return getLocalTesseractOptions().corePath;
  },
  get langPath() {
    return getLocalTesseractOptions().langPath;
  },
  workerBlobURL: false as const,
  gzip: true as const,
};

/**
 * Creates an OCR worker using only same-origin assets under /tesseract/.
 */
export async function createLocalOcrWorker(
  language: string = 'por+eng',
  logger?: (m: { status: string; progress: number }) => void
): Promise<Worker> {
  const opts = getLocalTesseractOptions();
  return createWorker(language, OEM.LSTM_ONLY, {
    workerPath: opts.workerPath,
    corePath: opts.corePath,
    langPath: opts.langPath,
    workerBlobURL: opts.workerBlobURL,
    gzip: opts.gzip,
    ...(logger ? { logger } : {}),
  });
}
