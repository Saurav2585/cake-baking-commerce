# Phase 6 — Production Application Engineering: Verification Report

**Status:** Verified — external engineering review requested
**Prepared:** 2026-08-25
**Starting checkpoint:** `main` @ `c29e5fc4c95071766993b833456a4e0e88e9299d`
**Scope:** Independent takeover verification of an existing Phase 6 implementation. No architecture, screens, canonical data or creative direction were rebuilt; only verified defects were fixed.

## 1. Technical summary

- **Framework:** Next.js 16.3.2 (App Router, webpack build), React 19.2.8, TypeScript 5.9.3, Tailwind CSS 4.3.3, GSAP 3.15.0.
- **Data model:** Canonical Phase 5B JSON (`production_artifacts/05_catalog_production/`) is the sole content authority; a generated typed projection (`scripts/validate-production-data.mjs` + build-time loaders in `src/lib/domain/catalog.ts`) is the only derivative. No parallel/hand-maintained catalog exists.
- **Commerce:** Local-only cart/wishlist (`localStorage`, versioned envelopes `pantryform:cart:v1` / `pantryform:wishlist:v1`), session-only checkout confirmation (`sessionStorage`), simulated checkout only. No database, authentication, payment SDK or third-party analytics transmission.

## 2. Duplicate asset directory (`public/catalog-assets/`)

| Check | Result |
|---|---|
| Tracked by git? | No — `git ls-files` returns nothing; confirmed via `git status --ignored` |
| Ignore rule | `.gitignore:26` → `/public/catalog-assets/` |
| File count | 150 (matches canonical `public/assets/catalog/` 1:1 by filename) |
| Hash comparison | All 150 files SHA-256 identical to `public/assets/catalog/` counterparts |
| Code/build/manifest references | None. `grep -r "catalog-assets"` across `src/`, `scripts/`, `production_artifacts/`, `design_review/`, config files returns only `.gitignore`, `.prettierignore`, `eslint.config.mjs` (all just ignore rules). The manifest (`Catalog_Asset_Manifest.json`) and `publicAssetPath()` (`src/lib/domain/catalog.ts`) resolve exclusively to `/assets/catalog/...`. |
| Generator output | `production_artifacts/05_catalog_production/tools/build_catalog_assets.js` writes to `production_artifacts/05_catalog_production/exports/`, never to `public/catalog-assets`. |

**Action:** Removed (`rm -rf public/catalog-assets`). Production build and browser asset loading verified clean afterward (see §7, §9).

## 3. Route inventory (verified against `Route_and_Feature_Inventory.md`)

All 20 route files present and functioning; production build emits 54 static/SSG pages plus 5 dynamic routes.

| Route | Type | Verified |
|---|---|---|
| `/` | Static | ✅ |
| `/shop` | Dynamic (search params) | ✅ |
| `/shop/[department]` (×7) | SSG | ✅ |
| `/shop/[department]/[category]` | Dynamic | ✅ (no canonical subcategories currently defined; no crash on access) |
| `/products/[slug]` (×24) | SSG | ✅ |
| `/search` | Dynamic | ✅ incl. no-results state |
| `/recipes` | Static | ✅ |
| `/recipes/[slug]` (×6) | SSG | ✅ |
| `/recipes/[slug]/add-to-cart` | Dynamic | ✅ |
| `/wishlist` | Static (client-hydrated) | ✅ |
| `/cart` | Static (client-hydrated) | ✅ |
| `/checkout` | Static (client-hydrated) | ✅ |
| `/order-confirmation/[reference]` | Dynamic | ✅ incl. expired/direct-visit state |
| `/about`, `/contact`, `/faq`, `/shipping-returns`, `/privacy`, `/terms` | Static | ✅ |
| `/robots.txt`, `/sitemap.xml` | Static | ✅ |
| `/_not-found` (404) | Static | ✅ on-brand recovery UI |

**Route count:** 20/20 route files verified; 54/54 production build pages generated.

## 4. Canonical data validation

