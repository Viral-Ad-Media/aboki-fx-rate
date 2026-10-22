const nf = (min, max) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: min, maximumFractionDigits: max })

/** Money-ish figure: 2 decimals for normal values, more for tiny rates. */
export const formatAmount = (value, decimals) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'
  if (decimals !== undefined) return nf(decimals, decimals).format(value)
  const abs = Math.abs(value)
  if (abs === 0) return '0.00'
  if (abs < 0.01) return nf(4, 6).format(value)
  if (abs < 1) return nf(4, 4).format(value)
  return nf(2, 2).format(value)
}

export const formatNaira = value => `₦${formatAmount(value)}`

export const formatCompact = value => {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value)
}

export const plainText = field => {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (Array.isArray(field)) return field.map(block => block.text || '').join(' ').trim()
  return ''
}

/** When the rates were published, in UTC so server and browser render the same text. */
export const formatUpdated = iso => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date)
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }).format(date)
  return `${day}, ${time} UTC`
}
