import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Reveal from './Reveal'
import { useRates } from '@/lib/rates-context'
import { formatUpdated } from '@/lib/format'
import { formatAmount } from '@/lib/format'

/**
 * List blueprint "Day tabs, banded agenda", with the whole rate board as its content:
 * a two-line heading with the one button on its row; region tabs stacked on the left as filled
 * blocks; the region's currencies on the right as alternating tone bands.
 */
export default function CurrencyBoard() {
  const { boardByRegion, currencyCount, updatedAt } = useRates()
  const groups = useMemo(() => boardByRegion(), [boardByRegion])
  const [region, setRegion] = useState(groups[0].region)

  return (
    <Reveal as="section" aria-labelledby="board-title" className="frame mt-28 md:mt-40">
      <div data-part style={{ '--n': 0 }} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="board-title" className="text-[clamp(2.25rem,4vw,3.25rem)]">
          <span className="block text-ink-soft">Every currency,</span>
          <span className="block">in naira.</span>
        </h2>
        <Button
          render={<a href="#converter" />}
          nativeButton={false}
          size="lg"
          className="w-full rounded-none md:w-auto"
        >
          Open the converter
        </Button>
      </div>

      <Tabs value={region} onValueChange={setRegion} className="mt-14 flex-col! gap-6 md:flex-row! md:items-start md:gap-10">
        <TabsList
          className="flex h-auto! w-auto flex-row flex-wrap gap-1.5 rounded-none bg-transparent p-0 md:w-[150px] md:shrink-0 md:flex-col md:flex-nowrap"
          aria-label="Regions"
        >
          {groups.map(group => (
            <TabsTrigger
              key={group.region}
              value={group.region}
              data-press
              className="h-14 w-auto grow flex-col items-start justify-center rounded-none border-0 bg-ground-2 px-4 text-left text-ink shadow-none! after:hidden data-active:bg-ink! data-active:text-ground! md:h-16 md:w-full"
            >
              <span className="text-[16px]">{group.region}</span>
              <span className="text-[13px] opacity-70 tabular">{group.rows.length} currencies</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map(group => (
          <TabsContent key={group.region} value={group.region} className="min-w-0 flex-1">
            <ol className="flex flex-col gap-1" aria-label={`${group.region} currencies against the naira`}>
              {group.rows.map((row, i) => (
                <li
                  key={row.code}
                  className={`grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 px-4 py-4 lg:min-h-[76px] lg:grid-cols-[6rem_1fr_11rem_9rem] lg:px-5 ${
                    i % 2 ? 'bg-ground-2' : 'bg-ground-3'
                  }`}
                >
                  <span className="text-[18px] font-medium tabular">{row.code}</span>
                  <span className="min-w-0 truncate text-[16px] text-ink">
                    {row.name}
                    <span className="block text-[13px] text-ink-soft lg:hidden">
                      ₦1 = {row.symbol}{formatAmount(row.inverse)}
                    </span>
                  </span>
                  <span className="text-right text-[18px] tabular">₦{formatAmount(row.ngn)}</span>
                  <span className="hidden text-right text-[13px] text-ink-soft tabular lg:block">
                    ₦1 = {row.symbol}{formatAmount(row.inverse)}
                  </span>
                </li>
              ))}
            </ol>
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-6 max-w-[60ch] text-[16px] text-ink-soft">
        {currencyCount} currencies, each quoted as the mid-market rate for one unit in naira. The
        board is refreshed from our rate feed every hour{updatedAt ? `; these rates are from ${formatUpdated(updatedAt)}` : ''}.
        It is a reference, not a live dealing quote.
      </p>
    </Reveal>
  )
}
