# Motion Performance Budget

**Phase:** 4B — Motion System and Asset Production Blueprint

**Status:** Reconciled Phase 4B recommendation

## Principle

Motion consumes a fixed optional budget after content, accessibility and interaction readiness. If a budget cannot be met on a representative mid-tier mobile device, reduce or remove decorative motion; do not defer state, input or content.

## Measurable budgets

| Measure | Target | Hard response |
|---|---:|---|
| Frame cadence during retained motion | target 60 fps; ≥95% frames within 16.7 ms on reference desktop/mid-tier mobile | enter constrained mode or remove effect if repeatably missed |
| Long tasks attributable to animation | 0 tasks >50 ms | block/rewrite effect |
| Scripting per animation frame | ≤4 ms p95 | reduce observers/elements or remove |
| Style + layout per frame | ≤4 ms p95; no forced synchronous layout loop | premeasure/batch or remove |
| Added interaction latency | ≤50 ms attributable setup after input; visual acknowledgement next frame | state feedback wins; skip animation |
| CLS caused by motion | 0.000 | release-blocking until geometry reserved |
| Simultaneous animated elements | ≤6 desktop, ≤3 mobile; signature grouped wrappers count individually | collapse groups/remove stagger |
| Concurrent incoming/outgoing raster layers | 2 in one region, 1 transitioning region at a time on mobile | immediate swap/static fallback |
| Blur/filter animation | one small decorative layer; ≤8 px, ≤180 ms | remove first under constraint |
| Signature total runtime | ≤900 ms once | truncate/finalise |
| Utility transition runtime | ≤280 ms | shorten |

Measurements use production builds with CPU/network throttling plus at least one representative real mid-tier Android-class device where available. A fast desktop trace alone is insufficient evidence.

## LCP-sensitive motion

- LCP text/media is fetched, decoded and painted without waiting for animation code, fonts or GSAP.
- No opacity-zero LCP initial state. The homepage opening’s final readable content is base state.
- Motion code for below-fold signatures loads after interaction-ready priority work and may be code-split.
- Added critical-path motion JavaScript target: ≤12 KiB gzip for shared runtime glue, excluding a justified tree-shaken library; any library addition requires bundle evidence and a CSS alternative comparison.
- Motion must add 0 ms intentional delay to LCP. If a decorative LCP media layer risks the page budget, ship the static key frame only.

## Asset and media limits for motion

- No autoplay video in v1 motion review/production recommendation.
- Above-fold animated decorative raster additions: ≤150 KiB compressed mobile, ≤250 KiB desktop beyond the required static composition.
- One signature’s additional below-fold raster frames/layers: ≤200 KiB mobile, ≤350 KiB desktop, lazy loaded near viewport.
- Prefer responsive AVIF/WebP for raster; SVG/CSS for simple rules/markers; never ship frame-sequence animation.
- Decode incoming variant image before crossfade and release obsolete layers. Do not keep every pack variant promoted to a GPU layer.

## GPU and compositor rules

Prefer transform and opacity on isolated layers, but do not assume they are free. `will-change` is applied shortly before a bounded animation and removed on completion/cancel. Permanent promotion, large full-screen translucent layers, animated shadows, filters, masks and blend modes are prohibited without profiling.

Even transform/opacity must not run when:

- reduced/none mode applies;
- target is off-screen or document hidden;
- user is typing, arrowing through suggestions or rapidly selecting variants;
- a blocking error or focus transfer needs immediate stability;
- layer dimensions are large enough to exceed memory/paint budget;
- zoom, resize or virtual keyboard makes geometry unstable;
- measured frame budget is missed for two representative runs;
- save-data/capability fallback selects constrained mode.

## Main-thread and scroll implementation

- No unbounded `requestAnimationFrame` loop. Start on trigger; stop on completion, cancel, hidden/off-screen and unmount.
- Batch reads before writes; never read layout after a per-frame write.
- Use one observer per signature region or shared observer, not one observer/timeline per card.
- Passive listeners for observational scroll where appropriate; no scroll handler may call state updates every frame.
- Scroll-linked progress updates only compositor-friendly decorative layers and is removed on mobile if profiling fails.

## Loading/progress

Reserved skeletons create no layout shift. One spinner per busy region maximum. Shimmer is disabled by default and always disabled for reduced/constrained. Loading indicators stop when complete, error, hidden or unmounted. They do not run beneath loaded content.

## Mobile and low-powered fallback

Constrained mode removes all five signature timelines, scroll links, blur, springs, masks and stagger while preserving static signature compositions. It retains at most short opacity/transform for a single overlay/local state if budget passes. Variant media swaps immediately. The fallback is sticky for the current page once a sustained failure is observed, preventing oscillation between modes.

Do not fingerprint devices. Use user preferences, standard capability hints where appropriate and local performance evidence without persistence/analytics identity.

## Instrumentation and evidence

For each signature and representative utility transition capture:

- production-build route, viewport, DPR and motion mode;
- timeline duration and simultaneously animated layers;
- frame trace/dropped-frame percentage;
- attributable long tasks and scripting/layout p95;
- CLS during trigger and interruption;
- heap/layer observations for repeated variant/media changes;
- interruption and hidden-tab cleanup result;
- bundle and responsive asset transfer size.

Evidence must include 1440, 1024, 768, 430 and 320 CSS px, with the remaining approved widths covered by layout/overflow automation. Also test 200% zoom, orientation change and rapid repeat.

## Failure policy

Performance regression cannot be solved by delaying input, reducing accessibility feedback or hiding content. Remove in order: blur/filter; spring; stagger; scroll-link; decorative media layer; entire signature animation. Retain the static Phase 4A composition and P1 orientation only when it passes.

## Acceptance criteria

- No motion-created CLS or animation-attributable long task.
- Representative mobile evidence meets frame and concurrency budgets.
- LCP/interaction readiness does not wait for motion runtime.
- Rapid repeated actions do not grow active timelines, layers or memory.
- Reduced/none modes initialise no scroll timelines or continuous animation.
- Full removal of decorative motion leaves identical functionality and content.
