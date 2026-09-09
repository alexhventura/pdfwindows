import { describe, expect, it } from 'vitest';
import {
  generateCnpj,
  generateCpf,
  generateCreditCard,
  generatePassword,
  generatePhoneBR,
  generatePisPasep,
  generateProductKey,
  generateRg,
  generateUuidV4,
  isValidCnpj,
  isValidCpf,
  isValidLuhn,
  isValidPisPasep,
  passwordStrength,
} from '../generators';

describe('document generators produce valid check digits', () => {
  it('CPF', () => {
    for (let i = 0; i < 50; i++) {
      const cpf = generateCpf();
      expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
      expect(isValidCpf(cpf)).toBe(true);
    }
  });

  it('CNPJ', () => {
    for (let i = 0; i < 50; i++) {
      const cnpj = generateCnpj();
      expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
      expect(isValidCnpj(cnpj)).toBe(true);
    }
  });

  it('PIS/PASEP', () => {
    for (let i = 0; i < 50; i++) {
      const pis = generatePisPasep();
      expect(pis).toMatch(/^\d{3}\.\d{5}\.\d{2}-\d{1}$/);
      expect(isValidPisPasep(pis)).toBe(true);
    }
  });

  it('RG (SP format)', () => {
    for (let i = 0; i < 20; i++) {
      expect(generateRg()).toMatch(/^\d{2}\.\d{3}\.\d{3}-[\dX]$/);
    }
  });

  it('rejects invalid documents', () => {
    expect(isValidCpf('111.111.111-11')).toBe(false);
    expect(isValidCpf('123.456.789-00')).toBe(false);
    expect(isValidCnpj('00.000.000/0000-00')).toBe(false);
  });
});

describe('phone generator', () => {
  it('uses a valid DDD and mobile format', () => {
    for (let i = 0; i < 20; i++) {
      const phone = generatePhoneBR();
      expect(phone).toMatch(/^\(\d{2}\) 9\d{4}-\d{4}$/);
    }
  });
});

describe('password generator', () => {
  it('respects length and character classes', () => {
    const pwd = generatePassword({ length: 20, lower: true, upper: true, digits: true, symbols: true });
    expect(pwd).toHaveLength(20);
    expect(pwd).toMatch(/[a-z]/);
    expect(pwd).toMatch(/[A-Z]/);
    expect(pwd).toMatch(/\d/);
    expect(pwd).toMatch(/[^A-Za-z0-9]/);
    expect(passwordStrength(pwd)).toBe('strong');
  });

  it('clamps length and works with a single class', () => {
    const pwd = generatePassword({ length: 2, lower: false, upper: false, digits: true, symbols: false });
    expect(pwd.length).toBeGreaterThanOrEqual(4);
    expect(pwd).toMatch(/^\d+$/);
  });
});

describe('uuid generator', () => {
  it('produces a valid v4 UUID', () => {
    const id = generateUuidV4();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});

describe('test credit card generator', () => {
  it('produces Luhn-valid numbers for each brand', () => {
    (['visa', 'mastercard', 'amex'] as const).forEach((brand) => {
      const card = generateCreditCard(brand);
      expect(isValidLuhn(card.number)).toBe(true);
      expect(card.expiry).toMatch(/^\d{2}\/\d{2}$/);
      expect(card.cvv).toMatch(brand === 'amex' ? /^\d{4}$/ : /^\d{3}$/);
    });
    expect(generateCreditCard('visa').number.replace(/\s/g, '')).toMatch(/^4\d{15}$/);
  });
});

describe('product key generator', () => {
  it('produces 5 groups of 5 unambiguous chars', () => {
    const key = generateProductKey();
    expect(key).toMatch(/^[BCDFGHJKMPQRTVWXY2346789]{5}(-[BCDFGHJKMPQRTVWXY2346789]{5}){4}$/);
  });
});
