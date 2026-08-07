import { describe, expect, it } from 'vitest';
import { adaptiveOcrScale, OCR_MAX_PAGES } from '../ocrPageRender';

describe('ocrPageRender', () => {
  it('uses lower scale for long documents', () => {
    expect(adaptiveOcrScale(5)).toBeGreaterThan(adaptiveOcrScale(25));
    expect(adaptiveOcrScale(25)).toBeGreaterThan(adaptiveOcrScale(60));
    expect(adaptiveOcrScale(60)).toBeGreaterThanOrEqual(1.1);
  });

  it('allows more than 30 pages', () => {
    expect(OCR_MAX_PAGES).toBeGreaterThan(30);
  });
});
