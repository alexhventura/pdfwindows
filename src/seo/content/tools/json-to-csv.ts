import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const JSON_TO_CSV_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'JSON to CSV Online Offline | PDFWINDOWS',
    description:
      'Convert JSON arrays to CSV spreadsheets in your browser. Flatten structured data locally for Excel and analysis — private, no upload.',
    keywords:
      'json to csv, convert json offline, json flatten csv browser, export json spreadsheet free, json csv converter local',
    h1: 'JSON to CSV',
    intro:
      'Dashboards, log aggregators, and REST endpoints deliver JSON — but stakeholders still want Excel. Flattening nested objects into comma-separated rows by hand is error-prone, and uploading API responses to random online converters leaks tokens, user records, and proprietary metrics. PDFWINDOWS converts JSON to CSV in the browser: paste or upload structured data, map array elements to columns locally, and download a spreadsheet-ready file without sending payloads to external parsing infrastructure. Whether you are sharing incident snapshots with finance or preparing a one-off vendor comparison, the flattened CSV opens directly in Excel and Google Sheets with headers inferred from your JSON keys.',
    toolName: 'JSON to CSV',
    benefits: [
      'Flatten JSON arrays into CSV rows with headers',
      'All parsing happens on your device',
      'Fast turnaround for ad-hoc reports and QA exports',
      'No account or API rate limits',
      'Round-trip with CSV to JSON for verification',
    ],
    useCases: [
      {
        title: 'Analytics and BI handoff',
        body:
          'Engineers export JSON query results from internal APIs for finance reviewers who work in Excel. Local conversion keeps revenue and cohort metrics inside the corporate device boundary.',
      },
      {
        title: 'Support and operations tickets',
        body:
          'Support tooling returns JSON lists of incidents or user flags. Converting to CSV lets team leads sort, filter, and pivot in spreadsheets without granting everyone direct database access.',
      },
      {
        title: 'Test and staging data cleanup',
        body:
          'QA captures JSON fixtures from network tabs and needs tabular views for bug reports. Browser conversion sanitizes and shares sample rows while full JSON with secrets stays off public tools.',
      },
      {
        title: 'Inventory and catalog feeds',
        body:
          'E-commerce JSON product feeds become merchant CSV templates for marketplaces that reject nested attributes. Process vendor JSON locally before uploading catalogs to partner portals.',
      },
      {
        title: 'Reverse migration after JSON edits',
        body:
          'Teams edit records in JSON after CSV to JSON import, then regenerate CSV for non-technical approvers. JSON to CSV closes the loop without desktop scripting.',
      },
    ],
    howItWorks: [
      'Paste JSON or upload a .json file.',
      'Select JSON to CSV conversion.',
      'The browser flattens array objects into tabular columns.',
      'Preview CSV output and adjust if the tool exposes options.',
      'Download the .csv file or copy delimited text.',
    ],
    tips: [
      'Input should be an array of objects for cleanest CSV — wrap single objects if needed.',
      'Nested objects may flatten with dotted keys or stringify — inspect output structure.',
      'Escape quotes in string values before sharing CSV with downstream importers.',
      'Large JSON payloads may slow the tab — trim to required fields first for smoother conversion.',
      'Validate round-trip by converting back with CSV to JSON on a sample row before bulk export.',
      'Remove auth tokens and PII fields from JSON before any export you will email externally.',
      'Sort object keys alphabetically in a formatter first when column order must stay consistent across exports.',
      'Preview the first five rows in Excel before sending CSV to external partners.',
    ],
    sections: [
      {
        id: 'flattening-rules',
        heading: 'How JSON flattens into columns',
        level: 2,
        paragraphs: [
          'Each object in a top-level array typically becomes one CSV row. Property names become header cells. Nested objects may expand into composite column names or serialized JSON strings depending on parser depth settings.',
          'Arrays inside objects are harder to represent in flat CSV — consider extracting them in a script or keeping JSON for those fields. When every record shares the same key set, spreadsheets import cleanly and filters work as expected across thousands of rows.',
        ],
      },
      {
        id: 'excel-compatibility',
        heading: 'CSV conventions for Excel and Sheets',
        level: 2,
        paragraphs: [
          'Excel expects UTF-8 with BOM in some locales for proper accent display. Commas inside values must be wrapped in double quotes. Line breaks inside fields also require quoting.',
        ],
        bullets: [
          'Header row first — required for pivot tables',
          'Consistent column order across exports',
          'Date fields as ISO strings reduce locale ambiguity',
        ],
      },
      {
        id: 'privacy-json',
        heading: 'Why local JSON conversion matters',
        level: 2,
        paragraphs: [
          'JSON dumps from production APIs often include emails, session IDs, and internal flags. Cloud flattening services create an unnecessary copy of that payload on shared disks. PDFWINDOWS processes JSON entirely in memory in your browser session.',
          'That matters when you flatten incident exports, customer success ticket batches, or pricing experiments that were never meant to leave your laptop. You keep control of retention, sharing, and deletion because no vendor bucket sits in the middle.',
        ],
      },
      {
        id: 'json-csv-pipeline',
        heading: 'JSON and CSV in integrated workflows',
        level: 2,
        paragraphs: [
          'Start from CSV to JSON when ingesting spreadsheets, transform in code or manually, then export JSON to CSV for business users. Pair with XML to JSON when upstream systems deliver XML instead of tabular files.',
        ],
        bullets: [
          'CSV to JSON — import spreadsheet data first',
          'XML to JSON — normalize XML feeds before flattening',
          'Code Cleaner — format JSON snippets before conversion',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Can I convert nested JSON?',
        a: 'Shallow nesting often flattens automatically. Deep trees may produce wide sparse columns or stringified blobs — simplify structure when possible.',
      },
      {
        q: 'What if my JSON is a single object, not an array?',
        a: 'Wrap it in an array with one element or use a tool path that accepts single objects — check output before bulk processing.',
      },
      {
        q: 'Does output use comma or semicolon delimiters?',
        a: 'Comma is the default CSV convention. Open in Excel using import wizard if locale expects semicolons.',
      },
      {
        q: 'Are numbers and booleans quoted in CSV?',
        a: 'Typically unquoted unless they contain delimiter characters. Verify importers accept the format.',
      },
      {
        q: 'Can I convert CSV back to JSON?',
        a: 'Yes — use CSV to JSON in PDFWINDOWS for round-trip validation after spreadsheet edits.',
      },
    ],
    relatedTools: ['/csv-to-json', '/xml-to-json', '/limpador-codigo'],
    cta: defaultCta('en', 'JSON to CSV'),
  },
  pt: {
    title: 'JSON para CSV Online Offline | PDFWINDOWS',
    description:
      'Converta arrays JSON em planilhas CSV no navegador. Achate dados estruturados localmente para Excel e análise — privado, sem upload.',
    keywords:
      'json para csv, converter json offline, achatar json csv navegador, exportar json planilha gratis, conversor json csv local',
    h1: 'JSON para CSV',
    intro:
      'Dashboards, agregadores de log e endpoints REST entregam JSON — mas stakeholders ainda querem Excel. Achatar objetos aninhados em linhas separadas por vírgula manualmente é propenso a erro, e enviar respostas de API a conversores online vaza tokens, registros de usuários e métricas proprietárias. O PDFWINDOWS converte JSON para CSV no navegador: cole ou envie dados estruturados, mapeie elementos de array para colunas localmente e baixe arquivo pronto para planilha sem enviar payloads a infraestrutura de parsing externa. Seja para compartilhar snapshot de incidente com finanças ou preparar comparação pontual de fornecedor, o CSV achatado abre direto no Excel e Google Planilhas com cabeçalhos inferidos das chaves JSON.',
    toolName: 'JSON para CSV',
    benefits: [
      'Achate arrays JSON em linhas CSV com cabeçalhos',
      'Todo parsing acontece no dispositivo',
      'Resposta rápida para relatórios ad hoc e exports de QA',
      'Sem conta ou limites de taxa de API',
      'Ida e volta com CSV para JSON para verificação',
    ],
    useCases: [
      {
        title: 'Entrega para analytics e BI',
        body:
          'Engenheiros exportam resultados JSON de APIs internas para revisores financeiros que trabalham no Excel. Conversão local mantém receita e métricas de coorte dentro do perímetro corporativo do dispositivo.',
      },
      {
        title: 'Tickets de suporte e operações',
        body:
          'Ferramentas de suporte retornam listas JSON de incidentes ou flags de usuário. Converter para CSV permite que líderes ordenem, filtrem e pivotem em planilhas sem dar acesso direto ao banco a todos.',
      },
      {
        title: 'Limpeza de dados de teste e staging',
        body:
          'QA captura fixtures JSON de abas de rede e precisa de visão tabular para relatórios de bug. Conversão no navegador compartilha linhas de amostra enquanto JSON completo com segredos fica fora de ferramentas públicas.',
      },
      {
        title: 'Feeds de inventário e catálogo',
        body:
          'Feeds JSON de produtos e-commerce viram templates CSV para marketplaces que rejeitam atributos aninhados. Processe JSON de fornecedor localmente antes de subir catálogos em portais de parceiros.',
      },
      {
        title: 'Migração reversa após edições JSON',
        body:
          'Equipes editam registros em JSON após import CSV para JSON e regeneram CSV para aprovadores não técnicos. JSON para CSV fecha o ciclo sem scripts desktop.',
      },
    ],
    howItWorks: [
      'Cole JSON ou envie arquivo .json.',
      'Selecione conversão JSON para CSV.',
      'O navegador achata objetos de array em colunas tabulares.',
      'Visualize saída CSV e ajuste se a ferramenta expuser opções.',
      'Baixe o arquivo .csv ou copie texto delimitado.',
    ],
    tips: [
      'Entrada deve ser array de objetos para CSV mais limpo — envolva objetos únicos se necessário.',
      'Objetos aninhados podem achatar com chaves pontuadas ou stringify — inspecione estrutura de saída.',
      'Escape aspas em valores string antes de compartilhar CSV com importadores.',
      'Payloads JSON grandes podem lentificar a aba — corte para campos necessários primeiro.',
      'Valide ida e volta convertendo de volta com CSV para JSON em amostra.',
      'Remova tokens de auth e campos PII do JSON antes de exportar por e-mail.',
    ],
    sections: [
      {
        id: 'regras-achatamento',
        heading: 'Como JSON achata em colunas',
        level: 2,
        paragraphs: [
          'Cada objeto em array de topo costuma virar uma linha CSV. Nomes de propriedade viram células de cabeçalho. Objetos aninhados podem expandir em nomes de coluna compostos ou strings JSON serializadas conforme profundidade do parser.',
          'Arrays dentro de objetos são mais difíceis em CSV plano — considere extraí-los em script ou manter JSON nesses campos.',
        ],
      },
      {
        id: 'compatibilidade-excel',
        heading: 'Convenções CSV para Excel e Sheets',
        level: 2,
        paragraphs: [
          'Excel espera UTF-8 com BOM em alguns locales para acentos corretos. Vírgulas dentro de valores devem ficar entre aspas duplas. Quebras de linha em campos também exigem aspas.',
        ],
        bullets: [
          'Linha de cabeçalho primeiro — necessária para tabelas dinâmicas',
          'Ordem de colunas consistente entre exports',
          'Datas como strings ISO reduzem ambiguidade de locale',
        ],
      },
      {
        id: 'privacidade-json',
        heading: 'Por que conversão JSON local importa',
        level: 2,
        paragraphs: [
          'Dumps JSON de APIs de produção frequentemente incluem e-mails, IDs de sessão e flags internas. Serviços de achatamento na nuvem criam cópia desnecessária desse payload em discos compartilhados. O PDFWINDOWS processa JSON inteiramente na memória da sessão do navegador.',
        ],
      },
      {
        id: 'pipeline-json-csv',
        heading: 'JSON e CSV em fluxos integrados',
        level: 2,
        paragraphs: [
          'Comece de CSV para JSON ao ingerir planilhas, transforme em código ou manualmente, depois exporte JSON para CSV para usuários de negócio. Combine com XML para JSON quando sistemas upstream entregam XML em vez de arquivos tabulares.',
        ],
        bullets: [
          'CSV para JSON — importar dados de planilha primeiro',
          'XML para JSON — normalizar feeds XML antes de achatar',
          'Limpador de Código — formatar trechos JSON antes da conversão',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Posso converter JSON aninhado?',
        a: 'Aninhamento raso costuma achatar automaticamente. Árvores profundas podem gerar colunas largas esparsas ou blobs stringificados — simplifique estrutura quando possível.',
      },
      {
        q: 'E se meu JSON for objeto único, não array?',
        a: 'Envolva em array com um elemento ou use caminho que aceite objetos únicos — verifique saída antes de processamento em massa.',
      },
      {
        q: 'A saída usa vírgula ou ponto e vírgula?',
        a: 'Vírgula é convenção CSV padrão. Abra no Excel com assistente de importação se o locale esperar ponto e vírgula.',
      },
      {
        q: 'Números e booleanos vão entre aspas no CSV?',
        a: 'Tipicamente sem aspas a menos que contenham delimitadores. Verifique se importadores aceitam o formato.',
      },
      {
        q: 'Posso converter CSV de volta para JSON?',
        a: 'Sim — use CSV para JSON no PDFWINDOWS para validação ida e volta após edições na planilha.',
      },
    ],
    relatedTools: ['/csv-to-json', '/xml-to-json', '/limpador-codigo'],
    cta: defaultCta('pt', 'JSON para CSV'),
  },
  es: {
    title: 'JSON a CSV Online Offline | PDFWINDOWS',
    description:
      'Convierta arrays JSON a hojas CSV en su navegador. Aplane datos estructurados localmente para Excel y análisis — privado, sin subida.',
    keywords:
      'json a csv, convertir json offline, aplanar json csv navegador, exportar json hoja gratis, conversor json csv local',
    h1: 'JSON a CSV',
    intro:
      'Los dashboards, agregadores de logs y endpoints REST entregan JSON — pero los stakeholders aún quieren Excel. Aplanar objetos anidados en filas separadas por comas a mano es propenso a errores, y subir respuestas API a conversores en línea filtra tokens, registros de usuario y métricas propietarias. PDFWINDOWS convierte JSON a CSV en el navegador: pegue o suba datos estructurados, mapee elementos de array a columnas localmente y descargue archivo listo para hoja sin enviar payloads a infraestructura de análisis externa. El CSV resultante abre directamente en Excel con encabezados inferidos de sus claves JSON.',
    toolName: 'JSON a CSV',
    benefits: [
      'Aplane arrays JSON en filas CSV con encabezados',
      'Todo el análisis ocurre en su dispositivo',
      'Respuesta rápida para informes ad hoc y exports de QA',
      'Sin cuenta ni límites de tasa API',
      'Ida y vuelta con CSV a JSON para verificación',
    ],
    useCases: [
      {
        title: 'Entrega para analytics y BI',
        body:
          'Ingenieros exportan resultados JSON de APIs internas para revisores financieros que trabajan en Excel. La conversión local mantiene ingresos y métricas de cohorte dentro del perímetro corporativo del dispositivo.',
      },
      {
        title: 'Tickets de soporte y operaciones',
        body:
          'Herramientas de soporte devuelven listas JSON de incidentes o flags de usuario. Convertir a CSV permite que líderes ordenen, filtren y pivoten en hojas sin dar acceso directo a la base a todos.',
      },
      {
        title: 'Limpieza de datos de prueba y staging',
        body:
          'QA captura fixtures JSON de pestañas de red y necesita vista tabular para informes de error. La conversión en navegador comparte filas de muestra mientras JSON completo con secretos queda fuera de herramientas públicas.',
      },
      {
        title: 'Feeds de inventario y catálogo',
        body:
          'Feeds JSON de productos e-commerce se vuelven plantillas CSV para marketplaces que rechazan atributos anidados. Procese JSON de proveedor localmente antes de subir catálogos a portales de socios.',
      },
      {
        title: 'Migración inversa tras ediciones JSON',
        body:
          'Equipos editan registros en JSON tras import CSV a JSON y regeneran CSV para aprobadores no técnicos. JSON a CSV cierra el ciclo sin scripts de escritorio.',
      },
    ],
    howItWorks: [
      'Pegue JSON o suba archivo .json.',
      'Seleccione conversión JSON a CSV.',
      'El navegador aplana objetos de array en columnas tabulares.',
      'Previsualice salida CSV y ajuste si la herramienta expone opciones.',
      'Descargue archivo .csv o copie texto delimitado.',
    ],
    tips: [
      'La entrada debe ser array de objetos para CSV más limpio — envuelva objetos únicos si hace falta.',
      'Objetos anidados pueden aplanarse con claves punteadas o stringify — inspeccione estructura de salida.',
      'Escape comillas en valores string antes de compartir CSV con importadores.',
      'Payloads JSON grandes pueden ralentizar la pestaña — recorte a campos necesarios primero.',
      'Valide ida y vuelta convirtiendo de nuevo con CSV a JSON en muestra.',
      'Elimine tokens de auth y campos PII del JSON antes de exportar por correo.',
    ],
    sections: [
      {
        id: 'reglas-aplanado',
        heading: 'Cómo JSON se aplana en columnas',
        level: 2,
        paragraphs: [
          'Cada objeto en array de nivel superior suele volverse una fila CSV. Los nombres de propiedad se vuelven celdas de encabezado. Objetos anidados pueden expandirse en nombres de columna compuestos o cadenas JSON serializadas según profundidad del parser.',
          'Arrays dentro de objetos son más difíciles en CSV plano — considere extraerlos en script o mantener JSON en esos campos.',
        ],
      },
      {
        id: 'compatibilidad-excel',
        heading: 'Convenciones CSV para Excel y Sheets',
        level: 2,
        paragraphs: [
          'Excel espera UTF-8 con BOM en algunos locales para acentos correctos. Las comas dentro de valores deben ir entre comillas dobles. Saltos de línea en campos también requieren comillas.',
        ],
        bullets: [
          'Fila de encabezado primero — necesaria para tablas dinámicas',
          'Orden de columnas consistente entre exports',
          'Fechas como cadenas ISO reducen ambigüedad de locale',
        ],
      },
      {
        id: 'privacidad-json',
        heading: 'Por qué importa la conversión JSON local',
        level: 2,
        paragraphs: [
          'Volcados JSON de APIs de producción a menudo incluyen correos, IDs de sesión y flags internas. Servicios de aplanado en la nube crean copia innecesaria de ese payload en discos compartidos. PDFWINDOWS procesa JSON completamente en memoria de la sesión del navegador.',
        ],
      },
      {
        id: 'pipeline-json-csv',
        heading: 'JSON y CSV en flujos integrados',
        level: 2,
        paragraphs: [
          'Empiece desde CSV a JSON al ingerir hojas, transforme en código o manualmente, luego exporte JSON a CSV para usuarios de negocio. Combine con XML a JSON cuando sistemas upstream entreguen XML en lugar de archivos tabulares.',
        ],
        bullets: [
          'CSV a JSON — importar datos de hoja primero',
          'XML a JSON — normalizar feeds XML antes de aplanar',
          'Limpiador de Código — formatear fragmentos JSON antes de conversión',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Puedo convertir JSON anidado?',
        a: 'Anidamiento superficial suele aplanarse automáticamente. Árboles profundos pueden producir columnas anchas dispersas o blobs stringificados — simplifique estructura cuando sea posible.',
      },
      {
        q: '¿Y si mi JSON es objeto único, no array?',
        a: 'Envuélvalo en array con un elemento o use ruta que acepte objetos únicos — verifique salida antes de procesamiento masivo.',
      },
      {
        q: '¿La salida usa coma o punto y coma?',
        a: 'La coma es convención CSV estándar. Abra en Excel con asistente de importación si el locale espera punto y coma.',
      },
      {
        q: '¿Números y booleanos van entre comillas en CSV?',
        a: 'Típicamente sin comillas salvo que contengan delimitadores. Verifique que importadores acepten el formato.',
      },
      {
        q: '¿Puedo convertir CSV de vuelta a JSON?',
        a: 'Sí — use CSV a JSON en PDFWINDOWS para validación de ida y vuelta tras ediciones en hoja.',
      },
    ],
    relatedTools: ['/csv-to-json', '/xml-to-json', '/limpador-codigo'],
    cta: defaultCta('es', 'JSON a CSV'),
  },
};
