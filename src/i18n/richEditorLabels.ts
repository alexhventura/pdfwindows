import type { LanguageType } from '../types';

export interface RichEditorLabels {
  toolbar: string;
  bold: string;
  italic: string;
  underline: string;
  heading1: string;
  heading2: string;
  paragraph: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  alignJustify: string;
  bulletList: string;
  numberedList: string;
  fontSize: string;
  sizeSmall: string;
  sizeNormal: string;
  sizeMedium: string;
  sizeLarge: string;
}

export const richEditorLabels: Record<LanguageType, RichEditorLabels> = {
  pt: {
    toolbar: 'Formatação',
    bold: 'Negrito',
    italic: 'Itálico',
    underline: 'Sublinhado',
    heading1: 'Título 1',
    heading2: 'Título 2',
    paragraph: 'Parágrafo',
    alignLeft: 'Alinhar à esquerda',
    alignCenter: 'Centralizar',
    alignRight: 'Alinhar à direita',
    alignJustify: 'Justificar',
    bulletList: 'Lista com marcadores',
    numberedList: 'Lista numerada',
    fontSize: 'Tamanho da fonte',
    sizeSmall: 'Pequeno',
    sizeNormal: 'Normal',
    sizeMedium: 'Médio',
    sizeLarge: 'Grande',
  },
  en: {
    toolbar: 'Formatting',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    paragraph: 'Paragraph',
    alignLeft: 'Align left',
    alignCenter: 'Align center',
    alignRight: 'Align right',
    alignJustify: 'Justify',
    bulletList: 'Bullet list',
    numberedList: 'Numbered list',
    fontSize: 'Font size',
    sizeSmall: 'Small',
    sizeNormal: 'Normal',
    sizeMedium: 'Medium',
    sizeLarge: 'Large',
  },
  es: {
    toolbar: 'Formato',
    bold: 'Negrita',
    italic: 'Cursiva',
    underline: 'Subrayado',
    heading1: 'Título 1',
    heading2: 'Título 2',
    paragraph: 'Párrafo',
    alignLeft: 'Alinear a la izquierda',
    alignCenter: 'Centrar',
    alignRight: 'Alinear a la derecha',
    alignJustify: 'Justificar',
    bulletList: 'Lista con viñetas',
    numberedList: 'Lista numerada',
    fontSize: 'Tamaño de fuente',
    sizeSmall: 'Pequeño',
    sizeNormal: 'Normal',
    sizeMedium: 'Mediano',
    sizeLarge: 'Grande',
  },
};
