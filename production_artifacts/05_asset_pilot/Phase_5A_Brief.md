# Phase 5A Brief

**Phase:** 5A — Bounded Visual Asset and Packaging Pilot
**Status:** Reconciled recommendation; external review pending
**Authorization:** Phase 4B approval at `1de6c8aac8be54e4298cf333fe6a5db4d5f724cb`

## Scope and selections

- Parent: `prod_demo_baking_cocoa`, **Baking cocoa powder**, dry ingredient / cocoa family.
- Variants: `var_bcp_250g` / `ML-BCP-250`, `var_bcp_500g` / `ML-BCP-500`, and `var_bcp_1kg` / `ML-BCP-1000`.
- Fictional subordinate product brand: **Measureloom** (prototype direction only; formal clearance pending).
- Recipe proposal: `recipe_demo_cocoa_celebration_cake`, **Cocoa Celebration Cake**; the product relationship is illustrative and does not promise a result.
- Placements: homepage opening, Ingredients department, PLP, PDP, recipe listing/detail, recipe-to-supplies bridge, mobile equivalents, thumbnails and image failure.

No approved seed records contained a concrete three-weight product. Under the authorization’s bounded-data fallback, this pilot creates only the minimum proposed IDs and facts needed to test assets. Prices, claims, recipe quantities, regulatory details and commercial availability are deliberately absent.

## Outputs and acceptance

The pilot includes original image foundations, deterministic crops, editable SVG labels and packs, three proportional SKUs, recipe/department/PDP/PLP sets, fallback, contact sheets, a fail-closed manifest, isolated placements and QA. It passes when weight and SKU identity agree everywhere; unknown critical facts remain explicit; label text is manual; crops preserve meaning; assets remain understandable at 320 px/200% text and 160/96 px; and provenance/checksums validate.

## Exclusions and stop conditions

Excluded: bulk catalog generation, other departments, production application code, database, authentication, payment, deployment and commercial packaging compliance. Stop on factual conflict, distorted text, wrong ingredient form or scale, unsupported implication, real-brand resemblance, incomplete provenance, misleading crop or failed accessibility/manifest checks.

## Assumptions, not decisions

- The pack family uses an illustrative paper pouch geometry because approved records do not specify material or dimensions.
- Relative face area is a visual proxy for pack size, not a physical-dimension claim.
- Recipe imagery is editorial demonstration; culinary validation remains outside this pilot.
