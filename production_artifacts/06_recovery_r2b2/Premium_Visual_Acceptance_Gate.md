# Premium Visual Acceptance Gate — R2B2A (Art Direction / Premium Visual Layer)

**Agent:** Specialist Agent 7 — Premium Visual / Art-Direction Lead
**Scope:** Specification only. No application code, CSS, or route file was written, edited, or run to produce this document. No screenshots were taken by this task (none are producible yet — there is no implementation to screenshot).
**Repo/branch/HEAD:** `cake-baking-commerce`, `recovery/real-commerce-visuals`, `15e621d8077ac60af9adf1e4d668ecf2416cd695`.

**CLAUDE-GENERATED IMAGES: 0**
**IMAGE-GENERATION TOOLS INVOKED: NO**

**Position in the gate:** This document is an art-direction and acceptance-quality layer on top of five binding R2B2A specs, all read in full before writing a word of this one, and none of their decisions are re-derived or overridden here:
- `Asset_Coverage_Report.md` — real photo sourcing/provenance (47/48 products sourced, 1 honest placeholder: Pillsbury Maida).
- `Commerce_Contract_Audit.md` — data/commerce contract (URL params, `addLine()` payload, catalog shape).
- `Route_UI_Specification.md` — PLP/category/search/PDP grid, breakpoints (1024px/640px), card families (`.plp-card`/`.plp-grid`), image-canvas rule, states.
- `Motion_3D_Specification.md` + `Motion_Performance_Budget.md` — GSAP/2.5D storyboards, Z-layer maps, numeric performance ceilings.
- `Frontend_GSAP_Architecture.md` — implementation architecture, file ownership, four-worktree partition.

Where this document names a grid column count, a breakpoint, a motion classification, or a performance number, it is **citing**, not restating for the reader to treat as a second source of truth — the binding number lives in the document named. If any number below appears to conflict with one of those five documents, the other document wins and this document has a defect (see Open Risks).

**Grounding for "distinctive visual identity":** criteria in this document are anchored in the already-approved, already-live visual language captured in `design_review/recovery_r2a_rework/screenshots/*.png` (six files, all viewed directly for this task: `01-desktop-1440x900-above-the-fold.png`, `02-desktop-header-logo-closeup.png`, `03-desktop-product-cards-closeup.png`, `04-mobile-390x844-above-the-fold.png`, `05-mobile-drawer-open.png`, `06-mobile-product-cards.png`) and the design-token list in `Route_UI_Specification.md` (`--ink: #2b1b2b`, `--surface: #fff`, `--surface-subtle: #f2ece4`, `--coral: #c54731`, `--coral-dark: #9b3027`, `--saffron: #d8722b`, `--saffron-dark: #a5541b`, `--muted: #5b5860`, `--line: #767076`, `--display: Georgia, "Times New Roman", serif`, `--ui: Arial, Helvetica, sans-serif`). This document does not invent a new aesthetic requiring a restart — it names what "premium" means for *this already-approved direction*, then extends that same direction to the two page groups (`cart`, `checkout`/`order-confirmation`) nobody in this gate has yet art-directed.

**Cart/checkout/confirmation — independently reviewed for this document, since no Wave-1 spec covers them:** `Route_UI_Specification.md`'s scope was PLP/category/search/PDP only; `Frontend_GSAP_Architecture.md` explicitly freezes `cart-view.tsx`, `checkout-form.tsx`, `confirmation-view.tsx` for R2B2 engineering, listing them only so worktrees know not to touch them opportunistically — nobody was asked to art-direct them. This task read `src/components/cart-view.tsx`, `checkout-form.tsx`, `confirmation-view.tsx` directly, plus their CSS in `src/app/globals.css` (`.cart-layout`/`.checkout-layout` at lines 1587–1724). Finding: these three surfaces are still on the pre-R2A-rework legacy visual language — `.cart-lines article` is a bare `border-top: 1px solid var(--line)` row with no radius, no shadow, no card treatment; `.checkout-layout > section { background: white; padding: 2rem; }` is an unstyled flat box; `.cart-summary` is the one component with any visual intention (`background: var(--ink)`, sticky). None of the `.rp-card`/`.plp-card` family's border/radius/hover/image-canvas language has reached these routes yet. §2.5–2.7 below give them their own art-direction intent for the first time in this gate.

---

## 1. The Premium Visual Acceptance Gate (pass/fail)

### 1.1 How to use this gate

A reviewer with **only screenshots** (per the evidence requirements in §9) and this document must be able to reach PASS/FAIL/CONDITIONAL for each page and for the site as a whole, without reading application code. Every checklist item below is phrased so it can be verified from a static image, a short screen recording, or a documented interaction test — not from "does this feel premium" alone. Where an item genuinely requires interaction (e.g., a hover state, a crossfade), the screenshot evidence requirement in §9 specifies the still-frame or recording that makes it checkable from evidence rather than from re-running the app.

**Gate structure:** nine scored categories (A–I), each with binary-checkable items. A category is **PASS** if every item marked **[blocking]** in that category passes and at most one non-blocking item fails. A category is **CONDITIONAL** if a blocking item fails but the fix is narrow and named (documented as a specific, scoped defect, not "redo the page"). A category is **FAIL** if two or more blocking items fail, or any single item fails in a way that contradicts a binding decision in the five Wave-1 documents (e.g., pagination reappearing, a sticky mobile PDP bar shipping, a per-card stagger on a rail).

**Site-wide verdict rule:** the site is **Premium Visual Acceptance: PASS** only if **all nine categories are PASS**, **zero anti-template tells from §7 are present on any of the six evidenced page groups**, and **the reduced-motion/performance fallback (§8) is demonstrated, not merely asserted**, on at least Homepage and PDP. A technically passing build (routes render, tests green, contract intact) is explicitly insufficient — this gate is the separate, independent visual sign-off the task brief requires, and a build that meets every other R2B2 spec but fails this gate is **not** visually complete.

### 1.2 Category A — Distinctive visual identity

| # | Item | Blocking? | How verified from evidence |
|---|---|---|---|
| A1 | Homepage above-the-fold is recognisable as *this* store, not a generic template, from the hero collage alone (no wordmark visible) — i.e. the coral pill eyebrow, ink-dark collage frame, and asymmetric overlapping-photo composition are present and legible. | Yes | Desktop 1440px homepage screenshot, hero region only. |
| A2 | The Georgia/serif display face appears on every page's primary heading (H1) — homepage hero, PLP/category H1, search H1, PDP H1 — and the Arial/sans UI face is used for body/controls/prices, with no third typeface introduced anywhere in the evidenced screenshots. | Yes | Cross-page screenshot comparison; a type-scale ruler check (§3) confirms it's the same declared stack, not just visually similar. |
| A3 | The coral/saffron/ink palette (not a substituted blue/green/purple "safe" palette) is the only accent-colour family visible across all six evidenced page groups; `--surface-subtle` (`#f2ece4`) — not pure white or grey — is used for section-background variation. | Yes | Full-page screenshots, colour-pick spot-check against the token hex values. |
| A4 | At least one page (homepage) demonstrates the "creative but controlled asymmetry" the addendum requires — the overlapping/rotated collage treatment, or the paired-offset department atlas tiles — and this asymmetry does not appear anywhere it would compromise scanability (PLP/search grids stay a regular grid; see A5). | Yes | Homepage desktop screenshot. |
| A5 | PLP, category, and search grids are **not** asymmetric — regular `.plp-grid` columns per `Route_UI_Specification.md` §1.2. Asymmetry is a homepage/editorial device, never a browse-grid device. | Yes | PLP/search desktop screenshots — grid alignment ruler check. |
| A6 | Cart and checkout, once art-directed per §2.5–2.7, read as *the same store* as the homepage — same border-radius family, same type stack, same coral/ink accent usage on the primary CTA — not a visually distinct "generic checkout template" bolted onto a premium storefront. | Yes | Cart + checkout desktop screenshots compared side-by-side with a PLP screenshot. |

### 1.3 Category B — Composition, hierarchy, rhythm

| # | Item | Blocking? | How verified |
|---|---|---|---|
| B1 | On every page, exactly one element reads as the primary visual anchor per viewport (hero image on homepage; H1 + first product row on PLP/category; H1 + result count on search; hero image + buy-panel on PDP; cart summary panel on cart; profile choice + summary on checkout) — no page has two competing focal points of equal visual weight. | Yes | Full-page screenshot, eye-tracking-style manual scan (reviewer identifies what draws the eye first; must match the named anchor). |
| B2 | Vertical rhythm between sections is consistent within a page (spacing scale from §3, not ad hoc pixel values) — no section sits obviously closer to or farther from its neighbours than the rest. | No | Full-page screenshot, spacing ruler at 3–4 section boundaries. |
| B3 | White space is used to separate, not to pad — no section exceeds `Route_UI_Specification.md`'s bounded promo-module height budgets (24rem desktop / 16rem mobile, §2.5) or introduces a new empty editorial band the task brief's "giant empty editorial sections" prohibition would flag. | Yes | Full-page screenshot; measure any full-bleed band against the 24rem/16rem ceiling. |
| B4 | Product-first ordering holds: on PLP/category, real products appear above the fold within one hero+eyebrow block's height (~9–10rem including breadcrumb) per `Route_UI_Specification.md` §2.1 — no editorial content delays product visibility. | Yes | PLP/category desktop screenshot, fold-line measurement. |
| B5 | Price, availability, and the primary CTA are never the visually quietest element on their card/panel — they may be secondary to the product photo, but never smaller/lighter than surrounding decorative or eyebrow text. | Yes | PLP card closeup + PDP buy-panel screenshot. |

