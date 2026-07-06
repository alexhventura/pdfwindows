import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_MERGE_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Merge PDF Online Free & Offline | PDFWINDOWS',
    description:
      'Combine multiple PDF files into one document directly in your browser. No upload, no servers — merge PDFs locally with full privacy and control over file order.',
    keywords:
      'merge pdf, combine pdf offline, join pdf files, merge pdf free, local pdf merge, concatenate pdf browser',
    h1: 'Merge PDF Online — 100% Local',
    intro:
      'Combining scattered PDFs into a single file should not require uploading contracts, medical records, or financial statements to a stranger\'s server. PDFWINDOWS merges PDF documents entirely inside your browser: you choose the order, preview the queue, and download one unified file without any cloud transfer. Whether you are assembling a loan package, stitching together scanned receipts, or building a client deliverable from multiple exports, local merging keeps sensitive pages on your device from start to finish.',
    toolName: 'Merge PDF',
    benefits: [
      '100% in-browser processing — files never leave your device',
      'Drag-and-drop reordering before you merge',
      'No artificial file-count limits from external servers',
      'Preserves original page content without re-scanning or recompression',
    ],
    useCases: [
      {
        title: 'Contract and annex bundles',
        body:
          'Legal and procurement teams often receive a main agreement plus schedules, exhibits, and signed addenda as separate PDFs. Merging them in the correct sequence produces one authoritative document for e-signature platforms, internal archives, or client distribution — without exposing privileged content to third-party converters.',
      },
      {
        title: 'Monthly report compilation',
        body:
          'Finance and operations staff routinely export charts, tables, and narrative sections from different systems. Instead of emailing five attachments, merge department PDFs into a single board-ready packet. Local processing means revenue figures and headcount data stay inside your corporate network boundary.',
      },
      {
        title: 'Academic submission packages',
        body:
          'Students and researchers submit cover letters, CVs, writing samples, and recommendation letters as one PDF for grant portals and graduate applications. Browser-based merging avoids upload quotas on university Wi-Fi and keeps unpublished work private until you choose to share it.',
      },
      {
        title: 'Scanning workflow cleanup',
        body:
          'Flatbed and mobile scanners often output one PDF per page or per batch. After scanning a multi-page form, merge the parts in reading order before archiving to a DMS or emailing to HR. You control orientation and sequence before any downstream split or compress step.',
      },
      {
        title: 'Print-ready document assembly',
        body:
          'Print shops and office admins combine cover pages, body content, and blank backs from different sources. Merging locally lets you verify page count and order on screen, then hand off a single file to the printer driver or copy machine without intermediate cloud storage.',
      },
    ],
    howItWorks: [
      'Add two or more PDF files to the merge queue.',
      'Reorder files by dragging — the first file becomes the start of the output.',
      'Click process; the browser assembles pages in sequence.',
      'Download the merged PDF immediately to your device.',
    ],
    tips: [
      'Place the cover page or table of contents PDF first in the queue so page numbering stays intuitive.',
      'If any source file is password-protected, unlock it before merging or the operation may fail.',
      'Merge before compressing when you need one small file — compressing individually then merging can be less efficient.',
      'Check mixed page sizes (Letter vs A4); merged output keeps each page\'s original dimensions.',
      'For very large batches, merge in groups of ten to reduce memory pressure on older laptops.',
      'Keep a backup of originals until you verify the merged PDF opens correctly in your target reader.',
    ],
    sections: [
      {
        id: 'why-local-merge',
        heading: 'Why merge PDFs locally instead of in the cloud',
        level: 2,
        paragraphs: [
          'Cloud merge tools are convenient until you read the privacy policy. Most upload your files to remote infrastructure, retain copies for hours or days, and process them on shared hardware. For HR onboarding packets, patient intake forms, or unreleased product specs, that exposure is unacceptable.',
          'PDFWINDOWS runs the merge logic in JavaScript on your machine. Bytes are read from disk into browser memory, combined with a PDF library, and written back as a download. No API key, no account, and no telemetry tied to document titles. The trade-off is that very large merges depend on your RAM — but for typical office workloads, local merge is faster and safer.',
        ],
      },
      {
        id: 'order-and-structure',
        heading: 'Controlling order and document structure',
        level: 2,
        paragraphs: [
          'Order matters. A merged PDF is a linear stack of pages: file one\'s pages come first, then file two\'s, and so on. PDFWINDOWS exposes the queue so you can drag files into the correct sequence before processing.',
          'Each source PDF contributes all its pages as a contiguous block. Bookmarks and outlines from individual files may not survive merge — plan navigation accordingly. Mixed portrait and landscape pages are preserved; nothing is auto-rotated during merge.',
        ],
      },
      {
        id: 'quality-preservation',
        heading: 'What happens to quality and metadata',
        level: 3,
        paragraphs: [
          'Merging is not recompression. Embedded images, vector text, and fonts from each source are copied into the output structure without intentional quality loss. File size is roughly the sum of inputs plus a small overhead for the combined cross-reference table.',
          'Document properties such as author or creation date typically reflect the merge operation rather than every individual source. If you rely on embedded metadata for records management, verify the output in your archive system after processing.',
        ],
      },
      {
        id: 'merge-vs-other-tools',
        heading: 'Merge vs split, compress, and rotate',
        level: 3,
        paragraphs: [
          'Merge is the inverse of split: combine many into one. After merging, you might compress the result for email, rotate mis-scanned pages first in their source files, or split the bundle again to extract a chapter.',
        ],
        bullets: [
          'Split — extract page ranges from a large merged file.',
          'Compress — shrink the merged output for attachments under size limits.',
          'Rotate — fix orientation on specific source PDFs before merging.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'How many PDFs can I merge at once?',
        a: 'There is no artificial cap from our servers because nothing is uploaded. Practical limits depend on your browser memory and total file size. Dozens of typical office PDFs usually merge without issue; for hundred-megabyte archives, try smaller batches.',
      },
      {
        q: 'Will bookmarks and hyperlinks be kept?',
        a: 'Page content and internal links within each source file generally remain intact. Document-level bookmarks and outlines from multiple files are not always merged into a unified table of contents — verify navigation in your reader after processing.',
      },
      {
        q: 'Can I merge password-protected PDFs?',
        a: 'Encrypted PDFs must be opened with the correct password before merge. If a file is locked and you do not have the password, the browser cannot read its pages to include them in the output.',
      },
      {
        q: 'Does merge change page size or orientation?',
        a: 'No. Each page keeps its original dimensions and rotation. If you need uniform orientation, use the rotate tool on individual files first, then merge.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-compress', '/pdf-rotate'],
    cta: defaultCta('en', 'Merge PDF'),
  },
  pt: {
    title: 'Mesclar PDF Online Grátis e Offline | PDFWINDOWS',
    description:
      'Combine vários arquivos PDF em um único documento diretamente no navegador. Sem upload, sem servidores — mescle PDFs localmente com privacidade total e controle da ordem.',
    keywords:
      'mesclar pdf, juntar pdf, combinar pdf offline, merge pdf gratis, unir arquivos pdf navegador',
    h1: 'Mesclar PDF Online — 100% Local',
    intro:
      'Juntar PDFs espalhados em um único arquivo não deveria exigir enviar contratos, prontuários ou extratos financeiros para o servidor de terceiros. O PDFWINDOWS mescla documentos inteiramente no seu navegador: você define a ordem, visualiza a fila e baixa um arquivo unificado sem transferência para a nuvem. Seja para montar um pacote de crédito, unir recibos digitalizados ou entregar um material ao cliente a partir de várias exportações, a mesclagem local mantém páginas sensíveis no seu dispositivo do início ao fim.',
    toolName: 'Mesclar PDF',
    benefits: [
      'Processamento 100% no navegador — arquivos não saem do dispositivo',
      'Reordenação por arrastar e soltar antes de mesclar',
      'Sem limite artificial de quantidade imposto por servidores externos',
      'Preserva o conteúdo original das páginas sem reescanear ou recomprimir',
    ],
    useCases: [
      {
        title: 'Pacotes de contrato e anexos',
        body:
          'Equipes jurídicas e de compras recebem contrato principal, cronogramas, anexos e aditivos assinados em PDFs separados. Mesclar na sequência correta gera um documento único para assinatura eletrônica, arquivo interno ou envio ao cliente — sem expor conteúdo privilegiado a conversores de terceiros.',
      },
      {
        title: 'Compilação de relatórios mensais',
        body:
          'Finanças e operações exportam gráficos, tabelas e textos de sistemas diferentes. Em vez de cinco anexos por e-mail, mescle os PDFs departamentais em um pacote pronto para a diretoria. O processamento local mantém receitas e headcount dentro da rede corporativa.',
      },
      {
        title: 'Pacotes de submissão acadêmica',
        body:
          'Estudantes e pesquisadores enviam carta de apresentação, CV, amostras de texto e cartas de recomendação em um PDF para portais de bolsa e pós-graduação. Mesclar no navegador evita cotas de upload no Wi-Fi da universidade e protege trabalhos inéditos.',
      },
      {
        title: 'Organização de fluxo de digitalização',
        body:
          'Scanners de mesa e celular costumam gerar um PDF por página ou por lote. Após digitalizar um formulário multipágina, mescle as partes na ordem de leitura antes de arquivar no GED ou enviar ao RH. Você controla orientação e sequência antes de dividir ou comprimir.',
      },
      {
        title: 'Montagem para impressão',
        body:
          'Gráficas e administrativos combinam capas, miolo e verso em branco de fontes distintas. Mesclar localmente permite conferir contagem e ordem na tela antes de enviar um único arquivo à impressora ou copiadora, sem armazenamento intermediário na nuvem.',
      },
    ],
    howItWorks: [
      'Adicione dois ou mais PDFs à fila de mesclagem.',
      'Reordene arrastando — o primeiro arquivo vira o início do resultado.',
      'Clique em processar; o navegador monta as páginas em sequência.',
      'Baixe o PDF mesclado imediatamente no dispositivo.',
    ],
    tips: [
      'Coloque a capa ou o sumário primeiro na fila para manter a numeração intuitiva.',
      'Se algum PDF tiver senha, desbloqueie antes de mesclar para evitar falhas.',
      'Mescle antes de comprimir quando precisar de um único arquivo menor — comprimir separadamente e depois juntar pode ser menos eficiente.',
      'Verifique tamanhos de página mistos (Carta vs A4); o resultado mantém as dimensões originais de cada página.',
      'Em lotes muito grandes, mescle em grupos de dez para reduzir pressão de memória em notebooks antigos.',
      'Guarde cópias dos originais até confirmar que o PDF mesclado abre corretamente no seu leitor.',
    ],
    sections: [
      {
        id: 'why-local-merge',
        heading: 'Por que mesclar PDFs localmente em vez da nuvem',
        level: 2,
        paragraphs: [
          'Ferramentas na nuvem são práticas até você ler a política de privacidade. A maioria envia arquivos para infraestrutura remota, retém cópias por horas ou dias e processa em hardware compartilhado. Para pacotes de admissão, formulários de pacientes ou especificações não lançadas, essa exposição é inaceitável.',
          'O PDFWINDOWS executa a lógica de mesclagem em JavaScript na sua máquina. Os bytes são lidos do disco para a memória do navegador, combinados com uma biblioteca PDF e gravados como download. Sem API, sem conta e sem telemetria ligada a títulos de documentos. O limite prático é a RAM para arquivos enormes — mas para o uso de escritório típico, mesclar localmente é mais rápido e seguro.',
        ],
      },
      {
        id: 'order-and-structure',
        heading: 'Controlando ordem e estrutura do documento',
        level: 2,
        paragraphs: [
          'A ordem importa. Um PDF mesclado é uma pilha linear de páginas: as do primeiro arquivo vêm primeiro, depois as do segundo, e assim por diante. O PDFWINDOWS mostra a fila para você arrastar os arquivos na sequência certa antes de processar.',
          'Cada PDF de origem contribui com todas as suas páginas em bloco contíguo. Marcadores e sumários dos arquivos individuais podem não sobreviver à mesclagem. Páginas retrato e paisagem mistas são preservadas; nada é girado automaticamente.',
        ],
      },
      {
        id: 'quality-preservation',
        heading: 'O que acontece com qualidade e metadados',
        level: 3,
        paragraphs: [
          'Mesclar não é recomprimir. Imagens embutidas, texto vetorial e fontes de cada origem são copiados para a estrutura de saída sem perda intencional de qualidade. O tamanho do arquivo é aproximadamente a soma das entradas mais um pequeno overhead da tabela de referências cruzadas.',
          'Propriedades do documento como autor ou data de criação costumam refletir a operação de mesclagem, não cada fonte individual. Se você depende de metadados embutidos para gestão documental, verifique o resultado no seu sistema de arquivo após processar.',
        ],
      },
      {
        id: 'merge-vs-other-tools',
        heading: 'Mesclar vs dividir, comprimir e rotacionar',
        level: 3,
        paragraphs: [
          'Mesclar é o inverso de dividir: juntar muitos em um. Depois de mesclar, você pode comprimir para e-mail, rotacionar páginas mal digitalizadas nos arquivos de origem ou dividir o pacote para extrair um capítulo.',
        ],
        bullets: [
          'Dividir — extrair intervalos de páginas de um arquivo grande.',
          'Comprimir — reduzir o resultado mesclado para anexos com limite de tamanho.',
          'Rotacionar — corrigir orientação nos PDFs de origem antes de mesclar.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Quantos PDFs posso mesclar de uma vez?',
        a: 'Não há teto artificial dos nossos servidores porque nada é enviado. Os limites práticos dependem da memória do navegador e do tamanho total. Dezenas de PDFs de escritório costumam funcionar; para arquivos de centenas de megabytes, tente lotes menores.',
      },
      {
        q: 'Marcadores e hyperlinks serão mantidos?',
        a: 'O conteúdo das páginas e links internos de cada arquivo geralmente permanecem. Marcadores de nível de documento de vários arquivos nem sempre viram um sumário unificado — confira a navegação no leitor após processar.',
      },
      {
        q: 'Posso mesclar PDFs protegidos por senha?',
        a: 'PDFs criptografados precisam ser abertos com a senha correta antes da mesclagem. Sem a senha, o navegador não consegue ler as páginas para incluí-las no resultado.',
      },
      {
        q: 'A mesclagem altera tamanho ou orientação da página?',
        a: 'Não. Cada página mantém dimensões e rotação originais. Para orientação uniforme, use a ferramenta de rotação nos arquivos individuais antes de mesclar.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-compress', '/pdf-rotate'],
    cta: defaultCta('pt', 'Mesclar PDF'),
  },
  es: {
    title: 'Unir PDF Online Gratis y Offline | PDFWINDOWS',
    description:
      'Combine varios archivos PDF en un solo documento directamente en el navegador. Sin subida, sin servidores — una PDF localmente con privacidad total y control del orden.',
    keywords:
      'unir pdf, combinar pdf offline, juntar pdf gratis, fusionar pdf navegador, merge pdf local',
    h1: 'Unir PDF Online — 100% Local',
    intro:
      'Combinar PDF dispersos en un solo archivo no debería exigir subir contratos, historiales médicos o estados financieros al servidor de un tercero. PDFWINDOWS une documentos completamente en su navegador: usted elige el orden, revisa la cola y descarga un archivo unificado sin transferencia a la nube. Ya sea para armar un paquete de crédito, unir recibos escaneados o entregar material al cliente desde varias exportaciones, la unión local mantiene páginas sensibles en su dispositivo de principio a fin.',
    toolName: 'Unir PDF',
    benefits: [
      'Procesamiento 100% en el navegador — los archivos no salen del dispositivo',
      'Reordenación por arrastrar antes de unir',
      'Sin límite artificial impuesto por servidores externos',
      'Preserva el contenido original sin volver a escanear ni recomprimir',
    ],
    useCases: [
      {
        title: 'Paquetes de contrato y anexos',
        body:
          'Equipos legales y de compras reciben contrato principal, cronogramas, anexos y adendas firmadas en PDF separados. Unirlos en la secuencia correcta produce un documento único para firma electrónica, archivo interno o envío al cliente — sin exponer contenido privilegiado a convertidores externos.',
      },
      {
        title: 'Compilación de informes mensuales',
        body:
          'Finanzas y operaciones exportan gráficos, tablas y textos desde distintos sistemas. En lugar de cinco adjuntos por correo, una los PDF departamentales en un paquete listo para la junta directiva. El procesamiento local mantiene cifras de ingresos y plantilla dentro de la red corporativa.',
      },
      {
        title: 'Paquetes de solicitud académica',
        body:
          'Estudiantes e investigadores envían carta de presentación, CV, muestras de escritura y cartas de recomendación en un PDF para portales de becas y posgrado. Unir en el navegador evita cuotas de subida en el Wi-Fi universitario y protege trabajos inéditos.',
      },
      {
        title: 'Limpieza del flujo de escaneo',
        body:
          'Escáneres de mesa y móviles suelen generar un PDF por página o por lote. Tras escanear un formulario multipágina, una las partes en orden de lectura antes de archivar en el DMS o enviar a RR. HH. Usted controla orientación y secuencia antes de dividir o comprimir.',
      },
      {
        title: 'Montaje listo para imprimir',
        body:
          'Imprentas y administrativos combinan portadas, cuerpo y reverso en blanco de fuentes distintas. Unir localmente permite verificar conteo y orden en pantalla antes de entregar un solo archivo a la impresora o copiadora, sin almacenamiento intermedio en la nube.',
      },
    ],
    howItWorks: [
      'Añada dos o más archivos PDF a la cola de unión.',
      'Reordene arrastrando — el primer archivo será el inicio del resultado.',
      'Pulse procesar; el navegador ensambla las páginas en secuencia.',
      'Descargue el PDF unificado de inmediato en su dispositivo.',
    ],
    tips: [
      'Coloque la portada o el índice primero en la cola para mantener la numeración intuitiva.',
      'Si algún PDF tiene contraseña, desbloquéelo antes de unir para evitar fallos.',
      'Una antes de comprimir cuando necesite un solo archivo pequeño — comprimir por separado y luego unir puede ser menos eficiente.',
      'Revise tamaños de página mixtos (Carta vs A4); el resultado conserva las dimensiones originales de cada página.',
      'En lotes muy grandes, una en grupos de diez para reducir la presión de memoria en portátiles antiguos.',
      'Guarde copias de los originales hasta confirmar que el PDF unido abre correctamente en su lector.',
    ],
    sections: [
      {
        id: 'why-local-merge',
        heading: 'Por qué unir PDF localmente en lugar de en la nube',
        level: 2,
        paragraphs: [
          'Las herramientas en la nube son cómodas hasta que lee la política de privacidad. La mayoría sube archivos a infraestructura remota, retiene copias horas o días y procesa en hardware compartido. Para paquetes de incorporación, formularios de pacientes o especificaciones no publicadas, esa exposición es inaceptable.',
          'PDFWINDOWS ejecuta la lógica de unión en JavaScript en su máquina. Los bytes se leen del disco a la memoria del navegador, se combinan con una biblioteca PDF y se escriben como descarga. Sin API, sin cuenta y sin telemetría ligada a títulos de documentos. El límite práctico es la RAM para archivos enormes — pero para el uso de oficina típico, unir localmente es más rápido y seguro.',
        ],
      },
      {
        id: 'order-and-structure',
        heading: 'Controlar orden y estructura del documento',
        level: 2,
        paragraphs: [
          'El orden importa. Un PDF unido es una pila lineal de páginas: las del primer archivo van primero, luego las del segundo, y así sucesivamente. PDFWINDOWS muestra la cola para arrastrar archivos en la secuencia correcta antes de procesar.',
          'Cada PDF de origen aporta todas sus páginas como bloque contiguo. Marcadores y esquemas de archivos individuales pueden no sobrevivir a la unión. Páginas verticales y horizontales mixtas se conservan; nada se rota automáticamente.',
        ],
      },
      {
        id: 'quality-preservation',
        heading: 'Qué ocurre con calidad y metadatos',
        level: 3,
        paragraphs: [
          'Unir no es recomprimir. Imágenes incrustadas, texto vectorial y fuentes de cada origen se copian a la estructura de salida sin pérdida intencional de calidad. El tamaño del archivo es aproximadamente la suma de las entradas más un pequeño overhead de la tabla de referencias cruzadas.',
          'Propiedades del documento como autor o fecha de creación suelen reflejar la operación de unión, no cada fuente individual. Si depende de metadatos incrustados para gestión documental, verifique el resultado en su sistema de archivo tras procesar.',
        ],
      },
      {
        id: 'merge-vs-other-tools',
        heading: 'Unir vs dividir, comprimir y rotar',
        level: 3,
        paragraphs: [
          'Unir es lo inverso de dividir: combinar muchos en uno. Tras unir, puede comprimir para correo, rotar páginas mal escaneadas en los archivos de origen o dividir el paquete para extraer un capítulo.',
        ],
        bullets: [
          'Dividir — extraer rangos de páginas de un archivo grande.',
          'Comprimir — reducir el resultado unido para adjuntos con límite de tamaño.',
          'Rotar — corregir orientación en los PDF de origen antes de unir.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Cuántos PDF puedo unir a la vez?',
        a: 'No hay tope artificial de nuestros servidores porque nada se sube. Los límites prácticos dependen de la memoria del navegador y del tamaño total. Decenas de PDF de oficina suelen funcionar; para archivos de cientos de megabytes, pruebe lotes más pequeños.',
      },
      {
        q: '¿Se conservarán marcadores e hipervínculos?',
        a: 'El contenido de las páginas y los enlaces internos de cada archivo generalmente permanecen. Los marcadores a nivel de documento de varios archivos no siempre forman un índice unificado — verifique la navegación en su lector tras procesar.',
      },
      {
        q: '¿Puedo unir PDF protegidos con contraseña?',
        a: 'Los PDF cifrados deben abrirse con la contraseña correcta antes de unir. Sin la contraseña, el navegador no puede leer las páginas para incluirlas en el resultado.',
      },
      {
        q: '¿La unión cambia el tamaño u orientación de la página?',
        a: 'No. Cada página mantiene sus dimensiones y rotación originales. Para orientación uniforme, use la herramienta de rotación en los archivos individuales antes de unir.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-compress', '/pdf-rotate'],
    cta: defaultCta('es', 'Unir PDF'),
  },
};
