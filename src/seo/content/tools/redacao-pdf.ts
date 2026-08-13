import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const REDACAO_PDF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Redact PDF Online Free | PDFWINDOWS',
    description:
      'Black out IDs, amounts, and sensitive data in PDFs in your browser. Download a new redacted copy locally; review visual covers before sharing.',
    keywords: 'redact pdf, blackout pdf, hide sensitive data pdf, pdf redaction free, cover text pdf',
    h1: 'Redact PDF',
    intro:
      'PDFWINDOWS Redact PDF helps you cover sensitive regions before sharing a document with clients, vendors, reviewers, or public portals. Draw blackout boxes over IDs, account numbers, addresses, prices, signatures, comments, or private notes, move through the pages, and export a new redacted copy. Processing runs in your browser so the file is not uploaded to PDFWINDOWS servers. The tool applies visual opaque covers, so always review the output before sharing important or regulated information.',
    toolName: 'Redact PDF',
    benefits: [
      'Draw visual blackout covers directly on the PDF pages you need to protect',
      'Navigate multi-page documents and place separate covers on each page',
      'Undo the last cover or clear a page when you need to correct placement',
      'Download a new redacted copy while the original file remains untouched',
      'Local browser processing keeps sensitive documents off third-party upload queues',
      'Pairs with Organize PDF Pages, Unlock PDF, File X-Ray, and Password Protect PDF',
    ],
    useCases: [
      {
        title: 'Hide identification and account numbers',
        body:
          'Cover passport numbers, national IDs, CPF values, tax IDs, account digits, policy numbers, and similar identifiers before sending a file to someone who only needs the surrounding context.',
      },
      {
        title: 'Share contracts with limited detail',
        body:
          'Mask pricing, personal annexes, signatures, commercial terms, or internal comments while keeping clauses, dates, parties, and approval context readable for external review.',
      },
      {
        title: 'Publish supporting exhibits',
        body:
          'Prepare exhibits, scans, receipts, or correspondence for a public docket, procurement process, school request, or community report by covering addresses, witness details, and private references.',
      },
      {
        title: 'Prepare HR and finance packets',
        body:
          'Redact salary figures, bank data, emergency contacts, medical notes, or employee identifiers before routing a document to people who should not see the complete record.',
      },
      {
        title: 'Create a safer review copy',
        body:
          'When reviewers need to inspect layout or selected facts but not the whole document, create a new PDF with visible blackouts and keep the full source file in the proper restricted location.',
      },
    ],
    howItWorks: [
      'Select the PDF you are authorized to redact.',
      'Review each page in the browser and zoom if needed to position covers carefully.',
      'Drag rectangles over every sensitive region that should be hidden.',
      'Generate a new PDF copy with the blackout covers applied visually.',
      'Open the downloaded result and review it before sharing outside the intended audience.',
    ],
    tips: [
      'Review the exported PDF at normal and high zoom; visual covers should fully hide every sensitive area.',
      'If an entire page is sensitive, use Organize PDF Pages to delete the page instead of covering many separate areas.',
      'Unlock encrypted PDFs first if the pages cannot render in the browser.',
      'Use File X-Ray when you also need to inspect metadata before releasing a document.',
      'Do not rely on memory; scan every page after export because repeated IDs can appear in headers, footers, and attachments.',
      'For highly regulated releases, follow your organization’s legal review process in addition to using visual blackout covers.',
    ],
    sections: [
      {
        id: 'visual-redaction',
        heading: 'What visual PDF redaction means',
        level: 2,
        paragraphs: [
          'This tool paints opaque rectangles onto a new PDF copy. It is designed for practical browser-based sharing when you need visible black boxes over information that should not be read by the recipient. The original file stays unchanged, which lets you keep the complete record under the right access controls.',
          'Because the method is visual, reviewing the output matters. Open the downloaded copy, zoom in, try selecting nearby text if your reader allows it, and confirm that no sensitive value remains visible around the edges of a cover. For legal discovery, public release, or regulated workflows, pair this check with your organization’s formal redaction procedure.',
        ],
        bullets: [
          'Opaque black covers are applied to a new PDF copy',
          'The source file is not overwritten by the export',
          'Manual review remains part of the redaction workflow',
        ],
      },
      {
        id: 'privacy',
        heading: 'Local browser processing',
        level: 2,
        paragraphs: [
          'Redaction often touches the most sensitive version of a document. PDFWINDOWS runs this workflow in the browser so your PDF bytes are not sent to a cloud redaction queue just to draw covers over a few fields. That is useful for client records, personnel files, financial statements, and early drafts.',
          'Local processing does not remove the need for careful handling after download. Save the redacted copy in the correct location, name it clearly, and avoid sending the full original by mistake. If the redacted copy must travel outside your team, consider applying password protection after review.',
        ],
      },
      {
        id: 'what-to-cover',
        heading: 'Common details to cover',
        level: 2,
        paragraphs: [
          'Sensitive information is not always in the body paragraph. It can appear in headers, footers, stamps, comments flattened into scans, QR labels, page margins, attachment lists, and signature blocks. Move through every page before export rather than assuming the first visible instance is the only one.',
          'Typical blackout targets include government IDs, bank details, account numbers, dates of birth, addresses, phone numbers, email addresses, medical details, confidential prices, negotiation notes, and internal approval comments. The goal is to preserve useful context while hiding information the recipient should not receive.',
        ],
      },
      {
        id: 'redact-vs-organize',
        heading: 'Redact versus remove pages',
        level: 2,
        paragraphs: [
          'If only a few fields on a page are sensitive, Redact PDF is the right tool because the rest of the page can remain readable. Draw boxes precisely around the regions to hide, then verify that the final copy communicates what it should without revealing the covered content.',
          'If a full page should not be shared, Organize PDF Pages is usually cleaner. Delete the page and export a smaller document instead of covering the whole sheet. This makes the recipient’s copy easier to read and avoids leaving a page that is mostly blackout.',
        ],
      },
      {
        id: 'release-checklist',
        heading: 'Release checklist',
        level: 3,
        paragraphs: [
          'Before sending the redacted PDF, compare it against the audience and purpose. A vendor may need invoice totals but not bank details; a public exhibit may need dates but not addresses; a reviewer may need layout but not personal identifiers.',
          'After download, reopen the file from disk rather than trusting the editing view. That final check catches misplaced covers, missed pages, or exported copies with the wrong filename before they leave your device.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Is text under the black box permanently destroyed?',
        a: 'The tool applies opaque visual covers to the exported copy. Always review the output and use your formal redaction process for highly sensitive releases.',
      },
      {
        q: 'Does Redact PDF upload my file?',
        a: 'No. The redaction workflow runs in your browser, and the PDF is not uploaded to PDFWINDOWS servers.',
      },
      {
        q: 'Will the original PDF be overwritten?',
        a: 'No. You download a new redacted copy. Keep the original in its proper restricted location if you still need the full record.',
      },
      {
        q: 'Can this crack a protected PDF?',
        a: 'No. If the PDF requires an open password, unlock it first with the legitimate password. Redact PDF does not guess or bypass unknown passwords.',
      },
    ],
    relatedTools: ['/organizar-paginas-pdf', '/desbloquear-pdf', '/raio-x-de-arquivo', '/pdf-password'],
    cta: defaultCta('en', 'Redact PDF'),
  },
  pt: {
    title: 'Redação PDF Online Grátis | PDFWINDOWS',
    description:
      'Tape CPF, valores e dados sensíveis em PDFs no navegador. Baixe uma nova cópia redigida localmente; revise as coberturas antes de compartilhar.',
    keywords: 'redação pdf, ocultar dados pdf, blackout pdf, tapar cpf pdf, redação documento gratis',
    h1: 'Redação PDF',
    intro:
      'A Redação PDF do PDFWINDOWS ajuda a cobrir regiões sensíveis antes de compartilhar um documento com clientes, fornecedores, revisores ou portais públicos. Desenhe caixas pretas sobre CPF, números de conta, endereços, valores, assinaturas, comentários ou notas privadas, navegue pelas páginas e exporte uma nova cópia redigida. O processamento roda no navegador, então o arquivo não é enviado aos servidores do PDFWINDOWS. A ferramenta aplica coberturas visuais opacas, por isso revise sempre o resultado antes de compartilhar informações importantes ou reguladas.',
    toolName: 'Redação PDF',
    benefits: [
      'Desenhe coberturas visuais pretas diretamente nas páginas que precisam de proteção',
      'Navegue por documentos multipágina e aplique coberturas separadas em cada página',
      'Desfaça a última cobertura ou limpe uma página quando precisar corrigir posicionamento',
      'Baixe uma nova cópia redigida enquanto o arquivo original permanece intacto',
      'Processamento local no navegador mantém documentos sensíveis fora de filas de upload',
      'Combina com Organizar Páginas, Desbloquear PDF, Raio-X de Arquivo e Proteger PDF',
    ],
    useCases: [
      {
        title: 'Ocultar identificação e números de conta',
        body:
          'Cubra CPF, RG, passaporte, CNPJ, dados fiscais, dígitos de conta, apólices e identificadores semelhantes antes de enviar o arquivo a quem só precisa do contexto ao redor.',
      },
      {
        title: 'Compartilhar contratos com detalhe limitado',
        body:
          'Masque preços, anexos pessoais, assinaturas, termos comerciais ou comentários internos enquanto mantém cláusulas, datas, partes e contexto de aprovação legíveis para revisão externa.',
      },
      {
        title: 'Publicar peças de apoio',
        body:
          'Prepare anexos, digitalizações, recibos ou correspondências para autos públicos, compras, solicitações escolares ou relatórios comunitários cobrindo endereços, dados de testemunhas e referências privadas.',
      },
      {
        title: 'Preparar pacotes de RH e financeiro',
        body:
          'Redija salários, dados bancários, contatos de emergência, notas médicas ou identificadores de funcionários antes de encaminhar o documento a pessoas que não devem ver o registro completo.',
      },
      {
        title: 'Criar uma cópia de revisão mais segura',
        body:
          'Quando revisores precisam avaliar layout ou fatos selecionados, mas não o documento inteiro, crie um PDF novo com blackouts visíveis e mantenha a fonte completa no local restrito correto.',
      },
    ],
    howItWorks: [
      'Selecione o PDF que você está autorizado a redigir.',
      'Revise cada página no navegador e use zoom se precisar posicionar coberturas com precisão.',
      'Arraste retângulos sobre todas as regiões sensíveis que devem ficar ocultas.',
      'Gere uma nova cópia PDF com as coberturas pretas aplicadas visualmente.',
      'Abra o resultado baixado e revise antes de compartilhar fora do público pretendido.',
    ],
    tips: [
      'Revise o PDF exportado em zoom normal e alto; as coberturas visuais devem esconder totalmente cada área sensível.',
      'Se uma página inteira é sensível, use Organizar Páginas para excluí-la em vez de cobrir muitas áreas separadas.',
      'Desbloqueie PDFs criptografados primeiro se as páginas não renderizarem no navegador.',
      'Use Raio-X de Arquivo quando também precisar inspecionar metadados antes de liberar um documento.',
      'Não confie na memória; percorra todas as páginas após exportar, pois IDs repetidos podem aparecer em cabeçalhos, rodapés e anexos.',
      'Para liberações muito reguladas, siga o processo jurídico da organização além das coberturas visuais pretas.',
    ],
    sections: [
      {
        id: 'visual-redaction',
        heading: 'O que significa redação visual em PDF',
        level: 2,
        paragraphs: [
          'Esta ferramenta pinta retângulos opacos em uma nova cópia do PDF. Ela foi criada para compartilhamento prático no navegador quando você precisa de caixas pretas visíveis sobre informações que o destinatário não deve ler. O arquivo original permanece intacto, permitindo manter o registro completo sob os controles corretos.',
          'Como o método é visual, revisar a saída é essencial. Abra a cópia baixada, amplie a página, tente selecionar texto próximo se o leitor permitir e confirme que nenhum valor sensível aparece nas bordas da cobertura. Em discovery, publicação pública ou fluxos regulados, combine essa conferência com o procedimento formal de redação da organização.',
        ],
        bullets: [
          'Coberturas pretas opacas são aplicadas a uma nova cópia do PDF',
          'O arquivo de origem não é sobrescrito pela exportação',
          'A revisão manual continua fazendo parte do fluxo de redação',
        ],
      },
      {
        id: 'privacy',
        heading: 'Processamento local no navegador',
        level: 2,
        paragraphs: [
          'Redação costuma envolver a versão mais sensível de um documento. O PDFWINDOWS executa este fluxo no navegador para que os bytes do PDF não sejam enviados a uma fila de redação na nuvem apenas para desenhar coberturas sobre alguns campos. Isso é útil para registros de clientes, arquivos de pessoal, extratos financeiros e rascunhos iniciais.',
          'O processamento local não elimina o cuidado depois do download. Salve a cópia redigida no local correto, dê um nome claro ao arquivo e evite enviar o original completo por engano. Se a cópia redigida precisa sair do time, considere aplicar proteção por senha após a revisão.',
        ],
      },
      {
        id: 'what-to-cover',
        heading: 'Detalhes comuns para cobrir',
        level: 2,
        paragraphs: [
          'Informação sensível nem sempre aparece no parágrafo principal. Ela pode estar em cabeçalhos, rodapés, carimbos, comentários achatados em digitalizações, etiquetas QR, margens, listas de anexos e blocos de assinatura. Percorra todas as páginas antes da exportação em vez de presumir que a primeira ocorrência visível é a única.',
          'Alvos comuns incluem documentos oficiais, dados bancários, números de conta, datas de nascimento, endereços, telefones, e-mails, detalhes médicos, preços confidenciais, notas de negociação e comentários internos de aprovação. O objetivo é preservar contexto útil enquanto oculta o que o destinatário não deve receber.',
        ],
      },
      {
        id: 'redact-vs-organize',
        heading: 'Redigir versus remover páginas',
        level: 2,
        paragraphs: [
          'Se apenas alguns campos de uma página são sensíveis, Redação PDF é a ferramenta adequada porque o restante continua legível. Desenhe caixas com precisão sobre as regiões a esconder e depois verifique se a cópia final comunica o necessário sem revelar o conteúdo coberto.',
          'Se uma página inteira não deve ser compartilhada, Organizar Páginas PDF costuma ser mais limpo. Exclua a página e exporte um documento menor em vez de cobrir toda a folha. A cópia do destinatário fica mais fácil de ler e evita uma página quase toda preta.',
        ],
      },
      {
        id: 'release-checklist',
        heading: 'Checklist de liberação',
        level: 3,
        paragraphs: [
          'Antes de enviar o PDF redigido, compare o arquivo com o público e a finalidade. Um fornecedor pode precisar de totais de fatura, mas não de dados bancários; uma peça pública pode precisar de datas, mas não de endereços; um revisor pode precisar do layout, mas não de identificadores pessoais.',
          'Depois do download, reabra o arquivo a partir do disco em vez de confiar apenas na tela de edição. Essa conferência final encontra coberturas fora do lugar, páginas esquecidas ou cópias exportadas com nome errado antes que saiam do dispositivo.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'O texto sob a caixa preta é destruído permanentemente?',
        a: 'A ferramenta aplica coberturas visuais opacas na cópia exportada. Revise sempre o resultado e use o processo formal da organização para liberações muito sensíveis.',
      },
      {
        q: 'A Redação PDF faz upload do meu arquivo?',
        a: 'Não. O fluxo roda no navegador, e o PDF não é enviado aos servidores do PDFWINDOWS.',
      },
      {
        q: 'O PDF original será sobrescrito?',
        a: 'Não. Você baixa uma nova cópia redigida. Mantenha o original no local restrito correto se ainda precisar do registro completo.',
      },
      {
        q: 'A ferramenta quebra PDF protegido?',
        a: 'Não. Se o PDF exige senha de abertura, desbloqueie primeiro com a senha legítima. A Redação PDF não adivinha nem ignora senhas desconhecidas.',
      },
    ],
    relatedTools: ['/organizar-paginas-pdf', '/desbloquear-pdf', '/raio-x-de-arquivo', '/pdf-password'],
    cta: defaultCta('pt', 'Redação PDF'),
  },
  es: {
    title: 'Redacción PDF Online Gratis | PDFWINDOWS',
    description:
      'Tape identificaciones, importes y datos sensibles en PDFs en el navegador. Descargue una copia redactada localmente; revise cubiertas antes de compartir.',
    keywords: 'redacción pdf, ocultar datos pdf, blackout pdf, tapar texto pdf, redacción documento gratis',
    h1: 'Redacción PDF',
    intro:
      'Redacción PDF de PDFWINDOWS ayuda a cubrir zonas sensibles antes de compartir un documento con clientes, proveedores, revisores o portales públicos. Dibuje cajas negras sobre identificaciones, números de cuenta, direcciones, importes, firmas, comentarios o notas privadas, navegue por las páginas y exporte una copia nueva redactada. El procesamiento se ejecuta en el navegador, así que el archivo no se sube a servidores de PDFWINDOWS. La herramienta aplica cubiertas visuales opacas, por eso revise siempre el resultado antes de compartir información importante o regulada.',
    toolName: 'Redacción PDF',
    benefits: [
      'Dibuje cubiertas visuales negras directamente en las páginas que necesitan protección',
      'Navegue documentos multipágina y coloque cubiertas separadas en cada página',
      'Deshaga la última cubierta o limpie una página cuando necesite corregir la posición',
      'Descargue una copia nueva redactada mientras el archivo original queda intacto',
      'Procesamiento local en el navegador mantiene documentos sensibles fuera de colas de subida',
      'Combina con Organizar Páginas, Desbloquear PDF, Rayos X de Archivo y Proteger PDF',
    ],
    useCases: [
      {
        title: 'Ocultar identificaciones y números de cuenta',
        body:
          'Cubra pasaporte, documento nacional, datos fiscales, dígitos de cuenta, pólizas e identificadores similares antes de enviar el archivo a alguien que solo necesita el contexto cercano.',
      },
      {
        title: 'Compartir contratos con detalle limitado',
        body:
          'Oculte precios, anexos personales, firmas, términos comerciales o comentarios internos mientras mantiene cláusulas, fechas, partes y contexto de aprobación legibles para revisión externa.',
      },
      {
        title: 'Publicar piezas de apoyo',
        body:
          'Prepare anexos, escaneos, recibos o correspondencia para expedientes públicos, compras, solicitudes escolares o informes comunitarios cubriendo direcciones, datos de testigos y referencias privadas.',
      },
      {
        title: 'Preparar paquetes de RR. HH. y finanzas',
        body:
          'Redacte salarios, datos bancarios, contactos de emergencia, notas médicas o identificadores de empleados antes de enrutar el documento a personas que no deben ver el registro completo.',
      },
      {
        title: 'Crear una copia de revisión más segura',
        body:
          'Cuando revisores necesitan inspeccionar diseño o hechos seleccionados, pero no el documento completo, cree un PDF nuevo con blackouts visibles y conserve la fuente completa en la ubicación restringida correcta.',
      },
    ],
    howItWorks: [
      'Seleccione el PDF que está autorizado a redactar.',
      'Revise cada página en el navegador y use zoom si necesita posicionar cubiertas con cuidado.',
      'Arrastre rectángulos sobre cada región sensible que debe ocultarse.',
      'Genere una copia nueva del PDF con las cubiertas negras aplicadas visualmente.',
      'Abra el resultado descargado y revíselo antes de compartir fuera de la audiencia prevista.',
    ],
    tips: [
      'Revise el PDF exportado con zoom normal y alto; las cubiertas visuales deben ocultar por completo cada zona sensible.',
      'Si una página completa es sensible, use Organizar Páginas para eliminarla en lugar de cubrir muchas áreas separadas.',
      'Desbloquee PDFs cifrados primero si las páginas no se renderizan en el navegador.',
      'Use Rayos X de Archivo cuando también necesite inspeccionar metadatos antes de liberar un documento.',
      'No confíe en la memoria; revise todas las páginas tras exportar, porque IDs repetidos pueden aparecer en encabezados, pies y anexos.',
      'Para publicaciones muy reguladas, siga el proceso legal de su organización además de usar cubiertas visuales negras.',
    ],
    sections: [
      {
        id: 'visual-redaction',
        heading: 'Qué significa redacción visual en PDF',
        level: 2,
        paragraphs: [
          'Esta herramienta pinta rectángulos opacos en una copia nueva del PDF. Está pensada para compartir de forma práctica en el navegador cuando necesita cajas negras visibles sobre información que el destinatario no debe leer. El archivo original queda intacto, lo que permite conservar el registro completo bajo los controles correctos.',
          'Como el método es visual, revisar la salida importa. Abra la copia descargada, amplíe la página, pruebe seleccionar texto cercano si su lector lo permite y confirme que ningún valor sensible queda visible en los bordes de una cubierta. Para discovery, publicación pública o flujos regulados, combine esta revisión con el procedimiento formal de redacción de su organización.',
        ],
        bullets: [
          'Cubiertas negras opacas se aplican a una copia nueva del PDF',
          'El archivo de origen no se sobrescribe con la exportación',
          'La revisión manual sigue siendo parte del flujo de redacción',
        ],
      },
      {
        id: 'privacy',
        heading: 'Procesamiento local en el navegador',
        level: 2,
        paragraphs: [
          'La redacción suele tocar la versión más sensible de un documento. PDFWINDOWS ejecuta este flujo en el navegador para que los bytes del PDF no se envíen a una cola de redacción en la nube solo para dibujar cubiertas sobre algunos campos. Es útil para registros de clientes, archivos de personal, estados financieros y borradores tempranos.',
          'El procesamiento local no elimina el cuidado después de descargar. Guarde la copia redactada en la ubicación correcta, nómbrela con claridad y evite enviar el original completo por error. Si la copia redactada debe salir del equipo, considere aplicar protección con contraseña después de revisar.',
        ],
      },
      {
        id: 'what-to-cover',
        heading: 'Detalles comunes para cubrir',
        level: 2,
        paragraphs: [
          'La información sensible no siempre aparece en el párrafo principal. Puede estar en encabezados, pies, sellos, comentarios aplanados en escaneos, etiquetas QR, márgenes, listas de anexos y bloques de firma. Recorra todas las páginas antes de exportar en lugar de asumir que la primera instancia visible es la única.',
          'Los objetivos típicos incluyen documentos oficiales, datos bancarios, números de cuenta, fechas de nacimiento, direcciones, teléfonos, correos, detalles médicos, precios confidenciales, notas de negociación y comentarios internos de aprobación. La meta es conservar contexto útil mientras oculta información que el destinatario no debe recibir.',
        ],
      },
      {
        id: 'redact-vs-organize',
        heading: 'Redactar versus quitar páginas',
        level: 2,
        paragraphs: [
          'Si solo unos campos de una página son sensibles, Redacción PDF es la herramienta adecuada porque el resto de la página puede seguir legible. Dibuje cajas con precisión alrededor de las regiones que debe ocultar y luego verifique que la copia final comunica lo necesario sin revelar el contenido cubierto.',
          'Si una página completa no debe compartirse, Organizar Páginas PDF suele ser más limpio. Elimine la página y exporte un documento menor en lugar de cubrir toda la hoja. La copia del destinatario queda más fácil de leer y evita dejar una página casi toda negra.',
        ],
      },
      {
        id: 'release-checklist',
        heading: 'Checklist de publicación',
        level: 3,
        paragraphs: [
          'Antes de enviar el PDF redactado, compárelo con la audiencia y el propósito. Un proveedor puede necesitar totales de factura, pero no datos bancarios; una pieza pública puede necesitar fechas, pero no direcciones; un revisor puede necesitar diseño, pero no identificadores personales.',
          'Después de descargar, reabra el archivo desde el disco en lugar de confiar solo en la vista de edición. Esa revisión final detecta cubiertas mal ubicadas, páginas omitidas o copias exportadas con nombre incorrecto antes de que salgan de su dispositivo.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿El texto bajo la caja negra se destruye permanentemente?',
        a: 'La herramienta aplica cubiertas visuales opacas en la copia exportada. Revise siempre el resultado y use el proceso formal de su organización para publicaciones muy sensibles.',
      },
      {
        q: '¿Redacción PDF sube mi archivo?',
        a: 'No. El flujo se ejecuta en el navegador, y el PDF no se envía a servidores de PDFWINDOWS.',
      },
      {
        q: '¿Se sobrescribe el PDF original?',
        a: 'No. Descarga una copia nueva redactada. Mantenga el original en su ubicación restringida correcta si aún necesita el registro completo.',
      },
      {
        q: '¿La herramienta rompe un PDF protegido?',
        a: 'No. Si el PDF exige contraseña de apertura, desbloquéelo primero con la contraseña legítima. Redacción PDF no adivina ni evita contraseñas desconocidas.',
      },
    ],
    relatedTools: ['/organizar-paginas-pdf', '/desbloquear-pdf', '/raio-x-de-arquivo', '/pdf-password'],
    cta: defaultCta('es', 'Redacción PDF'),
  },
};
