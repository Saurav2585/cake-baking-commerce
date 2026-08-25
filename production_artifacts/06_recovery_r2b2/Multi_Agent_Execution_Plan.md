# R2B2A — Multi-Agent Execution Plan

Orchestrator: this session, acting as Senior Product Manager / Multi-Agent Orchestrator only. Specialist analysis is delegated; the orchestrator reconciles, does not replace it.

Repository: `/Users/codeclouds-saurav/Desktop/cake-baking-commerce`, branch `recovery/real-commerce-visuals`, starting commit `15e621d8077ac60af9adf1e4d668ecf2416cd695` (clean working tree, verified before dispatch).

This gate is planning/asset-resolution/approval only. No route, motion, or component implementation code is written in R2B2A.

## Execution waves

**Wave 1 (parallel, independent):** Agents 1, 2, 3, 4, 5. None of these five share a writable file with any other in this wave — see per-task writable scope below — so they run concurrently with no merge risk.

**Wave 2 (after Wave 1 completes):** Agent 6, which reads all five Wave 1 artifacts as input and cannot start meaningfully before they exist.

**Wave 3 (orchestrator only):** Reconciliation, Decision Log / Risk Register / Review Packet updates, final task package, validation (only if Agent 1 changed asset/data files), commit and push.

## Task ledger

### Task 1 — Product Asset Specialist

- **Owner:** Specialist Agent 1 (subagent)
- **Reviewer:** Orchestrator (asset/provenance legitimacy), then QA Agent 6 (no-AI-image and provenance completeness check)
- **Inputs:** `design_review/recovery_r1/catalog/Product_Provenance_Register.md`; `design_review/recovery_r2b1/R2B1_Provenance_And_Validation.md` (lists the 5 missing + 2 quality-limited products with prior blocker reasons); `production_artifacts/05_catalog_production/tools/real_catalog_source.mjs`, `normalize_real_assets.py`, `generate_real_catalog_assets.mjs`
- **Dependencies:** None
- **Writable scope:** `public/real-products-v2/*`, `public/assets/catalog/real/*`, `production_artifacts/05_catalog_production/Catalog_Asset_Manifest.json`, `production_artifacts/05_catalog_production/tools/real_catalog_source.mjs` (provenance fields only), `production_artifacts/06_recovery_r2b2/Asset_Coverage_Report.md`, `production_artifacts/06_recovery_r2b2/Asset_Requests_For_External_Generation.md` (if applicable). Isolated worktree, since this is the only task in this gate that mutates tracked data/asset files.
- **Deliverable:** `production_artifacts/06_recovery_r2b2/Asset_Coverage_Report.md`
- **Acceptance criteria:** every one of the 5 missing products either has a verified real sourced image (with URL, type, date, dimensions, SHA-256, confidence) or an explicit, reasoned recommendation to the orchestrator for a verified same-department replacement product (not a silent catalog change); the 2 quality-limited images are independently re-reviewed and replaced only on a materially better verified source; zero AI-generated or hotlinked images; zero packaging/logo/label alteration.
- **Definition of done:** report filed, worktree path/branch reported to orchestrator, no canonical-data changes made without flagging them for orchestrator approval.
- **Risk if skipped:** placeholder imagery ships to R2B2 implementation, undermining the "48/48 real photographic coverage" objective and the whole recovery effort's credibility claim.

### Task 2 — Ecommerce Architect

