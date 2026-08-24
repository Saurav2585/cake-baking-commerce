# Component Visual Specification

**Phase:** 4A — Visual System and High-Fidelity Specification
**Owner:** UI/Product Design
**Status:** Reconciled Phase 4A recommendation
**Prototype identity:** Pantryform — portfolio/demo use only; formal legal clearance pending

## Visual premise

The component system expresses **Measured Joy** through measured alignment, generous material detail and calm, legible choices. **Working Pantry** keeps utility surfaces compact and exact; **Ingredient Theatre** informs crops and tactile moments without turning commerce into editorial obscurity. Retailer structure leads, fictional product brands remain metadata, and visual polish never substitutes for facts.

This is a visual specification, not code or a finalized asset library. Exact tokens must be measured for WCAG 2.2 AA-oriented contrast before implementation.

## Foundation direction

### Layout and rhythm

- Use a 12-column desktop grid, 8-column tablet grid and 4-column mobile grid, with a readable centered content maximum around 1280–1360 CSS px.
- Base spacing follows a 4 px unit; dominant intervals use 8, 12, 16, 24, 32, 48, 64 and 96 px. Dense utility controls may use 8–12 px internal gaps; editorial sections breathe at 48–96 px.
- Corners are softly practical, not confectionery-rounded: small controls 6–8 px, cards/panels 12–16 px. Pills are reserved for tags, filter chips and compact statuses.
- Borders and tinted surfaces establish grouping before shadows. Shadows are restrained, short and diffuse; never the sole focus or boundary signal.

### Colour roles

- Use the named primitives and semantic aliases in `Colour_System.md` and `Design_Tokens.md`: warm canvas and porcelain surfaces, ink aubergine structure, coral action emphasis, turmeric highlights, leaf support, and the approved semantic status/focus colours.
- Components consume semantic roles such as primary text, canvas/raised surface, primary action, status error/warning and focus ring; they do not bind directly to a decorative primitive when meaning could change.
- Demo/caution contexts always pair the approved tinted surface with explicit text/icon; they never reuse a sale badge treatment.

No department meaning relies on colour. Avoid generic pink/pastel coding, rainbow department strips, dark-gold luxury shorthand and low-contrast beige-on-cream combinations. All text, icons, focus indicators and state boundaries require measured contrast in every state.

### Typography

- Use the approved families, role tokens and responsive scale in `Typography_System.md`; this component artifact does not introduce parallel type values.
- Display type is sentence case, compact and never used for dense specifications. UI numerals use tabular figures where price/quantity comparisons align.
- Underline body links by default or provide an equally persistent non-colour affordance. Never use all caps for paragraphs or statuses.

### Focus, state and iconography

- Focus uses a minimum 2 px high-contrast outer ring plus offset, visible on every surface and not clipped by cards/sticky containers.
- Icons are simple line/filled utility forms with visible text labels for consequential actions. Product category illustration may be expressive; control icons must remain conventional.
- Selected, unavailable, error and disabled states combine border/fill, icon and text. Opacity alone never represents disabled or unavailable.
- All interactive targets aim for 44×44 CSS px. Hover is an enhancement; focus provides equivalent emphasis.

## Global components

### Header and navigation

- Desktop uses a compact utility line only when meaningful, then a primary row: retailer mark left, prominent search center, wishlist/cart utilities right; a separate department row holds Shop disclosure and Recipes peer link.
- The Shop disclosure is a measured multi-column panel with seven merchandise departments and short category lists. Active/current paths use weight, underline/edge marker and text—not colour alone.
- Mobile header contains mark, labelled search trigger and cart; menu opens a full-height drawer with one expanded department branch at a time. Drawer action edge is visually stable and safe-area aware.
- States: default, current route, search active, disclosure/drawer open, count loading/failure, sticky compact. Open overlays use a subtle scrim; focus and close controls remain unmistakable.

### Search combobox

- Input is visually dominant enough for catalog discovery, with persistent label (visible or visually adjacent), search icon and clear control when populated.
- Suggestion panel groups Products, Categories, Brands and Recipes with group headings; active descendant has a strong background plus leading marker. Product suggestions can show a small image; text remains sufficient.
- Loading preserves the entered query; no-suggestion and error states occupy the same anchored panel with direct submit/retry language.

### Breadcrumbs

- Quiet type and separators preserve orientation without competing with H1. Wrap to multiple lines; mobile may collapse intermediate ancestors into a labelled disclosure only if the current and parent context remain visible.

### Buttons and links

