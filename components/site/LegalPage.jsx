import React from 'react'
import Layout from './Layout'
import PageIntro from './PageIntro'

/**
 * Privacy, cookies and legal share one shape: a two-line title, one statement, and the sections
 * as plain headed paragraphs at reading width.
 */
export default function LegalPage({ meta, lines, lead, sections }) {
  return (
    <Layout meta={meta}>
      <PageIntro lines={lines} lead={lead} />
      <section className="frame grid grid-cols-1 gap-12 pb-10 md:grid-cols-12" aria-label={meta.title}>
        {sections.map(section => (
          <div key={section.title} className="md:col-span-7 md:col-start-6">
            <h2 className="text-[length:var(--step-lead)] leading-[1.2]">{section.title}</h2>
            <div className="mt-3 flex max-w-[64ch] flex-col gap-3 text-[16px] leading-[1.55]">
              {section.paragraphs.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}