- **Owner:** Specialist Agent 2 (subagent)
- **Reviewer:** Orchestrator; cross-checked against Agent 3's UI spec at reconciliation
- **Inputs:** `production_artifacts/05_catalog_production/*.json` (canonical data), `src/lib/domain/catalog.ts`, `cart.ts`, `recipe-solver.ts`, `types.ts`; `design_review/recovery_r2b1/*`; legacy `production_artifacts/03_ux/PLP_and_Search_UX_Spec.md`, `PDP_UX_Spec.md`, `Wishlist_Cart_Checkout_UX_Spec.md`, `Recipe_and_Recipe_to_Cart_UX_Spec.md`; `docs/Decision_Log.md`, `docs/Risk_Register.md`
- **Dependencies:** None
- **Writable scope:** `production_artifacts/06_recovery_r2b2/Commerce_Contract_Audit.md` only. Read-only against application code.
- **Deliverable:** `production_artifacts/06_recovery_r2b2/Commerce_Contract_Audit.md`
- **Acceptance criteria:** independently re-derives and confirms (or flags a discrepancy in) every R2B1 claim — 48 parents/51 SKUs/joins/department balance/price units/variant ownership/no stale fictional leakage/no real-inventory-or-payment implication; specifies the exact data contract each downstream route needs.
- **Definition of done:** audit filed with a pass/fail verdict per checked item, not a single blanket pass.
- **Risk if skipped:** R2B2 UI/motion work builds against unverified or subtly wrong commerce assumptions (e.g. price unit, availability vocabulary, cart persistence semantics).

### Task 3 — Commerce UI/Product Designer

- **Owner:** Specialist Agent 3 (subagent)
- **Reviewer:** Orchestrator; reconciled against Agent 2's contract and Agent 4's motion classification
- **Inputs:** approved R2A/R2A-rework homepage (`src/app/page.tsx`, `src/components/site-header.tsx`, `src/components/real-product-card.tsx`, `src/app/globals.css`, `design_review/recovery_r2a_rework/screenshots/`); real 48-product catalog (`design_review/recovery_r2b1/R2B1_Catalog_Summary.md`); legacy `production_artifacts/03_ux/*`, `04_visual_system/*`; Agent 2's contract when available
- **Dependencies:** Soft dependency on Task 2 (proceeds in parallel; reconciled if it conflicts)
- **Writable scope:** `production_artifacts/06_recovery_r2b2/Route_UI_Specification.md` only. Read-only against application route code.
- **Deliverable:** `production_artifacts/06_recovery_r2b2/Route_UI_Specification.md`
- **Acceptance criteria:** covers PLP/shop, category, search, and PDP with concrete breakpoint/grid/state specs; explicitly carries forward the approved refinements (hero collage panel fix, compact 2-column mobile grid, preserved logo/header, preserved real photography, no beige editorial styling).
- **Definition of done:** every significant element has dimensions/spacing/typography/states/breakpoints/asset/behaviour/motion-classification recorded.
- **Risk if skipped:** implementation improvises layout decisions ad hoc, producing inconsistent density/hierarchy across routes.

### Task 4 — 3D/Parallax Experience Expert

- **Owner:** Specialist Agent 4 (subagent)
- **Reviewer:** Orchestrator; reconciled against Agent 5's feasibility read and Agent 6's performance acceptance
- **Inputs:** `production_artifacts/04_motion_assets/*` (Phase 4B fictional-catalog-era motion system — must be explicitly superseded where it assumes fictional/illustrated packaging), `production_artifacts/04_visual_system/Motion_Opportunity_Map.md`, current real-product homepage implementation, `src/components/motion-enhancer.tsx`
- **Dependencies:** None
- **Writable scope:** `production_artifacts/06_recovery_r2b2/Motion_3D_Specification.md`, `production_artifacts/06_recovery_r2b2/Motion_Performance_Budget.md` only. Must not generate any image; may only write Asset Requests for anything genuinely missing.
- **Deliverable:** both files above
- **Acceptance criteria:** classifies every signature moment STATIC → WEBGL using the simplest-technique-first rule; full ENTRY/BUILD/PEAK/EXIT storyboard with Z0–Z6 layer map for each approved sequence; explicit reduced-motion and mobile/low-power equivalents; explicit performance budget (DOM layers, pinned sections, image bytes, animated elements, main-thread work).
- **Definition of done:** no WebGL/Three.js recommendation without a written user-value justification; hero evaluated for 2.5D depth without blocking the shopping CTA or requiring a long pin.
- **Risk if skipped:** motion work in R2B2 either regresses to generic reveals (Risk R-033 in the existing Risk Register) or over-invests in unjustified 3D.

