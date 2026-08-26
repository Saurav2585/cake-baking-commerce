# R2B2F — Locked Direction Implementation Contract

You are one of six narrowly-owned specialist engineers implementing the externally-selected premium
visual direction into the real Pantryform Next.js application on branch `recovery/real-commerce-visuals`.
This is REAL application code — not a throwaway prototype. It must build, lint, typecheck, and pass the
existing test suites when you are done with your slice.

Read this whole contract, then read your own role section at the bottom before touching anything.

## What was decided (do not re-litigate)

Three static HTML/CSS concept prototypes were built and independently reviewed
(`design_review/recovery_r2b2_direction/`). External decision:

- **Concept A — Modern Ingredient Atelier** is the primary visual identity: culinary warmth,
  typography, composition, product staging.
- **Concept C — Editorial Pantry Laboratory** contributes grid precision, taxonomy and factual-
  information clarity (NOT its full ink/mono aesthetic — just grid discipline and how it presents
  facts/specs).
- **Concept B — Contemporary Baking Market** contributes exactly one thing: the mobile sticky
  price + Add-to-Cart bar pattern. Nothing else from B (not its saturated colour blocking, not its
  grotesk type system).

Do not invent a fourth direction. Do not blend the three evenly. Concept A is the foundation; C and B
are narrow, targeted borrows.

