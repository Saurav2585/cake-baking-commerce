# R2B2V Remediation Specification

Scope: visual composition only, against commit `b4e08d5`. No logic, data, `.product-card`
selectors, or commerce state changes. No new image assets — all richness comes from CSS
(gradient, border, shape, color, spacing, type) applied to the 48 real product photos already
in the catalog. Every instruction below cites either a screenshot file or a source
file:line so the two implementing engineers can verify the diagnosis themselves.

---

## Diagnostic summary

**Homepage.** Squint-test result: the only elements that read at a glance are the dark
hero container and the four identical grey rail blocks beneath it — there is no single
focal point and no differentiated reading order. Cause, read directly from
`src/app/page.tsx:110-190`: four consecutive `<section className="section-shell">` blocks
(Bestsellers → New Arrivals → Baking Essentials → Tools) share one composition —
eyebrow + `<h2>` + one‑line subhead + `<ProductRail>` rendering a 4-up grid — with only the
copy and product data varying. `01-homepage-1440.png` and its slices confirm this: rows 3,
5, 6 and 7 (in visual order) are pixel-structurally identical. The hero itself
(`hero-collage.tsx`, `.hero-collage`/`.collage-frame` in `globals.css:433-476`) nests each
packshot in its own white card with `padding: 12%` inside a container that already has
`padding: 1.75rem` — on top of source photography that itself has generous white margin —
so the actual product footprint in the largest frame is roughly 30% of the hero's width,
not a commanding focal point. On mobile (`02-homepage-390.png`, part 1) this compounds:
`collage-a`/`collage-b` are `display:none` and `.collage-large` becomes a 4:3 box, leaving a
mostly-empty dark rounded rectangle with two small floating packshots — the exact
"blank-looking underscaled panel" the reviewer named.

**Product cards.** The shared canvas rule (`.product-image-canvas` / `.rp-image`,
`globals.css:760-775` and `:1870-1877`, both `aspect-ratio: 1; padding: 10%`) does
successfully normalize the *container* — but not the *subject*. `03-plp-1440.png` shows the
Weikfield cocoa jar filling ~70% of its canvas height while the CCDS baking-powder jar next
to it fills ~35%, because normalization stops at the box, not the product's pixel footprint
inside the (uncropped) source photo. Hierarchy is flat: brand/category eyebrow, title, pack
size and price all sit at similar visual weight (`card-facts` in `product-card.tsx:83-93`
gives price only a `<strong>` tag, no size bump — confirmed in CSS, `.card-facts strong`
is 1.05rem against 1rem body text). Badge, wishlist and CTA are three unrelated shapes: a
pill (`.product-badge`/`.rp-badge`), a circle (`.product-wishlist`/`.rp-wishlist`), and a
rectangle (`.product-add`/`.rp-add`) — no shared radius, border weight, or spacing rule ties
them together.

**PLP/Category/Search.** `shop/page.tsx:21` renders `<h1>The working pantry.</h1>` using the
sitewide `h1` rule (`globals.css:490-494`, `clamp(3.5rem, 7.3vw, 7.8rem)` — up to 125px) inside
`.page-hero` (`:1018-1024`, `align-items:end`, no product imagery). On a 48-product catalog
page this is a large blank-feeling gesture before any merchandise appears —
`03-plp-1440.png` part 1 shows roughly 700px of viewport height spent on heading + filter
bar before the first product row. Below the fold the grid itself (`.product-grid`,
`globals.css:1821-1837`) is a flat, unbroken 4-up matrix for all 48 items with no
compositional variation — functionally fine, visually a spreadsheet. Mobile 2-column
(`04-plp-390.png`) was checked against the "illegibly miniature" risk named in the brief:
title is 0.88rem/2-line-clamp, pack 0.7rem, price 0.95rem bold (`globals.css:1979-2032`) —
this reads as legitimately **readable-but-dense**, not illegible; it needs refinement, not
restructuring.