- Primary uses the approved semantic primary-action token with a high-contrast label. Secondary uses the raised-surface and strong-border tokens. Tertiary is a text link with underline/arrow. Destructive uses the semantic error role only with an explicit verb.
- Loading keeps width and label context with an adjacent spinner; success is communicated outside the button. Disabled state retains readable label and adjacent reason.
- Icon-only is limited to universally understood, redundantly named utilities such as close; commerce actions retain visible text.

### Notices, badges and status

- Inline information, demo, warning and error panels use icon, short heading and body/action. Demo commerce uses the approved semantic information/caution surface plus “Demo” wording, never the visual language of a sale badge.
- Badges are restricted to allow-listed factual/demo states. No bestseller, certification, scarcity, quality or dietary badge is implied.
- Toast is a supplementary paper card; persistent status/error stays at its owning component.

### Drawers, dialogs and accordions

- Drawers use a strong title/close header, scrollable body and separated action footer. Dialog width follows task complexity; recipe pack/substitution choice may be wider than confirmation dialogs.
- Overlay states: opening/open/closing, validation error, loading, long content, virtual-keyboard. Motion never owns visibility.
- Accordions use clear bordered rows and chevrons; critical PDP facts remain open/discoverable and are not compressed into an undifferentiated accordion stack.

## Discovery components

### Department and task tiles

- Department tiles use material-led crops or graphic ingredient/tool arrangements, a clear destination label and optional factual category cue. Recipes uses editorial image language but remains visually equal in navigation.
- Task tiles use concise verbs (“Colour and finish”, “Pack and present”) with small measured diagrams or material crops, never novelty cupcake icons.
- States: default, hover/focus, image missing, partial content. Image absence preserves a purposeful colour/texture field and label.

### Product card

- Vertical structure: fixed-ratio product image; fictional brand as quiet eyebrow; factual product title; explicit displayed variant/pack; demo price and applicable unit price; textual demo availability; wishlist and Add/Select options.
- Product identity and action controls are separate hit targets. Titles wrap to two or more lines without changing fact order; price never overlays imagery.
- Direct Add is visually primary only for an unambiguous available SKU. Select options is secondary/primary according to required action. Unavailable retains the card with muted media treatment, strong textual label and View product.
- States: default, focus/hover equivalent, wishlisted, add pending/success/failure, options required, unavailable, stale data, image failure and critical-data warning where appropriate.

### Filters, chips, sort and result count

- Desktop filter groups form a quiet left rail with dividers, count labels and native-looking check/radio controls. Results heading, count, active chips and sort align above the grid.
- Mobile uses a clear Filters button with applied count and a staged drawer; sort remains adjacent as an independent labelled control.
- Chips show label/value and 44 px remove target. Disabled filters retain a textual reason where shown. Invalid URL values appear in an informational recovery panel, not as phantom selected chips.
- Loading uses reserved cards and an unchanged results heading; skeletons must not mimic real text. Zero/error states use an open region with retained query/chips and ordered recovery actions.

### Pagination/load more

- Page links sit in a labelled, high-target-size row; current page has strong boundary and text semantics. Load more, if used, is full-width within results and preserves a stable retry/end position.

## Product components

### Media gallery

- Primary frame uses the approved neutral raised/canvas surface and object scale that keeps package shape legible. Thumbnail rail or grid shows selected state by border plus marker.
- Desktop places thumbnails vertically or below depending crop count; mobile uses previous/next buttons and a small position indicator. No autoplay.
- Loading, missing and failed media preserve dimensions and product action position. Variant image changes may crossfade only as a decorative enhancement.

### Variant selector

- Each axis has a legend, optional concise buying hint and a control group. Pack/form options are bordered choice cards showing label and relevant demo price; colour swatches always include text; dimensions use fully written values.
- Selected choice has high-contrast border, inset marker/check and weight. Unavailable choice remains legible with “Unavailable in this demo”; invalid combinations are absent or disabled with visible reason.
- The resolved selection summary is a distinct raised-surface panel containing full variant, SKU when useful, demo price, unit price and availability. Atomic changes do not cause layout jump.

### Quantity and purchase panel

- Stepper buttons flank an editable numeric field with “packs” context. Error sits directly below without moving distant content.
- Primary Add spans the purchase panel on narrow screens. Wishlist is adjacent/secondary. Demo qualification sits above or immediately below the price/action, not in remote legal copy.
- Desktop may use a sticky purchase panel; mobile may mirror it in a sticky bar only when one accessible action instance is exposed and focused content is never covered.

### Product facts

- Use grouped definition lists with prominent labels and generous line spacing. Ingredients, Allergens and Storage are distinct rows.
- **Information not provided** uses neutral caution treatment: an information icon, explicit phrase and no alarm/success colour. `Not applicable` is visually distinct and quieter.
- Material, dimensions, care and compatibility adapt by family; no empty universal spec table.

