import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_CNPJ_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'CNPJ Generator for Software Testing | PDFWINDOWS',
    description:
      'Generate valid-format Brazilian CNPJ numbers with correct check digits for QA and development, locally in your browser.',
    keywords: 'cnpj generator test, valid cnpj for development, fake cnpj qa, brazil company id test, cnpj validator test',
    h1: 'CNPJ Generator — For Testing Only',
    intro:
      'The PDFWINDOWS CNPJ Generator produces Brazilian company registration numbers (Cadastro Nacional da Pessoa Jurídica) with mathematically correct check digits, entirely in your browser. It exists so developers and QA engineers can test registration forms, validators and integrations without copying real company identifiers. No number is issued by Receita Federal, and none corresponds to a real business. Use it to seed staging databases, verify input masks and exercise backend validation while keeping real corporate data out of your test environment.',
    toolName: 'CNPJ Generator',
    benefits: [
      'Correct check-digit algorithm matching official CNPJ rules',
      'One-click generation and clipboard copy',
      'Runs 100% in the browser — nothing is uploaded',
      'Ideal for frontend masks and backend validator tests',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Supplier and B2B onboarding QA',
        body: 'Teams building supplier portals and B2B onboarding flows validate CNPJ on blur and submit. Generate fresh numbers each run so staging never reuses a real company identifier, keeping test data clean and compliant with data-minimization practices.',
      },
      {
        title: 'Backend validator unit tests',
        body: 'Developers copy generated CNPJs into fixtures to assert that server-side validators accept the correct format and reject tampered check digits, covering both the happy path and edge cases.',
      },
      {
        title: 'Input mask development',
        body: 'Frontend teams verify that CNPJ masking (00.000.000/0000-00) formats generated values correctly across browsers, including paste and autofill behavior.',
      },
      {
        title: 'Invoicing and ERP demos',
        body: 'Product and sales teams populate ERP or invoicing demos with realistic but synthetic CNPJs so screenshots and live presentations never expose a real client company.',
      },
      {
        title: 'Teaching checksum algorithms',
        body: 'Instructors use CNPJ as a familiar example of weighted modulo-eleven checksums when teaching validation and data-integrity concepts.',
      },
    ],
    howItWorks: [
      'Open the CNPJ Generator and read the notice.',
      'Click Generate to create a new valid-format CNPJ.',
      'Copy the value to your clipboard or test form.',
      'Repeat as needed — every click produces a different number.',
    ],
    tips: [
      'Never present generated CNPJs as belonging to a real company or use them for fraud.',
      'Format validity does not mean the CNPJ is active at Receita Federal — integrations that query official records will reject it, which is expected.',
      'Keep synthetic CNPJs in environment-specific fixtures, never in production tables with real customers.',
      'Pair with the JSON to CSV tool to build test datasets containing company records.',
      'Rotate values between runs to catch hardcoded assumptions in your tests.',
      'Document in your test plan that synthetic CNPJs come from the PDFWINDOWS generator.',
    ],
    sections: [
      {
        id: 'what-is-cnpj',
        heading: 'What a CNPJ is and how it is structured',
        level: 2,
        paragraphs: [
          'A CNPJ identifies a Brazilian legal entity. It has fourteen digits arranged as an eight-digit root that identifies the company, a four-digit suffix that identifies the branch (0001 for the headquarters), and two check digits at the end.',
          'The generator builds a random eight-digit root, sets the branch to 0001, then computes the two check digits so the number passes the same validation used by banks, ERPs and government portals.',
        ],
      },
      {
        id: 'algorithm-explained',
        heading: 'How the check-digit algorithm works',
        level: 2,
        paragraphs: [
          'The first check digit is computed from the first twelve digits using the weights 5,4,3,2,9,8,7,6,5,4,3,2; the second uses the first thirteen digits with the weights 6,5,4,3,2,9,8,7,6,5,4,3,2. Each weighted sum is taken modulo eleven, and a remainder below two yields a zero.',
          'Because the tool replicates this exact logic, its output passes client-side masks and standard server validators. It will not, however, exist in Receita Federal records, so official lookups correctly reject it.',
          'Understanding this distinction helps QA teams design tests: assert that your validator accepts the format, but mock or skip the government API call in automated runs.',
        ],
      },
      {
        id: 'privacy-for-qa',
        heading: 'Privacy benefits for QA teams',
        level: 2,
        paragraphs: [
          'Copying real company identifiers into shared test spreadsheets creates unnecessary exposure. Synthetic generators remove that risk while keeping data realistic enough to trigger every validation code path.',
          'Because generation is entirely local, your test numbers never travel to a third-party fake-data API or appear in external server logs.',
        ],
      },
      {
        id: 'integration-testing',
        heading: 'Integrating with broader test workflows',
        level: 2,
        paragraphs: [
          'Combine the CNPJ Generator with the CSV and JSON tools to assemble fixture files of synthetic companies. Export a CSV of test suppliers, format the JSON, and drop a generated CNPJ into each row.',
          'For onboarding forms that also validate email, phone and address, keep every synthetic field consistent within one test persona so your demos and screenshots look realistic.',
          'Brazilian B2B startups routinely seed demo tenants with generated CNPJs during investor presentations, showing realistic dashboards without touching production customer tables.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Are generated CNPJs real?',
        a: 'No. They are valid for format checking only. They are not registered with Receita Federal and do not belong to real companies.',
      },
      {
        q: 'Can I use these CNPJs in production?',
        a: 'No. Use them only in development, staging and QA environments for software testing.',
      },
      {
        q: 'Will my validator accept them?',
        a: 'If it checks the digit algorithm, yes. If it queries government databases, generated CNPJs will fail the existence check — which is expected.',
      },
      {
        q: 'Does the tool store generated numbers?',
        a: 'No. They exist only in your browser session. Nothing is uploaded or logged by PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/limpador-codigo', '/csv-to-json', '/json-to-csv'],
    cta: defaultCta('en', 'CNPJ Generator'),
  },
  pt: {
    title: 'Gerador de CNPJ para Testes de Software | PDFWINDOWS',
    description:
      'Gere CNPJs com formato válido e dígitos verificadores corretos para QA e desenvolvimento, localmente no navegador.',
    keywords: 'gerador cnpj teste, cnpj valido para desenvolvimento, cnpj fake qa, testar validador cnpj, cnpj empresa teste',
    h1: 'Gerador de CNPJ — Apenas para Testes',
    intro:
      'O Gerador de CNPJ do PDFWINDOWS produz números de registro de empresas brasileiras (Cadastro Nacional da Pessoa Jurídica) com dígitos verificadores matematicamente corretos, inteiramente no navegador. Ele existe para desenvolvedores e times de QA testarem formulários de cadastro, validadores e integrações sem copiar identificadores reais de empresas. Nenhum número é emitido pela Receita Federal e nenhum corresponde a uma empresa real. Use para popular bancos de staging, verificar máscaras de input e exercitar validação de backend mantendo dados corporativos reais fora do ambiente de teste.',
    toolName: 'Gerador de CNPJ',
    benefits: [
      'Algoritmo de dígitos verificadores conforme regras oficiais do CNPJ',
      'Geração e cópia para a área de transferência em um clique',
      'Roda 100% no navegador — nada é enviado',
      'Ideal para máscaras frontend e testes de validador backend',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'QA de onboarding B2B e de fornecedores',
        body: 'Times que constroem portais de fornecedores e fluxos de onboarding B2B validam CNPJ no blur e no submit. Gere números novos a cada execução para o staging nunca reutilizar um identificador real de empresa, mantendo os dados de teste limpos e alinhados à minimização de dados.',
      },
      {
        title: 'Testes unitários de validador backend',
        body: 'Desenvolvedores copiam CNPJs gerados em fixtures para garantir que o validador server-side aceita o formato correto e rejeita dígitos adulterados, cobrindo o caminho feliz e os casos de borda.',
      },
      {
        title: 'Desenvolvimento de máscara de input',
        body: 'Times frontend verificam se a máscara de CNPJ (00.000.000/0000-00) formata valores gerados corretamente em todos os navegadores, inclusive ao colar e no autofill.',
      },
      {
        title: 'Demos de faturamento e ERP',
        body: 'Times de produto e vendas populam demos de ERP ou faturamento com CNPJs sintéticos realistas para screenshots e apresentações ao vivo nunca exporem um cliente real.',
      },
      {
        title: 'Ensino de algoritmos de checksum',
        body: 'Instrutores usam o CNPJ como exemplo familiar de checksum ponderado módulo onze ao ensinar validação e integridade de dados.',
      },
    ],
    howItWorks: [
      'Abra o Gerador de CNPJ e leia o aviso.',
      'Clique em Gerar para criar um novo CNPJ com formato válido.',
      'Copie o valor para a área de transferência ou formulário de teste.',
      'Repita conforme necessário — cada clique gera um número diferente.',
    ],
    tips: [
      'Nunca apresente CNPJs gerados como pertencentes a uma empresa real nem os use para fraude.',
      'Formato válido não significa CNPJ ativo na Receita Federal — integrações que consultam registros oficiais vão rejeitá-lo, o que é esperado.',
      'Mantenha CNPJs sintéticos em fixtures específicas de ambiente, nunca em tabelas de produção com clientes reais.',
      'Combine com a ferramenta JSON para CSV para montar conjuntos de teste com registros de empresas.',
      'Rotacione valores entre execuções para detectar suposições hardcoded nos testes.',
      'Documente no plano de testes que os CNPJs sintéticos vêm do gerador PDFWINDOWS.',
    ],
    sections: [
      {
        id: 'o-que-e-cnpj',
        heading: 'O que é um CNPJ e como ele é estruturado',
        level: 2,
        paragraphs: [
          'O CNPJ identifica uma pessoa jurídica brasileira. Tem quatorze dígitos organizados como uma raiz de oito dígitos que identifica a empresa, um sufixo de quatro dígitos que identifica a filial (0001 para a matriz) e dois dígitos verificadores no final.',
          'O gerador cria uma raiz aleatória de oito dígitos, define a filial como 0001 e calcula os dois dígitos verificadores para o número passar na mesma validação usada por bancos, ERPs e portais governamentais.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Como funciona o algoritmo de dígitos verificadores',
        level: 2,
        paragraphs: [
          'O primeiro dígito verificador é calculado a partir dos doze primeiros dígitos com os pesos 5,4,3,2,9,8,7,6,5,4,3,2; o segundo usa os treze primeiros com os pesos 6,5,4,3,2,9,8,7,6,5,4,3,2. Cada soma ponderada é tomada módulo onze, e um resto menor que dois resulta em zero.',
          'Como a ferramenta replica exatamente essa lógica, a saída passa em máscaras client-side e validadores padrão. Ela não existirá, porém, nos registros da Receita Federal, então consultas oficiais a rejeitam corretamente.',
          'Entender essa distinção ajuda os times de QA a desenhar testes: garanta que seu validador aceita o formato, mas mocke ou pule a chamada à API do governo nas execuções automatizadas.',
        ],
      },
      {
        id: 'privacidade-qa',
        heading: 'Benefícios de privacidade para times de QA',
        level: 2,
        paragraphs: [
          'Copiar identificadores reais de empresas em planilhas de teste compartilhadas cria exposição desnecessária. Geradores sintéticos removem esse risco mantendo dados realistas o suficiente para acionar todos os caminhos de validação.',
          'Como a geração é totalmente local, seus números de teste nunca vão para uma API de dados falsos de terceiros nem aparecem em logs externos.',
        ],
      },
      {
        id: 'testes-integracao',
        heading: 'Integrando a fluxos de teste mais amplos',
        level: 2,
        paragraphs: [
          'Combine o Gerador de CNPJ com as ferramentas de CSV e JSON para montar arquivos de fixture de empresas sintéticas. Exporte um CSV de fornecedores de teste, formate o JSON e coloque um CNPJ gerado em cada linha.',
          'Para formulários de onboarding que também validam e-mail, telefone e endereço, mantenha cada campo sintético consistente dentro de uma persona de teste para que demos e screenshots pareçam realistas.',
          'Startups B2B brasileiras costumam popular tenants de demonstração com CNPJs gerados durante apresentações a investidores, exibindo dashboards realistas sem tocar tabelas de clientes de produção.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Os CNPJs gerados são reais?',
        a: 'Não. São válidos apenas para verificação de formato. Não estão registrados na Receita Federal e não pertencem a empresas reais.',
      },
      {
        q: 'Posso usar esses CNPJs em produção?',
        a: 'Não. Use apenas em ambientes de desenvolvimento, homologação e QA para testes de software.',
      },
      {
        q: 'Meu validador vai aceitá-los?',
        a: 'Se verificar o algoritmo de dígitos, sim. Se consultar bases governamentais, os CNPJs gerados falharão na existência — o que é esperado.',
      },
      {
        q: 'A ferramenta armazena os números gerados?',
        a: 'Não. Eles existem apenas na sessão do navegador. Nada é enviado ou registrado pelo PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/limpador-codigo', '/csv-to-json', '/json-to-csv'],
    cta: defaultCta('pt', 'Gerador de CNPJ'),
  },
  es: {
    title: 'Generador de CNPJ para Pruebas de Software | PDFWINDOWS',
    description:
      'Genera CNPJ con formato válido y dígitos verificadores correctos para QA y desarrollo, localmente en el navegador.',
    keywords: 'generador cnpj prueba, cnpj valido desarrollo, cnpj fake qa, probar validador cnpj, cnpj empresa prueba',
    h1: 'Generador de CNPJ — Solo para Pruebas',
    intro:
      'El Generador de CNPJ de PDFWINDOWS produce números de registro de empresas brasileñas (Cadastro Nacional da Pessoa Jurídica) con dígitos verificadores matemáticamente correctos, enteramente en el navegador. Existe para que desarrolladores y equipos de QA prueben formularios de registro, validadores e integraciones sin copiar identificadores reales de empresas. Ningún número es emitido por Receita Federal y ninguno corresponde a una empresa real. Úselo para poblar bases de staging, verificar máscaras de entrada y ejercitar la validación de backend manteniendo datos corporativos reales fuera del entorno de pruebas.',
    toolName: 'Generador de CNPJ',
    benefits: [
      'Algoritmo de dígitos verificadores según reglas oficiales del CNPJ',
      'Generación y copia al portapapeles en un clic',
      'Funciona 100% en el navegador — nada se sube',
      'Ideal para máscaras frontend y pruebas de validador backend',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'QA de onboarding B2B y de proveedores',
        body: 'Los equipos que construyen portales de proveedores y flujos de onboarding B2B validan CNPJ en blur y submit. Genere números nuevos en cada ejecución para que staging nunca reutilice un identificador real de empresa, manteniendo los datos de prueba limpios.',
      },
      {
        title: 'Pruebas unitarias de validador backend',
        body: 'Los desarrolladores copian CNPJs generados en fixtures para asegurar que el validador server-side acepta el formato correcto y rechaza dígitos alterados, cubriendo el camino feliz y los casos borde.',
      },
      {
        title: 'Desarrollo de máscara de entrada',
        body: 'Los equipos frontend verifican que la máscara de CNPJ (00.000.000/0000-00) formatea los valores generados correctamente en todos los navegadores, incluido pegar y autocompletar.',
      },
      {
        title: 'Demos de facturación y ERP',
        body: 'Los equipos de producto y ventas pueblan demos de ERP o facturación con CNPJs sintéticos realistas para que las capturas y presentaciones nunca expongan a un cliente real.',
      },
      {
        title: 'Enseñanza de algoritmos de checksum',
        body: 'Los instructores usan el CNPJ como ejemplo familiar de checksum ponderado módulo once al enseñar validación e integridad de datos.',
      },
    ],
    howItWorks: [
      'Abra el Generador de CNPJ y lea el aviso.',
      'Haga clic en Generar para crear un nuevo CNPJ con formato válido.',
      'Copie el valor al portapapeles o formulario de prueba.',
      'Repita según necesidad — cada clic genera un número diferente.',
    ],
    tips: [
      'Nunca presente CNPJs generados como pertenecientes a una empresa real ni los use para fraude.',
      'Formato válido no significa CNPJ activo en Receita Federal — las integraciones que consultan registros oficiales lo rechazarán, lo cual es esperado.',
      'Mantenga los CNPJs sintéticos en fixtures específicas de entorno, nunca en tablas de producción con clientes reales.',
      'Combine con la herramienta JSON a CSV para armar conjuntos de prueba con registros de empresas.',
      'Rote valores entre ejecuciones para detectar suposiciones hardcoded en las pruebas.',
      'Documente en el plan de pruebas que los CNPJs sintéticos vienen del generador PDFWINDOWS.',
    ],
    sections: [
      {
        id: 'que-es-cnpj',
        heading: 'Qué es un CNPJ y cómo se estructura',
        level: 2,
        paragraphs: [
          'El CNPJ identifica a una persona jurídica brasileña. Tiene catorce dígitos organizados como una raíz de ocho dígitos que identifica a la empresa, un sufijo de cuatro dígitos que identifica la sucursal (0001 para la matriz) y dos dígitos verificadores al final.',
          'El generador crea una raíz aleatoria de ocho dígitos, fija la sucursal en 0001 y calcula los dos dígitos verificadores para que el número pase la misma validación usada por bancos, ERPs y portales gubernamentales.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Cómo funciona el algoritmo de dígitos verificadores',
        level: 2,
        paragraphs: [
          'El primer dígito verificador se calcula desde los doce primeros dígitos con los pesos 5,4,3,2,9,8,7,6,5,4,3,2; el segundo usa los trece primeros con los pesos 6,5,4,3,2,9,8,7,6,5,4,3,2. Cada suma ponderada se toma módulo once, y un resto menor que dos resulta en cero.',
          'Como la herramienta replica exactamente esa lógica, la salida pasa máscaras client-side y validadores estándar. Sin embargo, no existirá en los registros de Receita Federal, por lo que las consultas oficiales la rechazan correctamente.',
          'Entender esta distinción ayuda a los equipos de QA a diseñar pruebas: asegúrese de que su validador acepta el formato, pero simule u omita la llamada a la API del gobierno en las ejecuciones automatizadas.',
        ],
      },
      {
        id: 'privacidad-qa',
        heading: 'Beneficios de privacidad para equipos de QA',
        level: 2,
        paragraphs: [
          'Copiar identificadores reales de empresas en hojas de cálculo compartidas crea exposición innecesaria. Los generadores sintéticos eliminan ese riesgo manteniendo datos realistas suficientes para activar todas las rutas de validación.',
          'Como la generación es totalmente local, sus números de prueba nunca viajan a una API de datos falsos de terceros ni aparecen en logs externos.',
        ],
      },
      {
        id: 'pruebas-integracion',
        heading: 'Integrando a flujos de prueba más amplios',
        level: 2,
        paragraphs: [
          'Combine el Generador de CNPJ con las herramientas de CSV y JSON para armar archivos de fixture de empresas sintéticas. Exporte un CSV de proveedores de prueba, formatee el JSON y coloque un CNPJ generado en cada fila.',
          'Para formularios de onboarding que también validan email, teléfono y dirección, mantenga cada campo sintético consistente dentro de una persona de prueba para que demos y capturas parezcan realistas.',
          'Las startups B2B brasileñas suelen poblar tenants de demostración con CNPJs generados durante presentaciones a inversores, mostrando dashboards realistas sin tocar tablas de clientes de producción.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Los CNPJs generados son reales?',
        a: 'No. Son válidos solo para verificación de formato. No están registrados en Receita Federal y no pertenecen a empresas reales.',
      },
      {
        q: '¿Puedo usar estos CNPJs en producción?',
        a: 'No. Úselos solo en entornos de desarrollo, staging y QA para pruebas de software.',
      },
      {
        q: '¿Mi validador los aceptará?',
        a: 'Si verifica el algoritmo de dígitos, sí. Si consulta bases gubernamentales, los CNPJs generados fallarán en la existencia — lo cual es esperado.',
      },
      {
        q: '¿La herramienta almacena los números generados?',
        a: 'No. Existen solo en la sesión del navegador. Nada se sube ni registra por PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/limpador-codigo', '/csv-to-json', '/json-to-csv'],
    cta: defaultCta('es', 'Generador de CNPJ'),
  },
};
