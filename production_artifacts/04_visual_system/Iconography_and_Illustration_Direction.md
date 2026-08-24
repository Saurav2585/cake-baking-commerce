# Iconography and Illustration Direction

**Phase:** 4A — Visual System

**Status:** Reconciled Phase 4A recommendation

## Icon system

Use a restrained rounded-outline icon family that feels practical rather than technical or cute. A single library may seed common interface symbols, but the chosen package and licence require engineering review. Custom category icons must follow the same construction and originality checks.

## Construction specification

- Coordinate system: 24 × 24 viewBox.
- Default visible size: 20 px in controls; 16 px inline; 24 px for standalone status/navigation.
- Stroke: 1.75 px at 24 px source, round caps and joins.
- Optical padding: approximately 2 px; key forms align to a 2 px underlying grid with optical corrections.
- Filled areas are reserved for selected/critical state and remain legible in forced colours.
- Avoid excessive interior detail that collapses below 20 px.
- Icons inherit semantic foreground colour; hard-coded department colours are prohibited.

## Interaction rules

- Icons support labels; they do not replace text for unfamiliar actions, recipe states, availability, allergens, storage or demo checkout.
- Familiar icon-only controls such as Close, Search, Wishlist and Cart require explicit accessible names and 44×44 CSS px target areas.
- Tooltip text is supplemental and must be keyboard/touch accessible; it cannot be the only label or instruction.
- Selected, unavailable, warning and error states combine icon, text and semantic state—not colour/icon alone.
- Decorative icons use empty alternative text or are hidden from accessibility APIs.
- Icon animation is optional enhancement, disabled under reduced motion and never the only feedback.

## Core icon inventory

| Group | Required concepts |
|---|---|
| Global | menu, close, search, account-deferred/no account icon by default, wishlist, cart, chevrons |
| Discovery | filter, sort, grid/list if both views exist, clear/remove, expand/collapse |
| Commerce | add, remove, increment, decrement, edit, unavailable, demo/info |
| Feedback | success, warning, error, information, loading companion |
| Recipe | servings, time only when known, scale, pantry-owned, optional, substitute, tool, required/purchased/leftover annotation |
| Product facts | pack/weight, dimension, count and storage only when paired with exact text |

Do not invent certification seals, professional-chef marks, “quality” shields, popularity flames, dietary icons or food-safety symbols. An icon cannot promote an unknown field into a positive claim.

## Department icon policy

Department icons are optional supporting navigation cues. If used, each is paired with its department label and tested for distinct silhouette:

- Ingredients: measured scoop or ingredient vessel, not a generic wheat claim.
- Chocolate: callet/block material form, not a finished confection.
- Colours & Flavours: controlled droplet plus swatch cue, without rainbow coding.
- Fillings & Fondant: layered spread/fold form.
- Decorating: piping/finish gesture, keeping edible/non-edible distinctions textual.
- Bakeware & Tools: pan plus measured tool form.
- Packaging: open box/board construction.
- Recipes: open method card/book with measure cue.

These are concept directions, not final assets. Do not trace or mimic competitor icons. Silhouette, stroke and meaning must pass an originality review.

## Illustration idea: Measured Making

Illustration should show materials and tools arranged around a visible act of preparation: measured portions, aligned implements, sequence marks, folds, pours and pack-ready structures. It supports explanation and orientation rather than depicting an idealised lifestyle.

### Style

- Simplified geometric foundations with tactile irregularity at edges.
- Flat or lightly layered forms using approved semantic palette plus limited material-specific colour.
- Fine measurement ticks, labels or paths used sparingly and never styled as certification devices.
- Human presence through hands or process fragments only when anatomy and handling are credible.
- Controlled perspective; avoid whimsical floating worlds, cartoon faces and childish sweetness.

### Content applications

- Home/department orientation: one measured arrangement or transformation sequence.
- Recipe process support: step-specific diagrams only where they add understanding.
- Empty/error states: small functional illustration that does not delay recovery action.
- Packaging/tool explanation: dimensional diagrams paired with exact text and marked illustrative when not to scale.

### Prohibited illustration claims

No guaranteed bake result, unsafe food handling, impossible melting/colour behaviour, inferred dietary suitability, certification, endorsement, founder history, testimonial scene, real-brand packaging or delivery promise. Food and non-food decoration must be visibly and textually distinguishable.

## Photography relationship

Illustration and photography should not compete in one small component. Product cards prioritise consistent product imagery. Editorial modules may use illustration when a concept/sequence matters and photography when real texture/form matters. Ingredient Theatre close-ups remain supporting accents; users must still recognise the associated product or task from text.

## Asset production and accessibility

- Every generated or commissioned illustration is recorded in the Asset Manifest with prompt/source, creator/tool, date, version, intended use and alterations.
- Informative images receive concise alt text describing functionally relevant visible content; decorative compositions use empty alt.
- Complex diagrams include adjacent text or a long description; embedded text inside images is avoided.
- Do not put essential actions or labels inside raster assets.
- Test icons at 16/20/24 px, 200% zoom, high contrast/forced colours and common colour-vision simulations.
- SVGs require optimised paths, stable viewBox, no embedded scripts/styles that override themes, and `currentColor` where semantic colour inheritance is intended.

## Deliverable boundary

This document specifies direction and production rules only. It creates no final icons, illustrations, generated imagery, logo or Asset Manifest entries. Those require the separately authorised visual-asset workstream and review.
