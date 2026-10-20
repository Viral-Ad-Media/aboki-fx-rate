import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Reveal from './Reveal'
import { NEWS_URL } from '@/config'
import { plainText } from '@/lib/format'

export function NewsCard({ post, large = false, priority = false }) {
  const title = plainText(post.data && post.data.title) || 'Untitled'
  const summary = plainText(post.data && post.data.og_description)
  const image = post.data && post.data.og_image && post.data.og_image.url
  const href = `/${NEWS_URL}/${post.uid}`

  return (
    <article className={`grid gap-4 ${large ? 'md:grid-cols-12 md:gap-6' : ''}`}>
      <Link href={href} className={`block overflow-clip bg-ground-3 ${large ? 'md:col-span-7' : ''}`} tabIndex={-1} aria-hidden="true">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            width={1200}
            height={675}
            loading={priority ? 'eager' : 'lazy'}
            className="aspect-video h-auto w-full object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-video w-full bg-ground-3" />
        )}
      </Link>
      <div className={large ? 'md:col-span-5' : ''}>
        <h3 className={`${large ? 'text-[clamp(1.5rem,2.6vw,2.5rem)]' : 'text-[length:var(--step-lead)]'} leading-[1.15]`}>
          <Link href={href} data-link>
            {title}
          </Link>
        </h3>
        {summary ? <p className="mt-3 line-clamp-3 text-[16px] text-ink-soft ">{summary}</p> : null}
      </div>
    </article>
  )
}

/**
 * Nigerian newspapers: the newest post as a 7/5 split, two more beneath. When the newsroom cannot
 * be reached the section keeps its frame and says so, instead of vanishing.
 */
export default function NewsSection({ posts = [] }) {
  const [lead, ...rest] = posts

  return (
    <Reveal as="section" aria-labelledby="news-title" className="frame mt-28 md:mt-40">
      <div data-part style={{ '--n': 0 }} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <h2 id="news-title" className="text-[clamp(2.25rem,4vw,3.25rem)] md:col-span-7">
          <span className="block text-ink-soft">Nigerian news,</span>
          <span className="block">on one page.</span>
        </h2>
        <div className="flex flex-col gap-6 md:col-span-5 md:items-end md:text-right">
          <p className="max-w-[34ch] text-[16px] text-ink-soft">
            Headlines from the Nigerian papers, gathered on one page, so the rate and the reasons for it sit
            together.
          </p>
          <Button
            render={<Link href={`/${NEWS_URL}`} />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="w-full rounded-none md:w-fit"
          >
            All the news
          </Button>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-14">
        {lead ? (
          <div data-part style={{ '--n': 1 }}>
            <NewsCard post={lead} large priority />
          </div>
        ) : (
          <p data-part style={{ '--n': 1 }} className="max-w-[48ch] bg-ground-2 p-6 text-[16px] text-ink-soft">
            The newsroom is not answering right now. The latest Nigerian stories will appear here once it
            does.
          </p>
        )}
        {rest.length ? (
          <div data-part style={{ '--n': 2 }} className="grid gap-10 md:grid-cols-2 md:gap-6">
            {rest.slice(0, 2).map(post => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  )
}
