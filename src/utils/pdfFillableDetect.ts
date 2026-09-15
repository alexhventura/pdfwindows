/** Detect blank/underscore/colon gaps in a PDF text layer and turn them into AcroForm slots. */

export interface FillableTextRun {
  str: string;
  /** PDF user space, origin bottom-left. */
  x: number;
  y: number;
  w: number;
  h: number;
}

export type FillableSlotKind = 'text' | 'checkbox';

export interface FillableSlot {
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: FillableSlotKind;
  name?: string;
}

/** Horizontal rule drawn in the PDF content stream (underline / blank line). */
export interface DrawnRule {
  x: number;
  y: number;
  w: number;
}

const LEADER_RE = /^[\s_\.\-–—·•]{3,}$/;
const UNDERSCORE_CHUNK_RE = /_{3,}|\.{5,}|…{2,}/;
const CHECKBOX_GLYPH_RE = /^(☐|☑|□|■|\[\s?\]|\[x\])$/i;
const PAREN_CHECK_RE = /\(\s*\)/;

const LEFT_MARGIN = 24;
const RIGHT_PAD = 24;
const MIN_FIELD_W = 16;
const MIN_FIELD_H = 12;
const MIN_WIDE_BLANK = 12;
const MAX_SLOTS_PER_PAGE = 180;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function lineYTolerance(runs: FillableTextRun[]): number {
  const heights = runs.map((run) => run.h).filter((h) => h > 0).sort((a, b) => a - b);
  const mid = heights[Math.floor(heights.length / 2)] ?? 12;
  return Math.max(3.5, mid * 0.45);
}

function groupLines(runs: FillableTextRun[]): FillableTextRun[][] {
  const tol = lineYTolerance(runs);
  const lines: FillableTextRun[][] = [];
  const sorted = [...runs].sort((a, b) => b.y - a.y || a.x - b.x);
  for (const run of sorted) {
    const line = lines.find((row) => Math.abs(row[0]!.y - run.y) <= tol);
    if (line) line.push(run);
    else lines.push([run]);
  }
  for (const line of lines) line.sort((a, b) => a.x - b.x);
  return lines;
}

function fieldBox(x: number, baseline: number, w: number, h: number): { x: number; y: number; w: number; h: number } {
  const height = Math.max(18, h * 1.7);
  return {
    x,
    y: baseline - h * 0.35,
    w,
    h: height,
  };
}

function isWhitespace(str: string): boolean {
  return str.trim() === '';
}

function isWideBlank(run: FillableTextRun): boolean {
  const trimmed = run.str.trim();
  if (run.w < MIN_WIDE_BLANK) return false;
  return isWhitespace(run.str) || trimmed === '_' || LEADER_RE.test(trimmed);
}

function isInk(run: FillableTextRun): boolean {
  return !isWhitespace(run.str) && !LEADER_RE.test(run.str.trim()) && run.str.trim() !== '_';
}

function isSlash(run: FillableTextRun): boolean {
  return run.str.trim() === '/';
}

function inkLetters(text: string): number {
  return (text.match(/[\p{L}\p{N}]/gu) ?? []).length;
}

function overlapRatio(a: FillableSlot, b: FillableSlot): number {
  if (a.pageIndex !== b.pageIndex) return 0;
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const smaller = Math.min(a.w * a.h, b.w * b.h);
  return smaller > 0 ? (ix * iy) / smaller : 0;
}

function mergeSlots(slots: FillableSlot[]): FillableSlot[] {
  const out: FillableSlot[] = [];
  for (const slot of slots) {
    const hit = out.find((existing) => existing.kind === slot.kind && overlapRatio(existing, slot) >= 0.35);
    if (!hit) {
      out.push({ ...slot });
      continue;
    }
    const x = Math.min(hit.x, slot.x);
    const y = Math.min(hit.y, slot.y);
    hit.w = Math.max(hit.x + hit.w, slot.x + slot.w) - x;
    hit.h = Math.max(hit.y + hit.h, slot.y + slot.h) - y;
    hit.x = x;
    hit.y = y;
  }
  return out;
}

