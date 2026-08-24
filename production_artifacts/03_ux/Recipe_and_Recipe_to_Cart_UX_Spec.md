# Recipe and Recipe-to-Cart UX Specification

**Phase:** 3 — UX and Product Design
**Owner:** UI/Product Design
**Status:** Review-ready specialist input
**Dependencies:** D-003, D-015, D-016, D-017; approved Phase 2B recipe, mapping, commerce, state and frontend contracts

## Purpose and boundary

Recipes are useful editorial content whether or not merchandise is available. Recipe-to-cart is an optional planning flow that scales requirements, applies only explicit catalog mappings and asks the customer to review every inclusion before one atomic demo-cart mutation. It does not silently choose substitutes, infer conversions, add tools or promise a recipe outcome.

The flow has three explicit stages:

`Recipe detail → Review ingredients and packs → Post-add result`

Cart mutation occurs only at the confirmed end of Review. Back navigation preserves the last valid servings and review choices within the current session.

## Recipe-detail hierarchy

The DOM and narrow-screen order is:

1. Breadcrumb: Home → Recipes → recipe.
2. Recipe identity: one H1, original factual summary and primary media.
3. At-a-glance facts: base yield, preparation/bake/cool/total times when provided and optional editorial difficulty.
4. Servings control and scaling status.
5. Ingredient list grouped in authored order, showing scaled amount, optional status and preparation note.
6. Primary “Review ingredients and packs” action.
7. Method steps in authored order.
8. Tools required/recommended, clearly separate from ingredients and not selected for purchase.
9. Explicit related products/recipes when present.

Missing optional facts are omitted without placeholder claims. Missing media uses a neutral fallback. A failure in recipe-to-cart mapping never hides the readable ingredients or method.

## Serving selection and scaling

- Begin at the authored base servings. A labelled integer control states allowed minimum, maximum and step.
- On a valid change, calculate `requested ÷ base` and scale only ingredients marked scalable. Display the selected yield and enough precision to explain pack selection; indicate approximation where display rounding occurs.
- Non-scalable amounts retain the authored text plus “Does not scale automatically.” They receive no automatic pack on Review.
- Invalid zero, negative, non-numeric, out-of-bounds or off-step input is not silently clamped. Keep the typed value, associate a specific inline error, retain the last valid ingredient calculation and disable entry to Review until resolved.
- Focus remains on the servings control after increment/decrement or validation. A single polite status announces “Recipe updated for [n] servings.” Ingredient rows do not announce individually.

## Entering the review

Activating “Review ingredients and packs” creates or restores the mapping review for the last valid servings and current recipe/catalog/cart revisions. The review is a dedicated route or full page, not a transient modal, so customers can navigate, zoom and compare complex lines reliably.

On entry:

- Move focus to the review H1/page-start target and announce the title through the route-change pattern.
- Show recipe title, selected servings, scale from base yield, demo-pricing disclosure and a link back to the recipe.
- Render every recipe ingredient exactly once, including optional, suggested-owned, unmapped, invalid and unavailable items.
- Calculate only from explicit mappings and the unrounded canonical requirement. The default is the smallest sufficient eligible pack combination; lowest unit price is never the primary criterion.

## Review-page hierarchy

1. Review heading, recipe/yield context and simulated-price/availability disclosure.
2. Summary: total ingredient rows, currently selected rows, omitted/unresolved rows and current demo total.
3. Required ingredient review group.
4. Optional and suggested-owned ingredient group.
5. Separate tool recommendations group, all initially unselected and outside ingredient sufficiency totals.
6. Omitted/unresolved summary with links to affected rows.
7. Final inclusion count, demo total and one “Add [n] selected ingredients” action.

On desktop, line facts may use a comparison table only if row headers and responsive alternatives remain semantic. On tablet/mobile each line becomes a labelled card in the same source order. Required, selected pack, purchased and leftover values must never require horizontal scrolling or hover. A persistent bottom action region is optional, but cannot obscure the last row, error summary or focused control.

## Ingredient review-line contract

Every line visibly identifies:

- ingredient name, preparation note and whether required/optional;
- inclusion state: selected, suggested pantry-owned, optional excluded or unresolved;
- required amount, or authored non-scalable text;
- mapped product and selected variant/SKU when resolved;
- selected pack quantity, number of packs, total purchased and leftover amount;
- current demo price and line total for included purchasable items;
- whether the result is the deterministic default, a customer variant/pack override, an explicit compatible mapping or a confirmed substitution;
- critical ingredients, allergens and storage facts for the selected product using the tri-state rules;
- line-specific warning/recovery and controls.

For mixed-size fulfillment, list every SKU and pack count rather than compressing the combination into an ambiguous total.

### Tri-state product facts

- `known`: show the factual value.
- `information_not_provided`: show exactly **“Information not provided”** for the named ingredient, allergen or storage field.
- `not_applicable`: show “Not applicable” only when the schema establishes it.

Unknown is not interpreted as none, safe, suitable or free-from. Selecting a substitution refreshes facts from the chosen product; recipe wording never supplies missing product facts.

## Initial line states

| State | Initial behaviour and recovery |
|---|---|
| `ready` | Included with the deterministic smallest-sufficient pack result. |
| `pantry_owned` | For `suggest_owned`, visible and initially excluded with wording such as “Suggested as already on hand—not assumed”; Include reverses it. |
| `optional_unselected` | Visible and excluded regardless of mapping; Include starts calculation/choice. |
| `needs_choice` | Non-scalable amount or a mapping needing customer choice; no pack selected. Choose an eligible pack/count or explicitly omit. |
| `unmapped` | Show that no product mapping is provided; allow explicit omission and link to browse/search without claiming a match. |
| `unavailable` | Keep requirement and prior/preferred product context visible; offer only explicit compatible/substitution choices or omission. |
| `invalid_mapping` | Explain that the mapping cannot be used; no Add for the line; retry/omit as permitted. |

Unresolved required lines block the final action until the customer resolves them or explicitly omits/marks them pantry-owned. Omission is never inferred from unavailability. Optional exclusions need no warning confirmation because they begin explicitly labelled as optional and excluded.

## Overrides and substitutions

### Variant and pack override

- “Change pack” opens an inline disclosed group or labelled dialog containing only eligible mapped variants, with pack size, form/other relevant axes, demo availability and price.
- Selection recalculates integer pack count, purchased, leftover and line total. It is marked “Your pack choice”. “Restore suggested packs” reruns the deterministic current-snapshot algorithm.
- A pack-count edit must remain sufficient. If not, preserve the entry, state the exact deficit, associate the error and do not accept the change. The customer can instead omit/mark owned.
- Focus returns to the invoking control after a dialog closes. A successful change keeps focus on the control and announces the new pack count, purchased and leftover amount once.

### Substitution

- Offer only options from an explicit substitution group. The chooser shows original ingredient, proposed substitute, conversion, preparation difference and factual risk note where authored.
- Choosing requires explicit confirmation unless the architecture marks a named default safe; even a default is labelled as substituted and is reversible.
- Confirming changes only that line, marks it “Substitution selected”, refreshes quantities/facts and exposes “Restore original”. No dietary, allergen, performance or equivalence claim is inferred.
- If a chosen substitute or override becomes unavailable, retain it visibly as stale, block the line and require a new explicit choice. Never auto-substitute.

## Review validation and confirmation

- Recalculate the summary after each confirmed line change without moving focus. A polite status owns one concise message; persistent row labels carry the lasting state.
- “Add [n] selected ingredients” is enabled only when at least one line is selected and every selected line has valid SKU(s), sufficient positive pack counts and current price/availability.
- Before mutation, revalidate recipe revision, catalog revision, variants, availability, price and expected cart revision.
- Price change: update old/current demo price, announce it, retain all selections and require a new confirmation activation.
- Availability/mapping change: keep the affected row, mark it stale/unresolved, focus an error summary linked to affected rows and add nothing.
- If unresolved required items were explicitly omitted, the final section names each omitted ingredient and requires a “I understand these items will not be added” acknowledgement (`partialAddAcknowledged`) before Add.
- One confirmed action is atomic: all currently valid selected lines merge, or none do. The action uses one unique addition ID; retrying the same successful ID never increments again.
- Existing matching SKUs merge by variant identity. Before confirmation, the review may state the predicted outcome: “Adds 2 packs to an existing cart line”; attribution to every recipe addition is retained.

## Post-add result

