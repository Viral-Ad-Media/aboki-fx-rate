import React, { createContext, useContext, useMemo } from 'react'
import * as snapshot from '@/lib/rates'

const RatesContext = createContext({ ...snapshot, updatedAt: null, live: false })

/**
 * Hands the page's rates to every rate component. `live` is the value of getLiveRates() from the
 * page's props; without it (a page that fetched none, or every source failed) the committed
 * fx.json snapshot is used.
 */
export function RatesProvider({ live, children }) {
  const value = useMemo(() => {
    if (!live || !live.results) return { ...snapshot, updatedAt: null, live: false }
    return { ...snapshot, ...snapshot.createRates(live.results), updatedAt: live.updatedAt, live: true }
  }, [live])
  return <RatesContext.Provider value={value}>{children}</RatesContext.Provider>
}

export const useRates = () => useContext(RatesContext)
