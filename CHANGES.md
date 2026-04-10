# Site Update — UX, Trust, Accessibility Pass

This pass implements the seven prioritised improvements from the design critique. Everything stays in vanilla HTML / CSS / JS — no new dependencies, no build step.

## What changed

### 1. Service Area section (new)
- New `<section id="service-area">` between `#system` and `#process`.
- Two-column layout: stylised inline SVG map of the West Kootenays on the left, copy + community pill list on the right (stacks at 768px).
- Map is a self-contained SVG file at [src/Assets/west-kootenays-map.svg](src/Assets/west-kootenays-map.svg) — no Google Maps, no Mapbox, no external tiles, no API key. Loads as a single asset request.
- Communities listed: Nelson, Castlegar, Trail, Rossland, Salmo, Fruitvale, Montrose, Warfield, Slocan Valley, Kaslo.
- "Outside this area? Call / Text" callout below the list.

### 2. Referral Program section (new)
- New `<section id="referral">` between `#faq` and `#quote`.
- Single-panel callout with cyan-tinted border + soft glow (within existing palette) so it visually pops.
- Headline: **"Know a Neighbour Who Needs This? Earn $200."** + the requested copy and a "Refer Someone Now" CTA.
- The CTA scrolls smoothly to the quote form and auto-focuses the new "Who referred you?" input on arrival, also tweaking the placeholder so it's clear what to type.
- Quote form gains an optional `referrer` text input.
- New FAQ entry: *"How does the $200 referral bonus work?"*

### 3. Visible anchor navigation + scroll spy
- New `.nav-anchors` row inside the existing `<nav>` showing: Why Switch, Benefits, System, Service Area, Process, FAQ, Referral.
- Visible at `min-width: 900px`. Below that breakpoint, the existing hamburger menu takes over and now contains the same anchor list (plus Quote).
- `IntersectionObserver` adds `aria-current="true"` (and a subtle cyan-tinted background) to the active section's anchor.
- `scroll-behavior: smooth` on `<html>` (auto when `prefers-reduced-motion: reduce`).
- `scroll-margin-top: 96px` on every `section[id]` so anchor jumps land below the fixed nav.

### 4. Founding Installs trust strip (new)
- Compact `.trust-strip` section between `#system` and `#service-area`.
- Four badges: 10-Year Warranty, IP68 + UL/cUL Certified, Locally Owned & Operated, Founding Install Pricing.
- Inline monochrome cyan SVG icons. No icon font, no library.
- Two columns at ≤900px, single column at ≤480px.

### 5. Hero slider improvements
- Each slide gets a `data-caption` (Day / Night / Colour / Holiday) that renders in a small pill next to the dot indicators.
- Dots are now real `<button>` elements at 14×14 visual size with a 44×44 invisible hit area, descriptive `aria-label`s, and clicking jumps to that slide.
- Slider arrows are now 48×48 with a stronger focus ring (`outline-offset: 3px`).
- Auto-advance every 6s, paused on hover, on keyboard focus, and on tab/page hidden. Disabled entirely when `prefers-reduced-motion: reduce`.
- The left-side gradient overlay was darkened (top stop ~88% on the left edge) so the white headline + muted lede stay above 4.5:1 across all four hero images.

### 6. CTA + copy consistency
- Every CTA that requests a quote is now labelled **"Get a Free Quote"** (the form button used to read "Get My Free Quote" — now standardised).
- Standalone phone CTAs read **"Call / Text for a Fast Estimate"**; the persistent nav and sticky bottom bar keep the shorter **"Call / Text"**.
- The Process section's heading is now **"Your Install, Step by Step"** so it no longer duplicates its eyebrow ("Simple Process"). The FAQ heading is now "Common Questions" for the same reason.

### 7. Accessibility fixes
- Every quote form input has a real `<label for>` (no placeholder-only labels) and an `autocomplete` hint where applicable. Optional fields are explicitly marked.
- The form has `aria-describedby="quote-reassurance"` pointing at the "Reply within 1 business day" line.
- Submit-result `<div>` is now `role="status" aria-live="polite"` so the success/error message announces.
- Universal `:focus-visible` ring at 2px solid cyan with 2px offset.
- Hero slider arrows / dots have descriptive `aria-label`s ("Previous slide", "Go to slide 2: Night", etc.); the carousel container has `aria-roledescription="carousel"`.
- The hamburger button now has `aria-label="Open navigation menu"` and the SVG is `aria-hidden`.
- The nav element itself is now `aria-label="Primary"`.
- The hero gradient overlay was darkened (see #5) for body-text contrast.
- Mobile tap targets: dot 44×44 hit area (via `::before`), arrows 48×48, nav buttons already comfortably above 44×44.

### Nice-to-haves shipped
- `<link rel="preload" as="image" fetchpriority="high">` on the first hero image (LCP win).
- JSON-LD `LocalBusiness` structured data including the phone number and all served communities.
- `<meta name="color-scheme" content="dark">` so native form controls (calendar pickers, autofill chrome, etc.) render with the dark theme.

## Decisions made where the brief was ambiguous

1. **Map style.** The brief allowed either an SVG or an OSM static tile. I went with a hand-built stylised SVG so there are no external requests at all (also avoids any third-party tile-server ToS questions). The result is a schematic — recognisable shapes for Slocan Lake, Kootenay Lake, the Columbia River, plus labelled dots for the ten communities — rather than a geographically precise map. If the owner wants pixel-accurate geography later, swap the `src` on the `.service-area-map img` for an exported tile and the layout still works.
2. **Service Area is positioned _after_ the Founding Installs trust strip**, which is itself between `#system` and `#service-area`. The brief asked for "between #system and #service-area" for the trust strip, which only makes sense if Service Area exists — so the order is: System → Trust Strip → Service Area → Process. This matches the brief's spatial intent.
3. **Referral CTA prefill.** The brief said "URL parameter or hash that pre-fills or pre-selects." I went with intercept-and-focus rather than a query parameter, because the form has no enum of "request type" to pre-select — the only relevant pre-fill is focusing the new `referrer` text field, which the JS handler does directly. Cleaner URL, same outcome. The button still has `href="#quote"` so it works with JS disabled.
4. **Sticky bottom bar phone label** stays as "Call / Text" (matching the persistent nav) rather than "Call / Text for a Fast Estimate", because the sticky bar is also a persistent compact UI element and the long label wouldn't fit comfortably in the half-width pill.
5. **Process eyebrow kept as "Simple Process"**, heading updated to "Your Install, Step by Step" — chose the more evocative of the two suggestions in the brief.

## Follow-up the owner needs to do

- **Test the form end-to-end** — submit a real quote request and confirm the new `referrer` field shows up in the Web3Forms email.
- **Run Lighthouse + WAVE** in the live deployment context (these scores depend on the actual hosting headers and the real LCP image network conditions).
- **Browser smoke test** in Safari (iOS), Chrome (Android), and desktop Firefox — pay attention to the hero slider auto-advance, the scroll-spy highlight, and the referral CTA → form focus flow.
- **Confirm the SVG map looks right** at different sizes. If you'd rather use a real OpenStreetMap export, drop a PNG/JPG into `src/Assets/` and update the `<img src>` in the `#service-area` section.
- **Optional**: when you have your first completed installs and a few photos, consider adding an "Our Founding Installs" gallery just above or below the trust strip — the layout can absorb it without restructuring.
