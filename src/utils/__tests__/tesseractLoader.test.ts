import { describe, expect, it } from 'vitest';
import { localTesseractOptions } from '../tesseractLoader';

describe('tesseractLoader', () => {
  it('points worker/core/lang to same-origin /tesseract paths', () => {
    expect(localTesseractOptions.workerPath).toMatch(/\/tesseract\/worker\.min\.js$/);
    expect(localTesseractOptions.corePath).toMatch(/\/tesseract\/core$/);
    expect(localTesseractOptions.langPath).toMatch(/\/tesseract\/lang$/);
    expect(localTesseractOptions.workerBlobURL).toBe(false);
    expect(localTesseractOptions.workerPath).not.toContain('jsdelivr');
    expect(localTesseractOptions.corePath).not.toContain('jsdelivr');
    expect(localTesseractOptions.langPath).not.toContain('jsdelivr');
  });
});
