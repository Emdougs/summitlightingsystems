# SUMMIT Lighting Systems — SEO Plan

Goal: rank for "permanent christmas lights" + town searches across the West Kootenays and turn that visibility into quote requests. The market insight driving everything below: people don't search "roofline lighting" — they search **"permanent christmas lights [town]"**. The site now targets both.

---

## ✅ Done (implemented in src-v2)

- **Keyword-targeted title/meta** — "Permanent Christmas Lights & Roofline Lighting | Nelson, Castlegar, Trail BC"
- **Structured data (JSON-LD)** — LocalBusiness (with geo + all 10 service towns), Service, and FAQPage. FAQPage makes the site eligible for expandable FAQ results in Google.
- **Canonical URL, Open Graph + Twitter cards, robots meta, geo tags**
- **robots.txt + sitemap.xml** — upload to the site root alongside index.html.
- **Local-intent content** — new closing section ("Permanent Christmas light installers serving Nelson, Castlegar & Trail"), keyword-rich service-area copy, FAQ entries targeting "how much do permanent christmas lights cost" (a high-intent query).
- **Descriptive image alt text** with keywords + locations.
- **Performance** — hero image preload + fetchpriority, lazy-loading on everything else (Core Web Vitals are a ranking input).

> These changes are in `src-v2` and take effect when you deploy it. If you deploy the old `src` instead, the head/schema/robots/sitemap changes should be ported over.

---

## Week 1 — Foundations (highest impact, ~2 hours total)

1. **Google Business Profile** (business.google.com) — the single biggest lever for local search. Create/claim "SUMMIT Lighting Systems", category *Lighting Contractor* (secondary: *Christmas Store* is wrong — use *Landscape Lighting Designer* if offered). Set it as a Service Area Business covering all 10 towns. Add 15+ photos (you have great install shots), the phone number, website link, and hours. This is what puts you in the Map Pack for "permanent christmas lights nelson bc".
2. **Google Search Console** (search.google.com/search-console) — verify the domain (DNS verification through your registrar, or HTML file upload). Submit `sitemap.xml`. Request indexing of the homepage. This is also your free rank/traffic monitoring tool.
3. **Bing Webmaster Tools** — import from Search Console (2 clicks). Bing powers ~7% of searches plus AI assistants.

## Weeks 2–4 — Local citations & reviews

4. **Citations** (consistent Name/Address/Phone everywhere): Facebook business page, Instagram, Yelp, YellowPages.ca, Houzz, BBB, Nelson & Castlegar Chamber of Commerce directories, Kootenay business directories.
5. **Big Star Lights dealer listing** — ask your supplier to list you as the authorized Chromaglow Pro installer for the West Kootenays on their site. This is a high-relevance backlink almost no competitor will have.
6. **Reviews engine** — after each completed install, text the customer your Google review link (get it from your Business Profile). 10 reviews mentioning "permanent christmas lights" and town names will dominate this niche locally. Respond to every review.

## Months 2–3 — Content that captures demand

7. **Town landing pages** — one page each for Nelson, Castlegar, and Trail ("Permanent Christmas Lights in Nelson, BC"), with local photos, testimonials from that town, and the estimate calculator. These rank for "[service] + [town]" far better than a single homepage can.
8. **Before/after project posts** — each completed install becomes a short photo post (also post to Google Business Profile — GBP posts boost Map Pack visibility).
9. **Seasonal timing** — search volume for permanent Christmas lights spikes August–November. Have all content live by August 1; run your founding-pricing push then.
10. **Cost guide page** — "What Permanent Christmas Lights Cost in BC (2026)" targeting cost-research queries; it feeds traffic to the calculator.

## Ongoing

11. **Backlinks** — Nelson Star / Castlegar News business features, chamber memberships, sponsor a local event, ask Big Star Lights for a case study.
12. **Measure monthly** in Search Console: impressions/clicks for "permanent christmas lights" queries, plus Map Pack position checks from each town.

## Out of scope here (needs other tools)

- Live Core Web Vitals: run [PageSpeed Insights](https://pagespeed.web.dev) after deploying.
- Backlink audit: Ahrefs/Semrush free tiers.
- A live crawl/SERP audit can be run anytime with the Bright Data CLI (`seo-audit` skill) once installed and authenticated.
