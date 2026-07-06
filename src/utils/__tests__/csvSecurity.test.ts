import { describe, expect, it } from 'vitest';
import { sanitizeCsvCell, rowsToCsv } from '../csvSecurity';

describe('csvSecurity', () => {
  it('prefixes formula-like cells', () => {
    expect(sanitizeCsvCell('=1+1')).toBe("'=1+1");
    expect(sanitizeCsvCell('+cmd')).toBe("'+cmd");
  });

  it('builds csv rows', () => {
    const csv = rowsToCsv(['a'], [{ a: 'ok' }]);
    expect(csv).toBe('a\nok');
  });
});
