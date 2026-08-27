import { describe, expect, it } from 'vitest';
import { TOOL_PAGES } from '../../seo/toolCatalog';
import { getSuiteFamily, getToolFamily, groupToolsByFamily, TOOL_FAMILY_ORDER } from '../../seo/toolFamily';

describe('toolFamily', () => {
  it('classifies every catalog page', () => {
    for (const page of TOOL_PAGES) {
      expect(TOOL_FAMILY_ORDER).toContain(getToolFamily(page));
    }
  });

  it('lists PDF tools before image tools', () => {
    const grouped = groupToolsByFamily(TOOL_PAGES);
    expect(grouped.map((g) => g.family)).toEqual(['pdf', 'image', 'document', 'data', 'utility']);
    expect(grouped[0].tools[0].path).toBe('/pdf-merge');
    expect(grouped[1].tools.some((t) => t.path === '/image-converter')).toBe(true);
  });

  it('keeps PDF converters and PDF suite tools together', () => {
    const pdf = groupToolsByFamily(TOOL_PAGES).find((g) => g.family === 'pdf')!.tools.map((t) => t.path);
    expect(pdf).toContain('/pdf-compress');
    expect(pdf).toContain('/pdf-to-image');
    expect(pdf).toContain('/desbloquear-pdf');
    expect(pdf).toContain('/organizar-paginas-pdf');
    expect(pdf).toContain('/redacao-pdf');
    expect(pdf).toContain('/assinatura-pdf');
    expect(pdf).toContain('/numerador-de-paginas');
    expect(pdf).toContain('/recortar-pdf');
    expect(pdf).toContain('/editar-pdf');
  });

  it('groups image converters and photo tools together', () => {
    const image = groupToolsByFamily(TOOL_PAGES).find((g) => g.family === 'image')!.tools.map((t) => t.path);
    expect(image).toContain('/image-to-pdf');
    expect(image).toContain('/ajuste-de-margem');
    expect(image).toContain('/capturador-de-cores');
    expect(image).toContain('/escanear-para-pdf');
    expect(image).not.toContain('/pdf-to-image');
  });

  it('maps suite ids used on the converter page', () => {
    expect(getSuiteFamily('unlock-pdf')).toBe('pdf');
    expect(getSuiteFamily('margin-adjust')).toBe('image');
    expect(getSuiteFamily('document-studio')).toBe('document');
    expect(getSuiteFamily('pdf-to-word')).toBe('document');
    expect(getSuiteFamily('page-numbers')).toBe('pdf');
    expect(getSuiteFamily('scan-to-pdf')).toBe('image');
    expect(getSuiteFamily('qr-gen')).toBe('utility');
  });
});
