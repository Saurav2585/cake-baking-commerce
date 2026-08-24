# Phase 7 — Release QA and Vercel Production Deployment

**Status:** Production live
**Deployment date:** 2026-08-25
**Deployed commit:** `6f9b140cc2269bd93e9605237380d0c791e9f729` (unchanged since Phase 6 approval; no source changes were required during release QA)

## Deployment

| Item | Value |
|---|---|
| Vercel project | `cake-baking-commerce` (org: `saurav-gangulys-projects-05ef8aff`) |
| Preview/production URL | `https://cake-baking-commerce.vercel.app` |
| Deployment-specific URL | `https://cake-baking-commerce-76ehsxs87.vercel.app` |
| Deployment ID | `dpl_5wyojCk9b9a3aMKejUBhV12w9TvJ` |
| Target | `production` (Vercel auto-assigns a project's first deployment to production; there was no separate manual promotion step) |
| GitHub connection | Linked to `https://github.com/Saurav2585/cake-baking-commerce`, branch `main` |
| Framework detection | Next.js 16.3.2, auto-detected |
| Environment variables | None added — the app requires none |
| Third-party services connected | None (no database, auth, analytics, or payment provider) |

## Release-critical gate results (local, pre-deployment)

| Gate | Command | Result |
|---|---|---|
| Fresh install | `npm ci` | PASS |
| Canonical validation | `npm run validate:canonical` | PASS — 24 products, 38 SKUs, 24 content records, 6 recipes, 45 ingredient lines, 27 mappings, 0 errors |
| Lint | `npm run lint` | PASS — 0 errors, 0 warnings |
| Type check | `npm run typecheck` | PASS |
| Unit tests | `npm test` | PASS — 12/12 |
| Production build (local) | `npm run build` | PASS — 54/54 pages |
| Remote build (Vercel) | `vercel deploy` | PASS — identical validation output and 54/54 pages, confirming the Vercel build environment reproduces the local build exactly |

## Production verification (live, `https://cake-baking-commerce.vercel.app`)

All checks below were run directly against the live production URL, not a local server.

### Golden-path journeys

| Journey | Result |
|---|---|
| Homepage → department (`/shop/chocolate`) → PDP (`/products/plain-flour`) | PASS |
| PDP variant switch (500 g → 1 kg): price ₹49→₹89, SKU FN-FLR-500→FN-FLR-1000, availability text | PASS |
| Add to cart, then hard reload of `/cart` | PASS — cart persisted correctly (Phase 6 hydration fix confirmed live) |
| Wishlist: save from PDP, hard reload of `/wishlist` | PASS — item persisted |
| Recipe detail → recipe-to-cart review → "Add selected supplies" | PASS — all 3 mapped lines added atomically with correct `"Added from recipe review"` provenance |
| Cart → simulated checkout → fictional profile + acknowledgement → confirmation | PASS — reference generated (e.g. `PF-DEMO-MT7RB50P`), "No paid order, delivery, customer account or fulfilment record was created." shown, no empty-cart flash (Phase 6 fix confirmed live) |
| Mobile navigation drawer (390 px) | PASS — opens, `role="dialog"` present and visible |
| Keyboard-only journey: focus PDP add button → `Enter`; focus checkout radio → `Space`/`Tab`/`Space`/`Tab`/`Enter` | PASS — reached confirmation page with correct reference, no pointer input used |
| Reduced motion (`prefers-reduced-motion: reduce`) | PASS — `document.documentElement` computed `scroll-behavior: auto` |
| Deep-link refresh of `/cart`, `/checkout`-adjacent flow, `/wishlist` | PASS |
| 404 (`/this-does-not-exist`) | PASS — on-brand "404 · Measure not found" recovery page, `Browse all supplies` link |
| Search (`/search?q=cocoa`) | PASS |
| Unknown critical facts | PASS — PDP still renders "Information not provided" for Ingredients/Allergens/Storage where unset |
| No real-commerce claim | PASS — every screen retains "Portfolio demo · fictional products and INR prices · no real orders or payments" banner and simulated-commerce disclosures |

### Live console / network

- **Console errors:** 0 across all pages visited.
- **Failed application requests:** 0. A small number of `_rsc=...` prefetch requests showed as `net::ERR_ABORTED` in an automated rapid-navigation script; isolated and confirmed this is the browser cancelling an in-flight Next.js Link-prefetch when navigation moves to a different route before the prefetch resolves — not a server error, not a user-visible failure, and not reproducible during normal single-navigation usage.
- **Broken images:** 0 — spot-checked `_next/image` requests for the homepage hero, PDP gallery, and PLP thumbnails all returned `200`.
- **Horizontal overflow:** **0px** at all 3 required live viewports (1440×900, 390×844, 360×800) across 8 representative routes (home, shop, department, PDP, recipe detail, recipe-to-cart, cart, checkout) — 24/24 checks clean.
- **Mixed content / unexpected 4xx-5xx:** none observed.

### Live visual gate

16 screenshots captured directly from the production URL (not reused from Phase 6) at `production_artifacts/10_release/screenshots/`: 10 at 1440×900 covering home, shop, a department, PDP default and variant-switched, a recipe, recipe-to-cart, cart, checkout, and confirmation; 4 at 390×844; 2 at 360×800. Editorial direction (The Measured Pantry / Measured Transformation), typography, layering, and mobile art direction are visually confirmed intact and consistent with the Phase 6 evidence — no generic-template flattening, no clipped controls, no broken crops.

### robots.txt / sitemap / metadata

- `https://cake-baking-commerce.vercel.app/robots.txt` returns `200` with `Allow: /` and a sitemap reference (the sitemap URL still points at the placeholder `pantryform.example` domain per the Phase 6 decision — this is a known, intentional limitation until a real domain is authorized, not a defect).
- Open Graph metadata, page-title template, and the simulated-commerce disclosure footer are present and unchanged from the verified Phase 6 build.

## Fix policy

No production defects were found. Every apparent anomaly encountered during release QA (a momentary blank hero image on first paint, a "MEASURING THE PANTRY…" loading frame caught mid-transition, an initial `false` result for the recipe-to-cart line count) was re-investigated with a longer wait and confirmed to be a timing artifact of the verification script rather than an application defect — none required a code change. No unrelated polish, redesign, dependency upgrade, or architecture change was made in this phase.

## Known limitations

- `robots.txt` / `sitemap.xml` reference the placeholder domain `pantryform.example`, not the live Vercel URL — update when/if a real domain is authorized.
- The committed Playwright E2E suite (`tests/e2e/critical-journeys.spec.ts`) is hardcoded to `127.0.0.1:3000` via `playwright.config.ts` and has no override for a remote base URL, so it was not run directly against the live deployment. Equivalent coverage was performed manually/via ad hoc Playwright scripts against the live URL for every journey the suite exercises (see table above); all local runs against the dev/build server remain 10/10 passing per the Phase 6 report.
- `/shop/[department]/[category]` remains unreachable through normal navigation (no canonical subcategories defined yet) — unchanged from Phase 6, does not error.
- This is a portfolio/demo deployment: no real payments, accounts, inventory, or personal-data collection exist anywhere in the live site.

## Rollback guidance

- The previous safe state is the pre-deployment repository commit `6f9b140cc2269bd93e9605237380d0c791e9f729` itself (no code changed during Phase 7), so a rollback is a Vercel-level action only.
- To roll back: from the Vercel dashboard or CLI (`vercel rollback` / promote a prior deployment), reassign the `cake-baking-commerce.vercel.app` alias to an earlier ready deployment, or redeploy from an earlier commit with `vercel deploy --prod` after checking out that commit. No database migrations, environment variables, or external service state exist to roll back — the entire deployed surface is the static/edge-rendered Next.js build itself.

## Simulated-commerce disclosure

Pantryform is a fictional portfolio/demo storefront. All products, prices, availability, and recipes are fictional fixtures. No real payment, inventory, fulfilment, customer account, or order is created at any point, including in this live production deployment. This disclosure is visible in the persistent top banner and repeated in the checkout, confirmation, and footer copy on every page.

## Reproduction

```sh
npm ci
npm run validate:canonical
npm run lint
npm run typecheck
npm test
npm run build
npx vercel deploy --prod   # requires an authenticated Vercel session linked to this project
```

Live production URL: `https://cake-baking-commerce.vercel.app`
