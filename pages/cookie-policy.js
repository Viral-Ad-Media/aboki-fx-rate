import React from 'react'
import LegalPage from '@/components/site/LegalPage'

const meta = {
  title: 'Cookie policy | AbokiFX Rate',
  description: 'Which cookies AbokiFX Rate and its partners set, and how to control them.',
}

const sections = [
  {
    title: 'Cookies we set',
    paragraphs: ['None of our own. The converter and the rate board run entirely in your browser and remember nothing between visits.'],
  },
  {
    title: 'Cookies our partners set',
    paragraphs: [
      'Google Analytics and Google Tag Manager measure traffic. Google AdSense and Facebook Pixel measure and personalise advertising. Each sets its own cookies under its own policy.',
    ],
  },
  {
    title: 'Controlling them',
    paragraphs: [
      'Every browser lets you block or delete cookies in its settings. Blocking them does not affect the converter or the rate board.',
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage
      meta={meta}
      lines={['Cookies,', 'in plain words.']}
      lead="We set no cookies of our own. Our analytics and advertising partners set theirs, and your browser can block them."
      sections={sections}
    />
  )
}
