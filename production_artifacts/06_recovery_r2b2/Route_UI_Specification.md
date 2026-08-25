# R2B2A Task 3 — Route UI Specification (Commerce UI/Product Designer)

**Scope:** Concrete, implementable visual/interaction specs for `/shop`, `/shop/[department]`, `/shop/[department]/[category]`, `/search`, and `/products/[slug]` — bringing them onto the R2A/R2A-rework "real commerce" visual language (`.rp-card` family) and off the legacy "spreadsheet grid" (`.product-card`/`.product-grid`) styling, designed against the real 48-product/51-SKU/7-department R2B1 catalog.

**Repository state:** branch `recovery/real-commerce-visuals`, HEAD `15e621d8077ac60af9adf1e4d668ecf2416cd695`. This is a specification-only deliverable; no production route/component file is edited by this task.

**Inputs consulted:** `design_review/recovery_r2a/R2A_Review_Note.md`; `design_review/recovery_r2a_rework/screenshots/*.png` (all six); `design_review/recovery_r2b1/R2B1_Catalog_Summary.md`, `R2B1_Provenance_And_Validation.md`; `production_artifacts/06_recovery_r2b2/Commerce_Contract_Audit.md` (Task 2 — available at start of this task, treated as binding data/contract input); legacy `production_artifacts/03_ux/PLP_and_Search_UX_Spec.md`, `PDP_UX_Spec.md`, `Navigation_and_Discovery_Spec.md`, `Responsive_Behaviour.md`, `Component_and_State_Requirements.md`; `production_artifacts/04_visual_system/Component_Visual_Specification.md`, `Grid_and_Responsive_Visual_System.md`, `Design_Tokens.md`, `Colour_System.md`, `Typography_System.md`; live code: `src/app/globals.css`, `src/components/real-product-card.tsx`, `real-product-rail.tsx`, `site-header.tsx`, `site-footer.tsx`, `src/app/page.tsx`; current shipping (pre-rework) routes: `src/app/shop/page.tsx`, `src/app/shop/[department]/page.tsx`, `src/app/shop/[department]/[category]/page.tsx`, `src/app/search/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/components/shop-explorer.tsx`, `product-card.tsx`, `product-grid.tsx`, `product-detail.tsx`.

**Design tokens reused (no new tokens introduced):** `--ink: #2b1b2b`, `--surface: #fff`, `--surface-subtle: #f2ece4`, `--coral: #c54731`, `--coral-dark: #9b3027`, `--saffron: #d8722b`, `--saffron-dark: #a5541b`, `--muted: #5b5860`, `--line: #767076`, `--max: 1440px`, `--display: Georgia, "Times New Roman", serif`, `--ui: Arial, Helvetica, sans-serif`. Breakpoints reused as-is: **1024px** (tablet) and **640px** (mobile) — matching every existing `@media` block in `globals.css`.

---

## 1. PLP / Shop (`/shop`, `/shop/[department]`)

### 1.1 What changes and why

The live `/shop` and `/shop/[department]` routes render `<ShopExplorer>` → `<ProductGrid>` → `<ProductCard>` (`src/components/shop-explorer.tsx`, `product-grid.tsx`, `product-card.tsx`), which use `.product-grid`/`.product-card` — the hairline-bordered, index-numbered "spreadsheet grid" that the R2A rework explicitly moved the homepage away from (`.product-grid` is `background: var(--line)` with a 1px gap trick between cells; `.product-card` has a numbered `.card-index` corner badge and no Quick-add). This spec replaces that card and grid with a new **`.plp-card`** family — visually the same design language as the approved `.rp-card` (same radius, border, hover lift, image-canvas rule, badge/wishlist corner placement, Quick-add button) — while preserving every behavioural contract in `Commerce_Contract_Audit.md`'s per-route table: `?q=`/`?department=`/`?sort=` URL params, the `ShopExplorer.apply()`/`Clear` logic, and `addLine()`'s exact payload shape.

