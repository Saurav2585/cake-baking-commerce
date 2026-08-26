# R2B2F — Locked Direction Implementation and Verification Report

**Phase:** Recovery R2B2F — Selected Premium Direction Implementation
**Branch:** `recovery/real-commerce-visuals`
**Starting commit:** `f262290` (R2B2V-Direction: three bounded visual-concept prototypes)
**Prepared:** 2026-08-27

## Authorization and boundary

This phase implements the externally-selected direction from the R2B2V-Direction concept gate into
the real, live Next.js application:

- **Concept A — Modern Ingredient Atelier** as the primary visual identity: culinary warmth,
  typography, composition, product staging.
- **Concept C — Editorial Pantry Laboratory**'s grid precision, taxonomy and factual-information
  clarity, borrowed narrowly — not its full ink/monospace aesthetic.
- **Concept B — Contemporary Baking Market**'s mobile sticky price + Add-to-Cart bar pattern,
  borrowed narrowly — nothing else from B.

No fourth direction was invented; the three concepts were not blended evenly. `main` was not modified
and production was not deployed at any point in this phase.

## What was already true before this phase started

Exploration at the start of this phase found the application already had strong bones from earlier
recovery phases: a converged `ProductCard` component (grid + rail variants), a 10-section homepage
with four genuinely distinct merchandising rail patterns (editorial/filmstrip/split/shelf — not a
repeated card-wall), a working PLP/category/search system, a PDP with a tri-state critical-facts
section and an existing mature GSAP motion system (hero pointer-parallax, grouped section reveal, PDP
variant crossfade with an already-handled shared-image edge case). This meant R2B2F was substantially a
**visual restyle and targeted refinement** of real, working architecture — not a rebuild — which shaped
the specialist scoping below.

## Genuine specialists used

Six narrowly-owned specialist agents, each in an isolated git worktree, reviewed and manually merged by
the orchestrator (this session) after inspecting each role's actual diff — not trusting self-reported
summaries. Sequenced in two dependency-ordered waves plus a final independent QA pass, matching the
precedent established in the prior R2B2 implementation phase:

| Wave | Role | Scope | Commit |
|---|---|---|---|
| 1 | Design-System and Global-Shell Engineer | `globals.css` `:root`/base rules, `site-header.tsx`, `site-footer.tsx` | `61abe03` |
| 2 (parallel) | Homepage and Discovery Engineer | `page.tsx`, `hero-collage.tsx`, `department-atlas.tsx`, `product-rail.tsx` | `17acb76` |
| 2 (parallel) | PLP, Category and Search Engineer | `product-card.tsx`, `product-grid.tsx`, `shop-explorer.tsx` | `a7351fd` |
| 2 (parallel) | PDP and Commerce Engineer | `product-detail.tsx`, cart/checkout/confirmation/wishlist | `45b4526` |
| 3 | GSAP / 2.5D Motion Engineer | `src/motion/*.ts`, `motion-enhancer.tsx` | `09128db` |
| 4 | Independent QA / Visual / Accessibility / Performance Agent | Full app, report-only, no code changes | (report, orchestrator applied fixes) |

Wave 1 landed and was merged before Wave 2 started, so the three parallel Wave-2 roles built against
the real, landed token/typography/shadow foundation rather than a speculative contract. File and CSS
ownership was scoped to be genuinely disjoint (each role appends one new bannered section to
`globals.css`, following this file's existing append-only convention rather than editing another role's
section), which meant zero merge conflicts across all six roles despite three running concurrently.

## Locked visual rules — how they were carried

- **Ivory/cream foundation, restrained cocoa/oxblood/terracotta accents:** new `--cocoa`, `--oxblood`
  (semantic alias onto the pre-existing `--coral-dark`), `--terracotta` (alias onto `--saffron-dark`)
  tokens, applied as accents (borders, small UI moments, price emphasis), never as large saturated
  background fields — the specific thing Concept B was rejected for.
- **Serif/sans pairing:** `--display` refined to `"Iowan Old Style", "Palatino Linotype", Georgia, ...,
  serif`, `--ui` refined to `-apple-system, "Segoe UI", system-ui, Arial, ...` — system fonts only, no
  network font loading.
- **Real packshots at meaningful scale:** untouched/reinforced across hero, rails, PLP grid, PDP
  gallery — all 48 real, verified product photos, zero new image assets anywhere in this phase.
- **Controlled asymmetry, tactile CSS surfaces:** asymmetric hero staging, new `.surface-tactile`
  CSS-only grain utility, `--shadow-soft`/`--shadow-soft-sm` cocoa-tinted long shadows sitewide.
