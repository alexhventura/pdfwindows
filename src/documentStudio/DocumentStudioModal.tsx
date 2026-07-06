import React, { useEffect, useMemo, useState } from 'react';
import {
  Download,
  Eye,
  FileText,
  Sparkles,
  Trash2,
  Plus,
  AlertCircle,
  Save,
  X,
} from 'lucide-react';
import type { LanguageType } from '../types';
import type { DocFormValues, DocTemplateId, LineItemRow } from './types';
import {
  DOCUMENT_TEMPLATES,
  TEMPLATE_LIST,
  buildDocumentPreview,
  collectSmartFillKeys,
  getEmptyValues,
  validateDocument,
} from './templates';
import {
  clearAllLocalData,
  getPersistPreference,
  getSmartFillSuggestions,
  hydrateSessionFromStorage,
  loadDraft,
  rememberFieldValues,
  saveDraft,
  setPersistPreference,
} from './smartFill';
import { downloadPdfBytes, exportDocumentPdf } from './pdfExport';
import { RichTextEditor } from '../components/RichTextEditor';

const inputClass =
  'w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-win-blue/20 focus:border-win-blue outline-none bg-white';

const studioT: Record<LanguageType, Record<string, string>> = {
  pt: {
    title: 'Estúdio de Documentos',
    subtitle: 'Editor estruturado • preview ao vivo • exportação PDF local',
    template: 'Modelo',
    preview: 'Pré-visualização',
    smartFill: 'Preencher com dados recentes',
    persistLabel: 'Salvar rascunhos localmente (opcional)',
    clearData: 'Limpar dados locais',
    saveDraft: 'Salvar rascunho',
    exportPdf: 'Exportar PDF',
    requiredHint: 'Preencha os campos obrigatórios:',
    addItem: 'Adicionar item',
    itemDesc: 'Descrição',
    unitPrice: 'Valor unit.',
    quantity: 'Qtd.',
    livePreview: 'Atualização em tempo real',
    switchTemplate: 'Trocar modelo',
    close: 'Fechar',
  },
  en: {
    title: 'Document Studio',
    subtitle: 'Structured editor • live preview • local PDF export',
    template: 'Template',
    preview: 'Preview',
    smartFill: 'Fill with recent data',
    persistLabel: 'Save drafts locally (optional)',
    clearData: 'Clear local data',
    saveDraft: 'Save draft',
    exportPdf: 'Export PDF',
    requiredHint: 'Fill required fields:',
    addItem: 'Add item',
    itemDesc: 'Description',
    unitPrice: 'Unit price',
    quantity: 'Qty.',
    livePreview: 'Real-time update',
    switchTemplate: 'Switch template',
    close: 'Close',
  },
  es: {
    title: 'Estudio de Documentos',
    subtitle: 'Editor estructurado • vista previa en vivo • exportación PDF local',
    template: 'Plantilla',
    preview: 'Vista previa',
    smartFill: 'Rellenar con datos recientes',
    persistLabel: 'Guardar borradores localmente (opcional)',
    clearData: 'Borrar datos locales',
    saveDraft: 'Guardar borrador',
    exportPdf: 'Exportar PDF',
    requiredHint: 'Complete los campos obligatorios:',
    addItem: 'Agregar ítem',
    itemDesc: 'Descripción',
    unitPrice: 'Precio unit.',
    quantity: 'Cant.',
    livePreview: 'Actualización en tiempo real',
    switchTemplate: 'Cambiar plantilla',
    close: 'Cerrar',
  },
};

interface DocumentStudioModalProps {
  lang: LanguageType;
  onClose: () => void;
}

