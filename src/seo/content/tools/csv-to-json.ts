import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const CSV_TO_JSON_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'CSV to JSON Online Offline | PDFWINDOWS',
    description:
      'Convert CSV spreadsheets to structured JSON in your browser. Parse delimited data locally for APIs and scripts — no upload, no account.',
    keywords:
      'csv to json, convert csv offline, csv parser browser, spreadsheet to json free, csv json converter local',
    h1: 'CSV to JSON',
    intro:
      'APIs, configuration files, and modern data pipelines speak JSON — but finance, operations, and marketing teams still live in CSV exports from Excel, Google Sheets, and legacy ERP systems. Pasting those exports into random online converters sends customer lists, payroll rows, and pricing tables through unknown servers. PDFWINDOWS converts CSV to JSON entirely in your browser: upload or paste delimited text, parse headers and rows locally, and copy or download structured JSON ready for fetch calls, test fixtures, or ETL scripts — with zero mandatory cloud upload. Delimiter quirks, quoted fields, and UTF-8 accents are handled in-session so you can move from spreadsheet to API payload in one private step.',
    toolName: 'CSV to JSON',
    benefits: [
      'Parse CSV headers and rows into JSON arrays or objects',
      'Processing stays on your device — no data exfiltration',
      'Instant results for prototypes and one-off migrations',
      'No signup, API keys, or rate limits',
      'Pairs with JSON to CSV for round-trip editing',
    ],
    useCases: [
      {
        title: 'API mock data from spreadsheets',
        body:
          'Frontend developers export a sample customer or product sheet from Excel and need JSON for Storybook mocks and integration tests. Local conversion keeps production-like field names off public converter logs.',
      },
      {
        title: 'Config and feature-flag imports',
        body:
          'DevOps teams maintain allowlists in spreadsheets during rollout planning. Converting to JSON locally produces files ready for deployment pipelines without exposing partner IDs to SaaS parsing tools.',
      },
      {
        title: 'Migration between SaaS tools',
        body:
          'When moving from one CRM or helpdesk to another, interim CSV exports often need JSON shape for import wizards. Browser parsing handles the transform on a laptop that already holds the export — not a third-party ETL site.',
      },
      {
        title: 'Teaching data formats',
        body:
          'Instructors demonstrate how tabular data maps to nested structures. Students paste small sanitized samples and inspect JSON output side by side with CSV rows without installing Python or Node.',
      },
      {
        title: 'Quick validation of export files',
        body:
          'Analysts sanity-check vendor CSV dumps by converting to JSON and spotting malformed quoting, stray commas, or header mismatches before loading into a warehouse.',
      },
    ],
    howItWorks: [
      'Upload a .csv file or paste delimited text into the input area.',
      'Select CSV to JSON conversion.',
      'The browser parses rows using the detected or configured delimiter.',
      'Review structured JSON in the output panel.',
      'Copy to clipboard or download the .json file.',
    ],
    tips: [
      'Ensure the first row contains column headers for object-style JSON output.',
      'Watch for commas inside quoted fields — malformed quoting breaks row alignment.',
      'UTF-8 encoding avoids mojibake in international names and addresses.',
      'Large files may stress browser memory — split huge exports before converting.',
      'Round-trip through JSON to CSV to verify nothing was lost in translation.',
      'Strip sensitive columns in the spreadsheet before converting if sharing JSON output.',
      'Open the CSV in a text editor first when Excel shows garbled characters — re-save as UTF-8 before conversion.',
    ],
    sections: [
      {
        id: 'csv-structure',
        heading: 'How CSV maps to JSON structures',
        level: 2,
        paragraphs: [
          'CSV is a flat table: one record per line, fields separated by commas or semicolons. JSON can represent that table as an array of objects — each header becomes a property key — or as nested structures when you post-process further.',
          'The converter reads the header row as keys and subsequent rows as values, coercing numbers and booleans when the parser detects unquoted numeric or true/false tokens.',
        ],
      },
      {
        id: 'delimiter-quoting',
        heading: 'Delimiters, quoting, and edge cases',
        level: 2,
        paragraphs: [
          'European exports often use semicolon delimiters because commas appear in decimal numbers. Quoted fields may contain line breaks or embedded commas; the parser must respect quote pairing.',
        ],
        bullets: [
          'Comma-separated — most US/UK exports',
          'Semicolon-separated — common in EU locale Excel',
          'Quoted multiline cells — require strict RFC-style parsing',
        ],
      },
      {
        id: 'privacy-data',
        heading: 'Keeping spreadsheet data off third-party servers',
        level: 2,
        paragraphs: [
          'CSV files routinely contain PII: emails, phone numbers, salaries, and account IDs. Cloud converters create compliance risk under GDPR, HIPAA, and internal security policies. PDFWINDOWS never transmits your paste or upload for this transformation — parsing executes in JavaScript on your hardware.',
        ],
      },
      {
        id: 'csv-json-workflow',
        heading: 'CSV and JSON in your toolchain',
        level: 2,
        paragraphs: [
          'Convert CSV to JSON for API payloads, then edit JSON manually or feed it to XML to JSON sibling tools in reverse pipelines. After fixing structure in JSON, use JSON to CSV to regenerate a clean spreadsheet for non-technical stakeholders.',
        ],
        bullets: [
          'JSON to CSV — export edited JSON back to spreadsheet form',
          'XML to JSON — normalize vendor XML feeds next',
          'Code Cleaner — format resulting JSON snippets for readability',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'What JSON shape does the output use?',
        a: 'Typically an array of objects keyed by CSV header names. Exact structure may follow tool defaults — inspect output before production use.',
      },
      {
        q: 'Can I convert semicolon-delimited CSV?',
        a: 'Many exports use semicolons. If auto-detection fails, normalize the file in a spreadsheet app or adjust delimiter settings when available.',
      },
      {
        q: 'Are empty cells preserved?',
        a: 'Empty fields usually become empty strings or null depending on parser rules. Verify behavior on a small sample first.',
      },
      {
        q: 'Is there a row limit?',
        a: 'No server-side cap. Very large files are limited by browser memory and may need splitting.',
      },
      {
        q: 'Can I convert JSON back to CSV?',
        a: 'Yes — use the JSON to CSV tool in PDFWINDOWS for round-trip conversion after edits.',
      },
    ],
    relatedTools: ['/json-to-csv', '/xml-to-json', '/limpador-codigo'],
    cta: defaultCta('en', 'CSV to JSON'),
  },
  pt: {
    title: 'CSV para JSON Online Offline | PDFWINDOWS',
    description:
      'Converta planilhas CSV em JSON estruturado no navegador. Analise dados delimitados localmente para APIs e scripts — sem upload nem cadastro.',
    keywords:
      'csv para json, converter csv offline, parser csv navegador, planilha para json gratis, conversor csv json local',
    h1: 'CSV para JSON',
    intro:
      'APIs, arquivos de configuração e pipelines modernos falam JSON — mas finanças, operações e marketing ainda vivem em exportações CSV do Excel, Google Sheets e ERPs legados. Colar essas exportações em conversores aleatórios envia listas de clientes, folhas de pagamento e tabelas de preço por servidores desconhecidos. O PDFWINDOWS converte CSV para JSON inteiramente no navegador: envie ou cole texto delimitado, analise cabeçalhos e linhas localmente e copie ou baixe JSON estruturado pronto para fetch, fixtures de teste ou scripts ETL — sem upload obrigatório na nuvem.',
    toolName: 'CSV para JSON',
    benefits: [
      'Analise cabeçalhos e linhas CSV em arrays ou objetos JSON',
      'Processamento no dispositivo — sem exfiltração de dados',
      'Resultado instantâneo para protótipos e migrações pontuais',
      'Sem cadastro, chaves de API ou limites de taxa',
      'Combina com JSON para CSV para edição ida e volta',
    ],
    useCases: [
      {
        title: 'Dados mock de API a partir de planilhas',
        body:
          'Desenvolvedores frontend exportam amostra de clientes ou produtos do Excel e precisam de JSON para mocks no Storybook e testes de integração. Conversão local mantém nomes de campos parecidos com produção fora de logs de conversores públicos.',
      },
      {
        title: 'Importação de config e feature flags',
        body:
          'Equipes DevOps mantêm allowlists em planilhas durante rollouts. Converter para JSON localmente produz arquivos prontos para pipelines de deploy sem expor IDs de parceiros a ferramentas SaaS de parsing.',
      },
      {
        title: 'Migração entre ferramentas SaaS',
        body:
          'Ao mudar de CRM ou helpdesk, exportações CSV intermediárias muitas vezes precisam de formato JSON para assistentes de importação. Parsing no navegador transforma no laptop que já tem o export — não em site ETL de terceiros.',
      },
      {
        title: 'Ensino de formatos de dados',
        body:
          'Instrutores mostram como dados tabulares mapeiam para estruturas aninhadas. Alunos colam amostras sanitizadas e inspecionam JSON ao lado das linhas CSV sem instalar Python ou Node.',
      },
      {
        title: 'Validação rápida de arquivos exportados',
        body:
          'Analistas conferem dumps CSV de fornecedores convertendo para JSON e detectando aspas malformadas, vírgulas soltas ou cabeçalhos inconsistentes antes de carregar no warehouse.',
      },
    ],
    howItWorks: [
      'Envie um arquivo .csv ou cole texto delimitado na área de entrada.',
      'Selecione conversão CSV para JSON.',
      'O navegador analisa linhas usando delimitador detectado ou configurado.',
      'Revise JSON estruturado no painel de saída.',
      'Copie para a área de transferência ou baixe o arquivo .json.',
    ],
    tips: [
      'Garanta que a primeira linha tenha cabeçalhos de coluna para JSON em estilo objeto.',
      'Cuidado com vírgulas dentro de campos entre aspas — aspas malformadas quebram alinhamento.',
      'Codificação UTF-8 evita mojibake em nomes e endereços internacionais.',
      'Arquivos grandes podem estressar memória do navegador — divida exports enormes antes.',
      'Faça ida e volta via JSON para CSV para verificar se nada se perdeu.',
      'Remova colunas sensíveis na planilha antes de converter se for compartilhar JSON.',
    ],
    sections: [
      {
        id: 'estrutura-csv',
        heading: 'Como CSV mapeia para estruturas JSON',
        level: 2,
        paragraphs: [
          'CSV é tabela plana: um registro por linha, campos separados por vírgulas ou ponto e vírgula. JSON pode representar essa tabela como array de objetos — cada cabeçalho vira chave de propriedade — ou estruturas aninhadas após pós-processamento.',
          'O conversor lê a linha de cabeçalho como chaves e linhas seguintes como valores, convertendo números e booleanos quando detecta tokens numéricos ou true/false sem aspas.',
        ],
      },
      {
        id: 'delimitador-aspas',
        heading: 'Delimitadores, aspas e casos extremos',
        level: 2,
        paragraphs: [
          'Exportações europeias costumam usar ponto e vírgula porque vírgulas aparecem em decimais. Campos entre aspas podem conter quebras de linha ou vírgulas embutidas; o parser deve respeitar pareamento de aspas.',
        ],
        bullets: [
          'Separado por vírgula — maioria dos exports US/UK',
          'Separado por ponto e vírgula — comum no Excel locale UE',
          'Células multilinha entre aspas — exigem parsing estilo RFC',
        ],
      },
      {
        id: 'privacidade-dados',
        heading: 'Manter dados de planilha fora de servidores de terceiros',
        level: 2,
        paragraphs: [
          'Arquivos CSV rotineiramente contêm PII: e-mails, telefones, salários e IDs de conta. Conversores na nuvem criam risco de compliance sob GDPR, HIPAA e políticas internas. O PDFWINDOWS nunca transmite sua cola ou upload nesta transformação — o parsing executa em JavaScript no seu hardware.',
        ],
      },
      {
        id: 'fluxo-csv-json',
        heading: 'CSV e JSON na sua toolchain',
        level: 2,
        paragraphs: [
          'Converta CSV para JSON para payloads de API, edite JSON manualmente ou encadeie com XML para JSON em pipelines reversos. Após corrigir estrutura em JSON, use JSON para CSV para regenerar planilha limpa para stakeholders não técnicos.',
        ],
        bullets: [
          'JSON para CSV — exportar JSON editado de volta para planilha',
          'XML para JSON — normalizar feeds XML de fornecedores em seguida',
          'Limpador de Código — formatar trechos JSON resultantes',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Qual formato JSON a saída usa?',
        a: 'Tipicamente um array de objetos com chaves dos cabeçalhos CSV. A estrutura exata pode seguir padrões da ferramenta — inspecione antes de uso em produção.',
      },
      {
        q: 'Posso converter CSV delimitado por ponto e vírgula?',
        a: 'Muitos exports usam ponto e vírgula. Se a detecção automática falhar, normalize no app de planilha ou ajuste delimitador quando disponível.',
      },
      {
        q: 'Células vazias são preservadas?',
        a: 'Campos vazios costumam virar strings vazias ou null conforme regras do parser. Verifique em amostra pequena primeiro.',
      },
      {
        q: 'Existe limite de linhas?',
        a: 'Sem teto no servidor. Arquivos muito grandes limitam-se à memória do navegador e podem precisar de divisão.',
      },
      {
        q: 'Posso converter JSON de volta para CSV?',
        a: 'Sim — use a ferramenta JSON para CSV no PDFWINDOWS após edições.',
      },
    ],
    relatedTools: ['/json-to-csv', '/xml-to-json', '/limpador-codigo'],
    cta: defaultCta('pt', 'CSV para JSON'),
  },
  es: {
    title: 'CSV a JSON Online Offline | PDFWINDOWS',
    description:
      'Convierta hojas CSV a JSON estructurado en su navegador. Analice datos delimitados localmente para APIs y scripts — sin subida ni registro.',
    keywords:
      'csv a json, convertir csv offline, parser csv navegador, hoja a json gratis, conversor csv json local',
    h1: 'CSV a JSON',
    intro:
      'Las APIs, archivos de configuración y pipelines modernos hablan JSON — pero finanzas, operaciones y marketing aún viven en exportaciones CSV de Excel, Google Sheets y ERP heredados. Pegar esas exportaciones en conversores aleatorios envía listas de clientes, nóminas y tablas de precios por servidores desconocidos. PDFWINDOWS convierte CSV a JSON completamente en su navegador: suba o pegue texto delimitado, analice encabezados y filas localmente y copie o descargue JSON estructurado listo para fetch, fixtures de prueba o scripts ETL — sin subida obligatoria a la nube.',
    toolName: 'CSV a JSON',
    benefits: [
      'Analice encabezados y filas CSV en arrays u objetos JSON',
      'El procesamiento permanece en su dispositivo — sin exfiltración de datos',
      'Resultado instantáneo para prototipos y migraciones puntuales',
      'Sin registro, claves API ni límites de tasa',
      'Combina con JSON a CSV para edición de ida y vuelta',
    ],
    useCases: [
      {
        title: 'Datos mock de API desde hojas de cálculo',
        body:
          'Desarrolladores frontend exportan muestra de clientes o productos de Excel y necesitan JSON para mocks en Storybook y pruebas de integración. La conversión local mantiene nombres de campo parecidos a producción fuera de registros de conversores públicos.',
      },
      {
        title: 'Importación de config y feature flags',
        body:
          'Equipos DevOps mantienen allowlists en hojas durante despliegues. Convertir a JSON localmente produce archivos listos para pipelines sin exponer IDs de socios a herramientas SaaS de análisis.',
      },
      {
        title: 'Migración entre herramientas SaaS',
        body:
          'Al cambiar de CRM o helpdesk, exportaciones CSV intermedias a menudo necesitan forma JSON para asistentes de importación. El análisis en navegador transforma en el portátil que ya tiene el export — no en sitio ETL de terceros.',
      },
      {
        title: 'Enseñanza de formatos de datos',
        body:
          'Instructores muestran cómo datos tabulares mapean a estructuras anidadas. Estudiantes pegan muestras sanitizadas e inspeccionan JSON junto a filas CSV sin instalar Python o Node.',
      },
      {
        title: 'Validación rápida de archivos exportados',
        body:
          'Analistas verifican volcados CSV de proveedores convirtiendo a JSON y detectando comillas malformadas, comas sueltas o encabezados inconsistentes antes de cargar en el warehouse.',
      },
    ],
    howItWorks: [
      'Suba un archivo .csv o pegue texto delimitado en el área de entrada.',
      'Seleccione conversión CSV a JSON.',
      'El navegador analiza filas usando delimitador detectado o configurado.',
      'Revise JSON estructurado en el panel de salida.',
      'Copie al portapapeles o descargue el archivo .json.',
    ],
    tips: [
      'Asegure que la primera fila tenga encabezados de columna para JSON estilo objeto.',
      'Cuidado con comas dentro de campos entre comillas — comillas malformadas rompen alineación.',
      'Codificación UTF-8 evita mojibake en nombres y direcciones internacionales.',
      'Archivos grandes pueden estresar memoria del navegador — divida exports enormes antes.',
      'Haga ida y vuelta vía JSON a CSV para verificar que nada se perdió.',
      'Elimine columnas sensibles en la hoja antes de convertir si compartirá JSON.',
    ],
    sections: [
      {
        id: 'estructura-csv',
        heading: 'Cómo CSV mapea a estructuras JSON',
        level: 2,
        paragraphs: [
          'CSV es tabla plana: un registro por línea, campos separados por comas o punto y coma. JSON puede representar esa tabla como array de objetos — cada encabezado se vuelve clave de propiedad — o estructuras anidadas tras posprocesamiento.',
          'El conversor lee la fila de encabezado como claves y filas siguientes como valores, convirtiendo números y booleanos cuando detecta tokens numéricos o true/false sin comillas.',
        ],
      },
      {
        id: 'delimitador-comillas',
        heading: 'Delimitadores, comillas y casos extremos',
        level: 2,
        paragraphs: [
          'Las exportaciones europeas suelen usar punto y coma porque las comas aparecen en decimales. Campos entre comillas pueden contener saltos de línea o comas incrustadas; el parser debe respetar emparejamiento de comillas.',
        ],
        bullets: [
          'Separado por comas — mayoría de exports US/UK',
          'Separado por punto y coma — común en Excel locale UE',
          'Celdas multilínea entre comillas — requieren análisis estilo RFC',
        ],
      },
      {
        id: 'privacidad-datos',
        heading: 'Mantener datos de hoja fuera de servidores de terceros',
        level: 2,
        paragraphs: [
          'Los archivos CSV rutinariamente contienen PII: correos, teléfonos, salarios e IDs de cuenta. Los conversores en la nube crean riesgo de cumplimiento bajo GDPR, HIPAA y políticas internas. PDFWINDOWS nunca transmite su pegado o subida en esta transformación — el análisis ejecuta en JavaScript en su hardware.',
        ],
      },
      {
        id: 'flujo-csv-json',
        heading: 'CSV y JSON en su toolchain',
        level: 2,
        paragraphs: [
          'Convierta CSV a JSON para payloads de API, edite JSON manualmente o encadene con XML a JSON en pipelines inversos. Tras corregir estructura en JSON, use JSON a CSV para regenerar hoja limpia para stakeholders no técnicos.',
        ],
        bullets: [
          'JSON a CSV — exportar JSON editado de vuelta a hoja',
          'XML a JSON — normalizar feeds XML de proveedores después',
          'Limpiador de Código — formatear fragmentos JSON resultantes',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Qué forma JSON usa la salida?',
        a: 'Típicamente un array de objetos con claves de encabezados CSV. La estructura exacta puede seguir valores predeterminados de la herramienta — inspeccione antes de uso en producción.',
      },
      {
        q: '¿Puedo convertir CSV delimitado por punto y coma?',
        a: 'Muchos exports usan punto y coma. Si la detección automática falla, normalice en la app de hoja o ajuste delimitador cuando esté disponible.',
      },
      {
        q: '¿Se preservan celdas vacías?',
        a: 'Los campos vacíos suelen volverse cadenas vacías o null según reglas del parser. Verifique en muestra pequeña primero.',
      },
      {
        q: '¿Hay límite de filas?',
        a: 'Sin tope en servidor. Archivos muy grandes se limitan por memoria del navegador y pueden necesitar división.',
      },
      {
        q: '¿Puedo convertir JSON de vuelta a CSV?',
        a: 'Sí — use la herramienta JSON a CSV en PDFWINDOWS tras ediciones.',
      },
    ],
    relatedTools: ['/json-to-csv', '/xml-to-json', '/limpador-codigo'],
    cta: defaultCta('es', 'CSV a JSON'),
  },
};
