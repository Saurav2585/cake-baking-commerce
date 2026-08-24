# Motion Opportunity Map

**Phase:** 4A — Visual System and High-Fidelity Specification
**Owner:** UI/Product Design input to Motion/GSAP
**Status:** Reconciled Phase 4A opportunity map; no choreography or code

## Motion role

Motion may reinforce **Measured Joy** by showing orderly assembly, material change and spatial continuity. It is never required to expose content, resolve state, delay an action or announce success. The no-animation rendering is the authoritative functional experience; `prefers-reduced-motion` removes nonessential movement and renders final states immediately.

## Priority levels

- **P1 — Orientation:** small transitions that clarify what opened, changed or was added.
- **P2 — Material character:** restrained ingredient/process movement that adds warmth.
- **P3 — Delight:** optional accents only after accessibility, performance and comprehension pass.
- **Avoid:** high vestibular risk, decorative delay, autoplay or ambiguous state ownership.

## Opportunity matrix

| Surface / trigger | Opportunity | Priority | Functional state owner | Reduced/no-motion equivalent | Risks and constraints |
|---|---|---:|---|---|---|
| Header Shop disclosure | Short opacity/vertical settle that preserves spatial origin | P1 | Disclosure expanded state | Panel appears immediately | No hover-only trigger; focus available before animation completes |
| Mobile nav/filter drawer | Short horizontal reveal with scrim fade | P1 | Dialog/drawer open state | Immediate open/close and focus transfer | No elastic overshoot; virtual keyboard and Escape unaffected |
| Search suggestions | Anchored fade/scale of panel after data exists | P1 | Combobox/listbox state | Immediate panel; active descendant unchanged | Never animate individual options during arrow navigation |
| Filter apply | Results crossfade/very small settle after committed count | P1 | Results summary/URL state | Immediate replacement and single status | Preserve list position/focus; no per-card cascade delay |
| Product-card hover/focus | Media crop shift or 1–2 px elevation with equivalent focus frame | P2 | Link/control semantics | Static card with strong focus | No hidden action reveal; no zoom that clips product pack |
| Wishlist toggle | Brief icon fill/draw after persistence succeeds | P2 | Global commerce status | Immediate pressed state | Failure restores old state; avoid heart burst/confetti clichés |
| Product gallery | Short crossfade between already-loaded images | P1 | Thumbnail selected state | Immediate image swap | Reserve dimensions; avoid lateral motion at zoom |
| Variant change | Price/pack/media crossfade as one resolved unit | P1 | PDP purchase summary | Atomic immediate replacement | No counting animation; focus stays on control; status emits once |
| Quantity stepper | Small numeral crossfade after commit | P2 | Quantity input/value | Immediate numeral | Typed input never animated or reformatted mid-entry |
| Add to cart | Subtle button confirmation and optional cart-count emphasis after success | P1 | Global commerce status/cart mutation | Immediate confirmed label/count | Never fly product across screen; failure has no success motion |
| Homepage editorial image | Slow ingredient/process micro-loop only if authored asset supports it | P3 | None | Static key frame | No autoplay video/audio; pause control if continuous; avoid parallax |
| Section reveal on scroll | Very short opacity-only reveal for noncritical decoration | P3 | None | Content already present/visible | Never gate content or produce long cascades; disable for reduced motion |
| Recipe serving change | Compact summary crossfade after valid recalculation | P1 | Recipe summary status | Immediate values | Do not animate each ingredient independently or obscure precision |
| Recipe include/omit | Small state-marker transition after committed choice | P1 | Review line state | Immediate marker/text | Text is persistent; colour/strikethrough not sole signal |
| Pack override/substitution dialog | Standard dialog reveal; changed math briefly highlights as a group | P1 | Dialog + row status | Immediate dialog/group update | Focus timing independent; no automatic substitution animation |
| Recipe review summary | Counts/total crossfade after line state commits | P1 | Review summary status | Immediate values | One aggregate announcement; no rolling numbers |
| Recipe atomic add success | Summary panel reveal and restrained sequential grouping of added/merged/skipped | P2 | Post-add page summary | Full summary appears immediately and receives focus | No celebratory claim/confetti; max short sequence; retry idempotency independent |
| Mini cart | Drawer reveal; new/merged line gets a brief non-colour edge highlight | P1 | Cart state/status | Immediate drawer/line | Opening after Add must follow approved focus policy, never automatic by motion alone |
| Cart quantity/remove | Local line-total crossfade; removed line collapses only after focus is placed safely | P1 | Cart mutation/status | Immediate removal with deterministic focus | No layout animation before focus target exists |
| Cart issue reconciliation | Issue strip appears with restrained fade | P1 | Error summary/line issue | Immediate issue | Blocking error focus/status must not wait for animation |
| Checkout step/submission | Busy indicator and gentle surface transition | P1 | Form busy/result | Immediate busy/static transition | No progress fiction; duplicate submit prevention is state-based |
| Demo confirmation | Optional restrained material flourish once | P3 | Confirmation route/content | Static flourish or none | No confetti, receipt metaphor, sound or real-order implication |
| Skeleton to content | Crossfade within reserved geometry | P1 | Loading state | Immediate content | Avoid shimmer for reduced motion; no cumulative layout shift |
| Error/empty recovery | None beyond short panel fade | Avoid/P1 | Error/empty content | Immediate panel | Errors must not shake; recovery remains calm and readable |

