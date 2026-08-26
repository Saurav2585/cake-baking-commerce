# R2B2V-Direction — Visual Prototype Engineer Brief

You are the **Visual Prototype Engineer** for ONE concept territory in a bounded visual-direction
review gate. Two other engineers are building the other two territories in isolation — do not
reference or try to match them. This is a static HTML/CSS prototype exercise, not an application
change: **do not touch anything outside your assigned `design_review/recovery_r2b2_direction/concept-*/`
folder.**

## Why this gate exists

The live Pantryform Next.js app (do not open or edit it) was reviewed and rejected: "looks like a
conventional catalog with editorial headings." Your job is to prove a materially different, premium,
credible visual direction using real assets, before anyone touches app routes again. Nothing you
build here is wired to the app — it's throwaway static HTML for a side-by-side design review.

## Deliverables (exact filenames)

Inside your assigned folder `design_review/recovery_r2b2_direction/concept-<letter>/`:

- `homepage.html` — full page, above-the-fold must show: complete header, a premium commercial hero,
  real products at meaningful optical scale, and the first transition into product discovery (a rail
  or grid that begins pulling the eye toward browsing).
- `plp.html` — full page, above-the-fold must show: category introduction, a filter/sort bar, the
  first 8 products, and **one intentional merchandising break** (a full-width band/spotlight that
  interrupts the grid rhythm — not another product card).
- `pdp.html` — full page, above-the-fold must show: a real product gallery, product identity
  (brand + title + badges), price/variant/quantity controls, and the primary Add-to-Cart CTA.
- `style.css` — your concept's stylesheet, linked with `<link rel="stylesheet" href="style.css">`
  from all three pages. (Inlining is also fine if you prefer, but keep it out of the HTML body markup
  — `<style>` in `<head>` only.)

All three pages must work by opening the `.html` file directly in a browser (`file://`), with **no
build step, no bundler, no external network requests** — no Google Fonts, no CDN scripts. Use system
font stacks only. A tiny amount of inline `<script>` is fine for non-destructive UI polish (variant
chip selection state, quantity stepper, mobile nav toggle) — never anything that fetches, submits, or
navigates.

## Content system — shared across all three concepts

All copy, prices and photography must come from the dataset below. Do not invent products, prices, or
review counts. Do not use lorem ipsum.

### Brand assets
Logo files live in `public/brand/`. From your HTML files the relative path prefix to the repo's
`public/` folder is `../../../public/` (three levels up: `concept-<letter>/` → `recovery_r2b2_direction/`
→ `design_review/` → repo root).

- `../../../public/brand/pantryform-logo-header.png` — wide horizontal lockup (1881×453), best for a
  header logo at a fixed height.
- `../../../public/brand/Pantryform-logo-final.png` — wide lockup, alternate crop (2079×756).
- `../../../public/brand/pantryform-mark-square.png` — square mark (453×453), good for a compact
  mobile header or favicon-style use.
- `../../../public/brand/pantryform-mark.png` — vertical mark (395×453).

Site name: **Pantryform**. It is an Indian online baking-supplies retailer (cake, pastry and
dessert-making ingredients, colours, tools and packaging) — not a lifestyle, fashion or beauty brand.

### Product data
Full dataset (48 real, verified products with brand, title, department, price, pack size and a real
photograph path) is at `design_review/recovery_r2b2_direction/shared-data/products.json`. Every entry
has:

```json
{
  "id": "prod_real_callebaut_811",
  "title": "811 Dark Chocolate Callets",
  "brand": "Callebaut",
  "dept": "dept_chocolate",
  "cat": "cat_cocoa",
  "price": "₹950",
  "price_paise": 95000,
  "pack": "400 g",
  "variants": [{"label": "400 g", "price": "₹950"}, {"label": "1 kg", "price": "₹2,200"}],
  "img": "/real-products/callebaut-811-callets.png",
  "avail": "available"
}
```

`img` is relative to `public/` — prefix it with `../../../public` to get e.g.
`../../../public/real-products/callebaut-811-callets.png`. Every image is a real third-party product
photograph (verified, sourced from the manufacturer/retailer for this portfolio demo) — never crop out
or alter the product itself, never add fabricated packaging or fake labels on top of it. It is fine to
place a real photo on a CSS-generated backdrop (gradient, texture, colour block, shadow) or to show a
cropped/zoomed region of the same real photo for a gallery thumbnail — that is still real photography,
just differently framed.

