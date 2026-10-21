import { describe, it, expect } from 'vitest'
import { formatAmount, formatNaira, formatCompact, plainText } from '@/lib/format'

describe('formatAmount', () => {
  it('shows a dash for missing or non-finite values', () => {
    expect(formatAmount(null)).toBe('—')
    expect(formatAmount(undefined)).toBe('—')
    expect(formatAmount(NaN)).toBe('—')
    expect(formatAmount(Infinity)).toBe('—')
  })

  it('uses two decimals and thousands separators for ordinary amounts', () => {
    expect(formatAmount(0)).toBe('0.00')
    expect(formatAmount(1)).toBe('1.00')
    expect(formatAmount(359.999914)).toBe('360.00')
    expect(formatAmount(1234567.891)).toBe('1,234,567.89')
  })

  it('keeps more precision for small rates', () => {
    expect(formatAmount(0.5)).toBe('0.5000')
    expect(formatAmount(0.00277)).toBe('0.00277')
    expect(formatAmount(0.001234567)).toBe('0.001235')
    expect(formatAmount(0.0000123)).toBe('0.000012')
  })

  it('honours an explicit decimal count', () => {
    expect(formatAmount(2.5, 0)).toBe('3')
    expect(formatAmount(2.5, 3)).toBe('2.500')
  })
})

describe('formatNaira', () => {
  it('prefixes the naira sign', () => {
    expect(formatNaira(360)).toBe('₦360.00')
    expect(formatNaira(null)).toBe('₦—')
  })
})

describe('formatCompact', () => {
  it('rounds to whole units with separators', () => {
    expect(formatCompact(1234.6)).toBe('1,235')
    expect(formatCompact(NaN)).toBe('—')
  })
})

describe('plainText', () => {
  it('passes strings through and handles empties', () => {
    expect(plainText('hello')).toBe('hello')
    expect(plainText('')).toBe('')
    expect(plainText(null)).toBe('')
    expect(plainText(42)).toBe('')
  })

  it('joins Prismic rich-text blocks into one string', () => {
    const field = [{ type: 'heading1', text: 'Naira' }, { type: 'paragraph' }, { type: 'paragraph', text: 'rates' }]
    expect(plainText(field)).toBe('Naira  rates')
    expect(plainText([])).toBe('')
  })
})
