const PRISMIC_API_URL = 'https://abokifxrate.cdn.prismic.io/api/v2'

const NEWS_URL = 'nigeriannews-nigeriannewspapers'

const SITE_NAME = 'AbokiFX Rate'

// Mailchimp embedded-form POST URL. The old site shipped a placeholder, so subscriptions never
// went anywhere; set the real "list-manage.com/subscribe/post" URL here to switch the form on.
const MAILCHIMP_URL = ''

const SOCIAL = {
  facebook: 'https://www.facebook.com/AbokiFx-Rate-305191360158341/',
  twitter: 'https://twitter.com/AbokifxR',
}

const DEFAULT_SEO = {
  title: 'AbokiFX Rate | Your Daily Naira Exchange Rate',
  description:
    'Aboki FX Live Daily Naira to Dollar Exchange Rates. AbokiFX Daily dollar rate,  Naira to Euro, Naira to Pounds, with live foreign exchange rate calculator on AbokiFX.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://abokifxrate.com',
    title: 'AbokiFX Rate | Your Daily Naira Exchange Rate',
    description:
      'Aboki FX Live Daily Naira to Dollar Exchange Rates. AbokiFX Daily dollar rate,  Naira to Euro, Naira to Pounds, with live foreign exchange rate calculator on AbokiFX.',
    image: '/static/assets/android-chrome-512x512.png',
    site_name: 'abokifxrate.com',
    imageWidth: 512,
    imageHeight: 512,
  },
  twitter: {
    handle: '@AbokifxR',
    cardType: 'summary_large_image',
  },
}

module.exports = { DEFAULT_SEO, PRISMIC_API_URL, NEWS_URL, SITE_NAME, MAILCHIMP_URL, SOCIAL }