**PDP.** `09-pdp-single-variant-1440.png` shows the exact "tiny product in a huge frame"
complaint, and the mechanism is precise: `.pdp-layout` (`globals.css:1303-1308`) gives the
gallery column `1.25fr` of the available width (~650-700px at 1440px viewport), but
`.pdp-gallery .pdp-primary.product-image-canvas` (`:2193-2196`) caps the image itself at
`max-width: 34rem` (544px) with `aspect-ratio:1; padding:10%` inherited from the shared
canvas rule. The result, measurable in the screenshot: the white image square ends around
x≈588px, the buy-panel begins around x≈915px — roughly 330px of unclaimed cream gutter
(the `5vw` column gap only accounts for ~72px of it), which visually reads as the image
"floating" in a much larger reserved area. The 10% inner padding, stacked on top of already
white-margined product photography, compounds the shrinkage. Separately, `.buy-panel h1`
(`:1347-1349`) is `clamp(3rem, 5.5vw, 6rem)` with **no mobile override** anywhere in the
file — on a 390px viewport this is a 48px floor, and `10-pdp-single-variant-390.png` shows
"811 Dark Chocolate Callets" breaking across three oversized lines, pushing price/CTA
further down. The tri-state fact pills (`product-detail.tsx:19-35`,
`.fact-pill`/`.fact-not-applicable`/`.fact-not-provided` in `globals.css:2343-2356`) are
honest but identical three times in a row (`09-pdp-single-variant-1440.png` part 2) — reads
as unfinished rather than designed.

**Cart/Checkout.** `11b-cart-populated-1440.png` and `13b-checkout-populated-1440.png` are
already the calmest surfaces on the site — large serif heading, an ink-and-coral summary
card, simple bordered line items. This is the "already good enough, refine don't overhaul"
tier: the brief is typographic/spatial discipline and a touch more brand character, not
restructuring.

---

## Homepage

**Hero theatre — full recompose.**
- Current: `.commerce-hero` (`globals.css:376-384`) is `grid-template-columns: 0.95fr 1.05fr`; the hero packshot (`.collage-large`) occupies roughly 30% of total viewport width once frame padding and source-photo margin are subtracted.
- Target: the dominant product should occupy **roughly 55-60% of the viewport width** on desktop. Achieve this by (a) rebalancing `.commerce-hero` to something like `0.7fr 1.3fr` (image side larger) or narrowing the copy panel to a fixed max-width (~26rem) and letting the image panel fill the remainder; (b) cutting `.collage-frame` padding from `12%` to `4-6%` so the packshot itself, not white margin, reads as the shape; (c) reducing `.hero-collage` outer padding from `1.75rem` toward `1rem` at this larger scale.
- Replace the current rigid 2×2-ish grid of four equally-framed boxes with **true layered depth**: one large primary frame (the hero SKU) with the two secondary packshots (`collage-a`, `collage-b`) rendered as smaller accent chips that visually overlap the primary frame's edge (negative-margin overlap, drop shadow, slight rotation — the existing `.collage-small` already does `rotate(-6deg)` with a canvas-color border; extend that same treatment to `collage-a`/`collage-b` instead of giving them their own equal-sized boxes). This is the "controlled 2.5D depth" the brief asks for, built from spacing/shadow/rotation, not new imagery.
- One strong commercial focal point: pick a single hero SKU (keep `heroLarge` from `page.tsx:39`) and make its frame meaningfully larger than the two accent chips combined — not three near-equal boxes.
- CTA hierarchy: keep `Shop baking essentials` as the sole primary button; demote `Explore recipes` further (already a text-link — good, no change needed there).
- Mobile (`02-homepage-390.png`): eliminate the empty dark rectangle. Reduce `.collage-large`'s `aspect-ratio` from `4/3` toward `1/1` or content-driven, cut `.hero-collage` padding at the 640px breakpoint (`globals.css:1206-1224`) from `1.1rem` to ~`0.6rem`, and reduce `.collage-frame` padding the same way as desktop. The single packshot should visibly fill its box; the `.collage-small` accent chip stays as the one layered element.
- Motion re-tuning flag: `hero-collage.tsx` tags all four images with `data-parallax-layer` (`z2`/`z3`/`z4`, lines 45/56/67/78). Any resize/reposition here changes travel distances for all three z-layers and must be re-verified against `useHeroParallax`.