function pushSlot(
  slots: FillableSlot[],
  pageIndex: number,
  kind: FillableSlotKind,
  box: { x: number; y: number; w: number; h: number },
  pageWidth: number,
  pageHeight: number
) {
  const minW = kind === 'checkbox' ? 10 : MIN_FIELD_W;
  const x = clamp(box.x, 8, pageWidth - minW - 8);
  const w = clamp(box.w, minW, pageWidth - x - 8);
  const y = clamp(box.y, 8, pageHeight - MIN_FIELD_H - 8);
  const h = clamp(box.h, kind === 'checkbox' ? 10 : MIN_FIELD_H, pageHeight - y - 8);
  if (kind === 'checkbox') {
    const size = clamp(Math.min(w, h, 14), 10, 16);
    slots.push({ pageIndex, kind, x, y, w: size, h: size });
    return;
  }
  if (w < MIN_FIELD_W || h < MIN_FIELD_H) return;
  slots.push({ pageIndex, kind, x, y, w, h });
}

function checkboxAt(run: FillableTextRun, offsetX: number): { x: number; y: number; w: number; h: number } {
  const size = Math.max(11, Math.min(14, run.h * 1.15));
  return { x: run.x + offsetX, y: run.y - 1, w: size, h: size };
}

function collectCheckboxes(line: FillableTextRun[], pageIndex: number, pageWidth: number, pageHeight: number, slots: FillableSlot[]) {
  for (let i = 0; i < line.length; i++) {
    const run = line[i]!;
    if (CHECKBOX_GLYPH_RE.test(run.str.trim())) {
      pushSlot(slots, pageIndex, 'checkbox', checkboxAt(run, 0), pageWidth, pageHeight);
      continue;
    }

    const inline = run.str.match(PAREN_CHECK_RE);
    if (inline && inline.index != null) {
      const ratio = run.str.length > 0 ? inline.index / run.str.length : 0;
      pushSlot(slots, pageIndex, 'checkbox', checkboxAt(run, run.w * ratio), pageWidth, pageHeight);
    }

    const next = line[i + 1];
    const after = line[i + 2];
    if (run.str.trim().endsWith('(') && next && isWideBlank(next) && next.w <= 26 && after && after.str.trimStart().startsWith(')')) {
      pushSlot(slots, pageIndex, 'checkbox', checkboxAt(next, 0), pageWidth, pageHeight);
    }
  }
}

function collectWideBlanks(line: FillableTextRun[], pageIndex: number, pageWidth: number, pageHeight: number, slots: FillableSlot[]) {
  for (let i = 0; i < line.length; i++) {
    const run = line[i]!;
    if (!isWideBlank(run)) continue;
    const prev = line[i - 1];
    const next = line[i + 1];
    const checkboxGap =
      run.w <= 22 &&
      !!prev &&
      prev.str.trim().endsWith('(') &&
      !!next &&
      next.str.trimStart().startsWith(')');
    if (checkboxGap) continue;
    if (run.w < 16) continue;
    pushSlot(slots, pageIndex, 'text', fieldBox(run.x, run.y, Math.max(run.w, 22), run.h), pageWidth, pageHeight);
  }
}

function collectColonAndGaps(
  line: FillableTextRun[],
  pageIndex: number,
  pageWidth: number,
  pageHeight: number,
  slots: FillableSlot[]
) {
  const ink = line.filter(isInk);
  if (ink.length === 0) return;
  const last = ink[ink.length - 1]!;
  const first = ink[0]!;
  const lineText = ink.map((run) => run.str).join('').replace(/\s+/g, ' ').trim();
  const avgH = ink.reduce((sum, run) => sum + run.h, 0) / ink.length;
  const inkWidth = last.x + last.w - first.x;
  const letters = Math.max(1, inkLetters(lineText));
  const avgChar = inkWidth / letters;
  const minGap = Math.max(18, avgChar * 2.2);

  for (let i = 0; i < ink.length - 1; i++) {
    const a = ink[i]!;
    const b = ink[i + 1]!;
    const gap = b.x - (a.x + a.w);
    if (gap < minGap) continue;
    pushSlot(slots, pageIndex, 'text', fieldBox(a.x + a.w + 2, a.y, gap - 4, avgH), pageWidth, pageHeight);
  }

  const usableRight = pageWidth - RIGHT_PAD;
  const remaining = usableRight - (last.x + last.w);
  const endsWithColon = /[:：]\s*$/.test(last.str.trim()) || /[:：]\s*$/.test(lineText);
  const isDenseParagraph = !endsWithColon && letters >= 40 && inkWidth >= pageWidth * 0.58;
  if (remaining >= 20 && !isDenseParagraph) {
    pushSlot(slots, pageIndex, 'text', fieldBox(last.x + last.w + 3, last.y, remaining - 3, avgH), pageWidth, pageHeight);
  }
}

