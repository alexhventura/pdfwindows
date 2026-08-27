import { useMemo, useState } from 'react';
import type { LanguageType } from '../../../types';
import {
  convertDocument,
  identifyDocument,
  listConversionTargets,
  type ConversionGroupId,
  type ConversionTarget,
  type ConversionTargetId,
  type IdentifiedDocument,
} from '../../../engines/documentConverter';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';

const GROUP_ORDER: ConversionGroupId[] = ['word', 'universal', 'web', 'data', 'image'];

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Conversor de Documento',
    dropTitle: 'Solte seus arquivos aqui',
    orText: 'ou',
    browse: 'Escolher arquivos',
    formats: 'PDF • DOCX • XLSX • TXT • CSV • ODT • RTF • HTML',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Envie um documento Word, PDF, TXT, Excel, ODT, RTF ou HTML.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    identified: 'Arquivo identificado',
    extension: 'Extensão',
    familyWord: 'Documento Word',
    familyPdf: 'Documento PDF',
    familyText: 'Texto simples',
    familySheet: 'Planilha',
    familyWeb: 'Página web',
    familyRtf: 'Texto rico (RTF)',
    familyOdt: 'OpenDocument',
    familyLegacy: 'Word antigo (binário)',
    familyUnknown: 'Formato não reconhecido',
    choose: 'Escolha o formato de destino',
    convert: 'Converter e baixar',
    converting: 'Convertendo documento...',
    success: 'Conversão concluída',
    download: 'Baixar arquivo',
    again: 'Converter outro documento',
    privacy: 'Processamento 100% local no navegador. Seu arquivo não é enviado a servidores.',
    note: 'A conversão usa o conteúdo textual do arquivo. Layout complexo, macros e objetos incorporados não são reproduzidos.',
    legacy:
      'Este é um arquivo Word binário (.doc/.dot). O navegador não consegue convertê-lo. Abra no Word ou LibreOffice, salve como .docx e envie de novo.',
    unknown: 'Este formato não é suportado pelo Conversor de Documento.',
    errorGeneric: 'Não foi possível converter este arquivo. Verifique se o documento não está corrompido.',
    pdfNoText:
      'Este PDF não tem texto extraível. Use OCR de PDF para digitalizações e tente novamente.',
    groupWord: 'Formatos do Word',
    groupUniversal: 'Formatos de Texto e Documentos Universais',
    groupWeb: 'Formatos Web',
    groupImage: 'Formatos de Imagem e Outros',
    groupData: 'Planilha e dados',
    desc_docx: 'Formato padrão atual.',
    desc_pdf: 'Formato portátil da Adobe.',
    desc_rtf: 'Formato de texto rico.',
    desc_txt: 'Texto simples sem formatação.',
    desc_odt: 'Formato de texto OpenDocument.',
    desc_html: 'Página web completa.',
    desc_htm: 'Variante de página web.',
    desc_xml: 'Linguagem de marcação extensível.',
    desc_jpeg: 'Exportando páginas como imagem.',
    desc_png: 'Salvando páginas como gráfico PNG.',
    desc_csv: 'Planilha delimitada por vírgulas.',
    desc_json: 'Dados estruturados para APIs e scripts.',
  },
  en: {
    title: 'Document Converter',
    dropTitle: 'Drop your files here',
    orText: 'or',
    browse: 'Choose files',
    formats: 'PDF • DOCX • XLSX • TXT • CSV • ODT • RTF • HTML',
    dropActive: 'Drop the file here',
    invalidFile: 'Upload a Word, PDF, TXT, Excel, ODT, RTF, or HTML document.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    identified: 'File identified',
    extension: 'Extension',
    familyWord: 'Word document',
    familyPdf: 'PDF document',
    familyText: 'Plain text',
    familySheet: 'Spreadsheet',
    familyWeb: 'Web page',
    familyRtf: 'Rich text (RTF)',
    familyOdt: 'OpenDocument',
    familyLegacy: 'Legacy Word (binary)',
    familyUnknown: 'Unrecognized format',
    choose: 'Choose the output format',
    convert: 'Convert and download',
    converting: 'Converting document...',
    success: 'Conversion complete',
    download: 'Download file',
    again: 'Convert another document',
    privacy: '100% local browser processing. Your file is never uploaded to servers.',
    note: 'Conversion uses the file’s textual content. Complex layout, macros, and embedded objects are not reproduced.',
    legacy:
      'This is a binary Word file (.doc/.dot). The browser cannot convert it. Open it in Word or LibreOffice, save as .docx, and upload again.',
    unknown: 'This format is not supported by Document Converter.',
    errorGeneric: 'Could not convert this file. Check that the document is not corrupted.',
    pdfNoText: 'This PDF has no extractable text. Use PDF OCR for scans and try again.',
    groupWord: 'Word formats',
    groupUniversal: 'Text and universal documents',
    groupWeb: 'Web formats',
    groupImage: 'Image and other formats',
    groupData: 'Spreadsheet and data',
    desc_docx: 'Current standard Word format.',
    desc_pdf: 'Adobe portable document format.',
    desc_rtf: 'Rich text format.',
    desc_txt: 'Plain text without formatting.',
    desc_odt: 'OpenDocument text format.',
    desc_html: 'Complete web page.',
    desc_htm: 'Web page variant.',
    desc_xml: 'Extensible markup language.',
    desc_jpeg: 'Export pages as images.',
    desc_png: 'Save pages as PNG graphics.',
    desc_csv: 'Comma-separated spreadsheet.',
    desc_json: 'Structured data for APIs and scripts.',
  },
  es: {
    title: 'Conversor de Documento',
    dropTitle: 'Suelta tus archivos aquí',
    orText: 'o',
    browse: 'Elegir archivos',
    formats: 'PDF • DOCX • XLSX • TXT • CSV • ODT • RTF • HTML',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Envíe un documento Word, PDF, TXT, Excel, ODT, RTF o HTML.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    identified: 'Archivo identificado',
    extension: 'Extensión',
    familyWord: 'Documento Word',
    familyPdf: 'Documento PDF',
    familyText: 'Texto simple',
    familySheet: 'Hoja de cálculo',
    familyWeb: 'Página web',
    familyRtf: 'Texto enriquecido (RTF)',
    familyOdt: 'OpenDocument',
    familyLegacy: 'Word antiguo (binario)',
    familyUnknown: 'Formato no reconocido',
    choose: 'Elija el formato de destino',
    convert: 'Convertir y descargar',
    converting: 'Convirtiendo documento...',
    success: 'Conversión completada',
    download: 'Descargar archivo',
    again: 'Convertir otro documento',
    privacy: 'Procesamiento 100% local en el navegador. Su archivo no se envía a servidores.',
    note: 'La conversión usa el contenido textual del archivo. Diseño complejo, macros y objetos incrustados no se reproducen.',
    legacy:
      'Este es un archivo Word binario (.doc/.dot). El navegador no puede convertirlo. Ábralo en Word o LibreOffice, guarde como .docx y súbalo de nuevo.',
    unknown: 'Este formato no es compatible con el Conversor de Documento.',
    errorGeneric: 'No se pudo convertir este archivo. Verifique que el documento no esté dañado.',
    pdfNoText:
      'Este PDF no tiene texto extraíble. Use OCR de PDF para escaneos e inténtelo de nuevo.',
    groupWord: 'Formatos de Word',
    groupUniversal: 'Formatos de texto y documentos universales',
    groupWeb: 'Formatos web',
    groupImage: 'Formatos de imagen y otros',
    groupData: 'Hoja de cálculo y datos',
    desc_docx: 'Formato estándar actual.',
    desc_pdf: 'Formato portátil de Adobe.',
    desc_rtf: 'Formato de texto enriquecido.',
    desc_txt: 'Texto simple sin formato.',
    desc_odt: 'Formato de texto OpenDocument.',
    desc_html: 'Página web completa.',
    desc_htm: 'Variante de página web.',
    desc_xml: 'Lenguaje de marcado extensible.',
    desc_jpeg: 'Exportar páginas como imagen.',
    desc_png: 'Guardar páginas como gráfico PNG.',
    desc_csv: 'Hoja de cálculo delimitada por comas.',
    desc_json: 'Datos estructurados para APIs y scripts.',
  },
};

