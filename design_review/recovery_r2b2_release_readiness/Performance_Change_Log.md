# Performance Change Log — R2B2R

## Changes shipped

| File | Change | Reason |
|---|---|---|
| `tests/e2e/checkout-regression.spec.ts` (new) | Permanent regression guard for the checkout capture defect — asserts loading resolves within an explicit timeout, profile controls/order summary/correct total are visible, completion control enables after valid selections, direct nav (both required viewports) and cart-to-checkout nav both work, no console/request errors. | Required by the release-readiness gate; the external review's checkout screenshot defect needed a permanent test, not just a one-off evidence re-capture. |
| `scripts/capture-r2b2-polish-evidence.mjs` | Checkout capture section rewritten: waits for actual readiness (`.cart-summary` present, "Measuring the pantry" gone) instead of `networkidle`; cart seeding switched from a post-navigation `page.evaluate()` to `page.addInitScript()` to eliminate a genuine race against `CommerceProvider`'s own mount-time write-back effect; added loading-state, cart-to-checkout, and direct-nav (both viewports) captures. | Root cause of the external review's blank checkout screenshot (§ below). |
| `tests/e2e/plp-image-integrity.spec.ts` | The `48 products` results-count assertion changed from a strict-mode exact-text check to a scoped `.first()` + `toContainText`, and reordered after the (already-reliable) 48-card-count assertion. | A transient double-render of the `.results-count` status region (confirmed real via direct DOM inspection, settles within one frame) made the strict assertion flaky under normal parallel test execution — not a user-facing defect, a test-robustness fix. |

## Changes attempted and reverted (documented, not shipped)

Three targeted CLS hypotheses were tested via controlled A/B experiments against the production build, each reverted after being empirically disproven (see `CLS_Attribution_Table.md` for the full methodology and data):

1. `content-visibility: auto` + `contain-intrinsic-size` on every homepage section after the hero.
2. A plain, unconditional `min-height` on the same sections (ruling out a content-visibility timing/relevance-calculation race as the reason #1 didn't help).
3. Temporarily removing `MotionEnhancer` and `useHeroParallax` (GSAP) from the homepage entirely (diagnostic only).

None moved the CLS reading. Per "fix only attributable application causes" and "do not compromise... merely to inflate a score," none were kept — shipping unproven complexity with a measured zero effect would be pure risk with no benefit.

## The checkout defect: root cause

**Not an application defect.** `CheckoutForm` renders "Measuring the pantry…" only while `CommerceProvider`'s `ready` flag is `false` (a `queueMicrotask`-scheduled localStorage-hydration effect). Measured live across every scenario the release-readiness gate named — direct navigation (390×844, 360×800), cart-to-checkout soft navigation, and 6x-CPU + slow-network throttling — `ready` flips true in **5–314ms** in every case.

The evidence script's prior checkout capture waited on Playwright's `networkidle` after clicking through to `/checkout`, a signal with no relationship to React state readiness — it could (and evidently did, once) resolve and screenshot during that sub-second `!ready` window. The fix was entirely in the evidence-capture script and its new permanent regression test, not in `CheckoutForm` or `CommerceProvider`.

A second, genuine race was found and fixed while building the regression test: seeding the cart via a post-navigation `page.evaluate()` can lose to `CommerceProvider`'s own mount-time `if (ready) localStorage.setItem(...)` write-back effect, which can fire after the evaluate() call reaches the browser over CDP and overwrite the seeded data with the provider's actual (empty) state. Switching the seed to `page.addInitScript()` (guaranteed to run before any page script) eliminates this — confirmed by repeated clean runs after the fix, versus intermittent "needs a cart" failures before it.

## The CLS reading: status

Not resolved. See `CLS_Attribution_Table.md` for the full trace-level investigation. Summary: the shift is real (confirmed via Lighthouse's own raw Chrome trace, not a reproduction), attributed to `<footer class="site-footer">`, intermittent (~50% of loads land on the "good" 0 outcome — confirmed via a 10-run sample), unchanged from this phase's own pre-existing baseline (not a regression), and resistant to every application-level lever tested (image/CSS containment, GSAP/motion removal, reduced-motion). It is the sole reason the performance score isn't 95+ — every other Core Web Vital already scores near-perfect.
