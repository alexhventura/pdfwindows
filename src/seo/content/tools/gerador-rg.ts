import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_RG_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'RG Generator for Software Testing | PDFWINDOWS',
    description:
      'Generate valid-format RG numbers (SSP-SP) with a check digit for QA and development, entirely in your browser.',
    keywords: 'rg generator test, valid rg for development, fake rg qa, brazil id number test, rg check digit',
    h1: 'RG Generator — For Testing Only',
    intro:
      'The PDFWINDOWS RG Generator creates Brazilian identity-document numbers in the São Paulo (SSP-SP) format, complete with a check digit, entirely in your browser. It exists so developers and QA engineers can populate forms, fixtures and demos without copying anyone’s real identity number. No document is issued by any state agency, and none corresponds to a real person. Use it to exercise input masks, verify validators and build realistic test personas while keeping real personal data out of your environment.',
    toolName: 'RG Generator',
    benefits: [
      'Check digit computed with the SSP-SP modulo-eleven rule',
      'One-click generation and clipboard copy',
      'Runs 100% in the browser — nothing is uploaded',
      'Great for masks, validators and demo personas',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Registration form QA',
        body: 'QA engineers test sign-up and KYC-style forms that capture an RG. Generating fresh numbers each run avoids reusing real identity data and keeps staging databases compliant with data-minimization practices.',
      },
      {
        title: 'Input mask verification',
        body: 'Frontend teams confirm that RG masks (00.000.000-0) format generated values consistently across browsers, including paste, autofill and the special check character X.',
      },
      {
        title: 'Validator unit tests',
        body: 'Developers add generated RGs to fixtures to assert that validators accept the correct format and reject transposed or missing digits.',
      },
      {
        title: 'Demo screenshots and tutorials',
        body: 'Documentation and marketing teams fill screenshots with synthetic RGs instead of blurring real identity numbers, producing cleaner, safer visuals.',
      },
      {
        title: 'Teaching data validation',
        body: 'Instructors use the RG check digit as an approachable example of modulo arithmetic and data-integrity checks in class exercises.',
      },
    ],
    howItWorks: [
      'Open the RG Generator and read the notice.',
      'Click Generate to create a new valid-format RG.',
      'Copy the value to your clipboard or test form.',
      'Repeat as needed — each click yields a different number.',
    ],
    tips: [
      'Never present a generated RG as a real identity document or use it for fraud or impersonation.',
      'The SSP-SP algorithm is one of several state formats; validators built for other states may differ.',
      'The check digit can be the character X — make sure your mask and validator accept it.',
      'Keep synthetic RGs in environment-specific fixtures, never in production tables with real users.',
      'Combine with a synthetic name and address so test personas look realistic in demos.',
      'Rotate values between runs to catch hardcoded assumptions in your tests.',
    ],
    sections: [
      {
        id: 'what-is-rg',
        heading: 'What an RG is and why formats vary',
        level: 2,
        paragraphs: [
          'The RG (Registro Geral) is a Brazilian identity document issued by each state’s public-security department. Because it is issued per state, numbering and check-digit rules are not uniform nationwide.',
          'This generator uses the widely referenced São Paulo (SSP-SP) format: eight base digits followed by a single check digit that may be a number or the character X. It is a convenient, well-documented convention for test data.',
        ],
      },
      {
        id: 'algorithm-explained',
        heading: 'How the check digit is computed',
        level: 2,
        paragraphs: [
          'The eight base digits are multiplied by the weights 2 through 9 and summed. The remainder of that sum modulo eleven is subtracted from eleven; a result of ten is represented as X and a result of eleven becomes zero.',
          'The generator produces random base digits and applies this rule so the output passes SSP-SP-style masks and validators. It is not registered with any agency, so official lookups correctly treat it as non-existent.',
          'For automated end-to-end tests, mock or skip any official verification step and assert only that your own format validation behaves as expected.',
        ],
      },
      {
        id: 'privacy-for-qa',
        heading: 'Privacy benefits for QA teams',
        level: 2,
        paragraphs: [
          'Identity numbers are sensitive personal data. Copying real RGs into shared spreadsheets creates avoidable exposure, while synthetic generators keep test data realistic without touching anyone’s identity.',
          'Because generation runs entirely in your browser, test values never reach a third-party fake-data API or appear in external logs.',
        ],
      },
      {
        id: 'integration-testing',
        heading: 'Building realistic test personas',
        level: 2,
        paragraphs: [
          'Pair the RG Generator with the CPF Generator and the CSV and JSON tools to assemble complete synthetic identities for fixtures and demos.',
          'Keep every field of a persona consistent — name, RG, CPF, email and phone — so screenshots and QA sessions feel authentic without real data.',
          'Support teams can reproduce customer-reported bugs using synthetic personas that mirror production shapes without ever handling a real customer’s document.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Is a generated RG real?',
        a: 'No. It is valid for format checking only, is not issued by any agency, and does not belong to a real person.',
      },
      {
        q: 'Why does the check digit sometimes show X?',
        a: 'In the SSP-SP rule a remainder of ten is represented as the character X. Make sure your mask and validator accept it.',
      },
      {
        q: 'Can I use these RGs in production?',
        a: 'No. Use them only in development, staging and QA environments for software testing.',
      },
      {
        q: 'Does the tool store generated numbers?',
        a: 'No. They exist only in your browser session. Nothing is uploaded or logged by PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-telefone', '/limpador-codigo'],
    cta: defaultCta('en', 'RG Generator'),
  },
  pt: {
    title: 'Gerador de RG para Testes de Software | PDFWINDOWS',
    description:
      'Gere números de RG (SSP-SP) com formato válido e dígito verificador para QA e desenvolvimento, no navegador.',
    keywords: 'gerador rg teste, rg valido desenvolvimento, rg fake qa, testar validador rg, rg digito verificador',
    h1: 'Gerador de RG — Apenas para Testes',
    intro:
      'O Gerador de RG do PDFWINDOWS cria números de documento de identidade brasileiro no formato de São Paulo (SSP-SP), com dígito verificador, inteiramente no navegador. Ele existe para desenvolvedores e times de QA preencherem formulários, fixtures e demos sem copiar o número de identidade real de ninguém. Nenhum documento é emitido por órgão estadual e nenhum corresponde a uma pessoa real. Use para exercitar máscaras de input, verificar validadores e construir personas de teste realistas mantendo dados pessoais reais fora do ambiente.',
    toolName: 'Gerador de RG',
    benefits: [
      'Dígito verificador pela regra módulo onze do SSP-SP',
      'Geração e cópia para a área de transferência em um clique',
      'Roda 100% no navegador — nada é enviado',
      'Ótimo para máscaras, validadores e personas de demo',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'QA de formulário de cadastro',
        body: 'Times de QA testam formulários de cadastro e de KYC que capturam RG. Gerar números novos a cada execução evita reutilizar dados reais de identidade e mantém o staging alinhado à minimização de dados.',
      },
      {
        title: 'Verificação de máscara de input',
        body: 'Times frontend confirmam que máscaras de RG (00.000.000-0) formatam valores gerados de forma consistente em todos os navegadores, inclusive ao colar, no autofill e com o caractere verificador X.',
      },
      {
        title: 'Testes unitários de validador',
        body: 'Desenvolvedores adicionam RGs gerados a fixtures para garantir que validadores aceitam o formato correto e rejeitam dígitos trocados ou ausentes.',
      },
      {
        title: 'Screenshots de demo e tutoriais',
        body: 'Times de documentação e marketing preenchem screenshots com RGs sintéticos em vez de borrar números reais de identidade, gerando imagens mais limpas e seguras.',
      },
      {
        title: 'Ensino de validação de dados',
        body: 'Instrutores usam o dígito verificador do RG como exemplo acessível de aritmética modular e checagem de integridade em exercícios.',
      },
    ],
    howItWorks: [
      'Abra o Gerador de RG e leia o aviso.',
      'Clique em Gerar para criar um novo RG com formato válido.',
      'Copie o valor para a área de transferência ou formulário de teste.',
      'Repita conforme necessário — cada clique gera um número diferente.',
    ],
    tips: [
      'Nunca apresente um RG gerado como documento real nem o use para fraude ou impersonação.',
      'O algoritmo SSP-SP é um entre vários formatos estaduais; validadores de outros estados podem diferir.',
      'O dígito verificador pode ser o caractere X — garanta que sua máscara e validador o aceitem.',
      'Mantenha RGs sintéticos em fixtures específicas de ambiente, nunca em tabelas de produção com usuários reais.',
      'Combine com um nome e endereço sintéticos para que personas de teste pareçam realistas em demos.',
      'Rotacione valores entre execuções para detectar suposições hardcoded nos testes.',
    ],
    sections: [
      {
        id: 'o-que-e-rg',
        heading: 'O que é o RG e por que os formatos variam',
        level: 2,
        paragraphs: [
          'O RG (Registro Geral) é um documento de identidade brasileiro emitido pela secretaria de segurança pública de cada estado. Por ser emitido por estado, as regras de numeração e de dígito verificador não são uniformes no país.',
          'Este gerador usa o formato de São Paulo (SSP-SP), amplamente referenciado: oito dígitos base seguidos de um dígito verificador que pode ser um número ou o caractere X. É uma convenção conveniente e bem documentada para dados de teste.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Como o dígito verificador é calculado',
        level: 2,
        paragraphs: [
          'Os oito dígitos base são multiplicados pelos pesos de 2 a 9 e somados. O resto dessa soma módulo onze é subtraído de onze; um resultado dez é representado por X e um resultado onze vira zero.',
          'O gerador produz dígitos base aleatórios e aplica essa regra para a saída passar em máscaras e validadores no estilo SSP-SP. Ela não está registrada em nenhum órgão, então consultas oficiais a tratam corretamente como inexistente.',
          'Para testes end-to-end automatizados, mocke ou pule qualquer etapa de verificação oficial e garanta apenas que sua validação de formato se comporta como esperado.',
        ],
      },
      {
        id: 'privacidade-qa',
        heading: 'Benefícios de privacidade para times de QA',
        level: 2,
        paragraphs: [
          'Números de identidade são dados pessoais sensíveis. Copiar RGs reais em planilhas compartilhadas cria exposição evitável, enquanto geradores sintéticos mantêm dados realistas sem tocar na identidade de ninguém.',
          'Como a geração roda inteiramente no navegador, os valores de teste nunca chegam a uma API de dados falsos de terceiros nem aparecem em logs externos.',
        ],
      },
      {
        id: 'testes-integracao',
        heading: 'Construindo personas de teste realistas',
        level: 2,
        paragraphs: [
          'Combine o Gerador de RG com o Gerador de CPF e as ferramentas de CSV e JSON para montar identidades sintéticas completas para fixtures e demos.',
          'Mantenha cada campo de uma persona consistente — nome, RG, CPF, e-mail e telefone — para que screenshots e sessões de QA pareçam autênticos sem dados reais.',
          'Times de suporte podem reproduzir bugs relatados por clientes usando personas sintéticas que espelham o formato de produção sem nunca manipular o documento real de um cliente.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'Um RG gerado é real?',
        a: 'Não. É válido apenas para verificação de formato, não é emitido por nenhum órgão e não pertence a uma pessoa real.',
      },
      {
        q: 'Por que às vezes o dígito verificador é X?',
        a: 'Na regra SSP-SP um resto igual a dez é representado pelo caractere X. Garanta que sua máscara e validador o aceitem.',
      },
      {
        q: 'Posso usar esses RGs em produção?',
        a: 'Não. Use apenas em ambientes de desenvolvimento, homologação e QA para testes de software.',
      },
      {
        q: 'A ferramenta armazena os números gerados?',
        a: 'Não. Eles existem apenas na sessão do navegador. Nada é enviado ou registrado pelo PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-telefone', '/limpador-codigo'],
    cta: defaultCta('pt', 'Gerador de RG'),
  },
  es: {
    title: 'Generador de RG para Pruebas de Software | PDFWINDOWS',
    description:
      'Genera números de RG (SSP-SP) con formato válido y dígito verificador para QA y desarrollo, en el navegador.',
    keywords: 'generador rg prueba, rg valido desarrollo, rg fake qa, probar validador rg, rg digito verificador',
    h1: 'Generador de RG — Solo para Pruebas',
    intro:
      'El Generador de RG de PDFWINDOWS crea números de documento de identidad brasileño en el formato de São Paulo (SSP-SP), con dígito verificador, enteramente en el navegador. Existe para que desarrolladores y equipos de QA rellenen formularios, fixtures y demos sin copiar el número de identidad real de nadie. Ningún documento es emitido por un órgano estatal y ninguno corresponde a una persona real. Úselo para ejercitar máscaras de entrada, verificar validadores y construir personas de prueba realistas manteniendo datos personales reales fuera del entorno.',
    toolName: 'Generador de RG',
    benefits: [
      'Dígito verificador por la regla módulo once del SSP-SP',
      'Generación y copia al portapapeles en un clic',
      'Funciona 100% en el navegador — nada se sube',
      'Ideal para máscaras, validadores y personas de demo',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'QA de formulario de registro',
        body: 'Los equipos de QA prueban formularios de registro y de KYC que capturan un RG. Generar números nuevos en cada ejecución evita reutilizar datos reales de identidad y mantiene staging alineado con la minimización de datos.',
      },
      {
        title: 'Verificación de máscara de entrada',
        body: 'Los equipos frontend confirman que las máscaras de RG (00.000.000-0) formatean los valores generados de forma consistente en todos los navegadores, incluido pegar, autocompletar y el carácter verificador X.',
      },
      {
        title: 'Pruebas unitarias de validador',
        body: 'Los desarrolladores agregan RGs generados a fixtures para asegurar que los validadores aceptan el formato correcto y rechazan dígitos transpuestos o ausentes.',
      },
      {
        title: 'Capturas de demo y tutoriales',
        body: 'Los equipos de documentación y marketing rellenan capturas con RGs sintéticos en lugar de difuminar números reales de identidad, produciendo imágenes más limpias y seguras.',
      },
      {
        title: 'Enseñanza de validación de datos',
        body: 'Los instructores usan el dígito verificador del RG como ejemplo accesible de aritmética modular y verificación de integridad en ejercicios.',
      },
    ],
    howItWorks: [
      'Abra el Generador de RG y lea el aviso.',
      'Haga clic en Generar para crear un nuevo RG con formato válido.',
      'Copie el valor al portapapeles o formulario de prueba.',
      'Repita según necesidad — cada clic genera un número diferente.',
    ],
    tips: [
      'Nunca presente un RG generado como documento real ni lo use para fraude o suplantación.',
      'El algoritmo SSP-SP es uno de varios formatos estatales; los validadores de otros estados pueden diferir.',
      'El dígito verificador puede ser el carácter X — asegúrese de que su máscara y validador lo acepten.',
      'Mantenga los RGs sintéticos en fixtures específicas de entorno, nunca en tablas de producción con usuarios reales.',
      'Combine con un nombre y dirección sintéticos para que las personas de prueba parezcan realistas en demos.',
      'Rote valores entre ejecuciones para detectar suposiciones hardcoded en las pruebas.',
    ],
    sections: [
      {
        id: 'que-es-rg',
        heading: 'Qué es el RG y por qué varían los formatos',
        level: 2,
        paragraphs: [
          'El RG (Registro Geral) es un documento de identidad brasileño emitido por la secretaría de seguridad pública de cada estado. Al ser emitido por estado, las reglas de numeración y de dígito verificador no son uniformes en el país.',
          'Este generador usa el formato de São Paulo (SSP-SP), ampliamente referenciado: ocho dígitos base seguidos de un dígito verificador que puede ser un número o el carácter X. Es una convención conveniente y bien documentada para datos de prueba.',
        ],
      },
      {
        id: 'algoritmo-explicado',
        heading: 'Cómo se calcula el dígito verificador',
        level: 2,
        paragraphs: [
          'Los ocho dígitos base se multiplican por los pesos de 2 a 9 y se suman. El resto de esa suma módulo once se resta de once; un resultado diez se representa como X y un resultado once se convierte en cero.',
          'El generador produce dígitos base aleatorios y aplica esta regla para que la salida pase máscaras y validadores al estilo SSP-SP. No está registrada en ningún órgano, por lo que las consultas oficiales la tratan correctamente como inexistente.',
          'Para pruebas end-to-end automatizadas, simule u omita cualquier paso de verificación oficial y asegúrese solo de que su validación de formato se comporta como se espera.',
        ],
      },
      {
        id: 'privacidad-qa',
        heading: 'Beneficios de privacidad para equipos de QA',
        level: 2,
        paragraphs: [
          'Los números de identidad son datos personales sensibles. Copiar RGs reales en hojas compartidas crea exposición evitable, mientras que los generadores sintéticos mantienen datos realistas sin tocar la identidad de nadie.',
          'Como la generación corre enteramente en el navegador, los valores de prueba nunca llegan a una API de datos falsos de terceros ni aparecen en logs externos.',
        ],
      },
      {
        id: 'pruebas-integracion',
        heading: 'Construyendo personas de prueba realistas',
        level: 2,
        paragraphs: [
          'Combine el Generador de RG con el Generador de CPF y las herramientas de CSV y JSON para armar identidades sintéticas completas para fixtures y demos.',
          'Mantenga cada campo de una persona consistente — nombre, RG, CPF, email y teléfono — para que capturas y sesiones de QA se sientan auténticas sin datos reales.',
          'Los equipos de soporte pueden reproducir errores reportados por clientes usando personas sintéticas que reflejan las formas de producción sin manipular nunca el documento real de un cliente.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿Un RG generado es real?',
        a: 'No. Es válido solo para verificación de formato, no es emitido por ningún órgano y no pertenece a una persona real.',
      },
      {
        q: '¿Por qué a veces el dígito verificador es X?',
        a: 'En la regla SSP-SP un resto igual a diez se representa con el carácter X. Asegúrese de que su máscara y validador lo acepten.',
      },
      {
        q: '¿Puedo usar estos RGs en producción?',
        a: 'No. Úselos solo en entornos de desarrollo, staging y QA para pruebas de software.',
      },
      {
        q: '¿La herramienta almacena los números generados?',
        a: 'No. Existen solo en la sesión del navegador. Nada se sube ni registra por PDFWINDOWS.',
      },
    ],
    relatedTools: ['/gerador-cpf', '/gerador-cnpj', '/gerador-telefone', '/limpador-codigo'],
    cta: defaultCta('es', 'Generador de RG'),
  },
};
