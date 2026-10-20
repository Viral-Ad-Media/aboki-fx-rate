import React, { useState } from 'react'
import Layout from '@/components/site/Layout'
import PageIntro from '@/components/site/PageIntro'
import Reveal from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MAILCHIMP_URL, SOCIAL } from '@/config'

const meta = {
  title: 'Contact AbokiFX Rate',
  description: 'How to reach AbokiFX Rate, and where to follow the daily naira rate.',
}

/**
 * The subscribe form posts straight to Mailchimp's embedded-form endpoint when MAILCHIMP_URL is
 * set in config.js. Until then it explains what it would do instead of pretending to send.
 */
function Subscribe() {
  const [email, setEmail] = useState('')
  const live = Boolean(MAILCHIMP_URL)

  return (
    <form
      data-ui
      action={live ? MAILCHIMP_URL : undefined}
      method="post"
      target={live ? '_blank' : undefined}
      onSubmit={event => {
        if (!live) event.preventDefault()
      }}
      className="bg-ground-2 p-6 md:p-8"
    >
      <h2 className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1]">Get the rate by email</h2>
      <p className="mt-3 max-w-[40ch] text-[16px] text-ink-soft">
        One message when the board changes. No marketing, unsubscribe any time.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <Input
          id="subscribe-email"
          type="email"
          name="EMAIL"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          className="h-12 flex-1 text-base md:text-base"
        />
        <Button type="submit" size="lg" className="h-12 rounded-none" disabled={!live}>
          {live ? 'Subscribe' : 'Coming soon'}
        </Button>
      </div>
      {!live ? (
        <p className="mt-3 text-[13px] text-ink-soft">The mailing list is being set up; follow us on X for now.</p>
      ) : null}
    </form>
  )
}

export default function ContactPage() {
  return (
    <Layout meta={meta}>
      <PageIntro
        lines={['Talk to us', 'about the rate.']}
        lead="Questions about a figure on the board, a story in the news section, or a currency you would like us to quote: the quickest way to reach us is on X."
      />
      <Reveal as="section" aria-label="Ways to reach AbokiFX Rate" className="frame grid grid-cols-1 gap-10 md:grid-cols-12">
        <div data-part style={{ '--n': 0 }} className="md:col-span-5">
          <h2 className="text-[18px] text-ink-soft">Follow the rate</h2>
          <ul className="mt-4 flex flex-col gap-3 text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1]">
            <li>
              <a href={SOCIAL.twitter} data-link target="_blank" rel="noopener noreferrer">
                X · @AbokifxR
              </a>
            </li>
            <li>
              <a href={SOCIAL.facebook} data-link target="_blank" rel="noopener noreferrer">
                Facebook · AbokiFX Rate
              </a>
            </li>
          </ul>
          <p className="mt-8 max-w-[40ch] text-[16px] text-ink-soft">
            We publish rates and news only. We do not buy or sell currency, and we cannot quote you a
            personal rate.
          </p>
        </div>
        <div data-part style={{ '--n': 1 }} className="md:col-span-6 md:col-start-7">
          <Subscribe />
        </div>
      </Reveal>
    </Layout>
  )
}
