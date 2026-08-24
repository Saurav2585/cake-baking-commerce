# PLP and Search UX Specification

**Phase:** 3 — UX Definition
**Status:** Specialist draft for integration
**Architecture authority:** `05_catalog_commerce/Search_Filter_Sort_Spec.md`

## Scope

This document specifies interaction hierarchy and responsive behaviour for Shop All, department/category product-listing pages and submitted search results. It does not change query normalisation, ranking, facet eligibility, URL keys, sort rules or pagination contracts defined in Phase 2B.

## Shared page hierarchy

1. Breadcrumbs where the route has catalog ancestry.
2. H1: Shop All, department/category label, or Search results.
3. Optional short factual context; never promotional clutter before controls.
4. Search-query summary where applicable.
5. Exact result count and active-state summary.
6. Filter and sort controls.
7. Applied-filter chips and clear actions.
8. Result grid/list.
9. Deterministic pagination or accessible Load more.
10. Recovery/help content only when relevant.

The result count, sort and filter access remain above the first result on every viewport. Search results preserve and visibly quote the submitted query without treating it as trusted markup.

## Product-card decision contract

Each card provides, in a stable reading order:

- fictional product brand as secondary metadata;
- factual product title linked to canonical parent PDP;
- relevant pack quantity, count or dimension;
- selected/default variant context where valid;
- demo INR price and meaningful comparable unit price;
- explicit demo availability state;
- wishlist toggle with current state;
- **Add** only when exactly one unambiguous available sellable variant is eligible;
- otherwise **Select options**, navigating to PDP without choosing silently.

Unavailable products remain distinguishable and cannot be added. Images support recognition but do not carry the only product name, variant or availability information. No rating, review, bestseller, certification, discount, dietary or suitability badge appears without separately approved evidence.

## Desktop PLP behaviour

Desktop may show persistent facets beside results when space permits. Each facet uses the native control appropriate to its data: checkboxes for multi-select OR values, radios only for exclusive choices, and labelled minimum/maximum inputs for price. Collapsible groups retain selected-value visibility when collapsed.

- A facet change commits immediately and updates URL, count and results as one state transition.
- The results region becomes busy while preserving its accessible name and prior footprint where feasible.
- Focus stays on the operated control; a polite region announces the committed count once.
- Selected values also appear as removable chips above results.
- Zero-count unselected values are disabled or omitted according to the architecture; selected zero-count values remain visible for removal.
- Irrelevant family-specific facets are absent, not disabled.

## Mobile filter behaviour

The **Filters, N applied** trigger opens a labelled modal drawer. Focus moves to its heading; background content is inert; Escape/Close dismisses and returns focus to the trigger.

Filter changes are staged:

- **Show N results** commits staged values, updates the URL, closes the drawer, returns focus to the trigger and announces the result count.
- **Cancel** discards staged changes and returns to the applied state.
- **Clear all** changes the staged facet/price selection but preserves the search query; the user still applies or cancels.
- Applied selections and expected count are available in text, not colour alone.
- A loading count cannot make Apply appear successful; controls expose busy/disabled semantics during resolution.

At 320 CSS px, labels, value counts and controls wrap without horizontal scrolling. The drawer’s close and apply actions remain reachable at zoom and with the on-screen keyboard.

## Sort behaviour

Sort is a clearly labelled native select or equivalent accessible single-choice control. Available options are supplied by Phase 2B: relevance only with a query; otherwise featured default; price directions; unit price only for compatible dimensions; name A–Z; newest only with factual dates.

Changing sort commits immediately, resets to page 1, preserves query/facets and does not move focus to the grid. A polite result update confirms the change and count. Popularity, rating, recommendation and discount sorts are prohibited without new approved evidence/rules.

## Applied state and URL recovery

