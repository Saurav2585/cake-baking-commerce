# Critical User Flows

Architecture-level sequences and state requirements only; no wireframes.

## Shared flow rules

- Every mutation has a visible result and programmatic status announcement; focus is preserved or deliberately moved.
- Back navigation restores prior query, filters, sort and list position when feasible.
- Variant-dependent price, availability and image update atomically.
- Animations decorate state transitions only; content and actions exist without animation and respect reduced motion.
- Demo checkout language remains visible before and after entry; no real order/payment is implied.

## F1 — Browse to simulated confirmation

`Home → Department → PLP → PDP → select variant → add → cart → simulated checkout → confirmation`

1. Department entry provides categories and relevant discovery context.
2. PLP defaults deterministically and exposes result count, filters and sort.
3. PDP requires a sellable/available variant before add; ambiguous cards use “Select options”.
4. Add merges by SKU plus line configuration; announce product, variant, quantity and cart count.
5. Cart exposes quantity, remove, stale/price/unavailable states and demo subtotal.
6. Checkout opens with “Demo checkout—no payment will be taken and no order fulfilled.”
7. Valid safe demo inputs create an ephemeral demo order ID and confirmation; event is `simulated_purchase_complete`, never `purchase`.

Recovery: invalid slug → 404/recommend search; unavailable variant → alternatives/variant chooser; persistence failure → retry/local fallback notice; validation errors link to fields.

## F2 — Search to cart

`Search control → suggestions/results → PDP → variant → cart`

- Suggestions group Products, Categories, Brands and Recipes with keyboard listbox/combobox semantics.
- Submission always reaches a results page; zero results retain the query and provide spelling/category recovery.
- Search/filter/sort changes update visible result count and an appropriate polite live status without moving focus on every keystroke.
- Selecting a suggestion/result records its type and position without exposing personal query data beyond the demo session.

## F3 — Recipe to cart

`Recipe detail → scale servings → begin mapping → review → edit mapping → add selected ingredients → cart`

1. Scaling calculates deterministic required quantities; original and selected servings remain visible.
2. Pantry-owned items may be deselected; optional ingredients and tools begin unselected.
3. Each purchasable ingredient shows required, selected SKU/pack count, purchased and leftover quantity.
4. Default is the smallest sufficient compatible pack, not lowest unit price (D-016).
5. Unavailable/no-match rows block only their own add and expose substitution/manual review.
6. Explicit review precedes one atomic add action for selected ingredient lines.
7. Existing matching SKU lines merge quantities and preserve `sourceRecipeIds`; repeated recipe additions are never silently deduplicated.
8. Post-add summary reports added, merged, skipped and unresolved items.

## F4 — Wishlist to product/cart

`Wishlist toggle → wishlist → PDP or direct add → cart`

- Wishlist is local/demo and needs no account; its persistence limitation is disclosed where useful.
- Direct add is permitted only when the saved item has an unambiguous available default SKU; otherwise open PDP/options.
- Removing an item announces the result and keeps logical focus near the next item/empty state.

## F5 — Mobile navigation and filters

1. Open labelled menu; focus moves to drawer heading/first control and remains contained.
2. Expand one department branch at a time; links remain true links.
3. Close/Escape returns focus to opener.
4. Mobile filters open as a labelled modal/drawer with current count; changes may be staged.
5. Apply closes, restores focus to filter trigger, updates URL/result count and announces outcome. Clear all is explicit and reversible before apply where staged.

## F6 — Error and unavailable recovery

- Route/data failure: retain global navigation, identify what failed, offer retry and a stable escape path.
- Stale cart: identify affected lines; require acknowledgement/review before checkout.
- Checkout refresh: safely restore non-sensitive cart/step state; never retain personal form entries by default.
- Confirmation deep link without ephemeral order: explain that demo confirmation expired and link to shop/cart.
- Offline/persistence failure: preserve in-memory actions where safe, disclose loss risk and avoid claiming success.

## Testable accessibility outcomes

- All steps complete with keyboard alone at 320 CSS px and 200% zoom/reflow conditions.
- Drawer/dialog focus is trapped only while modal, Escape works, and opener focus returns.
- Errors are associated with labels, summarized, and announced once without interruptive repetition.
- Dynamic totals, results and cart mutations use concise status messages; no meaning relies on colour.