Command: `npm run validate:canonical` (also runs automatically as part of `npm run build`).

```
{ "result": "PASS", "products": 24, "variants": 38, "content_records": 24,
  "recipes": 6, "recipe_ingredient_lines": 45, "mappings": 27,
  "product_asset_coverage": 24, "recipe_asset_coverage": 6, "errors": [] }
{ "status": "PASS", "records": 75, "productPrimaries": 24, "variantMedia": 38,
  "recipes": 6, "departmentVisuals": 7, "departmentRelationships": 7,
  "filesChecked": 225 }
Production adapter validation passed: 24 products, 38 SKUs, 27 recipe mappings, 75 asset records.
```

24/24 parent products, 38/38 SKUs, 6/6 recipes, 45/45 ingredient lines, 27/27 mappings, 225/225 manifest files — all confirmed against the approved Phase 5B counts. Tri-state critical facts render as **Information not provided** where unset (verified live on PDP for `almond-flakes`: Ingredients, Allergens, Storage all render the exact string).

## 5. Defects found and fixed

All fixes are minimal and targeted; no architecture, screens, or canonical data were altered.

### 5.1 Next.js dev-origin allowlist blocking all client JS (root cause of all E2E failures)

**Symptom:** `playwright.config.ts` runs the dev server bound to `127.0.0.1` and uses `baseURL: "http://127.0.0.1:3000"`. Next.js 16 introduced a dev-only cross-origin asset guard (`allowedDevOrigins`, defaults to trusting only `localhost`). Every `_next/static/chunks/*.js` request from origin `http://127.0.0.1:3000` was rejected with `403 Unauthorized`, so client JS never hydrated in the Playwright browser context — no `onClick` handlers ever attached. This produced 6/10 E2E failures (add-to-cart no-ops, mobile menu inert) that looked like application bugs but were purely a dev-server/test-harness origin mismatch.

**Diagnosis method:** reproduced with a standalone Playwright script capturing `response`/`requestfailed` events; confirmed via `curl` with explicit `Origin` headers (`Origin: http://127.0.0.1:3000` → `403 Unauthorized` body `"Unauthorized"`; `Origin: http://localhost:3000` or no header → `200`). Confirmed against `node_modules/next/dist/docs/.../allowedDevOrigins.md`.

**Fix:** `next.config.ts` — added `allowedDevOrigins: ["127.0.0.1"]`. Dev-only; no effect on production build/runtime behavior.

**Result:** E2E suite went from 4/10 → 10/10 passing with no test changes.

### 5.2 Cart/wishlist/checkout false-empty flash on hard reload

**Symptom:** `CommerceProvider` (`src/components/commerce-provider.tsx`) initializes cart/wishlist to empty synchronously (required to avoid SSR/hydration mismatch) and restores from `localStorage` inside a `useEffect` + `queueMicrotask`. `CartView`, `WishlistView` and `CheckoutForm` rendered their "empty" state purely from `cart.lines.length`/`wishlist.length`, with no gate on hydration completion. A hard reload of `/cart` (or `/checkout`, `/wishlist`) briefly showed "Your demo cart is empty" / "A demo checkout needs a cart" even with valid persisted data, before flipping to the correct content one tick later. This is a real defect against the required "refreshing deep-linked application routes" check — a slow device or screen-reader user could act on the false empty state.

**Fix:** exposed `ready: boolean` from `CommerceContextValue`; `CartView`, `WishlistView`, `CheckoutForm` now render the existing `Loading` pattern (`aria-busy`, "Measuring the pantry…") until `ready` is `true`, matching the site's existing route-level loading affordance. Also wrapped the cart-restore branch in its own `try/catch` (previously only the wishlist restore was guarded) so a `localStorage` read failure can no longer abort hydration and leave the cart permanently and silently empty.

### 5.3 Checkout submission flashes "needs a cart" before navigating to confirmation

