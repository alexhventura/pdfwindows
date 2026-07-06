import { describe, expect, it } from 'vitest';
import {
  getAllowedOperations,
  getToolStubMessage,
  IMPLEMENTED_OPERATIONS,
  isToolReady,
} from '../../toolRegistry';

describe('toolRegistry', () => {
  it('exposes ready operations for runner', () => {
    expect(isToolReady('csv-json')).toBe(true);
    expect(IMPLEMENTED_OPERATIONS.has('pdf-ocr')).toBe(true);
    expect(IMPLEMENTED_OPERATIONS.has('img-upscale')).toBe(false);
  });

  it('returns image operations for image files', () => {
    const ops = getAllowedOperations(1, ['png'], 'en');
    expect(ops.map((o) => o.value)).toEqual([
      'img-to-img',
      'img-to-pdf',
      'img-resize',
      'img-ocr',
      'img-filter',
    ]);
  });

  it('returns pdf operations for a single pdf', () => {
    const ops = getAllowedOperations(1, ['pdf'], 'pt');
    expect(ops.some((o) => o.value === 'pdf-ocr')).toBe(true);
    expect(ops.some((o) => o.value === 'pdf-merge')).toBe(false);
  });

  it('provides stub message for pdf-ocr fallback copy', () => {
    const msg = getToolStubMessage('pdf-ocr', 'en');
    expect(msg.length).toBeGreaterThan(10);
  });
});
