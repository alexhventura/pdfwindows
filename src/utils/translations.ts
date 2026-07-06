import { TranslationDict, LanguageType } from '../types';
import { detectBrowserLanguage } from '../i18n/language';

export const translations: Record<LanguageType, TranslationDict> = {
  pt: {
    logoName: "PDF WINDOWS",
    title: "PDF WINDOWS | 100% SEGURO & GRATUITO",
    subtitle: "Professional, 100% seguro, sem custos, privacidade total, não guardamos os seus arquivos.",
    selectFileButton: "Selecionar do dispositivo",
    dragDropText: "Arraste seus arquivos aqui",
    orText: "ou selecione do dispositivo",
    fileSelected: "Arquivo Selecionado",
    fileSize: "Tamanho",
    fileType: "Tipo de Arquivo",
    chooseOperation: "Escolha o formato de saída ou ação",
    
    // Img ops
    convertToWebP: "Converter Imagem para WebP (Formato Web Otimizado)",
    convertToPDF: "Converter Imagens para PDF (Documento Digital)",
    imgToImgLabel: "Converter Formato de Imagem (JPG, PNG, WEBP, GIF, BMP, TIFF, ICO)",
    imgResizeLabel: "Redimensionar e Comprimir Imagens",
    targetFormatLabel: "Selecione o Formato da Imagem",
    qualityLabel: "Qualidade de Compactação / Resolução",
    widthLabel: "Largura Máxima (Pixels - opcional, 0 para original)",
    heightLabel: "Altura Máxima (Pixels - opcional, 0 para original)",
    keepAspectLabel: "Manter proporções originais (Aspect Ratio)",
    
    // PDF ops
    pdfToImgLabel: "Converter PDF em Imagens (Renderizar páginas individuais)",
    extractText: "Extrair Texto do PDF (Converter para TXT)",
    addPassword: "Proteger PDF com senha (compatível com leitores padrão)",
    splitPDF: "Dividir Páginas do PDF (Extrair Intervalo)",
    mergePDFLabel: "Unir Múltiplos PDFs em Um Só (Mesclar Arquivos)",
    rotatePDFLabel: "Rotacionar Páginas do PDF",
    rotateAngleLabel: "Selecione o Ângulo de Rotação",
    
    // Data ops
    convertToJSON: "Converter CSV para JSON (Estrutura de Dados)",
    jsonToCsvLabel: "Converter JSON para CSV (Tabela de Dados)",
    xmlToCsvLabel: "Converter XML para CSV",
    xmlToJsonLabel: "Converter XML para JSON",
    txtToPdfLabel: "Converter Texto Simples (TXT) para PDF",
    
    // Novas ferramentas
    ocrImageLabel: "OCR Inteligente: Extrair Texto de Imagem (JPG, PNG)",
    ocrPdfLabel: "OCR de PDF: Converter PDF Escaneado em Texto Editável",
    watermarkPdfLabel: "Adicionar Marca d'Água ao PDF (Texto ou Logo)",
    imageFilterLabel: "Editor de Imagem: Brilho, Contraste e Grayscale",
    compressPdfLabel: "Comprimir PDF Local (Otimizar tamanho do arquivo)",
    upscaleImageLabel: "Aumentar Resolução via IA (Local Upscale)",
    pdfToWordLabel: "Converter PDF para Word (DOCX básico)",
    
    ocrLangLabel: "Selecione o Idioma do OCR",
    watermarkTextLabel: "Texto da Marca d'Água",
    watermarkImageLabel: "Ou selecione uma imagem de Logo",
    brightnessLabel: "Brilho",
    contrastLabel: "Contraste",
    grayscaleLabel: "Preto e Branco (Grayscale)",
    
    passwordPlaceholder: "Digite a senha de proteção...",
    passwordLabel: "Defina a Senha de Proteção",
    pdfProtectInfo:
      "Ao processar, será solicitada uma senha (com confirmação). O PDF final (.pdf) usa criptografia padrão AES-256: Chrome, Adobe e Edge pedirão a senha ao abrir. A senha permanece apenas na memória do navegador.",
    splitFromLabel: "Página Inicial",
    splitToLabel: "Página Final",
    splitSettingsTitle: "Escolha o intervalo de páginas a ser extraído",
    
    processButton: "Processar Arquivos com Segurança",
    processing: "Processando localmente de forma segura na memória RAM...",
    processingAdHint: "O processamento é feito 100% offline. Aproveite para conferir nossos patrocinadores abaixo:",
    timeLeft: "Tempo restante estimado",
    seconds: "segundos",
    downloadButton: "Baixar Arquivo Processado",
    successMessage: "Conversão concluída com sucesso! Seus arquivos foram gerados de forma totalmente privada e local.",
    resetButton: "Converter outros arquivos",
    advertisingLabel: "PUBLICIDADE - Apoie nossa plataforma gratuita",
    adContentPlaceholderOne: "Patrocinador Oficial: Servidores em Nuvem Premium e Hospedagem de Alto Desempenho. 100% Ecológico.",
    adContentPlaceholderTwo: "Anúncio do Google AdSense - Hospedagem ilimitada, VPN de altíssima velocidade e certificados SSL gratuitos.",
    privacyBadge: "100% SEGURO & PRIVADO",
    privacyDetailedText: "Processamento 100% local no navegador. Nenhum documento é enviado a servidores — seus arquivos permanecem apenas no seu dispositivo.",
    privacyPledgeTitle: "Promessa de privacidade",
    privacyPledgeBody: "Seus arquivos nunca saem do seu dispositivo. Todo processamento ocorre localmente no navegador, garantindo privacidade total.",
    privacyPledgeShort: "Processamento local: seus arquivos não são enviados a servidores de conversão.",
    remoteImportWarning: "Importar por link usa a rede apenas para baixar o PDF público que você informou. O processamento continua 100% local depois do download.",
    remoteImportConfirmPrompt: "Confirmar download deste PDF pela internet? Apenas o link informado será acessado.",
    remoteImportConsentLabel: "Entendo que esta ação fará um download pela internet (somente o link informado).",
    remoteImportNetworkNotice:
      "Única função com rede: download opcional de PDF via URL HTTPS. Este recurso realiza download externo sob sua responsabilidade.",
    footerTerms: "Termos de Uso",
    footerPrivacy: "Política de Privacidade",
    footerManual: "Manual do Usuário",
    footerCookies: "Uso de cookies",
    footerCopyright: "© 2026 — Todos os direitos reservados",
    advancedOptionsLabel: "Definições locais avançadas",
    modalClose: "Entendido e Fechar",
    
    termsTitle: "Termos de Uso - PDF WINDOWS",
    termsBody: [
      "1. Aceitação dos Termos: Ao usar a plataforma PDF WINDOWS, você concorda com estes termos na íntegra. Esta é uma ferramenta de uso gratuito fornecida 'no estado em que se encontra', sem garantias expressas ou implícitas de uptime ou adequação a fins específicos.",
      "2. Limitação de Responsabilidade: Como o processamento ocorre inteiramente de forma local no navegador web do usuário, nós não temos acesso e não nos responsabilizamos pela integridade, perda ou uso indevido dos dados processados através de seu hardware local.",
      "3. Isenção de Custos: O serviço é totalmente gratuito. A manutenção e custos operacionais da plataforma são financiados via veiculação de espaços de publicidade (Ad slots) externos ao card principal de processamento.",
      "4. Uso Legítimo: O usuário compromete-se a utilizar a ferramenta apenas para fins legais e legítimos, respeitando direitos autorais e propriedade intelectual de terceiros sob as leis locais e internacionais."
    ],
    privacyTitle: "Política de Privacidade Absoluta - 100% Local",
    privacyBody: [
      "1. Arquitetura Privada (Zero-Server): Diferente de outros conversores online que fazem upload de seus documentos confidenciais para servidores remotos, o PDF WINDOWS opera de forma 100% client-side (local). Os arquivos carregados são mantidos apenas na memória RAM volátil ou estruturas locais do seu browser.",
      "2. Coleta de Dados Inexistente: Nós não coletamos, não processamos, não indexamos e não armazenamos nenhuma informação pessoal, metadados ou conteúdo de seus arquivos. No momento em que a aba do navegador é fechada, toda e qualquer informação volátil desaparece complemente do seu dispositivo.",
      "3. Sem rede na conversão: O processamento não utiliza conexão com servidores. Não utilizamos analytics de documentos nem enviamos conteúdo de arquivos a terceiros.",
      "4. Segurança de Extrema Confiança: Seus dados bancários, fiscais, contratos ou fotos pessoais inseridos permanecem sob sua exclusiva custódia. Nosso software apenas auxilia nas instruções computacionais locais executadas pelo seu próprio interpretador de JavaScript."
    ],
    manualTitle: "Manual do Usuário - Guia Rápido de Uso",
    manualBody: [
      "Passo 1: Selecione ou arraste o seu arquivo para dentro do card principal de cor branca com bordas em cinza claro. Nosso sistema lerá a extensão instantaneamente na memória interna para garantir segurança.",
      "Passo 2: Após detectar o tipo de arquivo, um seletor dinâmico surgirá na tela oferecendo as opções de conversão que fazem sentido para ele (Ex: Imagens viram WebP/PDF, PDFs podem ser divididos, protegidos ou extraídos; CSV vira JSON). Preencha as configurações caso necessário (como senha ou qualidade).",
      "Passo 3: Clique em 'Processar Arquivos com Segurança'. O progresso reflete o trabalho real na sua máquina. Ao concluir, baixe os arquivos gerados localmente."
    ],
    cookiesTitle: "Política de Cookies — PDFWINDOWS",
    cookiesIntro:
      "O PDFWINDOWS utiliza tecnologias locais do navegador para garantir o funcionamento adequado da plataforma, melhorar a experiência do usuário e permitir recursos offline com total privacidade.",
    cookiesSections: [
      {
        heading: "1. Compromisso com Privacidade",
        paragraphs: [
          "O PDFWINDOWS foi desenvolvido com foco em privacidade absoluta. Todos os processamentos de arquivos ocorrem diretamente no navegador do usuário, sem envio de documentos para servidores externos.",
        ],
        listIntro: "Seus arquivos:",
        list: [
          "não são armazenados;",
          "não são enviados para servidores;",
          "não são compartilhados;",
          "permanecem exclusivamente no seu dispositivo.",
        ],
      },
      {
        heading: "2. O que são cookies?",
        paragraphs: [
          "Cookies são pequenos arquivos ou identificadores armazenados no navegador para permitir funcionalidades essenciais, preferências e melhorias de desempenho.",
          "Além de cookies tradicionais, o PDFWINDOWS pode utilizar:",
        ],
        list: [
          "armazenamento local do navegador (LocalStorage);",
          "cache offline;",
          "Service Workers;",
          "IndexedDB;",
          "tecnologias similares necessárias para funcionamento offline-first.",
        ],
      },
      {
        heading: "3. Como utilizamos cookies e armazenamento local",
        paragraphs: ["O PDFWINDOWS utiliza apenas recursos técnicos e essenciais para:"],
        list: [
          "manter preferências de idioma;",
          "melhorar desempenho da aplicação;",
          "permitir funcionamento offline;",
          "armazenar temporariamente recursos da interface;",
          "acelerar carregamento das ferramentas;",
          "garantir estabilidade e segurança do sistema.",
        ],
      },
      {
        heading: "4. O que NÃO fazemos",
        paragraphs: ["O PDFWINDOWS NÃO utiliza cookies para:"],
        list: [
          "rastrear navegação pessoal;",
          "vender dados;",
          "monitorar documentos;",
          "armazenar arquivos enviados;",
          "compartilhar informações com terceiros;",
          "criar perfis publicitários.",
        ],
      },
      {
        heading: "5. Funcionamento Offline",
        paragraphs: [
          "Para permitir o uso offline da plataforma, alguns arquivos essenciais podem ser armazenados localmente pelo navegador através de cache seguro e Service Workers.",
        ],
        listIntro: "Esses recursos:",
        list: [
          "permanecem no dispositivo do usuário;",
          "podem ser removidos a qualquer momento pelo próprio navegador;",
          "não contêm seus documentos pessoais.",
        ],
      },
      {
        heading: "6. Controle do usuário",
        paragraphs: [
          "Você pode, a qualquer momento, limpar cookies, remover dados locais, apagar cache ou desativar armazenamento no navegador — diretamente nas configurações do seu navegador.",
          "A remoção desses dados pode afetar funcionalidades offline e preferências salvas da plataforma.",
        ],
      },
      {
        heading: "7. Alterações nesta política",
        paragraphs: [
          "Esta Política de Cookies poderá ser atualizada periodicamente para refletir melhorias técnicas, requisitos legais ou novas funcionalidades da plataforma.",
        ],
      },
    ],
    cookiesClosing:
      "PDFWINDOWS — Privacidade real, processamento local e controle total dos seus arquivos.",
    coinsTitle: "Cotações em Tempo Real contra sua Moeda Local:",
    invalidFile: "Por favor, selecione um arquivo válido.",
    noFile: "Nenhum arquivo selecionado.",
    processingCompleted: "Processamento concluído com sucesso!",
    unsupportedType: "Este formato de arquivo não é suportado pelo nosso painel inteligente de conversão.",
    conversionError: "Ocorreu um erro ao converter o arquivo localmente.",
    privacyGuaranteeTitle: "100% Sem Servidores",
    privacyGuaranteeDesc: "Segurança total contra vazamentos. Seus documentos sigilosos nunca trafegam na internet.",
    speedGuaranteeTitle: "Nativo & Veloz",
    speedGuaranteeDesc: "Usa o motor de renderização local do seu navegador para ler buffers binários instantaneamente.",
    localGuaranteeTitle: "Segurança Militar",
    localGuaranteeDesc: "Processamento local impede ataques do tipo Man-in-the-Middle e acessos desautorizados.",
    
    // Multi translations pt
    multiFilesLoaded: "arquivos carregados na fila local",
    addMoreFiles: "Adicionar mais arquivos",
    clearAll: "Limpar todos",
    fileListTitle: "Arquivos para processar",
    outputFormat: "Formato de Saída",
    downloadAll: "Baixar todos (Downloads Individuais)",
    generatedFilesTitle: "Arquivos Prontos para Baixar",
    importUrlLabel: "Importar do Link (URL Pública)",
    importUrlPlaceholder: "Cole o link direto do PDF (Ex: https://site.com/doc.pdf)",
    importUrlButton: "Coletar PDF",
    fetchingUrl: "Coletando arquivo remoto...",
    successToast: "Concluído com sucesso",
    completionTitle: "Concluído com sucesso",
    completionSubtitle: "Seus arquivos foram processados localmente. Baixe os resultados abaixo quando quiser.",
    completionDownloadLabel: "Download",
    closeToolLabel: "Fechar",
    closeToolHint: "Limpa o workspace e mantém você nesta ferramenta, pronto para recomeçar.",
    backToCatalog: "Voltar ao catálogo",
    processingErrorLabel: "Não foi possível concluir o processamento",
    directoryButton: "Catálogo de conversões",
    previewLoadedTitle: "Arquivos carregados",
    previewResultsTitle: "Resultados visuais",
    previewInputLabel: "Pré-visualização de entrada",
    previewProcessed: "Processado",
    previewQueued: "Na fila",
    previewReady: "Pronto",
    confirmSave: "Confirmar e salvar",
    newFiles: "Novos arquivos",
    secureBadgeShort: "100% seguro"
  },
  en: {
    logoName: "PDF WINDOWS",
    title: "PDF WINDOWS | 100% SECURE & FREE",
    subtitle: "Professional, 100% secure, no costs, total privacy, we don't store your files.",
    selectFileButton: "Select from device",
    dragDropText: "Drag your files here",
    orText: "or choose from your device",
    fileSelected: "File Selected",
    fileSize: "Size",
    fileType: "File Type",
    chooseOperation: "Choose output format or operation",
    
    // Img ops
    convertToWebP: "Convert Image to WebP (Optimized Web Format)",
    convertToPDF: "Convert Images to PDF (Digital Document)",
    imgToImgLabel: "Convert Image Format (JPG, PNG, WEBP, GIF, BMP, TIFF, ICO)",
    imgResizeLabel: "Resize and Compress Images",
    targetFormatLabel: "Select Image Format",
    qualityLabel: "Compression Quality",
    widthLabel: "Max Width (Pixels - optional, 0 for original)",
    heightLabel: "Max Height (Pixels - optional, 0 for original)",
    keepAspectLabel: "Keep original proportions (Aspect Ratio)",
    
    // PDF ops
    pdfToImgLabel: "Convert PDF to Images (Render individual pages)",
    extractText: "Extract PDF Text (Export to TXT)",
    addPassword: "Protect PDF with password (standard reader compatible)",
    splitPDF: "Split PDF Pages (Extract Range)",
    mergePDFLabel: "Merge Multiple PDFs into One File",
    rotatePDFLabel: "Rotate PDF Pages",
    rotateAngleLabel: "Select Rotation Angle",
    
    // Data ops
    convertToJSON: "Convert CSV to JSON (Structured Data)",
    jsonToCsvLabel: "Convert JSON to CSV (Data Table)",
    xmlToCsvLabel: "Convert XML to CSV",
    xmlToJsonLabel: "Convert XML to JSON",
    txtToPdfLabel: "Convert Simple Text (TXT) to PDF",
    
    // New tools
    ocrImageLabel: "Smart OCR: Image to Text (JPG, PNG)",
    ocrPdfLabel: "PDF OCR: Scanned PDF to Editable Text",
    watermarkPdfLabel: "Add Watermark to PDF (Text or Logo)",
    imageFilterLabel: "Image Editor: Brightness, Contrast & Grayscale",
    compressPdfLabel: "Compress PDF Local (Optimize file size)",
    upscaleImageLabel: "AI Upscale (Local Resolution Increase)",
    pdfToWordLabel: "Convert PDF to Word (Basic DOCX)",
    
    ocrLangLabel: "Select OCR Language",
    watermarkTextLabel: "Watermark Text",
    watermarkImageLabel: "Or select a Logo image",
    brightnessLabel: "Brightness",
    contrastLabel: "Contrast",
    grayscaleLabel: "Grayscale (B&W)",
    
    passwordPlaceholder: "Type protection password...",
    passwordLabel: "Define Protection Password",
    pdfProtectInfo:
      "When processing, you will confirm a password in a modal. The final .pdf uses standard AES-256 encryption: Chrome, Adobe, and Edge will prompt for the password on open. Password stays in browser memory only.",
    splitFromLabel: "First Page",
    splitToLabel: "Last Page",
    splitSettingsTitle: "Choose the page range to extract",
    
    processButton: "Process Files Safely",
    processing: "Processing locally in browser RAM memory...",
    processingAdHint: "Processing occurs 100% offline. Take a moment to view our sponsors below:",
    timeLeft: "Estimated time remaining",
    seconds: "seconds",
    downloadButton: "Download Processed File",
    successMessage: "Conversion completed successfully! Your files have been generated with complete privacy.",
    resetButton: "Convert another file",
    advertisingLabel: "ADVERTISING - Support our free platform",
    adContentPlaceholderOne: "Official Sponsor: Premium Cloud Hosting and High Performance Managed VPS. 100% Eco-friendly.",
    adContentPlaceholderTwo: "Google AdSense Ad - Unlimited web hosting, lightning-fast secure VPN, and free automated SSL certificates.",
    privacyBadge: "100% SECURE & PRIVATE",
    privacyDetailedText: "100% in-browser processing. No documents are sent to servers — your files stay only on your device.",
    privacyPledgeTitle: "Privacy pledge",
    privacyPledgeBody: "Your files never leave your device. All processing happens locally in your browser, ensuring complete privacy.",
    privacyPledgeShort: "Local processing: your files are not sent to conversion servers.",
    remoteImportWarning: "Link import uses the network only to download the public PDF you provide. Processing remains 100% local afterward.",
    remoteImportConfirmPrompt: "Confirm downloading this PDF from the internet? Only the URL you entered will be accessed.",
    remoteImportConsentLabel: "I understand this will download from the internet (only the URL I provide).",
    remoteImportNetworkNotice:
      "Only networked feature: optional HTTPS PDF download by URL. This action performs an external download under your responsibility.",
    footerTerms: "Terms of Use",
    footerPrivacy: "Privacy Policy",
    footerManual: "User Manual",
    footerCookies: "Cookie usage",
    footerCopyright: "© 2026 — All rights reserved",
    advancedOptionsLabel: "Advanced local options",
    modalClose: "Understood & Close",
    
    termsTitle: "Terms of Use - PDF WINDOWS",
    termsBody: [
      "1. Acceptance of Terms: By accessing and using PDF WINDOWS, you explicitly agree to these terms in full. This tool is provided free of charge 'as-is' with no warranties of uptime or fitness for a specific purpose.",
      "2. Limitation of Liability: Because all processing is handled completely locally within the user's web browser, we do not store, access, or bear any liability for file integrity, loss, or misuse on your device.",
      "3. Fee Exemption: The service is entirely free. Platform operational costs are supported via non-intrusive spaces dedicated to high-quality external advertisement slots placed completely outside the main workflow card.",
      "4. Lawful Conduct: You agree to use the converter only for legal purposes, respecting copyright and intellectual property standards under local and global legislation."
    ],
    privacyTitle: "Privacy Policy - 100% Local Browser Engine",
    privacyBody: [
      "1. Serverless Architecture (Zero-Server): Unlike other online utilities that upload your corporate or personal data to remote databases, PDF WINDOWS runs 100% client-side. Modified files exist purely in high-speed, volatile RAM.",
      "2. No Logging: We do not collect, track, index, or store any personal metadata, file headers, or content payload. Once you close the tab, all local workspace traces are wiped naturally by the garbage collector.",
      "3. No network during conversion: Processing does not connect to servers. We do not use document analytics or send file content to third parties.",
      "4. Ultimate Client-Side Trust: Fiscal sheets, tax reports, personal memories, or sensitive visual layouts remain under your exclusive control. Our scripts merely compile local JS commands executed directly inside your CPU."
    ],
    manualTitle: "User Manual - Quick Start Guide",
    manualBody: [
      "Step 1: Drag and drop or select your document inside the prominent white dashboard block bordered in clean gray. Our local scanner evaluates the formatting without any network activity.",
      "Step 2: Once analyzed, our tool dynamically populates a dropdown selection containing context-aware targets (e.g. images convert to WebP/PDF, PDFs offer splits, encryptions, text export; CSV outputs JSON). Fill in parameters like passwords if needed.",
      "Step 3: Click 'Process Files Safely'. Progress reflects real work on your machine. When finished, download your locally generated files."
    ],
    cookiesTitle: "Cookie Policy — PDFWINDOWS",
    cookiesIntro:
      "PDFWINDOWS uses local browser technologies to run the platform properly, improve your experience, and enable offline features with full privacy.",
    cookiesSections: [
      {
        heading: "1. Privacy Commitment",
        paragraphs: [
          "PDFWINDOWS is built for absolute privacy. All file processing happens directly in your browser, with no documents sent to external servers.",
        ],
        listIntro: "Your files:",
        list: [
          "are not stored;",
          "are not sent to servers;",
          "are not shared;",
          "remain exclusively on your device.",
        ],
      },
      {
        heading: "2. What are cookies?",
        paragraphs: [
          "Cookies are small files or identifiers stored in the browser to enable essential features, preferences, and performance improvements.",
          "Besides traditional cookies, PDFWINDOWS may use:",
        ],
        list: [
          "browser local storage (LocalStorage);",
          "offline cache;",
          "Service Workers;",
          "IndexedDB;",
          "similar technologies required for offline-first operation.",
        ],
      },
      {
        heading: "3. How we use cookies and local storage",
        paragraphs: ["PDFWINDOWS uses only technical, essential resources to:"],
        list: [
          "keep language preferences;",
          "improve application performance;",
          "enable offline operation;",
          "temporarily store interface resources;",
          "speed up tool loading;",
          "ensure system stability and security.",
        ],
      },
      {
        heading: "4. What we do NOT do",
        paragraphs: ["PDFWINDOWS does NOT use cookies to:"],
        list: [
          "track personal browsing;",
          "sell data;",
          "monitor documents;",
          "store uploaded files;",
          "share information with third parties;",
          "build advertising profiles.",
        ],
      },
      {
        heading: "5. Offline Operation",
        paragraphs: [
          "To enable offline use, essential files may be stored locally by the browser through secure cache and Service Workers.",
        ],
        listIntro: "These resources:",
        list: [
          "stay on your device;",
          "can be removed anytime in browser settings;",
          "do not contain your personal documents.",
        ],
      },
      {
        heading: "6. User Control",
        paragraphs: [
          "You may clear cookies, remove local data, delete cache, or disable storage at any time in your browser settings.",
          "Removing this data may affect offline features and saved platform preferences.",
        ],
      },
      {
        heading: "7. Policy Updates",
        paragraphs: [
          "This Cookie Policy may be updated periodically to reflect technical improvements, legal requirements, or new platform features.",
        ],
      },
    ],
    cookiesClosing:
      "PDFWINDOWS — Real privacy, local processing, and full control of your files.",
    coinsTitle: "Real-time Exchange Ticker vs Local Currency Spec:",
    invalidFile: "Please select a valid, non-corrupted file.",
    noFile: "No file chosen.",
    processingCompleted: "File processed successfully!",
    unsupportedType: "This document formatting is not supported by our semantic file layout controller.",
    conversionError: "An unexpected error occurred during local JavaScript compilation.",
    privacyGuaranteeTitle: "100% Serverless",
    privacyGuaranteeDesc: "Complete prevention against cloud data leaks. Your absolute secrets never traverse the network.",
    speedGuaranteeTitle: "Native Browser Speed",
    speedGuaranteeDesc: "Utilizes high-speed client memory buffer allocations to process bytes in real time.",
    localGuaranteeTitle: "Desktop Safety",
    localGuaranteeDesc: "Eliminates third-party intercept vulnerabilities like Man-in-the-Middle exploits.",
    
    // Multi translations en
    multiFilesLoaded: "files loaded in local queue",
    addMoreFiles: "Add more files",
    clearAll: "Clear list",
    fileListTitle: "Files to process",
    outputFormat: "Output Format",
    downloadAll: "Download all (Individual Downloads)",
    generatedFilesTitle: "Files Ready for Download",
    importUrlLabel: "Import from Link (Public URL)",
    importUrlPlaceholder: "Paste direct PDF link (Ex: https://site.com/doc.pdf)",
    importUrlButton: "Fetch PDF",
    fetchingUrl: "Fetching remote file...",
    successToast: "Completed successfully",
    completionTitle: "Completed successfully",
    completionSubtitle: "Your files were processed locally. Download the results below whenever you are ready.",
    completionDownloadLabel: "Download",
    closeToolLabel: "Close",
    closeToolHint: "Clears the workspace and keeps you on this tool, ready to start again.",
    backToCatalog: "Back to catalog",
    processingErrorLabel: "Processing could not be completed",
    directoryButton: "Conversion catalog",
    previewLoadedTitle: "Loaded files",
    previewResultsTitle: "Visual results",
    previewInputLabel: "Input preview",
    previewProcessed: "Processed",
    previewQueued: "Queued",
    previewReady: "Ready",
    confirmSave: "Confirm & save",
    newFiles: "New files",
    secureBadgeShort: "100% secure"
  },
  es: {
    logoName: "PDF WINDOWS",
    title: "PDF WINDOWS | 100% SEGURO & GRATUITO",
    subtitle: "Professional, 100% seguro, sin costos, privacidad total, no guardamos sus archivos.",
    selectFileButton: "Seleccionar del dispositivo",
    dragDropText: "Arrastra tus archivos aquí",
    orText: "o selecciona del dispositivo",
    fileSelected: "Archivo Selecionado",
    fileSize: "Tamaño",
    fileType: "Tipo de Archivo",
    chooseOperation: "Selecciona el formato de salida o acción",
    
    // Img ops
    convertToWebP: "Convertir Imagen a WebP (Formato Web Optimizado)",
    convertToPDF: "Convertir Imágenes a PDF (Documento Digital)",
    imgToImgLabel: "Convertir de Formato de Imagen (JPG, PNG, WEBP, GIF, BMP, TIFF, ICO)",
    imgResizeLabel: "Redimensionar y Comprimir Imágenes",
    targetFormatLabel: "Seleccione el Formato de la Imagen",
    qualityLabel: "Calidad de Compresión",
    widthLabel: "Ancho Máximo (Píxeles - opcional, 0 original)",
    heightLabel: "Alto Máximo (Píxeles - opcional, 0 original)",
    keepAspectLabel: "Mantener proporciones originales (Aspect Ratio)",
    
    // PDF ops
    pdfToImgLabel: "Convertir PDF a Imágenes (Renderizar páginas individuales)",
    extractText: "Extraer Texto del PDF (Exportar a TXT)",
    addPassword: "Proteger PDF con contraseña (compatible con lectores estándar)",
    splitPDF: "Dividir Páginas de PDF (Extraer Intervalo)",
    mergePDFLabel: "Unir Múltiples PDFs en un Solo Archivo",
    rotatePDFLabel: "Rotar Páginas de PDF",
    rotateAngleLabel: "Seleccione el Ángulo de Rotación",
    
    // Data ops
    convertToJSON: "Convertir CSV a JSON (Estructura de Datos)",
    jsonToCsvLabel: "Convertir JSON a CSV (Tabla de Datos)",
    xmlToCsvLabel: "Convertir XML a CSV",
    xmlToJsonLabel: "Convertir XML a JSON",
    txtToPdfLabel: "Convertir Texto Plano (TXT) a PDF",
    
    // New tools
    ocrImageLabel: "OCR Inteligente: Extraer Texto de Imagen (JPG, PNG)",
    ocrPdfLabel: "OCR de PDF: PDF Escaneado a Texto Editable",
    watermarkPdfLabel: "Añadir Marca de Agua a PDF (Texto o Logo)",
    imageFilterLabel: "Editor de Imagen: Brillo, Contraste y Grayscale",
    compressPdfLabel: "Comprimir PDF Local (Optimizar tamaño)",
    upscaleImageLabel: "Upscale por IA (Aumentar resolución local)",
    pdfToWordLabel: "Convertir PDF a Word (DOCX básico)",
    
    ocrLangLabel: "Seleccionar Idioma OCR",
    watermarkTextLabel: "Texto de Marca de Agua",
    watermarkImageLabel: "O seleccione una imagen de Logo",
    brightnessLabel: "Brillo",
    contrastLabel: "Contraste",
    grayscaleLabel: "Grayscale (Blanco y Negro)",
    
    passwordPlaceholder: "Escribe la contraseña de acceso...",
    passwordLabel: "Establecer Contraseña de Protección",
    pdfProtectInfo:
      "Al procesar, se pedirá confirmar una contraseña. El .pdf final usa cifrado estándar AES-256: Chrome, Adobe y Edge pedirán la contraseña al abrir. La contraseña permanece solo en memoria del navegador.",
    splitFromLabel: "Página de Inicio",
    splitToLabel: "Página Final",
    splitSettingsTitle: "Selecciona el rango de páginas a extraer",
    
    processButton: "Procesar Archivos de Forma Segura",
    processing: "Procesando de forma segura localmente en la memoria RAM...",
    processingAdHint: "El procesamiento es 100% sin conexión. Aprovecha para consultar los patrocinadores debajo:",
    timeLeft: "Tiempo restante estimado",
    seconds: "segundos",
    downloadButton: "Descargar Archivo Procesado",
    successMessage: "¡Conversión completada con éxito! Tus archivos se generaron de manera completamente privada y local.",
    resetButton: "Convertir otros archivos",
    advertisingLabel: "PUBLICIDAD - Apoya nuestra plataforma gratuita",
    adContentPlaceholderOne: "Patrocinador Oficial: Servidores Cloud Premium y Alojamiento VPS de Alto Rendimiento. 100% Ecológico.",
    adContentPlaceholderTwo: "Anuncio de Google AdSense - Web hosting ilimitado, red VPN de ultra-velocidad y certificados SSL automatizados.",
    privacyBadge: "100% SEGURO Y PRIVADO",
    privacyDetailedText: "Procesamiento 100% local en el navegador. Ningún documento se envía a servidores — sus archivos permanecen solo en su dispositivo.",
    privacyPledgeTitle: "Compromiso de privacidad",
    privacyPledgeBody: "Sus archivos nunca salen de su dispositivo. Todo el procesamiento ocurre localmente en el navegador, garantizando privacidad total.",
    privacyPledgeShort: "Procesamiento local: tus archivos no se envían a servidores de conversión.",
    remoteImportWarning: "Importar por enlace usa la red solo para descargar el PDF público que indiques. El procesamiento sigue siendo 100% local después.",
    remoteImportConfirmPrompt: "¿Confirmar la descarga de este PDF desde internet? Solo se accederá a la URL indicada.",
    remoteImportConsentLabel: "Entiendo que esta acción descargará desde internet (solo la URL que proporciono).",
    remoteImportNetworkNotice:
      "Única función con red: descarga opcional de PDF por URL HTTPS. Este recurso realiza una descarga externa bajo su responsabilidad.",
    footerTerms: "Términos de Uso",
    footerPrivacy: "Política de Privacidad",
    footerManual: "Manual de Usuario",
    footerCookies: "Uso de cookies",
    footerCopyright: "© 2026 — Todos los derechos reservados",
    advancedOptionsLabel: "Opciones locales avanzadas",
    modalClose: "Entendido y Cerrar",
    
    termsTitle: "Términos de Uso - PDF WINDOWS",
    termsBody: [
      "1. Aceptación de Términos: Al acceder a y usar la herramienta PDF WINDOWS, aceptas completamente estas condiciones. Este servicio se entrega gratuito 'tal cual está', sin garantías de funcionamiento ininterrumpido o adecuación comercial.",
      "2. Limitación de Responsabilidad: Debido a que la conversión ocurre en forma 100% local en tu navegador web, el operador no tiene visibilidad ni asume responsabilidad por daños directos o indirectos asociados a la integridad de los datos.",
      "3. Modelo Gratuito: No hay cargos escondidos. El mantenimiento se financia de manera limpia incorporando patrocinadores de banners (Ad slots) ubicados estrictamente apartados de los botones centrales.",
      "4. Uso Responsable: Queda bajo la responsabilidad del usuario procesar únicamente documentos legítimos sobre los que posea plenos derechos intelectuales e industriales de propiedad."
    ],
    privacyTitle: "Política de Privacidad Absoluta - 100% Ejecución Local",
    privacyBody: [
      "1. Arquitectura de Cero Servidor: Mientras otras utilidades exponen documentos confidenciales enviándolos a intermediarios, nosotros operamos con la técnica 100% en-cliente. Tus bytes se manipulan exclusivamente en tu memoria RAM.",
      "2. Registro Nulo: No recogemos cookies de rastreo maliciosos, no leemos metadatos de documentos corporativos ni conservamos historiales de conversiones. Al cerrar la pestaña, todo rastro virtual es eliminado en tu computadora.",
      "3. Sin red en la conversión: El procesamiento no utiliza servidores. No usamos analítica de documentos ni enviamos contenido de archivos a terceros.",
      "4. Control Total: Contratos, nóminas y diagramas están únicamente expuestos a tus ojos. La biblioteca local de JavaScript interpreta el paso binario de forma interna sin requerir autorización de red del exterior."
    ],
    manualTitle: "Manual de Usuario - Pasos Sencillos",
    manualBody: [
      "Paso 1: Arrastra tu documento comercial al bloque blanco central destacado con un suave borde gris. El reconocedor inteligente de formatos operará de inmediato en completo aislamiento cibernético.",
      "Paso 2: Según la extensión detectada, el sistema de PDF WINDOWS adaptará el desplegable de opciones (imágenes a WebP/PDF; PDFs a división, protección con contraseña, extracción textual; CSV a JSON). Ajusta la calidad o escribe llaves.",
      "Paso 3: Pulsa 'Procesar Archivos de Forma Segura'. El progreso refleja el trabajo real en tu equipo. Al terminar, descarga los archivos generados localmente."
    ],
    cookiesTitle: "Política de Cookies — PDFWINDOWS",
    cookiesIntro:
      "PDFWINDOWS utiliza tecnologías locales del navegador para garantizar el funcionamiento adecuado de la plataforma, mejorar la experiencia del usuario y permitir recursos offline con total privacidad.",
    cookiesSections: [
      {
        heading: "1. Compromiso con la Privacidad",
        paragraphs: [
          "PDFWINDOWS fue desarrollado con foco en privacidad absoluta. Todo el procesamiento de archivos ocurre directamente en el navegador del usuario, sin envío de documentos a servidores externos.",
        ],
        listIntro: "Sus archivos:",
        list: [
          "no se almacenan;",
          "no se envían a servidores;",
          "no se comparten;",
          "permanecen exclusivamente en su dispositivo.",
        ],
      },
      {
        heading: "2. ¿Qué son las cookies?",
        paragraphs: [
          "Las cookies son pequeños archivos o identificadores almacenados en el navegador para permitir funcionalidades esenciales, preferencias y mejoras de rendimiento.",
          "Además de cookies tradicionales, PDFWINDOWS puede utilizar:",
        ],
        list: [
          "almacenamiento local del navegador (LocalStorage);",
          "caché offline;",
          "Service Workers;",
          "IndexedDB;",
          "tecnologías similares necesarias para funcionamiento offline-first.",
        ],
      },
      {
        heading: "3. Cómo utilizamos cookies y almacenamiento local",
        paragraphs: ["PDFWINDOWS utiliza solo recursos técnicos y esenciales para:"],
        list: [
          "mantener preferencias de idioma;",
          "mejorar el rendimiento de la aplicación;",
          "permitir funcionamiento offline;",
          "almacenar temporalmente recursos de la interfaz;",
          "acelerar la carga de las herramientas;",
          "garantizar estabilidad y seguridad del sistema.",
        ],
      },
      {
        heading: "4. Lo que NO hacemos",
        paragraphs: ["PDFWINDOWS NO utiliza cookies para:"],
        list: [
          "rastrear navegación personal;",
          "vender datos;",
          "monitorear documentos;",
          "almacenar archivos enviados;",
          "compartir información con terceros;",
          "crear perfiles publicitarios.",
        ],
      },
      {
        heading: "5. Funcionamiento Offline",
        paragraphs: [
          "Para permitir el uso offline de la plataforma, algunos archivos esenciales pueden almacenarse localmente en el navegador mediante caché seguro y Service Workers.",
        ],
        listIntro: "Estos recursos:",
        list: [
          "permanecen en el dispositivo del usuario;",
          "pueden eliminarse en cualquier momento desde el navegador;",
          "no contienen sus documentos personales.",
        ],
      },
      {
        heading: "6. Control del usuario",
        paragraphs: [
          "Puede limpiar cookies, eliminar datos locales, borrar caché o desactivar almacenamiento en cualquier momento desde la configuración de su navegador.",
          "La eliminación de estos datos puede afectar funciones offline y preferencias guardadas de la plataforma.",
        ],
      },
      {
        heading: "7. Cambios en esta política",
        paragraphs: [
          "Esta Política de Cookies puede actualizarse periódicamente para reflejar mejoras técnicas, requisitos legales o nuevas funcionalidades de la plataforma.",
        ],
      },
    ],
    cookiesClosing:
      "PDFWINDOWS — Privacidad real, procesamiento local y control total de sus archivos.",
    coinsTitle: "Divisas en Tiempo Real respecto a tu Moneda Local:",
    invalidFile: "Por favor, selecciona un archivo válido en buen estado.",
    noFile: "Ningún archivo seleccionado.",
    processingCompleted: "¡Documento procesado correctamente!",
    unsupportedType: "El formato del documento suministrado no forma parte de las opciones simplificadas de nuestro panel.",
    conversionError: "Ocurrió un error inesperado al procesar los bloques lógicos de JavaScript.",
    privacyGuaranteeTitle: "100% Sin Servidores",
    privacyGuaranteeDesc: "Blindaje informático completo contra robos remotos de datos confidenciales.",
    speedGuaranteeTitle: "Optimización Interna",
    speedGuaranteeDesc: "Utiliza la memoria caché interna y aceleración nativa de tu procesador gráfico.",
    localGuaranteeTitle: "Firmeza Cibernética",
    localGuaranteeDesc: "Previene vulnerabilidades de conexión como inyecciones y desvíos proxy intermedios.",
    
    // Multi translations es
    multiFilesLoaded: "archivos cargados en cola local",
    addMoreFiles: "Agregar más archivos",
    clearAll: "Limpiar lista",
    fileListTitle: "Archivos para procesar",
    outputFormat: "Formato de Salida",
    downloadAll: "Descargar todos (Descargas Individuales)",
    generatedFilesTitle: "Archivos Listos para la Descarga",
    importUrlLabel: "Importar desde Enlace (URL Pública)",
    importUrlPlaceholder: "Pega el enlace directo al PDF (Ej: https://site.com/doc.pdf)",
    importUrlButton: "Obtener PDF",
    fetchingUrl: "Obteniendo archivo remoto...",
    successToast: "Completado con éxito",
    completionTitle: "Completado con éxito",
    completionSubtitle: "Sus archivos se procesaron localmente. Descargue los resultados abajo cuando lo desee.",
    completionDownloadLabel: "Download",
    closeToolLabel: "Cerrar",
    closeToolHint: "Limpia el workspace y lo mantiene en esta herramienta, listo para empezar de nuevo.",
    backToCatalog: "Volver al catálogo",
    processingErrorLabel: "No se pudo completar el procesamiento",
    directoryButton: "Catálogo de conversiones",
    previewLoadedTitle: "Archivos cargados",
    previewResultsTitle: "Resultados visuales",
    previewInputLabel: "Vista previa de entrada",
    previewProcessed: "Procesado",
    previewQueued: "En cola",
    previewReady: "Listo",
    confirmSave: "Confirmar y guardar",
    newFiles: "Nuevos archivos",
    secureBadgeShort: "100% seguro"
  }
};

export const getBrowserLanguage = (): LanguageType => {
  if (typeof navigator === 'undefined') return 'en';
  return detectBrowserLanguage(navigator.languages, navigator.language);
};

export const formatNumber = (num: number, lang: LanguageType): string => {
  const localeMap: Record<LanguageType, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES'
  };
  return new Intl.NumberFormat(localeMap[lang] || 'en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(num);
};

export const formatCompactNumber = (num: number, lang: LanguageType): string => {
  const localeMap: Record<LanguageType, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES'
  };
  return new Intl.NumberFormat(localeMap[lang] || 'en-US', {
    maximumFractionDigits: 0
  }).format(num);
};