**Break the four identical rails into four distinct structural patterns** (replacing `page.tsx:110-190` — same product data, different composition per section):
1. **Editorial feature** (Bestsellers, currently first rail): one large "hero pick" card (biggest single SKU, e.g. the Callebaut 811 already used elsewhere) at roughly 45% width with an oversized image and a short brand-story line, paired beside it with the remaining 3 bestsellers in a tighter vertical stack (smaller image, single-line facts). This is not a 4-up grid at all.
2. **Horizontal rail** (New Arrivals): convert `.rp-rail` here into a horizontally-scrollable filmstrip (`overflow-x:auto`, `scroll-snap-type:x mandatory`) showing 5-6 cards on desktop instead of a fixed 4-column grid, so its silhouette differs from pattern 1 and 3 even before content loads.
3. **Asymmetric category feature** (Baking Essentials): 2-up split — one large CSS-textured panel (reuse the `.promo-panel` dark-gradient-over-photo treatment already proven at `globals.css:859-899`) on one side introducing the category, 3 compact product tiles stacked on the other side. This absorbs the existing "repeat-purchase shelf" copy without a 4-up grid.
4. **Compact product shelf** (Tools/Bakeware/Packaging): a denser, smaller-format grid — 6-8 items, smaller image canvas (~15% smaller than the grid default), minimal copy — a "scan quickly" pattern distinct from all three above.
- Keep the existing `.promo-split` two-panel editorial banner and `.brand-strip` pill row as-is — both already read as distinct patterns, not repetitions (no change needed there).
- Motion re-tuning flag: `product-rail.tsx:29-37` wraps the *entire* `.rp-rail` in one `data-reveal-group` per section. Each of the four new compositions needs its own grouped-reveal wiring re-verified (the filmstrip and the asymmetric split will animate differently from a plain grid reveal).

**Department atlas** (`department-atlas.tsx`): the `01`–`08` index numbers (`padStart(2,"0")`, line 76/98, styled saffron/bold at `globals.css:612-615`) carry no information a shopper needs — drop them. Keep the existing asymmetric tile sizing (`1.3fr 0.7fr 0.8fr 1.2fr`, already varied — no change needed there) and the photo + gradient-overlay + title/blurb treatment, which already reads as a considered device. Motion flag: tile pairs are grouped via `data-reveal-group` (`department-atlas.tsx:67`) — removing the number span doesn't affect this, no re-tuning needed here.

**Eyebrow overuse:** "BESTSELLERS · DEMO-CURATED" / "NEW ARRIVALS · DEMO-CURATED" etc. (`page.tsx:112,154,166,181`) are the same uppercase-tracked `.eyebrow` treatment applied to every single section with no variation — this is a system running on autopilot. Once the four rail sections above have genuinely different compositions, reduce eyebrow use to the two sections where it still earns its place (the editorial feature and the asymmetric feature); the horizontal rail and compact shelf can lead with the `<h2>` alone.

---

## Product Cards (`product-card.tsx`, shared by PLP/rail)

