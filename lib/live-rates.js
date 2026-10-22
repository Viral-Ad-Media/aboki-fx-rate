// Live naira rates, fetched server-side (getStaticProps) and refreshed on a schedule.
// Two keyless public feeds are tried in order; both quote one naira in every other currency,
// which is inverted here into the `X_NGN` pairs the rest of the site has always used.
// When neither feed answers, the caller falls back to the committed fx.json snapshot.
const currenciesJson = require('../supported-currencies.json')

const HOME = 'NGN'
const REQUIRED = ['USD', 'EUR', 'GBP']
const TIMEOUT_MS = 8000

const known = currenciesJson.results || {}

const SOURCES = [
  {
    name: 'Exchange Rate API',
    url: 'https://open.er-api.com/v6/latest/NGN',
    homepage: 'https://www.exchangerate-api.com',
    parse: data => {
      if (!data || data.result !== 'success' || !data.rates) return null
      return {
        perNGN: data.rates,
        updatedAt: data.time_last_update_unix ? data.time_last_update_unix * 1000 : Date.now(),
      }
    },
  },
  {
    name: 'currency-api',
    url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/ngn.min.json',
    homepage: 'https://github.com/fawazahmed0/exchange-api',
    parse: data => {
      if (!data || !data.ngn) return null
      const perNGN = {}
      Object.entries(data.ngn).forEach(([code, value]) => {
        perNGN[code.toUpperCase()] = value
      })
      const updatedAt = data.date ? Date.parse(`${data.date}T00:00:00Z`) : NaN
      return { perNGN, updatedAt: Number.isFinite(updatedAt) ? updatedAt : Date.now() }
    },
  },
]

/** Turn "one naira buys N of X" into the site's `X_NGN` pairs, keeping only currencies we can name. */
const toPairs = perNGN => {
  const results = {}
  Object.entries(perNGN || {}).forEach(([code, perNaira]) => {
    const n = Number(perNaira)
    if (code === HOME || !known[code] || !Number.isFinite(n) || n <= 0) return
    results[`${code}_${HOME}`] = { id: `${code}_${HOME}`, fr: code, to: HOME, val: 1 / n }
  })
  results[`${HOME}_${HOME}`] = { id: `${HOME}_${HOME}`, fr: HOME, to: HOME, val: 1 }
  return results
}

const fetchJson = async url => {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`${url} answered ${response.status}`)
  return response.json()
}

/**
 * Fetch the latest rates from the first feed that answers.
 * @returns {Promise<null | { results: Record<string, {id: string, fr: string, to: string, val: number}>, updatedAt: number, source: string, sourceUrl: string }>}
 */
const fetchLiveRates = async () => {
  for (const source of SOURCES) {
    try {
      const parsed = source.parse(await fetchJson(source.url))
      if (!parsed) throw new Error('unexpected response shape')
      const results = toPairs(parsed.perNGN)
      const missing = REQUIRED.filter(code => !results[`${code}_${HOME}`])
      if (missing.length) throw new Error(`no rate for ${missing.join(', ')}`)
      return { results, updatedAt: parsed.updatedAt, source: source.name, sourceUrl: source.homepage }
    } catch (error) {
      console.error(`Live rates from ${source.name} failed:`, error && error.message ? error.message : error)
    }
  }
  return null
}

module.exports = { fetchLiveRates, toPairs, SOURCES }
