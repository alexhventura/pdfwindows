import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, QrCode, UserCheck, Code2, Droplet, FileJson, Download, X, Plus, Trash2, LayoutTemplate, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import * as prettier from 'prettier/standalone';
import * as babelParser from 'prettier/plugins/babel';
import * as estreeParser from 'prettier/plugins/estree';
import * as htmlParser from 'prettier/plugins/html';
import * as cssParser from 'prettier/plugins/postcss';
import type { LanguageType } from '../types';
import { DocumentStudioModal } from '../documentStudio/DocumentStudioModal';
import { sanitizePdfText } from '../utils/pdfTextSanitizer';
import { drawPdfWindowsFooter } from '../utils/pdfFooter';
import { RichTextEditor } from './RichTextEditor';
import { exportReportPdf } from '../utils/reportPdfExport';
import { ColorPickerTool } from './ColorPickerTool';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

interface Tool {
  id: string;
  name: Record<LanguageType, string>;
  description: Record<LanguageType, string>;
  icon: React.ReactNode;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'color-picker',
    name: {
      pt: 'Capturador de Cores',
      en: 'Color Picker',
      es: 'Capturador de Colores',
    },
    description: {
      pt: 'Descubra instantaneamente códigos HEX e RGB clicando em qualquer ponto da imagem ou da tela.',
      en: 'Instantly discover HEX and RGB codes by clicking anywhere on an image or your screen.',
      es: 'Descubre al instante códigos HEX y RGB haciendo clic en cualquier punto de la imagen o pantalla.',
    },
    icon: <Droplet size={24} />,
    color: 'bg-gradient-to-br from-blue-500 to-orange-400',
  },
  {
    id: 'qr-gen',
    name: {
      pt: 'Gerador de QR Code',
      en: 'QR Code Generator',
      es: 'Generador de Código QR',
    },
    description: {
      pt: 'Links e textos em QR de alta qualidade.',
      en: 'Links and text as high-quality QR codes.',
      es: 'Enlaces y textos en QR de alta calidad.',
    },
    icon: <QrCode size={24} />,
    color: 'bg-blue-500',
  },
  {
    id: 'cpf-gen',
    name: {
      pt: 'Gerador de CPF',
      en: 'CPF Generator',
      es: 'Generador de CPF',
    },
    description: {
      pt: 'CPFs válidos apenas para testes de sistemas.',
      en: 'Valid CPFs for software testing only.',
      es: 'CPFs válidos solo para pruebas de software.',
    },
    icon: <UserCheck size={24} />,
    color: 'bg-orange-500',
  },
  {
    id: 'code-clean',
    name: {
      pt: 'Limpador de Código',
      en: 'Code Cleaner',
      es: 'Limpiador de Código',
    },
    description: {
      pt: 'Formate ou minifique HTML, CSS e JS localmente.',
      en: 'Format or minify HTML, CSS, and JS locally.',
      es: 'Formatea o minifica HTML, CSS y JS localmente.',
    },
    icon: <Code2 size={24} />,
    color: 'bg-indigo-500',
  },
  {
    id: 'document-studio',
    name: {
      pt: 'Estúdio de Documentos',
      en: 'Document Studio',
      es: 'Estudio de Documentos',
    },
    description: {
      pt: 'Modelos profissionais, editor estruturado, pré-visualização ao vivo e PDF local.',
      en: 'Professional templates, structured editor, live preview, and local PDF.',
      es: 'Plantillas profesionales, editor estructurado, vista previa y PDF local.',
    },
    icon: <LayoutTemplate size={24} />,
    color: 'bg-rose-500',
  },
  {
    id: 'report-gen',
    name: {
      pt: 'Gerador de Relatórios',
      en: 'Report Generator',
      es: 'Generador de Informes',
    },
    description: {
      pt: 'Relatórios e recibos profissionais com exportação PDF.',
      en: 'Professional reports and receipts with PDF export.',
      es: 'Informes y recibos profesionales con exportación PDF.',
    },
    icon: <ClipboardList size={24} />,
    color: 'bg-violet-500',
  },
];

const modalT: Record<
  LanguageType,
  Record<string, string>
