import { describe, it, expect } from 'vitest'
import {
  HOME,
  HEADLINE,
  codes,
  currencyOptions,
  currencyName,
  currencySymbol,
  rateToNGN,
  rate,
  boardByRegion,
  currencyCount,
} from '@/lib/rates'
import fx from '@/fx.json'

const USD_NGN = fx.results.USD_NGN.val
const EUR_NGN = fx.results.EUR_NGN.val

describe('currency list', () => {
  it('is sorted, unique and includes the naira', () => {
    expect(HOME).toBe('NGN')
    expect(codes).toContain('NGN')
    expect(codes).toContain('USD')
    expect(new Set(codes).size).toBe(codes.length)
    expect([...codes].sort()).toEqual(codes)
  })

  it('counts every quoted currency except the naira', () => {
    expect(currencyCount).toBe(codes.length - 1)
    expect(currencyCount).toBe(Object.keys(fx.results).filter(k => k !== 'NGN_NGN').length)
  })

  it('has a rate for every headline currency', () => {
    HEADLINE.forEach(code => {
      expect(codes).toContain(code)
      expect(rateToNGN(code)).toBeGreaterThan(0)
    })
  })

  it('builds picker options with names and symbols', () => {
    const usd = currencyOptions.find(o => o.value === 'USD')
    expect(usd).toEqual({ value: 'USD', label: 'United States Dollar', symbol: '$' })
    expect(currencyOptions.map(o => o.value)).toEqual(codes)
  })
})

describe('currencyName / currencySymbol', () => {
  it('reads names and symbols from the snapshot', () => {
    expect(currencyName('NGN')).toBe('Nigerian Naira')
    expect(currencySymbol('NGN')).toBe('₦')
  })

  it('falls back to the code and an empty symbol for unknown currencies', () => {
    expect(currencyName('ZZZ')).toBe('ZZZ')
    expect(currencySymbol('ZZZ')).toBe('')
  })
})

describe('rateToNGN', () => {
  it('is 1 for the naira itself', () => {
    expect(rateToNGN('NGN')).toBe(1)
  })

  it('returns the snapshot value for a quoted currency', () => {
    expect(rateToNGN('USD')).toBe(USD_NGN)
  })

  it('returns null for an unknown currency', () => {
    expect(rateToNGN('ZZZ')).toBeNull()
  })
})

describe('rate', () => {
  it('is 1 for the same currency', () => {
    expect(rate('USD', 'USD')).toBe(1)
    expect(rate('ZZZ', 'ZZZ')).toBe(1)
  })

  it('uses the direct pair into naira', () => {
    expect(rate('USD', 'NGN')).toBe(USD_NGN)
  })

  it('inverts the pair out of naira', () => {
    expect(rate('NGN', 'USD')).toBeCloseTo(1 / USD_NGN, 12)
  })

  it('derives cross rates through the naira', () => {
    expect(rate('USD', 'EUR')).toBeCloseTo(USD_NGN / EUR_NGN, 12)
    expect(rate('USD', 'EUR') * rate('EUR', 'USD')).toBeCloseTo(1, 12)
  })

  it('returns null when either side is unknown', () => {
    expect(rate('USD', 'ZZZ')).toBeNull()
    expect(rate('ZZZ', 'NGN')).toBeNull()
  })
})

describe('boardByRegion', () => {
  const board = boardByRegion()

  it('lists regions in the fixed order with no empty groups', () => {
    const order = ['Africa', 'Europe', 'Americas', 'Asia', 'Middle East', 'Oceania', 'Other']
    const regions = board.map(g => g.region)
    expect(regions.every(r => order.includes(r))).toBe(true)
    expect(regions).toEqual(order.filter(r => regions.includes(r)))
    board.forEach(g => expect(g.rows.length).toBeGreaterThan(0))
  })

  it('covers every currency once and never the naira', () => {
    const all = board.flatMap(g => g.rows.map(r => r.code))
    expect(all).not.toContain('NGN')
    expect(new Set(all).size).toBe(all.length)
    expect(all.length).toBe(currencyCount)
  })

  it('sorts rows by name and carries both directions of the rate', () => {
    board.forEach(g => {
      const names = g.rows.map(r => r.name)
      expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names)
    })
    const usd = board.find(g => g.region === 'Americas').rows.find(r => r.code === 'USD')
    expect(usd.name).toBe('United States Dollar')
    expect(usd.symbol).toBe('$')
    expect(usd.ngn).toBe(USD_NGN)
    expect(usd.inverse).toBeCloseTo(1 / USD_NGN, 12)
  })
})
