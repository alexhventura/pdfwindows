import { useEffect, useRef, useState } from 'react';
import { Download, RefreshCw, Trash2, GripVertical, AlertCircle, CheckSquare, Square } from 'lucide-react';
import type { LanguageType } from '../../../types';
import { organizePdfPages, getPdfPageCount, ORGANIZE_MAX_PAGES } from '../../../engines/organizePdf';
import { appendPdf } from '../../../engines/pdfToolkit';
import { renderPdfPageThumbnailUrl } from '../../../utils/pdfThumbnail';
import {
  DocumentToolDropzone,
  ToolBusyState,
  SuiteWorkspaceShell,
  SUITE_UPLOAD_SUBTITLE,
} from '../DocumentToolDropzone';

const copy: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Organizar Páginas PDF',
    dropTitle: 'Solte seus arquivos aqui',
    orText: 'ou',
    browse: 'Escolher arquivos',
    formats: 'PDF',
    dropActive: 'Solte o arquivo aqui',
    invalidFile: 'Envie um arquivo PDF válido.',
    emptyFile: 'O arquivo está vazio.',
    tooLarge: 'Arquivo acima do limite de 100 MB.',
    loading: 'Carregando páginas...',
    exporting: 'Gerando PDF...',
    pages: 'páginas',
    selectAll: 'Selecionar todas',
    clearSel: 'Limpar seleção',
    deleteSel: 'Excluir selecionadas',
    moveUp: 'Subir',
    moveDown: 'Descer',
    apply: 'Gerar PDF organizado',
    success: 'PDF organizado pronto',
    download: 'Baixar PDF',
    again: 'Organizar outro PDF',
    needOne: 'Mantenha pelo menos uma página.',
    tooMany: `Limite de ${ORGANIZE_MAX_PAGES} páginas por documento neste navegador.`,
    corrupt: 'Não foi possível ler este PDF.',
    privacy: 'Processamento local. O original não é alterado.',
    hint: 'Selecione páginas para excluir. Use as setas para reordenar. Inserir outro PDF adiciona páginas no fim.',
    insert: 'Inserir outro PDF no fim',
    page: 'Pág.',
  },
  en: {
    title: 'Organize PDF Pages',
    dropTitle: 'Drop your files here',
    orText: 'or',
    browse: 'Choose files',
    formats: 'PDF',
    dropActive: 'Drop the file here',
    invalidFile: 'Please upload a valid PDF file.',
    emptyFile: 'The file is empty.',
    tooLarge: 'File exceeds the 100 MB limit.',
    loading: 'Loading pages...',
    exporting: 'Building PDF...',
    pages: 'pages',
    selectAll: 'Select all',
    clearSel: 'Clear selection',
    deleteSel: 'Delete selected',
    moveUp: 'Move up',
    moveDown: 'Move down',
    apply: 'Generate organized PDF',
    success: 'Organized PDF ready',
    download: 'Download PDF',
    again: 'Organize another PDF',
    needOne: 'Keep at least one page.',
    tooMany: `Limit of ${ORGANIZE_MAX_PAGES} pages per document in this browser.`,
    corrupt: 'Could not read this PDF.',
    privacy: 'Local processing. The original is not modified.',
    hint: 'Select pages to delete. Use arrows to reorder. Insert another PDF to append pages at the end.',
    insert: 'Insert another PDF at the end',
    page: 'Pg.',
  },
  es: {
    title: 'Organizar Páginas PDF',
    dropTitle: 'Suelta tus archivos aquí',
    orText: 'o',
    browse: 'Elegir archivos',
    formats: 'PDF',
    dropActive: 'Suelte el archivo aquí',
    invalidFile: 'Envíe un archivo PDF válido.',
    emptyFile: 'El archivo está vacío.',
    tooLarge: 'El archivo supera el límite de 100 MB.',
    loading: 'Cargando páginas...',
    exporting: 'Generando PDF...',
    pages: 'páginas',
    selectAll: 'Seleccionar todas',
    clearSel: 'Limpiar selección',
    deleteSel: 'Eliminar seleccionadas',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    apply: 'Generar PDF organizado',
    success: 'PDF organizado listo',
    download: 'Descargar PDF',
    again: 'Organizar otro PDF',
    needOne: 'Mantenga al menos una página.',
    tooMany: `Límite de ${ORGANIZE_MAX_PAGES} páginas por documento en este navegador.`,
    corrupt: 'No se pudo leer este PDF.',
    privacy: 'Procesamiento local. El original no se modifica.',
    hint: 'Seleccione páginas para eliminar. Use las flechas para reordenar. Insertar otro PDF añade páginas al final.',
    insert: 'Insertar otro PDF al final',
    page: 'Pág.',
  },
};

