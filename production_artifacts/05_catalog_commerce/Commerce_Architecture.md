# Commerce Architecture

## Purpose and authority

This artifact defines Pantryform's v1 commerce boundary and its replaceable future seams. It implements D-003, D-004, D-012, D-013, D-016 and D-017 without prescribing framework code, vendors or UI composition. V1 is a local portfolio/demo: it takes no payment, creates no real order, authenticates no customer, reserves no inventory and calculates no live tax, delivery price or serviceability.

## Architectural principles

1. **The domain owns meaning.** Product, variant, recipe mapping, cart-line and checkout-result shapes are provider-neutral. Screens consume domain results rather than provider payloads.
2. **The sellable variant is the commerce unit.** SKU, INR price, demo availability and purchasable quantity belong to a variant. Parent products are discovery records, not cart lines.
3. **The latest catalog snapshot is authoritative.** A cart preserves the user's prior snapshot for comparison, but every cart view and checkout attempt reconciles against the current demo catalog.
4. **Simulation is data, not fine print.** Commerce results carry an explicit `mode: demo` and presentation-safe disclosure. “Order” and “purchase” language must be qualified as simulated.
5. **Unknown is not false.** Critical ingredient, allergen and storage facts preserve `known`, `information_not_provided` and `not_applicable`; commerce layers cannot infer or coerce them.
6. **State is independent of animation.** A domain action completes whether motion is enabled, reduced, interrupted or unavailable. Animation observes committed state and never gates input, persistence or navigation.
7. **Accessibility is contractual.** Status, errors, focus targets and semantic labels are returned or derivable from state; they are not animation callbacks or colour-only indicators.

## V1 system boundary

```text
Catalog/recipe fixtures
        ↓
Provider-neutral domain services
        ↓
Search • wishlist • recipe mapping • cart • demo checkout
        ↓
Local adapter (memory and/or explicitly approved browser storage)
        ↓
Accessible presentation state + demo analytics adapter
```

The local adapter may retain non-sensitive wishlist and cart identifiers, quantities and timestamps. It must not persist names, phone numbers, email addresses, street addresses, payment data, government identifiers or free-text customer notes. The default checkout uses non-identifying sample values or session-only fields and clears them on exit/refresh according to the approved UX specification.

## Authoritative objects

| Object | Authority | Mutable in v1 | Notes |
|---|---|---:|---|
| Product and variant | Catalog provider | No | Fictional demo records; variant owns price and availability. |
| Wishlist | Wishlist/cart persistence adapter | Yes | Stable variant or product references; invalid references are recoverable. |
| Cart | Cart domain + persistence adapter | Yes | Lines retain selected SKU, quantity, source and observed snapshot. |
| Recipe mapping | Recipe domain | User overrides only | Mapping is deterministic from recipe quantities and compatible variants. |
| Checkout draft | Session memory | Yes | No persistent personal data. |
| Checkout result | Demo checkout provider | Append-only for current session | Non-transactional confirmation with synthetic reference. |
| Analytics | Analytics adapter | Event append only | No PII; simulated completion has a distinct event name. |

## Replaceable provider seams

These are capability boundaries, not instructions to implement integrations in v1.

| Provider | Required responsibilities | Must not leak into domain/UI |
|---|---|---|
| Catalog provider | Fetch products, variants, departments, recipes and current demo price/availability snapshots | CMS-specific IDs, query syntax or response envelopes |
| Inventory provider | Return normalized availability and optional purchasable limit by SKU | Vendor stock codes or unsupported delivery promises |
| Cart persistence | Load/save versioned cart state and report conflicts/failure | Browser-storage or remote-cart mechanics |
| Checkout provider | Validate a checkout request and return typed success/failure | Gateway tokens, payment terminology in demo mode |
| Customer identity | Optional future customer reference and consented profile access | Authentication/session SDK objects |
| Order service | Future idempotent order submission and status retrieval | Provider-specific order statuses |
| CMS | Resolve editorial/product/recipe content into approved domain records | Draft/publishing internals |
| Analytics | Accept allow-listed, non-PII domain events | Vendor event APIs and cookies |

Each boundary must support an explicit `demo` implementation. A future live adapter can replace it only after a separate approval covering privacy, security, tax, inventory, fulfilment and payment obligations.

## Commerce state model

### Cart lifecycle

`empty → active → needs_review → active → checkout_ready → checkout_submitting → simulated_confirmed`

- `empty`: no valid lines.
- `active`: all current lines reconcile and quantities are valid.
- `needs_review`: one or more lines are stale, unavailable, removed, repriced, over-limit or otherwise changed.
- `checkout_ready`: reconciliation passed and the user acknowledged the demo disclosure.
- `checkout_submitting`: one idempotent local simulation request is pending; repeat activation is disabled semantically, not by animation.
- `simulated_confirmed`: a synthetic, non-payable result exists for the session.

