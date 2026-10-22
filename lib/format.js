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

/** The date a set of rates was published, in Lagos time: "22 Oct 2026". Stable between server and client. */
export const formatUpdated = timestamp => {
  if (!Number.isFinite(timestamp)) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' }).format(new Date(timestamp))
}
