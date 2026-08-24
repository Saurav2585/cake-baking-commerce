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
| D-015 | 2026-08-24 | Confirmed | Use eight customer-facing departments: Ingredients; Chocolate; Colours & Flavours; Fillings & Fondant; Decorating; Bakeware & Tools; Packaging; Recipes. Brands remain a secondary path/filter. | External Phase 1 approval at commit `510afb0`; P-005 | Establishes the navigation input for architecture while preserving the retailer-led model. |
| D-016 | 2026-08-24 | Confirmed | Recipe-to-cart defaults to the smallest sufficient pack, never lowest-unit-price by default, and shows required, selected pack, purchased and leftover quantities with override plus substitution/unavailable handling. | External Phase 1 approval at commit `510afb0`; P-006 | Later architecture and UX must provide a transparent review step and user control. |
| D-017 | 2026-08-24 | Confirmed | Missing critical ingredient, allergen or storage data is shown as “Information not provided” and is never inferred. | External Phase 1 approval at commit `510afb0`; P-007 | Catalog, content and UI need explicit unknown states. |
| D-018 | 2026-08-24 | Confirmed | Split Phase 2 into 2A Retail Brand Strategy and 2B Catalog/Commerce/IA Architecture; only Phase 2A is authorized after Phase 1 approval. | External Phase 1 verdict | Phase 2B remains gated after this brand-strategy handoff. |
| D-019 | 2026-08-24 | Confirmed | Phase 1 UX and Competitor Research is externally approved with no rework at commit `510afb0b5274821704c534bd44a514e5c7409497`. | External review verdict | Phase 1 is closed and its approved inputs are binding downstream. |
| D-020 | 2026-08-24 | Confirmed | Approve the non-naming Phase 2A strategy, including Measured Joy as lead territory, Working Pantry as functional counterweight, Ingredient Theatre as supporting image language, and the retailer-led architecture. | External Phase 2A review at commit `b9d6f0c` | These strategic inputs need no rework; design remains gated. |
| D-021 | 2026-08-24 | Confirmed | Reject the original shortlist—Whisklane, Crumbloom, Batterfolk, Ovenora and Pantryrise—because preliminary screening found material collision risk; do not advance close variants. | External Phase 2A review | Naming alone requires targeted rework; no retailer name is confirmed. |
| D-022 | 2026-08-24 | Confirmed prototype | Use Pantryform with descriptor “Baking Ingredients & Supplies” for portfolio/demo architecture, UX and design artifacts. It is not legally cleared, trademarked or commercially available. | External Phase 2A approval at commit `504321e` | Downstream artifacts may use Pantryform only with the prototype/legal-clearance boundary intact. |
| D-023 | 2026-08-24 | Confirmed | Phase 2A strategy and naming rework are externally approved; authorize Phase 2B Catalog, Commerce and IA Architecture only. | External review verdict | Architecture may proceed; wireframes, visual UI, generated assets, motion implementation and code remain blocked. |
| D-024 | 2026-08-24 | Confirmed | Phase 2B Catalog, Commerce and IA Architecture is externally approved at commit `475b603157b27b735357e132720796f0e6077db1` and is the binding source of truth for Phase 3. | External Phase 2B review verdict | Phase 3 UX definition and low-fidelity wireframes were authorized; visual design, assets, motion, catalog production and code remained gated. |
| P-001 | 2026-08-24 | Superseded by D-010 | Prioritize home bakers/hobbyists, with micro-bakeries secondary. | Approved | No longer an open proposal. |
| P-002 | 2026-08-24 | Superseded by D-011 | Ship v1 UI in English only while keeping content structures localization-ready. | Approved | No longer an open proposal. |
| P-003 | 2026-08-24 | Superseded by D-012 | Present the demo as a curated multi-brand retailer rather than a single-brand shop or marketplace. | Approved | No longer an open proposal. |
| P-004 | 2026-08-24 | Superseded by D-013 | Use original, realistic fictional product identities and demo prices rather than named real products. | Approved | No longer an open proposal. |
| P-005 | 2026-08-24 | Superseded by D-015 | Use eight customer-facing departments with brands secondary. | Approved | No longer an open proposal. |
| P-006 | 2026-08-24 | Superseded by D-016 | Default recipe mapping to the smallest sufficient pack with full quantity visibility and override. | Approved | No longer an open proposal. |
| P-007 | 2026-08-24 | Superseded by D-017 | Show “Information not provided” for missing critical ingredient, allergen and storage fields. | Approved | No longer an open proposal. |
| P-008 | 2026-08-24 | Superseded by D-022 | Advance Pantryform as prototype direction from the screened shortlist. | Approved for portfolio/demo use only | Formal professional legal/company/domain/handle/linguistic clearance remains mandatory for commercial use. |

## Assumptions register

See the clearly labeled assumptions in the Project Charter and Phase 1 hypotheses. Assumptions must be validated, rejected, or promoted here through a dated decision. D-010 through D-013 replace the corresponding initial assumptions.

Pantryform is confirmed only as a portfolio/demo prototype direction under D-022. Formal professional clearance remains mandatory before any commercial use.
