import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  LayoutTemplate,
  Droplet,
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
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TOOL_PAGES, type ToolPageDefinition } from '../seo/toolCatalog';
import { getToolFamily, groupToolsByFamily, TOOL_FAMILY_LABELS, toolCardFamilyClass } from '../seo/toolFamily';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const SUITE_ICONS: Record<string, LucideIcon> = {
  'color-picker': Droplet,
  'font-identifier': Type,
  'remove-restrictions': Unlock,
  'unlock-pdf': FileKey2,
  'file-xray': ScanSearch,
  'organize-pdf': Layers,
  'redact-pdf': SquareStack,
  'document-converter': FileText,
  'margin-adjust': Crop,
  'sign-pdf': PenLine,
  'page-numbers': Hash,
  'crop-pdf': Scissors,
  'compare-pdf': Columns2,
  'edit-pdf': Pencil,
  'scan-to-pdf': Camera,
  'repair-pdf': Wrench,
  'pdf-to-pdfa': Archive,
  'pdf-forms': ListChecks,
  'pdf-to-pptx': Presentation,
  'pptx-to-pdf': Presentation,
  'pdf-to-excel': FileSpreadsheet,
  'excel-to-pdf': FileSpreadsheet,
  'pdf-to-word': FileType,
  'word-to-pdf': FileType,
  'html-to-pdf': Globe,
};

function toolIcon(tool: ToolPageDefinition) {
  if (tool.suiteId && SUITE_ICONS[tool.suiteId]) return SUITE_ICONS[tool.suiteId];
  if (tool.kind === 'suite') return LayoutTemplate;
  if (tool.operation?.startsWith('img-')) return ImageIcon;
  if (tool.operation?.includes('csv') || tool.operation?.includes('json') || tool.operation?.includes('xml')) {
    return FileSpreadsheet;
  }
  return FileText;
}

export function ToolCardGrid({ limit }: { limit?: number }) {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const grouped = groupToolsByFamily(TOOL_PAGES);
  const pages = limit
    ? grouped.flatMap((group) => group.tools).slice(0, limit)
    : null;
  const sections = pages
    ? groupToolsByFamily(pages)
    : grouped;

  return (
    <div className="space-y-10">
      {sections.map(({ family, tools }) => (
        <section key={family} aria-labelledby={`catalog-family-${family}`}>
          <h2 id={`catalog-family-${family}`} className={`catalog-family-heading catalog-family-${family}`}>
            {TOOL_FAMILY_LABELS[lang][family]}
          </h2>
          <div className="tool-catalog-grid">
            {tools.map((tool) => {
              const copy = tool.copy[lang];
              const Icon = toolIcon(tool);
              const familyClass = toolCardFamilyClass(getToolFamily(tool));

              return (
                <Link
                  key={tool.path}
                  to={lp(tool.path)}
                  className={`tool-card group p-5 md:p-6 text-left block ${familyClass}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="card-icon-wrap mb-0">
                      <Icon size={20} />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">{copy.h1}</h3>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-1 font-medium">{copy.intro}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
