# Competitor Pattern Matrix

**Comparison date:** 2026-08-24. Every row uses the same evaluation frame. References are evidence, not design templates.

| Area | BakIndia | Bakerykart | Original requirement / implication | Evidence |
|---|---|---|---|---|
| Retail model | Retailer-style catalog; no seller choice observed | Marketplace language and seller identity are prominent | Omit seller marketplace mechanics because the approved model is a curated retailer | E-001, E-009, E-010 |
| Primary navigation | Core ingredients/chocolate/colours visible; several major departments under More | Very broad department list plus Brands/Sellers | Use 7–8 task-based departments; brands remain a secondary filter/path | E-001, E-009, E-030 |
| Search | Search field visible | Search field visible | Index product, category, recipe, brand, synonym and pack tokens; specify autosuggest/no-results later | E-003, E-009 |
| Homepage discovery | Category shortcuts and repeated product rails | Category, product, brand and recipe modules | Balance shopping entry points with one useful recipe path; avoid popularity claims | E-002, E-010 |
| PLP | Sort, wishlist/direct actions; pack data embedded in titles | Rich category-specific facets in indexed pages | Use result count, selected-filter chips, clear-all, deterministic sort and family-specific facets | E-005, E-006, E-013–E-015 |
| Product cards | Product title, INR price, sale treatment, quantity/direct actions | Seller, size/colour, INR price | Show product, pack/variant, INR price/unit price, stock, wishlist; direct add only for an unambiguous default | E-002, E-010, E-026 |
| Pack variants | Many weights appear as separate products | PDP selectors consolidate size/colour | Use product families with variant-level SKU, price, stock and image; validate title/variant agreement | E-006, E-016, E-021 |
| PDP decision support | Concise purchase block, non-return marker, ingredients section | Structured tabs, seller/brand, delivery check, ingredients, shelf life, origin, use/care, related content | Put critical fit/handling facts near purchase block and progressive detail below | E-007, E-016–E-019 |
| Wishlist/cart | Wishlist/direct actions and cart-state strings observed in markup | Wishlist, cart/checkout link and quantity selection | Accessible status announcements, inline errors and focus management are binding requirements | E-005, E-016, E-028 |
| Recipes/content | Blog observed; recipe linkage not found in sampled surface | Recipe hub/detail and PDP-related recipes | Recipes are a first-class department with structured ingredients/tools and explicit purchasable mapping | E-020 |
| Recipe-to-cart | Not observed | Not observed on sampled live recipe | Differentiate with a reviewable ingredient-to-SKU flow; never add optional tools/items silently | E-020, E-029 |
| Trust/delivery | Contact/store details and promotional assurances | Detailed delivery, seller fulfilment and returns policies | Use concise, verifiable demo disclosures; never transfer competitor promises or assurance language | E-003, E-018, E-019 |
| Desktop accessibility signals | Search label via placeholder; some input controls unnamed | Better field placeholders; some submit controls generic | Specify semantic names, logical headings, skip link, visible focus and native elements | E-003, E-007, E-016, E-028 |
| Mobile | No horizontal overflow at 390px; repeated 22–30px controls and hidden navigation state | No horizontal overflow at 390px; 24×20px banner controls and hidden first-state primary nav | Mobile drawer needs robust disclosure semantics; primary actions target 44×44px where practical | E-004, E-011, E-028 |

## Useful tensions to preserve

- **Breadth versus findability:** BakIndia hides major departments; Bakerykart exposes too many. A middle-depth IA is recommended.
- **Separate products versus variants:** separate URLs improve direct discovery, but consolidated variants reduce duplicate listings. Preserve variant-level indexable data without duplicate PLP cards.
- **Concise versus comprehensive PDP:** critical selection facts should be immediately visible; deep specification and handling information can use progressive disclosure.
- **Direct add versus safe selection:** use direct add only when a fixed SKU/default variant is safe; otherwise use “Select options.”

## What must not transfer

Brand identity, page composition, photographs, product descriptions, reviews, ratings, popularity assertions, certifications, dietary/quality statements, seller claims, delivery promises and distinctive interaction styling.
