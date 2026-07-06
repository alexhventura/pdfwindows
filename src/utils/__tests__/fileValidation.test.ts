import { describe, expect, it } from 'vitest';
import { validateIncomingFile } from '../fileValidation';

describe('validateIncomingFile', () => {
  it('rejects unsupported extension', () => {
    const f = new File(['x'], 'malware.exe', { type: 'application/octet-stream' });
    expect(validateIncomingFile(f, 0, 0)).toBe('UNSUPPORTED_TYPE');
  });

  it('accepts pdf', () => {
    const f = new File(['%PDF'], 'a.pdf', { type: 'application/pdf' });
    expect(validateIncomingFile(f, 0, 0)).toBeNull();
  });
});
