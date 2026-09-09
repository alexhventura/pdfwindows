import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_CHAVE_PRODUTO_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Product Key Format Generator for Mockups | PDFWINDOWS',
    description:
      'Generate random 5×5-format keys (XXXXX-XXXXX-…) for mockups, tutorials and UI testing, entirely in your browser.',
    keywords: 'product key format generator, mock serial key, placeholder license key, ui mockup key, fake activation key format',
    h1: 'Product Key Generator — Format Only',
    intro:
      'The PDFWINDOWS Product Key Generator produces random keys in the familiar five-groups-of-five format (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX) for mockups, tutorials, screenshots and UI testing, entirely in your browser. These strings are placeholders only: they are randomly generated, follow no vendor’s activation algorithm, and are not valid licenses for any software. Use them to fill activation screens, document a flow or load-test an input field without pasting a real license key.',
    toolName: 'Product Key Generator',
    benefits: [
      'Realistic 5×5 group format for mockups and demos',
      'Uses an unambiguous alphabet (no 0/O or 1/I confusion)',
      'One-click generation and clipboard copy',
      'Runs 100% in the browser — nothing is uploaded',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'UI mockups and design',
        body: 'Designers and product teams fill activation or license-entry screens with realistic-looking keys so mockups and prototypes feel complete, without displaying a real product key in a shared file.',
      },
      {
        title: 'Documentation and tutorials',
        body: 'Technical writers illustrate a licensing flow with placeholder keys in screenshots and step-by-step guides, avoiding the need to redact a genuine key.',
      },
      {
        title: 'Input-field and mask testing',
        body: 'Developers test key-entry fields, segmented inputs and validation masks that expect the 5×5 group pattern, including paste and auto-advance behavior.',
      },
      {
        title: 'Load and fuzz testing',
        body: 'QA engineers generate many placeholder keys to stress list rendering, pagination and storage without touching a real license database.',
      },
      {
        title: 'Sample data for demos',
        body: 'Sales engineers seed demo dashboards that display license inventories with plausible-looking, clearly synthetic keys.',
      },
    ],
    howItWorks: [
      'Open the Product Key Generator.',
      'Click Generate to create a new random 5×5 key.',
      'Copy the value to your clipboard or mockup.',
      'Repeat as needed — each click yields a different key.',
    ],
    tips: [
      'These keys are placeholders only — they do not activate Windows, Office or any other software.',
      'Never present a generated key as a genuine license or use it to imply ownership of a product.',
      'The alphabet excludes ambiguous characters so keys are easy to read in screenshots.',
      'Pair with the Report Generator or Document Studio to build realistic demo documents.',
      'Store placeholder keys in mockup assets, not in systems that grant real entitlements.',
      'Rotate values between screenshots so examples do not look copy-pasted.',
    ],
    sections: [
      {
        id: 'what-this-is',
        heading: 'What this tool is — and what it is not',
        level: 2,
        paragraphs: [
          'This generator creates random strings that merely match the visual shape of many product keys: five groups of five characters separated by hyphens. That shape is common across the software industry, which is why it reads as a “product key” in a mockup.',
          'It is not connected to any activation server, follows no vendor checksum, and cannot unlock a product. Think of it as lorem-ipsum for license fields: useful for layout and testing, meaningless as a credential.',
        ],
      },
      {
        id: 'why-format-only',
        heading: 'Why a format-only generator is useful',
        level: 2,
        paragraphs: [
          'Designers and engineers frequently need realistic-looking placeholder data. A blank or obviously fake value like AAAAA-AAAAA breaks the illusion in a demo, while a real key must never appear in shared assets.',
          'A random key in the correct shape strikes the right balance: it looks authentic in a screenshot yet carries no meaning and exposes no real credential.',
          'Because the characters avoid look-alikes such as the digit zero and the letter O, the keys remain legible when printed or captured in images.',
        ],
      },
      {
        id: 'ethical-use',
        heading: 'Responsible, legal use',
        level: 2,
        paragraphs: [
          'Generating placeholder strings for mockups and tests is a legitimate design and QA practice. Using any string to attempt to activate, pirate or misrepresent licensed software is not, and these keys cannot do so anyway.',
          'Keep placeholder keys clearly within design and testing contexts, and never imply that a generated value grants rights to a product.',
        ],
      },
      {
        id: 'integration',
        heading: 'Fitting into your workflow',
        level: 2,
        paragraphs: [
          'Combine placeholder keys with other PDFWINDOWS generators to build complete demo scenarios: a synthetic company, contact and license inventory for a convincing prototype.',
          'For segmented key-entry components, paste a generated key to verify that your field splits it into groups, advances the cursor and validates the pattern.',
          'When recording product tours, use fresh keys per take so each screen looks unique without ever revealing a real license.',
          'You can also feed a batch of generated keys into automated interface tests to confirm that long lists render correctly, that copy buttons work, and that the layout stays aligned when every row shows a full five-group key.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Does this activate Windows or any software?',
        a: 'No. The keys are random strings in the visual format only. They carry no license validity and cannot activate anything.',
      },
      {
        q: 'Are the keys unique or checksum-valid?',
        a: 'They are random and follow no vendor checksum. Treat them as placeholders, not credentials.',
      },
      {
        q: 'Can I use them in production licensing?',
        a: 'No. Use them only for mockups, documentation and UI testing.',
      },
      {
        q: 'Does the tool store generated keys?',
        a: 'No. They exist only in your browser session. Nothing is uploaded or logged by PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cnpj', '/estudio-documentos', '/gerador-relatorios', '/limpador-codigo'],
    cta: defaultCta('en', 'Product Key Generator'),
  },
  pt: {
    title: 'Gerador de Chave de Produto para Mockups | PDFWINDOWS',
    description:
      'Gere chaves aleatórias no formato 5×5 (XXXXX-XXXXX-…) para mockups, tutoriais e testes de interface, no navegador.',
    keywords: 'gerador chave de produto, serial mockup, chave de licença exemplo, chave placeholder ui, formato chave ativacao',
    h1: 'Gerador de Chave de Produto — Apenas Formato',
    intro:
      'O Gerador de Chave de Produto do PDFWINDOWS cria chaves aleatórias no formato familiar de cinco grupos de cinco caracteres (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX) para mockups, tutoriais, screenshots e testes de interface, inteiramente no navegador. Essas strings são apenas exemplos: são geradas aleatoriamente, não seguem o algoritmo de ativação de nenhum fabricante e não são licenças válidas de software algum. Use para preencher telas de ativação, documentar um fluxo ou testar um campo de entrada sem colar uma chave de licença real.',
    toolName: 'Gerador de Chave de Produto',
    benefits: [
      'Formato realista de 5 grupos para mockups e demos',
      'Usa alfabeto sem ambiguidade (sem confusão 0/O ou 1/I)',
      'Geração e cópia para a área de transferência em um clique',
      'Roda 100% no navegador — nada é enviado',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'Mockups de interface e design',
        body: 'Designers e times de produto preenchem telas de ativação ou de inserção de licença com chaves realistas para mockups e protótipos parecerem completos, sem exibir uma chave de produto real em um arquivo compartilhado.',
      },
      {
        title: 'Documentação e tutoriais',
        body: 'Redatores técnicos ilustram um fluxo de licenciamento com chaves de exemplo em screenshots e guias passo a passo, evitando redigir uma chave genuína.',
      },
      {
        title: 'Teste de campo e máscara',
        body: 'Desenvolvedores testam campos de inserção de chave, inputs segmentados e máscaras que esperam o padrão de grupos 5×5, inclusive colar e avançar automaticamente.',
      },
      {
        title: 'Teste de carga e fuzz',
        body: 'Times de QA geram muitas chaves de exemplo para estressar renderização de listas, paginação e armazenamento sem tocar em um banco de licenças real.',
      },
      {
        title: 'Dados de amostra para demos',
        body: 'Engenheiros de vendas populam dashboards de demonstração que exibem inventários de licenças com chaves plausíveis e claramente sintéticas.',
      },
    ],
    howItWorks: [
      'Abra o Gerador de Chave de Produto.',
      'Clique em Gerar para criar uma nova chave 5×5 aleatória.',
      'Copie o valor para a área de transferência ou mockup.',
      'Repita conforme necessário — cada clique gera uma chave diferente.',
    ],
    tips: [
      'Estas chaves são apenas exemplos — não ativam Windows, Office nem qualquer outro software.',
      'Nunca apresente uma chave gerada como licença genuína nem a use para insinuar posse de um produto.',
      'O alfabeto exclui caracteres ambíguos para as chaves ficarem legíveis em screenshots.',
      'Combine com o Gerador de Relatórios ou o Estúdio de Documentos para montar documentos de demo realistas.',
      'Guarde chaves de exemplo em assets de mockup, não em sistemas que concedem direitos reais.',
      'Rotacione valores entre screenshots para os exemplos não parecerem copiados.',
    ],
    sections: [
      {
        id: 'o-que-e',
        heading: 'O que esta ferramenta é — e o que não é',
        level: 2,
        paragraphs: [
          'Este gerador cria strings aleatórias que apenas combinam com o formato visual de muitas chaves de produto: cinco grupos de cinco caracteres separados por hífens. Esse formato é comum na indústria de software, por isso ele "parece" uma chave de produto em um mockup.',
          'Ele não se conecta a nenhum servidor de ativação, não segue checksum de fabricante e não desbloqueia produto algum. Pense nele como um lorem ipsum para campos de licença: útil para layout e testes, sem valor como credencial.',
        ],
      },
      {
        id: 'por-que-so-formato',
        heading: 'Por que um gerador só de formato é útil',
        level: 2,
        paragraphs: [
          'Designers e engenheiros frequentemente precisam de dados de exemplo realistas. Um valor em branco ou obviamente falso como AAAAA-AAAAA quebra a ilusão em uma demo, enquanto uma chave real nunca deve aparecer em assets compartilhados.',
          'Uma chave aleatória no formato correto encontra o equilíbrio: parece autêntica em um screenshot, mas não carrega significado nem expõe nenhuma credencial real.',
          'Como os caracteres evitam sósias como o dígito zero e a letra O, as chaves permanecem legíveis impressas ou capturadas em imagens.',
        ],
      },
      {
        id: 'uso-etico',
        heading: 'Uso responsável e legal',
        level: 2,
        paragraphs: [
          'Gerar strings de exemplo para mockups e testes é prática legítima de design e QA. Usar qualquer string para tentar ativar, piratear ou distorcer software licenciado não é — e estas chaves não conseguiriam fazê-lo de qualquer forma.',
          'Mantenha as chaves de exemplo claramente em contextos de design e teste, e nunca insinue que um valor gerado concede direitos sobre um produto.',
        ],
      },
      {
        id: 'integracao',
        heading: 'Encaixando no seu fluxo de trabalho',
        level: 2,
        paragraphs: [
          'Combine chaves de exemplo com outros geradores do PDFWINDOWS para montar cenários de demo completos: uma empresa, contato e inventário de licenças sintéticos para um protótipo convincente.',
          'Para componentes de inserção de chave segmentados, cole uma chave gerada para verificar se seu campo a divide em grupos, avança o cursor e valida o padrão.',
          'Ao gravar tours de produto, use chaves novas por take para cada tela parecer única sem nunca revelar uma licença real.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Isso ativa o Windows ou algum software?',
        a: 'Não. As chaves são strings aleatórias apenas no formato visual. Não têm validade de licença e não ativam nada.',
      },
      {
        q: 'As chaves são únicas ou têm checksum válido?',
        a: 'São aleatórias e não seguem checksum de fabricante. Trate-as como exemplos, não como credenciais.',
      },
      {
        q: 'Posso usá-las em licenciamento de produção?',
        a: 'Não. Use apenas para mockups, documentação e testes de interface.',
      },
      {
        q: 'A ferramenta armazena as chaves geradas?',
        a: 'Não. Elas existem apenas na sessão do navegador. Nada é enviado ou registrado pelo PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cnpj', '/estudio-documentos', '/gerador-relatorios', '/limpador-codigo'],
    cta: defaultCta('pt', 'Gerador de Chave de Produto'),
  },
  es: {
    title: 'Generador de Clave de Producto para Maquetas | PDFWINDOWS',
    description:
      'Genera claves aleatorias en formato 5×5 (XXXXX-XXXXX-…) para maquetas, tutoriales y pruebas de interfaz, en el navegador.',
    keywords: 'generador clave de producto, serial maqueta, clave de licencia ejemplo, clave placeholder ui, formato clave activacion',
    h1: 'Generador de Clave de Producto — Solo Formato',
    intro:
      'El Generador de Clave de Producto de PDFWINDOWS crea claves aleatorias en el formato familiar de cinco grupos de cinco caracteres (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX) para maquetas, tutoriales, capturas y pruebas de interfaz, enteramente en el navegador. Estas cadenas son solo ejemplos: se generan aleatoriamente, no siguen el algoritmo de activación de ningún fabricante y no son licencias válidas de software alguno. Úselas para rellenar pantallas de activación, documentar un flujo o probar un campo de entrada sin pegar una clave de licencia real.',
    toolName: 'Generador de Clave de Producto',
    benefits: [
      'Formato realista de 5 grupos para maquetas y demos',
      'Usa alfabeto sin ambigüedad (sin confusión 0/O o 1/I)',
      'Generación y copia al portapapeles en un clic',
      'Funciona 100% en el navegador — nada se sube',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'Maquetas de interfaz y diseño',
        body: 'Diseñadores y equipos de producto rellenan pantallas de activación o de ingreso de licencia con claves realistas para que maquetas y prototipos se sientan completos, sin mostrar una clave de producto real en un archivo compartido.',
      },
      {
        title: 'Documentación y tutoriales',
        body: 'Los redactores técnicos ilustran un flujo de licenciamiento con claves de ejemplo en capturas y guías paso a paso, evitando redactar una clave genuina.',
      },
      {
        title: 'Prueba de campo y máscara',
        body: 'Los desarrolladores prueban campos de ingreso de clave, entradas segmentadas y máscaras que esperan el patrón de grupos 5×5, incluido pegar y avanzar automáticamente.',
      },
      {
        title: 'Prueba de carga y fuzz',
        body: 'Los equipos de QA generan muchas claves de ejemplo para estresar el renderizado de listas, la paginación y el almacenamiento sin tocar una base de licencias real.',
      },
      {
        title: 'Datos de muestra para demos',
        body: 'Los ingenieros de ventas pueblan dashboards de demostración que muestran inventarios de licencias con claves plausibles y claramente sintéticas.',
      },
    ],
    howItWorks: [
      'Abra el Generador de Clave de Producto.',
      'Haga clic en Generar para crear una nueva clave 5×5 aleatoria.',
      'Copie el valor al portapapeles o maqueta.',
      'Repita según necesidad — cada clic genera una clave diferente.',
    ],
    tips: [
      'Estas claves son solo ejemplos — no activan Windows, Office ni ningún otro software.',
      'Nunca presente una clave generada como licencia genuina ni la use para insinuar propiedad de un producto.',
      'El alfabeto excluye caracteres ambiguos para que las claves sean legibles en capturas.',
      'Combine con el Generador de Informes o el Estudio de Documentos para armar documentos de demo realistas.',
      'Guarde las claves de ejemplo en assets de maqueta, no en sistemas que otorgan derechos reales.',
      'Rote valores entre capturas para que los ejemplos no parezcan copiados.',
    ],
    sections: [
      {
        id: 'que-es',
        heading: 'Qué es esta herramienta — y qué no es',
        level: 2,
        paragraphs: [
          'Este generador crea cadenas aleatorias que solo coinciden con la forma visual de muchas claves de producto: cinco grupos de cinco caracteres separados por guiones. Esa forma es común en la industria del software, por eso se lee como una "clave de producto" en una maqueta.',
          'No está conectado a ningún servidor de activación, no sigue checksum de fabricante y no puede desbloquear un producto. Piénselo como un lorem ipsum para campos de licencia: útil para diseño y pruebas, sin valor como credencial.',
        ],
      },
      {
        id: 'por-que-solo-formato',
        heading: 'Por qué un generador solo de formato es útil',
        level: 2,
        paragraphs: [
          'Diseñadores e ingenieros a menudo necesitan datos de ejemplo realistas. Un valor en blanco u obviamente falso como AAAAA-AAAAA rompe la ilusión en una demo, mientras que una clave real nunca debe aparecer en assets compartidos.',
          'Una clave aleatoria en la forma correcta logra el equilibrio: parece auténtica en una captura pero no tiene significado ni expone ninguna credencial real.',
          'Como los caracteres evitan parecidos como el dígito cero y la letra O, las claves permanecen legibles impresas o capturadas en imágenes.',
        ],
      },
      {
        id: 'uso-etico',
        heading: 'Uso responsable y legal',
        level: 2,
        paragraphs: [
          'Generar cadenas de ejemplo para maquetas y pruebas es una práctica legítima de diseño y QA. Usar cualquier cadena para intentar activar, piratear o tergiversar software licenciado no lo es — y estas claves no podrían hacerlo de todos modos.',
          'Mantenga las claves de ejemplo claramente en contextos de diseño y prueba, y nunca insinúe que un valor generado otorga derechos sobre un producto.',
        ],
      },
      {
        id: 'integracion',
        heading: 'Encajando en su flujo de trabajo',
        level: 2,
        paragraphs: [
          'Combine claves de ejemplo con otros generadores de PDFWINDOWS para armar escenarios de demo completos: una empresa, contacto e inventario de licencias sintéticos para un prototipo convincente.',
          'Para componentes de ingreso de clave segmentados, pegue una clave generada para verificar que su campo la divide en grupos, avanza el cursor y valida el patrón.',
          'Al grabar recorridos de producto, use claves nuevas por toma para que cada pantalla parezca única sin revelar nunca una licencia real.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Esto activa Windows o algún software?',
        a: 'No. Las claves son cadenas aleatorias solo con el formato visual. No tienen validez de licencia y no activan nada.',
      },
      {
        q: '¿Las claves son únicas o tienen checksum válido?',
        a: 'Son aleatorias y no siguen checksum de fabricante. Trátelas como ejemplos, no como credenciales.',
      },
      {
        q: '¿Puedo usarlas en licenciamiento de producción?',
        a: 'No. Úselas solo para maquetas, documentación y pruebas de interfaz.',
      },
      {
        q: '¿La herramienta almacena las claves generadas?',
        a: 'No. Existen solo en la sesión del navegador. Nada se sube ni registra por PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cnpj', '/estudio-documentos', '/gerador-relatorios', '/limpador-codigo'],
    cta: defaultCta('es', 'Generador de Clave de Producto'),
  },
};