> = {
  pt: {
    suiteTitle: 'Suíte de Produtividade',
    receiptTitle: 'Gerador de Recibos',
    qrTitle: 'Gerador de QR Code',
    cpfTitle: 'Gerador de CPF para Testes',
    codeTitle: 'Limpador de Código',
    docTitle: 'Estúdio de Documentos',
    reportTitle: 'Gerador de Relatórios',
    reportAuthor: 'Autor',
    reportSubtitle: 'Subtítulo',
    reportIntro: 'Introdução',
    sectionTitle: 'Título da seção',
    sectionBody: 'Conteúdo da seção',
    addSection: 'Adicionar seção',
    generate: 'Gerar',
    close: 'Fechar',
    download: 'Baixar',
    process: 'Processar',
    issuerName: 'Nome do emissor',
    issuerDoc: 'CPF/CNPJ do emissor',
    clientName: 'Nome do cliente',
    clientDoc: 'CPF/CNPJ do cliente',
    date: 'Data',
    useToday: 'Usar data de hoje',
    serviceDesc: 'Descrição detalhada do serviço',
    itemDesc: 'Descrição do item',
    unitPrice: 'Valor unitário (R$)',
    quantity: 'Quantidade',
    addItem: 'Adicionar item',
    paymentMethod: 'Forma de pagamento',
    notes: 'Observações',
    signature: 'Assinatura (texto)',
    city: 'Cidade',
    total: 'Total',
    fullName: 'Nome completo',
    documentId: 'Documento (RG/CPF/CNPJ)',
    customBody: 'Conteúdo personalizado',
    template: 'Modelo',
  },
  en: {
    suiteTitle: 'Productivity Suite',
    receiptTitle: 'Receipt Generator',
    qrTitle: 'QR Code Generator',
    cpfTitle: 'CPF Generator for Tests',
    codeTitle: 'Code Cleaner & Formatter',
    docTitle: 'Document Studio',
    reportTitle: 'Report Generator',
    reportAuthor: 'Author',
    reportSubtitle: 'Subtitle',
    reportIntro: 'Introduction',
    sectionTitle: 'Section title',
    sectionBody: 'Section content',
    addSection: 'Add section',
    generate: 'Generate',
    close: 'Close',
    download: 'Download',
    process: 'Process',
    issuerName: 'Issuer name',
    issuerDoc: 'Issuer tax ID',
    clientName: 'Client name',
    clientDoc: 'Client tax ID',
    date: 'Date',
    useToday: 'Use today\'s date',
    serviceDesc: 'Detailed service description',
    itemDesc: 'Item description',
    unitPrice: 'Unit price',
    quantity: 'Quantity',
    addItem: 'Add item',
    paymentMethod: 'Payment method',
    notes: 'Notes',
    signature: 'Signature (text)',
    city: 'City',
    total: 'Total',
    fullName: 'Full name',
    documentId: 'ID document',
    customBody: 'Custom content',
    template: 'Template',
  },
  es: {
    suiteTitle: 'Suite de Productividad',
    receiptTitle: 'Generador de Recibos',
    qrTitle: 'Generador de QR Code',
    cpfTitle: 'Generador de CPF para Pruebas',
    codeTitle: 'Limpiador de Código',
    docTitle: 'Estudio de Documentos',
    reportTitle: 'Generador de Informes',
    reportAuthor: 'Autor',
    reportSubtitle: 'Subtítulo',
    reportIntro: 'Introducción',
    sectionTitle: 'Título de sección',
    sectionBody: 'Contenido de sección',
    addSection: 'Agregar sección',
    generate: 'Generar',
    close: 'Cerrar',
    download: 'Descargar',
    process: 'Procesar',
    issuerName: 'Nombre del emisor',
    issuerDoc: 'ID fiscal del emisor',
    clientName: 'Nombre del cliente',
    clientDoc: 'ID fiscal del cliente',
    date: 'Fecha',
    useToday: 'Usar fecha de hoy',
    serviceDesc: 'Descripción detallada del servicio',
    itemDesc: 'Descripción del ítem',
    unitPrice: 'Precio unitario',
    quantity: 'Cantidad',
    addItem: 'Agregar ítem',
    paymentMethod: 'Forma de pago',
    notes: 'Observaciones',
    signature: 'Firma (texto)',
    city: 'Ciudad',
    total: 'Total',
    fullName: 'Nombre completo',
    documentId: 'Documento (ID)',
    customBody: 'Contenido personalizado',
    template: 'Plantilla',
  },
};


