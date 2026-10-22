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
import { getLiveRates, REVALIDATE_SECONDS } from '@/lib/liveRates'

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

// Regenerated in the background at most every REVALIDATE_SECONDS, so visitors get a cached page
// with rates (and headlines) no older than that.
export async function getStaticProps() {
  const [response, rates] = await Promise.all([docAPI({ pageSize: 3 }, 'news'), getLiveRates()])
  return {
    props: { posts: (response && response.results) || [], rates },
    revalidate: REVALIDATE_SECONDS,
  }
}
