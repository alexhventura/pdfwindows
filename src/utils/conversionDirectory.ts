import type { LanguageType } from '../types';

export interface DirectoryItem {
  name: string;
  description: string;
}

export interface DirectorySection {
  title: string;
  items: DirectoryItem[];
}

export interface DirectoryContent {
  intro: string;
  sections: DirectorySection[];
}

export const conversionDirectory: Record<LanguageType, DirectoryContent> = {
  pt: {
    intro:
      'Catálogo completo de conversões processadas localmente no navegador — ideal para rotinas administrativas, financeiras e documentais sem enviar arquivos a servidores.',
    sections: [
      {
        title: 'Imagens e fotos',
        items: [
          {
            name: 'Conversão entre formatos (PNG, JPG, WebP, GIF, BMP, TIFF, ICO)',
            description:
              'Padronize imagens para sistemas internos, portais e e-mail corporativo. Ex.: converter capturas de tela em WebP para reduzir tamanho sem perder legibilidade.',
          },
          {
            name: 'Lote de imagens para PDF',
            description:
              'Reúna comprovantes, fotos de obras ou checklists em um único PDF para arquivo ou envio ao setor financeiro.',
          },
          {
            name: 'Redimensionar e comprimir',
            description:
              'Ajuste dimensões e qualidade para limites de upload em portais públicos (licitações, cadastros, RH).',
          },
          {
            name: 'OCR em imagens',
            description:
              'Extraia texto de notas fiscais fotografadas, etiquetas ou documentos digitalizados via celular.',
          },
        ],
      },
      {
        title: 'PDF e documentos',
        items: [
          {
            name: 'PDF para imagens (páginas PNG)',
            description:
              'Gere imagens por página para revisão visual, apresentações ou anexos em sistemas que não aceitam PDF.',
          },
          {
            name: 'Extrair texto (TXT)',
            description:
              'Obtenha conteúdo textual de relatórios para colar em planilhas, processos ou e-mails.',
          },
          {
            name: 'Mesclar, dividir e rotacionar',
            description:
              'Organize processos administrativos: junte anexos, extraia páginas específicas ou corrija orientação de digitalizações.',
          },
          {
            name: 'Senha, marca d\'água e compressão',
            description:
              'Proteja contratos, identifique cópias e reduza tamanho antes de arquivar ou compartilhar por canais internos.',
          },
          {
            name: 'OCR de PDF escaneado',
            description:
              'Torne PDFs digitalizados pesquisáveis para auditoria e busca de termos em documentos antigos.',
          },
        ],
      },
      {
        title: 'Dados e texto',
        items: [
          {
            name: 'CSV ↔ JSON',
            description:
              'Integre exportações de ERP/planilhas com APIs e scripts locais sem ferramentas online.',
          },
          {
            name: 'XML → JSON',
            description:
              'Normalize XML de sistemas legados para pipelines de dados internos.',
          },
          {
            name: 'TXT → PDF',
            description:
              'Formalize atas, declarações simples ou logs de texto em PDF imprimível.',
          },
        ],
      },
    ],
  },
  en: {
    intro:
      'Full catalog of conversions processed locally in your browser — built for administrative, financial, and document workflows without uploading files to servers.',
    sections: [
      {
        title: 'Images & photos',
        items: [
          {
            name: 'Cross-format conversion (PNG, JPG, WebP, GIF, BMP, TIFF, ICO)',
            description:
              'Standardize assets for internal systems and email. Example: convert screenshots to WebP to reduce size while keeping clarity.',
          },
          {
            name: 'Batch images to PDF',
            description:
              'Bundle receipts, site photos, or checklists into one PDF for finance or compliance archives.',
          },
          {
            name: 'Resize & compress',
            description:
              'Meet upload limits on public portals (procurement, registrations, HR) with controlled dimensions and quality.',
          },
          {
            name: 'Image OCR',
            description:
              'Extract text from photographed invoices, labels, or phone scans for downstream editing.',
          },
        ],
      },
      {
        title: 'PDF & documents',
        items: [
          {
            name: 'PDF to images (PNG pages)',
            description:
              'Produce per-page images for visual review, slides, or systems that reject PDF attachments.',
          },
          {
            name: 'Extract text (TXT)',
            description:
              'Pull readable content from reports for spreadsheets, tickets, or email drafts.',
          },
          {
            name: 'Merge, split & rotate',
            description:
              'Organize admin packets: combine annexes, extract page ranges, fix skewed scans.',
          },
          {
            name: 'Password, watermark & compress',
            description:
              'Protect contracts, mark copies, and shrink files before internal sharing.',
          },
          {
            name: 'Scanned PDF OCR',
            description:
              'Make legacy scans searchable for audits and keyword lookup.',
          },
        ],
      },
      {
        title: 'Data & text',
        items: [
          {
            name: 'CSV ↔ JSON',
            description:
              'Bridge ERP/spreadsheet exports with local APIs and scripts—no cloud upload.',
          },
          {
            name: 'XML → JSON',
            description:
              'Normalize legacy XML feeds into structured JSON for internal tooling.',
          },
          {
            name: 'TXT → PDF',
            description:
              'Turn plain-text minutes, statements, or logs into printable PDFs.',
          },
        ],
      },
    ],
  },
  es: {
    intro:
      'Catálogo completo de conversiones procesadas localmente en el navegador — ideal para tareas administrativas, financieras y documentales sin subir archivos a servidores.',
    sections: [
      {
        title: 'Imágenes y fotos',
        items: [
          {
            name: 'Conversión entre formatos (PNG, JPG, WebP, GIF, BMP, TIFF, ICO)',
            description:
              'Estandarice imágenes para sistemas internos y correo. Ej.: convertir capturas a WebP para reducir peso.',
          },
          {
            name: 'Lote de imágenes a PDF',
            description:
              'Agrupe comprobantes, fotos de obra o listas en un solo PDF para archivo o finanzas.',
          },
          {
            name: 'Redimensionar y comprimir',
            description:
              'Cumpla límites de carga en portales públicos (licitaciones, registros, RR. HH.).',
          },
          {
            name: 'OCR en imágenes',
            description:
              'Extraiga texto de facturas fotografiadas, etiquetas o documentos escaneados con el móvil.',
          },
        ],
      },
      {
        title: 'PDF y documentos',
        items: [
          {
            name: 'PDF a imágenes (páginas PNG)',
            description:
              'Genere imágenes por página para revisión visual o anexos en sistemas que no aceptan PDF.',
          },
          {
            name: 'Extraer texto (TXT)',
            description:
              'Obtenga contenido de informes para hojas de cálculo, procesos o correos.',
          },
          {
            name: 'Combinar, dividir y rotar',
            description:
              'Organice expedientes: una anexos, extraiga páginas o corrija orientación de escaneos.',
          },
          {
            name: 'Contraseña, marca de agua y compresión',
            description:
              'Proteja contratos, identifique copias y reduzca tamaño antes de compartir internamente.',
          },
          {
            name: 'OCR de PDF escaneado',
            description:
              'Haga buscables PDFs antiguos para auditoría y búsqueda de términos.',
          },
        ],
      },
      {
        title: 'Datos y texto',
        items: [
          {
            name: 'CSV ↔ JSON',
            description:
              'Conecte exportaciones de ERP/hojas de cálculo con APIs y scripts locales.',
          },
          {
            name: 'XML → JSON',
            description:
              'Normalice XML de sistemas legados para flujos de datos internos.',
          },
          {
            name: 'TXT → PDF',
            description:
              'Formalice actas, declaraciones simples o registros de texto en PDF imprimible.',
          },
        ],
      },
    ],
  },
};
