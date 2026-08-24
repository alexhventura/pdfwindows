import { useState } from 'react';
import type { LanguageType } from '../../../types';
import { identifyDocumentFonts } from '../../../engines/fontIdentifier';
import type { FontIdentifierResult, FontFinding } from '../../../engines/fontIdentifier';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';

const VISIBLE_CARDS = 6;

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Identificador de Fontes',
    hero: 'Descubra quais fontes foram utilizadas em seus documentos PDF e Word.',
    dropTitle: 'Solte seus arquivos aqui',
    orText: 'ou',
    browse: 'Escolher arquivos',
    formats: 'PDF • DOCX',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Envie um arquivo PDF ou DOCX válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    analyzing: 'Analisando documento...',
    results: 'Fontes encontradas',
    resultsObjects: 'Fontes encontradas · {n} objetos de fonte',
    identifiedFamilies: 'Famílias identificadas · {n}',
    colFontFamily: 'Fonte/Família',
    reason: 'Motivo',
    unidentifiedReason: 'O PDF só expõe um identificador interno.',
    confidence: 'Confiança',
    identified: 'Fonte identificada',
    probable: 'Fonte mais provável',
    unidentified: 'Família não identificada',
    unidentifiedBody:
      'Não foi possível identificar a família da fonte com segurança. O PDF só expõe um identificador interno.',
    similarity: 'Similaridade visual',
    identificationConfidence: 'Confiança de identificação',
    alternatives: 'Outras possibilidades',
    methodDoc: 'Identificação técnica confirmada',
    methodSim: 'Análise de similaridade',
    methodUnknown: 'Não identificada',
    confidenceHigh: 'Identificação confirmada',
    confidenceConfirmed: 'Identificação confirmada',
    confidenceLabelHigh: 'Alta confiança',
    confidenceGood: 'Boa probabilidade',
    confidencePossible: 'Possível correspondência',
    confidenceLow: 'Baixa confiança',
    confidenceNone: 'Sem identificação',
    confidenceEstimated: 'Estimativa',
    again: 'Analisar outro documento',
    privacy: 'Processamento 100% local no navegador. Seu arquivo não é enviado a servidores.',
    howTitle: 'Como funciona',
    how1: 'Quando o PDF declara a família (BaseFont, PostScript, FontDescriptor), mostramos identificação direta — nunca um código interno como nome da fonte.',
    how2: 'Se só houver um identificador gerado (subset, pdf.js, objeto), mostramos isso em detalhes técnicos e, se couber, uma similaridade visual — nunca como 100%.',
    how3: 'Formatos aceitos: PDF e DOCX. PDFs escaneados (só imagem) não têm fonte PDF identificável.',
    noFonts: 'Nenhuma fonte identificável foi encontrada neste documento.',
    scanned:
      'Este PDF parece ser uma imagem/escaneamento: não há dicionário de fontes nem texto extraível. Não existe necessariamente uma fonte PDF identificável.',
    errorGeneric: 'Não foi possível analisar este documento. Verifique se o arquivo não está corrompido.',
    titleEl: 'Título',
    bodyEl: 'Corpo',
    subtitleEl: 'Subtítulo',
    footerEl: 'Rodapé',
    captionEl: 'Legenda',
    headerEl: 'Cabeçalho',
    sample: 'Texto com esta fonte',
    sampleUnreliable: 'Texto extraído com baixa confiabilidade',
    sampleUnreliableWhy: 'O mapa Unicode (ToUnicode) pode estar ausente ou o encoding não permite reconstruir o texto.',
    showMore: 'Ver mais fontes ({n})',
    showLess: 'Mostrar menos',
    occurrences: 'Ocorrências',
    pages: 'Páginas',
    summary: 'Resumo',
    colFont: 'Fonte',
    colType: 'Tipo',
    colEmbed: 'Incorporação',
    embeddedYes: 'Incorporada',
    embeddedNo: 'Não incorporada',
    embeddedUnknown: 'Não informado pelo PDF',
    subsetYes: 'Subset',
    howIdentified: 'Como identificamos',
    howDoc: 'A fonte foi identificada a partir dos dados internos declarados no documento.',
    howSubset: 'A fonte está incorporada no PDF como subset (apenas parte dos glifos).',
    howSim: 'A família foi inferida por similaridade de nome — não é uma identificação confirmada.',
    howUnknown: 'Só há um identificador interno; não afirmamos uma família comercial.',
    techToggle: 'Mostrar detalhes técnicos',
    techHide: 'Ocultar detalhes técnicos',
    techTitle: 'Identificação técnica',
    techInternal: 'Nome interno',
    techPs: 'Nome PostScript',
    techBase: 'BaseFont',
    techFontName: 'FontName',
    techType: 'Tipo',
    techSubtype: 'Subtipo PDF',
    techEnc: 'Encoding',
    techEmbed: 'Embutida',
    techSubset: 'Subset',
    techUni: 'ToUnicode',
    techCid: 'CIDSystemInfo',
    techObj: 'Objeto PDF',
    yes: 'Sim',
    no: 'Não',
    notInformed: 'Não informado',
    mainFont: 'Fonte principal encontrada',
    otherFonts: 'Outras fontes',
  },
  en: {
    title: 'Font Identifier',
    hero: 'Discover which fonts were used in your PDF and Word documents.',
    dropTitle: 'Drop your files here',
    orText: 'or',
    browse: 'Choose files',
    formats: 'PDF • DOCX',
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF or DOCX file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    analyzing: 'Analyzing document...',
    results: 'Fonts found',
    resultsObjects: 'Fonts found · {n} font objects',
    identifiedFamilies: 'Identified families · {n}',
    colFontFamily: 'Font/Family',
    reason: 'Reason',
    unidentifiedReason: 'The PDF only exposes an internal identifier.',
    confidence: 'Confidence',
    identified: 'Font identified',
    probable: 'Most likely font',
    unidentified: 'Family not identified',
    unidentifiedBody:
      'We could not identify the font family safely. The PDF only exposes an internal identifier.',
    similarity: 'Visual similarity',
    identificationConfidence: 'Identification confidence',
    alternatives: 'Other possibilities',
    methodDoc: 'Technical identification confirmed',
    methodSim: 'Similarity analysis',
    methodUnknown: 'Not identified',
    confidenceHigh: 'Confirmed identification',
    confidenceConfirmed: 'Confirmed identification',
    confidenceLabelHigh: 'High confidence',
    confidenceGood: 'Good probability',
    confidencePossible: 'Possible match',
    confidenceLow: 'Low confidence',
    confidenceNone: 'No identification',
    confidenceEstimated: 'Estimate',
    again: 'Analyze another document',
    privacy: '100% local browser processing. Your file is never uploaded to servers.',
    howTitle: 'How it works',
    how1: 'When the PDF declares the family (BaseFont, PostScript, FontDescriptor), we show a direct identification — never an internal code as the font name.',
    how2: 'If only a generated id exists (subset, pdf.js, object), we keep it under technical details and, if useful, visual similarity — never as 100%.',
    how3: 'Accepted formats: PDF and DOCX. Scanned image-only PDFs have no identifiable PDF font.',
    noFonts: 'No identifiable fonts were found in this document.',
    scanned:
      'This PDF appears to be a scan/image: there is no font dictionary and no extractable text. There is not necessarily an identifiable PDF font.',
    errorGeneric: 'Could not analyze this document. Check that the file is not corrupted.',
    titleEl: 'Title',
    bodyEl: 'Body',
    subtitleEl: 'Subtitle',
    footerEl: 'Footer',
    captionEl: 'Caption',
    headerEl: 'Header',
    sample: 'Text using this font',
    sampleUnreliable: 'Extracted text has low reliability',
    sampleUnreliableWhy: 'The Unicode map (ToUnicode) may be missing or the encoding cannot reconstruct the text.',
    showMore: 'Show more fonts ({n})',
    showLess: 'Show less',
    occurrences: 'Occurrences',
    pages: 'Pages',
    summary: 'Summary',
    colFont: 'Font',
    colType: 'Type',
    colEmbed: 'Embedding',
    embeddedYes: 'Embedded',
    embeddedNo: 'Not embedded',
    embeddedUnknown: 'Not declared by the PDF',
    subsetYes: 'Subset',
    howIdentified: 'How we identified it',
    howDoc: 'The font was identified from names declared inside the document.',
    howSubset: 'The font is embedded in the PDF as a subset (only some glyphs).',
    howSim: 'The family was inferred by name similarity — not a confirmed identification.',
    howUnknown: 'Only an internal identifier is available; we do not claim a commercial family.',
    techToggle: 'Show technical details',
    techHide: 'Hide technical details',
    techTitle: 'Technical identification',
    techInternal: 'Internal name',
    techPs: 'PostScript name',
    techBase: 'BaseFont',
    techFontName: 'FontName',
    techType: 'Type',
    techSubtype: 'PDF subtype',
    techEnc: 'Encoding',
    techEmbed: 'Embedded',
    techSubset: 'Subset',
    techUni: 'ToUnicode',
    techCid: 'CIDSystemInfo',
    techObj: 'PDF object',
    yes: 'Yes',
    no: 'No',
    notInformed: 'Not informed',
    mainFont: 'Primary font found',
    otherFonts: 'Other fonts',
  },
  es: {
    title: 'Identificador de Fuentes',
    hero: 'Descubra qué fuentes se usaron en sus documentos PDF y Word.',
    dropTitle: 'Suelta tus archivos aquí',
    orText: 'o',
    browse: 'Elegir archivos',
    formats: 'PDF • DOCX',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Envíe un archivo PDF o DOCX válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    analyzing: 'Analizando documento...',
    results: 'Fuentes encontradas',
    resultsObjects: 'Fuentes encontradas · {n} objetos de fuente',
    identifiedFamilies: 'Familias identificadas · {n}',
    colFontFamily: 'Fuente/Familia',
    reason: 'Motivo',
    unidentifiedReason: 'El PDF solo expone un identificador interno.',
    confidence: 'Confianza',
    identified: 'Fuente identificada',
    probable: 'Fuente más probable',
    unidentified: 'Familia no identificada',
    unidentifiedBody:
      'No fue posible identificar la familia con seguridad. El PDF solo expone un identificador interno.',
    similarity: 'Similitud visual',
    identificationConfidence: 'Confianza de identificación',
    alternatives: 'Otras posibilidades',
    methodDoc: 'Identificación técnica confirmada',
    methodSim: 'Análisis de similitud',
    methodUnknown: 'No identificada',
    confidenceHigh: 'Identificación confirmada',
    confidenceConfirmed: 'Identificación confirmada',
    confidenceLabelHigh: 'Alta confianza',
    confidenceGood: 'Buena probabilidad',
    confidencePossible: 'Posible correspondencia',
    confidenceLow: 'Baja confianza',
    confidenceNone: 'Sin identificación',
    confidenceEstimated: 'Estimación',
    again: 'Analizar otro documento',
    privacy: 'Procesamiento 100% local en el navegador. Su archivo no se envía a servidores.',
    howTitle: 'Cómo funciona',
    how1: 'Cuando el PDF declara la familia (BaseFont, PostScript, FontDescriptor), mostramos identificación directa — nunca un código interno como nombre de fuente.',
    how2: 'Si solo hay un id generado (subset, pdf.js, objeto), lo dejamos en detalles técnicos y, si aplica, similitud visual — nunca como 100%.',
    how3: 'Formatos aceptados: PDF y DOCX. Los PDF escaneados (solo imagen) no tienen fuente PDF identificable.',
    noFonts: 'No se encontraron fuentes identificables en este documento.',
    scanned:
      'Este PDF parece un escaneo/imagen: no hay diccionario de fuentes ni texto extraíble. No existe necesariamente una fuente PDF identificable.',
    errorGeneric: 'No se pudo analizar este documento. Verifique que el archivo no esté corrupto.',
    titleEl: 'Título',
    bodyEl: 'Cuerpo',
    subtitleEl: 'Subtítulo',
    footerEl: 'Pie de página',
    captionEl: 'Leyenda',
    headerEl: 'Encabezado',
    sample: 'Texto con esta fuente',
    sampleUnreliable: 'Texto extraído con baja fiabilidad',
    sampleUnreliableWhy:
      'El mapa Unicode (ToUnicode) puede faltar o el encoding no permite reconstruir el texto.',
    showMore: 'Ver más fuentes ({n})',
    showLess: 'Mostrar menos',
    occurrences: 'Ocurrencias',
    pages: 'Páginas',
    summary: 'Resumen',
    colFont: 'Fuente',
    colType: 'Tipo',
    colEmbed: 'Incorporación',
    embeddedYes: 'Incorporada',
    embeddedNo: 'No incorporada',
    embeddedUnknown: 'No informado por el PDF',
    subsetYes: 'Subset',
    howIdentified: 'Cómo la identificamos',
    howDoc: 'La fuente se identificó a partir de los datos internos declarados en el documento.',
    howSubset: 'La fuente está incorporada en el PDF como subset (solo parte de los glifos).',
    howSim: 'La familia se infirió por similitud de nombre — no es una identificación confirmada.',
    howUnknown: 'Solo hay un identificador interno; no afirmamos una familia comercial.',
    techToggle: 'Mostrar detalles técnicos',
    techHide: 'Ocultar detalles técnicos',
    techTitle: 'Identificación técnica',
    techInternal: 'Nombre interno',
    techPs: 'Nombre PostScript',
    techBase: 'BaseFont',
    techFontName: 'FontName',
    techType: 'Tipo',
    techSubtype: 'Subtipo PDF',
    techEnc: 'Encoding',
    techEmbed: 'Incrustada',
    techSubset: 'Subset',
    techUni: 'ToUnicode',
    techCid: 'CIDSystemInfo',
    techObj: 'Objeto PDF',
    yes: 'Sí',
    no: 'No',
    notInformed: 'No informado',
    mainFont: 'Fuente principal encontrada',
    otherFonts: 'Otras fuentes',
  },
};

