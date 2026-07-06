import { describe, expect, it } from 'vitest';
import { buildTextFromPdfContentItems } from '../pdfTextLayerParse';

describe('pdfTextLayerParse', () => {
  it('buildTextFromPdfContentItems produces human-readable text without PDF internals', () => {
    const text = buildTextFromPdfContentItems([
      { str: 'Hello', transform: [1, 0, 0, 1, 0, 100], hasEOL: false },
      { str: 'world', transform: [1, 0, 0, 1, 60, 100], hasEOL: true },
      { str: 'Line two', transform: [1, 0, 0, 1, 0, 80], hasEOL: false },
    ]);

    expect(text).toContain('Hello');
    expect(text).toContain('world');
    expect(text).toContain('Line two');
    expect(text).not.toMatch(/FlateDecode|endobj|\/XObject/);
  });
});
