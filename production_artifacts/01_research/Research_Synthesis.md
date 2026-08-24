# Phase 1 Research Synthesis

## Executive finding

The opportunity is not a larger catalog. It is a clearer decision system for a broad baking assortment: task-based navigation, family-specific attributes, consolidated variants, transparent handling information and a recipe-to-cart review step. This direction is original and avoids the reference sites’ extremes of hidden breadth, marketplace overload and inconsistent generic variants.

## Findings

### F1 — Middle-depth navigation is the strongest fit

BakIndia hides meaningful departments behind More, while Bakerykart exposes departments, brands and sellers at once. The approved curated-retailer model does not need seller navigation.  
**Recommendation:** adopt the eight departments in `Catalog_Terminology_and_Attributes.md`, with brands as a secondary filter/landing route.  
**Evidence:** E-001, E-009, E-012, E-030. **Confidence:** High.

### F2 — Product families need their own decision fields

Chocolate cocoa/fluidity, colour medium, packaging dimensions and bakeware materials are not interchangeable “size/color” attributes. Generic schemas created visible conflicts.  
**Recommendation:** universal identity/commerce fields plus family-specific attributes and validation.  
**Evidence:** E-013–E-017, E-021–E-026. **Confidence:** High.

### F3 — Pack sizes should be consolidated variants

Separate pack-size listings clutter comparison; generic selectors can hide inconsistencies.  
**Recommendation:** parent product + indexable variant SKUs, with variant-level INR price, availability, unit price and image.  
**Evidence:** E-006, E-016, E-021, E-026. **Confidence:** High.

### F4 — Purchase confidence requires verified facts, not assurance copy

Both references use trust, quality, popularity or delivery language that cannot be transferred. Structured ingredients, storage, handling, price/stock and concise delivery/return summaries are more defensible.  
**Recommendation:** disclose simulated commerce; use verified operational/product statements only; preserve `not_provided` states.  
**Evidence:** E-003, E-016–E-019, E-024–E-025. **Confidence:** High.

### F5 — Recipe-to-cart is a defensible differentiator

Bakerykart provides structured recipes but no add-to-cart mapping was observed; BakIndia recipe linkage was not observed in the sample.  
**Recommendation:** servings scaler → pantry/optional selection → ingredient/SKU mapping → required vs purchased/leftover → substitution/unavailable handling → explicit “Add selected ingredients.”  
**Evidence:** E-020, E-026, E-029. **Confidence:** High for workflow logic; user desirability remains a hypothesis.

### F6 — Mobile reflow alone is insufficient

Both homepages avoided horizontal overflow at 390×844, but observed small and unnamed controls create touch and assistive-technology risk.  
**Recommendation:** semantic native controls, unique names, visible focus, logical headings, status live regions, focus restoration, 320px reflow and 44×44px target goal.  
**Evidence:** E-004, E-007, E-011, E-028. **Confidence:** High for requirement; formal conformance untested.

## Binding requirements proposed for Phase 2

- IA: task-based eight-department model with one expanded mobile branch at a time.
- Discovery: normalized search, grouped suggestions, family-specific facets, selected chips, result count, clear-all and deterministic sorting.
- Cards: product/brand, pack or key dimension, INR price and unit price, stock, wishlist, conditional direct add/select-options behavior.
- PDP: critical variant/price/stock/handling near purchase; structured verified details below; delivery is explicitly simulated.
- Data: category-specific attributes and tri-state unknown handling; no unsupported claims.
- Recipe-to-cart: reviewable selection and quantity-to-pack mapping; no silent optional/tool additions.
- Accessibility: keyboard, accessible names, focus, errors/status, reflow, target size and reduced-motion constraints from the start.

## Risks and controls

- **Copying risk:** every later artifact must cite research requirement IDs, not reproduce reference compositions.
- **Data staleness:** competitor prices/examples are not seed prices; fictional demo values require independent plausibility review.
- **Pack mismatch:** schema validation blocks title/variant/net-quantity disagreements.
- **Recipe waste:** mapping exposes leftovers and lets users change pack/substitution.
- **Claims:** certifications, dietary status, food contact, temperature and suitability remain unknown unless verified.

## Open material choices for the Phase 1 gate

### O-1 — Department grouping

- **Option A (recommended):** eight departments, including separate Recipes and Decorating. Best task clarity; slightly wider desktop nav.
- **Option B:** merge Decorating into Fillings & Fondant and Recipes under content. Narrower nav; risks hiding key journeys.

### O-2 — Recipe pack-selection default

- **Option A (recommended):** smallest sufficient pack, with required/purchased/leftover visible. Predictable for primary audience; not always lowest unit cost.
- **Option B:** lowest unit-cost sufficient pack. Better bulk economics; may create excess spend/leftover for home bakers.

### O-3 — Verified unknown fields

- **Option A (recommended):** show “Information not provided” for critical ingredients/allergen/storage fields when unavailable. Honest but visually adds gaps.
- **Option B:** omit absent fields. Cleaner but can be misread as not applicable.

These are bounded Phase 2 inputs. Approval does not authorize brand strategy, architecture, wireframes or implementation.

## PM acceptance result

- [x] Same comparison framework used for both references.
- [x] Important claims trace to Evidence Log IDs and dated URLs.
- [x] Audience behavior remains explicitly hypothetical.
- [x] Original, usable taxonomy recommendation supplied.
- [x] Mobile, accessibility and purchase-confidence requirements explicit.
- [x] Recipe-to-cart and pack conflicts documented.
- [x] Unsupported claims and copied material absent.
- [x] Phase 2 choices bounded with consequences.

**PM verdict:** Phase 1 is complete and review ready; Phase 2 remains blocked on external approval.
