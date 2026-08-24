# Packaging and Label System

**Phase:** 4B — blueprint only
**Applies to:** fictional demo products across seven merchandise departments

## Architecture

Packaging uses a retailer-led multi-brand model without implying that Pantryform manufactures, certifies, endorses, or sells on behalf of marketplace sellers.

1. Fictional product-brand mark: primary pack brand, still visually subordinate to factual product identity.
2. Factual product name: largest informational label element.
3. Variant/form and net quantity/count/dimensions: immediately scannable and never colour-only.
4. Pantryform: may appear only as a quiet demo catalog context such as “Presented in the Pantryform portfolio demo,” not an endorsement seal, maker mark, or legal manufacturer.

No label may invent manufacturer address, FSSAI/licence number, barcode, MRP, batch, dates, certification, origin, nutrition, allergen absence, dietary claim, food-contact claim, usage performance, or statutory compliance. If a review composition needs a back-panel region, use clearly labelled structural placeholders such as `[approved storage information]`, never plausible fabricated legal copy.

## Master label grid

Use a modular 12-unit vertical grid adaptable to pouch, jar, bottle, box, wrapper, tin/tool sleeve, and carton label shapes.

| Zone | Units | Content priority |
|---|---:|---|
| A — brand | 1–2 | Fictional product-brand wordmark; restrained |
| B — identity | 3–4 | Factual product name; maximum three display lines before alternate layout |
| C — variant | 2 | Form/flavour/colour/size; explicit text and optional swatch/pattern |
| D — quantity | 1–2 | Net weight/volume/count or dimensions using tabular numerals |
| E — guidance | 1–2 | Only approved factual handling/compatibility; otherwise omit |
| F — prototype/footer | 1 | Demo/prototype context and internal SKU on side/back, not a trust badge |

Maintain outer clear space of at least one grid unit; do not place essential text across seals, gussets, folds, caps, transparent-window edges, or high-curvature areas. Templates define safe, trim, and quiet zones.

## Typography and information behavior

- Use the approved Phase 4A font stacks and semantic roles. Product identity uses a sturdy display/heading weight; facts use body/label roles; quantities and dimensions use tabular numeric settings.
- Minimum rendered physical sizes require print/prototype testing; do not assume screen pixels translate to packaging. Thumbnail tests at 160px and 96px wide must preserve product name family, primary variant, and quantity as visible UI-adjacent text even if pack copy is unreadable.
- Long product names switch to a wide identity zone, smaller approved heading step, or back/side continuation; never condense, distort, abbreviate ambiguously, or cover with imagery.
- Product and variant names wrap by meaning. Keep value with unit and dimension groups together where possible.

## Seven-department framework

Department coding is a secondary orientation layer using colour plus a department word and simple material/form motif. It never replaces taxonomy text.

| Merchandise department | Structural cue | Permitted visual material | Truthfulness guardrail |
|---|---|---|---|
| Ingredients | Measured ruled band / scoop-scale motif | restrained grain, powder, nut or seed texture confirmed by product | Do not imply purity, organic origin, nutrition, dietary safety, or ingredient absence |
| Chocolate | Segmented measure blocks / callet rhythm | confirmed compound, couverture, cocoa, chips/callet form | Do not imply cocoa percentage, tempering performance, origin, or premium quality without data |
| Colours & Flavours | Calibrated droplet/measure marks | confirmed gel/liquid/powder/oil form and labelled colour/flavour | Swatch is illustrative; text names variant; no edible/application compatibility inference |
| Fillings & Fondant | Fold/layer measure | confirmed filling, glaze, rolled fondant, gum paste or icing texture | No result, taste, stretch, coverage, or allergen claim inferred from image |
| Decorating | Ordered dot/line placement grid | confirmed edible décor, tool, or presentation material | Edible/non-edible status must be textual and unambiguous |
| Bakeware & Tools | Dimension-line/frame motif | truthful silhouette and confirmed measurements/material | No oven/food-contact/temperature-safety claim unless explicitly approved |
| Packaging | Fold/assembly diagram motif | truthful flat/assembled form and count | Empty packaging must not appear to include food/accessories; no food-contact or load claim inferred |

Recipes are editorial and do not receive sellable packaging; their imagery follows the recipe asset system.

## Colour differentiation

- Base every label on approved warm/light and ink tokens. Department accents may use the Phase 4A palette and derived tested values.
- Variant differentiation combines written variant name, position/order, motif or swatch shape, and SKU. Never use hue alone.
- Ensure text/background and necessary boundaries meet `Colour_System.md`. Packaging art viewed in UI cannot carry essential UI text; HTML product facts remain authoritative.
- Unavailable, warning, or certification-like marks are not printed into static pack art. UI state overlays must remain separate and semantic.

## Front, side, and back

**Front:** fictional product brand, factual product name, explicit variant/form, quantity/count/dimensions, restrained confirmed product depiction.
**Side:** internal SKU, variant axes, confirmed handling/compatibility only, prototype marker where needed.
**Back:** only approved catalog facts. Ingredients, allergens, and storage use approved values or the explicit phrase **Information not provided** in the ecommerce content layer; do not fabricate a regulatory label to make a mock pack look real.

## Pack sizes and SKU ownership

- Parent products share grid, mark, product identity, and material direction. Each sellable SKU owns the visible size/count/dimension, variant code, and matching pack geometry/media.
- Three or more sizes use the same camera and scale reference; never resize renders to equal apparent height without an explicit scale cue.
- Multi-pack images state count. A set image cannot represent a single unit. Variant art changes atomically with selected SKU on PDP.
- A label master contains keyed fields rather than flattened manual duplicates; every export maps to stable parent product and variant/SKU IDs.

## Prototype, accessibility, and approval checks

- “Portfolio demo” context must be visible wherever the mock pack could be mistaken for a real offer; do not use language suggesting trademark, registration, regulatory approval, distribution, or commercial availability.
- Product identity and required facts must remain available as HTML text and with images disabled. Alt text identifies product/form/variant only when visually informative and factually confirmed.
- Review at full pack, 320px PDP, 160px PLP, 96px compact cart, grayscale, common colour-vision simulations, and image-failure fallback.
- Approval requires catalog factual review, brand/originality review, competitor-trade-dress check, accessibility/content review, manifest completeness, and exact-SKU export validation.
