/**
 * Sanitizes text for pdf-lib StandardFonts (WinAnsi encoding).
 * Strips emojis and replaces common Unicode punctuation with ASCII-safe equivalents.
 */
const EMOJI_AND_SYMBOLS =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{1F512}]/gu;

const WIN_ANSI_REPLACEMENTS: [RegExp, string][] = [
  [/\u2014/g, '-'], // em dash
  [/\u2013/g, '-'], // en dash
  [/\u2022/g, '*'], // bullet
  [/\u2026/g, '...'], // ellipsis
  [/\u2018|\u2019/g, "'"],
  [/\u201C|\u201D/g, '"'],
  [/\u00A0/g, ' '], // nbsp
];

export function sanitizePdfText(text: string): string {
  if (!text) return '';

  let result = text.replace(/\u{1F512}/gu, 'PROTEGIDO');
  result = result.replace(EMOJI_AND_SYMBOLS, '');

  for (const [pattern, replacement] of WIN_ANSI_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  return result
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code === 9 || code === 10 || code === 13) return char;
      if (code >= 32 && code <= 126) return char;
      if (code >= 160 && code <= 255) return char;
      return '';
    })
    .join('');
}
