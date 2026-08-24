# Recipe-to-Cart Rules

**Phase:** 2B — Catalog, Commerce and Information Architecture  
**Owner:** Catalog/Commerce Architecture  
**Status:** Review-ready specialist input  
**Binding decision:** D-016

## Outcome and invariant

Recipe-to-cart is a transparent planning aid for Pantryform’s simulated commerce experience. It converts each selected recipe ingredient into a review line, defaults to the **smallest sufficient purchasable pack combination**, and shows required, selected pack, purchased and leftover quantities before anything enters the cart. It never defaults to lowest unit price, never silently adds optional ingredients or tools, and never hides unmapped or unavailable requirements.

## Inputs and review-line output

Inputs are recipe ID/version, requested servings, recipe ingredient records, explicit product mappings, current catalog snapshot, current cart snapshot and customer review selections.

Each ingredient produces exactly one review line with:

- ingredient name and required quantity (or non-scalable text);
- state: `ready`, `pantry_owned`, `optional_unselected`, `needs_choice`, `unmapped`, `unavailable`, or `invalid_mapping`;
- chosen product and variant(s), including override/substitution disclosure;
- pack size and number of packs;
- selected pack quantity (quantity per pack);
- purchased amount (pack size × pack count, summed for combinations);
- leftover amount (`purchased − required`, never below zero);
- demo price snapshot and line total;
- controls to include/deselect, choose a variant, choose a substitute, change pack count or restore default;
- warnings for stale price, changed availability, conversion limitations or `information_not_provided` product facts.

Non-scalable requirements show `needs_choice` and cannot be included until the customer selects an explicit pack/count, unless they mark the item pantry-owned or leave an optional item unselected.

## Deterministic serving calculation

1. Validate requested servings against recipe min/max/step. Reject invalid input with no state mutation.
2. Compute `scale_factor = requested_servings ÷ base_servings` using decimal arithmetic.
3. For each scalable ingredient, compute `required = base canonical quantity × scale_factor` without display rounding.
4. Preserve quantity kind. Cross-kind conversion is allowed only through the recipe’s explicit mapping multiplier.
5. Round only for display, using up to two decimals for g/ml and whole numbers for count. If display rounding changes visible precision, label it approximate; pack selection uses the unrounded canonical requirement.
6. Counts that represent indivisible items round required quantity upward to the next whole count before pack selection. No other quantity is rounded upward before selection.

## Eligibility and preferred product selection

For each selected ingredient:

1. Resolve explicit mappings only. An unresolved mapping yields `unmapped`.
2. Exclude draft, archived, discontinued and unit-incompatible variants.
3. Apply any explicit compatible-variant allow-list and mapping constraints.
4. Resolve products in this order: available preferred mapping; available compatible mapping; explicit available substitute only if the substitution is designated safe to default. Otherwise require a customer substitution choice.
5. `low_demo_stock` is eligible but visibly labeled; `unavailable` is not eligible.
6. Priority ties resolve by ascending stable product ID, never by price, popularity or margin.

No dietary, allergen, temperature, performance or form compatibility is inferred. When critical data is unknown, the review shows **“Information not provided”** and preserves the customer’s choice.

## Smallest-sufficient-pack algorithm

For the chosen product, let eligible variants provide positive canonical pack quantities in the required quantity kind.

1. Generate pack combinations whose purchased amount is at least required. A combination may use multiple units of one variant or, where the parent explicitly permits mixed-size fulfillment, multiple variant sizes of that same parent product.
2. Establish a finite upper bound: `upper = ceil(required / smallest_eligible_pack) × smallest_eligible_pack`. Enumerate only combinations with purchased amount `≤ upper`; each variant count therefore ranges from zero through `floor(upper / variant_pack_size)`. At least the repeated-smallest-pack combination reaches `upper`, so the candidate set is non-empty and finite. For v1’s small variant sets, exhaustive integer search within that bound is acceptable.
3. Rank combinations lexicographically by:
   1. smallest total purchased canonical amount;
   2. smallest leftover amount (mathematically redundant but retained as an audit assertion);
   3. fewest physical packs;
   4. fewest distinct SKUs;
   5. lowest total demo price;
   6. ascending concatenated stable variant IDs.