function elementLabel(id: string, t: Record<string, string>): string {
  const map: Record<string, string> = {
    title: t.titleEl,
    body: t.bodyEl,
    subtitle: t.subtitleEl,
    footer: t.footerEl,
    caption: t.captionEl,
    header: t.headerEl,
  };
  return map[id] || id;
}

function confidenceCopy(label: FontFinding['confidenceLabel'], t: Record<string, string>): string {
  switch (label) {
    case 'confirmed':
      return t.confidenceConfirmed;
    case 'high':
      return t.confidenceLabelHigh;
    case 'good':
      return t.confidenceGood;
    case 'possible':
      return t.confidencePossible;
    case 'low':
      return t.confidenceLow;
    case 'none':
      return t.confidenceNone;
    default:
      return t.confidenceEstimated;
  }
}

function flagLabel(v: boolean | null | undefined, t: Record<string, string>): string {
  if (v === true) return t.yes;
  if (v === false) return t.no;
  return t.notInformed;
}

function embedLabel(v: boolean | null | undefined, t: Record<string, string>): string {
  if (v === true) return t.embeddedYes;
  if (v === false) return t.embeddedNo;
  return t.notInformed;
}

function howCopy(f: FontFinding, t: Record<string, string>): string {
  if (f.identificationNote === 'subset-embedded') return t.howSubset;
  if (f.method === 'similarity') return t.howSim;
  if (f.method === 'unknown' || !f.familyIdentified) return t.howUnknown;
  return t.howDoc;
}

