# Claude Code Prompt: Summit Lighting Systems Website Improvements

## Context

You are working on the Summit Lighting Systems marketing website — a single-page site for a permanent roofline lighting installation business serving the West Kootenays (BC, Canada). The codebase is a static HTML/CSS/JS project with the main entry at `src/index.html`. Preserve the existing dark-navy aesthetic, the "Stop Hanging Lights. Install Them Once." positioning, and the overall narrative flow.

**Important business context:** Summit is a brand-new company doing their first installs. There are no customer testimonials yet. Do not fabricate reviews or add placeholder testimonial cards. Instead, lean on the trust signals we *do* have (10-year warranty, IP68 rating, UL/cUL certification, the referral program, the people behind the company) and frame early customers as "founding installs."

## Objective

Implement a prioritized set of UX, navigation, trust, and accessibility improvements based on a design critique of the live site. Ship changes that measurably reduce friction in the quote-request conversion path while keeping the existing brand voice intact.

## Before You Start

1. Read `src/index.html` end to end so you understand the current section IDs (`#switch`, `#benefits`, `#system`, `#process`, `#faq`, `#quote`), the existing CSS token names (colors, spacing, fonts), and the current component patterns (`.shell panel`, button variants, etc.).
2. Check the `src/Assets` folder for available imagery you can reuse.
3. Do not introduce new dependencies or frameworks — stay in vanilla HTML/CSS/JS and match the existing code style.
4. Work in small, reviewable commits, one priority at a time.

## Priority 1 — Add a Service Area Map Section

Currently there's no visual anchor for the local, West Kootenays focus. A map reinforces "we're local" and helps users self-qualify.

- Create a new `<section id="service-area">` inserted between `#system` and `#process`.
- Build a two-column layout (stacks on mobile at ~768px) with:
  - **Left:** a lightweight map of the West Kootenays region highlighting the service area. Use an SVG (preferred — no external dependency, fast load) or an OpenStreetMap static tile via `<img>` (no API key needed). **Do not use Google Maps embed** — it adds heavy third-party JS and requires an API key.
  - **Right:** a short heading ("Proudly Serving the West Kootenays"), a one-sentence pitch ("Locally owned. Locally installed. Quick response across the region."), and a clean list of served communities: **Nelson, Castlegar, Trail, Rossland, Salmo, Fruitvale, Montrose, Warfield, Slocan Valley, Kaslo.**
  - Below the list, a small callout: *"Outside this area? [Call / Text](#quote) — we may still be able to help."*
- Match the existing `.shell panel` styling language. Use only existing color tokens.
- Add an eyebrow label like "SERVICE AREA" matching other sections.

## Priority 2 — Add a Referral Program Section

Summit is offering **$200 to anyone who refers a job over $2,000.** This is a strong trust signal (shows confidence in the product) and a growth lever. It deserves its own clearly visible section.

- Create a new `<section id="referral">` inserted between `#faq` and `#quote`.
- Design a single-panel callout (not a multi-column layout) with:
  - Eyebrow: "REFERRAL PROGRAM"
  - Heading: **"Know a Neighbour Who Needs This? Earn $200."**
  - Body copy (use this exact wording or very close to it):
    > *"We're offering **$200** to anyone who refers a completed install of $2,000 or more. No cap, no catch — refer as many neighbours as you like. Just let us know who sent them in your quote request."*
  - A single CTA button: **"Refer Someone Now"** — this should open a mailto link or anchor-scroll to the quote form (`#quote`) with a URL parameter or hash that pre-fills or pre-selects a "Referral" option on the form.
- Update the quote form (`#quote` section) to add one optional field: **"Who referred you? (optional)"** — text input, not required.
- Style the referral section so it visually stands out slightly from surrounding sections — consider a subtle cyan-tinted border or accent to draw the eye, but keep it within the existing design language.

## Priority 3 — Visible Anchor Navigation

Currently the nav has only a hamburger menu, "Call / Text," and "Get a Free Quote." For a long single-page site, users can't jump to sections.

- Add a horizontal anchor nav inside the existing `#nav` element, visible at ≥ 900px viewport width, with these links: Why Switch, Benefits, System, Service Area, Process, FAQ, Referral.
- At < 900px, hide the anchor links and keep the hamburger menu as the fallback (ensure the hamburger menu includes those same anchor links).
- All anchor links should use smooth scroll (`scroll-behavior: smooth` on `html` if not already set) and land at the section start with a scroll-margin offset that accounts for the fixed nav height (~80px).
- Add an `aria-current="true"` or a subtle underline on the active section using an `IntersectionObserver`-based scroll spy.
- Preserve both existing action buttons — do not remove "Call / Text" or "Get a Free Quote" from the nav.

## Priority 4 — Honest "New Company" Framing (Founding Installs)

Since there are no testimonials yet, we need to turn the company's newness into an advantage rather than hide it. Add a short trust-building strip somewhere between `#system` and `#service-area`.

