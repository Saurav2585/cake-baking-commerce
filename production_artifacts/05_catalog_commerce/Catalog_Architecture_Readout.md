# Catalog Architecture Readout

**Phase:** 2B — Catalog, Commerce and IA Architecture  
**Status:** Review ready  
**Brand:** Pantryform — prototype direction only; formal legal clearance pending

## Outcome

Phase 2B defines one provider-neutral structural system for Pantryform’s 24–30-product demo: a controlled middle-depth taxonomy, family-specific product schemas, variant-owned commerce, deterministic recipe mapping, accessible discovery, simulation-safe checkout, clean routes/metadata, privacy-limited analytics and complete loading/failure states.

## Binding architecture

- Eight departments remain exactly as approved in D-015; brands are secondary metadata, never sellers.
- Customer browse depth stops at department/category/optional subcategory; product family selects schema and facets without adding required navigation depth.
- Parent products own shared identity/content; sellable variants own SKU, INR price, demo availability, variant axes and variant image.
- Critical ingredient, allergen and storage fields use `known`, `information_not_provided` or `not_applicable`; no optimistic inference (D-017).
- Recipe mapping defaults to the smallest sufficient compatible pack combination with stable tie-breaks, visible required/purchased/leftover quantities and explicit override (D-016).
- Cart merges by SKU, retains recipe attribution, reconciles price/availability and blocks unresolved stale states before checkout.
- Checkout uses fixed fictional sample choices, collects/persists no personal or payment data, creates no order and emits only `simulated_purchase_complete`.
- Future providers are narrow adapters around stable domain contracts; no provider is selected and no live commerce behavior leaks into v1.

## Deliverable map

| Concern | Authority |
|---|---|
| Departments, categories, families, relationships | `Catalog_Taxonomy.md` |
| Parent/variant fields, units, tri-state facts, validation | `Product_and_Variant_Data_Model.md` |
| Recipe, ingredients, mappings, substitutions and tools | `Recipe_Data_Model.md` |
| Scaling, pack solver, overrides, repeat adds and staleness | `Recipe_to_Cart_Rules.md` |
| Query normalization, facets, sort and accessible results | `Search_Filter_Sort_Spec.md` |
| Provider seams and commerce state ownership | `Commerce_Architecture.md` |
| Cart transitions and safe simulated checkout | `Cart_and_Checkout_Simulation.md` |
| Routes, canonical/index policy and JSON-LD boundaries | `URL_SEO_and_Structured_Data.md` |
| Simulation-safe, non-PII event schema | `Analytics_Event_Model.md` |
| Loading, empty, invalid, unavailable and error recovery | `Loading_Empty_Error_States.md` |
| Frontend projections, results and provider ports | `Frontend_Contracts.md` |

The companion `03_ux/` artifacts own sitemap, flows and page/state coverage without defining layout.

## PM reconciliation decisions

1. Availability is one enum everywhere: `available`, `low_demo_stock`, `unavailable`, `discontinued`.
2. Confirmation canonical route is `/order-confirmation/{demo-reference}` and is session-only/noindex.
3. A failed durable adapter does not produce false success. The user may explicitly continue with a disclosed session-memory adapter; reconciliation must still pass.
4. Shipping and tax display **“Not calculated in this demo”**, never ₹0.
5. Recipe batch mutation is atomic after unresolved rows are explicitly omitted; replay of an `addition_id` is idempotent.
6. Portfolio/preview environments default to `noindex,nofollow`; Product `Offer` structured data is prohibited for simulated price/availability.
7. Centralized status ownership must prevent duplicate screen-reader announcements across domain, component and route layers.

## Acceptance evidence

- [x] All eight departments and every required product family are covered.
- [x] Taxonomy is bounded to three optional browse levels and prevents duplicate pack-size products.
- [x] Typed variant axes and publication rules block title/variant/net-quantity contradictions.
- [x] Exact normalization exists for g, kg, ml, L, mm, cm, inch and count.
- [x] Explicit unknown critical data is represented and rendered per D-017.
- [x] Recipe-to-cart rules include deterministic scaling, finite pack selection, tie-breaks, overrides, substitutions, unavailable/stale states, merge and repeat-add behavior.
- [x] Search/filter/sort behavior is deterministic, URL-restorable, family-specific and accessible.
- [x] Cart/checkout cannot be mistaken for a live transaction and persist no personal/payment data.
- [x] Product/Recipe structured data cannot add simulated offers or unsupported claims.
- [x] Required analytics events are defined; `purchase` is forbidden and simulated value is not revenue.
- [x] All critical routes, flows, loading/empty/error states and accessibility contracts are inventoried.
- [x] Future provider boundaries are explicit and deliberately narrow.
- [x] No wireframes, visual UI, generated assets, motion implementation or application code were created.

## Assumptions and downstream validation

- Linear recipe scaling, explicit cross-unit conversions and optional mixed-size pack fulfillment require representative fixture tests.
- Exact category labels and filter comprehension remain primary-research/usability questions.
- Curated rank must remain explicit and must not become unsupported popularity language.
- Any indexable or live-commerce deployment requires a separate legal, privacy, catalog and commerce release decision.
- Pantryform remains a portfolio/demo prototype name; formal commercial clearance is unresolved.

## Gate

Phase 3 UX Definition is not authorized by this handoff. It may begin only after external Phase 2B approval and explicit authorization.
