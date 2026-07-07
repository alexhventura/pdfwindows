import { readFileSync, writeFileSync } from 'node:fs';
import { buildLegacySlugRedirects } from './legacy-redirects.mjs';

const vercelPath = 'vercel.json';
const config = JSON.parse(readFileSync(vercelPath, 'utf8'));

const hostRedirects = (config.redirects ?? []).filter(
  (rule) => rule.has?.some((condition) => condition.type === 'host')
);

const slugRedirects = buildLegacySlugRedirects();
config.redirects = [...hostRedirects, ...slugRedirects];

writeFileSync(vercelPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log(`Updated ${vercelPath} with ${slugRedirects.length} legacy slug redirects.`);
