# Signature Motion Choreography

**Phase:** 4B — Motion System and Asset Production Blueprint

**Status:** Reconciled Phase 4B recommendation

## Shared contract

All five approved signatures render complete, readable final compositions in server HTML/CSS. JavaScript may enhance already-visible structure. Focus, links and state updates are live before motion begins. Timelines are scoped, killable and latest-state-wins. No animation auto-repeats.

## 1. Measured ingredient homepage opening

**Narrative purpose:** Move from raw material abundance to an exact, ready-to-shop measure while establishing the retailer—not a finished bakery.

**Trigger:** Once after the opening is painted, visible, fonts/media are stable enough, motion mode is full and the page is not being restored mid-scroll.

**Initial state:** Functional final content is present. Enhancement layers may begin with ingredient field offset ≤12 px, measurement rule at scaleX 0.2 from its labelled origin and spoon/quantity marker offset ≤20 px. H1 and actions never begin inaccessible or unfocusable.

**Sequence:** (1) ingredient field settles 0–420 ms; (2) measure rule resolves 100–620 ms; (3) spoon/quantity marker aligns 180–720 ms; (4) one 120 ms action-edge acknowledgement may finish the sequence. Maximum four groups; no individual particle cascade.

**Final state:** Stable composition matching Phase 4A, with all labels/actions in normal reading order.

**Timing/easing:** `signature-place`, total ≤820 ms; emphasis ease for placement, standard for rule.

**Scroll:** Not scrubbed. If initial opening is off-screen or restored below it, apply final state immediately.

**Interruption:** Any scroll, input, route change, visibility loss or preference change cancels and resolves final state. It never replays on Back restoration.

**Keyboard:** Tab order and focus ring exist immediately; keyboard input cancels remaining decorative sequence without moving focus.

**Mobile:** Maximum three groups, travel ≤8 px, total ≤600 ms; ingredient field is bounded square and copy/action remains static.

**Reduced motion:** Final composition immediately; no rule drawing, scale, travel or stagger.

**No JavaScript:** Final static composition; direct Shop/Recipes links and all text remain present.

**Performance risks:** LCP competition, multiple ingredient layers, filter/clip animation. Use one composited decorative layer, reserve size and never delay LCP media/text for animation.

**Acceptance:** First interaction is never blocked; CLS from sequence is 0; no generic hero fade remains when signature layers are removed.

## 2. Irregular department atlas

**Narrative purpose:** Present the eight-department assortment as an organised working pantry with material-specific variety.

**Trigger:** First viewport entry at 20% visibility in full mode; if already visible on load/restoration, settle once without delay.

**Initial state:** All eight labelled links occupy their final grid cells and are actionable. Optional numeral/rule layers may be offset ≤6 px and opacity-soft.

**Sequence:** Atlas boundary resolves first; then four paired groups (01/02, 03/04, 05/06, 07/08) receive a 35 ms measured alignment. Hover/focus on a tile produces ≤2 px media shift and persistent focus frame; it never reveals hidden content.

**Final state:** Irregular Phase 4A geometry, labels and category cues fully stable.

**Timing/easing:** Section 420 ms plus ≤105 ms stagger; tile feedback 120 ms.

**Scroll:** Intersection-triggered once, no scrub or pin. Off-screen motion stops and final state applies.

**Interruption:** Focus/click cancels atlas entrance and resolves all tiles; rapid hover replaces prior local feedback.

**Keyboard:** Focus receives equivalent edge emphasis with no positional movement required. Enter navigates immediately.

**Mobile:** Atlas reflows by approved DOM order. Pairs become one/two-column groups; entrance becomes a single boundary/number settle, no tile cascade at 320 px or 200% zoom.

**Reduced motion:** Static atlas with visible numbers/boundaries.

**No JavaScript:** Static links in approved department order.

**Performance risks:** Too many observers/layers and paint-heavy masks. Use one observer for the region, animate no more than four grouped wrappers, avoid clip-path on low-powered mobile.

**Acceptance:** Removing name/palette/images still reads as numbered baking-supply organisation; all links work before/during/after; no card starts hidden.

## 3. Controlled Ingredient Theatre product study

**Narrative purpose:** Connect raw texture to the factual pack and its practical use without implying performance or a finished result.

**Trigger:** User scrolls the three-part study into view; optional pointer/focus selection may change the active study when visible controls exist.

**Initial state:** Premise, product card and decorative texture are all present. Enhancement begins with texture crop offset ≤12 px and an annotation line at its origin; factual card remains static.

**Sequence:** Texture settles; annotation connects to the stable product pack; factual label edge receives one restrained highlight. No pack text, price, availability or action moves.

**Final state:** Texture and pack remain simultaneously legible with explicit factual text.

**Timing/easing:** Section 420–600 ms; no more than three groups; optional media crossfade 220 ms after the replacement is loaded.

**Scroll:** Entrance once. No parallax. If an optional scrub is prototyped, it is limited to decoration, ≤20 px across ≤60vh, and must pass the performance/reduced-motion gates.

**Interruption:** Scroll reversal, focus, new selection or resize cancels to newest final study. Loaded prior media remains until replacement is ready.