You can open the three prototype files for texture/reference (`design_review/recovery_r2b2_direction/
concept-a/*.html`, `concept-c/*.html`, `concept-b/pdp.html`'s `.cta-row` sticky pattern) but the actual
implementation target is the real app's existing architecture described below — do not copy prototype
HTML/CSS wholesale, the real app has real components, real state, and real constraints the prototypes
didn't.

## Locked visual rules (apply everywhere, no exceptions)

- Warm culinary studio atmosphere.
- Ivory/cream foundation with restrained cocoa, oxblood and terracotta accents.
- Strong editorial serif paired with a clear functional sans-serif.
- Real packshots presented at meaningful optical scale.
- Controlled asymmetry and tactile CSS-based surfaces.
- Confident commerce hierarchy.
- Premium whitespace, but no giant empty areas.
- No repetitive generic card-wall experience.
- No miniature mobile text or controls (16px+ body text, 13px+ absolute floor for any label, 44×44px+
  tap targets).
- No arbitrary gradients or sale-marketplace saturation (this is the specific thing being corrected —
  do not reach for Concept B's coral/saffron colour-blocking).
- No clinical wireframe appearance (this is why only C's grid/taxonomy DISCIPLINE is borrowed, not its
  full ink-and-monospace look).
- No fake packaging. No AI-generated images. Every product photo already in `public/real-products/` and
  `public/real-products-v2/` is real, verified, sourced photography — use CSS (`object-fit`,
  `object-position`, background surfaces, masks, shadows) to stage them consistently. Do not create,
  fetch, or reference any new image asset.

## The existing app you're modifying (read this before writing code)

This is NOT a greenfield build. The current app already has good bones — most of your job is
**restyling and targeted refinement**, not rebuilding. Specifically:

- `src/app/page.tsx` (homepage) already has a 10-section structure close to what's required: hero →
  department atlas → brand strip → bestseller rail (editorial pattern) → promo split → new-arrivals
  rail (filmstrip pattern) → essentials rail (split pattern) → tools/packaging rail (shelf pattern) →
  recipe bridge → trust strip → (footer via layout). Four DIFFERENT rail patterns already exist
  (`src/components/product-rail.tsx`: `editorial`, `filmstrip`, `split`, `shelf`) specifically so the
  page does NOT repeat one card-wall grid — preserve and lean into this, don't collapse it back to
  repeated 4-up grids.
- `src/components/product-card.tsx` is ONE converged component with `variant="grid"` (PLP/search/related
  products) and `variant="rail"` (homepage). Its root element is always `<article className="product-card"
  ...">` (rail adds a `product-card--rail` modifier class) — **this exact root class must never change**,
  a Playwright e2e test selects `.product-card` directly.
- `src/components/shop-explorer.tsx` drives `/shop`, `/shop/[department]`, `/shop/[department]/[category]`
  and `/search` — filtering, sorting, brand checkboxes, empty states. All client-side, URL-addressable via
  query params.
- `src/components/product-detail.tsx` (PDP) already has: single hero image region, price/pack block,
  variant selector (button group, `aria-pressed`), quantity stepper, purchase actions, a tri-state
  "critical facts" section (`known` / `not_applicable` / the default `information_not_provided`), and a
  GSAP crossfade (`useImageCrossfade`) wired via `data-crossfade-image` / `data-crossfade-with` on
  variant change.
- `src/motion/` is an existing, mature GSAP system: `use-hero-parallax.ts` (hero pointer-parallax, capped
  travel, `gsap.matchMedia()`-gated), `use-grouped-reveal.ts` (section entrance, IntersectionObserver-
  driven), `use-image-crossfade.ts` (PDP variant crossfade, handles the shared-image-across-variants edge
  case specially), `motion-enhancer.tsx` (homepage `[data-measure-reveal]` fade-up), `tokens.ts` (the
  single source of truth for every duration/ease/stagger/distance value — never hardcode a motion number,
  import from here).
- `src/components/commerce-provider.tsx` owns cart/wishlist state (localStorage-backed) and the
  `aria-live` "added to demo cart" announcer. **Do not touch this file** — it's pure logic, not visual,
  and multiple e2e tests depend on its exact behavior.
- `src/lib/domain/catalog.ts` / `src/data/real-products.ts` are the canonical data layer. **Do not touch
  these** — no product/price/copy data changes are in scope, only presentation.

### Absolute must-not-break list (checked by an existing Playwright suite, `tests/e2e/critical-journeys.spec.ts`)

- `.product-card` stays the root class of every product card, everywhere.
- `.variant-selector button` stays the variant-picker selector on PDP.
- The Add-to-Cart button's accessible name must still match `/add.*demo cart/i` (currently "Add selected
  pack to demo cart").
- The header cart link's accessible name must still match `/cart/i`.
- Cart page must still show text matching `/simulated commerce/i`.
- The "go to checkout" link's accessible name must still match `/simulated checkout/i` (currently "Begin
  simulated checkout").
- Checkout must still have a control labeled `/home baker demo/i` and one labeled `/I understand/i`.
- The checkout submit button's accessible name must still match `/complete simulation/i`.
- Confirmation page must still show text matching `/no payment/i`.
- Empty cart state must still contain the phrase "cart is empty".
- `/search?q=cocoa` must still resolve to exactly 4 `.product-card` results (don't touch filter logic).
- The recipe review flow's "review supplies" link, "leftover" text, "add selected" button, and the
  "added to demo cart" aria-live announcement must all still work (don't touch `recipe-review.tsx`'s
  logic — visual polish only, if you touch it at all).
- `html { scroll-behavior: auto }` under `prefers-reduced-motion: reduce` must remain — do not remove or
  override this rule.
- Mobile nav: `Menu` button opens a `role="dialog"`, `Escape` closes it, focus returns to the trigger —
  preserve exactly (`site-header.tsx`'s existing focus-trap logic — do not touch the JS, visual
  restyling only).
- At 360px viewport width, `document.documentElement.scrollWidth` must equal `clientWidth` (zero
  horizontal overflow) on every route you touch. This is the strictest of the five required viewports —
  design and test against it, not just 390/1440.
- Every product image `alt` text must remain populated from the canonical data (`product.media.alt`) —
  never hardcode or blank it out.

### Known landmine (do not repeat this bug)

`docs/Decision_Log.md` D-043 records a real incident: a literal `*/` substring inside a CSS **comment's
prose** silently closed that comment early and corrupted every rule after it until an accidental later
`*/`, with no build-time error — only a live dev-server error surfaced it. When writing CSS comments,
never let the prose contain a `*/`-shaped substring (e.g. don't write "the `/* foo */` block" inside a
comment — rephrase without the literal characters). Verify your CSS with a live dev server, not just
`next build`, before calling your slice done.

## Design tokens (Design-System engineer defines these first; everyone else consumes them)

These are additive to the existing `:root` block in `src/app/globals.css` — nothing existing is renamed
(too much of the file references the old names; renaming risks silent breakage). New tokens:

```css
--cocoa: #3d2a1f;            /* deep roasted-cocoa brown — new dark warm neutral */
--oxblood: var(--coral-dark); /* #9b3027 already reads as oxblood — semantic alias, not a new hex */
--terracotta: var(--saffron-dark); /* #a5541b already reads as terracotta — semantic alias */
--shadow-soft: 0 20px 40px -24px rgba(61, 42, 31, 0.35); /* cocoa-tinted long soft shadow, Atelier "lift off the table" */
--shadow-soft-sm: 0 10px 20px -14px rgba(61, 42, 31, 0.3);
--radius-lg: 16px;
--radius-md: 10px;
--grain-speck: color-mix(in srgb, var(--cocoa), transparent 96%); /* for a subtle CSS-only grain texture, see Design-System role */
```

Typography stacks are refined (not replaced — still system fonts only, no network font loading, keeps
Lighthouse/CLS clean and matches this repo's existing no-external-font convention):

```css
--display: "Iowan Old Style", "Palatino Linotype", Georgia, "Times New Roman", serif;
--ui: -apple-system, "Segoe UI", system-ui, Arial, Helvetica, sans-serif;
```

Every specialist role below styles with these tokens (plus the pre-existing `--canvas`, `--surface`,
`--surface-subtle`, `--ink`, `--muted`, `--coral`, `--coral-dark`, `--saffron`, `--saffron-dark`,
`--focus`, `--success`, `--warning`, `--line`) — do not invent new base hues. `--oxblood`/`--terracotta`
are accents, used with restraint (borders, small UI moments, price emphasis) — not backgrounds for large
fields; that saturation is exactly what Concept B was rejected for.

## CSS ownership convention (avoids merge conflicts across specialists)

`src/app/globals.css` already uses an append-only convention where each past phase adds one clearly
bannered section rather than scattering edits (search the file for `===== R2B2` for examples). Follow
this exactly:

- The Design-System engineer edits the **existing** `:root` block (adding the new tokens above) and the
  base header/nav/footer/button/form rules already at the top of the file (before the first
  `===== R2B2 ...` banner) — this is genuinely shared foundation, edited in place, once, first.
- Every other role **appends one new banner section** at the end of the file:
  `/* ===== R2B2F <Role Name> ===== */ ... /* ===== end R2B2F <Role Name> ===== */`, containing only
  new rules or rules that override an earlier declaration by being later in cascade order + more
  specific. Do not edit inside another role's existing banner section.
- If you must change the actual value of an existing declaration outside your section (rare — e.g. a
  spacing value the Design-System engineer's contract requires everywhere), make the smallest possible
  in-place edit and leave a one-line comment citing this contract, not a silent change.

## QA gate (run before you report your slice done)

At minimum, from the repo root:

```bash
npm run lint
npm run typecheck
```

Both must be clean for the files you touched (pre-existing unrelated warnings elsewhere are not your
responsibility to fix, but don't introduce new ones). If your role touches anything render-critical,
also start the dev server and load the affected route(s) in a real browser — check the console for
errors and confirm images actually resolve. The full validation suite (`npm run validate:canonical`,
`npm run format:check`, `npm test`, `npm run test:e2e`, `npm run build`) is run once at the end by the
orchestrator after all slices are merged — you don't need to run the e2e suite yourself, but you must not
knowingly break anything in the "must-not-break list" above.

---

# Role sections

Only read the section for the role you were assigned.

## Role 1 — Design-System and Global-Shell Engineer

Scope: `src/app/globals.css` (`:root` + base header/nav/footer/button/form/typography rules only — not
any existing `===== R2B2*` banner section), `src/components/site-header.tsx`, `src/components/
site-footer.tsx`.

Deliverables:
1. Add the token set above to `:root`.
2. Refine base typography scale (h1/h2/h3, body, eyebrow/label patterns) toward Concept A's restrained
   serif-headline / clean-sans-UI pairing — check `design_review/recovery_r2b2_direction/concept-a/
   style.css` for the specific type-scale relationships that concept used, adapt (don't copy verbatim)
   to fit the real app's existing heading sizes (`h1`/`h2`/`h3` are used across many routes — a change
   here is sitewide, be deliberate, keep hero `h1` legible and not oversized on narrow viewports, current
   file already has mobile overrides at `@media (max-width: 640px)` you should extend, not replace).
3. Add a subtle CSS-only "tactile surface" treatment (grain/texture) as a reusable utility class (e.g.
   `.surface-tactile`) other roles can opt into on large panels — layered low-opacity
   `repeating-radial-gradient`/`radial-gradient` using `--grain-speck`, no images.
2. `.button` family: refine toward Concept A restraint — the primary/coral CTA stays confident but the
   "controlled asymmetry, tactile surfaces, premium whitespace" language should read in button
   radius/shadow/weight too. Use `--shadow-soft-sm` where a lifted button feel is appropriate.
3. `site-header.tsx` / its CSS: preserve every existing interactive/accessibility behavior (search form,
   mega panel, mobile drawer focus trap, cart/wishlist count badges, the demo-strip/offer-bar disclosure
   rows) — this is a visual refinement pass (spacing, type, the Pantryform logo's presentation, hairline
   treatments, a touch of asymmetry/warmth) not a rebuild. **The Pantryform logo asset paths and usage
   must not change** (`/brand/pantryform-logo-header.png`, `/brand/pantryform-mark.png`,
   `/brand/Pantryform-logo-final.png`, `/brand/pantryform-mark-square.png` if you choose to use the
   square mark somewhere new — do not crop, recolor, or otherwise alter the logo files themselves, only
   how they're framed/sized/spaced in layout).
4. `site-footer.tsx`: same — visual refinement (warmer surface, better rhythm between the brand block/
   newsletter form/nav columns/disclosure), preserve every link, the newsletter form's local-only submit
   behavior, and the exact disclosure copy (legal/provenance text — do not edit its wording).
5. Form controls (search input, filter selects, newsletter input, checkout radio "profile-choice" cards)
   get a shared refined base treatment here (border/radius/focus-ring using `--focus`, spacing) so every
   downstream role inherits consistent inputs rather than reinventing them.

When done: confirm `npm run lint` / `npm run typecheck` clean, load `/` and any other route in a live dev
server, confirm header/footer/nav/mobile drawer/search still all function, confirm no visual regression
to spacing so severe it breaks other routes you didn't touch (quick spot-check `/shop`, `/products/
callebaut-811-dark-chocolate-callets` or any real product slug, `/cart`).

## Role 2 — Homepage and Discovery Engineer

Scope: `src/app/page.tsx`, `src/components/hero-collage.tsx`, `src/components/department-atlas.tsx`
(visual/markup only — do not touch its `useGroupedReveal` call or `data-reveal-group`/`.department-tile`
selectors, Motion role depends on them), `src/components/product-rail.tsx` (wrapper markup/CSS only — do
not touch `ProductCard` itself, that's Role 3's), plus a new banner section in `globals.css` for
homepage-specific classes (`.commerce-hero`, `.hero-collage`/`.collage-*`, `.department-atlas`/
`.department-tile`, `.rail-*`, `.brand-strip*`, `.promo-*`, `.recipe-bridge*`, `.trust-strip`,
`.editorial-heading*`).

**Do not remove or rename these data attributes anywhere** — the motion system depends on them:
`data-measure-reveal`, `data-reveal-group`, `data-parallax-layer="z2"|"z3"|"z4"` (on the four hero-collage
images specifically), `data-crossfade-image`, `data-crossfade-with`. You may add markup around them
freely.

Deliverables — the homepage rhythm required is:
1. Global commerce header (Role 1's — don't touch, just verify it renders correctly above your hero).
2. Concept A hero: apply the concept's asymmetric split / staggered overlapping product-photo framing to
   the existing `.commerce-hero` + `.hero-collage` (4 real product images: large + two secondary + one
   foreground accent — already wired via `HeroCollage`'s props in `page.tsx`). Real packshots at
   meaningful scale, soft `--shadow-soft` lift, restrained palette — reference `concept-a/homepage.html`'s
   hero for the compositional idea, adapt to the real 4-image collage structure that already exists here
   (don't reduce it to fewer images, don't add new ones).
3. High-confidence category discovery: `DepartmentAtlas` — visual refinement only (spacing, card surface,
   typography), preserve its existing paired-tile stagger layout the motion system times against.
4. Curated bestseller/editorial feature: the `pattern="editorial"` `ProductRail` call already renders one
   large feature pick beside a stacked list — refine visually per Concept A, don't collapse to a grid.
5. Brand discovery: the current `brand-strip-section` is a plain flat list of brand name text pills
   (`popularBrands` array in `page.tsx`) — this is the weakest section relative to "brand discovery" as a
   real merchandising moment. Elevate it: consider Concept C's taxonomy/index discipline (e.g., a
   structured typographic list with subtle rule lines / index marks) applied in Concept A's restrained
   palette — still no new images, brand names remain plain text (no logo assets exist for these real
   third-party brands and none should be created/fetched).
6. Varied product merchandising: the `promo-split` two-panel section + `pattern="filmstrip"` new-arrivals
   rail + `pattern="split"` essentials rail already provide 3 more genuinely different compositional
   patterns beyond the bestseller editorial one — refine each visually, keep them distinct from each
   other (this variety is the whole point, don't homogenize them).
7. Tools/packaging feature: `pattern="shelf"` rail — refine visually, keep its denser/smaller-format
   character (it's deliberately different from the other rails).
8. Recipe bridge: `recipe-bridge recipe-bridge-compact` section — refine visually, preserve the real
   recipe link/CTA.
9. Trust/service strip: `trust-strip` — refine visually (currently four plain text blocks; give it more
   compositional presence without becoming another card grid).
10. Branded footer: Role 1's — don't touch.

Every consecutive section must read as compositionally distinct — don't let the "refine visually" work
regress the four rail patterns back toward looking like the same card grid repeated. This IS the specific
defect the whole R2B2V gate exists to fix.

## Role 3 — PLP, Category and Search Engineer

Scope: `src/components/product-card.tsx`, `src/components/product-grid.tsx`, `src/components/
shop-explorer.tsx`, the thin route files that render it (`src/app/shop/page.tsx`, `src/app/shop/
[department]/page.tsx`, `src/app/shop/[department]/[category]/page.tsx`, `src/app/search/page.tsx` —
composition/copy only, these are otherwise mostly just data-fetch + `<ShopExplorer>` wrappers), plus a
new banner section in `globals.css` for `.product-card`, `.product-image-canvas`, `.rp-card`/`.rp-image`/
`.rp-badge`/`.rp-wishlist`/`.rp-add` (the rail-variant card rules — Role 2 renders these via `ProductRail`
but you own the rule definitions), `.product-badge`, `.product-wishlist`, `.product-add`, `.card-facts`,
`.availability`, `.filters`, `.filter-group`/`.filter-checkboxes`, `.category-chips`, `.results-count`,
`.empty-state`, `.grid-merch-break`, `.page-hero`, `.breadcrumbs`.

**Preserve exactly:** all filtering/sorting/search/wishlist/quick-add JS logic in `shop-explorer.tsx` and
`product-card.tsx` — this is a visual-only pass on these files. Do not rename the `.product-card` root
class or its `variant`/`badge` prop contract. Do not change `/search?q=cocoa`'s result count (don't touch
the filter predicate).

Deliverables:
1. Concept A presentation: warm restrained card surface, real packshots dominant within
   `.product-image-canvas`/`.rp-image` (already correctly sized via the existing `object-fit`/inset
   overrides — refine border/radius/shadow/typography around them, don't shrink the image area).
2. Concept C's grid discipline and taxonomy, borrowed narrowly: a visible, considered grid rhythm
   (consistent gutters/alignment) and a light taxonomic touch — e.g., a small, quiet category/department
   label treatment on the category-intro header (`.page-hero`) or a subtle index/count element — without
   adopting C's ink/mono aesthetic wholesale. Keep it warm (Concept A palette), not clinical.
3. Category introduction (`.page-hero` on `/shop/[department]` etc.): premium but NOT tall — the contract
   explicitly says "without excessive height." Check the current `.page-hero` rules and keep it compact.
4. Filters/sort bar (`.filters`): refine visually, keep every input/select/checkbox/button functioning
   identically. Consider Concept A's calmer border/radius language here.
5. Four-column desktop / two-column mobile grid: `.product-grid` already does this via existing media
   queries (4-up desktop, 3-up ~1024px, 2-up ≤640px) — verify/adjust breakpoints only if needed to match
   "readable four-column desktop and two-column mobile," refine card visuals, don't change the column
   logic wholesale.
6. Intentional merchandising breaks: `.grid-merch-break` already exists (inserted by `ProductGrid` after
   the first 8 items and every 16 after) — currently a thin text divider row. Give it real visual presence
   per Concept A/C (a considered rule/label treatment, not another product-card-shaped box) so it reads as
   an intentional break, not a stray line.
7. Consistent product-image scale: confirm/tune `.product-image-canvas`'s padding/inset percentages so
   every product (across all 48, varied aspect ratios) reads at a consistent, confident scale — this was
   already tuned in earlier phases (search the file for the R2B2V comments explaining the `!important`
   overrides needed to beat Next.js `<Image fill>` inline styles) — don't remove those overrides, refine
   the values if the visual result needs it.
8. Search results and no-results states: `shop-explorer.tsx`'s `.empty-state` branch (has-query vs.
   filtered-to-nothing) — refine visually, preserve both distinct copy branches and their recovery links.

## Role 4 — PDP and Commerce Engineer

Scope: `src/components/product-detail.tsx`, `src/components/cart-view.tsx`, `src/components/
checkout-form.tsx`, `src/components/confirmation-view.tsx`, `src/components/wishlist-view.tsx`, the thin
route files (`src/app/products/[slug]/page.tsx`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`,
`src/app/order-confirmation/[reference]/page.tsx`, `src/app/wishlist/page.tsx`), plus a new banner
section in `globals.css` for `.pdp-*`, `.buy-panel`, `.variant-*`, `.quantity-*`, `.facts-section`,
`.fact-*`, `.cart-*`, `.checkout-layout`, `.profile-choice`, `.confirmation`, `.purchase-actions`, and the
new mobile sticky CTA bar rules.

**Preserve exactly:** every string in the "must-not-break list" above that lives in these files (Add to
Cart button name, checkout labels/submit name, confirmation text, cart-empty text). Preserve the
`useImageCrossfade` wiring in `product-detail.tsx` verbatim — the `data-crossfade-image` element's `key`,
the `data-crossfade-with` elements, and `.pdp-primary` remaining the crossfade's positioned reference
frame. You may restyle all of these, not remove/rename them. Do not touch `commerce-provider.tsx`.

Deliverables:
1. Concept A PDP: large, credible product presentation — gallery and buy panel composed as one coherent
   above-fold experience on desktop (they already sit side-by-side via `.pdp-layout`'s two-column grid —
   refine proportions/spacing/surface so they read as one composed block, not two independent boxes;
   there's already an R2B2V comment about nudging the gallery's top edge to align with the buy panel's
   eyebrow — build on that idea, don't remove it).
2. Concept C's factual-information clarity: the tri-state critical-facts section (`FactValue` in
   `product-detail.tsx` / `.fact-known` / `.fact-pill.fact-not-applicable` / `.fact-not-provided`) is
   explicitly called out in this brief as needing work — **"truthful unavailable-data presentation
   without unfinished-looking 'Information not provided' pills."** The current `.fact-not-provided`
   treatment (italic text + left tick border, no pill) was already a deliberate move away from a
   dashed-pill placeholder in an earlier phase — assess whether it now reads as premium/intentional or
   still looks unfinished, and refine the typography/spacing/icon-or-mark treatment so a shopper reads it
   as "we deliberately disclose what we don't know" rather than "this field is broken/empty." **The exact
   copy "Information not provided" must not change** (it's a protected phrase per `docs/Decision_Log.md`
   D-017) — visual treatment only. Apply a similar factual-clarity pass to the variant selector and
   quantity stepper (clear, legible, spec-sheet-adjacent precision — small caps labels, tabular numerals
   for prices, restrained rule lines) without adopting Concept C's full ink/mono look.
3. Concept B's mobile sticky price + Add-to-Cart bar: on mobile PDP, add a `position: sticky; bottom: 0;`
   bar (see `design_review/recovery_r2b2_direction/concept-b/style.css` around `.cta-row` for the
   reference pattern, adapt visually to Concept A) showing price + the Add to Cart button, persistently
   visible without scrolling. It must satisfy `Sticky bar must not obscure content, footer, dialogs or
   keyboard focus` — give it a safe-area-aware bottom inset, ensure it doesn't sit on top of the facts
   section content permanently (only within the PDP's own scroll region — don't make it globally fixed
   across route changes), and make sure it doesn't trap or hide keyboard focus (test tabbing through the
   page with it present) or overlap the mobile nav drawer/dialog if opened from a product page.
4. **Explicit fix for a gap found in the concept-review phase:** on mobile, place the variant (pack-size)
   selector and quantity stepper immediately after the core product summary (brand/title/short
   description/price) — do NOT let them fall below the fold or arrive only after scrolling past other
   content. Combined with item 3's sticky CTA, a mobile shopper should be able to see product identity,
   pick a variant, adjust quantity, and tap Add to Cart, all within one screen or one short scroll — not
   have to hunt for the variant chips. Reorder the DOM/CSS as needed on the mobile breakpoint to achieve
   this (desktop layout is unaffected, desktop already shows the full buy-panel with everything visible).
5. Desktop: confirm variant, quantity and CTA remain visible above the fold at 1440×900 (they already
   are — verify your restyle doesn't push them down).
6. Related-product merchandising: PDP's related-products section (uses `ProductCard` grid variant if
   present — check `src/app/products/[slug]/page.tsx`) — refine spacing/heading treatment to match the
   new system, don't touch `ProductCard` itself (Role 3's file).
7. Cart (`cart-view.tsx`): improve line-item presentation (already has a coral left-accent border per an
   earlier phase), totals/summary card, and preserve the "simulated commerce" disclosure text exactly.
8. Checkout (`checkout-form.tsx`): improve the profile-choice cards, error-summary state, and summary
   card — **do not introduce editorial friction** (no added copy steps, no decorative interruptions to
   the two-field form) — this must stay fast and simple to complete, just visually consistent with the
   rest of the system. Preserve the exact required label/button text from the must-not-break list.
9. Confirmation (`confirmation-view.tsx`) and empty/invalid states across cart/checkout/wishlist: apply
   the same premium system, preserve every required text string.

## Role 5 — GSAP / 2.5D Motion Engineer

**Runs after Roles 1–4 have landed and merged** — you need to see the final DOM/class structure, not
guess at it. Scope: `src/motion/*.ts`, `src/components/motion-enhancer.tsx`, plus small additive edits
into `hero-collage.tsx` / `department-atlas.tsx` / `product-detail.tsx` ONLY if a new hook needs a new
data-attribute or ref wired in (coordinate by grepping for the existing `data-*` attributes first — most
of the plumbing already exists and should just need adaptation, not new files).

Do not touch `tokens.ts`'s existing numeric values without a specific reason tied to the new composition
— they're a deliberately tuned, documented system (durations/eases/staggers/distances all cite a spec).
You may add new tokens for new moments (e.g. a sticky-bar entrance) following the same naming/comment
style.

Deliverables — purposeful moments only, nothing else:
1. Refined hero depth response: verify `useHeroParallax` still targets the right `data-parallax-layer`
   elements after Role 2's hero restyle (z2/z3/z4 on the four collage images) — adapt if Role 2 changed
   the DOM structure, otherwise just confirm it still works live.
2. Section/merchandising entrances: verify `useGroupedReveal` still finds `[data-reveal-group]` on the
   department atlas and every product-rail pattern after Role 2's changes — same, adapt selectors only if
   truly needed, otherwise confirm working live in a real browser (this hook uses IntersectionObserver,
   easy to silently break by removing a wrapper element).
3. Product-gallery/variant transitions: verify `useImageCrossfade` still works correctly on the real PDP
   after Role 4's restyle — **re-test the shared-image crossfade case specifically** (multiple products
   resolve the same `media.src` across variants — Callebaut 811, Urban Platter Vanilla Extract, Nutella
   are examples already called out in the hook's own comments) — this is the exact thing this brief asks
   you to "preserve and re-test."
4. Subtle feedback for cart/wishlist: the cart badge already has a pulse animation
   (`count-badge--pulse`, CSS `@keyframes`, already reduced-motion-safe via the global animation-duration
   override). Consider adding an equivalent small, restrained acknowledgment to the wishlist heart toggle
   on save (reuse the same token-driven duration, e.g. `MOTION_DURATION.feedback`) — small scope, don't
   over-build this.
5. New: a subtle entrance for the new mobile sticky CTA bar (Role 4's addition) — e.g. a short
   translate-up-and-settle on first mount, using `MOTION_DURATION.overlay`/`MOTION_EASE.enter` from the
   existing token file, gated the same way every other hook here is (skip entirely under
   `prefers-reduced-motion: reduce`).
6. Reduced-motion completeness: confirm every motion moment (existing + your one new addition) has a
   complete, functional reduced-motion fallback — the final visual composition must be identical whether
   or not motion runs, only the transition is removed/shortened. `MotionEnhancer` and `useImageCrossfade`
   already gate correctly; verify your new sticky-bar entrance does too.

No scroll hijacking, no pinning, no WebGL — none of the existing hooks do this and none of your additions
should either.

When done: load the homepage, a PLP/category page, and a PDP with multiple variants (including one of the
shared-image products above) in a live dev server with motion on, then again with `prefers-reduced-motion:
reduce` emulated, and confirm both work with no console errors.

## Role 6 — Independent QA / Visual / Accessibility / Performance Agent

**Runs after Role 5 has landed and merged.** You did not write any of this implementation — approach it
skeptically. Your job is explicitly NOT to rubber-stamp a technically-green build; the brief says "reject
deviations from the selected concept instead of merely reporting technical success."

You will be given the full QA checklist and locked visual rules separately when this role is dispatched —
do not start until you receive that follow-up message with the specific checklist and evidence-path
instructions.
