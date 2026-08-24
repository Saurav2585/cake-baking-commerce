# Motion Principles

**Phase:** 4B — Motion System and Asset Production Blueprint

**Owner:** Motion/GSAP

**Status:** Reconciled Phase 4B recommendation

## Motion idea: Measure into making

Pantryform motion expresses a controlled progression: **raw ingredient → precise measure → method → joyful make**. It should feel tactile, composed and ingredient-led. Measured Joy provides the transformation and warmth; Working Pantry supplies stable geometry, restrained timing and clear state ownership.

Motion is an enhancement to an already complete interface. DOM content, focus, state, status and commerce logic exist before and independently of animation.

## Personality

- **Measured:** movement begins from a visible spatial origin and settles exactly.
- **Tactile:** small shifts, masks and material transitions suggest scooping, placing, folding or aligning without imitating real physics literally.
- **Purposeful:** every retained motion clarifies hierarchy, continuity, cause or state.
- **Warm:** pacing leaves room to perceive a transformation but avoids luxury slowness.
- **Interruptible:** the current user action always wins; timelines never queue behind repeated input.

## When motion is useful

1. **Orientation:** relate a disclosure, drawer or overlay to its trigger.
2. **Continuity:** connect a chosen variant to its pack media, price and availability.
3. **Transformation:** show the conceptual path from ingredient/recipe requirement to a measured supply choice.
4. **State confirmation:** add restrained visual acknowledgement after a successful mutation, alongside persistent text/status.
5. **Editorial rhythm:** distinguish the five approved Pantryform signature moments from generic commerce layouts.

## When motion is prohibited

- To reveal content required for navigation, product facts, variant selection, recipe mapping, cart, checkout or error recovery.
- Before focus transfer, validation, status announcement, route completion or state commit.
- On every section/card as a generic fade-up treatment.
- For urgency, stock countdowns, price rolling, scarcity, ratings, certifications or unsupported product transformation.
- As scroll hijacking, horizontal wheel interception, autoplay carousel, cursor trail, continuous parallax, shake, confetti or product-flying-to-cart.
- During text entry, active keyboard navigation, screen resizing, orientation changes or a blocking error.
- When the document is hidden, the element is off-screen, available device capacity is insufficient or reduced/no-animation mode applies.

## Pacing

- Immediate control feedback begins within the next rendered frame after state commit.
- Micro-state responses complete in 100–180 ms.
- Overlays and atomic content changes complete in 180–280 ms.
- Signature editorial sequences may take 480–900 ms after their trigger, but no essential action waits for them.
- Sequential staggers are bounded to 3–5 meaningful groups, never every child. Total stagger extension is at most 240 ms.
- Continuous decorative loops are excluded from v1. A future exception requires a visible Pause control, reduced-motion removal and performance evidence.

## Continuity and spatial logic

- Motion originates from the changed object: drawer from its physical edge; menu from its trigger region; pack information from the selected variant; measured ingredients along the approved quantity axis.
- Use a small, consistent movement vocabulary: align, settle, reveal, transfer and resolve.
- Preserve object identity through stable containers and crossfades; never teleport focus or reorder semantic content.
- Movement distance reflects hierarchy: 2–4 px for micro feedback, 8–16 px for local panels, up to the drawer width only for modal sheets.
- Direction follows reading and interface geometry, not decorative randomness. Mobile transformations simplify rather than compress desktop choreography.

## Interruption and cancellation

1. Every animation is cancellable and replaceable at any frame.
2. A new action affecting the same target cancels the prior timeline and resolves from the currently rendered value to the newest committed state.
3. Repeated actions use latest-state-wins semantics; they never append timelines or delay domain mutations.
4. Escape/Close dismisses overlays immediately, including during opening. Focus return does not wait for closing motion.
5. Route change, resize, orientation change, visibility loss, preference change or component unmount kills relevant timelines and applies the correct final state.
6. On error, success motion is cancelled; the persistent error state appears immediately.
7. Cancellation must never leave `opacity: 0`, transformed focus targets, stale `inert`, blocked pointer events or animation-owned inline styles.

## Input modality

- Keyboard and pointer activate the same state and motion; keyboard focus is visible from the first frame.
- Hover is optional and has a focus-visible equivalent. It cannot reveal a hidden action.
- Touch has no hover dependency, avoids edge gestures that conflict with browser navigation and uses shorter/simpler sequences on constrained devices.
- Search arrow-key navigation, quantity typing and rapid variant selection do not animate every intermediate focus/input event. Animate only the latest committed state where useful.
- Drag and swipe are never required; visible controls provide equivalent operation.

## Reduced-motion principles

Under `prefers-reduced-motion: reduce`, animation-disabled mode or a runtime capability fallback:

- render the functional final state immediately;
- remove scroll-linked movement, parallax, stagger, masks, blur, scale and spatial travel;
- allow no required information to start hidden;
- preserve focus change, status text, selected state and layout exactly;
- use an instantaneous change as the default. A brief opacity change up to 100 ms is permitted only for nonessential continuity after testing and is never required.

The complete replacement matrix is in `Reduced_Motion_and_No_Animation_Contract.md`.

## Generic-motion test

Temporarily remove Pantryform naming, palette and product imagery. Retain a motion only if its timing and spatial story still communicate at least one of: ingredient grouping, measurement, pack selection or recipe transformation. A generic fade/scale that could move unchanged into SaaS or fashion is removed or refined with a specific measured axis, pack relationship or making sequence. Utility motion may remain conventional only when it improves orientation and stays visually subordinate.

## Library boundary

CSS transitions/animations are preferred for isolated, state-driven effects. GSAP is justified only for a coordinated signature timeline, interruptible multi-element transform or deterministic review seeking that CSS cannot express maintainably. Neither GSAP, Lenis nor another library is mandatory. No library may own visibility, semantics, focus, state, routing or status.

## Acceptance criteria

- Each approved signature communicates the raw→measure→method→make idea or an explicit pack/ingredient relationship.
- Every motion has a functional owner, interrupt rule and exact reduced/no-animation result.
- Keyboard, rapid repeat, route change and resize cannot queue or strand animation state.
- Utility and transactional surfaces remain calmer than editorial discovery.
- Removing all motion leaves a complete, coherent and WCAG 2.2 AA-oriented experience.
