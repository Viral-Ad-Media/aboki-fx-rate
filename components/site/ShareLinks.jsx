import React from 'react'

/**
 * Share links as plain anchors to each network's share endpoint. No script, no third-party widget.
 */
export default function ShareLinks({ url, text = '' }) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(text)
  const links = [
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ]

  return (
    <nav aria-label="Share this story" className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[16px]">
      <span className="text-ink-soft">Share</span>
      {links.map(link => (
        <a
          key={link.label}
          href={link.href}
          data-link
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-ink-soft/60"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
