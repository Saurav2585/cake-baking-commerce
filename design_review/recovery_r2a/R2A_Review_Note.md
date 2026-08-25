# Recovery R2A — Real Commerce Homepage Visual Pilot — Review Note

**Scope:** Global brand/header integration, homepage rebuild, real-product cards, footer, desktop + mobile visual evidence. PLP/PDP/full catalog rebuild is explicitly out of scope (deferred to R2B+, pending visual approval of this pilot).

## What changed

- **Logo integration** — the approved `public/brand/Pantryform-logo-final.png` horizontal lockup replaces the plain-text wordmark in the header (desktop + mobile) and footer, on a white plate for contrast. A compact mark (`public/brand/pantryform-mark.png`), cropped losslessly from the master via a bounding-box script (master file untouched), is swapped in via CSS at ≤640px and used as the site favicon/apple-touch-icon (`src/app/icon.png`, `src/app/apple-icon.png`).
- **Header** (`src/components/site-header.tsx`) — rebuilt as slim disclosure bar + new demo-safe offer bar, primary row (logo, large central search, wishlist/cart icon-actions, demo-account indicator, mobile menu), and a new category nav row with a CSS-only mega-menu for "Fondant & Decoration". Existing search form contract, wishlist/cart links, and the accessible drawer (focus trap, `Escape` to close) are unchanged in behaviour.
- **Footer** (`src/components/site-footer.tsx`) — rebuilt with logo plate, category links, information links, a demo-safe newsletter form (client-side only, nothing transmitted or stored), and a trademark/imagery attribution + portfolio disclosure statement.
- **Homepage** (`src/app/page.tsx`) — rebuilt in the requested section order: commercial hero (real shoppable product cards, not an illustration) → shop-by-category (real packshot thumbnails per department) → popular brands (typographic strip) → bestsellers → promo split banner → new arrivals → baking essentials → tools/bakeware/packaging → recipe inspiration (kept, repositioned lower, shrunk) → trust strip → footer. The old "Ingredient theatre" section (illustrated fictional-catalog packaging) was removed from the homepage — it was the exact anti-pattern the R1 gap audit flagged; the fictional canonical catalog itself is untouched and still reachable via `/shop`.
- **Real product cards** (`src/components/real-product-card.tsx`, `real-product-rail.tsx`, `src/data/real-products.ts`) — a new, homepage-only product record type wrapping the 12 R1-staged real packshots, with brand, pack size, demo price, badge (Bestseller/New/Essential/Tool pick), wishlist and "Quick add" actions wired into the existing `CommerceProvider` cart/wishlist state.
- **Cart integration** (`src/components/cart-view.tsx`, `src/app/layout.tsx`) — the cart line renderer now recognises real-product lines (previously it would have silently dropped them, since they aren't in the canonical catalog); their SKUs were added to `validSkus` so they survive the localStorage restore-on-reload check like canonical lines do.

## Real products used (12 of 12 R1-staged items)

Callebaut 811 Dark Chocolate Callets · Morde Dark Compound Chocolate Slab · Weikfield Double Action Baking Powder · Eagle Icing Sugar · Magic Colours Spectral Gel Colour (Red) · Urban Platter Premium Vanilla Extract · Bakersville Vizyon Sugar Paste (White) · Nutella Hazelnut Spread with Cocoa · JVG Rainbow Sprinkles · Wilton 16-Inch Disposable Decorating Bags · Lukzer Cake Decorating Kit with Turntable · Eco Bags India Cake Box with Window.

All prices/pack sizes are the demo fixtures already recorded in `design_review/recovery_r1/catalog/Product_Provenance_Register.md`; none were invented for this pilot.

## Packshots replaced / relabelled

- **JVG "Chocolate Vermicelli Sprinkles"** — the R1-staged image actually depicts loose rainbow (multi-colour) sprinkles, not the brown vermicelli variant it was registered under. Rather than source a new image without a verifiable provenance trail, the listing was **retitled to "Rainbow Sprinkles"** to match what the photo shows — JVG Rainbow Sprinkles is itself a separate, already-verified real product in the R1 register (same brand, price and pack size), so this is a relabel, not a fabrication. No other packshot needed replacement; all other images accurately depict the product they're labelled as.

## Known visual limitations

- The JVG Rainbow Sprinkles source photo (318×500) is a loose-product macro shot with no visible packaging or brand mark — usable at card scale but weaker than the other 11 packshots, which all show branded packaging clearly.
- "Popular brands" is a typographic placeholder strip (no licensed brand logo assets available yet), explicitly labelled as such.
- Only 12 of the proposed 48 real products are shoppable; the same 12 packshots are necessarily reused across multiple rails (e.g. the bestseller Wilton bags also appear in the tools/packaging rail).
- Mobile homepage is long (single-column stacking of four-card rails); horizontal-scroll rails were considered but deferred to keep this slice bounded.

## Deferred to R2B (not started)

Full 48-product real catalog import into the canonical data pipeline; PLP/PDP rebuild with real photography; brand-filtered shop views; licensed brand logo assets; sidebar category filters/subcategory tier; badge/compare-price support on the canonical `ProductCard`.
