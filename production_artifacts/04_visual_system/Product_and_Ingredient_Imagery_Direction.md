# Product and Ingredient Imagery Direction

**Phase:** 4A — Visual direction and design system
**Status:** Reconciled Phase 4A recommendation

## Role in the system

Imagery expresses Measured Joy through measured abundance: useful product clarity first, sensory ingredient detail second. Working Pantry keeps pack scale, labels, variants, and tools understandable. Ingredient Theatre supplies controlled texture and process moments but never replaces product facts or implies outcomes.

## Shot families

| Shot family | Purpose | Direction |
|---|---|---|
| Product pack | Identify the sellable parent/variant | Near-front or shallow three-quarter view; full silhouette; label area legible where fictional; honest scale cue; clean warm-neutral background |
| Variant set | Compare sizes/forms | Same camera, crop, lighting, and scale reference; order variants consistently; never make a smaller pack look larger |
| Ingredient detail | Show factual form/texture | Tight but recognisable crop of chips, powder, fondant, colour gel, filling, etc.; attach only where catalog data confirms form |
| Tool/bakeware | Clarify shape, dimensions, set count | Full product plus a restrained dimensional/context view; no misleading accessory inclusion |
| Packaging | Clarify assembled form and count | Flat and assembled views when useful; distinguish edible from non-edible items |
| Process editorial | Support recipe/Measured Joy storytelling | Hands measuring, folding, pouring, piping, or packing safely; no testimonial/persona claims; product facts remain adjacent |
| Recipe outcome | Orient to a recipe, not prove a product result | Label as recipe/editorial imagery; do not imply guaranteed performance from a pictured ingredient |

## Composition and surface

- Use warm canvas, pale stone, parchment, steel, wood, or measured-grid surfaces in a restrained, contemporary way. Avoid generic dark marble/gold luxury, pastel cupcake fantasy, busy marketplace collages, and competitor-derived compositions.
- Prefer directional soft light, natural texture, controlled shadow, and purposeful negative space. Avoid excessive gloss, fake steam, impossible splashes, over-saturation, and AI-perfect symmetry.
- Crops may be immersive in editorial modules; catalog imagery must keep the product silhouette and relevant distinctions in frame.
- Never put critical text directly over an uncontrolled image. Use a solid/scrim surface whose tested pair meets the colour system, or separate text structurally.

## Pack visibility and variant differentiation

- Product cards show one representative sellable variant only when its label states the pack basis. PDP media changes atomically with selected SKU when variant imagery exists.
- Preserve pack quantity/count/dimensions as text; imagery is supporting evidence, never the sole distinction.
- Variant imagery uses a consistent scale or an explicit scale cue. Do not digitally resize packs into equal apparent dimensions.
- If product packaging is fictional/generated, it must be clearly original, avoid certification/review/rating symbols, and not imitate reference-site or real-brand trade dress.
- Related props must not look included. Caption or omit them when ambiguity remains.

## Ingredient Theatre boundary

Ingredient texture may create an editorial focal point, department cue, or close-up alternate image. It must not:

- replace the primary pack/product view;
- imply purity, quality, freshness, origin, dietary safety, allergen absence, or certification;
- depict a different ingredient form/colour than the selected SKU;
- imply a guaranteed bake result, professional endorsement, or popularity;
- blur edible and non-edible decoration or unsafe food handling.

Facts—including Ingredients, Allergens, Storage, compatibility, dimensions, pack count, demo price and demo availability—remain textual. Unknown critical fields display **Information not provided** regardless of what the image appears to show.

## Crop and responsive rules

- Maintain a stable master with safe zones for 1:1 product cards, 4:3 product galleries, 3:2 editorial blocks, and narrow mobile crops. Do not use generative outpainting without recording it as a distinct generated asset.
- Use art direction only when the alternate crop conveys the same subject and claim boundary. Mobile crops preserve hands/tools/pack edges needed to understand the action.
- Define focal-point metadata; never rely on CSS centre-crop for long tools, packaging, or multi-pack comparisons.
- Reserve aspect-ratio space to limit layout shift. At 320px and 200% zoom, imagery may reduce or move after facts but cannot hide product identity/actions.

## Alt-text ownership

Catalog/content authors own the factual image description; asset generation records visual provenance, not final alt copy. UX determines whether an instance is informative or redundant. Engineering binds the approved alt or empty alternative.

| Context | Alternative-text rule |
|---|---|
| Primary product image | Concise identity plus visible variant/form when useful: “Fictional-brand dark compound chocolate, 500 g pack” |
| Repeated thumbnails of same product | Distinguish meaningful view (“back label view”) or use empty alt when the labelled control supplies the name |
| Ingredient-detail image | Describe visible factual form if it adds information; otherwise empty alt |
| Recipe/process image | Describe the step/action only when necessary to understand it; method text remains complete |
| Decorative texture/background | Empty alt; CSS background when appropriate |
| Error fallback | Product name remains in text; fallback image is decorative/empty unless it adds information |

Do not include “image of,” marketing claims, colour alone as a variant identifier, or facts not visibly and catalog-confirmed.

## Placeholder and failure behavior

- Loading reserves the final aspect ratio with a neutral, non-pulsing placeholder; reduced motion disables shimmer.
- Missing/failed product media uses an original neutral pack/ingredient-category glyph plus visible product name. It does not invent a product rendering.
- Failed editorial media collapses only when no information/layout dependency is lost; otherwise show a quiet fallback and retain heading/copy/actions.
- Image failure never removes Add/Select options, price, variant, warnings, critical facts, or status.
- Do not fetch competitor/third-party imagery as a silent fallback.

## Prohibited misleading imagery

- Competitor packs, logos, trade dress, copied photography, unlicensed assets, or near-reproductions.
- Fake certification seals, review stars, “best seller” ribbons, scarcity markers, expert coats/badges, origin flags, health/dietary cues, or sustainability symbolism without approved evidence.
- Unreal quantities, impossible tool scale, a multi-pack image for a single-pack SKU, accessories not included, filled packaging sold empty, or edible-looking non-edible décor without a clear label.
- Unsafe heat/knife/electrical handling, bare-hand contact presented as a hygiene claim, or children using unsuitable equipment.
- Finished bakes that falsely suggest the included product, quantity, colour, or performance.

## Generation, provenance, and acceptance

Every generated/edited asset must enter the Asset Manifest with stable ID, prompt/model/tool/date, source references and licences where applicable, transformations, intended placements, crop variants, factual review owner, approval status, and known limitations. Generated output receives visual QA for anatomical/tool errors, illegible pseudo-labels, packaging counts, ingredient form, unsafe handling, duplication, artifacts, and competitor resemblance.

Acceptance requires: primary product recognisability; pack/variant truthfulness; responsive safe crops; alt/fallback decision; no unsupported claim; provenance recorded; and product facts understandable with all images disabled.
