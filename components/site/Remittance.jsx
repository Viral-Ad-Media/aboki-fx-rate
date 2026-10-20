import React, { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import Reveal from './Reveal'
import { rateToNGN } from '@/lib/rates'
import { formatAmount, formatCompact } from '@/lib/format'

const MIN = 100
const MAX = 10000
const STEP = 50

/**
 * Stats blueprint "Figure set by a slider": the number is the visitor's own.
 * Question top-left, one real control under it, the result large at the bottom-left, the
 * working-out sentence on its baseline at the right. The figure recalculates on every input.
 */
export default function Remittance() {
  const [usd, setUsd] = useState(1000)
  const usdRate = rateToNGN('USD')
  const naira = usdRate ? usd * usdRate : null

  return (
    <Reveal
      as="section"
      manner="settle"
      aria-labelledby="remit-title"
      className="frame flex min-h-[84svh] lg:min-h-[88svh] flex-col justify-between bg-ground-2 py-16 md:py-20"
    >
      <div data-part style={{ '--n': 0 }}>
        <h2 id="remit-title" className="text-[clamp(2.25rem,4vw,3.25rem)]">
          Sending dollars home?
        </h2>
        <div data-ui className="mt-7 w-full max-w-[400px]">
          <div className="mb-3 flex items-baseline justify-between text-[16px]">
            <label htmlFor="remit-slider" className="text-ink-soft">
              Amount in US dollars
            </label>
            <output htmlFor="remit-slider" className="tabular">
              ${formatCompact(usd)}
            </output>
          </div>
          <Slider
            id="remit-slider"
            min={MIN}
            max={MAX}
            step={STEP}
            value={usd}
            onValueChange={value => setUsd(Array.isArray(value) ? value[0] : value)}
            aria-label="Amount in US dollars"
            className="[&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-track]]:h-1.5"
          />
          <div className="mt-2 flex justify-between text-[13px] text-ink-soft tabular">
            <span>${formatCompact(MIN)}</span>
            <span>${formatCompact(MAX)}</span>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
        <p data-part style={{ '--n': 1 }} className="lg:col-span-12">
          <span className="block text-[clamp(3.25rem,16vw,20rem)] font-medium leading-[0.85] tracking-[-0.04em] tabular lg:text-[clamp(7rem,13vw,13.5rem)]">
            <span className="text-brand">₦</span>
            {formatCompact(naira)}
          </span>
          <span className="sr-only">naira</span>
        </p>
        <p data-part style={{ '--n': 2 }} className="max-w-[30ch] text-[16px] leading-[1.45] text-ink lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          Your amount times the mid-market dollar rate of ₦{formatAmount(usdRate)}. Banks and abokis
          quote a spread on top, so expect a little less.
        </p>
      </div>
    </Reveal>
  )
}
