import type { ToolRichContent } from '../types';
import { privacyFaq, defaultCta } from '../helpers';

export const GERADOR_SENHA_CONTENT: Record<'en' | 'pt' | 'es', ToolRichContent> = {
  en: {
    title: 'Strong Password Generator (Local, Private) | PDFWINDOWS',
    description:
      'Create strong random passwords in your browser with custom length and character types. 100% local, nothing is sent.',
    keywords: 'password generator, strong random password, secure password maker, local password generator, browser password tool',
    h1: 'Strong Password Generator',
    intro:
      'The PDFWINDOWS Password Generator creates strong, random passwords using your browser’s cryptographic random source, entirely on your device. Choose the length and which character types to include — lowercase, uppercase, digits and symbols — and copy the result in one click. Because everything runs locally, your passwords are never transmitted, logged or stored anywhere. It is a fast, private way to create unique credentials for every account.',
    toolName: 'Password Generator',
    benefits: [
      'Cryptographically strong randomness (Web Crypto)',
      'Adjustable length and character types',
      'Real-time strength indicator',
      'One-click copy — nothing is uploaded',
      'No registration, API key or rate limits',
    ],
    useCases: [
      {
        title: 'Unique password per account',
        body: 'Security-conscious users generate a distinct strong password for every service, defeating credential-stuffing attacks that rely on reused passwords. Because generation is local, the new password never leaves your device before you save it in your manager.',
      },
      {
        title: 'Seeding password managers',
        body: 'When creating or rotating an entry in a password manager, generate a long random value here and paste it straight into the vault.',
      },
      {
        title: 'Service and API credentials',
        body: 'Developers create strong values for database users, service accounts and initial admin passwords without inventing weak, guessable strings.',
      },
      {
        title: 'Meeting complexity policies',
        body: 'Toggle character classes to satisfy a site’s specific complexity rules — for example, letters plus digits but no symbols.',
      },
      {
        title: 'Workshops and onboarding',
        body: 'Trainers demonstrate good password hygiene by generating fresh credentials live without exposing anyone’s real password.',
      },
    ],
    howItWorks: [
      'Choose the length with the slider.',
      'Toggle the character types you want to include.',
      'Click Generate to create a password.',
      'Copy it and store it in your password manager.',
    ],
    tips: [
      'Prefer a length of at least sixteen characters for important accounts.',
      'Enable all four character types when the site allows it for maximum entropy.',
      'Use a unique password per account and keep them in a reputable password manager.',
      'Never reuse a password across sites, and enable two-factor authentication where possible.',
      'Generate a fresh value when rotating credentials after a suspected leak.',
      'Avoid pasting generated passwords into untrusted pages or chat tools.',
    ],
    sections: [
      {
        id: 'what-makes-strong',
        heading: 'What makes a password strong',
        level: 2,
        paragraphs: [
          'Password strength comes from entropy — the number of equally likely possibilities an attacker must search. Longer passwords and larger character sets increase entropy exponentially, making brute-force and dictionary attacks impractical.',
          'This generator maximizes entropy by drawing each character uniformly from the selected pools and guaranteeing at least one character from every enabled type, then shuffling the result so patterns do not emerge.',
        ],
      },
      {
        id: 'local-and-private',
        heading: 'Why local generation matters',
        level: 2,
        paragraphs: [
          'Some online generators create passwords on a server, which means the value briefly exists outside your control. PDFWINDOWS generates entirely in your browser using the Web Crypto API, so the password is created on your device and never transmitted.',
          'This eliminates the risk of interception in transit or logging on a third-party server, which is exactly the property you want from a credential you are about to trust.',
          'For extra safety, generate the password, paste it directly into your password manager, and avoid leaving it on the clipboard longer than necessary.',
        ],
      },
      {
        id: 'strength-indicator',
        heading: 'Reading the strength indicator',
        level: 2,
        paragraphs: [
          'The indicator combines length and character variety into a simple weak/medium/strong rating so you can quickly gauge whether a password meets a reasonable bar.',
          'Treat it as guidance, not a guarantee: a strong rating with sufficient length is a good baseline, but always pair strong passwords with two-factor authentication for sensitive accounts.',
        ],
      },
      {
        id: 'workflow',
        heading: 'Fitting into your workflow',
        level: 2,
        paragraphs: [
          'Keep a password manager as your source of truth and use this generator whenever you create or rotate an entry. Generate, copy, save, and clear the clipboard.',
          'Developers can generate initial service credentials here and then move them into a secrets manager or environment configuration, never committing them to source control.',
          'Because there is no account or limit, you can generate as many unique passwords as you need for a large migration or onboarding batch.',
          'If your team is rotating credentials after an incident, generate one strong value per affected account, update each secret in your vault, and record the rotation in your change log so that nothing at all is missed during the incident response process.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('en'),
      {
        q: 'Is the password sent to any server?',
        a: 'No. It is generated in your browser with the Web Crypto API and never transmitted or logged.',
      },
      {
        q: 'How long should my password be?',
        a: 'At least sixteen characters for important accounts, with as many character types as the site allows.',
      },
      {
        q: 'Does the tool remember generated passwords?',
        a: 'No. They exist only in the current browser session. Save the one you want in your password manager.',
      },
      {
        q: 'Are the passwords truly random?',
        a: 'They use the browser’s cryptographic random generator, which is suitable for creating secure credentials.',
      },
    ],
    relatedTools: ['/gerador-uuid', '/gerador-chave-produto', '/limpador-codigo', '/estudio-documentos'],
    cta: defaultCta('en', 'Password Generator'),
  },
  pt: {
    title: 'Gerador de Senhas Forte (Local e Privado) | PDFWINDOWS',
    description:
      'Crie senhas fortes e aleatórias no navegador, com tamanho e tipos de caractere personalizáveis. 100% local, nada é enviado.',
    keywords: 'gerador de senha, senha forte aleatoria, criar senha segura, gerador senha local, gerador senha navegador',
    h1: 'Gerador de Senhas Forte',
    intro:
      'O Gerador de Senhas do PDFWINDOWS cria senhas fortes e aleatórias usando a fonte criptográfica de aleatoriedade do navegador, inteiramente no seu dispositivo. Escolha o tamanho e quais tipos de caractere incluir — minúsculas, maiúsculas, dígitos e símbolos — e copie o resultado com um clique. Como tudo roda localmente, suas senhas nunca são transmitidas, registradas ou armazenadas. É um jeito rápido e privado de criar credenciais únicas para cada conta.',
    toolName: 'Gerador de Senhas',
    benefits: [
      'Aleatoriedade criptográfica (Web Crypto)',
      'Tamanho e tipos de caractere ajustáveis',
      'Indicador de força em tempo real',
      'Cópia em um clique — nada é enviado',
      'Sem cadastro, chave de API ou limites',
    ],
    useCases: [
      {
        title: 'Senha única por conta',
        body: 'Usuários preocupados com segurança geram uma senha forte distinta para cada serviço, frustrando ataques de credential stuffing que dependem de senhas reutilizadas. Como a geração é local, a nova senha nunca sai do dispositivo antes de você salvá-la no gerenciador.',
      },
      {
        title: 'Popular gerenciadores de senha',
        body: 'Ao criar ou rotacionar uma entrada em um gerenciador de senhas, gere um valor longo e aleatório aqui e cole direto no cofre.',
      },
      {
        title: 'Credenciais de serviço e API',
        body: 'Desenvolvedores criam valores fortes para usuários de banco, contas de serviço e senhas iniciais de admin sem inventar strings fracas e adivinháveis.',
      },
      {
        title: 'Atender políticas de complexidade',
        body: 'Ative ou desative classes de caractere para atender regras específicas de um site — por exemplo, letras e dígitos, mas sem símbolos.',
      },
      {
        title: 'Workshops e onboarding',
        body: 'Instrutores demonstram boa higiene de senhas gerando credenciais novas ao vivo sem expor a senha real de ninguém.',
      },
    ],
    howItWorks: [
      'Escolha o tamanho no controle deslizante.',
      'Ative os tipos de caractere que quer incluir.',
      'Clique em Gerar para criar uma senha.',
      'Copie e guarde no seu gerenciador de senhas.',
    ],
    tips: [
      'Prefira ao menos dezesseis caracteres para contas importantes.',
      'Ative os quatro tipos de caractere quando o site permitir para máxima entropia.',
      'Use uma senha única por conta e guarde-as em um gerenciador confiável.',
      'Nunca reutilize uma senha entre sites e ative a autenticação em dois fatores quando possível.',
      'Gere um valor novo ao rotacionar credenciais após suspeita de vazamento.',
      'Evite colar senhas geradas em páginas ou ferramentas de chat não confiáveis.',
    ],
    sections: [
      {
        id: 'o-que-torna-forte',
        heading: 'O que torna uma senha forte',
        level: 2,
        paragraphs: [
          'A força de uma senha vem da entropia — o número de possibilidades igualmente prováveis que um atacante precisa percorrer. Senhas mais longas e conjuntos de caracteres maiores aumentam a entropia exponencialmente, tornando ataques de força bruta e de dicionário impraticáveis.',
          'Este gerador maximiza a entropia sorteando cada caractere uniformemente dos conjuntos selecionados e garantindo ao menos um caractere de cada tipo ativado, depois embaralhando o resultado para não surgirem padrões.',
        ],
      },
      {
        id: 'local-e-privado',
        heading: 'Por que a geração local importa',
        level: 2,
        paragraphs: [
          'Alguns geradores online criam senhas em um servidor, o que significa que o valor existe brevemente fora do seu controle. O PDFWINDOWS gera inteiramente no navegador usando a Web Crypto API, então a senha é criada no seu dispositivo e nunca é transmitida.',
          'Isso elimina o risco de interceptação em trânsito ou de registro em um servidor de terceiros, que é exatamente a propriedade que você quer de uma credencial em que está prestes a confiar.',
          'Para segurança extra, gere a senha, cole direto no seu gerenciador de senhas e evite deixá-la na área de transferência mais do que o necessário.',
        ],
      },
      {
        id: 'indicador-forca',
        heading: 'Lendo o indicador de força',
        level: 2,
        paragraphs: [
          'O indicador combina tamanho e variedade de caracteres em uma classificação simples fraca/média/forte para você avaliar rapidamente se a senha atende a um patamar razoável.',
          'Trate-o como orientação, não garantia: uma classificação forte com tamanho suficiente é uma boa base, mas sempre combine senhas fortes com autenticação em dois fatores para contas sensíveis.',
        ],
      },
      {
        id: 'fluxo',
        heading: 'Encaixando no seu fluxo de trabalho',
        level: 2,
        paragraphs: [
          'Mantenha um gerenciador de senhas como fonte da verdade e use este gerador sempre que criar ou rotacionar uma entrada. Gere, copie, salve e limpe a área de transferência.',
          'Desenvolvedores podem gerar credenciais iniciais de serviço aqui e depois movê-las para um gerenciador de segredos ou configuração de ambiente, nunca as comitando no controle de versão.',
          'Como não há conta nem limite, você pode gerar quantas senhas únicas precisar para uma migração grande ou uma leva de onboarding.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('pt'),
      {
        q: 'A senha é enviada a algum servidor?',
        a: 'Não. É gerada no seu navegador com a Web Crypto API e nunca é transmitida ou registrada.',
      },
      {
        q: 'Qual deve ser o tamanho da minha senha?',
        a: 'Pelo menos dezesseis caracteres para contas importantes, com o máximo de tipos de caractere que o site permitir.',
      },
      {
        q: 'A ferramenta lembra as senhas geradas?',
        a: 'Não. Elas existem apenas na sessão atual do navegador. Salve a que você quer no seu gerenciador de senhas.',
      },
      {
        q: 'As senhas são realmente aleatórias?',
        a: 'Usam o gerador criptográfico de aleatoriedade do navegador, adequado para criar credenciais seguras.',
      },
    ],
    relatedTools: ['/gerador-uuid', '/gerador-chave-produto', '/limpador-codigo', '/estudio-documentos'],
    cta: defaultCta('pt', 'Gerador de Senhas'),
  },
  es: {
    title: 'Generador de Contraseñas Fuerte (Local y Privado) | PDFWINDOWS',
    description:
      'Crea contraseñas fuertes y aleatorias en el navegador, con longitud y tipos personalizables. 100% local, nada se envía.',
    keywords: 'generador de contraseñas, contraseña fuerte aleatoria, crear contraseña segura, generador contraseña local, generador contraseña navegador',
    h1: 'Generador de Contraseñas Fuerte',
    intro:
      'El Generador de Contraseñas de PDFWINDOWS crea contraseñas fuertes y aleatorias usando la fuente criptográfica de aleatoriedad del navegador, enteramente en tu dispositivo. Elige la longitud y qué tipos de caracteres incluir — minúsculas, mayúsculas, dígitos y símbolos — y copia el resultado en un clic. Como todo corre localmente, tus contraseñas nunca se transmiten, registran ni almacenan. Es una forma rápida y privada de crear credenciales únicas para cada cuenta.',
    toolName: 'Generador de Contraseñas',
    benefits: [
      'Aleatoriedad criptográfica (Web Crypto)',
      'Longitud y tipos de caracteres ajustables',
      'Indicador de fuerza en tiempo real',
      'Copia en un clic — nada se sube',
      'Sin registro, clave de API ni límites',
    ],
    useCases: [
      {
        title: 'Contraseña única por cuenta',
        body: 'Los usuarios preocupados por la seguridad generan una contraseña fuerte distinta para cada servicio, frustrando ataques de credential stuffing que dependen de contraseñas reutilizadas. Como la generación es local, la nueva contraseña nunca sale del dispositivo antes de guardarla en el gestor.',
      },
      {
        title: 'Poblar gestores de contraseñas',
        body: 'Al crear o rotar una entrada en un gestor de contraseñas, genera un valor largo y aleatorio aquí y pégalo directo en la bóveda.',
      },
      {
        title: 'Credenciales de servicio y API',
        body: 'Los desarrolladores crean valores fuertes para usuarios de base de datos, cuentas de servicio y contraseñas iniciales de admin sin inventar cadenas débiles y adivinables.',
      },
      {
        title: 'Cumplir políticas de complejidad',
        body: 'Activa o desactiva clases de caracteres para cumplir reglas específicas de un sitio — por ejemplo, letras y dígitos, pero sin símbolos.',
      },
      {
        title: 'Talleres y onboarding',
        body: 'Los instructores demuestran buena higiene de contraseñas generando credenciales nuevas en vivo sin exponer la contraseña real de nadie.',
      },
    ],
    howItWorks: [
      'Elige la longitud con el control deslizante.',
      'Activa los tipos de caracteres que quieras incluir.',
      'Haz clic en Generar para crear una contraseña.',
      'Cópiala y guárdala en tu gestor de contraseñas.',
    ],
    tips: [
      'Prefiere al menos dieciséis caracteres para cuentas importantes.',
      'Activa los cuatro tipos de caracteres cuando el sitio lo permita para máxima entropía.',
      'Usa una contraseña única por cuenta y guárdalas en un gestor confiable.',
      'Nunca reutilices una contraseña entre sitios y activa la autenticación en dos factores cuando sea posible.',
      'Genera un valor nuevo al rotar credenciales tras una sospecha de filtración.',
      'Evita pegar contraseñas generadas en páginas o herramientas de chat no confiables.',
    ],
    sections: [
      {
        id: 'que-hace-fuerte',
        heading: 'Qué hace fuerte a una contraseña',
        level: 2,
        paragraphs: [
          'La fuerza de una contraseña viene de la entropía — el número de posibilidades igualmente probables que un atacante debe recorrer. Contraseñas más largas y conjuntos de caracteres mayores aumentan la entropía exponencialmente, haciendo impracticables los ataques de fuerza bruta y de diccionario.',
          'Este generador maximiza la entropía tomando cada carácter uniformemente de los conjuntos seleccionados y garantizando al menos un carácter de cada tipo activado, luego mezclando el resultado para que no surjan patrones.',
        ],
      },
      {
        id: 'local-y-privado',
        heading: 'Por qué importa la generación local',
        level: 2,
        paragraphs: [
          'Algunos generadores en línea crean contraseñas en un servidor, lo que significa que el valor existe brevemente fuera de tu control. PDFWINDOWS genera enteramente en el navegador usando la Web Crypto API, así que la contraseña se crea en tu dispositivo y nunca se transmite.',
          'Esto elimina el riesgo de interceptación en tránsito o de registro en un servidor de terceros, que es exactamente la propiedad que quieres de una credencial en la que estás a punto de confiar.',
          'Para seguridad extra, genera la contraseña, pégala directo en tu gestor y evita dejarla en el portapapeles más de lo necesario.',
        ],
      },
      {
        id: 'indicador-fuerza',
        heading: 'Leyendo el indicador de fuerza',
        level: 2,
        paragraphs: [
          'El indicador combina longitud y variedad de caracteres en una clasificación simple débil/media/fuerte para que evalúes rápidamente si una contraseña cumple un umbral razonable.',
          'Trátalo como orientación, no garantía: una clasificación fuerte con longitud suficiente es una buena base, pero siempre combina contraseñas fuertes con autenticación en dos factores para cuentas sensibles.',
        ],
      },
      {
        id: 'flujo',
        heading: 'Encajando en tu flujo de trabajo',
        level: 2,
        paragraphs: [
          'Mantén un gestor de contraseñas como fuente de verdad y usa este generador siempre que crees o rotes una entrada. Genera, copia, guarda y limpia el portapapeles.',
          'Los desarrolladores pueden generar credenciales iniciales de servicio aquí y luego moverlas a un gestor de secretos o configuración de entorno, sin comitearlas nunca al control de versiones.',
          'Como no hay cuenta ni límite, puedes generar tantas contraseñas únicas como necesites para una migración grande o una tanda de onboarding.',
        ],
      },
    ],
    faq: [
      ...privacyFaq('es'),
      {
        q: '¿La contraseña se envía a algún servidor?',
        a: 'No. Se genera en tu navegador con la Web Crypto API y nunca se transmite ni registra.',
      },
      {
        q: '¿Qué longitud debe tener mi contraseña?',
        a: 'Al menos dieciséis caracteres para cuentas importantes, con la mayor cantidad de tipos que el sitio permita.',
      },
      {
        q: '¿La herramienta recuerda las contraseñas generadas?',
        a: 'No. Existen solo en la sesión actual del navegador. Guarda la que quieras en tu gestor de contraseñas.',
      },
      {
        q: '¿Las contraseñas son realmente aleatorias?',
        a: 'Usan el generador criptográfico de aleatoriedad del navegador, adecuado para crear credenciales seguras.',
      },
    ],
    relatedTools: ['/gerador-uuid', '/gerador-chave-produto', '/limpador-codigo', '/estudio-documentos'],
    cta: defaultCta('es', 'Generador de Contraseñas'),
  },
};
