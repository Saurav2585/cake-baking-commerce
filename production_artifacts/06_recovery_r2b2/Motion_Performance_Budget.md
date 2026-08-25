# Motion Performance Budget — R2B2A (Real-Catalog Motion System)

**Gate:** R2B2A — Recovery Multi-Agent Execution Plan, Task 4 (3D/Parallax Experience Expert)
**Status:** Numeric companion to `Motion_3D_Specification.md`. Specification only — no implementation code written by this task.
**Repository state analyzed:** branch `recovery/real-commerce-visuals`, HEAD `15e621d8077ac60af9adf1e4d668ecf2416cd695`.

**CLAUDE-GENERATED IMAGES: 0**

This file re-derives the Phase 4B `production_artifacts/04_motion_assets/Motion_Performance_Budget.md` budget shape with real-catalog-specific numbers. The Phase 4B document's **measurement categories and enforcement philosophy** (frame cadence, long-task ceiling, CLS-zero, failure-removal order) are retained as valid, reusable principles — see `Motion_3D_Specification.md` §1. The **numeric asset weights are re-derived**, because Phase 4B was budgeted against a planned illustrated/SVG/AVIF asset family ("Measureloom") that was never produced; the real catalog instead ships photographic JPG/PNG/WebP product imagery whose measured file sizes are used below.

---

## 0. Method and evidence base

Numbers below are grounded in the actual repository, not estimated in the abstract:

- Real product source images measured directly: `public/real-products/*.jpg|png` range **26 KB–181 KB** (12 files, sampled); `public/real-products-v2/*.jpg|png` range **~90 KB–332 KB** (31 files, sampled — this v2 batch is higher-resolution source photography intended for `next/image` to downsample, not the delivered wire size).
- Department tile imagery is pre-optimized WebP: `public/assets/catalog/asset_pf5b_department_*_v1_square_800.webp` (square, homepage atlas) and `..._wide_1536x1024.webp` (wide crops for promo panels).
- `next.config.ts` sets no custom image config (`output: "standalone"`, `poweredByHeader: false`, `allowedDevOrigins` only) — Next.js's default `next/image` optimizer applies, meaning **actual delivered bytes are AVIF/WebP re-encodes at the requested `sizes` breakpoint, not the raw source file sizes above.** Budgets below are stated against delivered (optimized, per-breakpoint) bytes, which is what a shopper's device actually downloads.
- No autoplay video, no WebGL canvas, and no icon/sprite-sheet frame-animation exists anywhere in `src/` today. This file budgets for the motion system in `Motion_3D_Specification.md` only (pointer-parallax hero, atlas/rail entrance, PDP crossfade, CSS micro-motion) — it does not need to account for a heavier asset class because none is recommended (see §7).

---

## 1. Sitewide structural caps

| Budget | Value | Rationale / verification method |
|---|---:|---|
| Max pinned (`position: sticky` used as a scroll-hijack/pin, i.e. GSAP `ScrollTrigger.pin`) sections sitewide | **0** | `Motion_3D_Specification.md` §4 makes zero pins the explicit decision for the only candidate (hero). No other storyboard proposes one. QA check: `grep -rn "pin:\s*true\|pin={true}\|\.pin(" src/` must return no matches in shipped motion code. |
| Max concurrent GSAP timelines/contexts active at once (whole page) | **2** | One entrance-class context (atlas/rail `IntersectionObserver`-driven, or hero ENTRY) plus at most one interaction-class context (hero pointer-parallax BUILD, or PDP crossfade) can legitimately overlap; a third implies an unbounded animation architecture beyond this spec's three storyboards. |
| Max optional scroll-scrubbed (progress-linked) regions sitewide | **0** | No storyboard in `Motion_3D_Specification.md` uses scroll-scrub; the Phase 4B allowance of "≤1 optional signature scrub region" is retained as a ceiling but this gate does not spend it. Any future scrub proposal must be justified against this stated zero baseline, not assumed. |
| Max simultaneous animated DOM layers, desktop | **6** | Retained numerically from Phase 4B (`Motion_Performance_Budget.md` "Simultaneous animated elements ≤6 desktop, ≤3 mobile"); still appropriate because the real-catalog storyboards are equal or lower complexity than the illustrated ones it was set against. Worst case in this spec: hero BUILD phase animates 3 layers (Z2/Z3-pair counted as 2/Z4) concurrently with an atlas/rail entrance if a shopper scrolls while moving the pointer — 3 (hero) + up to 1 group-wrapper (atlas or rail, since each group counts as one wrapper, not per-card) = 4, under budget. |
| Max simultaneous animated DOM layers, mobile | **3** | Mobile disables hero pointer-parallax entirely (no hover/fine-pointer) and reduces hero ENTRY to 2 groups; atlas/rail entrance contributes at most 1 group wrapper at a time → worst case 3, at budget, never exceeding it. |
| Max animated elements per viewport (any route) | **8** | A single viewport may show at most one rail's card grid (4–8 cards) *as one non-staggered group wrapper* (counts as 1 animated element, not 8) plus the department atlas's currently-visible tiles (also grouped, counts as ≤4 paired-group wrappers per §Storyboard B). Per-card/per-tile independent animation is prohibited outright (`Motion_3D_Specification.md` §5), which is what keeps this number low despite 7–8 visible cards/tiles. |
| Max GSAP `gsap.context()` scopes mounted at once | **4** | motion-enhancer.tsx global scope (existing) + hero collage scope + atlas/rail entrance scope(s) + PDP variant-swap scope (only present on PDP route, mutually exclusive with homepage scopes). No route mounts more than 3 of these simultaneously today. |