**Symptom:** `CheckoutForm.submit()` calls `completeSimulation()` (which synchronously clears the cart after snapshotting it to `sessionStorage`) and then `router.push(...)`. Because the App Router navigation is asynchronous, the still-mounted `/checkout` page re-rendered with the now-empty cart and displayed "A demo checkout needs a cart" for a frame or more before the confirmation page replaced it. Reproduced deterministically via frame-by-frame capture (80 ms intervals) after submit, both before and after the fix.

**Fix:** added a local `submitted` flag, set synchronously in the submit handler before the cart is cleared. The first attempt gated only the empty-cart branch (`!cart.lines.length && !submitted`), which stopped the empty-cart flash but left the full form — including its own "No payment · no real order" eyebrow and "No payment, order, delivery…" acknowledgement label — visible for the entire navigation-pending window. This produced a *second*, more subtle regression: the E2E assertion `getByText(/no payment/i)` briefly matched two elements on the still-visible checkout page (a Playwright strict-mode violation) before the confirmation page's own "no payment" text ever appeared, intermittently failing the desktop/mobile checkout journey test. The corrected fix instead short-circuits to the existing neutral "Measuring the pantry…" loading affordance whenever `submitted` is true (`if (!ready || submitted) return <loading/>`), replacing the form outright rather than leaving it mounted. Confirmed via repeated frame capture and 3 consecutive full E2E runs (30/30 passing) that the visible content goes directly from the checkout form to a neutral loading state to "SIMULATION COMPLETE · NO PAYMENT TAKEN," with no intermediate empty-cart frame and no duplicate-text window.

### 5.4 Mobile nav drawer: no focus restoration, no focus trap

**Symptom (`src/components/site-header.tsx`):** the drawer moved focus to its own "Close menu" button on open (correct), but on close — via Escape, the Close button, or a nav link — focus was never returned to the "Menu" trigger button; `document.activeElement` fell back to `<body>`. There was also no `Tab`/`Shift+Tab` cycling inside the open drawer, so keyboard focus could leave the dialog into the (visually obscured) page behind it.

**Fix:** added a `triggerRef` on the "Menu" button and a `drawerRef` on the `<aside role="dialog">`; the existing `open`-effect now restores focus to the trigger in its cleanup (covering Escape, Close-button and nav-link-click paths, since all three set `open=false` through the same state) and implements a standard first/last-focusable Tab-cycling trap while open.

### 5.5 Insufficient color contrast on dark accent panels

**Symptom:** the shared `.eyebrow` utility class defaults to `color: var(--coral-dark)` (`#9b3027`), correct on the site's light cream background. Two components reuse `.eyebrow` inside dark-ink (`--ink: #2b1b2b`) panels without overriding it: the PDP "Critical facts · never inferred" label (`.facts-section`) and the cart/checkout summary panel labels "Demo summary" / "Simulated checkout" (`.cart-summary`). Measured contrast: **2.20:1** (WCAG 2.2 AA requires 4.5:1 for this text size/weight).

**Fix:** `src/app/globals.css` — added `.facts-section .eyebrow { color: var(--canvas); }` and `.cart-summary .eyebrow { color: var(--canvas); }` (reusing the site's existing cream token, matching the precedent already set by `.department-tile span { color: var(--coral); }` for the tile's own dark-hover state). Re-measured contrast after fix: **15.38:1**.

**Verification method:** injected a WCAG relative-luminance/contrast-ratio calculator into the live page via `javascript_exec` and scanned every visible leaf text node's computed foreground against its resolved background across the homepage, PDP, shop/PLP, cart, checkout, recipe-review, about and footer. No other violations found (see §6).

## 6. Accessibility review (WCAG 2.2 AA-oriented)

Automated and manual checks are recorded separately, as required.

### Automated

