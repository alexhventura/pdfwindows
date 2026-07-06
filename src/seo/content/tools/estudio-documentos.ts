import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const ESTUDIO_DOCUMENTOS_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Document Studio Online Offline | PDFWINDOWS',
    description:
      'Create professional documents with structured templates, live preview, and PDF export. No upload, no account.',
    keywords:
      'document studio, pdf template editor, contract generator offline, local document creator, professional pdf templates',
    h1: 'Document Studio — Professional Templates, Local PDF',
    intro:
      'PDFWINDOWS Document Studio is a structured document editor built for professionals who need polished contracts, proposals, invoices, and letters without sending sensitive data to the cloud. Choose from curated templates, fill guided fields with live preview, optionally save drafts on your device, and export a print-ready PDF entirely in your browser. Every keystroke stays local — ideal for legal drafts, client proposals, and internal paperwork.',
    toolName: 'Document Studio',
    benefits: [
      'Professional templates for contracts, proposals, and letters',
      'Live preview updates as you type',
      'Smart Fill suggests values from recent local entries',
      'Optional on-device draft storage — never mandatory',
      'PDF export runs in the browser',
      'No account or paywall required',
    ],
    useCases: [
      {
        title: 'Freelance service agreements',
        body: 'Draft a simple contract with parties, scope, payment terms, and signature blocks. Export a PDF to send to clients without exposing draft content to third-party SaaS platforms.',
      },
      {
        title: 'Business proposals and quotes',
        body: 'Structure a professional proposal with itemized sections, deadlines, and terms. The live preview helps you catch formatting issues before exporting the final document.',
      },
      {
        title: 'Internal HR and policy letters',
        body: 'HR teams can generate standardized letters and acknowledgments locally. Because nothing is uploaded, employee data remains on the corporate device.',
      },
      {
        title: 'Invoices and formal correspondence',
        body: 'Use invoice-style templates with line items, quantities, and totals. Pair with PDFWINDOWS merge or password tools afterward for distribution workflows.',
      },
      {
        title: 'Offline field work',
        body: 'Consultants working without reliable internet can still compose and export documents. Once the page is loaded, the studio works without a network connection.',
      },
    ],
    howItWorks: [
      'Open Document Studio and select a template that matches your document type.',
      'Complete the guided fields — watch the live preview update in real time.',
      'Optionally enable local draft saving or use Smart Fill for repeated fields.',
      'Click Export PDF to generate a print-ready file on your device.',
    ],
    tips: [
      'Enable local drafts when working on multi-session contracts so you can resume without retyping.',
      'Use Smart Fill after your first document — it remembers names, addresses, and company details locally.',
      'Review the live preview before export; section headings and spacing reflect the final PDF.',
      'Combine exported PDFs with Merge PDF when bundling contracts with attachments.',
      'Password-protect sensitive agreements using PDFWINDOWS encrypt tool after export.',
      'Keep template field labels in mind — required fields are validated before PDF generation.',
    ],
    sections: [
      {
        id: 'what-is-document-studio',
        heading: 'What is PDFWINDOWS Document Studio?',
        level: 2,
        paragraphs: [
          'Document Studio is the productivity layer of PDFWINDOWS focused on creation rather than conversion. Instead of uploading a Word file and hoping a cloud service preserves layout, you work inside a structured editor where each template defines the sections, fields, and legal phrasing appropriate for that document type.',
          'The studio is designed for speed and privacy. You are not learning a full word processor — you are filling a professional skeleton that already handles margins, headings, and body structure. That constraint is intentional: it reduces errors and produces consistent PDFs every time.',
        ],
      },
      {
        id: 'templates-and-editor',
        heading: 'Templates and structured editing',
        level: 2,
        paragraphs: [
          'Each template ships with predefined sections such as parties, scope, payment, signatures, or item tables depending on the document category. Fields can include text inputs, dates, and repeating line items for invoices or service lists.',
        ],
        bullets: [
          'Simple contract — parties, scope, term, and signature area',
          'Proposal — executive summary, deliverables, timeline, and pricing blocks',
          'Formal letter — header, recipient, body paragraphs, and closing',
          'Invoice-style layouts with add/remove line items',
        ],
      },
      {
        id: 'privacy-local-export',
        heading: 'Privacy-first PDF export',
        level: 2,
        paragraphs: [
          'Export uses client-side PDF generation. Your document content never transits to PDFWINDOWS servers because there are no document servers in the pipeline. This architecture matters for law firms, healthcare administrators, and anyone handling personally identifiable information.',
          'Optional draft persistence stores data in your browser local storage only when you explicitly opt in. You can clear local data at any time from within the studio interface.',
        ],
      },
      {
        id: 'who-benefits',
        heading: 'Who benefits most from Document Studio?',
        level: 2,
        paragraphs: [
          'Small business owners, freelancers, and operations teams who need repeatable documents without a full document management system will find the studio especially useful. Developers testing form flows can also use it to generate sample PDFs locally.',
          'If you already use PDFWINDOWS for merging or protecting PDFs, Document Studio completes the loop: create, refine, merge, compress, and encrypt — all without leaving your device.',
          'Teams migrating from template-heavy Word workflows report faster turnaround on routine paperwork because field validation catches missing party names and dates before export, reducing back-and-forth email cycles with clients.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Which document templates are available?',
        a: 'The studio includes templates for contracts, proposals, formal letters, and invoice-style documents. Each template exposes fields relevant to that format.',
      },
      {
        q: 'Can I edit the PDF after export?',
        a: 'The export produces a standard PDF. You can open it in any PDF reader or use PDFWINDOWS tools to merge, split, compress, or password-protect it.',
      },
      {
        q: 'Does Smart Fill send my data anywhere?',
        a: 'No. Smart Fill reads values you previously entered and stored locally in your browser session or optional draft storage. Nothing is synced to the cloud.',
      },
      {
        q: 'Is Document Studio free to use?',
        a: 'Yes. PDFWINDOWS provides Document Studio without mandatory registration. Processing happens locally in your browser.',
      },
      {
        q: 'Can I use it offline?',
        a: 'After the page loads, you can compose and export documents without an internet connection. Initial load requires network access to fetch the application.',
      },
    ],
    relatedTools: ['/gerador-relatorios', '/txt-to-pdf', '/pdf-merge', '/pdf-password'],
    cta: defaultCta('en', 'Document Studio'),
  },
  pt: {
    title: 'Estúdio de Documentos Online Offline | PDFWINDOWS',
    description:
      'Crie documentos profissionais com modelos estruturados, pré-visualização ao vivo e exportação PDF. Sem upload e sem cadastro.',
    keywords:
      'estudio documentos, editor modelo pdf, gerador contrato offline, criador documento local, templates profissionais pdf',
    h1: 'Estúdio de Documentos — Modelos Profissionais, PDF Local',
    intro:
      'O Estúdio de Documentos do PDFWINDOWS é um editor estruturado para profissionais que precisam de contratos, propostas, faturas e cartas com acabamento profissional sem enviar dados sensíveis para a nuvem. Escolha modelos curados, preencha campos guiados com pré-visualização ao vivo, salve rascunhos opcionalmente no dispositivo e exporte um PDF pronto para impressão inteiramente no navegador. Cada caractere permanece local — ideal para minutas jurídicas, propostas comerciais e documentos internos.',
    toolName: 'Estúdio de Documentos',
    benefits: [
      'Modelos profissionais para contratos, propostas e cartas',
      'Pré-visualização ao vivo conforme você digita',
      'Smart Fill sugere valores de entradas locais recentes',
      'Rascunhos opcionais no dispositivo — nunca obrigatórios',
      'Exportação PDF no navegador',
      'Sem conta nem paywall',
    ],
    useCases: [
      {
        title: 'Contratos de prestação de serviços',
        body: 'Monte um contrato simples com partes, escopo, pagamento e assinaturas. Exporte PDF para enviar ao cliente sem expor rascunhos em plataformas SaaS de terceiros.',
      },
      {
        title: 'Propostas comerciais e orçamentos',
        body: 'Estruture propostas com seções, prazos e condições. A pré-visualização ajuda a corrigir formatação antes da exportação final.',
      },
      {
        title: 'Cartas internas de RH e políticas',
        body: 'Equipes de RH geram cartas padronizadas localmente. Como nada é enviado, dados de colaboradores permanecem no dispositivo corporativo.',
      },
      {
        title: 'Faturas e correspondência formal',
        body: 'Use modelos com itens, quantidades e totais. Combine depois com mesclar ou proteger PDF do PDFWINDOWS para distribuição.',
      },
      {
        title: 'Trabalho em campo sem internet',
        body: 'Consultores sem conexão estável ainda podem compor e exportar documentos. Após carregar a página, o estúdio funciona offline.',
      },
    ],
    howItWorks: [
      'Abra o Estúdio de Documentos e escolha o modelo adequado.',
      'Preencha os campos guiados — a pré-visualização atualiza em tempo real.',
      'Ative rascunhos locais opcionalmente ou use Smart Fill para campos repetidos.',
      'Clique em Exportar PDF para gerar o arquivo no seu dispositivo.',
    ],
    tips: [
      'Ative rascunhos locais em contratos longos para retomar sem redigitar.',
      'Use Smart Fill após o primeiro documento — ele lembra nomes e endereços localmente.',
      'Revise a pré-visualização antes de exportar; espaçamento reflete o PDF final.',
      'Combine PDFs exportados com Mesclar PDF ao anexar documentos.',
      'Proteja acordos sensíveis com a ferramenta de senha após exportar.',
      'Campos obrigatórios são validados antes da geração do PDF.',
    ],
    sections: [
      {
        id: 'o-que-e-estudio',
        heading: 'O que é o Estúdio de Documentos PDFWINDOWS?',
        level: 2,
        paragraphs: [
          'O Estúdio de Documentos é a camada de criação do PDFWINDOWS, focada em produzir documentos em vez de apenas convertê-los. Em vez de enviar um arquivo Word e esperar que um serviço na nuvem preserve o layout, você trabalha em um editor estruturado onde cada modelo define seções, campos e redação adequados.',
          'O estúdio prioriza velocidade e privacidade. Você não aprende um processador de texto completo — preenche um esqueleto profissional que já trata margens, títulos e corpo do texto. Essa restrição reduz erros e produz PDFs consistentes.',
          'Equipes que antes dependiam de modelos Word compartilhados por e-mail passam a usar campos guiados com validação antes da exportação. Isso elimina versões divergentes do mesmo contrato e reduz retrabalho jurídico na revisão de formatação.',
        ],
      },
      {
        id: 'modelos-editor',
        heading: 'Modelos e edição estruturada',
        level: 2,
        paragraphs: [
          'Cada modelo inclui seções como partes, escopo, pagamento, assinaturas ou tabelas de itens conforme a categoria do documento.',
        ],
        bullets: [
          'Contrato simples — partes, escopo, prazo e área de assinatura',
          'Proposta — resumo, entregas, cronograma e preços',
          'Carta formal — cabeçalho, destinatário, corpo e encerramento',
          'Layouts de fatura com itens adicionáveis',
        ],
      },
      {
        id: 'privacidade-exportacao',
        heading: 'Exportação PDF com privacidade',
        level: 2,
        paragraphs: [
          'A exportação usa geração de PDF no cliente. O conteúdo nunca transita por servidores do PDFWINDOWS porque não há servidores de documentos no fluxo. Isso importa para escritórios de advocacia, saúde e quem trata dados pessoais.',
          'A persistência opcional de rascunhos usa armazenamento local do navegador somente quando você opta explicitamente. Você pode limpar dados locais a qualquer momento.',
        ],
      },
      {
        id: 'quem-beneficia',
        heading: 'Quem mais se beneficia do Estúdio?',
        level: 2,
        paragraphs: [
          'Pequenos empresários, freelancers e equipes operacionais que precisam de documentos repetíveis sem um sistema completo de gestão documental encontram grande valor aqui.',
          'Se você já usa PDFWINDOWS para mesclar ou proteger PDFs, o Estúdio completa o ciclo: criar, refinar, mesclar, comprimir e criptografar — tudo no dispositivo.',
          'Equipes que migram de fluxos pesados em Word relatam entregas mais rápidas em papelada rotineira porque a validação de campos detecta nomes e datas ausentes antes da exportação, reduzindo ciclos de e-mail com clientes.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Quais modelos de documento estão disponíveis?',
        a: 'O estúdio inclui modelos para contratos, propostas, cartas formais e documentos estilo fatura. Cada modelo expõe campos relevantes ao formato.',
      },
      {
        q: 'Posso editar o PDF após exportar?',
        a: 'A exportação produz um PDF padrão. Você pode abri-lo em qualquer leitor ou usar ferramentas PDFWINDOWS para mesclar, dividir, comprimir ou proteger.',
      },
      {
        q: 'O Smart Fill envia meus dados para algum lugar?',
        a: 'Não. O Smart Fill lê valores que você digitou e armazenou localmente na sessão ou em rascunhos opcionais. Nada é sincronizado na nuvem.',
      },
      {
        q: 'O Estúdio de Documentos é gratuito?',
        a: 'Sim. O PDFWINDOWS oferece o estúdio sem cadastro obrigatório. O processamento ocorre localmente no navegador.',
      },
      {
        q: 'Posso usar offline?',
        a: 'Após carregar a página, você pode compor e exportar sem internet. O carregamento inicial requer rede para buscar o aplicativo.',
      },
    ],
    relatedTools: ['/gerador-relatorios', '/txt-to-pdf', '/pdf-merge', '/pdf-password'],
    cta: defaultCta('pt', 'Estúdio de Documentos'),
  },
  es: {
    title: 'Estudio de Documentos Online Offline | PDFWINDOWS',
    description:
      'Cree documentos profesionales con plantillas estructuradas, vista previa en vivo y exportación PDF. Sin subida ni registro.',
    keywords:
      'estudio documentos, editor plantillas pdf, generador contrato offline, creador documento local, plantillas profesionales pdf',
    h1: 'Estudio de Documentos — Plantillas Profesionales, PDF Local',
    intro:
      'El Estudio de Documentos de PDFWINDOWS es un editor estructurado para profesionales que necesitan contratos, propuestas, facturas y cartas pulidas sin enviar datos sensibles a la nube. Elija plantillas curadas, complete campos guiados con vista previa en vivo, guarde borradores opcionalmente en su dispositivo y exporte un PDF listo para imprimir enteramente en el navegador. Cada pulsación permanece local — ideal para borradores legales, propuestas comerciales y documentación interna.',
    toolName: 'Estudio de Documentos',
    benefits: [
      'Plantillas profesionales para contratos, propuestas y cartas',
      'Vista previa en vivo mientras escribe',
      'Smart Fill sugiere valores de entradas locales recientes',
      'Borradores opcionales en el dispositivo — nunca obligatorios',
      'Exportación PDF en el navegador',
      'Sin cuenta ni paywall',
      'Sin cuenta, sin subida y sin muro de pago',
    ],
    useCases: [
      {
        title: 'Contratos de servicios freelance',
        body: 'Redacte un contrato simple con partes, alcance, pago y firmas. Exporte PDF para enviar al cliente sin exponer borradores en plataformas SaaS de terceros.',
      },
      {
        title: 'Propuestas comerciales y presupuestos',
        body: 'Estructure propuestas con secciones, plazos y condiciones. La vista previa ayuda a corregir formato antes de la exportación final.',
      },
      {
        title: 'Cartas internas de RRHH y políticas',
        body: 'Equipos de RRHH generan cartas estandarizadas localmente. Como nada se sube, los datos de empleados permanecen en el dispositivo corporativo.',
      },
      {
        title: 'Facturas y correspondencia formal',
        body: 'Use plantillas con ítems, cantidades y totales. Combine después con unir o proteger PDF de PDFWINDOWS para distribución.',
      },
      {
        title: 'Trabajo de campo sin internet',
        body: 'Consultores sin conexión estable aún pueden componer y exportar documentos. Tras cargar la página, el estudio funciona sin red.',
      },
    ],
    howItWorks: [
      'Abra el Estudio de Documentos y elija la plantilla adecuada.',
      'Complete los campos guiados — la vista previa se actualiza en tiempo real.',
      'Active borradores locales opcionalmente o use Smart Fill para campos repetidos.',
      'Haga clic en Exportar PDF para generar el archivo en su dispositivo.',
    ],
    tips: [
      'Active borradores locales en contratos largos para retomar sin reescribir.',
      'Use Smart Fill tras el primer documento — recuerda nombres y direcciones localmente.',
      'Revise la vista previa antes de exportar; el espaciado refleja el PDF final.',
      'Combine PDFs exportados con Unir PDF al adjuntar documentos.',
      'Proteja acuerdos sensibles con la herramienta de contraseña tras exportar.',
      'Los campos obligatorios se validan antes de generar el PDF.',
    ],
    sections: [
      {
        id: 'que-es-estudio',
        heading: '¿Qué es el Estudio de Documentos PDFWINDOWS?',
        level: 2,
        paragraphs: [
          'El Estudio de Documentos es la capa de creación de PDFWINDOWS, enfocada en producir documentos en lugar de solo convertirlos. En lugar de subir un archivo Word y esperar que un servicio en la nube preserve el diseño, trabaja en un editor estructurado donde cada plantilla define secciones, campos y redacción adecuados.',
          'El estudio prioriza velocidad y privacidad. No aprende un procesador de texto completo — rellena un esqueleto profesional que ya maneja márgenes, títulos y cuerpo. Esa restricción reduce errores y produce PDFs consistentes.',
          'Equipos que antes dependían de plantillas Word compartidas por correo pasan a usar campos guiados con validación antes de exportar. Esto elimina versiones divergentes del mismo contrato y reduce retrabajo legal en la revisión de formato.',
        ],
      },
      {
        id: 'plantillas-editor',
        heading: 'Plantillas y edición estructurada',
        level: 2,
        paragraphs: [
          'Cada plantilla incluye secciones como partes, alcance, pago, firmas o tablas de ítems según la categoría del documento.',
        ],
        bullets: [
          'Contrato simple — partes, alcance, plazo y área de firma',
          'Propuesta — resumen, entregas, cronograma y precios',
          'Carta formal — encabezado, destinatario, cuerpo y cierre',
          'Diseños de factura con ítems añadibles',
        ],
      },
      {
        id: 'privacidad-exportacion',
        heading: 'Exportación PDF con privacidad',
        level: 2,
        paragraphs: [
          'La exportación usa generación de PDF en el cliente. El contenido nunca transita por servidores de PDFWINDOWS porque no hay servidores de documentos en el flujo. Esto importa para bufetes, salud y quien trata datos personales.',
          'La persistencia opcional de borradores usa almacenamiento local del navegador solo cuando usted opta explícitamente. Puede borrar datos locales en cualquier momento.',
        ],
      },
      {
        id: 'quien-beneficia',
        heading: '¿Quién más se beneficia del Estudio?',
        level: 2,
        paragraphs: [
          'Pequeños empresarios, freelancers y equipos operativos que necesitan documentos repetibles sin un sistema completo de gestión documental encuentran gran valor aquí.',
          'Si ya usa PDFWINDOWS para unir o proteger PDFs, el Estudio completa el ciclo: crear, refinar, unir, comprimir y cifrar — todo en el dispositivo.',
          'Equipos que migran de flujos pesados en Word reportan entregas más rápidas en papeleo rutinario porque la validación de campos detecta nombres y fechas ausentes antes de exportar, reduciendo ciclos de correo con clientes.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Qué plantillas de documento están disponibles?',
        a: 'El estudio incluye plantillas para contratos, propuestas, cartas formales y documentos estilo factura. Cada plantilla expone campos relevantes al formato.',
      },
      {
        q: '¿Puedo editar el PDF tras exportar?',
        a: 'La exportación produce un PDF estándar. Puede abrirlo en cualquier lector o usar herramientas PDFWINDOWS para unir, dividir, comprimir o proteger.',
      },
      {
        q: '¿Smart Fill envía mis datos a algún sitio?',
        a: 'No. Smart Fill lee valores que usted ingresó y almacenó localmente en la sesión o en borradores opcionales. Nada se sincroniza en la nube.',
      },
      {
        q: '¿El Estudio de Documentos es gratuito?',
        a: 'Sí. PDFWINDOWS ofrece el estudio sin registro obligatorio. El procesamiento ocurre localmente en el navegador.',
      },
      {
        q: '¿Puedo usarlo sin conexión?',
        a: 'Tras cargar la página, puede componer y exportar sin internet. La carga inicial requiere red para obtener la aplicación.',
      },
    ],
    relatedTools: ['/gerador-relatorios', '/txt-to-pdf', '/pdf-merge', '/pdf-password'],
    cta: defaultCta('es', 'Estudio de Documentos'),
  },
};
