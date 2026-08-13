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
    .replace(/<w:tab\/>/g, '\t')
    .replace(/<w:br\/>/g, '\n')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

export async function analyzeDocx(
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
  result.structure.push({
    label: 'XMLs',
    value: names.filter((n) => n.endsWith('.xml')).length,
    origin: 'ZIP / entries',
  });
  result.structure.push({
    label: 'Imagens/mídia',
    value: names.filter((n) => /media\//i.test(n)).length,
    origin: 'ZIP / word/media',
  });

  const hasVba = names.some((n) => /vbaProject|macros/i.test(n));
  if (hasVba) {
    result.hidden.push({
      severity: 'attention',
      label: 'Macros possíveis',
      detail: 'Arquivos de macro detectados no pacote. Não executados.',
      origin: 'ZIP / macro paths',
    });
    result.security.notes.push('Possível conteúdo de macro (não executado).');
  }

  onStage?.('Extraindo metadados...');
  const core = await zip.file('docProps/core.xml')?.async('string');
  const app = await zip.file('docProps/app.xml')?.async('string');
  const custom = await zip.file('docProps/custom.xml')?.async('string');

  if (core) {
    const creator = textBetween(core, 'creator');
    const lastMod = textBetween(core, 'lastModifiedBy');
    const title = textBetween(core, 'title');
    const subject = textBetween(core, 'subject');
    const created = textBetween(core, 'created');
    const modified = textBetween(core, 'modified');
    if (creator) {
      result.authorship.author = sv(creator, 'DOCX / core.xml / creator');
      result.hidden.push({ severity: 'info', label: 'Autor identificado', detail: creator, origin: 'DOCX / core.xml' });
    }
    if (lastMod) result.authorship.lastAuthor = sv(lastMod, 'DOCX / core.xml / lastModifiedBy');
    if (title) result.metadata.push({ key: 'Title', value: title, origin: 'DOCX / core.xml' });
    if (subject) result.metadata.push({ key: 'Subject', value: subject, origin: 'DOCX / core.xml' });
    if (created) result.dates.contentCreated = sv(created, 'DOCX / core.xml / created');
    if (modified) result.dates.contentModified = sv(modified, 'DOCX / core.xml / modified');
  }

  if (app) {
    const application = textBetween(app, 'Application');
    const appVersion = textBetween(app, 'AppVersion');
    const company = textBetween(app, 'Company');
    const pages = textBetween(app, 'Pages');
    const words = textBetween(app, 'Words');
    const chars = textBetween(app, 'Characters');
    const paras = textBetween(app, 'Paragraphs');
    if (application) {
      result.authorship.application = sv(application, 'DOCX / app.xml / Application');
      result.hidden.push({
        severity: 'info',
        label: 'Software utilizado identificado',
        detail: application,
        origin: 'DOCX / app.xml',
      });
    }
    if (appVersion) result.authorship.applicationVersion = sv(appVersion, 'DOCX / app.xml / AppVersion');
    if (company) result.authorship.company = sv(company, 'DOCX / app.xml / Company');
    if (pages) result.statistics.pages = sv(Number(pages), 'DOCX / app.xml / Pages', true);
    if (words) result.statistics.words = sv(Number(words), 'DOCX / app.xml / Words');
    if (chars) result.statistics.characters = sv(Number(chars), 'DOCX / app.xml / Characters');
    if (paras) result.statistics.custom.push({ label: 'Parágrafos', value: Number(paras), origin: 'DOCX / app.xml' });
  }

  if (custom) {
    const propCount = countTag(custom, 'property');
    if (propCount) {
      result.hidden.push({
        severity: 'info',
        label: 'Propriedades personalizadas',
        detail: `${propCount} propriedades em custom.xml`,
        origin: 'DOCX / custom.xml',
      });
      result.advanced.push({ key: 'Custom properties', value: String(propCount), origin: 'DOCX / custom.xml' });
    }
  }

  onStage?.('Analisando conteúdo...');
  const documentXml = await zip.file('word/document.xml')?.async('string');
  if (documentXml) {
    const text = stripXml(documentXml);
    if (!result.statistics.words) {
      result.statistics.words = sv(text.trim() ? text.trim().split(/\s+/).length : 0, 'DOCX / document.xml', true);
    }
    if (!result.statistics.characters) {
      result.statistics.characters = sv(text.replace(/\s+/g, ' ').trim().length, 'DOCX / document.xml', true);
    }
    result.statistics.charactersNoSpaces = sv(text.replace(/\s/g, '').length, 'DOCX / document.xml', true);
    result.content.comments = countTag(documentXml, 'commentRangeStart');
    result.content.tables = countTag(documentXml, 'tbl');
    result.content.links = countTag(documentXml, 'hyperlink');
    result.statistics.images = sv(names.filter((n) => /word\/media\//i.test(n)).length, 'ZIP / word/media');

    // fonts from styles / theme / document rFonts
    const fontNames = new Set<string>();
    const fontRe = /w:ascii="([^"]+)"|w:hAnsi="([^"]+)"|w:eastAsia="([^"]+)"|w:cs="([^"]+)"/g;
    let fm: RegExpExecArray | null;
    while ((fm = fontRe.exec(documentXml))) {
      const name = fm[1] || fm[2] || fm[3] || fm[4];
      if (name) fontNames.add(name);
    }
    const styles = await zip.file('word/styles.xml')?.async('string');
    if (styles) {
      let sm: RegExpExecArray | null;
      const re2 = /w:ascii="([^"]+)"/g;
      while ((sm = re2.exec(styles))) fontNames.add(sm[1]);
    }
    result.fonts = [...fontNames].map((name) => ({ name, origin: 'DOCX / document.xml|styles.xml' }));
    result.statistics.fonts = sv(fontNames.size, 'DOCX / fonts');
  }

  const settings = await zip.file('word/settings.xml')?.async('string');
  if (settings?.includes('documentProtection')) {
    result.security.notes.push('Proteção de documento detectada em settings.xml.');
    result.hidden.push({
      severity: 'attention',
      label: 'Proteção de edição',
      detail: 'documentProtection presente.',
      origin: 'DOCX / settings.xml',
    });
  }
  if (settings?.includes('trackRevisions') || documentXml?.includes('w:ins') || documentXml?.includes('w:del')) {
    result.hidden.push({
      severity: 'info',
      label: 'Revisões / controle de alterações',
      detail: 'Marcas de revisão detectadas.',
      origin: 'DOCX / document|settings',
    });
  }

  // Internal listing (advanced)
  for (const n of names.slice(0, 200)) {
    const f = zip.files[n];
    if (f.dir) continue;
    result.advanced.push({
      key: n,
      value: 'entry',
      origin: 'ZIP / entry',
    });
  }

  result.statistics.custom.push({ label: 'Metadados', value: result.metadata.length, origin: 'aggregate' });
  return result;
}
