# Recovery R1 — Gap Audit

**Reference sites:** https://www.bakindia.in/ and https://www.bakerykart.com/
**Method:** Direct WebFetch of both homepages plus reachable listing pages, cross-referenced against the current Pantryform implementation (`src/app/page.tsx`, `src/components/product-card.tsx`, `src/components/site-header.tsx`, `src/app/shop/`, `src/app/products/[slug]/page.tsx`, `src/components/product-detail.tsx`, `src/app/globals.css`, `production_artifacts/04_visual_system/Visual_Direction.md`).

**Note on coverage:** `bakindia.in/product-category/...` and `/shop/` returned 404; `bakerykart.com/collections/ingredients`, `/collections/chocolates` and `/collections/all` returned a site-side SQL error page. Findings below rely on both homepages plus `bakindia.in/categories/ingredients/335898000015251020`, all of which were fully accessible.

## Logo and brand identity

Both references run an actual logo image/lockup top-left. Pantryform renders `PANTRYFORM` as plain text — no mark, no lockup (`Visual_Direction.md` itself flags this as "not a final logo, trademark claim or production lockup"). **So what:** a real symbol + wordmark lockup, sized and weighted like a retail logo, is the single highest-leverage identity fix.

## Product-image realism

Both references use real product photography. Pantryform's PLP/PDP/homepage all render illustrated packaging assets by deliberate creative choice. **So what:** this is the single biggest driver of the "unconvincing as commerce" reaction — recovery should introduce photographic packshots for product cards/PDP, reserving illustration for editorial moments only.

## Product density

BakIndia's category page shows ~50 products in a dense grid with sidebar filters; Pantryform's grid caps at 4 columns desktop / 2 mobile against a total catalog of "24 parent products · 38 exact SKUs." **So what:** the catalog itself is too small to ever feel like a full store — SKU count needs to grow substantially (this recovery phase targets 48 real products).

## Recognizable brands

Both references feature real, recognizable brands with brand pages/filters. Pantryform uses 8 invented brand names. **So what:** replace invented brands with real, verifiable Indian-market brands, styled with retail confidence (logo chips, brand filter).

## Category depth

References show 2–3 level hierarchies with sidebar trees and item counts. Pantryform has one flat level: 8 departments, single `<select>` filter, no subcategories. **So what:** introduce a second subcategory tier to support a real filter sidebar and give the catalog apparent breadth.

## Header/navigation

References show multi-level dropdown mega-menus. Pantryform's desktop nav has exactly 3 links plus a flat 7-item drawer. **So what:** needs a richer mega-menu or expanded nav that surfaces categories directly.

## Search prominence

Pantryform already has a visible header search form — on par with both references. **So what:** preserve as-is; low priority.

## Promotional merchandising

BakIndia runs offer banners and a free-shipping strip; Bakerykart runs rotating promo banners and brand-spotlight modules. Pantryform's homepage has none of this. **So what:** add an offer/promo banner rail and a value-proposition strip to the homepage.

## New arrivals/bestsellers/offers

Both references have explicit New Arrivals / Bestseller / Offer merchandising with discount badges. Pantryform has no bestseller/new/offer merchandising anywhere, no sale-price, no badges. **So what:** add merchandising sections and card-level badges (New / Bestseller / % Off), clearly labeled as demo data consistent with the existing disclosure pattern.

## Product-card information

Reference cards show image, title, size/variant, brand link, price with strike-through discounts. Pantryform's card shows index tag, thumbnail, brand+category eyebrow, title, quantity, single price, availability string — no badge or compare-at price slot, no rating signal. **So what:** add a badge slot and optional compare-at price; keep the existing fact-forward layout (brand, quantity, availability), which is sound.

## PLP shopping usability

BakIndia offers sidebar category counts, multi-field sort, pagination. Pantryform has one search box, one department dropdown, 3-way sort — functional but visually thin, no sidebar. **So what:** convert filters to a persistent sidebar once subcategories/attributes exist.

## PDP purchasing confidence

`product-detail.tsx` already does variant selection, quantity stepper, wishlist, and a genuinely strong "critical facts" table (ingredients/allergens/storage) — more rigorous than what either reference PDP shows. **So what:** this facts-table pattern is a differentiator worth keeping and extending; the product image remains illustration and there's no review/trust content beside the buy panel.

## Trust and delivery information

Both references show delivery terms, free-shipping thresholds, and payment-security messaging in-page and in the footer. Pantryform shows the portfolio-demo disclosure banner but has no footer trust content (delivery info, policies, contact). **So what:** add a proper footer with fictional-but-plausible trust content, without contradicting the existing demo disclaimers.

## Mobile commerce behaviour

Not directly observable via WebFetch (desktop-rendered markup only), but `globals.css` shows explicit mobile grid breakpoints and `site-header.tsx` has an accessible drawer nav with focus trapping. **So what:** mobile structure is reasonably engineered; the main mobile gap will inherit the same desktop content gaps (thin merchandising, no badges) rather than being distinct.

## Areas where the current editorial design should be preserved

The department atlas (numbered 8-tile discovery grid), the recipe-to-supplies transformation rail, and the PDP critical-facts table are genuinely distinctive and pass the project's own stated "generic-template test." The warm palette, restrained badge-free honesty, and "retailer first, product brands second" hierarchy are principles that differentiate Pantryform from marketplace clutter. **So what:** recovery work should graft commerce density (photography, badges, promo rails, deeper categories, footer) onto this existing editorial skeleton rather than replacing it with a generic template.
