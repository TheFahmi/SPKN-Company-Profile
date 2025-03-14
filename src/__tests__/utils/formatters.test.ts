import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '../../app/utils/formatters';

describe('Currency Formatter', () => {
  it('formats currency correctly for whole numbers', () => {
    const result = formatCurrency(100000);
    expect(result).toContain('100.000');
    expect(result).toContain('Rp');
  });

  it('formats currency correctly for decimal numbers', () => {
    const result = formatCurrency(100000.50);
    // Karena kita membulatkan, hasilnya akan menjadi 100.001
    expect(result).toContain('100.001');
    expect(result).toContain('Rp');
  });

  it('formats currency correctly for zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
    expect(result).toContain('Rp');
  });

  it('formats currency correctly for negative numbers', () => {
    const result = formatCurrency(-100000);
    expect(result).toContain('100.000');
    expect(result.startsWith('-')).toBe(true);
  });
});

describe('Date Formatter', () => {
  it('formats date string correctly', () => {
    const date = '2023-01-15';
    const result = formatDate(date);
    expect(result).toContain('15');
    expect(result).toContain('Januari');
    expect(result).toContain('2023');
  });

  it('formats Date object correctly', () => {
    const date = new Date(2023, 0, 15); // January 15, 2023
    const result = formatDate(date);
    expect(result).toContain('15');
    expect(result).toContain('Januari');
    expect(result).toContain('2023');
  });
}); 