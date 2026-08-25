# Recovery R2B1 — Image Provenance Register & Validation Report

## Image sourcing summary

**43 of 48 products (90%) have a locally staged real photo; 5 have an honest "image not yet available" placeholder.** No image was AI-generated, hotlinked, or edited to remove watermarks/alter trademarks/mislead on packaging.

- 12 photos carried over from R1/R2A (already staged, unchanged).
- 30 photos sourced in this phase by a dedicated sourcing pass against the brand/manufacturer sites and marketplace/distributor listings named in the R1 provenance register, manufacturer-site-first per Section 4.
- 1 photo (JVG Chocolate Sprinkles) sourced directly by re-checking the register's own IndiaMART listing URL after the sourcing pass skipped it.
- 5 could not be sourced within a reasonable effort budget (see below) and use the shared honest placeholder graphic instead of a fabricated image.

## Per-product provenance register

Every derivative's SHA-256 checksum, pixel dimensions and local path are enforced by `tools/validate_catalog_assets.js` against `Catalog_Asset_Manifest.json` — this table is the human-readable summary; the manifest is the source of truth. "Source" links to the exact image file fetched (page URL where the direct image URL required page context to resolve, such as JS-lazy-loaded galleries).

| Product | Brand | Status | Source | Type | Original dims | Access date |
|---|---|---|---|---|---|---|
| 811 Dark Chocolate Callets | Callebaut | Sourced | [link](https://www.callebaut.com/en/products/callebaut/darkchocolaterecipe811/811-2B-U73) | manufacturer | 1116×1176 | 2026-08-25 |
| Dark Compound Chocolate Slab | Morde | Sourced | [link](https://www.amazon.in/Morde-Dark-Compound-Slab-400/dp/B01IET7SUS) | marketplace | 679×679 | 2026-08-25 |
| Cocoa Powder (Medium Brown 10/12) | Van Houten | Sourced | [link](https://assets.hyperpure.com/data/images/products/14f74324fddf55530fea3899afeffe56.png) | authorized distributor | 1000×1000 | 2026-08-25 |
| Dark Compound Chocolate Bar (DCO-18) | Amul | Sourced | [link](https://prithvienterprises.co.in/cdn/shop/files/sliding_image_425626ajpgts1687328712_1ade6ca7-8365-46bd-a7eb-11e2eb71a7c1.jpg?v=1745685832) | authorized distributor | 1000×1000 | 2026-08-25 |
| Dark Compound Chocolate Chips | Morde | Sourced | [link](https://www.bbassets.com/media/uploads/p/l/40119334_2-morde-chips-dark-compound-horeca.jpg) | marketplace | 500×500 | 2026-08-25 |
| Cocoa Powder | Weikfield | Sourced | [link](https://m.media-amazon.com/images/I/51lPzDSunVL._SL1080_.jpg) | marketplace | 1080×1080 | 2026-08-25 |
| Cocoa Powder (Natural Unsweetened) | Hershey's | Sourced | [link](https://www.hersheyland.in/content/dam/Hersheyland_India/en_in/brands/cocoa-hot-chocolate/2026/hersheys-cocoa-natural/HERSHEYS-COCOA-Natural-Unsweetened-FOP.png) | manufacturer | 1000×1000 | 2026-08-25 |
| Maida (All Purpose Flour) | Pillsbury | **Missing** | [attempted](https://blinkit.com/prn/pillsbury-maida/prid/598840) | — | — | 2026-08-25 |
| Double Action Baking Powder | Weikfield | Sourced | [link](https://www.amazon.in/Weikfield-Baking-Powder-100g/dp/B004KFHIBK) | marketplace | 679×679 | 2026-08-25 |
| Corn Flour | Weikfield | Sourced | [link](https://rukminim2.flixcart.com/image/832/832/kctf0cw0/flour/w/b/m/500-cornflour-500gm-1-corn-flour-weikfield-original-imaftv7de84whwxq.jpeg) | marketplace | 832×832 | 2026-08-25 |
| Baking Soda | Urban Platter | Sourced | [link](https://urbanplatter.com/cdn/shop/files/13314-01-Prefessional-Baking-Soda-1kg.jpg?crop=center&height=1200&v=1741348025&width=1200) | manufacturer | 1200×1200 | 2026-08-25 |
| Icing Sugar | Eagle | Sourced | [link](https://www.bigbasket.com/pd/40009312/eagle-icing-sugar-200-g-pouch/) | marketplace | 800×800 | 2026-08-25 |
| Vanilla Custard Powder | Weikfield | Sourced | [link](https://m.media-amazon.com/images/I/51evv2QnkVL._SL1080_.jpg) | marketplace | 1080×1080 | 2026-08-25 |
| Baking Powder | CCDS | **Missing** | [attempted](https://www.ccdsshop.com/baking-powder) | — | — | 2026-08-25 |
| Spectral Gel Colour — Red | Magic Colours | Sourced | [link](https://magiccolours.co.in/collections/spectral-gel-colours) | manufacturer | 500×500 | 2026-08-25 |
| Spectral Genie Gel Tube Colours | Magic Colours | Sourced | [link](https://magiccolours.co.in/cdn/shop/files/GenieGelTubeFoodColors_1.jpg?v=1717762407) | manufacturer | 1080×1080 | 2026-08-25 |
| Soft Gel Paste Food Colours (10-Pack) | Colourmist | Sourced | [link](https://m.media-amazon.com/images/I/61IPDC4ZB6L._SL1000_.jpg) | marketplace | 1000×1000 | 2026-08-25 |
| Liquid Food Colour | Puramate | Sourced | [link](https://puramate.in/wp-content/uploads/2024/03/Liquid-Food-Colour-Red.png) | manufacturer | 600×600 | 2026-08-25 |
| Culinary Essence Assorted Pack | Puramate | Sourced | [link](https://m.media-amazon.com/images/I/71Uz1QZo8rL._SL1500_.jpg) | marketplace | 1500×1500 | 2026-08-25 |
| Premium Vanilla Extract | Urban Platter | Sourced | [link](https://urbanplatter.com/products/urban-platter-premium-vanilla-extract-100ml-made-with-real-indian-vanilla-perfect-for-baking-alcohol-free) | manufacturer | 2000×2000 | 2026-08-25 |
| Gel Food Coloring Icing Color | Wilton | Sourced | [link](https://cdn11.bigcommerce.com/s-vm6doh2w4n/images/stencil/1280x1280/products/9578/26942/nszo8ojfydiet5el17xg__85620.1729041271.jpg?c=1) | manufacturer | 1280×1280 | 2026-08-25 |
| Vizyon Sugar Paste — White | Bakersville | Sourced | [link](https://www.indiamart.com/bakersvilleindiapvtltd-indore/sugar-paste.html) | authorized distributor | 580×580 | 2026-08-25 |
| Premium Whip Topping Cream | Tropolite | Sourced | [link](https://m.media-amazon.com/images/I/51nDBxT6wBL._SL1100_.jpg) | marketplace | 1100×1100 | 2026-08-25 |
| Chocolate Whip Topping | Rich's | **Missing** | [attempted](https://www.richs.in/product/richs-chocolate-whip-topping/) | — | — | 2026-08-25 |
| Truffle Base | Rich's | **Missing** | [attempted](https://www.richs.in/product/richs-truffle-base/) | — | — | 2026-08-25 |
| Rolled Fondant | FunCakes | Sourced | [link](https://funcakes.com/content/uploads/2019/11/Sugar-Paste-Bright-White-voorkant-F20100-1000x1000.jpg) | manufacturer | 1000×1000 | 2026-08-25 |
| Hazelnut Spread with Cocoa | Nutella (Ferrero) | Sourced | [link](https://www.amazon.in/Nutella-Hazelnut-Spread-Cocoa-750g/dp/B008TMIO2M) | marketplace | 679×679 | 2026-08-25 |
| Fresh Cream (25% Milk Fat) | Amul | Sourced | [link](https://www.bbassets.com/media/uploads/p/l/40102603_3-amul-fresh-cream-25-milk-fat-low-fat.jpg) | marketplace | 500×500 | 2026-08-25 |
| Edible Baking Sprinkles | Wilton | Sourced | [link](https://rukminim2.flixcart.com/image/832/832/baking-sparkle-topper/e/4/g/710-9839-wilton-original-imaeh2k3t5jqrg8d.jpeg) | marketplace | 370×832 | 2026-08-25 |
| Rainbow Nonpareils | Wilton | Sourced | [link](https://cdn11.bigcommerce.com/s-vm6doh2w4n/images/stencil/1280x1280/products/9721/28517/d3e8fbe1db355020bae6e8dde4dcbdb5b0ffc7c0__57951.1732624636.jpg?c=1) | manufacturer | 641×1280 | 2026-08-25 |
| Wow Confetti Deco Sprinkles | Bakersville | Sourced | [link](https://www.bakersvilleshop.com/cdn/shop/files/41RJQhiyFJL_1200x1200.jpg?v=1692860531) | manufacturer | 500×500 | 2026-08-25 |
| Glint Pearl Spray | Bakersville | Sourced | [link](https://bakersville.in/wp-content/uploads/2024/06/1-392.jpg) | manufacturer | 1000×1000 | 2026-08-25 |
| Chocolate Vermicelli Sprinkles | JVG | Sourced | [link](https://5.imimg.com/data5/OT/UQ/PG/SELLER-4333657/chocolate-sprinkles-1000x1000.jpg) | authorized distributor | 750×1000 | 2026-08-25 |
| Rainbow Sprinkles | JVG | Sourced | [link](https://www.indiamart.com/jvg-traders-ltd/decoration-sprinkles.html) | authorized distributor | 318×500 | 2026-08-25 |
| Edible Sugar Pearls | PME | Sourced | [link](https://m.media-amazon.com/images/I/81wsznchEGL._AC_SL1280_.jpg) | marketplace | 1280×1280 | 2026-08-25 |
| 16-Inch Disposable Decorating Bags | Wilton | Sourced | [link](https://www.amazon.in/Wilton-Disposable-16-Inch-Decorating-Bags/dp/B00175TFJ4) | marketplace | 679×679 | 2026-08-25 |
| Aluminum Round Cake Pan Set | Wilton | Sourced | [link](https://cdn11.bigcommerce.com/s-vm6doh2w4n/images/stencil/1280x1280/products/5917/27832/em0rsjtqxkpzefm1ulbf__26790.1729000443.jpg?c=1) | manufacturer | 1280×1280 | 2026-08-25 |
| Round Baking & Serving Dish | Borosil | Sourced | [link](https://myborosil.com/cdn/shop/files/BGFGBDSH0020_1.jpg?v=1765866279) | manufacturer | 1000×1000 | 2026-08-25 |
| Non-Stick Cake Mould | Wonderchef | **Missing** | [attempted](https://www.wonderchef.com/collections/bakeware/cake-moulds) | — | — | 2026-08-25 |
| Supatube Piping Tip (Writer #1) | PME | Sourced | [link](https://m.media-amazon.com/images/I/51nsl2vytJL._AC_SL1280_.jpg) | marketplace | 588×1135 | 2026-08-25 |
| 55-Piece Cake Decorating Tip Set | Ateco | Sourced | [link](https://www.atecousa.com/images/783_ateco.jpg?crc=1292326) | manufacturer | 466×466 | 2026-08-25 |
| Cake Decorating Kit with Turntable | Lukzer | Sourced | [link](https://www.amazon.in/Lukzer-Turntable-Table-Baking-Tools/dp/B07G5C95TB) | marketplace | 679×667 | 2026-08-25 |
| Cake Drum Board (Round, Silver) | PME | Sourced | [link](https://m.media-amazon.com/images/I/817mCucCI3L._AC_SL1500_.jpg) | marketplace | 1500×1498 | 2026-08-25 |
| Silver Round Cake Board (6-Pack) | Cake Craft Shop | Sourced | [link](https://www.cakecraftshop.in/wp-content/uploads/2021/09/the-cake-decorating-co-6mm-round-mirror-silver-masonite-cake-board-p12647-42825_medium.jpg) | manufacturer | 665×665 | 2026-08-25 |
| Tall Corrugated Window Cake Box | The Baker's Mart | Sourced | [link](https://cdn.dotpe.in/longtail/item_thumbnails/7915177/lWtjnRdK-400-400.webp) | manufacturer | 400×400 | 2026-08-25 |
| Cake Box with Window | Eco Bags India | Sourced | [link](https://ecobags.in/brown-cake-box-with-window-1-kg-8x8x4-in/) | manufacturer | 600×600 | 2026-08-25 |
| Window Bakery Box | Famous Packaging | Sourced | [link](https://5.imimg.com/data5/ANDROID/Default/2021/12/CI/YR/FH/101173516/product-jpeg-1000x1000.jpg) | manufacturer | 753×1000 | 2026-08-25 |
| Cake Box with Logo Printing | Pirsq | Sourced | [link](https://www.pirsq.com/media/uploads/estimate/1497264621000/cake%20box.jpg) | manufacturer | 400×400 | 2026-08-25 |

## Not sourced — blockers, not fabrications

Per R2B1 Section 4, these 5 products render an honest, non-branded "Image not yet available" placeholder rather than a fabricated or AI-recreated packshot:

- **Pillsbury Maida** — Blinkit (the register's image source) returns HTTP 403 to automated requests; BigBasket/JioMart brand pages are JS-rendered single-page apps with no product image in static HTML; no manufacturer-direct product page was found.
- **CCDS Baking Powder** — ccdsshop.com blocks the specific product page and all sub-paths with an AWS WAF rule (empty-body 404) even with a standard browser user agent; only the site's homepage loads.
- **Rich's Chocolate Whip Topping** — richs.in's product page now redirects to a dead URL; the brand's Shopify storefront (shop.richs.in) is password-protected.
- **Rich's Truffle Base** — richs.in's product page renders as an empty client-side template with no product-specific image in the static HTML.
- **Wonderchef Non-Stick Cake Mould** — wonderchef.com's cake-moulds collection page only lists specialty silicone shapes (heart/rose/daisy Pavoni moulds); no plain round non-stick metal mould/pan matching the generic catalog title could be located.

These 5 are candidates for a future, more targeted sourcing pass (e.g. a different Rich's regional storefront, or narrowing "Wonderchef Cake Mould" to a specific SKU) — deferred to R2B2, not attempted further here to stay within this slice's scope.

## Image quality limitations

- **JVG Rainbow Sprinkles** (318×500) is the lowest-resolution sourced image — a loose-product macro shot with no visible packaging, carried over from R1 with the same limitation noted there. Usable at card scale, weaker than the other 42.
- **Borosil Round Baking & Serving Dish** is a styled lifestyle photograph (the dish holding a baked cake, with props) from Borosil's own product page, not a plain packshot — Borosil markets this glassware line with lifestyle photography rather than studio product-only shots. The photo is genuine and correctly matched (verified against the exact 1.2 L product page), just less directly comparable to the packaged-goods packshots alongside it.
- All other 41 sourced images are clean product-only or on-white/light packshots consistent with the rest of the catalog.

## Image normalization

`tools/normalize_real_assets.py` produces two consistent derivatives per sourced product — `primary.webp` (1200×1200) and `thumbnail.webp` (480×480) — on a clean white canvas with ~8% inner padding (object-fit: contain-compatible), preserving the original photo's content and any transparency untouched. Low-resolution originals are never upscaled beyond their native size. Missing products reuse one shared placeholder pair rather than each getting a unique fabricated image. Source masters are kept separately (`public/real-products/`, `public/real-products-v2/`) from the derived, served files (`public/assets/catalog/real/`).

## Validation report

All three validation stages pass against the final 48-product/51-variant/43-sourced-image state:

```
$ node tools/validate_catalog_data.js
{
  "result": "PASS",
  "products": 48,
  "variants": 51,
  "content_records": 48,
  "recipes": 6,
  "recipe_ingredient_lines": 45,
  "mappings": 18,
  "product_asset_coverage": 48,
  "recipe_asset_coverage": 6,
  "errors": []
}

$ node tools/validate_catalog_assets.js
{
  "status": "PASS",
  "records": 61,
  "productPackshots": 48,
  "productsSourced": 43,
  "productsMissingImage": 5,
  "editorialRecordsKept": 13,
  "localAssetFilesVerified": 122
}

$ node scripts/validate-production-data.mjs
Production adapter validation passed: 48 products, 51 SKUs, 18 recipe mappings, 61 asset records.
```

## Test suite

- `npx prettier --check` — pass
- `npx eslint src/ scripts/ tests/` — pass, 0 problems
- `npx tsc --noEmit` — pass
- `npx vitest run` — 25/25 tests pass across 7 files, including a new `catalog.test.ts` assertion that no fictional brand ID resolves and every product ID starts with `prod_real_`
- `npx playwright test` — 10/10 pass (desktop + mobile): homepage → department → PDP → cart → checkout; search (`?q=cocoa` now correctly returns 4 real cocoa-powder products instead of the old single fictional match); recipe review computing exact packs against real SKUs; stale-cart-data rejection; reduced-motion; 360px mobile reflow
- `npm run build` — clean production build, 48 static PDP routes generated, 0 console errors, 0 broken image requests observed in manual browser smoke tests of `/`, `/shop`, a PDP, and a recipe review page

## Portfolio disclosure (retained)

Third-party product names, trademarks and imagery referenced throughout this catalog belong to their respective owners. Pantryform is a fictional portfolio/demo project and is not affiliated with, sponsored by, or endorsed by any brand shown.
