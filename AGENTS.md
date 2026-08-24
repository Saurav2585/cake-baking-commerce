# Agent Operating Contract

## Sources of truth

1. Approved decisions in `docs/Decision_Log.md`.
2. Scope and outcomes in `production_artifacts/00_project/Project_Charter.md`.
3. Priorities and acceptance criteria in `production_artifacts/00_project/Backlog.md`.
4. Current phase and handoffs in `production_artifacts/00_project/Status.md`.
5. Specialist artifacts in numbered `production_artifacts/` folders.

If sources conflict, stop the affected work and ask the PM to resolve it in the Decision Log. Assumptions are not decisions.

## Roles and boundaries

- PM/orchestrator owns scope, sequencing, task packages, integration, gates, and status.
- UX Research owns evidence and user/competitor findings, not visual design.
- Brand Strategy owns positioning, voice, naming direction, and brand principles, not UI.
- UI/Product Design owns flows, information architecture, design system, and responsive specifications.
- Catalog/Commerce Architecture owns taxonomy, product/variant schema, merchandising rules, cart/checkout boundaries, and seed-data requirements.
- Visual Asset Generation owns generated imagery and the Asset Manifest; it must not invent claims, certifications, reviews, or testimonials.
- Motion/GSAP owns motion language, timelines, reduced-motion behavior, and performance budgets.
- Frontend Engineering owns implementation and technical documentation against approved artifacts.
- QA owns independent functional, responsive, accessibility, content, and regression verification.
- Release owns deployment readiness, release evidence, rollback notes, and checklist closure.

Specialists may propose changes outside their boundary but may not silently redefine approved upstream artifacts.

## Workflow rules

- Work phase-by-phase using bounded task packages with owner, inputs, outputs, exclusions, dependencies, and acceptance criteria.
- Record evidence, assumptions, decisions, risks, and unresolved questions in their designated artifacts.
- Human input is required only at explicit approval gates or when a material, irreversible choice is blocked.
- Do not start downstream work until required upstream acceptance criteria and gates are complete.
- Reference sites inform market and catalog understanding only; never copy branding, prose, imagery, layout, or distinctive UI.
- Use realistic India-focused demo data and INR; label simulations clearly. Never fabricate certifications, reviews, testimonials, or food/health claims.
- Generated assets must be traceable in the Asset Manifest before release.
- Preserve future commerce boundaries; v1 has simulated checkout and no real payment processing.

## Testing expectations

Engineering changes require proportionate automated checks: type/lint/build, component or unit coverage for business rules, and end-to-end coverage for critical journeys. QA must verify search, filters, sorting, variants, wishlist, cart, recipe-to-cart, checkout confirmation, responsive behavior, keyboard operation, focus, contrast, semantics, reduced motion, and error/empty states. Target WCAG 2.2 AA; document exceptions as release-blocking risks unless explicitly accepted.

## Definition of done

Work is done only when its acceptance criteria pass, evidence is linked, downstream artifacts are synchronized, assumptions and risks are updated, no prohibited claims or untracked assets remain, relevant tests pass, and the required human gate is recorded. “Implemented” alone is not done.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