function collectDateParts(
  line: FillableTextRun[],
  pageIndex: number,
  pageWidth: number,
  pageHeight: number,
  slots: FillableSlot[]
) {
  const ink = line.filter(isInk);
  const slashes = ink.filter(isSlash);
  if (slashes.length === 0) return;
  const avgH = ink.reduce((sum, run) => sum + run.h, 0) / Math.max(1, ink.length);
  const usableRight = pageWidth - RIGHT_PAD;

  const anchors = ink.filter((run) => isSlash(run) || /[:：]\s*$/.test(run.str.trim()) || /^data\b/i.test(run.str.trim()));
  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i]!;
    const next = anchors[i + 1];
    const right = next ? next.x : isSlash(a) ? Math.min(usableRight, a.x + a.w + 58) : usableRight;
    const gap = right - (a.x + a.w);
    if (gap < 16) continue;
    pushSlot(slots, pageIndex, 'text', fieldBox(a.x + a.w + 1, a.y, gap - 2, avgH), pageWidth, pageHeight);
  }

  const lastSlash = slashes[slashes.length - 1]!;
  const remaining = usableRight - (lastSlash.x + lastSlash.w);
  if (remaining >= 16) {
    pushSlot(slots, pageIndex, 'text', fieldBox(lastSlash.x + lastSlash.w + 1, lastSlash.y, Math.min(remaining - 1, 56), avgH), pageWidth, pageHeight);
  }
}

function collectInlineSlashDates(
  line: FillableTextRun[],
  pageIndex: number,
  pageWidth: number,
  pageHeight: number,
  slots: FillableSlot[]
) {
  for (const run of line) {
    if (!run.str.includes('/') || run.str.trim() === '/') continue;
    const chars = [...run.str];
    const charW = run.w / Math.max(1, chars.length);
    const slashAt: number[] = [];
    chars.forEach((ch, i) => {
      if (ch === '/') slashAt.push(i);
    });
    if (slashAt.length === 0) continue;
    const bounds = [0, ...slashAt, chars.length];
    for (let i = 0; i < bounds.length - 1; i++) {
      const from = i === 0 ? bounds[i]! : bounds[i]! + 1;
      const to = bounds[i + 1]!;
      const slice = chars.slice(from, to).join('');
      if (inkLetters(slice) > 3) continue;
      const w = Math.max(0, (to - from) * charW);
      if (w < 16) continue;
      pushSlot(slots, pageIndex, 'text', fieldBox(run.x + from * charW, run.y, w, run.h), pageWidth, pageHeight);
    }
  }
}

function collectUnderlineRows(
  line: FillableTextRun[],
  pageIndex: number,
  pageWidth: number,
  pageHeight: number,
  slots: FillableSlot[]
) {
  const ink = line.filter(isInk);
  const marks = line.filter((run) => run.str.trim() === '_' || LEADER_RE.test(run.str.trim()));
  if (ink.length > 0 || marks.length === 0) return;
  const y = marks[0]!.y;
  const h = Math.max(marks[0]!.h, 10);
  pushSlot(
    slots,
    pageIndex,
    'text',
    fieldBox(LEFT_MARGIN, y, pageWidth - LEFT_MARGIN - RIGHT_PAD, h),
    pageWidth,
    pageHeight
  );
}

