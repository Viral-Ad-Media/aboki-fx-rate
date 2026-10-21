# AbokiFX Rate

Source for [abokifxrate.com](https://abokifxrate.com), a naira (NGN) exchange-rate site: a converter that answers as you type, mid-market rates for 155 currencies against the naira, a Nigerian news section fed from Prismic, and an Arabic dollar-rate page.

The app is a [Next.js 16](https://nextjs.org/) Pages Router site on React 19, styled with Tailwind CSS 4 and [shadcn/ui](https://ui.shadcn.com/) components (nova style, on Base UI). It deploys to Vercel. The Express server (`server.js`, `index.js`) is kept for the AWS Lambda path and is not used by Vercel.

## Features

- **Converter** (`components/site/Converter.jsx`): any two currencies and an amount. Direct `X_NGN` pairs are used where they exist; otherwise the rate is derived through the naira.
- **Remittance figure** (`components/site/Remittance.jsx`): a slider from $100 to $10,000 and the naira figure for it.
- **Headline bands** (`components/site/RateBands.jsx`): USD, EUR, GBP, AED and CAD as full-width bands with a switch that flips the direction of the quote. The on-state colours are the naira notes.
- **The whole board** (`components/site/CurrencyBoard.jsx`): all 155 currencies by region, quoted as one unit in naira.
- **Nigerian news** (`pages/nigeriannews-nigeriannewspapers/`): index with pagination and article pages rendered with `@prismicio/react`. Articles emit `NewsArticle` JSON-LD.
- **Questions** (`components/site/Faq.jsx`): six plain answers about the aboki rate.
- **Arabic rates** (`pages/arabic-rates.js`): embeds the eldolar.live widget.
- **Static pages**: about, contact, privacy, cookie policy, legal.
- Google Analytics, Tag Manager, AdSense, Facebook Pixel and Mailchimp tags are loaded in `components/site/Meta.jsx` with `next/script`.

## Project layout

```
.
├── api/                    # Prismic client (docAPI, newsPostAPI) on @prismicio/client
├── components/
│   ├── site/               # Page components (Layout, Header, Footer, Hero, Converter, ...)
│   └── ui/                 # shadcn/ui components (Base UI), owned by this repo
├── lib/                    # rates.js (rate maths, regions), format.js (number formatting), utils.ts (cn)
├── pages/                  # Next.js pages (filesystem routing)
│   └── nigeriannews-nigeriannewspapers/   # index.js and [slug].js
├── public/static/          # Favicons, manifest, images (served at /static/...)
├── public/ads.txt          # Served at /ads.txt
├── styles/
│   ├── globals.css         # Tailwind, theme tokens, page palette, motion layer
│   └── vendor/shadcn-nova.css   # shadcn "nova" style sheet, copied from the shadcn registry
├── helpers/                # Prismic link resolver
├── config.js               # Prismic endpoint, news URL slug, site name, default SEO, Mailchimp URL, socials
├── server.js, index.js     # Express + serverless-http entry for AWS Lambda (not used on Vercel)
├── handler.js              # Lambda functions that refresh fx.json / supported-currencies.json
├── fx.json                 # Snapshot of X_NGN rates used by the UI
├── supported-currencies.json  # Snapshot of currency codes, names and symbols
└── serverless.yml          # AWS deployment config
```

## How the data flows

1. **Exchange rates.** The UI does not call a rate API at request time. `lib/rates.js` imports `fx.json` and `supported-currencies.json`, so the rates are baked into the bundle at build time.
2. **Refreshing the snapshots.** `handler.js` exports `getcurrencies` and `getfx`. Run them locally to regenerate the two JSON files, then commit and redeploy (see below).
3. **CMS content.** `api/index.js` queries the Prismic repository at `config.PRISMIC_API_URL` for `news` documents in `getInitialProps`. When Prismic cannot be reached the pages render with an empty-state message instead of failing.

## Routing

Filesystem routing. Public URLs map to files in `pages/`:

| URL | Page |
|-----|------|
| `/` | `pages/index.js` |
| `/about`, `/contact`, `/privacy`, `/cookie-policy`, `/legal`, `/arabic-rates` | the file of the same name |
| `/nigeriannews-nigeriannewspapers` | `pages/nigeriannews-nigeriannewspapers/index.js` |
| `/nigeriannews-nigeriannewspapers/:slug` | `pages/nigeriannews-nigeriannewspapers/[slug].js` |
| `/ads.txt` | `public/ads.txt` |

The news prefix is `config.NEWS_URL`. Use `next/link` for internal links.

## Getting started

Node.js 20 or newer.

```bash
npm install
npm run dev        # next dev on http://localhost:3000
npm run build      # next build
npm start          # next start
npm run server     # the Express server (Lambda path)
npm test           # vitest run
```

### Tests

Tests live in `tests/` and run with [Vitest](https://vitest.dev). They cover the rate maths and formatting in `lib/`, the Prismic link resolver, the two snapshot-refresh handlers (with the API and filesystem stubbed), and the converter component. `npm run test:watch` re-runs on change. The `Build and test` GitHub Actions workflow runs `npm test` and `npm run build` on every pull request and on pushes to `master`.

### Refresh the rate snapshots

Set `CURRENCY_API_KEY` to your [currencyconverterapi.com](https://www.currencyconverterapi.com/) key, then run the two handlers from the repo root:

```bash
export CURRENCY_API_KEY=your_key
node -e "require('./handler').getcurrencies().then(console.log)"
node -e "require('./handler').getfx().then(console.log)"
```

## Configuration reference

| Setting | Where | Notes |
|---------|-------|-------|
| `PRISMIC_API_URL` | `config.js` | Prismic CDN endpoint. |
| `NEWS_URL` | `config.js` | URL prefix for the news section. |
| `SITE_NAME`, `DEFAULT_SEO` | `config.js` | Site name and default metadata. |
| `MAILCHIMP_URL` | `config.js` | The list's form action. Empty by default; the subscribe form on `/contact` stays disabled until it is set. |
| `SOCIAL` | `config.js` | Facebook and X links. |
| `CURRENCY_API_KEY` | env var read in `handler.js` | API key for currencyconverterapi.com. |
| Analytics / ad IDs | `components/site/Meta.jsx` | GA, GTM, AdSense, Facebook Pixel and Mailchimp script tags. |

## Design notes

The page is built to the taste-skill direction "the product performs": the converter is the hero, the five headline currencies are bands in naira-note colours, and the full board sits below. Type is Switzer from Fontshare. Motion is transform and opacity only, with reduced-motion fallbacks; timings and curves are tokens at the top of `styles/globals.css`.

## Known issues

- **Stale rates.** `fx.json` is a static snapshot and is years old (EUR_NGN around 403). Refresh it before relying on the figures.
- **The refresh handlers cannot run as deployed.** They write to the working directory, which is read-only on Lambda. Treat them as local scripts.

## License

ISC (per `package.json`).
