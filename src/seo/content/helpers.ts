import type { LanguageType } from '../../types';
import type { FaqItem } from '../toolCatalog';
import type { ToolRichContent } from './types';

export function privacyFaq(lang: LanguageType): FaqItem[] {
  if (lang === 'pt') {
    return [
      {
        q: 'Meus arquivos são enviados para algum servidor?',
        a: 'Não. Todo o processamento ocorre no seu navegador. Os arquivos permanecem no seu dispositivo e nunca são transmitidos para servidores de conversão.',
      },
      {
        q: 'Preciso criar conta ou instalar software?',
        a: 'Não. O PDFWINDOWS funciona diretamente no navegador moderno, sem cadastro, sem instalação e sem upload obrigatório para a nuvem.',
      },
    ];
  }
  if (lang === 'es') {
    return [
      {
        q: '¿Se suben mis archivos a un servidor?',
        a: 'No. Todo el procesamiento ocurre en su navegador. Los archivos permanecen en su dispositivo y nunca se envían a servidores de conversión.',
      },
      {
        q: '¿Necesito crear una cuenta o instalar software?',
        a: 'No. PDFWINDOWS funciona directamente en el navegador moderno, sin registro, sin instalación y sin subida obligatoria a la nube.',
      },
    ];
  }
  return [
    {
      q: 'Are my files uploaded to a server?',
      a: 'No. All processing runs in your browser. Files stay on your device and are never sent to conversion servers.',
    },
    {
      q: 'Do I need an account or software installation?',
      a: 'No. PDFWINDOWS runs directly in a modern browser with no signup, no installation, and no mandatory cloud upload.',
    },
  ];
}

export function defaultCta(lang: LanguageType, toolLabel: string): ToolRichContent['cta'] {
  if (lang === 'pt') {
    return {
      heading: `Pronto para usar ${toolLabel}?`,
      body: 'Envie seus arquivos, processe no navegador e baixe o resultado em segundos.',
      buttonLabel: 'Começar agora',
    };
  }
  if (lang === 'es') {
    return {
      heading: `¿Listo para usar ${toolLabel}?`,
      body: 'Suba sus archivos, procese en el navegador y descargue el resultado en segundos.',
      buttonLabel: 'Empezar ahora',
    };
  }
  return {
    heading: `Ready to use ${toolLabel}?`,
    body: 'Upload your files, process in your browser, and download results in seconds.',
    buttonLabel: 'Start now',
  };
}
