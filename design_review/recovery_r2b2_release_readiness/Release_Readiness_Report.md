# R2B2R — Release-Readiness Report

**Branch:** `recovery/real-commerce-visuals` · **Starting commit:** `994cb52` · **Scope:** performance stability, checkout verification, release hygiene. Visual design preserved; no verified commerce logic changed.

## 1. Checkout root-cause verification — resolved

The external review's mobile checkout evidence showed only "Measuring the pantry…" then the footer — never the populated checkout UI. Investigated exactly as instructed:

- **390×844, 360×800** (direct navigation, restored cart state): `ready` resolves in 24ms / 22ms.
- **6x CPU + slow-network throttling** (400ms latency, 400kbps down): `ready` resolves in 41ms (isolated) / consistently under budget in the full regression suite even under real parallel-worker contention.
- **Fresh navigation from a populated cart** (cart → checkout soft nav): `ready` resolves in 314ms (worst case measured).
- **Direct checkout navigation with restored cart state**: confirmed working, both viewports.
- **Hydration / client-side route transition**: confirmed — `CommerceProvider`'s `ready` flag flips via a `queueMicrotask` scheduled in a `useEffect`, essentially immediate on any real device.

**Verdict: capture-timing defect in the evidence script, not an application defect.** The prior script waited on `networkidle`, a signal unrelated to React state readiness. Fixed by waiting for the actual population condition. `CheckoutForm`/`CommerceProvider` were not modified.

A second, genuine race was found and fixed while building the permanent regression test: cart-seeding via a post-navigation `page.evaluate()` could lose to `CommerceProvider`'s own mount-time write-back effect. Fixed by seeding via `page.addInitScript()` (see D-049).

**Permanent regression guard:** `tests/e2e/checkout-regression.spec.ts` — 5 tests × 2 projects = 10 checks, all passing, covering every scenario the release-readiness gate named plus an empty-cart edge case.

## 2. CLS root-cause investigation — advanced, not resolved

Not attempted via random CSS tuning. Obtained Lighthouse's own raw Chrome trace directly and cross-validated with a live Playwright reproduction at identical settings. Full methodology, node/rect/score attribution, the 10-run intermittency sample, and all three disproven hypotheses (CSS containment, min-height, GSAP removal) are in `CLS_Attribution_Table.md`.

**Key finding this phase adds:** the reading is a genuine ~50/50 intermittent race (never partial — always exactly 0 or exactly the same non-zero value), not a deterministic layout defect, and it does not respond to any application-level lever tested. This is unchanged from R2B2F-POLISH's own baseline — confirmed not a regression from this phase's changes.

## 3. Performance

Every non-CLS Core Web Vital already scores 0.98–1.0 (FCP, LCP, TBT, Speed Index). No further "safe, material" bottleneck was found: no web fonts to optimize (pure system-font stacks throughout), no unnecessary blocking JS identified beyond what CLS investigation already ruled out (GSAP removal made no measurable difference), image responsive-candidate selection verified correct (checked via live `srcset`/`currentSrc` inspection, no oversized downloads found in steady state). The three CLS-motivated CSS experiments were reverted as they had zero proven benefit.

## 4. Release hygiene

- **`Archive.zip`** named in the original instructions is no longer present in the working tree; in its place, an untracked `design_review/recovery_r2b2_final_polish.zip` (24.6MB, a zip archive) exists — not created by this phase's work (no zip/archive command was run). It is confirmed unrelated user material (evidently an export/download of the prior phase's evidence folder) and **was not added to any commit**.
- **Working tree:** not fully clean — the untracked zip above remains, reported truthfully rather than omitted.
- **`main`:** untouched. `main`'s tip (`44780aa`) is a completely separate lineage (Phase 6/7 release QA and Vercel deployment commits) from `recovery/real-commerce-visuals` — confirmed via `git rev-parse` on both branches; no checkout, merge, or write ever targeted `main` this session.
- **Recovery branch:** all relevant fixes and evidence committed and pushed to `recovery/real-commerce-visuals` (commit/push details in the final response).

## 5. Regression gate — all green

| Check | Result |
|---|---|
| Canonical/asset validation | PASS (48 products, 51 SKUs, 61 asset records, 0 errors) |
| Format | PASS |
| Lint | PASS, 0 warnings |
| Typecheck | PASS |
| Unit tests (Vitest) | PASS — 13/13 |
| Playwright E2E (all specs, desktop+mobile) | PASS — 22/22 (repeated twice for stability) |
| Production build | PASS — 80 pages |
| 48-image integrity assertion | PASS (fixed a pre-existing test-timing flake unrelated to image loading — see Performance_Change_Log.md) |
| Checkout mobile regression | PASS — 10/10 |
| Keyboard/focus (checkout form) | PASS — logical tab order through profile radios, acknowledgement, submit |
| Reduced motion | PASS — final composition renders immediately, no animation |
| Console errors (8 routes) | 0 |
| Failed/4xx/5xx requests (8 routes) | 0 |
| Broken images | 0 |
| Horizontal overflow, 5 viewports × 5 routes | 0px, all 25 combinations |
| Lighthouse, 3-run median, 6 route/device combos | See `lighthouse-median-summary.md` — all miss target (CLS-driven, pre-existing, not a regression) |

## 6. What was NOT done

- CLS was not fixed — root cause remains unisolated at the DevTools Performance-panel level (see §2). This is reported, not silently deferred, per the gate's own instructions.
- No visual/design changes. No commerce-logic changes.
- `Archive.zip`/the newer zip was not touched, moved, or deleted.

## 7. Recommendation

The checkout defect is fully resolved with a permanent regression guard. The CLS reading remains an open, well-characterized, pre-existing condition that resists every application-level fix attempted across two full investigation phases (R2B2F-POLISH and this one) — further work on it needs lower-level browser profiling tooling, not more CSS changes. Given both explicit release blockers named in the gate have been addressed as thoroughly as the available evidence permits (one resolved, one exhaustively investigated and honestly reported as unresolved), this is ready for external final release authorization — main merge and production deployment remain gated on that authorization, not on this report.