Any persistence or provider failure yields a typed recoverable `error` alongside the last safe state; it must not destroy the cart. A catalog change can return `checkout_ready` to `needs_review`.

### Cart reconciliation

For every line, compare `sku`, current existence, availability, quantity constraints and observed unit price against the latest catalog snapshot:

| Condition | Result | User control |
|---|---|---|
| Unchanged | `valid` | Change quantity or remove |
| Price differs | `price_changed` | Show previous/current INR price; require review before checkout |
| Availability becomes unavailable | `unavailable` | Preserve line visibly; remove or choose a compatible variant |
| SKU no longer resolves | `removed` | Preserve a minimal snapshot; remove line; never silently remap |
| Quantity exceeds current limit | `quantity_adjustment_required` | User selects an allowed quantity or removes |
| Snapshot/version is old but commerce facts match | `refreshed` | Inform non-blockingly; replace snapshot |

The system never silently deletes, substitutes, reprices as accepted, or lowers a quantity. Reconciliation is deterministic and repeatable for the same cart and catalog versions.

## Quantity, merge and source rules

- A cart identity key is the sellable `sku` plus only approved customization dimensions. V1 has no free-form customization.
- Adding the same SKU merges quantities, subject to integer quantity and optional maximum constraints.
- Adding a different variant creates a separate line, even when parent product is identical.
- Repeated recipe additions merge matching SKUs but preserve additive source attribution: manual, recipe ID(s), and mapping revision(s).
- Merge output reports previous quantity, requested increment, final quantity and any rejected remainder.
- Optional recipe ingredients, pantry-owned ingredients and tools are excluded unless explicitly selected.
- Cart monetary totals are derived from current integer minor units (paise); display uses INR. Floating-point arithmetic is prohibited at the contract level.
- Compare-at price is informational only when valid and greater than the current price; it never changes totals.

## Checkout boundary

Checkout validates current lines, demo disclosure acknowledgement and only the minimal approved sample fields. It does not collect or validate real payment instruments, reserve stock, promise delivery, calculate statutory tax, create an invoice, send messages or call an order system.

The simulated result includes:

- `mode: demo`;
- synthetic confirmation reference clearly labelled “Demo reference”;
- confirmed cart snapshot and INR display total;
- timestamp and catalog version;
- explicit “No payment was taken and no real order was placed” message;
- restart-shopping action and optional printable summary that contains no PII.

Analytics emits `simulated_purchase_complete`, never `purchase`, for this result.

## Failure and concurrency policy

- Persistence failure switches explicitly to a session-memory adapter, keeps the cart usable and exposes a persistent warning that refresh may lose it. Demo checkout may continue only after successful reconciliation in that adapter; no durable-save claim is made.
- Duplicate checkout requests use a client-generated idempotency key; the demo provider returns the same result for the same key and cart revision.
- Two-tab/cart-version conflict returns `conflict` with current and attempted revisions. The user can reload the current cart or deliberately apply the local change; no last-write-wins data loss.
- Invalid or corrupted persisted data is quarantined logically, replaced with a safe empty cart and reported as recoverable; raw content is not displayed.
- An offline state may support already-loaded local fixtures but cannot claim live availability.

## Accessibility and motion invariants

- Every mutation returns a concise status message suitable for a polite live region; blocking errors return field/summary references suitable for assertive announcement and focus movement.
- Drawers and dialogs require labelled semantics, initial focus, focus containment while modal, Escape behavior where safe and focus restoration to the invoker.
- Quantity and variant controls expose programmatic names, current values, limits and errors; all actions are keyboard operable with visible focus.
- Target size goal is 44 × 44 CSS px; content and controls reflow at 320 CSS px without loss or two-dimensional scrolling except intrinsically scrollable content.
- Price, availability and validation never rely on colour alone.
- Reduced motion or missing JavaScript animation cannot hide content, delay state commitment or prevent navigation/recovery.

## Explicitly deferred

Authentication, saved customer profiles, live inventory, promotions, coupons, GST/tax logic, serviceability, shipping quotes, payments, real orders, invoices, refunds, returns processing and provider webhooks are outside v1. Their seams above are deliberately narrow; no provider or speculative workflow is selected.

## Architecture acceptance checks

- [ ] Every cart line resolves to a variant/SKU rather than a parent product.
- [ ] Price, availability and quantity changes produce deterministic review states.
- [ ] Demo checkout cannot emit a real purchase event or imply payment/order creation.
- [ ] No PII or payment data is persisted.
- [ ] Provider payloads do not enter frontend contracts.
- [ ] Commerce remains correct with motion disabled.
- [ ] Keyboard, focus, announcement, error and reflow needs are represented upstream of UI design.