4. Select the first combination. Lowest unit price is never the primary criterion.

Examples:

- Required 600 g; packs 250 g and 500 g → default 250 g + 500 g = 750 g, not two 500 g packs.
- Required 600 g; packs 300 g and 500 g → default two 300 g packs = 600 g.
- Required 900 g; only 250 g available → default four packs = 1,000 g.

If mixed-size fulfillment is disabled for a parent, evaluate repeated units per variant and choose by the same rank. An explicit variant override constrains the calculation to that variant and chooses `ceil(required ÷ pack_size)` packs.

## Overrides, pantry-owned items and optional items

- **Variant override:** recalculates pack count, purchased, leftover and price from the chosen eligible variant. It persists only within this review unless added to cart. Restore-default reruns the algorithm against the current snapshot.
- **Pack-count override:** permitted only when total purchased remains sufficient. A smaller insufficient quantity is rejected with the deficit stated; the customer may instead mark pantry-owned/deselect.
- **Pantry-owned:** customer action deselects an ingredient and marks it `pantry_owned`. A recipe may initially suggest common pantry ownership only when its data says `suggest_owned`; the state and reversal control must be explicit.
- **Optional ingredient:** begins `optional_unselected` regardless of mapping or availability. It is calculated only after explicit selection.
- **Tools:** appear in a separate recommendation group, all unselected. Tool selections use ordinary explicit product/variant choice; tools never enter the ingredient sufficiency calculation.

## Substitutions and unavailable products

- A substitution is offered only from an explicit substitution group. Show original ingredient, substitute, conversion, preparation note and factual difference/risk note.
- Customer confirmation is required before a substitution replaces the original, unless an approved mapping explicitly allows a named default substitute; even then the replacement is visible and reversible.
- If preferred stock is unavailable, attempt an explicit compatible mapping. If none exists, show available substitutions as choices. If none exists, state `unavailable` and keep the line visible.
- `unmapped`, `unavailable`, `invalid_mapping` and unresolved required lines block “Add selected ingredients” until the customer marks them pantry-owned/deselected. The final review lists every omitted requirement.
- Recipe publication and viewing remain available regardless of product availability.

## Review-before-add contract

Before addition, the review must show:

1. selected servings and scale;
2. every recipe ingredient, including optional, pantry-owned, unmapped and unavailable lines;
3. required, selected pack, pack count, purchased and leftover quantities for each calculated line;
4. selected substitutions and overrides;
5. tool recommendations in a separate unselected section;
6. demo price totals and a statement that prices/availability are simulated snapshots;
7. a final inclusion count and omitted-item summary.

The action label is explicit (for example, “Add 6 selected ingredients”). No item is written to cart until this single confirmed action.

## Cart merge and repeated additions

Each added cart line carries `variant_id`, integer `quantity`, current demo price snapshot and optional recipe attribution entries `{recipe_id, recipe_version, requested_servings, addition_id, quantity_contribution}`.

1. On add, group proposed quantities by `variant_id`.
2. If the cart already contains the same variant, increment its quantity; never create a duplicate visible SKU line.
3. Preserve all recipe attribution entries so quantities can be audited. Ordinary cart edits change the total quantity but do not falsely rewrite recipe history.
4. Repeating the same recipe creates a new unique `addition_id` and merges SKU quantities; it does not silently replace or deduplicate the earlier addition.
5. Different recipes selecting the same SKU also merge quantities while retaining separate attribution entries.
6. Wishlist state has no effect on merge or pack selection.

## Price, availability and staleness

