# Cart and Checkout Simulation

## Scope

This specification makes the v1 cart and checkout behavior testable while preserving the no-real-commerce boundary. All product, availability, price, delivery, tax and confirmation data is fictional or simulated. No real transaction, order, inventory reservation or delivery commitment occurs.

## Cart line contract

A line records:

- stable line ID and sellable SKU;
- parent product ID and selected variant label for recovery/display;
- positive integer quantity;
- observed unit price in paise and observed catalog revision;
- current reconciliation state;
- source attribution: `manual`, `recipe`, or both, including recipe/mapping IDs where relevant;
- optional user-visible mapping context (required, purchased and leftover normalized quantities);
- created/updated timestamps that do not identify a person.

Product claims and safety data are referenced from the catalog, never copied into an editable cart field.

## Cart actions and transitions

| Action | Preconditions | Success | Failure/recovery |
|---|---|---|---|
| Add variant | SKU exists; quantity is valid | Create line or merge same SKU; announce resulting quantity | Return `invalid_quantity`, `unavailable`, `not_found` or `limit_exceeded`; retain prior cart |
| Add recipe selection | Review explicitly confirmed | Add only selected available mappings; merge by SKU; report skipped rows | Keep review selections and identify unresolved rows; no silent optional/tool addition |
| Change quantity | Existing line; integer ≥1 | Reprice/reconcile and announce | Keep previous quantity and focus error at control |
| Remove line | Existing line | Remove; provide session undo where feasible | No state change; report stale action |
| Undo removal | Undo snapshot is current and SKU valid | Restore then reconcile | Explain expiry/unavailability; do not invent substitute |
| Select another variant | Compatible user choice | Replace line identity only after explicit confirmation; reconcile | Original line remains |
| Move wishlist item to cart | Available SKU selected | Add/merge in cart; wishlist retention/removal is explicit | Wishlist item remains |
| Begin checkout | Non-empty, reconciled cart; disclosure acknowledged | Lock submitted revision; enter `checkout_submitting` | Route to review issue(s); focus error summary |
| Complete simulation | Idempotent request valid | Store session-only simulated confirmation; clear active cart only after result is secured | Return to active/review state with cart intact |

## Recipe-to-cart merge behavior

1. The review step supplies explicitly selected SKU quantities; cart does not recompute mappings.
2. When a SKU already exists, add requested pack count to existing quantity.
3. Preserve the manual quantity and append recipe attribution rather than replacing the line's origin.
4. On repeated addition of the same recipe revision, show the resulting increment before confirmation; never deduplicate silently.
5. If mapping changed since review, block addition for affected rows and request refreshed review.
6. Unavailable or unresolved rows remain excluded and listed. Available selected rows may be added only through an explicit partial-add confirmation.
7. Purchased and leftover values shown on a merged line are explanatory recipe contexts, not a claim that the whole cart quantity is allocated.

## Stale, repriced and unavailable lines

- Reconcile on cart entry, before checkout, and after a persisted-cart load.
- A price change displays old and current unit price and line impact. Totals use the current price only after the user reviews the change.
- An unavailable line remains in place, excluded from checkout totals, with remove and compatible-variant recovery actions.
- A removed SKU retains only safe snapshot text so the user understands the issue; it cannot be checked out.
- A restored SKU does not auto-reactivate a previously removed line; the user confirms it.
- Availability is always labelled “Demo availability” and never implies live stock.

## Totals

- `itemsSubtotal = Σ(currentUnitPricePaise × acceptedQuantity)` for valid/reviewed lines.
- No live discount, shipping, delivery fee or tax is calculated.
- If a visual summary needs those rows, use “Not calculated in this demo,” not ₹0, because zero implies a real calculation.
- `demoTotal` equals items subtotal and is labelled “Demo item total,” not “Amount charged” or “Amount due.”
- Formatting uses `en-IN`, `INR`, two-decimal capability and integer paise arithmetic.

## Checkout data-minimization model

### Allowed

- A fixed selectable sample profile, e.g. “Demo delivery profile — Bengaluru, Karnataka,” with no real street address, phone or email.
- Session-only fictional values clearly labelled as examples.
- Non-identifying delivery-method simulation such as “Standard demo delivery — date not promised.”
- Explicit acknowledgement: “This is a portfolio demo. No payment or real order will be created.”

### Prohibited

- Payment card, UPI, bank, wallet, CVV, OTP or billing credential inputs.
- Real name, phone, email, street address, PIN-code serviceability or free-text delivery note collection.
- Persistence, analytics or URL serialization of checkout draft fields.
- “Pay,” “Place order,” “Order confirmed,” “Receipt,” guaranteed delivery date or statutory invoice language without the “demo/simulated” qualifier.

The primary action is **Complete demo checkout**. The result heading is **Demo checkout complete**, followed immediately by **No payment was taken and no real order was placed.**

## Validation sequence

1. Reconcile cart against current demo catalog revision.
2. Block on unavailable, removed, over-limit or unreviewed price-change lines.
3. Require a non-empty valid cart.
4. Validate only the selected sample profile/delivery option; no personal fields exist.
5. Require the demo acknowledgement.
6. Freeze the cart revision and submit with an idempotency key.
7. Return the simulated result or a typed recoverable failure.
8. Emit `simulated_purchase_complete` only after the result is secured; never emit `purchase`.

## Error and interruption states

| State | Message intent | State preservation | Focus/announcement |
|---|---|---|---|
| Cart persistence unavailable | Changes work for this session but may not survive refresh | Keep memory state | Polite status; persistent warning near cart heading |
| Catalog refresh failed | Current availability/price cannot be confirmed | Keep last snapshot; block checkout | Alert and focus recovery summary |
| Checkout validation failed | Identify every actionable line/problem | Cart and draft intact | Summary receives focus; errors linked to controls |
| Duplicate activation | One simulation is already processing | Ignore duplicate safely | Button exposes busy/disabled semantics and status |
| Simulation provider failure | No order/payment occurred; retry is safe | Cart and acknowledgement retained | Alert; focus retry heading/action |
| Confirmation refresh/direct URL | Confirmation unavailable outside originating session | No personal data recoverable | Explain and link to cart/shop |

Error text is specific, plain-language and not colour-dependent. Motion cannot delay error rendering or focus movement.

## Confirmation contract

The confirmation view contains:

- persistent demo banner and mode label;
- synthetic `Demo reference` (not styled or described as a real order number);
- item snapshot with SKU/variant, quantity and current demo INR price;
- “Demo item total”; shipping/tax marked not calculated;
- simulation timestamp;
- no payment or real order statement;
- accessible start-over/shop actions.

It contains no customer record, payment method, invoice, shipment tracking, delivery promise, review request or transaction analytics.

## Acceptance scenarios

1. Same SKU added twice merges predictably and announces the new quantity.
2. Two variants of one product remain separate lines.
3. A repeated recipe addition shows and applies an explicit increment while preserving source attribution.
4. Optional ingredients, pantry-owned items and tools are absent unless selected.
5. A changed price or unavailable SKU blocks checkout until addressed.
6. Shipping/tax display as not calculated, never a misleading zero.
7. Checkout asks for no real personal/payment information and persists none.
8. Double activation produces one simulated confirmation.
9. Refreshing a session-only confirmation exposes no data and offers recovery.
10. With reduced/no animation, every action, error, status and focus transition remains complete.

