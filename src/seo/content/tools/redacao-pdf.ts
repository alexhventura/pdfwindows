import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const REDACAO_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Redact PDF Online Free | PDFWINDOWS',
    description:
      'Black out IDs, amounts, and sensitive data in PDFs in your browser. Download a redacted copy locally—no cloud upload.',
    keywords: 'redact pdf, blackout pdf, hide sensitive data pdf, pdf redaction free, cover text pdf',
    h1: 'Redact PDF',
    intro:
      'PDFWINDOWS Redact PDF helps you cover sensitive regions before sharing. Draw black boxes on each page, move between pages, and export a new PDF. Work stays in the browser so personal data is not uploaded to a third-party redaction queue.',
    toolName: 'Redact PDF',
    benefits: [
      'Draw blackout areas with the pointer',
      'Multi-page navigation',
      'Undo last area or clear the current page',
      'New file download — original untouched',
      'Complements Unlock PDF and File X-Ray',
      'No account required',
    ],
    useCases: [
      {
        title: 'Hide national IDs and account numbers',
        body: 'Mask CPF/ID digits or bank details on statements before emailing a counterpart.',
      },
      {
        title: 'Share contracts with third parties',
        body: 'Cover commercial terms or personal annexes while keeping the rest of the packet readable.',
      },
      {
        title: 'Publish supporting exhibits',
        body: 'Redact witness data or addresses on scans destined for a public docket.',
      },
    ],
    howItWorks: [
      'Upload the PDF you are authorized to redact.',
      'Drag rectangles over sensitive regions on each page.',
      'Generate and download the redacted copy.',
    ],
    tips: [
      'Review the output at zoom — opaque covers are visual; confirm nothing sensitive remains readable.',
      'Unlock encrypted PDFs first if pages will not render.',
      'Prefer Organize PDF Pages if you can remove entire sensitive pages instead.',
    ],
    sections: [
      {
        id: 'visual-redaction',
        heading: 'What visual redaction means',
        level: 2,
        paragraphs: [
          'This tool paints opaque rectangles onto a new PDF copy. That is the standard browser-safe approach for quick sharing. For highly sensitive releases, also verify that text selection and attachments cannot expose covered content.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Is text under the black box permanently destroyed?',
        a: 'We apply an opaque cover on the exported copy. Always review the file before sharing critical information.',
      },
    ],
    relatedTools: ['/organizar-paginas-pdf', '/desbloquear-pdf', '/raio-x-de-arquivo', '/pdf-password'],
    cta: defaultCta('en', 'Redact PDF'),
  },
  pt: {
    title: 'Redação PDF Online Grátis | PDFWINDOWS',
    description:
      'Tape CPF, valores e dados sensíveis em PDF no navegador. Gere uma cópia redigida localmente—sem enviar o arquivo para a nuvem.',
    keywords: 'redação pdf, ocultar dados pdf, blackout pdf, tapar cpf pdf, redação documento gratis',
    h1: 'Redação PDF',
    intro:
      'A Redação PDF do PDFWINDOWS cobre trechos sensíveis antes de compartilhar. Desenhe caixas pretas em cada página, navegue entre páginas e exporte um PDF novo. O trabalho fica no navegador.',
    toolName: 'Redação PDF',
    benefits: [
      'Desenhe áreas de blackout com o ponteiro',
      'Navegação multipágina',
      'Desfazer última área ou limpar a página',
      'Download de arquivo novo — original intacto',
      'Complementa Desbloquear PDF e Raio-X',
      'Sem criar conta',
    ],
    useCases: [
      {
        title: 'Ocultar CPF e dados bancários',
        body: 'Tape dígitos de identidade ou conta em extratos antes de enviar a terceiros.',
      },
      {
        title: 'Compartilhar contratos',
        body: 'Cubra cláusulas ou anexos pessoais mantendo o restante legível.',
      },
      {
        title: 'Publicar peças de apoio',
        body: 'Redija endereços ou dados de testemunhas em digitalizações destinadas a autos públicos.',
      },
    ],
    howItWorks: [
      'Envie o PDF que você está autorizado a redigir.',
      'Arraste retângulos sobre as regiões sensíveis.',
      'Gere e baixe a cópia redigida.',
    ],
    tips: [
      'Revise o resultado com zoom — a cobertura é visual; confirme que nada sensível permanece legível.',
      'Desbloqueie PDFs criptografados antes se as páginas não renderizarem.',
      'Prefira Organizar Páginas se puder remover páginas inteiras sensíveis.',
    ],
    sections: [
      {
        id: 'visual-redaction',
        heading: 'O que significa redação visual',
        level: 2,
        paragraphs: [
          'Esta ferramenta pinta retângulos opacos em uma cópia nova do PDF. É a abordagem segura no navegador para compartilhamento rápido. Em liberações muito sensíveis, verifique também seleção de texto e anexos.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'O texto sob o preto é destruído de forma permanente?',
        a: 'Aplicamos cobertura opaca na cópia exportada. Sempre revise o arquivo antes de compartilhar informações críticas.',
      },
    ],
    relatedTools: ['/organizar-paginas-pdf', '/desbloquear-pdf', '/raio-x-de-arquivo', '/pdf-password'],
    cta: defaultCta('pt', 'Redação PDF'),
  },
  es: {
    title: 'Redacción PDF Online Gratis | PDFWINDOWS',
    description:
      'Tape datos sensibles en PDF en el navegador. Descargue una copia redactada localmente—sin subir el archivo a la nube.',
    keywords: 'redacción pdf, ocultar datos pdf, blackout pdf, tapar texto pdf, redacción documento gratis',
    h1: 'Redacción PDF',
    intro:
      'La Redacción PDF de PDFWINDOWS cubre zonas sensibles antes de compartir. Dibuje cajas negras en cada página, navegue entre páginas y exporte un PDF nuevo. El trabajo permanece en el navegador.',
    toolName: 'Redacción PDF',
    benefits: [
      'Dibuje áreas de blackout con el puntero',
      'Navegación multipágina',
      'Deshacer última área o limpiar la página',
      'Descarga de archivo nuevo — original intacto',
      'Complementa Desbloquear PDF y Rayos X',
      'Sin crear cuenta',
    ],
    useCases: [
      {
        title: 'Ocultar identificaciones y datos bancarios',
        body: 'Cubra dígitos de identidad o cuenta en extractos antes de enviar a terceros.',
      },
      {
        title: 'Compartir contratos',
        body: 'Cubra cláusulas o anexos personales manteniendo el resto legible.',
      },
      {
        title: 'Publicar piezas de apoyo',
        body: 'Redacte direcciones o datos de testigos en escaneos destinados a autos públicos.',
      },
    ],
    howItWorks: [
      'Suba el PDF que está autorizado a redactar.',
      'Arrastre rectángulos sobre las regiones sensibles.',
      'Genere y descargue la copia redactada.',
    ],
    tips: [
      'Revise el resultado con zoom — la cobertura es visual; confirme que nada sensible permanece legible.',
      'Desbloquee PDFs cifrados primero si las páginas no renderizan.',
      'Prefiera Organizar Páginas si puede eliminar páginas enteras sensibles.',
    ],
    sections: [
      {
        id: 'visual-redaction',
        heading: 'Qué significa redacción visual',
        level: 2,
        paragraphs: [
          'Esta herramienta pinta rectángulos opacos en una copia nueva del PDF. Es el enfoque seguro en el navegador para compartir rápido. En liberaciones muy sensibles, verifique también selección de texto y anexos.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿El texto bajo el negro se destruye de forma permanente?',
        a: 'Aplicamos cobertura opaca en la copia exportada. Siempre revise el archivo antes de compartir información crítica.',
      },
    ],
    relatedTools: ['/organizar-paginas-pdf', '/desbloquear-pdf', '/raio-x-de-archivo', '/pdf-password'],
    cta: defaultCta('es', 'Redacción PDF'),
  },
};
