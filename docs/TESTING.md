# PDF WINDOWS — Testing strategy

## Unit tests (Vitest)

- `networkPolicy`: HTTPS-only remote import, private host blocking
- `fileValidation`: extension and queue limits
- `csvSecurity`: CSV formula injection mitigation

Run: `npm test`

## E2E (Playwright)

- Verifies no requests to Google Fonts, cdnjs PDF.js, Flaticon icons, or Google Translate on initial load
- Run after build: `npm run build && npm run test:e2e`

## Manual QA checklist

1. Upload a multi-page PDF and run **PDF to images** — progress moves without a fixed 15s delay
2. Run **PDF OCR** on a scanned PDF (≤30 pages) — completes without tab freeze
3. Open DevTools → Network: confirm no `cdnjs`, `fonts.googleapis`, `flaticon` during normal use
4. Optional URL import: only fires when checkbox is checked; rejects `http://` and `localhost`
5. Corrupted PDF: shows error alert, UI remains responsive

## Large files

- Per-file limit: 100 MB (config in `fileValidation.ts`)
- Remote import limit: 50 MB (`networkPolicy.ts`)
- PDF render/OCR page caps: 12 / 30 pages respectively

## OCR note

Tesseract.js may download language data on first OCR use unless language packs are bundled locally. For air-gapped deployments, pre-cache worker/lang assets in `public/` and configure `createWorker` paths accordingly.
