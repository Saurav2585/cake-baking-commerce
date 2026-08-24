# Component Motion Specification

**Phase:** 4B — Motion System and Asset Production Blueprint
**Owner:** Motion/GSAP
**Status:** Reconciled Phase 4B recommendation; no production code

## Shared execution model

1. Render complete semantic content and the last confirmed state.
2. Apply state and accessibility semantics immediately after validation/commit.
3. Move focus or emit the single owning status independently of presentation.
4. If motion is permitted and the component is visible/capable, animate only from the already-valid previous presentation to the committed final presentation.
5. On interruption, cancellation, resize, route change, visibility loss or new input, finish to the latest committed state and release all temporary styles.

Motion tokens come from `Motion_Tokens.md`. Components must use semantic tokens rather than page-specific millisecond/easing values. Prefer CSS for simple state changes; GSAP is justified only for coordinated signature sequences or interruption control that CSS cannot express clearly.

## Component specifications

| Component | Full-motion behavior | Trigger / cancellation | Reduced and static equivalent | Accessibility and performance constraints |
|---|---|---|---|---|
| Header / desktop navigation | Disclosure settles from its trigger with short opacity and minimal vertical distance; sticky density changes as one shell | Explicit open/close; Escape, blur policy, route or repeat input cancels | Immediate panel/shell state | `aria-expanded`, focus and link availability update immediately; no hover-only route; animate transform/opacity only |
| Mobile navigation | Drawer translates from logical start edge with scrim fade; close reverses if safe | Explicit trigger/Escape/route; new command targets final state | Immediate drawer and inert/focus states | Focus containment/return cannot wait; dynamic viewport and safe areas; no overshoot/spring |
| Buttons | Hover/focus uses small surface/border emphasis; pressed uses tiny compression; pending retains label context; success returns calmly | Pointer/focus/activation; pointer cancel/blur restores | Static focus/pressed/pending/success styles | Focus ring is never animated away; do not scale below usable target; mutation result lives outside button |
| Text links | Underline/arrow may extend a short distance on hover/focus | Direct input only | Persistent underline/focus style | No content shift; visited/current meaning is static |
| Search suggestions | Popup opacity/minimal scale from input; group content appears together | Valid popup open/close; new query cancels old transition | Immediate popup; options static | Active-descendant changes never animate; keyboard/Tab/Escape immediate; no list stagger |
| Filters | Desktop disclosure height/opacity may settle; selected mark changes briefly; results crossfade as one committed region | Explicit disclosure/select/apply; new change cancels result transition | Immediate control/result state | URL/count/status commit first; no focus movement; avoid animating grid layout |
| Filter chips | Chip appears/removes with short opacity/size transition only after applied state; siblings settle as one group | Applied commit/removal success | Immediate chip list | Removed-chip focus follows Phase 3 rule before collapse; long labels do not animate width while reading |
| Product cards | Image may shift crop subtly and card edge/elevation responds on hover/focus; Add state gets local restrained feedback | Direct input/success only | Static strong focus/selected/success state | No hidden actions, pack clipping, forced 3D or long grid stagger; disabled on coarse/low-power contexts where unhelpful |
| Wishlist feedback | Icon fill/draw after confirmed persistence; saved count may receive short emphasis | Successful save/remove; failure cancels/restores | Immediate pressed state/count | One global status owns announcement; no burst, particle or colour-only meaning |
| Variant selection | Selected marker commits immediately; previous/new variant media and price/fact block crossfade as one atomic unit | Valid resolved SKU commit; rapid input cancels to latest | Immediate atomic replacement | Focus remains on choice; one PDP status; unavailable/stale stays visible; no counting price |
| Quantity changes | Committed numeral/line total uses short opacity emphasis; typed edits remain static | Valid increment/decrement/commit | Immediate value | Never animate or reformat while typing; error is static and associated |
| Product media | Loaded gallery images crossfade in reserved frame; thumbnail marker changes immediately | Explicit image/valid variant selection | Immediate image swap | Alt/selection semantics commit first; no lateral vestibular movement; broken media uses static fallback |
| Drawers/dialogs | Short translation/opacity with scrim; closing may reverse; nested dialogs prohibited in v1 | Explicit open/close/Escape/submit | Immediate state with identical containment/return | Focus/inertness applied independent of frame; no transform on ancestor that breaks fixed positioning |
| Mini-cart | Drawer uses shell pattern; new/merged line has one brief edge highlight | Explicit open or approved post-add rule; line commit | Immediate drawer/line | Must not force focus on Add unless approved; issues persistent inline; cap simultaneous effects |
| Cart line reconciliation | Current price/quantity replaces with short local crossfade; issue strip appears without shake; removal collapse only after safe focus | Revalidation/mutation commit | Immediate values/issues/removal | Error summary links/focus first; old/current price both readable; do not animate ledger height at zoom if unstable |
| Recipe mapping row | Inclusion marker and pack math update as a coordinated local group; override/substitution disclosure settles | Confirmed line action only; rapid changes finish to latest | Immediate row state/math | Required, selected pack, purchased, leftover and warnings never disappear; one row status plus aggregate owner |
| Recipe post-add summary | Added, merged and skipped groups may settle in short semantic order | Atomic idempotent success | Entire summary immediate; focus on summary heading | No success before commit, confetti or order metaphor; status is not replayed after motion |
| Alerts / status messages | Persistent panels may fade in slightly; routine status text itself does not move | State commit | Immediate content | Blocking error focus/status immediate; no shake/pulse; live region emits once, never at animation completion |
| Skeleton/loading | Reserved static shapes; optional low-amplitude opacity pulse for genuinely delayed regions | Loading longer than meaningful threshold; stop when hidden/resolved | Static neutral shapes | `aria-busy` on affected region; no shimmer under reduced mode; no fabricated text or progress; zero CLS |
| Error recovery | Error panel appears as a unit; Retry pending uses button busy convention | Error/retry commit | Immediate panel/state | Preserve input and focus ownership; failure cannot inherit prior success motion |
| Focus transitions | No programmatic smooth scrolling by default; optional instant/short nonessential highlight at target | Route, summary link, removal recovery | Immediate focus with persistent ring | Focus visible on first rendered frame and never obscured by sticky UI; reduced/static identical semantics |