- **Optical scale, not just canvas.** Do not touch `.product-card` selectors or the addLine/quick-add logic. Add a per-image scale correction: since source photos vary in how tightly they're cropped to the product, apply a consistent **inner content box** inside the existing canvas — e.g. reduce `.product-image-canvas`/`.rp-image` padding from the current flat `10%` and instead use `object-fit: contain` against a canvas sized so the *median* product fills ~75-80% of the shorter canvas dimension; tall/narrow products (bottles) and flat/wide products (slabs, boxes) will still differ, but the goal is bringing the visible range from today's ~35-90% fill down to roughly 60-80% fill. This is a padding/sizing adjustment only — never crop or stretch the underlying photo.
- **Hierarchy.** Increase price weight relative to pack size: current `.card-facts strong` (price) is only marginally larger than the pack-size `span` (1.05rem vs ~1rem, both same weight family). Target: price at ~1.2× the pack-size font-size with a heavier weight (700→800) so it reads as the second-most-important element after the product title, ahead of pack size and availability text.
- **Unify badge/wishlist/CTA into one system.** Currently a pill (`.product-badge`, `border-radius:999px`), a circle (`.product-wishlist`, `border-radius:50%`), and a rectangle (`.product-add`) with no shared visual language. Standardize: same corner-radius family (e.g. all controls use an 8px radius except the wishlist which can stay circular but should match the badge's border weight and the button's color token), same `color-mix` border opacity value across all three, and align them on a shared vertical rhythm (badge and wishlist already share a top offset of `0.9rem` — keep that, but bring the CTA's top margin into the same spacing scale rather than an independent `0.75rem`).

---

## PLP/Category/Search

- **Reduce the heading's footprint without banning it.** `shop/page.tsx`'s `<h1>` inherits the sitewide `clamp(3.5rem, 7.3vw, 7.8rem)` (`globals.css:490-494`) meant for the homepage hero. Give PLP/category pages their own smaller clamp — target roughly `clamp(2.25rem, 4vw, 3.5rem)` — so the heading reads as a page title, not a second hero. Keep the two-line "48 parent products · 51 exact SKUs" eyebrow + descriptive sentence; this is the "premium category introduction" the brief allows, sized down so it doesn't create the banned dead-space banner effect.
- **Filter bar** (`.filters`, `globals.css:2035-2062`): visually fine (bordered card, labeled controls) but generic. Tighten vertical padding slightly (from `1rem 1.25rem` toward `0.85rem 1.25rem`) and give the "Apply"/"Clear" buttons the same button-family treatment used elsewhere (`.button.primary`/`.button`) rather than ad-hoc sizing, so the control bar reads as part of the same design system as the rest of the page.
- **Scanability of the 48-item grid.** Introduce one merchandising break inside the flat grid — e.g. after the first 8 items, insert a full-width thin divider row carrying a single line of category or filter context (department name + count), repeating every ~16 items. This is a CSS/markup change to `ShopExplorer`'s render loop, not a new component family, and does not touch `.product-card` or the search-result count assertion.
- **Mobile 2-column:** confirmed readable-but-dense, not illegible — no structural change. One refinement: bump price weight per the Product Cards section above so price stays the clearest element even at the compact 0.88rem title size.
- **Preserve exactly:** search results/no-results states (`.empty-state`, `.results-count`), the `.toHaveCount(4)`-style test surface, and category-chip behavior.

---

## PDP

- **Packshot optical scale — name the target.** The product image should read as the largest single element above the fold, filling most of its column's width — not a 34rem-capped square floating inside a wider grid column. Two changes: (1) remove the fixed `max-width: 34rem` on `.pdp-gallery .pdp-primary.product-image-canvas` (`globals.css:2193-2196`) and let the image canvas fill its actual grid column width (up to a much larger cap, e.g. `44rem`, only as a safety ceiling on very wide viewports); (2) reduce the inherited `padding: 10%` on `.product-image-canvas` to ~`5-6%` specifically for the PDP gallery context, since PDP is a single dominant image rather than a small grid thumbnail. Together this should take the product from roughly a third of the gallery column's width to filling most of it.
- **Close the dead gutter.** Rebalance `.pdp-layout` (`globals.css:1303-1308`, currently `1.25fr 0.75fr`) — once the image fills its column per above, verify the gap between image and buy-panel is genuinely just the `5vw` gutter, not compounded by a capped image leaving unclaimed space. Consider tightening to `1.15fr 0.85fr` if the buy-panel's own content (title, price, variant selector, CTA) needs more room to feel proportionate now that the image is larger.
- **Compose gallery + buy-panel as one unit.** Give both columns a shared top reference (e.g. align the gallery's top edge with the `.buy-panel`'s eyebrow baseline, not its border-top) so they read as one composed block; currently they simply sit at `align-items:start` with no shared rhythm beyond that.
- **Price/variant/quantity/CTA hierarchy.** `.buy-panel .pdp-price` is already sized at `1.75rem/700` (`globals.css:2200-2203`) — reasonable. Strengthen the sequence by giving the primary CTA (`.button.coral`) a visually heavier presence than "Save to wishlist" beneath it — increase the primary button's `min-height` slightly (from 52px toward 56-58px) and ensure it is the only saturated-color element in the purchase-actions stack (wishlist button stays outline-only, which it already is per `globals.css` `.button` default — confirm this isn't accidentally styled coral anywhere).
- **Replace the "Information not provided" dashed pill with a designed empty state.** Keep the exact tri-state logic and class hooks (`fact-known` / `fact-not-applicable` / `fact-pill.fact-not-provided`, `product-detail.tsx:19-35`) — never fabricate data, never collapse the three states into one visual. Concrete alternative for `fact-not-provided`: replace the dashed-border pill with a quiet inline treatment — muted italic text ("Not published for this demo listing") with a short left-side tick mark (a 2px `border-left` in `--muted`, no border-radius, no pill shape) so it reads as a deliberate typographic choice rather than a placeholder waiting to be filled in. Keep `fact-not-applicable` visually distinct from this (it can keep its solid muted pill) so the three states remain unambiguous at a glance.
- **Dead whitespace vs. breathing room.** Genuine breathing room = generous line-height and margin *around* content that's already present (keep `.pdp-description`'s `42ch` measure, keep `.facts-section` margin of `4rem 0`). Dead whitespace = space with nothing compositional happening in it — specifically the gallery gutter above and the empty margin below a too-small image. Fixing the gallery sizing above removes the dead whitespace; do not simultaneously compress the intentional margins in `.pdp-description` or `.facts-section`.
- **Mobile.** Fix `.buy-panel h1`'s missing mobile override (`globals.css:1347-1349`, currently `clamp(3rem, 5.5vw, 6rem)` with no `@media (max-width:640px)` rule anywhere in the file) — add one, target roughly `clamp(1.75rem, 7vw, 2.25rem)`, consistent with how `.hero-copy-panel h1` is already scaled down at the same breakpoint (`globals.css:1199-1201`). This directly fixes the three-line title wrap seen in `10-pdp-single-variant-390.png`. Re-check image scale on mobile once the gallery padding/max-width change above lands — the `product-image-canvas` mobile padding override (`globals.css:1902-1906`, currently `8%`) should be revisited alongside the desktop 5-6% change for consistency. Related products (`.pdp-recipe-section`, `.recipe-grid` 2-up) already look reasonable on mobile — no change needed there.
- Motion re-tuning flag: `product-detail.tsx:108-170` — `data-crossfade-image` on the gallery image and `data-crossfade-with` on price/pack/availability all resize/reflow with the gallery change above; `useImageCrossfade` timing should be re-verified once the image's actual rendered box size changes.

