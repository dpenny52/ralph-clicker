import { describe, it, expect } from 'vitest';
import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('returns small numbers as-is', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(100)).toBe('100');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(10000)).toBe('10K');
  });

  it('formats millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1M');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(25000000)).toBe('25M');
  });

  it('formats billions with B suffix', () => {
    expect(formatNumber(1000000000)).toBe('1B');
    expect(formatNumber(2500000000)).toBe('2.5B');
  });

  it('formats trillions with T suffix', () => {
    expect(formatNumber(1000000000000)).toBe('1T');
  });

  it('handles decimal numbers under 1000', () => {
    expect(formatNumber(123.456)).toBe('123.5');
  });
});