- **No repetitive card-wall:** the four homepage rail patterns were preserved and individually refined,
  not homogenized; PLP's merchandising break was given real visual presence (a bannered panel) instead
  of a thin divider line.
- **13px label floor / 44px tap targets:** violated in ~18 places accumulated across four roles (see
  Independent QA findings below), found and fixed.
- **No sale-marketplace saturation, no clinical wireframe look:** independent QA's live visual audit
  confirmed the shipped app reads as Concept A throughout, with no drift toward B's saturation or C's
  ink/mono look.

## Concept B and C borrows, specifically

- **Concept B mobile sticky CTA:** `.buy-panel > .purchase-actions` becomes `position: sticky; bottom:
  0` at ≤640px, reusing the *same* Add-to-Cart button (no duplicate control), with a safe-area-aware
  bottom inset and a z-index kept under the mobile nav drawer's. A specific gap found during the
  concept-review phase — mobile PDP not surfacing variant/quantity above the fold — was fixed by
  reordering the buy panel via flexbox `order` so brand/title/description/price is immediately followed
  by the variant selector and quantity stepper, not buried below the fold.
- **Concept C grid/taxonomy borrow:** small-caps spec-sheet labels and tabular-numeral prices on the
  PDP variant selector/quantity/facts section; a quiet taxonomic index dot on PLP category
  introductions; the `.grid-merch-break` panel treatment — all in Concept A's warm palette, not C's
  ink/mono system.

## Defects found and fixed during this phase

Not silently absorbed — recorded with exact cause and fix:

1. **Orchestrator QA-gate pass** (after Wave 1–5 integration, before dispatching independent QA):
   a pre-existing Prettier violation in `use-image-crossfade.ts` (whitespace only); a missing
   `gsap.context()`/cleanup in the new `use-wishlist-feedback.ts` hook (its own docstring claimed this
   consistency without implementing it — fixed to match every other hook in the directory); 2px of real
   horizontal overflow at the 768×1024 required viewport, traced to `.hero-collage`'s pre-existing
   `.collage-small` negative-offset decorative chip not being contained by its parent — fixed with
   `overflow: hidden` on `.hero-collage`, confirmed visually that the staggered-photo composition is
   unaffected.
2. **Independent QA (Role 6), after full integration:** a systemic violation of the locked 13px label
   floor across ~15 selectors spanning all four implementation roles' territories (product/rail badges,
   the header count-badge, availability text, filter-bar labels, breadcrumbs, PDP spec-sheet labels),
   plus one rail quick-add button additionally under the 44px tap-target floor; and a recurrence of a
   previously-"mitigated" cart-notice contrast bug (R-046) — the 2026-08-26 fix accounted for
   `.cart-summary`'s dark panel but not `.notice`'s own independent light background, leaving
   near-white-on-light-amber at ~1.27:1. Both fixed and live re-verified by the orchestrator; see
   `docs/Decision_Log.md` D-045 and `docs/Risk_Register.md` R-046/R-049.

## The Lighthouse CLS investigation

Lighthouse (homepage/PLP/PDP, desktop+mobile, against a production `next start` build) measured a
repeatable Cumulative Layout Shift of 0.524 (desktop) / 0.448 (mobile), identical across three
different pages — itself an unusual signature. This was investigated further than a typical QA pass,
via five independent methods:

1. A JS `PerformanceObserver` capture via Playwright (bundled Chromium) — zero shift entries.
2. The same capture via Playwright's real Chrome channel (matching what Lighthouse's `chrome-launcher`
   actually uses) — zero shift entries.
3. A raw Chrome DevTools trace (the same underlying mechanism Lighthouse itself uses to compute CLS),
   parsed for `LayoutShift` events — zero events.
4. A direct before/after screenshot comparison at Lighthouse's exact viewport, device-scale-factor and
   emulated user-agent, at t=0ms (DOM commit) and t=2000ms (settled) — pixel-identical box positions;
   only late-loading image *content* filling in already-correctly-sized frames, which by the Layout
   Instability spec's own definition is not a shift.
5. The independent QA agent's separate reproduction, against a **dev** server, found a definitive cause
   for its own reading (0.501, numerically distinct from the production 0.524/0.448): Next.js's dev-only
   `<nextjs-portal>` devtools indicator (a shadow-DOM element visible as the small "N" badge in every
   dev-mode screenshot). The orchestrator independently confirmed via direct DOM check that this element
   is **absent from the production build**, so this specific explanation does not carry over to the
   production numbers Lighthouse actually measured.

None of the five methods found evidence of a real, user-facing layout shift on the production build.
The production-build root cause remains formally unresolved despite this diligence — documented
honestly as an investigated, unresolved, low-confirmed-real-world-risk finding (`docs/Decision_Log.md`
D-046, `docs/Risk_Register.md` R-050) rather than either silently passed through uncritically or falsely
claimed as fixed with no identifiable target. This is a materially deeper investigation than the prior
R2B2 phase, which disclosed Lighthouse/Core-Web-Vitals measurement as not performed at all.