interface LineItem {
  id: string;
  description: string;
  unitPrice: string;
  quantity: string;
}

const inputClass = 'premium-input text-xs';

const SUITE_PATHS: Record<string, string> = {
  'color-picker': '/capturador-de-cores',
  'qr-gen': '/gerador-qr-code',
  'cpf-gen': '/gerador-cpf',
  'code-clean': '/limpador-codigo',
  'document-studio': '/estudio-documentos',
  'report-gen': '/gerador-relatorios',
};

function renderSuiteTool(toolId: string, lang: LanguageType, onClose: () => void, inModal = false) {
  switch (toolId) {
    case 'color-picker':
      return <ColorPickerTool lang={lang} onClose={onClose} showHeader={inModal} />;
    case 'qr-gen':
      return <QRCodeGeneratorModal onClose={onClose} lang={lang} />;
    case 'cpf-gen':
      return <CPFGeneratorModal onClose={onClose} lang={lang} />;
    case 'code-clean':
      return <CodeCleanerModal onClose={onClose} lang={lang} />;
    case 'document-studio':
      return <DocumentStudioModal onClose={onClose} lang={lang} />;
    case 'report-gen':
      return <ReportGeneratorModal onClose={onClose} lang={lang} />;
    default:
      return null;
  }
}

export const SuiteToolEmbed: React.FC<{ toolId: string; lang: LanguageType }> = ({ toolId, lang }) => {
  const [resetKey, setResetKey] = useState(0);

  const handleClose = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <section className="workspace-panel">
      <div key={resetKey}>{renderSuiteTool(toolId, lang, handleClose)}</div>
    </section>
  );
};

