import JSZip from 'jszip';
import type { AnalysisResult, FileIdentification, HashInfo } from '../types';
import { emptyResult, sv } from '../types';

function textBetween(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<([a-zA-Z0-9]+:)?${tag}[^>]*>([^<]*)</`, 'i');
  const m = xml.match(re);
  return m?.[2]?.trim() || undefined;
}

function attr(xml: string, name: string): string | undefined {
  const re = new RegExp(`${name}="([^"]*)"`, 'i');
  return xml.match(re)?.[1];
}

export async function analyzeXlsx(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: 'full',
  });

  onStage?.('Analisando estrutura...');
  const zip = await JSZip.loadAsync(buffer);
  const names = Object.keys(zip.files);
  result.structure.push({ label: 'Arquivos internos', value: names.length, origin: 'ZIP / entries' });

  if (names.some((n) => /vbaProject|macros/i.test(n))) {
    result.hidden.push({
      severity: 'attention',
      label: 'Macros possíveis',
      detail: 'Arquivos de macro detectados. Não executados.',
      origin: 'ZIP / macro paths',
    });
  }

  onStage?.('Extraindo metadados...');
  const core = await zip.file('docProps/core.xml')?.async('string');
  const app = await zip.file('docProps/app.xml')?.async('string');
  if (core) {
    const creator = textBetween(core, 'creator');
    const lastMod = textBetween(core, 'lastModifiedBy');
    const created = textBetween(core, 'created');
    const modified = textBetween(core, 'modified');
    if (creator) {
      result.authorship.author = sv(creator, 'XLSX / core.xml / creator');
      result.hidden.push({ severity: 'info', label: 'Autor identificado', detail: creator, origin: 'XLSX / core.xml' });
    }
    if (lastMod) result.authorship.lastAuthor = sv(lastMod, 'XLSX / core.xml / lastModifiedBy');
    if (created) result.dates.contentCreated = sv(created, 'XLSX / core.xml / created');
    if (modified) result.dates.contentModified = sv(modified, 'XLSX / core.xml / modified');
  }
  if (app) {
    const application = textBetween(app, 'Application');
    if (application) {
      result.authorship.application = sv(application, 'XLSX / app.xml / Application');
      result.hidden.push({
        severity: 'info',
        label: 'Software utilizado identificado',
        detail: application,
        origin: 'XLSX / app.xml',
      });
    }
  }

  onStage?.('Analisando planilhas...');
  const workbook = await zip.file('xl/workbook.xml')?.async('string');
  const sheetsMeta: Array<{ name: string; sheetId?: string; state?: string; rId?: string }> = [];
  if (workbook) {
    const sheetRe = /<sheet\b[^>]*>/gi;
    let m: RegExpExecArray | null;
    while ((m = sheetRe.exec(workbook))) {
      const tag = m[0];
      sheetsMeta.push({
        name: attr(tag, 'name') || 'Sheet',
        sheetId: attr(tag, 'sheetId'),
        state: attr(tag, 'state'),
        rId: attr(tag, 'r:id') || attr(tag, 'id'),
      });
    }
  }

  result.statistics.sheets = sv(sheetsMeta.length, 'XLSX / workbook.xml');
  result.content.sheets = [];

  const formulaFn = new Map<string, number>();
  let totalFormulas = 0;
  let totalFilled = 0;
  let maxRows = 0;
  let maxCols = 0;
  let hiddenSheets = 0;

  const rels = await zip.file('xl/_rels/workbook.xml.rels')?.async('string');
  const ridToPath = new Map<string, string>();
  if (rels) {
    const relRe = /Id="([^"]+)"[^>]*Target="([^"]+)"|Target="([^"]+)"[^>]*Id="([^"]+)"/gi;
    let rm: RegExpExecArray | null;
    while ((rm = relRe.exec(rels))) {
      const id = rm[1] || rm[4];
      const target = rm[2] || rm[3];
      if (id && target) {
        const path = target.startsWith('/') ? target.slice(1) : `xl/${target.replace(/^\.\//, '')}`;
        ridToPath.set(id, path.replace(/\\/g, '/'));
      }
    }
  }

  for (const sheet of sheetsMeta) {
    const hidden = sheet.state === 'hidden';
    const veryHidden = sheet.state === 'veryHidden';
    if (hidden || veryHidden) {
      hiddenSheets += 1;
      result.hidden.push({
        severity: 'attention',
        label: veryHidden ? 'Planilha VeryHidden' : 'Planilha oculta',
        detail: sheet.name,
        origin: 'XLSX / workbook.xml',
      });
    }

    let sheetXml = '';
    const path = sheet.rId ? ridToPath.get(sheet.rId) : undefined;
    if (path && zip.file(path)) {
      sheetXml = (await zip.file(path)!.async('string')) || '';
    } else {
      // fallback sheet1, sheet2...
      const fallback = names.find((n) => n.match(new RegExp(`xl/worksheets/sheet${sheet.sheetId}\\.xml$`, 'i')));
      if (fallback) sheetXml = (await zip.file(fallback)?.async('string')) || '';
    }

    let rows = 0;
    let cols = 0;
    let filled = 0;
    let formulas = 0;

    if (sheetXml) {
      const dim = sheetXml.match(/<dimension[^>]*ref="([^"]+)"/i)?.[1];
      if (dim) {
        const parts = dim.split(':');
        const end = parts[parts.length - 1];
        const colMatch = end.match(/^([A-Z]+)/i);
        const rowMatch = end.match(/(\d+)$/);
        if (colMatch) cols = colLettersToIndex(colMatch[1]);
        if (rowMatch) rows = Number(rowMatch[1]);
      }
      const cellRe = /<c\b[^>]*>/gi;
      filled = (sheetXml.match(cellRe) || []).length;
      const fRe = /<f\b[^>]*>([^<]*)<\/f>|<f\b[^>]*\/>/gi;
      let fm: RegExpExecArray | null;
      while ((fm = fRe.exec(sheetXml))) {
        formulas += 1;
        totalFormulas += 1;
        const body = (fm[1] || '').trim();
        const fn = body.match(/^([A-Z]+)\s*\(/i)?.[1]?.toUpperCase();
        if (fn) formulaFn.set(fn, (formulaFn.get(fn) || 0) + 1);
      }
      totalFilled += filled;
      maxRows = Math.max(maxRows, rows);
      maxCols = Math.max(maxCols, cols);
    }

    result.content.sheets.push({
      name: sheet.name,
      hidden,
      veryHidden,
      rows: rows || undefined,
      cols: cols || undefined,
      formulas: formulas || undefined,
      origin: 'XLSX / worksheets',
    });
  }

  if (totalFormulas) result.statistics.formulas = sv(totalFormulas, 'XLSX / worksheet formulas');
  if (totalFilled) result.statistics.cellsFilled = sv(totalFilled, 'XLSX / <c> cells');
  if (maxRows) result.statistics.rows = sv(maxRows, 'XLSX / dimension (max)', true);
  if (maxCols) result.statistics.columns = sv(maxCols, 'XLSX / dimension (max)', true);
  if (formulaFn.size) {
    result.content.formulaBreakdown = [...formulaFn.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([fn, count]) => ({ fn, count }));
  }
  if (hiddenSheets) {
    result.statistics.custom.push({
      label: 'Planilhas ocultas',
      value: hiddenSheets,
      origin: 'XLSX / workbook.xml',
    });
  }

  result.statistics.images = sv(names.filter((n) => /xl\/media\//i.test(n)).length, 'ZIP / xl/media');
  result.statistics.custom.push({ label: 'Metadados', value: result.metadata.length, origin: 'aggregate' });
  return result;
}

function colLettersToIndex(letters: string): number {
  let n = 0;
  const s = letters.toUpperCase();
  for (let i = 0; i < s.length; i++) {
    n = n * 26 + (s.charCodeAt(i) - 64);
  }
  return n;
}
