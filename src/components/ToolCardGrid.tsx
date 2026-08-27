import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Image as ImageIcon, FileSpreadsheet, LayoutTemplate, Droplet, Type, Unlock, FileKey2, ScanSearch, Layers, SquareStack, Crop } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TOOL_PAGES } from '../seo/toolCatalog';

import { useLocalizedPath } from '../hooks/useLocalizedPath';

export function ToolCardGrid({ limit }: { limit?: number }) {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const pages = limit ? TOOL_PAGES.slice(0, limit) : TOOL_PAGES;

  return (
    <div className="tool-catalog-grid">
      {pages.map((tool) => {
        const copy = tool.copy[lang];
        const Icon =
          tool.suiteId === 'color-picker'
            ? Droplet
            : tool.suiteId === 'font-identifier'
              ? Type
              : tool.suiteId === 'remove-restrictions'
                ? Unlock
                : tool.suiteId === 'unlock-pdf'
                  ? FileKey2
                  : tool.suiteId === 'file-xray'
                    ? ScanSearch
                    : tool.suiteId === 'organize-pdf'
                      ? Layers
                      : tool.suiteId === 'redact-pdf'
                        ? SquareStack
                    : tool.suiteId === 'document-converter'
                      ? FileText
                    : tool.suiteId === 'margin-adjust'
                      ? Crop
                    : tool.kind === 'suite'
                    ? LayoutTemplate
                    : tool.operation?.startsWith('img-')
                      ? ImageIcon
                      : tool.operation?.includes('csv') || tool.operation?.includes('json') || tool.operation?.includes('xml')
                        ? FileSpreadsheet
                        : FileText;

        return (
          <Link key={tool.path} to={lp(tool.path)} className="tool-card group p-5 md:p-6 text-left block">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="card-icon-wrap mb-0">
                <Icon size={20} />
              </div>
              <ArrowUpRight
                size={16}
                className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
              />
            </div>
            <h2 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">{copy.h1}</h2>
            <p className="text-[11px] text-slate-400 leading-snug line-clamp-1 font-medium">{copy.intro}</p>
          </Link>
        );
      })}
    </div>
  );
}
