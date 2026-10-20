import React from 'react'

/**
 * The first screen of a secondary page: a two-line title in the page's h1 and one statement.
 * The title's lines rise on load, as on the home page, so every page opens the same way.
 */
export default function PageIntro({ lines, lead, children, lang, dir }) {
  return (
    <section className="frame grid grid-cols-1 gap-8 pb-16 pt-10 md:grid-cols-12 md:pb-24 md:pt-16" lang={lang} dir={dir}>
      <h1 className="lines text-[clamp(2.5rem,5.6vw,5.25rem)] md:col-span-7">
        {lines.map((line, i) => (
          <span className="line" key={line}>
            <span data-line style={{ '--i': i }}>
              {line}
            </span>
          </span>
        ))}
      </h1>
      <div data-load style={{ '--d': '420ms' }} className="md:col-span-5 md:pt-4">
        {lead ? <p className="max-w-[40ch] text-[length:var(--step-lead)] leading-[1.35]">{lead}</p> : null}
        {children}
      </div>
    </section>
  )
}
