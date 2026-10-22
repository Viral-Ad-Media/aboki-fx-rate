import React, { useMemo, useState } from 'react'
import { ArrowLeftRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CurrencyPicker from './CurrencyPicker'
import { currencyName, HOME } from '@/lib/rates'
import { formatUpdated } from '@/lib/format'
import { useRates } from './RatesContext'
import { formatAmount } from '@/lib/format'

const parse = text => {
  const n = Number.parseFloat(String(text).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/**
 * The live thing. A working converter at real size: type an amount, pick two currencies, swap.
 * The result updates on every keystroke with no animation; typing is a hundreds-a-day action.
 */
export default function Converter({ id = 'converter' }) {
  const { rate, updatedAt } = useRates()
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState(HOME)
  const [amount, setAmount] = useState('100')

  const value = parse(amount)
  const fromTo = useMemo(() => rate(from, to), [rate, from, to])
  const toFrom = fromTo ? 1 / fromTo : null
  const result = fromTo === null ? null : value * fromTo

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <section
      id={id}
      data-ui
      aria-label="Currency converter"
      className="w-full bg-ground-2 p-4 text-ink sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <CurrencyPicker id={`${id}-from`} label="From" value={from} onChange={setFrom} />
        <div className="flex items-end justify-center">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={swap}
            aria-label={`Swap ${from} and ${to}`}
            className="h-11 w-11"
          >
            <ArrowLeftRightIcon />
          </Button>
        </div>
        <CurrencyPicker id={`${id}-to`} label="To" value={to} onChange={setTo} />
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor={`${id}-amount`} className="text-[13px] text-ink-soft">
          Amount in {currencyName(from)}
        </label>
        <Input
          id={`${id}-amount`}
          inputMode="decimal"
          autoComplete="off"
          value={amount}
          onChange={event => setAmount(event.target.value)}
          onFocus={event => event.target.select()}
          className="h-14 text-[clamp(1.5rem,2.4vw,2rem)]! tabular md:text-[clamp(1.5rem,2.4vw,2rem)]!"
          aria-describedby={`${id}-result`}
        />
      </div>

      <div id={`${id}-result`} className="mt-6" aria-live="polite">
        <p className="text-[16px] text-ink-soft">
          {formatAmount(value)} {from} is
        </p>
        <p className="mt-1 text-[clamp(2.5rem,5.2vw,4.5rem)] leading-none tracking-[-0.03em] tabular">
          {result === null ? '—' : formatAmount(result)}{' '}
          <span className="text-[0.4em] text-brand">{to}</span>
        </p>
        <dl className="mt-5 grid grid-cols-1 gap-1 text-[16px] text-ink-soft sm:grid-cols-2">
          <div className="flex gap-2">
            <dt className="sr-only">Rate</dt>
            <dd className="tabular">
              1 {from} = {formatAmount(fromTo)} {to}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Inverse rate</dt>
            <dd className="tabular">
              1 {to} = {formatAmount(toFrom)} {from}
            </dd>
          </div>
        </dl>
        <p className="mt-4 max-w-[52ch] text-[13px] text-ink-soft">
          Mid-market rates{updatedAt ? `, updated ${formatUpdated(updatedAt)}` : ''}, for information only. Banks
          and bureaux de change quote a spread on top.
        </p>
      </div>
    </section>
  )
}
