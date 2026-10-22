// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Converter from '@/components/site/Converter'
import { RatesProvider } from '@/components/site/RatesContext'
import { rate } from '@/lib/rates'
import { formatAmount } from '@/lib/format'

// The currency picker is a Base UI combobox that needs a full browser; stub it with a plain
// <select> so the test exercises the converter's own maths and state.
vi.mock('@/components/site/CurrencyPicker', () => ({
  default: ({ id, label, value, onChange }) => (
    <label>
      {label}
      <select id={id} value={value} onChange={e => onChange(e.target.value)}>
        {['USD', 'EUR', 'GBP', 'NGN'].map(code => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </label>
  ),
}))

describe('Converter', () => {
  it('converts 100 USD to naira on first render', () => {
    render(<Converter />)
    const result = screen.getByText(/^100\.00 USD is$/).nextElementSibling
    expect(result).toHaveTextContent(`${formatAmount(100 * rate('USD', 'NGN'))} NGN`)
  })

  it('recomputes as the amount changes and ignores junk characters', () => {
    render(<Converter />)
    const amount = screen.getByLabelText(/Amount in/)
    fireEvent.change(amount, { target: { value: '2,500abc' } })
    expect(screen.getByText(/^2,500\.00 USD is$/)).toBeInTheDocument()
    const result = screen.getByText(/^2,500\.00 USD is$/).nextElementSibling
    expect(result).toHaveTextContent(`${formatAmount(2500 * rate('USD', 'NGN'))} NGN`)
  })

  it('treats an empty amount as zero', () => {
    render(<Converter />)
    fireEvent.change(screen.getByLabelText(/Amount in/), { target: { value: '' } })
    const result = screen.getByText(/^0\.00 USD is$/).nextElementSibling
    expect(result).toHaveTextContent('0.00 NGN')
  })

  it('swaps the two currencies', () => {
    render(<Converter />)
    fireEvent.click(screen.getByRole('button', { name: 'Swap USD and NGN' }))
    expect(screen.getByRole('button', { name: 'Swap NGN and USD' })).toBeInTheDocument()
    expect(screen.getByText(/Amount in Nigerian Naira/)).toBeInTheDocument()
    const result = screen.getByText(/^100\.00 NGN is$/).nextElementSibling
    expect(result).toHaveTextContent(`${formatAmount(100 * rate('NGN', 'USD'))} USD`)
  })

  it('derives a cross rate when neither side is the naira', () => {
    render(<Converter />)
    fireEvent.change(screen.getByLabelText('To'), { target: { value: 'EUR' } })
    const result = screen.getByText(/^100\.00 USD is$/).nextElementSibling
    expect(result).toHaveTextContent(`${formatAmount(100 * rate('USD', 'EUR'))} EUR`)
  })

  it('uses the live rates from RatesProvider and says when they were published', () => {
    const live = {
      results: { USD_NGN: { val: 1500 }, EUR_NGN: { val: 1700 }, GBP_NGN: { val: 2000 } },
      updatedAt: '2026-10-22T00:02:01.000Z',
      source: 'test',
    }
    render(
      <RatesProvider live={live}>
        <Converter />
      </RatesProvider>
    )
    const result = screen.getByText(/^100\.00 USD is$/).nextElementSibling
    expect(result).toHaveTextContent(`${formatAmount(150000)} NGN`)
    expect(screen.getByText(/updated 22 Oct 2026, 00:02 UTC/)).toBeInTheDocument()
  })
})