function displayFontLabel(f: FontFinding, t: Record<string, string>): string {
  if (!f.familyIdentified || !f.primary.name) return t.unidentified;
  const weight = f.primary.weightStyle?.trim();
  if (weight && !f.primary.name.toLowerCase().includes(weight.toLowerCase())) {
    return `${f.primary.name} ${weight}`;
  }
  return f.primary.name;
}

function identifiedFamilyCount(findings: FontFinding[]): number {
  const names = new Set(
    findings.filter((f) => f.familyIdentified && f.primary.name).map((f) => f.primary.name.trim().toLowerCase())
  );
  return names.size;
}

function findingKey(f: FontFinding, index: number): string {
  const tech = f.technical;
  return [
    f.primary.name || 'unidentified',
    f.primary.weightStyle || '',
    f.element,
    tech?.objectRef || '',
    tech?.internalName || '',
    tech?.encoding || '',
    tech?.baseFont || '',
    String(index),
  ].join('|');
}

function FontCard({ f, t }: { f: FontFinding; t: Record<string, string> }) {
  const [techOpen, setTechOpen] = useState(false);
  const isDirect = f.method === 'document' && f.familyIdentified;
  const isProbable = f.method === 'similarity';
  const isUnknown = !isDirect && !isProbable;
  const displayName = displayFontLabel(f, t);
  const familyCss = f.familyIdentified
    ? `"${f.primary.name.replace(/"/g, '')}", system-ui, sans-serif`
    : 'system-ui, sans-serif';
  const weight =
    /bold/i.test(f.primary.weightStyle || '') ? 700 : /light|thin/i.test(f.primary.weightStyle || '') ? 300 : 500;
  const italic = /italic|oblique/i.test(f.primary.weightStyle || '');
  const tech = f.technical;
  const role = f.element && f.element !== 'body' ? elementLabel(f.element, t) : null;

  return (
    <article className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-3">
      <div>
        {isUnknown ? (
          <h3 className="text-base font-semibold text-slate-900">{t.unidentified}</h3>
        ) : (
          <>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
              {isDirect ? t.identified : t.probable}
            </p>
            <h3 className="text-base font-semibold text-slate-900">{displayName}</h3>
          </>
        )}
        {role && <p className="text-[10px] font-semibold text-slate-400 mt-1">{role}</p>}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
          {isUnknown ? t.confidence : t.identificationConfidence}
        </p>
        <p className="text-xs font-semibold text-slate-600">
          {confidenceCopy(f.confidenceLabel, t)}
          {isDirect && f.confidencePercent === 100 ? ' · 100%' : ''}
        </p>
      </div>
      {isUnknown && (
        <p className="text-[11px] text-slate-600 leading-relaxed">
          <span className="font-semibold">{t.reason}: </span>
          {t.unidentifiedReason}
        </p>
      )}
      {isProbable && f.visualSimilarityPercent != null && (
        <p className="text-xs font-semibold text-amber-800">
          {t.similarity}: {f.visualSimilarityPercent}%
        </p>
      )}
      {!isUnknown && <p className="text-[11px] text-slate-500 leading-relaxed">{howCopy(f, t)}</p>}
      {f.sampleText ? (
        <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">{t.sample}</p>
          {f.sampleUnreliable && (
            <p className="text-[10px] text-amber-800 font-semibold mb-1">
              {t.sampleUnreliable}
              {f.sampleUnreliableReason ? ` — ${t.sampleUnreliableWhy}` : ''}
            </p>
          )}
          <p
            className="text-[13px] text-slate-800 leading-relaxed line-clamp-3"
            style={{
              fontFamily: familyCss,
              fontWeight: weight,
              fontStyle: italic ? 'italic' : 'normal',
            }}
            title={f.sampleText}
          >
            “{f.sampleText}
            {f.sampleText.length >= 100 ? '…' : ''}”
          </p>
        </div>
      ) : null}
      {isProbable && f.alternatives.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">{t.alternatives}</p>
          <ul className="space-y-1">
            {f.alternatives.map((a) => (
              <li key={a.name} className="text-[11px] text-slate-600 font-medium">
                {a.name}
                {a.similarity != null ? ` — ${a.similarity}%` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 font-semibold">
        {f.occurrences != null && f.occurrences > 0 && (
          <span>
            {t.occurrences}: {f.occurrences}
          </span>
        )}
        {(f.pageRangeLabel || (f.pages && f.pages.length > 0)) && (
          <span>
            {t.pages}: {f.pageRangeLabel || f.pages!.slice(0, 12).join(', ')}
          </span>
        )}
        {tech?.embedded != null && <span>{embedLabel(tech.embedded, t)}</span>}
        {tech?.subset ? <span>{t.subsetYes}</span> : null}
      </div>
      <button
        type="button"
        onClick={() => setTechOpen((v) => !v)}
        className="text-[11px] font-semibold text-win-blue"
      >
        {techOpen ? t.techHide : t.techToggle}
      </button>
      {techOpen && (
        <dl className="rounded-xl border border-slate-100 bg-white px-3 py-2.5 space-y-1.5 text-[11px]">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{t.techTitle}</p>
          {(
            [
              [t.techInternal, tech?.internalName],
              [t.techPs, tech?.postScriptName],
              [t.techBase, tech?.baseFont],
              [t.techFontName, tech?.fontName],
              [t.techType, tech?.pdfType],
              [t.techSubtype, tech?.subtype],
              [t.techEnc, tech?.encoding],
              [t.techEmbed, flagLabel(tech?.embedded, t)],
              [t.techSubset, flagLabel(tech?.subset, t)],
              [t.techUni, flagLabel(tech?.hasToUnicode, t)],
              [t.techCid, tech?.cidSystemInfo],
              [t.techObj, tech?.objectRef],
            ] as Array<[string, string | undefined]>
          ).map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-slate-400 font-semibold shrink-0">{label}</dt>
              <dd className="text-slate-700 font-medium text-right break-all">{value || t.notInformed}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

export default function FontIdentifierSuiteTool({
  lang,
  onClose,
  showHeader = false,
}: {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}) {
  const t = copy[lang];
  const closeLabel = lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FontIdentifierResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const reset = () => {
    setResult(null);
    setError(null);
    setFileName(null);
    setExpanded(false);
    onClose();
  };

  const run = async (file: File) => {
    setBusy(true);
    setError(null);
    setResult(null);
    setExpanded(false);
    setFileName(file.name);
    try {
      const res = await identifyDocumentFonts(file);
      setResult(res);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setBusy(false);
    }
  };

  const findings = result?.findings || [];
  const visible = expanded ? findings : findings.slice(0, VISIBLE_CARDS);
  const hiddenCount = Math.max(0, findings.length - VISIBLE_CARDS);
  const familyCount = identifiedFamilyCount(findings);

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-6">
        {!result && !busy && (
          <DocumentToolDropzone
            lang={lang}
            accept="pdf-docx"
            onFile={run}
            labels={{
              dropTitle: t.dropTitle,
              orText: t.orText,
              browse: t.browse,
              formats: t.formats,
              dropActive: t.dropActive,
              invalidFile: t.invalidFile,
              emptyFile: t.emptyFile,
              tooLarge: t.tooLarge,
            }}
          />
        )}

        {busy && <ToolBusyState label={t.analyzing} />}

        {error && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
            {error}
            <button type="button" onClick={reset} className="block mt-3 text-win-blue font-semibold">
              {t.again}
            </button>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {fileName && <p className="text-[11px] font-semibold text-slate-400 truncate">{fileName}</p>}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">
                {findings.length > 0 ? t.resultsObjects.replace('{n}', String(findings.length)) : t.results}
              </h3>
              {familyCount > 0 && (
                <p className="text-xs font-semibold text-slate-500">{t.identifiedFamilies.replace('{n}', String(familyCount))}</p>
              )}
            </div>
            {result.notes.includes('scanned-or-image') && (
              <p className="text-xs text-amber-800 font-medium bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                {t.scanned}
              </p>
            )}
            {findings.length === 0 ? (
              <p className="text-xs text-slate-600 font-medium">{t.noFonts}</p>
            ) : (
              <>
                {findings.length > 1 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-[11px]">
                      <thead className="bg-slate-50 text-slate-500 uppercase tracking-wide">
                        <tr>
                          <th className="text-left font-semibold px-3 py-2">{t.colFontFamily}</th>
                          <th className="text-left font-semibold px-3 py-2">{t.colType}</th>
                          <th className="text-left font-semibold px-3 py-2">{t.colEmbed}</th>
                          <th className="text-right font-semibold px-3 py-2">{t.occurrences}</th>
                          <th className="text-right font-semibold px-3 py-2">{t.pages}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {findings.map((f, i) => (
                          <tr key={findingKey(f, i)} className="border-t border-slate-100">
                            <td className="px-3 py-2 font-semibold text-slate-800">{displayFontLabel(f, t)}</td>
                            <td className="px-3 py-2 text-slate-600">{f.technical?.pdfType || t.notInformed}</td>
                            <td className="px-3 py-2 text-slate-600">{embedLabel(f.technical?.embedded, t)}</td>
                            <td className="px-3 py-2 text-right text-slate-600">
                              {f.occurrences != null ? f.occurrences : t.notInformed}
                            </td>
                            <td className="px-3 py-2 text-right text-slate-600">{f.pageRangeLabel || t.notInformed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {findings[0] && (
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{t.mainFont}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {visible.map((f, i) => (
                    <div key={findingKey(f, i)}>
                      <FontCard f={f} t={t} />
                    </div>
                  ))}
                </div>
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="w-full btn-secondary py-2.5 text-xs font-semibold inline-flex items-center justify-center gap-1.5"
                  >
                    {expanded ? t.showLess : t.showMore.replace('{n}', String(hiddenCount))}
                  </button>
                )}
              </>
            )}
            <button type="button" onClick={reset} className="w-full btn-primary py-3.5 font-semibold">
              {t.again}
            </button>
            <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
          </div>
        )}
      </div>
    </SuiteWorkspaceShell>
  );
}
