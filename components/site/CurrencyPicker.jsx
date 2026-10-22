import React from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { useRates } from '@/lib/rates-context'

/**
 * One searchable currency control. 156 currencies, typed to filter; the value is the ISO code.
 * Shown inside the converter fragment (data-ui), so shadcn's own borders and radii apply.
 */
export default function CurrencyPicker({ id, label, value, onChange }) {
  const { currencyOptions } = useRates()
  const selected = currencyOptions.find(option => option.value === value) || null

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] text-ink-soft">
        {label}
      </label>
      <Combobox
        items={currencyOptions}
        value={selected}
        onValueChange={option => option && onChange(option.value)}
        itemToStringLabel={option => (option ? `${option.value} · ${option.label}` : '')}
        itemToStringValue={option => (option ? option.value : '')}
      >
        <ComboboxInput
          id={id}
          placeholder="Type a currency"
          className="h-11 w-full [&_input]:text-base"
          aria-label={label}
        />
        <ComboboxContent className="max-h-80">
          <ComboboxEmpty>No currency with that name.</ComboboxEmpty>
          <ComboboxList>
            {option => (
              <ComboboxItem key={option.value} value={option}>
                <span className="w-12 shrink-0 font-medium tabular">{option.value}</span>
                <span className="truncate text-ink-soft">{option.label}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
