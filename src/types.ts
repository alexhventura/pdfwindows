export type LanguageType = 'pt' | 'en' | 'es';

export interface CookiesPolicySection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  listIntro?: string;
}

export interface TranslationDict {
  logoName: string;
  title: string;
  subtitle: string;
  selectFileButton: string;
  dragDropText: string;
  orText: string;
  fileSelected: string;
  fileSize: string;
  fileType: string;
  chooseOperation: string;
  
  // Img ops
  convertToWebP: string;
  convertToPDF: string;
  imgToImgLabel: string;
  imgResizeLabel: string;
  targetFormatLabel: string;
  qualityLabel: string;
  widthLabel: string;
  heightLabel: string;
  keepAspectLabel: string;
  
  // PDF ops
  pdfToImgLabel: string;
  extractText: string;
  addPassword: string;
  splitPDF: string;
  mergePDFLabel: string;
  rotatePDFLabel: string;
  rotateAngleLabel: string;
  
  // Data ops
  convertToJSON: string;
  jsonToCsvLabel: string;
  xmlToCsvLabel: string;
  xmlToJsonLabel: string;
  txtToPdfLabel: string;
  
  // New tools
  ocrImageLabel: string;
  ocrPdfLabel: string;
  watermarkPdfLabel: string;
  imageFilterLabel: string;
  compressPdfLabel: string;
  upscaleImageLabel: string;
  pdfToWordLabel: string;
  
  ocrLangLabel: string;
  watermarkTextLabel: string;
  watermarkImageLabel: string;
  watermarkOpacityLabel: string;
  watermarkRotationLabel: string;
  watermarkScaleLabel: string;
  watermarkFontSizeLabel: string;
  watermarkColorLabel: string;
  watermarkRepeatLabel: string;
  watermarkSpacingLabel: string;
  watermarkSmartPositionLabel: string;
  brightnessLabel: string;
  contrastLabel: string;
  grayscaleLabel: string;
  
  passwordPlaceholder: string;
  passwordLabel: string;
  pdfProtectInfo: string;
  splitFromLabel: string;
  splitToLabel: string;
  splitSettingsTitle: string;
  
  processButton: string;
  processing: string;
  processingAdHint: string;
  timeLeft: string;
  seconds: string;
  downloadButton: string;
  successMessage: string;
  resetButton: string;
  advertisingLabel: string;
  adContentPlaceholderOne: string;
  adContentPlaceholderTwo: string;
  privacyDetailedText: string;
  remoteImportWarning: string;
  remoteImportConfirmPrompt: string;
  remoteImportConsentLabel: string;
  remoteImportNetworkNotice: string;
  footerTerms: string;
  footerPrivacy: string;
  footerManual: string;
  footerCookies: string;
  footerCopyright: string;
  advancedOptionsLabel: string;
  modalClose: string;
  
  termsTitle: string;
  termsBody: string[];
  privacyTitle: string;
  privacyBody: string[];
  manualTitle: string;
  manualBody: string[];
  cookiesTitle: string;
  cookiesIntro: string;
  cookiesSections: CookiesPolicySection[];
  cookiesClosing: string;
  
  coinsTitle: string;
  invalidFile: string;
  noFile: string;
  processingCompleted: string;
  unsupportedType: string;
  conversionError: string;
  privacyGuaranteeTitle: string;
  privacyGuaranteeDesc: string;
  speedGuaranteeTitle: string;
  speedGuaranteeDesc: string;
  localGuaranteeTitle: string;
  localGuaranteeDesc: string;
  
  // Multi file extra translations
  multiFilesLoaded: string;
  addMoreFiles: string;
  clearAll: string;
  fileListTitle: string;
  outputFormat: string;
  downloadAll: string;
  generatedFilesTitle: string;
  importUrlLabel: string;
  importUrlPlaceholder: string;
  importUrlButton: string;
  fetchingUrl: string;
  successToast: string;
  completionTitle: string;
  completionSubtitle: string;
  completionDownloadLabel: string;
  closeToolLabel: string;
  closeToolHint: string;
  backToCatalog: string;
  processingErrorLabel: string;
  directoryButton: string;
  previewLoadedTitle: string;
  previewResultsTitle: string;
  previewInputLabel: string;
  previewOutputLabel: string;
  applyPreviewButton: string;
  previewProcessed: string;
  previewQueued: string;
  previewReady: string;
  confirmSave: string;
  newFiles: string;

