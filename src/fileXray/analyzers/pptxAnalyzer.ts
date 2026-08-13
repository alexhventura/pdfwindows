import JSZip from 'jszip';
import type { AnalysisResult, FileIdentification, HashInfo } from '../types';
import { emptyResult, sv } from '../types';

function textBetween(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<([a-zA-Z0-9]+:)?${tag}[^>]*>([^<]*)</`, 'i');
  const m = xml.match(re);
  return m?.[2]?.trim() || undefined;
}

function countTag(xml: string, tag: string): number {
  const re = new RegExp(`<([a-zA-Z0-9]+:)?${tag}\\b`, 'gi');
  return (xml.match(re) || []).length;
}

function stripXml(xml: string): string {
  return xml
    .replace(/<\/a:p>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function analyzePptx(
  buffer: ArrayBuffer,
  identification: FileIdentification,
  hashes: HashInfo,
  onStage?: (msg: string) => void,
): Promise<AnalysisResult> {
  const result = emptyResult({
    identification,
    fileSizeBytes: buffer.byteLength,
    hashes,
    supportLevel: 'partial',
  });

  onStage?.('Analisando estrutura...');
  const zip = await JSZip.loadAsync(buffer);
  const names = Object.keys(zip.files);
  result.structure.push({ label: 'Arquivos internos', value: names.length, origin: 'ZIP / entries' });

  const slideFiles = names.filter((n) => /^ppt\/slides\/slide\d+\.xml$/i.test(n)).sort();
  const hiddenSlides = names.filter((n) => /show="0"|show="false"/i.test(n));
  void hiddenSlides;

  result.statistics.slides = sv(slideFiles.length, 'PPTX / ppt/slides');
  result.statistics.images = sv(names.filter((n) => /ppt\/media\//i.test(n)).length, 'ZIP / ppt/media');

  onStage?.('Extraindo metadados...');
  const core = await zip.file('docProps/core.xml')?.async('string');
  const app = await zip.file('docProps/app.xml')?.async('string');
  if (core) {
    const creator = textBetween(core, 'creator');
    const lastMod = textBetween(core, 'lastModifiedBy');
    const created = textBetween(core, 'created');
    const modified = textBetween(core, 'modified');
    if (creator) {
      result.authorship.author = sv(creator, 'PPTX / core.xml / creator');
      result.hidden.push({ severity: 'info', label: 'Autor identificado', detail: creator, origin: 'PPTX / core.xml' });
    }
    if (lastMod) result.authorship.lastAuthor = sv(lastMod, 'PPTX / core.xml / lastModifiedBy');
    if (created) result.dates.contentCreated = sv(created, 'PPTX / core.xml / created');
    if (modified) result.dates.contentModified = sv(modified, 'PPTX / core.xml / modified');
  }
  if (app) {
    const application = textBetween(app, 'Application');
    const slides = textBetween(app, 'Slides');
    if (application) {
      result.authorship.application = sv(application, 'PPTX / app.xml / Application');
      result.hidden.push({
        severity: 'info',
        label: 'Software utilizado identificado',
        detail: application,
        origin: 'PPTX / app.xml',
      });
    }
    if (slides && !result.statistics.slides) {
      result.statistics.slides = sv(Number(slides), 'PPTX / app.xml / Slides');
    }
  }

  onStage?.('Analisando conteúdo...');
  let allText = '';
  let notes = 0;
  let comments = 0;
  let links = 0;
  let tables = 0;
  let hiddenCount = 0;
  const fonts = new Set<string>();

  for (const path of slideFiles) {
    const xml = (await zip.file(path)?.async('string')) || '';
    if (/show="0"|show="false"/i.test(xml)) {
      hiddenCount += 1;
      result.hidden.push({
        severity: 'attention',
        label: 'Slide oculto',
        detail: path,
        origin: 'PPTX / slide show attr',
      });
    }
    allText += `${stripXml(xml)}\n`;
    links += countTag(xml, 'hlinkClick');
    tables += countTag(xml, 'graphicFrame');
    const fontRe = /typeface="([^"]+)"/g;
    let fm: RegExpExecArray | null;
    while ((fm = fontRe.exec(xml))) {
      if (fm[1] && fm[1] !== '+mj-lt' && fm[1] !== '+mn-lt') fonts.add(fm[1]);
    }
  }

  const noteFiles = names.filter((n) => /^ppt\/notesSlides\//i.test(n));
  notes = noteFiles.length;
  comments = names.filter((n) => /comments/i.test(n)).length;

  result.statistics.words = sv(allText.trim() ? allText.trim().split(/\s+/).length : 0, 'PPTX / slides text', true);
  result.statistics.characters = sv(allText.replace(/\s+/g, ' ').trim().length, 'PPTX / slides text', true);
  result.statistics.fonts = sv(fonts.size, 'PPTX / typeface');
  result.fonts = [...fonts].map((name) => ({ name, origin: 'PPTX / a:latin|cs typeface' }));
  result.content.notes.push(notes ? `${notes} slides com notas` : 'Sem notas detectadas');
  result.content.comments = comments;
  result.content.links = links;
  result.content.tables = tables;
  if (hiddenCount) {
    result.statistics.custom.push({ label: 'Slides ocultos', value: hiddenCount, origin: 'PPTX / show attr' });
  }

  return result;
}
