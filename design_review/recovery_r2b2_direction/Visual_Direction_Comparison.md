# R2B2V-Direction — Visual Direction Comparison

**Gate:** Premium Visual Concept Gate (bounded prototype review, no application routes touched)
**Reviewer role:** Independent Visual/Commerce Reviewer
**Method:** All nine pages rendered headlessly with Playwright (Chromium) directly from the static
HTML/CSS files under `file://` — no dev server, no build step — at the four required viewport/page
combinations plus mobile PDP, 15 screenshots total, zero console/page errors on any capture. Findings
below also cross-checked against the underlying HTML/CSS (grep for `<h1>` counts, `alt` attributes,
`transition`/`@keyframes` usage, computed WCAG contrast ratios on the shared token palette).

Screenshots: `screenshots/concept-{a,b,c}-0{1..5}-*.png` (homepage 1440, homepage 390, PLP 1440, PDP
1440, PDP 390 — 5 × 3 = 15).

---

## The three concepts

| | Concept A — Modern Ingredient Atelier | Concept B — Contemporary Baking Market | Concept C — Editorial Pantry Laboratory |
|---|---|---|---|
| Feel | Calm culinary studio, still-life staging | Confident, dense commercial marketplace | Precision specimen catalogue / spec sheet |
| Palette use | Canvas/surface-dominant, coral as a precise accent only | Coral/saffron as real background fields, canvas for card real estate | Ink/graphite + canvas, coral as a single "measurement" highlight |
| Type | Serif display + humanist sans | Heavy grotesk sans throughout (800/900) | Serif display + monospace for labels/prices/SKUs |
| Structural motif | Asymmetric split, staggered overlapping photo frames, soft CSS grain | Diagonal `clip-path` colour bands, circular/blob photo frames | Visible hairline column grid, deliberately broken; index numbers; crosshair marks |
| PLP merchandising break | Full-bleed asymmetric Callebaut editorial insert | Diagonally clipped coral/saffron brand-spotlight band | Taxonomy strip + oversized "00" lab spotlight card |

---

## Scoring (1–5, 5 = best)

| Criterion | A — Atelier | B — Market | C — Laboratory |
|---|:---:|:---:|:---:|
| Distinctiveness (vs. rejected baseline and vs. each other) | 4 | 5 | 5 |
| Premium perception | 5 | 3 | 4 |
| Real-commerce credibility | 4 | 5 | 4 |
| Product prominence | 4 | 4 | 3 |
| Typography & hierarchy | 5 | 3 | 4 |
| Mobile quality | 3 | 4 | 3 |
| Scalability across 48 products | 4 | 5 | 3 |
| Accessibility | 4 | 4 | 4 |
| Motion potential (as annotated, not implemented) | 4 | 5 | 3 |
| Implementation risk (cost to bring into the real Next.js app) | 4 | 3 | 2 |
| **Total (/50)** | **41** | **41** | **35** |

Notes on method: scores are this reviewer's judgment against the screenshots and source, not a
formula. A and B tie on raw total but win on different axes — see recommendation below, which weighs
the criteria that matter most for this specific gate (premium perception was the explicit failure
reason; implementation risk determines how fast this can actually ship).

### Distinctiveness
All three are unambiguously different from the rejected baseline (Georgia-serif editorial headings
over a generic 4-up grid) and from each other — territory separation is real, not cosmetic re-skins.
B and C take the bigger swings (diagonal colour-blocking; a fully broken/annotated grid system) and
score highest; A is the most restrained of the three, which is intentional to its brief but reads as
the least visually "new" of the three at a glance.

### Premium perception
A reads as the most premium of the three — restrained palette, generous whitespace that is doing
compositional work (framing the packshots, not padding), soft long shadows instead of hard drop
shadows. C is a close second — the specimen/index treatment is sophisticated and unusual for this
category, though the visible grid lines and monospace labels trade a little warmth for precision. B's
diagonal colour blocks and heavy 900-weight type are confident and energetic but read closer to
"marketplace flash sale" than "premium" in places — the coral/saffron hero banner in particular is the
most saturated moment across all nine pages reviewed.

### Real-commerce credibility
B is the strongest here — filter chips, sort dropdown, ribbon badges, sticky bottom CTA on mobile: it
reads like a site that has actually shipped and sold product at volume. A and C are both credible but
lean editorial; C's "SPECIMEN 01 · CHOCOLATE" labelling is charming and legible but is the one place
across all three concepts that risks feeling more like a catalogue-of-record than a place to buy
things quickly — mitigated by keeping ₹ prices, pack sizes and Add to Cart fully intact throughout.

### Product prominence
A and B both keep real packshots large and unmistakably the dominant visual element in the hero and
PLP grid. C's hero photos are strong (large, bleeding past the grid deliberately) but the PLP grid
crops products into smaller, uniformly-padded "specimen" frames with more surrounding chrome (index
number, dashed rule, hairline grid) competing for attention — still fully compliant with "not tiny
objects in oversized blank cards," but the least product-forward of the three on the PLP specifically.

### Typography & hierarchy
A's serif/sans pairing is the cleanest hierarchy of the three — headline, eyebrow, body and price are
each instantly distinguishable at a glance. C's serif+mono pairing is deliberate and well-executed for
its "spec sheet" goal but asks more of the reader (tabular mono prices take a beat longer to parse than
a plain numeral). B's all-grotesk system is legible and confident but has the flattest type hierarchy
of the three — headline and sub-head weight/size jumps are the main tool doing the work, with less
typographic texture than A or C.

