import { PDFDocument } from 'pdf-lib';
import { loadPdfJS } from '../../utils/pdfjsLoader';
import type { AnalysisResult, FileIdentification, HashInfo } from '../types';
import { emptyResult, sv } from '../types';

function parsePdfDate(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  // D:YYYYMMDDHHmmSS
  const m = raw.match(/D:(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?/);
  if (!m) return raw;
  const [, y, mo, d, h = '00', mi = '00', s = '00'] = m;
  return `${y}-${mo}-${d} ${h}:${mi}:${s}`;
}

function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

export async function analyzePdf(
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

  onStage?.('Extraindo metadados...');
  const u8 = new Uint8Array(buffer);
  const header = new TextDecoder('latin1').decode(u8.slice(0, 16));
  const verMatch = header.match(/%PDF-(\d\.\d)/);
  if (verMatch) {
    result.identification.formatVersion = sv(verMatch[1], 'PDF / header');
    result.structure.push({ label: 'Versão PDF', value: verMatch[1], origin: 'PDF / header' });
  }

  // Raw string scans (never execute)
  const latin = new TextDecoder('latin1').decode(u8);
  const hasJS = /\/JS\b|\/JavaScript\b/.test(latin);
  const hasEmbedded = /\/EmbeddedFiles\b|\/Filespec\b|\/EF\b/.test(latin);
  const hasAA = /\/AA\b|\/OpenAction\b/.test(latin);
  const objCount = (latin.match(/\b\d+\s+\d+\s+obj\b/g) || []).length;
  const streamCount = (latin.match(/\bstream\b/g) || []).length;
  result.structure.push({ label: 'Objetos (aprox.)', value: objCount, origin: 'PDF / body scan' });
  result.structure.push({ label: 'Streams (aprox.)', value: streamCount, origin: 'PDF / body scan' });

  if (hasJS) {
    result.hidden.push({
      severity: 'attention',
      label: 'JavaScript detectado',
      detail: 'Marcadores /JS ou /JavaScript encontrados. Não executados.',
      origin: 'PDF / body scan',
    });
    result.security.notes.push('JavaScript presente no arquivo (não executado).');
  }
  if (hasEmbedded) {
    result.hidden.push({
      severity: 'attention',
      label: 'Arquivos incorporados possíveis',
      detail: 'Referências a EmbeddedFiles/Filespec encontradas.',
      origin: 'PDF / body scan',
    });
  }
  if (hasAA) {
    result.hidden.push({
      severity: 'info',
      label: 'Ações automáticas',
      detail: 'OpenAction ou AA detectados (não executados).',
      origin: 'PDF / body scan',
    });
  }

  let encrypted = false;
  try {
    onStage?.('Analisando estrutura...');
    const doc = await PDFDocument.load(buffer, { ignoreEncryption: true, updateMetadata: false });
    encrypted = doc.isEncrypted;
    result.security.encrypted = encrypted;
    result.security.openPassword = encrypted;
    result.statistics.pages = sv(doc.getPageCount(), 'pdf-lib / getPageCount');

    const title = doc.getTitle();
    const author = doc.getAuthor();
    const subject = doc.getSubject();
    const keywords = doc.getKeywords();
    const creator = doc.getCreator();
    const producer = doc.getProducer();
    const creationDate = doc.getCreationDate();
    const modDate = doc.getModificationDate();

    if (title) result.metadata.push({ key: 'Title', value: title, origin: 'PDF / Info / Title' });
    if (author) {
      result.authorship.author = sv(author, 'PDF / Info / Author');
      result.metadata.push({ key: 'Author', value: author, origin: 'PDF / Info / Author' });
      result.hidden.push({
        severity: 'info',
        label: 'Autor identificado',
        detail: author,
        origin: 'PDF / Info / Author',
      });
    }
    if (subject) result.metadata.push({ key: 'Subject', value: subject, origin: 'PDF / Info / Subject' });
    if (keywords) result.metadata.push({ key: 'Keywords', value: keywords, origin: 'PDF / Info / Keywords' });
    if (creator) {
      result.authorship.creator = sv(creator, 'PDF / Info / Creator');
      result.metadata.push({ key: 'Creator', value: creator, origin: 'PDF / Info / Creator' });
      result.hidden.push({
        severity: 'info',
        label: 'Software criador identificado',
        detail: creator,
        origin: 'PDF / Info / Creator',
      });
    }
    if (producer) {
      result.authorship.producer = sv(producer, 'PDF / Info / Producer');
      result.metadata.push({ key: 'Producer', value: producer, origin: 'PDF / Info / Producer' });
    }
    if (creationDate) {
      result.dates.created = sv(creationDate.toISOString(), 'PDF / Info / CreationDate');
    }
    if (modDate) {
      result.dates.modified = sv(modDate.toISOString(), 'PDF / Info / ModDate');
    }

    const pages = doc.getPages();
    const sizes = new Map<string, number>();
    let rotated = 0;
    for (const p of pages) {
      const { width, height } = p.getSize();
      const key = `${Math.round(width)}×${Math.round(height)}`;
      sizes.set(key, (sizes.get(key) || 0) + 1);
      if (p.getRotation().angle % 360 !== 0) rotated += 1;
    }
    result.structure.push({
      label: 'Tamanhos de página',
      value: [...sizes.entries()].map(([k, v]) => `${k} (${v})`).join('; '),
      origin: 'pdf-lib / MediaBox',
    });
    if (rotated) {
      result.structure.push({ label: 'Páginas rotacionadas', value: rotated, origin: 'pdf-lib / Rotate' });
    }
  } catch (e) {
    result.security.notes.push(`pdf-lib: ${(e as Error).message}`);
    encrypted = /encrypt|password/i.test((e as Error).message);
    result.security.encrypted = encrypted;
  }

  if (encrypted) {
    result.security.notes.push('PDF criptografado — conteúdo textual limitado sem senha.');
    result.hidden.push({
      severity: 'attention',
      label: 'Proteção por senha',
      detail: 'Arquivo criptografado. Senha nunca é exibida.',
      origin: 'pdf-lib / encryption',
    });
  }

  // pdf.js for text/fonts/images when not needing password for open
  onStage?.('Analisando conteúdo...');
  try {
    const pdfjs = await loadPdfJS();
    const pdf = await pdfjs.getDocument({ data: buffer.slice(0) }).promise;
    const pageCount = pdf.numPages;
    if (!result.statistics.pages) {
      result.statistics.pages = sv(pageCount, 'pdf.js / numPages');
    }

    const fontMap = new Map<string, { embedded?: boolean; subset?: boolean; type?: string; pages: Set<number>; count: number }>();
    let totalText = '';
    let pagesWithText = 0;
    let imageOps = 0;
    let annotCount = 0;
    let linkCount = 0;

    const maxPages = pageCount;
    for (let i = 1; i <= maxPages; i++) {
      if (i % 10 === 0) {
        await new Promise<void>((r) => setTimeout(r, 0));
      }
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((it) => ('str' in it ? String(it.str) : ''))
        .join(' ');
      if (pageText.trim()) {
        pagesWithText += 1;
        totalText += `${pageText}\n`;
      }

      try {
        const ops = await page.getOperatorList();
        for (let oi = 0; oi < ops.fnArray.length; oi++) {
          const fn = ops.fnArray[oi];
          // paintImageXObject ≈ 85 in pdf.js
          if (fn === 85 || fn === 82) imageOps += 1;
        }
      } catch {
        /* ignore */
      }

      try {
        const annots = await page.getAnnotations();
        annotCount += annots.length;
        linkCount += annots.filter((a) => a.subtype === 'Link').length;
      } catch {
        /* ignore */
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const common = (page as any).commonObjs;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const objs = (page as any).objs;
        void common;
        void objs;
      } catch {
        /* ignore */
      }

      // Fonts from text items
      for (const item of textContent.items) {
        if (!('fontName' in item) || !item.fontName) continue;
        const name = String(item.fontName);
        const entry = fontMap.get(name) || { pages: new Set<number>(), count: 0, subset: name.includes('+') };
        entry.count += 1;
        entry.pages.add(i);
        entry.subset = name.includes('+');
        fontMap.set(name, entry);
      }
    }

    result.content.pagesWithText = pagesWithText;
    result.content.pagesWithoutText = Math.max(0, pageCount - pagesWithText);
    result.content.links = linkCount;
    result.content.comments = annotCount;
    result.statistics.words = sv(countWords(totalText), 'pdf.js / textContent');
    result.statistics.characters = sv(totalText.replace(/\s+/g, ' ').trim().length, 'pdf.js / textContent');
    result.statistics.charactersNoSpaces = sv(totalText.replace(/\s/g, '').length, 'pdf.js / textContent');
    result.statistics.images = sv(imageOps, 'pdf.js / operatorList (paintImage)', true);
    result.statistics.fonts = sv(fontMap.size, 'pdf.js / textContent.fontName');

    result.fonts = [...fontMap.entries()].map(([name, info]) => ({
      name: name.includes('+') ? name.split('+').slice(1).join('+') : name,
      internalName: name,
      subset: info.subset,
      occurrences: info.count,
      pages: [...info.pages],
      origin: 'pdf.js / textContent',
    }));

    result.structure.push({ label: 'Anotações', value: annotCount, origin: 'pdf.js / getAnnotations' });
    result.structure.push({ label: 'Links', value: linkCount, origin: 'pdf.js / annotations Link' });

    try {
      const outline = await pdf.getOutline();
      if (outline) {
        result.structure.push({ label: 'Bookmarks', value: outline.length, origin: 'pdf.js / getOutline' });
      }
    } catch {
      /* ignore */
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const meta = await (pdf as any).getMetadata?.();
      if (meta?.info) {
        for (const [k, v] of Object.entries(meta.info)) {
          if (v == null || v === '') continue;
          const val = String(v);
          if (!result.metadata.some((m) => m.key === k && m.value === val)) {
            result.metadata.push({ key: k, value: val, origin: 'pdf.js / Info' });
          }
          if (k === 'CreationDate' && !result.dates.created) {
            const parsed = parsePdfDate(val);
            if (parsed) result.dates.created = sv(parsed, 'pdf.js / Info / CreationDate');
          }
          if (k === 'ModDate' && !result.dates.modified) {
            const parsed = parsePdfDate(val);
            if (parsed) result.dates.modified = sv(parsed, 'pdf.js / Info / ModDate');
          }
        }
      }
      if (meta?.metadata) {
        result.advanced.push({
          key: 'XMP',
          value: 'Presente',
          origin: 'pdf.js / metadata',
        });
        result.hidden.push({
          severity: 'info',
          label: 'Metadados XMP',
          detail: 'Pacote XMP presente no PDF.',
          origin: 'pdf.js / metadata',
        });
      }
    } catch {
      /* ignore */
    }

    await pdf.destroy?.();
  } catch (e) {
    result.content.notes.push(`pdf.js: ${(e as Error).message}`);
  }

  if (result.metadata.length) {
    result.statistics.custom.push({
      label: 'Metadados',
      value: result.metadata.length,
      origin: 'aggregate',
    });
  }
  if (result.embedded.length || hasEmbedded) {
    result.statistics.custom.push({
      label: 'Arquivos incorporados',
      value: result.embedded.length || 'Possíveis (assinatura)',
      origin: hasEmbedded ? 'PDF / body scan' : 'aggregate',
    });
  }
  result.statistics.custom.push({
    label: 'Proteção',
    value: result.security.encrypted ? 'Sim' : 'Não',
    origin: 'pdf-lib / encryption',
  });

  return result;
}