### Task 5 — GSAP/Frontend Architect

- **Owner:** Specialist Agent 5 (subagent)
- **Reviewer:** Orchestrator; reconciled against Agent 4's choreography and Agent 3's component states
- **Inputs:** `src/components/motion-enhancer.tsx`, `src/app/page.tsx`, `src/components/real-product-card.tsx`, `real-product-rail.tsx`, `site-header.tsx`, `commerce-provider.tsx`, `src/lib/domain/*`, `tests/e2e/critical-journeys.spec.ts`, `production_artifacts/06_engineering/Technical_Architecture.md`
- **Dependencies:** None
- **Writable scope:** `production_artifacts/06_recovery_r2b2/Frontend_GSAP_Architecture.md` only. Read-only against application code.
- **Deliverable:** `production_artifacts/06_recovery_r2b2/Frontend_GSAP_Architecture.md`
- **Acceptance criteria:** covers directory/file ownership, shared product-card migration path, server/client boundaries, GSAP module boundaries (`gsap.context()`, `gsap.matchMedia()`, ScrollTrigger registration/start-end-scrub-pin/`invalidateOnRefresh`), progressive enhancement, cart/variant-state independence from animation, and a concrete safe-worktree partition for R2B2 implementation.
- **Definition of done:** identifies exactly which files must not be edited concurrently by two future implementation worktrees.
- **Risk if skipped:** parallel R2B2 implementation agents collide on shared files (especially `globals.css`, `commerce-provider.tsx`, `motion-enhancer.tsx`).

### Task 6 — Independent QA/Performance/Accessibility

- **Owner:** Specialist Agent 6 (subagent)
- **Reviewer:** Orchestrator (final authority on P0/P1 gating)
- **Inputs:** all five Wave 1 deliverables above
- **Dependencies:** Hard dependency on Tasks 1–5 (Wave 2)
- **Writable scope:** `production_artifacts/06_recovery_r2b2/QA_Acceptance_Plan.md` only.
- **Deliverable:** `production_artifacts/06_recovery_r2b2/QA_Acceptance_Plan.md`
- **Acceptance criteria:** independent verification plan (not a rubber stamp) across functional commerce, product/media truth, visual fidelity, responsive behaviour, GSAP/ScrollTrigger/parallax, cross-browser, accessibility, Core Web Vitals/runtime performance, network/failure states, no-animation functionality; explicitly confirms no AI-generated asset was introduced.
- **Definition of done:** every required verification item from the phase brief is present with a concrete method (not "test X" without how).
- **Risk if skipped:** R2B2 implementation ships without independent acceptance criteria, so defects surface only after implementation is underway.

## Addendum — Task 7: Premium Visual / Art-Direction Acceptance Gate

Issued mid-gate by the user as a **mandatory, locked release requirement**, additive to (not a restart of) Tasks 1–6. Rationale in the user's own words: the final site must feel like "a premium, art-directed, award-gallery-quality commerce experience — not a basic ecommerce template," via a dual-layer model (fast, dense, trustworthy **commerce layer** + art-directed, memorable **experience layer** that elevates but never obstructs the commerce layer). Explicit non-goals: no excessive animation, no decorative WebGL, no giant empty editorial sections, no illegible type, no sacrificing conversion/accessibility/mobile usability, no fictional packaging or AI-generated product imagery (this restates, not loosens, the standing image-generation prohibition below).

