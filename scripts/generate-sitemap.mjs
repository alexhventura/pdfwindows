import { writeFileSync } from 'node:fs';
import { discoverPublicBarePaths } from './extract-public-paths.mjs';
import { resolveSiteOrigin } from './resolve-site-origin.mjs';
import {
  assertCanonicalHost,
  buildSitemapUrlEntries,
  renderRobotsTxt,
  renderSitemapXml,
  validateRobotsTxt,
  validateSitemapXml,
} from './sitemap-lib.mjs';

const SITE_ORIGIN = resolveSiteOrigin();
assertCanonicalHost(SITE_ORIGIN);

const barePaths = discoverPublicBarePaths();
const entries = buildSitemapUrlEntries(barePaths, SITE_ORIGIN);
const sitemapXml = renderSitemapXml(entries);
const robotsTxt = renderRobotsTxt(SITE_ORIGIN);

const sitemapValidation = validateSitemapXml(sitemapXml, SITE_ORIGIN);
if (!sitemapValidation.valid) {
  throw new Error(`Sitemap validation failed:\n- ${sitemapValidation.errors.join('\n- ')}`);
}

const robotsValidation = validateRobotsTxt(robotsTxt, SITE_ORIGIN);
if (!robotsValidation.valid) {
  throw new Error(`robots.txt validation failed:\n- ${robotsValidation.errors.join('\n- ')}`);
}

writeFileSync('public/sitemap.xml', sitemapXml);
writeFileSync('public/robots.txt', robotsTxt);

const localeCount = 3;
console.log('Generated sitemap.xml and robots.txt');
console.log(`  Origin: ${SITE_ORIGIN}`);
console.log(`  Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
console.log(
  `  URLs: ${entries.length} (${localeCount} locales × ${barePaths.length} pages)`
);
