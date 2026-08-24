# Asset Production Strategy

**Phase:** 4B — Motion system and asset production blueprint
**Status:** Reconciled Phase 4B recommendation
**Boundary:** Planning only; no production assets are generated in Phase 4B

## Objective

Build a traceable, scalable asset system that carries The Measured Pantry direction into a 24–30-product demo without sacrificing product truth, accessibility, responsive fit, or retailer-led architecture. Ingredient Theatre supplies controlled sensory detail; Working Pantry keeps packs, dimensions, variants, and actions legible.

## Asset families and production method

| Family | Primary method | Required input | Phase 5 output boundary | Key control |
|---|---|---|---|---|
| Retailer logo and wordmark | Manually designed vector | Approved prototype name/descriptor and type system | Master horizontal/stacked/monochrome SVG; raster exports only as needed | Pantryform remains prototype-only; no trademark-availability implication |
| Department imagery | Generated or commissioned/source photography, art-directed | Department brief and factual subject list | One approved hero/atlas crop family per merchandise department; Recipes editorial separately | No department meaning by image/colour alone |
| Ingredient macro imagery | Generated or licensed/source photography | Confirmed form, colour, texture, edible status | Select sensory details, not one for every SKU | Cannot imply purity, freshness, origin, dietary status, or performance |
| Product packshots | 3D/manual compositing or generated with manual label correction | Approved product/variant records and label system | Front/three-quarter plus required alternates by matrix | Pack count, scale, form, contents and variant must be truthful |
| Fictional product-brand marks | Manually designed vector/systematic wordmarks | Approved fictional brand records | Small, subordinate mark set sufficient for demo ranges | Not sellers, endorsements, certifications, or retailer-owned unless modelled |
| Packaging and label systems | Manual vector/layout templates | Product facts, pack geometry, variant axes | Reusable masters plus the approved pilot family before bulk use | No invented statutory, certification, dietary, manufacturer or origin facts |
| Recipe imagery | Generated, commissioned, or licensed/source photography | Approved recipe, method, yield and food styling brief | Hero plus selected method crops | Outcome is editorial, not proof of product performance |
| Icons | CSS/SVG-created | Approved icon construction and semantics | Small coherent interface set | Decorative vs informative usage and accessible names defined |
| Illustrations | Manual vector or generated then redrawn/QA’d | Explicit UX purpose | Only justified guidance/empty-state pieces | No badges, experts, mascots, or claim-bearing symbolism |
| Decorative textures | Generated, photographed, or CSS/SVG-created | Palette/material brief | Lightweight tiling/section textures | Decorative only; cannot impair contrast or encode state |
| Responsive crops | Manual/art-directed exports or media-service transforms | Approved master and focal-point/safe-zone metadata | 1:1, 4:3, 3:2 and narrow/mobile variants where required | Same subject and claim boundary; outpainting becomes a new manifested asset |
| Placeholders/fallbacks | CSS/SVG-created | Product/department semantic category | Neutral pack, tool, ingredient and editorial fallbacks | Never invents missing product appearance or removes facts/actions |
| OG/social imagery | Manual templates with generated/approved imagery | Approved page title, image, demo/prototype context | Route-class templates and representative exports | No pricing/availability/claim that can become stale or misleading |
| Favicons/app icons | Manually designed vector | Approved retailer symbol | SVG/PNG/ICO sizes | Prototype identity only; distinct at small size |

## Production pipeline

1. **Brief:** bind an asset request to stable product/recipe/department IDs, intended placements, facts it may depict, prohibited implications, aspect ratios, and approval owner.
2. **Source:** choose manual, CSS/SVG, generated, commissioned, or licensed/source photography. Record prompt/source/licence before editing.
3. **Create master:** work at sufficient resolution with crop-safe area. Generated packaging text is never accepted as final label typography; reconstruct it from the label master.
4. **Factual review:** compare visible form, amount/count, dimensions, included pieces, usage, recipe stage, and edible/non-edible status with approved data. Unknown facts remain unknown.
5. **Originality and rights review:** check competitor resemblance, real trade dress/logos, source licence, prompt/reference boundaries, and fictional-brand hierarchy.
6. **Responsive derivation:** create only needed crops/exports. Record parent/derivative links, focal point, crop rectangle, and transformations.
7. **Accessibility review:** decide informative/decorative context; catalog/content owns factual alt text, UX owns context, engineering binds the final value.
8. **Optimise:** emit fit-for-purpose AVIF/WebP/PNG/JPEG/SVG, strip sensitive metadata, preserve colour profile where needed, and record dimensions/bytes/checksum.
9. **Approve/publish:** no asset enters catalog seed data or UI until manifest status is approved for that exact version/placement.
10. **Replace/deprecate:** retain immutable history and replacement linkage; do not silently overwrite a manifested master.

## Naming and storage convention

`{entity-type}-{entity-id}-{role}-{view}-{aspect}-{version}.{ext}`

Examples: `product-prod_cocoa01-primary-front-1x1-v01.webp`, `recipe-recipe_brownie01-hero-overhead-3x2-v02.avif`. Filenames are delivery conveniences; the manifest asset ID is authoritative. Do not encode mutable marketing names, secrets, prompts, or personal names in public paths.

## Quality gates

- **Truth:** matches approved record; related props cannot appear included; no fake certification, rating, review, bestseller, health/dietary, origin, delivery, sustainability, expertise, or performance cue.
- **Hierarchy:** Pantryform leads the experience; fictional product brands remain secondary and never look like marketplace sellers.
- **Visual:** consistent light, crop, scale, warm-neutral surfaces, pack legibility, and controlled Ingredient Theatre texture.
- **Technical:** correct dimensions/aspect, no unintended alpha/colour shift, delivery weight within later engineering budget, stable intrinsic size, checksum recorded.
- **Accessible:** product information works with images disabled; alt/fallback decision recorded; image text is never the only source of facts.
- **Provenance:** source/generation method, creator, date, rights/licence, prompt/reference where applicable, transformations, version, approval and replacement history complete.

## Ownership and gates

Catalog owns factual source data; Brand/UI owns visual consistency; Visual Asset Generation owns creation and manifest entry; Accessibility/Content reviews alt and misleading cues; QA verifies exports and placements; PM approves pilot expansion. Phase 5 begins with the bounded pilot in `Asset_Pilot_Brief.md`; bulk generation is blocked until the pilot passes.

## Explicit exclusions

No production asset generation, full catalog packaging, real-brand recreation, competitor copying, stock purchase, commercial identity clearance, production application integration, animation rendering, or bulk export is authorized here.
