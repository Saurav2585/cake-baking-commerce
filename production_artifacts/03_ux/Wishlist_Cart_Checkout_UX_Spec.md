# Wishlist, Cart and Simulated Checkout UX Specification

## Boundary

These flows are local, session-oriented portfolio-demo experiences. They do not create accounts, reserve inventory, collect personal or payment data, promise delivery, calculate tax/shipping or create real orders. Product availability and price are always described as demo data.

## Wishlist

- Global entry displays a saved-item count; persistence is described as local to this browser where that context matters.
- Each row/card identifies product, fictional product brand, selected or saved variant where known, demo price, demo availability and a remove action.
- Direct add is offered only for one unambiguous available SKU. Otherwise use **Select options** and preserve the wishlist return path.
- Removing keeps focus on the next item, previous item, or empty-state heading in that order and announces the product removed. A session undo may be offered without being the sole confirmation.
- Stale/unavailable items remain understandable and offer view/select-alternative and remove actions; they are never silently replaced.
- Empty state: “Your wishlist is empty” plus Shop and Recipes paths. Persistence failure retains safe in-memory state where possible and discloses its temporary nature.

## Mini cart

The mini cart is a nonessential shortcut; the full Cart route remains available. It shows line identity, variant/SKU label, quantity, current demo unit price, subtotal and View cart. Quantity editing may be deferred to Cart. On open, focus enters its heading/first useful control; modal implementations contain focus, make the background inert, close on Escape and return focus to the invoker. An add-to-cart action may open it only when that behavior is consistent and does not disorient keyboard users; otherwise announce success and leave focus in place.

States: empty, populated, mutation busy, stale price, unavailable item, maximum quantity, persistence failure and retry. Persistent line issues are inline, not toast-only.

## Cart information hierarchy

1. Page heading and persistent demo-commerce disclosure.
2. Blocking issue summary, linked to affected lines, when reconciliation is required.
3. Lines in DOM order: product identity; variant and SKU; demo availability; current unit price; integer pack quantity; line total; source-recipe relationship where present; required/purchased/leftover context where useful; quantity/update/remove actions; line warning/recovery.
4. Summary: items subtotal and **Demo item total**. Shipping and tax read **Not calculated in this demo**—never ₹0.
5. **Continue to demo checkout** and Continue shopping.

Same-SKU additions merge and report previous, added and resulting quantities; different variants remain separate. Quantity errors retain the accepted value. Removal offers session undo where feasible. Recipe attribution is explanatory and is not rewritten by ordinary quantity edits.

### Reconciliation states

- **Price changed:** show previous/current unit price and line effect; require review before checkout.
- **Unavailable/removed:** keep the line visible, exclude it from checkout totals, and offer remove or explicit compatible variant selection.
- **Over limit:** explain the allowed pack quantity and provide an inline correction.
- **Conflict/persistence failure:** retain the last confirmed cart, provide retry, and never announce success.
- Checkout entry is disabled only with a nearby textual reason and issue-summary links; empty cart routes to discovery.

## Simulated checkout

### Entry and content

The heading is **Demo checkout**. Immediately below: **This is a portfolio demo. No payment or real order will be created.** The same meaning appears beside the final action without relying on a checkbox label alone.

Allowed controls are a fixed fictional sample delivery profile, a non-identifying demo delivery option, and required acknowledgement of the simulation. Do not request or persist name, email, phone, street address, PIN code, delivery notes, card, UPI, bank, wallet, CVV, OTP, billing data or consent for marketing.

Order summary repeats products, variants, quantities, demo item total, and the literal **Not calculated in this demo** for shipping and tax. Delivery language must not promise a date. Primary action: **Complete demo checkout**; never “Pay” or an unqualified “Place order.”

### Validation and submission

1. On submit, validate cart revision and reconciliation, sample-profile choice, demo delivery option and acknowledgement.
2. Put a linked error summary before the form, associate each error/hint with its labelled control, and focus the summary after an unsuccessful submit.
3. During submission, retain context, mark the form busy, prevent duplicate activation and announce “Completing demo checkout.”
4. Changed cart returns to an issue summary with the cart intact. A transient failure retains all non-sensitive choices and offers Retry and Return to cart.
5. Idempotent success secures the session-only confirmation before clearing the active cart.

### Confirmation

Heading: **Demo checkout complete**. The next message is **No payment was taken and no real order was placed.** Show the demo reference, item snapshot, demo item total, shipping/tax not-calculated states and Continue shopping/View recipes. Do not label it receipt, invoice or real order confirmation. A direct/expired link explains that the session-only demo confirmation is unavailable and offers Cart and Shop; it does not reconstruct one.

## Interaction announcements and focus ownership

| Event | Focus | Announcement owner/message direction |
|---|---|---|
| Save/remove wishlist | Remains on trigger; after removal follows logical item order | Global polite commerce status: item saved/removed and saved count |
| Add/merge cart line | Remains on initiating control unless user opened mini cart | Global polite commerce status: product, variant, added quantity, resulting cart count |
| Invalid quantity | Invalid field | Field error; error summary only on submit/multi-line block |
| Remove/undo line | Next logical line/summary; undo stays reachable | Cart polite status; one message per completed mutation |
| Reconciliation blocks checkout | Issue-summary heading | Cart blocking status; no duplicate toast |
| Checkout submit error | Error-summary heading | Checkout error summary; field messages referenced, not reread repeatedly |
| Checkout success | Confirmation H1/page-start target | Route-change announcement plus confirmation content; no competing success toast |

## Acceptance checks

- Keyboard-only completion, 320 CSS px reflow and 200% zoom retain all facts/actions.
- No action depends on hover, colour, animation or toast persistence.
- Refresh never restores real personal inputs because none exist.
- Analytics uses `simulated_purchase_complete`, never `purchase`, and contains no personal/free-text data.
- Screen reader testing confirms one owner for each dynamic announcement.

## Traceability

D-004, D-012, D-016; Phase 1 F3/F4/F6; `Cart_and_Checkout_Simulation.md`, `Frontend_Contracts.md`, `Critical_User_Flows.md`; risks R-007, R-013 and R-024.
