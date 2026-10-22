import React from 'react'
import Layout from '@/components/site/Layout'
import Hero from '@/components/site/Hero'
import Ticker from '@/components/site/Ticker'
import Remittance from '@/components/site/Remittance'
import RateBands from '@/components/site/RateBands'
import CurrencyBoard from '@/components/site/CurrencyBoard'
import NewsSection from '@/components/site/NewsSection'
import Faq from '@/components/site/Faq'
import { docAPI } from '@/api'
import { ratesForPage } from '@/lib/rates-props'

const meta = {
  title: 'AbokiFX Rate | Your daily Naira exchange rate',
  description:
    'Aboki FX live daily Naira to Dollar exchange rates. AbokiFX daily dollar rate, Naira to Euro, Naira to Pounds, with a currency converter for 150+ currencies.',
}

export default function Home({ posts }) {
  return (
    <Layout meta={meta}>
      <Hero />
      <Ticker />
      <Remittance />
      <RateBands />
      <CurrencyBoard />
      <NewsSection posts={posts} />
      <Faq />
    </Layout>
  )
}

// Built once, then regenerated in the background after `revalidate` seconds (ISR on Vercel),
// so the rates and the latest posts stay current without a redeploy. If the rate feeds are
// down the page falls back to the committed snapshot and retries sooner.
export async function getStaticProps() {
  const [response, { fx, revalidate }] = await Promise.all([docAPI({ pageSize: 3 }, 'news'), ratesForPage()])
  return {
    props: { posts: (response && response.results) || [], fx },
    revalidate,
  }
}
