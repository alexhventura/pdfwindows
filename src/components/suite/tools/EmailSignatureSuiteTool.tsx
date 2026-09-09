import { useCallback, useMemo, useState } from 'react';
import { Check, Copy, Download, ImagePlus, RefreshCw, Trash2 } from 'lucide-react';
import type { LanguageType } from '../../../types';
import { SuiteWorkspaceShell, SUITE_UPLOAD_SUBTITLE } from '../DocumentToolDropzone';
import { inputClass } from '../shared';
import {
  ACCENT_SWATCHES,
  BACKGROUND_SWATCHES,
  SIGNATURE_TEMPLATES,
  buildSignatureSvg,
  fileToImageDataUrl,
  rasterizeSignature,
  type SignatureAppearance,
  type SignatureData,
  type SignatureExportFormat,
  type SignatureTemplateId,
} from '../../../utils/emailSignature';

type Props = { lang: LanguageType; onClose: () => void; showHeader?: boolean };

function closeLbl(lang: LanguageType) {
  return lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close';
}

function copy(lang: LanguageType) {
  if (lang === 'pt') {
    return {
      title: 'Criador de Assinatura de E-mail',
      background: 'Fundo',
      transparent: 'Transparente',
      custom: 'Personalizada',
      accent: 'Cor dos detalhes',
      template: 'Modelo',
      yourData: 'Seus dados',
      name: 'Nome',
      role: 'Cargo',
      company: 'Empresa',
      phone: 'Telefone',
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      website: 'Site',
      customText: 'Frase / descrição (opcional)',
      images: 'Foto e logo',
      photo: 'Foto',
      logo: 'Logo',
      add: 'Adicionar',
      replace: 'Trocar',
      remove: 'Remover',
      preview: 'Pré-visualização',
      download: 'Baixar',
      copyImage: 'Copiar imagem',
      copied: 'Copiado!',
      generating: 'Gerando…',
      reset: 'Recomeçar',
      privacy: 'Tudo é processado no seu navegador. Nenhuma foto ou dado é enviado.',
      previewHint: 'A imagem baixada é idêntica a esta pré-visualização.',
    };
  }
  if (lang === 'es') {
    return {
      title: 'Creador de Firma de Correo',
      background: 'Fondo',
      transparent: 'Transparente',
      custom: 'Personalizado',
      accent: 'Color de los detalles',
      template: 'Plantilla',
      yourData: 'Tus datos',
      name: 'Nombre',
      role: 'Cargo',
      company: 'Empresa',
      phone: 'Teléfono',
      whatsapp: 'WhatsApp',
      email: 'Correo',
      website: 'Sitio',
      customText: 'Frase / descripción (opcional)',
      images: 'Foto y logo',
      photo: 'Foto',
      logo: 'Logo',
      add: 'Añadir',
      replace: 'Cambiar',
      remove: 'Quitar',
      preview: 'Vista previa',
      download: 'Descargar',
      copyImage: 'Copiar imagen',
      copied: '¡Copiado!',
      generating: 'Generando…',
      reset: 'Reiniciar',
      privacy: 'Todo se procesa en tu navegador. Ninguna foto o dato se envía.',
      previewHint: 'La imagen descargada es idéntica a esta vista previa.',
    };
  }
  return {
    title: 'Email Signature Creator',
    background: 'Background',
    transparent: 'Transparent',
    custom: 'Custom',
    accent: 'Accent color',
    template: 'Template',
    yourData: 'Your details',
    name: 'Name',
    role: 'Role',
    company: 'Company',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    email: 'Email',
    website: 'Website',
    customText: 'Tagline / description (optional)',
    images: 'Photo and logo',
    photo: 'Photo',
    logo: 'Logo',
    add: 'Add',
    replace: 'Replace',
    remove: 'Remove',
    preview: 'Preview',
    download: 'Download',
    copyImage: 'Copy image',
    copied: 'Copied!',
    generating: 'Generating…',
    reset: 'Start over',
    privacy: 'Everything runs in your browser. No photo or data is uploaded.',
    previewHint: 'The downloaded image is identical to this preview.',
  };
}

const EMPTY_DATA: SignatureData = {
  name: '',
  role: '',
  company: '',
  phone: '',
  whatsapp: '',
  email: '',
  website: '',
  customText: '',
};

const FORMATS: SignatureExportFormat[] = ['png', 'jpeg', 'webp'];
const FORMAT_LABEL: Record<SignatureExportFormat, string> = { png: 'PNG', jpeg: 'JPG', webp: 'WEBP' };
const FORMAT_EXT: Record<SignatureExportFormat, string> = { png: 'png', jpeg: 'jpg', webp: 'webp' };

const CHECKER =
  'repeating-conic-gradient(#e2e8f0 0% 25%, #ffffff 0% 50%) 50% / 16px 16px';

