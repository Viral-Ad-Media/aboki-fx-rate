import React, { createContext, useContext, useMemo } from 'react'
import { createRates, snapshot } from '@/lib/rates'

const RatesContext = createContext(snapshot)

/**
 * Hands the rates a page fetched in getStaticProps to every component beneath it.
 * `fx` is `{ results, updatedAt, source, sourceUrl }`; without one, the committed snapshot applies.
 */
export function RatesProvider({ fx, children }) {
  const rates = useMemo(() => (fx && fx.results ? createRates(fx.results, fx) : snapshot), [fx])
  return <RatesContext.Provider value={rates}>{children}</RatesContext.Provider>
}

/** The rate helpers for the current page: codes, rate(), rateToNGN(), boardByRegion(), ... */
export const useRates = () => useContext(RatesContext)
