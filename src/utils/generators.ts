/**
 * Client-side data generators for developer/QA testing. Everything runs locally
 * in the browser — no network. Brazilian document generators produce numbers
 * with the correct check digits (valid *format*), but they do NOT correspond to
 * real people or companies and must only be used for tests, mockups and learning.
 */

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function randomDigits(length: number): number[] {
  return Array.from({ length }, () => randomInt(10));
}

/** Cryptographically strong random integer in [0, max). */
function secureInt(max: number): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    // Rejection sampling to avoid modulo bias.
    const limit = Math.floor(0xffffffff / max) * max;
    let value = 0;
    do {
      crypto.getRandomValues(buf);
      value = buf[0];
    } while (value >= limit);
    return value % max;
  }
  return randomInt(max);
}

function mod11CheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

// ---------------------------------------------------------------------------
// CPF
// ---------------------------------------------------------------------------

export function generateCpf(): string {
  const base = randomDigits(9);
  const d1 = mod11CheckDigit(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = mod11CheckDigit([...base, d1], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const s = [...base, d1, d2].join('');
  return s.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function isValidCpf(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const nums = d.split('').map(Number);
  const d1 = mod11CheckDigit(nums.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = mod11CheckDigit(nums.slice(0, 10), [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === nums[9] && d2 === nums[10];
}

// ---------------------------------------------------------------------------
// CNPJ
// ---------------------------------------------------------------------------

export function generateCnpj(): string {
  const base = [...randomDigits(8), 0, 0, 0, 1]; // 8-digit root + 0001 branch
  const d1 = mod11CheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = mod11CheckDigit([...base, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const s = [...base, d1, d2].join('');
  return s.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function isValidCnpj(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const nums = d.split('').map(Number);
  const d1 = mod11CheckDigit(nums.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = mod11CheckDigit(nums.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === nums[12] && d2 === nums[13];
}

// ---------------------------------------------------------------------------
// RG (São Paulo SSP format, check digit mod 11 with X)
// ---------------------------------------------------------------------------

export function generateRg(): string {
  const base = randomDigits(8);
  const weights = [2, 3, 4, 5, 6, 7, 8, 9];
  const sum = base.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const rest = 11 - (sum % 11);
  const dv = rest === 10 ? 'X' : rest === 11 ? '0' : String(rest);
  const s = base.join('');
  return `${s.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3')}-${dv}`;
}

// ---------------------------------------------------------------------------
// PIS / PASEP
// ---------------------------------------------------------------------------

export function generatePisPasep(): string {
  const base = randomDigits(10);
  const dv = mod11CheckDigit(base, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const s = [...base, dv].join('');
  return s.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
}

export function isValidPisPasep(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length !== 11) return false;
  const nums = d.split('').map(Number);
  const dv = mod11CheckDigit(nums.slice(0, 10), [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return dv === nums[10];
}

// ---------------------------------------------------------------------------
// Brazilian phone number (mobile)
// ---------------------------------------------------------------------------

const VALID_DDDS = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68,
  69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95,
  96, 97, 98, 99,
];

export function generatePhoneBR(): string {
  const ddd = VALID_DDDS[randomInt(VALID_DDDS.length)];
  const part1 = randomDigits(4).join('');
  const part2 = randomDigits(4).join('');
  return `(${ddd}) 9${part1}-${part2}`;
}

// ---------------------------------------------------------------------------
// Password
// ---------------------------------------------------------------------------

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
}

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%&*?-_=+';

export function generatePassword(options: PasswordOptions): string {
  const pools: string[] = [];
  if (options.lower) pools.push(LOWER);
  if (options.upper) pools.push(UPPER);
  if (options.digits) pools.push(DIGITS);
  if (options.symbols) pools.push(SYMBOLS);
  if (pools.length === 0) pools.push(LOWER);
  const length = Math.max(4, Math.min(64, Math.floor(options.length) || 16));

  const chars: string[] = [];
  // Guarantee at least one char from each selected pool.
  for (const pool of pools) chars.push(pool[secureInt(pool.length)]);
  const all = pools.join('');
  while (chars.length < length) chars.push(all[secureInt(all.length)]);
  // Fisher–Yates shuffle so the guaranteed chars are not always at the front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, length).join('');
}

export function passwordStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score >= 4) return 'strong';
  if (score >= 2) return 'medium';
  return 'weak';
}

// ---------------------------------------------------------------------------
// UUID v4
// ---------------------------------------------------------------------------

export function generateUuidV4(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 16; i++) bytes[i] = randomInt(256);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// ---------------------------------------------------------------------------
// Test credit card (Luhn-valid) — for payment-form testing only
// ---------------------------------------------------------------------------

export type CardBrand = 'visa' | 'mastercard' | 'amex';

const CARD_SPECS: Record<CardBrand, { prefix: string; length: number; label: string }> = {
  visa: { prefix: '4', length: 16, label: 'Visa' },
  mastercard: { prefix: '5' + (1 + randomInt(5)), length: 16, label: 'Mastercard' },
  amex: { prefix: randomInt(2) === 0 ? '34' : '37', length: 15, label: 'American Express' },
};

function luhnCheckDigit(partial: string): number {
  let sum = 0;
  let double = true; // next digit appended is at even position from the right
  for (let i = partial.length - 1; i >= 0; i--) {
    let d = partial.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return (10 - (sum % 10)) % 10;
}

export function isValidLuhn(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length < 2) return false;
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = d.charCodeAt(i) - 48;
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export interface TestCard {
  brand: string;
  number: string;
  cvv: string;
  expiry: string;
}

export function generateCreditCard(brand: CardBrand = 'visa'): TestCard {
  const spec: { prefix: string; length: number; label: string } =
    brand === 'mastercard'
      ? { prefix: '5' + (1 + randomInt(5)), length: 16, label: 'Mastercard' }
      : brand === 'amex'
        ? { prefix: randomInt(2) === 0 ? '34' : '37', length: 15, label: 'American Express' }
        : CARD_SPECS.visa;
  let digits = spec.prefix;
  while (digits.length < spec.length - 1) digits += String(randomInt(10));
  digits += String(luhnCheckDigit(digits));
  const groups = brand === 'amex'
    ? [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10)]
    : digits.match(/.{1,4}/g) ?? [digits];
  const cvv = (brand === 'amex' ? randomDigits(4) : randomDigits(3)).join('');
  const now = new Date();
  const month = String(1 + randomInt(12)).padStart(2, '0');
  const year = String((now.getFullYear() + 1 + randomInt(5)) % 100).padStart(2, '0');
  return { brand: spec.label, number: groups.join(' '), cvv, expiry: `${month}/${year}` };
}

// ---------------------------------------------------------------------------
// Product key (random placeholder in the 5×5 group format — NOT a real license)
// ---------------------------------------------------------------------------

// Excludes visually ambiguous characters (0/O, 1/I) like many key formats.
const KEY_ALPHABET = 'BCDFGHJKMPQRTVWXY2346789';

export function generateProductKey(groups = 5, size = 5): string {
  const out: string[] = [];
  for (let g = 0; g < groups; g++) {
    let chunk = '';
    for (let i = 0; i < size; i++) chunk += KEY_ALPHABET[secureInt(KEY_ALPHABET.length)];
    out.push(chunk);
  }
  return out.join('-');
}
