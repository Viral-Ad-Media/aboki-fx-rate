import React from 'react'
import Layout from '@/components/site/Layout'
import PageIntro from '@/components/site/PageIntro'

const meta = {
  title: 'سعر الدولار اليوم | AbokiFX Rate',
  description:
    'سعرالدولاراليم :اضغط لسعر الدلار اليوم اسعر الدولار اليوم لشراء وبيع دولار اسعار الدولار دولار لايف سعر الدولار فى مصر سعر الدولار الان',
}

export default function ArabicRates() {
  return (
    <Layout meta={meta}>
      <PageIntro
        lang="ar"
        dir="rtl"
        lines={['سعر الدولار', 'اليوم']}
        lead="أسعار الدولار اليوم للشراء والبيع، مباشرة من eldolar.live. اضغط على أي عملة لمعرفة سعرها الآن."
      />
      <section className="frame pb-10" lang="ar" dir="rtl" aria-label="أسعار الدولار">
        <div className="bg-ground-2 p-2 md:p-4">
          <iframe
            id="iframe"
            title="Arabic rates widget"
            src="https://eldolar.live/ar/widget"
            width="100%"
            height="520"
            frameBorder="0"
            loading="lazy"
            className="block w-full bg-ground-3"
          />
        </div>
        <p className="mt-4 text-[16px] text-ink-soft" lang="en" dir="ltr">
          Rates on this page are supplied by eldolar.live and shown in Arabic for our readers in Egypt.
        </p>
      </section>
    </Layout>
  )
}
