import { test, expect } from '@playwright/test';

test('home loads without OCR/PDF engine CDN requests', async ({ page }) => {
  const blockedHosts: string[] = [];

  page.on('request', (req) => {
    const host = new URL(req.url()).hostname;
    if (
      host.includes('cdn.jsdelivr.net') ||
      host.includes('cdnjs.cloudflare.com') ||
      host.includes('unpkg.com') ||
      host.includes('tessdata.projectnaptha.com')
    ) {
      blockedHosts.push(host);
    }
  });

  await page.goto('/en/');
  await expect(page.getByText(/PDF WINDOWS/i).first()).toBeVisible();
  expect(blockedHosts).toEqual([]);
});

test('tesseract assets are served from same origin', async ({ request }) => {
  const worker = await request.get('/tesseract/worker.min.js');
  expect(worker.ok()).toBeTruthy();

  const eng = await request.get('/tesseract/lang/eng.traineddata.gz');
  expect(eng.ok()).toBeTruthy();

  const core = await request.get('/tesseract/core/tesseract-core-lstm.wasm.js');
  expect(core.ok()).toBeTruthy();
});
