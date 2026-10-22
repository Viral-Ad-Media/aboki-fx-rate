import React from 'react'
import { useRates } from '@/lib/rates-context'
import { formatAmount } from '@/lib/format'

/**
 * The site's own rate ticker, replacing the third-party exchangerates.org.uk iframe.
 * Constant motion is linear; it pauses on hover and focus and stands still under reduced motion.
 */
export default function Ticker({ className = '' }) {
  const { HEADLINE, codes, currencyName, rateToNGN } = useRates()
  const picks = [...HEADLINE, 'CNY', 'ZAR', 'GHS', 'INR', 'JPY', 'CHF', 'SAR', 'KES', 'XOF', 'EGP']
    .filter(code => codes.includes(code))
  const items = picks.map(code => ({ code, name: currencyName(code), ngn: rateToNGN(code) }))
  const track = [...items, ...items]

  return (
    <div className={`ticker bg-ground-2 ${className}`} aria-label="Mid-market rates against the naira">
      <ul className="ticker__track tabular text-[length:var(--step-small)]" role="list">
        {track.map((item, i) => (
          <li
            key={`${item.code}-${i}`}
            className="flex items-baseline gap-2 whitespace-nowrap px-5 py-2.5"
            aria-hidden={i >= items.length ? 'true' : undefined}
          >
            <span className="font-medium">{item.code}</span>
            <span className="text-ink-soft">{item.name}</span>
            <span className="text-brand">₦{formatAmount(item.ngn)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
