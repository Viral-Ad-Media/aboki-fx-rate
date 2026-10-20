import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="style-nova">
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/assets/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/assets/favicon-16x16.png" />
        <link rel="manifest" href="/static/assets/site.webmanifest" />
        <meta name="theme-color" content="#0e0f10" />
        {/* Marks the document as scripted so hidden motion states only apply when JS runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
