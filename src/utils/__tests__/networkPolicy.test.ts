import { describe, expect, it } from 'vitest';
import { validateRemotePdfUrl } from '../networkPolicy';

describe('validateRemotePdfUrl', () => {
  it('accepts public https URLs', () => {
    const r = validateRemotePdfUrl('https://example.com/doc.pdf');
    expect(r.ok).toBe(true);
  });

  it('rejects http', () => {
    const r = validateRemotePdfUrl('http://example.com/doc.pdf');
    expect(r.ok).toBe(false);
    if (r.ok !== false) return;
    expect(r.code).toBe('HTTPS_ONLY');
  });

  it('rejects localhost', () => {
    const r = validateRemotePdfUrl('https://localhost/file.pdf');
    expect(r.ok).toBe(false);
    if (r.ok !== false) return;
    expect(r.code).toBe('PRIVATE_HOST');
  });

  it('rejects credentials in URL', () => {
    const r = validateRemotePdfUrl('https://user:pass@example.com/a.pdf');
    expect(r.ok).toBe(false);
    if (r.ok !== false) return;
    expect(r.code).toBe('CREDENTIALS');
  });
});
