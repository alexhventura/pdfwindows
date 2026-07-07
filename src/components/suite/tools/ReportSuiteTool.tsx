import { useEffect, useMemo, useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import type { LanguageType } from '../../../types';
import { sanitizePdfText } from '../../../utils/pdfTextSanitizer';
import { drawPdfWindowsFooter } from '../../../utils/pdfFooter';
import { RichTextEditor } from '../../RichTextEditor';
import { exportReportPdf } from '../../../utils/reportPdfExport';
import { ModalHeader, inputClass, modalT } from '../shared';

interface LineItem {
  id: string;
  description: string;
  unitPrice: string;
  quantity: string;
}

interface ReportSection {
  id: string;
  title: string;
  body: string;
}

function parseMoney(value: string): number {
  const n = parseFloat(value.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(value: number, lang: LanguageType): string {
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(value);
}

function ReceiptGeneratorPanel({ lang }: { lang: LanguageType }) {
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
  const [items, setItems] = useState<LineItem[]>([{ id: '1', description: '', unitPrice: '', quantity: '1' }]);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + parseMoney(item.unitPrice) * (parseInt(item.quantity, 10) || 0), 0),
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

    draw(t.receiptDocHeading, 18, true);
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

    pdfDoc.getPages().forEach((p) => drawPdfWindowsFooter(p, font, width, 28, lang));

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
      <p className="text-sm font-black text-emerald-700">
        {t.total}: {formatMoney(total, lang)}
      </p>
      <input className={inputClass} placeholder={t.paymentMethod} value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} />
      <textarea className={`${inputClass} h-16`} placeholder={t.notes} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <input className={inputClass} placeholder={t.signature} value={form.signature} onChange={(e) => setForm({ ...form, signature: e.target.value })} />
      <input className={inputClass} placeholder={t.city} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      <button type="button" onClick={generateReceipt} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2">
        <Download size={16} /> {t.generate} PDF
      </button>
    </div>
  );
}

export default function ReportSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
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
  const [sections, setSections] = useState<ReportSection[]>([{ id: '1', title: '', body: '' }]);

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

  const tabReport = t.tabReport;
  const tabReceipt = t.tabReceipt;

  return (
    <>
      <ModalHeader title={t.reportTitle} onClose={onClose} closeLabel={t.close} />
      <div className="px-6 pt-4 flex gap-2 border-b border-slate-100/80">
        <button
          type="button"
          onClick={() => setMode('report')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors ${
            mode === 'report' ? 'text-win-blue border-b-2 border-win-blue bg-blue-50/50' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {tabReport}
        </button>
        <button
          type="button"
          onClick={() => setMode('receipt')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors ${
            mode === 'receipt' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-800'
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
          <input className={inputClass} placeholder={t.reportTitlePlaceholder} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className={inputClass} placeholder={t.reportSubtitle} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <input className={inputClass} placeholder={t.reportAuthor} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.reportIntro}</p>
            <RichTextEditor value={form.intro} onChange={(intro) => setForm({ ...form, intro })} placeholder={t.reportIntro} minHeight={100} lang={lang} />
          </div>
          <div className="space-y-3">
            {sections.map((section) => (
              <div key={section.id} className="p-4 border border-slate-200/80 rounded-2xl space-y-3 bg-white/60">
                <input className={inputClass} placeholder={t.sectionTitle} value={section.title} onChange={(e) => setSections(sections.map((s) => (s.id === section.id ? { ...s, title: e.target.value } : s)))} />
                <RichTextEditor value={section.body} onChange={(body) => setSections(sections.map((s) => (s.id === section.id ? { ...s, body } : s)))} placeholder={t.sectionBody} minHeight={120} lang={lang} />
                {sections.length > 1 && (
                  <button type="button" className="text-xs font-bold text-rose-600 flex items-center gap-1" onClick={() => setSections(sections.filter((s) => s.id !== section.id))}>
                    <Trash2 size={14} /> {t.removeSection}
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
}
