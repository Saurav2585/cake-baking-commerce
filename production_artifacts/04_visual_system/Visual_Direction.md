# Visual Direction

**Phase:** 4A — Visual System

**Owner:** UI/Product Design

**Status:** Reconciled Phase 4A recommendation

**Prototype identity:** Pantryform — portfolio/demo direction only; formal legal clearance pending

## Direction: The Measured Pantry

The visual system should make specialist baking retail feel ordered, tactile and inviting. **Measured Joy** supplies the emotional lead: precise quantities, calm sequences and the pleasure of preparing to make. **Working Pantry** keeps assortment-heavy surfaces legible. **Ingredient Theatre** appears selectively through material close-ups and transformation imagery, not through dramatic luxury styling.

The result is contemporary and premium-accessible: generous rather than sparse, warm rather than cute, exact rather than clinical.

## Visual principles

### 1. Warm structure

Use an off-white flour-toned canvas, white working surfaces and dark cocoa text. Product grids, fact tables and recipe mapping rows rely on steady alignment and spacing. Warmth comes from material colour and rounded transitions, not ornamental clutter.

### 2. Precision is visible

Quantities, dimensions, selected variants, demo prices and status information receive a stronger typographic and alignment system than promotional prose. Measurement marks, rules and compact annotations may support hierarchy but cannot resemble certifications or badges.

### 3. Appetite stays useful

Sensory photography or illustration must connect to an ingredient, tool, recipe step or making task. Product identity and relevant distinctions remain legible. Avoid generic finished-cake glamour, staged testimonial scenes and imagery implying guaranteed outcomes.

### 4. Colour communicates hierarchy, never truth alone

Warm terracotta provides primary emphasis; deep leaf green supports focus/confirmation; marigold and blush are controlled accents. Text, icons and labels always accompany state colour. Departments do not receive exclusive colour identities that users must memorise.

### 5. Retailer first, product brands second

Pantryform owns navigation, page structure and service voice. Fictional product-brand marks are smaller, quieter metadata. The visual hierarchy must not resemble a seller marketplace or imply endorsement, ownership or exclusivity.

## Palette character

- **Flour:** warm page ground; reduces clinical whiteness.
- **Porcelain:** content and product surfaces; preserves media colour accuracy.
- **Cocoa ink:** primary text and exact data.
- **Terracotta:** primary interactive emphasis; grounded and culinary without default pink/pastel coding.
- **Leaf:** focus, confirmed state and constructive support.
- **Marigold:** sparing highlight for measured annotations and warm editorial moments; never body text on light backgrounds.
- **Berry red:** errors and destructive status only.

Exact token values and permitted pairings are defined in `Design_Tokens.md`.

## Composition language

- Use visible grids, baseline rhythm and calm whitespace to organise assortment breadth.
- Alternate dense working zones (filters, cards, mapping rows) with quieter orientation zones (heading, category context, recipe introduction).
- Prefer rectangular product imagery with consistent aspect ratios; crop textures more closely only in editorial modules.
- Use corners and borders consistently: modest rounding for controls/cards, fuller pill shape only for chips/status tokens.
- Allow limited asymmetry in editorial composition, while commerce controls and factual fields remain aligned.
- Keep promotional overlays off product images. Status and price belong in readable content areas.

## Surface hierarchy

1. **Canvas:** page background and large pauses.
2. **Working surface:** primary cards, filter panels, drawers and transactional sections.
3. **Quiet tint:** factual groupings, recipe calculations and disclosure regions.
4. **Raised overlay:** menus, suggestion lists, modal drawers and mini cart; elevation reinforces containment but never replaces borders/focus.
5. **Status surface:** semantic tint plus icon, heading/label and explanation.

## Brand-expression moments

Brand expression should be strongest at Home orientation, department introductions and recipe/editorial imagery. It becomes quieter in PLP controls, PDP purchase blocks, recipe-to-cart review, cart and checkout, where exactness and error recovery take priority.

The prototype wordmark may be typeset temporarily from the selected display family. It is not a final logo, trademark claim or production lockup. Always retain the descriptor “Baking Ingredients & Supplies” where the retailer’s role could be ambiguous.

## Accessibility guardrails

- All normal text targets at least 4.5:1 contrast; large text at least 3:1; interactive boundaries and meaningful graphics at least 3:1 against adjacent colours.
- Focus uses a persistent two-layer treatment that remains visible on light, dark and image-adjacent surfaces.
- Never place essential text directly over uncontrolled imagery. When unavoidable for approved editorial headings, use a tested opaque surface rather than a gradient guess.
- Status cannot rely on hue, icon shape or position alone; pair it with explicit text.
- Preserve content and actions at 320 CSS px, 400% zoom, forced colours and reduced motion.

## Explicit exclusions

- Childish cupcake motifs, novelty mascots and confectionery-script typography.
- Generic pink/pastel branding, rainbow department coding and gold-on-black luxury shorthand.
- Competitor-derived composition, promotional rails, badge systems, icons or copy.
- Fabricated reviews, ratings, certifications, popularity, scarcity, health/dietary claims or retailer expertise.
- Visual treatment that makes demo price, availability or checkout appear live.

## Downstream acceptance checks

Visual applications must demonstrate Home, PLP, PDP, recipe-to-cart and simulated checkout at desktop and mobile; cover loading, empty, error, unavailable, selected and focus states; use only approved semantic tokens; preserve product facts ahead of decoration; and remain understandable with imagery and motion disabled.
