import type { LanguageType } from '../../types';
import type { ToolPageCopy } from '../toolCatalog';

/** Indexable legal pages for AdSense / Search Console crawlability. */
export const LEGAL_COPY: Record<'/privacy' | '/terms', Record<LanguageType, ToolPageCopy>> = {
  '/privacy': {
    en: {
      title: 'Privacy Policy | PDFWINDOWS',
      description:
        'PDFWINDOWS processes files only in your browser. Learn how local processing keeps documents private—no upload, storage, or server-side retention.',
      keywords: 'pdfwindows privacy policy, local processing, no upload, browser privacy',
      h1: 'Privacy Policy',
      intro:
        'PDFWINDOWS is built so your documents never leave your device during conversion and editing.',
      benefits: [
        '100% client-side file processing',
        'No document upload to our servers',
        'Volatile memory cleared when you close the tab',
      ],
      howItWorks: [
        'Open a tool and select files locally.',
        'Processing runs in your browser JavaScript engine.',
        'Download results from your device — nothing is stored remotely.',
      ],
      faq: [],
    },
    pt: {
      title: 'Política de Privacidade | PDFWINDOWS',
      description:
        'O PDFWINDOWS processa arquivos só no seu navegador. Saiba como o processamento local protege documentos sem upload, armazenamento ou retenção em servidores.',
      keywords: 'política de privacidade pdfwindows, processamento local, sem upload',
      h1: 'Política de Privacidade',
      intro:
        'O PDFWINDOWS foi feito para que seus documentos não saiam do dispositivo durante conversões e edições.',
      benefits: [
        'Processamento 100% no navegador',
        'Sem upload de documentos para servidores',
        'Memória volátil limpa ao fechar a aba',
      ],
      howItWorks: [
        'Abra uma ferramenta e selecione arquivos localmente.',
        'O processamento roda no JavaScript do navegador.',
        'Baixe o resultado no seu dispositivo — nada fica armazenado remotamente.',
      ],
      faq: [],
    },
    es: {
      title: 'Política de Privacidad | PDFWINDOWS',
      description:
        'PDFWINDOWS procesa archivos solo en su navegador. Conozca cómo el procesamiento local protege documentos sin subida, almacenamiento ni retención en servidores.',
      keywords: 'política de privacidad pdfwindows, procesamiento local, sin subida',
      h1: 'Política de Privacidad',
      intro:
        'PDFWINDOWS está diseñado para que sus documentos no salgan del dispositivo durante conversiones y ediciones.',
      benefits: [
        'Procesamiento 100% en el navegador',
        'Sin subida de documentos a servidores',
        'Memoria volátil borrada al cerrar la pestaña',
      ],
      howItWorks: [
        'Abra una herramienta y seleccione archivos localmente.',
        'El procesamiento corre en el JavaScript del navegador.',
        'Descargue el resultado en su dispositivo — nada se almacena de forma remota.',
      ],
      faq: [],
    },
  },
  '/terms': {
    en: {
      title: 'Terms of Use | PDFWINDOWS',
      description:
        'Read PDFWINDOWS terms for free browser PDF and image tools: acceptable use, ad-supported service, and limits of liability for local processing.',
      keywords: 'pdfwindows terms of use, free pdf tools terms, acceptable use',
      h1: 'Terms of Use',
      intro: 'By using PDFWINDOWS you agree to these terms for free, browser-based document tools.',
      benefits: [
        'Free tools financed by on-site advertising',
        'Local processing with clear liability limits',
        'Legitimate use only — respect third-party rights',
      ],
      howItWorks: [
        'Use the tools for lawful personal or business tasks.',
        'Files stay on your device during processing.',
        'Ads may appear outside the main workspace to sustain the service.',
      ],
      faq: [],
    },
    pt: {
      title: 'Termos de Uso | PDFWINDOWS',
      description:
        'Leia os termos do PDFWINDOWS para ferramentas PDF e imagem no navegador: uso legítimo, serviço com anúncios e limites de responsabilidade local.',
      keywords: 'termos de uso pdfwindows, ferramentas pdf grátis, uso aceitável',
      h1: 'Termos de Uso',
      intro:
        'Ao usar o PDFWINDOWS você concorda com estes termos para ferramentas gratuitas de documentos no navegador.',
      benefits: [
        'Ferramentas grátis sustentadas por publicidade',
        'Processamento local com limites claros de responsabilidade',
        'Uso legítimo — respeite direitos de terceiros',
      ],
      howItWorks: [
        'Use as ferramentas para tarefas legais pessoais ou profissionais.',
        'Os arquivos permanecem no dispositivo durante o processamento.',
        'Anúncios podem aparecer fora da área principal para manter o serviço.',
      ],
      faq: [],
    },
    es: {
      title: 'Términos de Uso | PDFWINDOWS',
      description:
        'Lea los términos de PDFWINDOWS para herramientas PDF e imagen en el navegador: uso legítimo, servicio con anuncios y límites de responsabilidad local.',
      keywords: 'términos de uso pdfwindows, herramientas pdf gratis, uso aceptable',
      h1: 'Términos de Uso',
      intro:
        'Al usar PDFWINDOWS usted acepta estos términos para herramientas gratuitas de documentos en el navegador.',
      benefits: [
        'Herramientas gratis sostenidas por publicidad',
        'Procesamiento local con límites claros de responsabilidad',
        'Uso legítimo — respete derechos de terceros',
      ],
      howItWorks: [
        'Use las herramientas para tareas legales personales o profesionales.',
        'Los archivos permanecen en el dispositivo durante el procesamiento.',
        'Los anuncios pueden aparecer fuera del área principal para sostener el servicio.',
      ],
      faq: [],
    },
  },
};
