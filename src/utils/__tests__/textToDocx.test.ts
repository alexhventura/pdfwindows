import { describe, expect, it } from 'vitest';
import { textToDocxBlob } from '../textToDocx';

describe('textToDocxBlob', () => {
  it('builds a Word document blob with DOCX MIME type', async () => {
    const blob = await textToDocxBlob('Hello\n--- Página 1 ---\nWorld', 'Test');
    expect(blob.size).toBeGreaterThan(1000);
    expect(blob.type).toContain('wordprocessingml');
    const bytes = new Uint8Array(await blob.arrayBuffer());
    // DOCX is a ZIP (PK header)
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
  });
});
