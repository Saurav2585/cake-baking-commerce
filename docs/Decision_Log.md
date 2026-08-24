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
| D-010 | 2026-08-24 | Confirmed | Prioritize Indian home bakers/hobbyists; micro-bakeries, home-baking businesses and small operators are secondary. | External Phase 0 approval at commit `a2ef370` | Research and later journeys optimize for accessible entry while retaining professional decision fields. |
| D-011 | 2026-08-24 | Confirmed | Ship an English-only v1 with localization-ready content and technical structures. | External Phase 0 approval | Content scope is English; schemas must not prevent later localization. |
| D-012 | 2026-08-24 | Confirmed | Present a curated multi-brand retailer, not a marketplace or manufacturer-owned single-brand store. | External Phase 0 approval | No seller choice, seller navigation or marketplace fulfilment model belongs in v1. |
| D-013 | 2026-08-24 | Confirmed | Use original realistic fictional product and brand identities with clearly demo-oriented INR prices. | External Phase 0 approval | Fictional merchandise must be disclosed and cannot carry invented claims, availability or promises. |
| D-014 | 2026-08-24 | Confirmed | Phase 0 is externally approved and materially conforms to the reconciled 41-page playbook; no rework is required. | External review verdict | Phase 1 was authorized; the missing-playbook blocker is closed. |
| P-001 | 2026-08-24 | Superseded by D-010 | Prioritize home bakers/hobbyists, with micro-bakeries secondary. | Approved | No longer an open proposal. |
| P-002 | 2026-08-24 | Superseded by D-011 | Ship v1 UI in English only while keeping content structures localization-ready. | Approved | No longer an open proposal. |
| P-003 | 2026-08-24 | Superseded by D-012 | Present the demo as a curated multi-brand retailer rather than a single-brand shop or marketplace. | Approved | No longer an open proposal. |
| P-004 | 2026-08-24 | Superseded by D-013 | Use original, realistic fictional product identities and demo prices rather than named real products. | Approved | No longer an open proposal. |
| P-005 | 2026-08-24 | Phase 1 approval requested | Use eight customer-facing departments: Ingredients; Chocolate; Colours & Flavours; Fillings & Fondant; Decorating; Bakeware & Tools; Packaging; Recipes. | Phase 1 synthesis, E-001/E-009/E-012/E-030 | Establishes the IA input for Phase 2. |
| P-006 | 2026-08-24 | Phase 1 approval requested | Recipe-to-cart defaults to the smallest sufficient pack and shows required, purchased and leftover quantities with user override. | Phase 1 synthesis, E-020/E-026/E-029 | Establishes mapping behavior for later architecture/UX. |
| P-007 | 2026-08-24 | Phase 1 approval requested | Show “Information not provided” for absent critical ingredient, allergen and storage fields rather than silently omitting them. | Phase 1 synthesis, E-024/E-025 | Preserves claim integrity and makes data gaps explicit. |

## Assumptions register

See the clearly labeled assumptions in the Project Charter and Phase 1 hypotheses. Assumptions must be validated, rejected, or promoted here through a dated decision. D-010 through D-013 replace the corresponding initial assumptions.
