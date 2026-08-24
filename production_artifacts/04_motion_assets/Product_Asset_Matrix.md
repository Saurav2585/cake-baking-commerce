# Product Asset Matrix

**Phase:** 4B — representative production blueprint
**Resolution notation:** pixels at delivery master; engineering may derive smaller responsive sources without upscaling

## Common contract

- Primary PLP/PDP packshot master: 2400×2400 (1:1), with 1800×1350 (4:3) gallery derivative where composition benefits.
- Editorial master: 2400×1600 (3:2); mobile art-directed crop: 1200×1500 (4:5) only when the master focal point is insufficient.
- Product content/crop owner: Visual Asset Generation + Catalog factual reviewer. Alt-text owner: Catalog/Content drafts factual wording, UX determines informative/decorative context, Accessibility approves, Engineering binds.
- Each derivative is a manifested child with crop rectangle/focal point, dimensions, format, checksum and parent asset ID. No upscaling or silent generative outpainting.

## Representative coverage

| Category / representative | Required views | Required placements/crops | Master resolution/aspect | Mobile variant | Alt/factual emphasis |
|---|---|---|---|---|---|
| Flour or dry ingredient — cake flour pouch | Front or three-quarter pack; back/side factual panel if approved; ingredient macro; three-size family comparison | PLP 1:1; PDP 1:1 + 4:3; recipe mapping 1:1; pack study 3:2 | 2400² pack/macro; 2400×1600 family | 4:5 family crop retaining all packs/scale | Product/form/selected weight; macro decorative if redundant; no purity/nutrition claim |
| Couverture/chocolate — callets pouch/block | Front pack; callet/form close-up; size comparison; optional unwrapped form only if truthful | PLP/PDP 1:1; gallery 4:3; Ingredient Theatre 3:2 | 2400²; 2400×1600 editorial | 4:5 detail crop retaining confirmed form | State compound/couverture only from data; no cocoa %, origin, tempering or quality inference |
| Gel colour or flavour — bottle | Front/three-quarter bottle; cap/nozzle/form view; labelled swatch/variant array | PLP/PDP 1:1; selector thumbnail 1:1; gallery 4:3 | 2400² with safe label area | 4:5 variant array; no colour-only labels | Name form and written colour/flavour; swatch illustrative; compatibility only if explicit |
| Filling/fondant — tub or pouch | Front pack; confirmed texture/fold; weight comparison; selected variant | PLP/PDP 1:1; gallery 4:3; recipe relation 1:1 | 2400²; 2400×1600 detail | 4:5 texture crop paired with pack | No taste, stretch, coverage, result, allergen, or freshness implication |
| Decorating item — sprinkles or piping tips | Full contents/count; package front; scale/detail; edible/non-edible clarification | PLP/PDP 1:1; cart 1:1; gallery 4:3 | 2400² | 1:1 responsive source usually sufficient; 4:5 only for long sets | Name count/form and edible status from data; no pieces hidden or added |
| Bakeware/tool — adjustable pan or spatula | Full silhouette; top/side; dimension diagram; included-parts view | PLP 1:1; PDP 4:3 + 1:1; guide 3:2 | 2400² and 2400×1800 | 4:5 for long vertical tool only with full silhouette | Dimensions/material/piece count if confirmed; no food-contact/heat/performance claim |
| Packaging item — cake box/board | Flat and assembled views; count; dimensions; empty-use context | PLP/PDP 1:1; assembly 4:3; recipe packing editorial 3:2 | 2400²; 2400×1800 | 4:5 assembled crop; preserve empty status | Explicit empty product/count/dimensions; pictured cake/props must be labelled not included or omitted |
| Recipe editorial — representative cake method | Finished editorial hero; measured ingredients; one key process; neutral tools | Listing 4:3; detail 3:2; homepage 3:2; social crop separately | 2400×1800 and 2400×1600 | 1200×1500 art-directed process/hero | Describe dish or necessary action; recipe text owns method; no product-result promise |

## Supporting system assets

| System asset | Required forms | Notes |
|---|---|---|
| Department atlas | Seven merchandise visuals plus Recipes editorial tile | Consistent family, non-repeating subject, labelled in HTML; 3:2 and 1:1 crops |
| Product fallback | Ingredient pack, bottle/jar, tool, bakeware, packaging neutral glyphs | CSS/SVG preferred; empty alt when visible product text identifies item |
| Recipe fallback | Neutral measured-grid/process glyph | Cannot imply finished outcome |
| Fictional brand mark | SVG monochrome master plus approved pack-scale version | Secondary to product name; never presented as seller/certification |
| OG template | Home, department, product, recipe route classes | Avoid transient price/availability and unsupported claims; 1200×630 |

## Variant rules

- Parent products use a shared visual family, but every visually different sellable SKU maps to the correct media and label export.
- Pack size/count/dimension remains textual. Product cards may use one representative image only with an explicit pack basis.
- Colour variants require written labels and, where appearance matters, variant-owned imagery. Swatches alone are insufficient.
- Media failures preserve identity, price, variant, availability, critical facts and actions.

## Acceptance sampling

The Phase 5 pilot must verify at minimum one complete three-SKU packaging family across PLP, PDP, recipe mapping and cart crops; one long tool/packaging silhouette; one ingredient macro; one recipe hero/process image; 320px and 200% zoom; image-disabled/failure states; and manifest linkage for every master and derivative.
