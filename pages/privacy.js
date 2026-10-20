import React from 'react'
import LegalPage from '@/components/site/LegalPage'

const meta = {
  title: 'Privacy policy | AbokiFX Rate',
  description: 'How AbokiFX Rate handles the information it collects when you use the site.',
}

const sections = [
  {
    title: 'What we collect',
    paragraphs: [
      'The site itself stores nothing about you. Our analytics and advertising partners (Google Analytics, Google Tag Manager, Google AdSense and Facebook Pixel) set cookies and record page views, device type and approximate location in the usual way.',
      'If you join the mailing list, your email address is held by Mailchimp and used only to send you the rate.',
    ],
  },
  {
    title: 'How it is used',
    paragraphs: [
      'To understand which pages are read, to keep the site running, and to show advertising that pays for it. We do not sell personal information.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'You can block or clear cookies in your browser, opt out of Google advertising personalisation at adssettings.google.com, and unsubscribe from the mailing list with the link in any email.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      meta={meta}
      lines={['Your data,', 'and what we do with it.']}
      lead="The short version: the site keeps nothing of yours; our analytics and advertising partners set the usual cookies, and you can turn them off."
      sections={sections}
    />
  )
}
