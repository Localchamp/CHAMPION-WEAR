import { formatPrice, formatDate, slugify, truncate, calculateDiscount, getInitials } from '@/lib/utils';

describe('formatPrice', () => {
  it('formats price in GHS', () => {
    const result = formatPrice(99.99);
    expect(result).toContain('99.99');
  });

  it('handles zero', () => {
    const result = formatPrice(0);
    expect(result).toContain('0');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Champion Elite Hoodie')).toBe('champion-elite-hoodie');
  });

  it('removes special characters', () => {
    expect(slugify("Men's T-Shirt!")).toBe('mens-t-shirt');
  });
});

describe('truncate', () => {
  it('truncates long text', () => {
    const text = 'This is a very long description that should be truncated';
    expect(truncate(text, 20)).toBe('This is a very long ...');
  });

  it('returns original if short enough', () => {
    expect(truncate('Short', 20)).toBe('Short');
  });
});

describe('calculateDiscount', () => {
  it('calculates percentage discount', () => {
    expect(calculateDiscount(75, 100)).toBe(25);
  });

  it('returns 0 if no compare price', () => {
    expect(calculateDiscount(75)).toBe(0);
  });

  it('returns 0 if compare price is lower', () => {
    expect(calculateDiscount(100, 75)).toBe(0);
  });
});

describe('getInitials', () => {
  it('gets initials from full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('handles single name', () => {
    expect(getInitials('Champion')).toBe('CH');
  });
});