---

## 2. Image byte budget per route

Budgets are for **decorative/product imagery affected by or adjacent to a motion sequence**, measured as delivered (optimized) bytes at the stated breakpoint, additive to whatever the route needs regardless of motion (motion adds 0 new image bytes anywhere in this spec — every sequence reuses images the route already renders).

| Route | Breakpoint | Images this budget governs | Byte budget (delivered, per image) | Byte budget (region total) |
|---|---|---|---:|---:|
| `/` (homepage) hero collage | Desktop (≥1024px) | 4 collage images (`heroLarge` LCP + `heroA` + `heroB` + `heroSmall`) | LCP (`collage-large`) ≤ **70 KB**; each secondary ≤ **45 KB** | ≤ **210 KB** total across all 4 |
| `/` (homepage) hero collage | Mobile (≤640px) | 2 visible images (`collage-large` + `collage-small`; `collage-a`/`collage-b` are `display:none`, not requested by `next/image` at this breakpoint) | LCP ≤ **45 KB**; secondary ≤ **28 KB** | ≤ **73 KB** total |
| `/` department atlas | Desktop | 8 tile images, WebP pre-optimized source | ≤ **35 KB** each (source WebP already ≤ this at `square_800`; verify per-file, do not regress) | ≤ **280 KB** total, lazy-loaded below fold |
| `/` product rails (bestsellers/new/essentials/tools) | Any | Per-card thumbnail (`next/image` from `real-products-v2` sources) | ≤ **30 KB** each at rail thumbnail `sizes` | No section cap beyond per-image cap — rails lazy-load off-screen cards; only visible-viewport cards count toward §1's "max animated elements," not toward a cumulative byte cap |
| `/shop/[dept]`, `/product/[slug]` (PDP gallery) | Desktop | 2 concurrently-mounted raster layers during a crossfade (incoming + outgoing, `Motion_3D_Specification.md` §6) | ≤ **90 KB** each at `58vw` PDP primary sizing | ≤ **180 KB** transient (outgoing layer releases immediately after crossfade) |
| `/product/[slug]` (PDP gallery) | Mobile | Same 2-layer crossfade at `100vw` sizing | ≤ **55 KB** each | ≤ **110 KB** transient |
| `/recipes/[slug]` (recipe-to-cart) | Any | Recipe hero image (static, no motion sequence attached) | ≤ **80 KB** | N/A — not governed by this motion spec; STATIC per `Motion_3D_Specification.md` §7.1 |

