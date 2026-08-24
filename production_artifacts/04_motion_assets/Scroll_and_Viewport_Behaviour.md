# Scroll and Viewport Behaviour

**Phase:** 4B — Motion System and Asset Production Blueprint

**Status:** Reconciled Phase 4B recommendation

## Native scroll contract

Use native document scrolling. Scroll hijacking, momentum replacement, mandatory Lenis, horizontal wheel interception and full-page snapping are prohibited. GSAP ScrollTrigger or IntersectionObserver may observe position only when a retained effect cannot be expressed more simply; neither may own navigation, reading order, focus or scroll restoration.

## Acceptable scroll-linked behaviour

- One-time entrance for a noncritical editorial signature after 15–25% visibility.
- A contained measurement rule or ingredient layer progressing ≤20 px across no more than 60% of one viewport.
- A sticky editorial/purchase region whose position is CSS layout-owned, while decorative progress is optional.
- Immediate final state when a deep link/restored page starts beyond the trigger.

Search results, product cards, product facts, recipe mapping rows, cart lines, checkout, errors and live status are never scroll-reveal gated. Generic per-section fade-up is excluded.

## Sticky boundaries

- Sticky header, PLP filter rail, PDP purchase panel, recipe summary and cart summary follow Phase 3/4A layout conditions.
- A sticky region begins/ends within its containing section and never overlaps the footer or next task region.
- Mobile sticky actions are mirrors of an in-flow action and appear only when valid; they clear safe area, browser chrome, focus, errors and virtual keyboard.
- At 200%+ zoom, 320 CSS px, reduced/no-animation or insufficient viewport height, optional sticky behaviour disables and returns content in-flow.
- Pinning a narrative scene is discouraged. Any prototype exception is ≤1 viewport and cannot trap keyboard/scroll users.

## Entrance and reveal rules

1. Required content starts visible in CSS/DOM.
2. Enhancement classes are applied only after capability detection; failure leaves the final state.
3. Trigger once per navigation, not on every scroll reversal.
4. Group no more than 3–5 meaningful layers; never stagger every card/row.
5. If the user scrolls rapidly past, skip to final rather than chasing the viewport.
6. Off-screen animations are cancelled/finalised and observers disconnected after completion.

## Resize and orientation

- Preserve route, query, filters, selected variant, recipe choices, cart state, typed values and focus owner.
- Cancel active geometry-dependent timelines, remove their inline transforms, recompute layout, then render correct final state. Do not replay entrances merely because a breakpoint changed.
- An open modal remains open, labelled and focus-contained. If its presentation changes between dialog/drawer, focus stays on the same logical control where possible.
- Use a debounced measurement pass for expensive decorative recalculation only; semantic layout responds through CSS immediately.
- Orientation change never scrolls to an animation trigger. Restore the focused element into view without smooth scrolling under reduced motion.

## Browser restoration and deep links

- Browser Back/Forward restores discovery URL state and position using framework/browser semantics. Motion does not force scroll to top.
- Restored pages apply all already-passed entrances to final state. The focused/returned result is not animated.
- Anchor/deep-link targets render visible before scroll, receive appropriate focus when navigation semantics require it and are offset from sticky headers.
- Deep links into an error, product fact or recipe row never depend on a parent reveal timeline.

## Virtual keyboard

- Use dynamic viewport sizing and internal overlay scrolling; avoid fixed `100vh` assumptions.
- Opening search/filter/form keyboards cancels decorative viewport motion and keeps field, suggestion/error and required action reachable.
- Do not transform an ancestor of a fixed/sticky input in a way that changes its containing block.
- Keyboard dismissal does not replay drawers, signatures or section entrances.

## Scroll trapping safeguards

- Only a correctly modal drawer/dialog may contain focus and prevent background scroll; it always has Close and Escape, with deterministic focus return.
- Nested scroll areas are avoided. If a drawer body must scroll, its header/close and action boundary remain reachable.
- Wheel, touch, arrow, Page Up/Down, Home/End and assistive scrolling retain native behaviour.
- No content requires a precise scroll position, reverse scroll or gesture to activate a control.
- Overscroll containment is applied only to an open modal surface, never the document journey.

## Mobile battery and capability safeguards

Enter `constrained` motion mode when runtime evidence indicates save-data preference, low-memory/low-powered conditions, sustained missed-frame budget or an explicit review flag. In constrained mode:

- remove scroll-linked effects, blur, springs, large masks and editorial staggers;
- retain only short overlay/local orientation transitions;
- use one incoming/outgoing media pair maximum;
- stop all decorative work while off-screen or document-hidden;
- avoid continuous `requestAnimationFrame` loops and per-scroll layout reads;
- rely on responsive static crops rather than animated high-resolution media.

Capability inference must be conservative, privacy-safe and non-identifying. Functionality cannot depend on browser/device classification.

## Focus and status

Focus moves according to interaction semantics at state commit, never animation end. Smooth programmatic scrolling is disabled for reduced motion and used sparingly otherwise only to expose an explicitly focused error/target. Live regions announce committed results once; scroll/animation progress is not announced.

## Acceptance tests

1. Native scrolling works with mouse, trackpad, touch, keyboard and assistive tools.
2. Rapid scroll skips/finalises entrances without blank content or runaway work.
3. Resize across every approved width preserves state/focus and leaves no transforms.
4. Back/Forward restores PLP state/position without replaying passed signatures.
5. Deep links expose their target with motion and JavaScript disabled.
6. Virtual keyboard leaves search suggestions, validation and Close/Apply reachable.
7. Reduced/constrained modes register no scroll-linked animation.
8. Hidden/off-screen pages stop decorative animation and event work.
