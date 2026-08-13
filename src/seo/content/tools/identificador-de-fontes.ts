import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const IDENTIFICADOR_FONTES_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Font Identifier for PDF & Word Free | PDFWINDOWS',
    description:
      'Identify fonts in PDF and DOCX locally in your browser. Direct matches show high confidence; otherwise we estimate similarity without false certainty.',
    keywords:
      'font identifier, identify pdf font, find word document font, discover font used, free font detector offline',
    h1: 'Font Identifier',
    intro:
      'Brand guidelines, design handoffs, and template remediation all depend on knowing which typefaces a file actually uses. PDFWINDOWS Font Identifier inspects PDF font dictionaries and DOCX OOXML font tables entirely in your browser, so confidential layouts never leave your device. When a document embeds real font names, results are labeled as identified in the document with high confidence. When names are missing, generic, or substituted, we compare available cues against a curated set of common families and surface estimated similarity — never pretending a guess is forensic certainty. The goal is practical clarity for designers, marketers, and document ops teams who need an honest readout before publishing or rebuilding a file.',
    toolName: 'Font Identifier',
    benefits: [
      'Works with PDF and DOCX offline after the page loads',
      'Clear split between fonts identified in the document and estimated similarity',
      'Per-element breakdown when titles, headings, and body styles differ',
      'Subset prefixes such as ABCDEF+Arial are normalized for readable names',
      'No upload — analysis stays in browser memory on your machine',
      'Honest empty results for image-only scans that lack font dictionaries',
    ],
    useCases: [
      {
        title: 'Brand compliance reviews',
        body:
          'Check whether a delivered PDF brochure or Word brief uses approved corporate typefaces before it reaches print, the website, or an executive inbox. Spot unauthorized substitutes early and request a corrected export from the agency or internal designer.',
      },
      {
        title: 'Design handoff audits',
        body:
          'Confirm title versus body fonts in client PDFs without opening desktop font managers. Share the results table with stakeholders so everyone agrees on the type stack before production begins.',
      },
      {
        title: 'Document remediation',
        body:
          'List embedded fonts before converting scans, rebuilding templates, or migrating legacy Word files into a new design system. Knowing what is already there prevents accidental style drift.',
      },
      {
        title: 'Vendor and contractor QC',
        body:
          'Agencies and freelancers often deliver mixed exports. Run each package through Font Identifier to verify that licensed families appear as expected and that placeholder fonts did not survive into the final PDF.',
      },
      {
        title: 'Accessibility and readability planning',
        body:
          'When teams evaluate readable type for long-form reports, a local font inventory helps decide whether body text relies on dense decorative faces that should be replaced before wider distribution.',
      },
    ],
    howItWorks: [
      'Drop a PDF or DOCX into the workspace on this page.',
      'The browser reads font tables, BaseFont entries, and OOXML font references locally.',
      'Review the results table and detailed cards for each detected style.',
      'Distinguish high-confidence identified names from estimated similarity rows.',
      'Run again with another document when you are ready — nothing is stored on PDFWINDOWS servers.',
    ],
    tips: [
      'Subset prefixes like ABCDEF+Arial are normalized before display so you see the underlying family name.',
      'Estimated similarity is comparative against common families, not a guarantee of the exact commercial font file.',
      'Encrypted PDFs that require an open password may need Unlock PDF before font tables can be read.',
      'Image-only scans usually have no font dictionary — use OCR first if you need text, not font names.',
      'For Word files, keep the DOCX extension; legacy binary .doc is not the same OOXML package.',
      'Compare multiple exports of the same design to catch last-minute font substitutions.',
    ],
    sections: [
      {
        id: 'direct-vs-estimate',
        heading: 'Direct identification versus similarity estimates',
        level: 2,
        paragraphs: [
          'Direct identification means the font name appears in PDF BaseFont or FontName entries, or in DOCX fontTable and style definitions. We label those results as identified in the document because the evidence lives inside the file itself.',
          'When only partial cues exist — generic names, missing embeds, or heavily subsetted streams — we compare against a curated list of common families and show estimated similarity percentages plus alternatives. That transparency helps you decide whether to dig deeper in a desktop font tool or ask the author for a clean export.',
        ],
        bullets: [
          'Identified in document = name present in structural font data',
          'Estimated similarity = best comparative match when names are incomplete',
          'No invented certainty for scans or flattened artwork',
        ],
      },
      {
        id: 'formats-privacy',
        heading: 'Accepted formats and local privacy',
        level: 2,
        paragraphs: [
          'Upload PDF or DOCX only. Processing is entirely client-side with pdf.js for PDF inspection and JSZip for OOXML packages. Files are not sent to PDFWINDOWS servers; bytes stay in browser memory for the session you control.',
          'Local processing matters when brand books, unreleased campaigns, or legal layouts cannot leave a managed device. You get the same audit-friendly workflow whether you are on a laptop in the office or offline after the first page load.',
        ],
      },
      {
        id: 'pdf-font-internals',
        heading: 'How PDF font dictionaries expose names',
        level: 2,
        paragraphs: [
          'PDF text operators reference font resources that declare BaseFont names, encodings, and sometimes embedded font programs. Design tools often subset those programs, which is why you may see six-character prefixes before the real family name. Font Identifier normalizes those prefixes so reports stay readable for non-engineers.',
          'When a PDF embeds only outlines without useful names, or when text was converted to curves, there may be nothing meaningful to report. In that case the tool states that no identifiable fonts were found rather than fabricating a match.',
        ],
      },
      {
        id: 'docx-font-tables',
        heading: 'Reading fonts from Word DOCX packages',
        level: 2,
        paragraphs: [
          'A DOCX file is a ZIP of XML parts. Font declarations typically appear in word/fontTable.xml and in style definitions under word/styles.xml. Theme fonts and run-level overrides can introduce additional families beyond the document defaults.',
          'Because analysis happens in the browser, you can inspect sensitive contracts or HR templates without uploading them to a third-party font recognition service. Download nothing extra — the insight is the on-screen report.',
        ],
        bullets: [
          'Theme fonts vs explicit run fonts can both appear in results',
          'Missing embeds still leave declared names in the package',
          'Keep originals; this tool never overwrites your file',
        ],
      },
      {
        id: 'workflow',
        heading: 'Where Font Identifier fits your document workflow',
        level: 3,
        paragraphs: [
          'Use Font Identifier early in QA: after design export, before print, and again after any merge or watermark step that might substitute fonts. Pair it with Extract Text when you need content sampling, or with Unlock PDF when encryption blocks dictionary reads.',
          'Teams that maintain a living brand checklist can paste result summaries into tickets so designers know exactly which families failed compliance. The clearer the label — identified versus estimated — the fewer false alarms you create for legal or marketing reviewers.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can it identify fonts from a scanned image-only PDF?',
        a: 'Image-only scans usually lack font dictionaries. The tool reports that no identifiable fonts were found rather than inventing matches. Run OCR if you need text recovery, not font names.',
      },
      {
        q: 'What does estimated similarity mean?',
        a: 'It means the file did not provide a clear embedded name, so we compared available cues against common families. Treat percentages as guidance for further checking, not absolute proof of a licensed font file.',
      },
      {
        q: 'Does Font Identifier change my document?',
        a: 'No. It only reads font metadata and presents a report. Your original PDF or DOCX stays untouched on disk.',
      },
      {
        q: 'Why do I see strange prefixes before font names?',
        a: 'PDF subsetting often adds tags like ABCDEF+ before the family name. We normalize those prefixes so the underlying name is easier to read.',
      },
    ],
    relatedTools: ['/pdf-ocr', '/pdf-extract-text', '/desbloquear-pdf'],
    cta: defaultCta('en', 'Font Identifier'),
  },
  pt: {
    title: 'Identificador de Fontes PDF e Word Grátis | PDFWINDOWS',
    description:
      'Identifique fontes em PDF e DOCX localmente no navegador. Correspondências diretas têm alta confiança; senão estimamos similaridade sem falsa certeza.',
    keywords:
      'identificador de fontes, identificar fonte pdf, descobrir fonte word, qual fonte do documento, identificar fonte gratis',
    h1: 'Identificador de Fontes',
    intro:
      'Guias de marca, handoffs de design e remediação de modelos dependem de saber quais tipografias um arquivo realmente usa. O Identificador de Fontes do PDFWINDOWS inspeciona dicionários de fonte de PDF e tabelas OOXML de DOCX inteiramente no navegador, para que layouts confidenciais não saiam do seu dispositivo. Quando o documento embute nomes reais, o resultado é marcado como identificado no documento com alta confiança. Quando faltam nomes, há genéricos ou substituições, comparamos pistas disponíveis com famílias comuns e exibimos similaridade estimada — nunca fingindo certeza forense. O objetivo é clareza prática para designers, marketing e operações documentais antes de publicar ou reconstruir um arquivo.',
    toolName: 'Identificador de Fontes',
    benefits: [
      'Funciona com PDF e DOCX offline após carregar a página',
      'Separa fonte identificada no documento de similaridade estimada',
      'Quebra por elemento quando título, cabeçalhos e corpo diferem',
      'Prefixos de subset como ABCDEF+Arial são normalizados',
      'Sem upload — análise na memória do navegador no seu equipamento',
      'Resultados honestos vazios para digitalizações só de imagem',
    ],
    useCases: [
      {
        title: 'Conformidade de marca',
        body:
          'Verifique se o PDF ou Word entregue usa tipografias corporativas aprovadas antes da impressão, do site ou da caixa de entrada executiva. Detecte substituições não autorizadas cedo e peça exportação corrigida à agência ou ao designer interno.',
      },
      {
        title: 'Auditoria de handoff',
        body:
          'Confirme fontes de título e corpo em PDFs de clientes sem abrir gerenciadores de fonte. Compartilhe a tabela de resultados para alinhar a pilha tipográfica antes da produção.',
      },
      {
        title: 'Remediação documental',
        body:
          'Liste fontes embutidas antes de converter digitalizações, reconstruir modelos ou migrar Word legado para um novo design system. Saber o que já existe evita deriva de estilo.',
      },
      {
        title: 'QC de fornecedores e freelancers',
        body:
          'Agências e freelancers costumam entregar pacotes mistos. Passe cada arquivo pelo Identificador de Fontes para confirmar famílias licenciadas e garantir que fontes placeholder não chegaram ao PDF final.',
      },
      {
        title: 'Planejamento de legibilidade',
        body:
          'Ao avaliar tipografia para relatórios longos, um inventário local ajuda a decidir se o corpo usa faces decorativas densas que deveriam ser trocadas antes da distribuição ampla.',
      },
    ],
    howItWorks: [
      'Arraste um PDF ou DOCX para a área de trabalho nesta página.',
      'O navegador lê tabelas de fonte, entradas BaseFont e referências OOXML localmente.',
      'Revise a tabela e os cards detalhados de cada estilo detectado.',
      'Distinga nomes identificados com alta confiança de linhas de similaridade estimada.',
      'Analise outro documento quando quiser — nada é armazenado em servidores do PDFWINDOWS.',
    ],
    tips: [
      'Prefixos de subset como ABCDEF+Arial são normalizados antes da exibição.',
      'Similaridade estimada é comparativa com famílias comuns, não garantia do arquivo comercial exato.',
      'PDFs com senha de abertura podem precisar da ferramenta Desbloquear PDF antes.',
      'Digitalizações só de imagem geralmente não têm dicionário de fontes — use OCR se precisar de texto.',
      'Para Word, use extensão DOCX; o .doc binário legado não é o mesmo pacote OOXML.',
      'Compare várias exportações do mesmo design para pegar substituições de última hora.',
    ],
    sections: [
      {
        id: 'direct-vs-estimate',
        heading: 'Identificação direta versus estimativa de similaridade',
        level: 2,
        paragraphs: [
          'Identificação direta significa que o nome aparece em BaseFont/FontName do PDF ou na fontTable e estilos do DOCX. Rotulamos esses resultados como identificados no documento porque a evidência está no próprio arquivo.',
          'Quando há apenas pistas parciais — nomes genéricos, embeds ausentes ou streams fortemente subsetados — comparamos com uma lista de famílias comuns e exibimos similaridade estimada e alternativas. Essa transparência ajuda a decidir se vale aprofundar em uma ferramenta desktop ou pedir uma exportação limpa ao autor.',
        ],
        bullets: [
          'Identificado no documento = nome presente nos dados estruturais de fonte',
          'Similaridade estimada = melhor correspondência comparativa quando o nome está incompleto',
          'Sem certeza inventada para scans ou arte flattenada',
        ],
      },
      {
        id: 'formats-privacy',
        heading: 'Formatos aceitos e privacidade local',
        level: 2,
        paragraphs: [
          'Aceitamos PDF ou DOCX. O processamento é inteiramente client-side com pdf.js para PDF e JSZip para pacotes OOXML. Os arquivos não são enviados aos servidores do PDFWINDOWS; os bytes ficam na memória do navegador na sessão que você controla.',
          'Processar localmente importa quando brand books, campanhas não lançadas ou layouts jurídicos não podem sair de um dispositivo gerenciado. Você mantém o mesmo fluxo auditável no escritório ou offline após o primeiro carregamento da página.',
        ],
      },
      {
        id: 'pdf-font-internals',
        heading: 'Como dicionários de fonte em PDF expõem nomes',
        level: 2,
        paragraphs: [
          'Operadores de texto em PDF referenciam recursos de fonte que declaram nomes BaseFont, encodings e às vezes programas embutidos. Ferramentas de design frequentemente fazem subset, por isso você pode ver prefixos de seis caracteres antes do nome real da família. O Identificador normaliza esses prefixos para relatórios legíveis.',
          'Quando um PDF embute apenas contornos sem nomes úteis, ou o texto foi convertido em curvas, pode não haver nada significativo a reportar. Nesse caso a ferramenta informa que nenhuma fonte identificável foi encontrada em vez de fabricar uma correspondência.',
        ],
      },
      {
        id: 'docx-font-tables',
        heading: 'Lendo fontes de pacotes Word DOCX',
        level: 2,
        paragraphs: [
          'Um DOCX é um ZIP de partes XML. Declarações de fonte tipicamente aparecem em word/fontTable.xml e em estilos em word/styles.xml. Fontes de tema e overrides em nível de run podem introduzir famílias além dos padrões do documento.',
          'Como a análise ocorre no navegador, você inspeciona contratos sensíveis ou modelos de RH sem enviar a um serviço de reconhecimento tipográfico de terceiros. O insight é o relatório na tela — sem baixar alterações no arquivo.',
        ],
        bullets: [
          'Fontes de tema e fontes explícitas de run podem aparecer juntas',
          'Mesmo sem embed, nomes declarados podem permanecer no pacote',
          'Mantenha o original; esta ferramenta nunca sobrescreve o arquivo',
        ],
      },
      {
        id: 'workflow',
        heading: 'Onde o Identificador de Fontes entra no seu fluxo',
        level: 3,
        paragraphs: [
          'Use cedo no QA: após exportar o design, antes da impressão e de novo depois de mesclar ou marcar com watermark — etapas que podem substituir fontes. Combine com Extrair Texto quando precisar amostrar conteúdo, ou com Desbloquear PDF quando a criptografia bloquear a leitura do dicionário.',
          'Equipes com checklist de marca vivo podem colar resumos de resultados em tickets para que designers saibam exatamente quais famílias falharam. Quanto mais clara a etiqueta — identificado versus estimado — menos falsos alarmes para jurídico ou marketing.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Identifica fonte em PDF só de imagem?',
        a: 'Digitalizações só com imagem geralmente não têm dicionário de fontes. A ferramenta informa que nada foi identificado em vez de inventar resultados. Use OCR se precisar recuperar texto, não nomes de fonte.',
      },
      {
        q: 'O que significa similaridade estimada?',
        a: 'Significa que o arquivo não forneceu um nome embutido claro, então comparamos pistas com famílias comuns. Trate os percentuais como orientação para verificação adicional, não como prova absoluta do arquivo comercial.',
      },
      {
        q: 'O Identificador altera meu documento?',
        a: 'Não. Ele apenas lê metadados tipográficos e apresenta um relatório. Seu PDF ou DOCX original permanece intacto no disco.',
      },
      {
        q: 'Por que vejo prefixos estranhos antes do nome da fonte?',
        a: 'O subsetting de PDF costuma adicionar tags como ABCDEF+ antes do nome da família. Normalizamos esses prefixos para facilitar a leitura.',
      },
    ],
    relatedTools: ['/pdf-ocr', '/pdf-extract-text', '/desbloquear-pdf'],
    cta: defaultCta('pt', 'Identificador de Fontes'),
  },
  es: {
    title: 'Identificador de Fuentes PDF y Word Gratis | PDFWINDOWS',
    description:
      'Identifique fuentes en PDF y DOCX localmente en el navegador. Coincidencias directas tienen alta confianza; si no, estimamos similitud sin falsa certeza.',
    keywords:
      'identificador de fuentes, identificar fuente pdf, descubrir fuente word, qué fuente usa el documento',
    h1: 'Identificador de Fuentes',
    intro:
      'Las guías de marca, los handoffs de diseño y la remediación de plantillas dependen de saber qué tipografías usa realmente un archivo. El Identificador de Fuentes de PDFWINDOWS inspecciona diccionarios de fuente PDF y tablas OOXML de DOCX por completo en el navegador, para que layouts confidenciales no salgan de su dispositivo. Cuando el documento incrusta nombres reales, el resultado se marca como identificado en el documento con alta confianza. Cuando faltan nombres, hay genéricos o sustituciones, comparamos pistas disponibles con familias comunes y mostramos similitud estimada — nunca fingiendo certeza forense. El objetivo es claridad práctica para diseñadores, marketing y operaciones documentales antes de publicar o reconstruir un archivo.',
    toolName: 'Identificador de Fuentes',
    benefits: [
      'Funciona con PDF y DOCX sin conexión a servidores tras cargar la página',
      'Separa fuente identificada en el documento de similitud estimada',
      'Desglose por elemento cuando título, encabezados y cuerpo difieren',
      'Los prefijos de subset como ABCDEF+Arial se normalizan',
      'Sin subida — análisis en la memoria del navegador en su equipo',
      'Resultados vacíos honestos para escaneos solo de imagen',
    ],
    useCases: [
      {
        title: 'Cumplimiento de marca',
        body:
          'Compruebe tipografías corporativas en PDF o Word antes de imprimir, publicar en la web o enviar a dirección. Detecte sustituciones no autorizadas pronto y pida una exportación corregida a la agencia o al diseñador interno.',
      },
      {
        title: 'Auditoría de entrega',
        body:
          'Confirme fuentes de título y cuerpo en PDF de clientes sin abrir gestores de tipografías. Comparta la tabla de resultados para alinear la pila tipográfica antes de producción.',
      },
      {
        title: 'Remediación documental',
        body:
          'Liste fuentes incrustadas antes de convertir escaneos, reconstruir plantillas o migrar Word legado a un nuevo design system. Saber qué hay evita la deriva de estilo.',
      },
      {
        title: 'QC de proveedores y freelancers',
        body:
          'Agencias y freelancers suelen entregar paquetes mixtos. Pase cada archivo por el Identificador de Fuentes para verificar familias licenciadas y asegurar que no sobrevivieron tipografías placeholder en el PDF final.',
      },
      {
        title: 'Planificación de legibilidad',
        body:
          'Al evaluar tipografía para informes largos, un inventario local ayuda a decidir si el cuerpo usa caras decorativas densas que deberían cambiarse antes de una distribución amplia.',
      },
    ],
    howItWorks: [
      'Suelte un PDF o DOCX en el área de trabajo de esta página.',
      'El navegador lee tablas de fuente, entradas BaseFont y referencias OOXML localmente.',
      'Revise la tabla y las tarjetas detalladas de cada estilo detectado.',
      'Distinga nombres identificados con alta confianza de filas de similitud estimada.',
      'Analice otro documento cuando quiera — nada se almacena en servidores de PDFWINDOWS.',
    ],
    tips: [
      'Los prefijos de subset se normalizan antes de mostrar el nombre de familia.',
      'La similitud estimada es comparativa con familias comunes, no garantía del archivo comercial exacto.',
      'Los PDF con contraseña de apertura pueden requerir Desbloquear PDF primero.',
      'Los escaneos solo imagen suelen carecer de diccionario de fuentes — use OCR si necesita texto.',
      'Para Word, use extensión DOCX; el .doc binario legado no es el mismo paquete OOXML.',
      'Compare varias exportaciones del mismo diseño para detectar sustituciones de última hora.',
    ],
    sections: [
      {
        id: 'direct-vs-estimate',
        heading: 'Identificación directa versus estimación de similitud',
        level: 2,
        paragraphs: [
          'Identificación directa significa que el nombre aparece en BaseFont/FontName del PDF o en fontTable y estilos del DOCX. Etiquetamos esos resultados como identificados en el documento porque la evidencia está en el propio archivo.',
          'Con pistas parciales — nombres genéricos, embeds ausentes o streams muy subseteados — comparamos una lista de familias comunes y mostramos similitud estimada y alternativas. Esa transparencia ayuda a decidir si profundizar en una herramienta de escritorio o pedir una exportación limpia al autor.',
        ],
        bullets: [
          'Identificado en el documento = nombre presente en los datos estructurales de fuente',
          'Similitud estimada = mejor coincidencia comparativa cuando el nombre está incompleto',
          'Sin certeza inventada para escaneos o arte aplanado',
        ],
      },
      {
        id: 'formats-privacy',
        heading: 'Formatos aceptados y privacidad local',
        level: 2,
        paragraphs: [
          'Aceptamos PDF o DOCX. El procesamiento es enteramente client-side con pdf.js para PDF y JSZip para paquetes OOXML. Los archivos no se envían a servidores de PDFWINDOWS; los bytes permanecen en la memoria del navegador en la sesión que usted controla.',
          'Procesar en local importa cuando brand books, campañas no lanzadas o layouts jurídicos no pueden salir de un dispositivo gestionado. Conserva el mismo flujo auditable en la oficina o sin conexión tras la primera carga de la página.',
        ],
      },
      {
        id: 'pdf-font-internals',
        heading: 'Cómo los diccionarios de fuente PDF exponen nombres',
        level: 2,
        paragraphs: [
          'Los operadores de texto PDF referencian recursos de fuente que declaran nombres BaseFont, encodings y a veces programas incrustados. Las herramientas de diseño suelen hacer subset, por eso puede ver prefijos de seis caracteres antes del nombre real. El Identificador normaliza esos prefijos para informes legibles.',
          'Cuando un PDF solo incrusta contornos sin nombres útiles, o el texto se convirtió en curvas, puede no haber nada significativo que reportar. En ese caso la herramienta indica que no hay fuentes identificables en lugar de fabricar una coincidencia.',
        ],
      },
      {
        id: 'docx-font-tables',
        heading: 'Lectura de fuentes en paquetes Word DOCX',
        level: 2,
        paragraphs: [
          'Un DOCX es un ZIP de partes XML. Las declaraciones de fuente suelen aparecer en word/fontTable.xml y en estilos en word/styles.xml. Fuentes de tema y overrides a nivel de run pueden introducir familias más allá de los valores por defecto del documento.',
          'Como el análisis ocurre en el navegador, inspecciona contratos sensibles o plantillas de RR. HH. sin subirlos a un servicio de reconocimiento tipográfico de terceros. El insight es el informe en pantalla — sin sobrescribir el archivo.',
        ],
        bullets: [
          'Fuentes de tema y fuentes explícitas de run pueden aparecer juntas',
          'Aunque falte el embed, los nombres declarados pueden permanecer en el paquete',
          'Conserve el original; esta herramienta nunca sobrescribe el archivo',
        ],
      },
      {
        id: 'workflow',
        heading: 'Dónde encaja el Identificador de Fuentes en su flujo',
        level: 3,
        paragraphs: [
          'Úselo temprano en QA: tras exportar el diseño, antes de imprimir y otra vez después de fusionar o marcar con watermark — pasos que pueden sustituir fuentes. Combínelo con Extraer Texto cuando necesite muestrear contenido, o con Desbloquear PDF cuando el cifrado bloquee la lectura del diccionario.',
          'Los equipos con checklist de marca vivo pueden pegar resúmenes de resultados en tickets para que los diseñadores sepan exactamente qué familias fallaron. Cuanto más clara la etiqueta — identificado versus estimado — menos falsas alarmas para legal o marketing.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Identifica fuente en un PDF solo de imagen?',
        a: 'Los escaneos solo imagen suelen carecer de diccionario de fuentes. La herramienta indica que no hay fuentes identificables en lugar de inventar resultados. Use OCR si necesita recuperar texto, no nombres de fuente.',
      },
      {
        q: '¿Qué significa similitud estimada?',
        a: 'Significa que el archivo no aportó un nombre incrustado claro, así que comparamos pistas con familias comunes. Trate los porcentajes como orientación para comprobaciones adicionales, no como prueba absoluta del archivo comercial.',
      },
      {
        q: '¿El Identificador modifica mi documento?',
        a: 'No. Solo lee metadatos tipográficos y presenta un informe. Su PDF o DOCX original permanece intacto en el disco.',
      },
      {
        q: '¿Por qué veo prefijos extraños antes del nombre de la fuente?',
        a: 'El subsetting de PDF suele añadir etiquetas como ABCDEF+ antes del nombre de familia. Normalizamos esos prefijos para facilitar la lectura.',
      },
    ],
    relatedTools: ['/pdf-ocr', '/pdf-extract-text', '/desbloquear-pdf'],
    cta: defaultCta('es', 'Identificador de Fuentes'),
  },
};
