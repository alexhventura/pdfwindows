import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const ORGANIZAR_PAGINAS_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Organize PDF Pages Online Free | PDFWINDOWS',
    description:
      'Delete, reorder, and extract PDF pages with thumbnails in your browser. Download a new organized copy locally; no cloud upload, original stays intact.',
    keywords: 'organize pdf pages, delete pdf pages, reorder pdf, extract pdf pages, organize pdf free',
    h1: 'Organize PDF Pages',
    intro:
      'PDFWINDOWS Organize PDF Pages helps you clean a document without installing a desktop editor or uploading it to a cloud queue. Open a PDF, review page thumbnails, delete pages that do not belong, move pages into the right sequence, keep only a working subset, and download a new organized copy. The original file is not overwritten, and the processing happens inside your browser so drafts, packets, contracts, scans, and internal documents stay on your device.',
    toolName: 'Organize PDF Pages',
    benefits: [
      'Thumbnail previews make each page easier to identify before you delete or move it',
      'Delete, reorder, and extract selected pages in one focused browser workflow',
      'Download a new organized copy while the original PDF stays unchanged',
      'Local processing helps private documents avoid third-party upload queues',
      'Useful before merging, redacting, compressing, signing, or sending a document',
      'Free to use, with no account required and no desktop PDF suite to install',
    ],
    useCases: [
      {
        title: 'Remove blank or duplicate pages',
        body:
          'Scanners, portals, and exports often add blank separators, duplicated signatures, or pages from the wrong batch. Use thumbnails to spot those extras and delete them before the PDF is shared with a client, filed in a case, or uploaded to an internal system.',
      },
      {
        title: 'Reorder packet sections',
        body:
          'Move cover sheets, summaries, exhibits, invoices, approvals, and signature pages into the sequence your team expects. This is helpful when several people contributed pages and the final packet needs one clean reading order.',
      },
      {
        title: 'Extract a working subset',
        body:
          'Keep only the pages needed for a review cycle, quote, onboarding step, or support request. You can create a smaller copy for the current audience while the complete original remains archived separately.',
      },
      {
        title: 'Prepare files before other tools',
        body:
          'Organize pages before merge, compression, OCR, redaction, or password protection. Cleaning the page order first reduces mistakes later because every downstream tool receives the pages that should actually be processed.',
      },
      {
        title: 'Clean records without reprinting',
        body:
          'When a PDF is already digital, printing it just to remove or rearrange pages wastes time and can reduce quality. Browser organization keeps the work digital and produces a new copy you can verify immediately.',
      },
    ],
    howItWorks: [
      'Select the PDF you are authorized to organize.',
      'Wait for local thumbnail generation so you can identify every page visually.',
      'Delete unwanted pages, move pages up or down, insert another PDF at the end, or keep only the selected pages you need.',
      'Generate a new organized PDF copy in the browser.',
      'Download the result and review the page order before sharing or archiving it.',
    ],
    tips: [
      'Use Split PDF when you need separate files by range; use Organize PDF Pages when you want one cleaned output file.',
      'Unlock password-protected files first if the PDF cannot be opened by the browser.',
      'Review thumbnail labels and page numbers before export, especially after deleting pages in the middle of a packet.',
      'Keep at least one page in the output; an empty PDF is not a useful deliverable.',
      'For very large scans, close other heavy tabs to give the browser more memory during thumbnail rendering.',
      'If a whole page contains sensitive data, deleting it here can be simpler than covering individual areas with Redact PDF.',
    ],
    sections: [
      {
        id: 'thumbnail-workflow',
        heading: 'Visual page organization with thumbnails',
        level: 2,
        paragraphs: [
          'A list of file names is not enough when you are fixing a PDF page by page. Organize PDF Pages renders thumbnails so you can recognize covers, blank separators, annexes, receipts, and signatures before making changes. That visual confirmation reduces the risk of deleting the wrong page in a document where pages look similar by title alone.',
          'The workflow is intentionally narrow: inspect, delete, reorder, extract, export. You do not need a full editor when the job is to clean a page sequence. The resulting download is a new copy, which makes it easier to compare against the source document and keep the original for records.',
        ],
        bullets: [
          'Thumbnails help identify page content before action',
          'Delete unnecessary pages without touching the source file',
          'Move pages into the final reading order before download',
        ],
      },
      {
        id: 'organize-vs-split',
        heading: 'Organize PDF Pages versus Split PDF',
        level: 2,
        paragraphs: [
          'Split PDF is the right tool when your goal is to cut a document into separate files, such as pages 1-3 for one recipient and pages 4-9 for another. Organize PDF Pages is different: it lets you prune and rearrange pages inside one output document while keeping visual context.',
          'If you only need page ranges, start with Split PDF. If you need to remove one blank page, move a signature page near the end, extract selected pages into a smaller single file, or make a packet read correctly, use Organize PDF Pages. Many workflows use both tools, but the decision starts with whether the final result should be one file or multiple files.',
        ],
      },
      {
        id: 'privacy-and-originals',
        heading: 'Local processing and original files',
        level: 2,
        paragraphs: [
          'The PDF bytes are processed in your browser, not on PDFWINDOWS servers. That matters for HR files, client packets, financial statements, legal drafts, and other documents that should not be uploaded to a generic online editor just to remove a few pages.',
          'The tool exports a new organized download rather than overwriting your source file. Keep the original if your policy requires an unchanged archive, then save the organized copy with a clear file name so teammates know it is the edited version.',
        ],
      },
      {
        id: 'quality-control',
        heading: 'Quality checks before sharing',
        level: 2,
        paragraphs: [
          'After exporting, open the downloaded copy in your usual PDF reader and scan the page order from beginning to end. Look for missing attachments, duplicated forms, page-number references that now need context, and cover letters that should appear before supporting materials.',
          'For formal submissions, compare the organized PDF with your checklist or filing requirements. Local processing protects the document during cleanup, but it does not decide whether a page is legally required or whether removing it changes the meaning of the packet.',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Where organization fits your PDF workflow',
        level: 3,
        paragraphs: [
          'A common sequence is unlock if needed, organize pages, redact sensitive areas, compress the result, and then protect or sign the final copy. Organizing early keeps later operations focused on the correct pages.',
          'When you receive a messy PDF from a scanner or shared drive, this tool gives you a fast first pass. Once the page set is right, the rest of the PDF workflow becomes easier to verify.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I delete and reorder pages in the same PDF?',
        a: 'Yes. You can remove unwanted pages, move remaining pages into a new order, and export one organized PDF copy.',
      },
      {
        q: 'Can I extract only selected pages?',
        a: 'Yes. Delete the pages you do not need and download a new copy containing the selected set. Use Split PDF if you need multiple separate outputs.',
      },
      {
        q: 'Is the original file changed?',
        a: 'No. The browser creates a new download. Your source PDF remains unchanged on your device.',
      },
      {
        q: 'Does this crack PDF passwords?',
        a: 'No. If a PDF requires an open password, use Unlock PDF with the legitimate password first. This tool does not guess or bypass unknown passwords.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/redacao-pdf', '/desbloquear-pdf', '/numerador-de-paginas'],
    cta: defaultCta('en', 'Organize PDF Pages'),
  },
  pt: {
    title: 'Organizar Páginas PDF Online Grátis | PDFWINDOWS',
    description:
      'Exclua, reordene e extraia páginas PDF com miniaturas no navegador. Baixe uma nova cópia organizada localmente; sem upload, original intacto.',
    keywords: 'organizar páginas pdf, excluir páginas pdf, reordenar pdf, extrair páginas pdf, organizar pdf gratis',
    h1: 'Organizar Páginas PDF',
    intro:
      'O Organizar Páginas PDF do PDFWINDOWS ajuda a limpar um documento sem instalar editor pesado e sem enviar o arquivo para uma fila na nuvem. Abra um PDF, revise as miniaturas das páginas, exclua o que não pertence ao pacote, mova páginas para a ordem correta, mantenha só um subconjunto de trabalho e baixe uma nova cópia organizada. O original não é sobrescrito, e o processamento acontece no navegador para rascunhos, contratos, digitalizações e documentos internos permanecerem no seu dispositivo.',
    toolName: 'Organizar Páginas PDF',
    benefits: [
      'Miniaturas facilitam identificar cada página antes de excluir ou mover',
      'Exclua, reordene e extraia páginas selecionadas em um único fluxo no navegador',
      'Baixe uma nova cópia organizada enquanto o PDF original permanece intacto',
      'Processamento local ajuda documentos privados a evitar filas de upload de terceiros',
      'Útil antes de mesclar, redigir, comprimir, assinar ou enviar um documento',
      'Gratuito, sem cadastro e sem instalar uma suíte de PDF no computador',
    ],
    useCases: [
      {
        title: 'Remover páginas em branco ou duplicadas',
        body:
          'Scanners, portais e exportações frequentemente adicionam separadores em branco, assinaturas duplicadas ou páginas do lote errado. Use miniaturas para encontrar essas sobras e excluir antes de compartilhar com clientes, protocolar ou enviar a um sistema interno.',
      },
      {
        title: 'Reordenar seções de um pacote',
        body:
          'Mova capa, resumo, anexos, faturas, aprovações e páginas de assinatura para a sequência esperada pelo seu time. Isso ajuda quando várias pessoas contribuíram páginas e o pacote final precisa de uma ordem única de leitura.',
      },
      {
        title: 'Extrair um subconjunto de trabalho',
        body:
          'Mantenha apenas as páginas necessárias para uma revisão, cotação, etapa de onboarding ou chamado de suporte. Você cria uma cópia menor para o público atual enquanto o original completo fica arquivado separadamente.',
      },
      {
        title: 'Preparar arquivos para outras ferramentas',
        body:
          'Organize páginas antes de mesclar, comprimir, fazer OCR, redigir ou proteger com senha. Ajustar a ordem primeiro reduz erros porque as próximas ferramentas recebem somente as páginas que devem ser processadas.',
      },
      {
        title: 'Limpar registros sem reimprimir',
        body:
          'Quando o PDF já é digital, imprimir para remover ou rearranjar páginas desperdiça tempo e pode reduzir qualidade. A organização no navegador mantém o trabalho digital e gera uma cópia nova para conferência imediata.',
      },
    ],
    howItWorks: [
      'Selecione o PDF que você está autorizado a organizar.',
      'Aguarde a geração local das miniaturas para identificar cada página visualmente.',
      'Exclua páginas indesejadas, mova páginas para cima ou para baixo, insira outro PDF no fim, ou mantenha só as selecionadas.',
      'Gere uma nova cópia organizada do PDF no navegador.',
      'Baixe o resultado e revise a ordem das páginas antes de compartilhar ou arquivar.',
    ],
    tips: [
      'Use Dividir PDF quando precisar de arquivos separados por intervalo; use Organizar Páginas quando quiser uma única saída limpa.',
      'Desbloqueie PDFs protegidos por senha primeiro se o navegador não conseguir abrir o arquivo.',
      'Revise miniaturas e números de página antes da exportação, especialmente após excluir páginas no meio do pacote.',
      'Mantenha pelo menos uma página no resultado; um PDF vazio não é um entregável útil.',
      'Em digitalizações muito grandes, feche outras abas pesadas para liberar memória ao renderizar miniaturas.',
      'Se uma página inteira contém dado sensível, excluí-la aqui pode ser mais simples que cobrir áreas individuais na Redação PDF.',
    ],
    sections: [
      {
        id: 'thumbnail-workflow',
        heading: 'Organização visual com miniaturas',
        level: 2,
        paragraphs: [
          'Uma lista de nomes de arquivo não basta quando você está corrigindo um PDF página por página. Organizar Páginas PDF renderiza miniaturas para reconhecer capa, separadores em branco, anexos, recibos e assinaturas antes de agir. Essa confirmação visual reduz o risco de excluir a página errada em documentos parecidos.',
          'O fluxo é propositalmente direto: inspecionar, excluir, reordenar, extrair e exportar. Você não precisa de um editor completo quando a tarefa é limpar a sequência das páginas. O download resultante é uma nova cópia, o que facilita comparar com a fonte e guardar o original para registro.',
        ],
        bullets: [
          'Miniaturas ajudam a identificar o conteúdo antes da ação',
          'Exclua páginas desnecessárias sem alterar o arquivo de origem',
          'Mova páginas para a ordem final de leitura antes do download',
        ],
      },
      {
        id: 'organize-vs-split',
        heading: 'Organizar Páginas versus Dividir PDF',
        level: 2,
        paragraphs: [
          'Dividir PDF é a ferramenta certa quando o objetivo é cortar um documento em arquivos separados, como páginas 1-3 para um destinatário e páginas 4-9 para outro. Organizar Páginas é diferente: você remove e rearranja páginas dentro de um único documento de saída com contexto visual.',
          'Se você só precisa de intervalos, comece por Dividir PDF. Se precisa remover uma página em branco, levar uma assinatura para o fim, extrair páginas selecionadas em um arquivo único menor ou fazer o pacote ler corretamente, use Organizar Páginas. Muitos fluxos usam as duas ferramentas, mas a decisão começa pelo resultado ser um arquivo ou vários.',
        ],
      },
      {
        id: 'privacy-and-originals',
        heading: 'Processamento local e arquivos originais',
        level: 2,
        paragraphs: [
          'Os bytes do PDF são processados no navegador, não nos servidores do PDFWINDOWS. Isso importa para arquivos de RH, pacotes de clientes, extratos financeiros, rascunhos jurídicos e outros documentos que não devem ir para um editor online genérico só para remover algumas páginas.',
          'A ferramenta exporta uma nova cópia organizada em vez de sobrescrever a origem. Mantenha o original se a política exigir arquivo inalterado e salve a cópia organizada com nome claro para o time saber que é a versão editada.',
        ],
      },
      {
        id: 'quality-control',
        heading: 'Conferência antes de compartilhar',
        level: 2,
        paragraphs: [
          'Depois de exportar, abra a cópia baixada no leitor de PDF habitual e percorra a ordem do começo ao fim. Procure anexos faltando, formulários duplicados, referências de página que agora precisam de contexto e cartas de apresentação que devem aparecer antes dos materiais de apoio.',
          'Em envios formais, compare o PDF organizado com seu checklist ou exigência de protocolo. O processamento local protege o documento durante a limpeza, mas não decide se uma página é juridicamente necessária ou se removê-la muda o sentido do pacote.',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Onde a organização entra no fluxo',
        level: 3,
        paragraphs: [
          'Uma sequência comum é desbloquear se necessário, organizar páginas, redigir áreas sensíveis, comprimir o resultado e então proteger ou assinar a cópia final. Organizar cedo mantém as etapas seguintes focadas nas páginas corretas.',
          'Quando você recebe um PDF bagunçado de scanner ou pasta compartilhada, esta ferramenta oferece uma primeira limpeza rápida. Com o conjunto de páginas correto, o restante do fluxo fica mais fácil de verificar.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso excluir e reordenar páginas no mesmo PDF?',
        a: 'Sim. Você remove páginas indesejadas, move o restante para uma nova ordem e exporta uma cópia organizada em PDF.',
      },
      {
        q: 'Posso extrair apenas páginas selecionadas?',
        a: 'Sim. Exclua as páginas que não precisa e baixe uma nova cópia com o conjunto selecionado. Use Dividir PDF se precisar de várias saídas separadas.',
      },
      {
        q: 'O arquivo original é alterado?',
        a: 'Não. O navegador cria um novo download. O PDF de origem permanece inalterado no seu dispositivo.',
      },
      {
        q: 'A ferramenta quebra senhas de PDF?',
        a: 'Não. Se o PDF exige senha de abertura, use Desbloquear PDF com a senha legítima primeiro. Esta ferramenta não adivinha nem ignora senhas desconhecidas.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/redacao-pdf', '/desbloquear-pdf', '/numerador-de-paginas'],
    cta: defaultCta('pt', 'Organizar Páginas PDF'),
  },
  es: {
    title: 'Organizar Páginas PDF Online Gratis | PDFWINDOWS',
    description:
      'Elimine, reordene y extraiga páginas PDF con miniaturas en el navegador. Descargue una copia nueva organizada localmente; sin subida a la nube.',
    keywords: 'organizar páginas pdf, eliminar páginas pdf, reordenar pdf, extraer páginas pdf, organizar pdf gratis',
    h1: 'Organizar Páginas PDF',
    intro:
      'Organizar Páginas PDF de PDFWINDOWS ayuda a limpiar un documento sin instalar un editor pesado y sin subir el archivo a una cola en la nube. Abra un PDF, revise miniaturas de páginas, elimine lo que no pertenece al paquete, mueva páginas al orden correcto, conserve solo un subconjunto de trabajo y descargue una copia nueva organizada. El original no se sobrescribe, y el procesamiento ocurre en el navegador para que borradores, contratos, escaneos y documentos internos permanezcan en su dispositivo.',
    toolName: 'Organizar Páginas PDF',
    benefits: [
      'Las miniaturas facilitan identificar cada página antes de eliminarla o moverla',
      'Elimine, reordene y extraiga páginas seleccionadas en un solo flujo del navegador',
      'Descargue una copia nueva organizada mientras el PDF original queda intacto',
      'El procesamiento local ayuda a evitar colas de subida de terceros para documentos privados',
      'Útil antes de unir, redactar, comprimir, firmar o enviar un documento',
      'Gratis, sin registro y sin instalar una suite de PDF en el equipo',
    ],
    useCases: [
      {
        title: 'Quitar páginas en blanco o duplicadas',
        body:
          'Escáneres, portales y exportaciones suelen añadir separadores en blanco, firmas duplicadas o páginas del lote equivocado. Use miniaturas para encontrar esos sobrantes y eliminarlos antes de compartir con clientes, presentar un expediente o subir a un sistema interno.',
      },
      {
        title: 'Reordenar secciones de un paquete',
        body:
          'Mueva portada, resumen, anexos, facturas, aprobaciones y páginas de firma a la secuencia esperada por su equipo. Ayuda cuando varias personas aportaron páginas y el paquete final necesita un único orden de lectura.',
      },
      {
        title: 'Extraer un subconjunto de trabajo',
        body:
          'Conserve solo las páginas necesarias para una revisión, cotización, etapa de incorporación o ticket de soporte. Puede crear una copia menor para la audiencia actual mientras el original completo queda archivado aparte.',
      },
      {
        title: 'Preparar archivos para otras herramientas',
        body:
          'Organice páginas antes de unir, comprimir, hacer OCR, redactar o proteger con contraseña. Ajustar el orden primero reduce errores porque las siguientes herramientas reciben solo las páginas que deben procesarse.',
      },
      {
        title: 'Limpiar registros sin reimprimir',
        body:
          'Cuando el PDF ya es digital, imprimir para quitar o reorganizar páginas desperdicia tiempo y puede reducir calidad. La organización en el navegador mantiene el trabajo digital y genera una copia nueva para verificar de inmediato.',
      },
    ],
    howItWorks: [
      'Seleccione el PDF que está autorizado a organizar.',
      'Espere la generación local de miniaturas para identificar cada página visualmente.',
      'Elimine páginas no deseadas, mueva páginas arriba o abajo, inserte otro PDF al final, o conserve solo las seleccionadas.',
      'Genere una copia nueva organizada del PDF en el navegador.',
      'Descargue el resultado y revise el orden de páginas antes de compartir o archivar.',
    ],
    tips: [
      'Use Dividir PDF cuando necesite archivos separados por rango; use Organizar Páginas cuando quiera una sola salida limpia.',
      'Desbloquee PDFs protegidos con contraseña primero si el navegador no puede abrir el archivo.',
      'Revise miniaturas y números de página antes de exportar, especialmente tras eliminar páginas en medio del paquete.',
      'Mantenga al menos una página en el resultado; un PDF vacío no es un entregable útil.',
      'En escaneos muy grandes, cierre otras pestañas pesadas para dar más memoria al navegador al renderizar miniaturas.',
      'Si una página completa contiene datos sensibles, eliminarla aquí puede ser más simple que cubrir áreas individuales con Redacción PDF.',
    ],
    sections: [
      {
        id: 'thumbnail-workflow',
        heading: 'Organización visual con miniaturas',
        level: 2,
        paragraphs: [
          'Una lista de nombres de archivo no basta cuando corrige un PDF página por página. Organizar Páginas PDF renderiza miniaturas para reconocer portadas, separadores en blanco, anexos, recibos y firmas antes de actuar. Esa confirmación visual reduce el riesgo de eliminar la página equivocada en documentos parecidos.',
          'El flujo es intencionalmente directo: inspeccionar, eliminar, reordenar, extraer y exportar. No necesita un editor completo cuando la tarea es limpiar la secuencia de páginas. La descarga resultante es una copia nueva, lo que facilita comparar con la fuente y conservar el original como registro.',
        ],
        bullets: [
          'Las miniaturas ayudan a identificar el contenido antes de actuar',
          'Elimine páginas innecesarias sin alterar el archivo de origen',
          'Mueva páginas al orden final de lectura antes de descargar',
        ],
      },
      {
        id: 'organize-vs-split',
        heading: 'Organizar Páginas versus Dividir PDF',
        level: 2,
        paragraphs: [
          'Dividir PDF es la herramienta correcta cuando el objetivo es cortar un documento en archivos separados, como páginas 1-3 para un destinatario y páginas 4-9 para otro. Organizar Páginas es distinto: permite podar y reorganizar páginas dentro de un único documento de salida con contexto visual.',
          'Si solo necesita rangos, empiece con Dividir PDF. Si necesita quitar una página en blanco, mover una firma al final, extraer páginas seleccionadas en un archivo único más pequeño o hacer que el paquete se lea correctamente, use Organizar Páginas. Muchos flujos usan ambas herramientas, pero la decisión empieza por si el resultado debe ser un archivo o varios.',
        ],
      },
      {
        id: 'privacy-and-originals',
        heading: 'Procesamiento local y archivos originales',
        level: 2,
        paragraphs: [
          'Los bytes del PDF se procesan en su navegador, no en servidores de PDFWINDOWS. Importa para archivos de RR. HH., paquetes de clientes, estados financieros, borradores legales y otros documentos que no deberían subirse a un editor online genérico solo para quitar unas páginas.',
          'La herramienta exporta una copia nueva organizada en lugar de sobrescribir el origen. Conserve el original si su política exige un archivo sin cambios y guarde la copia organizada con un nombre claro para que el equipo sepa que es la versión editada.',
        ],
      },
      {
        id: 'quality-control',
        heading: 'Control antes de compartir',
        level: 2,
        paragraphs: [
          'Después de exportar, abra la copia descargada en su lector de PDF habitual y revise el orden desde el principio hasta el final. Busque anexos faltantes, formularios duplicados, referencias de página que ahora necesiten contexto y cartas de presentación que deben aparecer antes de los materiales de apoyo.',
          'En presentaciones formales, compare el PDF organizado con su lista de verificación o requisitos de presentación. El procesamiento local protege el documento durante la limpieza, pero no decide si una página es legalmente necesaria o si eliminarla cambia el sentido del paquete.',
        ],
      },
      {
        id: 'workflow-fit',
        heading: 'Dónde encaja la organización',
        level: 3,
        paragraphs: [
          'Una secuencia común es desbloquear si hace falta, organizar páginas, redactar zonas sensibles, comprimir el resultado y luego proteger o firmar la copia final. Organizar temprano mantiene los pasos posteriores enfocados en las páginas correctas.',
          'Cuando recibe un PDF desordenado de un escáner o carpeta compartida, esta herramienta ofrece una primera limpieza rápida. Con el conjunto de páginas correcto, el resto del flujo es más fácil de verificar.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo eliminar y reordenar páginas en el mismo PDF?',
        a: 'Sí. Puede quitar páginas no deseadas, mover el resto a un orden nuevo y exportar una copia organizada en PDF.',
      },
      {
        q: '¿Puedo extraer solo páginas seleccionadas?',
        a: 'Sí. Elimine las páginas que no necesita y descargue una copia nueva con el conjunto seleccionado. Use Dividir PDF si necesita varias salidas separadas.',
      },
      {
        q: '¿Se modifica el archivo original?',
        a: 'No. El navegador crea una descarga nueva. El PDF de origen permanece sin cambios en su dispositivo.',
      },
      {
        q: '¿La herramienta rompe contraseñas de PDF?',
        a: 'No. Si el PDF exige contraseña de apertura, use Desbloquear PDF con la contraseña legítima primero. Esta herramienta no adivina ni evita contraseñas desconocidas.',
      },
    ],
    relatedTools: ['/pdf-split', '/pdf-merge', '/redacao-pdf', '/desbloquear-pdf', '/numerador-de-paginas'],
    cta: defaultCta('es', 'Organizar Páginas PDF'),
  },
};
