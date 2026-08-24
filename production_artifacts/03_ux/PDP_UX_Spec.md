# Product Detail Page UX Specification

**Phase:** 3 — UX and Product Design
**Owner:** UI/Product Design
**Status:** Review-ready specialist input
**Dependencies:** D-003, D-012, D-015, D-017; approved Phase 2B product, commerce, state and frontend contracts

## Purpose and non-negotiable outcomes

The product detail page (PDP) helps a customer identify the item, choose one explicit sellable variant, understand its factual data and add a valid pack quantity to the demo cart. It must never conceal an unavailable selection, infer a favourable fact, or let parent-level content override SKU-level price and availability.

Success means a customer can answer, before adding: what the item is; which pack/form/colour/dimension/count is selected; its demo price and availability; what critical facts are known or not provided; and what quantity will enter the cart.

## Information hierarchy and reading order

The DOM, keyboard and narrow-screen reading order is:

1. Skip target and breadcrumb: Home → department → category → optional subcategory → product.
2. Product identity: fictional product brand as subordinate metadata, one H1 product title, short factual description.
3. Product media: primary image followed by gallery; variant media replaces the primary presentation without changing reading order.
4. Purchase panel: demo-commerce disclosure, variant controls in authored axis order, selected pack summary, variant-owned demo price, comparable unit price when applicable, textual availability, pack quantity control, primary add action and wishlist action.
5. Persistent mutation/status message region associated with the purchase panel.
6. Factual details: description/use context, family-specific attributes, ingredients, allergens, storage and care/compatibility as applicable.
7. Related recipe links and factual related-product navigation, only from explicit relationships.

Ingredients, allergens and storage are never hidden behind a hover interaction. Collapsible presentation is allowed only when its labelled trigger exposes state and the critical-data headings remain discoverable in the page outline.

## Desktop, tablet and mobile behaviour

### Desktop

- Media and the purchase panel may form two adjacent regions. Their DOM order remains the hierarchy above; CSS placement must not create a confusing screen-reader order.
- The purchase panel may remain visible during gallery/detail scrolling only while it does not obscure content, focus indicators or browser zoom.
- Gallery thumbnails are buttons with an accessible name that identifies image position/purpose. Selecting one updates the large image and selected state without moving focus.

### Tablet and mobile

- Present product identity, media and purchase panel as one vertical flow. No required facts or variant axes move into desktop-only UI.
- A mobile sticky add bar is optional and only mirrors the current selected variant, quantity, price and enabled state. It never becomes the sole control and must not cover focused content or status messages.
- Gallery is usable with ordinary previous/next buttons and touch; swipe may supplement but not replace controls.
- Tables of factual attributes become labelled term/value groups where necessary. At 320 CSS px and 200% zoom, required content reflows without horizontal page scrolling.

## Variant-selection contract

### Initial selection

- If exactly one published, purchasable SKU exists and no meaningful customer choice remains, select it explicitly and announce nothing on initial render.
- If multiple meaningful choices exist, do not add until every axis resolves to exactly one existing SKU. A preselection is allowed only when merchandising data defines a valid default; the selected values and resulting SKU remain plainly visible.
- If no default exists, render the prompt “Choose [axis]” and disable Add. Price may show an honest range, never a price belonging to an unselected SKU.

### Controls and combinations

- Use a labelled `fieldset`/`legend` or equivalent grouped native controls per axis. Radio semantics suit mutually exclusive swatches/buttons; a native select is acceptable for long lists.
- Axis labels use factual values: pack quantity, form, colour, dimensions, set/cavity/pack count. Do not create a universal “size” label that obscures the data type.
- Impossible combinations are absent. A temporarily incompatible value may be disabled only when retaining it helps the customer understand another axis choice; it requires a textual reason available to assistive technology.
- An unavailable existing SKU may remain visible for comparison and is labelled “Unavailable in this demo”; it cannot be added.
- Changing any axis resolves the full tuple. Price, unit price, availability, SKU label and variant media update atomically from the resolved SKU. No automatic fallback to a different available SKU is permitted after a customer has chosen an unavailable one.
- URL/deep-linked variant values are validated. A valid value selects that SKU; an unknown or incompatible value is ignored with a non-blocking notice and the page returns to an unselected or valid catalog-defined default state.

### Selection status and focus

- Focus remains on the activated variant control. A polite status announces the complete new selection and consequential price/availability, for example: “500 g, buttons selected. ₹450. Available in this demo.”
- Do not announce gallery-only updates or duplicate the same message from multiple live regions.
- If refreshed data invalidates the selection, retain it visibly, disable Add, announce the change and offer valid choices. Never move focus to a replacement choice.

## Purchase controls

