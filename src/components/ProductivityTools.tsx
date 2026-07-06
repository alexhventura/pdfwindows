import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  QrCode,
  UserCheck,
  Code2,
  Droplet,
  FileJson,
  LayoutTemplate,
  ClipboardList,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { LanguageType } from '../types';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { modalT } from './suite/shared';
import { SuiteModalContent } from './suite/SuiteModalContent';

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
    name: { pt: 'Capturador de Cores', en: 'Color Picker', es: 'Capturador de Colores' },
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
    name: { pt: 'Gerador de QR Code', en: 'QR Code Generator', es: 'Generador de Código QR' },
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
    name: { pt: 'Gerador de CPF', en: 'CPF Generator', es: 'Generador de CPF' },
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
    name: { pt: 'Limpador de Código', en: 'Code Cleaner', es: 'Limpiador de Código' },
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
    name: { pt: 'Estúdio de Documentos', en: 'Document Studio', es: 'Estudio de Documentos' },
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
    name: { pt: 'Gerador de Relatórios', en: 'Report Generator', es: 'Generador de Informes' },
    description: {
      pt: 'Relatórios e recibos profissionais com exportação PDF.',
      en: 'Professional reports and receipts with PDF export.',
      es: 'Informes y recibos profesionales con exportación PDF.',
    },
    icon: <ClipboardList size={24} />,
    color: 'bg-violet-500',
  },
];

const SUITE_PATHS: Record<string, string> = {
  'color-picker': '/capturador-de-cores',
  'qr-gen': '/gerador-qr-code',
  'cpf-gen': '/gerador-cpf',
  'code-clean': '/limpador-codigo',
  'document-studio': '/estudio-documentos',
  'report-gen': '/gerador-relatorios',
};

export const ProductivityTools: React.FC<{ lang: LanguageType; linkMode?: boolean }> = ({
  lang,
  linkMode = false,
}) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const t = modalT[lang];
  const lp = useLocalizedPath();

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
              <div className="overflow-y-auto flex-1">
                <SuiteModalContent
                  toolId={activeTool}
                  lang={lang}
                  onClose={() => setActiveTool(null)}
                  inModal
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Re-export for backward compatibility if needed elsewhere
export { SuiteToolEmbed } from './suite/SuiteToolEmbed';