interface PageItem {
  id: string;
  sourceIndex: number;
  thumbUrl: string | null;
  selected: boolean;
}

export default function OrganizePdfSuiteTool({
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
  const [busy, setBusy] = useState<'load' | 'export' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const thumbCache = useRef<Map<number, string>>(new Map());
  const insertInputRef = useRef<HTMLInputElement>(null);

  const revokeThumbs = () => {
    for (const url of thumbCache.current.values()) URL.revokeObjectURL(url);
    thumbCache.current.clear();
  };

  const startOver = () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    revokeThumbs();
    setFile(null);
    setPages([]);
    setError(null);
    setOutputUrl(null);
    setOutputName(null);
    setBusy(null);
  };

  useEffect(() => () => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    revokeThumbs();
  }, []);

  const loadFile = async (f: File) => {
    startOver();
    setBusy('load');
    setFile(f);
    try {
      const count = await getPdfPageCount(f);
      if (count > ORGANIZE_MAX_PAGES) {
        setError(t.tooMany);
        setFile(null);
        return;
      }
      const items: PageItem[] = [];
      for (let i = 0; i < count; i++) {
        let thumb = thumbCache.current.get(i) || null;
        if (!thumb) {
          try {
            thumb = await renderPdfPageThumbnailUrl(f, i + 1, 160);
            thumbCache.current.set(i, thumb);
          } catch {
            thumb = null;
          }
        }
        items.push({ id: `${i}-${crypto.randomUUID()}`, sourceIndex: i, thumbUrl: thumb, selected: false });
      }
      setPages(items);
    } catch {
      setError(t.corrupt);
      setFile(null);
    } finally {
      setBusy(null);
    }
  };

  const toggle = (id: string) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
  };

  const selectAll = (value: boolean) => {
    setPages((prev) => prev.map((p) => ({ ...p, selected: value })));
  };

  const deleteSelected = () => {
    setPages((prev) => {
      const next = prev.filter((p) => !p.selected);
      if (next.length < 1) {
        setError(t.needOne);
        return prev;
      }
      setError(null);
      return next;
    });
  };

  const moveSelected = (dir: -1 | 1) => {
    setPages((prev) => {
      const selectedIds = new Set(prev.filter((p) => p.selected).map((p) => p.id));
      if (selectedIds.size === 0) return prev;
      const arr = [...prev];
      if (dir === -1) {
        for (let i = 1; i < arr.length; i++) {
          if (selectedIds.has(arr[i].id) && !selectedIds.has(arr[i - 1].id)) {
            [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          }
        }
      } else {
        for (let i = arr.length - 2; i >= 0; i--) {
          if (selectedIds.has(arr[i].id) && !selectedIds.has(arr[i + 1].id)) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          }
        }
      }
      return arr;
    });
  };

  const insertPdf = async (extra: File) => {
    if (!file || pages.length < 1) return;
    setBusy('load');
    setError(null);
    try {
      const baked = await organizePdfPages(
        file,
        pages.map((p) => p.sourceIndex)
      );
      const bakedFile = new File([baked.blob], file.name, { type: 'application/pdf' });
      const combined = await appendPdf(bakedFile, extra);
      await loadFile(combined);
    } catch {
      setError(t.corrupt);
      setBusy(null);
    }
  };

  const exportPdf = async () => {
    if (!file || pages.length < 1) return;
    setBusy('export');
    setError(null);
    try {
      const res = await organizePdfPages(
        file,
        pages.map((p) => p.sourceIndex)
      );
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(URL.createObjectURL(res.blob));
      setOutputName(res.fileName);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setError(msg === 'NO_PAGES' || msg === 'TOO_MANY_PAGES' ? t.needOne : t.corrupt);
    } finally {
      setBusy(null);
    }
  };

  const download = () => {
    if (!outputUrl || !outputName) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = outputName;
    a.click();
  };

  const selectedCount = pages.filter((p) => p.selected).length;

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLabel}
    >
      <div className="space-y-6">
        {!file && !busy && !outputUrl && (
          <DocumentToolDropzone
            lang={lang}
            accept="pdf"
            onFile={loadFile}
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

        {busy && <ToolBusyState label={busy === 'load' ? t.loading : t.exporting} />}

        {error && !busy && (
          <div role="alert" className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <div>
              {error}
              <button type="button" onClick={startOver} className="block mt-2 text-win-blue">
                {t.again}
              </button>
            </div>
          </div>
        )}

        {file && pages.length > 0 && !outputUrl && !busy && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span>
                {pages.length} {t.pages}
              </span>
              <span className="text-slate-300">·</span>
              <span>{t.hint}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-secondary text-[11px] py-2 px-3" onClick={() => selectAll(true)}>
                {t.selectAll}
              </button>
              <button type="button" className="btn-secondary text-[11px] py-2 px-3" onClick={() => selectAll(false)}>
                {t.clearSel}
              </button>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40"
                disabled={selectedCount === 0}
                onClick={() => moveSelected(-1)}
              >
                {t.moveUp}
              </button>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 disabled:opacity-40"
                disabled={selectedCount === 0}
                onClick={() => moveSelected(1)}
              >
                {t.moveDown}
              </button>
              <button
                type="button"
                className="btn-secondary text-[11px] py-2 px-3 text-rose-600 disabled:opacity-40 inline-flex items-center gap-1"
                disabled={selectedCount === 0}
                onClick={deleteSelected}
              >
                <Trash2 size={12} /> {t.deleteSel}
              </button>
              <button type="button" className="btn-secondary text-[11px] py-2 px-3" onClick={() => insertInputRef.current?.click()}>
                {t.insert}
              </button>
              <input
                ref={insertInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const extra = e.target.files?.[0];
                  e.target.value = '';
                  if (extra) void insertPdf(extra);
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {pages.map((p, order) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggle(p.id)}
                  className={`relative rounded-xl border text-left overflow-hidden transition-colors ${
                    p.selected ? 'border-win-blue ring-2 ring-win-blue/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="aspect-[3/4] bg-slate-50 flex items-center justify-center">
                    {p.thumbUrl ? (
                      <img src={p.thumbUrl} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <GripVertical className="text-slate-300" size={20} />
                    )}
                  </div>
                  <div className="px-2 py-1.5 flex items-center justify-between gap-1 bg-white">
                    <span className="text-[10px] font-semibold text-slate-600 truncate">
                      {t.page} {order + 1}
                    </span>
                    {p.selected ? (
                      <CheckSquare size={14} className="text-win-blue shrink-0" />
                    ) : (
                      <Square size={14} className="text-slate-300 shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button type="button" className="w-full btn-primary py-3.5" onClick={exportPdf}>
              {t.apply}
            </button>
            <button type="button" onClick={startOver} className="w-full text-xs font-semibold text-slate-500">
              {t.again}
            </button>
            <p className="text-[10px] font-semibold text-emerald-700/80 text-center">{t.privacy}</p>
          </div>
        )}

        {outputUrl && (
          <div className="space-y-4 text-center py-4">
            <h3 className="text-base font-semibold text-slate-900">{t.success}</h3>
            <button type="button" onClick={download} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
              <Download size={16} /> {t.download}
            </button>
            {outputName && <p className="text-[10px] font-semibold text-slate-400 truncate">{outputName}</p>}
            <button
              type="button"
              onClick={startOver}
              className="text-xs font-semibold text-win-blue flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw size={12} /> {t.again}
            </button>
          </div>
        )}
      </div>
    </SuiteWorkspaceShell>
  );
}
