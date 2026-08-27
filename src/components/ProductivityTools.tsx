import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FileSpreadsheet,
  QrCode,
  UserCheck,
  Code2,
  Droplet,
  FileJson,
  LayoutTemplate,
  ClipboardList,
  Type,
  Unlock,
  FileKey2,
  ScanSearch,
  Layers,
  SquareStack,
  Crop,
  PenLine,
  Hash,
  Scissors,
  Columns2,
  Pencil,
  Camera,
  Wrench,
  Archive,
  ListChecks,
  Presentation,
  FileType,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { LanguageType } from '../types';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { modalT } from './suite/shared';
import { SuiteModalContent } from './suite/SuiteModalContent';
import { getSuiteFamily, groupToolsByFamily, TOOL_FAMILY_LABELS, toolCardFamilyClass } from '../seo/toolFamily';

interface Tool {
  id: string;
  name: Record<LanguageType, string>;
  description: Record<LanguageType, string>;
  icon: ReactNode;
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
  {
    id: 'font-identifier',
    name: { pt: 'Identificador de Fontes', en: 'Font Identifier', es: 'Identificador de Fuentes' },
    description: {
      pt: 'Descubra as fontes utilizadas em arquivos PDF e Word.',
      en: 'Discover fonts used in PDF and Word files.',
      es: 'Descubra las fuentes usadas en archivos PDF y Word.',
    },
    icon: <Type size={24} />,
    color: 'bg-indigo-600',
  },
  {
    id: 'remove-restrictions',
    name: { pt: 'Remover Restrições', en: 'Remove Restrictions', es: 'Quitar Restricciones' },
    description: {
      pt: 'Remova restrições de edição, cópia e impressão de seus documentos.',
      en: 'Remove editing, copying, and printing restrictions from your documents.',
      es: 'Quite restricciones de edición, copia e impresión de sus documentos.',
    },
    icon: <Unlock size={24} />,
    color: 'bg-orange-500',
  },
  {
    id: 'unlock-pdf',
    name: { pt: 'Desbloquear PDF', en: 'Unlock PDF', es: 'Desbloquear PDF' },
    description: {
      pt: 'Remova a proteção do PDF e gere uma nova cópia desbloqueada.',
      en: 'Remove PDF protection and generate a new unlocked copy.',
      es: 'Quite la protección del PDF y genere una copia desbloqueada.',
    },
    icon: <FileKey2 size={24} />,
    color: 'bg-rose-500',
  },
  {
    id: 'file-xray',
    name: { pt: 'Raio X de Arquivo', en: 'File X-Ray', es: 'Rayos X de Archivo' },
    description: {
      pt: 'Descubra os dados técnicos, metadados e informações adicionais presentes em seus arquivos.',
      en: 'Discover technical data, metadata, and additional information inside your files.',
      es: 'Descubra datos técnicos, metadatos e información adicional de sus archivos.',
    },
    icon: <ScanSearch size={24} />,
    color: 'bg-sky-600',
  },
  {
    id: 'organize-pdf',
    name: { pt: 'Organizar Páginas PDF', en: 'Organize PDF Pages', es: 'Organizar Páginas PDF' },
    description: {
      pt: 'Exclua, reordene e extraia páginas com pré-visualização local.',
      en: 'Delete, reorder, and extract pages with local thumbnails.',
      es: 'Elimine, reordene y extraiga páginas con miniaturas locales.',
    },
    icon: <Layers size={24} />,
    color: 'bg-teal-600',
  },
  {
    id: 'redact-pdf',
    name: { pt: 'Redação PDF', en: 'Redact PDF', es: 'Redacción PDF' },
    description: {
      pt: 'Tape dados sensíveis com preto antes de compartilhar o PDF.',
      en: 'Black out sensitive data before sharing the PDF.',
      es: 'Tape datos sensibles con negro antes de compartir el PDF.',
    },
    icon: <SquareStack size={24} />,
    color: 'bg-slate-700',
  },
  {
    id: 'margin-adjust',
    name: { pt: 'Ajuste de Margem', en: 'Margin Adjust', es: 'Ajuste de Margen' },
    description: {
      pt: 'Fotografe uma folha, marque as quatro pontas e corte o ambiente em volta.',
      en: 'Photograph a sheet, mark the four corners, and crop away the surroundings.',
      es: 'Fotografie una hoja, marque las cuatro puntas y recorte el entorno.',
    },
    icon: <Crop size={24} />,
    color: 'bg-orange-600',
  },
  {
    id: 'sign-pdf',
    name: { pt: 'Assinatura PDF', en: 'Sign PDF', es: 'Firma PDF' },
    description: {
      pt: 'Desenhe a assinatura na tela, junte nome, local e data, e coloque o campo no PDF.',
      en: 'Draw your signature on screen, add name, location, and date, then place the field on a PDF.',
      es: 'Dibuje la firma en pantalla, sume nombre, lugar y fecha, y coloque el campo en el PDF.',
    },
    icon: <PenLine size={24} />,
    color: 'bg-blue-700',
  },
  {
    id: 'page-numbers',
    name: { pt: 'Numerador de páginas', en: 'Page numbers', es: 'Números de página' },
    description: {
      pt: 'Desenhe números no rodapé ou cabeçalho, com opção de pular a capa.',
      en: 'Stamp numbers in the footer or header, with an option to skip the cover.',
      es: 'Dibuje números en el pie o encabezado, con opción de saltar la portada.',
    },
    icon: <Hash size={24} />,
    color: 'bg-rose-600',
  },
  {
    id: 'crop-pdf',
    name: { pt: 'Recortar PDF', en: 'Crop PDF', es: 'Recortar PDF' },
    description: {
      pt: 'Desenhe a área visível e aplique nesta página ou em todas.',
      en: 'Draw the visible area and apply it to this page or all pages.',
      es: 'Dibuje el área visible y aplíquela a esta página o a todas.',
    },
    icon: <Scissors size={24} />,
    color: 'bg-orange-500',
  },
  {
    id: 'compare-pdf',
    name: { pt: 'Comparar PDF', en: 'Compare PDF', es: 'Comparar PDF' },
    description: {
      pt: 'Compare o texto extraível de duas versões, linha a linha.',
      en: 'Compare extractable text from two versions, line by line.',
      es: 'Compare el texto extraíble de dos versiones, línea a línea.',
    },
    icon: <Columns2 size={24} />,
    color: 'bg-slate-600',
  },
  {
    id: 'edit-pdf',
    name: { pt: 'Editar PDF', en: 'Edit PDF', es: 'Editar PDF' },
    description: {
      pt: 'Adicione texto, retângulo ou imagem por cima da página.',
      en: 'Add text, a rectangle, or an image on top of the page.',
      es: 'Añada texto, un rectángulo o una imagen sobre la página.',
    },
    icon: <Pencil size={24} />,
    color: 'bg-blue-600',
  },
  {
    id: 'scan-to-pdf',
    name: { pt: 'Escanear para PDF', en: 'Scan to PDF', es: 'Escanear a PDF' },
    description: {
      pt: 'Use a câmera ou fotos da folha e monte um PDF no aparelho.',
      en: 'Use the camera or photos of the sheet and build a PDF on the device.',
      es: 'Use la cámara o fotos de la hoja y arme un PDF en el aparato.',
    },
    icon: <Camera size={24} />,
    color: 'bg-sky-500',
  },
  {
    id: 'repair-pdf',
    name: { pt: 'Reparar PDF', en: 'Repair PDF', es: 'Reparar PDF' },
    description: {
      pt: 'Reconstrua páginas legíveis num PDF novo. Não é recuperação forense.',
      en: 'Rebuild readable pages into a new PDF. This is not forensic recovery.',
      es: 'Reconstruya páginas legibles en un PDF nuevo. No es recuperación forense.',
    },
    icon: <Wrench size={24} />,
    color: 'bg-amber-600',
  },
  {
    id: 'pdf-to-pdfa',
    name: { pt: 'PDF para arquivo', en: 'PDF archival copy', es: 'PDF a archivo' },
    description: {
      pt: 'Cópia sem cifra e com metadados. Não é PDF/A certificado ISO.',
      en: 'Unencrypted copy with metadata. Not a certified ISO PDF/A.',
      es: 'Copia sin cifrado y con metadatos. No es un PDF/A certificado ISO.',
    },
    icon: <Archive size={24} />,
    color: 'bg-rose-700',
  },
  {
    id: 'pdf-forms',
    name: { pt: 'Formulários PDF', en: 'PDF Forms', es: 'Formularios PDF' },
    description: {
      pt: 'Preencha AcroForm ou adicione campos. Sem detecção visual automática.',
      en: 'Fill an AcroForm or add fields. No automatic visual detection.',
      es: 'Rellene AcroForm o añada campos. Sin detección visual automática.',
    },
    icon: <ListChecks size={24} />,
    color: 'bg-teal-700',
  },
  {
    id: 'pdf-to-word',
    name: { pt: 'PDF para Word', en: 'PDF to Word', es: 'PDF a Word' },
    description: {
      pt: 'Texto extraível para DOCX. Layout original não é reproduzido fielmente.',
      en: 'Extractable text to DOCX. Original layout is not reproduced faithfully.',
      es: 'Texto extraíble a DOCX. El diseño original no se reproduce fielmente.',
    },
    icon: <FileType size={24} />,
    color: 'bg-indigo-500',
  },
  {
    id: 'word-to-pdf',
    name: { pt: 'Word para PDF', en: 'Word to PDF', es: 'Word a PDF' },
    description: {
      pt: 'DOCX para PDF a partir do texto. Salve .doc antigo como .docx.',
      en: 'DOCX to PDF from the text. Save a legacy .doc as .docx first.',
      es: 'DOCX a PDF a partir del texto. Guarde el .doc antiguo como .docx.',
    },
    icon: <FileText size={24} />,
    color: 'bg-indigo-600',
  },
  {
    id: 'pdf-to-excel',
    name: { pt: 'PDF para Excel', en: 'PDF to Excel', es: 'PDF a Excel' },
    description: {
      pt: 'Texto do PDF em XLSX, com colunas heurísticas. Tabelas em imagem pedem OCR.',
      en: 'PDF text into XLSX, with heuristic columns. Image tables need OCR.',
      es: 'Texto del PDF en XLSX, con columnas heurísticas. Las tablas en imagen piden OCR.',
    },
    icon: <FileSpreadsheet size={24} />,
    color: 'bg-emerald-600',
  },
  {
    id: 'excel-to-pdf',
    name: { pt: 'Excel para PDF', en: 'Excel to PDF', es: 'Excel a PDF' },
    description: {
      pt: 'Células de XLSX ou CSV em PDF. Gráficos não entram.',
      en: 'XLSX or CSV cells into a PDF. Charts are not included.',
      es: 'Celdas de XLSX o CSV en PDF. Los gráficos no entran.',
    },
    icon: <FileSpreadsheet size={24} />,
    color: 'bg-emerald-700',
  },
  {
    id: 'pdf-to-pptx',
    name: { pt: 'PDF para PowerPoint', en: 'PDF to PowerPoint', es: 'PDF a PowerPoint' },
    description: {
      pt: 'Cada página vira um slide com a imagem (até 40). Sem objetos editáveis.',
      en: 'Each page becomes a slide with the image (up to 40). No editable shapes.',
      es: 'Cada página se vuelve una diapositiva con la imagen (hasta 40). Sin objetos editables.',
    },
    icon: <Presentation size={24} />,
    color: 'bg-orange-500',
  },
  {
    id: 'pptx-to-pdf',
    name: { pt: 'PowerPoint para PDF', en: 'PowerPoint to PDF', es: 'PowerPoint a PDF' },
    description: {
      pt: 'Texto dos slides em PDF. Animações e layout original não entram.',
      en: 'Slide text into a PDF. Animations and original layout are not included.',
      es: 'Texto de las diapositivas en PDF. Animaciones y diseño original no entran.',
    },
    icon: <Presentation size={24} />,
    color: 'bg-orange-600',
  },
  {
    id: 'html-to-pdf',
    name: { pt: 'HTML para PDF', en: 'HTML to PDF', es: 'HTML a PDF' },
    description: {
      pt: 'Arquivo HTML local para PDF. Não busca URL da internet.',
      en: 'Local HTML file to PDF. It does not fetch an internet URL.',
      es: 'Archivo HTML local a PDF. No descarga una URL de internet.',
    },
    icon: <Globe size={24} />,
    color: 'bg-cyan-600',
  },
];

