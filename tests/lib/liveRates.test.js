import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getLiveRates, resetLiveRatesCache, TTL_MS } from '@/lib/liveRates'

const json = (body, ok = true, status = 200) => ({ ok, status, json: async () => body })

// open.er-api.com quotes units of each currency per one naira.
const erApi = { result: 'success', time_last_update_unix: 1792540801, rates: { NGN: 1, USD: 1 / 1500, EUR: 1 / 1700, GBP: 1 / 2000, ZZZ: 5 } }
const fawaz = { date: '2026-10-22', ngn: { ngn: 1, usd: 1 / 1490, eur: 1 / 1690, gbp: 1 / 1990 } }

describe('getLiveRates', () => {
  beforeEach(() => {
    resetLiveRatesCache()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('inverts the per-naira quote into X_NGN pairs and drops unknown codes', async () => {
    fetch.mockResolvedValueOnce(json(erApi))
    const live = await getLiveRates(0)
    expect(live.source).toBe('open.er-api.com')
    expect(live.results.USD_NGN.val).toBeCloseTo(1500)
    expect(live.results.GBP_NGN.val).toBeCloseTo(2000)
    expect(live.results.NGN_NGN).toBeUndefined()
    expect(live.results.ZZZ_NGN).toBeUndefined()
    expect(live.updatedAt).toBe(new Date(1792540801 * 1000).toISOString())
  })

  it('serves the cache inside the TTL and refetches after it', async () => {
    fetch.mockResolvedValue(json(erApi))
    await getLiveRates(0)
    await getLiveRates(TTL_MS - 1)
    expect(fetch).toHaveBeenCalledTimes(1)
    await getLiveRates(TTL_MS)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('falls back to the second source when the first fails', async () => {
    fetch.mockRejectedValueOnce(new Error('down')).mockResolvedValueOnce(json(fawaz))
    const live = await getLiveRates(0)
    expect(live.source).toBe('fawazahmed0/currency-api')
    expect(live.results.USD_NGN.val).toBeCloseTo(1490)
    expect(live.updatedAt).toBe('2026-10-22T00:00:00.000Z')
  })

  it('rejects a feed that is missing headline currencies', async () => {
    fetch
      .mockResolvedValueOnce(json({ ...erApi, rates: { USD: 1 / 1500 } }))
      .mockResolvedValueOnce(json(fawaz))
    const live = await getLiveRates(0)
    expect(live.source).toBe('fawazahmed0/currency-api')
  })

  it('keeps the last good rates when every source fails', async () => {
    fetch.mockResolvedValueOnce(json(erApi))
    const first = await getLiveRates(0)
    fetch.mockResolvedValue(json({}, false, 503))
    expect(await getLiveRates(TTL_MS + 1)).toEqual(first)
  })

  it('returns null when nothing live has ever loaded', async () => {
    fetch.mockRejectedValue(new Error('offline'))
    expect(await getLiveRates(0)).toBeNull()
  })
})
