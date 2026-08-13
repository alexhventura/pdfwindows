import { useState } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  Download,
  AlertTriangle,
} from 'lucide-react';
import type { LanguageType } from '../../../types';
import {
  analyzeFile,
  formatBytes,
  exportAnalysisJson,
  exportAnalysisTxt,
  exportAnalysisPdf,
  type AnalysisResult,
} from '../../../fileXray';
import { DocumentToolDropzone, ToolBusyState } from '../DocumentToolDropzone';
import { ModalHeader, modalT } from '../shared';

type ViewLevel = 'summary' | 'details' | 'advanced';

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Raio X de Arquivo',
    hero: 'Descubra os dados técnicos, estrutura, metadados e informações adicionais presentes em seus arquivos.',
    dropTitle: 'Arraste seu arquivo aqui',
    dropHint: 'ou selecione um arquivo do seu dispositivo',
    browse: 'Selecionar arquivo',
    formats: 'PDF • DOCX • XLSX • PPTX • JPG • PNG • WEBP • GIF • CSV • TXT • ZIP',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Formato não suportado para Raio X.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    analyzing: 'Analisando arquivo...',
    done: 'Raio X concluído',
    again: 'Analisar outro arquivo',
    privacy:
      'Seu arquivo é analisado no seu dispositivo e não é enviado para nossos servidores.',
    summary: 'Resumo',
    details: 'Detalhes',
    advanced: 'Avançado',
    copy: 'Copiar',
    copied: 'Copiado.',
    export: 'Exportar relatório',
    exportPdf: 'PDF',
    exportJson: 'JSON',
    exportTxt: 'TXT',
    file: 'Arquivo',
    type: 'Tipo',
    size: 'Tamanho',
    hash: 'Hash SHA-256',
    origin: 'Origem',
    na: 'Não disponível no arquivo.',
    estimate: 'Estimativa',
    overview: 'Visão geral',
    identification: 'Identificação',
    dates: 'Datas',
    authorship: 'Autoria e origem',
    statistics: 'Estatísticas',
    fonts: 'Fontes',
    structure: 'Estrutura',
    metadata: 'Metadados',
    security: 'Segurança',
    additional: 'Informações adicionais',
    embedded: 'Conteúdo incorporado',
    hashes: 'Hashes',
    internal: 'Estrutura interna',
    advancedData: 'Dados avançados',
    inconsistency: 'Possível inconsistência encontrada.',
    errorGeneric: 'Não foi possível analisar este arquivo.',
    cta: 'Fazer raio X',
  },
  en: {
    title: 'File X-Ray',
    hero: 'Discover technical data, structure, metadata, and additional information inside your files.',
    dropTitle: 'Drag your file here',
    dropHint: 'or select a file from your device',
    browse: 'Select file',
    formats: 'PDF • DOCX • XLSX • PPTX • JPG • PNG • WEBP • GIF • CSV • TXT • ZIP',
    dropActive: 'Drop the file here',
    invalidFile: 'Unsupported format for File X-Ray.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    analyzing: 'Analyzing file...',
    done: 'X-Ray complete',
    again: 'Analyze another file',
    privacy: 'Your file is analyzed on your device and is not uploaded to our servers.',
    summary: 'Summary',
    details: 'Details',
    advanced: 'Advanced',
    copy: 'Copy',
    copied: 'Copied.',
    export: 'Export report',
    exportPdf: 'PDF',
    exportJson: 'JSON',
    exportTxt: 'TXT',
    file: 'File',
    type: 'Type',
    size: 'Size',
    hash: 'SHA-256 hash',
    origin: 'Origin',
    na: 'Not available in the file.',
    estimate: 'Estimate',
    overview: 'Overview',
    identification: 'Identification',
    dates: 'Dates',
    authorship: 'Authorship & origin',
    statistics: 'Statistics',
    fonts: 'Fonts',
    structure: 'Structure',
    metadata: 'Metadata',
    security: 'Security',
    additional: 'Additional information',
    embedded: 'Embedded content',
    hashes: 'Hashes',
    internal: 'Internal structure',
    advancedData: 'Advanced data',
    inconsistency: 'Possible type inconsistency found.',
    errorGeneric: 'Could not analyze this file.',
    cta: 'Run X-Ray',
  },
  es: {
    title: 'Rayos X de Archivo',
    hero: 'Descubra datos técnicos, estructura, metadatos e información adicional de sus archivos.',
    dropTitle: 'Arrastre su archivo aquí',
    dropHint: 'o seleccione un archivo de su dispositivo',
    browse: 'Seleccionar archivo',
    formats: 'PDF • DOCX • XLSX • PPTX • JPG • PNG • WEBP • GIF • CSV • TXT • ZIP',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Formato no compatible con Rayos X.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    analyzing: 'Analizando archivo...',
    done: 'Rayos X completado',
    again: 'Analizar otro archivo',
    privacy: 'Su archivo se analiza en su dispositivo y no se envía a nuestros servidores.',
    summary: 'Resumen',
    details: 'Detalles',
    advanced: 'Avanzado',
    copy: 'Copiar',
    copied: 'Copiado.',
    export: 'Exportar informe',
    exportPdf: 'PDF',
    exportJson: 'JSON',
    exportTxt: 'TXT',
    file: 'Archivo',
    type: 'Tipo',
    size: 'Tamaño',
    hash: 'Hash SHA-256',
    origin: 'Origen',
    na: 'No disponible en el archivo.',
    estimate: 'Estimación',
    overview: 'Visión general',
    identification: 'Identificación',
    dates: 'Fechas',
    authorship: 'Autoría y origen',
    statistics: 'Estadísticas',
    fonts: 'Fuentes',
    structure: 'Estructura',
    metadata: 'Metadatos',
    security: 'Seguridad',
    additional: 'Información adicional',
    embedded: 'Contenido incorporado',
    hashes: 'Hashes',
    internal: 'Estructura interna',
    advancedData: 'Datos avanzados',
    inconsistency: 'Posible inconsistencia de tipo encontrada.',
    errorGeneric: 'No se pudo analizar este archivo.',
    cta: 'Hacer rayos X',
  },
};