## Motion exclusions

- No autoplay carousel, looping marquee, cursor trail, parallax, scroll-jacking, horizontal wheel interception or long staggered card entrance.
- No bounce/shake for validation, flying product-to-cart metaphor, confetti purchase celebration, animated urgency, stock countdown or price roll-up.
- No animation of ingredients suggesting unsupported transformation, performance or result.
- No motion-driven instructions (“swipe to continue”) without an equivalent visible control.
- No GSAP timeline may own DOM insertion, selection, focus, validation, cart mutation, idempotency, route completion or live-region timing.

## Performance envelope for later Motion/GSAP specification

- Prefer opacity and transform on isolated layers; avoid layout/property animation on product grids, long recipe rows and commerce ledgers.
- Reserve media/container dimensions and prevent cumulative layout shift. Lazy motion initializes only when relevant and must not delay interaction readiness.
- Decorative motion should stop when off-screen, hidden or the document is not visible. Continuous motion requires strong justification and user pause.
- Later engineering must measure representative low/mid-tier mobile performance, main-thread cost and interaction responsiveness. Failure removes decorative motion, never functionality.

## Accessibility and status timing

- Focus transfer and accessible state change happen with the committed interaction, not at animation end.
- Live-region text is emitted once after state commit and is not repeated when animation completes.
- Reduced motion disables movement, parallax, continuous loops, count rolling and stagger. A minimal opacity transition may remain only if the user preference and testing support it; immediate replacement is always valid.
- Animation pause/cancel does not strand hidden, transparent, inert or unfocusable content.
- Flashing is prohibited; motion never conveys the only distinction between selected, stale, error or success.

## Handoff questions for Motion/GSAP

1. Which P1 opportunities materially improve orientation after prototype usability review?
2. Can each retained sequence remain under a short, consistent duration family without delayed interaction?
3. Does every timeline have an immediate reduced-motion branch and interruption-safe final state?
4. Can the effect be achieved with CSS before adding GSAP runtime cost?
5. Are focus, live status, loading and mutation lifecycles entirely independent of animation callbacks?

## Acceptance criteria

- Every critical dynamic surface has either a bounded opportunity or an explicit reason to avoid motion.
- P1/P2/P3 priorities enable scope reduction without functional loss.
- Each opportunity identifies its functional owner, no-motion equivalent and principal risk.
- The map introduces no motion code, timing choreography, unsupported claim or new interaction requirement.