## Signature-component choreography boundaries

The five signature moments are specified in `Signature_Motion_Choreography.md`. Their component-level restrictions are binding here:

- measured ingredient particles/objects are decorative and cannot overlap controls or become separate focus targets;
- department-atlas transforms never alter DOM order or destination geometry during activation;
- Ingredient Theatre transitions end with the pack fully legible and facts continuously available;
- recipe-to-supplies marks are explanatory decoration around fixed textual quantities, not calculated UI state;
- PDP pack study uses only the resolved variant and cannot interpolate or invent packaging facts.

## Static/reduced equivalence checklist

For each component, verify under reduced motion, animation-disabled CSS and JavaScript unavailable where applicable:

- all content exists in semantic source order and no element remains opacity zero, transformed off-screen, clipped, inert or `aria-hidden` because initialization did not run;
- current, selected, expanded, unavailable, stale, error, busy and success states remain distinguishable through text, semantics, border/shape and approved colour roles;
- control outcomes, focus destinations and live-region ownership match full mode;
- drawers/dialogs can open and close without the animation library; server-rendered navigation and product/recipe reading remain functional;
- static asset/poster crops preserve the same subject, pack identity and claim boundary as animated layers.

## Concurrency and performance policy

- One signature sequence maximum per viewport; transactional feedback takes priority and cancels decorative work.
- Avoid concurrent motion across more than one large image region and two small control/state regions. On lower-powered/mobile conditions, retain only direct-manipulation orientation effects.
- Use transform/opacity only when compositing does not inflate memory or blur text. Do not promote every card/layer to the GPU.
- No filter blur on large raster imagery, animated box-shadow across grids, layout-property animation in dense commerce rows, or persistent `will-change`.
- Page visibility loss pauses/cancels decorative timelines; restoration renders correct state before any optional effect.

## QA acceptance scenarios

1. Rapidly toggle navigation, variants, filters and mapping choices; only the latest committed state remains and no temporary style traps content.
2. Interrupt a drawer/dialog with Escape and route navigation; focus/inertness are correct on the same frame as state.
3. Trigger save/add/remove failures; no success animation or stale count remains.
4. Exercise product/recipe/cart flows with reduced motion, animation blocked and low-power fallback; facts, actions and statuses are equivalent.
5. At 320 CSS px, 200%/400% zoom, orientation change and virtual keyboard, animated elements do not create overflow, obscure focus or shift sticky controls.
6. Screen-reader checks hear one announcement for search results, variant, recipe row/summary, wishlist/cart and blocking errors regardless of motion mode.
