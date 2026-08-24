# Page-Level Motion Map

**Phase:** 4B — Motion System and Asset Production Blueprint
**Owner:** Motion/GSAP
**Status:** Reconciled Phase 4B recommendation; no production implementation
**Approved direction:** The Measured Pantry; raw ingredient → precise measure → method → joyful make

## Global contract

Motion expresses material transformation and spatial continuity without owning content, focus, validation, state or commerce. Editorial discovery may use a restrained, tactile motion layer; catalog utility is quieter; recipe review, cart and checkout are calmest. The DOM and static rendering are complete before animation. State commits, focus moves and live announcements never wait for a timeline.

Every row below has three modes:

- **Full:** the bounded enhancement when preference, device capability, visibility and performance allow it.
- **Reduced:** `prefers-reduced-motion: reduce`; no spatial travel, stagger, parallax, continuous loop, smooth scrolling or count animation. A short opacity change is optional only if it improves continuity and testing supports it.
- **Static/no animation:** immediate final state with the same content, order, controls, selection, facts and status. This is also the no-JavaScript baseline for nonessential effects.

## Page map

| Page/surface | Full-motion opportunity | Intensity | Trigger and interruption | Reduced/static equivalent | Asset dependency | Principal safeguards |
|---|---|---:|---|---|---|---|
| Homepage opening | Signature measured-ingredient composition progresses from raw arrangement to measure marks and settled proposition; copy is already readable | Expressive | Once after page ready and LCP-critical image settles; user scroll/route change finishes immediately | Final composed still; proposition/actions always present | Approved homepage ingredient master, responsive crops, CSS/SVG measure marks | No LCP delay, autoplay loop, content reveal dependency or parallax; R-005, R-032 |
| Homepage raw → measured → made sequence | Short state-to-state continuity between ingredient, measuring and finished editorial frames; bounded local progression | Expressive | Intersection once per visit after stable layout; reversing scroll does not scrub content | Three complete static panels in source order | Three related stills or one approved multi-state illustration | No scroll trapping/scrubbing; motion cannot imply product performance; R-019, R-030 |
| Department atlas | Focus/hover lifts one numbered tile and subtly aligns its material crop; keyboard and pointer have equivalent response | Moderate | Direct input only; cancel on blur/pointer exit | Strong static focus/selected treatment | Department visuals and neutral fallbacks | All eight links always visible; no colour-only departments; R-003, R-013, R-032 |
| Ingredient Theatre product study | Ingredient texture resolves to a legible pack study through crop/opacity continuity | Expressive | Once when bounded module enters; interruption lands on final pack study | Final pack-and-text composition | Ingredient macro plus approved packshot; separate provenance | Pack identity/facts never obscured or inferred from image; R-002, R-030 |
| Homepage recipe-to-supplies transformation | Ingredient measures align with explicit product/pack representations along a measured path | Expressive | Bounded intersection or explicit replay; never tied to cart state | Complete static recipe requirement → selected pack → leftover diagram | Recipe editorial still, packshots, CSS/SVG measurement marks | Retains exact labels; not a real calculation; R-004, R-021 |
| Shop All / department | Masthead crop settles; category tiles use restrained focus/hover response | Light | Once for decorative masthead; direct input for tiles | Static masthead and focus styling | Department master/crops | No repeated rail cascades or hidden categories; R-027 |
| PLP | Product grid may crossfade as committed filters/sort/page resolve; cards have small focus/hover material response | Light | Only after results commit; new action cancels old transition | Immediate result replacement, unchanged result announcement | Product thumbnails/fallbacks | No per-card long stagger, list-position loss or result-status delay; R-005, R-024 |
| Search results | Same as PLP; grouped result regions can settle as a single unit | Light | Submitted query/result commit only | Immediate results | Product/recipe thumbnails | No per-keystroke page animation; active query remains visible |
| Search suggestions | Anchored panel appears from its input with a short opacity/scale settle; active options do not animate | Light | Popup open/close; typing cancels obsolete transition | Immediate popup/close | Optional thumbnails only | Combobox semantics own state; virtual keyboard safe; R-013, R-024 |
| PDP initial study | Gallery and pack study settle as one composition after factual content is ready | Moderate | Once on entry; route/interaction finishes immediately | Complete static gallery/purchase panel | Variant packshots, 4:3 crops, placeholders | Do not delay H1/LCP or selected facts; R-002, R-030 |
| PDP variant-owned pack change | Signature atomic transition: old media/facts yield to new pack/media/facts as one resolved SKU | Moderate | Valid variant commit; subsequent input cancels and jumps to latest resolved state | Immediate atomic replacement with identical status | Variant-specific packshots; neutral fallback | Focus stays on control; one live announcement; no auto-substitute; R-012, R-024 |
| PDP gallery/quantity/add | Loaded images crossfade; quantity may briefly emphasize committed numeral; Add success gives restrained control/cart-count feedback | Light | Explicit input and successful commit only | Immediate image/value/pressed/count state | Gallery crops | Failure has no success motion; no fly-to-cart; facts remain stable |
| Recipe listing | Recipe imagery may settle as grouped cards; focus response is restrained | Light | Page/result commit or direct input | Static cards | Recipe thumbnails/crops | No outcome/performance implication or long cascade |
| Recipe detail | Editorial image and ingredient/method rhythm may use one bounded entrance; serving recalculation updates summary as a unit | Moderate → light | Page readiness; valid serving commit | Static page; amounts replace immediately | Recipe hero/crops, optional step illustration | Readability never depends on reveal; no each-row cascade; R-004, R-021 |
| Recipe-to-cart review | Mapping rows update locally; changed pack math receives brief non-colour emphasis; dialog and summary use orientation motion only | Minimal | Explicit line commit; cancellation lands on latest state | Immediate row/summary/dialog state | Product packshots/fallbacks | Required/selected/purchased/leftover always readable; status once; R-004, R-024 |
| Recipe post-add | Added/merged/skipped groups settle in a short ordered reveal after atomic success | Light | Successful idempotent commit only | Full summary appears immediately and receives focus | No required decorative asset | No confetti/order metaphor; focus/status precede effect; R-006, R-025 |
| Wishlist | Saved marker fills briefly after persistence; item removal collapses only after safe focus placement | Minimal | Successful mutation | Immediate pressed/removal state | Product thumbnails | Failure restores state; no childish burst; R-023, R-024 |
| Mini-cart | Drawer preserves spatial origin; newly added/merged line receives brief edge emphasis | Minimal | Explicit open or approved post-add policy | Immediate open/line state | Product thumbnails | Focus containment/return independent; no forced open; R-026 |
| Cart | Line quantity/total updates crossfade locally; removal collapse follows deterministic focus; reconciliation issue appears calmly | Minimal | Confirmed mutation/revalidation | Immediate values/removal/issues | Product thumbnails | No rolling totals, shaking errors or layout animation before focus; R-023–R-026 |
| Demo checkout | Drawer-free, nearly static document; busy indicator only and short summary state replacement | Minimal | Explicit submit/state commit | Immediate busy/result; textual progress | None required beyond product thumbnails | No payment/progress theatre or duplicate submit; R-006, R-025 |
| Demo confirmation | Optional one-time measured material flourish beside already-visible confirmation | Minimal/optional | Valid confirmation route once | Static approved flourish or none | Small CSS/SVG/manual flourish, manifested if file asset | No confetti, sound, receipt/order implication or completion delay |
| Global navigation drawer | Short bounded horizontal reveal and scrim fade | Light | Explicit open/close/Escape; reversal-safe | Immediate open/close and focus transfer | None | Background inert and focus trapped while open; R-013, R-026 |
| Mobile filter drawer | Same shell movement, calmer content; Apply closes after result state is committed | Light | Explicit open/close/apply/cancel | Immediate drawer and result state | None | Staged values retained on failure; keyboard/safe-area safe |
| Empty/404 | Optional static illustration opacity settle only | Minimal | Page ready once | Static illustration and recovery | Approved illustration/texture or CSS fallback | Recovery is immediately usable; no whimsical blame or delay |
| Error/validation | No shake/bounce; bounded issue-panel appearance only | Avoid/minimal | Error commit; no replay | Immediate error/summary with focus | None | Focus and assertive status never wait; R-007, R-024 |
| Unavailable/stale | Text/icon/border state changes immediately; optional short opacity only | Avoid/minimal | Revalidation commit | Immediate explicit state | Existing packshot retained | No urgency, strikethrough-only meaning or automatic replacement |
| Loading/skeleton | Static reserved placeholder; full mode may use a low-cost non-directional pulse only outside reduced mode | Minimal | Genuine delayed load; stops on resolve/hidden tab | Static placeholder with semantic busy state | Neutral CSS placeholder | No shimmer across large regions, false progress or CLS |