export function dedupeDrawnRules(rules: DrawnRule[]): DrawnRule[] {
  const sorted = [...rules].sort((a, b) => b.y - a.y || a.x - b.x);
  const out: DrawnRule[] = [];
  for (const rule of sorted) {
    if (rule.w < 22) continue;
    const hit = out.find((existing) => Math.abs(existing.y - rule.y) < 2 && Math.abs(existing.x - rule.x) < 4 && Math.abs(existing.w - rule.w) < 8);
    if (!hit) out.push({ ...rule });
    else hit.y = Math.min(hit.y, rule.y);
  }
  return out;
}

function collectDrawnRules(
  rules: DrawnRule[],
  pageIndex: number,
  pageWidth: number,
  pageHeight: number,
  slots: FillableSlot[]
) {
  for (const rule of dedupeDrawnRules(rules)) {
    if (rule.y < 40 || rule.y > pageHeight - 28) continue;
    const nearEdge = rule.x < 18 && rule.x + rule.w > pageWidth - 18;
    if (nearEdge && (rule.y < 80 || rule.y > pageHeight - 80)) continue;
    pushSlot(slots, pageIndex, 'text', fieldBox(rule.x, rule.y + 3, rule.w, 12), pageWidth, pageHeight);
  }
}

function collectLeaderChunks(runs: FillableTextRun[], pageIndex: number, pageWidth: number, pageHeight: number, slots: FillableSlot[]) {
  for (const run of runs) {
    if (!isInk(run)) continue;
    const trimmed = run.str.trim();
    const chunk = trimmed.match(UNDERSCORE_CHUNK_RE);
    if (!chunk || chunk.index == null || trimmed.length === 0) continue;
    const start = chunk.index / trimmed.length;
    const end = (chunk.index + chunk[0].length) / trimmed.length;
    const x = run.x + run.w * start;
    const w = Math.max(MIN_FIELD_W, run.w * (end - start));
    pushSlot(slots, pageIndex, 'text', fieldBox(x, run.y, w, run.h), pageWidth, pageHeight);
  }
}

export function detectFillableSlots(
  runs: FillableTextRun[],
  pageWidth: number,
  pageHeight: number,
  pageIndex: number,
  rules: DrawnRule[] = []
): FillableSlot[] {
  const slots: FillableSlot[] = [];
  const contentRuns = runs.filter((run) => run.str.length > 0 && run.w > 0.5 && run.h > 0.5);
  const lines = groupLines(contentRuns);

  collectLeaderChunks(contentRuns, pageIndex, pageWidth, pageHeight, slots);
  collectDrawnRules(rules, pageIndex, pageWidth, pageHeight, slots);
  for (const line of lines) {
    collectCheckboxes(line, pageIndex, pageWidth, pageHeight, slots);
    collectWideBlanks(line, pageIndex, pageWidth, pageHeight, slots);
    collectColonAndGaps(line, pageIndex, pageWidth, pageHeight, slots);
    collectDateParts(line, pageIndex, pageWidth, pageHeight, slots);
    collectInlineSlashDates(line, pageIndex, pageWidth, pageHeight, slots);
    collectUnderlineRows(line, pageIndex, pageWidth, pageHeight, slots);
  }

  let merged = mergeSlots(slots).filter((slot) => slot.y > 14 && slot.y + slot.h < pageHeight - 16);
  if (merged.length === 0) {
    pushSlot(
      merged,
      pageIndex,
      'text',
      {
        x: LEFT_MARGIN,
        y: 36,
        w: pageWidth - LEFT_MARGIN - RIGHT_PAD,
        h: 72,
      },
      pageWidth,
      pageHeight
    );
  }

  merged.sort((a, b) => b.y - a.y || a.x - b.x);
  if (merged.length > MAX_SLOTS_PER_PAGE) merged = merged.slice(0, MAX_SLOTS_PER_PAGE);
  return merged.map((slot, index) => ({
    ...slot,
    name: `fill_${slot.pageIndex + 1}_${index + 1}`,
  }));
}