**Enforcement note:** these are ceilings on the *specific images each storyboard touches*, not a whole-route transfer budget (which is a broader engineering/QA concern outside this task's remit). Any image exceeding its ceiling blocks that storyboard's motion (falls back to the reduced-motion/no-animation equivalent, per §6 failure policy) — it does not block the route from shipping.

---

## 3. Main-thread work budget (QA-verifiable)

| Measure | Target | How QA verifies it |
|---|---:|---|
| Long tasks (>50 ms) attributable to motion during scroll | **0** | Chrome DevTools Performance panel or Lighthouse trace on a production build, scrolling through the full homepage at throttled 4x CPU; filter the trace to scripting entries inside `motion-enhancer.tsx`/hero/atlas/rail GSAP contexts; count must be 0. |
| Long tasks (>50 ms) attributable to motion on PDP variant click | **0** | Same trace method, triggering 5 rapid variant clicks in succession (interruption stress test); the cancel-and-restart path (`Motion_3D_Specification.md` §6 EXIT) must not itself produce a long task. |
| Scripting time per animation frame (p95) | **≤ 4 ms** | Performance panel per-frame breakdown during hero BUILD (pointer-parallax) — the highest-frequency handler in this spec (`mousemove`-driven `gsap.quickTo`). |
| Style + layout recalculation per frame | **≤ 4 ms p95; 0 forced synchronous layout events** | Performance panel "Layout"/"Recalculate Style" entries must show no red "forced reflow" warning during any storyboard's PEAK phase. |
| Cumulative Layout Shift attributable to motion | **0.000** | Lighthouse/CLS trace before/after enabling the motion system; PDP crossfade's reserved-frame requirement (`Motion_3D_Specification.md` §6, "both occupy the same reserved `.pdp-primary` frame — no CLS") is the highest-risk case and must be checked explicitly with 2 concurrently-mounted image layers. |
| Added interaction latency from a motion trigger to visual acknowledgement | **≤ 50 ms** | Click-to-first-paint-of-change timing on PDP variant click and rail add-to-cart button; state (aria-pressed, cart count) must update synchronously with the click per the spec, independent of animation completion. |
| Frame cadence during any active timeline | **≥ 95% of frames within 16.7 ms** on a reference mid-tier Android-class device (throttled 4x CPU emulation is an acceptable proxy if physical device unavailable) | Performance panel FPS meter / `requestAnimationFrame` timestamp delta logging during hero BUILD and atlas entrance. |
| `IntersectionObserver`/IO callback count per triggered region | **1 shared observer per region** (atlas: 1 total; rails: 1 shared or 1 per rail section, never 1 per card) | Code review + `PerformanceObserver`/console instrumentation counting `IntersectionObserver` instantiations at runtime; must not scale with card/tile count. |

---

## 4. GPU/compositor rules (retained from Phase 4B, reapplied)

- Only `transform` and `opacity` are animated by GSAP in this spec (§7 of `Motion_3D_Specification.md` confirms this per storyboard) — no `filter`, `blur`, `box-shadow`, `width`/`height`, or `top`/`left` animation anywhere.
- `will-change: transform` is applied only to the hero's 3 pointer-reactive layers, only while the pointer is inside `.hero-collage` bounds, and removed on `mouseleave`/unmount/route change (`Motion_3D_Specification.md` §4 performance note). No other sequence needs `will-change` — the PDP crossfade and atlas/rail entrances are short, one-shot, and do not benefit from persistent layer promotion.
- No sequence promotes a layer that is not currently animating; the PDP crossfade's outgoing layer is unmounted (not merely hidden) immediately after its fade completes or is killed.

---

## 5. Mobile / low-power / `prefers-reduced-motion` reductions

This table states exactly what turns off or simplifies under each constraint, per storyboard, so engineering and QA can check a concrete before/after rather than a vague "reduce motion."

| Storyboard | Desktop (fine pointer + hover) | Narrow desktop/tablet (640–1024px, no hover) | Mobile (≤640px) | `prefers-reduced-motion: reduce` |
|---|---|---|---|---|
| A — Hero collage | Full 4-layer depth-staggered ENTRY + pointer-driven BUILD/PEAK (Z2 ≤3px, Z3 ≤12px, Z4 ≤18px) | ENTRY only, all 4 layers; **no pointer parallax** (gated on `(hover: hover) and (pointer: fine)`, not viewport width alone) | ENTRY only, **2 layers** (Z2 + Z4 — `collage-a`/`collage-b` are already `display:none` at this breakpoint), travel ≤8px each | Full final composition renders immediately; **no `mousemove` listener is even attached** (not just skipped mid-tween) |
| B — Atlas/rail entrance | 4 paired-group atlas settle (35ms stagger) + single-group rail settle | Single boundary/number settle (no tile pairing — matches existing `tile-2`/`tile-3` offset reset at this breakpoint) + single-group rail settle | Same single-group settle, both regions collapsed to 1-column layout | Static final atlas/rails in authored resting position (including the layout-owned, non-motion `translateY(3rem)` offset); no `IntersectionObserver` attached |
| C — PDP crossfade | Opacity + scale (0.98→1) crossfade, 220 ms, both layers | Same as desktop (no pointer/hover dependency in this storyboard) | **Opacity-only crossfade — scale removed** | Immediate atomic replacement, no crossfade, no scale, matching the pre-existing `Reduced_Motion_and_No_Animation_Contract.md` row verbatim |
| Cart count badge pulse | CSS `@keyframes` scale 1→1.02→1, ≤320ms | Same (CSS, not viewport-gated) | Same | Pulse suppressed by the sitewide `@media (prefers-reduced-motion: reduce)` block already in `globals.css:1231-1243` (`animation-duration: 0.01ms !important`) — count text itself still updates instantly |
| Recipe row highlight | CSS background/border pulse ≤160ms | Same | Same | Same sitewide reduced-motion block suppresses the transition; text value is already correct and visible at commit time regardless |

**Sustained-failure fallback (constrained mode):** if §3's frame-cadence or long-task budget is repeatably missed on a representative mid-tier device, removal happens in this order (retained verbatim from Phase 4B's failure policy, still correct): (1) hero pointer-parallax BUILD/PEAK only, keeping ENTRY; (2) atlas/rail entrance stagger, collapsing to instant static reveal; (3) PDP crossfade's scale component, keeping opacity-only; (4) PDP crossfade entirely, reverting to the current hard-cut `key`-remount. The cart-badge and recipe-row CSS micro-motions are removed last, if ever, because they are single-element, sub-320ms, and the cheapest items in the whole budget. Once constrained mode activates for a page, it stays active for that page load (no oscillation between modes mid-session).

