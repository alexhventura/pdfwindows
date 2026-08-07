import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

/**
 * Build a minimal Word (.docx) document from plain text (local, client-side).
 * Blank lines become paragraph breaks; lines starting with "--- Página" become headings.
 */
export async function textToDocxBlob(
  text: string,
  title = 'PDF WINDOWS — Texto Extraído'
): Promise<Blob> {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: title, bold: true })],
    }),
    new Paragraph({ children: [] }),
  ];

  for (const line of lines) {
    if (/^---\s*P[aá]gina\s+\d+/i.test(line.trim())) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: line.trim(), bold: true })],
        })
      );
      continue;
    }

    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: line.length ? line : ' ', size: 22 })],
      })
    );
  }

  const doc = new Document({
    creator: 'PDF WINDOWS',
    title,
    description: 'Texto extraído localmente no navegador',
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}
