# R2B2F-POLISH — Implementation and Verification Report

**Branch:** `recovery/real-commerce-visuals` · **Starting commit:** `0506742` · **Scope:** one bounded targeted polish pass against the external final-visual-review verdict; Concept A direction unchanged, no verified commerce logic changed.

## 1. What this phase was

The external reviewer withheld final visual approval on commit `0506742` and returned eight mandatory fixes plus a QA/evidence checklist. This phase implements exactly those eight fixes, re-runs full QA, captures fresh evidence under `design_review/recovery_r2b2_final_polish/`, and stops for external re-review. `main` was not touched; production was not deployed.

## 2. Fix-by-fix summary

### 1/7 — Homepage hero product theatre
- `src/app/globals.css` `.collage-media img`: `object-fit: contain` → `cover` (crops each packshot's own studio-white margin, never the product; `cover` never distorts — aspect ratio is preserved, only the frame's excess white is cropped). Verified per frame (4 hero images, all manually checked).
- Collage-a/b/small frame sizes increased (desktop: 29%→34%, 24%→29%, 34%→40%).
- Mobile (`≤640px`): `.hero-collage { order: -1 }` inside the single-column breakpoint brings the collage above the copy panel, so meaningful product imagery is in the initial 390px viewport instead of ~700px of text pushing it below the fold. `.collage-a` now stays visible on mobile (was `display:none`) at 32% width alongside `.collage-small` (46%) — dominant product plus two supporting products in the fold; `.collage-b` stays hidden to avoid clutter.
- **Real bug found and fixed along the way:** `hero-collage.tsx`'s `sizes` attribute for `secondaryA` still said `(max-width: 640px) 0vw` from when that chip was mobile-hidden; now that it's visible at ~32% width, the browser was requesting a 32×32px thumbnail for a ~150px (at DPR2) box. Fixed to `32vw`. `foreground`'s `sizes` corrected from `36vw` to `46vw` to match its actual mobile CSS width.
- Reduced-motion and pointer-parallax behavior untouched (`use-hero-parallax.ts` not modified).

### 2/7 — PLP product image reliability
- Investigated via live DOM inspection (`img.complete`, `naturalWidth`) rather than re-screenshotting blind: all 48 images report loaded/decoded correctly once genuinely settled. The reported "blank stages" were a capture-timing artifact (screenshot taken before paint caught up with a fast full-page resize/decode), not an application lazy-loading defect — confirmed by inspecting the exact same live page multiple times with no code changes.
- Added `tests/e2e/plp-image-integrity.spec.ts`: scrolls the full 48-product grid, then asserts for every card that its image has `complete === true`, `naturalWidth > 0`, and that zero image requests failed or returned 4xx/5xx — across desktop and mobile projects. **Passing.**
- Evidence capture script (`scripts/capture-r2b2-polish-evidence.mjs`) explicitly waits for every in-viewport `<img>` to report loaded+decoded before every screenshot, so this class of artifact cannot recur in the evidence package itself.

