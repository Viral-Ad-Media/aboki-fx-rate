import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NEWS_URL, SITE_NAME } from '@/config'

export const NAV = [
  { href: '/', label: 'Rates' },
  { href: `/${NEWS_URL}`, label: 'News' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/arabic-rates', label: 'سعر الدولار', lang: 'ar' },
]

export function Wordmark({ className = '' }) {
  return (
    <Link href="/" data-link className={`inline-flex items-baseline gap-1 text-[16px] font-medium tracking-[-0.01em] ${className}`}>
      <span>Aboki</span>
      <span className="text-brand">FX</span>
      <span className="text-ink-soft">Rate</span>
    </Link>
  )
}

/**
 * A plain bar: wordmark, a few links, one action. On a phone the links move into a Sheet.
 */
export default function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isActive = href => (href === '/' ? router.pathname === '/' : router.asPath.startsWith(href))

  return (
    <header className="frame flex h-16 items-center justify-between" aria-label={SITE_NAME}>
      <Wordmark />

      <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            lang={item.lang}
            data-link
            aria-current={isActive(item.href) ? 'page' : undefined}
            className={`text-[16px] transition-colors duration-[var(--t-hover)] ${
              isActive(item.href) ? 'text-ink' : 'text-ink-soft'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button
          render={<Link href={`/${NEWS_URL}`} />}
          nativeButton={false}
          className="h-11 rounded-none px-4"
        >
          <span className="md:hidden">News</span>
          <span className="hidden md:inline">Read the news</span>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" aria-label="Open menu" className="size-11 md:hidden" />}
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-[82vw] max-w-sm bg-ground-2 p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col pt-16" aria-label="Main">
              {NAV.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  lang={item.lang}
                  data-press
                  data-menu-item
                  style={{ '--i': i }}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`frame flex h-14 items-center text-[length:var(--step-lead)] ${
                    isActive(item.href) ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
