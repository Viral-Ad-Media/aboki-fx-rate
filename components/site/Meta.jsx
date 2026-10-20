import Head from 'next/head'
import Script from 'next/script'
import { PRISMIC_API_URL } from '@/config'

/**
 * Per-page title and description, plus the site's third-party tags.
 * The tags that used to be inline <script> strings in next/head now load through next/script
 * after the page is interactive, so they no longer block paint or run before their libraries.
 */
export default function Meta({ title, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="google-site-verification" content="Xxjj4sVTKB3qv10_-01Vvw2WqUDzuWrTeY6m1bj1T4M" />
        <meta name="fo-verify" content="895388ad-a2b3-4527-bcad-eb1503379bc3" />
      </Head>

      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M35J3X2');`}
      </Script>
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-137238945-1');`}
      </Script>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1446673552134098');fbq('track', 'PageView');`}
      </Script>
      <Script id="mailchimp" strategy="lazyOnload">
        {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/7b8bcd8b8fc123e859a41a501/536a9b5a9453145fb4c393047.js");`}
      </Script>
      <Script
        id="adsense"
        strategy="lazyOnload"
        data-ad-client="ca-pub-3236992787867833"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Script id="prismic-config" strategy="lazyOnload">
        {`window.prismic = {endpoint: '${PRISMIC_API_URL}'};`}
      </Script>
      <Script id="prismic-toolbar" strategy="lazyOnload" src="https://static.cdn.prismic.io/prismic.min.js" />
    </>
  )
}