- Every committed query/facet is visible in the page summary; every facet value has a removable chip whose name includes facet and value.
- **Clear all filters** preserves the query. **Clear search** is separate and leads to the appropriate unqueried catalog state.
- Refresh, Back, Forward and shared URLs restore query, committed filters, sort and page.
- Invalid URL parameters are ignored safely and produce one non-blocking notice; they do not broaden into unsupported filters.
- Returning from PDP restores prior list state and scroll/focus position when feasible. If exact focus restoration fails, focus the results heading without losing state.

## Search-specific interaction

The page search field retains the submitted raw query for editing. Submitting commits one search navigation; blank submission leads to Shop All. Results may contain products and recipes only according to the approved index/ranking; destination type is explicit.

Relevance is deterministic and cannot imply popularity. A normalised alias or spelling-tolerant match may be explained in plain language only when the system can state the transformation accurately. Never fabricate “Did you mean”.

## Pagination / Load more

Use one approved deterministic method consistently:

- **Numbered pagination:** links preserve URL state, current page uses `aria-current`, and route focus moves to result-summary start.
- **Load more:** control states how many more where known; appended results follow existing items; focus remains on the trigger or moves to the first new item only by an explicit documented pattern; announce number added and new total; maintain recoverable page URL.

Infinite scroll without an operable pagination alternative is not permitted.

## State and recovery specification

| State | Content behaviour | Actions/focus/status |
|---|---|---|
| Initial load | Heading/control structure and stable result placeholders | Results `aria-busy`; avoid repetitive live announcements |
| Successful results | Exact count, committed state and cards | Announce count once after committed changes |
| Filtered zero | Retain query, chips and controls | Remove individual chip, Clear all, then broader category/Shop paths; no silent relaxation |
| Search zero | State query and active filters without blame | Chips/Clear filters, deterministic spelling help, departments/categories, Shop All and Recipes |
| Partial card data | Render valid factual fields; neutral media fallback | PDP link remains if publishable; no inferred fallback claims |
| Result request error | Preserve controls and last safe results when possible | Explain freshness; scoped Retry; focus error summary only when action is blocked |
| Pagination/load error | Existing results remain | Retry adjacent to failure; no duplicate append |
| Invalid parameter | Ignore invalid value, preserve valid state | One polite notice and visible canonical applied state |
| Unavailable item | Card remains factual and clearly unavailable | PDP/options path; Add disabled/absent with textual reason |
| Add/wishlist mutation | Card exposes pending state without layout loss | Success/error announced once; failure preserves prior state and focus |

## Accessibility acceptance criteria

- Results heading/region has a stable accessible name and busy state.
- All facets, chips, sort, pagination and card actions work by keyboard with visible focus.
- Repeated card controls include product/variant context in accessible names.
- Status messages are concise and polite; blocking errors use an alert/error summary linked to recovery.
- No result update moves focus merely because content changed.
- Selected, disabled, unavailable and error states do not rely on colour alone.
- Touch targets aim for 44×44 CSS px; the experience reflows at 320 CSS px and 400% zoom.
- Reduced motion removes list/drawer transitions without delaying state, focus or announcements.

## Validation scenarios

1. Desktop filter commit preserves focus and announces one updated count.
2. Mobile Cancel leaves applied results/URL unchanged; Apply commits staged controls together.
3. Clear filters preserves a submitted query; Clear search is distinct.
4. Refresh/back/share restore committed state exactly.
5. An ambiguous multi-variant card cannot add a system-chosen SKU.
6. Unit-price sorting is absent when result dimensions are incompatible.
7. Zero results retain constraints and never insert promoted or substituted items.
8. Keyboard users can search, filter, sort, paginate, wishlist and reach PDP/cart.
9. Missing critical facts never become positive labels or facets.
10. Mobile and desktop expose equivalent information, destinations and recovery.

## Deferred

Grid styling, breakpoint values, card visual treatment, final microcopy, animation and implementation are deferred. Any later design must preserve these behaviours and the Phase 2B search contract.
