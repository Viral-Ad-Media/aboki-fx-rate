import React from 'react'
import Converter from './Converter'
import { useRates } from '@/lib/rates-context'

/**
 * Hero, direction "the product performs": a short left-aligned headline, one sentence, and the
 * product doing its job at real size for the rest of the first screen.
 * Signature move: the two headline lines rise from behind their baselines on load.
 */
export default function Hero() {
  const { currencyCount } = useRates()
  return (
    <section className="frame grid grid-cols-1 gap-10 pb-20 pt-10 lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-16" aria-labelledby="hero-title">
      <div className="lg:col-span-5">
        <h1 id="hero-title" className="lines text-[clamp(2.5rem,5.6vw,5.25rem)]">
          <span className="line">
            <span data-line style={{ '--i': 0 }}>Naira rates,</span>
          </span>
          <span className="line">
            <span data-line style={{ '--i': 1 }}>in your hand.</span>
          </span>
        </h1>
        <p data-load style={{ '--d': '420ms' }} className="mt-8 max-w-[38ch] text-[length:var(--step-lead)] leading-[1.35] text-ink">
          Mid-market rates for {currencyCount} currencies against the Nigerian naira, in a converter that
          answers as you type.
        </p>
        <p data-load style={{ '--d': '480ms' }} className="mt-5 hidden max-w-[40ch] text-[16px] text-ink-soft lg:block">
          Aboki is Hausa for friend, and the name Nigerians give the street traders whose chalked
          board sets the rate. This is that board, kept online.
        </p>
      </div>
      <div data-load style={{ '--d': '360ms' }} className="lg:col-span-7 lg:pl-6">
        <Converter />
        <p data-load style={{ '--d': '480ms' }} className="mt-6 max-w-[40ch] text-[16px] text-ink-soft lg:hidden">
          Aboki is Hausa for friend, and the name Nigerians give the street traders whose chalked
          board sets the rate. This is that board, kept online.
        </p>
      </div>
    </section>
  )
}
