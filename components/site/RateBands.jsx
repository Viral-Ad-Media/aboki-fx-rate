import React, { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import Reveal from './Reveal'
import { HEADLINE, currencyName, currencySymbol } from '@/lib/rates'
import { useRates } from './RatesContext'
import { formatAmount } from '@/lib/format'

// Field colours are the naira notes: ₦1000 brown, ₦500 blue, ₦20 green, ₦10 red, ₦5 orange.
const FIELDS = ['bg-note-1000', 'bg-note-500', 'bg-note-20', 'bg-note-10', 'bg-note-5']

const NAMES = { USD: 'US dollar', EUR: 'euro', GBP: 'British pound', AED: 'UAE dirham', CAD: 'Canadian dollar' }

const article = name => (/^(euro|[AEIOU][a-z])/.test(name) ? 'an' : 'a')

/**
 * Features blueprint "Sentences with switches": five full-bleed bands, each one sentence that ends
 * in a working switch. Off, the band is the page ground and reads one way (one X buys ₦...).
 * On, the band fills with its note colour and the sentence flips to the inverse, with the
 * consequence in figures beneath. Two bands are on at load.
 */
export default function RateBands() {
  const { rateToNGN } = useRates()
  const [on, setOn] = useState(() => new Set(['USD', 'GBP']))

  const toggle = code => {
    setOn(prev => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  return (
    <Reveal as="section" manner="rows" aria-label="Headline rates against the naira" className="mt-24 md:mt-32">
      {HEADLINE.map((code, i) => {
        const ngn = rateToNGN(code)
        const inverse = ngn ? 1 / ngn : null
        const name = NAMES[code] || currencyName(code)
        const symbol = currencySymbol(code) || code
        const flipped = on.has(code)
        const sentence = flipped
          ? `One naira buys ${symbol}${formatAmount(inverse)}`
          : `One ${name} buys ₦${formatAmount(ngn)}`
        const consequence = flipped
          ? `₦100,000 is ${symbol}${formatAmount(inverse ? inverse * 100000 : null)}`
          : `${symbol}1,000 is ₦${formatAmount(ngn ? ngn * 1000 : null)}`

        return (
          <div
            key={code}
            data-part
            style={{ '--n': i }}
            className={`frame grid min-h-[132px] grid-cols-12 items-center gap-x-4 py-6 transition-colors duration-[var(--t-ui)] ease-[var(--ease-out)] md:min-h-[20vh] ${
              flipped ? `${FIELDS[i]} text-ink` : 'bg-ground text-ink-soft'
            }`}
          >
            <p className="col-span-9 col-start-1 row-start-1 text-[clamp(1.5rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.03em] tabular md:col-span-7">
              {sentence}
            </p>
            <p
              key={flipped ? 'on' : 'off'}
              className="col-span-12 row-start-2 mt-3 max-w-[32ch] text-[16px] leading-[1.4] md:col-span-4 md:row-start-auto md:mt-0 md:justify-self-end md:text-right"
              data-swap
            >
              {consequence}. {article(name) === 'an' ? 'An' : 'A'} {name} is {code}.
            </p>
            <div className="col-span-3 col-start-10 row-start-1 flex justify-end md:col-span-1 md:col-start-auto md:row-start-auto">
              <label data-ui className="flex min-h-11 min-w-11 cursor-pointer items-center justify-end gap-3">
                <span className="sr-only">Show {code} the other way round</span>
                <Switch
                  checked={flipped}
                  onCheckedChange={() => toggle(code)}
                  className="h-[1.1em] w-[2em] text-[clamp(1.25rem,2.2vw,2.25rem)] data-[size=default]:h-[1.1em] data-[size=default]:w-[2em] [&_[data-slot=switch-thumb]]:size-[0.9em]"
                />
              </label>
            </div>
          </div>
        )
      })}
    </Reveal>
  )
}
