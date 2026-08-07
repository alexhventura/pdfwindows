import { describe, expect, it } from 'vitest';
import { getLocalTesseractOptions, localTesseractOptions } from '../tesseractLoader';

describe('tesseractLoader', () => {
  it('points worker/core/lang to same-origin /tesseract paths', () => {
    const opts = getLocalTesseractOptions();
    expect(opts.workerPath).toMatch(/\/tesseract\/worker\.min\.js$/);
    expect(opts.corePath).toMatch(/\/tesseract\/core$/);
    expect(opts.langPath).toMatch(/\/tesseract\/lang$/);
    expect(opts.workerBlobURL).toBe(false);
    expect(opts.workerPath).not.toContain('jsdelivr');
    expect(opts.corePath).not.toContain('jsdelivr');
    expect(opts.langPath).not.toContain('jsdelivr');
    expect(localTesseractOptions.workerPath).toMatch(/\/tesseract\/worker\.min\.js$/);
  });
});
