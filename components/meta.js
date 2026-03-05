import Head from 'next/head'
const config = require('../config')

export default ({ props = {} }) => (
    <div>
        <Head>
            <title>
                { props.title || 'Next.js Test Title'}
            </title>
            <meta name='description' content={props.description || 'Next.js Test Description'} />
            <meta name="google-site-verification" content="Xxjj4sVTKB3qv10_-01Vvw2WqUDzuWrTeY6m1bj1T4M" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name="fo-verify" content="895388ad-a2b3-4527-bcad-eb1503379bc3" />
            <meta charSet='utf-8' />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/assets/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/assets/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/assets/favicon-16x16.png" />
            <link rel="manifest" href="/static/assets/site.webmanifest"></link>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css" />
            <script dangerouslySetInnerHTML={{ __html:`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/7b8bcd8b8fc123e859a41a501/536a9b5a9453145fb4c393047.js");`}} id="mcjs"></script>
            <script dangerouslySetInnerHTML={{ __html:`fbq('track', 'Subscribe', {value: 1,currency: '$',});`}}></script>
            <script dangerouslySetInnerHTML={{ __html:`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-137238945-1');`}}></script>
            <script dangerouslySetInnerHTML={{ __html:`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1446673552134098');fbq('track', 'PageView');`}}></script>
            <noscript><img height="1" width="1" style={{"display":"none"}} src="https://www.facebook.com/tr?id=1446673552134098&ev=PageView&noscript=1"/></noscript>
            <script dangerouslySetInnerHTML={{ __html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M35J3X2');`}}></script>
            <script data-ad-client="ca-pub-3236992787867833" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <script dangerouslySetInnerHTML={{ __html:`window.prismic = {endpoint: '${config.PRISMIC_API_URL}'};`}}></script>
            <script type="text/javascript" src="//static.cdn.prismic.io/prismic.min.js"></script>
        </Head>
    </div>
)
