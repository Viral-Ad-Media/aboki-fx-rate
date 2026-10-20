import React from 'react'
import Link from 'next/link'
import Layout from '@/components/site/Layout'
import PageIntro from '@/components/site/PageIntro'
import Reveal from '@/components/site/Reveal'
import Ticker from '@/components/site/Ticker'
import { Button } from '@/components/ui/button'
import { NEWS_URL } from '@/config'
import { currencyCount, HEADLINE } from '@/lib/rates'

const meta = {
  title: 'About AbokiFX Rate',
  description: 'What AbokiFX Rate is, where its naira exchange rates come from, and how to use the converter.',
}

const CLAIMS = [
  {
    title: 'One board, every currency',
    body: `${currencyCount} currencies, each quoted as the mid-market price of one unit in naira. The five Nigerians ask for most, ${HEADLINE.join(', ')}, sit on the home page as bands you can flip.`,
  },
  {
    title: 'A converter that answers as you type',
    body: 'Pick any two currencies and an amount. Where no direct pair exists the rate is derived through the naira, since everything on the board is quoted against it.',
  },
  {
    title: 'The news beside the rate',
    body: 'A Nigerian newspapers section, published from our newsroom, so the stories that move the naira sit next to the figure they move.',
  },
  {
    title: 'Nothing added on top',
    body: 'We publish the mid-market rate and say so. Banks, transfer apps and street traders quote a spread either side of it; what you see here is the midpoint, for information only.',
  },
]

export default function AboutPage() {
  return (
    <Layout meta={meta}>
      <PageIntro
        lines={['The aboki’s board,', 'kept online.']}
        lead="Aboki is Hausa for friend, and the name Nigerians give the street traders whose chalked board sets the day’s rate. AbokiFX Rate puts that board on a page, with the figures behind it."
      />
      <Ticker />
      <Reveal as="section" aria-label="What AbokiFX Rate does" className="frame mt-20 grid grid-cols-1 gap-y-14 md:mt-28 md:grid-cols-12 md:gap-x-6">
        {CLAIMS.map((claim, i) => (
          <div
            key={claim.title}
            data-part
            style={{ '--n': i }}
            className={`md:col-span-5 ${i % 2 ? 'md:col-start-8' : 'md:col-start-1'}`}
          >
            <h2 className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1]">{claim.title}</h2>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.5] text-ink">{claim.body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal as="section" className="frame mt-24 md:mt-32">
        <div data-part className="flex flex-col gap-6 bg-ground-2 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="max-w-[28ch] text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1]">Try the converter with today’s board.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/#converter" />} nativeButton={false} size="lg" className="rounded-none">
              Open the converter
            </Button>
            <Button render={<Link href={`/${NEWS_URL}`} />} nativeButton={false} variant="outline" size="lg" className="rounded-none">
              Read the news
            </Button>
          </div>
        </div>
      </Reveal>
    </Layout>
  )
}
