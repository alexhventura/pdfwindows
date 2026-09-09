import { describe, expect, it } from 'vitest';
import {
  buildSignatureSvg,
  escapeXml,
  joinDot,
  relativeLuminance,
  textColorsForBackground,
  type SignatureAppearance,
  type SignatureData,
} from '../emailSignature';

const baseData: SignatureData = {
  name: 'João da Silva',
  role: 'Analista',
  company: 'Empresa X',
  phone: '(11) 90000-0000',
  whatsapp: '',
  email: 'joao@empresa.com',
  website: 'empresa.com',
  customText: 'Frase de rodapé',
};

const appearance = (over: Partial<SignatureAppearance> = {}): SignatureAppearance => ({
  background: '#ffffff',
  backgroundTransparent: false,
  accentColor: '#2563eb',
  template: 'classic',
  ...over,
});

describe('email signature helpers', () => {
  it('escapes XML-sensitive characters', () => {
    expect(escapeXml('a & b <c> "d" \'e\'')).toBe('a &amp; b &lt;c&gt; &quot;d&quot; &#39;e&#39;');
  });

  it('joins present parts with a dot separator and skips empties', () => {
    expect(joinDot('a', '', 'b', undefined, 'c')).toBe('a  ·  b  ·  c');
    expect(joinDot('', '  ')).toBe('');
  });

  it('picks dark text on light backgrounds and light text on dark backgrounds', () => {
    expect(relativeLuminance('#ffffff')).toBeGreaterThan(0.9);
    expect(relativeLuminance('#111827')).toBeLessThan(0.1);
    expect(textColorsForBackground(appearance({ background: '#ffffff' })).text).toBe('#111827');
    expect(textColorsForBackground(appearance({ background: '#111827' })).text).toBe('#f8fafc');
    // transparent is treated as light → dark text
    expect(textColorsForBackground(appearance({ backgroundTransparent: true })).text).toBe('#111827');
  });
});

describe('buildSignatureSvg', () => {
  it('produces a valid SVG for every template and escapes user text', () => {
    for (const template of ['classic', 'corporate', 'spotlight', 'modern'] as const) {
      const { svg, width, height } = buildSignatureSvg(baseData, appearance({ template }));
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg).toContain('viewBox="0 0');
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    }
    const withAmp = buildSignatureSvg({ ...baseData, company: 'A & B' }, appearance()).svg;
    expect(withAmp).toContain('A &amp; B');
    expect(withAmp).not.toContain('A & B');
  });

  it('omits the background rect when transparent, and sizes for export', () => {
    const transparent = buildSignatureSvg(baseData, appearance({ backgroundTransparent: true })).svg;
    expect(transparent).not.toContain('<rect x="0" y="0"');
    const exported = buildSignatureSvg(baseData, appearance(), { forExport: true, scale: 3 });
    expect(exported.svg).toContain(`width="${exported.width * 3}"`);
  });
});
