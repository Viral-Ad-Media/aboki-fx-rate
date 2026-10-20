import React from 'react'
import LegalPage from '@/components/site/LegalPage'

const meta = {
  title: 'Legal | AbokiFX Rate',
  description: 'Terms of use for AbokiFX Rate.',
}

const sections = [
  {
    title: 'Information only',
    paragraphs: [
      'Every rate on this site is a mid-market reference for information. It is not an offer to buy or sell currency, not a quote you can transact at, and not financial advice.',
    ],
  },
  {
    title: 'Accuracy',
    paragraphs: [
      'Rates come from a third-party data feed and are published as a snapshot. We take care over them but cannot guarantee they are current or error-free, and we accept no liability for decisions made on them.',
    ],
  },
  {
    title: 'Content',
    paragraphs: [
      'News articles are published from our newsroom and remain the copyright of their authors. The site’s design and code are copyright AbokiFX Rate.',
    ],
  },
]

export default function LegalPageRoute() {
  return (
    <LegalPage
      meta={meta}
      lines={['The rate is', 'for information.']}
      lead="Nothing on this site is a quote you can transact at, or advice. Read the three points below before relying on a figure."
      sections={sections}
    />
  )
}