function parseLineItems(raw: string | undefined): LineItemRow[] {
  if (!raw) return [{ id: '1', description: '', unitPrice: '', quantity: '1' }];
  try {
    const parsed = JSON.parse(raw) as LineItemRow[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : [{ id: '1', description: '', unitPrice: '', quantity: '1' }];
  } catch {
    return [{ id: '1', description: '', unitPrice: '', quantity: '1' }];
  }
}

function computeLineItemsTotal(items: LineItemRow[]): number {
  return items.reduce((acc, item) => {
    const price = parseFloat(item.unitPrice.replace(/\./g, '').replace(',', '.'));
    const qty = parseInt(item.quantity, 10) || 0;
    return acc + (Number.isFinite(price) ? price : 0) * qty;
  }, 0);
}

export const DocumentStudioModal: React.FC<DocumentStudioModalProps> = ({ lang, onClose }) => {
  const t = studioT[lang];
  const [templateId, setTemplateId] = useState<DocTemplateId>('simple-contract');
  const [values, setValues] = useState<DocFormValues>(() => getEmptyValues('simple-contract'));
  const [errors, setErrors] = useState<string[]>([]);
  const [persistEnabled, setPersistEnabled] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    hydrateSessionFromStorage();
    setPersistEnabled(getPersistPreference());
  }, []);

  const template = DOCUMENT_TEMPLATES[templateId];
  const previewText = useMemo(() => buildDocumentPreview(templateId, values, lang), [templateId, values, lang]);

  const handleTemplateChange = (id: DocTemplateId) => {
    setTemplateId(id);
    const draft = persistEnabled ? loadDraft(id) : null;
    setValues(draft ?? getEmptyValues(id));
    setErrors([]);
  };

  const updateField = (fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors([]);
  };

  const applySmartFill = () => {
    const suggestions = getSmartFillSuggestions(collectSmartFillKeys(templateId));
    setValues((prev) => {
      const next = { ...prev };
      for (const section of template.sections) {
        for (const field of section.fields) {
          const key = field.smartFillKey ?? field.id;
          const suggested = suggestions[key];
          if (suggested && !prev[field.id]?.trim()) {
            next[field.id] = suggested;
          }
        }
      }
      return next;
    });
  };

  const handlePersistToggle = (enabled: boolean) => {
    setPersistEnabled(enabled);
    setPersistPreference(enabled);
    if (enabled) saveDraft(templateId, values);
  };

  const handleClearData = () => {
    if (!window.confirm(lang === 'pt' ? 'Limpar todos os dados locais do Estúdio de Documentos?' : lang === 'es' ? '¿Borrar todos los datos locales del Estudio de Documentos?' : 'Clear all local Document Studio data?')) {
      return;
    }
    clearAllLocalData();
    setPersistEnabled(false);
    setValues(getEmptyValues(templateId));
  };

  const handleSaveDraft = () => {
    if (!persistEnabled) return;
    saveDraft(templateId, values);
  };

  const handleExport = async () => {
    const validationErrors = validateDocument(templateId, values, lang);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsExporting(true);
    try {
      const keys = collectSmartFillKeys(templateId);
      const fieldIds = template.sections.flatMap((s) => s.fields.map((f) => f.id));
      rememberFieldValues(values, [...keys, ...fieldIds]);
      if (persistEnabled) saveDraft(templateId, values);

      const bytes = await exportDocumentPdf(templateId, values, lang);
      downloadPdfBytes(bytes, `${templateId}_${new Date().toISOString().split('T')[0]}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  const renderLineItems = (fieldId: string) => {
    const items = parseLineItems(values[fieldId]);

    const syncItems = (next: LineItemRow[]) => {
      const nextTotal = computeLineItemsTotal(next);
      setValues((prev) => ({
        ...prev,
        [fieldId]: JSON.stringify(next),
        totalAmount: String(nextTotal.toFixed(2)).replace('.', ','),
      }));
      setErrors([]);
    };

    return (
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              className={`${inputClass} col-span-5`}
              placeholder={t.itemDesc}
              value={item.description}
              onChange={(e) =>
                syncItems(items.map((i) => (i.id === item.id ? { ...i, description: e.target.value } : i)))
              }
            />
            <input
              className={`${inputClass} col-span-3`}
              placeholder={t.unitPrice}
              value={item.unitPrice}
              onChange={(e) =>
                syncItems(items.map((i) => (i.id === item.id ? { ...i, unitPrice: e.target.value } : i)))
              }
            />
            <input
              className={`${inputClass} col-span-2`}
              placeholder={t.quantity}
              value={item.quantity}
              onChange={(e) =>
                syncItems(items.map((i) => (i.id === item.id ? { ...i, quantity: e.target.value } : i)))
              }
            />
            <button
              type="button"
              className="col-span-2 p-2 text-rose-500 hover:bg-rose-50 rounded-lg flex justify-center"
              onClick={() => items.length > 1 && syncItems(items.filter((i) => i.id !== item.id))}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-[10px] font-bold text-win-blue flex items-center gap-1"
          onClick={() =>
            syncItems([...items, { id: String(Date.now()), description: '', unitPrice: '', quantity: '1' }])
          }
        >
          <Plus size={12} /> {t.addItem}
        </button>
      </div>
    );
  };

  const renderField = (fieldId: string, type: string, label: string, placeholder?: string, required?: boolean) => {
    if (type === 'line-items') return renderLineItems(fieldId);
    if (type === 'textarea') {
      return (
        <RichTextEditor
          value={values[fieldId] ?? ''}
          onChange={(html) => updateField(fieldId, html)}
          placeholder={placeholder}
          minHeight={100}
        />
      );
    }
    return (
      <input
        type={type === 'date' ? 'date' : type === 'number' ? 'number' : 'text'}
        className={inputClass}
        placeholder={placeholder}
        value={values[fieldId] ?? ''}
        onChange={(e) => updateField(fieldId, e.target.value)}
        aria-required={required}
      />
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      <div className="bg-slate-900 text-white px-6 py-4 flex items-start justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={18} className="text-emerald-400" />
            <h3 className="text-sm font-black uppercase tracking-tight">{t.title}</h3>
          </div>
          <p className="text-[10px] text-slate-300 font-medium">{t.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-2 hover:bg-white/10 rounded-lg text-slate-300 text-xs font-semibold"
        >
          <X size={16} />
          {t.close}
        </button>
      </div>

      <div className="px-6 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.template}</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_LIST.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              title={tpl.description[lang]}
              onClick={() => handleTemplateChange(tpl.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                templateId === tpl.id
                  ? 'bg-win-blue text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-win-blue'
              }`}
            >
              {tpl.label[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-0">
        <div className="overflow-y-auto p-6 space-y-5 border-r border-slate-100">
          {template.sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                {section.title[lang]}
              </h4>
              <div className="space-y-2.5">
                {section.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      {field.label[lang]}
                      {field.required && <span className="text-rose-500 ml-0.5">*</span>}
                    </label>
                    {renderField(
                      field.id,
                      field.type,
                      field.label[lang],
                      field.placeholder?.[lang],
                      field.required
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {errors.length > 0 && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-[10px] text-rose-700 font-semibold flex gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <div>
                <p>{t.requiredHint}</p>
                <ul className="list-disc ml-4 mt-1">
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-y-auto p-6 bg-slate-50/80 flex flex-col min-h-[280px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-win-blue" />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{t.preview}</span>
            </div>
            <span className="text-[9px] text-slate-400 font-bold uppercase">{t.livePreview}</span>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-inner p-6 overflow-y-auto">
            <pre className="text-[11px] text-slate-700 whitespace-pre-wrap font-serif leading-relaxed">{previewText}</pre>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={applySmartFill}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100 transition-colors"
          >
            <Sparkles size={13} /> {t.smartFill}
          </button>
          <label className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={persistEnabled}
              onChange={(e) => handlePersistToggle(e.target.checked)}
              className="accent-win-blue"
            />
            {t.persistLabel}
          </label>
          {persistEnabled && (
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Save size={13} /> {t.saveDraft}
            </button>
          )}
          <button
            type="button"
            onClick={handleClearData}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold text-rose-600 hover:bg-rose-50"
          >
            <Trash2 size={13} /> {t.clearData}
          </button>
        </div>

        <button
          type="button"
          disabled={isExporting}
          onClick={handleExport}
          className="w-full py-3.5 bg-win-blue hover:bg-win-blue/90 disabled:opacity-60 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
        >
          <Download size={16} />
          {isExporting ? '...' : t.exportPdf}
        </button>
      </div>
    </div>
  );
};
