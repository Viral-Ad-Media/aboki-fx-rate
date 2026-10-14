# AbokiFX Rate

Source for [abokifxrate.com](https://abokifxrate.com), a Naira (NGN) exchange-rate site. It shows live-style mid-market rates for over 150 currencies against the Naira, a currency converter, a Nigerian news section fed from Prismic, and ad / newsletter widgets.

The app is a server-rendered [Next.js 8](https://nextjs.org/) site served through Express, deployed to AWS Lambda + API Gateway with the Serverless Framework.

## Features

- **Live rate table** (`components/FxComparismWidget.js`): headline rates for EUR, USD, AED, AUD and CAD against NGN.
- **Currency converter** (`components/conversions/ConversionForm.js`): converts between any two supported currencies. Direct `X_NGN` pairs are used where available, otherwise the rate is derived via NGN as the bridge currency.
- **Nigerian news** (`pages/nigerian-newspapers/`): a news landing page and article pages. Content comes from the `news` document type in Prismic and is rendered with `prismic-reactjs`. Article pages emit `NewsPosting` JSON-LD for SEO.
- **Homepage cards and ads** (`pages/index.js`, `components/AdsWidget.js`): driven by the `landing` and `ads` Prismic document types.
- **Arabic rates page** (`pages/arabic-rates.js`): embeds a third-party widget from eldolar.live.
- **Static pages**: about, contact, privacy, cookie policy, legal.
- **Extras**: Mailchimp subscribe modal, browser notifications, social share buttons, Google Analytics / Tag Manager / AdSense / Facebook Pixel tags (see `components/meta.js`).

## Project layout

```
.
├── api/                    # Prismic client helpers (docAPI, newsPostAPI)
├── components/             # React components (widgets, nav, footer, meta tags)
│   └── conversions/        # ConversionForm
├── layouts/                # Page layouts (default, newspaper) and responsive containers
├── pages/                  # Next.js pages
│   └── nigerian-newspapers/  # News index + article page
├── static/                 # Public assets (served at /static/...)
├── helpers/                # Prismic link resolver
├── config.js               # Prismic endpoint, news URL slug, default SEO metadata
├── routes.js               # next-routes definitions (filesystem routing is disabled)
├── server.js               # Express + Next server for local dev
├── index.js                # Lambda entry point (wraps server.js with serverless-http)
├── handler.js              # Lambda functions that refresh fx.json / supported-currencies.json
├── fx.json                 # Snapshot of X_NGN rates used by the UI
├── supported-currencies.json  # Snapshot of currency codes, names and symbols
├── serverless.yml          # AWS deployment config
└── secrets.json            # NODE_ENV and DOMAIN consumed by serverless.yml
```

## How the data flows

1. **Exchange rates.** The UI does not call any rate API at request time. `FxComparismWidget` and `ConversionForm` `require()` `fx.json` and `supported-currencies.json` directly, so the rates are baked into the bundle at build time.
2. **Refreshing the snapshots.** `handler.js` exports two Lambda functions:
   - `getcurrencies` fetches the currency list from `free.currencyconverterapi.com` and writes `supported-currencies.json`.
   - `getfx` reads that file, queries the same API two pairs at a time (the free tier's limit), and writes `fx.json`.
   Both can be run locally with Node to regenerate the files before a build (see below).
3. **CMS content.** `api/index.js` queries the Prismic repository at `config.PRISMIC_API_URL` for the `landing`, `news` and `ads` document types. Page-level data is fetched in `getInitialProps` (server side); widget data is fetched in `componentDidMount` (client side).

## Routing

Next.js filesystem routing is turned off in `next.config.js` (`useFileSystemPublicRoutes: false`). Every public URL must be registered in `routes.js`:

| Route name  | URL                                          | Page                            |
|-------------|----------------------------------------------|---------------------------------|
| `home`      | `/`                                          | `pages/index.js`                |
| `about`     | `/about`                                     | `pages/about.js`                |
| `contact`   | `/contact`                                   | `pages/contact.js`              |
| `cookie-policy` | `/cookie-policy`                         | `pages/cookie-policy.js`        |
| `legal`     | `/legal`                                     | `pages/legal.js`                |
| `privacy`   | `/privacy`                                   | `pages/privacy.js`              |
| `news-home` | `/nigeriannews-nigeriannewspapers`           | `pages/nigerian-newspapers/index.js` |
| `news`      | `/nigeriannews-nigeriannewspapers/:slug`     | `pages/nigerian-newspapers/news.js`  |
| `ads.txt`   | `/ads.txt`                                   | `pages/ads.txt`                 |

The news URL prefix is `config.NEWS_URL`. Use `<Link route="news" params={{ slug }}>` from `routes.js` for internal links.

## Getting started

### Requirements

- Node.js 18 or newer. The `dev` and `build` scripts set `NODE_OPTIONS=--openssl-legacy-provider`, which is required because the Next 8 / webpack 4 toolchain uses hashing algorithms that OpenSSL 3 (Node 17+) disables by default.
- An AWS profile named `abokifxrate` and the Serverless CLI (`sls`) if you intend to deploy.

### Install and run locally

```bash
npm install
npm run dev        # starts Express + Next in dev mode on http://localhost:3000
```

### Production build

```bash
npm run build      # next build -> .next/
```

### Refresh the rate snapshots

Set `CURRENCY_API_KEY` to your [currencyconverterapi.com](https://www.currencyconverterapi.com/) key, then run the two handlers from the repo root (they read and write files relative to the current directory):

```bash
export CURRENCY_API_KEY=your_key
node -e "require('./handler').getcurrencies().then(console.log)"
node -e "require('./handler').getfx().then(console.log)"
```

Commit the updated `supported-currencies.json` and `fx.json`, then rebuild and deploy.

### Deploy

```bash
npm run deploy     # npm run build && sls deploy --aws-profile abokifxrate
```

`serverless.yml` deploys to `us-east-1`, reads `NODE_ENV` and `DOMAIN` from `secrets.json`, enables binary responses for all content types (`serverless-apigw-binary`), and maps the custom domain with `serverless-domain-manager` (an ACM certificate for the domain must already exist in `us-east-1`).

## Configuration reference

| Setting | Where | Notes |
|---------|-------|-------|
| `PRISMIC_API_URL` | `config.js` | Prismic CDN endpoint for the CMS content. |
| `NEWS_URL` | `config.js` | URL prefix for the news section. |
| `DEFAULT_SEO` | `config.js` | Default title, description, Open Graph and Twitter metadata. |
| `CURRENCY_API_KEY` | env var read in `handler.js` | API key for currencyconverterapi.com. |
| `NODE_ENV`, `DOMAIN` | `secrets.json` | Serverless stage name and custom domain. |
| Analytics / ad IDs | `components/meta.js` | GA, GTM, AdSense, Facebook Pixel and Mailchimp script tags are hardcoded here. |

## Known issues and review notes

These were found while reviewing the code and are not yet fixed:

- **`/arabic-rates` is unreachable.** The navbar links to it and `pages/arabic-rates.js` exists, but the route is not registered in `routes.js`, and filesystem routing is disabled, so the URL returns 404.
- **`helpers/linkResolver` uses the wrong path.** It resolves `news` documents to `/news/:uid`, but the real URL is `/${NEWS_URL}/:uid`. Links inside Prismic rich text that point to news documents will 404.
- **`/ads.txt` is probably not served.** `pages/ads.txt` is not a JavaScript page, so Next does not build it, and the `routes.js` entry has nothing to render. The file is only reachable at `/static/ads.txt`, which is not where AdSense looks.
- **The refresh handlers cannot run as deployed.** `getfx` and `getcurrencies` write to the working directory, which is read-only on Lambda. They are also mapped in `serverless.yml` to the same `ANY /` and `ANY /{proxy+}` events as the web server, which conflicts. Treat them as local scripts (see above) until this is reworked.
- **Hardcoded API key.** `handler.js` falls back to a committed currencyconverterapi key when `CURRENCY_API_KEY` is unset. Rotate it and remove the fallback.
- **Stale rates.** `fx.json` is a static snapshot and is years old (for example EUR_NGN is around 403). The homepage says "Over 176 Currencies Supported"; the snapshot contains 156.
- **Mailchimp form is a placeholder.** `components/MailchimpForm.js` posts to `//xxxx.us13.list-manage.com/...`, so subscriptions do not go anywhere.
- **Browser notification icon is missing.** `components/WebNotification.js` references `devices-logo.png`, which is not in `static/`.
- **No tests.** `npm test` exits with an error by design.
- **Old dependencies.** Next 8, React 16.8, semantic-ui-react 0.85 and `@zeit/next-css` are several major versions behind. Several packages in `dependencies` (`ssri`, `elliptic`, `serialize-javascript`, `yargs-parser`, `node-fetch`) are pinned only to force transitive security fixes. Semantic UI CSS is loaded from a CDN in `components/meta.js`.

## License

ISC (per `package.json`).