**Keyboard:** Controls use native selection; focus and accessible state update immediately. No arrow-key animation queue.

**Mobile:** Texture and pack stack; use crossfade only, remove connection travel and blur.

**Reduced motion:** Static premise → product → texture order; immediate selected-study replacement.

**No JavaScript:** First/default study is complete; other studies are ordinary links/content if supplied.

**Performance risks:** Large macro assets, blur/filter and crossfade memory. Use responsive crops, one incoming/outgoing pair maximum and release old layers promptly.

**Acceptance:** Facts never animate or become obscured; the study reads as ingredient-to-pack, not generic fashion image reveal; failed media leaves the factual card intact.

## 4. Recipe-to-supplies transformation

**Narrative purpose:** Explain recipe need → measured quantity → smallest sufficient selected pack → purchased/leftover review, reinforcing user control before cart.

**Trigger:** Once when the explanatory bridge becomes visible; interactive recalculation occurs only after an explicit serving/pack change.

**Initial state:** Required, selected pack, purchased and leftover values are visible in final semantic order. Decorative measure path may begin at origin with markers already labelled.

**Sequence:** On entrance, requirement marker aligns, connection reaches selected pack, purchased/leftover markers resolve as one group. On a committed change, old/new values crossfade atomically in the reserved summary while the path marker moves ≤12 px; rows do not cascade.

**Final state:** Latest committed values and inclusion/issue state are stable and match the status announcement.

**Timing/easing:** Entrance ≤720 ms; recalculation swap 220 ms; highlight 160 ms. Status is emitted after state commit, not animation.

**Scroll:** Explanatory entrance once; mapping changes are action-triggered, never scroll-driven.

**Interruption:** Rapid changes cancel prior swap and resolve the newest values. Error cancels highlight and displays the linked persistent error immediately. No calculation depends on a timeline.

**Keyboard:** Servings, override, include/omit and substitute controls operate immediately; focus stays on the control or moves under approved dialog/error rules.

**Mobile:** Vertical measured path; no lateral transfer. Mapping cards keep all four labelled quantities visible. Sticky action does not animate around keyboard/focus.

**Reduced motion:** Path and values appear final; committed changes replace atomically with optional ≤100 ms opacity only.

**No JavaScript:** Editorial explanation remains; interactive recipe mapping uses the application’s explicit non-JS boundary and cannot present a false successful add.

**Performance risks:** Animating many mapping rows, layout shifts from number width, duplicated announcements. Animate only one summary/affected row, reserve tabular value slots and use one status owner.

**Acceptance:** Smallest-sufficient-pack logic and all quantities remain explicit; no lowest-unit-price implication; rapid input produces one final state and no queued timelines.

## 5. Variant-owned PDP pack study

**Narrative purpose:** Preserve the relationship between selected pack/SKU, media, demo price and demo availability as one factual unit.

**Trigger:** Explicit selection of a valid variant after the domain state resolves.

**Initial state:** Last confirmed variant remains visible. Incoming pack media is preloaded in the reserved frame; new facts are prepared but not announced by animation.

**Sequence:** Selected-control marker updates immediately; incoming media crossfades 220 ms while pack scale settles from 0.98; fact panel replaces atomically and its leading rule highlights 160 ms. No counting price, spinning pack or flying object.

**Final state:** Selected variant, SKU where shown, pack, demo price, unit price, demo availability and Add eligibility agree.

**Timing/easing:** `swap-atomic` 220 ms; feedback 160 ms; total ≤260 ms.

**Scroll:** None. Sticky purchase panel behaviour is layout-owned and cannot trigger animation.

**Interruption:** New variant selection cancels prior swap, discards obsolete incoming media and resolves latest-state-wins. Unavailable/error state appears immediately and cancels success emphasis.

**Keyboard:** Native choice semantics, focus remains on selected control, purchase summary announces once. Arrow-key exploration may suppress media motion until selection commit settles.

**Mobile:** Crossfade only; remove scale on low-memory/coarse-pointer devices. Keep frame reserved and action/status in flow.

**Reduced motion:** Immediate atomic swap with no scale/travel; persistent selected marker and status.

**No JavaScript:** Server/default variant is fully readable; variant links/form controls provide the application’s approved progressive path, and no unavailable SKU is silently selected.

**Performance risks:** Decode churn, multiple layers, CLS and stale assets. Pre-size media, decode before swap, retain at most one outgoing layer and cancel obsolete loads.

**Acceptance:** Media/facts never disagree; three rapid selections end on the last variant with no queue; add remains disabled with textual reason for invalid/unavailable state.

## Cross-signature acceptance and generic-motion test

- Disable brand name, palette and imagery: opening still shows raw-to-measure alignment; atlas still organises eight baking-supply groups; product study connects material to pack; recipe bridge shows requirement-to-pack-to-leftover; PDP ties selected pack to variant-owned facts.
- No signature is merely a section fade, card lift or scale-in.
- All five have deterministic final-state capture hooks for before/mid/final review without changing domain state.
- Full, reduced and none modes produce identical information, link/control availability, focus order and status text.
