# Summit Lighting Systems — Partner Postcard Spec

**Format:** 5×7 inch postcard (portrait), two-sided, full-bleed
**Audience:** Contractors, builders, roofers, and realtors in the West Kootenays
**Purpose:** Introduce Summit as a finishing-touch product partner AND recruit them into the $200 referral program
**Print specs:** 5.25×7.25 in with 0.125 in bleed, 300 DPI, CMYK

---

## The Strategic Angle

Contractors and realtors care about two things: **delivering a wow moment their clients will remember**, and **adding revenue without adding work**. This postcard leads with the wow moment (the house) and closes with the revenue (the referral bonus). The copy speaks to them as a partner, not a prospect.

---

## FRONT

### Layout (top to bottom)

**Top-left corner (safe margin ~0.3 in):**
Small logo lockup — "SUMMIT" in display caps, "LIGHTING SYSTEMS" small caps underneath. White.

**Top-right corner:**
Small cyan pill badge: **"FOR PARTNERS"**

**Middle (full-bleed):**
Hero photo — the same lit-house shot from the homepage (warm glow on a peaked roofline at dusk). Use the most dramatic nighttime shot in `src/Assets/hero/`. Apply a dark gradient overlay on the bottom 50% so the text reads cleanly.

**Lower-left (over the gradient, ~1.5 in from bottom):**

> ## Your Clients Will Thank You. Twice.
>
> Permanent roofline lighting their neighbours will talk about —
> and a $200 thank-you every time you send one our way.

**Bottom-right corner (over gradient):**
A bright cyan circle badge, ~1.2 in diameter, rotated slightly:

> **$200**
> PER REFERRAL

**Bottom-left footer (tiny, white, 8pt):**
`summitlightingsystems.ca`   |   `(236) 613-2173`

---

## BACK

### Layout (top to bottom)

Solid dark navy background (`#0c111b`), matching the website. All text in warm white (`#e8f1ff`) with cyan accents.

**Header (top 1 inch):**

> ### The Finishing Touch Your Clients Deserve
> *Built for real Kootenay winters. Installed in a day.*

**Three equal-width content blocks (stacked on a 5×7, so this is 3 rows):**

**Row 1 — What It Is**
Small cyan icon (lightbulb or roofline silhouette), heading "What It Is," body:

> App-controlled permanent lighting tucked into a color-matched aluminum track along the roofline. Warm white every night. Full colour for holidays. Completely invisible by day.

**Row 2 — Why Clients Love It**
Small cyan icon (shield or checkmark), heading "Why Your Clients Love It," body as a tight 4-item inline list:

> 10-year warranty · IP68 weatherproof · UL/cUL certified · One install, no ladders ever again

**Row 3 — Why You'll Love It (the partner pitch)**
Small cyan icon (handshake or dollar), heading "Why You'll Love It," body:

> **$200 for every referred install over $2,000.** No cap, no catch, no paperwork. Refer your client, we handle the rest — quote, install, app setup. You get paid when the job closes.

**Footer strip (bottom 1.2 in, slightly lighter panel background `#12131b`):**

Left column:

> **Let's partner up.**
> Call or text **(236) 613-2173**
> info@summitlightingsystems.ca
> summitlightingsystems.ca

Right column (small cyan CTA button):

> **Scan to get started →**
> [QR code pointing to summitlightingsystems.ca or a dedicated `/partners` page]

Tiny line at very bottom, centered:
*Proudly installed across the West Kootenays — Nelson · Castlegar · Trail · Rossland · Slocan Valley*

---

## Design System (keep consistent with the website)

- **Background dark:** `#0c111b`
- **Panel dark:** `#12131b`
- **Primary text:** `#e8f1ff`
- **Accent cyan:** pull the same cyan used on the website's "Get a Free Quote" button
- **Display font:** whatever the website uses for "SUMMIT" (likely a geometric sans like Inter, Space Grotesk, or similar)
- **Body font:** same as website body — keep it consistent
- **Photography:** reuse the hero images from `src/Assets/hero/` so the postcard and site feel unified

## Hierarchy Rules

1. On the front, "Your Clients Will Thank You. Twice." is the single largest thing on the card. Nothing else competes with it.
2. The $200 badge is the second-strongest visual element — it must be instantly readable even from 3 feet away.
3. On the back, "Why You'll Love It" should be visually emphasized slightly more than the other two rows (bolder, maybe a thin cyan left border on that block) because it's the conversion ask.
4. The QR code is the action anchor on the back — make it large enough to scan easily (minimum 0.75 in square).

---

## Tool Recommendation

**Primary: Canva**

Canva is the right tool here for four reasons:
1. It has a 5×7 postcard template preset with correct bleed and safe zones built in.
2. You can upload the existing hero photos from `src/Assets/hero/` and your logo directly, then drop them in.
3. Canva Print ships to Canada and will do short runs (25–100 cards) cheaply, so you don't need to find a local printer just to start.
4. You can duplicate the design for future variants (neighbour leave-behind, homeowner referral card, holiday promo) without starting over.

Start with Canva's "Postcard 5×7" template, delete the template content, and build from this spec. Use Canva's "Brand Kit" feature to save your cyan accent color and fonts so future assets stay consistent.

**Secondary: Figma** (if you want more control)

If you're comfortable with Figma or want pixel-perfect control over typography, Figma gives you better alignment tools and exports clean PDFs. The trade-off is you'll need to find a print shop yourself — either a local Nelson/Castlegar printer or an online service like Vistaprint, MOO, or Jukebox Print (Canadian, great quality).

**What I'd avoid:**
- Adobe InDesign — overkill for a single postcard.
- PowerPoint / Google Slides — they don't handle bleed or print color correctly, and output looks amateurish for a print piece.

---

## Production Checklist

Before sending to print:

- [ ] Hero photo is at least 300 DPI at final size (1575×2175 px minimum for 5×7 with bleed)
- [ ] All text is at least 0.25 in inside the trim edge (safe zone)
- [ ] Phone number and website tested — scan the QR code with your own phone to confirm it works
- [ ] Export as PDF/X-1a or print-ready PDF in CMYK, not RGB
- [ ] Order 5–10 sample prints first before doing a large run
- [ ] Decide on cardstock: 16pt or 18pt silk or matte finish works best for a premium feel; avoid glossy (fingerprints show)

## Next Steps

1. Pick the strongest hero image from your `src/Assets/hero/` folder — ideally the one with the most dramatic contrast between lit house and dark sky.
2. Open Canva, start a 5×7 postcard, and build from this spec.
3. If you want, send me the draft (export as PNG or PDF) and I'll critique it before you order a print run.
