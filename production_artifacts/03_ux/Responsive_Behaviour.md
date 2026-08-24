# Responsive Behaviour

Responsive behavior is content- and task-led, not a scaled desktop composition. All routes preserve meaning and actions at every target viewport.

## Viewport test set

| CSS width | Intended verification |
|---:|---|
| 1440 | Wide desktop hierarchy; bounded line lengths and grids |
| 1280 | Standard desktop navigation and content density |
| 1024 | Compact desktop/tablet landscape; reduced columns without loss |
| 768 | Tablet portrait; drawer/filter transitions and touch operation |
| 430 | Large phone; browser chrome and bottom-action clearance |
| 390 | Common phone; stacked commerce summaries |
| 360 | Narrow phone; long labels and controls |
| 320 | WCAG-oriented reflow floor; no two-dimensional scrolling except genuine data tables |

Also test 200% browser zoom, text spacing, landscape phone, reduced motion, on-screen keyboard open and dynamic browser chrome. Breakpoints may be tuned in design/engineering, but behavior at each width is binding.

## Global transformations

- 1440/1280: full header/navigation, bounded multi-column content, persistent contextual sidebars only where they improve comparison.
- 1024: reduce grids and gaps; keep top-level navigation usable without clipping; move secondary controls into disclosures as needed.
- 768 and below: replace desktop department navigation with a labelled drawer; stack main/aside regions in reading order; use two-column product cards only where labels/prices remain readable.
- 430/390/360/320: predominantly one-column task flow, full-width form controls and content-wrapping actions. Never truncate required product, variant, quantity, warning or price information.
- DOM/reading order follows the narrow layout; CSS reordering must not create a focus-order mismatch.

## Route/component rules

| Area | Desktop/tablet landscape | Tablet portrait/phone |
|---|---|---|
| Header/navigation | Shop disclosure plus peer Recipes; search visible or explicit | Menu drawer; search remains a top-level reachable action; one department branch expanded at a time |
| Product grids | 4→3→2 columns based on usable card width | 2 columns only when content/actions fit; otherwise 1. Cards grow vertically for long names |
| PLP filters | Sidebar at wide widths; count/sort remain near results | Modal drawer with staged changes, result preview/count, Clear all, Cancel and Apply |
| Selected chips | Wrap across lines; no horizontal-only strip | Wrap or vertically list; removal targets remain at least the target-size goal |
| PDP purchase area | Media and purchase columns; purchase summary may stay within viewport | Media then purchase facts/actions. A sticky add summary is allowed only after variant is valid and must not obscure content/focus |
| Recipe review | Comparison table only when headers and cells remain associated | Convert each ingredient row to a labelled card/definition group; retain required, pack, purchased, leftover, price and controls |
| Cart | Lines plus summary column | Line cards followed by summary; warnings precede affected actions |
| Checkout | Form/task column plus order summary | Disclosure, form, summary and action in logical single column; summary may collapse but blocking facts remain visible |
| Drawers/dialogs | Sized overlay, no viewport overflow | Prefer near/full-screen sheet; internal scrolling; header/close and action region remain reachable |

## Sticky behavior

- Sticky controls are enhancements, never the only instance of an action.
- PDP mobile sticky purchase may show selected variant, price and Add to cart; hide/disable with textual reason until selection is valid.
- Mobile filter Apply may remain sticky inside the drawer.
- Checkout’s final action may be sticky only if disclosure and demo total remain visible and it clears safe-area/browser chrome.
- Sticky regions must not cover focused elements, error messages, live regions or the final content when the browser UI expands.

## Long and dynamic content

- Product names, variant labels, Indian currency, counts and translated-looking long strings wrap; no semantic ellipsis on critical facts.
- Search suggestions and breadcrumbs may wrap; breadcrumb overflow must preserve current-page context.
- Tables transform to labelled blocks before horizontal scrolling would be required. If a genuine data table scrolls, give it a labelled region and keyboard-reachable scroll behavior.
- Images use fixed aspect-ratio containers to limit layout shift, with meaningful/fallback alternatives handled independently.

## Keyboard and virtual keyboard

- Drawer/dialog focus is contained only while modal; Escape closes and returns to the invoker.
- Focus order follows visual reading order through transformed grids/cards.
- Opening a virtual keyboard must not hide the active search/form field, suggestion list, validation message or primary action; use viewport-aware scrolling and avoid fixed-height `100vh` assumptions.
- Enter/Space behavior follows native control semantics. No swipe-only, drag-only or hover-only operation.

## Motion and viewport changes

Layout and state update synchronously without GSAP. Reduced motion removes drawer, sticky-bar and grid transitions without removing content, focus movement or announcements. Rotation/resize preserves typed search, staged filters, selected variant, cart quantities and checkout choices; an open modal remains labelled and operable.

## Acceptance checks

At every listed width verify navigation, search, filter apply, product selection/add, recipe review, wishlist/cart edits and demo checkout; no clipped controls, overlapping sticky regions, off-screen errors or missing facts; touch targets aim for 44×44 CSS px with documented exceptions and adequate spacing.