function FieldRow({
  label,
  value,
  origin,
  estimated,
  t,
  onCopy,
}: {
  label: string;
  value: string;
  origin?: string;
  estimated?: boolean;
  t: Record<string, string>;
  onCopy: (v: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 py-2 border-b border-slate-100 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-800 break-words">
          {value}
          {estimated ? (
            <span className="ml-2 text-[10px] font-semibold text-amber-600 uppercase">{t.estimate}</span>
          ) : null}
        </p>
        {origin ? (
          <p className="text-[10px] text-slate-400 mt-0.5">
            {t.origin}: {origin}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-win-blue hover:bg-blue-50 px-2 py-1 rounded-lg"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            onCopy(value);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            /* ignore */
          }
        }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? t.copied : t.copy}
      </button>
    </div>
  );
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function FileXraySuiteTool({
  lang,
  onClose,
  showHeader = false,
}: {
  lang: LanguageType;
  onClose: () => void;
  showHeader?: boolean;
}) {
  const t = copy[lang];
  const closeLabel = modalT[lang].close;
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [level, setLevel] = useState<ViewLevel>('summary');

  const onFile = async (file: File) => {
    setError(null);
    setResult(null);
    setBusy(true);
    setStage(t.analyzing);
    try {
      const analysis = await analyzeFile(file, (_s, msg) => setStage(msg));
      setResult(analysis);
      setLevel('summary');
    } catch {
      setError(t.errorGeneric);
    } finally {
      setBusy(false);
      setStage('');
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLevel('summary');
  };

  const id = result?.identification;
  const stats = result?.statistics;
  const showDetails = level !== 'summary';
  const showAdvanced = level === 'advanced';

  const summaryCards: Array<{ label: string; value: string }> = [];
  if (result && id && stats) {
    summaryCards.push(
      { label: t.file, value: id.name },
      { label: t.type, value: id.detectedFormat.toUpperCase() },
      { label: t.size, value: formatBytes(result.fileSizeBytes) },
    );
    if (stats.pages) summaryCards.push({ label: lang === 'en' ? 'Pages' : lang === 'es' ? 'Páginas' : 'Páginas', value: String(stats.pages.value) });
    if (stats.slides) summaryCards.push({ label: 'Slides', value: String(stats.slides.value) });
    if (stats.sheets) summaryCards.push({ label: lang === 'en' ? 'Sheets' : 'Planilhas', value: String(stats.sheets.value) });
    if (stats.words) summaryCards.push({ label: lang === 'en' ? 'Words' : lang === 'es' ? 'Palabras' : 'Palavras', value: String(stats.words.value) });
    if (stats.characters) summaryCards.push({ label: lang === 'en' ? 'Characters' : lang === 'es' ? 'Caracteres' : 'Caracteres', value: String(stats.characters.value) });
    if (stats.fonts) summaryCards.push({ label: t.fonts, value: String(stats.fonts.value) });
    if (stats.images) summaryCards.push({ label: lang === 'en' ? 'Images' : 'Imagens', value: String(stats.images.value) });
    if (stats.width && stats.height) {
      summaryCards.push({ label: lang === 'en' ? 'Dimensions' : 'Dimensões', value: `${stats.width.value} × ${stats.height.value}` });
    }
    if (stats.formulas) summaryCards.push({ label: lang === 'en' ? 'Formulas' : 'Fórmulas', value: String(stats.formulas.value) });
    if (stats.rows) summaryCards.push({ label: lang === 'en' ? 'Rows' : 'Linhas', value: String(stats.rows.value) });
    if (stats.columns) summaryCards.push({ label: lang === 'en' ? 'Columns' : 'Colunas', value: String(stats.columns.value) });
    for (const c of stats.custom.slice(0, 6)) {
      summaryCards.push({ label: c.label, value: String(c.value) });
    }
    summaryCards.push({ label: t.hash, value: `${result.hashes.sha256.slice(0, 16)}…` });
  }

  return (
    <>
      {showHeader ? <ModalHeader title={t.title} onClose={onClose} closeLabel={closeLabel} /> : null}
      <div className="p-6 space-y-6">
        {busy && <ToolBusyState label={stage || t.analyzing} />}

        {!busy && !result && (
          <>
            <DocumentToolDropzone
              lang={lang}
              accept="file-xray"
              labels={{
                dropTitle: t.dropTitle,
                dropHint: t.dropHint,
                browse: t.browse,
                formats: t.formats,
                dropActive: t.dropActive,
                invalidFile: t.invalidFile,
                emptyFile: t.emptyFile,
                tooLarge: t.tooLarge,
              }}
              onFile={onFile}
            />
            {error ? (
              <p role="alert" className="text-xs font-semibold text-rose-600">
                {error}
              </p>
            ) : null}
          </>
        )}

        {!busy && result && id && stats && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 mb-1">{t.done}</p>
                <p className="text-xs text-slate-500">{id.name}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 px-3 py-2 rounded-xl"
                >
                  <RefreshCw size={14} aria-hidden />
                  {t.again}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl w-fit" role="tablist" aria-label={t.summary}>
              {([
                ['summary', t.summary],
                ['details', t.details],
                ['advanced', t.advanced],
              ] as const).map(([idLevel, label]) => (
                <button
                  key={idLevel}
                  type="button"
                  role="tab"
                  aria-selected={level === idLevel}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                    level === idLevel ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setLevel(idLevel)}
                >
                  {label}
                </button>
              ))}
            </div>

            <section aria-label={t.overview} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {summaryCards.map((card) => (
                <div key={card.label + card.value} className="p-4 border border-slate-200/80 rounded-2xl bg-white/60">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{card.label}</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5 break-all">{card.value}</p>
                </div>
              ))}
            </section>

            {id.inconsistency ? (
              <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] font-semibold text-amber-900">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" aria-hidden />
                <span>{id.inconsistencyNote || t.inconsistency}</span>
              </div>
            ) : null}

            {result.hidden.length > 0 ? (
              <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">{t.additional}</h3>
                <ul className="space-y-2">
                  {result.hidden.map((h, i) => (
                    <li key={`${h.label}-${i}`} className="flex items-start gap-2 text-[12px]">
                      <AlertTriangle
                        size={14}
                        className={`shrink-0 mt-0.5 ${h.severity === 'attention' ? 'text-amber-500' : 'text-slate-400'}`}
                        aria-hidden
                      />
                      <div>
                        <p className="font-semibold text-slate-800">{h.label}</p>
                        <p className="text-slate-500">{h.detail}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {t.origin}: {h.origin}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.identification}</h3>
              <FieldRow label={t.file} value={id.name} t={t} onCopy={() => undefined} />
              <FieldRow label={t.type} value={id.detectedFormat.toUpperCase()} origin="magic bytes / analyzers" t={t} onCopy={() => undefined} />
              <FieldRow label="MIME" value={id.detectedMime} origin="detection" t={t} onCopy={() => undefined} />
              <FieldRow label={t.size} value={`${formatBytes(result.fileSizeBytes)} (${result.fileSizeBytes} bytes)`} t={t} onCopy={() => undefined} />
              <FieldRow label={t.hash} value={result.hashes.sha256} origin="Web Crypto / SHA-256" t={t} onCopy={() => undefined} />
              {result.hashes.sha1 ? (
                <FieldRow label="SHA-1" value={result.hashes.sha1} origin="Web Crypto / SHA-1" t={t} onCopy={() => undefined} />
              ) : null}
              <FieldRow label={lang === 'en' ? 'Signature' : 'Assinatura'} value={id.magicSignature} origin="magic bytes" t={t} onCopy={() => undefined} />
            </section>

            {showDetails ? (
              <>
                <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.authorship}</h3>
                  {result.authorship.author ? (
                    <FieldRow label="Autor" value={result.authorship.author.value} origin={result.authorship.author.origin} t={t} onCopy={() => undefined} />
                  ) : (
                    <p className="text-xs text-slate-500 py-2">Autor: {t.na}</p>
                  )}
                  {result.authorship.creator ? (
                    <FieldRow label="Creator" value={result.authorship.creator.value} origin={result.authorship.creator.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.authorship.producer ? (
                    <FieldRow label="Producer" value={result.authorship.producer.value} origin={result.authorship.producer.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.authorship.application ? (
                    <FieldRow label="Application" value={result.authorship.application.value} origin={result.authorship.application.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.authorship.company ? (
                    <FieldRow label="Company" value={result.authorship.company.value} origin={result.authorship.company.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.authorship.lastAuthor ? (
                    <FieldRow label="Last author" value={result.authorship.lastAuthor.value} origin={result.authorship.lastAuthor.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                </section>

                <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.dates}</h3>
                  {result.dates.created ? (
                    <FieldRow label="Created" value={result.dates.created.value} origin={result.dates.created.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.dates.modified ? (
                    <FieldRow label="Modified" value={result.dates.modified.value} origin={result.dates.modified.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.dates.contentCreated ? (
                    <FieldRow label="Content created" value={result.dates.contentCreated.value} origin={result.dates.contentCreated.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {result.dates.contentModified ? (
                    <FieldRow label="Content modified" value={result.dates.contentModified.value} origin={result.dates.contentModified.origin} t={t} onCopy={() => undefined} />
                  ) : null}
                  {!result.dates.created && !result.dates.modified && !result.dates.contentCreated && !result.dates.contentModified ? (
                    <p className="text-xs text-slate-500 py-2">{t.na}</p>
                  ) : null}
                </section>

                <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.statistics}</h3>
                  {stats.pages ? <FieldRow label="Pages" value={String(stats.pages.value)} origin={stats.pages.origin} estimated={stats.pages.estimated} t={t} onCopy={() => undefined} /> : null}
                  {stats.words ? <FieldRow label="Words" value={String(stats.words.value)} origin={stats.words.origin} estimated={stats.words.estimated} t={t} onCopy={() => undefined} /> : null}
                  {stats.characters ? <FieldRow label="Characters" value={String(stats.characters.value)} origin={stats.characters.origin} estimated={stats.characters.estimated} t={t} onCopy={() => undefined} /> : null}
                  {stats.images ? <FieldRow label="Images" value={String(stats.images.value)} origin={stats.images.origin} estimated={stats.images.estimated} t={t} onCopy={() => undefined} /> : null}
                  {stats.fonts ? <FieldRow label="Fonts" value={String(stats.fonts.value)} origin={stats.fonts.origin} t={t} onCopy={() => undefined} /> : null}
                  {stats.sheets ? <FieldRow label="Sheets" value={String(stats.sheets.value)} origin={stats.sheets.origin} t={t} onCopy={() => undefined} /> : null}
                  {stats.formulas ? <FieldRow label="Formulas" value={String(stats.formulas.value)} origin={stats.formulas.origin} t={t} onCopy={() => undefined} /> : null}
                  {stats.slides ? <FieldRow label="Slides" value={String(stats.slides.value)} origin={stats.slides.origin} t={t} onCopy={() => undefined} /> : null}
                  {stats.width ? <FieldRow label="Width" value={String(stats.width.value)} origin={stats.width.origin} t={t} onCopy={() => undefined} /> : null}
                  {stats.height ? <FieldRow label="Height" value={String(stats.height.value)} origin={stats.height.origin} t={t} onCopy={() => undefined} /> : null}
                  {stats.custom.map((c) => (
                    <div key={c.label}>
                      <FieldRow label={c.label} value={String(c.value)} origin={c.origin} estimated={c.estimated} t={t} onCopy={() => undefined} />
                    </div>
                  ))}
                </section>

                {result.fonts.length > 0 ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.fonts}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="text-slate-400 uppercase tracking-wider">
                            <th className="py-1 pr-2">Name</th>
                            <th className="py-1 pr-2">Subset</th>
                            <th className="py-1">Origin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.fonts.slice(0, 40).map((f) => (
                            <tr key={f.internalName || f.name} className="border-t border-slate-100">
                              <td className="py-1.5 pr-2 font-semibold text-slate-800">{f.name}</td>
                              <td className="py-1.5 pr-2">{f.subset ? 'yes' : '—'}</td>
                              <td className="py-1.5 text-slate-400">{f.origin}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                ) : null}

                {result.structure.length > 0 ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.structure}</h3>
                    {result.structure.map((s) => (
                      <div key={s.label}>
                        <FieldRow label={s.label} value={String(s.value)} origin={s.origin} t={t} onCopy={() => undefined} />
                      </div>
                    ))}
                  </section>
                ) : null}

                {result.metadata.length > 0 ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.metadata}</h3>
                    {result.metadata.slice(0, level === 'details' ? 40 : 200).map((m) => (
                      <div key={`${m.key}-${m.value}`}>
                        <FieldRow label={m.key} value={m.value} origin={m.origin} t={t} onCopy={() => undefined} />
                      </div>
                    ))}
                  </section>
                ) : null}

                {(result.security.encrypted != null || result.security.notes.length > 0) && (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.security}</h3>
                    {result.security.encrypted != null ? (
                      <FieldRow
                        label="Encrypted"
                        value={result.security.encrypted ? 'Yes' : 'No'}
                        origin="analyzer"
                        t={t}
                        onCopy={() => undefined}
                      />
                    ) : null}
                    {result.security.notes.map((n) => (
                      <p key={n} className="text-xs text-slate-600">
                        {n}
                      </p>
                    ))}
                  </section>
                )}

                {result.image?.gps ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">GPS</h3>
                    <FieldRow
                      label="Coordinates"
                      value={`${result.image.gps.latitude}, ${result.image.gps.longitude}`}
                      origin={result.image.gps.origin}
                      t={t}
                      onCopy={() => undefined}
                    />
                  </section>
                ) : null}

                {result.content.sheets && result.content.sheets.length > 0 ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Sheets</h3>
                    <ul className="space-y-2 text-[12px]">
                      {result.content.sheets.map((s) => (
                        <li key={s.name} className="border-b border-slate-100 pb-2">
                          <p className="font-semibold text-slate-800">
                            {s.name}
                            {s.veryHidden ? ' (VeryHidden)' : s.hidden ? ' (hidden)' : ''}
                          </p>
                          <p className="text-slate-500">
                            rows={s.rows ?? '—'} cols={s.cols ?? '—'} formulas={s.formulas ?? '—'}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {t.origin}: {s.origin}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {result.content.formulaBreakdown?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.content.formulaBreakdown.map((f) => (
                          <span key={f.fn} className="text-[10px] font-semibold bg-slate-100 px-2 py-1 rounded-lg text-slate-700">
                            {f.fn}: {f.count}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </section>
                ) : null}
              </>
            ) : null}

            {showAdvanced ? (
              <>
                {result.embedded.length > 0 ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.embedded}</h3>
                    <ul className="text-[11px] space-y-1 max-h-48 overflow-y-auto">
                      {result.embedded.slice(0, 100).map((e) => (
                        <li key={e.name} className="text-slate-600">
                          {e.name} <span className="text-slate-400">({e.kind})</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                {result.advanced.length > 0 ? (
                  <section className="p-4 border border-slate-200/80 rounded-2xl bg-white/60 space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.advancedData}</h3>
                    {result.advanced.slice(0, 150).map((a) => (
                      <div key={`${a.key}-${a.value}`}>
                        <FieldRow label={a.key} value={a.value} origin={a.origin} t={t} onCopy={() => undefined} />
                      </div>
                    ))}
                  </section>
                ) : null}
              </>
            ) : null}

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mr-1">{t.export}</span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-win-blue text-white px-3 py-2 rounded-xl"
                onClick={async () => {
                  const blob = await exportAnalysisPdf(result);
                  downloadBlob(blob, `raio-x-${id.name}.pdf`);
                }}
              >
                <Download size={14} aria-hidden />
                {t.exportPdf}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-800 text-white px-3 py-2 rounded-xl"
                onClick={() => downloadBlob(exportAnalysisJson(result), `raio-x-${id.name}.json`)}
              >
                {t.exportJson}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold border border-slate-200 text-slate-700 px-3 py-2 rounded-xl"
                onClick={() => downloadBlob(exportAnalysisTxt(result), `raio-x-${id.name}.txt`)}
              >
                {t.exportTxt}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
