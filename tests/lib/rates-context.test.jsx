// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RatesProvider, useRates } from '@/lib/rates-context'
import { createRates, snapshot } from '@/lib/rates'
import fx from '@/fx.json'

function Probe() {
  const { rate, currencyCount, codes, source, updatedAt } = useRates()
  return (
    <p>
      {rate('USD', 'NGN')}|{currencyCount}|{codes.join(',')}|{source || 'none'}|{updatedAt || 0}
    </p>
  )
}

describe('createRates', () => {
  it('builds the helpers over any set of pairs', () => {
    const live = createRates(
      { USD_NGN: { val: 1500 }, EUR_NGN: { val: 1700 }, NGN_NGN: { val: 1 }, BAD_NGN: { val: 0 } },
      { updatedAt: 123, source: 'test', sourceUrl: 'https://example.com' }
    )
    expect(live.codes).toEqual(['EUR', 'NGN', 'USD'])
    expect(live.currencyCount).toBe(2)
    expect(live.rate('USD', 'EUR')).toBeCloseTo(1500 / 1700, 12)
    expect(live.rateToNGN('BAD')).toBeNull()
    expect(live.boardByRegion().map(g => g.region)).toEqual(['Europe', 'Americas'])
    expect(live.source).toBe('test')
    expect(live.updatedAt).toBe(123)
  })

  it('keeps the snapshot as the module-level default', () => {
    expect(snapshot.rate('USD', 'NGN')).toBe(fx.results.USD_NGN.val)
    expect(snapshot.source).toBeNull()
  })
})

describe('RatesProvider', () => {
  it('serves the snapshot when a page fetched nothing', () => {
    render(
      <RatesProvider fx={null}>
        <Probe />
      </RatesProvider>
    )
    expect(screen.getByText(new RegExp(`^${fx.results.USD_NGN.val}\\|${snapshot.currencyCount}\\|`))).toBeInTheDocument()
  })

  it('serves the live rates a page fetched', () => {
    render(
      <RatesProvider fx={{ results: { USD_NGN: { val: 1500 }, NGN_NGN: { val: 1 } }, updatedAt: 99, source: 'feed', sourceUrl: 'https://x' }}>
        <Probe />
      </RatesProvider>
    )
    expect(screen.getByText('1500|1|NGN,USD|feed|99')).toBeInTheDocument()
  })

  it('defaults to the snapshot outside any provider', () => {
    render(<Probe />)
    expect(screen.getByText(new RegExp(`^${fx.results.USD_NGN.val}\\|`))).toBeInTheDocument()
  })
})
