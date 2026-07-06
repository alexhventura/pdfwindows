import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_CPF_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'CPF Generator for Software Testing | PDFWINDOWS',
    description:
      'Generate valid-format Brazilian CPF numbers for form validation and QA testing only. Local algorithm, clear legal notice, no upload.',
    keywords:
      'cpf generator test, brazil cpf validator test, fake cpf for development, cpf test numbers, software qa cpf',
    h1: 'CPF Generator — For Testing Only',
    intro:
      'PDFWINDOWS CPF Generator produces mathematically valid Brazilian CPF numbers for software testing, form validation QA, and developer education. The tool implements the official check-digit algorithm entirely in your browser — no numbers are issued by Receita Federal and none correspond to real individuals. Use it to populate staging databases, test mask inputs, and verify backend validators without copying real personal data. A prominent legal notice reminds users that generated CPFs are for development purposes only and must never substitute real taxpayer identifiers in production systems.',
    toolName: 'CPF Generator',
    benefits: [
      'Valid check-digit algorithm matching official CPF rules',
      'One-click generation and clipboard copy',
      '100% local — no CPF sent to servers',
      'Clear legal disclaimer for ethical use',
      'Ideal for frontend mask and backend validator tests',
      'No registration or API key required',
    ],
    useCases: [
      {
        title: 'Checkout form QA',
        body: 'QA engineers test e-commerce checkout flows that validate CPF on blur and submit. Generate fresh numbers each run without reusing real customer data. Staging environments stay compliant with LGPD data minimization because no actual taxpayer identifiers enter your test database.',
      },
      {
        title: 'Backend validator unit tests',
        body: 'Developers copy generated CPFs into test fixtures to assert server-side validation accepts valid formats and rejects tampered digits.',
      },
      {
        title: 'Input mask development',
        body: 'Frontend teams verify CPF masking libraries (000.000.000-00) format generated values correctly across browsers.',
      },
      {
        title: 'Demo environments and screenshots',
        body: 'Product marketing creates screenshots with realistic but synthetic CPF values instead of redacting real identification numbers.',
      },
      {
        title: 'Computer science education',
        body: 'Instructors demonstrate weighted checksum algorithms using CPF as a familiar Brazilian example of modular arithmetic validation.',
      },
    ],
    howItWorks: [
      'Open the CPF Generator and read the legal notice.',
      'Click Generate to create a new valid-format CPF.',
      'Copy the value to your clipboard or test form.',
      'Repeat as needed — each click produces a different number.',
    ],
    tips: [
      'Never use generated CPFs for fraud, identity impersonation, or real government submissions.',
      'Pair with your backend validator — format validity does not mean the CPF exists in Receita Federal records.',
      'Store test CPFs in environment-specific config, not production databases with real users.',
      'Document in your test plan that synthetic CPFs come from PDFWINDOWS generator.',
      'Use Code Cleaner to format JSON test fixtures containing CPF fields.',
      'Rotate generated values between test runs to catch hardcoded assumptions.',
      'Label test environments clearly in your CI config so synthetic CPFs never leak into production deployment scripts.',
    ],
    sections: [
      {
        id: 'testing-only',
        heading: 'Strictly for testing — legal and ethical use',
        level: 2,
        paragraphs: [
          'CPF is a Brazilian individual taxpayer registry identifier protected by privacy law. PDFWINDOWS provides this generator solely so developers can test software without handling real personal data. Generated numbers pass format validation but must never be presented as genuine identity documents.',
          'Misuse for fraud, account creation on government portals, or credit applications is illegal. The tool displays warnings to reinforce appropriate use.',
        ],
      },
      {
        id: 'algorithm-explained',
        heading: 'How the validation algorithm works',
        level: 2,
        paragraphs: [
          'A CPF has eleven digits where the last two are check digits computed from the preceding nine using weighted sums modulo eleven. PDFWINDOWS generates random base digits, then calculates check digits so the result passes the same validation logic used by banks and e-commerce sites.',
          'Understanding this distinction helps QA teams: format-valid CPFs from the generator should pass client-side masks and basic server validators, but integrations with Receita Federal APIs will reject them as non-existent.',
          'When writing automated end-to-end tests, combine generated CPFs with synthetic names and addresses so your test personas look realistic in screenshots and demo videos without exposing anyone\'s real identity.',
        ],
      },
      {
        id: 'privacy-for-qa',
        heading: 'Privacy benefits for QA teams',
        level: 2,
        paragraphs: [
          'Copying real CPFs from colleagues into test spreadsheets violates LGPD data minimization principles. Synthetic generators eliminate that risk while keeping test data realistic enough to trigger validation code paths.',
          'Because generation is local, your test numbers never appear in server logs of third-party fake-data APIs.',
        ],
      },
      {
        id: 'integration-testing',
        heading: 'Integrating with broader test workflows',
        level: 2,
        paragraphs: [
          'Combine CPF Generator with JSON to CSV and Code Cleaner tools when building fixture files. Export CSV test users, format the JSON, and paste CPFs from the generator into each row.',
          'For forms that also validate email and phone, keep all synthetic data consistent within a test persona to simulate realistic user profiles.',
          'Brazilian fintech startups often seed demo accounts with generated CPFs during investor presentations so dashboards show realistic Brazilian identifiers without touching production customer tables.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Are generated CPFs real?',
        a: 'No. They are mathematically valid for format checking only. They are not registered with Receita Federal and do not belong to real people.',
      },
      {
        q: 'Can I use these CPFs in production?',
        a: 'No. Use only in development, staging, and QA environments for software testing.',
      },
      {
        q: 'Is generating CPF numbers legal?',
        a: 'Generating format-valid test numbers for software development is a common practice. Using them for fraud or impersonation is illegal.',
      },
      {
        q: 'Does the tool store generated CPFs?',
        a: 'No. Numbers exist in your browser session only. Nothing is uploaded or logged by PDFWINDOWS.',
      },
      {
        q: 'Will my validator accept these CPFs?',
        a: 'If your validator checks digit algorithms, yes. If it queries government databases, generated CPFs will fail existence checks — which is expected.',
      },
    ],
    relatedTools: ['/limpador-codigo', '/csv-to-json', '/json-to-csv', '/estudio-documentos'],
    cta: defaultCta('en', 'CPF Generator'),
  },
  pt: {
    title: 'Gerador de CPF para Testes de Software | PDFWINDOWS',
    description:
      'Gere CPFs com formato válido para validação de formulários e testes de QA. Algoritmo local, aviso legal claro, sem upload.',
    keywords:
      'gerador cpf teste, cpf valido para desenvolvimento, cpf fake teste sistema, qa cpf brasil, testar validador cpf',
    h1: 'Gerador de CPF — Apenas para Testes',
    intro:
      'O Gerador de CPF do PDFWINDOWS produz números de CPF brasileiros matematicamente válidos para testes de software, QA de formulários e educação de desenvolvedores. A ferramenta implementa o algoritmo oficial de dígitos verificadores inteiramente no navegador — nenhum número é emitido pela Receita Federal e nenhum corresponde a pessoas reais. Use para popular bancos de staging, testar máscaras de input e verificar validadores backend sem copiar dados pessoais reais.',
    toolName: 'Gerador de CPF',
    benefits: [
      'Algoritmo de dígitos verificadores conforme regras oficiais do CPF',
      'Geração e cópia para área de transferência em um clique',
      '100% local — nenhum CPF enviado a servidores',
      'Aviso legal claro para uso ético',
      'Ideal para testes de máscara frontend e validador backend',
      'Sem cadastro ou chave de API',
    ],
    useCases: [
      {
        title: 'QA de formulário de checkout',
        body: 'Engenheiros de QA testam fluxos de e-commerce que validam CPF no blur e submit. Gerem números novos a cada execução sem reutilizar dados reais de clientes. Ambientes de homologação permanecem em conformidade com a LGPD porque nenhum identificador real de contribuinte entra no banco de testes.',
      },
      {
        title: 'Testes unitários de validador backend',
        body: 'Desenvolvedores copiam CPFs gerados em fixtures para garantir que validação server-side aceita formatos válidos e rejeita dígitos adulterados.',
      },
      {
        title: 'Desenvolvimento de máscara de input',
        body: 'Times frontend verificam se bibliotecas de máscara CPF (000.000.000-00) formatam valores gerados corretamente em todos os navegadores.',
      },
      {
        title: 'Ambientes de demo e screenshots',
        body: 'Marketing de produto cria screenshots com CPFs sintéticos realistas em vez de redigir números de identificação reais.',
      },
      {
        title: 'Educação em ciência da computação',
        body: 'Instrutores demonstram algoritmos de checksum ponderado usando CPF como exemplo brasileiro familiar de validação modular.',
      },
    ],
    howItWorks: [
      'Abra o Gerador de CPF e leia o aviso legal.',
      'Clique em Gerar para criar um novo CPF com formato válido.',
      'Copie o valor para a área de transferência ou formulário de teste.',
      'Repita conforme necessário — cada clique produz um número diferente.',
    ],
    tips: [
      'Nunca use CPFs gerados para fraude, impersonação ou envios governamentais reais.',
      'Combine com seu validador backend — formato válido não significa existência na Receita Federal.',
      'Armazene CPFs de teste em config específica de ambiente, não em banco de produção com usuários reais.',
      'Documente no plano de testes que CPFs sintéticos vêm do gerador PDFWINDOWS.',
      'Use o Limpador de Código para formatar fixtures JSON com campos CPF.',
      'Rotacione valores entre execuções de teste para detectar suposições hardcoded.',
    ],
    sections: [
      {
        id: 'apenas-testes',
        heading: 'Estritamente para testes — uso legal e ético',
        level: 2,
        paragraphs: [
          'CPF é identificador do cadastro de pessoas físicas protegido pela LGPD. O PDFWINDOWS oferece este gerador apenas para desenvolvedores testarem software sem manipular dados pessoais reais. Números gerados passam validação de formato mas nunca devem ser apresentados como documentos de identidade genuínos.',
          'Uso indevido para fraude, criação de contas em portais governamentais ou crédito é ilegal. A ferramenta exibe avisos para reforçar uso adequado.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Como funciona o algoritmo de validação',
        level: 2,
        paragraphs: [
          'O CPF tem onze dígitos onde os dois últimos são verificadores calculados a partir dos nove anteriores com somas ponderadas módulo onze. O PDFWINDOWS gera dígitos base aleatórios e calcula verificadores para passar a mesma lógica usada por bancos e e-commerce.',
          'Essa distinção ajuda times de QA: CPFs válidos em formato do gerador passam máscaras client-side e validadores básicos server-side, mas integrações com APIs da Receita rejeitam por inexistência.',
          'Ao escrever testes end-to-end automatizados, combine CPFs gerados com nomes e endereços sintéticos para personas de teste parecerem realistas em screenshots e vídeos de demo sem expor identidade de ninguém.',
        ],
      },
      {
        id: 'privacidade-qa',
        heading: 'Benefícios de privacidade para times de QA',
        level: 2,
        paragraphs: [
          'Copiar CPFs reais de colegas em planilhas de teste viola princípios de minimização da LGPD. Geradores sintéticos eliminam esse risco mantendo dados realistas o suficiente para acionar caminhos de validação.',
          'Como a geração é local, seus números de teste nunca aparecem em logs de APIs de dados falsos de terceiros.',
        ],
      },
      {
        id: 'testes-integracao',
        heading: 'Integrando a fluxos de teste mais amplos',
        level: 2,
        paragraphs: [
          'Combine o Gerador de CPF com JSON para CSV e Limpador de Código ao montar arquivos fixture. Exporte CSV de usuários de teste, formate o JSON e cole CPFs do gerador em cada linha.',
          'Para formulários que também validam e-mail e telefone, mantenha dados sintéticos consistentes em uma persona de teste para simular perfis realistas.',
          'Fintechs brasileiras frequentemente populam contas demo com CPFs gerados em apresentações a investidores, exibindo identificadores realistas sem tocar tabelas de clientes de produção.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Os CPFs gerados são reais?',
        a: 'Não. São válidos apenas para verificação de formato. Não estão cadastrados na Receita Federal e não pertencem a pessoas reais.',
      },
      {
        q: 'Posso usar esses CPFs em produção?',
        a: 'Não. Use apenas em ambientes de desenvolvimento, homologação e QA para testes de software.',
      },
      {
        q: 'É legal gerar números de CPF?',
        a: 'Gerar números com formato válido para desenvolvimento de software é prática comum. Usá-los para fraude ou impersonação é ilegal.',
      },
      {
        q: 'A ferramenta armazena CPFs gerados?',
        a: 'Não. Os números existem apenas na sessão do navegador. Nada é enviado ou registrado pelo PDFWINDOWS.',
      },
      {
        q: 'Meu validador aceitará esses CPFs?',
        a: 'Se verificar algoritmo de dígitos, sim. Se consultar bases governamentais, CPFs gerados falharão em existência — o que é esperado.',
      },
    ],
    relatedTools: ['/limpador-codigo', '/csv-to-json', '/json-to-csv', '/estudio-documentos'],
    cta: defaultCta('pt', 'Gerador de CPF'),
  },
  es: {
    title: 'Generador de CPF para Pruebas de Software | PDFWINDOWS',
    description:
      'Genere CPF brasileños con formato válido para validación de formularios y pruebas QA. Algoritmo local, aviso legal claro, sin subida.',
    keywords:
      'generador cpf prueba, cpf valido desarrollo, cpf fake teste sistema, qa cpf brasil, probar validador cpf',
    h1: 'Generador de CPF — Solo para Pruebas',
    intro:
      'El Generador de CPF de PDFWINDOWS produce números de CPF brasileños matemáticamente válidos para pruebas de software, QA de formularios y educación de desarrolladores. La herramienta implementa el algoritmo oficial de dígitos verificadores enteramente en el navegador — ningún número es emitido por Receita Federal y ninguno corresponde a personas reales. Úselo para poblar bases de staging, probar máscaras de input y verificar validadores backend sin copiar datos personales reales.',
    toolName: 'Generador de CPF',
    benefits: [
      'Algoritmo de dígitos verificadores según reglas oficiales del CPF',
      'Generación y copia al portapapeles en un clic',
      '100% local — ningún CPF enviado a servidores',
      'Aviso legal claro para uso ético',
      'Ideal para pruebas de máscara frontend y validador backend',
      'Sin registro ni clave de API',
    ],
    useCases: [
      {
        title: 'QA de formulario de checkout',
        body: 'Ingenieros QA prueban flujos de e-commerce que validan CPF en blur y submit. Generan números nuevos en cada ejecución sin reutilizar datos reales de clientes. Entornos de staging permanecen conformes con minimización de datos porque ningún identificador real de contribuyente entra en la base de pruebas.',
      },
      {
        title: 'Pruebas unitarias de validador backend',
        body: 'Desarrolladores copian CPFs generados en fixtures para asegurar que validación server-side acepta formatos válidos y rechaza dígitos alterados.',
      },
      {
        title: 'Desarrollo de máscara de input',
        body: 'Equipos frontend verifican si bibliotecas de máscara CPF (000.000.000-00) formatean valores generados correctamente en todos los navegadores.',
      },
      {
        title: 'Ambientes demo y capturas',
        body: 'Marketing de producto crea capturas con CPFs sintéticos realistas en lugar de redactar números de identificación reales.',
      },
      {
        title: 'Educación en ciencias de la computación',
        body: 'Instructores demuestran algoritmos de checksum ponderado usando CPF como ejemplo brasileño familiar de validación modular.',
      },
    ],
    howItWorks: [
      'Abra el Generador de CPF y lea el aviso legal.',
      'Haga clic en Generar para crear un nuevo CPF con formato válido.',
      'Copie el valor al portapapeles o formulario de prueba.',
      'Repita según necesidad — cada clic produce un número diferente.',
    ],
    tips: [
      'Nunca use CPFs generados para fraude, suplantación o envíos gubernamentales reales.',
      'Combine con su validador backend — formato válido no significa existencia en Receita Federal.',
      'Almacene CPFs de prueba en config específica de entorno, no en base de producción con usuarios reales.',
      'Documente en el plan de pruebas que CPFs sintéticos vienen del generador PDFWINDOWS.',
      'Use el Limpiador de Código para formatear fixtures JSON con campos CPF.',
      'Rote valores entre ejecuciones de prueba para detectar suposiciones hardcoded.',
    ],
    sections: [
      {
        id: 'solo-pruebas',
        heading: 'Estrictamente para pruebas — uso legal y ético',
        level: 2,
        paragraphs: [
          'CPF es identificador del registro de personas físicas protegido por leyes de privacidad brasileñas. PDFWINDOWS ofrece este generador solo para que desarrolladores prueben software sin manipular datos personales reales. Números generados pasan validación de formato pero nunca deben presentarse como documentos de identidad genuinos.',
          'Uso indebido para fraude, creación de cuentas en portales gubernamentales o crédito es ilegal. La herramienta muestra avisos para reforzar uso adecuado.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Cómo funciona el algoritmo de validación',
        level: 2,
        paragraphs: [
          'El CPF tiene once dígitos donde los dos últimos son verificadores calculados desde los nueve anteriores con sumas ponderadas módulo once. PDFWINDOWS genera dígitos base aleatorios y calcula verificadores para pasar la misma lógica usada por bancos y e-commerce.',
          'Esta distinción ayuda a equipos QA: CPFs válidos en formato del generador pasan máscaras client-side y validadores básicos server-side, pero integraciones con APIs de Receita los rechazan por inexistencia.',
          'Al escribir pruebas end-to-end automatizadas, combine CPFs generados con nombres y direcciones sintéticas para que personas de prueba parezcan realistas en capturas y videos demo sin exponer identidad de nadie.',
        ],
      },
      {
        id: 'privacidad-qa',
        heading: 'Beneficios de privacidad para equipos QA',
        level: 2,
        paragraphs: [
          'Copiar CPFs reales de colegas en hojas de prueba viola principios de minimización de datos. Generadores sintéticos eliminan ese riesgo manteniendo datos realistas suficientes para activar rutas de validación.',
          'Como la generación es local, sus números de prueba nunca aparecen en logs de APIs de datos falsos de terceros.',
        ],
      },
      {
        id: 'pruebas-integracion',
        heading: 'Integrando a flujos de prueba más amplios',
        level: 2,
        paragraphs: [
          'Combine el Generador de CPF con JSON a CSV y Limpiador de Código al montar archivos fixture. Exporte CSV de usuarios de prueba, formatee JSON y pegue CPFs del generador en cada fila.',
          'Para formularios que también validan email y teléfono, mantenga datos sintéticos consistentes en una persona de prueba para simular perfiles realistas.',
          'Fintechs brasileñas frecuentemente pueblan cuentas demo con CPFs generados en presentaciones a inversores, mostrando identificadores realistas sin tocar tablas de clientes de producción.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Los CPFs generados son reales?',
        a: 'No. Son válidos solo para verificación de formato. No están registrados en Receita Federal y no pertenecen a personas reales.',
      },
      {
        q: '¿Puedo usar estos CPFs en producción?',
        a: 'No. Use solo en entornos de desarrollo, staging y QA para pruebas de software.',
      },
      {
        q: '¿Es legal generar números de CPF?',
        a: 'Generar números con formato válido para desarrollo de software es práctica común. Usarlos para fraude o suplantación es ilegal.',
      },
      {
        q: '¿La herramienta almacena CPFs generados?',
        a: 'No. Los números existen solo en la sesión del navegador. Nada se envía ni registra por PDFWINDOWS.',
      },
      {
        q: '¿Mi validador aceptará estos CPFs?',
        a: 'Si verifica algoritmo de dígitos, sí. Si consulta bases gubernamentales, CPFs generados fallarán en existencia — lo cual es esperado.',
      },
    ],
    relatedTools: ['/limpador-codigo', '/csv-to-json', '/json-to-csv', '/estudio-documentos'],
    cta: defaultCta('es', 'Generador de CPF'),
  },
};
