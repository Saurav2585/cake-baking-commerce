# Sitemap and Information Architecture

**Phase:** 2B — architecture only; no wireframes  
**Brand:** Pantryform — prototype direction only; formal legal clearance pending

## IA principles

- Lead with the approved eight departments and baking tasks; brands remain secondary filters/landing paths (D-015).
- Limit customer-facing depth to `department → category → optional subcategory → product`. Product family is a data/merchandising concept, not another mandatory navigation level.
- Keep Recipes first-class while distinguishing editorial recipes from sellable products.
- Preserve retailer primacy; fictional product brands are not sellers.
- Make search, wishlist and cart globally reachable; expose the same destinations to keyboard, mobile and assistive-technology users.

## V1 route tree

```text
/
├── /shop
│   ├── /shop/ingredients
│   ├── /shop/chocolate
│   ├── /shop/colours-flavours
│   ├── /shop/fillings-fondant
│   ├── /shop/decorating
│   ├── /shop/bakeware-tools
│   └── /shop/packaging
│       └── category and optional subcategory routes
├── /products/[product-slug]
├── /search?q=[query]
├── /recipes
│   ├── /recipes/[recipe-slug]
│   └── /recipes/[recipe-slug]/add-to-cart
├── /wishlist
├── /cart
├── /checkout
├── /order-confirmation/[demo-reference]
├── /about
├── /contact
├── /faq
├── /shipping-returns
├── /privacy
├── /terms
└── /404
```

Mini cart, navigation drawer, filters and dialogs are states—not indexable routes. Checkout and confirmation are explicitly simulated and excluded from indexing.

## Department structure

| Department | Representative categories | Representative subcategories; use only when useful |
|---|---|---|
| Ingredients | Flour & mixes; sweeteners; leavening & essentials; nuts & dry fruit | Cake mixes; flour; sugar; raising agents; stabilisers |
| Chocolate | Baking chocolate; cocoa; chips & inclusions | Compound; couverture; cocoa powder; chips/callets |
| Colours & Flavours | Food colours; flavours & extracts | Gel/liquid/oil/powder/spray; essence/extract/emulsion |
| Fillings & Fondant | Fillings & glaze; fondant & modelling | Fruit/chocolate fillings; glaze; covering fondant; gum paste |
| Decorating | Sprinkles; edible décor; presentation décor | Keep edible and non-edible visibly distinct |
| Bakeware & Tools | Bakeware; measuring & mixing; piping & decorating tools | Pans/moulds; scales/measures; nozzles/bags; spatulas/scrapers |
| Packaging | Boxes; boards; liners/bags; containers; bake-and-serve | Shape/size/count may narrow within category, not create deep branches |
| Recipes | Cakes; cupcakes; cookies; desserts/other | Difficulty, time, occasion and technique are filters, not deep nav |

Canonical taxonomy details belong in `05_catalog_commerce/Catalog_Taxonomy.md`.

## Navigation model

- Desktop: one “Shop” disclosure may expose seven merchandise departments; Recipes remains a peer destination. No hover-only access.
- Mobile: drawer with one expanded branch at a time, explicit close control, focus containment/return and background inertness.
- Breadcrumbs: Home → department → category → optional subcategory → product; recipe breadcrumbs use Home → Recipes → recipe.
- Brand routes are optional secondary landing pages only if enough products exist; otherwise brand is a filter.
- Footer contains service/legal destinations and repeats core shop/recipe paths without creating alternate taxonomy.

## Accessibility contract

- One descriptive H1 per page; headings never skip levels for styling.
- Landmarks: header/banner, nav labels, main, complementary only when meaningful, footer/contentinfo.
- Skip link targets main content; route changes move focus to a page-start target and announce the new title.
- Navigation disclosures expose expanded state and are operable by keyboard/touch with a 44×44 CSS-pixel target goal.
- At 320 CSS px, content reflows without two-dimensional scrolling except genuine data tables; no information depends on colour, hover or animation.

## Assumptions and gates

- Category labels need later usability testing; this phase confirms structural coverage, not user comprehension.
- Exact merchandising collections and brand landing thresholds are catalog-production decisions.
- Phase 3 may change presentation but may not silently deepen taxonomy or remove required states.
