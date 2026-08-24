# Route and Feature Inventory

**Status:** Approved Phase 3 route/state inventory translated for Phase 6 implementation

## Production routes

| Route | Surface | Required production behavior and states |
|---|---|---|
| `/` | Home | Disclosure; measured opening; eight-item department atlas; curated products; Ingredient Theatre; recipe bridge; loading/partial/no-featured/media-failure fallback. |
| `/shop` | Shop all | Exact result count; URL filters/sort; product grid; loading, filtered, zero, invalid-filter, partial and error states. |
| `/shop/ingredients` | Department | Ingredients categories and products; factual intro; loading/empty/unavailable/error. |
| `/shop/chocolate` | Department | Chocolate categories and products; same department state contract. |
| `/shop/colours-flavours` | Department | Colours & Flavours categories/products; same state contract. |
| `/shop/fillings-fondant` | Department | Fillings & Fondant categories/products; same state contract. |
| `/shop/decorating` | Department | Decorating categories/products; keep edible/non-edible distinctions factual. |
| `/shop/bakeware-tools` | Department | Bakeware & Tools categories/products. |
| `/shop/packaging` | Department | Packaging categories/products. |
| `/shop/[department]/[category]` | Category PLP | Canonical optional category/subcategory depth; breadcrumb, count, URL facets/sort and PLP states. Do not introduce product family as a navigation tier. |
| `/products/[product-slug]` | PDP | Breadcrumbs; variant-owned gallery/facts; quantity; wishlist/add; critical tri-state facts; related recipes only when explicitly mapped; invalid slug, unselected, unavailable, partial, media/add errors. |
| `/search?q=` | Search | Submitted-query results, grouped suggestions at entry, URL filters/sort; initial guidance, loading/results/zero/normalized/error. Blank submission redirects to `/shop`. |
| `/recipes` | Recipe listing | Canonical recipe cards and filters; loading/empty/filtered-zero/partial/error. |
| `/recipes/[recipe-slug]` | Recipe detail | Servings, ingredients/tools, method, image fallback, unmapped lines and explicit route to review; invalid/partial/error states. |
| `/recipes/[recipe-slug]/add-to-cart` | Recipe review | Scaled requirements, mappings, smallest-sufficient pack, overrides, include/omit/pantry-owned, totals and atomic add; calculating/all-mapped/partial/unavailable/substitution/stale/none-selected/failure states. |
| `/wishlist` | Wishlist | Local saved SKU identities; empty/loading/stale/unavailable/persistence-error; move/select options without losing variant context. |
| `/cart` | Cart | SKU lines, quantity/remove, provenance, stale price/unavailable reconciliation, subtotal and demo checkout entry; loading/empty/error/max-quantity. |
| `/checkout` | Simulated checkout | Fixed fictional profile, explicit demo acknowledgement, summary and submit; validation/submitting/cart-changed/unavailable/failure. No payment/PII. Excluded from indexing. |
| `/order-confirmation/[demo-reference]` | Simulated confirmation | Demo reference/summary/disclosure/recovery; valid ephemeral, expired/direct visit, partial and error. Excluded from indexing. |
| `/about` | Utility | Original retailer/demo context; content unavailable fallback. |
| `/contact` | Utility | Non-sending contact boundary or clearly simulated safe form; validation/simulated result if provided. |
| `/faq` | Utility | Factual help/disclosures; loading/empty/accordion/error. |
| `/shipping-returns` | Utility | Clearly simulated information; no real promise. |
| `/privacy` | Utility | Demo data and local persistence statement. |
| `/terms` | Utility | Portfolio/demo limitations. |
| `/404` / framework not-found | Recovery | Missing-route explanation with Search, Shop and relevant department recovery. |

## Global and overlay features

| Feature | Binding requirements |
|---|---|
| Header/shop disclosure | Core destinations always present; click/tap/keyboard, `aria-expanded`, Escape/dismissal, no hover dependency. |
| Mobile navigation drawer | Named modal, inert background, focus containment/return, visible Close, one expanded shop branch at a time, internal scroll. |
| Search suggestions | Products/Categories/Brands/Recipes, 2-character threshold, ≤5/group and ≤10 total, combobox/listbox keyboard contract, typed query always submittable. |
| Filter drawer | Staged edits; Apply commits URL/results; Cancel preserves; Clear explicit; count/close/action reachable with keyboard and keyboard-open viewport. |
| Mini cart | Open/empty/mutation/stale/unavailable/error/max states; focus-contained when modal; never the only path to cart; no forced-open requirement. |
| Product card | Default/focus/hover-equivalent/wishlisted/add-or-options/unavailable/image-failure; product+variant truth never inferred from artwork. |
| Variant selector | Native semantics; available/selected/unavailable/invalid states; atomic resolved SKU update and one announcement. |
| Quantity control | Direct labelled numeric input, increment/decrement, min/max/demo-limit and unit/pack context. |
| Status/toast | One persistent polite global owner; toast supplementary only; blocking failures use linked summary. |
| Dialog/drawer | Labelled, focus-contained, Escape/Close, deterministic return; animation never owns open state or focus. |

## Critical journeys to automate

1. Global navigation and responsive drawer to each department and Recipes.
2. Search suggestions, submitted query, URL filter/sort, zero results, clear and Back restoration.
3. PLP card → PDP → valid variant selection → correct media/price/availability → quantity → add.
4. Wishlist add/remove/persistence and stale/unavailable recovery.
5. Cart add/merge/update/remove, stale-price/unavailable reconciliation and empty recovery.
6. Recipe servings change → mapping recalculation → override/pantry-owned/include decisions → atomic recipe add → added/merged/skipped summary.
7. Cart → simulated checkout validation → fictional profile/acknowledgement → confirmation → expired/direct confirmation recovery.
8. Keyboard/focus/live-status path through search, variant selection, recipe review, cart errors and checkout errors.
9. Image-disabled/failed, canonical partial/unknown facts, reduced/none motion, 320px reflow and 200%/400% zoom.

## Explicit non-routes and deferred scope

Navigation drawer, filters, mini cart and dialogs are states, not indexable routes. Brand landing pages are optional only if canonical depth justifies them; otherwise Brand is a filter. V1 excludes accounts, authentication, payment, orders, live inventory, fulfilment, provider integrations, personalization, reviews and production contact submission.