On success, replace the final action state with a focused summary heading (or move focus to a dedicated summary region) only because the multi-line transaction has completed. The summary reports:

- recipe title and selected servings;
- number of ingredient selections successfully added;
- SKU lines newly created versus merged and resulting pack quantities;
- every skipped pantry-owned, optional and explicitly omitted requirement;
- unresolved count (normally zero after valid acknowledgement);
- updated demo cart count and total;
- actions: “View demo cart”, “Return to recipe” and “Review selections”.

The wording never says an unavailable/unselected item was added. A repeated recipe add uses a new deliberate action and addition ID; it is not silently deduplicated. A transient toast may supplement but never replace this summary.

On adapter/mutation failure, announce no success, retain the entire review and last confirmed calculations, state that the cart was unchanged and offer Retry. A disclosed session-memory fallback, if implemented, is a separate customer action.

## Loading, empty, stale and error states

| State | Required response |
|---|---|
| Recipe loading | Keep breadcrumb/H1 structure and reserve media; do not expose review until valid recipe data resolves. |
| Invalid/removed recipe | 404/410 experience with Recipes, Search and Shop All recovery; no product/cart claim. |
| Mapping calculation | Retain last valid servings; mark review region busy; do not present partially calculated lines as ready. |
| No mapped products | Keep full readable recipe; review lists each unmapped requirement and browse/search recovery. |
| All items excluded | Final Add disabled; summary explains none selected and links to includable lines. |
| Partial/unavailable | Keep all rows; block until unresolved required lines are explicitly omitted or resolved. |
| Price/catalog/cart conflict | Preserve selections; show a linked error summary, refresh affected facts, require reconfirmation. |
| Calculation/provider failure | Restore last valid review, identify affected rows, Retry; never choose fallback merchandise. |
| Atomic add failure | Cart unchanged, selections recoverable, same idempotency key on safe retry. |
| Post-add refresh/revisit | Restore the successful result for the same addition ID without another mutation; a new addition requires explicit restart. |

## Keyboard, focus and status behaviour

- Recipe and review flows are complete with keyboard alone. Native controls are preferred; ingredient groups use headings or fieldsets with unique accessible names.
- Route changes focus the page-start/H1 target. Opening a line dialog contains focus, Escape cancels without mutation and closing returns focus to the invoker.
- After blocking final validation, focus moves to an error-summary heading (`tabindex=-1`) whose links focus the exact line control/error. Inline errors remain associated after focus moves.
- Ordinary include, omit, pack and substitution changes retain focus. Only the completed multi-line transaction moves focus to the post-add summary.
- One polite live region owns routine recalculation and selection updates; failures that require immediate correction may use an assertive alert once. Do not announce every total rerender.
- Inclusion cannot be represented by colour or strikethrough alone. Controls meet the 44×44 CSS-pixel target goal, focused content is not obscured, and reduced motion removes transitions without changing sequencing or state.

## Acceptance criteria

1. Recipe reading remains complete and useful without catalog mappings or stock.
2. Scaling is deterministic, rejects invalid servings without losing the last valid calculation and never auto-scales authored non-scalable amounts.
3. Review shows every ingredient and always exposes required, selected pack, pack count, purchased and leftover quantities when calculated.
4. Defaults use the approved smallest-sufficient algorithm and never prioritize lowest unit price.
5. Optional items and tools begin unselected; suggested-owned items are explicitly labelled, reversible and never asserted as owned.
6. Overrides and substitutions affect one line, are labelled, reversible and use only eligible/explicit data.
7. Unknown critical facts render the exact approved phrase and produce no favourable inference.
8. Unresolved/stale lines cannot enter cart; partial addition requires named omissions and explicit acknowledgement.
9. Final addition is atomic, idempotent and correctly describes new versus merged SKU quantities and skipped items.
10. Desktop, tablet, mobile, 320 CSS px, 200% zoom, keyboard and assistive-technology use retain the complete review and recovery paths.

## Assumptions and deferred presentation choices

- Phase 2B owns arithmetic, eligibility, tie-breakers, conversion and cart merge rules; this artifact does not redefine them.
- Exact card/table styling, visual emphasis and motion are Phase 4 concerns.
- A dedicated review route is the recommended UX; final route implementation may vary only if browser history, recoverability, focus and complete-page accessibility remain equivalent.
