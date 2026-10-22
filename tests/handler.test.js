import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createRequire } from 'node:module'

// handler.js is CommonJS and reads the API key at require time, so each test loads a fresh copy.
// It requires axios and fs natively, so the test spies on the same instances via createRequire
// instead of vi.mock, which only intercepts transformed imports.
const require = createRequire(import.meta.url)
const axios = require('axios')
const fs = require('fs')

const load = async () => {
  vi.resetModules()
  const handler = await import('@/handler')
  return { axios, fs, handler }
}

describe('refresh handlers', () => {
  const originalKey = process.env.CURRENCY_API_KEY
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('axios.get was not stubbed for this test'))
    vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})
    vi.spyOn(fs, 'readFileSync')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    if (originalKey === undefined) delete process.env.CURRENCY_API_KEY
    else process.env.CURRENCY_API_KEY = originalKey
  })

  describe('without CURRENCY_API_KEY', () => {
    beforeEach(() => {
      delete process.env.CURRENCY_API_KEY
    })

    it('getcurrencies fails with a 500 and calls nothing', async () => {
      const { axios, fs, handler } = await load()
      const result = await handler.getcurrencies()
      expect(result.statusCode).toBe(500)
      expect(JSON.parse(result.body)).toEqual({ error: 'Unable to refresh currencies' })
      expect(axios.get).not.toHaveBeenCalled()
      expect(fs.writeFileSync).not.toHaveBeenCalled()
    })
  })

  describe('with CURRENCY_API_KEY', () => {
    beforeEach(() => {
      process.env.CURRENCY_API_KEY = 'test-key'
    })

    it('getcurrencies writes the currency list and reports the count', async () => {
      const { axios, fs, handler } = await load()
      const data = { results: { USD: { id: 'USD', currencyName: 'US Dollar' }, NGN: { id: 'NGN', currencyName: 'Naira' } } }
      axios.get.mockResolvedValueOnce({ data })

      const result = await handler.getcurrencies()

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.body)).toEqual({ updated: 2 })
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get.mock.calls[0][0]).toContain('currencies?apiKey=test-key')
      expect(fs.writeFileSync).toHaveBeenCalledWith('supported-currencies.json', JSON.stringify(data, null, '\t'))
    })

  })

  // getfx needs no key: it writes the snapshot from the same keyless feeds the site fetches live.
  describe('getfx', () => {
    const feed = (rates, extra = {}) => ({
      ok: true,
      status: 200,
      json: async () => ({ result: 'success', time_last_update_unix: 1_700_000_000, rates, ...extra }),
    })

    it('writes the live rates to fx.json with their date and source', async () => {
      delete process.env.CURRENCY_API_KEY
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(feed({ USD: 1 / 1500, EUR: 1 / 1700, GBP: 1 / 2000, NGN: 1 })))
      const { fs, handler } = await load()

      const result = await handler.getfx()

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.body)).toEqual({ updated: 4, source: 'Exchange Rate API' })
      const [file, contents] = fs.writeFileSync.mock.calls[0]
      expect(file).toBe('fx.json')
      const written = JSON.parse(contents)
      expect(written.results.USD_NGN.val).toBeCloseTo(1500, 6)
      expect(written.results.EUR_NGN.val).toBeCloseTo(1700, 6)
      expect(Object.keys(written.results).sort()).toEqual(['EUR_NGN', 'GBP_NGN', 'NGN_NGN', 'USD_NGN'])
      expect(written.updatedAt).toBe(1_700_000_000_000)
      expect(written.source).toBe('Exchange Rate API')
      expect(axios.get).not.toHaveBeenCalled()
      vi.unstubAllGlobals()
    })

    it('returns a 500 and leaves fx.json alone when no feed answers', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')))
      const { fs, handler } = await load()

      const result = await handler.getfx()

      expect(result.statusCode).toBe(500)
      expect(JSON.parse(result.body)).toEqual({ error: 'Unable to refresh fx rates' })
      expect(fs.writeFileSync).not.toHaveBeenCalled()
      vi.unstubAllGlobals()
    })
  })
})
