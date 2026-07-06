import { test, expect } from '@playwright/test';

test('home loads without external font or pdfjs CDN requests', async ({ page }) => {
  const externalHosts: string[] = [];

  page.on('request', (req) => {
    const url = new URL(req.url());
    const host = url.hostname;
    if (
      host.includes('googleapis.com') ||
      host.includes('gstatic.com') ||
      host.includes('cdnjs.cloudflare.com') ||
      host.includes('flaticon.com') ||
      host.includes('translate.google.com')
    ) {
      externalHosts.push(host);
    }
  });

  await page.goto('/');
  await expect(page.getByText(/PDF WINDOWS/i).first()).toBeVisible();
  expect(externalHosts).toEqual([]);
});
