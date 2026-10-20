import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { PrismicRichText } from '@prismicio/react'
import Layout from '@/components/site/Layout'
import Reveal from '@/components/site/Reveal'
import ShareLinks from '@/components/site/ShareLinks'
import { Button } from '@/components/ui/button'
import { newsPostAPI } from '@/api'
import { linkResolver } from '@/helpers'
import { DEFAULT_SEO, NEWS_URL } from '@/config'
import { plainText } from '@/lib/format'

const formatDate = iso => {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' }).format(new Date(iso))
}

const jsonLd = (info, post, url) => ({
  '@context': 'http://schema.org',
  '@type': 'NewsArticle',
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  headline: plainText(post.title) || plainText(post.og_title),
  image: post.og_image && post.og_image.url ? [post.og_image.url] : [],
  datePublished: info.first_publication_date,
  dateModified: info.last_publication_date || info.first_publication_date,
  author: { '@type': 'Organization', name: 'AbokiFX Rate' },
  publisher: {
    '@type': 'Organization',
    name: 'AbokiFX Rate',
    logo: { '@type': 'ImageObject', url: `${DEFAULT_SEO.openGraph.url}/static/assets/android-chrome-512x512.png` },
  },
  description: plainText(post.og_description),
})

export default function NewsPost({ post: info }) {
  const post = info && info.data ? info.data : null

  if (!post) {
    return (
      <Layout meta={{ title: 'Story not found | AbokiFX Rate', description: 'This story could not be found.' }}>
        <section className="frame flex min-h-[60svh] flex-col justify-center gap-6 py-16">
          <h1 className="text-[clamp(2.5rem,5.6vw,5.25rem)]">That story is not here.</h1>
          <p className="max-w-[40ch] text-[length:var(--step-lead)] text-ink-soft">
            It may have moved or been taken down. The newest Nigerian stories are on the news page.
          </p>
          <Button render={<Link href={`/${NEWS_URL}`} />} nativeButton={false} size="lg" className="w-fit rounded-none">
            All the news
          </Button>
        </section>
      </Layout>
    )
  }

  const title = plainText(post.title) || 'AbokiFX News'
  const description = plainText(post.og_description) || 'Nigerian news from AbokiFX Rate'
  const url = `${DEFAULT_SEO.openGraph.url}/${NEWS_URL}/${info.uid}`
  const image = post.og_image && post.og_image.url
  const published = formatDate(info.first_publication_date)

  return (
    <Layout meta={{ title: `${title} | AbokiFX Rate`, description }}>
      <Head>
        {image ? <meta property="og:image" content={image} /> : null}
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(info, post, url)).replace(/</g, "\\u003c") }} />
      </Head>

      <article>
        <header className="frame grid grid-cols-1 gap-8 pb-12 pt-10 md:grid-cols-12 md:gap-6 md:pb-16 md:pt-16">
          <div className="md:col-span-7">
            <p data-load style={{ '--d': '120ms' }} className="text-[16px] text-ink-soft">
              <Link href={`/${NEWS_URL}`} data-link>
                Nigerian newspapers
              </Link>
              {published ? <span> · {published}</span> : null}
            </p>
            <h1 className="mt-4 max-w-[22ch] text-[clamp(2rem,4.4vw,4rem)] leading-[1.05]">{title}</h1>
            {description ? (
              <p data-load style={{ '--d': '420ms' }} className="mt-6 max-w-[48ch] text-[length:var(--step-lead)] leading-[1.35] text-ink-soft">
                {description}
              </p>
            ) : null}
          </div>
          <div data-load style={{ '--d': '360ms' }} className="md:col-span-5 md:self-end">
            <ShareLinks url={url} text={title} />
          </div>
        </header>

        {image ? (
          <figure className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" width={1600} height={900} className="aspect-video h-auto w-full bg-ground-3 object-cover" fetchPriority="high" />
          </figure>
        ) : null}

        <Reveal className="frame mt-12 grid grid-cols-1 md:mt-16 md:grid-cols-12">
          <div data-part className="prose-article md:col-span-7 md:col-start-4">
            <PrismicRichText field={post.body || []} linkResolver={linkResolver} />
          </div>
        </Reveal>

        <footer className="frame mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="flex flex-col gap-6 bg-ground-2 p-6 md:col-span-7 md:col-start-4 md:flex-row md:items-center md:justify-between">
            <ShareLinks url={url} text={title} />
            <Button render={<Link href={`/${NEWS_URL}`} />} nativeButton={false} variant="outline" className="rounded-none">
              More stories
            </Button>
          </div>
        </footer>
      </article>
    </Layout>
  )
}

NewsPost.getInitialProps = async ({ query }) => {
  const post = await newsPostAPI(query.slug)
  return { post }
}
