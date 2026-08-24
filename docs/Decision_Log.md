# Decision Log

Confirmed decisions are authoritative. Proposals and assumptions do not become decisions until approved.

| ID | Date | Status | Decision | Rationale / source | Consequence |
|---|---|---|---|---|---|
| D-001 | 2026-08-24 | Confirmed | Build an India-focused cake-baking supplies portfolio/demo ecommerce site. | Project brief | Market, catalog, pricing and UX use Indian context. |
| D-002 | 2026-08-24 | Confirmed | Use Next.js, TypeScript, Tailwind CSS and GSAP. | Project brief | Engineering and motion plans must use this stack. |
| D-003 | 2026-08-24 | Confirmed | V1 includes 24–30 products, INR pricing, variants, discovery, wishlist/cart, recipes, recipe-to-cart and simulated checkout/confirmation. | Project brief | These are release-critical capabilities. |
| D-004 | 2026-08-24 | Confirmed | V1 has no real payment gateway but preserves future commerce boundaries. | Project brief | Checkout must be clearly simulated; integrations remain replaceable. |
| D-005 | 2026-08-24 | Confirmed | Target responsive desktop/tablet/mobile and WCAG 2.2 AA-oriented implementation. | Project brief | Accessibility and responsive evidence are release requirements. |
| D-006 | 2026-08-24 | Confirmed | Generated assets require an Asset Manifest; no fabricated certifications, reviews, testimonials or food claims. | Project brief | Content and asset audits are mandatory. |
| D-007 | 2026-08-24 | Confirmed | Reference sites may inform catalog/market research only; no branding, content, or UI copying. | Project brief | Research records patterns abstractly and cites observations. |
| D-008 | 2026-08-24 | Confirmed | Use a staged, artifact-driven multi-agent workflow with the PM as orchestrator and human gates only for material decisions. | Project brief | Downstream work waits on artifact acceptance. |
| D-009 | 2026-08-24 | Confirmed | After each approved phase, update status/review/decision records, validate, commit all legitimate phase artifacts using the prescribed message, push, and stop before the next gated phase. | Version control and review handoff instruction | Review-ready handoffs are durable and auditable. |
| P-001 | 2026-08-24 | Needs human approval | Prioritize home bakers/hobbyists, with micro-bakeries secondary. | Initial product assumption pending research | Shapes research sampling and UX priorities. |
| P-002 | 2026-08-24 | Needs human approval | Ship v1 UI in English only while keeping content structures localization-ready. | Scope-control assumption | Determines content and testing scope. |
| P-003 | 2026-08-24 | Needs human approval | Present the demo as a curated multi-brand retailer rather than a single-brand shop or marketplace. | Best fit for the broad supplied assortment, pending approval | Determines catalog identity, navigation, filters, product cards, and copy. |
| P-004 | 2026-08-24 | Needs human approval | Use original, realistic fictional product identities and demo prices rather than named real products. | Reduces stale-data, trademark, claim, and provenance risk while preserving realism | Determines research burden and catalog/content production rules. |

## Assumptions register

See the clearly labeled assumptions in the Project Charter. Assumptions must be validated, rejected, or promoted here through a dated decision.
