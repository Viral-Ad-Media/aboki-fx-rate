import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useRates } from '@/lib/rates-context'

const questionsFor = currencyCount => [
  {
    q: 'What is the aboki rate?',
    a: 'The rate quoted by the street bureau-de-change traders Nigerians call abokis. It is the parallel-market price of foreign currency in naira, and it usually sits above the official bank rate.',
  },
  {
    q: 'Where do these rates come from?',
    a: `A public mid-market currency feed, fetched by the site every hour. Every one of the ${currencyCount} currencies is quoted as the mid-market price of one unit in naira.`,
  },
  {
    q: 'Why is my bank quoting something different?',
    a: 'A mid-market rate is the midpoint between what buyers and sellers quote. Banks, transfer apps and abokis add a spread on each side of it, so the figure you get is a little worse than the one on this page.',
  },
  {
    q: 'How often does the board change?',
    a: 'The feed publishes once a day and the site picks it up within the hour. The board is not a live tick-by-tick quote; treat it as the day’s reference.',
  },
  {
    q: 'Can I convert between two foreign currencies?',
    a: 'Yes. Pick any two of the currencies in the converter. When there is no direct pair we derive the rate through the naira, since every currency on the board is quoted against it.',
  },
  {
    q: 'Is AbokiFX Rate a bureau de change?',
    a: 'No. We publish rates and news; we do not buy or sell currency. The site is for information only, and nothing on it is financial advice.',
  },
]

/**
 * FAQ blueprint "Question index, one answer": all questions at one size on the left, each with a
 * dot that takes the accent when selected; the selected answer large in a sticky pane on the right.
 * Selection follows hover, click and keyboard focus; the pane crossfades in 150ms.
 * On a phone the tapped question opens its answer directly beneath it.
 */
export default function Faq() {
  const { currencyCount } = useRates()
  const QUESTIONS = questionsFor(currencyCount)
  const [index, setIndex] = useState(0)
  const [switching, setSwitching] = useState(false)
  const [shown, setShown] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (index === shown) return undefined
    setSwitching(true)
    timer.current = setTimeout(() => {
      setShown(index)
      setSwitching(false)
    }, 150)
    return () => clearTimeout(timer.current)
  }, [index, shown])

  return (
    <Reveal as="section" aria-labelledby="faq-title" className="frame mt-28 grid grid-cols-1 gap-10 md:mt-40 md:grid-cols-12">
      <div data-part style={{ '--n': 0 }} className="md:col-span-5">
        <h2 id="faq-title" className="text-[18px] text-ink-soft">
          Common questions
        </h2>
        <ul className="mt-[18px] flex flex-col gap-[18px]" role="list">
          {QUESTIONS.map((item, i) => {
            const selected = i === index
            return (
              <li key={item.q}>
                <button
                  type="button"
                  data-press
                  onMouseEnter={() => setIndex(i)}
                  onFocus={() => setIndex(i)}
                  onClick={() => setIndex(i)}
                  aria-expanded={selected}
                  aria-controls={`faq-answer-${i}`}
                  className={`flex w-full items-baseline gap-3 text-left text-[18px] leading-[1.35] transition-colors duration-[var(--t-hover)] ${
                    selected ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[2px] inline-block size-2 shrink-0 rounded-full transition-colors duration-[var(--t-hover)] ${
                      selected ? 'bg-brand' : 'bg-ink-soft'
                    }`}
                  />
                  <span>{item.q}</span>
                </button>
                {/* Phone: the answer opens beneath its question. */}
                <p
                  id={`faq-answer-${i}`}
                  hidden={!selected}
                  className="mt-3 pl-5 text-[length:var(--step-lead)] leading-[1.35] text-ink md:hidden"
                >
                  {item.a}
                </p>
              </li>
            )
          })}
        </ul>
      </div>

      <div data-part style={{ '--n': 1 }} className="hidden md:col-span-6 md:col-start-7 md:block">
        <div className="sticky top-[120px]">
          <p
            className="faq-answer max-w-[30ch] text-[length:var(--step-lead)] leading-[1.3]"
            data-switching={switching}
            aria-live="polite"
          >
            {QUESTIONS[shown].a}
          </p>
        </div>
      </div>
    </Reveal>
  )
}
