# PDFWINDOWS

Hub de ferramentas **100% client-side** para PDF, imagens e dados — sem envio de documentos a servidores de conversão.

> Seus arquivos nunca saem do seu dispositivo durante o processamento. Nenhum documento é enviado, salvo ou armazenado em servidores. Todo o processamento ocorre localmente no navegador.

**Exceção:** importação opcional por URL HTTPS (download do PDF que você informa). Após o download, o arquivo permanece apenas na memória local.

## Tecnologias

- **React 19** + **Vite 6** + **TypeScript**
- **Tailwind CSS 4**
- **React Router 7** (SPA com lazy loading)
- **pdf-lib**, **pdfjs-dist**, **tesseract.js**, **pica**, **qrcode**, **prettier**

## Instalação

```bash
git clone https://github.com/alexhventura/pdfwindows.git
cd pdfwindows
npm install
```

## Como executar

```bash
npm run dev      # http://localhost:3000
npm run preview  # preview do build de produção
```

## Como gerar build

```bash
npm run build    # saída em dist/
npm run clean    # remove dist/
```

## Deploy na Vercel

1. Conecte o repositório GitHub na [Vercel](https://vercel.com).
2. Framework detectado automaticamente: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. O arquivo `vercel.json` já configura SPA routing, headers de segurança e cache.

**Variáveis de ambiente:** nenhuma obrigatória. O app roda 100% no navegador sem API keys.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Type checking (TypeScript) |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes E2E (Playwright) |

## Estrutura do projeto

```
pdfwindows/
├── public/              # Assets estáticos (logo, manifest, sw, robots, sitemap)
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── context/         # Contextos React (idioma)
│   ├── documentStudio/  # Estúdio de documentos
│   ├── engines/         # Motores de processamento (OCR, etc.)
│   ├── layouts/         # Layouts de página
│   ├── pages/           # Páginas/rotas
│   ├── routes/          # Configuração do React Router
│   ├── seo/             # SEO dinâmico e catálogo de ferramentas
│   ├── tools/           # Handlers de ferramentas
│   └── utils/           # Utilitários e testes unitários
├── e2e/                 # Testes Playwright
├── docs/                # Documentação adicional
├── index.html           # Entry HTML com meta tags e Schema.org
├── vercel.json          # Configuração Vercel (SPA, headers, cache)
└── vite.config.ts       # Configuração Vite
```

## Testes

Ver [docs/TESTING.md](docs/TESTING.md).

## Segurança

- PDF.js e worker empacotados localmente (sem CDN)
- Limites de tamanho de arquivo e fila
- Proteção contra CSV injection em exportações
- Service worker cacheia apenas assets da mesma origem
- Headers de segurança configurados no `vercel.json`

## Licença

MIT — uso livre para projetos pessoais e comerciais.
