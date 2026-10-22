// Live naira rates, fetched on the server from free, keyless sources. Pages call getLiveRates()
// in getStaticProps and pass the result to RatesProvider. Results are cached in memory for half
// an hour; when every source fails the last good result is served, and failing that null, which
// makes the UI fall back to the committed fx.json snapshot.
const currenciesJson = require('../supported-currencies.json')

const HOME = 'NGN'
const TTL_MS = 30 * 60 * 1000
// How often pages that show rates regenerate (ISR).
const REVALIDATE_SECONDS = 60 * 60
const TIMEOUT_MS = 6000
const known = new Set(Object.keys(currenciesJson.results || {}))

/** Turns { USD: 0.00065, ... } (units per one naira) into fx.json-shaped X_NGN pairs. */
const toPairs = perNaira => {
  const results = {}
  Object.entries(perNaira || {}).forEach(([raw, value]) => {
    const code = raw.toUpperCase()
    const n = Number(value)
    if (code === HOME || !known.has(code) || !Number.isFinite(n) || n <= 0) return
    results[`${code}_${HOME}`] = { id: `${code}_${HOME}`, fr: code, to: HOME, val: 1 / n }
  })
  return results
}

const getJson = async url => {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!response.ok) throw new Error(`${url} answered ${response.status}`)
  return response.json()
}

// In order of preference. Each returns { results, updatedAt } or throws.
const SOURCES = [
  {
    name: 'open.er-api.com',
    load: async () => {
      const data = await getJson('https://open.er-api.com/v6/latest/NGN')
      if (data.result !== 'success') throw new Error(`open.er-api.com: ${data['error-type'] || 'error'}`)
      return {
        results: toPairs(data.rates),
        updatedAt: new Date(data.time_last_update_unix * 1000).toISOString(),
      }
    },
  },
  {
    name: 'fawazahmed0/currency-api',
    load: async () => {
      const urls = [
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/ngn.json',
        'https://latest.currency-api.pages.dev/v1/currencies/ngn.json',
      ]
      let lastError
      for (const url of urls) {
        try {
          const data = await getJson(url)
          return { results: toPairs(data.ngn), updatedAt: new Date(`${data.date}T00:00:00Z`).toISOString() }
        } catch (error) {
          lastError = error
        }
      }
      throw lastError
    },
  },
]

// A result is only trusted when it quotes every headline currency at a sane rate.
const usable = results => ['USD', 'EUR', 'GBP'].every(code => results[`${code}_${HOME}`]?.val > 0)

let cache = null

/**
 * Latest rates as { results, updatedAt, source }, or null when nothing live has ever loaded.
 * `now` is injectable for tests.
 */
const getLiveRates = async (now = Date.now()) => {
  if (cache && now - cache.fetchedAt < TTL_MS) return cache.value

  for (const source of SOURCES) {
    try {
      const { results, updatedAt } = await source.load()
      if (!usable(results)) throw new Error(`${source.name}: missing headline currencies`)
      const value = { results, updatedAt, source: source.name }
      cache = { value, fetchedAt: now }
      return value
    } catch (error) {
      console.error('Unable to load live rates', error.message || error)
    }
  }

  return cache ? cache.value : null
}

const resetLiveRatesCache = () => {
  cache = null
}

module.exports = { getLiveRates, resetLiveRatesCache, TTL_MS, REVALIDATE_SECONDS }
