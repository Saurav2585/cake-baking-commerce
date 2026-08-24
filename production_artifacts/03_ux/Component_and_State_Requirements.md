# Component and State Requirements

This inventory defines behavioral contracts, not visual styling or implementation components.

## Shared state model

Every data-bearing surface considers: initial/default, loading, populated, empty where meaningful, partial, unavailable/stale, validation failure, mutation failure and route/data error. Loading preserves page heading and escape navigation. Partial failures isolate failed regions. Recovery labels the action and preserves safe user input.

## Global and discovery components

| Component | Required states | Interaction/accessibility contract |
|---|---|---|
| Header/global nav | desktop/mobile; disclosure closed/open; current destination | True links; disclosure state exposed; drawer focus contained/returned; no hover-only path |
| Search combobox | idle, typing, loading, grouped suggestions, no suggestions, error | Labelled combobox/listbox; arrows move active option, Enter selects, Escape closes, Tab exits; submission always reaches results |
| Breadcrumbs | normal, wrapped, unavailable parent | Labelled nav, current page identified; wrap without hiding context |
| Product card | default, focus/hover equivalent, wishlisted, add/select options, unavailable, image failure, mutation error | Whole card not nested interactive controls; factual pack/price/availability; status not colour-only |
| Filter group/chip | unselected, selected, disabled with reason, invalid URL, staged/applied | Native groups; removable chip named by filter/value; Clear all explicit |
| Mobile filter drawer | closed/open, staged changes, applying, error | Apply/Cancel semantics; result count; contained focus; no URL change until Apply |
| Sort | default, selected, invalid URL | Labelled native select/menu; deterministic fallback; announces updated result summary |
| Pagination/load more | initial, loading, end, failure | Prefer links for pages; preserve focus/list position; retry local to failed continuation |

## Product and recipe components

| Component | Required states | Interaction/accessibility contract |
|---|---|---|
| Media gallery | loaded, loading, missing, failed | Informative alt; thumbnail selection state; product actions independent of media |
| Variant selector | required-unselected, selected, unavailable, invalid combination, stale | Expose label, pack/dimensions, price, unit price and availability together; atomic update/status |
| Quantity control | min, valid, max, invalid, over limit | Editable integer pack count with increment/decrement; preserve prior accepted value on failure |
| Product facts | known, not applicable, information not provided | Ingredients/allergens/storage never silently omitted; headings and tri-state wording explicit |
| Servings control | base, changed, invalid, recalculating | State range/step; retain last valid review; announce aggregate recalculation once |
| Recipe mapping row | ready, pantry-owned, optional-unselected, needs choice, unmapped, unavailable, invalid/stale mapping, substitute, override | Always visible; associate required/selected/purchased/leftover/price; explicit include and reset |
| Recipe add summary | none selected, all mapped, partial acknowledged, validating, add failure, success | Lists included/omitted; one atomic action; post-add reports added/merged/skipped/unresolved |

## Commerce components

| Component | Required states | Interaction/accessibility contract |
|---|---|---|
| Wishlist toggle | unsaved, saved, busy, persistence failure | Stable accessible name/state; leave focus; announce result/count once |
| Mini cart | closed, empty, populated, busy, issue, failure | Shortcut only; labelled overlay; focus containment/return when modal; persistent issues inline |
| Cart line | current, quantity editing, price changed, unavailable, removed SKU, over limit, removing, failure | Variant/SKU/unit price/source context; issue and recovery adjacent; unavailable excluded from totals |
| Cart summary | empty, active, needs review, checkout ready | Items subtotal and demo item total; shipping/tax literal not-calculated wording; linked issue summary |
| Error summary | hidden, populated | Focus after failed submit/block; count/nature of issues; links move focus to controls/lines |
| Demo checkout form | initial, field invalid, cart changed, submitting, failure | Fixed fictional choices only; no PII/payment fields; duplicate submit prevented; selections retained on failure |
| Confirmation | valid session, partial snapshot, expired/direct visit, error | Demo wording adjacent to H1; no real order language; stable escape links |

## Feedback components

- **Inline message:** owns persistent component fact/error; associated through semantic description.
- **Global polite commerce status:** owns completed wishlist/cart actions only.
- **Results summary:** owns search/filter/sort count changes.
- **Error summary:** owns blocking multi-control failures and receives focus.
- **Toast:** optional visual echo only; must not duplicate live announcements or hold required recovery.
- **Skeleton/progress:** conveys busy state without simulating loaded text, shifting focus or hiding navigation.

## State-transition rules

1. User intent updates a pending state without discarding the last confirmed state.
2. Validate locally, then reconcile against the current demo revision.
3. Commit the change atomically; on failure restore/retain the confirmed state.
4. Render persistent result/error at its owning component.
5. Issue one appropriate announcement after commit, then place focus only when blocking, route-changing or removing the focused element.

Animation is never a transition precondition. Reduced-motion behavior renders the same final state immediately.

## Responsive component transformation

Dense comparison rows become labelled cards/definition groups below their readable width; semantic associations remain explicit. Drawers gain internal scrolling and safe-area-aware actions. Sticky duplicates reflect the same underlying control state and never create duplicate accessible actions at once. Long names and currency values wrap.

## Acceptance matrix

| Concern | Required evidence later |
|---|---|
| Completeness | Each critical route maps its components to every applicable shared state |
| Keyboard/focus | Tab order, dialog containment/return, removal focus and summary links verified |
| Announcements | Single-owner audit for results, variants, recipes, cart and checkout |
| Responsive | All components exercised at 1440, 1280, 1024, 768, 430, 390, 360 and 320 CSS px |
| Safety | No PII/payment fields, real-order events, live-stock or delivery claims |
| Data confidence | Unknown critical facts render “Information not provided” exactly |
| Motion | Full interaction works with animation unavailable and reduced motion enabled |
