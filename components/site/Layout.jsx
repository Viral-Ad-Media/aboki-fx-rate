import React from 'react'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ meta, children }) {
  return (
    <>
      <Meta title={meta.title} description={meta.description} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
