# Loading, Empty, Unavailable and Error States

## State principles

Every page and action has explicit `idle`, `loading`, `success`, `empty`, `unavailable`, `invalid` and `error` outcomes where applicable. These states are content and domain behaviour, not visual designs. The last valid state remains usable during recoverable background work. Motion never owns, delays or hides state; all information is available with reduced motion or scripts that disable animation.

Messages use Pantryform’s approved clear, encouraging voice, identify the affected object/action, avoid blame, and give the next valid step. “Information not provided” is reserved exactly for missing critical ingredient, allergen or storage data (D-017); it is not an error and must not be replaced by “safe”, “none” or “not applicable”.

## Global accessibility contract

- Pages retain one logical H1 and semantic header/nav/main/footer landmarks in every state.
- Initial page loading exposes a persistently named main region with `aria-busy=true`; skeletons are hidden from assistive technology and never announce fake content.
- User-initiated outcomes use one concise status: polite for successful updates/counts, assertive only for blocking errors requiring immediate attention. Do not move focus for routine status.
- Blocking modal/drawer errors obey focus containment, Escape where dismissal is safe, explicit Close, and trigger-focus restoration.
- Inline errors are programmatically associated with labelled fields; an error summary links to invalid fields and receives focus after a failed submit.
- Retry controls are real buttons, links navigate, visible focus is retained, targets aim for 44×44 CSS px, and states reflow at 320 CSS px/400% zoom.
- Icons/colour never convey state alone. Content and controls remain understandable without images.

## Page and component state matrix

| Surface | Loading | Empty/unavailable/invalid | Error and recovery |
|---|---|---|---|
| Global navigation | Keep core links; defer counts | Wishlist/cart count zero is factual, not “empty error” | If counts fail, omit badge; navigation remains functional |
| Home/department/category | Named content regions; no false product data in skeleton | Valid department with no items: explain demo assortment and link Shop All/other departments | Preserve navigation; retry affected list; 404 for invalid slug |
| Search suggestions | Input remains operable; announce “Searching” only after meaningful delay | “No suggestions”; Enter can submit full query | Close popup, retain query, allow submit/retry; do not trap focus |
| Search/PLP results | Keep query/chips visible; results region busy | Exact count zero with query/filters and recovery actions; never silently clear constraints | Retain query/filter URL; Retry and Shop All; announce once |
| PDP | Resolve parent before enabling selection/add | Valid product unavailable: factual details remain, Add disabled, wishlist allowed; invalid variant removed/fallback only with notice | 404 invalid parent; variant/price failure blocks Add and offers retry/back to category |
| Variant selector | Disable only unresolved choice; show textual loading | Sold-out/demo-unavailable value remains labelled where comparison is useful; conflicting/missing SKU is invalid, not selectable | Restore prior valid selection; announce failure; no automatic different variant add |
| Wishlist | Local state restores synchronously where possible | Explain no saved items; links to Shop All/Recipes | Corrupt storage resets only the affected store after warning; browsing continues |
| Mini cart/cart | Show known lines; busy only on affected mutation | No lines: Shop All/Recipes; unavailable/stale lines remain identifiable and excluded from checkout | Failed mutation restores prior quantity; retry/remove; never show optimistic success after failure |
| Recipe list/detail | Structure visible while data resolves | No recipes or invalid slug; links to Recipes/Shop All | Retry recipe content; recipe-to-cart unavailable does not hide the readable recipe |
| Recipe scaling/mapping | Keep current servings until recalculation completes; review unavailable during unresolved mapping | Optional/pantry-owned/tools visibly unselected; unmapped/unavailable lines remain in review with reason | Restore last valid scale/mapping; retry affected mapping; never silently substitute/add |
| Checkout | Validate cart before entry; clear demo disclosure always visible | Empty cart redirects to cart with message; stale/unavailable lines block progression until reviewed | Preserve safe local cart; field summary + inline errors; retry step without duplicate confirmation |
| Confirmation | Generate only after explicit simulated submit | Direct/expired reference shows no order claim and links to cart/home | Failure states “Demo confirmation could not be created”; no purchase/order event; retry idempotently |
| Images/media | Reserve dimensions; neutral placeholder | Missing media uses factual title context; decorative media can disappear | Broken media never blocks selection or exposes misleading substitute |
| Informational pages | Normal document loading | Missing optional section omitted; required legal/demo disclosure cannot be omitted | 404 invalid route; retain global recovery |

## Search and filter detail

No-results copy includes submitted query and active filter summary. Recovery order: remove an individual chip, Clear all filters (preserving query), clear search, browse relevant department/category, Shop All/Recipes. A deterministic spelling suggestion may be offered but never auto-applied. Mobile staged filter failure retains the drawer and selections; Apply announces the failure and offers Retry/Cancel.

## Product and availability detail

Availability is variant-owned and one of the approved demo states defined by the product model. Parent availability is derived, never independently asserted. Rules:

- No available variants: keep useful PDP content, disable Add, label “Unavailable in this demo”, and present factual navigation alternatives—not automatic substitutes.
- Selected variant becomes stale/unavailable: retain selection, block Add, explain, and let the user choose another variant.
- Price missing/invalid: do not display ₹0 or allow Add; identify data problem as “Price unavailable in this demo”.
- Critical ingredient/allergen/storage value absent: show “Information not provided”; the product may remain browseable, while publication/add eligibility follows catalog validation and safety policy.
- Unknown certifications, compatibility, food-contact safety, tolerance or performance never become affirmative or negative claims.

