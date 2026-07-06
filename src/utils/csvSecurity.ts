/** Mitigate CSV formula injection when exporting tabular data. */

const FORMULA_PREFIX = /^[=+\-@\t\r]/;

export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let s = String(value);
  if (FORMULA_PREFIX.test(s)) {
    s = `'${s}`;
  }
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function rowsToCsv(headers: string[], rows: Record<string, unknown>[]): string {
  const headerLine = headers.map(sanitizeCsvCell).join(',');
  const body = rows.map((row) =>
    headers.map((h) => sanitizeCsvCell(row[h])).join(',')
  );
  return [headerLine, ...body].join('\n');
}
