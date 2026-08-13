import { useState } from 'react';
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
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
    identified: 'Fonte encontrada',
    probable: 'Fonte mais provável',
    similarity: 'Similaridade estimada',
    alternatives: 'Outras possibilidades',
    methodDoc: 'Identificada no documento',
    methodSim: 'Similaridade',
    confidenceHigh: '100% identificada',
    again: 'Analisar outro documento',
    privacy: 'Processamento 100% local no navegador. Seu arquivo não é enviado a servidores.',
    howTitle: 'Como funciona',
    how1: 'Quando o PDF ou DOCX declara a fonte internamente, exibimos identificação direta com alta confiança.',
    how2: 'Se a informação for incompleta (fonte embutida com nome genérico ou subset), estimamos similaridade tipográfica — nunca como certeza absoluta.',
    how3: 'Formatos aceitos: PDF e DOCX. Arquivos corrompidos ou incompatíveis são rejeitados antes da análise.',
    noFonts: 'Nenhuma fonte identificável foi encontrada neste documento.',
    errorGeneric: 'Não foi possível analisar este documento. Verifique se o arquivo não está corrompido.',
    titleEl: 'Título',
    bodyEl: 'Corpo',
    subtitleEl: 'Subtítulo',
    footerEl: 'Rodapé',
    captionEl: 'Legenda',
    headerEl: 'Cabeçalho',
    sample: 'Texto com esta fonte',
    showMore: 'Ver mais fontes ({n})',
    showLess: 'Mostrar menos',
    occurrences: 'Ocorrências',
    pages: 'Páginas',
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
    identified: 'Font found',
    probable: 'Most likely font',
    similarity: 'Estimated similarity',
    alternatives: 'Other possibilities',
    methodDoc: 'Identified in the document',
    methodSim: 'Similarity',
    confidenceHigh: '100% identified',
    again: 'Analyze another document',
    privacy: '100% local browser processing. Your file is never uploaded to servers.',
    howTitle: 'How it works',
    how1: 'When a PDF or DOCX declares the font internally, we show a direct identification with high confidence.',
    how2: 'If information is incomplete (generic embedded names or subsets), we estimate typographic similarity — never as absolute certainty.',
    how3: 'Accepted formats: PDF and DOCX. Corrupt or incompatible files are rejected before analysis.',
    noFonts: 'No identifiable fonts were found in this document.',
    errorGeneric: 'Could not analyze this document. Check that the file is not corrupted.',
    titleEl: 'Title',
    bodyEl: 'Body',
    subtitleEl: 'Subtitle',
    footerEl: 'Footer',
    captionEl: 'Caption',
    headerEl: 'Header',
    sample: 'Text using this font',
    showMore: 'Show more fonts ({n})',
    showLess: 'Show less',
    occurrences: 'Occurrences',
    pages: 'Pages',
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
    identified: 'Fuente encontrada',
    probable: 'Fuente más probable',
    similarity: 'Similitud estimada',
    alternatives: 'Otras posibilidades',
    methodDoc: 'Identificada en el documento',
    methodSim: 'Similitud',
    confidenceHigh: '100% identificada',
    again: 'Analizar otro documento',
    privacy: 'Procesamiento 100% local en el navegador. Su archivo no se envía a servidores.',
    howTitle: 'Cómo funciona',
    how1: 'Cuando el PDF o DOCX declara la fuente internamente, mostramos identificación directa con alta confianza.',
    how2: 'Si la información es incompleta, estimamos similitud tipográfica — nunca como certeza absoluta.',
    how3: 'Formatos aceptados: PDF y DOCX. Los archivos corruptos o incompatibles se rechazan antes del análisis.',
    noFonts: 'No se encontraron fuentes identificables en este documento.',
    errorGeneric: 'No se pudo analizar este documento. Verifique que el archivo no esté corrupto.',
    titleEl: 'Título',
    bodyEl: 'Cuerpo',
    subtitleEl: 'Subtítulo',
    footerEl: 'Pie de página',
    captionEl: 'Leyenda',
    headerEl: 'Encabezado',
    sample: 'Texto con esta fuente',
    showMore: 'Ver más fuentes ({n})',
    showLess: 'Mostrar menos',
    occurrences: 'Ocurrencias',
    pages: 'Páginas',
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

function FontCard({ f, t }: { f: FontFinding; t: Record<string, string> }) {
  const isDirect = f.method === 'document';
  const familyCss = `"${f.primary.name.replace(/"/g, '')}", system-ui, sans-serif`;
  const weight =
    /bold/i.test(f.primary.weightStyle || '') ? 700 : /light|thin/i.test(f.primary.weightStyle || '') ? 300 : 500;
  const italic = /italic|oblique/i.test(f.primary.weightStyle || '');

  return (
    <article className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {elementLabel(f.element, t)}
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
            isDirect ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
          }`}
        >
          {isDirect ? t.methodDoc : t.methodSim}
        </span>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
          {isDirect ? t.identified : t.probable}
        </p>
        <h3 className="text-base font-semibold text-slate-900">
          {f.primary.name}
          {f.primary.weightStyle ? ` ${f.primary.weightStyle}` : ''}
        </h3>
      </div>
      <p className="text-xs font-semibold text-slate-600">
        {isDirect ? t.confidenceHigh : `${t.similarity}: ${f.confidencePercent}%`}
      </p>
      {f.sampleText ? (
        <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">{t.sample}</p>
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
      {!isDirect && f.alternatives.length > 0 && (
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
        {f.occurrences != null && (
          <span>
            {t.occurrences}: {f.occurrences}
          </span>
        )}
        {f.pages && f.pages.length > 0 && (
          <span>
            {t.pages}: {f.pages.slice(0, 12).join(', ')}
            {f.pages.length > 12 ? '…' : ''}
          </span>
        )}
      </div>
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
            <h3 className="text-sm font-semibold text-slate-800">
              {t.results}
              {findings.length > 0 ? ` · ${findings.length}` : ''}
            </h3>
            {findings.length === 0 ? (
              <p className="text-xs text-slate-600 font-medium">{t.noFonts}</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {visible.map((f, i) => (
                    <div key={`${f.primary.name}-${f.element}-${i}`}>
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
                    {expanded ? (
                      <>
                        <ChevronUp size={14} /> {t.showLess}
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} /> {t.showMore.replace('{n}', String(hiddenCount))}
                      </>
                    )}
                  </button>
                )}
              </>
            )}
            <button type="button" onClick={reset} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
              <RefreshCw size={14} /> {t.again}
            </button>
            <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
          </div>
        )}
      </div>
    </SuiteWorkspaceShell>
  );
}
