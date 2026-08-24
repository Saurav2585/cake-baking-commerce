# Backlog

## Phase plan and dependencies

| Phase | Primary owners | Depends on | Required outputs | Exit acceptance | Human gate |
|---|---|---|---|---|---|
| 0 — Foundation | PM | Brief | Charter, repository/artifact map, role boundaries, backlog, status, decisions, risks, release checklist, UX research task package | All requested artifacts exist; confirmed decisions and assumptions are separate; no design/code started | Approve only open material Phase 0 decisions |
| 1 — UX and competitor research | UX Research, Catalog/Commerce | Phase 0 | Competitor/category evidence, audience hypotheses, jobs/journeys, terminology, catalog patterns, opportunity and constraint synthesis | Evidence is dated/cited; facts separated from inference; reference content not copied; research questions answered | Approved at commit `510afb0` |
| 2A — Retail brand strategy | Brand Strategy, PM | Approved Phase 1 | Market opportunity, positioning, personality, naming, voice, visual-world principles, brand architecture, campaign territories, creative brief and readout | Original strategy traces to research; 20+ names scored; shortlist/recommendation and mandatory clearance boundary explicit; no design begun | Approve positioning, retailer-name candidate for clearance, and lead territory |
| 2B — Catalog/commerce/IA architecture | Catalog/Commerce, UX | Approved Phase 2A direction and explicit authorization | Taxonomy detail, product/variant schema, commerce boundaries, sitemap, recipe mapping and journey requirements | Catalog covers v1; approved D-015–D-017 encoded; future integrations have explicit interfaces | Approve architecture, taxonomy detail and commerce boundary |
| 3 — UX definition | UX/Product Design, Catalog/Commerce | Phase 2B | User flows, IA, wireframes, states, content model, recipe-to-cart rules | Critical journeys and edge states specified across breakpoints; accessibility needs annotated | Approve UX flows and wireframes |
| 4 — Visual & motion system | UI Design, Visual Assets, Motion | Phase 3 | Original visual system, responsive screens, asset plan, motion specs, reduced-motion behavior | Design is original, consistent, accessible in intent, feasible, and covers critical states | Approve visual direction and hero/asset direction |
| 5 — Catalog & asset production | Catalog/Commerce, Visual Assets | Phases 2B–4 | 24–30 product records, recipe data, original copy, generated assets, Asset Manifest | Coverage/data validation passes; pricing evidence/assumptions recorded; every asset traceable; prohibited claims absent | Approve representative catalog/content set |
| 6 — Engineering | Frontend Engineering, Motion | Phases 3–5 | Next.js implementation, tests, technical notes | Functional scope implemented; type/lint/build and critical automated tests pass; reduced motion and responsive states work | Gate only if a material approved-design deviation is needed |
| 7 — QA & remediation | QA, Engineering | Phase 6 | Test evidence, accessibility report, defect log, fixes | No release-blocking defects; critical journeys pass; documented WCAG assessment complete | Accept material residual risks only |
| 8 — Release | Release, PM, QA | Phase 7 | Deployment evidence, release notes, rollback notes, final checklist | Release checklist complete; demo disclosures present; links and monitoring verified | Final release approval |

## Prioritized epics

### P0 — required for v1

- Governance and research evidence.
- Original brand/product/UX direction.
- Catalog taxonomy and 24–30 validated demo products with variants and INR pricing.
- Search, filter, sort, product detail, wishlist, cart, recipe-to-cart, checkout simulation, and confirmation.
- Responsive and accessibility-oriented implementation.
- Asset provenance, automated checks, QA, and release controls.

### P1 — valuable if capacity permits

- Recently viewed or related products using deterministic demo logic.
- Richer recipe filters and pantry-aware quantity guidance.
- Enhanced loading/skeleton and offline-friendly states.

### Deferred

- Accounts, live payments, real fulfillment/inventory/tax, CMS/admin, reviews, loyalty, multilingual UI, and production analytics/marketing integrations.

## Phase 0 acceptance checklist

- [x] Repository and numbered artifact structure created.
- [x] Root agent operating contract created.
- [x] Charter, backlog, status, decision log, risk register, and release checklist created.
- [x] Ten specialist roles and their boundaries defined.
- [x] Phases, dependencies, acceptance criteria, and human gates defined.
- [x] Confirmed decisions and assumptions separated.
- [x] First bounded UX/competitor research package prepared.
- [x] No branding, UI, or production code started.

## Phase 2A acceptance checklist

- [x] All ten required brand-strategy artifacts are present.
- [x] Phase 1 approvals P-005 through P-007 are promoted to confirmed decisions.
- [x] Positioning and brand principles trace to approved audience, retail model and research.
- [x] At least 20 retailer names are scored across all required criteria; five are shortlisted and one recommended.
- [x] Naming remains provisional with independent clearance required.
- [x] Retailer/product-brand hierarchy and relationship rules are explicit.
- [x] Three distinct campaign territories and a bounded creative brief are documented.
- [x] Assumptions remain distinct from approved decisions.
- [x] No UI design, catalog architecture, generated assets or application code was started.
