import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const ORGANIZAR_PAGINAS_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Organize PDF Pages Online Free | PDFWINDOWS',
    description:
      'Delete, reorder, and extract PDF pages in your browser. Download an organized copy locally—no cloud upload.',
    keywords: 'organize pdf pages, delete pdf pages, reorder pdf, extract pdf pages, organize pdf free',
    h1: 'Organize PDF Pages',
    intro:
      'PDFWINDOWS Organize PDF Pages helps you clean and rearrange documents without installing desktop software. Upload a PDF, preview page thumbnails, remove pages you do not need, reorder what remains, and download a new file. Processing stays in the browser so drafts and internal packets never leave your device during cleanup.',
    toolName: 'Organize PDF Pages',
    benefits: [
      'Visual thumbnail grid for each page',
      'Delete and reorder in one workflow',
      'New download — original stays intact',
      'Works fully offline after the page loads',
      'Pairs with Unlock PDF and Redact PDF',
      'No account required',
    ],
    useCases: [
      {
        title: 'Remove blank or duplicate pages',
        body: 'Scans and exports often include extras. Delete them before sharing with clients or uploading to portals.',
      },
      {
        title: 'Reorder packet sections',
        body: 'Move cover sheets, annexes, and signatures into the sequence your process expects without reprinting.',
      },
      {
        title: 'Extract a working subset',
        body: 'Keep only the pages needed for a review cycle and archive the full original separately.',
      },
    ],
    howItWorks: [
      'Upload the PDF you are authorized to edit.',
      'Select pages to delete or move up/down.',
      'Generate and download the organized copy.',
    ],
    tips: [
      'Unlock password-protected files first if the PDF will not open.',
      'Keep at least one page in the output.',
      'Very large page counts may be limited for browser memory.',
    ],
    sections: [
      {
        id: 'organize-vs-split',
        heading: 'Organize versus Split PDF',
        level: 2,
        paragraphs: [
          'Split PDF focuses on cutting by ranges into separate files. Organize PDF Pages is for rearranging and pruning inside one output document with visual feedback.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I duplicate a page?',
        a: 'This version keeps each source page at most once in the final order after deletions and moves. Use merge workflows if you need duplicates from multiple files.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/redacao-pdf', '/desbloquear-pdf'],
    cta: defaultCta('en', 'Organize PDF Pages'),
  },
  pt: {
    title: 'Organizar Páginas PDF Online Grátis | PDFWINDOWS',
    description:
      'Exclua, reordene e extraia páginas de PDF no navegador. Gere uma cópia organizada localmente—sem upload na nuvem.',
    keywords: 'organizar páginas pdf, excluir páginas pdf, reordenar pdf, extrair páginas pdf, organizar pdf gratis',
    h1: 'Organizar Páginas PDF',
    intro:
      'O Organizar Páginas PDF do PDFWINDOWS limpa e rearrange documentos sem instalar software. Envie um PDF, veja miniaturas, remova páginas, reordene o restante e baixe um arquivo novo. O processamento fica no navegador.',
    toolName: 'Organizar Páginas PDF',
    benefits: [
      'Grade visual de miniaturas',
      'Excluir e reordenar no mesmo fluxo',
      'Download novo — original intacto',
      'Funciona localmente após carregar a página',
      'Combina com Desbloquear e Redação PDF',
      'Sem criar conta',
    ],
    useCases: [
      {
        title: 'Tirar páginas em branco ou duplicadas',
        body: 'Digitalizações e exportações costumam trazer sobras. Remova antes de enviar a clientes ou portais.',
      },
      {
        title: 'Reordenar seções do pacote',
        body: 'Ajuste capa, anexos e assinaturas na sequência exigida sem reimprimir.',
      },
      {
        title: 'Extrair um subconjunto de trabalho',
        body: 'Mantenha só as páginas da revisão e archive o original completo à parte.',
      },
    ],
    howItWorks: [
      'Envie o PDF que você está autorizado a editar.',
      'Selecione páginas para excluir ou mover.',
      'Gere e baixe a cópia organizada.',
    ],
    tips: [
      'Desbloqueie PDFs com senha antes, se não abrirem.',
      'Mantenha pelo menos uma página no resultado.',
      'Documentos muito longos podem ter limite por memória do navegador.',
    ],
    sections: [
      {
        id: 'organize-vs-split',
        heading: 'Organizar versus Separar PDF',
        level: 2,
        paragraphs: [
          'Separar PDF corta por intervalos em arquivos distintos. Organizar Páginas é para rearranjar e podar dentro de um único documento com feedback visual.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso duplicar uma página?',
        a: 'Esta versão mantém cada página de origem no máximo uma vez na ordem final após exclusões e movimentações.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/redacao-pdf', '/desbloquear-pdf'],
    cta: defaultCta('pt', 'Organizar Páginas PDF'),
  },
  es: {
    title: 'Organizar Páginas PDF Online Gratis | PDFWINDOWS',
    description:
      'Elimine, reordene y extraiga páginas PDF en el navegador. Descargue una copia organizada localmente—sin subida a la nube.',
    keywords: 'organizar páginas pdf, eliminar páginas pdf, reordenar pdf, extraer páginas pdf, organizar pdf gratis',
    h1: 'Organizar Páginas PDF',
    intro:
      'Organizar Páginas PDF de PDFWINDOWS limpia y reordena documentos sin instalar software. Suba un PDF, vea miniaturas, elimine páginas, reordene el resto y descargue un archivo nuevo. El procesamiento permanece en el navegador.',
    toolName: 'Organizar Páginas PDF',
    benefits: [
      'Cuadrícula visual de miniaturas',
      'Eliminar y reordenar en un solo flujo',
      'Descarga nueva — original intacto',
      'Funciona en local tras cargar la página',
      'Combina con Desbloquear y Redacción PDF',
      'Sin crear cuenta',
    ],
    useCases: [
      {
        title: 'Quitar páginas en blanco o duplicadas',
        body: 'Escaneos y exportaciones suelen traer extras. Elimínelas antes de compartir.',
      },
      {
        title: 'Reordenar secciones del paquete',
        body: 'Ajuste portada, anexos y firmas en el orden requerido sin reimprimir.',
      },
      {
        title: 'Extraer un subconjunto de trabajo',
        body: 'Conserve solo las páginas de revisión y archive el original completo aparte.',
      },
    ],
    howItWorks: [
      'Suba el PDF que está autorizado a editar.',
      'Seleccione páginas para eliminar o mover.',
      'Genere y descargue la copia organizada.',
    ],
    tips: [
      'Desbloquee PDFs con contraseña primero si no abren.',
      'Mantenga al menos una página en el resultado.',
      'Documentos muy largos pueden tener límite por memoria del navegador.',
    ],
    sections: [
      {
        id: 'organize-vs-split',
        heading: 'Organizar versus Separar PDF',
        level: 2,
        paragraphs: [
          'Separar PDF corta por rangos en archivos distintos. Organizar Páginas sirve para reordenar y podar dentro de un solo documento con feedback visual.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo duplicar una página?',
        a: 'Esta versión mantiene cada página de origen como máximo una vez en el orden final tras eliminaciones y movimientos.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/redacao-pdf', '/desbloquear-pdf'],
    cta: defaultCta('es', 'Organizar Páginas PDF'),
  },
};
