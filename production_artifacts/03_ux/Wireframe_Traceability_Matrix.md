# Wireframe Traceability Matrix

| Screen/component | Decisions/findings | Phase 2B authority | Required states | Accessibility binding | Risks |
|---|---|---|---|---|---|
| Global shell/navigation | D-010, D-015; F1/F6 | Sitemap; Taxonomy | mobile drawer, count failure, route change | skip link, labelled navs, focus return, 320px | R-013, R-024 |
| Homepage | D-010/D-012; F1/F4/F5 | Sitemap; Page inventory | module loading/empty/partial/error | headings, link purpose, motion-independent | R-001, R-017, R-019 |
| Shop/Department/PLP | D-015/D-017; F1–F4/F6 | Taxonomy; Search spec | loading, zero, invalid filter, unavailable | control-before-results, count status, mobile drawer | R-003, R-012, R-022, R-024 |
| Search/suggestions | F1/F6 | Search spec; Analytics | loading, grouped, zero, error | combobox/listbox keyboard; one status owner | R-013, R-022, R-024 |
| Product card | D-013; F2/F3 | Product model; Frontend contracts | add/select options, unavailable, image fallback | named wishlist/add; full factual text | R-002, R-012 |
| PDP | D-016/D-017; F2–F4 | Product model; Loading states | unselected, invalid, unavailable, partial facts, add error | labelled axes; atomic update notice; focus | R-002, R-012, R-024 |
| Recipe list/detail | D-015/D-016; F5 | Recipe model; Sitemap | empty/error; non-scalable; mapping failure | serving labels/status; recipe remains readable | R-004, R-021 |
| Recipe-to-cart | D-016/D-017; F5 | RTC rules; Frontend contracts | optional, pantry, substitute, unmapped, stale, atomic failure | summary links, row names, one recalculation notice | R-004, R-021, R-024 |
| Wishlist | D-003/D-004 | Commerce architecture | empty/stale/persistence error | removal focus/status | R-023, R-024 |
| Mini cart | D-004 | Cart spec; Loading states | empty/stale/error/open/closed | modal label, containment, Escape/return | R-006, R-024 |
| Cart | D-004/D-016 | Cart spec; Commerce | empty, price change, unavailable, conflict, fallback | error summary/line links; status; reflow cards | R-006, R-023, R-025 |
| Checkout | D-004 | Checkout spec; Frontend contracts | validation, stale cart, submitting, failure | labels/hints/errors/summary; busy state | R-006, R-025 |
| Confirmation | D-004 | Checkout; URL; Analytics | valid, expired/direct, failure | route focus; explicit simulation text | R-006, R-025 |
| Mobile drawers | D-015; F6 | Search; Sitemap; Loading states | staged/apply/cancel/error; branch expansion | containment/return, virtual keyboard, 44×44 | R-013, R-024 |
| 404/global errors | F6 | URL; Loading states | 404/410/offline/system/data | stable landmarks, retry names, focus/alert | R-024 |

## Coverage checks

- All 19 required screen/state blueprints appear in `Low_Fidelity_Wireframes.md`.
- Each blueprint includes intentional desktop/mobile structure, tasks/actions, states, focus/status behavior, responsive transformation, no-animation behavior through the global contract, and upstream traceability.
- Component requirements inherit the same decision, state and accessibility authorities; Phase 3 may not override Phase 2B commerce/data behavior.
