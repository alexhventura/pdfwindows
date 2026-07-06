import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_RELATORIOS_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Report & Receipt Generator Online Offline | PDFWINDOWS',
    description:
      'Build professional reports and receipts with sections, line items, and automatic totals. Export PDF locally — no upload required.',
    keywords:
      'report generator pdf, receipt generator offline, local invoice pdf, business report maker, receipt pdf free',
    h1: 'Report Generator — Reports & Receipts',
    intro:
      'PDFWINDOWS Report Generator combines structured report writing and receipt creation in one local workspace. Add sections with headings and body text for status reports, meeting summaries, or project updates — or switch to receipt mode with line items, quantities, unit prices, and automatic subtotals. Everything renders to a clean PDF on your device without cloud processing. Perfect for freelancers issuing receipts, field teams documenting site visits, and managers distributing weekly updates to stakeholders who expect a polished document attachment. Unlike generic word processors, the layout is tuned for quick PDF export rather than long-form editing.',
    toolName: 'Report Generator',
    benefits: [
      'Two modes: multi-section reports and itemized receipts',
      'Automatic total calculation for receipt line items',
      'Professional PDF layout generated locally',
      'No account or server upload required',
      'Ideal companion to Document Studio templates',
      'Fast export for email attachments and archiving',
    ],
    useCases: [
      {
        title: 'Freelancer payment receipts',
        body: 'Issue itemized receipts after project milestones with description, quantity, rate, and computed total. Export PDF and send to clients the same day. Because totals calculate automatically, you avoid spreadsheet errors that delay payment reconciliation at month end.',
      },
      {
        title: 'Weekly team status reports',
        body: 'Structure updates with titled sections for accomplishments, blockers, and next steps. Managers attach the PDF to leadership distribution lists. Section headings create scannable documents that executives read on mobile without opening a full project management suite.',
      },
      {
        title: 'Field inspection summaries',
        body: 'Technicians document on-site observations in sectioned reports offline, then export when connectivity returns.',
      },
      {
        title: 'Event and workshop attendance records',
        body: 'Generate simple receipts or participation summaries with line items for tickets, materials, or services rendered.',
      },
      {
        title: 'Internal audit trails',
        body: 'Operations teams produce lightweight documentation of process checks without opening heavyweight office suites.',
      },
    ],
    howItWorks: [
      'Choose report mode for sectioned documents or receipt mode for line items.',
      'Fill header fields such as title, date, client, and issuer details.',
      'Add sections or items — totals update automatically in receipt mode.',
      'Export PDF directly to your downloads folder.',
    ],
    tips: [
      'Use report mode when narrative structure matters more than pricing tables.',
      'Double-check currency and tax fields before exporting receipts for accounting.',
      'Keep section headings short — they appear prominently in the PDF layout.',
      'Export then merge with supporting attachments using PDF Merge if needed.',
      'Pair with PDF Password when sending financial receipts over email.',
      'Reuse Document Studio for formal contracts; use Report Generator for operational paperwork.',
      'Name exported PDFs with client and date in the filename so accounting folders stay organized without opening each file.',
    ],
    sections: [
      {
        id: 'reports-vs-receipts',
        heading: 'Reports versus receipts — when to use each',
        level: 2,
        paragraphs: [
          'Report mode is optimized for narrative content divided into sections. Each section has a heading and free-form body text, making it ideal for summaries, retrospectives, and qualitative updates.',
          'Receipt mode focuses on tabular economics: line descriptions, quantities, unit prices, and rolling totals. The layout emphasizes clarity for accounting review and client records.',
          'Many teams use report mode for internal communication and receipt mode for client-facing financial documents. Switching modes takes one click — you do not need separate software subscriptions for each document type.',
        ],
      },
      {
        id: 'local-pdf-generation',
        heading: 'Local PDF generation architecture',
        level: 2,
        paragraphs: [
          'Like every PDFWINDOWS tool, generation happens client-side. Your client names, amounts, and internal notes never pass through a conversion API. This is critical for financial documents that contain sensitive pricing or personal identifiers.',
          'Because there is no queue or server-side rendering, export is immediate — suitable for quick turnaround at the end of a client call or site visit.',
        ],
      },
      {
        id: 'workflow-integration',
        heading: 'Integrating with your document workflow',
        level: 2,
        paragraphs: [
          'Report Generator complements rather than replaces Document Studio. Use Studio for contracts and formal letters; use Report Generator for recurring operational outputs like weekly reports and payment receipts.',
        ],
        bullets: [
          'Export receipt PDF → email to client',
          'Merge receipt with signed contract via PDF Merge',
          'Compress large report bundles before archival',
          'Password-protect financial PDFs before external sharing',
        ],
      },
      {
        id: 'professional-output',
        heading: 'Professional output without desktop software',
        level: 2,
        paragraphs: [
          'The generated PDF uses consistent typography and spacing tuned for screen and print. You do not need Microsoft Word or a dedicated invoicing SaaS for simple, credible documents.',
          'Teams standardizing on PDFWINDOWS can keep the entire create-merge-protect pipeline inside the browser, reducing license costs and data residency concerns.',
          'Receipt PDFs exported here import cleanly into accounting folders when filenames include client name and date — a small habit that saves hours during annual audits.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I switch between report and receipt modes?',
        a: 'Yes. Select the mode at the start of your session. Each mode exposes fields appropriate to that document type.',
      },
      {
        q: 'Does receipt mode calculate taxes?',
        a: 'The tool computes line subtotals and grand totals from quantity and unit price. Configure tax fields according to the form labels in your locale.',
      },
      {
        q: 'Can I save a draft and return later?',
        a: 'Draft persistence depends on browser session. For long reports, consider exporting incremental PDFs or using Document Studio draft storage for related work.',
      },
      {
        q: 'Is the output legally binding?',
        a: 'PDFWINDOWS provides formatting tools only. Consult your jurisdiction and accounting requirements for invoice compliance.',
      },
      {
        q: 'Can I customize the PDF logo?',
        a: 'Header fields support issuer details. For branded letterheads, combine exports with Document Studio or watermark tools.',
      },
    ],
    relatedTools: ['/estudio-documentos', '/txt-to-pdf', '/pdf-merge', '/pdf-watermark'],
    cta: defaultCta('en', 'Report Generator'),
  },
  pt: {
    title: 'Gerador de Relatórios e Recibos Online Offline | PDFWINDOWS',
    description:
      'Monte relatórios e recibos profissionais com seções, itens e totais automáticos. Exporte PDF localmente — sem upload.',
    keywords:
      'gerador relatorio pdf, gerador recibo offline, recibo pdf local, criador relatorio empresa, recibo gratis pdf',
    h1: 'Gerador de Relatórios — Relatórios e Recibos',
    intro:
      'O Gerador de Relatórios do PDFWINDOWS combina redação estruturada e criação de recibos em um workspace local. Adicione seções com títulos e texto para relatórios de status, atas ou atualizações de projeto — ou use o modo recibo com itens, quantidades, valores unitários e subtotais automáticos. Tudo vira PDF limpo no seu dispositivo sem processamento na nuvem. Ideal para freelancers que emitem recibos, equipes de campo que documentam visitas e gestores que distribuem atualizações semanais. Diferente de processadores de texto genéricos, o layout prioriza exportação PDF rápida em vez de edição longa.',
    toolName: 'Gerador de Relatórios',
    benefits: [
      'Dois modos: relatórios com seções e recibos itemizados',
      'Cálculo automático de totais nos itens do recibo',
      'Layout PDF profissional gerado localmente',
      'Sem conta ou upload em servidor',
      'Complemento ideal ao Estúdio de Documentos',
      'Exportação rápida para e-mail e arquivo',
    ],
    useCases: [
      {
        title: 'Recibos de pagamento para freelancers',
        body: 'Emita recibos itemizados após marcos do projeto com descrição, quantidade, valor e total calculado. Exporte PDF e envie no mesmo dia. Como os totais calculam automaticamente, você evita erros de planilha que atrasam conciliação de pagamentos no fim do mês.',
      },
      {
        title: 'Relatórios semanais de equipe',
        body: 'Estruture atualizações com seções para entregas, bloqueios e próximos passos. Gestores anexam o PDF em listas de distribuição. Títulos de seção criam documentos escaneáveis que executivos leem no celular sem abrir uma suíte completa de gestão de projetos.',
      },
      {
        title: 'Resumos de inspeção em campo',
        body: 'Técnicos documentam observações em relatórios seccionados offline e exportam quando houver conexão.',
      },
      {
        title: 'Registros de eventos e workshops',
        body: 'Gere recibos simples ou resumos de participação com itens para ingressos, materiais ou serviços.',
      },
      {
        title: 'Trilhas de auditoria interna',
        body: 'Equipes operacionais produzem documentação leve de checagens sem abrir suites pesadas de escritório.',
      },
    ],
    howItWorks: [
      'Escolha modo relatório para documentos seccionados ou recibo para itens.',
      'Preencha cabeçalho com título, data, cliente e dados do emissor.',
      'Adicione seções ou itens — totais atualizam automaticamente no modo recibo.',
      'Exporte PDF direto para a pasta de downloads.',
    ],
    tips: [
      'Use modo relatório quando a narrativa importa mais que tabelas de preço.',
      'Confira moeda e impostos antes de exportar recibos para contabilidade.',
      'Mantenha títulos de seção curtos — aparecem em destaque no PDF.',
      'Exporte e mescle anexos com Mesclar PDF se necessário.',
      'Combine com Proteger PDF ao enviar recibos financeiros por e-mail.',
      'Use o Estúdio de Documentos para contratos formais; o Gerador para papelada operacional.',
      'Nomeie PDFs exportados com cliente e data no arquivo para pastas contábeis permanecerem organizadas sem abrir cada documento.',
      'Revise totais de recibo no modo pré-visualização antes de exportar para contabilidade.',
    ],
    sections: [
      {
        id: 'relatorios-vs-recibos',
        heading: 'Relatórios versus recibos — quando usar cada um',
        level: 2,
        paragraphs: [
          'O modo relatório é otimizado para conteúdo narrativo dividido em seções. Cada seção tem título e corpo livre, ideal para resumos, retrospectivas e atualizações qualitativas.',
          'O modo recibo foca em economia tabular: descrições, quantidades, valores unitários e totais acumulados. O layout prioriza clareza para contabilidade e registros do cliente.',
          'Muitas equipes usam modo relatório para comunicação interna e modo recibo para documentos financeiros ao cliente. Alternar modos leva um clique — sem assinaturas separadas para cada tipo de documento.',
        ],
      },
      {
        id: 'geracao-pdf-local',
        heading: 'Arquitetura de geração PDF local',
        level: 2,
        paragraphs: [
          'Como toda ferramenta PDFWINDOWS, a geração ocorre no cliente. Nomes de clientes, valores e notas internas nunca passam por API de conversão. Crítico para documentos financeiros com preços sensíveis ou dados pessoais.',
          'Sem fila ou renderização no servidor, a exportação é imediata — adequada para fechamento rápido ao fim de uma call ou visita.',
        ],
      },
      {
        id: 'integracao-fluxo',
        heading: 'Integrando ao seu fluxo documental',
        level: 2,
        paragraphs: [
          'O Gerador complementa o Estúdio de Documentos. Use o Estúdio para contratos e cartas formais; use o Gerador para saídas operacionais recorrentes como relatórios semanais e recibos.',
        ],
        bullets: [
          'Exportar recibo PDF → enviar ao cliente',
          'Mesclar recibo com contrato assinado via Mesclar PDF',
          'Comprimir pacotes grandes antes de arquivar',
          'Proteger PDFs financeiros antes de compartilhar',
        ],
      },
      {
        id: 'saida-profissional',
        heading: 'Saída profissional sem software desktop',
        level: 2,
        paragraphs: [
          'O PDF gerado usa tipografia e espaçamento consistentes para tela e impressão. Você não precisa de Word ou SaaS de faturamento para documentos simples e credíveis.',
          'Equipes padronizadas no PDFWINDOWS mantêm criar-mesclar-proteger inteiro no navegador, reduzindo licenças e preocupações com residência de dados.',
          'O Gerador também serve como ponto de entrada para usuários que ainda não dominam o Estúdio de Documentos, oferecendo formulários mais simples para saídas operacionais do dia a dia.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso alternar entre modo relatório e recibo?',
        a: 'Sim. Selecione o modo no início da sessão. Cada modo expõe campos adequados ao tipo de documento.',
      },
      {
        q: 'O modo recibo calcula impostos?',
        a: 'A ferramenta calcula subtotais e total geral a partir de quantidade e valor unitário. Configure campos de imposto conforme os rótulos do formulário.',
      },
      {
        q: 'Posso salvar rascunho e voltar depois?',
        a: 'Persistência depende da sessão do navegador. Para relatórios longos, exporte PDFs incrementais ou use rascunhos do Estúdio de Documentos.',
      },
      {
        q: 'A saída tem validade legal?',
        a: 'O PDFWINDOWS oferece apenas formatação. Consulte exigências fiscais e contábeis da sua jurisdição.',
      },
      {
        q: 'Posso personalizar logo no PDF?',
        a: 'Campos de cabeçalho suportam dados do emissor. Para papel timbrado, combine com Estúdio de Documentos ou marca d\'água.',
      },
    ],
    relatedTools: ['/estudio-documentos', '/txt-to-pdf', '/pdf-merge', '/pdf-watermark'],
    cta: defaultCta('pt', 'Gerador de Relatórios'),
  },
  es: {
    title: 'Generador de Informes y Recibos Online Offline | PDFWINDOWS',
    description:
      'Cree informes y recibos profesionales con secciones, ítems y totales automáticos. Exporte PDF localmente — sin subida.',
    keywords:
      'generador informes pdf, generador recibos offline, recibo pdf local, creador informe empresa, recibo gratis pdf',
    h1: 'Generador de Informes — Informes y Recibos',
    intro:
      'El Generador de Informes de PDFWINDOWS combina redacción estructurada y creación de recibos en un workspace local. Añada secciones con títulos y texto para informes de estado, actas o actualizaciones de proyecto — o use modo recibo con ítems, cantidades, precios unitarios y subtotales automáticos. Todo se convierte en PDF limpio en su dispositivo sin procesamiento en la nube. Ideal para freelancers que emiten recibos, equipos de campo que documentan visitas y gestores que distribuyen actualizaciones semanales. A diferencia de procesadores de texto genéricos, el diseño prioriza exportación PDF rápida en lugar de edición larga.',
    toolName: 'Generador de Informes',
    benefits: [
      'Dos modos: informes con secciones y recibos itemizados',
      'Cálculo automático de totales en ítems del recibo',
      'Diseño PDF profesional generado localmente',
      'Sin cuenta ni subida a servidor',
      'Complemento ideal del Estudio de Documentos',
      'Exportación rápida para correo y archivo',
    ],
    useCases: [
      {
        title: 'Recibos de pago para freelancers',
        body: 'Emita recibos itemizados tras hitos del proyecto con descripción, cantidad, tarifa y total calculado. Exporte PDF y envíe el mismo día. Como los totales se calculan automáticamente, evita errores de hoja de cálculo que retrasan la conciliación de pagos a fin de mes.',
      },
      {
        title: 'Informes semanales de equipo',
        body: 'Estructure actualizaciones con secciones para logros, bloqueos y próximos pasos. Gestores adjuntan el PDF en listas de distribución. Los títulos de sección crean documentos escaneables que ejecutivos leen en móvil sin abrir una suite completa de gestión de proyectos.',
      },
      {
        title: 'Resúmenes de inspección en campo',
        body: 'Técnicos documentan observaciones en informes seccionados offline y exportan cuando hay conexión.',
      },
      {
        title: 'Registros de eventos y talleres',
        body: 'Genere recibos simples o resúmenes de participación con ítems para entradas, materiales o servicios.',
      },
      {
        title: 'Rastros de auditoría interna',
        body: 'Equipos operativos producen documentación ligera de chequeos sin abrir suites pesadas de oficina.',
      },
    ],
    howItWorks: [
      'Elija modo informe para documentos seccionados o recibo para ítems.',
      'Complete encabezado con título, fecha, cliente y datos del emisor.',
      'Añada secciones o ítems — totales se actualizan automáticamente en modo recibo.',
      'Exporte PDF directo a la carpeta de descargas.',
    ],
    tips: [
      'Use modo informe cuando la narrativa importa más que tablas de precio.',
      'Verifique moneda e impuestos antes de exportar recibos para contabilidad.',
      'Mantenga títulos de sección cortos — aparecen destacados en el PDF.',
      'Exporte y una adjuntos con Unir PDF si es necesario.',
      'Combine con Proteger PDF al enviar recibos financieros por correo.',
      'Use el Estudio de Documentos para contratos formales; el Generador para papeleo operativo.',
      'Nombre PDFs exportados con cliente y fecha en el archivo para carpetas contables permanecer organizadas sin abrir cada documento.',
    ],
    sections: [
      {
        id: 'informes-vs-recibos',
        heading: 'Informes versus recibos — cuándo usar cada uno',
        level: 2,
        paragraphs: [
          'El modo informe está optimizado para contenido narrativo dividido en secciones. Cada sección tiene título y cuerpo libre, ideal para resúmenes, retrospectivas y actualizaciones cualitativas.',
          'El modo recibo se centra en economía tabular: descripciones, cantidades, precios unitarios y totales acumulados. El diseño prioriza claridad para contabilidad y registros del cliente.',
          'Muchos equipos usan modo informe para comunicación interna y modo recibo para documentos financieros al cliente. Cambiar modos toma un clic — sin suscripciones separadas para cada tipo de documento.',
        ],
      },
      {
        id: 'generacion-pdf-local',
        heading: 'Arquitectura de generación PDF local',
        level: 2,
        paragraphs: [
          'Como toda herramienta PDFWINDOWS, la generación ocurre en el cliente. Nombres de clientes, montos y notas internas nunca pasan por API de conversión. Crítico para documentos financieros con precios sensibles o datos personales.',
          'Sin cola ni renderizado en servidor, la exportación es inmediata — adecuada para cierre rápido al final de una llamada o visita.',
        ],
      },
      {
        id: 'integracion-flujo',
        heading: 'Integrando a su flujo documental',
        level: 2,
        paragraphs: [
          'El Generador complementa el Estudio de Documentos. Use el Estudio para contratos y cartas formales; use el Generador para salidas operativas recurrentes como informes semanales y recibos.',
        ],
        bullets: [
          'Exportar recibo PDF → enviar al cliente',
          'Unir recibo con contrato firmado vía Unir PDF',
          'Comprimir paquetes grandes antes de archivar',
          'Proteger PDFs financieros antes de compartir',
        ],
      },
      {
        id: 'salida-profesional',
        heading: 'Salida profesional sin software de escritorio',
        level: 2,
        paragraphs: [
          'El PDF generado usa tipografía y espaciado consistentes para pantalla e impresión. No necesita Word ni SaaS de facturación para documentos simples y creíbles.',
          'Equipos estandarizados en PDFWINDOWS mantienen crear-unir-proteger entero en el navegador, reduciendo licencias y preocupaciones de residencia de datos.',
          'El Generador también sirve como punto de entrada para usuarios que aún no dominan el Estudio de Documentos, ofreciendo formularios más simples para salidas operativas del día a día.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo alternar entre modo informe y recibo?',
        a: 'Sí. Seleccione el modo al inicio de la sesión. Cada modo expone campos adecuados al tipo de documento.',
      },
      {
        q: '¿El modo recibo calcula impuestos?',
        a: 'La herramienta calcula subtotales y total general desde cantidad y precio unitario. Configure campos de impuesto según las etiquetas del formulario.',
      },
      {
        q: '¿Puedo guardar borrador y volver después?',
        a: 'La persistencia depende de la sesión del navegador. Para informes largos, exporte PDFs incrementales o use borradores del Estudio de Documentos.',
      },
      {
        q: '¿La salida tiene validez legal?',
        a: 'PDFWINDOWS ofrece solo formateo. Consulte requisitos fiscales y contables de su jurisdicción.',
      },
      {
        q: '¿Puedo personalizar logo en el PDF?',
        a: 'Los campos de encabezado soportan datos del emisor. Para membrete, combine con Estudio de Documentos o marca de agua.',
      },
    ],
    relatedTools: ['/estudio-documentos', '/txt-to-pdf', '/pdf-merge', '/pdf-watermark'],
    cta: defaultCta('es', 'Generador de Informes'),
  },
};