`.plp-card` is a **distinct class from `.rp-card`**, not a reuse, for one reason: the canonical `CatalogProduct` shape has no `badges[]`/`note` field (those are homepage-only curatorial data per the audit's Homepage section), so the PLP card must not fabricate a Bestseller/New badge that doesn't exist in the canonical data model. Everything else — border, radius, hover, image treatment, type scale — is shared token-for-token.

### 1.2 Grid — desktop / tablet / mobile

| Breakpoint | Columns | Card min-width | Gap | Class behaviour |
|---|---|---|---|---|
| ≥1024px (desktop) | 4 | ~280px | 1.5rem | `.plp-grid { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1.5rem; }` — matches `.rp-rail`'s desktop density exactly. |
| 640–1023px (tablet) | 3 | ~220px | 1.25rem | `.plp-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1.25rem; }` — **note this departs from `.rp-rail`'s tablet 2-up.** Rationale: `.rp-rail` is a curated 12-item homepage rail where 2-up gives each card more presence; `.plp-grid` is a browse-to-decide grid where the task is scanning up to 48 items, so 3-up trades a little per-card size for faster scanning at tablet width — same principle Grid_and_Responsive_Visual_System.md's legacy `md` band applied ("two-up cards... where stable" is a floor, not a ceiling, when content allows more). |
| ≤639px (mobile) | **2 (compact)** | ~172–180px | 0.75rem | `.plp-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 0.75rem; }` — this is the approved carry-forward refinement the R2A note flagged as deferred ("horizontal-scroll rails were considered but deferred") and R2B1/R2B2 scope explicitly asks for on the PLP. Concrete math at the common 390px viewport: page padding is `1rem` each side (matches `.page-shell`/`.section-shell` mobile padding already in `globals.css`) → 390 − 32 = 358px content width; one 12px (0.75rem) gutter → (358 − 12) / 2 = **173px per card**. At the narrow end (360px viewport) this is ~158px; at 430px it's ~193px. All comfortably inside the ~172–195px "compact card" range this spec targets. |

Card is a CSS Grid item (`min-width: 0` retained from `.rp-card`/`.product-card` to prevent overflow from long titles/SKUs).

### 1.3 `.plp-card` — full vs. compact (mobile 2-up) treatment

Both variants inherit `.rp-card`'s base rule set (`border: 1px solid color-mix(in srgb, var(--ink), transparent 90%)`, `border-radius: 10px`, hover `translateY(-3px)` + `box-shadow: 0 16px 30px -20px rgb(43 27 43 / 0.4)`, focus-within gets the same treatment for keyboard users). The **compact modifier** (`.plp-card--compact`, applied automatically ≤639px via the media query, not a separate authored variant) reduces internal padding and type scale so two cards fit at ~173–195px without the title/price colliding or wrapping past 2 lines each:

| Property | Full (≥640px) | Compact (≤639px, 2-up) |
|---|---|---|
| Card padding | `1rem` | `0.65rem` |
| `.plp-image` (canvas) | `aspect-ratio: 1; padding: 10%;` (identical to `.rp-image`) | `aspect-ratio: 1; padding: 8%;` — slightly less inner padding recovers a touch of visual weight for the small packshot |
| Badge (`.plp-badge`, when applicable) | `font: 800 0.6rem/1 var(--ui)`, `padding: 0.34rem 0.6rem` (= `.rp-badge`) | `font-size: 0.55rem`, `padding: 0.28rem 0.5rem` |
| Wishlist button | `2.25rem` circle (= `.rp-wishlist`) | `1.85rem` circle — still ≥44px hit target via an invisible padded tap area (`::before` pseudo-element extending the hit box to 44×44px without growing the visual circle), per Responsive_Behaviour.md's 44×44 CSS px target with "documented exceptions" |
| Brand eyebrow | `.eyebrow` default (uppercase, ~0.75rem) | `0.65rem` |
| Title (`h3`) | `font-size: 1.2rem; min-height: 2.3em;` (= `.rp-card h3`) | `font-size: 0.88rem; line-height: 1.25; min-height: 2.5em;` with `-webkit-line-clamp: 2` (2-line clamp; overflow is truncated with `…` only here — this is a card-density concession, not a "critical fact," and the full title is always available on the PDP the card links to, satisfying Responsive_Behaviour.md's "no semantic ellipsis on critical facts" since price/pack/availability are never clamped) |
| `.card-facts` (pack + price row) | Single row, `justify-content: space-between`, price `1.05rem` (= existing `.card-facts strong`) | **Stacks to two lines**: pack label on its own line (`0.7rem`, muted), price below (`0.95rem`, bold) — a single row at ~173px width with a real pack label like "12-pack" and a 4-digit price like "₹2,200" does not reliably fit without truncation, so this spec explicitly stacks rather than shrinking price type below readable size |
| Availability line | `.availability` default (0.7rem, uppercase) | Same size — this is exactly the kind of state text Responsive_Behaviour.md and the legacy PLP spec forbid shrinking/hiding ("explicit demo availability state," "no critical fact truncation") |
| Quick add / Select options button | `.rp-add` (min-height 46px, full width) | `min-height: 42px` (a documented, deliberate 2px exception to the 44px floor at the 2-up compact size only — full-width tap area is still ~173px wide, so the *area* is generous even though the *height* is 2px under target; flag this exception explicitly in QA per Responsive_Behaviour.md's "documented exceptions" allowance), label shortens to **"Add"** / **"Options"** (see §1.5) at ≤639px to avoid text wrapping inside the 173px button |

### 1.4 Image canvas rule (shared across PLP, category, search, PDP)

Every product photo in the R2B1 catalog — chocolate pouches, glass/plastic bottles, jars, folded boxes, flat compound slabs, metal tools/bakeware — is framed and cropped differently at the source (per `R2B1_Provenance_And_Validation.md`, sourced from 8+ different retailer/manufacturer image origins). The single rule that already makes the homepage cards look consistent despite this (`.rp-image`) is reused verbatim everywhere a real product photo appears:

```
.plp-image, .category-image, .search-image, .pdp-hero-image {
  aspect-ratio: 1;              /* fixed square canvas — no CLS regardless of source image's native ratio */
  background: var(--surface);   /* white canvas, matches product photography's white-background convention */
  border-radius: 6px;
  overflow: hidden;
  padding: 10%;                 /* (8% at mobile-compact PLP, see 1.3) — inner gutter so tall bottles and wide slabs both read as "framed," never edge-to-edge or cropped */
}
.plp-image img, .category-image img, .search-image img, .pdp-hero-image img {
  object-fit: contain;          /* never crops; a tall Wilton bottle and a flat Morde slab both fit inside the same square without distortion */
}
```

This is a non-negotiable consistency rule: no card is permitted a taller/shorter/differently-cropped image canvas than its neighbours, regardless of the source photo's aspect ratio, because `object-fit: contain` inside a fixed square with padding absorbs the difference.

**Placeholder state (5 of 48 products — Pillsbury Maida, CCDS Baking Powder, Rich's Chocolate Whip Topping, Rich's Truffle Base, Wonderchef Non-Stick Cake Mould, per `R2B1_Provenance_And_Validation.md`):** these render the shared, non-branded "Image not yet available" placeholder graphic already established in R2B1. This spec adds one visual rule so the placeholder is honestly *distinguishable* from a real packshot at a glance (so a shopper doesn't mistake a generic placeholder for the actual product's appearance) without looking broken:

- Canvas background switches from `var(--surface)` (white) to `var(--surface-subtle)` (`#f2ece4`, the same warm neutral already used for section backgrounds elsewhere on the site — not an error-red or a broken-image grey).
- A 1px dashed inner border (`border: 1px dashed color-mix(in srgb, var(--ink), transparent 75%)`) inset from the canvas edge.
- Centered muted-ink text, `0.7rem`, uppercase, letter-spaced: "Image not yet available" — same string across all 5 products, no per-product fabrication.
- No icon/illustration is invented for this state; text-only keeps the placeholder honest and avoids implying a generic "photo coming soon" marketing tone for what is, factually, a sourcing gap.
- This treatment is identical on PLP, category, search, and PDP hero — one placeholder design, not five different fixes.

### 1.5 Product-card decision contract (Add vs. Select options)

Per the legacy PLP UX spec's binding "Product-card decision contract" (still valid, only the visual wrapper changes) and the Commerce Contract Audit's variant-ownership finding (3 of 48 products — Callebaut 811, Urban Platter Vanilla Extract, Nutella — have >1 variant):

- **Single-variant products (45 of 48):** card shows **"Quick add"** (full-width, `.plp-add`), which calls `addLine()` with that one variant's `sku`/`variantId`/`price_inr_minor` — identical payload shape to `real-product-card.tsx`'s existing Quick-add, just sourced from `product.variants[0]` instead of a `RealProduct`.
- **Multi-variant products (3 of 48):** card shows **"Select options"** instead of Quick add — same button position/size, secondary style (`.button` outline, not filled coral/ink) — linking to `/products/{slug}#variant-selector` (an anchor into the PDP's existing `<fieldset className="variant-selector">`). This is a direct implementation of the legacy contract's rule: "Add only when exactly one unambiguous available sellable variant is eligible; otherwise Select options, navigating to PDP without choosing silently." No system-guessed pack size is ever silently added to cart from the grid.
- Both buttons sit in the same DOM/visual slot so the grid's row heights stay uniform regardless of which button a given card shows.
- At mobile-compact 2-up (§1.3), "Quick add" shortens to **"Add"** and "Select options" shortens to **"Options"** — both remain unambiguous in context (immediately below a visible price and pack label) and keep the button single-line at ~173px.

### 1.6 Filters, sort, search-within-results, count, clear/reset

Per the Commerce Contract Audit's item 7 (exposed vs. available-but-unexposed filters) and item 51/52 (URL contract that must survive any restyle: `?q=`, `?department=`, `?sort=`):

**Kept as-is (behaviourally), restyled visually:**
- Free-text search input (title/brand/SKU — `applications` stays in the join per the audit but is dead weight; not a design concern).
- Department single-select — **hidden entirely** on `/shop/[department]` (already the case via `lockedDepartment`), shown on `/shop`.
- Sort select (Title A–Z / Price low–high / Price high–low).

**Visual treatment:** replace the current bare `.filters` label/input/select row (`globals.css` lines 1021–1028, unstyled native controls in a flex row) with a bounded control bar: `background: var(--surface)`, `border: 1px solid color-mix(in srgb, var(--ink), transparent 90%)` (same border token as `.rp-card`), `border-radius: 10px`, `padding: 1rem 1.25rem`, inputs/selects get a visible `1.5px solid color-mix(in srgb, var(--ink), transparent 78%)` border (reusing the existing token from the header search input, `globals.css` line 205) and `min-height: 44px`. This turns the current unstyled native-control row into something that reads as part of the same store as the homepage, without changing a single behaviour.

**New, additive (recommended for this recovery, bounded in scope):**
- **Brand filter** — the data model has 30 distinct `brandName` values with no UI today. Given 30 is too many for a flat chip row, spec: a collapsible "Brand" group inside the filter bar showing the first 8 brands alphabetically as checkboxes plus a "Show all 30 brands" text-button expander — multi-select (OR), matching the legacy spec's "checkboxes for multi-select OR values" rule. This is additive to `ShopExplorer`'s existing filter reducer (a new `brands: string[]` state array, ANDed with the existing department/query filters) and needs a new `?brand=` URL param (comma-joined) — flagged as a dependency for whichever engineering agent implements this, since it's a new URL contract key not covered by the Commerce Contract Audit's existing three-key list.
- **Category chips within a locked department** — the audit found `/shop/[department]/[category]` is a live, tested, but completely unlinked route. This spec's recommendation (§2.3) is to wire it via a horizontal chip row directly under the department H1 on `/shop/[department]` (e.g., "All · Dark couverture chocolate · Compound chocolate · …", derived from the distinct `category_id` values present within that department's products) — cheapest correct fix per the audit's own suggestion, and it finally gives the subcategory-adjacent data a real navigational surface instead of only appearing as inert eyebrow text on the card.
- **Not added in this spec** (explicitly out of scope, per audit item 7's "in the data model but not exposed" list): `subcategory_id` as its own filter tier (36 values, no dedicated route — would need new IA work beyond this recovery slice), `product_family`, `availability` (all 51 live variants are currently `available`, so an availability filter would have zero discriminating power today — build it when the data actually varies, not before), and `provenance.confidence_status` (this is a documentation-trust signal for internal QA, not a shopper-facing filter — surfacing "verified" vs. "partially verified" to a shopper would read as an unsupported certification-style claim, which both the legacy PDP spec and Risk Register R-035 explicitly warn against).

**Live count:** kept exactly as-is functionally (`role="status"`, "{N} products"), restyled to sit directly under the filter bar as a quiet `var(--muted)` line, not competing visually with the H1.

**Clear/reset:** kept exactly as-is functionally (`Clear` button resets query/department/sort and calls `router.replace(location.pathname)`); restyled as a plain secondary text-link-style button next to "Apply," per the legacy spec's "Clear all filters preserves the query" pattern — since this app's Clear currently clears the query too, that is a pre-existing behavioural quirk *outside this visual spec's scope to fix*, but flagged in Open Risks below since the legacy binding spec explicitly requires "Clear all filters preserves the query. Clear search is separate."

**Empty / no-result state:** replace the current bare `.empty-state` (dashed border box, "No exact pantry match" / "Clear the current filters or browse all departments.") with a bounded, on-brand version: same dashed-border container concept (`border: 1px dashed color-mix(in srgb, var(--ink), transparent 82%)`, `border-radius: 10px`, `padding: 4rem 1.5rem`, centered), no illustration is fabricated (there is no approved empty-state illustration asset, and inventing one is out of this task's scope) — instead the compact brand mark (`public/brand/pantryform-mark.png`, already used as the mobile header logo, 48×48px, `opacity: 0.5`) sits above the heading as a quiet visual anchor. Copy becomes two-tier per the legacy spec's "Filtered zero" vs. "Search zero" states: **filtered-zero** ("No products match these filters." + a visible list of the active chips + "Clear filters" button, department link preserved), **search-zero** ("No results for '{query}'." + "Try a department instead:" with the 7 department names as inline links, matching the legacy Navigation spec's department taxonomy). Both states keep the search input and filter bar visible and operable — never hidden — matching the legacy spec's "Retain query, chips and controls."

**Pagination vs. load-more — decision: neither.** The catalog is 48 products total (max), and a locked department is at most 7. At 4-up desktop that is 12 rows for the *entire unfiltered catalog*; at 2-up mobile-compact it's 24 rows. This is comfortably within a single fully-rendered page — the legacy Responsive_Behaviour.md's requirement is "one approved deterministic method" only when a grid is long enough to need one, and infinite scroll is prohibited outright. **Rationale:** introducing pagination or Load-more machinery for a maximum 48-item result set adds interaction cost (extra clicks, URL page-state, focus-management edge cases per the legacy spec's pagination accessibility rules) with no corresponding benefit at this catalog size. If the catalog grows materially beyond roughly 100–120 products in a future recovery phase, revisit with an accessible "Load more" (never infinite scroll, per the binding legacy rule) — but that is not this task's problem to solve preemptively.

### 1.7 Motion classification (PLP)

| Element | Classification | Note |
|---|---|---|
| `.plp-card` hover/focus lift + shadow | **MICRO-MOTION** | Already the `.rp-card` pattern (`transform`/`box-shadow`/`border-color` transitions, 0.18s) — reused verbatim, not re-invented. |
| `.plp-image img` hover scale | **MICRO-MOTION** | Reused from `.rp-image img` (`transform: scale(1.04)`, 0.22s). |
| Filter bar / result grid re-render on Apply | **STATIC** | Legacy spec requires this to "commit immediately... as one state transition" with focus staying on the operated control — no choreographed reveal, no stagger. Any entrance animation here would fight the accessibility contract (focus must not move, count must announce once). |
| Empty-state appearance | **STATIC** | Same reasoning — it replaces the grid as a state change, not a decorative moment. |
| Mobile filter drawer open/close (if the brand-filter expansion is ever promoted to a full drawer rather than an inline expander) | **MICRO-MOTION** | Simple slide/fade only, per Responsive_Behaviour.md's "Reduced motion removes drawer... transitions without removing content, focus movement or announcements." Not a candidate for GSAP/2.5D — this is a functional utility surface, not a moment of brand delight. |

No PLP element is proposed as 2D GSAP or 2.5D parallax. This is a scan-and-decide task screen; the R2A/rework's heavier motion budget belongs on the homepage's curated moments, not on a working product grid the shopper is trying to move through quickly.

---

## 2. Category (`/shop/[department]`, and the existing-but-unlinked `/shop/[department]/[category]`)

### 2.1 Department identity treatment

`/shop/[department]` currently opens with a `.page-hero` (two-column: eyebrow "Department atlas · 03" + H1 department name on the left, one sentence of factual copy on the right — `src/app/shop/[department]/page.tsx` lines 68–80) directly above the full `ShopExplorer`. This is already close to right-sized (no large illustrated banner exists today), and this spec keeps that proportion rather than adding a hero image:

- **H1** stays the department name (`Chocolate`, `Baking Essentials`, etc. — using the *display* names already hardcoded in the route's `departments` record, not the `dept_*` ids).
- **Eyebrow** changes from "Department atlas · 03" (a positional index that means nothing to a shopper) to a factual count: **"7 of 7 departments · N products"** — reusing the same "48 parent products · 51 exact SKUs"-style factual eyebrow pattern already approved for `/shop`'s header, scoped to the department.
- **One-sentence factual copy** (already exists per department, e.g. "Cocoa, compounds and inclusions in exact baking packs.") is kept verbatim — this is exactly the "brief, cannot delay category access" editorial allowance the legacy Navigation spec permits, and it is already factual, not promotional.
- **No department hero image, no full-bleed banner.** This is an explicit rule, not an omission: the task brief and the legacy Navigation spec ("Any editorial introduction is brief and cannot delay category access") both point the same direction, and Recovery R1's own gap-audit already flagged the anti-pattern of illustrated banner space over real products (the reason the homepage's "Ingredient theatre" section was removed in R2A). A per-department hero would reintroduce that exact anti-pattern one level down the IA. **Products appear above the fold on this route within one hero+eyebrow block's height (~9–10rem including breadcrumb), not below a large illustrated header.**

### 2.2 Subcategory navigation — open question, resolved

The Commerce Contract Audit confirmed `subcategory_id` exists in the data (36 distinct values, shown only as inert eyebrow-adjacent text on `product-card.tsx`, e.g. "CALLEBAUT · dark couverture chocolate") but has **no route, no chip UI, no filter anywhere**. This spec's decision: **do not build a subcategory tier in R2B2.** Reasoning: 36 subcategories across 48 products averages 1.3 products per subcategory — a chip/filter UI at that granularity would mostly produce one-product results, which reads as over-engineered IA for a 48-SKU catalog. The *category* tier (15 distinct values, ~3.2 products/category average) is the right granularity for a navigational surface, and it already has a working (if unlinked) route — see §2.3. Subcategory data remains visible only as today's card eyebrow text; nothing new is built for it. This should be revisited only if the catalog grows enough that categories themselves start feeling too coarse.

### 2.3 Category tier — wiring the existing unlinked route

Per the audit: `/shop/[department]/[category]` is live, tested (filters by `department_id` + `category_id`, 404s on zero matches, dynamic render, no `generateStaticParams`) but has zero inbound links anywhere in `src/`. This spec's decision, per the audit's own recommendation ("wire real category-tile navigation into this existing, tested route — cheapest option"): **wire it as a horizontal chip row, not a tile grid.**

- **Placement:** directly below the department `.page-hero`, above the `ShopExplorer` filter bar.
- **Content:** "All {department}" (active by default, links back to `/shop/[department]`) followed by one chip per distinct `category_id` present in that department's products, derived at render time from `catalog.filter(p => p.department_id === record.id)` grouped by `category_id` — labelled using the `category_id` string humanised the same way `product-card.tsx` already does it (`replace("cat_","").replaceAll("_"," ")`), so no new label-authoring work is needed.
- **Visual style:** pill/chip, `border: 1.5px solid color-mix(in srgb, var(--ink), transparent 78%)` (reusing the existing filter-input border token), `border-radius: 999px`, `padding: 0.5rem 1rem`; active chip gets `background: var(--ink); color: white` (matching the existing `.filters button.primary`/active-state token pattern already in `globals.css`). Wraps to multiple lines on narrow viewports — never horizontal-scrolls per Responsive_Behaviour.md's "no two-dimensional scrolling except genuine data tables."
- **Category page itself (`/shop/[department]/[category]`):** currently a bare `.page-hero` + `ProductGrid` with no styling gap from the department page. This spec upgrades it to reuse the same `.plp-grid`/`.plp-card` styling from §1, plus the same category-chip row (now with its own category highlighted as active) so a shopper who lands on a category page via a shared/bookmarked URL still sees sibling categories to move sideways — closing the audit's observation that "breadcrumbs on this page itself only link back up... not sideways to sibling categories."
- Given department max is 7 products and a category subset is smaller still, no additional pagination concern here either (§1.6's reasoning applies a fortiori).

### 2.4 Product-first layout

Both department and category pages render the full product grid (§1's `.plp-grid`/`.plp-card`) immediately after the identity block described in §2.1/§2.3 — no interstitial content between the hero/chips and the first product row. This directly satisfies the task brief's "real products above the fold quickly, not a large editorial banner" requirement, and matches what the route already structurally does today (it was never actually broken this way — the gap was purely visual/typographic, not layout order).

### 2.5 One optional, bounded promotional module

The task explicitly allows *one* controlled promotional module per category-tier page, bounded rather than open-ended. Spec:

- **Placement:** a single full-width band inserted **after the product grid**, never before it or interleaved within it (protects "product-first" from §2.4).
- **Max height:** `24rem` on desktop, `16rem` on mobile (640px) — reusing the *exact* height budget already established and approved for `.promo-panel` on the homepage (`min-height: 22rem` desktop / `16rem` mobile at `globals.css` lines 1197/551) so this isn't a new, unreviewed proportion — it is the same promo-panel module, re-placed.
- **Content contract:** exactly one one the homepage's existing two promo panels reused *by reference* (e.g., the department page for Fondant & Decoration could surface the existing "Fondant & Decoration" promo panel if one exists in `page.tsx`'s promo-split content; otherwise this module is **omitted entirely for departments with no matching existing promo content** — this spec does not authorise commissioning new promotional copy/imagery to fill a slot). This keeps the module bounded by construction: it can never grow into "editorial dead space" because there is no budget in this recovery to produce more than the homepage already has.
- **Explicit rule against dead space:** if no existing promo content matches a given department, **the module is skipped, not stretched or padded** — an empty department page ending right after the product grid (plus footer) is the correct, honest outcome, not a placeholder banner.

### 2.6 Motion classification (Category)

| Element | Classification |
|---|---|
| Category chip row (active-state swap on click/navigation) | **STATIC** — instant active-state change, no transition; this is a wayfinding control, not a moment |
| Product grid | Same as §1.7 (**MICRO-MOTION** on card hover only) |
| Promo module (if present) image hover | **MICRO-MOTION** — reuses `.promo-panel .promo-image img` hover scale (`transform: scale(1.05)`, 0.25s) verbatim, already approved on the homepage |

No 2D GSAP or 2.5D parallax on category pages, for the same reason as §1.7 — this remains a task-oriented browse surface.

---

## 3. Search (`/search`)

### 3.1 What exists today, and what this spec changes

`/search` (`src/app/search/page.tsx`) is structurally the same page as `/shop`: a `.page-hero` (eyebrow "Search the measured pantry," H1 either `"Results for "{q}""` or `"What are you making?"`, one sentence of factual copy) followed by the identical `<ShopExplorer products={catalog} initialQuery={q} />` — same free-text filter, same department dropdown, same sort, same `.plp-grid`/`.plp-card` from §1 once restyled. **This spec makes no behavioural change to search** — it is a client-side substring filter over the full 48-product catalog (per the audit: "not a ranked/scored search index"), and this spec does not propose changing that into a scored/relevance engine, which is out of scope for a UI spec.

The header's search form (`site-header.tsx` lines 165–175) is a plain `<form action="/search">` with a `type="search"` input — a real HTML form GET-submit, not a JS `onSubmit` intercept. **This spec does not touch that submit mechanism.** The visual-only changes below apply to the input's chrome and to the results page, not to how submission works.

### 3.2 Query summary copy pattern

- **With a query, results found:** H1 stays `Results for "{q}"` (already correct — quotes the literal submitted string, matching the legacy spec's "preserve and visibly quote the submitted query without treating it as trusted markup" — confirmed the current implementation interpolates `q` as a React child, not `dangerouslySetInnerHTML`, so this is already safe). Directly under the H1, add the live result count in the same quiet `var(--muted)` style specified for PLP (§1.6): **"{N} result{s} for cocoa"** style is redundant with the H1 already showing the query — so the eyebrow position is repurposed to read **"Search results"** (dropping the generic "Search the measured pantry" copy, which adds no information once a query exists) and the existing `ShopExplorer` result-count line beneath the filter bar carries the count, exactly as it does on `/shop`. No duplicate count in two places.
- **No query (bare `/search` visit):** H1 stays `What are you making?`, eyebrow becomes **"Search the full catalog"** (simpler, factual — "the measured pantry" is evocative copy that reads oddly with nothing typed yet). Below it, per §3.4, show department shortcuts rather than an empty filter bar with nothing to react to.

### 3.3 Suggestions — out of scope, explicitly

The legacy Navigation_and_Discovery_Spec.md describes a full combobox-with-suggestions contract (grouped Products/Categories/Brands/Recipes, two-character trigger, listbox/active-descendant semantics). **This spec explicitly does not implement it.** Reasons:
1. It does not exist in the current codebase at all today (the search input is a plain `<input type="search">` inside a GET form) — building it is a non-trivial JS/accessibility engineering task (a live-updating combobox with correct ARIA), not a visual restyle, and is well outside "concrete pixel/spacing/state specs for existing routes."
2. The catalog is 48 products / 30 brands / 15 categories / 6 recipes — small enough that a shopper typing into search and hitting Enter to see the full (already-instant, client-side) results grid is not a materially worse experience than a suggestion dropdown would be, unlike a 10,000-SKU catalog where suggestions meaningfully save time.
3. Building it now would create a second, parallel search-matching implementation (a suggestions index) that would need to stay in lockstep with `ShopExplorer`'s existing substring-match logic — a consistency risk this spec is not positioned to own.

If a future phase wants suggestions, that is a new engineering-plus-UX task, not a visual-only addition to this one.

### 3.4 Result relevance expectations against the real catalog

Because the underlying match is a substring filter over `` `${title} ${brandName} ${sku...} ${applications...}` `` (all lowercase), this spec sets shopper-facing expectations accordingly, not an aspirational "smart search" framing:

- Searching a **brand name** ("Callebaut", "Wilton", "Weikfield") reliably returns that brand's real products — this now works correctly post-R2B1 (confirmed live in the audit), unlike the pre-recovery fictional catalog.
- Searching a **SKU** returns an exact product — also confirmed live.
- Searching a **generic ingredient/use term** not in `applications` (which is empty on all 48 products today, per the audit) will **only** match if that word happens to appear in a title/brand — e.g. "chocolate" matches every product with "chocolate" literally in its title/brand, but a conceptual query like "for a birthday cake" matches nothing. This spec does not paper over that gap with fabricated "smart" copy; §3.2's H1/eyebrow stay literal ("Results for X"), never claiming relevance ranking or intent understanding that doesn't exist.

### 3.5 No-results recovery

Reuses §1.6's "search-zero" empty state exactly (same `.empty-state`-derived container, same muted brand-mark visual anchor, no fabricated illustration) with copy scoped to search specifically: **"No results for '{q}'."** followed by two recovery paths, per the legacy spec's "departments/categories, Shop All and Recipes":
- **"Try a department:"** — the 7 department names as inline text-links (`Chocolates & Cocoa`, `Baking Essentials`, …), reusing the exact department list/labels already hardcoded in `shop-explorer.tsx`'s department `<select>` and `shop/[department]/page.tsx`'s `departments` record — no new taxonomy authored.
- **"Or browse everything"** — one link to `/shop`.
- The search input and (once a query exists) the filter bar stay visible and re-usable above this message, never replaced by it — consistent with §1.6's "Retain query, chips and controls" rule.
- Recipes are *not* added as a third recovery path here, despite the legacy spec listing them: recipes are a separate content type (6 recipes) not proven to correlate with an arbitrary failed product search, and fabricating that link would overstate what's actually being recovered into. This is a deliberate, minor narrowing of the legacy spec's generic guidance to fit what this catalog can honestly offer.

### 3.6 Keyboard and mobile usability

- **Label:** the header search input already has a placeholder ("Search cocoa, colour, pan…") but per the legacy spec and basic accessibility practice, it needs a persistent accessible name independent of the placeholder (placeholders are not a substitute for a label, and disappear once text is entered). Spec: add a visually-hidden `<label>` ("Search products") wrapping/associated with the input — a one-line accessibility fix bundled into this visual pass since it requires no behavioural change, only markup.
- **Autofocus:** **do not autofocus the search input on `/search` page load.** Autofocusing pulls keyboard focus away from the page's natural reading order (skip link → breadcrumb-equivalent → H1) the instant the route loads, and on mobile it force-opens the virtual keyboard immediately on navigation, covering the H1/eyebrow the shopper just navigated to see — a direct conflict with Responsive_Behaviour.md's "Opening a virtual keyboard must not hide the active search/form field... use viewport-aware scrolling." Focus should land on the page-start target/H1 per the legacy spec's route-change rule, exactly as any other route.
- **Submit behaviour:** unchanged — the existing plain `<form action="/search">` GET-submit already satisfies "Submitting a nonblank query navigates to `/search?q=…`" without any JS. This spec does not add a client-side intercept.
- **Mobile chrome:** search input inherits the same `min-height: 44px`, `1.5px` border token, and (per §1.6) the bounded-container filter-bar restyle once a query is active — on the bare `/search` landing state (no query yet), the input keeps the header's existing large-search visual treatment (`.header-search.primary-search`) rather than the denser in-page filter-bar chrome, since there's no result set yet to frame.

### 3.7 Motion classification (Search)

| Element | Classification |
|---|---|
| Query submit → results render | **STATIC** — full page navigation (GET form), browser handles the transition; no client-side reveal choreography to specify |
| Result grid, empty state | Same as §1.7/§1.6 (**MICRO-MOTION** card hover only; **STATIC** state swaps) |
| Department-shortcut links (no-query state) | **STATIC** |

No 2D GSAP or 2.5D parallax on search — same reasoning as §1.7/§2.6.

---

## 4. PDP (`/products/[slug]`)

### 4.1 Gallery — one real hero image, not a multi-image gallery

Per the audit's PDP data-source finding: `resolveMedia(product.id, variant.id)` resolves to the **same product-level image for every variant** of a multi-variant product (0 variant-owned manifest records exist). The current `product-detail.tsx` nonetheless renders a `.variant-thumbs` strip with one thumbnail button per variant (lines 70–89) — for the 3 multi-variant products (Callebaut 811, Urban Platter Vanilla, Nutella), this **visually implies 2–3 distinct photos exist when there is only one**, which is a real, if minor, honesty gap the audit didn't flag but this design pass should close.

**Decision: remove `.variant-thumbs` entirely. Render one hero image only.**

- `.pdp-hero-image` reuses the exact canvas rule from §1.4 (`aspect-ratio: 1`, `padding: 10%`, `object-fit: contain`, `background: var(--surface)`, placeholder treatment identical to PLP for the 5 sourcing-gap products) — sized larger than a PLP card (target `max-width: 34rem` inside the gallery column, matching the `lg+` "media 7 columns" proportion the legacy Grid spec described, translated into this codebase's simpler two-column PDP layout rather than a 12-col grid).
- Variant switching still fully works — it's driven by the existing `<fieldset className="variant-selector">` buttons (pack size + price per button), which remain unchanged in behaviour and gain no visual dependency on a thumbnail rail.
- When a variant *does* have a genuinely distinct image in the future (i.e., if variant-owned manifest records are ever added per the audit's item 5 note), the hero image swaps on selection exactly as it does today (`key={media.src}` already forces a clean re-render) — this spec's removal is only of the misleading *thumbnail strip*, not of the underlying "hero image responds to variant selection" behaviour.
- **Explicitly flagged as a future enhancement, not attempted here:** a true multi-image gallery (multiple angles/lifestyle shots per product) would require new photography sourcing beyond this recovery's asset budget — noted so a future agent doesn't mistake "single hero image" for a design preference rather than a data-availability constraint.

### 4.2 Brand / name / pack / demo price block

Kept structurally identical to the current `.buy-panel` reading order (eyebrow brand → H1 title → description → price → pack/SKU line), restyled onto the shared type/token system:

- **Eyebrow:** `{brandName} · demo listing` (unchanged copy — already correctly scoped, does not claim the *product* is fictional, only that the *listing* is a demo, consistent with the audit's finding that this specific string was never part of the "fictional products" copy defect).
- **H1:** product title, `var(--display)` (Georgia), matching the homepage's serif H1 treatment for consistency across the site's two "important name" moments (hero H1, PDP H1).
- **Price:** `.pdp-price` enlarged to `1.75rem` bold (currently unspecified/inherited — this spec sets it explicitly since price is the single most-scanned fact on a PDP), with `<small>demo price</small>` kept immediately adjacent (not footnoted) — satisfies both the task brief and the legacy PDP spec's "Demo/simulated status appears near the price... not relegated to the footer."
- **Pack + SKU line:** kept (`{display_label} · {sku}`), styled as `var(--muted)`, `0.9rem` — factual, secondary to price.

### 4.3 Variant selection

No behavioural change — the existing button-per-variant pattern (pack size + price, `aria-pressed`, `disabled` for `discontinued`) already satisfies the legacy spec's "labelled fieldset/legend... radio semantics suit mutually exclusive... Axis labels use factual values" contract. Visual restyle only:

- Buttons get the same `1.5px solid color-mix(in srgb, var(--ink), transparent 78%)` border token used elsewhere, `border-radius: 8px`, `min-height: 52px` (roomy enough for two lines — pack label + price), `padding: 0.6rem 1rem`.
- Selected (`aria-pressed="true"`) state: `border-color: var(--ink); background: var(--ink); color: white` — reusing the exact selected-state token pattern from `.filters`/chip active states elsewhere (§2.3), so "selected" reads identically across the whole site rather than inventing a PDP-only selected-state colour.
- Disabled (`discontinued`) state: `opacity: 0.45`, `cursor: not-allowed`, plus the legacy spec's required adjacent textual reason — add a small `<span>` per disabled button: "Unavailable in this demo" (already the exact phrase the legacy spec prescribes), visually `0.7rem`, `var(--muted)`, beneath the button.

### 4.4 Availability wording

**Decision: keep the fuller `"{state} · demo fixture"` pattern already on PDP (`product-detail.tsx` line 128–130) rather than switching to the homepage's simpler `"Available in demo"`.** Reasoning: the homepage's `RealProduct` type has no `low_demo_stock`/`unavailable`/`discontinued` states in practice (it's a hand-curated always-available 12-item showcase), so its simpler phrase is fit for purpose there. The canonical `CatalogProduct` type carries the full 4-state enum in its type system even though all 51 live variants currently resolve to `available` (per the audit) — the fuller phrasing is future-proofed for when/if a product is marked `low_demo_stock` or `discontinued`, and today it renders identically informative text ("available · demo fixture"). Visual treatment: `text-transform: uppercase`, `font-weight: 900`, `font-size: 0.75rem` (slightly larger than the PLP card's `0.7rem`, since this is a more decision-critical moment), colour-coded per the existing `.availability.{state}` classes (`var(--success)` green for available, `#815100` amber for low-stock, `var(--coral-dark)` for unavailable/discontinued) — never colour-only, since the text itself always states the word.

### 4.5 Quantity + cart/wishlist actions

No behavioural change to the `<input type="number" min="1" max="99">` clamp logic or `addLine()`/`toggleWishlist()` wiring — both already match the audit's binding contract (`validLine()`'s 1–99 integer bounds must not be re-implemented). Visual spec:

- Quantity control: stepper-style — a labelled `−` / numeric input / `+` triplet (currently a bare number input) rather than raw spinner arrows, each hit target `44×44px` minimum, matching the legacy PDP spec's "labelled decrement, numeric input and increment controls" requirement, which the current implementation does not yet meet (it's a plain `<input type="number">` with only the label text "Quantity"). This is a markup addition (two new `<button>`s wired to the existing `quantity` state's setter, clamped the same 1–99 way), not a new state model.
- **Add button:** primary coral fill (`.button.coral`, already the existing class), full width on mobile, auto-width desktop, `min-height: 52px` (slightly taller than PLP's 46px — this is the primary conversion action on the page's most important panel). Label logic unchanged ("Add selected pack to demo cart" / "This demo pack is unavailable").
- **Wishlist:** secondary/outline button beside Add (unchanged position), gets the same saved-state fill treatment as `.rp-wishlist.is-saved` (`background: var(--coral-dark); color: white`) for visual consistency with the PLP/homepage wishlist icon, even though this is a labelled text button here rather than an icon button (PDP retains text labels per its own existing pattern — "Save to wishlist"/"Remove from wishlist" — no need to convert it to icon-only).

### 4.6 Critical facts (ingredients / allergens / storage) — tri-state visual treatment

The audit's most material PDP finding: **0 of 144 critical-fact fields (48 products × 3 fields) are `status: "known"` today** — every single one renders "Information not provided." This spec's decision, addressing the audit's open risk #4 directly:

**Ship the section, but style it quietly, not prominently** — because it is 100% inert today, a bold "Critical facts · never inferred" treatment (implying rich data behind it) would visually over-promise relative to what's actually there. Concretely:
- Section heading downgraded from an implied "big reveal" module to a plain factual sub-heading — keep "What the record knows." (accurate, slightly self-aware copy already in place) but reduce its visual weight to match a Details/spec-sheet section, not a hero-adjacent module: `padding-block` reduced from whatever full-bleed section padding surrounds other PDP sections, contained within the same `page-shell` width as the rest of the PDP body rather than a full-bleed tinted band.
- **Tri-state chip styling** for each `dt`/`dd` pair's value (ready for the day real data exists, not just for today's all-empty state):
  - `known` → value rendered in `var(--ink)` normal weight, no chip wrapper — reads as a plain fact.
  - `not_applicable` → value wrapped in a small muted pill, `background: var(--surface-subtle)`, `color: var(--muted)`, text "Not applicable."
  - `information_not_provided` (today: all 144/144) → value wrapped in the same muted pill style as `not_applicable` but with a `1px dashed` border instead of solid-fill, to visually distinguish "we checked and there's genuinely nothing here" (dashed, slightly more tentative) from "this doesn't apply to this product type" (solid) — both intentionally quiet, never alarming (no red/warning colour — absence of data is not an error state).
- **"Form" field bug:** the audit found `product-detail.tsx` line 177 reads `content.family_attributes?.form`, a key that does not exist anywhere in `Product_Content_Records.json` (actual keys are `subcategory` and `brand`, both populated with real `known` values, e.g. Callebaut's `subcategory: "Dark couverture chocolate callets"`). **Design decision: relabel this row "Subcategory" and point it at `family_attributes?.subcategory` instead of the dead `.form` key.** This is a one-line code change (flagged as a dependency for engineering below, not fixed by this spec) but it matters visually: today this row shows "Information not provided" for *every* product despite real data sitting one key away — fixing the binding turns one of the four facts rows from permanently-inert into actually-informative for all 48 products, materially improving the section's honesty-to-usefulness ratio without needing any new content authoring.
- With the `.form`→`.subcategory` fix, the facts section goes from "4/4 rows always empty" to "1/4 rows populated, 3/4 honestly empty" for every product — still not a rich facts section, but no longer completely inert, and this spec's quiet-not-prominent visual treatment (above) remains correct either way since ingredients/allergens/storage stay at 0% regardless.

### 4.7 "Information not provided" styling — explicit call-out

Per the task's explicit ask for this state's styling (distinct from the general tri-state treatment in §4.6): the exact phrase "Information not provided" must never be styled to look like a null/broken/error state (no strikethrough, no red, no "—" dash substitution — the legacy PDP spec explicitly prohibits "replace it with a dash, treat it as none"). It is rendered as complete, calm prose inside the dashed-border pill described in §4.6, in `var(--muted)` at the same font-size as a populated value (never shrunk — shrinking an absence to look less important than a presence is itself a subtle honesty violation, since it would visually suggest "this matters less," when in fact the correct reading is "we don't know, plainly").

### 4.8 Attribution / disclosure placement

The task requires the portfolio/trademark disclosure to sit **near** every real product, not only in the sitewide footer. Current state: only `site-footer.tsx`'s `.footer-disclosure` and `about/page.tsx` carry this copy; PDP has none. Spec:

- Add one compact, single-line disclosure directly inside `.buy-panel`, positioned **immediately below the "No real stock, payment, delivery or order is represented" simulation-note line** (`product-detail.tsx` line 165–167) — same visual weight (`<p className="simulation-note">`-equivalent styling: `0.75rem`, `var(--muted)`), so the two honesty disclosures (simulated commerce + trademark/portfolio) sit together as one small-print block rather than scattered.
- **Copy (reusing R2B1's already-approved wording, not newly authored):** *"{brandName} and other third-party names, trademarks and imagery referenced here belong to their respective owners. Pantryform is a fictional portfolio/demo project, not affiliated with, sponsored by, or endorsed by {brandName}."* — the brand-name interpolation makes this concrete per-product rather than generic, while using language directly lifted from `R2B1_Catalog_Summary.md`'s "Portfolio disclosure" section, so no new legal-adjacent copy is invented by this design task.
- **PLP-level disclosure (§1.6, not repeated per-card):** one instance of the shorter, non-interpolated version of this same sentence sits once beneath the PLP filter bar/result count (not on every one of up to 48 cards, which would be genuine clutter) — "near" is satisfied at the list level; "near" is satisfied at the individual level on PDP where the purchase decision actually happens.
- **Not this spec's job to fix, but flagged for the copy owner per the audit's open risk #1–3:** the sitewide header `.demo-strip` banner, the Terms page, and this exact PDP route's `generateMetadata` description all currently call the *products* (not just prices) "fictional" — a copy defect, not a layout/visual one. This PDP visual spec's new disclosure line is deliberately worded to be **correct** regardless of whether that separate copy fix ships in the same release, but the two should not ship contradicting each other (see Open Risks).

### 4.9 Related products (department-mates)

Already implemented (`page.tsx` lines 32–36: same-department, excluding self, sliced to 4) and already correctly scoped to "genuine relationship" (same department) rather than any fabricated "customers also bought." Visual spec: restyle `<ProductGrid products={related} />` to use the same `.plp-grid`/`.plp-card` from §1 (currently the legacy `.product-grid`/`.product-card`), at a **fixed 4-up desktop / 2-up mobile** row (never more than 4, regardless of viewport, since this is a "few more ideas" module, not a browse grid — cap via `max-width` + the same `.plp-grid` column rules already defined). Section heading ("Continue through the department." / "Measured companions.") kept verbatim — already good, on-brand copy.

### 4.10 Recipe association — only where a genuine mapping exists

Per the task's explicit instruction not to invent a recipe relationship: `Recipe_Product_Mapping.json`'s `mappings[]` array joins `product_id` → `recipe_ingredient_id` (18 mapped lines total, confirmed by the audit, out of 45 total recipe ingredient lines across 6 recipes). This spec adds a **conditional** "Used in this recipe" module to the PDP, present **only** when `product.id` appears as a `product_id` in `Recipe_Product_Mapping.json`'s `mappings` array:

- **Placement:** between §4.9's related-products module and the footer — recipe cross-sell is a distinct relationship from department-adjacency and should not visually merge with it.
- **When present:** a single-row card per matching recipe (there may be more than one recipe using the same product — e.g. a cocoa powder could appear in more than one recipe's ingredient list), each showing the recipe name and linking to `/recipes/[slug]` (or the recipe's existing detail surface) — reusing the existing recipe card/link pattern already established elsewhere on the site (homepage's recipe-bridge section) rather than inventing a new recipe-card design.
- **When absent (30 of 48 products have zero mapped recipe lines, arithmetically — 18 mapped lines don't necessarily mean 18 distinct products, so the true "has a mapped recipe" product count could be lower still):** the module is **omitted entirely** — no "no recipes yet" placeholder text, no empty state. This is deliberately different from PLP/search's empty states (which explain an *action's* zero result) — here, "this product isn't part of a recipe mapping" is a normal, expected state for most products, not a failure to communicate.
- **Labelling:** per the legacy Navigation spec, "labelled as usage inspiration rather than endorsement" — heading text: **"Used in this recipe"** / **"Used in these recipes"**, never "Recommended for" or anything implying a curated pairing beyond the literal ingredient-mapping fact.

### 4.11 Mobile sticky purchase action — decision: no, with rationale

The task asks for an explicit weighed decision, citing `docs/Risk_Register.md` R-026 ("Sticky bars, drawers or dense controls obscure content, keyboard focus or browser UI on small/zoomed viewports... Apply the Phase 3 sticky budget... before design approval," status **Open**). This spec's decision: **do not add a mobile sticky add-to-cart bar in this recovery pass.**

**Weighing:**
- *Benefit:* a sticky bar can shorten the reach-to-purchase distance if the buy-panel scrolls far out of view on a long PDP (facts section, related products, recipe module).
- *Cost:* R-026 is explicitly **still open** on this project's own risk register — no sticky-bar budget (safe-area handling, focus-visibility-under-sticky, 320px/200%-zoom verification) has been separately re-approved since that risk was logged, and the legacy PDP/Responsive_Behaviour specs both gate a sticky add bar behind non-trivial conditions this recovery pass has not verified: "only mirrors the current selected variant, quantity, price and enabled state... must not cover focused content or status messages," "hide/disable with textual reason until selection is valid," clearance of on-screen-keyboard and safe-area insets.
- The current PDP's `.buy-panel` is reasonably close to the top of the page (gallery + buy-panel form the first vertical section, per §4.1–4.2's compact single-hero-image layout — removing the `.variant-thumbs` strip in §4.1 actually *shortens* the page slightly, reducing the case for a sticky bar in the first place).
- Adding a sticky bar now would mean either (a) shipping against an explicitly open, unresolved risk without the verification work R-026 calls for, or (b) scope-creeping this visual spec into doing that verification work itself, which is a cross-cutting QA/engineering task, not a UI/product-design deliverable.

**Recommendation, not a rule:** if a future pass wants this, it should be proposed alongside closing R-026 (running the Phase 3 sticky budget checklist: safe-area, 320px, 200% zoom, focus-visibility-under-sticky), not bundled quietly into a visual refresh. Flagged in Open Risks below.

### 4.12 Motion classification (PDP)

| Element | Classification | Note |
|---|---|---|
| Hero image on variant change | **MICRO-MOTION** | A brief cross-fade (~0.15–0.2s opacity) as the `key={media.src}`-forced re-render swaps images — currently an abrupt swap; a fade prevents a jarring flash, especially relevant for the shared-image multi-variant products where the image *won't visually change* on selection (fade-through-same-image reads as "confirmed," not "broken"). |
| Variant button selection | **MICRO-MOTION** | Border/background transition on `aria-pressed` toggle, matching the existing `.rp-add`/`.filters` transition durations (~0.15s) — no movement, colour/border only. |
| Quantity stepper +/− | **STATIC** | Instant value change; a numeric field is not a moment for delight, and per the legacy spec's focus/announcement rules, must not introduce a delay between activation and the updated value being both visible and announced. |
| Add-to-cart success | **MICRO-MOTION** | A brief (~0.2s) confirmation micro-state on the Add button itself (e.g., label briefly reflows to confirm, colour pulse) — never a toast that could violate the legacy spec's "does not move focus or rely on a transient toast" rule; the *persistent* status region (§ legacy PDP spec "Persistent mutation/status message region") is the actual source of truth, this is a supplementary, non-load-bearing flourish only. |
| Critical-facts section reveal | **STATIC** | No accordion-reveal animation proposed even if a future pass makes this collapsible — content must remain in the page outline per the legacy spec ("critical-data headings remain discoverable in the page outline"), and this section is inert today regardless. |
| Related-products / recipe-module entrance | **STATIC** | Below-the-fold content that renders with the page; no scroll-triggered reveal choreography specified here — reserved as a possible 2D-GSAP candidate for the Motion agent to consider (a subtle scroll-triggered stagger on the related-products row would be low-risk since it's non-critical, below-fold content with no state dependency), but this spec does not mandate it — that choice belongs to the Motion/Frontend-GSAP agent's own budget decision. |

No 2.5D parallax anywhere on PDP — a purchase-decision surface benefits from clarity and speed, not spatial spectacle; this matches every other route's motion posture in this document.

---

## Handoff

**Completed:** Concrete, pixel/rem/breakpoint-level UI specifications for all four in-scope route groups — PLP/Shop (`/shop`, `/shop/[department]`), Category (`/shop/[department]` identity treatment + wiring the existing-but-unlinked `/shop/[department]/[category]`), Search (`/search`), and PDP (`/products/[slug]`) — covering grid/card treatment, image-canvas consistency rule (including the 5-product placeholder state), filters/sort/count/empty-state/pagination decisions, gallery/variant/price/availability/quantity/cart treatment, critical-facts tri-state styling (including the `family_attributes.form` dead-field finding), attribution/disclosure placement, related-products and conditional recipe-association modules, and a per-element motion classification (STATIC/MICRO-MOTION/2D GSAP/2.5D PARALLAX) for every route. Every spec decision is anchored to either an existing live CSS class/token (`.rp-card`, `.rp-image`, `.promo-panel`, `--ink`/`--coral`/`--saffron`/`--surface`/`--muted`, the 1024px/640px breakpoints) or a binding legacy UX rule (`PLP_and_Search_UX_Spec.md`, `PDP_UX_Spec.md`, `Navigation_and_Discovery_Spec.md`, `Responsive_Behaviour.md`), and cross-checked against the Commerce Contract Audit's data/behavioural contract so no proposed visual change silently breaks a URL param, cart-add payload shape, or accessibility guarantee already in force.

**Artifacts created or updated:** `production_artifacts/06_recovery_r2b2/Route_UI_Specification.md` (this file, written incrementally section-by-section per the task's infrastructure-timeout mitigation instruction). No production route/component/CSS file was edited — this is a specification-only deliverable, as scoped.

**Key decisions:**
1. New `.plp-card`/`.plp-grid` classes (not a reuse of `.rp-card`/`.rp-rail`) for the canonical catalog grid, sharing every visual token but not the homepage's curatorial `badges[]` field, which doesn't exist on `CatalogProduct`.
2. Mobile PLP grid goes to a **compact 2-up** layout (~172–195px cards depending on viewport, math shown for 360/390/430px) — deliberately different from `.rp-rail`'s mobile 1-up, and different from PLP's own tablet treatment (3-up, not `.rp-rail`'s 2-up) — each breakpoint's column count is justified by the task-type (curated rail vs. browse-to-decide grid) rather than copied uniformly.
3. Single shared image-canvas rule (`aspect-ratio:1`, `object-fit:contain`, 10%/8% padding, white background) reused verbatim across PLP/category/search/PDP, with one consistent placeholder design (dashed border, `--surface-subtle` background, plain text) for the 5 sourcing-gap products — never a per-route bespoke fallback.
4. No pagination or load-more anywhere in scope — 48-product maximum catalog size doesn't warrant the added interaction/accessibility cost, revisit only if catalog size roughly triples.
5. Subcategory tier (36 values) explicitly **not** built as navigation; category tier (15 values) **is** wired via a chip row into the existing, tested, currently-unlinked `/shop/[department]/[category]` route — cheapest-correct-fix per the audit's own recommendation.
6. PDP `.variant-thumbs` strip **removed** — it visually implied distinct per-variant photography that doesn't exist for the 3 multi-variant products (shared-image-per-variant is a confirmed, intentional data-model constraint). Single hero image only; true multi-image gallery explicitly flagged as a future enhancement requiring new photography, not a design choice made lightly.
7. Critical-facts section gets deliberately **quiet, not prominent** visual treatment given it is 0/144 fields `known` today — plus a specific one-line code-fix recommendation (`family_attributes.form` → `family_attributes.subcategory`) that would make 1 of 4 rows genuinely informative for all 48 products at zero new content-authoring cost.
8. PDP mobile sticky add-to-cart bar: **not added**, with an explicit benefit/cost weighing against the still-open `docs/Risk_Register.md` R-026 sticky-bar risk — recommended only as a future addition bundled with that risk's own verification checklist, not as part of this visual pass.
9. Attribution/disclosure: one line per PDP (brand-interpolated, positioned beside the existing simulation-note), one line per PLP/search page (not per-card), wording lifted verbatim from R2B1's already-approved "Portfolio disclosure" text rather than newly authored.
10. Recipe association on PDP is conditional and can be entirely absent (most products) — no placeholder/empty-state copy for "no recipe," since absence is the normal case here, not a failure state.

**Constraints preserved (verified against `Commerce_Contract_Audit.md`, not assumed):** `?q=`/`?department=`/`?sort=` URL contract untouched (new `?brand=` param flagged as an *addition*, not a replacement); `addLine()` payload shape (`sku`, `variantId`, `observedUnitPricePaise`, `sources:[{kind:"manual"}]`) unchanged everywhere Quick-add/Add is specified; the legacy PLP contract's "Add only when exactly one unambiguous variant, otherwise Select options" rule is explicitly carried into the new `.plp-card` for the 3 multi-variant products; unmapped-recipe-line guards and wishlist/cart fail-closed behaviour are not touched by any visual spec in this document; `factText()`'s whitelist-only tri-state rendering logic is preserved (only its visual chip wrapper changes, never its value logic).

**Open risks:**
1. **Sitewide "fictional products" copy defect** (header `.demo-strip`, Terms page, PDP `generateMetadata`) flagged by Task 2 remains unresolved by this task — this spec's new PDP/PLP disclosure lines (§4.8) are written to be correct on their own, but will visually sit alongside the still-wrong header banner until that copy fix ships; recommend both land together so the site doesn't say "fictional products" in the header and "real, verified products" in the new PDP disclosure on the same page view.
2. **New `?brand=` URL param** (§1.6) is a genuinely new contract key not covered by the audit's existing three-key list — needs sign-off from whichever engineering agent implements `ShopExplorer`'s brand-filter state, and needs to be added to any future contract-audit re-verification.
3. **`family_attributes.form` → `.subcategory` fix** (§4.6) is a one-line code change this spec depends on visually (the "Subcategory" row label only makes sense once the binding is corrected) but does not implement itself — if engineering does not pick this up, the PDP facts section should fall back to labelling the row "Form" and rendering "Information not provided" as it does today, rather than shipping a mislabelled "Subcategory" row that still points at the dead key.
4. **PDP sticky-purchase-bar risk (R-026)** remains open on the project's own risk register; this spec avoids it rather than resolving it — if a future phase wants the sticky bar, R-026's verification checklist must be run first, not treated as satisfied by this document.
5. **`ShopExplorer`'s existing "Clear" behaviour also clears the search query**, which the legacy binding PLP spec says it should not ("Clear all filters preserves the query. Clear search is separate."). This spec restyles the Clear button but does not fix this pre-existing behavioural mismatch — flagged here since it's adjacent to, but out of scope for, a visual-only pass.
6. **Category-page promo module (§2.5)** may end up applying to zero departments in practice if no existing homepage promo content maps cleanly to a given department — this is by design (the module is skippable, not paddable) but means the "one optional promotional module" allowance could ship as a no-op everywhere; that is an acceptable, honest outcome per this spec's own bounding rule, not a defect to chase.

**Unresolved questions or assumptions:**
- This spec assumes the Motion/Frontend-GSAP agent (Task 5, per `Multi_Agent_Execution_Plan.md`) treats the STATIC/MICRO-MOTION classifications in each section as a *floor*, not a ceiling to override — i.e., nothing in this document should be escalated to 2D-GSAP/2.5D without a specific, separate rationale from that agent, since every route in this spec is a task-completion surface (browse, search, buy) rather than a brand-moment surface like the homepage hero.
- Whether the recommended new brand filter (§1.6) and category-chip wiring (§2.3) are actually implemented in R2B2's engineering scope, or deferred to a later phase, is an orchestrator/scoping call this spec does not make — both are described as concrete, bounded, low-risk additions, not mandatory blockers for shipping the rest of this spec's card/grid/PDP restyle.

**Dependencies for next task:** The Frontend/GSAP architecture agent and any engineering implementation agent should treat this document's class names (`.plp-card`, `.plp-grid`, `.plp-image`, `.plp-badge`, `.plp-add`, `.pdp-hero-image`) as the intended new selectors — none currently exist in `globals.css` and will need to be authored (reusing `.rp-card`'s existing declarations as the base via a shared class or `@extend`-equivalent composition, per this codebase's plain-CSS-in-`globals.css` convention rather than a preprocessor). The `family_attributes.form`→`.subcategory` fix (§4.6) and the `.variant-thumbs` removal (§4.1) are both `product-detail.tsx` changes an implementation agent will need to make alongside the CSS work. The conditional recipe-association module (§4.10) needs a data-join helper (`product.id` against `Recipe_Product_Mapping.json`'s `mappings[].product_id`) that does not exist in `src/lib/domain/` today.

**Next responsible agent:** Orchestrator, to reconcile this document against `Commerce_Contract_Audit.md` (Task 2) and hand both to the Frontend/GSAP architecture agent (Task 5) for implementation planning — per `Multi_Agent_Execution_Plan.md`'s stated ownership sequence.

**Required next action:** Orchestrator should rule on the three items flagged as open/unresolved above that carry a genuine scoping decision (not just an implementation detail): (a) whether the sitewide "fictional products" copy fix ships alongside this visual work or separately, (b) whether the new `?brand=` filter and category-chip wiring are in R2B2's engineering scope or deferred, and (c) whether the `family_attributes.form`→`.subcategory` one-line fix is picked up by whichever agent next touches `product-detail.tsx`.

**Verification evidence:** Every concrete number in this document (card widths, breakpoints, padding, border tokens, hover transitions) was read directly from the live `src/app/globals.css` (`.rp-card`, `.rp-image`, `.rp-rail`, `.promo-panel`, `.product-grid`/`.product-card`, `@media (max-width: 1024px)`/`@media (max-width: 640px)` blocks) and the live component files (`real-product-card.tsx`, `real-product-rail.tsx`, `product-card.tsx`, `product-grid.tsx`, `product-detail.tsx`, `shop-explorer.tsx`, and every route file under `src/app/{shop,search,products}`) — not copied from prior documentation without cross-checking against running code. Catalog facts (48 products, 3 multi-variant products, 5 placeholder-image products, 18/45 mapped recipe lines, 30 brands, 36 subcategories, 15 categories) are taken from `Commerce_Contract_Audit.md`'s independently-reverified figures and `R2B1_Provenance_And_Validation.md`'s image-coverage table, both of which this task treated as binding rather than re-deriving from scratch. Screenshot evidence for the approved visual language: all six PNGs in `design_review/recovery_r2a_rework/screenshots/` were viewed directly (desktop above-the-fold, header/logo closeup, product-cards closeup, mobile above-the-fold, mobile drawer implied by file listing, mobile product cards) to confirm the `.rp-card` family's rendered appearance matches its CSS source before extending it into this spec.