const SUITE_PATHS: Record<string, string> = {
  'color-picker': '/capturador-de-cores',
  'qr-gen': '/gerador-qr-code',
  'cpf-gen': '/gerador-cpf',
  'code-clean': '/limpador-codigo',
  'document-studio': '/estudio-documentos',
  'report-gen': '/gerador-relatorios',
  'font-identifier': '/identificador-de-fontes',
  'remove-restrictions': '/remover-restricoes',
  'unlock-pdf': '/desbloquear-pdf',
  'file-xray': '/raio-x-de-arquivo',
  'organize-pdf': '/organizar-paginas-pdf',
  'redact-pdf': '/redacao-pdf',
  'margin-adjust': '/ajuste-de-margem',
  'sign-pdf': '/assinatura-pdf',
  'page-numbers': '/numerador-de-paginas',
  'crop-pdf': '/recortar-pdf',
  'compare-pdf': '/comparar-pdf',
  'edit-pdf': '/editar-pdf',
  'scan-to-pdf': '/escanear-para-pdf',
  'repair-pdf': '/reparar-pdf',
  'pdf-to-pdfa': '/pdf-para-pdfa',
  'pdf-forms': '/formularios-pdf',
  'pdf-to-word': '/pdf-para-word',
  'word-to-pdf': '/word-para-pdf',
  'pdf-to-excel': '/pdf-para-excel',
  'excel-to-pdf': '/excel-para-pdf',
  'pdf-to-pptx': '/pdf-para-powerpoint',
  'pptx-to-pdf': '/powerpoint-para-pdf',
  'html-to-pdf': '/html-para-pdf',
};

