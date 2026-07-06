import { describe, expect, it } from 'vitest';
import { sanitizePdfText } from '../pdfTextSanitizer';

describe('sanitizePdfText', () => {
  it('replaces lock emoji with PROTEGIDO', () => {
    expect(sanitizePdfText('🔒 PDF WINDOWS')).toBe('PROTEGIDO PDF WINDOWS');
  });

  it('normalizes em dash and bullet to ASCII', () => {
    expect(sanitizePdfText('Item A — total • ok')).toBe('Item A - total * ok');
  });

  it('keeps common Latin-1 characters', () => {
    expect(sanitizePdfText('Declaração em São Paulo')).toBe('Declaração em São Paulo');
  });
});
