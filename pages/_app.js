import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import '@/styles/globals.css'
import { DEFAULT_SEO } from '@/config'
import { RatesProvider } from '@/components/site/RatesContext'

NProgress.configure({ showSpinner: false, trickleSpeed: 120, minimum: 0.2 })

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const start = () => NProgress.start()
    const done = () => NProgress.done()
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', done)
    Router.events.on('routeChangeError', done)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', done)
      Router.events.off('routeChangeError', done)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title key="title">{DEFAULT_SEO.title}</title>
        <meta key="description" name="description" content={DEFAULT_SEO.description} />
        <meta key="twitter:card" name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
        <meta key="twitter:site" name="twitter:site" content={DEFAULT_SEO.twitter.handle} />
        <meta key="og:url" property="og:url" content={DEFAULT_SEO.openGraph.url} />
        <meta key="og:type" property="og:type" content={DEFAULT_SEO.openGraph.type} />
        <meta key="og:title" property="og:title" content={DEFAULT_SEO.openGraph.title} />
        <meta key="og:description" property="og:description" content={DEFAULT_SEO.openGraph.description} />
        <meta key="og:image" property="og:image" content={DEFAULT_SEO.openGraph.url + DEFAULT_SEO.openGraph.image} />
        <meta key="og:image:width" property="og:image:width" content={String(DEFAULT_SEO.openGraph.imageWidth)} />
        <meta key="og:image:height" property="og:image:height" content={String(DEFAULT_SEO.openGraph.imageHeight)} />
        <meta key="og:locale" property="og:locale" content={DEFAULT_SEO.openGraph.locale} />
      </Head>
      <RatesProvider live={pageProps.rates}>
        <Component {...pageProps} />
      </RatesProvider>
    </>
  )
}