| Check | Method | Result |
|---|---|---|
| Color contrast | Custom in-page WCAG relative-luminance scanner run against every leaf text node on home, PDP, shop/PLP, cart, checkout, recipe-review, about, footer | 2 violations found and fixed (§5.5); 0 remaining |
| Touch target size (WCAG 2.2 §2.5.8) | In-page bounding-box scan of all `button`/`a` at 390px viewport | 0 elements below 24×24 CSS px |
| Image alt coverage | In-page `<img>` scan | 48/48 images on scanned pages have an `alt` attribute (empty for decorative, descriptive for product/editorial imagery) |
| Heading structure | `document.querySelectorAll('h1'..'h6')` on home, PDP, about | Correct single-`h1`-per-page structure in the production build (a transient dev-server HMR artifact briefly showed 2 `h1`s during active file editing; confirmed absent via a clean `next build && next start` — see note below) |
| ESLint (`eslint-config-next`, includes `eslint-plugin-jsx-a11y` rules) | `npm run lint` | 0 errors, 0 warnings |

*Note on the H1 finding:* a duplicated `<h1>` was observed once, mid-session, on the hot-reloading dev server after several live component edits. Verified via a clean `next build` + `next start` on a separate port that the compiled production output contains exactly one `<h1>`. Logged here for transparency rather than omitted, but not counted as a defect.

### Manual

| Check | Method | Result |
|---|---|---|
| Skip link | Present, `href="#main-content"`; `<main id="main-content" tabIndex={-1}>` | ✅ |
| Landmarks | `banner`, `navigation "Primary"`, `main`, `contentinfo`, `navigation "Information"` present on every page checked | ✅ |
| Keyboard-only add-to-cart | Focus PDP add button, `Enter` | ✅ persists to `localStorage` |
| Keyboard-only checkout completion | Tab/Space through radio + acknowledgement checkbox, Tab to submit, `Enter` | ✅ verified via Playwright (`Space` correctly toggles radio/checkbox, `Tab` correctly skips within the native radio group, submit navigates to confirmation with correct reference) |
| Keyboard-only recipe-to-cart completion | `Enter` on "Review supplies" link, `Enter` on "Add selected supplies" button | ✅ 3 recipe-mapped lines added, correct provenance (`source.kind: "recipe"`) |
| Dialog/drawer focus containment + restoration | Mobile nav drawer | ✅ after fix (§5.4) |
| Escape-key behavior | Mobile nav drawer | ✅ closes, no keyboard trap |
| Live region announcements | `commerce-provider.tsx` renders a single `aria-live="polite" aria-atomic="true"` region driven by `announcement` state, updated on add/remove/wishlist-toggle | ✅ present |
| Form labels/validation | Checkout radio/checkbox have associated `<label>`; submit validation renders a `role="alert"` error summary listing unmet requirements | ✅ |
| Reduced motion | `MotionEnhancer` checks `matchMedia("(prefers-reduced-motion: reduce)")` before running any GSAP timeline; global CSS `@media (prefers-reduced-motion: reduce)` forces `scroll-behavior: auto` and near-zero animation/transition durations site-wide | ✅ confirmed via Playwright `page.emulateMedia({ reducedMotion: "reduce" })` (also covered by `tests/e2e/critical-journeys.spec.ts`) |

Automated tooling and manual review do not by themselves establish full WCAG 2.2 AA conformance; this report records what was actually checked, not a compliance certification.

## 7. Responsive review

Checked at all 5 required viewports (1440×900, 1024×768, 768×1024, 390×844, 360×800) across home, shop/PLP, PDP, cart, recipe-to-cart review, and the mobile nav drawer.

| Check | Result |
|---|---|
| Horizontal overflow (`scrollWidth - clientWidth`) | **0px** at every viewport × route combination checked |
| Console errors | 0 |
| Failed network requests | 0 (spot-checked via `read_network_requests`; all `_next/static`, `_next/image` and document requests returned 200/304) |
| Mobile navigation | Drawer opens/closes correctly, focus-trapped and restored (post-fix) |
| Filters/search | Department/sort selects and search box usable and correctly labelled at 390px |
| Cart/checkout | Line items, quantity controls and the dark summary panel remain legible and usable down to 360px |
| Recipe-to-cart | 8-line ingredient review table (required/selected/purchased/leftover, pack override selects, pantry/optional/unmapped states) remains usable and non-overlapping at 360px |
| Variant/media behavior | PDP pack switch updates SKU, price, availability text and gallery atomically at all viewports tested |