Lighthouse scores across all six runs: accessibility 96–100, best-practices 100, SEO 100, performance
69–79. Full JSON reports: `design_review/recovery_r2b2_final/lighthouse/`.

## Mandatory QA gate — results

| Gate | Result |
|---|---|
| Canonical/asset validation | PASS — 48 products, 51 SKUs, 48/48 real photography, 18 recipe mappings |
| Format check | Clean |
| Lint | Clean |
| Typecheck | Clean |
| Unit tests | 13/13 passing |
| Playwright e2e | 10/10 passing (desktop + mobile projects) |
| Production build | Clean, 80 pages |
| Broken images / failed requests / console errors | Zero, across 12 routes × 5 viewports (60 combinations) in the orchestrator's own sweep, and independently re-confirmed by QA |
| Keyboard and focus audit | Skip link, header nav, mega panel, mobile drawer (open/Escape-close/focus-return), PDP variant/quantity/CTA/wishlist, checkout radio/checkbox/submit/error-summary — all confirmed working by both the orchestrator and independent QA |
| Reduced-motion audit | Complete final composition with no motion; `html` `scroll-behavior: auto` confirmed; zero pixel difference across a 1s window on `/`, `/shop` and PDP (QA's own check) |
| Horizontal overflow, 5 required viewports (1440×900, 1024×768, 768×1024, 390×844, 360×800) | Zero, confirmed by both the orchestrator (12 routes) and independent QA (homepage at all 5, plus 360/390/1440 on 5 more routes), after the `.hero-collage` fix |
| Lighthouse desktop/mobile, homepage/PLP/PDP | Run and recorded (see above); CLS anomaly investigated and disclosed, not silently passed through |
| GSAP lifecycle and cleanup | Every hook in `src/motion/` either has no persistent state or is scoped in `gsap.context()` with a cleanup that calls `.revert()`; confirmed by the orchestrator's fix to `use-wishlist-feedback.ts` and independently re-confirmed by QA reading every hook file |

A known, environment-specific complication: port 3000 on this machine is occupied by an unrelated
project's dev server. Playwright's `reuseExistingServer: true` silently tested against that wrong app
on the first e2e attempt, falsely failing all 10 tests. Diagnosed, worked around by temporarily pointing
`playwright.config.ts` at an isolated port for each verification run and reverting immediately after —
never left in the committed diff. Both the orchestrator and the independent QA agent hit and correctly
handled this independently.

## Evidence

`design_review/recovery_r2b2_final/`:
- `screenshots/` — 24 files: homepage/PLP/category/search/PDP above-fold and full-page at 1440 and 390,
  populated cart/checkout at both sizes, confirmation, mobile nav drawer, reduced-motion homepage and
  PDP.
- `motion-evidence/` — 14 files: hero-parallax ENTRY/two PEAK extremes/EXIT, PDP variant crossfade
  ENTRY/PEAK/EXIT (the shared-image confirmation-pulse case), department-atlas grouped-reveal
  pre/post-trigger, mobile sticky-CTA entrance ENTRY/settled, wishlist-feedback before/peak/settled.
- `lighthouse/` — 6 JSON reports (home/plp/pdp × desktop/mobile).
- `Concept_A_vs_Final_Comparison.html` — side-by-side board of the selected Concept A prototype against
  the live implementation at homepage/PLP/PDP, desktop and mobile.
- `IMPLEMENTATION_CONTRACT.md` — the shared brief all six roles worked from.

## Known limitations

- The Lighthouse CLS discrepancy on the production build (above) remains formally unresolved, though
  extensively investigated and confirmed low real-world risk by five independent methods.
- Performance scores (69–79) were not specifically optimized in this phase — this was a visual-direction
  implementation phase, not a performance-tuning pass; no performance regression was introduced (nothing
  in this phase changed data fetching, bundle composition, or image formats).
- WebKit/Firefox automated cross-browser coverage remains deferred, per the standing R2B2A scoping
  decision — Chromium-only Playwright coverage exists.
- The systemic sub-13px label pattern (D-045/R-049) was caught by independent QA, not by an automated
  gate — no stylelint or computed-style test currently enforces the 13px/44px floors sitewide. Flagged
  as an open process gap (R-049), not silently dropped.

## Decision requested

**External final visual approval** of this implementation against the locked direction, before any
merge to `main` or production deployment. No other decision is currently open.

## Gate

No merge to `main` and no production deployment should proceed from this branch until external final
visual approval is explicitly given.