## Cart concurrency, stale data and persistence

Cart operations are atomic by variant ID. Disable the affected mutation during commit, not the whole page. On failure, revert to the last confirmed quantity and announce it. Repeated presses cannot create duplicate mutations. If local persistence is corrupt, quarantine/reset only cart data, tell the user it could not be restored, and never affect unrelated storage.

At cart view and `begin_checkout`, revalidate demo variant existence, demo availability and price against the current data version:

- price changed: preserve line, show old/new demo price, require acknowledgement before checkout;
- unavailable/removed: preserve a clearly marked line for review but exclude it from payable/demo total and block checkout until removed or changed;
- quantity exceeds configured demo limit: retain requested context, set a valid maximum only after explicit confirmation;
- stale title/image only: refresh display from catalog without changing variant identity;
- unknown variant: block purchase action and offer Remove/return to PDP.

No live inventory, reservation, delivery, tax or fulfilment promise is inferred.

## Recipe-to-cart edge states

The review step must always show required, selected pack, purchased and leftover amounts (D-016). Deterministic handling:

- zero/negative/non-numeric servings: inline invalid state; keep last valid calculation;
- conversion unavailable or dimensions incompatible: line is unmapped and excluded, with explanation;
- no sufficient single pack: use the rule-defined smallest sufficient multiple; if none, mark unavailable;
- ingredient already owned: explicit deselection, never inferred;
- optional ingredient/tool: unselected by default and never silently added;
- substitution: requires explicit choice and shows changed product/variant/quantity;
- selected pack becomes unavailable/stale: retain line for review, block that line, do not auto-substitute;
- repeated recipe addition: show merge/new-line outcome before confirmation; successful merge uses variant identity;
- partial batch: unresolved/unavailable lines must first be explicitly omitted; after that acknowledgement, the remaining valid selected set is the confirmation batch, with exact selected and skipped counts shown;
- mutation failure: the confirmed valid set is atomic—either every selected line merges or none does. Keep selections recoverable, identify changed/invalid lines for a fresh review, and retry idempotently without duplicates.

## Checkout simulation safeguards

Every checkout step and confirmation states: “Demo checkout—no payment will be taken and no order will be fulfilled.” No payment control, real delivery/tax promise or order-service call exists. Collect the minimum synthetic fields needed to demonstrate validation; labels say demo data and discourage real personal data. Do not persist checkout fields after confirmation/session reset.

The final action is “Complete demo checkout”, not Pay/Place order. The result is “Demo confirmation”, uses an ephemeral demo reference, and explicitly states no order was created. Refresh/retry is idempotent and cannot generate multiple analytics completion events for the same confirmation.

## HTTP and systemic failures

- 404: name the missing page, keep global navigation, offer Search, Shop All and Recipes; return HTTP 404.
- 410: removed content with safe related navigation; do not redirect generically.
- Offline/network/provider failure: explain which content/action is unavailable, retain local state, Retry; analytics/provider failure stays invisible and non-blocking.
- Unexpected error boundary: preserve the closest stable shell, use a reset/retry action, log a sanitized correlation ID, and never expose stack traces or secrets.
- Validation/data-contract failure: fail the affected record closed for commerce actions and surface it to QA/catalog diagnostics; do not fabricate defaults.

## Status message patterns

Directional, not final UI copy:

- Success: “250 g Cocoa Blend added to your demo cart.”
- Quantity: “Quantity updated to 2.”
- Search: “18 products found.” / “No products found for ‘…’ with these filters.”
- Unavailable: “This pack is unavailable in the demo. Choose another pack.”
- Recipe partial: “5 items added; 2 unavailable items were not added.”
- Data: “Price unavailable in this demo.” / “Information not provided.”
- Failure: “We couldn’t update that quantity. It remains 1. Try again.”

Dynamic messages use text content APIs, never unsafe HTML. Avoid repeated announcements from rerenders.

## Acceptance tests

1. Each inventoried surface renders loading, empty/unavailable, invalid and failure outcomes without layout/semantic loss.
2. Keyboard focus is predictable for drawers, dialogs, validation summaries, retries and recovery navigation.
3. Screen-reader status is concise, correctly prioritized and emitted once.
4. PDP/cart never add an ambiguous, invalid, stale or unavailable variant.
5. Unknown critical data uses the exact approved phrase and no inferred alternative.
6. Recipe optional/tools/substitutions/unavailable mappings require explicit review and produce deterministic partial outcomes.
7. Cart price/availability revalidation blocks misleading simulated checkout.
8. Checkout/confirmation cannot be mistaken for payment or a real order and emits no real purchase event.
9. Reduced motion and failed media/analytics do not remove content or block commerce state.
10. Error output contains no secrets, provider credentials, stack traces or personal data.

## Dependencies and risks

- Exact availability enums, transaction atomicity and recipe mapping contracts must be reconciled with companion Phase 2B models.
- Synthetic checkout fields need explicit PM/UX definition; real personal data collection is prohibited.
- Persisted local demo data can become stale across catalog versions; migration/reset messaging must be implemented and tested.
- Status over-announcement is a material accessibility risk; centralize message ownership per action.