---

## 6. Failure policy

Unchanged in principle from Phase 4B: a performance regression is never solved by delaying input, withholding accessibility feedback, or hiding content. The removal order in §5's constrained-mode fallback is the enforceable version of that principle for this specific motion system. The static, fully-legible composition (current shipped homepage/PDP/atlas, screenshotted in `design_review/recovery_r2a_rework/screenshots/`) is always the retained floor — every storyboard in `Motion_3D_Specification.md` degrades to it, never below it.

---

## 7. WebGL / heavier-technique verdict

**No WebGL, canvas, or true-3D technique is budgeted for in this scope.** Consistent with `Motion_3D_Specification.md` §9: every signature moment in the R2B2A brief (hero, discovery, PDP, recipe, cart) is fully expressible in bounded DOM `transform`/`opacity`, and a photographic-provenance commerce site gains no shopper value from a synthetic 3D layer that this budget would otherwise need to account for (extra bundle weight for a 3D runtime, GPU memory for meshes/textures, a WebGL context's own long-task and battery profile). This is a **plain "no" holding at zero**, not a placeholder pending future numbers — if a future 3D product configurator is proposed, it needs its own performance budget written against a stated user need, not an extension of this table.

---

## 8. Handoff

**Completed:** Explicit numeric budgets for sitewide structural caps (pins, concurrent timelines, scroll-scrub regions, simultaneous animated layers desktop/mobile), image byte budgets per route/region grounded in measured repository asset sizes, a main-thread work budget stated in QA-verifiable terms (long-task counts, scripting/layout p95, CLS, interaction latency, frame cadence, observer count), GPU/compositor rules, a per-storyboard mobile/low-power/reduced-motion reduction table, a failure/removal-order policy, and an explicit no-WebGL verdict.

**Artifacts created or updated:**
- `production_artifacts/06_recovery_r2b2/Motion_Performance_Budget.md` (this file)
- `production_artifacts/06_recovery_r2b2/Motion_3D_Specification.md` (companion — verified against the live repository during this task, not modified; see that file's own Handoff for its change history)
- No Asset Request file created — none was needed; confirmed no `Asset_Requests_For_External_Generation.md` exists yet in `production_artifacts/06_recovery_r2b2/` and this task adds nothing to it.

**Key decisions:**
1. Byte budgets are stated against **delivered/optimized** bytes (what `next/image`'s default AVIF/WebP negotiation actually ships at each `sizes` breakpoint), not raw source file sizes, because the two differ by roughly 2–4x in this repository's measured samples.
2. Structural caps (0 pins, 0 scroll-scrub regions, ≤2 concurrent GSAP contexts) are set at the exact values `Motion_3D_Specification.md`'s three storyboards actually consume — not padded "just in case" — so any future motion addition is forced to justify its own budget line rather than quietly fitting inside slack left here.
3. The mobile/reduced-motion reduction table is organized per-storyboard (not as one generic "mobile turns off animation" statement) so QA can check each row independently.
4. Failure-policy removal order places the two CSS-only micro-motions (cart badge, recipe row) last, since they are the cheapest and least likely to ever need removal — this makes the fallback ladder informative rather than arbitrary.

**Constraints preserved:** All numeric ceilings in this file are consistent with and do not loosen any constraint stated in `Motion_3D_Specification.md` (0 pins, 0 scroll-scrub, transform/opacity-only, real-asset-only, no WebGL). No new imagery generated or requested by this file.

**Open risks:**
- The image byte budgets in §2 are ceilings derived from current measured source-asset sizes and Next.js default optimization behavior; they have not been verified against an actual production build's network trace (this task did not run a build/serve cycle — that verification belongs to Agent 5/QA before implementation sign-off).
- The "≥95% frames within 16.7ms on a reference mid-tier Android-class device" target in §3 has no physical-device measurement attached yet in this gate; a throttled-CPU emulation proxy is offered as an interim acceptance method until real-device evidence is available.
- If Agent 3's `Route_UI_Specification.md` changes the DOM structure of the hero collage, atlas, rails, or PDP gallery, the per-region image counts and byte budgets in §2 need re-validation (same dependency `Motion_3D_Specification.md` already flags for its Z-layer maps).

**Unresolved questions or assumptions:**
- Assumed Next.js's default image optimizer (no custom loader/config in `next.config.ts`) remains in place through implementation; if a CDN/custom loader is introduced later, the delivered-byte assumption in §2 needs re-checking against that loader's actual output.
- Assumed "representative mid-tier Android-class device" throttling profile matches what QA's existing test matrix (referenced in `docs/Risk_Register.md` R-013/R-026 mobile-reflow work) already uses; this file does not define a new device/throttling standard, it reuses whatever QA's existing protocol is.

**Dependencies for next task:** Agent 5 (`Frontend_GSAP_Architecture.md`) needs §1 and §4 (structural caps, GPU rules) to scope how many `gsap.context()` module boundaries to design for. Agent 6 (QA) needs §3 (main-thread verification methods), §2 (byte budgets to check against a real production build/network trace), and §5 (the per-storyboard reduction table) to write concrete acceptance tests and device-matrix evidence.

**Next responsible agent:** Specialist Agent 5 (GSAP/Frontend Architect) for implementation planning against these caps; Specialist Agent 6 (QA) for acceptance-criteria authoring and real production-build/device verification of every budget line in this file.

**Required next action:** Orchestrator reconciles this budget file and its companion spec against Agent 3's `Route_UI_Specification.md` and Agent 5's `Frontend_GSAP_Architecture.md`, then schedules a production-build network/performance trace (Agent 6) to convert §2/§3's pre-implementation estimates into measured evidence before R2B2 implementation sign-off.

**Verification evidence:** Image byte estimates are grounded in direct measurement of `public/real-products/*`, `public/real-products-v2/*`, and `public/assets/catalog/asset_pf5b_department_*.webp` file sizes on disk at the stated HEAD; structural caps are cross-checked against every storyboard in `Motion_3D_Specification.md` (verified in turn against `src/app/page.tsx`, `src/app/globals.css`, `src/components/motion-enhancer.tsx`, `src/components/product-detail.tsx`, `src/components/recipe-review.tsx`, `src/components/commerce-provider.tsx`, `src/components/site-header.tsx`); `next.config.ts` was read directly to confirm no custom image loader is configured; the Phase 4B budget shape was read in full (`production_artifacts/04_motion_assets/Motion_Performance_Budget.md`) to identify which measurement categories to retain versus re-derive. No implementation code was written; no image was generated; no production build or device trace was executed by this task (flagged as an open risk above, owned by Agent 6).
