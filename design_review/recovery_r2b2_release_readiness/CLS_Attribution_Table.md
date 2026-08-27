# CLS Attribution Table — R2B2R Investigation

This documents the deepest CLS investigation across all three phases (R2B2F Role 6 → R2B2F-POLISH D-048/R-051 → this phase). It supersedes neither prior finding; it adds a decisive new fact: **the shift is an intermittent race, not a deterministic layout defect**, and it is **not caused by any application code path tested** — a longer list than any prior phase has ruled out.

## The shift, exactly

Extracted directly from Lighthouse's own Chrome trace (`--save-assets`, not a reproduction) for `/` at desktop preset (1350×940, `throttlingMethod: "simulate"`, `cpuSlowdownMultiplier: 1` — i.e. **no artificial CPU/network throttling was applied during trace collection**; only downstream timing metrics like LCP/TBT are mathematically adjusted for a simulated connection, CLS is not):

```json
{
  "name": "LayoutShift",
  "ts": 21756046903,
  "args": { "data": {
    "score": 0.5276595744680851,
    "impacted_nodes": [{
      "node_id": 61,
      "old_rect": [0, 444, 1350, 496],
      "new_rect": [0, 0, 0, 0]
    }],
    "frame_max_distance": 9057
  }}
}
```

A direct Playwright reproduction at the identical viewport (1350×940, no throttling, `PerformanceObserver` registered via `page.addInitScript()` — active from navigation start, unlike a post-navigation-registered observer) reproduced the **exact same score and rects**, with full node identification:

```
value: 0.5276595744680851, time: 121.1ms
source: <footer class="site-footer surface-tactile">
prevRect: {x:0, y:444, width:1350, height:496, bottom:940}
currRect: {x:0, y:0, width:0, height:0}
```

**Reading this:** at ~112ms (first paint, confirmed via the `paint` timeline — `first-contentful-paint` fires at 112.0ms in the same trace), the footer's box occupies the bottom half of the viewport — meaning the document was very short at that moment, as if almost nothing between the hero and the footer had contributed height yet. ~9ms later the footer's real (much lower, off-screen) position takes over, and the region it vacated in the viewport is scored as a full-viewport-width, half-viewport-height shift.

## It is an intermittent race, not a guaranteed shift

Ten consecutive, otherwise-identical Lighthouse runs against the same unchanged production build:

| Run | CLS |
|---|---|
| 1 | 0.5276595744680851 |
| 2 | **0** |
| 3 | 0.5276595744680851 |
| 4 | 0.5276595744680851 |
| 5 | **0** |
| 6 | 0.5276595744680851 |
| 7 | 0.5276595744680851 |
| 8 | **0** |
| 9 | **0** |
| 10 | **0** |

**5/10 exactly zero, 5/10 the exact same non-zero value — a binary outcome, never a partial/intermediate score.** This is the signature of a genuine timing race between first paint and whatever finalizes the footer's true position, not a deterministic rendering bug: on roughly half of loads, the race resolves in the app's favor and Lighthouse would report 0.

## What was tested and ruled out (this phase)

Each row is a controlled A/B test: apply exactly one change, rebuild, run Lighthouse 3–6 times, compare the zero/non-zero split against the same-build baseline.

| Hypothesis | Test | Result |
|---|---|---|
| Below-fold homepage sections don't reserve layout space, so the page is briefly short | Added `content-visibility:auto` + `contain-intrinsic-size` (matched to each section's real measured height) to every homepage section after the hero | **No effect** — identical `0.5276595744680851` on every non-zero run, same as baseline |
| `contain-intrinsic-size` isn't applied early enough (content-visibility's relevance calc may not commit on the very first frame) | Added a plain, unconditional `min-height` (verified present in the raw SSR HTML via `curl`) alongside the above | **No effect** — identical score |
| GSAP's `useLayoutEffect`-driven entrance animations (`MotionEnhancer`, `useHeroParallax`) are the trigger | Temporarily removed both from the homepage (bypassed `<MotionEnhancer>`, commented out `useHeroParallax`) — diagnostic only, reverted immediately regardless of outcome | **No effect** — 2/6 zero, same ballpark rate as with motion present |
| `prefers-reduced-motion` (no animation at all, any hook) | Tested with `reducedMotion: "reduce"` context | **No effect** — still hit the non-zero value |
| Client-only cart/wishlist hydration (`CommerceProvider`'s `ready` flag) | N/A for a fresh Lighthouse profile (empty cart, `ready` flips true in <1ms via `queueMicrotask`, confirmed separately for the checkout investigation in this same phase) | Not a plausible contributor at this timescale |
| Web fonts / `font-display` mismatch | Checked `--display`/`--ui` custom properties | **Ruled out at the source** — both are pure system-font stacks (`Georgia`, `-apple-system`, etc.); zero `@font-face`, zero Google Fonts, zero `next/font` usage anywhere in the codebase |
| Page-length-independent Lighthouse/tooling artifact | Ran the identical Lighthouse invocation against `/about` (short, no rails) and `/recipes` (2272px, taller than viewport, zero GSAP) | **CLS = 0 on both** — rules out "any Lighthouse run on this app scores this" |
| Scrollbar-width change as content grows | Polled `document.documentElement.clientWidth` alongside `scrollHeight` through the load sequence | **Unchanged throughout** (1440px constant) — not a scrollbar-gutter cause |

All CSS/JSX changes made to test these hypotheses were reverted after being disproven — the shipped diff from this phase touches only the checkout evidence-capture logic and this evidence/report set, not any homepage/PLP/PDP rendering code, per "fix only attributable application causes."

## What this does and doesn't establish

**Established:** the shift is real (not a screenshot/measurement artifact — Lighthouse's own raw trace shows it), it is intermittent (≈50% of loads), it correlates with page length (`/about`, `/recipes` never show it), and none of image sizing, CSS containment, GSAP/motion, or reduced-motion settings changes its rate.

**Not established:** the precise trigger. The consistent ~9ms gap between first paint (112ms) and the shift (121ms) across every reproduction suggests it is tied to whatever finishes right around the browser's hydration-commit window on a large, image- and DOM-heavy page — but isolating that exact trigger (e.g., via Chrome's `Layout`/`UpdateLayoutTree`/`V8.compile` trace events correlated frame-by-frame) requires lower-level DevTools Performance-panel profiling than this bounded phase has budget for, and every application-level lever available (CSS containment, motion removal) has now been tested and excluded.

## Recommendation

Do not attempt further CSS/motion changes aimed at this metric without new evidence — three separate targeted attempts (this phase) and the footer-level `content-visibility` fix from R2B2F-POLISH have collectively moved the rate from "always happens" (R2B2F-POLISH's own measurements, before any investigation) to "an already-present, unchanged ~50% intermittent rate" with zero measurable improvement from any code change tested. The next productive step, if pursued, is a frame-by-frame DevTools Performance-panel trace (not Lighthouse) correlating the exact `Layout`/style-recalc event that fires in the ~112–121ms window against React's hydration-commit timing — genuinely separate, deeper tooling work outside this phase's scope.
