import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const RAIO_X_ARQUIVO_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'File X-Ray Online Free | PDFWINDOWS',
    description:
      'Inspect metadata, structure, hashes, and EXIF for PDF, Word, Excel, and images in your browser. Fully local analysis—files never leave your device.',
    keywords:
      'file x-ray, analyze file metadata, pdf metadata, word metadata, excel metadata, hidden file info, EXIF, sha-256 hash',
    h1: 'File X-Ray',
    intro:
      'Before you share, archive, or dispute a document, you need to know what is actually inside the bytes—not what the filename suggests. PDFWINDOWS File X-Ray runs a structured, browser-local inspection of PDF, Office, image, text, and archive files. It surfaces identification data, cryptographic hashes, structural facts, authorship fields, dates, security flags, embedded objects, and image EXIF when those values exist in the file itself. Every field shows where it came from: PDF Info dictionary, OOXML core properties, EXIF segment, ZIP directory, or another verifiable source. When a value is missing, the report says so plainly instead of inventing metadata. You can copy individual fields, review a staged progress log, and export a PDF, JSON, or plain-text report for audits, handoffs, or incident notes—all without uploading the file to PDFWINDOWS servers.',
    toolName: 'File X-Ray',
    benefits: [
      'Supports PDF, DOCX, XLSX, PPTX, JPEG, PNG, WEBP, GIF, CSV, TXT, and ZIP',
      'SHA-256 as primary hash plus SHA-1 for integrity checks',
      'Field-level provenance labels so you know the source of each value',
      'Detects extension versus magic-byte mismatches when types disagree',
      'Export reports as PDF, JSON, or TXT for tickets and compliance notes',
      'No account, no cloud upload, and no retention of your documents',
    ],
    useCases: [
      {
        title: 'Vendor and attachment screening',
        body:
          'Review inbound proposals, invoices, and creative assets before they enter your workflow. Confirm author names, creation dates, embedded fonts, and security settings without sending sensitive files to an external metadata service.',
      },
      {
        title: 'Forensic handoffs and IT tickets',
        body:
          'Attach an exported JSON or PDF report to a help-desk ticket when investigating a mislabeled extension, unexpected macro container, or suspicious ZIP contents. SHA-256 gives reviewers a stable fingerprint even if the file is renamed later.',
      },
      {
        title: 'Privacy and redaction planning',
        body:
          'Identify EXIF GPS tags, camera serials, document properties, and hidden embedded files before publishing screenshots or client deliverables. Knowing what exists helps you strip the right layers locally.',
      },
      {
        title: 'Records management and retention',
        body:
          'Compare declared file types against detected formats when ingesting departmental archives. Flag inconsistencies early so misfiled spreadsheets, renamed executables, or extension tricks do not pollute long-term storage.',
      },
      {
        title: 'Design and document operations QA',
        body:
          'Verify page counts, font inventories, slide dimensions, and sheet statistics on production PDFs, Word briefs, Excel models, and PowerPoint decks. Pair the summary with Font Identifier when you need deeper typeface analysis.',
      },
    ],
    howItWorks: [
      'Select or drop a supported file from your device.',
      'Watch staged progress: detection, hashing, structure, metadata, content, and embedded checks.',
      'Review the summary, detailed panels, and any attention flags in the UI.',
      'Copy individual values or export a PDF, JSON, or TXT report.',
      'Run another file or close the tab when finished on shared workstations.',
    ],
    tips: [
      'Read the origin label beside each field—guessed or estimated values are marked separately from document-sourced facts.',
      'When extension and detected type disagree, treat the file as suspicious until you understand why they differ.',
      'Export JSON for machine-readable archives; use PDF when humans need a fixed layout for sign-off.',
      'Large ZIP listings may be truncated for performance—open the archive locally if you need every path.',
      'Image-only PDFs may show sparse font data; that honesty prevents false confidence about text layers.',
      'Pair File X-Ray with Extract Text or OCR when you need readable content, not just structural metadata.',
    ],
    sections: [
      {
        id: 'what-is-file-xray',
        heading: 'What File X-Ray is',
        level: 2,
        paragraphs: [
          'File X-Ray is a local inspection tool—not an editor, converter, or cloud scanner. You bring a file; the browser reads its bytes and builds a structured report of what can be proven from the container and its internal metadata channels.',
          'The goal is transparency for operators, designers, IT staff, and privacy reviewers who need a honest inventory before the next step in a workflow. It complements editing tools by answering “what is in here?” rather than changing the document.',
        ],
        bullets: [
          'Read-only analysis in the browser',
          'Staged progress so long files feel predictable',
          'Reports you can keep offline after export',
        ],
      },
      {
        id: 'what-you-can-discover',
        heading: 'What you can discover',
        level: 2,
        paragraphs: [
          'Depending on format, File X-Ray can surface identification (name, extension, browser MIME, detected type, magic signature), cryptographic hashes, authorship and application fields, multiple date stamps, statistics such as page, word, sheet, or slide counts, font lists, security and permission flags, internal structure notes, embedded attachments, image dimensions, and EXIF camera or location tags when present.',
          'PDF analysis reads document info, page tree facts, and security handlers where available. Office formats inspect OOXML core and extended properties plus package structure. Images parse EXIF and basic raster facts. CSV and TXT reports encoding hints, delimiters, and line statistics. ZIP entries list contained paths with sizes when the archive is readable.',
          'Each value carries a provenance note— for example “PDF /Info”, “DOCX core.xml”, or “EXIF IFD0”—so you can trace a field back to the part of the file that supplied it.',
        ],
        bullets: [
          'Hashes for integrity and ticket references',
          'Authorship, dates, and application metadata when embedded',
          'Structure, fonts, security, and embedded content panels',
          'EXIF and image facts for JPEG, PNG, WEBP, and GIF',
        ],
      },
      {
        id: 'supported-formats',
        heading: 'Supported formats',
        level: 2,
        paragraphs: [
          'File X-Ray accepts PDF, DOCX, XLSX, PPTX, common raster images (JPEG, PNG, WEBP, GIF), CSV, plain text, and ZIP archives within the on-page size limit. Detection combines file extension, browser-reported MIME type, and magic-byte signatures so a mislabeled file can still be analyzed under its true format when recognizable.',
          'Unsupported or severely damaged binaries fall back to generic identification and hashing. The UI states limits clearly instead of pretending a deep parse succeeded.',
        ],
        bullets: [
          'PDF — info dictionary, pages, fonts, security, embedded files',
          'DOCX / XLSX / PPTX — OOXML properties and package structure',
          'Images — dimensions, color, EXIF when the segment exists',
          'CSV / TXT — encoding, separators, counts',
          'ZIP — entry listing and container metadata',
        ],
      },
      {
        id: 'honest-metadata',
        heading: 'Hidden data and honest reporting',
        level: 2,
        paragraphs: [
          '“Hidden” does not mean invented. File X-Ray only reports additional information that is technically present—alternate date streams, trailing metadata, inconsistent type markers, or embedded objects—not narrative guesses about intent.',
          'When a field is absent, labels read as not available in the file rather than empty strings that look like facts. Estimated counts or inferred values, when shown, are flagged so they cannot be mistaken for direct metadata reads.',
          'Attention flags call out meaningful anomalies such as extension mismatches or unusual containers. They guide review; they do not automatically mean malware—human judgment still applies.',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Privacy and local processing',
        level: 2,
        paragraphs: [
          'Analysis runs entirely in your browser. File bytes stay in memory on your device and are not uploaded to PDFWINDOWS for parsing, storage, or model inference. Closing the tab clears the in-session analysis from the page context under normal browser behavior.',
          'Because processing is local, you can inspect confidential contracts, HR exports, medical attachments, and client creative without adding a cloud metadata vendor to your subprocessors list for this step. Export files land in your downloads folder under your control—apply your organization’s handling rules before sharing them further.',
        ],
        bullets: [
          'No upload and no server-side retention',
          'Works offline after the tool page loads',
          'Exports stay on your device until you move them',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Where File X-Ray fits your workflow',
        level: 3,
        paragraphs: [
          'Typical sequence: File X-Ray for inventory → Font Identifier or Extract Text for content-specific follow-up → OCR when scans lack text layers → compress or merge once you understand what the file contains.',
          'Use hashes from File X-Ray as stable references in change-management tickets. When metadata must be removed before publication, run X-Ray first to know which layers exist, then apply redaction or EXIF stripping with appropriate tools.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does File X-Ray invent metadata?',
        a: 'No. Fields appear only when the analyzer can read them from the file. Missing values are labeled as not available rather than filled with placeholders.',
      },
      {
        q: 'What does the origin label next to a field mean?',
        a: 'It names the part of the file that supplied the value—such as a PDF Info entry, OOXML core property, or EXIF tag—so you can verify provenance.',
      },
      {
        q: 'Which file types are supported?',
        a: 'PDF, DOCX, XLSX, PPTX, JPEG, PNG, WEBP, GIF, CSV, TXT, and ZIP. Other types receive basic identification and hashes when possible.',
      },
      {
        q: 'Can I export the analysis report?',
        a: 'Yes. Download a PDF, JSON, or plain-text report after the scan completes. Exports are generated locally in your browser.',
      },
      {
        q: 'Why might the detected type differ from the file extension?',
        a: 'Some files are renamed or saved with the wrong extension. File X-Ray compares magic bytes to the declared extension and flags inconsistencies when they disagree.',
      },
    ],
    relatedTools: ['/identificador-de-fontes', '/pdf-extract-text', '/pdf-ocr'],
    cta: defaultCta('en', 'File X-Ray'),
  },
  pt: {
    title: 'Raio X de Arquivo Online Grátis | PDFWINDOWS',
    description:
      'Analise metadados, estrutura, hashes e EXIF de PDF, Word, Excel e imagens no navegador. Processamento 100% local—arquivos nunca saem do dispositivo.',
    keywords:
      'raio x de arquivo, analisar metadados, metadados pdf, metadados word, metadados excel, informações ocultas arquivo, EXIF, hash sha-256',
    h1: 'Raio X de Arquivo',
    intro:
      'Antes de compartilhar ou arquivar um documento, você precisa saber o que está nos bytes — não só o que o nome sugere. O Raio X de Arquivo do PDFWINDOWS inspeciona PDF, Office, imagens, texto e ZIP localmente no navegador. Exibe identificação, hashes, estrutura, autoria, datas, segurança, objetos incorporados e EXIF quando existem no arquivo. Cada campo mostra a origem: Info do PDF, core OOXML, EXIF ou diretório ZIP. Valores ausentes são reportados com honestidade. Copie campos, acompanhe etapas e exporte PDF, JSON ou TXT — sem upload ao PDFWINDOWS.',
    toolName: 'Raio X de Arquivo',
    benefits: [
      'Suporta PDF, DOCX, XLSX, PPTX, JPEG, PNG, WEBP, GIF, CSV, TXT e ZIP',
      'Hash SHA-256 com SHA-1 para checagem de integridade',
      'Rótulos de origem por campo para você saber a fonte de cada valor',
      'Detecta divergência entre extensão e assinatura real quando os tipos discordam',
      'Exporta relatórios em PDF, JSON ou TXT para chamados e conformidade',
      'Sem conta, sem upload na nuvem e sem retenção dos seus documentos',
    ],
    useCases: [
      {
        title: 'Triagem de fornecedores e anexos',
        body:
          'Revise propostas, notas fiscais e peças criativas recebidas antes de entrarem no fluxo. Confirme autores, datas de criação, fontes incorporadas e configurações de segurança sem enviar arquivos sensíveis a um serviço externo de metadados.',
      },
      {
        title: 'Repasses forenses e chamados de TI',
        body:
          'Anexe um JSON ou PDF exportado ao ticket ao investigar extensão errada, contêiner inesperado ou conteúdo suspeito em ZIP. O SHA-256 oferece uma impressão digital estável mesmo se o arquivo for renomeado depois.',
      },
      {
        title: 'Planejamento de privacidade e redação',
        body:
          'Identifique tags GPS no EXIF, serial de câmera, propriedades de documento e arquivos incorporados ocultos antes de publicar capturas ou entregas a clientes. Saber o que existe ajuda a remover as camadas certas localmente.',
      },
      {
        title: 'Gestão documental e retenção',
        body:
          'Compare tipos declarados com formatos detectados ao ingerir arquivos departamentais. Sinalize inconsistências cedo para que planilhas mal classificadas, executáveis renomeados ou truques de extensão não poluam o acervo de longo prazo.',
      },
      {
        title: 'QA de design e operações documentais',
        body:
          'Verifique contagem de páginas, inventário de fontes, dimensões de slides e estatísticas de planilhas em PDFs de produção, briefs Word, modelos Excel e decks PowerPoint. Combine o resumo com o Identificador de Fontes quando precisar de análise tipográfica mais profunda.',
      },
    ],
    howItWorks: [
      'Selecione ou solte um arquivo compatível do seu dispositivo.',
      'Acompanhe as etapas: detecção, hash, estrutura, metadados, conteúdo e incorporados.',
      'Revise o resumo, painéis detalhados e alertas de atenção na interface.',
      'Copie valores individuais ou exporte relatório em PDF, JSON ou TXT.',
      'Analise outro arquivo ou feche a aba ao terminar em estações compartilhadas.',
    ],
    tips: [
      'Leia o rótulo de origem ao lado de cada campo — valores estimados são marcados à parte de fatos lidos no documento.',
      'Quando extensão e tipo detectado discordam, trate o arquivo como suspeito até entender a diferença.',
      'Exporte JSON para arquivos legíveis por máquina; use PDF quando humanos precisarem de layout fixo para aprovação.',
      'Listagens grandes de ZIP podem ser truncadas por desempenho — abra o arquivo localmente se precisar de todos os caminhos.',
      'PDFs só de imagem podem mostrar poucos dados de fonte; essa honestidade evita falsa confiança sobre camadas de texto.',
      'Combine o Raio X com Extrair Texto ou OCR quando precisar de conteúdo legível, não só metadados estruturais.',
    ],
    sections: [
      {
        id: 'what-is-file-xray',
        heading: 'O que é o Raio X de Arquivo',
        level: 2,
        paragraphs: [
          'O Raio X de Arquivo é uma ferramenta de inspeção local — não um editor, conversor ou scanner na nuvem. Você traz um arquivo; o navegador lê os bytes e monta um relatório estruturado do que pode ser comprovado a partir do contêiner e dos canais internos de metadados.',
          'O objetivo é transparência para operadores, designers, equipes de TI e revisores de privacidade que precisam de um inventário honesto antes da próxima etapa do fluxo. Ele complementa ferramentas de edição respondendo “o que há aqui?” em vez de alterar o documento.',
        ],
        bullets: [
          'Análise somente leitura no navegador',
          'Progresso por etapas para arquivos longos',
          'Relatórios que você guarda offline após exportar',
        ],
      },
      {
        id: 'what-you-can-discover',
        heading: 'O que você pode descobrir',
        level: 2,
        paragraphs: [
          'Conforme o formato, o Raio X exibe identificação, hashes, autoria, datas, estatísticas, fontes, segurança, estrutura interna, anexos incorporados e EXIF quando presentes.',
          'PDFs, Office, imagens, CSV, TXT e ZIP são lidos pelos canais de metadados correspondentes. Cada valor traz procedência — por exemplo “PDF /Info” ou “EXIF IFD0”.',
        ],
        bullets: [
          'Hashes para integridade e referência em chamados',
          'Autoria, datas e metadados de aplicativo quando incorporados',
          'Painéis de estrutura, fontes, segurança e conteúdo incorporado',
          'EXIF e fatos de imagem para JPEG, PNG, WEBP e GIF',
        ],
      },
      {
        id: 'supported-formats',
        heading: 'Formatos suportados',
        level: 2,
        paragraphs: [
          'O Raio X aceita PDF, DOCX, XLSX, PPTX, imagens raster comuns (JPEG, PNG, WEBP, GIF), CSV, texto puro e arquivos ZIP dentro do limite de tamanho da página. A detecção combina extensão, MIME reportado pelo navegador e assinaturas mágicas para que um arquivo mal rotulado ainda seja analisado pelo formato real quando reconhecível.',
          'Binários não suportados ou muito danificados caem em identificação genérica e hash. A interface declara limites com clareza em vez de fingir uma análise profunda bem-sucedida.',
        ],
        bullets: [
          'PDF — dicionário info, páginas, fontes, segurança, arquivos incorporados',
          'DOCX / XLSX / PPTX — propriedades OOXML e estrutura do pacote',
          'Imagens — dimensões, cor, EXIF quando o segmento existe',
          'CSV / TXT — codificação, separadores, contagens',
          'ZIP — listagem de entradas e metadados do contêiner',
        ],
      },
      {
        id: 'honest-metadata',
        heading: 'Dados ocultos e relatório honesto',
        level: 2,
        paragraphs: [
          '“Oculto” não significa inventado. O Raio X só reporta informação adicional tecnicamente presente — fluxos alternativos de data, metadados residuais, marcadores de tipo inconsistentes ou objetos incorporados — não palpites narrativos sobre intenção.',
          'Quando um campo está ausente, os rótulos indicam que não está disponível no arquivo em vez de strings vazias que parecem fatos. Contagens estimadas ou valores inferidos, quando exibidos, são sinalizados para não serem confundidos com leituras diretas de metadados.',
          'Alertas de atenção destacam anomalias relevantes como divergência de extensão ou contêineres incomuns. Eles orientam a revisão; não significam automaticamente malware — o julgamento humano ainda se aplica.',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Privacidade e processamento local',
        level: 2,
        paragraphs: [
          'A análise roda inteiramente no seu navegador. Os bytes do arquivo ficam na memória do dispositivo e não são enviados ao PDFWINDOWS para parsing, armazenamento ou inferência de modelos. Fechar a aba limpa a análise da sessão no contexto normal do navegador.',
          'Como o processamento é local, você pode inspecionar contratos confidenciais, exportações de RH, anexos médicos e material criativo de clientes sem adicionar um fornecedor de metadados na nuvem à lista de subprocessadores nesta etapa. Os arquivos exportados vão para sua pasta de downloads sob seu controle — aplique as regras da organização antes de compartilhá-los.',
        ],
        bullets: [
          'Sem upload e sem retenção no servidor',
          'Funciona offline após carregar a página da ferramenta',
          'Exportações ficam no dispositivo até você movê-las',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Onde o Raio X entra no seu fluxo',
        level: 3,
        paragraphs: [
          'Sequência típica: Raio X para inventário → Identificador de Fontes ou Extrair Texto para follow-up específico → OCR quando scans não têm camada de texto → comprimir ou mesclar depois de entender o conteúdo.',
          'Use hashes do Raio X como referências estáveis em chamados de gestão de mudança. Quando metadados precisam ser removidos antes da publicação, rode o Raio X primeiro para saber quais camadas existem e então aplique redação ou remoção de EXIF com ferramentas adequadas.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'O Raio X inventa metadados?',
        a: 'Não. Campos aparecem apenas quando o analisador consegue lê-los no arquivo. Valores ausentes são rotulados como não disponíveis em vez de preenchidos com placeholders.',
      },
      {
        q: 'O que significa o rótulo de origem ao lado de um campo?',
        a: 'Ele nomeia a parte do arquivo que forneceu o valor — como entrada Info do PDF, propriedade core OOXML ou tag EXIF — para você verificar a procedência.',
      },
      {
        q: 'Quais tipos de arquivo são suportados?',
        a: 'PDF, DOCX, XLSX, PPTX, JPEG, PNG, WEBP, GIF, CSV, TXT e ZIP. Outros tipos recebem identificação básica e hashes quando possível.',
      },
      {
        q: 'Posso exportar o relatório de análise?',
        a: 'Sim. Baixe PDF, JSON ou TXT após concluir a varredura. As exportações são geradas localmente no navegador.',
      },
      {
        q: 'Por que o tipo detectado pode diferir da extensão?',
        a: 'Alguns arquivos são renomeados ou salvos com extensão errada. O Raio X compara bytes mágicos à extensão declarada e sinaliza inconsistências quando discordam.',
      },
    ],
    relatedTools: ['/identificador-de-fontes', '/pdf-extract-text', '/pdf-ocr'],
    cta: defaultCta('pt', 'Raio X de Arquivo'),
  },
  es: {
    title: 'Rayos X de Archivo Online Gratis | PDFWINDOWS',
    description:
      'Analice metadatos, estructura, hashes y EXIF de PDF, Word, Excel e imágenes en el navegador. Análisis 100% local—los archivos no salen de su dispositivo.',
    keywords:
      'rayos x de archivo, analizar metadatos, metadatos pdf, metadatos word, metadatos excel, información oculta archivo, EXIF, hash sha-256',
    h1: 'Rayos X de Archivo',
    intro:
      'Antes de compartir o archivar un documento, necesita saber qué hay en los bytes — no solo lo que sugiere el nombre. Rayos X de Archivo de PDFWINDOWS inspecciona PDF, Office, imágenes, texto y ZIP localmente en el navegador. Muestra identificación, hashes, estructura, autoría, fechas, seguridad, objetos incrustados y EXIF cuando existen en el archivo. Cada campo indica el origen: Info del PDF, core OOXML, EXIF o directorio ZIP. Los valores ausentes se reportan con honestidad. Copie campos, siga etapas y exporte PDF, JSON o TXT — sin subir el archivo a PDFWINDOWS.',
    toolName: 'Rayos X de Archivo',
    benefits: [
      'Compatible con PDF, DOCX, XLSX, PPTX, JPEG, PNG, WEBP, GIF, CSV, TXT y ZIP',
      'Hash SHA-256 con SHA-1 para comprobación de integridad',
      'Etiquetas de origen por campo para conocer la fuente de cada valor',
      'Detecta discrepancias entre extensión y firma real cuando los tipos no coinciden',
      'Exporta informes en PDF, JSON o TXT para tickets y cumplimiento',
      'Sin cuenta, sin subida a la nube y sin retención de sus documentos',
    ],
    useCases: [
      {
        title: 'Filtrado de proveedores y adjuntos',
        body:
          'Revise propuestas, facturas y activos creativos entrantes antes de que entren en su flujo. Confirme autores, fechas de creación, fuentes incrustadas y ajustes de seguridad sin enviar archivos sensibles a un servicio externo de metadatos.',
      },
      {
        title: 'Entregas forenses y tickets de TI',
        body:
          'Adjunte un JSON o PDF exportado al ticket al investigar una extensión mal etiquetada, contenedor inesperado o contenido sospechoso en ZIP. SHA-256 ofrece una huella estable aunque el archivo se renombre después.',
      },
      {
        title: 'Planificación de privacidad y redacción',
        body:
          'Identifique etiquetas GPS en EXIF, serial de cámara, propiedades del documento y archivos incrustados ocultos antes de publicar capturas o entregables a clientes. Saber qué existe ayuda a eliminar las capas correctas en local.',
      },
      {
        title: 'Gestión documental y retención',
        body:
          'Compare tipos declarados con formatos detectados al ingerir archivos departamentales. Marque inconsistencias pronto para que hojas mal clasificadas, ejecutables renombrados o trucos de extensión no contaminen el archivo a largo plazo.',
      },
      {
        title: 'Control de calidad de diseño y operaciones documentales',
        body:
          'Verifique recuentos de páginas, inventarios de fuentes, dimensiones de diapositivas y estadísticas de hojas en PDF de producción, briefs Word, modelos Excel y decks PowerPoint. Combine el resumen con Identificador de Fuentes cuando necesite análisis tipográfico más profundo.',
      },
    ],
    howItWorks: [
      'Seleccione o suelte un archivo compatible desde su dispositivo.',
      'Siga el progreso por etapas: detección, hash, estructura, metadatos, contenido e incrustados.',
      'Revise el resumen, paneles detallados y alertas de atención en la interfaz.',
      'Copie valores individuales o exporte un informe en PDF, JSON o TXT.',
      'Analice otro archivo o cierre la pestaña al terminar en estaciones compartidas.',
    ],
    tips: [
      'Lea la etiqueta de origen junto a cada campo — los valores estimados se marcan aparte de hechos leídos en el documento.',
      'Cuando la extensión y el tipo detectado difieren, trate el archivo como sospechoso hasta entender por qué.',
      'Exporte JSON para archivos legibles por máquina; use PDF cuando humanos necesiten un diseño fijo para aprobación.',
      'Listados grandes de ZIP pueden truncarse por rendimiento — abra el archivo en local si necesita todas las rutas.',
      'PDF solo imagen pueden mostrar pocos datos de fuentes; esa honestidad evita falsa confianza sobre capas de texto.',
      'Combine Rayos X con Extraer Texto u OCR cuando necesite contenido legible, no solo metadatos estructurales.',
    ],
    sections: [
      {
        id: 'what-is-file-xray',
        heading: 'Qué es Rayos X de Archivo',
        level: 2,
        paragraphs: [
          'Rayos X de Archivo es una herramienta de inspección local — no un editor, conversor o escáner en la nube. Usted aporta un archivo; el navegador lee sus bytes y construye un informe estructurado de lo que puede demostrarse a partir del contenedor y sus canales internos de metadatos.',
          'El objetivo es transparencia para operadores, diseñadores, equipos de TI y revisores de privacidad que necesitan un inventario honesto antes del siguiente paso del flujo. Complementa herramientas de edición respondiendo “¿qué hay aquí?” en lugar de modificar el documento.',
        ],
        bullets: [
          'Análisis de solo lectura en el navegador',
          'Progreso por etapas para archivos largos',
          'Informes que conserva offline tras exportar',
        ],
      },
      {
        id: 'what-you-can-discover',
        heading: 'Qué puede descubrir',
        level: 2,
        paragraphs: [
          'Según el formato, Rayos X muestra identificación, hashes, autoría, fechas, estadísticas, fuentes, seguridad, estructura interna, adjuntos incrustados y EXIF cuando están presentes.',
          'PDF, Office, imágenes, CSV, TXT y ZIP se leen por sus canales de metadatos. Cada valor incluye procedencia — por ejemplo “PDF /Info” o “EXIF IFD0”.',
        ],
        bullets: [
          'Hashes para integridad y referencias en tickets',
          'Autoría, fechas y metadatos de aplicación cuando están incrustados',
          'Paneles de estructura, fuentes, seguridad y contenido incrustado',
          'EXIF y hechos de imagen para JPEG, PNG, WEBP y GIF',
        ],
      },
      {
        id: 'supported-formats',
        heading: 'Formatos compatibles',
        level: 2,
        paragraphs: [
          'Rayos X acepta PDF, DOCX, XLSX, PPTX, imágenes raster comunes (JPEG, PNG, WEBP, GIF), CSV, texto plano y archivos ZIP dentro del límite de tamaño de la página. La detección combina extensión, MIME reportado por el navegador y firmas mágicas para que un archivo mal etiquetado aún se analice bajo su formato real cuando sea reconocible.',
          'Binarios no compatibles o muy dañados recurren a identificación genérica y hash. La interfaz declara límites con claridad en lugar de fingir un análisis profundo exitoso.',
        ],
        bullets: [
          'PDF — diccionario info, páginas, fuentes, seguridad, archivos incrustados',
          'DOCX / XLSX / PPTX — propiedades OOXML y estructura del paquete',
          'Imágenes — dimensiones, color, EXIF cuando existe el segmento',
          'CSV / TXT — codificación, separadores, recuentos',
          'ZIP — listado de entradas y metadatos del contenedor',
        ],
      },
      {
        id: 'honest-metadata',
        heading: 'Datos ocultos e informes honestos',
        level: 2,
        paragraphs: [
          '“Oculto” no significa inventado. Rayos X solo informa información adicional técnicamente presente — flujos alternativos de fecha, metadatos residuales, marcadores de tipo inconsistentes u objetos incrustados — no suposiciones narrativas sobre intención.',
          'Cuando falta un campo, las etiquetas indican que no está disponible en el archivo en lugar de cadenas vacías que parecen hechos. Recuentos estimados o valores inferidos, cuando se muestran, se señalan para no confundirlos con lecturas directas de metadatos.',
          'Las alertas de atención destacan anomalías relevantes como discrepancias de extensión o contenedores inusuales. Orientan la revisión; no significan automáticamente malware — el juicio humano sigue aplicando.',
        ],
      },
      {
        id: 'privacy-local',
        heading: 'Privacidad y procesamiento local',
        level: 2,
        paragraphs: [
          'El análisis se ejecuta por completo en su navegador. Los bytes del archivo permanecen en la memoria de su dispositivo y no se suben a PDFWINDOWS para análisis, almacenamiento o inferencia de modelos. Cerrar la pestaña limpia el análisis de la sesión en el contexto normal del navegador.',
          'Como el procesamiento es local, puede inspeccionar contratos confidenciales, exportaciones de RR. HH., adjuntos médicos y material creativo de clientes sin añadir un proveedor de metadatos en la nube a su lista de subprocesadores en este paso. Los archivos exportados van a su carpeta de descargas bajo su control — aplique las reglas de su organización antes de compartirlos.',
        ],
        bullets: [
          'Sin subida y sin retención en servidor',
          'Funciona offline tras cargar la página de la herramienta',
          'Las exportaciones permanecen en el dispositivo hasta que las mueva',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Dónde encaja Rayos X en su flujo',
        level: 3,
        paragraphs: [
          'Secuencia típica: Rayos X para inventario → Identificador de Fuentes o Extraer Texto para seguimiento específico → OCR cuando los escaneos carecen de capa de texto → comprimir o unir una vez entienda qué contiene el archivo.',
          'Use hashes de Rayos X como referencias estables en tickets de gestión de cambios. Cuando los metadatos deben eliminarse antes de publicar, ejecute Rayos X primero para saber qué capas existen y luego aplique redacción o eliminación de EXIF con herramientas adecuadas.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Rayos X inventa metadatos?',
        a: 'No. Los campos aparecen solo cuando el analizador puede leerlos del archivo. Los valores ausentes se etiquetan como no disponibles en lugar de rellenarse con marcadores.',
      },
      {
        q: '¿Qué significa la etiqueta de origen junto a un campo?',
        a: 'Nombra la parte del archivo que aportó el valor — como entrada Info del PDF, propiedad core OOXML o etiqueta EXIF — para verificar la procedencia.',
      },
      {
        q: '¿Qué tipos de archivo son compatibles?',
        a: 'PDF, DOCX, XLSX, PPTX, JPEG, PNG, WEBP, GIF, CSV, TXT y ZIP. Otros tipos reciben identificación básica y hashes cuando es posible.',
      },
      {
        q: '¿Puedo exportar el informe de análisis?',
        a: 'Sí. Descargue PDF, JSON o TXT tras completar el escaneo. Las exportaciones se generan localmente en su navegador.',
      },
      {
        q: '¿Por qué el tipo detectado puede diferir de la extensión?',
        a: 'Algunos archivos se renombran o guardan con extensión incorrecta. Rayos X compara bytes mágicos con la extensión declarada y marca inconsistencias cuando no coinciden.',
      },
    ],
    relatedTools: ['/identificador-de-fontes', '/pdf-extract-text', '/pdf-ocr'],
    cta: defaultCta('es', 'Rayos X de Archivo'),
  },
};
