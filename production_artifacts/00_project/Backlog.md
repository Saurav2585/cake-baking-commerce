# Backlog

## Phase plan and dependencies

| Phase | Primary owners | Depends on | Required outputs | Exit acceptance | Human gate |
|---|---|---|---|---|---|
| 0 — Foundation | PM | Brief | Charter, repository/artifact map, role boundaries, backlog, status, decisions, risks, release checklist, UX research task package | All requested artifacts exist; confirmed decisions and assumptions are separate; no design/code started | Approve only open material Phase 0 decisions |
| 1 — UX and competitor research | UX Research, Catalog/Commerce | Phase 0 | Competitor/category evidence, audience hypotheses, jobs/journeys, terminology, catalog patterns, opportunity and constraint synthesis | Evidence is dated/cited; facts separated from inference; reference content not copied; research questions answered | Approved at commit `510afb0` |
| 2A — Retail brand strategy | Brand Strategy, PM | Approved Phase 1 | Market opportunity, positioning, personality, naming, voice, visual-world principles, brand architecture, campaign territories, creative brief and readout | Original strategy traces to research; screened prototype name and clearance boundary explicit; no design begun | Approved at commit `504321e`; Pantryform is prototype-only |
| 2B — Catalog/commerce/IA architecture | Catalog/Commerce, UX | Approved Phase 2A direction and explicit authorization | Taxonomy detail, product/variant/recipe schemas, discovery and commerce boundaries, sitemap/flows/states, SEO, analytics and frontend contracts | D-015–D-017 encoded; deterministic rules and accessibility/failure states complete; future interfaces explicit; no downstream design/code | Approved at commit `475b603` |
| 3 — UX definition | UX/Product Design, Catalog/Commerce | Approved Phase 2B | UX principles; discovery, homepage, PLP/search, PDP, recipe, commerce, responsive, accessibility, content and component specs; 19 low-fidelity blueprints; traceability and readout | Critical journeys and edge states specified across required viewports; accessibility attached to interactions; all architecture contracts preserved; no visual design/code | Approved at commit `1b0c5fa` |
| 4A — Visual direction & review prototype | UI Design, Visual Assets, UX, PM | Approved Phase 3 | Visual direction, semantic tokens, colour/type/grid/imagery/component/screen specs, stress tests, motion opportunity map, traceability, static review prototype and screenshots | Original coherent direction; contrast and responsive evidence; prototype reviewable; Phase 3 behavior preserved; no production app/motion/catalog | Approve Phase 4A before Phase 4B or production work |
| 4B — Motion specification | Motion, UI Design, UX | Approved Phase 4A and explicit authorization | Production-ready motion language/timelines/budgets and reduced/no-motion behavior | Motion is optional, performant and cannot alter content/state understanding | Separate authorization required |
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

## Phase 3 acceptance checklist

- [x] Phase 2B external approval and Phase 3 authorization are recorded.
- [x] Fourteen required Phase 3 artifacts exist and are non-empty.
- [x] Nineteen required routes, overlays and important shared states have low-fidelity blueprints.
- [x] Each blueprint specifies objective, task, hierarchy, desktop/mobile structure, actions, navigation, sticky behavior, states, focus/status, responsive behavior, no-animation equivalent and traceability.
- [x] Homepage modules each serve a distinct discovery or confidence job without unsupported popularity or trust claims.
- [x] PLP/search, PDP, recipe-to-cart, wishlist, cart and simulated checkout preserve approved Phase 2B contracts.
- [x] Responsive behavior covers 1440, 1280, 1024, 768, 430, 390, 360 and 320 CSS px intentionally.
- [x] Accessibility is embedded into component/flow requirements and traceability, not isolated in an appendix.
- [x] Empty, loading, error, unavailable, stale and partial states are defined.
- [x] No final visual identity, generated assets, production catalog, motion implementation or application code was started.

## Phase 4A acceptance checklist

- [x] Phase 3 external approval and Phase 4A authorization are recorded.
- [x] All fourteen required visual-system artifacts exist and are non-empty.
- [x] One reconciled palette/token system includes verified contrast evidence and a documented rejected colour pairing.
- [x] Typography, grid and responsive behavior cover the mandated viewport/content stress set.
- [x] Every required component/state and high-fidelity desktop/mobile screen is specified.
- [x] Static prototype is isolated, noindex, dependency-free, navigable and visibly labelled as non-production/demo.
- [x] Eleven deterministic screenshot review files and a viewport manifest exist.
- [x] Browser checks cover 112 route/viewport combinations with no horizontal overflow after correction; no blocking console errors were found.
- [x] 320px + deterministic 200% text and no-animation modes pass all representative screens.
- [x] No approved Phase 3 behavior, unsupported claim, real-commerce implication or prohibited Phase 4B+/production work was introduced.

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

## Phase 2B acceptance checklist

- [x] Twelve catalog/commerce artifacts and four UX-architecture artifacts are present.
- [x] Eight departments and all required product families are covered at bounded depth.
- [x] Parent/variant ownership, typed axes, normalization and tri-state facts are deterministic.
- [x] Recipe-to-cart pack selection, overrides, substitutions, staleness and merges are testable.
- [x] Search/filter/sort, URL/SEO, analytics and all critical states are specified.
- [x] Demo commerce cannot imply a real payment, order, delivery or tax calculation.
- [x] Provider seams are replaceable without selecting or implementing vendors.
- [x] Keyboard, focus, status, labels, target-size, reflow and reduced-motion requirements are architectural.
- [x] No wireframes, visual UI, generated assets, motion implementation or code were created.