- The review captures catalog `price_inr_minor`, availability and catalog version/timestamp. Immediately before cart mutation, re-resolve every selected variant.
- If price changed, update the line and total, announce “Demo price changed,” and require reconfirmation; do not add during that attempt.
- If a variant became unavailable/discontinued, retain the line as stale/unavailable, offer explicit compatible choices, and require reconfirmation.
- If only descriptive product data changed, refresh it and preserve selections unless compatibility or quantity changed.
- Cart rendering revalidates on load. Stale price lines show old and current demo price; current price is used only after acknowledgment. Unavailable/discontinued cart lines remain visible, excluded from checkout, and removable/replacable.
- A missing/deleted variant becomes `stale_missing`, remains visible from its stored snapshot, and blocks simulated checkout until removed or replaced.

## Atomicity, idempotency and failure

- The confirmed addition is atomic: either all currently valid selected lines merge or none do. Validation failures return the review with line-level states.
- Each confirmation sends a unique `addition_id`. Replaying the same successful ID returns the prior result without incrementing quantities again. A deliberately repeated recipe addition uses a new ID.
- If the active cart adapter fails, no success state is announced and review selections remain recoverable. A deliberate switch to the session-memory fallback is a separate disclosed action; the mutation may then succeed against that adapter without implying durable persistence.
- Animation never owns, delays or determines selection, validation, cart mutation or confirmation state.

## Testable acceptance scenarios

| ID | Given | Expected |
|---|---|---|
| RTC-01 | 4-serving recipe scaled to 6, ingredient 200 g | Required is exactly 300 g before display rounding. |
| RTC-02 | Required 600 g; eligible 250 g and 500 g packs | Default is one of each, purchased 750 g, leftover 150 g. |
| RTC-03 | Required 600 g; 300 g and 500 g packs | Default is two 300 g packs, not a cheaper/better-unit-price 1,000 g combination. |
| RTC-04 | Two equal-quantity combinations | Fewer packs, then fewer SKUs, then lower total price, then stable ID wins. |
| RTC-05 | Optional mapped ingredient | Begins unselected and is not in proposed cart lines. |
| RTC-06 | Suggested pantry item | Visible as pantry-owned/deselected and can be included. |
| RTC-07 | Non-scalable “to taste” item | No pack is auto-selected; explicit choice or omission required. |
| RTC-08 | Preferred variant unavailable with explicit compatible mapping | Compatible option is selected/disclosed; no inferred substitute. |
| RTC-09 | No mapping or availability | Line remains visible and blocks add until explicitly omitted. |
| RTC-10 | Customer overrides to 250 g for 600 g | Three packs, 750 g purchased, 150 g leftover. |
| RTC-11 | Same SKU already in cart at quantity 1; proposal quantity 2 | One cart line at quantity 3 with attribution retained. |
| RTC-12 | Same successful `addition_id` is retried | Cart quantity is unchanged. |
| RTC-13 | Price changes before add | Updated price shown; no mutation until reconfirmation. |
| RTC-14 | Cart variant becomes unavailable | Line retained but excluded from simulated checkout until resolved. |
| RTC-15 | Product allergen data unknown | Review says “Information not provided”; no absence claim appears. |
| RTC-16 | Tool has related product | Tool remains unselected and outside ingredient totals. |

## Assumptions and downstream risks

- **Assumption:** mixed pack sizes within the same parent are allowed unless product metadata disables them; UI must make multi-SKU combinations understandable.
- **Assumption:** cart quantities are integer pack counts and negative quantities are impossible.
- Linear serving scale and explicit conversion limitations from `Recipe_Data_Model.md` apply.
- Large variant sets could make exhaustive combination search expensive; the 24–30-product demo is small, but engineering must test bounds and deterministic equivalence if it optimizes the solver.
- Recipe mapping/content errors can still create implausible recommendations; seed-data review and RTC scenario tests remain mandatory.
