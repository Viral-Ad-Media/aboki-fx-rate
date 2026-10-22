import { fetchLiveRates } from '@/lib/live-rates'

// How long a built page is served before Next regenerates it in the background. The feeds
// publish once a day, so an hour keeps the site current without hammering them.
export const REVALIDATE_SECONDS = 60 * 60
// When the fetch fails the page is built from the snapshot; try again sooner.
export const RETRY_SECONDS = 5 * 60

/** Live rates for getStaticProps, serialisable, or null when no feed answered. */
export const ratesForPage = async () => {
  const live = await fetchLiveRates()
  return {
    fx: live,
    revalidate: live ? REVALIDATE_SECONDS : RETRY_SECONDS,
  }
}
