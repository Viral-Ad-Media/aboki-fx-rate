import React from 'react'
import Link from 'next/link'
import Layout from '@/components/site/Layout'
import Reveal from '@/components/site/Reveal'
import { NewsCard } from '@/components/site/NewsSection'
import { Button } from '@/components/ui/button'
import { docAPI } from '@/api'
import { NEWS_URL } from '@/config'
import { plainText } from '@/lib/format'

const meta = {
  title: 'Nigerian newspapers | AbokiFX Rate',
  description: 'The latest Nigerian news, published by AbokiFX Rate beside the daily naira rate.',
}

const PAGE_SIZE = 12

export default function NewsIndex({ posts, page, totalPages }) {
  const [lead, ...rest] = posts
  const leadImage = lead && lead.data && lead.data.og_image && lead.data.og_image.url

  return (
    <Layout meta={meta}>
      {/* First screen: the newest story carries the page, large, with the title in the page's h1. */}
      <section className="frame grid grid-cols-1 gap-8 pb-16 pt-10 md:grid-cols-12 md:gap-6 md:pb-24 md:pt-16" aria-labelledby="news-h1">
        <div className="md:col-span-5">
          <h1 id="news-h1" className="lines text-[clamp(2.5rem,5.6vw,5.25rem)]">
            <span className="line">
              <span data-line style={{ '--i': 0 }}>Nigerian newspapers,</span>
            </span>
            <span className="line">
              <span data-line style={{ '--i': 1 }}>on one page.</span>
            </span>
          </h1>
          {lead ? (
            <div data-load style={{ '--d': '420ms' }} className="mt-8">
              <p className="text-[16px] text-ink-soft">Latest</p>
              <h2 className="mt-2 max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1]">
                <Link href={`/${NEWS_URL}/${lead.uid}`} data-link>
                  {plainText(lead.data.title) || 'Untitled'}
                </Link>
              </h2>
              {plainText(lead.data.og_description) ? (
                <p className="mt-4 max-w-[44ch] text-[16px] text-ink-soft">{plainText(lead.data.og_description)}</p>
              ) : null}
              <Button render={<Link href={`/${NEWS_URL}/${lead.uid}`} />} nativeButton={false} size="lg" className="mt-6 rounded-none">
                Read the story
              </Button>
            </div>
          ) : (
            <p data-load style={{ '--d': '420ms' }} className="mt-8 max-w-[40ch] text-[length:var(--step-lead)] leading-[1.35] text-ink-soft">
              The newsroom is not answering right now. Stories will appear here once it does.
            </p>
          )}
        </div>
        <div data-load style={{ '--d': '360ms' }} className="md:col-span-7">
          {leadImage ? (
            <Link href={`/${NEWS_URL}/${lead.uid}`} tabIndex={-1} aria-hidden="true" className="block overflow-clip bg-ground-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={leadImage} alt="" width={1400} height={900} className="aspect-[14/9] h-auto w-full object-cover" fetchPriority="high" />
            </Link>
          ) : (
            <div className="aspect-[14/9] w-full bg-ground-2" />
          )}
        </div>
      </section>

      {rest.length ? (
        <Reveal as="section" aria-label="More stories" className="frame grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-6 md:gap-y-16">
          {rest.map((post, i) => (
            <div key={post.id} data-part style={{ '--n': i % 2 }}>
              <NewsCard post={post} />
            </div>
          ))}
        </Reveal>
      ) : null}

      {totalPages > 1 ? (
        <nav className="frame mt-16 flex items-center justify-between" aria-label="Pages">
          <Button
            render={<Link href={page > 1 ? `/${NEWS_URL}?page=${page - 1}` : '#'} />}
            nativeButton={false}
            variant="outline"
            disabled={page <= 1}
            className="rounded-none"
          >
            Newer
          </Button>
          <span className="text-[16px] text-ink-soft tabular">
            Page {page} of {totalPages}
          </span>
          <Button
            render={<Link href={page < totalPages ? `/${NEWS_URL}?page=${page + 1}` : '#'} />}
            nativeButton={false}
            variant="outline"
            disabled={page >= totalPages}
            className="rounded-none"
          >
            Older
          </Button>
        </nav>
      ) : null}
    </Layout>
  )
}

NewsIndex.getInitialProps = async ({ query }) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1)
  const response = await docAPI({ pageSize: PAGE_SIZE, page }, 'news')
  return {
    posts: (response && response.results) || [],
    page,
    totalPages: (response && response.total_pages) || 1,
  }
}
