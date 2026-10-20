import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { NEWS_URL, SITE_NAME, SOCIAL } from '@/config'
import { NAV } from './Header'

function LagosTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-NG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Lagos',
        }).format(new Date())
      )
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="tabular" suppressHydrationWarning>
      {time || '—:—'}
    </span>
  )
}

/**
 * A footer of tiles: the last two rows of a board. Every cell used, 8px gaps, flat fills.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  const tile = 'flex flex-col justify-between p-5 bg-ground-2'

  return (
    <footer className="px-2 pb-2 pt-24 md:px-3 md:pb-3" aria-label="Footer">
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-12 md:gap-2">
        {/* Upper row */}
        <div className={`${tile} order-5 min-h-[180px] md:order-none md:col-span-4 md:min-h-[220px]`}>
          <p className="max-w-[22ch] text-[length:var(--step-lead)] leading-[1.25]">
            The naira, quoted against the world, with nothing added on top.
          </p>
          <p className="text-[length:var(--step-small)] text-ink-soft">
            {SITE_NAME} © {year}. Mid-market rates for information only.
          </p>
        </div>

        <nav className={`${tile} order-3 min-h-[180px] md:order-none md:col-span-3 md:min-h-[220px]`} aria-label="Footer">
          <ul className="flex flex-col gap-1.5 text-[16px]">
            {NAV.map(item => (
              <li key={item.href}>
                <Link href={item.href} lang={item.lang} data-link className="text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/privacy" data-link className="text-ink-soft">Privacy</Link>
            </li>
            <li>
              <Link href="/cookie-policy" data-link className="text-ink-soft">Cookies</Link>
            </li>
            <li>
              <Link href="/legal" data-link className="text-ink-soft">Legal</Link>
            </li>
          </ul>
        </nav>

        <div className={`${tile} order-6 min-h-[180px] md:order-none md:col-span-2 md:min-h-[220px]`}>
          <p className="text-[16px] text-ink-soft">Lagos</p>
          <p className="text-[length:var(--step-lead)]">
            <LagosTime /> <span className="text-[16px] text-ink-soft">WAT</span>
          </p>
        </div>

        <div className={`${tile} order-4 min-h-[180px] md:order-none md:col-span-3 md:min-h-[220px]`}>
          <p className="text-[16px] text-ink-soft">Follow the rate</p>
          <p className="flex flex-col gap-1 text-[length:var(--step-lead)] leading-tight">
            <a href={SOCIAL.twitter} data-link target="_blank" rel="noopener noreferrer">X · @AbokifxR</a>
            <a href={SOCIAL.facebook} data-link target="_blank" rel="noopener noreferrer">Facebook</a>
          </p>
        </div>

        {/* Lower row */}
        <div className="order-1 col-span-2 flex min-h-[160px] items-center justify-center bg-ink text-ground md:order-none md:col-span-8 md:min-h-[320px]">
          <p className="text-[clamp(2.75rem,9vw,8.5rem)] leading-none tracking-[-0.04em]" aria-hidden="true">
            Aboki<span className="text-brand">FX</span>
          </p>
        </div>

        <Link
          href={`/${NEWS_URL}`}
          data-press
          className="order-2 col-span-2 flex min-h-[160px] flex-col justify-between bg-brand p-5 text-brand-ink md:order-none md:col-span-4 md:min-h-[320px]"
        >
          <span className="max-w-[12ch] text-[length:var(--step-lead)] leading-[1.1]">Read the Nigerian news</span>
          <svg
            className="self-end"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <path d="M8 28h38M30 12l16 16-16 16" />
          </svg>
        </Link>
      </div>
    </footer>
  )
}
