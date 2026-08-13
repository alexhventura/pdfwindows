import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { AnalysisResult } from './types';
import { formatBytes } from './hash';

export function exportAnalysisJson(result: AnalysisResult): Blob {
  return new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
}

export function exportAnalysisTxt(result: AnalysisResult): Blob {
  const lines: string[] = [];
  lines.push('RAIO X DE ARQUIVO — PDFWINDOWS');
  lines.push(`Arquivo: ${result.identification.name}`);
  lines.push(`Data da análise: ${result.analyzedAt}`);
  lines.push(`Tipo real: ${result.identification.detectedFormat}`);
  lines.push(`Tamanho: ${formatBytes(result.fileSizeBytes)}`);
  lines.push(`SHA-256: ${result.hashes.sha256}`);
  if (result.hashes.sha1) lines.push(`SHA-1: ${result.hashes.sha1}`);
  lines.push('');
  lines.push('--- Metadados ---');
  for (const m of result.metadata) {
    lines.push(`${m.key}: ${m.value}`);
    lines.push(`  Origem: ${m.origin}`);
  }
  lines.push('');
  lines.push('--- Autoria ---');
  if (result.authorship.author) {
    lines.push(`Autor: ${result.authorship.author.value}`);
    lines.push(`  Origem: ${result.authorship.author.origin}`);
  }
  if (result.authorship.application) {
    lines.push(`Aplicativo: ${result.authorship.application.value}`);
    lines.push(`  Origem: ${result.authorship.application.origin}`);
  }
  lines.push('');
  lines.push('--- Estrutura ---');
  for (const s of result.structure) {
    lines.push(`${s.label}: ${s.value} (${s.origin})`);
  }
  lines.push('');
  lines.push('--- Informações adicionais ---');
  for (const h of result.hidden) {
    lines.push(`[${h.severity}] ${h.label}: ${h.detail} (${h.origin})`);
  }
  return new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
}

export async function exportAnalysisPdf(result: AnalysisResult): Promise<Blob> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const margin = 50;
  let page = doc.addPage();
  let { height } = page.getSize();
  let y = height - margin;

  const ensureSpace = (need: number) => {
    if (y - need < margin) {
      page = doc.addPage();
      ({ height } = page.getSize());
      y = height - margin;
    }
  };

  const write = (text: string, size = 10, useBold = false) => {
    const f = useBold ? bold : font;
    const maxWidth = page.getSize().width - margin * 2;
    const words = text.split(/\s+/);
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (f.widthOfTextAtSize(test, size) > maxWidth) {
        ensureSpace(size + 4);
        page.drawText(line, { x: margin, y, size, font: f, color: rgb(0.1, 0.1, 0.12) });
        y -= size + 4;
        line = w;
      } else {
        line = test;
      }
    }
    if (line) {
      ensureSpace(size + 4);
      page.drawText(line, { x: margin, y, size, font: f, color: rgb(0.1, 0.1, 0.12) });
      y -= size + 4;
    }
  };

  write('RAIO X DE ARQUIVO', 18, true);
  write('PDFWINDOWS', 12, true);
  y -= 8;
  write(`Arquivo: ${result.identification.name}`);
  write(`Data da análise: ${result.analyzedAt}`);
  write(`Tipo real: ${result.identification.detectedFormat.toUpperCase()}`);
  write(`MIME detectado: ${result.identification.detectedMime}`);
  write(`Tamanho: ${formatBytes(result.fileSizeBytes)} (${result.fileSizeBytes} bytes)`);
  write(`SHA-256: ${result.hashes.sha256}`);
  if (result.hashes.sha1) write(`SHA-1: ${result.hashes.sha1}`);
  y -= 10;

  write('IDENTIFICAÇÃO', 12, true);
  if (result.identification.inconsistencyNote) write(result.identification.inconsistencyNote);

  write('AUTORIA E ORIGEM', 12, true);
  if (result.authorship.author) {
    write(`Autor: ${result.authorship.author.value}`);
    write(`Origem: ${result.authorship.author.origin}`);
  } else write('Autor: Não disponível no arquivo.');
  if (result.authorship.creator) {
    write(`Criador: ${result.authorship.creator.value}`);
    write(`Origem: ${result.authorship.creator.origin}`);
  }
  if (result.authorship.application) {
    write(`Aplicativo: ${result.authorship.application.value}`);
    write(`Origem: ${result.authorship.application.origin}`);
  }
  y -= 6;

  write('DATAS', 12, true);
  if (result.dates.created) {
    write(`Criação: ${result.dates.created.value}`);
    write(`Origem: ${result.dates.created.origin}`);
  }
  if (result.dates.modified) {
    write(`Modificação: ${result.dates.modified.value}`);
    write(`Origem: ${result.dates.modified.origin}`);
  }
  if (result.dates.contentCreated) {
    write(`Conteúdo criado: ${result.dates.contentCreated.value}`);
    write(`Origem: ${result.dates.contentCreated.origin}`);
  }
  y -= 6;

  write('ESTATÍSTICAS', 12, true);
  const stats = result.statistics;
  const pushStat = (label: string, v?: { value: string | number; origin: string; estimated?: boolean }) => {
    if (!v) return;
    write(`${label}: ${v.value}${v.estimated ? ' (Estimativa)' : ''}`);
    write(`Origem: ${v.origin}`);
  };
  pushStat('Páginas', stats.pages);
  pushStat('Palavras', stats.words);
  pushStat('Caracteres', stats.characters);
  pushStat('Imagens', stats.images);
  pushStat('Fontes', stats.fonts);
  pushStat('Planilhas', stats.sheets);
  pushStat('Slides', stats.slides);
  pushStat('Largura', stats.width);
  pushStat('Altura', stats.height);
  for (const c of stats.custom) {
    write(`${c.label}: ${c.value}${c.estimated ? ' (Estimativa)' : ''}`);
    write(`Origem: ${c.origin}`);
  }
  y -= 6;

  write('METADADOS', 12, true);
  if (!result.metadata.length) write('Não disponível no arquivo.');
  for (const m of result.metadata) {
    write(`${m.key}: ${m.value}`);
    write(`Origem: ${m.origin}`);
  }
  y -= 6;

  write('ESTRUTURA', 12, true);
  for (const s of result.structure) {
    write(`${s.label}: ${s.value}`);
    write(`Origem: ${s.origin}`);
  }
  y -= 6;

  write('INFORMAÇÕES ADICIONAIS', 12, true);
  if (!result.hidden.length) write('Nenhuma informação adicional destacada.');
  for (const h of result.hidden) {
    write(`${h.label}: ${h.detail}`);
    write(`Origem: ${h.origin}`);
  }

  if (result.fonts.length) {
    y -= 6;
    write('FONTES', 12, true);
    for (const f of result.fonts) {
      write(`${f.name}${f.internalName && f.internalName !== f.name ? ` (${f.internalName})` : ''}`);
      write(`Origem: ${f.origin}`);
    }
  }

  const bytes = await doc.save();
  return new Blob([bytes], { type: 'application/pdf' });
}