- **Owner:** Specialist Agent 7 (subagent), dispatched after Tasks 1–5 (Wave 1) were already complete, in parallel with Task 6 (QA)
- **Reviewer:** Orchestrator, reconciled against Task 3 (`Route_UI_Specification.md`), Task 4 (`Motion_3D_Specification.md`/`Motion_Performance_Budget.md`), and Task 6 (`QA_Acceptance_Plan.md`)
- **Inputs:** `Route_UI_Specification.md`, `Motion_3D_Specification.md`, `Motion_Performance_Budget.md`, `Asset_Coverage_Report.md`, `Commerce_Contract_Audit.md`, `Frontend_GSAP_Architecture.md`, `design_review/recovery_r2a_rework/screenshots/*`, `production_artifacts/04_visual_system/Design_Tokens.md`/`Colour_System.md`/`Typography_System.md` (as reusable precedent, not a fictional-catalog restart), `design_review/recovery_r2b1/R2B1_Catalog_Summary.md`
- **Dependencies:** Hard dependency on Tasks 3 and 4 (does not re-derive their grid/breakpoint/motion mechanics, builds an art-direction and acceptance layer on top of them)
- **Writable scope:** `production_artifacts/06_recovery_r2b2/Premium_Visual_Acceptance_Gate.md` only
- **Deliverable:** `Premium_Visual_Acceptance_Gate.md` covering: a measurable Premium Visual Acceptance Gate (pass/fail criteria, not vibes); page-by-page art-direction intent (Homepage, PLP/category, Search incl. no-results, PDP, Cart/Checkout); visual hierarchy and composition rules; typography/spacing standards; product-image presentation standards; which GSAP/parallax moments are intentional signature moments vs. which sections stay deliberately static (must reconcile with, not contradict, Task 4's classifications); desktop and mobile visual acceptance criteria; explicit anti-template criteria (concrete tells of genericness to avoid); performance and reduced-motion fallbacks (must reference, not duplicate, `Motion_Performance_Budget.md`); and the exact screenshot/recording evidence set required before any future production merge: Homepage @1440px+390px, PLP/category @1440px+390px, Search results + no-results, PDP @1440px+390px, Cart + Checkout, and every signature motion moment as still frames or a recording.
- **Acceptance criteria:** every criterion is independently checkable (a reviewer with only screenshots and this document can render a pass/fail verdict, not a subjective impression); does not re-litigate or contradict Task 3/4's already-decided mechanics (grid columns, breakpoints, motion classifications, performance budgets) — it adds an art-direction/quality layer on top; explicitly states that a technically-passing build is not visually complete until it clears this gate.
- **Definition of done:** report filed; any new visual asset need this task identifies is written up as a formal Asset Request **naming ChatGPT (or another external/human generation channel) as the destination**, per the image-governance rule below — never generated by Claude or any Claude subagent.
- **Risk if skipped:** implementation could ship a technically-correct but generic-feeling storefront that passes every functional/commerce/motion-budget check while still failing the user's actual bar for this recovery effort.

**Image governance (restated, unchanged, applies to this task like every other):** Claude and every Claude subagent generate **zero** images, for any purpose. Only verified real product photography already sourced (`Asset_Coverage_Report.md`) may be used for products. Any genuinely new creative visual asset need is written up as a formal Asset Request naming an external generation channel (the user specified ChatGPT) or human production — never substituted with an improvised or generated image, and never blocking unrelated non-blocked work.

## Ownership boundaries (no overlap)

| File / area | Sole owner this gate |
|---|---|
| `public/real-products-v2/*`, `public/assets/catalog/real/*`, `Catalog_Asset_Manifest.json` | Agent 1 |
| `Commerce_Contract_Audit.md` | Agent 2 |
| `Route_UI_Specification.md` | Agent 3 |
| `Motion_3D_Specification.md`, `Motion_Performance_Budget.md` | Agent 4 |
| `Frontend_GSAP_Architecture.md` | Agent 5 |
| `QA_Acceptance_Plan.md` | Agent 6 |
| `Premium_Visual_Acceptance_Gate.md` | Agent 7 |
| `Reconciliation_and_R2B2_Implementation_Package.md`, `docs/Decision_Log.md`, `docs/Risk_Register.md`, `production_artifacts/reviews/Current_Review_Packet.md` | Orchestrator only |

No application route/component/motion code is edited by any agent in this gate.
