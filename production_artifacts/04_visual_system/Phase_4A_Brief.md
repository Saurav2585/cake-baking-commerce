# Phase 4A Brief

## Objective

Translate approved brand, architecture and UX into one accessible, implementation-ready visual direction and an isolated static review prototype before production engineering.

## Approved inputs

- Phase 1 research and D-010–D-017.
- Phase 2A brand strategy: Measured Joy leads; Working Pantry provides functional clarity; Ingredient Theatre is a controlled supporting image language.
- Pantryform and “Baking Ingredients & Supplies” are portfolio/demo directions only under D-022.
- Phase 2B architecture approved at `475b603157b27b735357e132720796f0e6077db1`.
- Phase 3 UX approved at `1b0c5fa60a0b50290cad6bf5bb3ec5de3ee55d01`.

## Scope

- Final recommended visual direction and semantic design tokens.
- Colour/contrast, typography, grid, responsive density, icon/illustration and product-imagery direction.
- Visual component/state and high-fidelity screen specifications.
- Content-fit stress tests, future motion opportunities and traceability.
- Static review prototype with representative high-fidelity desktop/mobile compositions and screenshot pack.

## Constraints

- Preserve Phase 3 hierarchy, interaction meaning, focus/status ownership and responsive transformations.
- Target WCAG 2.2 AA; colour never carries meaning alone and content remains complete without motion.
- Product facts dominate decorative imagery. Unknown critical facts stay “Information not provided”.
- Fictional products, INR prices and demo availability must be visibly disclosed.
- No unsupported ratings, reviews, popularity, quality, certification, dietary, health, delivery, trust or performance claims.
- Generated production assets would require Asset Manifest entries; none are generated in this phase.

## Exclusions

No production ecommerce application, Next.js implementation, production motion, live catalog, authentication, database, payment, fulfilment, analytics integration or commercial name clearance. The static prototype cannot transact or persist.

## Acceptance criteria

- Fourteen required design artifacts exist, are internally consistent and trace upstream requirements.
- The system covers every required component/state and all required high-fidelity screens on desktop/mobile.
- Palette pairings have verifiable contrast evidence; type and grid support the mandated viewport and stress set.
- Prototype runs with the documented command, has obvious navigation and visible demo boundaries.
- Screenshot pack includes the eleven required deterministic desktop/mobile captures and manifest.
- Browser validation finds no blocking console errors or horizontal overflow at the eight viewport widths; keyboard focus is visible; deterministic 200% text and no-animation modes preserve content and task completion.
- No approved UX behavior changes and no prohibited downstream work or claims are introduced.

## Dependencies downstream

Phase 4B may define production motion only after approval. Phase 5 catalog/assets and Phase 6 application engineering must consume approved tokens/specifications, validate fonts/assets/licences, preserve traceability and re-run accessibility evidence in production.