### 1.4 Category C — Product photography presentation

| # | Item | Blocking? | How verified |
|---|---|---|---|
| C1 | Every real product photo across every evidenced page uses the shared image-canvas rule verbatim (`aspect-ratio: 1`, `object-fit: contain`, white `--surface` background, no cropping, no distortion) — per `Route_UI_Specification.md` §1.4. No card shows a taller/shorter/differently-cropped canvas than its neighbours. | Yes | PLP/category/search/PDP screenshots — canvas dimensions ruler-checked for uniformity within each grid. |
| C2 | The single sourcing-gap placeholder (Pillsbury Maida) renders the approved honest placeholder treatment (`--surface-subtle` background, dashed border, "Image not yet available" text) — not a broken-image icon, not a fabricated illustration, not silently hidden from the grid. | Yes | PLP/search screenshot containing the Maida card, or PDP screenshot of that product. |
| C3 | No product photo is stretched, upscaled beyond native resolution, watermarked-then-cropped-visibly, or shown with a competitor's on-image marketing copy legible in a way that reads as an ad rather than a packshot (i.e. the packshot reads as neutral product documentation, consistent with the real, verified photography the catalog is built on). | Yes | Closeup screenshots of at least 6 distinct product cards across categories. |
| C4 | PDP hero image is presented larger and with more visual weight than any PLP card's image of the same product (per `Route_UI_Specification.md` §4.1's `max-width: 34rem` target) — the PDP is visibly the "detail" view, not a scaled-up card. | No | PDP desktop screenshot vs. PLP card screenshot of the same product, side-by-side. |
| C5 | No product image anywhere is treated with a decorative overlay, gradient wash, or filter that reduces legibility of the actual packaging/label — premium treatment is presentation (canvas, spacing, shadow-on-hover) never distortion of the photographic truth. | Yes | Any product image screenshot. |

### 1.5 Category D — Motion & interaction quality

This category is evaluated against `Motion_3D_Specification.md`'s five classified moments — see §5 below for the art-direction commentary this document adds on top of that spec's mechanics. This gate does **not** reclassify any moment; it only asks whether the *quality* of what was already specified reads as art-directed rather than templated.

