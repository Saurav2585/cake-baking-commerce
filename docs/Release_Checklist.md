# Release Checklist

All applicable items must be checked with linked evidence; exceptions require a logged decision and risk acceptance.

## Scope and integrity

- [ ] Approved v1 scope and critical journeys are complete.
- [ ] Demo status and simulated checkout are unambiguous.
- [ ] No fabricated certifications, reviews, testimonials, food/health claims, stock promises, or delivery promises.
- [ ] Reference-site content, branding, images, and distinctive UI have not been copied.
- [ ] Catalog count, category coverage, INR display, and pack variants match approval.

## Functional

- [ ] Search, filter combinations, sorting, and reset states pass.
- [ ] Product details and variant/price changes pass.
- [ ] Wishlist and cart add/update/remove/persistence states pass.
- [ ] Recipe-to-cart conversion and quantity/variant rules pass.
- [ ] Simulated checkout validation and confirmation pass.
- [ ] Empty, loading, invalid, unavailable, and recovery states pass.

## Quality

- [ ] Type check, lint, production build, unit/component tests, and critical E2E tests pass.
- [ ] Desktop, tablet, and mobile verification passes on agreed browser matrix.
- [ ] Keyboard, focus, semantics, labels, errors, contrast, zoom/reflow, target size, and screen-reader spot checks pass against WCAG 2.2 AA target.
- [ ] `prefers-reduced-motion` behavior passes; motion and performance budgets pass.
- [ ] No critical/serious accessibility or release-blocking functional defects remain.

## Content, assets, and data

- [ ] Product/recipe schemas validate and all required fields are populated.
- [ ] Demo prices and market observations have sources/dates or are explicitly labeled assumptions.
- [ ] Copy, units, allergens/ingredients presentation, and legal/demo disclosures are reviewed.
- [ ] Every generated asset is recorded in the Asset Manifest with provenance, prompt/tool metadata, date, owner, file, alt-text intent, usage, and rights notes.
- [ ] Image dimensions, responsive delivery, fallbacks, and alt text pass.

## Operations

- [ ] Environment configuration and secrets review pass; no secrets or personal data are committed.
- [ ] Deployment URL, metadata, icons, social preview, robots/indexing choice, and error monitoring are verified.
- [ ] Release notes, known limitations, rollback steps, and evidence links are complete.
- [ ] Final PM, QA, and human release approvals are recorded.
