# Motion Tokens

**Phase:** 4B — Motion System and Asset Production Blueprint

**Status:** Reconciled Phase 4B recommendation

## Architecture

Tokens have primitive and semantic layers. Components and timelines consume semantic names, never raw duration/easing values. All values are maximum defaults: implementations may shorten or remove motion for capability, interruption or accessibility.

## Duration

| Semantic token | Value | Use |
|---|---:|---|
| `motion-duration-instant` | 0 ms | reduced/no-animation, state correction |
| `motion-duration-feedback` | 120 ms | pressed, selected, small icon/state acknowledgement |
| `motion-duration-micro` | 160 ms | chip removal, local highlight, tooltip/support |
| `motion-duration-local` | 220 ms | suggestions, atomic media/data transition |
| `motion-duration-overlay` | 260 ms | drawer/dialog opening; close may use 180 ms |
| `motion-duration-section` | 420 ms | one editorial group entrance |
| `motion-duration-signature` | 720 ms | coordinated signature sequence base |
| `motion-duration-signature-max` | 900 ms | hard ceiling for one triggered signature |

No user action is delayed by a duration token. Debounce, network timeout and status timing are not motion tokens.

## Easing

| Semantic token | CSS cubic-bezier | Use |
|---|---|---|
| `motion-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | local movement/change |
| `motion-ease-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | decelerating entrance |
| `motion-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | quick dismissal |
| `motion-ease-emphasis` | `cubic-bezier(0.22, 1, 0.36, 1)` | signatures, once per moment |
| `motion-ease-linear` | `linear` | determinate progress only |

Elastic/bounce/back eases are prohibited in commerce and accessibility-critical paths.

## Delay and stagger

| Token | Value | Rule |
|---|---:|---|
| `motion-delay-none` | 0 ms | default |
| `motion-delay-context` | 40 ms | only between meaningful signature groups |
| `motion-stagger-tight` | 35 ms | maximum 5 groups |
| `motion-stagger-measured` | 60 ms | maximum 4 groups |
| `motion-stagger-cap` | 240 ms | maximum total extension |

Never stagger result cards, recipe rows, errors, focusable controls or live status. Repeated inputs reset to zero delay.

## Distance

| Token | Value | Use |
|---|---:|---|
| `motion-distance-none` | 0 | reduced/no-animation |
| `motion-distance-nudge` | 2 px | pressed/local feedback |
| `motion-distance-small` | 6 px | anchored content settle |
| `motion-distance-medium` | 12 px | editorial grouping |
| `motion-distance-large` | 20 px | signature object placement maximum |
| `motion-distance-overlay` | 100% of own axis | drawer only |

No document-level parallax or viewport-scale translation. At mobile/zoom, halve non-overlay travel or remove it.

## Scale, opacity and blur

| Token | Value | Constraint |
|---|---:|---|
| `motion-scale-pressed` | 0.985 | pointer/touch press only; never changes layout |
| `motion-scale-enter` | 0.98 | anchored popover/media layer only |
| `motion-scale-emphasis` | 1.02 | decorative signature layer maximum |
| `motion-opacity-hidden` | 0 | decorative layer only; essential DOM cannot depend on this initial state |
| `motion-opacity-soft` | 0.72 | crossfade source minimum |
| `motion-opacity-visible` | 1 | final state |
| `motion-blur-soft` | 4 px | one decorative raster layer, ≤180 ms |
| `motion-blur-max` | 8 px | hard limit; never text, controls or large mobile layers |

Blur is optional and removed first under constrained capability. Do not animate CSS filters on multiple full-width elements.

## Spring behaviour

Springs are permitted only for a small decorative ingredient placement or successful wishlist/cart-count acknowledgement. Use critically damped or near-critically damped behaviour: no visible overshoot, one settle, total ≤320 ms, displacement ≤6 px or scale ≤1.02. A deterministic duration/easing fallback is mandatory. Springs are prohibited for overlays, focus, errors, prices, quantities, variant facts and recipe calculations.

## Scroll-linked limits

- Progress is derived from native scroll without changing scroll position.
- At most one optional signature scrub region per page; progress span ≤60% of one viewport and transform range ≤20 px.
- No pinning beyond one viewport; preferred implementation uses ordinary sticky layout with contained decoration.
- Scroll-linked work pauses off-screen/hidden and is disabled on reduced motion, low-power fallback, 200%+ zoom or when coarse-pointer/mobile performance fails budget.
- Entrances trigger once at a 15–25% visibility threshold and may not hide essential content before observation.

## Loading and progress

- Indeterminate spinner: 700–900 ms linear rotation, one instance per affected region, stops when hidden; reduced motion uses a static busy icon/text.
- Skeleton: reserved geometry with no shimmer by default. If shimmer is retained after testing, cycle ≥1400 ms, low contrast, one shared layer, disabled for reduced motion.
- Determinate progress: only with a real measured total; linear visual update ≤120 ms and explicit text/value. Never fabricate checkout progress.
- Busy controls retain their verb/context; domain completion and status never depend on spinner cycle.

## Semantic compositions

| Token | Composition |
|---|---|
| `motion-enter-anchored` | local + enter + small distance + opacity |
| `motion-swap-atomic` | local + standard + crossfade; stable container |
| `motion-feedback-confirm` | feedback + standard + nudge/scale optional |
| `motion-overlay-open` | overlay + enter + own-axis transform + scrim fade |
| `motion-overlay-close` | 180 ms + exit + own-axis transform + scrim fade |
| `motion-signature-place` | signature + emphasis + max 4 measured groups |
| `motion-state-immediate` | instant; apply semantics, focus and status |

## Runtime control contract

- `motion-mode`: `full | reduced | none | constrained`.
- Full is allowed only when preference and capability permit.
- Reduced follows the OS preference and the replacement contract.
- None is a review/test flag applying final states with zero animation.
- Constrained preserves only P1 orientation at micro/local durations and removes signatures, blur, springs, scroll links and stagger.
- Preference/mode changes take effect immediately, cancel active timelines and resolve final state.

## Implementation notes

Expose tokens as CSS custom properties and a typed motion configuration. GSAP timelines, if used, reference the same semantic values. Automated checks reject page-specific magic timing, transform travel beyond limits and animation callbacks that mutate domain state. Values require real-device verification before production lock.