function familyLabel(id: IdentifiedDocument, t: Record<string, string>): string {
  switch (id.family) {
    case 'word':
      return t.familyWord;
    case 'word-legacy':
      return t.familyLegacy;
    case 'pdf':
      return t.familyPdf;
    case 'text':
      return t.familyText;
    case 'spreadsheet':
      return t.familySheet;
    case 'web':
      return t.familyWeb;
    case 'rtf':
      return t.familyRtf;
    case 'opendocument':
      return t.familyOdt;
    default:
      return t.familyUnknown;
  }
}

function groupLabel(group: ConversionGroupId, t: Record<string, string>): string {
  if (group === 'word') return t.groupWord;
  if (group === 'universal') return t.groupUniversal;
  if (group === 'web') return t.groupWeb;
  if (group === 'data') return t.groupData;
  return t.groupImage;
}

function targetDescription(id: ConversionTargetId, t: Record<string, string>): string {
  return t[`desc_${id}`] || '';
}

export default function DocumentConverterSuiteTool({
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
  const [file, setFile] = useState<File | null>(null);
  const [identified, setIdentified] = useState<IdentifiedDocument | null>(null);
  const [target, setTarget] = useState<ConversionTargetId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<{ url: string; name: string } | null>(null);

  const targets = useMemo(() => (identified ? listConversionTargets(identified) : []), [identified]);
  const grouped = useMemo(() => {
    const map = new Map<ConversionGroupId, ConversionTarget[]>();
    for (const item of targets) {
      const list = map.get(item.group) || [];
      list.push(item);
      map.set(item.group, list);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ group: g, items: map.get(g)! }));
  }, [targets]);

  const startOver = () => {
    if (output?.url) URL.revokeObjectURL(output.url);
    setFile(null);
    setIdentified(null);
    setTarget(null);
    setError(null);
    setOutput(null);
  };

  const onFile = (next: File) => {
    if (output?.url) URL.revokeObjectURL(output.url);
    setOutput(null);
    setError(null);
    setFile(next);
    const info = identifyDocument(next);
    setIdentified(info);
    const options = listConversionTargets(info);
    const preferred = options.find((item) => item.id === 'pdf') ?? options[0];
    setTarget(preferred?.id ?? null);
  };

  const run = async () => {
    if (!file || !target) return;
    setBusy(true);
    setError(null);
    try {
      const result = await convertDocument(file, target);
      if (output?.url) URL.revokeObjectURL(output.url);
      const url = URL.createObjectURL(result.blob);
      setOutput({ url, name: result.fileName });
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'PDF_NO_TEXT') setError(t.pdfNoText);
      else if (message === 'LEGACY_BINARY') setError(t.legacy);
      else setError(t.errorGeneric);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-6">
        {!file && !busy && (
          <DocumentToolDropzone
            lang={lang}
            accept="documents"
            onFile={onFile}
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

        {busy && <ToolBusyState label={t.converting} />}

        {error && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
            {error}
          </div>
        )}

        {file && identified && !busy && !output && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{t.identified}</p>
              <p className="text-sm font-semibold text-slate-900 truncate">{file.name}</p>
              <p className="text-xs text-slate-500 mt-1">
                {t.extension}: .{identified.extension} · {familyLabel(identified, t)}
              </p>
            </div>

            {!identified.convertible ? (
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {identified.unsupportedReason === 'legacy-binary' ? t.legacy : t.unknown}
              </p>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">{t.choose}</h3>
                  <div className="space-y-4">
                    {grouped.map((section) => (
                      <div key={section.group}>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                          {groupLabel(section.group, t)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.items.map((item) => {
                            const selected = target === item.id;
                            return (
                              <label
                                key={item.id}
                                className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 cursor-pointer ${
                                  selected
                                    ? 'border-win-blue bg-sky-50/70 ring-1 ring-win-blue/20'
                                    : 'border-slate-200 bg-white/60 hover:border-slate-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="document-target"
                                  className="mt-1"
                                  checked={selected}
                                  onChange={() => setTarget(item.id)}
                                />
                                <span>
                                  <span className="block text-xs font-semibold text-slate-800">.{item.extension}</span>
                                  <span className="block text-[11px] text-slate-500 leading-snug">
                                    {targetDescription(item.id, t)}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{t.note}</p>
                <button type="button" className="w-full btn-primary py-3.5 font-semibold" onClick={run} disabled={!target}>
                  {t.convert}
                </button>
              </>
            )}

            <button type="button" onClick={startOver} className="w-full text-xs font-semibold text-slate-500">
              {t.again}
            </button>
            <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
          </div>
        )}

        {output && !busy && (
          <div className="space-y-4 text-center py-4">
            <h3 className="text-base font-semibold text-slate-900">{t.success}</h3>
            <p className="text-[10px] font-semibold text-slate-400 truncate">{output.name}</p>
            <button
              type="button"
              className="w-full btn-primary py-3.5 font-semibold"
              onClick={() => {
                const a = document.createElement('a');
                a.href = output.url;
                a.download = output.name;
                a.rel = 'noopener';
                a.click();
              }}
            >
              {t.download}
            </button>
            <button type="button" onClick={startOver} className="w-full text-xs font-semibold text-slate-500">
              {t.again}
            </button>
            <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
          </div>
        )}
      </div>
    </SuiteWorkspaceShell>
  );
}
