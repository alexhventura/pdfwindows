import { test, expect, type Page } from '@playwright/test';

/** 1×1 red PNG */
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

const CONVERTER_PATHS = [
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
] as const;

const SUITE_PATHS = [
  '/estudio-documentos',
  '/capturador-de-cores',
  '/gerador-relatorios',
  '/gerador-qr-code',
  '/gerador-cpf',
  '/limpador-codigo',
] as const;

async function trackPageErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test.describe('Tool pages smoke', () => {
  for (const path of CONVERTER_PATHS) {
    test(`converter ${path} loads workspace`, async ({ page }) => {
      const errors = await trackPageErrors(page);
      await page.goto(`/en${path}`);
      await expect(page.locator('.workspace-panel').first()).toBeVisible({ timeout: 30_000 });
      expect(errors, errors.join('\n')).toEqual([]);
    });
  }

  for (const path of SUITE_PATHS) {
    test(`suite ${path} loads workspace`, async ({ page }) => {
      const errors = await trackPageErrors(page);
      await page.goto(`/en${path}`);
      await expect(page.locator('.workspace-panel').first()).toBeVisible({ timeout: 30_000 });
      expect(errors, errors.join('\n')).toEqual([]);
    });
  }
});

test.describe('Color picker interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const makeOrangeFrame = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#224466';
          ctx.fillRect(0, 0, 120, 80);
          ctx.fillStyle = '#FF5500';
          ctx.fillRect(40, 20, 40, 40);
        }
        return canvas;
      };

      navigator.mediaDevices.getDisplayMedia = async () => {
        const canvas = makeOrangeFrame();
        const stream = canvas.captureStream(1);
        return stream;
      };
    });
  });

  test('mode tabs and screen capture button work', async ({ page }) => {
    const policyViolations: string[] = [];
    page.on('console', (msg) => {
      const text = msg.text();
      if (/Permissions policy violation.*camera/i.test(text)) {
        policyViolations.push(text);
      }
    });

    await page.goto('/en/capturador-de-cores');
    await expect(page.locator('.color-picker-root')).toBeVisible({ timeout: 30_000 });

    await page.getByRole('tab', { name: /From Screen|Capturar da Tela/i }).click();
    const screenBtn = page.getByRole('button', { name: /Pick Color from Screen|Capturar Cor da Tela/i });
    await expect(screenBtn).toBeEnabled();
    await screenBtn.click();

    const overlayCanvas = page.locator('.screen-color-pick-canvas');
    await expect(overlayCanvas).toBeVisible({ timeout: 10_000 });
    await overlayCanvas.click({ position: { x: 60, y: 40 } });

    await expect(page.locator('.color-picker-swatch-large')).toBeVisible();
    await expect(page.locator('.color-picker-code-value').first()).toContainText('#FF5500');
    expect(policyViolations, policyViolations.join('\n')).toEqual([]);
  });

  test('image upload and pixel pick', async ({ page }) => {
    await page.goto('/en/capturador-de-cores');
    await expect(page.locator('.color-picker-root')).toBeVisible({ timeout: 30_000 });

    await page.getByRole('tab', { name: /From Image|Capturar da Imagem/i }).click();
    const fileInput = page.locator('input[type="file"][accept="image/*"]');
    await fileInput.setInputFiles({
      name: 'pixel.png',
      mimeType: 'image/png',
      buffer: TINY_PNG,
    });

    const canvas = page.locator('canvas.color-picker-canvas');
    await expect(canvas).toBeVisible({ timeout: 10_000 });
    await canvas.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      el.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        })
      );
    });

    await expect(page.locator('.color-picker-swatch-large')).toBeVisible();
  });

  test('copy buttons and mode switch do not freeze UI', async ({ page }) => {
    await page.goto('/en/capturador-de-cores');
    await expect(page.locator('.color-picker-root')).toBeVisible({ timeout: 30_000 });

    await page.getByRole('tab', { name: /From Screen|Capturar da Tela/i }).click();
    await page.getByRole('button', { name: /Pick Color from Screen|Capturar Cor da Tela/i }).click();
    const overlayCanvas = page.locator('.screen-color-pick-canvas');
    await expect(overlayCanvas).toBeVisible({ timeout: 10_000 });
    await overlayCanvas.click({ position: { x: 60, y: 40 } });
    await page.getByRole('button', { name: /Copy RGB|Copiar RGB/i }).click();
    await page.getByRole('tab', { name: /From Image|Capturar da Imagem/i }).click();
    await expect(page.getByRole('tab', { name: /From Image|Capturar da Imagem/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});

test.describe('Suite tool primary buttons', () => {
  test('QR generator generate button', async ({ page }) => {
    await page.goto('/en/gerador-qr-code');
    await expect(page.locator('.workspace-panel')).toBeVisible({ timeout: 30_000 });
    await page.getByPlaceholder(/Link or text|Link ou texto/i).fill('https://pdfwindows.app');
    await page.getByRole('button', { name: /^Generate$|^Gerar$/i }).click();
    await expect(page.locator('img[alt="QR Code"]')).toBeVisible();
  });

  test('CPF generator button', async ({ page }) => {
    await page.goto('/en/gerador-cpf');
    await expect(page.locator('.workspace-panel')).toBeVisible({ timeout: 30_000 });
    await page.getByRole('button', { name: /Generate new CPF|Gerar novo CPF/i }).click();
    await expect(page.locator('.font-mono').filter({ hasText: /\d{3}\.\d{3}\.\d{3}-\d{2}/ })).toBeVisible();
  });

  test('code cleaner process button', async ({ page }) => {
    await page.goto('/en/limpador-codigo');
    await expect(page.locator('.workspace-panel')).toBeVisible({ timeout: 30_000 });
    await page.locator('textarea').fill('const  x  =  1;');
    await page.getByRole('button', { name: /^Process$|^Processar$/i }).click();
    await expect(page.locator('textarea')).not.toHaveValue('const  x  =  1;');
  });

  test('report generator tabs and add section', async ({ page }) => {
    await page.goto('/en/gerador-relatorios');
    await expect(page.locator('.workspace-panel')).toBeVisible({ timeout: 30_000 });
    await page.getByRole('button', { name: /^Report$|^Relatório$/i }).click();
    await page.getByRole('button', { name: /Add section|Adicionar seção/i }).click();
    await expect(page.getByPlaceholder(/Report title|Título do relatório/i)).toBeVisible();
  });
});
