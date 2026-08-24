import { describe, expect, it } from 'vitest';
import {
  analyzeFontTechnicalName,
  formatPageRanges,
  isInternalFontId,
  isUnreliableSampleText,
} from '../../engines/fontNameNormalize';
import { parsePdfFontDictionaries } from '../../engines/pdfFontScan';

describe('analyzeFontTechnicalName', () => {
  it('never treats pdf.js loadedName as a family', () => {
    const a = analyzeFontTechnicalName('g_d0_f1946');
    expect(a.internal).toBe(true);
    expect(a.family).toBeNull();
    expect(isInternalFontId('g d0 f1946')).toBe(true);
    expect(isInternalFontId('/F1')).toBe(true);
  });

  it('maps subset PostScript names to a commercial family', () => {
    const a = analyzeFontTechnicalName('ABCDEE+ArialMT');
    expect(a.subset).toBe(true);
    expect(a.subsetPrefix).toBe('ABCDEE');
    expect(a.technicalName).toBe('ArialMT');
    expect(a.family).toBe('Arial');
    expect(a.internal).toBe(false);
  });

  it('maps TimesNewRomanPSMT and Times-Roman', () => {
    expect(analyzeFontTechnicalName('TimesNewRomanPSMT').family).toBe('Times New Roman');
    expect(analyzeFontTechnicalName('Times-Roman').family).toBe('Times');
    expect(analyzeFontTechnicalName('Calibri-Bold').family).toBe('Calibri');
    expect(analyzeFontTechnicalName('Calibri-Bold').weightStyle).toBe('Bold');
  });
});

describe('sample reliability and page ranges', () => {
  it('flags glyph-noise samples', () => {
    expect(isUnreliableSampleText("t 1 I l 1' 11lil I l 1 t")).toBe(true);
    expect(isUnreliableSampleText('The quick brown fox jumps over')).toBe(false);
  });

  it('formats contiguous pages as ranges', () => {
    expect(formatPageRanges([1, 2, 3, 5, 8, 9, 10])).toBe('1–3, 5, 8–10');
  });
});

describe('parsePdfFontDictionaries', () => {
  it('reads Type1 Helvetica as not embedded', () => {
    const raw = `%PDF-1.4
1 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>
endobj
`;
    const dicts = parsePdfFontDictionaries(raw);
    expect(dicts).toHaveLength(1);
    expect(dicts[0].baseFont).toBe('Helvetica');
    expect(dicts[0].subtype).toBe('Type1');
    expect(dicts[0].embedded).toBe(false);
    expect(dicts[0].encoding).toBe('WinAnsiEncoding');
  });

  it('reads a subset TrueType with ToUnicode', () => {
    const raw = `4 0 obj
<< /Type /Font /Subtype /TrueType /BaseFont /ABCDEF+ArialMT /Encoding /WinAnsiEncoding /ToUnicode 5 0 R /FontFile2 6 0 R >>
endobj
`;
    const dicts = parsePdfFontDictionaries(raw);
    expect(dicts[0].baseFont).toBe('ABCDEF+ArialMT');
    expect(dicts[0].subset).toBe(true);
    expect(dicts[0].embedded).toBe(true);
    expect(dicts[0].hasToUnicode).toBe(true);
  });

  it('reads Type0 CID composite fonts', () => {
    const raw = `7 0 obj
<< /Type /Font /Subtype /Type0 /BaseFont /ABCDEE+ArialUnicodeMS /Encoding /Identity-H /DescendantFonts [8 0 R] /ToUnicode 9 0 R >>
endobj
`;
    const dicts = parsePdfFontDictionaries(raw);
    expect(dicts[0].subtype).toBe('Type0');
    expect(dicts[0].baseFont).toBe('ABCDEE+ArialUnicodeMS');
    expect(dicts[0].encoding).toBe('Identity-H');
    expect(dicts[0].hasToUnicode).toBe(true);
  });
});
