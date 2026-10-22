import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchLiveRates, toPairs, SOURCES } from '@/lib/live-rates'

const ok = body => ({ ok: true, status: 200, json: async () => body })
const bad = status => ({ ok: false, status, json: async () => ({}) })

const erApi = { result: 'success', time_last_update_unix: 1_761_091_200, rates: { NGN: 1, USD: 0.00068, EUR: 0.00059, GBP: 0.00051, ZZZ: 5 } }
const currencyApi = { date: '2026-10-22', ngn: { ngn: 1, usd: 0.00068, eur: 0.00059, gbp: 0.00051, ghs: 0.0085 } }

describe('toPairs', () => {
  it('inverts "one naira buys" figures into X_NGN pairs for currencies we can name', () => {
    const pairs = toPairs({ USD: 0.0005, NGN: 1, ZZZ: 2, BAD: 'x', ZERO: 0 })
    expect(pairs.USD_NGN).toEqual({ id: 'USD_NGN', fr: 'USD', to: 'NGN', val: 2000 })
    expect(pairs.NGN_NGN.val).toBe(1)
    expect(pairs.ZZZ_NGN).toBeUndefined()
    expect(pairs.BAD_NGN).toBeUndefined()
    expect(pairs.ZERO_NGN).toBeUndefined()
  })
})

describe('fetchLiveRates', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('uses the first feed when it answers', async () => {
    const fetch = vi.fn().mockResolvedValueOnce(ok(erApi))
    vi.stubGlobal('fetch', fetch)

    const live = await fetchLiveRates()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0][0]).toBe(SOURCES[0].url)
    expect(live.source).toBe('Exchange Rate API')
    expect(live.sourceUrl).toBe('https://www.exchangerate-api.com')
    expect(live.updatedAt).toBe(1_761_091_200_000)
    expect(live.results.USD_NGN.val).toBeCloseTo(1 / 0.00068, 6)
    expect(live.results.ZZZ_NGN).toBeUndefined()
  })

  it('falls through to the second feed when the first fails', async () => {
    const fetch = vi.fn().mockResolvedValueOnce(bad(503)).mockResolvedValueOnce(ok(currencyApi))
    vi.stubGlobal('fetch', fetch)

    const live = await fetchLiveRates()

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(live.source).toBe('currency-api')
    expect(live.updatedAt).toBe(Date.parse('2026-10-22T00:00:00Z'))
    expect(live.results.GHS_NGN.fr).toBe('GHS')
    expect(live.results.USD_NGN.val).toBeCloseTo(1 / 0.00068, 6)
  })

  it('rejects a feed that is missing the headline currencies', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(ok({ result: 'success', rates: { NGN: 1, GHS: 0.0085 } }))
      .mockResolvedValueOnce(ok(currencyApi))
    vi.stubGlobal('fetch', fetch)

    const live = await fetchLiveRates()

    expect(live.source).toBe('currency-api')
  })

  it('returns null when every feed fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    expect(await fetchLiveRates()).toBeNull()
  })
})