### 3/7 — PDP unavailable-fact copy
- `FactValue()` in `src/components/product-detail.tsx`: "Information not provided" → "Not supplied in the verified source record." Visual treatment (quiet left-tick + dot mark, never a pill, never red, never italic) was already correct from a prior phase and is unchanged — only the sentence changed.
- This supersedes the exact wording locked by Decision Log **D-017**; recorded as **D-047** (D-017's underlying tri-state / never-inferred requirement is unchanged and remains binding).

### 4/7 — Mobile PDP sticky CTA
- Root-caused a genuine defect (not just a capture artifact): plain CSS `position: sticky; bottom: 0` activates as soon as the element's static position is geometrically close to the viewport bottom. On a compact single-variant PDP, that happens almost immediately — the stuck bar then paints over the quantity stepper and availability status sitting just above it in the flow, since sticky never reserves extra space for the content it visually covers. Confirmed live via DOM bounding-rect inspection before writing any fix.
- New hook `src/motion/use-sticky-cta-visibility.ts`: a zero-height sentinel (`.cta-sentinel`) marks the CTA's natural position; an `IntersectionObserver` only flips `pinned` once the sentinel has genuinely scrolled above the viewport, and a second observer on `.site-footer` forces `pinned` back to `false` once the footer is in view. The CTA switches `position: fixed` only while `data-pinned="true"`; a `.purchase-actions-spacer` (rendered only while pinned, height tracked via `ResizeObserver`) reserves its space so pinning/unpinning never shifts layout.
- `use-sticky-cta-entrance.ts` adapted to play its GSAP entrance on each pin transition instead of once on mount.
- Compact bar: `.purchase-actions[data-pinned="true"] > button:not(.coral) { display: none }` hides the secondary "Save to wishlist" from the pinned state — one primary action, one accessible name, no duplicated-looking price/title (the price shown via `::before` only appears once the real price has already scrolled well out of view, since activation now requires scrolling past the button which sits below the price).
- Verified end-to-end: before-activation (in-flow, no overlap), active/pinned (compact, no overlap with content above), and released-before-footer (footer fully visible, no overlap) — see evidence 07/08/09.
- Verified at 390×844 and 360×800, at 200% zoom, and under `prefers-reduced-motion` (bar renders in its final resting state with no animation, per the existing hook contract).

### 5/7 — Mobile readability
- Found and fixed four remaining sub-13px labels / one sub-44px control that slipped past the prior phase's 13px/44px QA gate (D-045):
  - `.product-grid .card-facts span` (pack-size label): 0.7rem (11.2px) → 0.8125rem (13px)
  - `.variant-unavailable-reason` (PDP): 0.7rem (11.2px) → 0.8125rem (13px)
  - `.quantity-label` (PDP): 0.7rem (11.2px) → 0.8125rem (13px)
  - `.empty-state .active-filters li`: 0.8rem (12.8px) → 0.8125rem (13px)
  - `.product-add` mobile button: `min-height: 42px` → `44px`
- Footer legal copy (`.footer-disclosure`, the newsletter `<small>`): both were left at the browser's default `<small>` sizing (~80% of parent, 12.8px), under the 13px floor. Given explicit `font-size: 0.8125rem` and, for the disclosure paragraph, `line-height: 1.75` (was 1.6) and a `max-width: 68ch` measure for legibility.

### 6/7 — Portfolio disclosure hierarchy
- `.demo-strip` (top-of-page banner): full truthful text preserved verbatim. Visual weight reduced — bold uppercase wide-tracking (`font-weight:700`, `letter-spacing:0.07em`, `text-transform:uppercase`) → `font-weight:600`, `letter-spacing:0.01em`, sentence case. Still ≥13px, still full white-on-`--cocoa` contrast. On 390px this alone roughly halves the banner's line count, which is what let the hero fix (1/7) bring product imagery into the fold without also needing to compress the hero copy itself.
- No other disclosure surface (footer paragraph, PDP `.simulation-note`/`.pdp-attribution`, cart notice) was touched — each already reads as a single quiet instance, not a repeated block.

### 7/7 — Product optical scale
- Shared `.product-image-canvas` rule (used by PLP grid cards, PDP hero image, and related-product cards — one class, per the standing D-034 contract) : padding 5%→2%, image fill 90%→96%, plus a deterministic `transform: scale(1.12)` applied identically to every card. `object-fit: contain` is kept — the only fit mode that can never crop a real product photo — so the zoom only trims the photography's own studio margin (audited against the tightest-cropped real samples in the set before choosing 1.12× as safe), never the product itself, never distorts (uniform scale, not a non-uniform stretch). Overflow stays clipped by the canvas's existing rounded corner. Zero images created, cropped by hand, or regenerated — all 48 real photographs are the same files, only their on-page presentation changed.
- Four-column desktop / two-column mobile grid layout untouched.

### 8/7 (performance follow-up)
- See Decision Log **D-048** and Risk Register **R-051** for the full writeup. Summary: Lighthouse performance sits at 77–79 across every route (target ≥90 desktop / ≥80 mobile) and CLS at 0.47–0.53 (target ≤0.10) — **unchanged from this phase's own pre-polish baseline** (72–79 / 0.448–0.524), confirming no regression from this pass. Every other Core Web Vital (FCP, LCP, TBT, Speed Index) scores 0.98–1.0; CLS alone is the entire gap. This was already an open, investigated-but-unresolved item before this phase (D-046/R-050). This pass advanced the investigation with concrete, attributable trace evidence (a methodology gap in the prior "no real shift found" capture — see D-048) and applied a legitimate `content-visibility`/`contain-intrinsic-size` optimization to `.site-footer`, which did not move the score (consistent with the real trigger being upstream of the footer's own render cost). Full resolution requires deeper profiling beyond this bounded pass's scope — reported, not silently deferred.

