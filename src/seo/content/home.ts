import type { ToolRichContent } from './types';
import { privacyFaq, defaultCta } from './helpers';

export const HOME_RICH_CONTENT: Record<'/' | '/conversor', Record<'en' | 'pt' | 'es', ToolRichContent>> = {
  '/': {
    en: {
      title: 'PDFWINDOWS',
      description:
        'Professional PDF, image, and productivity platform. Browser tools, no signup required. Explore the full tool catalog.',
      keywords:
        'offline pdf tools, pdf converter free, private pdf editor, local image tools, browser pdf suite, pdfwindows',
      h1: 'PDF & Image',
      intro:
        'Professional tools for PDF and image. Fast browser processing, no account required.',
      toolName: 'PDFWINDOWS',
      benefits: [

        'Dozens of dedicated tool pages for SEO and deep linking',
        'PDF, image, data, and productivity suite in one brand',
        'No mandatory account or subscription',
        'Works in modern Chrome, Edge, and Firefox',
        'Offline-capable after initial page load',
      ],
      useCases: [
        {
          title: 'Legal and compliance teams',
          body: 'Process contracts, redacted filings, and client correspondence locally to satisfy data residency policies without expensive desktop suites.',
        },
        {
          title: 'Freelancers and agencies',
          body: 'Merge deliverables, watermark drafts, compress portfolios for email, and generate receipts — all from one catalog without tool-hopping.',
        },
        {
          title: 'Students and educators',
          body: 'Convert lecture scans to text, rotate misaligned pages, and build PDF study packs without uploading classmates shared materials to unknown servers.',
        },
        {
          title: 'Developers and QA engineers',
          body: 'Format code snippets, convert CSV fixtures, generate test CPF numbers, and create QR codes for staging environments privately.',
        },
        {
          title: 'Small business operations',
          body: 'Run day-to-day document tasks — invoices, reports, image resizing for social media — without per-seat SaaS fees for basic conversions.',
        },
      ],
      howItWorks: [
        'Browse the catalog and pick the tool that matches your task.',
        'Upload or paste input — processing happens instantly in the browser.',
        'Download the result or chain another tool from related suggestions.',
      ],
      tips: [
        'Bookmark individual tool pages for one-click access to frequent operations.',
        'Use the full converter workbench at /conversor when batching multiple file types.',
        'Chain merge → compress → password for secure client delivery workflows.',
        'Suite tools like Document Studio complement converters — create then protect PDFs.',
        'After first load, many tools work offline on flights or secure networks.',
        'Explore related tools at the bottom of each landing page for workflow shortcuts.',
        'Switch interface language from the header — all tool pages and SEO content are available in English, Portuguese, and Spanish.',
      ],
      sections: [
        {
          id: 'offline-first-platform',
          heading: 'An offline-first document platform',
          level: 2,
          paragraphs: [
            'Most online converters follow the same pattern: upload your file, wait in a queue, download from a link that expires in an hour. PDFWINDOWS inverts that model. WebAssembly and browser APIs execute conversions on your CPU, in your memory, under your control.',
            'The catalog organizes tools into clear categories — PDF operations, image workflows, data format converters, and productivity suite apps — so you land on a purpose-built page instead of a generic upload box.',
            'Search engines can index each dedicated URL independently, which helps teams discover the exact capability they need rather than a single overloaded landing page.',
          ],
        },
        {
          id: 'privacy-by-architecture',
          heading: 'Privacy by architecture, not policy',
          level: 2,
          paragraphs: [
            'Privacy policies promise not to misuse data; PDFWINDOWS removes the data from the equation. When nothing is uploaded, there is nothing to breach, subpoena, or accidentally log.',
            'This matters for HIPAA-sensitive scans, attorney-client documents, financial statements, and pre-release marketing assets. Local processing is the strongest guarantee a web app can offer.',
            'Regulated industries in Brazil, Europe, and North America increasingly reject cloud converters for routine document handling — PDFWINDOWS aligns with that shift.',
          ],
        },
        {
          id: 'catalog-overview',
          heading: 'What you will find in the catalog',
          level: 2,
          paragraphs: [
            'The home catalog surfaces every public tool with icons and short descriptions. PDF tools cover merge, split, compress, rotate, watermark, password protection, OCR, and format conversion. Image tools handle resize, filters, OCR, and format changes. Suite tools add document creation, color picking, QR generation, report building, CPF test data, and code formatting.',
          ],
          bullets: [
            'PDF — merge, split, compress, encrypt, OCR, convert',
            'Image — resize, convert, OCR, filters',
            'Data — CSV, JSON, XML, TXT conversions',
            'Suite — documents, reports, QR, colors, code, test CPF',
          ],
        },
        {
          id: 'getting-started',
          heading: 'Getting started with PDFWINDOWS',
          level: 2,
          paragraphs: [
            'No installation or signup is required. Open a tool page, interact with the workspace, and download results. For power users managing mixed file batches, the full converter at /conversor exposes the classic multi-operation workbench in one view.',
            'Each tool page includes educational content, FAQs, and related tool links to help you build efficient document pipelines without leaving the platform.',
            'The catalog layout is optimized for quick scanning: icons communicate category at a glance, and every card links to a dedicated URL you can share with colleagues or index in search engines.',
          ],
        },
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'Do I need to install anything?',
          a: 'No. PDFWINDOWS runs in modern browsers. Bookmark tool pages for quick access.',
        },
        {
          q: 'Is PDFWINDOWS free?',
          a: 'Core tools are available without mandatory payment or account creation. Processing is local in your browser.',
        },
        {
          q: 'Which browsers are supported?',
          a: 'Chrome, Edge, and Firefox current versions work best. Some features like screen color picking require Chromium EyeDropper API.',
        },
        {
          q: 'Can I use tools offline?',
          a: 'After the initial page load, many tools work without internet. First visit requires network to download the application.',
        },
        {
          q: 'How is this different from Adobe or Smallpdf?',
          a: 'PDFWINDOWS prioritizes local processing and granular tool pages. No cloud upload is required for core conversions.',
        },
      ],
      relatedTools: ['/pdf-merge', '/pdf-compress', '/estudio-documentos', '/conversor'],
      cta: {
        heading: 'Explore the full catalog',
        body: 'Pick any tool and process your first file in seconds — fast and free.',
        buttonLabel: 'Browse tools',
      },
    },
    pt: {
      title: 'PDFWINDOWS — Ferramentas PDF e Imagem',
      description:
        'Plataforma profissional de PDF, imagem e produtividade. Ferramentas no navegador, sem cadastro. Explore o catálogo completo.',
      keywords:
        'ferramentas pdf offline, converter pdf gratis, editor pdf privado, ferramentas imagem local, suite pdf navegador, pdfwindows',
      h1: 'PDF e Imagem',
      intro:
        'Ferramentas profissionais para PDF e imagem. Processamento rápido no navegador, sem cadastro.',
      toolName: 'PDFWINDOWS',
      benefits: [

        'Dezenas de páginas dedicadas para SEO e links diretos',
        'PDF, imagem, dados e suíte de produtividade em uma marca',
        'Sem conta ou assinatura obrigatória',
        'Funciona em Chrome, Edge e Firefox modernos',
        'Capaz de operar offline após carregar a página',
        'Suporte completo a dezenas de formatos de PDF, imagem e dados estruturados',
      ],
      useCases: [
        {
          title: 'Equipes jurídicas e compliance',
          body: 'Processe contratos, petições e correspondência de clientes localmente para cumprir políticas de residência de dados sem suites desktop caras.',
        },
        {
          title: 'Freelancers e agências',
          body: 'Mescle entregas, marque rascunhos, comprima portfólios para e-mail e gere recibos — tudo de um catálogo sem trocar de ferramenta.',
        },
        {
          title: 'Estudantes e educadores',
          body: 'Converta scans de aula em texto, rotacione páginas e monte PDFs de estudo sem enviar materiais compartilhados para servidores desconhecidos.',
        },
        {
          title: 'Desenvolvedores e QA',
          body: 'Formate código, converta fixtures CSV, gere CPF de teste e crie QR Codes para ambientes de homologação com privacidade.',
        },
        {
          title: 'Operações de pequenos negócios',
          body: 'Execute tarefas diárias — faturas, relatórios, redimensionar imagens para redes sociais — sem taxas SaaS por assento para conversões básicas.',
        },
      ],
      howItWorks: [
        'Navegue pelo catálogo e escolha a ferramenta para sua tarefa.',
        'Envie ou cole a entrada — o processamento ocorre no navegador.',
        'Baixe o resultado ou encadeie outra ferramenta pelas sugestões relacionadas.',
      ],
      tips: [
        'Favorite páginas de ferramentas para acesso rápido a operações frequentes.',
        'Use o conversor completo em /conversor para lotes com vários tipos de arquivo.',
        'Encadeie mesclar → comprimir → senha para entregas seguras a clientes.',
        'Ferramentas da suíte como Estúdio de Documentos complementam conversores.',
        'Após o primeiro carregamento, muitas ferramentas funcionam offline.',
        'Explore ferramentas relacionadas no rodapé de cada landing para atalhos de fluxo.',
        'Troque o idioma da interface no cabeçalho — todas as páginas e conteúdo SEO estão em português, inglês e espanhol.',
        'Ao abrir uma ferramenta, a página posiciona automaticamente a área de trabalho; role para cima para ler a introdução completa e o FAQ.',
      ],
      sections: [
        {
          id: 'plataforma-offline',
          heading: 'Uma plataforma de documentos offline-first',
          level: 2,
          paragraphs: [
            'A maioria dos conversores online segue o mesmo padrão: upload, fila, download de link que expira. O PDFWINDOWS inverte esse modelo. WebAssembly e APIs do navegador executam conversões na sua CPU, na sua memória, sob seu controle.',
            'O catálogo organiza ferramentas em categorias — PDF, imagem, dados e suíte de produtividade — para você chegar em uma página específica em vez de uma caixa genérica de upload.',
            'Buscadores podem indexar cada URL dedicada de forma independente, ajudando equipes a encontrar a capacidade exata que precisam em vez de uma landing sobrecarregada.',
          ],
        },
        {
          id: 'privacidade-arquitetura',
          heading: 'Privacidade por arquitetura, não por política',
          level: 2,
          paragraphs: [
            'Políticas de privacidade prometem não usar dados indevidamente; o PDFWINDOWS remove os dados da equação. Quando nada é enviado, não há o que vazar, subpionar ou registrar por acidente.',
            'Isso importa para scans sensíveis, documentos advocatícios, demonstrativos financeiros e assets de marketing pré-lançamento.',
            'Setores regulados no Brasil e na Europa rejeitam cada vez mais conversores na nuvem para rotinas documentais — o PDFWINDOWS acompanha essa tendência.',
          ],
        },
        {
          id: 'visao-catalogo',
          heading: 'O que você encontra no catálogo',
          level: 2,
          paragraphs: [
            'A home exibe cada ferramenta pública com ícones e descrições curtas. PDF cobre mesclar, dividir, comprimir, rotacionar, marca d\'água, senha, OCR e conversão. Imagem trata redimensionar, filtros, OCR e formatos. A suíte adiciona documentos, cores, QR, relatórios, CPF de teste e formatação de código.',
          ],
          bullets: [
            'PDF — mesclar, dividir, comprimir, criptografar, OCR, converter',
            'Imagem — redimensionar, converter, OCR, filtros',
            'Dados — conversões CSV, JSON, XML, TXT',
            'Suíte — documentos, relatórios, QR, cores, código, CPF teste',
          ],
        },
        {
          id: 'comecar',
          heading: 'Começando com o PDFWINDOWS',
          level: 2,
          paragraphs: [
            'Não é necessário instalar ou cadastrar. Abra uma página de ferramenta, use o workspace e baixe resultados. Para lotes mistos, o conversor completo em /conversor expõe o workbench clássico em uma visão.',
            'Cada página inclui conteúdo educacional detalhado, FAQ e links de ferramentas relacionadas para montar pipelines eficientes.',
            'O layout do catálogo é otimizado para leitura rápida: ícones comunicam a categoria e cada card leva a uma URL dedicada que você pode compartilhar com colegas ou indexar no Google.',
          ],
        },
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Preciso instalar algo?',
          a: 'Não. O PDFWINDOWS roda em navegadores modernos. Favorite páginas de ferramentas para acesso rápido.',
        },
        {
          q: 'O PDFWINDOWS é gratuito?',
          a: 'Ferramentas principais estão disponíveis sem pagamento ou cadastro obrigatório. O processamento é local no navegador.',
        },
        {
          q: 'Quais navegadores são suportados?',
          a: 'Chrome, Edge e Firefox atuais funcionam melhor. Alguns recursos como captura de cor exigem API EyeDropper do Chromium.',
        },
        {
          q: 'Posso usar offline?',
          a: 'Após carregar a página, muitas ferramentas funcionam sem internet. A primeira visita requer rede para baixar o aplicativo.',
        },
        {
          q: 'Como difere do Adobe ou Smallpdf?',
          a: 'O PDFWINDOWS prioriza processamento local e páginas granulares por ferramenta. Não exige upload na nuvem para conversões principais.',
        },
      ],
      relatedTools: ['/pdf-merge', '/pdf-compress', '/estudio-documentos', '/conversor'],
      cta: {
        heading: 'Explore o catálogo completo',
        body: 'Escolha qualquer ferramenta e processe seu primeiro arquivo em segundos — rápido e gratuito.',
        buttonLabel: 'Ver ferramentas',
      },
    },
    es: {
      title: 'PDFWINDOWS — Herramientas PDF e Imagen',
      description:
        'Plataforma profesional de PDF, imagen y productividad. Herramientas en el navegador, sin registro. Explore el catálogo completo.',
      keywords:
        'herramientas pdf offline, convertir pdf gratis, editor pdf privado, herramientas imagen local, suite pdf navegador, pdfwindows',
      h1: 'PDF e Imagen',
      intro:
        'Herramientas profesionales para PDF e imagen. Procesamiento rápido en el navegador, sin registro.',
      toolName: 'PDFWINDOWS',
      benefits: [

        'Docenas de páginas dedicadas para SEO y enlaces directos',
        'PDF, imagen, datos y suite de productividad en una marca',
        'Sin cuenta ni suscripción obligatoria',
        'Funciona en Chrome, Edge y Firefox modernos',
        'Capaz de operar offline tras cargar la página',
        'Compatibilidad con decenas de formatos PDF e imagen',
      ],
      useCases: [
        {
          title: 'Equipos legales y compliance',
          body: 'Procese contratos, escritos y correspondencia de clientes localmente para cumplir políticas de residencia de datos sin suites desktop costosas.',
        },
        {
          title: 'Freelancers y agencias',
          body: 'Una entregables, marque borradores, comprima portafolios para correo y genere recibos — todo desde un catálogo sin cambiar de herramienta.',
        },
        {
          title: 'Estudiantes y educadores',
          body: 'Convierta escaneos de clase a texto, rote páginas y arme PDFs de estudio sin subir materiales compartidos a servidores desconocidos.',
        },
        {
          title: 'Desarrolladores y QA',
          body: 'Formatee código, convierta fixtures CSV, genere CPF de prueba y cree códigos QR para entornos de staging con privacidad.',
        },
        {
          title: 'Operaciones de pequeños negocios',
          body: 'Ejecute tareas diarias — facturas, informes, redimensionar imágenes para redes — sin tarifas SaaS por asiento para conversiones básicas.',
        },
      ],
      howItWorks: [
        'Navegue el catálogo y elija la herramienta para su tarea.',
        'Suba o pegue la entrada — el procesamiento ocurre en el navegador.',
        'Descargue el resultado o encadene otra herramienta por sugerencias relacionadas.',
      ],
      tips: [
        'Marque páginas de herramientas para acceso rápido a operaciones frecuentes.',
        'Use el conversor completo en /conversor para lotes con varios tipos de archivo.',
        'Encadene unir → comprimir → contraseña para entregas seguras a clientes.',
        'Herramientas de suite como Estudio de Documentos complementan conversores.',
        'Tras la primera carga, muchas herramientas funcionan sin internet.',
        'Explore herramientas relacionadas al pie de cada landing para atajos de flujo.',
        'Cambie el idioma de la interfaz en el encabezado — todas las páginas y contenido SEO están en español, inglés y portugués.',
        'Al abrir una herramienta, la página posiciona automáticamente el área de trabajo; desplácese hacia arriba para leer la introducción completa y las preguntas frecuentes.',
      ],
      sections: [
        {
          id: 'plataforma-offline',
          heading: 'Una plataforma de documentos offline-first',
          level: 2,
          paragraphs: [
            'La mayoría de conversores online siguen el mismo patrón: subida, cola, descarga de enlace que expira. PDFWINDOWS invierte ese modelo. WebAssembly y APIs del navegador ejecutan conversiones en su CPU, en su memoria, bajo su control.',
            'El catálogo organiza herramientas en categorías — PDF, imagen, datos y suite de productividad — para llegar a una página específica en lugar de una caja genérica de subida.',
            'Los buscadores pueden indexar cada URL dedicada de forma independiente, ayudando a equipos a encontrar la capacidad exacta que necesitan en lugar de una landing sobrecargada.',
          ],
        },
        {
          id: 'privacidad-arquitectura',
          heading: 'Privacidad por arquitectura, no por política',
          level: 2,
          paragraphs: [
            'Las políticas de privacidad prometen no usar datos indebidamente; PDFWINDOWS elimina los datos de la ecuación. Cuando nada se sube, no hay qué filtrar, subpoenar o registrar por accidente.',
            'Esto importa para escaneos sensibles, documentos legales, estados financieros y assets de marketing pre-lanzamiento.',
            'Sectores regulados en Brasil y Europa rechazan cada vez más conversores en la nube para rutinas documentales — PDFWINDOWS acompaña esa tendencia.',
          ],
        },
        {
          id: 'vision-catalogo',
          heading: 'Qué encontrará en el catálogo',
          level: 2,
          paragraphs: [
            'La home muestra cada herramienta pública con iconos y descripciones cortas. PDF cubre unir, dividir, comprimir, rotar, marca de agua, contraseña, OCR y conversión. Imagen trata redimensionar, filtros, OCR y formatos. La suite añade documentos, colores, QR, informes, CPF de prueba y formateo de código.',
          ],
          bullets: [
            'PDF — unir, dividir, comprimir, cifrar, OCR, convertir',
            'Imagen — redimensionar, convertir, OCR, filtros',
            'Datos — conversiones CSV, JSON, XML, TXT',
            'Suite — documentos, informes, QR, colores, código, CPF prueba',
          ],
        },
        {
          id: 'empezar',
          heading: 'Empezando con PDFWINDOWS',
          level: 2,
          paragraphs: [
            'No requiere instalar ni registrarse. Abra una página de herramienta, use el workspace y descargue resultados. Para lotes mixtos, el conversor completo en /conversor expone el workbench clásico en una vista.',
            'Cada página incluye contenido educativo, FAQ y enlaces de herramientas relacionadas para armar pipelines eficientes.',
            'El diseño del catálogo está optimizado para escaneo rápido: los iconos comunican la categoría y cada tarjeta lleva a una URL dedicada que puede compartir con colegas o indexar en buscadores.',
          ],
        },
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿Debo instalar algo?',
          a: 'No. PDFWINDOWS corre en navegadores modernos. Marque páginas de herramientas para acceso rápido.',
        },
        {
          q: '¿PDFWINDOWS es gratuito?',
          a: 'Herramientas principales están disponibles sin pago ni registro obligatorio. El procesamiento es local en el navegador.',
        },
        {
          q: '¿Qué navegadores se soportan?',
          a: 'Chrome, Edge y Firefox actuales funcionan mejor. Algunas funciones como captura de color requieren API EyeDropper de Chromium.',
        },
        {
          q: '¿Puedo usar offline?',
          a: 'Tras cargar la página, muchas herramientas funcionan sin internet. La primera visita requiere red para descargar la aplicación.',
        },
        {
          q: '¿En qué difiere de Adobe o Smallpdf?',
          a: 'PDFWINDOWS prioriza procesamiento local y páginas granulares por herramienta. No exige subida a la nube para conversiones principales.',
        },
      ],
      relatedTools: ['/pdf-merge', '/pdf-compress', '/estudio-documentos', '/conversor'],
      cta: {
        heading: 'Explore el catálogo completo',
        body: 'Elija cualquier herramienta y procese su primer archivo en segundos — rápido y gratuito.',
        buttonLabel: 'Ver herramientas',
      },
    },
  },
  '/conversor': {
    en: {
      title: 'Full PDF & Image Converter Workbench | PDFWINDOWS',
      description:
        'All-in-one converter workbench for PDF and image batch operations. Queue files, pick operations, process locally — no upload required.',
      keywords:
        'pdf converter workbench, batch pdf converter offline, full image converter, local conversion queue, pdfwindows converter',
      h1: 'Full Converter — Batch Local Processing',
      intro:
        'The PDFWINDOWS Full Converter is the power-user workbench that exposes every conversion operation in a single queue-driven interface. Add multiple PDFs and images, assign operations like merge, compress, OCR, or format conversion, and process the entire batch locally without uploading to cloud workers. This page preserves the classic PDFWINDOWS experience for users who prefer one workspace over jumping between individual tool landing pages — while still benefiting from the same offline-first privacy architecture.',
      toolName: 'Full Converter',
      benefits: [
        'Single queue for mixed PDF and image operations',
        'Access all conversion types without page switching',

        'Productivity suite shortcuts in the same view',
        'Ideal for batch workflows and power users',

      ],
      useCases: [
        {
          title: 'End-of-day document batches',
          body: 'Administrative assistants queue afternoon scans for OCR, rotation, and merge into a single archive before end of shift.',
        },
        {
          title: 'Photography delivery pipelines',
          body: 'Resize a shoot folder to web dimensions, convert to WEBP, and bundle selected images into a client PDF — sequentially in one session.',
        },
        {
          title: 'Migration off cloud converters',
          body: 'Teams replacing subscription converters replicate multi-step workflows in one local workbench to avoid re-uploading the same files repeatedly.',
        },
        {
          title: 'IT helpdesk support',
          body: 'Support staff process user-submitted files on secure workstations knowing files never leave the browser during conversion.',
        },
        {
          title: 'Conference and event materials',
          body: 'Organizers compress speaker PDFs, watermark drafts, and extract text for accessibility captions in one sitting.',
        },
      ],
      howItWorks: [
        'Open the full converter and add files to the processing queue.',
        'Select the operation for each file or batch group.',
        'Review the queue order and operation settings.',
        'Process all items and download results locally.',
      ],
      tips: [
        'Use individual tool pages when you need deep SEO guides for a single operation.',
        'Order queue items carefully for merge — sequence determines page order.',
        'Large OCR batches are CPU-intensive; process in chunks on older laptops.',
        'Link to suite tools from the productivity section for QR, reports, and documents.',
        'Compress after merge to avoid compressing files you will discard.',
        'Bookmark /conversor if this is your daily driver instead of the home catalog.',
        'The workbench remembers your last selected operation within the session for faster repeat conversions.',
      ],
      sections: [
        {
          id: 'workbench-vs-catalog',
          heading: 'Workbench versus catalog tool pages',
          level: 2,
          paragraphs: [
            'Individual tool pages like /pdf-merge or /image-resize offer focused UX and educational SEO content for specific tasks. The full converter aggregates those engines behind one queue for users who already know what they need.',
            'Both paths call the same local processing libraries — choosing between them is a workflow preference, not a capability difference.',
            'New users can start on the catalog home and graduate to the workbench once they understand which operations they combine most often.',
          ],
        },
        {
          id: 'queue-workflow',
          heading: 'Queue-driven batch workflow',
          level: 2,
          paragraphs: [
            'The queue model mirrors desktop batch converters: add files, tag operations, execute. Because processing is synchronous in the browser, you see progress per item without polling a remote job status page.',
            'Mixed media queues are supported — PDFs and images in one session — which matches real office tasks better than siloed single-purpose sites.',
            'When you finish a batch, related tool suggestions at the bottom of converter pages help you chain compress, watermark, or encrypt without returning to the catalog.',
          ],
        },
        {
          id: 'suite-integration',
          heading: 'Productivity suite integration',
          level: 2,
          paragraphs: [
            'The converter surface includes links to suite tools — Document Studio, Report Generator, QR codes, Color Picker, and more. After converting assets, jump to creation tools without losing context.',
          ],
          bullets: [
            'Convert scans → OCR → merge → compress delivery bundle',
            'Resize images → image to PDF → watermark final proof',
            'Extract text → edit locally → TXT to PDF for sharing',
          ],
        },
        {
          id: 'performance-tips',
          heading: 'Performance on local hardware',
          level: 2,
          paragraphs: [
            'Browser conversions scale with your device CPU and RAM. Modern laptops handle dozens of PDF compressions quickly; OCR on hundred-page scans will take longer and may heat the machine.',
            'Close unused tabs before large batches to free memory. Results download immediately — there is no cloud retention period to worry about.',
            'Power users often keep /conversor pinned alongside individual tool bookmarks, switching based on whether the task is exploratory or batch-oriented.',
          ],
        },
      ],
      faq: [
        ...privacyFaq('en'),
        {
          q: 'How is this different from individual tool pages?',
          a: 'The full converter exposes multiple operations in one queue. Individual pages offer focused UX and richer guides for single tasks.',
        },
        {
          q: 'Can I merge and compress in one queue?',
          a: 'Yes. Add operations sequentially — merge first, then compress the output file in a follow-up queue item.',
        },
        {
          q: 'Is there a file count limit?',
          a: 'Limits depend on browser memory, not server quotas. Very large batches may need splitting on low-RAM devices.',
        },
        {
          q: 'Does the workbench include suite tools?',
          a: 'Yes. Productivity tools are accessible from the same page via the suite section.',
        },
        {
          q: 'Can I share queue presets?',
          a: 'Queues are session-based. Document your steps or use individual tool bookmarks for repeatable team workflows.',
        },
      ],
      relatedTools: ['/pdf-merge', '/pdf-compress', '/image-converter', '/pdf-ocr'],
      cta: defaultCta('en', 'Full Converter'),
    },
    pt: {
      title: 'Conversor Completo PDF e Imagem | PDFWINDOWS',
      description:
        'Workbench conversor tudo-em-um para operações em lote de PDF e imagem. Enfileire arquivos, escolha operações, processe localmente — sem upload.',
      keywords:
        'conversor pdf completo, conversor pdf lote offline, conversor imagem completo, fila conversao local, conversor pdfwindows',
      h1: 'Conversor Completo — Processamento Local em Lote',
      intro:
        'O Conversor Completo do PDFWINDOWS é o workbench para usuários avançados que expõe todas as operações de conversão em uma interface orientada por fila. Adicione vários PDFs e imagens, atribua operações como mesclar, comprimir, OCR ou conversão de formato, e processe o lote inteiro localmente sem upload para workers na nuvem. Esta página preserva a experiência clássica do PDFWINDOWS para quem prefere um workspace único em vez de saltar entre landing pages — mantendo a mesma arquitetura offline-first.',
      toolName: 'Conversor Completo',
      benefits: [
        'Fila única para operações mistas de PDF e imagem',
        'Acesso a todos os tipos de conversão sem trocar de página',
        'Processamento em lote direto no navegador',
        'Atalhos da suíte de produtividade na mesma visão',
        'Ideal para fluxos em lote e usuários avançados',

      ],
      useCases: [
        {
          title: 'Lotes de documentos no fim do dia',
          body: 'Assistentes administrativos enfileiram scans da tarde para OCR, rotação e mesclagem em um arquivo antes do expediente.',
        },
        {
          title: 'Pipeline de entrega fotográfica',
          body: 'Redimensione pasta de shoot para web, converta para WEBP e monte imagens selecionadas em PDF para cliente — em uma sessão.',
        },
        {
          title: 'Migração de conversores na nuvem',
          body: 'Equipes substituindo conversores pagos replicam fluxos multi-etapa em um workbench local sem reenviar os mesmos arquivos.',
        },
        {
          title: 'Suporte de TI',
          body: 'Staff processa arquivos de usuários em estações seguras sabendo que nada sai do navegador durante a conversão.',
        },
        {
          title: 'Materiais de eventos',
          body: 'Organizadores comprimem PDFs de palestrantes, marcam rascunhos e extraem texto para legendas de acessibilidade.',
        },
      ],
      howItWorks: [
        'Abra o conversor completo e adicione arquivos à fila.',
        'Selecione a operação para cada arquivo ou grupo.',
        'Revise ordem da fila e configurações.',
        'Processe todos os itens e baixe resultados localmente.',
      ],
      tips: [
        'Use páginas individuais quando precisar de guias SEO profundos para uma operação.',
        'Ordene a fila com cuidado em mesclagens — a sequência define ordem das páginas.',
        'Lotes grandes de OCR são intensivos em CPU; processe em partes em notebooks antigos.',
        'Acesse ferramentas da suíte na seção de produtividade para QR, relatórios e documentos.',
        'Comprima após mesclar para evitar comprimir arquivos que será descartar.',
        'Favorite /conversor se for seu uso diário em vez do catálogo home.',
        'O workbench mantém a última operação selecionada na sessão para conversões repetidas mais rápidas.',
        'Combine esta página com ferramentas individuais quando precisar de orientação detalhada sobre um único tipo de tarefa.',
      ],
      sections: [
        {
          id: 'workbench-vs-catalogo',
          heading: 'Workbench versus páginas do catálogo',
          level: 2,
          paragraphs: [
            'Páginas individuais como /pdf-merge ou /image-resize oferecem UX focada e conteúdo SEO educacional. O conversor completo agrega os mesmos engines atrás de uma fila para quem já sabe o que precisa.',
            'Ambos caminhos usam as mesmas bibliotecas locais — a escolha é preferência de fluxo, não diferença de capacidade.',
            'Novos usuários podem começar no catálogo e migrar para o workbench quando entenderem quais operações combinam com mais frequência.',
          ],
        },
        {
          id: 'fluxo-fila',
          heading: 'Fluxo de lote orientado por fila',
          level: 2,
          paragraphs: [
            'O modelo de fila espelha conversores desktop: adicionar arquivos, marcar operações, executar. Como o processamento é síncrono no navegador, você vê progresso por item sem consultar status remoto.',
            'Filas de mídia mista são suportadas — PDFs e imagens numa sessão — alinhado a tarefas reais de escritório.',
            'Ao terminar um lote, sugestões de ferramentas relacionadas ajudam a encadear comprimir, marca d\'água ou criptografar sem voltar ao catálogo.',
          ],
        },
        {
          id: 'integracao-suite',
          heading: 'Integração com suíte de produtividade',
          level: 2,
          paragraphs: [
            'A superfície do conversor inclui links para ferramentas da suíte — Estúdio de Documentos, Gerador de Relatórios, QR Codes, Capturador de Cores e mais.',
          ],
          bullets: [
            'Converter scans → OCR → mesclar → comprimir pacote final',
            'Redimensionar imagens → imagem para PDF → marca d\'água',
            'Extrair texto → editar localmente → TXT para PDF',
          ],
        },
        {
          id: 'dicas-performance',
          heading: 'Performance no hardware local',
          level: 2,
          paragraphs: [
            'Conversões no navegador escalam com CPU e RAM do dispositivo. Notebooks modernos lidam com dezenas de compressões rapidamente; OCR em scans longos demora mais.',
            'Feche abas não usadas antes de lotes grandes. Resultados baixam imediatamente — sem período de retenção na nuvem.',
            'Usuários avançados costumam manter /conversor fixado junto com favoritos de ferramentas individuais, alternando conforme a tarefa seja exploratória ou em lote.',
          ],
        },
      ],
      faq: [
        ...privacyFaq('pt'),
        {
          q: 'Como difere das páginas individuais?',
          a: 'O conversor completo expõe várias operações numa fila. Páginas individuais oferecem UX focada e guias mais ricos para tarefas únicas.',
        },
        {
          q: 'Posso mesclar e comprimir numa fila?',
          a: 'Sim. Adicione operações em sequência — mescle primeiro, depois comprima o resultado em outro item da fila.',
        },
        {
          q: 'Há limite de quantidade de arquivos?',
          a: 'Limites dependem da memória do navegador, não de cotas de servidor. Lotes enormes podem precisar divisão em dispositivos com pouca RAM.',
        },
        {
          q: 'O workbench inclui ferramentas da suíte?',
          a: 'Sim. Ferramentas de produtividade são acessíveis na mesma página pela seção da suíte.',
        },
        {
          q: 'Posso compartilhar presets de fila?',
          a: 'Filas são baseadas em sessão. Documente passos ou use favoritos de ferramentas individuais para fluxos repetíveis.',
        },
      ],
      relatedTools: ['/pdf-merge', '/pdf-compress', '/image-converter', '/pdf-ocr'],
      cta: defaultCta('pt', 'Conversor Completo'),
    },
    es: {
      title: 'Conversor Completo PDF e Imagen | PDFWINDOWS',
      description:
        'Workbench conversor todo-en-uno para operaciones por lotes de PDF e imagen. Encole archivos, elija operaciones, procese localmente — sin subida.',
      keywords:
        'conversor pdf completo, conversor pdf lote offline, conversor imagen completo, cola conversion local, conversor pdfwindows',
      h1: 'Conversor Completo — Procesamiento Local por Lotes',
      intro:
        'El Conversor Completo de PDFWINDOWS es el workbench para usuarios avanzados que expone todas las operaciones de conversión en una interfaz orientada por cola. Añada varios PDFs e imágenes, asigne operaciones como unir, comprimir, OCR o conversión de formato, y procese el lote entero localmente sin subir a workers en la nube. Esta página preserva la experiencia clásica de PDFWINDOWS para quien prefiere un workspace único en lugar de saltar entre landing pages — manteniendo la misma arquitectura offline-first.',
      toolName: 'Conversor Completo',
      benefits: [
        'Cola única para operaciones mixtas de PDF e imagen',
        'Acceso a todos los tipos de conversión sin cambiar de página',
        'Pipeline de procesamiento 100% en el navegador',
        'Atajos de suite de productividad en la misma vista',
        'Ideal para flujos por lotes y usuarios avanzados',

      ],
      useCases: [
        {
          title: 'Lotes de documentos al fin del día',
          body: 'Asistentes administrativos encolan escaneos de la tarde para OCR, rotación y unión en un archivo antes de cerrar.',
        },
        {
          title: 'Pipeline de entrega fotográfica',
          body: 'Redimensione carpeta de sesión para web, convierta a WEBP y arme imágenes seleccionadas en PDF para cliente — en una sesión.',
        },
        {
          title: 'Migración de conversores en la nube',
          body: 'Equipos que reemplazan conversores de pago replican flujos multi-paso en un workbench local sin reenviar los mismos archivos.',
        },
        {
          title: 'Soporte de TI',
          body: 'Personal procesa archivos de usuarios en estaciones seguras sabiendo que nada sale del navegador durante la conversión.',
        },
        {
          title: 'Materiales de eventos',
          body: 'Organizadores comprimen PDFs de ponentes, marcan borradores y extraen texto para subtítulos de accesibilidad.',
        },
      ],
      howItWorks: [
        'Abra el conversor completo y añada archivos a la cola.',
        'Seleccione la operación para cada archivo o grupo.',
        'Revise orden de cola y configuraciones.',
        'Procese todos los ítems y descargue resultados localmente.',
      ],
      tips: [
        'Use páginas individuales cuando necesite guías SEO profundas para una operación.',
        'Ordene la cola con cuidado al unir — la secuencia define orden de páginas.',
        'Lotes grandes de OCR son intensivos en CPU; procese en partes en portátiles antiguos.',
        'Acceda herramientas de suite en la sección de productividad para QR, informes y documentos.',
        'Comprima tras unir para evitar comprimir archivos que descartará.',
        'Marque /conversor si es su uso diario en lugar del catálogo home.',
        'El workbench mantiene la última operación seleccionada en la sesión para conversiones repetidas más rápidas.',
      ],
      sections: [
        {
          id: 'workbench-vs-catalogo',
          heading: 'Workbench versus páginas del catálogo',
          level: 2,
          paragraphs: [
            'Páginas individuales como /pdf-merge o /image-resize ofrecen UX enfocada y contenido SEO educacional. El conversor completo agrega los mismos engines detrás de una cola para quien ya sabe lo que necesita.',
            'Ambos caminos usan las mismas bibliotecas locales — la elección es preferencia de flujo, no diferencia de capacidad.',
            'Usuarios nuevos pueden empezar en el catálogo y pasar al workbench cuando entiendan qué operaciones combinan con más frecuencia.',
          ],
        },
        {
          id: 'flujo-cola',
          heading: 'Flujo por lotes orientado por cola',
          level: 2,
          paragraphs: [
            'El modelo de cola refleja conversores de escritorio: añadir archivos, marcar operaciones, ejecutar. Como el procesamiento es síncrono en el navegador, ve progreso por ítem sin consultar estado remoto.',
            'Colas de medios mixtos están soportadas — PDFs e imágenes en una sesión — alineado a tareas reales de oficina.',
            'Al terminar un lote, sugerencias de herramientas relacionadas ayudan a encadenar comprimir, marca de agua o cifrar sin volver al catálogo.',
          ],
        },
        {
          id: 'integracion-suite',
          heading: 'Integración con suite de productividad',
          level: 2,
          paragraphs: [
            'La superficie del conversor incluye enlaces a herramientas de suite — Estudio de Documentos, Generador de Informes, códigos QR, Capturador de Colores y más.',
          ],
          bullets: [
            'Convertir escaneos → OCR → unir → comprimir paquete final',
            'Redimensionar imágenes → imagen a PDF → marca de agua',
            'Extraer texto → editar localmente → TXT a PDF',
          ],
        },
        {
          id: 'tips-rendimiento',
          heading: 'Rendimiento en hardware local',
          level: 2,
          paragraphs: [
            'Conversiones en el navegador escalan con CPU y RAM del dispositivo. Portátiles modernos manejan docenas de compresiones rápido; OCR en escaneos largos tarda más.',
            'Cierre pestañas no usadas antes de lotes grandes. Resultados descargan al instante — sin período de retención en la nube.',
            'Usuarios avanzados suelen mantener /conversor fijado junto con marcadores de herramientas individuales, alternando según la tarea sea exploratoria o por lotes.',
          ],
        },
      ],
      faq: [
        ...privacyFaq('es'),
        {
          q: '¿En qué difiere de las páginas individuales?',
          a: 'El conversor completo expone varias operaciones en una cola. Páginas individuales ofrecen UX enfocada y guías más ricos para tareas únicas.',
        },
        {
          q: '¿Puedo unir y comprimir en una cola?',
          a: 'Sí. Añada operaciones en secuencia — una primero, luego comprima el resultado en otro ítem de cola.',
        },
        {
          q: '¿Hay límite de cantidad de archivos?',
          a: 'Límites dependen de memoria del navegador, no de cuotas de servidor. Lotes enormes pueden necesitar división en dispositivos con poca RAM.',
        },
        {
          q: '¿El workbench incluye herramientas de suite?',
          a: 'Sí. Herramientas de productividad son accesibles en la misma página por la sección de suite.',
        },
        {
          q: '¿Puedo compartir presets de cola?',
          a: 'Colas son basadas en sesión. Documente pasos o use marcadores de herramientas individuales para flujos repetibles.',
        },
      ],
      relatedTools: ['/pdf-merge', '/pdf-compress', '/image-converter', '/pdf-ocr'],
      cta: defaultCta('es', 'Conversor Completo'),
    },
  },
};

/** Convenience exports for home and converter paths */
export const HOME_CONTENT = HOME_RICH_CONTENT['/'];
export const CONVERTER_CONTENT = HOME_RICH_CONTENT['/conversor'];