## 8. Automated quality gates

All commands run from the repository root against `main` @ this checkpoint.

| Gate | Command | Result |
|---|---|---|
| Canonical validation | `npm run validate:canonical` | PASS — see §4 |
| Format check | `npm run format:check` | PASS (1 pre-existing violation in `tsconfig.json` fixed — array formatting only, no semantic change) |
| Lint | `npm run lint` | PASS — 0 errors, 0 warnings |
| Type check | `npm run typecheck` (`tsc --noEmit`, strict) | PASS |
| Unit tests | `npm test` (Vitest) | PASS — **12/12** (3 test files) |
| E2E tests | `npm run test:e2e` (Playwright, desktop + mobile projects) | PASS — **10/10** (was 4/10 before the `allowedDevOrigins` fix, §5.1) |
| Production build | `npm run build` (`next build --webpack`, includes canonical validation) | PASS — 54/54 pages generated, 0 build errors |

No test was weakened, skipped, or had assertions removed to obtain a pass. The one E2E-adjacent environment issue (§5.1) was root-caused and fixed at the config layer, not worked around in test code.

## 9. Performance and production readiness

| Check | Result |
|---|---|
| Image optimization | All catalog/recipe imagery served via `next/image` with explicit dimensions and responsive `sizes`; verified `_next/image` requests in network log resize/re-encode correctly (`w=640`, `w=1920`, `q=75`) |
| Route metadata | Per-route `<title>` via Next `Metadata` template (`%s · Pantryform`), `openGraph` block with truthful demo description, no fabricated claims |
| Sitemap / robots | `src/app/sitemap.ts` and `src/app/robots.ts` present; `sitemap.xml` includes all static, product and recipe routes; `robots.txt` allows all with a sitemap reference; both use the placeholder domain `pantryform.example` (no real domain leaked, matching "no public deployment yet") |
| Structured data | None implemented — no truthfulness risk since none exists |
| Environment variables | None required; no `.env*` files present in the repo |
| Secrets scan | `grep` for common API-key/private-key patterns across `src/`, `scripts/`, `production_artifacts/` — 0 matches |
| Third-party analytics | `src/lib/domain/analytics.ts` defaults to `NoopAnalytics`; a typed `DebugAnalytics` sink exists for local testing only; nothing is transmitted off-device |
| Bundle size (dev reference) | Largest chunk 352 KB, framework chunk 188 KB — no unusual bloat for a Next.js/React/GSAP app |
| No real payment/PII collection | Confirmed — checkout form collects only a radio selection (`home`/`studio`) and an acknowledgement checkbox; no free-text personal fields exist anywhere in the app |

Public deployment was not performed, per scope.

## 10. Known limitations

- No structured data (JSON-LD) is implemented; out of scope for this pass and carries no truthfulness risk in its absence.
- `/shop/[department]/[category]` has no canonical subcategories defined in the current catalog, so the category tier is currently unreachable through normal navigation; the route itself does not error.
- Automated accessibility coverage is a custom in-page scanner plus `eslint-plugin-jsx-a11y`, not a dedicated tool such as axe-core; findings should be read as a solid first pass, not a certification.
- `vitest.config.ts` emits a benign Vite "native config loader" deprecation warning on every unit-test run; cosmetic, does not affect results.

## 11. Reproduction

```sh
npm ci
npm run validate:canonical
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Local review server: `npm run dev` → `http://localhost:3000` (or `http://127.0.0.1:3000`, both now trusted by the dev server per §5.1).

## 12. Screenshot evidence

18 screenshots captured post-fix at `production_artifacts/09_qa/screenshots/`, covering desktop (1440×900), mobile (390×844) and the smallest required viewport (360×800): home, shop/PLP, PDP (default + variant-switched), recipe detail, recipe-to-cart review, cart with items, checkout form, order confirmation, search no-results, 404, empty wishlist, and the open mobile nav drawer.