function ImageSlot({
  label,
  value,
  onPick,
  onClear,
  t,
}: {
  label: string;
  value?: string;
  onPick: (file: File) => void;
  onClear: () => void;
  t: ReturnType<typeof copy>;
}) {
  const inputId = `sig-img-${label}`;
  return (
    <div className="rounded-xl border border-slate-200 p-3 flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-lg border border-slate-200 shrink-0 bg-slate-50 bg-center bg-contain bg-no-repeat"
        style={value ? { backgroundImage: `url(${value})`, background: `url(${value}) center/contain no-repeat, ${CHECKER}` } : undefined}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-slate-600">{label}</p>
        <div className="flex gap-2 mt-1">
          <label
            htmlFor={inputId}
            className="btn-secondary text-[11px] py-1.5 px-2.5 inline-flex items-center gap-1 cursor-pointer"
          >
            <ImagePlus size={12} /> {value ? t.replace : t.add}
          </label>
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="text-[11px] py-1.5 px-2.5 inline-flex items-center gap-1 text-rose-600 font-semibold hover:bg-rose-50 rounded-lg"
            >
              <Trash2 size={12} /> {t.remove}
            </button>
          )}
        </div>
      </div>
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,.png,.jpg,.jpeg,.webp,.svg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
          e.currentTarget.value = '';
        }}
      />
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-slate-500">{label}</span>
      <input type={type} className={`${inputClass} mt-1 w-full`} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function EmailSignatureSuiteTool({ lang, onClose, showHeader }: Props) {
  const t = copy(lang);
  const [data, setData] = useState<SignatureData>(EMPTY_DATA);
  const [appearance, setAppearance] = useState<SignatureAppearance>({
    background: '#ffffff',
    backgroundTransparent: false,
    accentColor: '#2563eb',
    template: 'classic',
  });
  const [format, setFormat] = useState<SignatureExportFormat>('png');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCopy = typeof window !== 'undefined' && typeof ClipboardItem !== 'undefined' && Boolean(navigator.clipboard?.write);

  const set = (patch: Partial<SignatureData>) => setData((prev) => ({ ...prev, ...patch }));
  const setLook = (patch: Partial<SignatureAppearance>) => setAppearance((prev) => ({ ...prev, ...patch }));

  const previewSvg = useMemo(() => buildSignatureSvg(data, appearance).svg, [data, appearance]);

  const pickImage = useCallback(async (kind: 'photo' | 'logo', file: File) => {
    setError(null);
    try {
      const url = await fileToImageDataUrl(file, kind === 'photo' ? 640 : 480);
      setData((prev) => ({ ...prev, [kind]: url }));
    } catch {
      setError(lang === 'pt' ? 'Não foi possível carregar a imagem.' : lang === 'es' ? 'No se pudo cargar la imagen.' : 'Could not load the image.');
    }
  }, [lang]);

  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const blob = await rasterizeSignature(data, appearance, format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assinatura-email.${FORMAT_EXT[format]}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch {
      setError(lang === 'pt' ? 'Não foi possível gerar a imagem.' : lang === 'es' ? 'No se pudo generar la imagen.' : 'Could not generate the image.');
    } finally {
      setBusy(false);
    }
  };

  const copyImage = async () => {
    setBusy(true);
    setError(null);
    try {
      const blob = await rasterizeSignature(data, appearance, 'png');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError(lang === 'pt' ? 'Não foi possível copiar. Use Baixar.' : lang === 'es' ? 'No se pudo copiar. Usa Descargar.' : 'Could not copy. Use Download.');
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setData(EMPTY_DATA);
    setAppearance({ background: '#ffffff', backgroundTransparent: false, accentColor: '#2563eb', template: 'classic' });
    setFormat('png');
    setError(null);
  };

  return (
    <SuiteWorkspaceShell
      title={t.title}
      subtitle={SUITE_UPLOAD_SUBTITLE[lang]}
      showHeader={showHeader}
      onClose={onClose}
      closeLabel={closeLbl(lang)}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* CONFIG PANEL */}
        <div className="space-y-6 min-w-0">
          {/* Background */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.background}</h3>
            <div className="flex flex-wrap gap-2">
              {BACKGROUND_SWATCHES.map((sw) => {
                const active = sw.value === 'transparent' ? appearance.backgroundTransparent : !appearance.backgroundTransparent && appearance.background === sw.value;
                return (
                  <button
                    key={sw.id}
                    type="button"
                    title={sw.label[lang]}
                    aria-label={sw.label[lang]}
                    onClick={() =>
                      sw.value === 'transparent'
                        ? setLook({ backgroundTransparent: true })
                        : setLook({ backgroundTransparent: false, background: sw.value })
                    }
                    className={`w-8 h-8 rounded-full border shadow-sm ${active ? 'ring-2 ring-win-blue ring-offset-2' : 'border-slate-200'}`}
                    style={sw.value === 'transparent' ? { background: CHECKER } : { backgroundColor: sw.value }}
                  />
                );
              })}
              <label className={`w-8 h-8 rounded-full border border-slate-200 shadow-sm overflow-hidden cursor-pointer relative ${!appearance.backgroundTransparent && !BACKGROUND_SWATCHES.some((s) => s.value === appearance.background) ? 'ring-2 ring-win-blue ring-offset-2' : ''}`} title={t.custom}>
                <span className="absolute inset-0" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }} />
                <input
                  type="color"
                  value={appearance.backgroundTransparent ? '#ffffff' : appearance.background}
                  onChange={(e) => setLook({ backgroundTransparent: false, background: e.target.value })}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </label>
            </div>
          </section>

          {/* Accent */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.accent}</h3>
            <div className="flex flex-wrap gap-2">
              {ACCENT_SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  onClick={() => setLook({ accentColor: c })}
                  className={`w-8 h-8 rounded-full border shadow-sm ${appearance.accentColor === c ? 'ring-2 ring-win-blue ring-offset-2' : 'border-slate-200'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <label className={`w-8 h-8 rounded-full border border-slate-200 shadow-sm overflow-hidden cursor-pointer relative ${!ACCENT_SWATCHES.includes(appearance.accentColor) ? 'ring-2 ring-win-blue ring-offset-2' : ''}`} title={t.custom}>
                <span className="absolute inset-0" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }} />
                <input type="color" value={appearance.accentColor} onChange={(e) => setLook({ accentColor: e.target.value })} className="opacity-0 w-full h-full cursor-pointer" />
              </label>
            </div>
          </section>

          {/* Template */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.template}</h3>
            <div className="grid grid-cols-2 gap-2">
              {SIGNATURE_TEMPLATES.map((tpl) => {
                const active = appearance.template === tpl.id;
                const thumb = buildSignatureSvg(data, { ...appearance, template: tpl.id as SignatureTemplateId }).svg;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setLook({ template: tpl.id })}
                    className={`rounded-xl border p-2 text-left transition ${active ? 'border-win-blue ring-2 ring-win-blue/30' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div
                      className="w-full h-16 rounded-md overflow-hidden flex items-center justify-center"
                      style={{ background: appearance.backgroundTransparent ? CHECKER : '#f8fafc' }}
                      dangerouslySetInnerHTML={{ __html: thumb }}
                    />
                    <span className={`text-[11px] font-semibold mt-1 block ${active ? 'text-win-blue' : 'text-slate-500'}`}>{tpl.label[lang]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Data */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.yourData}</h3>
            <Field label={t.name} value={data.name} onChange={(v) => set({ name: v })} />
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.role} value={data.role} onChange={(v) => set({ role: v })} />
              <Field label={t.company} value={data.company} onChange={(v) => set({ company: v })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.phone} value={data.phone} onChange={(v) => set({ phone: v })} />
              <Field label={t.whatsapp} value={data.whatsapp} onChange={(v) => set({ whatsapp: v })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.email} value={data.email} onChange={(v) => set({ email: v })} type="email" />
              <Field label={t.website} value={data.website} onChange={(v) => set({ website: v })} />
            </div>
            <Field label={t.customText} value={data.customText} onChange={(v) => set({ customText: v })} />
          </section>

          {/* Images */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.images}</h3>
            <ImageSlot label={t.photo} value={data.photo} onPick={(f) => void pickImage('photo', f)} onClear={() => set({ photo: undefined })} t={t} />
            <ImageSlot label={t.logo} value={data.logo} onPick={(f) => void pickImage('logo', f)} onClear={() => set({ logo: undefined })} t={t} />
          </section>
        </div>

        {/* PREVIEW + EXPORT */}
        <div className="lg:sticky lg:top-4 self-start space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.preview}</h3>
          <div className="rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm" style={{ background: appearance.backgroundTransparent ? CHECKER : '#ffffff' }}>
            <div className="mx-auto max-w-[560px]" dangerouslySetInnerHTML={{ __html: previewSvg }} />
          </div>
          <p className="text-[11px] text-slate-400">{t.previewHint}</p>

          <div className="flex flex-wrap items-center gap-2">
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`btn-secondary py-2 px-3 text-[11px] ${format === f ? 'ring-2 ring-win-blue' : ''}`}
              >
                {FORMAT_LABEL[f]}
              </button>
            ))}
          </div>

          {error && <p role="alert" className="text-xs text-rose-700 font-semibold">{error}</p>}

          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary py-3 px-6 inline-flex items-center gap-2 flex-1 justify-center" disabled={busy} onClick={() => void download()}>
              <Download size={16} /> {busy ? t.generating : `${t.download} ${FORMAT_LABEL[format]}`}
            </button>
            {canCopy && (
              <button type="button" className="btn-secondary py-3 px-4 inline-flex items-center gap-2" disabled={busy} onClick={() => void copyImage()}>
                {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? t.copied : t.copyImage}
              </button>
            )}
          </div>
          <button type="button" className="text-xs font-semibold text-slate-500 inline-flex items-center gap-1" onClick={reset}>
            <RefreshCw size={12} /> {t.reset}
          </button>
          <p className="text-[10px] text-slate-400">{t.privacy}</p>
        </div>
      </div>
    </SuiteWorkspaceShell>
  );
}
