import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const PDF_SPLIT_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Split PDF Online Free & Offline | PDFWINDOWS',
    description:
      'Extract page ranges from PDF files in your browser. Split large documents locally without upload — precise control over start and end pages with full privacy.',
    keywords:
      'split pdf, extract pdf pages, separate pdf offline, pdf page extractor, divide pdf browser free',
    h1: 'Split PDF by Pages',
    intro:
      'A 200-page vendor catalog attached to an email is rarely something you need whole. Splitting lets you pull out the pricing appendix, share only the signed signature page, or break a scanned book into chapter-sized files — but cloud splitters copy the entire document off your machine first. PDFWINDOWS splits PDFs locally: you specify start and end pages, the browser extracts that range, and you download a new file without any server ever seeing the rest of the document.',
    toolName: 'Split PDF',
    benefits: [
      'Extract exact page ranges with start and end controls',
      'Precise control over start and end pages',
      'Fast processing for large multi-page PDFs',
      'No account or upload quota',
      'Combine with merge for flexible restructuring',
    ],
    useCases: [
      {
        title: 'Sharing only relevant pages',
        body:
          'Support teams receive full manuals when customers need one troubleshooting section. Splitting extracts pages 42–48 into a standalone PDF for email reply, leaving proprietary chapters on your laptop. Recipients get a smaller, focused file without access to internal appendices.',
      },
      {
        title: 'Breaking bulk scans into chapters',
        body:
          'Digitized books and binders often arrive as one long PDF from the scanner. Split by chapter boundaries so each section can be indexed, tagged, and assigned to different projects or reviewers without re-scanning individual pages.',
      },
      {
        title: 'Legal and compliance redaction prep',
        body:
          'Discovery packets mix privileged and producible material in one export. Splitting isolates page ranges for review teams before redaction or production. Local extraction means privileged content in omitted pages never transits external infrastructure.',
      },
      {
        title: 'Invoice and receipt filing',
        body:
          'Accounting downloads monthly statement PDFs containing dozens of transactions. Split each invoice page or contiguous block into separate files for ERP attachment fields that accept only one document per voucher.',
      },
      {
        title: 'Course material distribution',
        body:
          'Instructors upload weekly reading packets but students complain about downloading 80 MB for three pages. Split the assigned reading into a lightweight PDF per week while the full anthology stays archived locally for the instructor.',
      },
    ],
    howItWorks: [
      'Upload the source PDF to the split tool.',
      'Enter the start page and end page for the range you need.',
      'Process locally; the browser copies only those pages into a new PDF.',
      'Download the extracted file and repeat for additional ranges if needed.',
    ],
    tips: [
      'Page numbers in the tool refer to sequential PDF pages, not printed footer numbers — verify with a reader preview.',
      'For multiple non-contiguous ranges, run split once per range, then merge the pieces if needed.',
      'Split before compress when only a small section will be emailed — smaller input means faster compression.',
      'Rotated pages keep their orientation in the extracted output.',
      'Password-locked PDFs must be unlocked before the browser can read page boundaries.',
      'Name output files descriptively when splitting many ranges to avoid overwriting downloads.',
      'When splitting discovery productions, log start-end ranges in your review database so exported slices map back to Bates numbers.',
      'For bank statements spanning dozens of pages, split one transaction per PDF before ERP attachment — avoids re-uploading the entire statement when only one page needs correction.',
      'After splitting, compress only the slices you email — keeps archival masters at full quality while attachments stay under size limits.',
    ],
    sections: [
      {
        id: 'page-range-mechanics',
        heading: 'How page range extraction works',
        level: 2,
        paragraphs: [
          'PDF pages are ordered objects in a file index, not always matching printed page labels. PDFWINDOWS uses physical page order: page 1 is the first page in the file viewer, regardless of Roman numerals or skipped numbers in footers. When you set start and end, the tool builds a new PDF whose page tree references copies of those objects from the source.',
          'Content outside your range is never written to the output stream. That is an important privacy distinction versus upload-based tools that receive the full file even when you only export a slice.',
        ],
      },
      {
        id: 'split-strategies',
        heading: 'Strategies for large documents',
        level: 2,
        paragraphs: [
          'Very large architectural sets or scanned archives may need dozens of extractions. Work systematically: split by logical sections, verify each output, then compress or password-protect individual chapters for distribution.',
        ],
        bullets: [
          'Contiguous ranges — one split per chapter or invoice block.',
          'Non-contiguous picks — multiple splits, optional merge afterward.',
          'Iterative workflow — split first, rotate or compress outputs separately.',
        ],
      },
      {
        id: 'split-vs-merge',
        heading: 'Split as the counterpart to merge',
        level: 2,
        paragraphs: [
          'If merge combines many PDFs into one linear document, split reverses the operation on page boundaries. Teams often merge exports from a meeting, then split out the confidential appendix before sending the rest to clients. Both tools run locally so restructuring never requires a round trip through the cloud.',
        ],
      },
      {
        id: 'quality-and-fidelity',
        heading: 'Fidelity of extracted pages',
        level: 2,
        paragraphs: [
          'Splitting does not re-render pages. Text, images, annotations, and form fields on included pages are preserved as in the source. Excluded pages simply do not appear in the new file — there is no quality loss on kept content.',
          'Teams in litigation support often split a production set into issue-coded chunks. Local splitting means issue tags and privileged segments never upload as a complete database — only the slices you choose to export leave the workstation.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I extract multiple ranges at once?',
        a: 'Each operation extracts one contiguous range. For several sections, run split multiple times or split each range and merge selected outputs afterward.',
      },
      {
        q: 'Do printed page numbers match the split fields?',
        a: 'Not always. Use your PDF viewer\'s page counter — the first screen is page 1 — rather than footer labels that may start at zero or use prefixes.',
      },
      {
        q: 'Will form fields and signatures survive splitting?',
        a: 'Content on included pages is copied faithfully. Interactive fields remain on extracted pages if they were present in that page range in the source.',
      },
      {
        q: 'Is there a page limit?',
        a: 'No server-side cap applies. Extremely large single files are limited by browser memory; splitting actually reduces load when you work with smaller outputs.',
      },
      {
        q: 'Can I split encrypted PDFs?',
        a: 'You need the password to decrypt the source first. Without it, the browser cannot access page objects to copy them.',
      },
    ],
    relatedTools: ['/pdf-merge', '/pdf-compress', '/pdf-rotate'],
    cta: defaultCta('en', 'Split PDF'),
  },
  pt: {
    title: 'Dividir PDF Online Grátis e Offline | PDFWINDOWS',
    description:
      'Extraia intervalos de páginas de PDFs no navegador. Divida documentos grandes localmente sem upload — controle preciso de páginas inicial e final.',
    keywords:
      'dividir pdf, separar paginas pdf, extrair paginas pdf offline, cortar pdf navegador, split pdf gratis',
    h1: 'Dividir PDF por Páginas',
    intro:
      'Um catálogo de 200 páginas anexado ao e-mail raramente é necessário inteiro. Dividir permite extrair o apêndice de preços, compartilhar só a página de assinatura ou quebrar um livro digitalizado em capítulos — mas divisores na nuvem copiam o documento inteiro antes. O PDFWINDOWS divide PDFs localmente: você informa páginas inicial e final, o navegador extrai o intervalo e você baixa um novo arquivo sem que servidores vejam o restante.',
    toolName: 'Dividir PDF',
    benefits: [
      'Extraia intervalos exatos com controles de início e fim',
      'Páginas não usadas nunca saem do dispositivo',
      'Processamento rápido em PDFs multipágina grandes',
      'Sem conta ou cota de upload',
      'Combine com mesclagem para reestruturar com flexibilidade',
    ],
    useCases: [
      {
        title: 'Compartilhar só páginas relevantes',
        body:
          'Suporte recebe manuais completos quando o cliente precisa de uma seção de troubleshooting. Dividir extrai páginas 42–48 em PDF autônomo para resposta por e-mail, deixando capítulos proprietários no notebook. O destinatário recebe arquivo menor e focado.',
      },
      {
        title: 'Quebrar scans em massa em capítulos',
        body:
          'Livros e pastas digitalizados chegam como um PDF longo do scanner. Divida nos limites de capítulo para indexar, etiquetar e atribuir seções a projetos ou revisores sem redigitalizar página a página.',
      },
      {
        title: 'Preparação para revisão jurídica',
        body:
          'Pacotes de discovery misturam material privilegiado e produzível em uma exportação. Dividir isola intervalos para equipes de revisão antes de redação ou produção. A extração local evita que páginas omitidas transitem por infraestrutura externa.',
      },
      {
        title: 'Arquivamento de faturas e recibos',
        body:
          'Contabilidade baixa extratos mensais com dezenas de transações. Divida cada fatura ou bloco contíguo em arquivos separados para campos de ERP que aceitam um documento por comprovante.',
      },
      {
        title: 'Distribuição de material de curso',
        body:
          'Instrutores publicam pacotes de leitura, mas alunos reclamam de baixar 80 MB por três páginas. Divida a leitura da semana em PDF leve enquanto a antologia completa fica arquivada localmente.',
      },
    ],
    howItWorks: [
      'Envie o PDF de origem à ferramenta de divisão.',
      'Informe a página inicial e final do intervalo desejado.',
      'Processe localmente; o navegador copia só essas páginas para um novo PDF.',
      'Baixe o arquivo extraído e repita para outros intervalos se necessário.',
    ],
    tips: [
      'Os números na ferramenta seguem a ordem sequencial do PDF, não necessariamente rodapés impressos — confira no leitor.',
      'Para intervalos não contíguos, execute uma divisão por intervalo e mescle depois se precisar.',
      'Divida antes de comprimir quando só uma seção pequena irá por e-mail.',
      'Páginas rotacionadas mantêm orientação na saída extraída.',
      'PDFs bloqueados por senha precisam ser desbloqueados antes da leitura das páginas.',
      'Nomeie arquivos de saída de forma descritiva ao dividir muitos intervalos para evitar sobrescrever downloads.',
      'Ao dividir produções de discovery, registre intervalos início-fim no banco de revisão para fatias exportadas mapearem de volta aos números Bates.',
      'Para extratos bancários multipágina, divida cada transação em PDF separado antes de anexar ao ERP — evita reprocessar o extrato inteiro quando só uma página precisa de correção.',
      'Confira se o intervalo inclui páginas em branco intencionais — separadores em contratos longos costumam ser páginas vazias que ainda fazem parte da numeração oficial.',
    ],
    sections: [
      {
        id: 'page-range-mechanics',
        heading: 'Como funciona a extração por intervalo',
        level: 2,
        paragraphs: [
          'Páginas PDF são objetos ordenados em um índice, nem sempre iguais aos números impressos. O PDFWINDOWS usa ordem física: página 1 é a primeira na visualização, independente de algarismos romanos ou numeração pulada em rodapés. Ao definir início e fim, a ferramenta monta um novo PDF referenciando cópias desses objetos.',
          'Conteúdo fora do intervalo não é gravado na saída. Essa é uma distinção de privacidade importante frente a ferramentas que recebem o arquivo inteiro mesmo quando você exporta só um pedaço.',
        ],
      },
      {
        id: 'split-strategies',
        heading: 'Estratégias para documentos grandes',
        level: 2,
        paragraphs: [
          'Plantas arquitetônicas ou arquivos digitalizados enormes podem exigir dezenas de extrações. Trabalhe por seções lógicas, verifique cada saída e depois comprima ou proteja com senha capítulos individuais para distribuição.',
        ],
        bullets: [
          'Intervalos contíguos — uma divisão por capítulo ou bloco de faturas.',
          'Seleções não contíguas — várias divisões, mesclagem opcional depois.',
          'Fluxo iterativo — dividir primeiro, rotacionar ou comprimir saídas separadamente.',
        ],
      },
      {
        id: 'split-vs-merge',
        heading: 'Dividir como contraparte de mesclar',
        level: 2,
        paragraphs: [
          'Se mesclar combina vários PDFs em um documento linear, dividir reverte a operação nos limites de página. Equipes mesclam exportações de reunião e depois separam o apêndice confidencial antes de enviar o restante ao cliente. Ambas as ferramentas rodam localmente sem ida e volta pela nuvem.',
        ],
      },
      {
        id: 'quality-and-fidelity',
        heading: 'Fidelidade das páginas extraídas',
        level: 2,
        paragraphs: [
          'Dividir não re-renderiza páginas. Texto, imagens, anotações e campos de formulário nas páginas incluídas são preservados como na origem. Páginas excluídas simplesmente não aparecem no novo arquivo — sem perda de qualidade no que foi mantido.',
          'Equipes de suporte em litígio costumam dividir conjuntos de produção em blocos por tema. Dividir localmente significa que segmentos privilegiados nunca sobem como base completa — só as fatias que você exportar saem da estação.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso extrair vários intervalos de uma vez?',
        a: 'Cada operação extrai um intervalo contíguo. Para várias seções, execute divisões múltiplas ou mescle saídas selecionadas depois.',
      },
      {
        q: 'Números impressos coincidem com os campos de divisão?',
        a: 'Nem sempre. Use o contador do leitor PDF — a primeira tela é página 1 — em vez de rodapés que podem começar em zero.',
      },
      {
        q: 'Campos de formulário e assinaturas sobrevivem à divisão?',
        a: 'O conteúdo nas páginas incluídas é copiado fielmente. Campos interativos permanecem se estavam naquele intervalo na origem.',
      },
      {
        q: 'Há limite de páginas?',
        a: 'Não há teto no servidor. Arquivos únicos enormes dependem da memória do navegador; dividir na verdade reduz carga ao trabalhar com saídas menores.',
      },
      {
        q: 'Posso dividir PDFs criptografados?',
        a: 'É preciso a senha para descriptografar a origem. Sem ela, o navegador não acessa os objetos de página para copiá-los.',
      },
    ],
    relatedTools: ['/pdf-merge', '/pdf-compress', '/pdf-rotate'],
    cta: defaultCta('pt', 'Dividir PDF'),
  },
  es: {
    title: 'Dividir PDF Online Gratis y Offline | PDFWINDOWS',
    description:
      'Extraiga rangos de páginas de archivos PDF en el navegador. Divida documentos grandes localmente sin subida — control preciso de páginas inicial y final.',
    keywords:
      'dividir pdf, separar paginas pdf, extraer paginas pdf offline, cortar pdf navegador, split pdf gratis',
    h1: 'Dividir PDF por Páginas',
    intro:
      'Un catálogo de 200 páginas adjunto al correo rara vez se necesita entero. Dividir permite extraer el apéndice de precios, compartir solo la página firmada o partir un libro escaneado en capítulos — pero los divisores en la nube copian todo el documento primero. PDFWINDOWS divide PDF localmente: usted indica páginas inicial y final, el navegador extrae el rango y descarga un archivo nuevo sin que servidores vean el resto.',
    toolName: 'Dividir PDF',
    benefits: [
      'Extraiga rangos exactos con controles de inicio y fin',
      'Las páginas no usadas nunca salen del dispositivo',
      'Procesamiento rápido en PDF multipágina grandes',
      'Sin cuenta ni cuota de subida',
      'Combine con unión para reestructurar con flexibilidad',
    ],
    useCases: [
      {
        title: 'Compartir solo páginas relevantes',
        body:
          'Soporte recibe manuales completos cuando el cliente necesita una sección de resolución de problemas. Dividir extrae páginas 42–48 en PDF independiente para responder por correo, dejando capítulos propietarios en el portátil. El destinatario recibe archivo más pequeño y enfocado.',
      },
      {
        title: 'Partir escaneos masivos en capítulos',
        body:
          'Libros y carpetas digitalizados llegan como un PDF largo del escáner. Divida en límites de capítulo para indexar, etiquetar y asignar secciones a proyectos o revisores sin volver a escanear página por página.',
      },
      {
        title: 'Preparación para revisión legal',
        body:
          'Paquetes de discovery mezclan material privilegiado y producible en una exportación. Dividir aísla rangos para equipos de revisión antes de redacción o producción. La extracción local evita que páginas omitidas transiten infraestructura externa.',
      },
      {
        title: 'Archivo de facturas y recibos',
        body:
          'Contabilidad descarga extractos mensuales con docenas de transacciones. Divida cada factura o bloque contiguo en archivos separados para campos ERP que aceptan un documento por comprobante.',
      },
      {
        title: 'Distribución de material de curso',
        body:
          'Instructores publican paquetes de lectura, pero estudiantes se quejan de bajar 80 MB por tres páginas. Divida la lectura semanal en PDF liviano mientras la antología completa queda archivada localmente.',
      },
    ],
    howItWorks: [
      'Suba el PDF de origen a la herramienta de división.',
      'Indique la página inicial y final del rango deseado.',
      'Procese localmente; el navegador copia solo esas páginas a un PDF nuevo.',
      'Descargue el archivo extraído y repita para otros rangos si hace falta.',
    ],
    tips: [
      'Los números en la herramienta siguen el orden secuencial del PDF, no necesariamente pies de página impresos — verifique en el lector.',
      'Para rangos no contiguos, ejecute una división por rango y una después si necesita.',
      'Divida antes de comprimir cuando solo una sección pequeña irá por correo.',
      'Las páginas rotadas mantienen orientación en la salida extraída.',
      'Los PDF bloqueados por contraseña deben desbloquearse antes de leer páginas.',
      'Nombre archivos de salida de forma descriptiva al dividir muchos rangos para no sobrescribir descargas.',
      'Al dividir producciones de discovery, registre rangos inicio-fin en su base de revisión para que porciones exportadas mapeen de vuelta a números Bates.',
      'Para extractos bancarios multipágina, divida cada transacción en PDF separado antes de adjuntar al ERP — evita reprocesar el extracto entero cuando solo una página necesita corrección.',
      'Verifique si el rango incluye páginas en blanco intencionales — los separadores en contratos largos suelen ser páginas vacías que aún forman parte de la numeración oficial.',
    ],
    sections: [
      {
        id: 'page-range-mechanics',
        heading: 'Cómo funciona la extracción por rango',
        level: 2,
        paragraphs: [
          'Las páginas PDF son objetos ordenados en un índice, no siempre iguales a números impresos. PDFWINDOWS usa orden físico: página 1 es la primera en el visor, sin importar números romanos o saltos en pies de página. Al definir inicio y fin, la herramienta construye un PDF nuevo referenciando copias de esos objetos.',
          'El contenido fuera del rango no se escribe en la salida. Es una distinción de privacidad importante frente a herramientas que reciben el archivo entero aunque solo exporte un fragmento.',
        ],
      },
      {
        id: 'split-strategies',
        heading: 'Estrategias para documentos grandes',
        level: 2,
        paragraphs: [
          'Planos arquitectónicos o archivos escaneados enormes pueden requerir docenas de extracciones. Trabaje por secciones lógicas, verifique cada salida y luego comprima o proteja con contraseña capítulos individuales para distribución.',
        ],
        bullets: [
          'Rangos contiguos — una división por capítulo o bloque de facturas.',
          'Selecciones no contiguas — varias divisiones, unión opcional después.',
          'Flujo iterativo — dividir primero, rotar o comprimir salidas por separado.',
        ],
      },
      {
        id: 'split-vs-merge',
        heading: 'Dividir como contraparte de unir',
        level: 2,
        paragraphs: [
          'Si unir combina varios PDF en un documento lineal, dividir revierte la operación en límites de página. Equipos unen exportaciones de reunión y luego separan el apéndice confidencial antes de enviar el resto al cliente. Ambas herramientas corren localmente sin ida y vuelta por la nube.',
        ],
      },
      {
        id: 'quality-and-fidelity',
        heading: 'Fidelidad de las páginas extraídas',
        level: 2,
        paragraphs: [
          'Dividir no vuelve a renderizar páginas. Texto, imágenes, anotaciones y campos de formulario en páginas incluidas se conservan como en el origen. Las páginas excluidas simplemente no aparecen en el archivo nuevo — sin pérdida de calidad en lo conservado.',
          'Equipos de soporte en litigio suelen dividir conjuntos de producción en bloques por tema. Dividir localmente significa que segmentos privilegiados nunca suben como base completa — solo las porciones que exporte salen de la estación.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo extraer varios rangos a la vez?',
        a: 'Cada operación extrae un rango contiguo. Para varias secciones, ejecute divisiones múltiples o una salidas seleccionadas después.',
      },
      {
        q: '¿Coinciden los números impresos con los campos de división?',
        a: 'No siempre. Use el contador del lector PDF — la primera pantalla es página 1 — en lugar de pies que pueden empezar en cero.',
      },
      {
        q: '¿Sobreviven campos de formulario y firmas a la división?',
        a: 'El contenido en páginas incluidas se copia fielmente. Los campos interactivos permanecen si estaban en ese rango en el origen.',
      },
      {
        q: '¿Hay límite de páginas?',
        a: 'No hay tope en el servidor. Archivos únicos enormes dependen de la memoria del navegador; dividir reduce carga al trabajar con salidas más pequeñas.',
      },
      {
        q: '¿Puedo dividir PDF cifrados?',
        a: 'Se necesita la contraseña para descifrar el origen. Sin ella, el navegador no accede a objetos de página para copiarlos.',
      },
    ],
    relatedTools: ['/pdf-merge', '/pdf-compress', '/pdf-rotate'],
    cta: defaultCta('es', 'Dividir PDF'),
  },
};