- Create a compact single-row section (no heading eyebrow needed) containing 3–4 trust tiles:
  - **"10-Year Warranty"** — icon + one-line sub
  - **"IP68 + UL/cUL Certified"** — icon + one-line sub
  - **"Locally Owned & Operated"** — icon + one-line sub
  - **"Founding Install Pricing"** — icon + one-line sub that says *"Early customers get our best rates as we build our portfolio."*
- Use simple inline SVG icons (no icon font, no external library). Keep them small, monochrome cyan, consistent stroke weight.
- This section should feel like badges, not cards — minimal padding, low visual weight.
- If the owner later wants to add real testimonials, this section can coexist with a testimonials section added above or below it.

## Priority 5 — Improve the Hero Slider

The slider currently has tiny dot indicators in the top-right and no context for what each slide shows.

- Give each slide a one-word caption (e.g., "Night," "Day," "Colour," "Holiday") rendered as a small pill near the slide dots.
- Enlarge the dot indicators to at least 12px, increase spacing between them, and give each an `aria-label` describing the slide.
- Enlarge the left/right slider arrows to a minimum 44×44px tap target with a visible focus ring.
- Add auto-advance every 6 seconds, pausing on hover or when the slider has keyboard focus. Respect `prefers-reduced-motion: reduce` and disable auto-advance in that case.
- Ensure all four slides have sufficient text contrast for the hero headline — add a stronger gradient overlay if any slide causes the white text to fall below WCAG AA contrast (4.5:1).

## Priority 6 — CTA & Copy Consistency

Standardize all quote-request CTAs sitewide.

- Use exactly one label everywhere the user can request a quote: **"Get a Free Quote."** Replace any instance of "Get My Free Quote" in the form section to match.
- Use exactly one label everywhere the user can call or text: **"Call / Text for a Fast Estimate"** in standalone placements, and the shorter **"Call / Text"** only inside the persistent nav.
- Remove the redundant "Simple Process" text — it currently appears as both the section eyebrow and the heading. Keep the eyebrow, make the h2 heading something like "How It Works" or "Your Install, Step by Step."

## Priority 7 — Accessibility Fixes

- Audit the quote form: every input must have a visible `<label>` (not placeholder-only). Associate labels with `for`/`id` pairs.
- Ensure the form has an `aria-describedby` linking to the "Reply within 1 business day" reassurance text.
- Add a visible focus ring to every interactive element (buttons, links, form inputs) using the brand cyan at 2px outline with 2px offset.
- Verify contrast on the subtitle text in the hero across all four slides. If any slide fails 4.5:1 for body text, darken the background gradient overlay.
- Give the slider arrows and dot indicators descriptive `aria-label`s ("Previous slide," "Next slide," "Go to slide 2: Colour").
- Confirm all interactive targets are at least 44×44 CSS pixels on mobile.

## Nice-to-Haves (if time permits)

- Add `<link rel="preload">` for the first hero image to improve LCP.
- Add JSON-LD structured data for `LocalBusiness` with the phone number (236-613-2173), service area (West Kootenays), and the list of served communities. This is especially high-value for a new local business building Google presence.
- Add `color-scheme: dark` to ensure form controls render consistently with the dark theme.
- Add a single FAQ entry about the referral program: *"How does the $200 referral bonus work?"*

## Out of Scope

- **Do not add testimonials, reviews, star ratings, or any social proof that fabricates customer feedback.** This is a brand-new company and inventing social proof would be misleading.
- Do not change the overall dark aesthetic or color palette.
- Do not rewrite the hero headline or main value proposition.
- Do not add any JavaScript framework or build step.

## Testing & Verification

Before considering this done:

1. Resize the browser from 320px → 1920px and confirm no horizontal scroll, broken layouts, or overlapping elements at any width. Pay special attention to the new map section and referral section at mobile breakpoints.
2. Tab through the entire page with keyboard only — confirm every interactive element is reachable, focus is visible, and the slider and nav both work.
3. Run Lighthouse (Accessibility + Best Practices) and post the scores. Accessibility should be ≥ 95.
4. Check color contrast on all text using browser devtools — report any remaining WCAG AA failures.
5. Open the page in Chrome, Safari, and Firefox and confirm the new nav, slider, map, and referral sections render correctly in all three.
6. Verify that no existing section IDs changed (so any external links still work), and that the quote form still submits with the new "Who referred you?" field included.
7. Verify the SVG or static map loads without any external JS requests (open devtools network tab — no Google Maps, no Mapbox, no tile server fetches beyond a single image).

## Deliverables

- Updated `src/index.html` with all changes.
- Any new CSS added inline or in existing stylesheets — no new files unless strictly necessary.
- If using an SVG map, the SVG file goes in `src/Assets/` and is referenced from HTML.
- A short `CHANGES.md` at the repo root summarizing what was changed, why, and any follow-up work the owner needs to do.
- A list of any decisions you made where the brief was ambiguous.

Work through the priorities in order. Commit after each priority is complete so changes can be reviewed incrementally.