export const ProductivityTools: React.FC<{ lang: LanguageType; linkMode?: boolean }> = ({ lang, linkMode = false }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const t = modalT[lang];
  const lp = useLocalizedPath();

  const renderModal = () =>
    activeTool ? renderSuiteTool(activeTool, lang, () => setActiveTool(null), true) : null;

  return (
    <section className="w-full premium-surface md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="card-icon-wrap !mb-0">
          <FileJson size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t.suiteTitle}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const card = (
            <>
              <div
                className={`absolute top-0 right-0 w-16 h-16 ${tool.color} opacity-5 rounded-bl-full transition-all group-hover:opacity-10 group-hover:scale-150`}
              />
              <div
                className={`w-12 h-12 ${tool.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
              >
                {tool.icon}
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1">{tool.name[lang]}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{tool.description[lang]}</p>
            </>
          );

          if (linkMode) {
            return (
              <Link
                key={tool.id}
                to={lp(SUITE_PATHS[tool.id])}
                className="group relative tool-card p-5 text-left cursor-pointer overflow-hidden block"
              >
                {card}
              </Link>
            );
          }

          return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActiveTool(tool.id)}
            className="group relative tool-card p-5 text-left cursor-pointer overflow-hidden"
          >
            {card}
          </button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeTool && (
          <div
            className="modal-backdrop"
            role="presentation"
            onClick={() => setActiveTool(null)}
            onKeyDown={(e) => e.key === 'Escape' && setActiveTool(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={`modal-panel ${
                activeTool === 'document-studio'
                  ? 'max-w-6xl max-h-[92vh]'
                  : activeTool === 'color-picker'
                    ? 'max-w-5xl max-h-[92vh]'
                    : 'max-w-3xl max-h-[90vh]'
              }`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="overflow-y-auto flex-1">{renderModal()}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ModalHeader: React.FC<{ title: string; onClose: () => void; closeLabel?: string }> = ({
  title,
  onClose,
  closeLabel = 'Fechar',
}) => (
  <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-400" />
      {title}
    </h3>
    <button
      type="button"
      onClick={onClose}
      className="inline-flex items-center gap-1.5 px-3 py-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
    >
      <X size={16} />
      {closeLabel}
    </button>
  </div>
);

function parseMoney(value: string): number {
  const n = parseFloat(value.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(value: number, lang: LanguageType): string {
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(value);
}

const ReceiptGeneratorPanel: React.FC<{ lang: LanguageType }> = ({ lang }) => {
  const t = modalT[lang];
  const [form, setForm] = useState({
    issuerName: '',
    issuerDoc: '',
    clientName: '',
    clientDoc: '',
    date: new Date().toISOString().split('T')[0],
    useAutoDate: true,
    serviceDescription: '',
    paymentMethod: '',
    notes: '',
    signature: '',
    city: '',
  });
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: '', unitPrice: '', quantity: '1' },
  ]);

  const total = useMemo(
    () =>
      items.reduce((acc, item) => acc + parseMoney(item.unitPrice) * (parseInt(item.quantity, 10) || 0), 0),
    [items]
  );

  const effectiveDate = form.useAutoDate ? new Date().toISOString().split('T')[0] : form.date;

  const generateReceipt = async () => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let y = height - 50;

    const draw = (text: string, size = 11, bold = false) => {
      if (y < 80) {
        page = pdfDoc.addPage([595, 842]);
        y = height - 50;
      }
      page.drawText(sanitizePdfText(text), { x: 50, y, size, font: bold ? fontBold : font, maxWidth: width - 100 });
      y -= size + 8;
    };

    draw(lang === 'pt' ? 'RECIBO' : lang === 'es' ? 'RECIBO' : 'RECEIPT', 18, true);
    draw(`${t.issuerName}: ${form.issuerName} (${form.issuerDoc})`, 10);
    draw(`${t.clientName}: ${form.clientName} (${form.clientDoc})`, 10);
    draw(`${t.date}: ${effectiveDate}`, 10);
    draw(`${t.city}: ${form.city}`, 10);
    y -= 6;
    draw(form.serviceDescription, 10);
    y -= 4;
    draw('—'.repeat(40), 10);
    items.forEach((item, idx) => {
      const lineTotal = parseMoney(item.unitPrice) * (parseInt(item.quantity, 10) || 0);
      draw(
        `${idx + 1}. ${item.description || '—'} | ${item.quantity}x ${formatMoney(parseMoney(item.unitPrice), lang)} = ${formatMoney(lineTotal, lang)}`,
        10
      );
    });
    draw(`${t.total}: ${formatMoney(total, lang)}`, 12, true);
    draw(`${t.paymentMethod}: ${form.paymentMethod}`, 10);
    if (form.notes) draw(`${t.notes}: ${form.notes}`, 10);
    y -= 20;
    if (form.signature.trim()) {
      draw('_'.repeat(35), 10);
      draw(`${t.signature}: ${form.signature}`, 10);
    }

    pdfDoc.getPages().forEach((p) => drawPdfWindowsFooter(p, font, width, 28));

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recibo_${effectiveDate}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className={inputClass} placeholder={t.issuerName} value={form.issuerName} onChange={(e) => setForm({ ...form, issuerName: e.target.value })} />
          <input className={inputClass} placeholder={t.issuerDoc} value={form.issuerDoc} onChange={(e) => setForm({ ...form, issuerDoc: e.target.value })} />
          <input className={inputClass} placeholder={t.clientName} value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
          <input className={inputClass} placeholder={t.clientDoc} value={form.clientDoc} onChange={(e) => setForm({ ...form, clientDoc: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <input type="date" className={inputClass} value={form.date} disabled={form.useAutoDate} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <input type="checkbox" checked={form.useAutoDate} onChange={(e) => setForm({ ...form, useAutoDate: e.target.checked })} className="accent-win-blue" />
            {t.useToday}
          </label>
        </div>
        <textarea className={`${inputClass} h-20`} placeholder={t.serviceDesc} value={form.serviceDescription} onChange={(e) => setForm({ ...form, serviceDescription: e.target.value })} />
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <input className={`${inputClass} col-span-5`} placeholder={t.itemDesc} value={item.description} onChange={(e) => setItems(items.map((i) => (i.id === item.id ? { ...i, description: e.target.value } : i)))} />
              <input className={`${inputClass} col-span-3`} placeholder={t.unitPrice} value={item.unitPrice} onChange={(e) => setItems(items.map((i) => (i.id === item.id ? { ...i, unitPrice: e.target.value } : i)))} />
              <input className={`${inputClass} col-span-2`} placeholder={t.quantity} value={item.quantity} onChange={(e) => setItems(items.map((i) => (i.id === item.id ? { ...i, quantity: e.target.value } : i)))} />
              <button type="button" className="col-span-2 p-2 text-rose-500 hover:bg-rose-50 rounded-lg" onClick={() => items.length > 1 && setItems(items.filter((i) => i.id !== item.id))}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button type="button" className="text-xs font-bold text-win-blue flex items-center gap-1" onClick={() => setItems([...items, { id: String(Date.now()), description: '', unitPrice: '', quantity: '1' }])}>
            <Plus size={14} /> {t.addItem}
          </button>
        </div>
        <p className="text-sm font-black text-emerald-700">{t.total}: {formatMoney(total, lang)}</p>
        <input className={inputClass} placeholder={t.paymentMethod} value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} />
        <textarea className={`${inputClass} h-16`} placeholder={t.notes} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <input className={inputClass} placeholder={t.signature} value={form.signature} onChange={(e) => setForm({ ...form, signature: e.target.value })} />
        <input className={inputClass} placeholder={t.city} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <button type="button" onClick={generateReceipt} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
          <Download size={16} /> {t.generate} PDF
        </button>
    </div>
  );
};

interface ReportSection {
  id: string;
  title: string;
  body: string;
}

const ReportGeneratorModal: React.FC<{ onClose: () => void; lang: LanguageType }> = ({ onClose, lang }) => {
  const t = modalT[lang];
  const [mode, setMode] = useState<'report' | 'receipt'>('report');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'recibo' || hash === 'receipt') {
      setMode('receipt');
    }
  }, []);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    author: '',
    intro: '',
  });
  const [sections, setSections] = useState<ReportSection[]>([
    { id: '1', title: '', body: '' },
  ]);

  const generateReport = async () => {
    const bytes = await exportReportPdf({
      title: form.title,
      subtitle: form.subtitle,
      author: form.author,
      introHtml: form.intro,
      sections: sections.map((s) => ({ title: s.title, bodyHtml: s.body })),
      lang,
    });
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${new Date().toISOString().split('T')[0]}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabReport =
    lang === 'pt' ? 'Relatório' : lang === 'es' ? 'Informe' : 'Report';
  const tabReceipt =
    lang === 'pt' ? 'Recibo' : lang === 'es' ? 'Recibo' : 'Receipt';

  return (
    <>
      <ModalHeader title={t.reportTitle} onClose={onClose} closeLabel={t.close} />
      <div className="px-6 pt-4 flex gap-2 border-b border-slate-100/80">
        <button
          type="button"
          onClick={() => setMode('report')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors ${
            mode === 'report'
              ? 'text-win-blue border-b-2 border-win-blue bg-blue-50/50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {tabReport}
        </button>
        <button
          type="button"
          onClick={() => setMode('receipt')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors ${
            mode === 'receipt'
              ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50/50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {tabReceipt}
        </button>
      </div>
      {mode === 'receipt' ? (
        <div className="p-6">
          <ReceiptGeneratorPanel lang={lang} />
        </div>
      ) : (
      <div className="p-6 space-y-4">
        <input className={inputClass} placeholder={lang === 'pt' ? 'Título do relatório' : lang === 'es' ? 'Título del informe' : 'Report title'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className={inputClass} placeholder={t.reportSubtitle} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        <input className={inputClass} placeholder={t.reportAuthor} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.reportIntro}</p>
          <RichTextEditor value={form.intro} onChange={(intro) => setForm({ ...form, intro })} placeholder={t.reportIntro} minHeight={100} />
        </div>
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="p-4 border border-slate-200/80 rounded-2xl space-y-3 bg-white/60">
              <input className={inputClass} placeholder={t.sectionTitle} value={section.title} onChange={(e) => setSections(sections.map((s) => (s.id === section.id ? { ...s, title: e.target.value } : s)))} />
              <RichTextEditor
                value={section.body}
                onChange={(body) => setSections(sections.map((s) => (s.id === section.id ? { ...s, body } : s)))}
                placeholder={t.sectionBody}
                minHeight={120}
              />
              {sections.length > 1 && (
                <button type="button" className="text-xs font-bold text-rose-600 flex items-center gap-1" onClick={() => setSections(sections.filter((s) => s.id !== section.id))}>
                  <Trash2 size={14} /> {lang === 'pt' ? 'Remover seção' : lang === 'es' ? 'Eliminar sección' : 'Remove section'}
                </button>
              )}
            </div>
          ))}
          <button type="button" className="text-xs font-bold text-win-blue flex items-center gap-1" onClick={() => setSections([...sections, { id: String(Date.now()), title: '', body: '' }])}>
            <Plus size={14} /> {t.addSection}
          </button>
        </div>
        <button type="button" onClick={generateReport} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
          <Download size={16} /> {t.download} PDF
        </button>
      </div>
      )}
    </>
  );
};

const QRCodeGeneratorModal: React.FC<{ onClose: () => void; lang: LanguageType }> = ({ onClose, lang }) => {
  const t = modalT[lang];
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQR = async () => {
    if (!text) return;
    setQrUrl(await QRCode.toDataURL(text, { width: 400, margin: 2 }));
  };

  return (
    <>
      <ModalHeader title={t.qrTitle} onClose={onClose} closeLabel={t.close} />
      <div className="p-6 space-y-6">
        <div className="flex gap-2">
          <input type="text" className={`${inputClass} flex-1`} placeholder={lang === 'pt' ? 'Link ou texto...' : 'Link or text...'} value={text} onChange={(e) => setText(e.target.value)} />
          <button type="button" onClick={generateQR} className="btn-primary px-6 py-2.5 text-xs shrink-0">
            {t.generate}
          </button>
        </div>
        {qrUrl && (
          <div className="flex flex-col items-center gap-4">
            <img src={qrUrl} alt="QR Code" className="w-48 h-48 border-4 border-slate-100 rounded-2xl" />
            <a href={qrUrl} download="qrcode.png" className="flex items-center gap-2 text-xs font-bold text-win-blue hover:underline">
              <Download size={14} /> {t.download} QR Code
            </a>
          </div>
        )}
      </div>
    </>
  );
};

const CPFGeneratorModal: React.FC<{ onClose: () => void; lang: LanguageType }> = ({ onClose, lang }) => {
  const t = modalT[lang];
  const [cpf, setCpf] = useState('');

  const generateCPF = () => {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const calcDigit = (arr: number[]) => {
      const sum = arr.reduce((acc, cur, i) => acc + cur * (arr.length + 1 - i), 0);
      const res = sum % 11;
      return res < 2 ? 0 : 11 - res;
    };
    n.push(calcDigit(n));
    n.push(calcDigit(n));
    const s = n.join('');
    setCpf(s.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
  };

  return (
    <>
      <ModalHeader title={t.cpfTitle} onClose={onClose} closeLabel={t.close} />
      <div className="p-12 flex flex-col items-center gap-8">
        <div className="text-4xl font-black text-slate-800 font-mono tracking-tighter bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100 shadow-inner">
          {cpf || '000.000.000-00'}
        </div>
        <button type="button" onClick={generateCPF} className="btn-primary px-10 py-3 text-xs">
          {lang === 'pt' ? 'Gerar novo CPF válido' : 'Generate new CPF'}
        </button>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center max-w-xs">
          {lang === 'pt'
            ? 'Uso exclusivo para testes. Não representa pessoas reais.'
            : 'For testing only. Not real individuals.'}
        </p>
      </div>
    </>
  );
};

const CodeCleanerModal: React.FC<{ onClose: () => void; lang: LanguageType }> = ({ onClose, lang }) => {
  const t = modalT[lang];
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [language, setLanguage] = useState<'html' | 'css' | 'js'>('js');

  const processCode = async () => {
    try {
      if (mode === 'minify') {
        setCode(code.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '').trim());
        return;
      }
      const formatted = await prettier.format(code, {
        parser: language === 'js' ? 'babel' : language,
        plugins: [babelParser, estreeParser, htmlParser, cssParser],
        semi: true,
        singleQuote: true,
      });
      setCode(formatted);
    } catch {
      alert(lang === 'pt' ? 'Erro ao formatar. Verifique a sintaxe.' : 'Formatting error. Check syntax.');
    }
  };

  return (
    <>
      <ModalHeader title={t.codeTitle} onClose={onClose} closeLabel={t.close} />
      <div className="p-6 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(['js', 'html', 'css'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLanguage(l)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${language === l ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {l}
            </button>
          ))}
        </div>
        <textarea className="w-full h-64 p-4 border border-slate-200 rounded-2xl text-xs font-mono bg-slate-900 text-indigo-300 outline-none" value={code} onChange={(e) => setCode(e.target.value)} />
        <button type="button" onClick={processCode} className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">
          {t.process}
        </button>
      </div>
    </>
  );
};
