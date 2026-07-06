import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  Download, 
  RefreshCw, 
  Trash2, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  BookOpen, 
  Sliders, 
  X, 
  Plus, 
  Clock, 
  FileCode2, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { ConverterState, OperationType, FileState, GeneratedFile } from '../types';
import { translations } from '../utils/translations';
import { useLanguage } from '../context/LanguageContext';
import { CompletionPanel } from './CompletionPanel';
import { PdfPasswordGateModal } from './PdfPasswordGateModal';
import { createInitialConverterState } from '../utils/converterDefaults';
import { PDFDocument } from 'pdf-lib';
import { motion, AnimatePresence } from 'motion/react';
import { ProductivityTools } from './ProductivityTools';
import { conversionDirectory } from '../utils/conversionDirectory';
import { getAllowedOperations } from '../toolRegistry';
import { runConversion } from '../toolRunner';
import {
  validateIncomingFile,
  validationErrorMessage,
  getFileExtension,
} from '../utils/fileValidation';

function resolveOperationIcon(op: string) {
  if (op.startsWith('img-')) return ImageIcon;
  if (op.includes('password')) return Lock;
  if (op.includes('ocr')) return Eye;
  if (op.includes('pdf') || op === 'txt-to-pdf' || op === 'merge-pdf') return FileText;
  return FileSpreadsheet;
}

export interface ConverterWorkbenchProps {
  fixedOperation?: OperationType;
  showSuiteSection?: boolean;
  showSideAds?: boolean;
  linkMode?: boolean;
  pageHeading?: string;
  pageSubheading?: string;
}

