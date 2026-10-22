// Rate data helpers. `createRates` builds the whole API over any `{ X_NGN: { val } }` map, so the
// pages can hand in the live rates they fetched (see lib/live-rates.js and lib/rates-context.jsx).
// The committed snapshot (fx.json, supported-currencies.json) is the fallback when no live data
// has been fetched, exactly as the old site worked.
const fxJson = require('../fx.json')
const currenciesJson = require('../supported-currencies.json')

const currencies = currenciesJson.results || {}

const HOME = 'NGN'
const HEADLINE = ['USD', 'EUR', 'GBP', 'AED', 'CAD']

const REGIONS = {
  Africa: 'AOA BIF BWP CDF CVE DJF DZD EGP ERN ETB GHS GMD GNF KES KMF LRD LSL LYD MAD MGA MRO MRU MUR MWK MZN NAD NGN RWF SCR SDG SHP SLL SLE SOS STD STN SZL TND TZS UGX XAF XOF ZAR ZMW ZWL',
  Europe: 'ALL AMD AZN BAM BGN BYN BYR CHF CZK DKK EUR GBP GEL GIP HRK HUF ISK LVL MDL MKD NOK PLN RON RSD RUB SEK TRY UAH',
  Americas: 'ANG ARS AWG BBD BOB BRL BSD BZD CAD CLP COP CRC CUP DOP FKP GTQ GYD HNL HTG JMD KYD MXN NIO PAB PEN PYG SRD TTD USD UYU VEF VES XCD',
  Asia: 'AFN BDT BND BTN CNY HKD IDR INR JPY KGS KHR KPW KRW KZT LAK LKR MMK MNT MOP MVR MYR NPR PHP PKR SGD THB TJS TMT TWD UZS VND',
  'Middle East': 'BHD ILS IQD IRR JOD KWD LBP OMR QAR SAR SYP YER',
  Oceania: 'AUD FJD NZD PGK SBD TOP VUV WST XPF',
  Other: 'BTC XDR',
}

const regionOf = {}
Object.entries(REGIONS).forEach(([region, codes]) => {
  codes.split(' ').forEach(code => {
    regionOf[code] = region
  })
})

const REGION_ORDER = ['Africa', 'Europe', 'Americas', 'Asia', 'Middle East', 'Oceania', 'Other']

const currencyName = code => (currencies[code] && currencies[code].currencyName) || code
const currencySymbol = code => (currencies[code] && currencies[code].currencySymbol) || ''

/**
 * Build the rate helpers over one set of `X_NGN` pairs.
 * @param {Record<string, { val: number }>} fxRates pairs keyed `X_NGN`
 * @param {{ updatedAt?: number|null, source?: string|null, sourceUrl?: string|null }} [info]
 */
const createRates = (fxRates = {}, info = {}) => {
  /** Rate of one unit of `code` in naira, or null. */
  const rateToNGN = code => {
    if (code === HOME) return 1
    const pair = fxRates[`${code}_${HOME}`]
    return pair && Number.isFinite(Number(pair.val)) && Number(pair.val) > 0 ? Number(pair.val) : null
  }

  /** Rate from -> to, derived through the naira when no direct pair exists. */
  const rate = (from, to) => {
    if (from === to) return 1
    const direct = fxRates[`${from}_${to}`]
    if (direct && direct.val) return Number(direct.val)
    const a = rateToNGN(from)
    const b = rateToNGN(to)
    if (!a || !b) return null
    return a / b
  }

  const codes = [
    ...new Set(
      Object.keys(fxRates)
        .filter(key => key.endsWith(`_${HOME}`) && rateToNGN(key.split('_')[0]) !== null)
        .map(key => key.split('_')[0])
        .concat(HOME)
    ),
  ].sort()

  const currencyOptions = codes.map(code => ({
    value: code,
    label: currencyName(code),
    symbol: currencySymbol(code),
  }))

  /** All quoted currencies grouped by region, each with its naira rate. */
  const boardByRegion = () => {
    const groups = {}
    codes
      .filter(code => code !== HOME)
      .forEach(code => {
        const region = regionOf[code] || 'Other'
        if (!groups[region]) groups[region] = []
        groups[region].push({
          code,
          name: currencyName(code),
          symbol: currencySymbol(code),
          ngn: rateToNGN(code),
          inverse: rateToNGN(code) ? 1 / rateToNGN(code) : null,
        })
      })
    Object.values(groups).forEach(list => list.sort((a, b) => a.name.localeCompare(b.name)))
    return REGION_ORDER.filter(r => groups[r]).map(region => ({ region, rows: groups[region] }))
  }

  return {
    HOME,
    HEADLINE,
    codes,
    currencyOptions,
    currencyName,
    currencySymbol,
    rateToNGN,
    rate,
    boardByRegion,
    currencyCount: codes.length - 1,
    updatedAt: info.updatedAt || null,
    source: info.source || null,
    sourceUrl: info.sourceUrl || null,
  }
}

/** The committed snapshot: what the UI shows until live rates have been fetched. */
const snapshot = createRates(fxJson.results || {}, { updatedAt: fxJson.updatedAt || null })

module.exports = {
  ...snapshot,
  createRates,
  snapshot,
}