Departments (7): `dept_ingredients`, `dept_chocolate`, `dept_colours_flavours`, `dept_fillings_fondant`,
`dept_decorating`, `dept_bakeware_tools`, `dept_packaging`. Display names:
Ingredients · Chocolate · Colours & Flavours · Fillings & Fondant · Decorating · Bakeware & Tools · Packaging.

### Homepage content requirements
- **Header**: logo, primary nav (the 7 departments above, plus a "Recipes" link), a search input,
  and account/wishlist/cart icon actions (cart shows a small count badge, e.g. "3" — static, no logic
  needed). Must be a complete, credible ecommerce header, not a stripped placeholder.
- **Hero**: a premium commercial hero above the fold. Must feature at least 2 real product photos at a
  scale where the product is clearly legible and dominant (not tiny objects in a huge empty frame).
  Suggested hero products: Callebaut 811 Dark Chocolate Callets, Bakersville Vizyon Sugar Paste (White),
  Magic Colours Spectral Gel Colour — Red, PME Edible Sugar Pearls — pick whichever suits your
  territory's story. Include a headline, one short line of supporting copy, and a primary CTA button
  (e.g. "Shop Chocolate & Cocoa" or "Shop Bestsellers").
- **First discovery transition**: immediately below the hero (still visible or just crossing the fold
  is fine), a rail or grid of 6–8 real products at meaningful scale (not tiny thumbnails) introducing
  browsing — e.g. "Bestsellers" or "Shop by Department". Pick real, varied products from across
  departments from the dataset.

### PLP content requirements
Category = **"Chocolate & Cocoa"**, using these 8 products from the dataset (already curated as one
cross-merchandised category — Nutella is deliberately included as a chocolate spread):
1. Callebaut — 811 Dark Chocolate Callets
2. Morde — Dark Compound Chocolate Slab
3. Van Houten — Cocoa Powder (Medium Brown 10/12)
4. Amul — Dark Compound Chocolate Bar (DCO-18)
5. Morde — Dark Compound Chocolate Chips
6. Weikfield — Cocoa Powder
7. Hershey's — Cocoa Powder (Natural Unsweetened)
8. Nutella (Ferrero) — Hazelnut Spread with Cocoa

Above the fold:
- **Category introduction**: department/category name, one line of descriptive copy, a result count
  such as "8 of 48 products" (this is a real signal that the layout must scale to the full 48-SKU
  catalog, not just this demo set).
- **Filter/sort bar**: department chips or a filter control (with "Chocolate" active/selected), a sort
  dropdown (Featured / Price: Low to High / Price: High to Low / Popularity), reads as a real
  commerce filter bar.
- **First 8 products**: the list above, as product cards with real photo, brand, title, price, and an
  add-to-cart affordance. Products must be legible at a meaningful size — do not shrink 8 cards into
  a wall of near-illegible thumbnails; it is fine if only some of the 8 are fully visible above the
  1440×900 fold as long as the grid rhythm and card quality are clear.
- **One intentional merchandising break**: insert ONE full-width band into the grid (e.g. after the
  4th product) that is visually distinct from a product card — a brand spotlight ("Callebaut, Belgian
  couverture"), an editorial callout, a cross-sell prompt. It must clearly break the 4-up (or however
  many columns you choose) rhythm, not just be another card with a different border.

### PDP content requirements
Product = **Callebaut — 811 Dark Chocolate Callets** (`prod_real_callebaut_811`), variants 400 g
(₹950) and 1 kg (₹2,200), image `../../../public/real-products/callebaut-811-callets.png`.

Above the fold:
- **Real product gallery**: the one real photo as the dominant primary image, plus 2–3 thumbnails.
  Since only one photograph exists for this product, build the thumbnails as different real crops of
  the same image (e.g. `object-position`/`background-position` shifted to frame the label vs. the
  callets texture vs. a tight macro) — clearly framed as alternate views of the same real photo, never
  a fabricated or generated image. Clicking a thumbnail may swap which crop/zoom is shown in the main
  frame (a few lines of inline JS is fine); this is optional polish, not required for the fold.
  Product-on-a-surface treatments (marble, wood-grain, warm gradient) built with CSS only are
  encouraged for the primary frame — do not overlay any generated imagery.