## 3. QA results

| Check | Result |
|---|---|
| Canonical/asset validation | PASS (48 products, 51 variants, 61 asset records, 0 errors) |
| `npm run format:check` | PASS |
| `npm run lint` | PASS, 0 warnings |
| `npm run typecheck` | PASS |
| `npm test` (Vitest) | PASS — 13/13 |
| `npx playwright test` (all specs, desktop+mobile) | PASS — 12/12, including the new image-integrity spec |
| Production build | PASS — 80 pages, clean |
| Horizontal overflow, 5 required viewports (1440×900, 1024×768, 768×1024, 390×844, 360×800) × 5 routes (home, PLP, PDP, cart, checkout) | 0px overflow, all 25 combinations |
| Console errors across 8 routes | 0 |
| Failed/4xx/5xx requests across 8 routes | 0 real failures (91 `net::ERR_ABORTED` entries are Next.js `<Link>` RSC-prefetch requests cancelled by the next `page.goto()` in the check script — normal navigation-cancellation noise, not broken resources) |
| Image `naturalWidth`/`complete` assertion, all 48 products | PASS (automated, `tests/e2e/plp-image-integrity.spec.ts`) |
| 200% zoom, PDP desktop + mobile | Verified, no overlap or clipped controls |
| `prefers-reduced-motion` | Verified — sticky CTA and page-entrance animations render final state immediately, no motion |
| Lighthouse (home/PLP/PDP × desktop/mobile) | Performance 77–79, CLS 0.47–0.53 — pre-existing, unchanged from baseline; see §2 fix 8/7 |

## 4. Evidence

All under `design_review/recovery_r2b2_final_polish/`:
- `screenshots/` — homepage/PLP/PDP fold+full (desktop 1440, mobile 390), sticky-CTA before/active/footer-release states, PDP at 360×800 and 390×844, PDP at 200% zoom (desktop + mobile), cart + checkout (mobile), PDP under reduced motion.
- `lighthouse/` — six fresh JSON reports (home/plp/pdp × desktop/mobile) against the production build.
- `Defect_By_Defect_Comparison.html` — before/after board, one section per mandatory fix, images sourced directly from this phase's and the prior phase's evidence folders.
- Captured via `scripts/capture-r2b2-polish-evidence.mjs` (new) — Playwright against `next build && next start`, with an explicit per-image load/decode wait before every screenshot specifically to avoid the capture-timing artifact this whole review cycle was partly triggered by.

## 5. Governance

- **D-047** — supersedes D-017's exact copy wording only (fix 3/7).
- **D-048** / **R-051** — advances the D-046/R-050 CLS investigation with new attributable trace evidence; still unresolved, not silently dropped.
- No other locked decisions were touched. Verified commerce logic (cart math, pricing, availability, recipe-to-cart) was not modified — this phase touched only CSS, two new/adapted motion hooks, one copy string, and `sizes` attributes on the hero images.

## 6. Out of scope / not done

- Full CLS root-cause resolution (would require profiling why a fully static/prerendered route's `document.body.scrollHeight` still settles ~100ms+ after navigation commit — architecture-level investigation beyond this bounded pass).
- No Concept A redesign, no new imagery, no commerce-logic changes.
