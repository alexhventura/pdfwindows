import type { LanguageType } from '../../types';
import type { ToolRichContent } from './types';
import { privacyFaq, defaultCta } from './helpers';

export interface LocalToolLangSpec {
  toolName: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  promise: string;
  limit: string;
  workflow: string;
  extraFaq: Array<{ q: string; a: string }>;
  cases: Array<{ title: string; body: string }>;
  tips: string[];
  how: string[];
}

function fitMetaDescription(text: string): string {
  let s = text.replace(/\s+/g, ' ').trim();
  if (s.length > 160) {
    s = s.slice(0, 159);
    const cut = s.lastIndexOf(' ');
    if (cut >= 140) s = s.slice(0, cut);
    if (!/[.!?]$/.test(s)) s = `${s.replace(/[,:;–—-]+$/, '')}.`;
  }
  const pad = ' Local processing, no upload.';
  while (s.length < 140) {
    const next = `${s}${s.endsWith('.') ? '' : '.'}${pad}`;
    if (next.length > 160) {
      const room = 160 - s.length;
      if (room >= 8) s = `${s} Local.`.slice(0, 160);
      break;
    }
    s = next;
  }
  if (s.length > 160) s = s.slice(0, 160).trim();
  return s;
}

function langPack(lang: LanguageType, spec: LocalToolLangSpec, related: string[]): ToolRichContent {
  const localStay =
    lang === 'pt'
      ? `O ${spec.toolName} do PDFWINDOWS corre só no navegador. O arquivo permanece na memória da aba, o original no disco não é sobrescrito, e fechar a página descarta a cópia de trabalho. Não há fila na nuvem, conta obrigatória nem envio dos bytes para os servidores do PDFWINDOWS.`
      : lang === 'es'
        ? `El ${spec.toolName} de PDFWINDOWS corre solo en el navegador. El archivo permanece en la memoria de la pestaña, el original en disco no se sobrescribe, y cerrar la página descarta la copia de trabajo. No hay cola en la nube, cuenta obligatoria ni envío de bytes a los servidores de PDFWINDOWS.`
        : `${spec.toolName} on PDFWINDOWS runs only in the browser. The file stays in tab memory, the original on disk is not overwritten, and closing the page discards the working copy. There is no cloud queue, required account, or upload of bytes to PDFWINDOWS servers.`;

  const pairing =
    lang === 'pt'
      ? `Encaixe esta ferramenta no resto da suíte local: desbloqueie um PDF cifrado antes, organize páginas se a ordem estiver errada, rode OCR quando não houver camada de texto, e proteja a cópia final com senha se ela for sair da sua rede. Cada etapa continua no aparelho.`
      : lang === 'es'
        ? `Encaje esta herramienta en el resto de la suite local: desbloquee un PDF cifrado antes, organice páginas si el orden está mal, ejecute OCR cuando no haya capa de texto, y proteja la copia final con contraseña si sale de su red. Cada etapa sigue en el aparato.`
        : `Fit this tool into the rest of the local suite: unlock an encrypted PDF first, organize pages if the order is wrong, run OCR when there is no text layer, and password-protect the final copy if it will leave your network. Each step stays on the device.`;

  const review =
    lang === 'pt'
      ? `Abra o download no leitor que você já usa, confira páginas representativas e só então arquive ou envie. O PDFWINDOWS entrega uma cópia nova de propósito: o ficheiro de origem permanece o registo que você já tinha. Releia em zoom, confirme o nome do ficheiro e não substitua o original até a equipa validar. Ficheiros enormes podem esgotar a memória da aba: feche outras ferramentas pesadas, recorte páginas a mais com Organizar e volte a processar. Esta disciplina evita misturar a cópia de trabalho com o arquivo oficial.`
      : lang === 'es'
        ? `Abra la descarga en el lector que ya usa, revise páginas representativas y solo entonces archive o envíe. PDFWINDOWS entrega una copia nueva a propósito: el archivo de origen sigue siendo el registro que usted ya tenía. Relea en zoom, confirme el nombre del archivo y no sustituya el original hasta que el equipo valide. Los archivos enormes pueden agotar la memoria de la pestaña: cierre otras herramientas pesadas, recorte páginas de más con Organizar y vuelva a procesar. Esta disciplina evita mezclar la copia de trabajo con el archivo oficial.`
        : `Open the download in the reader you already use, check representative pages, and only then archive or send it. PDFWINDOWS delivers a new copy on purpose: the source file remains the record you already had. Recheck at zoom, confirm the file name, and do not replace the original until the team validates it. Huge files can exhaust tab memory: close other heavy tools, trim extra pages with Organize, and process again. That discipline keeps the working copy from replacing the official record.`;

  const deviceNotes =
    lang === 'pt'
      ? `O motor corre no JavaScript da aba, então o limite prático é a memória do aparelho, não um servidor distante. Tablets antigos, abas com dezenas de PDFs abertos e ficheiros de centenas de megabytes podem falhar mesmo quando o formato é suportado. Feche o Conversor em lote, recarregue a página e processe um ficheiro de cada vez. Gravar o resultado no disco é o único passo que persiste: até lá, um crash do navegador apaga o estado. Isso é o preço de não enviar o documento para a nuvem, e é também a garantia de que o PDFWINDOWS não guarda uma cópia sua.`
      : lang === 'es'
        ? `El motor corre en el JavaScript de la pestaña, así que el límite práctico es la memoria del aparato, no un servidor lejano. Tabletas antiguas, pestañas con decenas de PDF abiertos y archivos de cientos de megabytes pueden fallar aunque el formato esté soportado. Cierre el Conversor por lotes, recargue la página y procese un archivo cada vez. Guardar el resultado en disco es el único paso que persiste: hasta entonces, un fallo del navegador borra el estado. Ese es el precio de no enviar el documento a la nube, y también la garantía de que PDFWINDOWS no guarda una copia suya.`
        : `The engine runs in the tab’s JavaScript, so the practical limit is device memory, not a distant server. Older tablets, tabs with dozens of PDFs open, and files of hundreds of megabytes can fail even when the format is supported. Close the batch Converter, reload the page, and process one file at a time. Saving the result to disk is the only step that persists: until then, a browser crash wipes the state. That is the cost of not sending the document to the cloud, and it is also the guarantee that PDFWINDOWS does not keep a copy of yours.`;

  const qualityLoop =
    lang === 'pt'
      ? `Trate cada ferramenta local como uma estação da linha, não como um substituto de suíte paga de desktop. Extraia texto, rode OCR, recorte, numere, assine visualmente, proteja e só depois envie. Se o resultado visual precisar de milímetros idênticos ao original, o caminho honesto é Adobe, LibreOffice ou o gerador que criou o ficheiro. O PDFWINDOWS existe para o trabalho diário em que privacidade e velocidade importam mais do que uma prova certificada. Documente internamente o que cada cópia faz — rascunho, versão para e-mail, arquivo de consulta — para ninguém arquivar a saída errada.`
      : lang === 'es'
        ? `Trate cada herramienta local como una estación de la línea, no como un sustituto de una suite de escritorio de pago. Extraiga texto, ejecute OCR, recorte, numere, firme visualmente, proteja y solo después envíe. Si el resultado visual necesita milímetros idénticos al original, el camino honesto es Adobe, LibreOffice o el generador que creó el archivo. PDFWINDOWS existe para el trabajo diario en el que privacidad y velocidad importan más que una prueba certificada. Documente internamente qué hace cada copia — borrador, versión para correo, archivo de consulta — para que nadie archive la salida equivocada.`
        : `Treat each local tool as a station on the line, not as a paid desktop-suite replacement. Extract text, run OCR, crop, number, stamp a visual signature, protect, and only then send. If the visual result must match the original to the millimetre, the honest path is Adobe, LibreOffice, or the generator that created the file. PDFWINDOWS exists for daily work where privacy and speed matter more than a certified proof. Document internally what each copy is for — draft, email version, reference archive — so nobody files the wrong output.`;

  const intro = `${spec.promise} ${spec.limit} ${localStay}`;

  const sectionHeadings =
    lang === 'pt'
      ? {
          a: 'O que esta ferramenta faz de verdade',
          b: 'Limites honestos, sem marketing de conversão mágica',
          c: 'Fluxo local e como encaixar nas outras ferramentas',
          d: 'Memória do aparelho, revisão e o que não prometemos',
        }
      : lang === 'es'
        ? {
            a: 'Qué hace de verdad esta herramienta',
            b: 'Límites honestos, sin marketing de conversión mágica',
            c: 'Flujo local y cómo encajarla con las demás herramientas',
            d: 'Memoria del aparato, revisión y lo que no prometemos',
          }
        : {
            a: 'What this tool actually does',
            b: 'Honest limits, without magic-conversion marketing',
            c: 'Local workflow and how it fits the other tools',
            d: 'Device memory, review, and what we do not promise',
          };

  return {
    title: spec.title,
    description: fitMetaDescription(spec.description),
    keywords: spec.keywords,
    h1: spec.h1,
    intro,
    toolName: spec.toolName,
    benefits: [
      lang === 'pt' ? 'Processamento 100% local no navegador' : lang === 'es' ? 'Procesamiento 100% local en el navegador' : '100% local processing in the browser',
      lang === 'pt' ? 'O arquivo original permanece intacto no disco' : lang === 'es' ? 'El archivo original permanece intacto en el disco' : 'The original file stays intact on disk',
      lang === 'pt' ? 'Sem cadastro e sem fila na nuvem' : lang === 'es' ? 'Sin registro y sin cola en la nube' : 'No account and no cloud queue',
      lang === 'pt' ? 'Limitações descritas na própria página' : lang === 'es' ? 'Limitaciones descritas en la propia página' : 'Limitations described on the page itself',
      lang === 'pt' ? 'Funciona depois que a página carrega, inclusive offline' : lang === 'es' ? 'Funciona cuando la página ya cargó, incluso offline' : 'Works after the page loads, including offline',
      lang === 'pt' ? 'Encaixa nas outras ferramentas locais da suíte' : lang === 'es' ? 'Encaja con las demás herramientas locales de la suite' : 'Fits the other local tools in the suite',
    ],
    useCases: spec.cases,
    howItWorks: spec.how,
    tips: spec.tips,
    sections: [
      {
        id: 'what-it-does',
        heading: sectionHeadings.a,
        level: 2,
        paragraphs: [spec.promise, `${localStay} ${review}`],
      },
      {
        id: 'honest-limits',
        heading: sectionHeadings.b,
        level: 2,
        paragraphs: [
          spec.limit,
          lang === 'pt'
            ? 'Ferramentas na nuvem prometem layout idêntico, certificado ISO ou recuperação milagrosa de ficheiro destruído. O PDFWINDOWS só oferece o que o navegador consegue fazer com bibliotecas locais. Se o seu caso exige motor de paginação de desktop, perfil ICC de impressão ou laboratório forense, use o software adequado e trate esta página como um atalho honesto para o dia a dia.'
            : lang === 'es'
              ? 'Las herramientas en la nube prometen diseño idéntico, certificado ISO o recuperación milagrosa de un archivo destruido. PDFWINDOWS solo ofrece lo que el navegador puede hacer con bibliotecas locales. Si su caso exige motor de maquetación de escritorio, perfil ICC de impresión o laboratorio forense, use el software adecuado y trate esta página como un atajo honesto para el día a día.'
              : 'Cloud tools promise identical layout, an ISO certificate, or miraculous recovery of a destroyed file. PDFWINDOWS only offers what the browser can do with local libraries. If your case needs a desktop layout engine, a printer ICC profile, or a forensics lab, use the right software and treat this page as an honest shortcut for everyday work.',
        ],
      },
      {
        id: 'local-workflow',
        heading: sectionHeadings.c,
        level: 2,
        paragraphs: [spec.workflow, pairing],
      },
      {
        id: 'device-and-review',
        heading: sectionHeadings.d,
        level: 2,
        paragraphs: [deviceNotes, qualityLoop, review],
      },
    ],
    faq: [...privacyFaq(lang), ...spec.extraFaq],
    relatedTools: related,
    cta: defaultCta(lang, spec.toolName),
  };
}

export function buildLocalToolArticle(
  related: string[],
  langs: Record<LanguageType, LocalToolLangSpec>
): Record<LanguageType, ToolRichContent> {
  return {
    en: langPack('en', langs.en, related),
    pt: langPack('pt', langs.pt, related),
    es: langPack('es', langs.es, related),
  };
}