export function ConverterWorkbench({
  fixedOperation,
  showSuiteSection = true,
  showSideAds = true,
  linkMode = false,
  pageHeading,
  pageSubheading,
}: ConverterWorkbenchProps) {
  const { lang } = useLanguage();
  const [isInitializingEngine, setIsInitializingEngine] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [activeModal, setActiveModal] = useState<'directory' | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // PDF settings
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const [pdfReadingError, setPdfReadingError] = useState<boolean>(false);

  const [passwordGateOpen, setPasswordGateOpen] = useState(false);

  // Advanced options toggle
  const [showOptions, setShowOptions] = useState(true);

  // Conversion core state
  const [state, setState] = useState<ConverterState>(() => createInitialConverterState(fixedOperation));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workspaceAnchorRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sessionPasswordRef = useRef<string | null>(null);

  const scrollToWorkspace = () => {
    workspaceAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const revokeWorkspaceUrls = (snapshot: ConverterState) => {
    snapshot.generatedFiles.forEach((gf) => URL.revokeObjectURL(gf.url));
    snapshot.files.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
  };

  const resetWorkspace = (preserveOperation = true) => {
    abortRef.current?.abort();
    abortRef.current = null;
    sessionPasswordRef.current = null;

    setState((prev) => {
      revokeWorkspaceUrls(prev);
      const next = createInitialConverterState(
        preserveOperation && fixedOperation ? fixedOperation : undefined
      );
      return next;
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
    setPdfPageCount(0);
    setPdfReadingError(false);
    setProcessingError(null);
    setUploadError(null);
    setPasswordGateOpen(false);
  };

  /** Dismiss completion — stay on tool page with a clean workspace */
  const handleCloseCompletion = () => {
    resetWorkspace(true);
    scrollToWorkspace();
  };

  // Automatically apply fixed operation on dedicated tool pages
  useEffect(() => {
    if (fixedOperation) {
      setState((prev) => ({ ...prev, selectedOperation: fixedOperation }));
    }
  }, [fixedOperation]);

  useEffect(() => {
    if (fixedOperation && state.files.length > 0) {
      setState((prev) => ({ ...prev, selectedOperation: fixedOperation }));
    }
  }, [fixedOperation, state.files.length]);

  // Safe release of generated memory Object URLs to prevent browser leak
  useEffect(() => {
    const currentGeneratedUrls = state.generatedFiles.map(gf => gf.url);
    const currentPreviewUrls = state.files.map(f => f.previewUrl).filter(Boolean) as string[];
    
    return () => {
      // Cleanup happens when dependencies change or on unmount
      currentGeneratedUrls.forEach(url => URL.revokeObjectURL(url));
      currentPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [state.generatedFiles, state.files]);

  const readPdfMetadata = async (file: File) => {
    setPdfPageCount(0);
    setPdfReadingError(false);
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPageCount();
      setPdfPageCount(pages);
      setState(prev => ({
        ...prev,
        options: {
          ...prev.options,
          splitFromPage: 1,
          splitToPage: Math.max(1, pages)
        }
      }));
    } catch (e) {
      console.error("Local client pdf reading failed:", e);
      setPdfReadingError(true);
      setPdfPageCount(1);
    }
  };

  const processIncomingFiles = async (newRawFiles: FileList) => {
    const rawFilesArray = Array.from(newRawFiles);
    const validatedStates: FileState[] = [];

    const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'ico'];
    let queueBytes = state.files.reduce((acc, f) => acc + f.size, 0);
    let queueCount = state.files.length;

    for (const raw of rawFilesArray) {
      const err = validateIncomingFile(raw, queueCount, queueBytes);
      if (err) {
        setUploadError(validationErrorMessage(err, lang));
        continue;
      }
      const ext = getFileExtension(raw.name);
      const isImage = IMAGE_EXTENSIONS.includes(ext);
      queueCount += 1;
      queueBytes += raw.size;

      validatedStates.push({
        file: raw,
        name: raw.name,
        size: raw.size,
        extension: ext,
        id: Math.random().toString(36).substring(2, 9),
        previewUrl: isImage ? URL.createObjectURL(raw) : undefined
      });
    }

    if (validatedStates.length === 0) return;

    setUploadError(null);
    setProcessingError(null);

    // Capture leading PDF metadata details
    const firstPdf = validatedStates.find(fs => fs.extension === 'pdf');

    setState(prev => {
      // Clear legacy outputs
      prev.generatedFiles.forEach(gf => URL.revokeObjectURL(gf.url));

      const updatedFiles = [...prev.files, ...validatedStates].filter(
        // Prevent pure double additions of exact filename-size parameters
        (file, idx, self) => self.findIndex(f => f.name === file.name && f.size === file.size) === idx
      );

      return {
        ...prev,
        files: updatedFiles,
        selectedOperation: '',
        isProcessing: false,
        progress: 0,
        timeLeft: 0,
        isCompleted: false,
        generatedFiles: [],
        options: {
          ...prev.options,
          pdfPassword: '',
          splitFromPage: 1,
          splitToPage: 1
        }
      };
    });

    if (firstPdf) {
      await readPdfMetadata(firstPdf.file);
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processIncomingFiles(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const removeSingleFile = (id: string) => {
    setState(prev => {
      const fileToRemove = prev.files.find(f => f.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      
      const nextFiles = prev.files.filter(f => f.id !== id);
      return {
        ...prev,
        files: nextFiles,
        selectedOperation: '',
        isCompleted: false,
        generatedFiles: []
      };
    });
  };

  const clearAllFiles = () => {
    resetWorkspace(!!fixedOperation);
  };

  const startProcessing = async (sessionPassword?: string) => {
    if (state.files.length === 0 || !state.selectedOperation) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const runOptions =
      state.selectedOperation === 'pdf-password' && sessionPassword
        ? { ...state.options, pdfPassword: sessionPassword }
        : state.options;

    if (state.selectedOperation === 'pdf-password' && !runOptions.pdfPassword?.trim()) {
      setPasswordGateOpen(true);
      return;
    }

    setProcessingError(null);
    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      timeLeft: 0,
      isCompleted: false,
      generatedFiles: [],
    }));

    try {
      const outputs = await runConversion({
        files: state.files,
        selectedOperation: state.selectedOperation,
        options: runOptions,
        lang,
        onProgress: (percent) => {
          setState((prev) => ({ ...prev, progress: percent }));
        },
        signal: controller.signal,
      });

      setState((prev) => ({
        ...prev,
        isProcessing: false,
        isCompleted: true,
        generatedFiles: outputs,
        progress: 100,
        options: { ...prev.options, pdfPassword: '' },
      }));

    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          isCompleted: false,
          progress: 0,
        }));
        return;
      }
      const message = e instanceof Error ? e.message : String(e);
      console.error('Local conversion error:', e);
      setProcessingError(`${translations[lang].conversionError}: ${message}`);
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        isCompleted: false,
        progress: 0,
      }));
    } finally {
      abortRef.current = null;
      sessionPasswordRef.current = null;
    }
  };

  const handleProcessRequest = () => {
    if (state.selectedOperation === 'pdf-password') {
      setPasswordGateOpen(true);
      return;
    }
    startProcessing();
  };

  const handlePasswordGateConfirm = (password: string) => {
    setPasswordGateOpen(false);
    sessionPasswordRef.current = password;
    startProcessing(password);
  };


  const cancelProcessing = () => {
    abortRef.current?.abort();
    setState((prev) => ({
      ...prev,
      isProcessing: false,
      progress: 0,
      timeLeft: 0,
    }));
  };

  const triggerIndividualDownload = (gf: GeneratedFile) => {
    const a = document.createElement('a');
    a.href = gf.url;
    a.download = gf.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Mass sequential browser download trigger for batch lists
  const triggerDownloadAll = () => {
    state.generatedFiles.forEach((gf, idx) => {
      setTimeout(() => {
        triggerIndividualDownload(gf);
      }, idx * 300); // 300ms staggered delay to help browser event dispatch constraints
    });
  };

  const getFileBadgeStyle = (ext: string): string => {
    const images = ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp', 'tiff', 'ico'];
    if (images.includes(ext)) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    if (ext === 'pdf') {
      return 'bg-rose-100 text-rose-800 border-rose-200';
    }
    if (['csv', 'json', 'xml'].includes(ext)) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const t = translations[lang];
  const isImageOp = (op: string) => {
    return ['img-to-img', 'img-resize', 'img-bg-remove', 'img-filter', 'img-upscale', 'img-ocr'].includes(op);
  };

  const allowedOps = getAllowedOperations(
    state.files.length,
    state.files.map((f) => f.extension),
    lang
  );
  const queueSizeKB = state.files.reduce((acc, current) => acc + current.size, 0) / 1024;

  const visibleOps = fixedOperation
    ? allowedOps.filter((op) => op.value === fixedOperation)
    : allowedOps;
  const showOperationPicker = !fixedOperation && visibleOps.length > 0;

  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row items-start justify-center gap-6 xl:gap-8">
        
        {showSideAds && (
        <aside className="hidden lg:flex flex-col w-[160px] shrink-0 premium-surface !p-3 select-none sticky top-24">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">{t.advertisingLabel || "PUBLICIDADE"}</span>
          </div>
          <div className="min-h-[480px] bg-sky-50/50 border border-dashed border-blue-950/15 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-slate-500 font-semibold italic leading-relaxed">
              {t.adContentPlaceholderOne}
            </p>
          </div>
        </aside>
        )}

        {/* CENTRAL CORE SYSTEM - DYNAMIC FLEXIBLE GRID */}
        <div className="flex-1 w-full max-w-2xl flex flex-col">
          
          {/* THE HUB INFO BUTTON: SoftPremium directory popup trigger */}
          <div className="w-full flex justify-end mb-3">
            <button 
              type="button"
              onClick={() => setActiveModal('directory')}
              className="btn-ghost cursor-pointer"
            >
              <HelpCircle size={13} className="text-[#0F172A] group-hover:text-white transition-colors" />
              <span>{t.directoryButton}</span>
            </button>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* MAIN TOOL CARD */}
            <section ref={workspaceAnchorRef} className="workspace-panel scroll-mt-24">
          
          <div className="p-6 md:p-8">
            
            {/* Title Block */}
            <div className="text-center mb-8 select-none">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                {pageHeading || t.title}
              </h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-medium">
                {pageSubheading || t.subtitle}
              </p>
            </div>

            {processingError && !state.isProcessing && !state.isCompleted && (
              <div className="workspace-error-banner mb-6" role="alert">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wide mb-0.5">{t.processingErrorLabel}</p>
                  <p className="text-sm leading-relaxed">{processingError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProcessingError(null)}
                  className="ml-auto p-1 rounded-lg hover:bg-rose-100/80 text-rose-600"
                  aria-label={t.modalClose}
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* CASE A: No processing, No Completion -> Upload files or define options */}
            {!state.isProcessing && !state.isCompleted && (
              <div className="space-y-6">

                {uploadError && (
                  <div className="workspace-error-banner" role="alert">
                    <AlertCircle size={18} className="shrink-0" />
                    <p className="flex-1 text-sm">{uploadError}</p>
                    <button
                      type="button"
                      onClick={() => setUploadError(null)}
                      className="p-1 rounded-lg hover:bg-rose-100/80 text-rose-600"
                      aria-label={t.modalClose}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {/* Drag zone input container - Handles multiple files selection now */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={triggerBrowse}
                  className={`premium-dropzone ${dragActive ? 'premium-dropzone-active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      triggerBrowse();
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file-input"
                    multiple
                    className="hidden"
                    onChange={onFileInput}
                    accept="image/*,.pdf,.csv,.json,.xml,.txt"
                  />

                  <div className="premium-dropzone-icon">
                    <Upload size={26} strokeWidth={1.75} />
                  </div>

                  <p className="text-base font-semibold text-slate-800 mb-1">
                    {t.dragDropText}
                  </p>
                  <p className="text-sm text-slate-500 font-medium mb-6">
                    {t.orText}
                  </p>

                  <button type="button" className="btn-secondary text-xs pointer-events-none">
                    {t.selectFileButton}
                    <Plus size={14} className="pointer-events-none" />
                  </button>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {[
                      { icon: ImageIcon, label: 'Images' },
                      { icon: FileText, label: 'PDF' },
                      { icon: FileSpreadsheet, label: 'CSV' },
                      { icon: FileCode2, label: 'Data' },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 border border-slate-200/80 text-[10px] font-medium text-slate-500"
                      >
                        <Icon size={12} className="text-blue-600/80" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Local Queued List Section (if there are items stacked in fileState) */}
                {state.files.length > 0 && (
                  <div className="space-y-4">
                    
                    {/* Queue summary row */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-extrabold text-slate-700 tracking-wider uppercase flex items-center gap-1.5">
                        <Sliders size={13} className="text-blue-950" />
                        {t.fileListTitle} ({state.files.length} {t.multiFilesLoaded})
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={clearAllFiles}
                          className="text-[10px] font-bold text-rose-600 hover:text-rose-800 px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 transition-colors"
                        >
                          {t.clearAll}
                        </button>
                      </div>
                    </div>

                    {/* Stack element loop list */}
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {state.files.map((f) => (
                        <div 
                          key={f.id} 
                          className="bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 group transition-all hover:bg-slate-50/80 hover:border-slate-300"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase border ${getFileBadgeStyle(f.extension)}`}>
                              {f.extension}
                            </span>
                            <span className="text-xs font-bold text-slate-800 truncate max-w-[150px] sm:max-w-md">
                              {f.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="hidden group-hover:flex items-center gap-1.5 animate-in fade-in duration-200">
                    </div>
                            <span className="text-[10px] text-slate-400 font-normal font-mono">
                              {(f.size / 1024).toFixed(1)} KB
                            </span>
                            <button 
                              onClick={() => removeSingleFile(f.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-white border border-transparent hover:border-slate-150 transition-colors"
                              title={t.clearAll}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Operational Action selector */}
                    <div className="pt-2 border-t border-slate-200 space-y-4">
                      {(showOperationPicker || (fixedOperation && state.files.length > 0)) ? (
                        <div className="space-y-4">
                          {showOperationPicker && (
                            <>
                          <label className="block text-xs font-extrabold text-blue-950 uppercase tracking-widest leading-none">
                            {t.chooseOperation}
                          </label>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {visibleOps.map((op) => {
                              const OpIcon = resolveOperationIcon(op.value);
                              const selected = state.selectedOperation === op.value;
                              return (
                                <button
                                  key={op.value}
                                  type="button"
                                  onClick={() => setState((prev) => ({ ...prev, selectedOperation: op.value as OperationType }))}
                                  className={`premium-card p-4 text-left flex items-start gap-3 cursor-pointer ${
                                    selected ? 'operation-card-selected' : ''
                                  }`}
                                >
                                  <div className={`card-icon-wrap !w-10 !h-10 !mb-0 shrink-0 ${selected ? '!bg-gradient-to-br !from-blue-600 !to-orange-500 !text-white !border-0' : ''}`}>
                                    <OpIcon size={18} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-extrabold text-slate-900 leading-snug">{op.label}</p>
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wide">
                                      {selected ? (lang === 'pt' ? 'Selecionado' : lang === 'es' ? 'Seleccionado' : 'Selected') : (lang === 'pt' ? 'Clique para selecionar' : lang === 'es' ? 'Clic para seleccionar' : 'Click to select')}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                            </>
                          )}

                          {fixedOperation && state.files.length > 0 && visibleOps.length === 0 && (
                            <p className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                              {lang === 'pt'
                                ? 'Os arquivos enviados não são compatíveis com esta ferramenta. Verifique o tipo exigido.'
                                : lang === 'es'
                                  ? 'Los archivos subidos no son compatibles con esta herramienta.'
                                  : 'Uploaded files are not compatible with this tool. Check the required file type.'}
                            </p>
                          )}

                          {/* OPTIONAL EXPANDABLE PARAMETERS SHIFT AREA */}
                          {state.selectedOperation !== '' && (visibleOps.length > 0 || fixedOperation) && (
                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                              <button
                                type="button"
                                onClick={() => setShowOptions(!showOptions)}
                                className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-150 border-b border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
                              >
                                <span className="flex items-center gap-1.5">
                                  <Sliders size={13} className="text-blue-950" />
                                  {t.advancedOptionsLabel}
                                </span>
                                {showOptions ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                              </button>

                              {showOptions && (
                                <div className="p-4 space-y-4 bg-white">
                                  
                                  {/* 1. Format switch list for img-to-img converter */}
                                  {state.selectedOperation === 'img-to-img' && (
                                    <div className="space-y-2">
                                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                        {t.targetFormatLabel}
                                      </label>
                                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                                        {(['webp', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'ico'] as const).map((fmt) => (
                                          <button
                                            key={fmt}
                                            type="button"
                                            onClick={() => setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, targetImageFormat: fmt }
                                            }))}
                                            className={`py-1.5 text-[10px] font-extrabold uppercase rounded border transition-all ${
                                              state.options.targetImageFormat === fmt
                                                ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                            }`}
                                          >
                                            {fmt === 'jpeg' ? 'jpg' : fmt}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* 2. Image resizing pixel layout input slots & Quality compression percentage (shared by img-to-img and img-resize) */}
                                  {(state.selectedOperation === 'img-to-img' || state.selectedOperation === 'img-resize') && (
                                    <div className="space-y-3.5 border-t border-slate-100 pt-3">
                                      {/* quality quality slider */}
                                      <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">{t.qualityLabel}</span>
                                          <span className="text-[10px] font-mono font-bold text-blue-950 bg-blue-50 px-1.5 py-0.5 rounded">
                                            {Math.round(state.options.imageQuality * 100)}%
                                          </span>
                                        </div>
                                        <input 
                                          type="range"
                                          min="0.1"
                                          max="1.0"
                                          step="0.05"
                                          value={state.options.imageQuality}
                                          onChange={(e) => setState(prev => ({
                                            ...prev,
                                            options: { ...prev.options, imageQuality: parseFloat(e.target.value) }
                                          }))}
                                          className="w-full accent-blue-950 cursor-ew-resize py-1"
                                        />
                                      </div>

                                      {/* dimensions scaling pixel width and heights */}
                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mb-1">
                                            {t.widthLabel}
                                          </label>
                                          <input 
                                            type="number"
                                            min="0"
                                            max="9000"
                                            value={state.options.imageWidth || ''}
                                            placeholder="Ex: 1920"
                                            onChange={(e) => setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, imageWidth: Math.max(0, parseInt(e.target.value) || 0) }
                                            }))}
                                            className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-950"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mb-1">
                                            {t.heightLabel}
                                          </label>
                                          <input 
                                            type="number"
                                            min="0"
                                            max="9000"
                                            value={state.options.imageHeight || ''}
                                            placeholder="Ex: 1080"
                                            onChange={(e) => setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, imageHeight: Math.max(0, parseInt(e.target.value) || 0) }
                                            }))}
                                            className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-950"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <input 
                                          type="checkbox"
                                          id="keep-ratio-check"
                                          checked={state.options.keepAspectRatio}
                                          onChange={(e) => setState(prev => ({
                                            ...prev,
                                            options: { ...prev.options, keepAspectRatio: e.target.checked }
                                          }))}
                                          className="w-3.5 h-3.5 accent-blue-950 hover:cursor-pointer"
                                        />
                                        <label htmlFor="keep-ratio-check" className="text-[10px] font-extrabold text-slate-600 hover:cursor-pointer">
                                          {t.keepAspectLabel}
                                        </label>
                                      </div>
                                    </div>
                                  )}

                                  {/* 3. PDF Protect parameters */}
                                  {state.selectedOperation === 'pdf-password' && (
                                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[10px] text-amber-900 font-semibold leading-relaxed">
                                      {t.pdfProtectInfo}
                                    </div>
                                  )}

                                  {/* 7. OCR Settings */}
                                  {(state.selectedOperation === 'img-ocr' || state.selectedOperation === 'pdf-ocr') && (
                                    <div className="space-y-2 text-left">
                                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                        {t.ocrLangLabel}
                                      </label>
                                      <select
                                        value={state.options.ocrLanguage}
                                        onChange={(e) => setState(prev => ({
                                          ...prev,
                                          options: { ...prev.options, ocrLanguage: e.target.value }
                                        }))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold focus:ring-1 focus:ring-blue-950 outline-none"
                                      >
                                        <option value="por+eng">Português + English</option>
                                        <option value="spa+eng">Español + English</option>
                                        <option value="eng">English Only</option>
                                      </select>
                                    </div>
                                  )}

                                  {/* 8. Watermark Settings */}
                                  {state.selectedOperation === 'pdf-watermark' && (
                                    <div className="space-y-3 text-left">
                                      <div>
                                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mb-1">
                                          {t.watermarkTextLabel}
                                        </label>
                                        <input 
                                          type="text"
                                          placeholder="Ex: CONFIDENTIAL"
                                          value={state.options.watermarkText || ''}
                                          onChange={(e) => setState(prev => ({
                                            ...prev,
                                            options: { ...prev.options, watermarkText: e.target.value }
                                          }))}
                                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold focus:ring-1 focus:ring-blue-950 outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mb-1">
                                          {t.watermarkImageLabel}
                                        </label>
                                        <input 
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, watermarkImage: file }
                                            }));
                                          }}
                                          className="w-full text-[10px] file:bg-blue-950 file:text-white file:border-none file:rounded file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* 9. Image Filters Settings */}
                                  {state.selectedOperation === 'img-filter' && (
                                    <div className="space-y-4 text-left">
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.brightnessLabel}</label>
                                          <span className="text-[10px] font-mono">{state.options.filterBrightness}%</span>
                                        </div>
                                        <input 
                                          type="range" min="0" max="200" value={state.options.filterBrightness}
                                          onChange={(e) => setState(prev => ({ ...prev, options: { ...prev.options, filterBrightness: parseInt(e.target.value) } }))}
                                          className="w-full accent-blue-950"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.contrastLabel}</label>
                                          <span className="text-[10px] font-mono">{state.options.filterContrast}%</span>
                                        </div>
                                        <input 
                                          type="range" min="0" max="200" value={state.options.filterContrast}
                                          onChange={(e) => setState(prev => ({ ...prev, options: { ...prev.options, filterContrast: parseInt(e.target.value) } }))}
                                          className="w-full accent-blue-950"
                                        />
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <input 
                                          type="checkbox" id="grayscale-check" checked={state.options.filterGrayscale}
                                          onChange={(e) => setState(prev => ({ ...prev, options: { ...prev.options, filterGrayscale: e.target.checked } }))}
                                          className="w-4 h-4 accent-blue-950"
                                        />
                                        <label htmlFor="grayscale-check" className="text-[10px] font-extrabold text-slate-600 uppercase">{t.grayscaleLabel}</label>
                                      </div>
                                    </div>
                                  )}

                                  {/* 4. PDF Rotate parameters selection block */}
                                  {state.selectedOperation === 'pdf-rotate' && (
                                    <div className="space-y-2">
                                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                        {t.rotateAngleLabel}
                                      </label>
                                      <div className="flex gap-2">
                                        {([90, 180, 270] as const).map((angle) => (
                                          <button
                                            key={angle}
                                            type="button"
                                            onClick={() => setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, rotateAngle: angle }
                                            }))}
                                            className={`flex-1 py-1 px-3 text-xs font-bold rounded border transition-all ${
                                              state.options.rotateAngle === angle
                                                ? 'bg-blue-950 text-white border-blue-950'
                                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                            }`}
                                          >
                                            Rotar {angle}°
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* 5. PDF Split Pages Range select elements */}
                                  {state.selectedOperation === 'pdf-split' && (
                                    <div className="space-y-3">
                                      <span className="text-[10px] font-mono block text-slate-400 font-extrabold uppercase">
                                        {t.splitSettingsTitle} (Total: {pdfPageCount ? `${pdfPageCount} pages` : '...'})
                                      </span>
                                      
                                      <div className="grid grid-cols-2 gap-3 pb-1">
                                        <div>
                                          <label className="block text-[9px] uppercase font-bold text-slate-500 mb-0.5">{t.splitFromLabel}</label>
                                          <input 
                                            type="number"
                                            min="1"
                                            max={pdfPageCount || 1000}
                                            value={state.options.splitFromPage || 1}
                                            onChange={(e) => setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, splitFromPage: Math.max(1, parseInt(e.target.value) || 1) }
                                            }))}
                                            className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-950"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[9px] uppercase font-bold text-slate-500 mb-0.5">{t.splitToLabel}</label>
                                          <input 
                                            type="number"
                                            min="1"
                                            max={pdfPageCount || 1000}
                                            value={state.options.splitToPage || 1}
                                            onChange={(e) => setState(prev => ({
                                              ...prev,
                                              options: { ...prev.options, splitToPage: Math.min(pdfPageCount || 1000, Math.max(1, parseInt(e.target.value) || 1)) }
                                            }))}
                                            className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-950"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* 6. ADVANCED PRINTING & PAGE LAYOUT SETUP (MÃ³dulo de ImpressÃ£o) */}
                                  {(state.selectedOperation === 'img-to-pdf' || state.selectedOperation === 'txt-to-pdf') && (
                                    <div className="space-y-4 border-t border-slate-100 pt-3.5 select-none text-left">
                                      <div className="flex items-center gap-1.5 mb-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                                        <Sliders size={13} className="text-[#0F172A]" />
                                        <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                                          {lang === 'pt' ? 'ConfiguraÃ§Ãµes de ImpressÃ£o Local (PDF)' : lang === 'es' ? 'ImpresiÃ³n y DiagramaciÃ³n Local' : 'Page setup & Print layout options'}
                                        </span>
                                      </div>

                                      {/* Grid of parameters */}
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                        
                                        {/* A. ORIENTATION */}
                                        <div className="space-y-1.5">
                                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                            {lang === 'pt' ? 'OrientaÃ§Ã£o' : lang === 'es' ? 'OrientaciÃ³n' : 'Orientation'}
                                          </label>
                                          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                            {(['portrait', 'landscape'] as const).map(mode => (
                                              <button
                                                key={mode}
                                                type="button"
                                                onClick={() => setState(prev => ({
                                                  ...prev,
                                                  options: { ...prev.options, pdfOrientation: mode }
                                                }))}
                                                className={`flex-1 py-1 px-2 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                                                  state.options.pdfOrientation === mode
                                                    ? 'bg-white text-slate-900 shadow-xs'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                              >
                                                {mode === 'portrait' 
                                                  ? (lang === 'pt' ? 'Retrato' : lang === 'es' ? 'Retrato' : 'Portrait') 
                                                  : (lang === 'pt' ? 'Paisagem' : lang === 'es' ? 'Apaisado' : 'Landscape')}
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                        {/* B. MARGINS */}
                                        <div className="space-y-1.5">
                                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                            {lang === 'pt' ? 'Margens' : lang === 'es' ? 'MÃ¡rgenes' : 'Page Margins'}
                                          </label>
                                          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                            {(['none', 'narrow', 'standard'] as const).map(margin => (
                                              <button
                                                key={margin}
                                                type="button"
                                                onClick={() => setState(prev => ({
                                                  ...prev,
                                                  options: { ...prev.options, pdfMargins: margin }
                                                }))}
                                                className={`flex-1 py-1 px-1.5 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                                                  state.options.pdfMargins === margin
                                                    ? 'bg-white text-slate-900 shadow-xs'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                              >
                                                {margin === 'none' 
                                                  ? (lang === 'pt' ? 'Nenhuma' : lang === 'es' ? 'Ninguna' : 'None') 
                                                  : margin === 'narrow' 
                                                  ? (lang === 'pt' ? 'Estreita' : lang === 'es' ? 'Estrecha' : 'Narrow') 
                                                  : (lang === 'pt' ? 'PadrÃ£o' : lang === 'es' ? 'EstÃ¡ndar' : 'Standard')}
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                        {/* C. POSITIONING / SCALING */}
                                        <div className="space-y-1.5">
                                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                            {lang === 'pt' ? 'Posicionamento e Escala' : lang === 'es' ? 'Escala y Ajuste' : 'Fitting & Scaling'}
                                          </label>
                                          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                            {(['center', 'fit', 'original'] as const).map(positioning => (
                                              <button
                                                key={positioning}
                                                type="button"
                                                onClick={() => setState(prev => ({
                                                  ...prev,
                                                  options: { ...prev.options, pdfPositioning: positioning }
                                                }))}
                                                className={`flex-1 py-1 px-1 text-[9.5px] font-extrabold rounded-md transition-all cursor-pointer ${
                                                  state.options.pdfPositioning === positioning
                                                    ? 'bg-white text-slate-900 shadow-xs'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                              >
                                                {positioning === 'center' 
                                                  ? (lang === 'pt' ? 'Centralizar' : lang === 'es' ? 'Centrado' : 'Center') 
                                                  : positioning === 'fit' 
                                                  ? (lang === 'pt' ? 'Ajustar' : lang === 'es' ? 'Ajustar' : 'Fit Page') 
                                                  : (lang === 'pt' ? 'Original' : lang === 'es' ? 'Original' : 'Original')}
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  )}

                                </div>
                              )}
                            </div>
                          )}



                          {/* Action start workflow CTA trigger */}
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={handleProcessRequest}
                              disabled={!state.selectedOperation}
                              className={`w-full py-3.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                !state.selectedOperation ? 'btn-primary opacity-50' : 'btn-primary'
                              }`}
                            >
                              <ShieldCheck size={16} />
                              {isInitializingEngine 
                                ? (lang === 'pt' ? 'Iniciando IA (30MB)...' : lang === 'es' ? 'Iniciando IA (30MB)...' : 'Initializing AI (30MB)...')
                                : isImageOp(state.selectedOperation) 
                                  ? (lang === 'pt' ? 'Aplicar MudanÃ§as e Visualizar' : lang === 'es' ? 'Aplicar cambios y visualizar' : 'Apply Changes & Preview') 
                                  : t.processButton}
                            </button>
                          </div>

                        </div>
                      ) : fixedOperation && state.files.length === 0 ? null : (
                        <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 rounded-lg p-3 text-xs font-medium">
                          <AlertCircle size={15} className="shrink-0" />
                          <span>{t.unsupportedType}</span>
                        </div>
                      )}
                    </div>

                  </div>
                )}
                
              </div>
            )}

            {state.isProcessing && (
              <div className="py-6 flex flex-col items-center">
                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-mono">
                    <span className="flex items-center gap-2 bg-blue-50 text-blue-950 px-2.5 py-1 rounded-full animate-pulse uppercase text-[10px] tracking-wider font-extrabold">
                      <RefreshCw size={11} className="animate-spin text-blue-950" />
                      {t.processing}
                    </span>
                    <span className="text-blue-950 text-sm font-extrabold">
                      {Math.floor(state.progress)}%
                    </span>
                  </div>

                  {/* Absolute elegant progress tracker custom bar styled with Dark Blue colors */}
                  <div className="w-full h-4 bg-slate-100 rounded-full border border-slate-200 overflow-hidden relative shadow-inner">
                    <div 
                      className="h-full bg-blue-950 rounded-full transition-all duration-100 ease-out flex items-center justify-end px-2"
                      style={{ width: `${state.progress}%` }}
                    >
                      <span className="text-[9px] font-mono text-white font-extrabold">
                        {Math.floor(state.progress)}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-bold text-center italic max-w-sm mx-auto select-none pt-1">
                    {t.processingAdHint}
                  </p>

                  <div className="pt-2 text-center">
                    <button
                      onClick={cancelProcessing}
                      className="px-4 py-1.5 border border-slate-300 hover:border-slate-400 bg-white text-slate-500 hover:text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {lang === 'pt' ? 'Cancelar Processo' : lang === 'es' ? 'Cancelar Proceso' : 'Cancel Process'}
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* CASE C: completion — premium panel with downloads + continue flow */}
            <AnimatePresence mode="wait">
            {state.isCompleted && (
              <motion.div
                key="completion-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
              <CompletionPanel
                title={t.completionTitle}
                subtitle={t.completionSubtitle}
                downloadLabel={t.completionDownloadLabel}
                closeLabel={t.closeToolLabel}
                closeHint={t.closeToolHint}
                onDownload={triggerDownloadAll}
                onClose={handleCloseCompletion}
              >
                <div className="text-left text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                  {t.generatedFilesTitle} ({state.generatedFiles.length})
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {state.generatedFiles.map((gf, index) => (
                    <div
                      key={`${gf.name}-${index}`}
                      className="premium-surface !p-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg shrink-0">
                          <FileText size={16} />
                        </div>
                        <div className="flex flex-col min-w-0 text-left">
                          <span className="text-xs font-semibold text-slate-800 truncate" title={gf.name}>
                            {gf.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {t.fileSize}: {(gf.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerIndividualDownload(gf)}
                        className="btn-secondary !py-2 !px-3 text-xs shrink-0"
                        title={t.downloadButton}
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </CompletionPanel>
              </motion.div>
            )}
            </AnimatePresence>

          </div>

        </section>

        {/* FILE PREVIEW — above Productivity Suite */}
        <AnimatePresence>
          {!state.isProcessing && state.files.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-win-blue/10 text-win-blue rounded-lg flex items-center justify-center">
                    <ImageIcon size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      {state.isCompleted ? t.previewResultsTitle : t.previewLoadedTitle}
                    </h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {t.previewInputLabel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {state.files.map((file) => {
                  const generated = state.generatedFiles.find(gf => gf.sourceFileId === file.id);
                  return (
                    <motion.div 
                      key={file.id} 
                      layout
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl flex flex-col group"
                    >
                      <div className="flex-1 bg-slate-50 min-h-[260px] flex items-center justify-center p-6 relative">
                        {state.isCompleted && generated ? (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                            {generated.name.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? (
                              <img 
                                src={generated.url} 
                                className="max-w-full max-h-full object-contain rounded shadow-lg border border-white" 
                                alt={generated.name} 
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-win-blue">
                                <FileText size={64} className="opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{generated.name.split('.').pop()} {t.previewReady}</span>
                              </div>
                            )}
                            <button 
                              onClick={() => triggerIndividualDownload(generated)}
                              className="px-4 py-2 bg-win-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                            >
                              <Download size={12} /> {t.downloadButton}
                            </button>
                          </div>
                        ) : (
                          <>
                            {file.previewUrl ? (
                              <img src={file.previewUrl} className="max-w-full max-h-full object-contain rounded shadow-sm" alt={file.name} />
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-slate-300">
                                {file.extension === 'pdf' ? <FileText size={64} /> : <ImageIcon size={64} />}
                                <span className="text-[10px] uppercase font-bold tracking-widest">{file.extension}</span>
                              </div>
                            )}
                            <button 
                              onClick={() => removeSingleFile(file.id)}
                              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all shadow-md"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="px-4 py-3 border-t border-slate-100 bg-white flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-700 truncate">{file.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {state.isCompleted ? t.previewProcessed : t.previewQueued}
                          </p>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 border border-slate-100 px-2 py-1 rounded bg-slate-50">
                          {file.extension.toUpperCase()}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {showSuiteSection && <ProductivityTools lang={lang} linkMode={linkMode} />}

      </div>
      </div>

        {showSideAds && (
        <aside className="hidden lg:flex flex-col w-[160px] shrink-0 premium-surface !p-3 select-none sticky top-24">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">{t.advertisingLabel || "PUBLICIDADE"}</span>
          </div>
          <div className="min-h-[480px] bg-sky-50/50 border border-dashed border-blue-950/15 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-slate-500 font-semibold italic leading-relaxed">
              {t.adContentPlaceholderTwo}
            </p>
          </div>
        </aside>
        )}

      </main>

      {activeModal === 'directory' && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <span className="font-extrabold text-blue-950 text-xs tracking-widest uppercase flex items-center gap-2">
                <BookOpen size={15} className="text-blue-950" />
                {t.directoryButton}
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] text-xs leading-relaxed text-slate-600 space-y-4">
              <div className="space-y-5 text-slate-700 font-sans">
                <p className="text-[13px] font-semibold text-slate-600 border-b border-slate-100 pb-3 leading-relaxed">
                  {conversionDirectory[lang].intro}
                </p>
                {conversionDirectory[lang].sections.map((section) => (
                  <div key={section.title} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-slate-200/60 pb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-win-blue inline-block" />
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item.name} className="text-[11px] leading-relaxed">
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-slate-600 font-medium mt-0.5">{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-3 border-t border-slate-200 flex justify-end bg-slate-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {t.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}


      {passwordGateOpen && (
        <PdfPasswordGateModal
          lang={lang}
          onCancel={() => setPasswordGateOpen(false)}
          onConfirm={handlePasswordGateConfirm}
        />
      )}
    </>
  );
}