## Responsive and viewport rules

- Desktop may use layered decorative motion only inside bounded signature modules. Mobile linearizes the same narrative; no horizontal scrub, parallax or gesture-only discovery.
- At 320 CSS px, zoom, orientation change or text-spacing override, cancel active decorative timelines and render the current final state before layout recalculation.
- Sticky header, PDP purchase control and recipe/cart summaries never animate position while the viewport, browser chrome or virtual keyboard changes.
- Browser Back/forward restores URL state and scroll position before any optional reveal decision. Restored content does not replay entrances above or around the viewport.
- Deep-linked sections and validation targets are visible and focusable immediately; motion never changes the scroll destination.

## Intensity test

The intended cadence is: **homepage/editorial expressive → category/product moderate → PLP/search light → recipe review minimal → wishlist/cart/checkout calmest**. A page fails if repeated section fades become the visible language, transactional feedback feels celebratory, or removing motion makes the composition incomplete.

## Acceptance criteria

1. Every required page, overlay and unavailable/error/loading family has a documented full, reduced and static treatment.
2. The five approved signature moments retain originality without changing Phase 3 tasks or factual hierarchy.
3. Utility and transactional pages are measurably calmer than editorial discovery.
4. Focus, status, selection, validation and persistence are independent of animation callbacks.
5. Motion degrades to complete static layouts for reduced preference, no JavaScript, interruption and constrained devices.
