import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_UUID_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'UUID v4 Generator (Bulk, Local) | PDFWINDOWS',
    description:
      'Generate UUID v4 unique identifiers in your browser, one or many at once, and copy them all in a click. Free and local.',
    keywords: 'uuid generator, uuid v4 online, generate guid, bulk uuid, random identifier generator',
    h1: 'UUID v4 Generator',
    intro:
      'The PDFWINDOWS UUID Generator creates version 4 universally unique identifiers directly in your browser. Generate a single UUID or a batch of them and copy everything in one click. UUID v4 values are produced from random bits, so their collision probability is negligible, which makes them ideal for database keys, correlation IDs, idempotency keys and test fixtures. Everything runs locally — no account, no upload, no limits.',
    toolName: 'UUID Generator',
    benefits: [
      'RFC 4122 compliant version 4 UUIDs',
      'Generate one or many at once',
      'One-click copy of the whole batch',
      'Runs 100% in the browser — nothing is uploaded',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Database primary keys',
        body: 'Developers use UUIDs as primary keys to avoid coordinating auto-increment sequences across services or shards. Generate a batch here to seed a table or a migration without writing throwaway code.',
      },
      {
        title: 'Correlation and request IDs',
        body: 'Backend engineers assign a UUID to each request so logs and traces can be correlated across microservices, making distributed debugging far easier.',
      },
      {
        title: 'Idempotency keys',
        body: 'API integrations attach a UUID to a payment or write request so retries do not duplicate the operation. Generate fresh keys for manual testing.',
      },
      {
        title: 'Test fixtures and mock data',
        body: 'QA engineers fill fixtures and mock responses with realistic identifiers instead of reusing the same hardcoded value across tests.',
      },
      {
        title: 'Feature flags and experiments',
        body: 'Teams assign UUIDs to experiment buckets or anonymous visitors so analytics can group events without personal data.',
      },
    ],
    howItWorks: [
      'Choose how many UUIDs to generate.',
      'Click Generate to create the batch.',
      'Copy all of them in one click.',
      'Paste into your database, code or fixtures.',
    ],
    tips: [
      'UUID v4 is random; if you need time-ordered keys consider a sortable scheme instead.',
      'Store UUIDs as a native UUID type when your database supports it for smaller indexes.',
      'Do not treat a UUID as a secret — it is unique, not unguessable in a security sense.',
      'Generate in bulk to seed large tables without writing a loop.',
      'Keep casing consistent (lowercase) across your codebase to avoid mismatches.',
      'Pair with the JSON and CSV tools to build fixture files that include identifiers.',
    ],
    sections: [
      {
        id: 'what-is-uuid',
        heading: 'What a UUID v4 is',
        level: 2,
        paragraphs: [
          'A UUID is a 128-bit identifier written as 32 hexadecimal digits in five hyphen-separated groups. Version 4 fills almost all of those bits with random data, reserving a few to mark the version and variant.',
          'This tool uses the browser’s cryptographic random source, so each identifier is drawn from an enormous space and is effectively unique without any central coordination.',
        ],
      },
      {
        id: 'collision-probability',
        heading: 'Why collisions are not a practical concern',
        level: 2,
        paragraphs: [
          'With 122 random bits, the number of possible UUID v4 values is astronomically large. You would need to generate billions of UUIDs per second for many years before a collision became likely.',
          'For virtually every application — database keys, request IDs, file names — you can treat UUID v4 as unique and design your system accordingly.',
          'If you require guaranteed uniqueness at extreme scale, add a database unique constraint as a safety net, which is good practice regardless.',
        ],
      },
      {
        id: 'local-generation',
        heading: 'Local, private generation',
        level: 2,
        paragraphs: [
          'Because generation happens entirely in your browser, the identifiers never travel to a server. That keeps your workflow fast and avoids leaking any context about what you are building.',
          'Batch generation is handy when seeding data: create dozens or hundreds at once and paste them straight into your migration or fixture file.',
        ],
      },
      {
        id: 'workflow',
        heading: 'Fitting into your workflow',
        level: 2,
        paragraphs: [
          'Combine the UUID Generator with the CSV and JSON tools to assemble complete fixture files where each record already has a stable identifier.',
          'When testing APIs, paste a fresh UUID as an idempotency or correlation header and watch it flow through your logs.',
          'For front-end work, use generated UUIDs as stable keys for list items or as client-side identifiers for optimistic UI updates.',
          'In event-driven systems, assign a UUID to each message so consumers can deduplicate replays and trace a single event across queues and services.',
          'When seeding a large table, generate a batch here, paste it into a temporary column, and let your migration copy the values in so every row starts life with a stable, collision-free identifier from the very first insert.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Are the UUIDs unique?',
        a: 'UUID v4 draws from a huge random space, so the collision probability is negligible for practical purposes.',
      },
      {
        q: 'Is this a version 4 UUID?',
        a: 'Yes. The output follows the RFC 4122 version 4 format, with the version and variant bits set correctly.',
      },
      {
        q: 'Can I generate many at once?',
        a: 'Yes. Choose a batch size and copy them all in a single click.',
      },
      {
        q: 'Is anything uploaded?',
        a: 'No. Generation runs in your browser and nothing is sent to a server.',
      },
    ],
    relatedTools: ['/gerador-senha', '/gerador-chave-produto', '/csv-to-json', '/json-to-csv'],
    cta: defaultCta('en', 'UUID Generator'),
  },
  pt: {
    title: 'Gerador de UUID v4 (Em Lote, Local) | PDFWINDOWS',
    description:
      'Gere identificadores únicos UUID v4 no navegador, um ou vários de uma vez, e copie tudo com um clique. Grátis e local.',
    keywords: 'gerador uuid, uuid v4 online, gerar guid, uuid em lote, gerador identificador aleatorio',
    h1: 'Gerador de UUID v4',
    intro:
      'O Gerador de UUID do PDFWINDOWS cria identificadores únicos universais versão 4 direto no navegador. Gere um único UUID ou um lote deles e copie tudo com um clique. Valores UUID v4 são produzidos a partir de bits aleatórios, então a probabilidade de colisão é desprezível, o que os torna ideais para chaves de banco, IDs de correlação, chaves de idempotência e fixtures de teste. Tudo roda localmente — sem conta, sem upload, sem limites.',
    toolName: 'Gerador de UUID',
    benefits: [
      'UUID v4 conforme a RFC 4122',
      'Gere um ou vários de uma vez',
      'Cópia do lote inteiro com um clique',
      'Roda 100% no navegador — nada é enviado',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'Chaves primárias de banco',
        body: 'Desenvolvedores usam UUIDs como chaves primárias para evitar coordenar sequências auto-incrementais entre serviços ou shards. Gere um lote aqui para popular uma tabela ou migração sem escrever código descartável.',
      },
      {
        title: 'IDs de correlação e requisição',
        body: 'Engenheiros de backend atribuem um UUID a cada requisição para logs e traces serem correlacionados entre microsserviços, facilitando muito o debug distribuído.',
      },
      {
        title: 'Chaves de idempotência',
        body: 'Integrações de API anexam um UUID a uma requisição de pagamento ou escrita para retentativas não duplicarem a operação. Gere chaves novas para testes manuais.',
      },
      {
        title: 'Fixtures de teste e mock',
        body: 'Times de QA preenchem fixtures e respostas mock com identificadores realistas em vez de reutilizar o mesmo valor hardcoded em todos os testes.',
      },
      {
        title: 'Feature flags e experimentos',
        body: 'Times atribuem UUIDs a grupos de experimento ou visitantes anônimos para analytics agruparem eventos sem dados pessoais.',
      },
    ],
    howItWorks: [
      'Escolha quantos UUIDs gerar.',
      'Clique em Gerar para criar o lote.',
      'Copie todos com um clique.',
      'Cole no seu banco, código ou fixtures.',
    ],
    tips: [
      'UUID v4 é aleatório; se precisar de chaves ordenadas por tempo, considere um esquema ordenável.',
      'Armazene UUIDs como tipo UUID nativo quando o banco suportar, para índices menores.',
      'Não trate um UUID como segredo — ele é único, não imprevisível no sentido de segurança.',
      'Gere em lote para popular tabelas grandes sem escrever um laço.',
      'Mantenha o caixa consistente (minúsculas) no código para evitar divergências.',
      'Combine com as ferramentas de JSON e CSV para montar arquivos de fixture com identificadores.',
    ],
    sections: [
      {
        id: 'o-que-e-uuid',
        heading: 'O que é um UUID v4',
        level: 2,
        paragraphs: [
          'Um UUID é um identificador de 128 bits escrito como 32 dígitos hexadecimais em cinco grupos separados por hífens. A versão 4 preenche quase todos esses bits com dados aleatórios, reservando alguns para marcar versão e variante.',
          'Esta ferramenta usa a fonte criptográfica de aleatoriedade do navegador, então cada identificador é sorteado de um espaço enorme e é efetivamente único sem coordenação central.',
        ],
      },
      {
        id: 'probabilidade-colisao',
        heading: 'Por que colisões não são preocupação prática',
        level: 2,
        paragraphs: [
          'Com 122 bits aleatórios, o número de valores UUID v4 possíveis é astronomicamente grande. Seria preciso gerar bilhões de UUIDs por segundo por muitos anos antes de uma colisão se tornar provável.',
          'Para praticamente toda aplicação — chaves de banco, IDs de requisição, nomes de arquivo — você pode tratar UUID v4 como único e projetar seu sistema com base nisso.',
          'Se precisar de unicidade garantida em escala extrema, adicione uma restrição única no banco como rede de segurança, o que é boa prática de qualquer forma.',
        ],
      },
      {
        id: 'geracao-local',
        heading: 'Geração local e privada',
        level: 2,
        paragraphs: [
          'Como a geração acontece inteiramente no navegador, os identificadores nunca vão a um servidor. Isso mantém seu fluxo rápido e evita vazar qualquer contexto sobre o que você está construindo.',
          'A geração em lote é útil ao popular dados: crie dezenas ou centenas de uma vez e cole direto no seu arquivo de migração ou fixture.',
        ],
      },
      {
        id: 'fluxo',
        heading: 'Encaixando no seu fluxo de trabalho',
        level: 2,
        paragraphs: [
          'Combine o Gerador de UUID com as ferramentas de CSV e JSON para montar arquivos de fixture completos onde cada registro já tem um identificador estável.',
          'Ao testar APIs, cole um UUID novo como header de idempotência ou correlação e acompanhe-o fluindo pelos seus logs.',
          'No front-end, use UUIDs gerados como chaves estáveis de itens de lista ou como identificadores client-side para atualizações otimistas de UI.',
          'Em sistemas orientados a eventos, atribua um UUID a cada mensagem para que os consumidores possam deduplicar reprocessamentos e rastrear um único evento entre as filas e os serviços.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Os UUIDs são únicos?',
        a: 'O UUID v4 sorteia de um espaço aleatório enorme, então a probabilidade de colisão é desprezível na prática.',
      },
      {
        q: 'É um UUID versão 4?',
        a: 'Sim. A saída segue o formato versão 4 da RFC 4122, com os bits de versão e variante corretos.',
      },
      {
        q: 'Dá para gerar vários de uma vez?',
        a: 'Sim. Escolha o tamanho do lote e copie todos com um único clique.',
      },
      {
        q: 'Algo é enviado?',
        a: 'Não. A geração roda no seu navegador e nada é enviado a um servidor.',
      },
    ],
    relatedTools: ['/gerador-senha', '/gerador-chave-produto', '/csv-to-json', '/json-to-csv'],
    cta: defaultCta('pt', 'Gerador de UUID'),
  },
  es: {
    title: 'Generador de UUID v4 (En Lote, Local) | PDFWINDOWS',
    description:
      'Genera identificadores únicos UUID v4 en el navegador, uno o varios a la vez, y cópialos con un clic. Gratis y local.',
    keywords: 'generador uuid, uuid v4 online, generar guid, uuid en lote, generador identificador aleatorio',
    h1: 'Generador de UUID v4',
    intro:
      'El Generador de UUID de PDFWINDOWS crea identificadores únicos universales versión 4 directamente en el navegador. Genera un único UUID o un lote de ellos y copia todo en un clic. Los valores UUID v4 se producen a partir de bits aleatorios, por lo que su probabilidad de colisión es despreciable, lo que los hace ideales para claves de base de datos, IDs de correlación, claves de idempotencia y fixtures de prueba. Todo corre localmente — sin cuenta, sin subir, sin límites.',
    toolName: 'Generador de UUID',
    benefits: [
      'UUID v4 conforme a la RFC 4122',
      'Genera uno o varios a la vez',
      'Copia del lote entero en un clic',
      'Funciona 100% en el navegador — nada se sube',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'Claves primarias de base de datos',
        body: 'Los desarrolladores usan UUIDs como claves primarias para evitar coordinar secuencias autoincrementales entre servicios o shards. Genera un lote aquí para poblar una tabla o migración sin escribir código desechable.',
      },
      {
        title: 'IDs de correlación y solicitud',
        body: 'Los ingenieros de backend asignan un UUID a cada solicitud para que logs y trazas se correlacionen entre microservicios, facilitando mucho el debug distribuido.',
      },
      {
        title: 'Claves de idempotencia',
        body: 'Las integraciones de API adjuntan un UUID a una solicitud de pago o escritura para que los reintentos no dupliquen la operación. Genera claves nuevas para pruebas manuales.',
      },
      {
        title: 'Fixtures de prueba y mock',
        body: 'Los equipos de QA rellenan fixtures y respuestas mock con identificadores realistas en lugar de reutilizar el mismo valor hardcoded en todas las pruebas.',
      },
      {
        title: 'Feature flags y experimentos',
        body: 'Los equipos asignan UUIDs a grupos de experimento o visitantes anónimos para que analytics agrupe eventos sin datos personales.',
      },
    ],
    howItWorks: [
      'Elige cuántos UUIDs generar.',
      'Haz clic en Generar para crear el lote.',
      'Copia todos en un clic.',
      'Pega en tu base de datos, código o fixtures.',
    ],
    tips: [
      'UUID v4 es aleatorio; si necesitas claves ordenadas por tiempo, considera un esquema ordenable.',
      'Almacena UUIDs como tipo UUID nativo cuando tu base lo soporte, para índices más pequeños.',
      'No trates un UUID como secreto — es único, no impredecible en sentido de seguridad.',
      'Genera en lote para poblar tablas grandes sin escribir un bucle.',
      'Mantén el uso de mayúsculas consistente (minúsculas) en tu código para evitar discrepancias.',
      'Combina con las herramientas de JSON y CSV para armar archivos de fixture con identificadores.',
    ],
    sections: [
      {
        id: 'que-es-uuid',
        heading: 'Qué es un UUID v4',
        level: 2,
        paragraphs: [
          'Un UUID es un identificador de 128 bits escrito como 32 dígitos hexadecimales en cinco grupos separados por guiones. La versión 4 rellena casi todos esos bits con datos aleatorios, reservando algunos para marcar versión y variante.',
          'Esta herramienta usa la fuente criptográfica de aleatoriedad del navegador, así que cada identificador se toma de un espacio enorme y es efectivamente único sin coordinación central.',
        ],
      },
      {
        id: 'probabilidad-colision',
        heading: 'Por qué las colisiones no son una preocupación práctica',
        level: 2,
        paragraphs: [
          'Con 122 bits aleatorios, el número de valores UUID v4 posibles es astronómicamente grande. Habría que generar miles de millones de UUIDs por segundo durante muchos años antes de que una colisión fuera probable.',
          'Para prácticamente toda aplicación — claves de base de datos, IDs de solicitud, nombres de archivo — puedes tratar UUID v4 como único y diseñar tu sistema en consecuencia.',
          'Si requieres unicidad garantizada a escala extrema, agrega una restricción única en la base como red de seguridad, lo cual es buena práctica de todos modos.',
        ],
      },
      {
        id: 'generacion-local',
        heading: 'Generación local y privada',
        level: 2,
        paragraphs: [
          'Como la generación ocurre enteramente en el navegador, los identificadores nunca viajan a un servidor. Eso mantiene tu flujo rápido y evita filtrar cualquier contexto sobre lo que estás construyendo.',
          'La generación en lote es útil al poblar datos: crea decenas o cientos a la vez y pégalos directo en tu archivo de migración o fixture.',
        ],
      },
      {
        id: 'flujo',
        heading: 'Encajando en tu flujo de trabajo',
        level: 2,
        paragraphs: [
          'Combina el Generador de UUID con las herramientas de CSV y JSON para armar archivos de fixture completos donde cada registro ya tiene un identificador estable.',
          'Al probar APIs, pega un UUID nuevo como header de idempotencia o correlación y obsérvalo fluir por tus logs.',
          'En el front-end, usa UUIDs generados como claves estables de elementos de lista o como identificadores client-side para actualizaciones optimistas de UI.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Los UUID son únicos?',
        a: 'UUID v4 toma de un espacio aleatorio enorme, por lo que la probabilidad de colisión es despreciable en la práctica.',
      },
      {
        q: '¿Es un UUID versión 4?',
        a: 'Sí. La salida sigue el formato versión 4 de la RFC 4122, con los bits de versión y variante correctos.',
      },
      {
        q: '¿Puedo generar muchos a la vez?',
        a: 'Sí. Elige el tamaño del lote y cópialos todos en un solo clic.',
      },
      {
        q: '¿Se sube algo?',
        a: 'No. La generación corre en tu navegador y nada se envía a un servidor.',
      },
    ],
    relatedTools: ['/gerador-senha', '/gerador-chave-produto', '/csv-to-json', '/json-to-csv'],
    cta: defaultCta('es', 'Generador de UUID'),
  },
};
