import { describe, expect, it } from 'vitest';
import { textToDocxBlob } from '../textToDocx';

describe('textToDocxBlob', () => {
  it('produces a zip-based docx blob', async () => {
    const blob = await textToDocxBlob('Hello\n--- Página 1 ---\nWorld', 'Test');
    expect(blob.size).toBeGreaterThan(500);
    expect(blob.type).toMatch(/officedocument|octet-stream|zip/i);

    const buf = new Uint8Array(await blob.arrayBuffer());
    // DOCX files are ZIP archives starting with PK
    expect(buf[0]).toBe(0x50);
    expect(buf[1]).toBe(0x4b);
  });
});