export const ProductivityTools = ({
  lang,
  linkMode = false,
}: {
  lang: LanguageType;
  linkMode?: boolean;
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

      {groupToolsByFamily(tools.map((tool) => ({ ...tool, suiteId: tool.id }))).map(({ family, tools: familyTools }) => (
        <section key={family} className="mb-8 last:mb-0" aria-labelledby={`suite-family-${family}`}>
          <h3 id={`suite-family-${family}`} className={`catalog-family-heading catalog-family-${family}`}>
            {TOOL_FAMILY_LABELS[lang][family]}
          </h3>
          <div className="tool-catalog-grid">
            {familyTools.map((tool) => {
          const familyClass = toolCardFamilyClass(getSuiteFamily(tool.id));
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
              <p className="text-sm font-black text-slate-900 mb-1 tool-card-title">{tool.name[lang]}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{tool.description[lang]}</p>
            </>
          );

          if (linkMode) {
            return (
              <Link
                key={tool.id}
                to={lp(SUITE_PATHS[tool.id])}
                className={`group relative tool-card p-5 text-left cursor-pointer overflow-hidden block ${familyClass}`}
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
              className={`group relative tool-card p-5 text-left cursor-pointer overflow-hidden ${familyClass}`}
            >
              {card}
            </button>
          );
            })}
          </div>
        </section>
      ))}

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