- **Product identity**: brand ("Callebaut"), title ("811 Dark Chocolate Callets"), 1–2 short
  descriptive lines (you may write plausible, factual-sounding but non-claim copy, e.g. "Belgian dark
  couverture callets, 53.8% cocoa, for ganache, coating and moulding" — do not invent certifications,
  awards or specific nutritional/quality claims), and at least one badge (e.g. "Bestseller").
- **Price / variant / quantity**: price for the selected variant, two variant chips (400 g / 1 kg)
  that are clearly selectable (visual selected state required, can be static-selected on 400 g), and a
  quantity stepper (−, number, +).
- **Primary CTA**: a prominent "Add to Cart" button (non-functional is fine — no JS required beyond
  optional visual state), plus it's fine to add a secondary wishlist/save icon.

### Mobile (390×844) — homepage and PDP only
Do not simply let desktop CSS reflow at narrow widths. Compose the mobile layout deliberately:
- Header collapses to logo + hamburger/search/cart icons only.
- Hero becomes a single dominant product photo (not a shrunk two-column layout) with headline, short
  copy and CTA stacked below or overlaid with sufficient contrast.
- Discovery rail becomes a horizontally scrollable row or a tight 2-up grid — real products still at a
  legible, tappable scale.
- PDP gallery becomes a single full-width image with a swipeable-looking thumbnail strip below it;
  buy panel (price/variant/qty/CTA) stacks full-width beneath the gallery, not squeezed beside it.
- All tap targets ≥ 44×44px. Body text ≥ 16px. No text below ~13px anywhere, ever (including badges/
  labels) — task explicitly forbids illegibly small mobile type.

## Territory brief

<!-- ONLY-YOUR-TERRITORY -->

## Mandatory quality rules (apply to every page, every viewport)

- Real packshots must be visually dominant, not tiny objects inside oversized blank cards.
- No giant empty sections — every large area of whitespace must be doing compositional work
  (breathing room around a hero image, not dead space).
- Do not repeat an identical 4-up card grid as the only visual language across the whole page — vary
  rhythm (rails, spotlights, asymmetric groupings, the merchandising break on PLP).
- No illegibly small mobile typography.
- Build the desktop (1440px) and mobile (390px) compositions as deliberate, separate layouts (via
  media queries in your CSS) — do not rely on naive reflow.
- Decorative surface treatment (texture, depth, geometry) must come from CSS only — gradients, masks,
  box-shadow, border-radius, clip-path, background blends, color-mix(). No AI-generated images. No
  fabricated packaging or labels. No WebGL/canvas effects.
- Palette foundation: reuse the existing Pantryform CSS custom properties as your base —
  `--canvas:#fff8ed; --surface:#fff; --surface-subtle:#f2ece4; --ink:#2b1b2b; --muted:#5b5860;
  --coral:#c54731; --coral-dark:#9b3027; --saffron:#d8722b; --saffron-dark:#a5541b;
  --success:#376348; --warning:#f6dca5; --line:#767076;`. You may derive supporting tones from these
  via `color-mix()` (deeper cocoa, muted parchment, soft charcoal, etc.) but do not introduce
  unrelated hues (no new blues/purples/pinks/teals) — the "current design tokens" constraint is about
  color, not layout or type. Typography, layout grammar, density, and imagery treatment are exactly
  where your territory should diverge.
- Motion may be described in a short HTML comment near the relevant element (e.g.
  `<!-- motion: card lifts 4px + shadow deepens on hover, 150ms ease-out -->`) but must NOT be
  implemented as actual animation/transition in this gate — static states only. (Simple non-animated
  hover/focus states like a border-color or background change are fine; just no transition/@keyframes.)
- Accessibility baseline: semantic landmarks (`header`, `nav`, `main`, `footer`), real `alt` text on
  every product image (e.g. "Callebaut 811 Dark Chocolate Callets pack shot"), visible focus states,
  sufficient text contrast against your backgrounds, minimum 44×44px tap targets on mobile, one `h1`
  per page.

## When you're done

Confirm all three files exist and open cleanly (no console errors, images resolve) before you finish.
You do not need to take screenshots or write comparison notes — that is handled separately. Do not
modify `products.json`, `BRIEF.md`, files in other `concept-*/` folders, or anything outside your
assigned folder.
