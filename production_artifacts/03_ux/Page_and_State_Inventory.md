# Page and State Inventory

Every page requires default, loading, empty/not-found where meaningful, unavailable/partial, error and responsive/accessibility handling. Exact component design is deferred.

| Surface | Primary content/actions | Required states |
|---|---|---|
| Home | Brand/value cue; department and recipe entry; curated products | loading; content fallback; no featured items; partial data; error |
| Shop All | All merchandise families; filters/sort | loading; results; zero results; filtered zero; partial cards; error |
| Department | Department intro, categories, products | loading; no products; unavailable collection; error |
| Category/PLP | Breadcrumb, count, facets, sort, products | loading/skeleton; filtered; zero; invalid filter; partial; pagination/load error |
| Search results | Query, grouped suggestions/results, filters | initial guidance; loading; results; zero; corrected/normalized query; error |
| PDP | Factual product data, variants, price, availability, add, recipes | loading; invalid slug; variant unselected; unavailable variant/product; partial critical data; `information_not_provided`; media error; add error |
| Recipe listing | Recipe cards and filters | loading; empty; filtered zero; partial; error |
| Recipe detail | Servings, ingredients/tools, method, related products | loading; invalid slug; missing optional media; unmapped ingredients; error |
| Recipe-to-cart review | Scaled requirements, SKU mapping, overrides, totals | calculating; all mapped; partial/unavailable; substitution; stale price; none selected; add partial/failure |
| Wishlist | Saved products and actions | loading local state; empty; stale/unavailable saved item; persistence error |
| Mini cart | Compact lines/subtotal/navigation | closed/open; empty; loading mutation; stale/unavailable; error; max-quantity |
| Cart | Lines, quantity, remove, subtotal, checkout entry | loading; empty; populated; stale price; unavailable item; invalid quantity; persistence error |
| Simulated checkout | Disclosure, safe demo details, summary, submit | initial; field error; submitting; cart changed; unavailable; failure; success redirect |
| Confirmation | Demo ID, summary, disclosure, continue | valid ephemeral state; expired/direct visit; partial summary; error |
| About | Original retailer/demo context | loading/content unavailable |
| Contact | Non-sending demo contact information or safe form boundary | idle; validation; simulated success/failure if form exists |
| FAQ | Factual help/disclosures | loading; no entries; search/accordion state; error |
| Shipping & Returns | Clearly simulated information | loading; content unavailable; no real promise |
| Privacy | Demo data/persistence statement | content unavailable |
| Terms | Portfolio/demo terms and limitations | content unavailable |
| 404 | Missing route explanation, search/shop paths | search idle/loading/zero/error |

## Overlay and component states

| Component | States/requirements |
|---|---|
| Header/navigation | desktop/mobile; drawer closed/open; branch collapsed/expanded; focus return |
| Search suggestions | closed; loading; grouped results; no suggestions; error; keyboard active descendant |
| Filter controls | inactive; selected; staged mobile; applied; invalid URL value; cleared |
| Product card | default; focus/hover equivalent; wishlisted; direct add/select options; unavailable; image fallback |
| Variant selector | available; selected; unavailable; invalid combination; status update |
| Quantity control | minimum; increment/decrement; manual error; maximum/demo limit |
| Toast/status | add/remove/save/error; non-essential dismissal; no sole reliance for persistent facts |
| Modal/drawer | opening/open/closing without state ownership; labelled; focus containment/return; reduced motion |

## Critical-data fallback rules

- Missing ingredients, allergens or storage: render “Information not provided” (D-017), never omit or infer.
- `not_applicable` is rendered only when the schema explicitly establishes it.
- Missing noncritical media uses a neutral fallback and meaningful or empty alt text according to purpose.
- Partial failures preserve safe, already-loaded content and isolate failed regions where possible.

## Responsive and accessibility baseline

- Inventory applies at desktop, tablet, mobile and 320 CSS px; no mobile-only loss of action/content.
- Semantic page titles, H1, breadcrumbs where relevant, named controls, visible focus and status announcements are required.
- Touch target goal is 44×44 CSS px; exceptions need spacing and QA evidence.
- Reduced motion removes nonessential transition but never removes content or status.

