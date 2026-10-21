import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createRequire } from 'node:module'

// handler.js is CommonJS and reads the API key at require time, so each test loads a fresh copy.
// It requires axios and fs natively, so the test spies on the same instances via createRequire
// instead of vi.mock, which only intercepts transformed imports.
const require = createRequire(import.meta.url)
const axios = require('axios')
const fs = require('fs')
const actualRead = fs.readFileSync

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

    it('getfx fails with a 500 and calls nothing', async () => {
      const { axios, fs, handler } = await load()
      const result = await handler.getfx()
      expect(result.statusCode).toBe(500)
      expect(JSON.parse(result.body)).toEqual({ error: 'Unable to refresh fx rates' })
      expect(axios.get).not.toHaveBeenCalled()
      expect(fs.writeFileSync).not.toHaveBeenCalled()
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

    it('getfx queries currencies in pairs against the naira and merges the results', async () => {
      const { axios, fs, handler } = await load()
      fs.readFileSync.mockImplementation((path, ...rest) => {
        if (path === 'supported-currencies.json') {
          return JSON.stringify({ results: { USD: {}, EUR: {}, GBP: {} } })
        }
        return actualRead(path, ...rest)
      })
      axios.get.mockImplementation(async url => {
        const q = decodeURIComponent(new URL(url).searchParams.get('q'))
        const results = {}
        q.split(',').forEach(pair => {
          results[pair] = { id: pair, val: pair === 'USD_NGN' ? 360 : pair === 'EUR_NGN' ? 400 : 1, fr: pair.split('_')[0], to: 'NGN' }
        })
        return { data: { results } }
      })

      const result = await handler.getfx()

      expect(result.statusCode).toBe(200)
      expect(axios.get).toHaveBeenCalledTimes(2)
      expect(axios.get.mock.calls.map(c => decodeURIComponent(new URL(c[0]).searchParams.get('q')))).toEqual([
        'USD_NGN,EUR_NGN',
        'GBP_NGN,NGN_NGN',
      ])

      const [file, contents] = fs.writeFileSync.mock.calls[0]
      expect(file).toBe('fx.json')
      const written = JSON.parse(contents)
      expect(written.results.USD_NGN.val).toBe(360)
      expect(written.results.EUR_NGN.val).toBe(400)
      expect(Object.keys(written.results).sort()).toEqual(['EUR_NGN', 'GBP_NGN', 'NGN_NGN', 'USD_NGN'])
      expect(JSON.parse(result.body)).toEqual({ updated: 4 })
    })

    it('getfx returns a 500 and leaves fx.json alone when the API fails', async () => {
      const { axios, fs, handler } = await load()
      axios.get.mockRejectedValue(new Error('boom'))

      const result = await handler.getfx()

      expect(result.statusCode).toBe(500)
      expect(fs.writeFileSync).not.toHaveBeenCalled()
    })
  })
})