---

## Cart/Checkout

No logic changes; behavior, validation, and state are untouched.
- **Line items** (`.cart-lines article`, `globals.css:1646-1671`): currently a plain bordered rectangle. Add a thin left accent rule in the brand coral (matching the pattern already used on `.buy-panel` and `.cart-summary`'s top border) so line items visually belong to the same system as the rest of the site, without adding decoration that slows scanning.
- **Totals.** `.cart-summary h2` (the subtotal, `font-size: 3rem`) is already appropriately dominant against the ink background — keep. Tighten the vertical rhythm between the subtotal, the "Items subtotal only…" caption, and the simulated-commerce notice so they read as one confidence-building block rather than three separate paragraphs of equal spacing.
- **Form grouping** (checkout `.profile-choice`, `globals.css:1695-1721`): already uses the ink-fill selected-state pattern consistently with PDP's variant selector — good, no change needed structurally. Bring its border-radius and border-weight numerically in line with `.variant-selector button` (`8px`/`1.5px`) if they currently differ.
- **Error presentation** (`.error-summary`, `globals.css:1728-1736`): keep the coral-dark border and `surface-subtle` background — this is already calm and clear. No change beyond ensuring heading weight matches the rest of the type system (`font-weight:800` used sitewide for emphasis headings).
- **Responsive spacing:** the existing 900px/640px breakpoints for `.cart-lines article` (`globals.css:1760-1788`) already collapse sensibly — no structural change, just apply the same left-accent treatment above at every breakpoint.
- Explicitly do not add editorial copy, imagery, or extra steps to checkout — the calmness is the feature.

---

## Motion re-tuning notes

Every element below carries a motion data-attribute and will need its animation re-verified once this spec's layout changes land — flagged per-section above, summarized here:
- `hero-collage.tsx` — `data-parallax-layer="z2"` (large frame), `"z3"` (×2, secondary frames), `"z4"` (foreground chip): hero recompose changes size/position of all four.
- `page.tsx` hero copy panel — `data-measure-reveal` on the eyebrow, `<h1>`, `<p>`, `.hero-actions`, `.hero-meta`: unaffected by image-side changes but re-check timing if the copy panel's width changes.
- `department-atlas.tsx` — `data-reveal-group` pairs (`tile-1`+`tile-2`, etc.): only affected if tile numbering removal changes DOM order (it should not — the number is a `<span>` removed in place).
- `product-rail.tsx` — `data-reveal-group` on the whole `.rp-rail` per section: each of the four new rail compositions (editorial feature, filmstrip, asymmetric split, compact shelf) needs its own reveal wiring reverified — a filmstrip's scroll-snap behavior in particular does not compose with the existing grouped-reveal-on-load pattern without direct testing.
- `product-detail.tsx` — `data-crossfade-image` (gallery) and `data-crossfade-with` (×3: price line, pack/SKU line, availability line): resizing the gallery canvas changes the crossfade's visual bounds; re-verify `useImageCrossfade` timing.

---

## What this spec does not touch

- Commerce logic, cart/checkout state, `addLine`/`toggleWishlist`/`setQuantity` behavior, and the simulated-checkout flow are unchanged.
- The `.product-card` root class and its rail/grid variant contract (`product-card.tsx`) are unchanged — only spacing/sizing/type rules inside them.
- Canonical catalog data, product truth, and the tri-state critical-facts data model are unchanged — only the *visual treatment* of `fact-not-provided`.
- Search results/no-results functionality and any test-relied-upon DOM structure (card counts, selectors) are unchanged.
- The approved Pantryform logo and the existing commercial navigation (`.site-header`, `.category-nav`, mega-panel, mobile drawer) are unchanged.
- No new image assets are introduced anywhere in this spec — every visual change is CSS applied to the existing 48 real product photos.
