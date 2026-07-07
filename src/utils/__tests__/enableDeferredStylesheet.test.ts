import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('CSP inline handler guard', () => {
  it('index.html does not use inline event handler attributes', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).not.toMatch(/\son[a-z]+\s*=/i);
    expect(html).not.toMatch(/href\s*=\s*["']javascript:/i);
  });
});
