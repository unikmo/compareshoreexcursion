# PortDay Picks

PortDay Picks is an affiliate-only editorial discovery site for cruise passengers at [PortDayPicks.com](https://portdaypicks.com).

It answers one question:

> What are the few independent experiences genuinely worth considering in this port?

The site does not sell tours, operate excursions, onboard drivers, collect payments, verify supplier insurance, manage cancellations or promise that a ship will wait. Visitors complete bookings on Viator with the listed local supplier.

## Product structure

Every indexed port page follows the same strict hierarchy:

1. **The 3 Best Picks** — prominent, port-specific and broad enough to have dependable independent inventory.
2. **3 Less-Obvious Alternatives** — worthwhile choices placed inside a secondary disclosure so they do not compete with the main decision.
3. **Best for First-Time Visitors** — a single clear starting point.
4. **Getting Back to the Ship** — terminal, timing and operator-term checks.
5. **Book with Our Partner** — live inventory, prices, reviews, payment and support on Viator.

There are no fake prices, copied review counts, provider grids, booking forms, lead forms or group-matching features.

## Coverage rule

The launch catalogue contains 60 commercially meaningful cruise ports across six global regions.

A port may be indexed only when:

- independent inventory exists on the affiliate provider;
- three strong and three niche activities can be described specifically;
- the activities are materially different from the recommendations for another port;
- a realistic terminal or tender note can be supplied;
- every outbound URL resolves to an active destination, category or product page.

Do not publish empty ports, generic templated activities or “coming soon” SEO pages. The data model can expand globally, but indexation follows curation—not the other way around.

## Affiliate model

- Revenue comes from eligible Viator affiliate bookings.
- Viator is the booking destination and merchant of record.
- Viator and the listed local supplier handle the transaction and fulfilment process.
- The site adds `rel="sponsored"` to commercial outbound links.
- Affiliate disclosure appears on the homepage, port pages and footer.

The current catalogue uses highly specific Viator search links so every port can launch with live inventory. Replace the three primary links with Viator Selector product links once the strongest converting products are selected. Direct product links should take priority over general destination links.

## Link maintenance

1. Use Viator Selector's **Excellent Quality** and **Best Conversion** filters.
2. Create the final link in the partner dashboard; preserve every generated tracking parameter.
3. Use one campaign identifier per port/activity where available.
4. Review Viator Link Alert emails and replace inactive products promptly.
5. Never hard-code a price, rating or cancellation promise unless an automated, approved feed keeps it current.

## SEO model

The primary search pattern is:

- `best [port] shore excursions`
- `independent shore excursions [port]`
- `[specific activity] from [port]`

Each port page provides unique:

- title, H1 and meta description;
- top and niche activity set;
- activity descriptions;
- terminal, berth or tender note;
- internal links and `ItemList` structured data.

Only fully curated ports appear in the sitemap. This avoids thin programmatic pages that differ only by destination name.

## Routes

- `/` — positioning and featured ports
- `/ports` — compact global port directory grouped by region
- `/ports/[slug]` — three primary and three niche independent activities
- `/sitemap.xml` — all curated port pages
- `/robots.txt` — crawl rules and sitemap location

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://portdaypicks.com
VIATOR_AFFILIATE_PID=your_pid
VIATOR_AFFILIATE_MCID=your_mcid
```

The destination links still resolve without tracking values, but bookings cannot be attributed to the affiliate account.

## Future scaling

Once a Viator Affiliate API key is available, replace search-page fallbacks with API-selected products and return the provider-supplied `productUrl` unchanged. The affiliate API can provide current product content while keeping transactions on Viator. Do not add booking endpoints, checkout or merchant responsibilities.