### Mobile quality
**Cross-concept finding, not concept-specific:** on the 390×844 PDP capture, none of the three surface
the variant (pack-size) chips or quantity stepper above the fold — all three push those controls below
gallery + thumbnails + identity + description. Concept B is the only one that keeps price and the
primary CTA persistently visible via a `position: sticky` bottom bar (`concept-b/style.css:1017`), so a
mobile visitor always has one tap to purchase even without scrolling; A and C require a scroll to reach
any purchase control at all. That single pattern is why B scores a point higher here. All three pass
the ≥44px tap-target and ≥13px type-floor rules on inspection; B's horizontally-scrolling department
chip row on mobile (homepage and PDP) truncates its last visible chip mid-word with no fade/affordance
hinting at more content — minor polish item, not a blocker.

### Scalability across 48 products
B's tighter, denser grid and chip-based filter bar are the most obviously built for a 48-SKU catalogue
— the pattern (filter chips, sort, ribbon badges, dense cards) is exactly what most real Indian
ecommerce catalogues already use at scale, which is a strength for this criterion even if it caps
"premium perception." A's asymmetric staggered rail is elegant at 8 items; whether the offset/stagger
choreography stays coherent at 48 would need a second pass (most likely: fall back to a plainer grid
past the curated rail, which the concept doesn't show). C's rotated/staggered "index card" treatment
and hand-picked index numbering is the concept most likely to need real engineering thought to scale
cleanly — rotation and layered shadow depth on every one of 48 cards, plus sequential specimen
numbering, is more bespoke per-item styling than a straightforward grid.

### Accessibility
All three pass the baseline checks performed: exactly one `<h1>` per page (verified across all nine
HTML files), semantic landmarks present, real `alt` text on every functionally-informative product
image, decorative/duplicate images correctly marked `alt="" role="presentation"` (Concept A uses this
pattern on its homepage rail thumbnails — a deliberate, valid choice, not a gap). Contrast was spot
checked against the shared token palette: white-on-`--coral` (Concept B's most common text-on-colour
pairing) computes to 4.86:1, ink-on-`--saffron` (used for the active department chip) computes to
4.91:1 — both clear WCAG AA for normal text. No concept uses white text directly on plain `--saffron`
(3.3:1, which would fail). Tie at 4/5 across the board — none goes further than baseline compliance
(no visible skip link, no explicit focus-ring styling was inspected in this pass).

### Motion potential
All motion is correctly annotated-only per the gate rules — grep confirms zero `transition`/
`@keyframes` in A and B; C has exactly one `transition: none;` declaration (`concept-c/style.css:356`),
which explicitly disables inherited motion rather than adding any — not a violation. Judging the
annotated intent: B's geometric colour-blocked shapes and card ribbons are the most natural fit for
confident, snappy micro-motion (blob drift, chip press states, sticky-bar slide-in). A's soft-shadow
lift and staggered photo frames would animate elegantly with minimal effort. C's crosshair marks and
dashed measurement lines are the most interesting motion opportunity conceptually (a "focusing"/
measuring animation) but would need the most custom choreography to land well — the reason it scores
lowest here, not because the potential is poor.

### Implementation risk
B is closest to what the current Next.js component structure (`product-grid`, `product-card`,
`.rp-*` rail classes) already assumes — port risk is mostly visual re-skinning. A's asymmetric/
staggered layout would need new positioning logic per breakpoint but no new content model. C carries
the most risk to bring into the live app: per-product rotation/stagger, index numbering that must stay
correct as the catalogue changes, and a visible grid-line system that has to remain aligned across
every route — all solvable, but the most engineering-intensive of the three to productionise without
regressing to a flatter version of itself.

---

## Recommendation

**Recommended concept: B — Contemporary Baking Market**, with A's typographic restraint and shadow
treatment worth borrowing for the hero and PDP identity block specifically.

Reasons:
1. It most directly answers the rejection reason — "looks like a conventional catalog with editorial
   headings" — by being the concept furthest from that description in both palette *and* structure,
   while still reading unmistakably as a credible Indian baking-supplies storefront rather than a
   fashion/cosmetics template.
2. It is the only concept that keeps a purchase path (price + CTA) visible on mobile PDP without a
   scroll, which is a real, measurable UX advantage over A and C, not just an aesthetic one.
3. Lowest implementation risk of the three raises the odds this actually ships rather than stalling in
   another remediation cycle.
4. Its main weakness — the hero and hero-adjacent chip/badge saturation reading closer to "sale
   marketplace" than "premium" — is the cheapest of the three concepts' weaknesses to fix: dial back
   the diagonal colour-block intensity in the hero only (e.g. reduce the saffron field, lean more on
   `--coral-dark`/ink, use it as previously used for the two-page trust/ribbon system elsewhere on the
   page) without touching the grid, filter, or card system that is doing the heavy commercial-
   credibility lifting.

If premium perception is weighted higher than shipping speed for this brand, **A is the stronger
runner-up** — it is the single most premium-reading concept of the three and the lowest-risk to
implement after B, at the cost of being the least "obviously new" of the three at first glance and the
weakest on mobile purchase-path visibility. **C is not recommended as the lead direction** — it is the
most memorable and defensible on originality grounds, but its combination of highest implementation
risk, lowest scalability confidence, and weakest product prominence on the PLP make it the highest-risk
choice of the three for a 48-SKU commerce catalogue, even though several of its individual ideas
(index numbering, taxonomy strip, crosshair marks) would strengthen A or B as accents rather than as a
whole-site system.

**This document does not authorize a selection.** Per the gate's terms, final concept selection is an
external decision — this comparison is scoring input for that decision, not the decision itself.