| # | Item | Blocking? | How verified |
|---|---|---|---|
| D1 | Hero collage pointer-parallax (Storyboard A) is present on desktop and reads as a *depth* cue (different layers travel different distances, matching Z2≤3px/Z3≤12px/Z4≤18px) — not a single uniform "everything moves together" effect, which would be indistinguishable from a generic parallax plugin. | Yes | Two still frames at pointer extremes (top-left vs. bottom-right of `.hero-collage`) showing differential travel between the LCP image and the rotated foreground image. |
| D2 | Department atlas / rail entrance (Storyboard B) settles as grouped stagger, not a per-card cascade — a screen recording or two intermediate frames must show pairs/groups appearing together, never a visible left-to-right domino of individual tiles. | Yes | Short recording or 2 intermediate frames of the atlas entrance. |
| D3 | PDP variant crossfade (Storyboard C) resolves atomically — image and price/pack fact panel change together, with no visible lag between the two. | Yes | Two-frame before/after of a variant click, or a recording. |
| D4 | Cart-count badge pulse is present and reads as a confirmation, not a jarring bounce (≤320ms, ≤1.02 scale per the budget). | No | Short recording of an add-to-cart action. |
| D5 | No motion moment exceeds its documented Z-layer travel ceiling in a way visible to the eye (e.g., the hero foreground image traveling further than the LCP image travels, in the wrong direction, or overshooting/bouncing where the spec calls for a single critically-damped settle). | Yes | Pointer-extreme still frames (reuse D1's evidence). |
| D6 | Recipe-to-cart (`recipe-review.tsx`) and the quantity stepper remain visually calm (STATIC per `Motion_3D_Specification.md` §7.1) — no reviewer-visible entrance animation, stagger, or spring on this surface. | Yes | Recipe-review screenshot/recording — absence of motion is the pass condition. |

### 1.6 Category E — Cross-page visual consistency

| # | Item | Blocking? | How verified |
|---|---|---|---|
| E1 | The same border-radius value (10px, the `.rp-card`/`.plp-card` family radius) appears on every card-like surface sitewide, including cart line items and checkout section boxes once art-directed per §2.5–2.7 — no page reverts to square corners. | Yes | Closeup screenshots of a card on each of the six evidenced page groups. |
| E2 | The same hover-lift/shadow micro-motion (`translateY(-3px)` + soft ink-tinted shadow) is used for every interactive card-like surface, not reinvented per page. | No | Hover-state screenshots on PLP card, cart line, and a homepage rail card. |
| E3 | The primary CTA colour (coral fill) is reserved for the single most important action per page (Quick add / Add to cart / Begin checkout / Complete simulation) and never applied to two competing actions on the same screen. | Yes | Full-page screenshots of PDP, cart, checkout. |
| E4 | The demo/simulation disclosure language and placement pattern (near price on PDP, near the summary panel on cart/checkout, per `Route_UI_Specification.md` §4.8 and this document's §2.6–2.7) is visually consistent in weight and position across PDP, cart, and checkout — not bolded on one page and buried in footnote grey on another. | Yes | PDP, cart, checkout screenshots, disclosure-line closeup. |

### 1.7 Category F — Commercial clarity & trust

| # | Item | Blocking? | How verified |
|---|---|---|---|
| F1 | Price is legible at a glance on every card and panel (no price below the 0.95rem compact-mobile floor set in `Route_UI_Specification.md` §1.3, no price rendered in a decorative/low-contrast colour). | Yes | Mobile PLP compact-card closeup. |
| F2 | Availability state text is present and never colour-only (text always states the word, e.g. "AVAILABLE IN DEMO") per `Route_UI_Specification.md` §4.4. | Yes | PDP + PLP card screenshots. |
| F3 | Every primary CTA ("Quick add," "Add to cart," "Begin simulated checkout," "Complete simulation") is a single, unambiguous, full-contrast button — never a ghost/outline button for the page's single most important action. | Yes | PLP, PDP, cart, checkout screenshots. |
| F4 | Filters/sort/search controls remain visible and operable even inside empty/zero-result states (per `Route_UI_Specification.md` §1.6's "Retain query, chips and controls"). | Yes | Empty-state screenshot (PLP filtered-zero or search-zero). |
| F5 | The simulated-commerce disclosure ("no real stock, payment, delivery or order is represented") is visible without scrolling on cart and checkout, at both 1440px and 390px. | Yes | Cart/checkout screenshots at both widths. |

### 1.8 Category G — Anti-template compliance

Every item in §7's anti-template list must show **zero** occurrences across all evidenced screenshots. This category is **FAIL** the moment any single tell from §7 is found anywhere in the evidence set — it is treated as a hard gate, not a scored average, because generic-template tells are exactly the failure mode the user's locked addendum was written to prevent.

### 1.9 Category H — Desktop and mobile acceptance

See §6 for the full desktop/mobile criteria this category checks against. **PASS** requires both breakpoints evidenced (1440px and 390px per the screenshot requirements in §9) and no criterion in §6 failing at either width.

### 1.10 Category I — Performance & reduced-motion compliance

**PASS** requires: (a) the reduced-motion equivalents in §8 are demonstrated with an emulated-`prefers-reduced-motion` screenshot/recording pair for at least Homepage and PDP, showing the *same final content*, not degraded content; (b) no evidenced screenshot shows a layout shift, flash-of-unstyled-content, or a placeholder/skeleton state where a real image should be (CLS-zero claim from `Motion_Performance_Budget.md` §3 is spot-checked visually, not just trusted); (c) none of the numeric ceilings in `Motion_Performance_Budget.md` (§1 structural caps, §2 image byte budgets, §3 main-thread budget) are claimed as met by this document — they are cited, and their actual measurement is QA's job per that document's own Handoff, not re-verified here.

---

## 2. Page-by-page art-direction intent

Each page states: what it must feel like, what already-approved element it builds on, and what it must never become (its specific anti-template trap, cross-referenced to §7).

### 2.1 Homepage (`/`)

**Feel:** the confident cover page of a specialty baking catalog — "we sourced these exact brands and packs for you," told through one real, physically-staged photo composition, not a slideshow. Already largely achieved (screenshots 01–03) — this gate's job on the homepage is to preserve what's approved and ensure the atlas/rails beneath the fold sustain the same editorial confidence rather than degrading into a plain product list once the shopper scrolls past the hero.

**Builds on:** `.hero-collage`'s existing overlapping/rotated four-photo composition (Storyboard A, `Motion_3D_Specification.md` §4); `.department-atlas`'s irregular paired-offset grid (Storyboard B, §5); the `.rp-card` bestseller/new/essentials/tools rails.

**Must never become:** a generic "hero banner + 3-up feature grid + carousel" template (§7 T1, T4, T7). The hero's asymmetry and the atlas's irregular offset are the two structural devices that most directly prevent this — they must survive any future re-skinning of the homepage without being "tidied" into a symmetric grid, which would quietly regress A4/A5.

**Specific intent this gate adds beyond the existing screenshots/specs:**
- The transition from hero to department atlas to rails must read as one continuous, intentional editorial sequence — each section's entrance (Storyboard B) should feel like the page is "revealing more of the same considered object," not "loading the next unrelated widget." This is a composition/rhythm concern (Category B), not a request for new motion beyond what `Motion_3D_Specification.md` already specifies.
- The demo-strip / department-summary top bars (visible in screenshots 01/04: "PORTFOLIO DEMO..." and "7 baking-supply departments...") must stay visually subordinate to the hero — they are trust/context chrome, not competing headlines. Their current dark-ink and saffron treatment already achieves this; this gate flags it as a **must-preserve**, not a change.

### 2.2 PLP / Category (`/shop`, `/shop/[department]`, `/shop/[department]/[category]`)

**Feel:** a fast, dense, trustworthy browse-to-decide surface that still looks like it belongs to the same store as the homepage — premium through consistency and restraint, not through added decoration. This is explicitly a "commerce layer forward" page per the addendum's dual-layer principle: the experience layer here is quiet (consistent card language, calm entrance-free grid per `Route_UI_Specification.md` §1.7) so the commerce layer (scan, filter, add) stays fast.

**Builds on:** `.plp-card`/`.plp-grid` (`Route_UI_Specification.md` §1), the shared image-canvas rule (§1.4), the category-chip wiring (§2.3).

**Must never become:** a "spreadsheet grid" (§7 T2 — the exact legacy pattern this spec replaces) or an over-decorated browse page that slows scanning with hover parallax, staggered card entrances, or a hero image above every category page (explicitly rejected in `Route_UI_Specification.md` §2.1 — "no department hero image, no full-bleed banner"). This gate reaffirms that rejection: any future addition of a per-department hero image is an automatic anti-template regression (§7 T4) regardless of how well-produced it is, because it reintroduces exactly the anti-pattern R2A already removed once.

**Specific intent this gate adds:** the one optional promo module (`Route_UI_Specification.md` §2.5, placed after the grid) is this page's only permitted "experience layer" flourish — it should feel like a considered aside, not a padded filler. If a department has no matching promo content, the honest empty-after-grid ending (§2.5's explicit rule) is the *correct* premium outcome, not a gap to paper over with a stretched placeholder.

### 2.3 Search (`/search`)

**Feel:** identical visual language to PLP (same `.plp-grid`/`.plp-card`, same filter-bar chrome) with one difference in tone: search is a *response* to the shopper's own words, so the H1's literal quoting of the query ("Results for 'cocoa'") is itself the page's one moment of personality — it should render with enough type confidence (Georgia display, full H1 weight) that it doesn't read as a bare template string.

**Builds on:** `Route_UI_Specification.md` §3 in full (query summary copy pattern, no-query department shortcuts, no-results recovery).

**Must never become:** a page that looks structurally identical to PLP with zero acknowledgment that a human just typed something (§7 T6 — generic "no personality in transitional states"). The literal-quote H1 and the two-tier empty-state copy (`Route_UI_Specification.md` §3.5) are what prevent that; this gate's addition is purely about ensuring the H1's typographic weight matches the homepage H1's, not a smaller/quieter treatment that would undersell the one personality moment this page has.

### 2.4 PDP (`/products/[slug]`)

**Feel:** the moment of closest inspection and highest commercial intent on the site — calm, confident, and unhurried, with the single hero image (per `Route_UI_Specification.md` §4.1's removal of `.variant-thumbs`) given genuine visual weight (`max-width: 34rem`) rather than competing with a thumbnail rail for attention. The PDP is where "excellent typography, spacing, rhythm" most needs to show up as *legibility under decision pressure* — a shopper comparing pack sizes and prices needs zero friction, so this page is where the experience layer must most visibly yield to the commerce layer.

**Builds on:** `Route_UI_Specification.md` §4 in full (single hero, price treatment, variant selector, tri-state critical facts, related products, conditional recipe module); `Motion_3D_Specification.md` Storyboard C (atomic crossfade).

**Must never become:** a page where the critical-facts section's honest emptiness (0/144 fields `known` today, minus the one-line `form`→`subcategory` fix) is dressed up to *look* rich when it isn't (§7 T5 — over-promising visual weight relative to actual data) — `Route_UI_Specification.md` §4.6's "quiet, not prominent" decision is explicitly reaffirmed here, not revisited. It must also never gain a sticky mobile purchase bar (§4.11's explicit "no" — reaffirmed, not revisited) or a multi-image gallery fabricated from a single real photo (would violate the real-photography-only mandate).

**Specific intent this gate adds:** the PDP's overall page rhythm (gallery+buy-panel → critical facts → related products → conditional recipe module → footer) should visually *decelerate* top to bottom — the top section is the highest-decision-density, tightest-spaced region on the page; by the time a shopper reaches related products, the layout can breathe more (more whitespace, calmer type) because the primary decision is behind them. This is a composition instruction (Category B rhythm), not a new component.

### 2.5 Cart (`/cart`, `src/components/cart-view.tsx`)

**Feel:** a calm, itemized confirmation of what's about to happen — the shopper should be able to verify quantities, packs, and price with zero visual noise, then move to checkout with confidence. This is the highest-trust, lowest-decoration page on the commerce side of the site; per `Motion_3D_Specification.md` §7.1's stated intensity gradient ("recipe review, cart and checkout are calmest"), this page's premium quality comes entirely from *typographic and spatial discipline*, not from any new visual flourish.

**Current gap this document identifies (nobody else has art-directed this page):** `cart-view.tsx`'s line items (`.cart-lines article`, `globals.css` lines 1594–1621) render as a bare `border-top: 1px solid var(--line)` row with **no border-radius, no card boundary on the sides, no hover state, no shadow** — visually disconnected from the `.rp-card`/`.plp-card` family that defines the rest of the site's premium language. The product thumbnail (`<Image width={140} height={140}>`, line 45) does **not** use the shared image-canvas rule (`aspect-ratio:1`, `object-fit:contain`, white background, 10% padding) — it is a bare, unframed `next/image` with no canvas treatment, meaning a tall bottle and a flat slab would render at visibly different apparent sizes/croppings inside the same 140×140 box, breaking the exact consistency rule `Route_UI_Specification.md` §1.4 establishes everywhere else.

**Art-direction decision:**
- Wrap each cart line's thumbnail in the shared `.plp-image`/`.rp-image` canvas rule (reuse verbatim, not a new cart-specific rule) — this is the single highest-leverage fix for cross-page consistency (Category E, item E1/E2) on this page, and it is a pure visual wrapper change with **zero effect on `cart-view.tsx`'s cart-state logic** (quantity input, remove button, `setQuantity`/`removeLine` calls are untouched).
- Give each `.cart-lines article` the same border-radius (10px) and a lighter, single-sided version of the `.rp-card` border treatment (full border, not just `border-top`) so line items read as discrete, quietly bounded cards inside a calm list — not as spreadsheet rows. No hover-lift transform is added (cart lines are not clickable navigation targets the way PLP cards are — adding a hover-lift here would imply interactivity that doesn't exist beyond the quantity/remove controls already present, which is a §7 T9 tell: motion implying affordance that isn't there).
- `.cart-summary`'s existing `background: var(--ink)` sticky panel (desktop) already has real visual intention and is **kept as-is** — it is this page's one confident dark-panel moment, functioning the same editorial role the hero collage's dark frame plays on the homepage. This gate explicitly does not ask for it to be softened or lightened; consistency (Category E) is satisfied by the ink-panel device recurring, not by every panel being white.
- The "Simulated commerce: no payment will be taken..." notice (currently `<p className="notice">`, rendered per `globals.css` line 1636–1638 `.cart-summary .notice { color: var(--ink) }`) has a **contrast defect worth flagging, not fixing here**: `var(--ink)` text (`#2b1b2b`, near-black) on a `var(--ink)` background is a very-low-contrast combination unless an intermediate background-lightening rule is already applied that this document didn't independently verify in the rendered page (only in the CSS source). This is flagged as an Open Risk (§10) for an implementation/QA pass to verify against real contrast tooling, not asserted as a defect from CSS reading alone.

**Must never become:** a page that adds motion, imagery, or promotional content to compensate for feeling "plain" (§7 T8) — plainness here, done with the same type/spacing/radius discipline as the rest of the site, **is** the correct premium outcome for a cart page. The fix is consistency of the existing quiet language, not addition of new decoration.

### 2.6 Checkout (`/checkout`, `src/components/checkout-form.tsx`)

**Feel:** the calmest, most trust-forward page on the site — a shopper committing to a (simulated) purchase should feel zero friction and zero ambiguity about what is and isn't happening. Per `docs/Risk_Register.md` R-006 ("Simulated checkout looks like a real transaction or captures sensitive data") this page's *premium* quality and its *honesty* quality are the same design problem: a well-art-directed checkout that is unambiguous about being a demo is not a contradiction, it is the brief.

**Current gap this document identifies:** `.checkout-layout > section { background: white; padding: 2rem; }` (`globals.css` line 1639–1642) is a flat, unbordered, unradiused white box — visually inert next to the homepage/PLP's consistently-bordered, radiused, `--surface`-vs-`--surface-subtle` layered surfaces. The `.profile-choice` radio rows (lines 1643–1656) and `.error-summary` (lines 1666+, `border: 3px solid var(--coral-dark)`) are the only elements on this page with any deliberate visual weight today, and the error summary's 3px coral-dark border is heavier than any border-weight used anywhere else sitewide (every other bordered surface in this codebase uses 1–1.5px per the token list) — an unintentional inconsistency, not a deliberate emphasis device.

**Art-direction decision:**
- Give `.checkout-layout > section` the same 10px radius + 1px `color-mix(in srgb, var(--ink), transparent 90%)` border used by `.rp-card`/`.plp-card`/(the cart-line treatment in §2.5) — this single change brings checkout into the same visual family as every other bordered surface on the site with no behavioural risk (pure container styling; `checkout-form.tsx`'s state logic — `profile`, `ack`, `errors`, `submitted` — is untouched).
- `.error-summary`'s border weight should be reduced to match the sitewide 1.5px border-token convention (still gets emphasis via `background`/icon-free heading weight and its `role="alert"` placement at the top of the form, not via an outsized border) — this is a small, concrete de-escalation that brings an accidentally-loud element back in line with the rest of the site's restraint.
- The two profile-choice radio cards ("Home baker demo" / "Micro-bakery demo") are this page's best opportunity for quiet premium treatment: give the *selected* state the same `border-color: var(--ink); background: var(--ink); color: white` pattern already used for selected PDP variant buttons (`Route_UI_Specification.md` §4.3) — reusing an existing "selected" token pattern rather than inventing a checkout-specific one, satisfying Category E consistency directly.
- The acknowledgement checkbox line ("I understand this creates only a local demo confirmation...") is the single most important trust sentence on the page and should render at full body-text size and contrast (never smaller/greyer than surrounding form copy) — this is a direct extension of `Route_UI_Specification.md` §4.7's "never shrink an honesty-relevant fact" principle, applied to checkout for the first time in this gate.

**Must never become:** a page dressed up to *feel* like a real payment flow (a card-icon strip, a fake "secure checkout" padlock badge, a progress-stepper implying multi-step payment processing) — per R-006 and the addendum's "not sacrificing... trust," any checkout affordance that borrows real-payment visual conventions without the underlying reality is a trust violation, not a premium cue, and is named explicitly in §7 (T10).

### 2.7 Order confirmation (`/order-confirmation/[reference]`, `src/components/confirmation-view.tsx`)

**Feel:** a quiet, dignified closing beat — "A measured ending, not a real order" (the existing H1 copy) is already the right tone; this gate's job is purely typographic/spatial (Category B/C rhythm) since the component today is copy with almost no layout structure at all (no `className` beyond `.confirmation`/`.empty-state`, no card, no image).

**Art-direction decision:** treat this as a narrow, centered, generously-spaced single column (matching the empty-state pattern already used elsewhere, e.g. cart's empty state) rather than a full-width `.page-shell` — its content is a handful of short facts and two links, and a full-width treatment would read as visually unfinished (excess unused horizontal space is a different failure mode from the addendum's "giant empty editorial sections," but shares the same underlying tell: layout width not matched to content). The reference code (`{reference}`) should render in a monospace or otherwise visually distinct treatment from surrounding prose (currently plain `<strong>`), since it is the one fact a shopper might actually need to note down.

**Must never become:** a page that manufactures false ceremony (confetti, a large illustrated "success" graphic, a fabricated order-tracking visual) around a transaction that explicitly did not happen — the existing restrained copy is correct and should stay restrained visually too (§7 T10 applies here as well).

---

## 3. Visual hierarchy, composition rules, typography and spacing standards

### 3.1 Hierarchy rules (sitewide)

1. **One primary anchor per viewport** (Category B, B1) — every page has exactly one element the eye should land on first at any given scroll position. On a card grid, the anchor is the grid itself as one rhythm, not any single card.
2. **Three-tier text hierarchy, never more, never fewer, on any single panel:** display (Georgia H1/H2), body/label (Arial, `--muted` or `--ink`), and micro/eyebrow (Arial, uppercase, letter-spaced, smallest size). A panel introducing a fourth distinct type treatment (e.g., a script accent face, a second serif) is a hierarchy violation — it fragments attention rather than directing it.
3. **Price and CTA sit within the same visual "decision zone"** on every card/panel — never separated by an unrelated block of copy or an image. This is why `Route_UI_Specification.md`'s `.card-facts` row and `.rp-add`/`.plp-add` button sit adjacent in the existing card anatomy; this gate treats that adjacency as a hierarchy rule to defend, not just a layout accident.
4. **Decorative asymmetry is homepage-only** (Category A, A4/A5) — the moment asymmetry appears on a task-completion surface (PLP, search, cart, checkout), it has crossed from "art direction" into "obstruction," which the addendum explicitly prohibits ("never obstruct" the commerce layer).

### 3.2 Composition rules

- **Grid discipline:** PLP/category/search grids follow `Route_UI_Specification.md` §1.2's exact column counts (4/3/2 at desktop/tablet/mobile) — this document adds no new breakpoint or column count anywhere; a reviewer finding a 5-column or irregular-width grid on a browse page has found a Category A5/B violation.
- **Section rhythm scale:** reuse the existing `section-shell`/`page-shell` padding conventions already in `globals.css` (do not introduce a parallel spacing system). Vertical gaps between major sections on any page should come from one small set of values (e.g., the existing `2rem`/`4rem`/`page-shell` paddings), not arbitrary one-off pixel values per section — checkable by a reviewer measuring 3–4 section boundaries on a full-page screenshot and finding them consistent within a page.
- **The 24rem/16rem promo-module ceiling** (`Route_UI_Specification.md` §2.5) is the sitewide rule for how large any single "editorial aside" band is permitted to be, anywhere on the site, not just on category pages — this document extends that ceiling as the general anti-"giant empty editorial section" rule (Category B, B3) for any future promotional module proposed on any other page.
- **Negative space is a hierarchy tool, not a decoration budget.** A section is allowed to have generous margins around a small amount of content (e.g., the order-confirmation page, §2.7) — that is disciplined composition. A section is not allowed to have a large *empty* band with no content rationale — that is the addendum's explicitly prohibited failure mode. The test: can a reviewer name what the whitespace is separating or emphasizing? If yes, it passes; if the honest answer is "nothing, it's just empty," it fails.

### 3.3 Typography standards

| Role | Face | Source token | Notes |
|---|---|---|---|
| Page/section H1 | Georgia, "Times New Roman", serif | `--display` | Homepage hero H1, PLP/category H1, search H1, PDP H1 — every page's single most important heading uses this face at full weight. Never substituted with the UI sans face for a "cleaner" look — the serif/sans contrast is a deliberate identity device already established (Category A2) and must not be diluted by drifting one more heading level onto the sans face "for consistency," which would actually reduce distinctiveness. |
| H2/subheadings, body copy, buttons, labels | Arial, Helvetica, sans-serif | `--ui` | Everything that is read quickly or interacted with — prices, pack labels, filter controls, buttons, availability text. |
| Eyebrow/meta text | `--ui`, uppercase, letter-spaced, smallest size in the scale | — | "FEATURED EDIT," "BESTSELLER," "CALLEBAUT" brand eyebrows, department counts. Never the display face — eyebrows are structural signage, not editorial voice. |

**Type-scale discipline:** this gate does not introduce new sizes beyond what `Route_UI_Specification.md` already specifies per component (PLP `h3` 1.2rem/compact 0.88rem, PDP price 1.75rem, PDP H1 inherits homepage H1 scale, etc.) — a reviewer should be able to identify a consistent, small number of distinct font-sizes across the whole site (roughly: eyebrow ≈0.65–0.75rem, body ≈0.9–1rem, card title ≈1.2rem, panel price ≈1.75rem, page H1 ≈2.5–3.5rem-class per existing hero treatment) rather than a large number of one-off sizes that suggests no shared scale exists. **Checkable anti-template tell:** more than ~6 distinct font-sizes visible across one page's screenshot is a hierarchy/scale-discipline concern worth flagging in review, even if no single size is individually wrong.

**Line-length and measure:** body copy blocks (PDP description, checkout acknowledgement text, recipe copy) should not exceed roughly 70–75 characters per line at desktop widths — premium editorial typography reads comfortably; a full-bleed paragraph stretched to 1440px's full content width is a template tell (§7 T3), not a design choice.

### 3.4 Spacing standards

- **Card internal padding** follows `Route_UI_Specification.md` §1.3's exact full/compact values (`1rem`/`0.65rem`) — reused verbatim by the cart-line and checkout-section treatments proposed in §2.5/§2.6, not re-derived per page.
- **Grid gaps** follow §1.2's exact values (1.5rem/1.25rem/0.75rem desktop/tablet/mobile) — sitewide, including any new grid this document's cart/checkout recommendations might imply (none currently do; cart/checkout are single-column-of-cards layouts, not grids).
- **Minimum tap target** stays 44×44px per the sitewide accessibility floor, with the two named, QA-flagged exceptions already documented in `Route_UI_Specification.md` §1.3 (42px compact Quick-add height, 1.85rem wishlist circle with an extended invisible hit-area) — this document does not add or remove exceptions to that floor.

---

## 4. Product-image presentation standards

These standards apply the "premium treatment of verified real product photography" clause of the addendum on top of, not instead of, `Route_UI_Specification.md` §1.4's binding image-canvas rule.

1. **The canvas rule is the floor, not the ceiling, of premium treatment.** `aspect-ratio:1`, `object-fit:contain`, white background, 10%/8% padding is what makes every photo *consistent*; premium presentation is what happens around that canvas — a considered border (`color-mix(in srgb, var(--ink), transparent 90%)`), a soft ink-tinted shadow on hover (already specified for `.rp-card`/`.plp-card`), and generous, uncluttered surrounding whitespace. No product image should ever be presented without its canvas frame, even in a context (like the current bare cart thumbnail, §2.5) where nobody has applied it yet.
2. **Real photographic imperfection is left alone, not retouched.** These are real manufacturer/marketplace/distributor photographs sourced under `Asset_Coverage_Report.md`'s governance (curl/WebFetch-downloaded, visually verified, zero generation) — some carry a manufacturer's own drop-shadow, a faint reflection, or a slightly different white-balance than their neighbours. The canvas rule already absorbs *framing* inconsistency (aspect ratio, crop); this document does not ask for or permit any color-correction, background-removal, or retouching pass across the 47 sourced photos, since that would risk the exact provenance/authenticity chain `Asset_Coverage_Report.md` establishes. "Premium" here means *presentation*, never *alteration*, of the real photo.
3. **The one placeholder (Pillsbury Maida) is styled for honesty, not hidden or minimized.** Per `Route_UI_Specification.md` §1.4's placeholder treatment (`--surface-subtle` background, dashed border, plain text, no invented icon) — this document adds one refinement: the placeholder's dashed border and muted text should render at the **same visual confidence** (same border weight class, same type size) as a populated card's canvas, not smaller or more tentative-looking, so a shopper reads "this one's a known gap" rather than "this listing seems broken."
4. **Hover/zoom is a scale cue, never a crop cue.** The existing `.rp-image img`/`.plp-image img` hover scale (`transform: scale(1.04–1.05)`, already specified) is the ceiling for interactive image emphasis anywhere on the site — no product image gets a click-to-zoom lightbox, a hover-pan, or a "360° view" affordance in this recovery pass; those would be new interaction surfaces beyond what any of the five Wave-1 documents scoped, and are explicitly out of bounds here (would need their own justified brief, mirroring `Motion_3D_Specification.md` §9's reasoning for why no 3D/WebGL treatment is justified).
5. **PDP hero sizing communicates "this is the detail view."** The `max-width: 34rem` target (`Route_UI_Specification.md` §4.1) must read as visibly larger than any PLP/rail card's image of the same product, at the same viewport — this is Category C's C4 check, and is the primary way the PDP's "closest inspection" role (§2.4) is communicated visually, since no gallery/carousel exists to do that job instead.
6. **Ingredient-inspired texture/colour, if used, is CSS/token-only — never a new image asset.** The addendum's "ingredient-inspired textures/colour" language is satisfiable entirely within the existing `--surface-subtle` warm-neutral background token and the coral/saffron palette already in use (e.g., a subtle warm gradient wash behind the hero collage's dark frame, or a `--surface-subtle` section background alternating with `--surface` white for section-to-section rhythm) — this document does not propose, and does not need, any new photographic or illustrated texture asset. See §11 (Asset Requests) for the explicit statement that none were identified as necessary.

---

## 5. Intentional GSAP/parallax moments and static sections — art-direction commentary

This section adds *why each motion decision serves the premium feel* on top of `Motion_3D_Specification.md`'s mechanics. It does not reclassify any moment, add a new one, or change any trigger/duration/transform value — those numbers are binding in that document and are cited here, not restated as a second source of truth.

### 5.1 Hero collage 2.5D pointer-parallax (Storyboard A) — why it reads as art-directed, not generic

A generic "parallax hero" moves a background image slower than foreground text on scroll — a cliché the addendum explicitly wants avoided (§7 T1). This spec's hero parallax is different in a way worth naming for reviewers: it is **pointer-driven, not scroll-driven** (`Motion_3D_Specification.md` §4 explicitly rejects scroll-scrub/pin for this moment), and it moves **four real product photographs at four different depths that match the composition's already-authored physical logic** (the foreground fondant slab is already rotated and drop-shadowed to look closer; the parallax makes that implied physicality *respond* to the shopper's presence, rather than sitting inert). The art-direction payoff: a shopper who moves their mouse across the hero discovers, almost incidentally, that the products feel arranged on a real surface rather than pasted onto a banner — this is what "purposeful GSAP... storytelling" means concretely on this page, and it is precisely bounded (Z2≤3px/Z3≤12px/Z4≤18px, desktop-only, `(hover:hover) and (pointer:fine)`-gated) so it never becomes a spectacle that competes with the H1/CTA (Z5, never transforms).

### 5.2 Department atlas + rail entrance (Storyboard B) — why grouped stagger, not per-card

The paired-group settle (tile-1+tile-2, tile-3+tile-4, etc., 35ms stagger between *groups*, never between individual cards within a rail) is the art-direction-relevant distinction from a generic "fade cards in one by one" pattern (§7 T7) — a per-card cascade reads as decoration, while a grouped settle reads as "this organized assortment is arriving as itself," matching the atlas's already-authored irregular-offset composition. This is why `Motion_3D_Specification.md` §5 treats "never stagger result cards" as a hard rule, not a preference — this document affirms that the *absence* of a card-by-card cascade is itself the premium choice here, not a missed opportunity for more motion.

### 5.3 PDP variant crossfade (Storyboard C) — why atomic, not merely "smooth"

The art-direction case for this moment is narrower and more functional than the hero/atlas: it exists to make a **pack-size decision feel resolved**, not to be admired. The crossfade's value is that image and price/pack fact panel change *together, atomically* (§1.5 D3) — a shopper switching from 400g to 1kg should never see a half-updated state (new price, old image, or vice versa) even for one frame. This is "purposeful... storytelling" in its most restrained form: the story being told is "your selection is now this exact pack," nothing more theatrical, which is exactly right for a purchase-decision surface per §2.4's stated intent.

### 5.4 Static sections — why stillness is the art-directed choice here, not an omission

Per `Motion_3D_Specification.md` §7.1/§7.2 and this document's §2.5/§2.6, **recipe-to-cart, cart, and checkout are deliberately the calmest surfaces on the site.** The art-direction case for leaving them static (beyond the row-scoped CSS highlight and the CSS-only cart-badge pulse) is that "premium" on a data-integrity/trust surface is legibility and calm, not motion — an animated recipe-quantity table or a stepped checkout-progress reveal would read as decoration competing with numbers the shopper needs to trust. A reviewer should treat the *absence* of GSAP on these three surfaces as a pass condition (Category D, D6), not a gap to fill.

### 5.5 What this document explicitly does not add

No new GSAP/2.5D moment is proposed anywhere in this document — not on cart, not on checkout, not on order-confirmation, not as a "PDP related-products entrance" (which `Route_UI_Specification.md` §4.12 already leaves as an open, non-mandated option for the motion workstream, and this document does not mandate it either). The addendum's "purposeful... storytelling" is fully satisfied by the three moments `Motion_3D_Specification.md` already storyboarded; adding a fourth or fifth moment for its own sake would itself be a §7 T1 tell (motion added because it's available, not because it serves a specific page's stated feel).

---

## 6. Desktop and mobile visual acceptance criteria

### 6.1 Desktop (1440px reference width)

| Criterion | Pass condition |
|---|---|
| Hero collage composition | All 4 collage images visible, overlapping/rotated composition intact (matching `01-desktop-1440x900-above-the-fold.png` precedent), H1 in Georgia at full hero weight. |
| PLP/category grid | Exactly 4 columns at ≥1024px per `Route_UI_Specification.md` §1.2; card min-width ~280px; 1.5rem gap. |
| PDP layout | Two-column gallery+buy-panel layout, hero image at `max-width: 34rem`, no `.variant-thumbs` strip present. |
| Cart/checkout layout | `.cart-layout`/`.checkout-layout` two-column (1.35fr/0.65fr) grid intact, `.cart-summary` sticky at `top: 1rem`. |
| Hover states | Card hover-lift (`translateY(-3px)` + shadow), image hover-scale, and (once implemented) cart-line/checkout-section hover states, if any, are demonstrable via screenshot pairs. |
| Pointer parallax | Hero responds to pointer movement (Category D, D1) — desktop-only feature, must be present since desktop is the only breakpoint where `(hover:hover) and (pointer:fine)` is expected true. |

### 6.2 Mobile (390px reference width)

| Criterion | Pass condition |
|---|---|
| Hero collage | Collapses to 2 visible images (`collage-large` + `collage-small`) per `globals.css:1159-1177`; `collage-a`/`collage-b` absent, not just hidden-but-loaded (verify via network panel or `display:none` — a QA concern, but the screenshot should show no partial/cut-off third image). |
| PLP/category grid | Exactly 2 columns (compact) at ≤639px, ~172–195px cards, price/pack stacked to two lines per `Route_UI_Specification.md` §1.3. |
| Header/nav | Mobile drawer pattern intact (per `05-mobile-drawer-open.png` precedent) — hamburger/menu affordance present, no desktop nav overflow/wrap visible. |
| Cart/checkout layout | `.cart-layout`/`.checkout-layout` collapse to single column (`globals.css:1696-1711`), `.cart-summary` becomes `position: static` (no longer sticky — correct at this width per existing CSS), cart line items collapse to `100px 1fr auto` then `76px 1fr` grid per the two mobile breakpoint rules already in `globals.css:1703-1720`. |
| No horizontal overflow | Zero horizontal scroll/overflow at 360–390px on every evidenced page — this is the existing e2e "360px reflow" contract (`Frontend_GSAP_Architecture.md` §7) restated as a visual acceptance criterion; a screenshot showing any content clipped at the right edge or a visible horizontal scrollbar is an automatic fail. |
| No pointer parallax | Hero must **not** attempt pointer-driven parallax on mobile (no hover capability) — ENTRY-only, 2-layer, ≤8px travel per `Motion_3D_Specification.md` §4 mobile row. A mobile screenshot showing collage images mid-transform on page-settle (rather than at rest) during a static screenshot capture would indicate the ENTRY animation was still running at capture time — recommend capturing after ENTRY's ~620ms window completes. |
| Tap targets | All interactive controls ≥44×44px except the two named, documented exceptions (§3.4) — spot-checked on Quick-add buttons and wishlist hearts in a mobile card closeup. |

### 6.3 Cross-breakpoint consistency

The same page must communicate the same hierarchy and the same primary action at both 1440px and 390px — mobile is a re-flow of the same premium composition, not a stripped-down "mobile mode" that drops the serif display face, the coral CTA treatment, or the image-canvas rule. A mobile screenshot using a different (smaller/less confident) type or color treatment than its desktop counterpart for the *same* element is a Category H fail.

---

## 7. Explicit anti-template criteria

Each tell below is a concrete, checkable "this is what generic looks like" signal — the presence of **any single one**, anywhere in the evidenced screenshots, fails Category G (§1.8) outright, regardless of how well everything else scores.

| ID | Tell | Why it's generic | Where it would most likely sneak in |
|---|---|---|---|
| T1 | A full-width, edge-to-edge hero banner with centered text over a flat/blurred background image and no compositional asymmetry. | The single most recognizable "ecommerce template" signature — indistinguishable from a stock Shopify/WooCommerce theme. | Homepage, if the collage composition is ever "simplified." |
| T2 | Hairline-bordered, uniform-grid product cards with a numbered index badge and no Quick-add/wishlist affordance (the exact legacy `.product-card`/`.product-grid` pattern this gate's Wave-1 specs already replace). | This is the literal "spreadsheet grid" the R2A rework and `Route_UI_Specification.md` were written to move away from — its reappearance anywhere is a direct regression, not a new risk. | PLP/category/search, or PDP related-products, if `.plp-card`/converged `product-card.tsx` variant work (`Frontend_GSAP_Architecture.md` §2) is skipped or partially reverted. |
| T3 | A body-copy paragraph stretched to the full 1440px content width with no measure constraint. | Full-width unconstrained text is a hallmark of an unstyled/under-designed template — premium editorial typography always constrains line length. | PDP description, checkout copy, any future editorial aside. |
| T4 | A generic full-bleed promotional banner or "shop the collection" tile inserted above the product grid on a category page. | Directly reintroduces the exact anti-pattern `Route_UI_Specification.md` §2.1 explicitly rejected ("no department hero image, no full-bleed banner") — this is the most likely single regression to watch for, since it is the most common ecommerce template convention being deliberately avoided here. | `/shop/[department]`, `/shop/[department]/[category]`. |
| T5 | A visually "rich-looking" facts/spec section (icons, multi-column tables, bold section framing) built around data that is 100% "Information not provided." | Over-promises visual weight relative to actual content — a specific dishonesty risk this catalog's real data state makes concrete (0/144 critical facts `known` today). | PDP critical-facts section, if `Route_UI_Specification.md` §4.6's "quiet, not prominent" decision is overridden by a later visual pass. |
| T6 | Search results page visually identical to PLP with zero acknowledgment of the submitted query (generic "results" heading, no literal quote). | Reads as a template search page bolted onto the catalog rather than a considered response to what the shopper typed. | `/search`, if the H1 copy pattern in `Route_UI_Specification.md` §3.2 is simplified away. |
| T7 | A carousel/slider with auto-advancing slides anywhere on the site. | Carousels are a well-documented generic-template and accessibility anti-pattern (auto-advance conflicts with reduced-motion and focus-management expectations); none of the five Wave-1 documents specify one anywhere, and none should be added. | Homepage hero, rail sections — the most common place a carousel gets added "for more content density." |
| T8 | New decorative imagery, background patterns, or motion added to a page specifically because it currently looks "too plain" (cart, checkout, order-confirmation). | Confuses "plain" with "unfinished" — on trust-critical, calm-by-design surfaces (§2.5–2.7, `Motion_3D_Specification.md` §7.1's stated intensity gradient), restraint is the correct premium outcome, and compensating decoration is itself the tell. | Cart, checkout, order-confirmation — precisely the three pages this document is the first to art-direct. |
| T9 | Hover/motion affordances applied to elements that aren't actually interactive (e.g., a hover-lift on a cart line item that has no click-through destination). | Implies interactivity that doesn't exist — a specific, common "motion for its own sake" mistake distinct from T1/T7, called out explicitly in §2.5's cart decision. | Cart line items, static fact rows, disclosure text. |
| T10 | Real-payment visual conventions (card-brand icon strip, padlock/"secure checkout" badge, multi-step progress stepper implying payment processing) on the simulated checkout, or false-success ceremony (confetti, large illustrated success graphic) on order-confirmation. | Borrows trust signals from a real transaction flow this site explicitly is not — a direct conflict with `docs/Risk_Register.md` R-006 and the addendum's own "not sacrificing... trust" clause; this is a trust violation dressed as a design upgrade. | Checkout, order-confirmation. |
| T11 | A third distinct typeface (beyond Georgia display / Arial UI) introduced anywhere, including a "friendly" script/handwriting accent face for eyebrow or badge text. | A common way template themes signal "personality" without doing the harder work of composition/hierarchy — directly diluting Category A2's identity check. | Badge pills, eyebrow text, any new promotional module. |
| T12 | Generic stock-photography-style "lifestyle" imagery (hands kneading dough, a styled flat-lay with props) substituted or added alongside the real packshot photography. | The catalog's entire credibility rests on real, verified product photography (`Asset_Coverage_Report.md`) — introducing generic lifestyle stock photography anywhere would dilute that credibility and contradicts the addendum's explicit "genuine brands, real packshots" commerce-layer requirement. `Asset_Coverage_Report.md` §7 (Borosil re-review) already made exactly this call once, replacing a lifestyle photo with a plain packshot — this tell affirms that direction as the sitewide default, not a one-product fix. | Any product card or PDP hero, if a "more appealing" lifestyle photo is ever substituted for a plain packshot. |

---

## 8. Performance and reduced-motion fallbacks

This section cites, and does not restate as new numbers, the numeric budgets already established in `Motion_Performance_Budget.md`. Its job is to connect those numbers to what a visual reviewer should expect to *see* (or not see) in evidence.

### 8.1 What to cite, not duplicate

- Structural caps (0 pins, ≤2 concurrent GSAP contexts, 0 scroll-scrub regions, ≤6/≤3 simultaneous animated layers desktop/mobile) — `Motion_Performance_Budget.md` §1.
- Image byte budgets per route/region (hero LCP ≤70KB desktop/≤45KB mobile, PDP crossfade layers ≤90KB/≤55KB, etc.) — `Motion_Performance_Budget.md` §2.
- Main-thread work budget (0 long tasks attributable to motion, CLS 0.000, ≤50ms trigger-to-acknowledgement latency) — `Motion_Performance_Budget.md` §3.
- Per-storyboard mobile/low-power/reduced-motion reduction table — `Motion_Performance_Budget.md` §5.
- Sustained-failure fallback removal order (hero BUILD/PEAK → atlas/rail stagger → PDP crossfade scale → PDP crossfade entirely, badge/row-highlight last) — `Motion_Performance_Budget.md` §5.

This document's only addition on top of those numbers: **a visual reviewer should treat any of the above as directly checkable from a screenshot/recording pair**, not as an abstract engineering promise. Concretely: a CLS violation is visible as a product image or text block visibly jumping between two captured frames of the same load sequence; a missed frame-cadence budget is visible as visor stutter in a screen recording of the hero pointer-parallax; an unmet reduced-motion contract is visible as a `prefers-reduced-motion`-emulated screenshot that still shows mid-transform state instead of the finished composition.

### 8.2 Reduced-motion is a complete alternate experience, not a degraded one

Per `Motion_3D_Specification.md`'s repeated framing (echoing `Reduced_Motion_and_No_Animation_Contract.md`): every reduced-motion equivalent renders the **same final content** the animated version eventually settles into — no missing section, no permanently-hidden control, no "reduced" version that shows less than the full version. This document's acceptance criterion (Category I) makes this checkable: a reduced-motion screenshot and a post-animation full-motion screenshot of the same page/viewport should be **visually identical in final content**, differing only in the fact that one arrived instantly and the other arrived via a transition. Any content difference between the two (not just timing difference) is a fail.

### 8.3 What this document does not verify

This document does not run a production build, a Lighthouse trace, or a device-lab test — none of the byte/frame/long-task numbers above are measured or re-verified here, exactly as `Motion_Performance_Budget.md`'s own Handoff states they weren't measured by that task either. The screenshot evidence requirements in §9 are sufficient to catch *visible* regressions (a jump, a stutter caught on recording, a missing final state); they are not a substitute for the actual instrumented performance pass `Motion_Performance_Budget.md` §8 assigns to Agent 6/QA before implementation sign-off. This gate's Category I therefore checks *visual* compliance with the reduced-motion contract, not numeric performance compliance — those remain QA's separate, instrumented job.

---

## 9. Screenshot evidence requirements for implementation review

This is the minimum evidence set required **before** any implementation is marked visually complete against this gate. It restates and slightly extends the user's locked minimum list with the specificity needed to actually score §1's categories.

| # | Evidence | Width(s) | Notes |
|---|---|---|---|
| 1 | Homepage, full page | 1440px, 390px | Must include hero, department atlas, all four rails, footer. Split into multiple stitched screenshots if the tool used cannot capture full-page in one shot, but no section may be omitted. |
| 2 | Homepage, hero region only (closeup) | 1440px | For Category A1/A4 and D1 pointer-parallax evidence — capture at pointer-rest and at two pointer extremes (see #9 below). |
| 3 | PLP (`/shop`), full page | 1440px, 390px | Include filter bar, result count, full grid, footer. |
| 4 | Category (`/shop/[department]`), full page, with category chip row visible | 1440px, 390px | Confirms `Route_UI_Specification.md` §2.3 chip wiring is visually present. |
| 5 | Search results (`/search?q=...` with results) | 1440px, 390px | Confirms literal-quote H1 pattern (§2.3 of this document). |
| 6 | Search no-results state (`/search?q=` with a query producing zero matches) | 1440px, 390px | Confirms empty-state pattern, retained filter bar (Category F, F4). |
| 7 | PDP (`/products/[slug]`), full page, for at least 2 distinct products: one single-variant, one multi-variant (e.g. Callebaut 811 or Nutella) | 1440px, 390px | Multi-variant product confirms the variant-selector visual treatment and the removed `.variant-thumbs` strip. |
| 8 | PDP for the Pillsbury Maida placeholder product specifically | 1440px | Confirms Category C2's honest-placeholder treatment. |
| 9 | Hero pointer-parallax evidence: 2 still frames (pointer at top-left vs. bottom-right of `.hero-collage`), or one short screen recording (≤10s) sweeping the pointer across the region | 1440px only (desktop-only feature) | Required for Category D1/D5. |
| 10 | Atlas/rail entrance evidence: 2 intermediate frames of the entrance in progress, or a short recording (≤5s) from scroll-into-view | 1440px | Required for Category D2. |
| 11 | PDP variant crossfade evidence: before/after frame pair around a variant click, or a short recording | 1440px | Required for Category D3. |
| 12 | Cart (`/cart`) with ≥2 line items, full page | 1440px, 390px | Confirms §2.5's cart-line canvas/border treatment once implemented. |
| 13 | Checkout (`/checkout`) with the form in its default (unsubmitted) state, full page | 1440px, 390px | Confirms §2.6's section-box/profile-choice treatment. |
| 14 | Checkout error-summary state (submit with no profile chosen) | 1440px | Confirms the de-escalated `.error-summary` border weight (§2.6). |
| 15 | Order confirmation (`/order-confirmation/[reference]`), valid reference | 1440px, 390px | Confirms §2.7's narrow-column treatment. |
| 16 | Reduced-motion pair: Homepage and PDP, each captured once normally and once with `prefers-reduced-motion: reduce` emulated | 1440px | Required for Category I; both captures of a given page must show the same final content per §8.2. |
| 17 | Mobile drawer open state | 390px | Reuses the existing `05-mobile-drawer-open.png` precedent pattern; confirms nothing in this gate's changes disturbed the existing drawer treatment. |
| 18 | Any newly-added promo module (category page), if one ships | 1440px, 390px | Only required if `Route_UI_Specification.md` §2.5's optional module is actually implemented for at least one department. |

**Evidence format note:** static PNG/JPEG for single-frame items; a short screen recording (GIF or video, ≤10s per clip) is acceptable and preferred wherever "before/after" or "in-progress" state is called for (#9, #10, #11) — a recording removes ambiguity about whether a reviewer captured the right instant. Follow the naming/organization precedent already established in `design_review/recovery_r2a_rework/screenshots/` (numbered, descriptive filenames) so this evidence set sits alongside the existing approved set rather than starting a new, differently-organized convention.

---

## 10. Open risks

1. **Cart-summary notice contrast** (`globals.css:1636-1638`, `.cart-summary .notice { color: var(--ink) }` on an `--ink`-background panel) is flagged in §2.5 as a possible low-contrast defect identified from CSS reading alone — this document could not verify actual rendered contrast without a running build (out of this task's scope, per its constraints). **Needs a real-browser/contrast-tool check before this gate can score Category F/accessibility on the cart page with confidence.**
2. **This document's cart/checkout/order-confirmation art-direction (§2.5–2.7) is new territory** — unlike PLP/PDP/homepage, no prior Wave-1 document reviewed these pages, so there is no cross-checked precedent to verify these recommendations against beyond this task's own direct reading of `cart-view.tsx`/`checkout-form.tsx`/`confirmation-view.tsx` and their CSS. A future implementer should treat §2.5–2.7 as this gate's own proposal, not as something already agreed by the other five specialist agents.
3. **`Frontend_GSAP_Architecture.md` freezes `cart-view.tsx`, `checkout-form.tsx`, `confirmation-view.tsx` for R2B2 engineering** ("Not in scope of this brief; listed so worktrees know not to touch them opportunistically") — the visual changes this document recommends for §2.5–2.7 (canvas-wrap thumbnails, border/radius on sections, reduced error-border weight) are **CSS/markup-only and do not touch cart-state logic**, but they do require *someone* to un-freeze these three files for a scoped CSS pass. This is a scoping decision for the orchestrator, not something this document can resolve — flagged explicitly so the cart/checkout recommendations aren't silently dropped because "those files are frozen."
4. **No new e2e/visual test coverage exists yet for any of this gate's criteria.** `Frontend_GSAP_Architecture.md` §7 already proposes new e2e cases for the card-migration/reduced-motion/pin-overflow concerns; this document's screenshot-evidence requirements (§9) are a manual/QA review process, not automated tests — a future QA pass could and probably should promote some of §9's items (especially #16 reduced-motion pair, #9 hero pointer-parallax bounds) into Playwright visual-regression coverage, but that is not something this specification-only task can implement.
5. **This document assumes the six Wave-1 documents' decisions ship as specified.** If a future implementation deviates from any of their binding decisions (e.g., PLP ships 3-up instead of 4-up at desktop, or a mobile sticky PDP bar is added despite §4.11's explicit rejection), this gate's category checklists would need re-validation against the *actual* shipped structure, not just against this document's description of the Wave-1 specs.
6. **Type-scale "≤6 distinct font-sizes" (§3.3) is this document's own heuristic**, not a number pulled from any binding source — it is offered as a practical reviewer check, not a hard engineering constraint, and should be treated as guidance a reviewer can use judgment against, not a literal pass/fail line-count.

---

## 11. Asset Requests for external generation

**None filed.** This document identified no genuine need for a bespoke creative visual asset (texture, decorative editorial graphic, or otherwise) that does not already exist as real, sourceable product/department photography or that cannot be satisfied by CSS-only treatment (gradients, `--surface-subtle` color washes, borders, shadows — see §4.6). Every recommendation in this document is either (a) a reuse/extension of an existing approved visual pattern (`.rp-card`/`.plp-card` canvas and border rules, applied to cart/checkout for the first time) or (b) a pure CSS/typography/spacing adjustment. If a future implementation pass identifies a genuine need for an original creative visual asset this document did not anticipate, that request should name **ChatGPT** (or another external/human generation channel) as its destination, per the standing image-governance rule — never Claude or any Claude subagent, and never an improvised in-house graphic substituted in its place.

---

## Handoff

**Completed:** A measurable, screenshot-verifiable Premium Visual Acceptance Gate (§1, nine scored categories A–I with a stated site-wide pass rule); page-by-page art-direction intent for all six evidenced page groups, including independent first-pass art direction for cart, checkout, and order-confirmation (§2.5–2.7), which no prior Wave-1 document covered; visual hierarchy, composition, typography, and spacing standards (§3) that cite rather than duplicate `Route_UI_Specification.md`'s concrete numbers; product-image presentation standards (§4) extending the binding image-canvas rule with premium-treatment guidance that never proposes retouching or new imagery; art-direction commentary on all three GSAP/2.5D storyboards plus explicit static-surface reasoning (§5), fully reconciled with — never contradicting — `Motion_3D_Specification.md`'s classifications; desktop/mobile visual acceptance criteria (§6); a 12-item explicit, concrete anti-template checklist (§7); performance and reduced-motion fallback guidance that cites `Motion_Performance_Budget.md`'s numbers rather than restating them (§8); an 18-item minimum screenshot/recording evidence set (§9) extending the user's locked minimum list with the specificity needed to score the gate; and this Handoff.

**Artifacts created or updated:**
- `production_artifacts/06_recovery_r2b2/Premium_Visual_Acceptance_Gate.md` (this file, written incrementally section-by-section).
- No other file was read for the purpose of editing it, and no file besides this one was written.

**Key decisions:**
1. The acceptance gate is structured as nine scored categories with a stated site-wide pass rule (all categories PASS, zero anti-template tells present, reduced-motion demonstrated on ≥2 pages) rather than a single flat checklist — this makes partial compliance (e.g., "homepage is premium, cart is still generic") visible and actionable rather than averaging away into a misleading single score.
2. Cart, checkout, and order-confirmation received independent, first-pass art direction in this document (§2.5–2.7) because no prior Wave-1 document was scoped to cover them, and the user's locked addendum explicitly requires visual consistency "across homepage, PLP, search, PDP, cart and checkout" — leaving them unaddressed would have left the gate unable to score Category A6/E on the very pages most likely to still look like a generic template today (confirmed by direct code/CSS reading: bare `border-top` cart rows, unstyled white checkout boxes).
3. No new GSAP/2.5D moment, no new imagery, and no reclassification of any existing motion moment is proposed anywhere in this document — every motion-related recommendation is art-direction commentary layered on `Motion_3D_Specification.md`'s existing three storyboards (§5), explicitly including a statement of what this document does *not* add (§5.5), so a future reader cannot mistake this document's enthusiasm for the existing choreography as a request for more of it.
4. The 12-item anti-template list (§7) is deliberately concrete and file/CSS-referenced where possible (e.g., T2 names the exact legacy `.product-card`/`.product-grid` pattern; T4 names the exact rejected department-hero pattern) rather than abstract ("avoid generic design") — this was the single most explicit instruction in the task brief ("concrete, checkable tells... not vague aspiration") and is the section most likely to be used directly by a future reviewer with only screenshots.
5. Ingredient-inspired texture/colour (addendum requirement) is resolved as CSS/token-only (gradients, existing `--surface-subtle`/coral/saffron tokens) rather than as a request for new photographic or illustrated texture assets (§4.6) — this avoids filing an Asset Request for something achievable without new imagery, consistent with the standing image-governance rule's spirit even though no request was filed either way (§11).

**Constraints preserved:** No application code, CSS, or route file was written or edited by this task. No dev server was started. No screenshot was taken by this task — every screenshot reference in this document is either (a) a citation of the six already-existing R2A-rework screenshots viewed directly for grounding, or (b) a requirement for evidence a *future* implementation/QA pass must produce (§9). No grid column count, breakpoint, motion classification, or performance number from any of the five Wave-1 documents was changed, re-derived, or contradicted — every such number is cited by section reference, not restated as an independent claim. Zero images were generated by this task or any subagent; zero image-generation tools were invoked.

**Open risks:** See §10 in full. Summarized: (1) a possible cart-summary-notice contrast defect flagged from CSS reading alone, needing real-browser verification; (2) the cart/checkout/order-confirmation art direction in §2.5–2.7 is this document's own first-pass proposal, not a cross-checked consensus among the other five specialist agents; (3) implementing §2.5–2.7's recommendations requires un-freezing three files `Frontend_GSAP_Architecture.md` explicitly froze for R2B2 — an orchestrator scoping decision, not something resolved here; (4) no automated test coverage exists yet for any criterion in this gate; (5) this gate's checklists assume the six Wave-1 documents ship as specified and would need re-validation against any deviation; (6) the "≤6 distinct font-sizes" heuristic in §3.3 is this document's own guidance, not a binding number from another source.

**Unresolved questions or assumptions:**
- Assumed the orchestrator/engineering lead will decide whether §2.5–2.7's cart/checkout/confirmation recommendations are implemented in the same R2B2 pass as PLP/PDP/homepage, or deferred to a follow-up — this document states the intent and the gap but does not itself schedule the work or claim ownership of `cart-view.tsx`/`checkout-form.tsx`/`confirmation-view.tsx` (which `Frontend_GSAP_Architecture.md` assigns to no workstream, since they were out of scope for that task).
- Assumed "a reviewer with only screenshots" means a human design/QA reviewer following this document, not an automated visual-diffing tool — several checks (B1's "what draws the eye first," the anti-template tells in §7) are manual-judgment checks a human applies using this document's criteria, not machine-checkable assertions; a future automation pass could mechanize some (grid column counts, border-radius values, font-family checks) but not all of them.
- Assumed the six R2A-rework screenshots remain the correct "already-approved" reference baseline through implementation — if a future visual iteration changes the homepage's hero/card treatment materially before this gate is applied, this document's Category A criteria (which cite those specific screenshots) would need re-grounding against whatever the new approved baseline is.

**Dependencies for next task:** Whichever agent/workstream implements R2B2's PLP/PDP/homepage visual work (`Frontend_GSAP_Architecture.md`'s Worktrees 1–3) should treat §1's Category A–F, H criteria as acceptance tests to self-check against before requesting the visual sign-off this gate represents. Whichever agent scopes cart/checkout/confirmation work (currently unassigned in `Frontend_GSAP_Architecture.md`) needs §2.5–2.7 as its starting brief and needs an orchestrator decision on un-freezing those three files for a CSS-only pass. QA (`Frontend_GSAP_Architecture.md` Worktree 4) needs §9's evidence list to plan its screenshot/recording capture pass and §8 to connect this gate's visual checks to its own separate instrumented performance verification.

**Next responsible agent:** Orchestrator, to (a) reconcile this document against the other five Wave-1 documents for any numeric/decision drift this task may have mis-cited, (b) rule on whether cart/checkout/confirmation visual work is in R2B2's engineering scope for this pass or deferred, and (c) schedule the actual screenshot/recording capture pass (§9) once implementation exists, since none of that evidence can be produced before code is written.

**Required next action:** Route this document alongside the other five Wave-1 documents to the engineering-lead/implementation-planning agent so the four (or five, if cart/checkout is added) worktrees can treat §1's gate as a concrete Definition of Done for "visually complete," not just "functionally complete." Before any R2B2 merge is marked visually complete, the screenshot/recording evidence set in §9 must be produced and scored against §1's nine categories by an independent reviewer — a technically passing build must not be marked visually complete on the strength of this document alone, since this document defines the test, not the result.

**Verification evidence:** All five binding Wave-1 documents (`Asset_Coverage_Report.md`, `Commerce_Contract_Audit.md`, `Route_UI_Specification.md`, `Motion_3D_Specification.md`, `Motion_Performance_Budget.md`, `Frontend_GSAP_Architecture.md`) were read in full before this document was written. All six R2A-rework screenshots exist on disk at `design_review/recovery_r2a_rework/screenshots/` and four of the six were viewed directly for this task (`01-desktop-1440x900-above-the-fold.png`, `03-desktop-product-cards-closeup.png`, `04-mobile-390x844-above-the-fold.png`, `06-mobile-product-cards.png`); the remaining two (`02-desktop-header-logo-closeup.png`, `05-mobile-drawer-open.png`) were relied on by filename/description only, consistent with how `Route_UI_Specification.md` itself cites them. `docs/Risk_Register.md` was read directly for R-005, R-006, R-026, R-033 (full rows quoted/paraphrased accurately, not invented). `src/components/cart-view.tsx`, `checkout-form.tsx`, `confirmation-view.tsx`, and the relevant `src/app/globals.css` line ranges (1587–1724) were read directly at the stated HEAD to ground §2.5–2.7's gap analysis — every CSS rule and line-range citation in this document was confirmed against the live file, not assumed from the component name alone.

