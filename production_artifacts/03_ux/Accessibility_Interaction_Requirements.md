# Accessibility and Interaction Requirements

Target WCAG 2.2 AA-oriented behavior. These requirements are binding inputs to design, engineering and QA; conformance must be tested, not assumed.

## Page structure and navigation

- Provide a first-focus skip link to `main`; use named banner, navigation, main and contentinfo landmarks, with complementary only for meaningful supporting content.
- Give every route a unique descriptive title, one descriptive H1 and ordered headings. Breadcrumbs use a labelled navigation landmark and identify the current page.
- On client route change, move focus to a page-start target/H1 and announce the new page title once. Browser Back restores query/filter/sort and list position where feasible.
- Links navigate; buttons disclose or mutate. Every control has a persistent accessible name matching or containing its visible label.

## Keyboard, focus and targets

- Every function works with keyboard alone in a logical DOM order. Visible focus is never obscured by sticky UI.
- Modal drawers/dialogs have a programmatic name, initial focus chosen for the task, contained Tab order, Escape close, inert background and deterministic return to the invoker. Nonmodal disclosures do not trap focus.
- Menus are not required for ordinary site navigation; disclosure buttons expose `aria-expanded` and association. Search suggestions follow combobox/listbox active-descendant behavior without trapping Tab.
- Target-size goal is 44×44 CSS px. Any smaller target must meet WCAG 2.2 target-spacing/exception conditions and be logged for QA.
- Drag, hover, pointer precision, colour and gestures are never the only means of use.

## Forms, selection and errors

- Use visible labels; hints precede errors in accessible descriptions. Required state is conveyed in text and programmatically.
- Validation does not erase entries. On submitted-form failure, focus a linked error-summary heading; activating a summary link focuses the field. Inline errors have stable IDs.
- Variant, filter, servings, pantry-owned and substitution controls expose selected/pressed/checked/expanded state using native semantics where possible.
- Disabled actions have an adjacent reason; avoid disabling when a submit-triggered explanation is more understandable.
- Quantity steppers include a directly editable labelled numeric control, limits and unit/pack context. Errors state the accepted range.

## Dynamic status and ownership

Use one persistent polite status region for nonblocking global commerce actions and a separate assertive/error-summary pattern only for blocking failures. Update text once after the state is committed; do not duplicate the same message in a toast, component live region and page live region.

| Interaction | Owner | Required status |
|---|---|---|
| Search results/filter/sort | Results summary | result count and applied change after commit; no per-keystroke chatter |
| Search suggestions | Combobox semantics | active option through active descendant; loading/no results only when useful |
| Variant selection | PDP purchase summary | variant, pack/dimensions, demo price and availability changed |
| Wishlist/cart mutation | Global commerce status | item/variant, action, resulting quantity/count |
| Recipe recalculation | Recipe review summary | servings and number of mapped/unresolved selected items |
| Recipe line override | That line’s described status | purchased/leftover change and any issue; final aggregate announced separately |
| Blocking cart/checkout error | Error summary | number/nature of issues, with links; focus moves here |
| Route completion | Page-start target | new title; confirmation text is ordinary content, not a second live alert |

Busy operations use semantic busy state and retain headings/recovery navigation. Progress announcements are concise and not timer-driven.

## Content alternatives and state semantics

- Status includes text/icon semantics, never colour alone. Contrast, focus indication and non-text contrast are Phase 4 measurable requirements.
- Product imagery gets concise product-identifying alt text only when informative; decorative/supporting repeats use empty alt. Image failure preserves product identity and actions.
- Missing ingredient, allergen or storage data visibly reads **Information not provided**; absence is never inferred.
- Price is announced with rupees and pack basis; unit price includes numerator/denominator. Struck prices require an approved factual basis—none is assumed.
- Recipe quantities associate values with ingredient names and distinguish required, selected pack, purchased and leftover.

## Reflow, zoom and motion

- At 320 CSS px and 200% zoom, content reflows without loss or two-dimensional scrolling except genuine data tables. Text spacing overrides do not clip or overlap.
- Content/actions exist in semantic DOM order without animation. `prefers-reduced-motion` removes nonessential transitions, parallax, scroll reveals and smooth movement; functional focus/status changes remain immediate.
- Autoplay, flashing and motion-dependent instruction are prohibited. GSAP may later decorate approved transitions but never own state, sequencing or accessibility.

## Component-specific requirements

- **Filter drawer:** staged values are announced only on Apply; Cancel preserves applied state; opener focus returns.
- **Carousel (if justified):** must have labelled controls, pause, non-auto default and equivalent sequential content; prefer a static list.
- **Accordions:** heading/button relationship, expanded state, content remains findable; do not hide critical purchase facts by default.
- **Toast:** supplementary only, pausable/dismissible when persistent, never the sole location for errors or unavailable status.
- **Sticky regions:** do not obscure focus/content at zoom; provide nonsticky equivalent actions.

## QA evidence required

Keyboard journeys; focus order/return; accessible-name audit; landmark/heading outline; screen-reader spot checks of search, variants, recipe review, cart and checkout; 320px/200% zoom/text-spacing capture; target-size review; forced/reduced motion review; error association and live-region duplication checks.