## Recipe components

### Recipe card and detail

- Recipe cards emphasize process/outcome imagery, title, factual yield/time/difficulty when present and a clear View recipe link; never use ratings or popularity labels.
- Detail pairs a controlled editorial image with H1/summary and an at-a-glance fact strip. Ingredient list and method use numbered rhythm, group headings and generous checkable space without turning editorial content into a false completion tracker.
- Servings control is a compact bordered group near yield; recalculation status has reserved space to prevent jumping.

### Recipe mapping row

- Desktop uses a spacious stacked comparison row rather than a dense spreadsheet: ingredient identity/status at left, requirement and pack math centrally, product/controls at right. Mobile becomes a card with this exact order.
- Four labelled measures—Required, Selected pack, Purchased, Left over—share consistent visual slots and tabular numerals. Mixed packs are listed separately.
- Inclusion uses a labelled checkbox/toggle plus state phrase. Optional, suggested-owned, needs-choice, unmapped, unavailable, override, substitution and stale states each combine a left-edge marker, icon and text.
- Change pack, substitute, restore and omit are secondary/tertiary actions. A substitute displays original → replacement with the factual preparation/risk note.
- Unknown critical facts appear in an embedded disclosure with the exact phrase; not as a badge suggesting safety.

### Recipe review and post-add summary

- Review summary is a quiet sticky/nonsticky ledger showing selected count, omitted/unresolved count and demo total. Blocking omissions expand into linked issue rows.
- Final Add has an exact count. Partial-add acknowledgement is a bordered caution block immediately before it.
- Success becomes a substantial summary panel with added/merged/skipped groups and View demo cart as primary action; it cannot be toast-only.

## Commerce components

### Wishlist and mini cart

- Wishlist reuses product-card facts in a denser list/card hybrid. Remove is visually secondary and never hidden until hover.
- Mini cart is a compact side drawer: heading/count, line list, inline issue treatments, subtotal and View cart. It does not compete with the full reconciliation tools on Cart.

### Cart line and summary

- Desktop line uses image, product/variant facts, quantity, unit price/line total and recovery actions in aligned columns. Mobile uses a card with product identity first, issue second, then quantity/price/actions.
- Price-changed treatment shows previous and current demo prices without sale styling. Unavailable lines use a strong issue strip and are visibly excluded from total.
- Cart summary is a bordered ledger with Items subtotal, Shipping/Tax “Not calculated in this demo”, Demo item total and checkout action. Blocking issue reason sits adjacent to disabled progression.

### Demo checkout and confirmation

- Checkout reads as a calm form/document, not a payment funnel. A prominent demo panel sits beneath H1 and again beside “Complete demo checkout”. No card/UPI/payment visuals appear.
- Fixed fictional choices use accessible radio cards; summary remains a conventional item ledger. Errors use top summary plus inline associations.
- Confirmation leads with “Demo checkout complete” and “No payment was taken and no real order was placed.” The demo reference is visually code-like but never styled as an invoice/receipt.

## Shared state-treatment matrix

| State | Visual rule |
|---|---|
| Loading | Preserve headings, control geometry and escape paths; neutral skeleton/progress; affected region only is busy. |
| Empty/zero | Open composition, plain explanation, retained context and one primary recovery plus secondary paths. |
| Partial | Loaded content remains normal; failed region has a contained notice and Retry. |
| Unavailable/stale | Keep identity visible; issue colour + icon + text; action disabled/recovery adjacent; no urgency styling. |
| Validation error | Semantic error border/icon/text with specific inline copy; submitted multi-control errors also show linked summary. |
| Mutation pending | Preserve last confirmed content; disable only affected mutation; spinner plus retained verb/context. |
| Mutation failure | Restore/retain confirmed value; persistent error and Retry; no success colour or count. |
| Success | Concise confirmation at owning component; commerce status persists long enough to perceive. |
| Media failure | Reserved neutral frame and factual text; never substitute unrelated food imagery. |
| Reduced motion | Same layout, hierarchy and final states rendered immediately; no missing reveal content. |

## Component acceptance checklist

- Every Phase 3 component/state is represented, including search suggestions, mobile drawers, tri-state facts, recipe overrides, stale cart and expired confirmation.
- Every commerce control has an adjacent demo context and a no-animation equivalent.
- Desktop and mobile transformations preserve source order, facts, actions and status ownership.
- Focus, selection, disabled, unavailable, error and loading treatments are distinguishable without colour alone.
- No visual device implies ratings, certification, scarcity, live fulfillment, health/dietary status or real payment.
