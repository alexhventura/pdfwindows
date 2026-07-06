import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_WATERMARK_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'PDF Watermark Online Offline | PDFWINDOWS',
    description:
      'Add text or image watermarks to PDF files in your browser. Mark drafts, confidential copies, and internal docs locally — no upload, live preview.',
    keywords:
      'pdf watermark, stamp pdf offline, add watermark pdf browser, draft pdf watermark, confidential pdf stamp free',
    h1: 'PDF Watermark',
    intro:
      'A PDF attached to an external email thread looks identical whether it is a final signed contract or a rough internal draft — until someone acts on the wrong version. Watermarks reduce that risk by embedding visible text or logos across every page: CONFIDENTIAL, DRAFT, SAMPLE, or your company mark. Cloud watermark tools require uploading the full document first, which defeats the purpose when the file itself is sensitive. PDFWINDOWS applies watermarks locally: configure text or image, adjust opacity and position in the browser, preview on real pages, and export a stamped PDF that never left your machine.',
    toolName: 'PDF Watermark',
    benefits: [
      'Text and image watermarks with local preview',
      'Protect drafts before external sharing',
      'No server copy of confidential page content',
      'Works on multi-page documents in one pass',
      'Combine with password protection for layered control',
    ],
    useCases: [
      {
        title: 'Draft and review circulation',
        body:
          'Product, legal, and finance teams circulate pre-release PDFs for comment. A prominent DRAFT watermark signals that signatures and terms are not final, reducing the chance that recipients forward the file as if it were executed.',
      },
      {
        title: 'Confidential and attorney-client material',
        body:
          'Law firms and compliance groups label outbound packets CONFIDENTIAL or PRIVILEGED. Browser-side stamping keeps privilege-sensitive pages off vendor infrastructure while still delivering a visual deterrent against casual redistribution.',
      },
      {
        title: 'Sales proposals and pricing sheets',
        body:
          'Account executives send tailored proposals that should not be reused by prospects as official list price. Watermarking with the client name and date discourages blanket forwarding and documents which version was shared.',
      },
      {
        title: 'Training and internal SOP distribution',
        body:
          'HR and operations publish procedures marked INTERNAL USE ONLY. Watermarks reinforce policy even when employees save copies to personal folders or print handouts for desk reference.',
      },
      {
        title: 'Creative and design previews',
        body:
          'Agencies send comp layouts and storyboards before final delivery. A semi-transparent logo watermark protects unpaid creative work during client review without blocking readability of the underlying design.',
      },
    ],
    howItWorks: [
      'Upload the PDF you want to watermark.',
      'Choose text or image watermark and enter content.',
      'Adjust position, opacity, and repeat pattern if available.',
      'Preview on sample pages, then process and download locally.',
    ],
    tips: [
      'Use lighter opacity on text-heavy pages so body copy stays readable.',
      'Pair watermarks with password protection when files leave the organization.',
      'Apply watermarks after merge and rotate so orientation is final.',
      'PNG logos with transparency work better than JPEG for image stamps.',
      'For client-specific marks, include name and date in the watermark string.',
      'Keep an unmarked master archived internally; distribute only stamped copies.',
      'When stamping financial PDFs, align watermark text with your document control numbering scheme so auditors can trace stamped copies to release records.',
      'Test watermark visibility on both screen and print preview — light gray stamps can disappear on projectors during live reviews.',
    ],
    sections: [
      {
        id: 'text-vs-image',
        heading: 'Text watermarks versus image stamps',
        level: 2,
        paragraphs: [
          'Text watermarks are fastest for labels like DRAFT or CONFIDENTIAL — no asset preparation required. Image watermarks suit brand logos and complex marks that must match corporate identity guidelines. Both render as overlays on top of existing page content without replacing the underlying text layer.',
          'Diagonal repeated text patterns cover large pages evenly and are hard to crop out casually, though determined editors with desktop tools can still attempt removal. Watermarks are deterrents and version signals, not cryptographic security.',
        ],
      },
      {
        id: 'opacity-and-placement',
        heading: 'Opacity, placement, and readability',
        level: 2,
        paragraphs: [
          'Heavy opacity obscures tables and diagrams; too light and recipients miss the warning. Preview on representative pages — cover, data-heavy middle, and signature page — before exporting the full file.',
        ],
        bullets: [
          'Center placement — maximum visibility on cover pages.',
          'Diagonal repeat — even coverage on large diagrams.',
          'Footer text — subtle internal marks on every page.',
        ],
      },
      {
        id: 'watermark-and-security',
        heading: 'Watermarks plus encryption',
        level: 2,
        paragraphs: [
          'Watermarks show status to anyone who opens the PDF; password protection controls who can open it at all. For external counsel packets, stamp CONFIDENTIAL first, then encrypt with a passphrase shared on a separate channel. Neither step requires cloud upload when both run in PDFWINDOWS locally.',
          'Board packs often combine both: a SAMPLE watermark on preliminary financials plus encryption so only directors with the passphrase can open the file at all.',
        ],
      },
      {
        id: 'workflow-integration',
        heading: 'Fitting watermarks into document workflows',
        level: 2,
        paragraphs: [
          'Typical order: assemble content with merge, fix orientation with rotate, compress if size matters, watermark for status labeling, then password-protect before email. Extract Text and OCR are unrelated to stamping but often appear earlier when building the PDF from scans.',
          'Procurement teams watermark vendor quotes as ESTIMATE until PO issuance so finance does not accrue liability against draft figures. Stamping locally keeps supplier part numbers and unit pricing off watermark SaaS retention policies.',
        ],
        bullets: [
          'Merge — build the document before stamping.',
          'Password — encrypt after watermark is applied.',
          'Compress — reduce stamped file size for attachments.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can recipients remove the watermark?',
        a: 'Determined users with advanced PDF editors may try. Watermarks deter casual misuse and clarify document status; combine with password protection and access policies for stronger control.',
      },
      {
        q: 'Will watermarks affect printing?',
        a: 'Yes — stamps print with the page unless your printer driver offers watermark suppression, which is uncommon. Verify a test print if exact reproduction matters.',
      },
      {
        q: 'Can I use my company logo?',
        a: 'Upload a PNG or JPG logo as an image watermark. Transparent PNGs avoid white boxes around the mark.',
      },
      {
        q: 'Does watermarking change searchable text?',
        a: 'Existing text layers remain searchable. The watermark itself is usually a visual overlay, not embedded OCR text.',
      },
      {
        q: 'Should I watermark before or after compressing?',
        a: 'Watermark first if compression might soften fine stamp details; compress afterward when email size limits apply.',
      },
    ],
    relatedTools: ['/pdf-password', '/pdf-merge', '/pdf-compress'],
    cta: defaultCta('en', 'PDF Watermark'),
  },
  pt: {
    title: 'Marca d\'Água em PDF Online Offline | PDFWINDOWS',
    description:
      'Adicione marcas d\'água de texto ou imagem em PDFs no navegador. Marque rascunhos e cópias confidenciais localmente — sem upload, preview ao vivo.',
    keywords:
      'marca dagua pdf, carimbo pdf offline, watermark pdf navegador, rascunho pdf confidencial, estampar pdf gratis',
    h1: 'Marca d\'Água em PDF',
    intro:
      'Um PDF anexado em e-mail externo parece igual seja contrato assinado ou rascunho interno — até alguém agir na versão errada. Marcas d\'água reduzem esse risco embutindo texto ou logos visíveis em cada página: CONFIDENCIAL, RASCUNHO, AMOSTRA ou a marca da empresa. Ferramentas na nuvem exigem enviar o documento inteiro, o que anula o propósito quando o arquivo é sensível. O PDFWINDOWS aplica marcas localmente: configure texto ou imagem, ajuste opacidade e posição no navegador, visualize em páginas reais e exporte PDF carimbado que nunca saiu da máquina.',
    toolName: 'Marca d\'Água em PDF',
    benefits: [
      'Marcas de texto e imagem com preview local',
      'Proteja rascunhos antes de compartilhar externamente',
      'Sem cópia em servidor de conteúdo confidencial',
      'Funciona em documentos multipágina em uma passagem',
      'Combine com proteção por senha para controle em camadas',
    ],
    useCases: [
      {
        title: 'Circulação de rascunhos para revisão',
        body:
          'Equipes de produto, jurídico e finanças circulam PDFs pré-lançamento para comentários. Marca RASCUNHO em destaque sinaliza que assinaturas e termos não são finais, reduzindo encaminhamento como se estivesse executado.',
      },
      {
        title: 'Material confidencial e advocatício',
        body:
          'Escritórios e compliance etiquetam pacotes CONFIDENCIAL ou PRIVILEGIADO. Carimbar no navegador mantém páginas sensíveis fora de infraestrutura de terceiros com deterrence visual contra redistribuição casual.',
      },
      {
        title: 'Propostas comerciais e tabelas de preço',
        body:
          'Executivos enviam propostas personalizadas que não devem virar lista oficial. Marca d\'água com nome do cliente e data desencoraja encaminhamento em massa e documenta qual versão foi compartilhada.',
      },
      {
        title: 'Treinamento e POPs internos',
        body:
          'RH e operações publicam procedimentos USO INTERNO. Marcas reforçam política mesmo quando funcionários salvam cópias em pastas pessoais ou imprimem para consulta na mesa.',
      },
      {
        title: 'Prévias criativas e de design',
        body:
          'Agências enviam layouts e storyboards antes da entrega final. Logo semitransparente protege trabalho criativo não pago durante revisão do cliente sem bloquear leitura do design subjacente.',
      },
    ],
    howItWorks: [
      'Envie o PDF que deseja marcar.',
      'Escolha marca de texto ou imagem e informe o conteúdo.',
      'Ajuste posição, opacidade e padrão de repetição se disponível.',
      'Visualize em páginas de amostra, processe e baixe localmente.',
    ],
    tips: [
      'Use opacidade mais leve em páginas com muito texto para manter legibilidade.',
      'Combine marcas com senha quando arquivos saírem da organização.',
      'Aplique marcas após mesclar e rotacionar para orientação final.',
      'Logos PNG transparentes funcionam melhor que JPEG para carimbos.',
      'Para marcas por cliente, inclua nome e data na string.',
      'Arquive mestre sem marca internamente; distribua só cópias carimbadas.',
      'Ao carimbar PDFs financeiros, alinhe o texto da marca ao esquema de numeração de controle documental para auditores rastrearem cópias carimbadas aos registros de liberação.',
      'Teste visibilidade da marca na tela e na visualização de impressão — marcas cinza claro podem sumir em projetores durante revisões ao vivo.',
    ],
    sections: [
      {
        id: 'text-vs-image',
        heading: 'Marcas de texto versus carimbos de imagem',
        level: 2,
        paragraphs: [
          'Marcas de texto são mais rápidas para rótulos como RASCUNHO ou CONFIDENCIAL — sem preparar assets. Marcas de imagem servem para logos que devem seguir identidade visual. Ambas renderizam como sobreposição sem substituir a camada de texto existente.',
          'Padrões diagonais repetidos cobrem páginas grandes e são difíceis de recortar casualmente, embora editores avançados ainda possam tentar remoção. Marcas são sinal de versão e dissuasão, não segurança criptográfica.',
        ],
      },
      {
        id: 'opacity-and-placement',
        heading: 'Opacidade, posição e legibilidade',
        level: 2,
        paragraphs: [
          'Opacidade alta obscurece tabelas e diagramas; muito leve e destinatários ignoram o aviso. Visualize em páginas representativas — capa, meio com dados e assinatura — antes de exportar o arquivo completo.',
        ],
        bullets: [
          'Centro — máxima visibilidade na capa.',
          'Diagonal repetida — cobertura uniforme em diagramas grandes.',
          'Texto no rodapé — marca interna sutil em cada página.',
        ],
      },
      {
        id: 'watermark-and-security',
        heading: 'Marcas d\'água mais criptografia',
        level: 2,
        paragraphs: [
          'Marcas mostram status a quem abre o PDF; senha controla quem pode abrir. Para pacotes externos, carimbe CONFIDENCIAL e depois criptografe com passphrase em canal separado. Nenhum passo exige nuvem quando ambos rodam localmente no PDFWINDOWS.',
          'Pacotes de conselho costumam combinar ambos: marca AMOSTRA em demonstrações preliminares mais criptografia para só diretores com passphrase abrirem o arquivo.',
        ],
      },
      {
        id: 'workflow-integration',
        heading: 'Encaixando marcas em fluxos documentais',
        level: 2,
        paragraphs: [
          'Ordem típica: montar com mesclar, corrigir orientação com rotacionar, comprimir se tamanho importar, marcar status, proteger com senha antes do e-mail. Extrair Texto e OCR costumam vir antes ao montar PDF a partir de scans.',
          'Compras marca cotações de fornecedor como ORÇAMENTO até emissão do pedido para finanças não provisionar valores de rascunho. Carimbar localmente mantém números de peça e preços unitários fora de políticas de retenção de SaaS de watermark.',
          'Revise marcas em monitores e projetores antes de reuniões ao vivo — cinza muito claro some em salas com iluminação forte.',
          'Equipes de vendas costumam carimbar propostas com data e nome do destinatário para rastrear vazamentos sem bloquear leitura do corpo do documento.',
          'Documente qual versão do arquivo recebeu marca antes de cada envio externo.',
        ],
        bullets: [
          'Mesclar — monte o documento antes de carimbar.',
          'Senha — criptografe após aplicar marca.',
          'Comprimir — reduza tamanho do arquivo carimbado para anexos.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Destinatários podem remover a marca d\'água?',
        a: 'Usuários determinados com editores avançados podem tentar. Marcas dissuadem uso casual e esclarecem status; combine com senha e políticas de acesso para controle maior.',
      },
      {
        q: 'Marcas afetam a impressão?',
        a: 'Sim — carimbos imprimem com a página salvo raras exceções do driver. Faça prova de impressão se reprodução exata importar.',
      },
      {
        q: 'Posso usar o logo da empresa?',
        a: 'Envie PNG ou JPG como marca de imagem. PNG transparente evita caixa branca ao redor.',
      },
      {
        q: 'Marca d\'água altera texto pesquisável?',
        a: 'Camadas de texto existentes permanecem pesquisáveis. A marca costuma ser sobreposição visual, não texto OCR.',
      },
      {
        q: 'Marco antes ou depois de comprimir?',
        a: 'Marque primeiro se compressão puder suavizar detalhes finos do carimbo; comprima depois para limites de e-mail.',
      },
    ],
    relatedTools: ['/pdf-password', '/pdf-merge', '/pdf-compress'],
    cta: defaultCta('pt', 'Marca d\'Água em PDF'),
  },
  es: {
    title: 'Marca de Agua en PDF Online Offline | PDFWINDOWS',
    description:
      'Añada marcas de agua de texto o imagen a archivos PDF en el navegador. Marque borradores y copias confidenciales localmente — sin subida, vista previa en vivo.',
    keywords:
      'marca de agua pdf, sellar pdf offline, watermark pdf navegador, borrador pdf confidencial, estampar pdf gratis',
    h1: 'Marca de Agua en PDF',
    intro:
      'Un PDF adjunto en correo externo parece igual sea contrato firmado o borrador interno — hasta que alguien actúa sobre la versión equivocada. Las marcas de agua reducen ese riesgo incrustando texto o logos visibles en cada página: CONFIDENCIAL, BORRADOR, MUESTRA o la marca de la empresa. Las herramientas en la nube exigen subir el documento entero, lo que anula el propósito cuando el archivo es sensible. PDFWINDOWS aplica marcas localmente: configure texto o imagen, ajuste opacidad y posición en el navegador, previsualice en páginas reales y exporte PDF sellado que nunca salió de su máquina.',
    toolName: 'Marca de Agua en PDF',
    benefits: [
      'Marcas de texto e imagen con vista previa local',
      'Proteja borradores antes de compartir externamente',
      'Sin copia en servidor de contenido confidencial',
      'Funciona en documentos multipágina en un paso',
      'Combine con protección por contraseña para control en capas',
    ],
    useCases: [
      {
        title: 'Circulación de borradores para revisión',
        body:
          'Equipos de producto, legal y finanzas circulan PDF prelanzamiento para comentarios. Marca BORRADOR visible señala que firmas y términos no son finales, reduciendo reenvío como si estuviera ejecutado.',
      },
      {
        title: 'Material confidencial y abogado-cliente',
        body:
          'Bufetes y cumplimiento etiquetan paquetes CONFIDENCIAL o PRIVILEGIADO. Sellar en el navegador mantiene páginas sensibles fuera de infraestructura de terceros con disuasión visual contra redistribución casual.',
      },
      {
        title: 'Propuestas comerciales y hojas de precios',
        body:
          'Ejecutivos envían propuestas a medida que no deben convertirse en lista oficial. Marca de agua con nombre del cliente y fecha desalienta reenvío masivo y documenta qué versión se compartió.',
      },
      {
        title: 'Formación y procedimientos internos',
        body:
          'RR. HH. y operaciones publican procedimientos USO INTERNO. Las marcas refuerzan política aunque empleados guarden copias en carpetas personales o impriman para consulta en escritorio.',
      },
      {
        title: 'Avances creativos y de diseño',
        body:
          'Agencias envían maquetas y storyboards antes de entrega final. Logo semitransparente protege trabajo creativo no pagado durante revisión del cliente sin bloquear lectura del diseño subyacente.',
      },
    ],
    howItWorks: [
      'Suba el PDF que desea marcar.',
      'Elija marca de texto o imagen e introduzca contenido.',
      'Ajuste posición, opacidad y patrón de repetición si está disponible.',
      'Previsualice en páginas de muestra, procese y descargue localmente.',
    ],
    tips: [
      'Use opacidad más ligera en páginas con mucho texto para mantener legibilidad.',
      'Combine marcas con contraseña cuando archivos salgan de la organización.',
      'Aplique marcas tras unir y rotar para orientación final.',
      'Logos PNG transparentes funcionan mejor que JPEG para sellos.',
      'Para marcas por cliente, incluya nombre y fecha en la cadena.',
      'Archive maestro sin marca internamente; distribuya solo copias selladas.',
      'Al sellar PDF financieros, alinee el texto de marca con su esquema de numeración de control documental para que auditores rastreen copias selladas a registros de liberación.',
      'Pruebe visibilidad de marca en pantalla y vista previa de impresión — sellos gris claro pueden desaparecer en proyectores durante revisiones en vivo.',
    ],
    sections: [
      {
        id: 'text-vs-image',
        heading: 'Marcas de texto frente a sellos de imagen',
        level: 2,
        paragraphs: [
          'Las marcas de texto son más rápidas para etiquetas como BORRADOR o CONFIDENCIAL — sin preparar assets. Las de imagen sirven para logos que deben seguir identidad corporativa. Ambas renderizan como superposición sin reemplazar la capa de texto existente.',
          'Patrones diagonales repetidos cubren páginas grandes y son difíciles de recortar casualmente, aunque editores avanzados aún puedan intentar eliminación. Las marcas son señal de versión y disuasión, no seguridad criptográfica.',
        ],
      },
      {
        id: 'opacity-and-placement',
        heading: 'Opacidad, posición y legibilidad',
        level: 2,
        paragraphs: [
          'Opacidad alta oscurece tablas y diagramas; demasiado ligera y destinatarios ignoran la advertencia. Previsualice en páginas representativas — portada, medio con datos y firma — antes de exportar el archivo completo.',
        ],
        bullets: [
          'Centro — máxima visibilidad en portada.',
          'Diagonal repetida — cobertura uniforme en diagramas grandes.',
          'Texto en pie — marca interna sutil en cada página.',
        ],
      },
      {
        id: 'watermark-and-security',
        heading: 'Marcas de agua más cifrado',
        level: 2,
        paragraphs: [
          'Las marcas muestran estado a quien abre el PDF; la contraseña controla quién puede abrirlo. Para paquetes externos, selle CONFIDENCIAL y luego cifre con frase en canal separado. Ningún paso exige nube cuando ambos corren localmente en PDFWINDOWS.',
          'Los paquetes de junta suelen combinar ambos: marca MUESTRA en estados preliminares más cifrado para que solo directores con frase abran el archivo.',
        ],
      },
      {
        id: 'workflow-integration',
        heading: 'Integrar marcas en flujos documentales',
        level: 2,
        paragraphs: [
          'Orden típico: montar con unir, corregir orientación con rotar, comprimir si importa tamaño, marcar estado, proteger con contraseña antes del correo. Extraer Texto y OCR suelen ir antes al montar PDF desde escaneos.',
          'Compras marca cotizaciones de proveedor como PRESUPUESTO hasta emisión de orden para que finanzas no provisione cifras de borrador. Sellar localmente mantiene números de pieza y precios unitarios fuera de políticas de retención de SaaS de watermark.',
          'Revise marcas en monitores y proyectores antes de reuniones en vivo — gris muy claro desaparece en salas con iluminación fuerte.',
          'Equipos de ventas suelen sellar propuestas con fecha y nombre del destinatario para rastrear filtraciones sin bloquear lectura del cuerpo del documento.',
        ],
        bullets: [
          'Unir — monte el documento antes de sellar.',
          'Contraseña — cifre tras aplicar marca.',
          'Comprimir — reduzca tamaño del archivo sellado para adjuntos.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Pueden los destinatarios quitar la marca de agua?',
        a: 'Usuarios decididos con editores avanzados pueden intentarlo. Las marcas disuaden uso casual y aclaran estado; combine con contraseña y políticas de acceso para mayor control.',
      },
      {
        q: '¿Las marcas afectan la impresión?',
        a: 'Sí — los sellos imprimen con la página salvo raras excepciones del controlador. Haga prueba de impresión si la reproducción exacta importa.',
      },
      {
        q: '¿Puedo usar el logo de la empresa?',
        a: 'Suba PNG o JPG como marca de imagen. PNG transparente evita caja blanca alrededor.',
      },
      {
        q: '¿La marca de agua cambia texto buscable?',
        a: 'Las capas de texto existentes permanecen buscables. La marca suele ser superposición visual, no texto OCR.',
      },
      {
        q: '¿Marco antes o después de comprimir?',
        a: 'Marque primero si la compresión pudiera suavizar detalles finos del sello; comprima después para límites de correo.',
      },
    ],
    relatedTools: ['/pdf-password', '/pdf-merge', '/pdf-compress'],
    cta: defaultCta('es', 'Marca de Agua en PDF'),
  },
};