- Variant-owned price is formatted in INR. Demo/simulated status appears near the price or Add action and is not relegated to the footer.
- Unit price appears only where the architecture says quantities are comparable; it is supporting information, not a claim or default-selection rationale.
- Quantity is an integer pack count. Use labelled decrement, numeric input and increment controls; enforce minimum, configured demo maximum and availability limits without silently clamping typed input.
- Invalid quantity retains the entered value, supplies inline error text, associates that error to the input and disables Add. Button-disabled states include an adjacent reason.
- Add uses an explicit label such as “Add to demo cart”. During mutation, disable the affected Add control and retain its label/status; repeated activation cannot create duplicate additions.
- Success announces product, selected variant, pack count and resulting cart count. It does not move focus or rely on a transient toast. Failure restores the last confirmed state, keeps selection/quantity and provides Retry.
- If the same SKU exists in cart, addition merges by SKU. The success status states the added and resulting quantities.
- Wishlist is local/demo, can save an unavailable product, and is independent of variant/cart state. Toggle state uses a pressed-state control and a concise status message.

## Factual information and tri-state handling

For every critical ingredient, allergen and storage field:

| Data state | Customer presentation |
|---|---|
| `known` | Render the sourced factual value without expanding its meaning. |
| `information_not_provided` | Render exactly **“Information not provided”** under the named field. |
| `not_applicable` | Render “Not applicable” only when the product-family schema establishes that state. |

- Do not omit an unknown critical row, replace it with a dash, treat it as “none”, or infer free-from, dietary, safety, compatibility, quality or certification status.
- Product-family facts use specific labels (for example, internal dimensions and material for bakeware; ingredients and storage for food). Unknown safety/compatibility data remains unknown rather than becoming a positive or negative claim.
- Fictional product brands remain secondary to the retailer; they are not represented as sellers or endorsements.

## Page and component states

| State | Required response |
|---|---|
| Loading | Preserve page title/breadcrumb structure and reserved media dimensions; mark only resolving regions busy; Add remains unavailable. |
| Invalid product slug | Return the 404 experience with Search, Shop All and category recovery; never fabricate a product. |
| Parent loaded, variants loading | Show factual parent content, textual variant loading state and disabled Add. |
| Variant unselected | Prompt for unresolved axes, explain why Add is unavailable, and show no SKU-specific price as definitive. |
| Available | Show selected SKU facts, enabled valid quantity and Add. `low_demo_stock` remains textual and qualified as demo data. |
| Selected variant unavailable | Keep selection and factual content, label “Unavailable in this demo”, disable Add and expose other valid choices without auto-selecting. |
| All variants unavailable | Keep useful PDP content and wishlist; disable Add; offer category/search navigation, not inferred substitutes. |
| Missing/invalid price | Show “Price unavailable in this demo”; disable Add. Never render ₹0. |
| Partial critical data | Render each tri-state field using the exact rules above; do not hide the details region. |
| Media error | Use a neutral reserved-size fallback with factual product-title context; selection remains operable. |
| Add pending/failure | Prevent duplicate mutation; on failure preserve inputs, state the unchanged cart result and provide Retry. |
| Stale selection/price | Retain the chosen SKU; update and announce current facts; require a fresh Add activation when material data changed. |

## Keyboard and assistive-technology behaviour

- All gallery, variant, quantity, wishlist, disclosure and Add controls are reachable and operable in logical order using keyboard alone. Visible focus meets WCAG 2.2 AA-oriented expectations and is never obscured by sticky UI.
- Native radio arrow-key behaviour is preserved. Custom swatch composites, if used, implement a single tab stop with arrow navigation, selected/disabled semantics and a visible text label; colour alone never identifies a choice.
- The main Add action is never nested inside a live region. A separate concise `status` region owns mutation and selection messages.
- Loading uses `aria-busy` only on the affected region. Disabled controls have a persistent human-readable reason; `aria-disabled` does not replace behavioural prevention.
- Route entry places focus on the page-start target/H1; browser Back restores the prior list state and triggering item when feasible.
- Reduced motion removes animated gallery/price transitions; content and state updates remain immediate and complete.

## Acceptance criteria

1. A customer cannot add until one existing eligible SKU and a valid positive integer pack quantity are explicit.
2. Variant selection updates all SKU-owned facts atomically, retains focus and announces one concise result.
3. Unavailable, stale, invalid and price-missing selections fail closed without an automatic substitute.
4. Known, information-not-provided and not-applicable states remain distinguishable; every unknown critical fact uses the exact approved phrase.
5. Add success/failure/merge outcomes are persistent enough to perceive, programmatically announced and idempotent against repeated activation.
6. Desktop, tablet, mobile, keyboard-only, 320 CSS px and 200% zoom experiences retain all required content and actions.
7. No UI element asserts certification, popularity, dietary suitability, performance, food-contact status or availability beyond approved data.

## Assumptions and deferred presentation choices

- The catalog supplies ordered axes, eligible combinations, optional default SKU, current revision and factual labels; UX does not derive compatibility.
- Exact component styling, spacing, imagery, sticky behaviour and motion are Phase 4 concerns.
- Whether the selected SKU is encoded in the URL is an engineering/SEO choice, but invalid values must follow this specification.
