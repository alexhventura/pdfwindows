import { writeFileSync } from 'node:fs';

const SITE_ORIGIN = (process.env.VITE_SITE_ORIGIN || process.env.SITE_ORIGIN || 'https://www.pdfwindows.com').replace(
  /\/$/,
  ''
);

const bare = [
  '/',
  '/ferramentas',
  '/conversor',
  '/pdf-merge',
  '/pdf-compress',
  '/pdf-password',
  '/pdf-ocr',
  '/pdf-split',
  '/pdf-rotate',
  '/pdf-watermark',
  '/pdf-to-image',
  '/pdf-extract-text',
  '/image-converter',
  '/image-to-pdf',
  '/image-resize',
  '/image-ocr',
  '/image-filters',
  '/csv-to-json',
  '/json-to-csv',
  '/xml-to-json',
  '/txt-to-pdf',
  '/estudio-documentos',
  '/capturador-de-cores',
  '/gerador-relatorios',
  '/gerador-qr-code',
  '/gerador-cpf',
  '/limpador-codigo',
];

const locales = ['en', 'pt', 'es'];
const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for (const locale of locales) {
  for (const path of bare) {
    const suffix = path === '/' ? '/' : path;
    const loc = `${SITE_ORIGIN}/${locale}${suffix === '/' ? '/' : suffix}`;
    const priority = path === '/' ? '1.0' : path === '/ferramentas' || path === '/conversor' ? '0.9' : '0.8';
    const freq = path === '/' || path === '/ferramentas' || path === '/conversor' ? 'weekly' : 'monthly';
    lines.push(`  <url><loc>${loc}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`);
  }
}

lines.push('</urlset>');
writeFileSync('public/sitemap.xml', `${lines.join('\n')}\n`);

writeFileSync(
  'public/robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`
);

console.log(`Generated sitemap.xml and robots.txt for ${SITE_ORIGIN} (${locales.length * bare.length} URLs)`);