  // Workspace UI (page setup, selection, loading)
  opSelected: string;
  opClickToSelect: string;
  incompatibleMixWarning: string;
  pageSetupTitle: string;
  orientationLabel: string;
  portraitLabel: string;
  landscapeLabel: string;
  marginsLabel: string;
  marginNoneLabel: string;
  marginNarrowLabel: string;
  marginStandardLabel: string;
  fittingLabel: string;
  fitCenterLabel: string;
  fitPageLabel: string;
  fitOriginalLabel: string;
  initAiLabel: string;
  cancelProcessLabel: string;
  openingWorkspace: string;
  loadingConverter: string;
  watermarkPreviewTitle: string;
  watermarkPreviewPage: string;
  watermarkPreviewLoading: string;
  watermarkPreviewEmpty: string;
  watermarkSmartHint: string;
  widthPlaceholder: string;
  heightPlaceholder: string;
  watermarkTextPlaceholder: string;
  homeLabel: string;
  relatedToolsTitle: string;
  faqSectionTitle: string;
  catalogBannerAlt: string;
}

export interface FileState {
  file: File;
  name: string;
  size: number;
  extension: string;
  id: string; // Unique file ID for key renders and sorting
  previewUrl?: string; // Optional local Blob URL for UI previews (clean up req)
}

export type OperationType =
  | 'img-to-img'       // Convert images inside list to selected image format (jpg, png, webp, gif, bmp, tiff, ico)
  | 'img-to-pdf'       // Render image or batch images into a combined single PDF
  | 'img-resize'       // Redimensionar e comprimir imagens com ajuste de pixels e % qualidade
  | 'pdf-to-img'       // Render pages as JPEG/PNG
  | 'pdf-txt'          // Extract TXT layout from PDF
  | 'pdf-merge'        // Combine multiple PDFs in listed sequence
  | 'pdf-split'        // Extract range of pages
  | 'pdf-password'     // Criptografar PDF
  | 'pdf-rotate'       // Rotar páginas de PDF (90, 180, 275)
  | 'csv-json'         // CSV -> JSON
  | 'json-to-csv'      // JSON -> CSV
  | 'xml-json'         // XML -> JSON
  | 'txt-to-pdf'        // TXT -> PDF
  | 'img-ocr'          // OCR: Image to Text
  | 'pdf-ocr'          // OCR: PDF to Text (Scanned)
  | 'pdf-watermark'    // Add watermark to PDF
  | 'img-filter'       // Brightness, Contrast, etc.
  | 'pdf-compress'     // Compress PDF
  | 'img-upscale'      // AI Upscale
  | 'pdf-to-word';     // PDF to DOCX basic

export interface GeneratedFile {
  name: string;
  url: string;
  size: number;
  sourceFileId?: string;
  previewUrl?: string;
}

export interface ConverterState {
  files: FileState[];
  selectedOperation: OperationType | '';
  isProcessing: boolean;
  progress: number;
  timeLeft: number;
  isCompleted: boolean;
  generatedFiles: GeneratedFile[];
  options: {
    targetImageFormat: 'webp' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'ico' | 'tiff';
    imageQuality: number; // 0.1 to 1.0
    imageWidth: number;   // px
    imageHeight: number;  // px
    keepAspectRatio: boolean;
    pdfPassword?: string;
    splitFromPage?: number;
    splitToPage?: number;
    rotateAngle: 90 | 180 | 270;
    pdfOrientation: 'portrait' | 'landscape';
    pdfMargins: 'none' | 'narrow' | 'standard';
    pdfPositioning: 'center' | 'fit' | 'original';
    // New Advanced Options
    ocrLanguage: string;
    watermarkText?: string;
    watermarkImage?: File;
    watermarkOpacity: number;
    watermarkRotation: number;
    watermarkScale: number;
    watermarkFontSize: number;
    watermarkColor: string;
    watermarkRepeat: boolean;
    watermarkSpacing: number;
    watermarkSmartPosition: boolean;
    filterBrightness: number;
    filterContrast: number;
    filterGrayscale: boolean;
  };
}
