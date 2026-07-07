import type { LanguageType } from '../../types';
import type { FaqItem } from '../toolCatalog';
import type { ToolRichContent } from './types';

export function privacyFaq(lang: LanguageType): FaqItem[] {
  if (lang === 'pt') {
    return [
      {
        q: 'Meus arquivos estão seguros?',
        a: 'Sim. Todo o processamento acontece no seu navegador. Seus arquivos não são enviados para servidores.',
      },
      {
        q: 'Meus arquivos saem do meu computador?',
        a: 'Não. Os documentos permanecem no seu dispositivo durante todo o processo.',
      },
      {
        q: 'Posso usar o PDFWINDOWS gratuitamente?',
        a: 'Sim. As ferramentas são gratuitas e não exigem cadastro.',
      },
    ];
  }
  if (lang === 'es') {
    return [
      {
        q: '¿Mis archivos están seguros?',
        a: 'Sí. Todo el procesamiento ocurre en tu navegador. Tus archivos no se envían a servidores.',
      },
      {
        q: '¿Mis archivos salen de mi computadora?',
        a: 'No. Los documentos permanecen en tu dispositivo durante todo el proceso.',
      },
      {
        q: '¿Puedo usar PDFWINDOWS gratis?',
        a: 'Sí. Las herramientas son gratuitas y no requieren registro.',
      },
    ];
  }
  return [
    {
      q: 'Are my files secure?',
      a: 'Yes. All processing runs in your browser. Your files are not uploaded to servers.',
    },
    {
      q: 'Do my files leave my computer?',
      a: 'No. Your documents stay on your device throughout the entire process.',
    },
    {
      q: 'Can I use PDFWINDOWS for free?',
      a: 'Yes. The tools are free and do not require an account.',
    },
  ];
}

export function defaultCta(lang: LanguageType, toolLabel: string): ToolRichContent['cta'] {
  if (lang === 'pt') {
    return {
      heading: `Pronto para usar ${toolLabel}?`,
      body: 'Escolha seus arquivos, processe no navegador e baixe o resultado em segundos.',
      buttonLabel: 'Começar',
    };
  }
  if (lang === 'es') {
    return {
      heading: `¿Listo para usar ${toolLabel}?`,
      body: 'Elige tus archivos, procesa en el navegador y descarga el resultado en segundos.',
      buttonLabel: 'Empezar',
    };
  }
  return {
    heading: `Ready to use ${toolLabel}?`,
    body: 'Choose your files, process in your browser, and download your results in seconds.',
    buttonLabel: 'Start',
  };
}
