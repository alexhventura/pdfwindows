import { describe, expect, it } from 'vitest';
import { composeEditedText, spanEditOps, type EditableSpan } from '../pdfEditableText';

function span(id: string, str: string, x: number, y: number): EditableSpan {
  return { id, pageIndex: 0, str, x, y, w: 0.2, h: 0.03, fontSize: 12 };
}

describe('composeEditedText', () => {
  const spans: EditableSpan[] = [
    span('0:0', 'Status:', 0.1, 0.2),
    span('0:1', 'Pendente', 0.3, 0.2),
    span('0:2', 'Observacao', 0.1, 0.3),
    span('0:3', 'Total', 0.1, 0.4),
  ];

  it('applies edits, keeps reading order, and joins same-line spans', () => {
    const text = composeEditedText(spans, { '0:1': 'Aprovado' }, [], 1);
    expect(text).toContain('Status: Aprovado');
    expect(text).not.toContain('Pendente');
    // Lines are ordered top to bottom.
    const lines = text.split('\n');
    expect(lines[0]).toBe('Status: Aprovado');
  });

  it('drops a span that was cleared (deleted)', () => {
    const text = composeEditedText(spans, { '0:2': '' }, [], 1);
    expect(text).not.toContain('Observacao');
    expect(text).toContain('Total');
  });

  it('includes added text at its position', () => {
    const text = composeEditedText(spans, {}, [{ pageIndex: 0, x: 0.1, y: 0.5, text: 'Conferido por: Maria' }], 1);
    expect(text.trim().endsWith('Conferido por: Maria')).toBe(true);
  });
});

describe('spanEditOps deletion', () => {
  it('produces only an erase op when text is cleared', () => {
    const ops = spanEditOps(span('0:0', 'x', 0.1, 0.2), '   ');
    expect(ops).toHaveLength(1);
    expect(ops[0].kind).toBe('erase');
  });
});
