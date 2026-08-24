# Project Charter

## Purpose

Create a production-quality portfolio/demo ecommerce experience for Indian home bakers and small baking businesses buying cake-baking ingredients and supplies.

## Confirmed project decisions

- Market: India; display prices in INR.
- Demo catalog: approximately 24–30 realistic products spanning ingredients, chocolates, food colours, flavours, fillings, fondant, decorating materials, bakeware, tools, and packaging.
- Core capability: search, filters, sorting, wishlist, cart, pack-size/weight variants, recipe-to-cart, simulated checkout, and order confirmation.
- Technology: Next.js, TypeScript, Tailwind CSS, and GSAP.
- Quality: responsive desktop/tablet/mobile and WCAG 2.2 AA-oriented.
- Commerce boundary: no real payment gateway in v1; architecture remains future-ready.
- Content integrity: no fabricated certifications, reviews, testimonials, or food claims.
- Generated visuals require an Asset Manifest.
- Reference sites are research inputs only; their branding, content, and UI must not be copied.

## Outcomes

1. A credible, polished ecommerce demo with coherent end-to-end journeys.
2. A realistic India-focused catalog and merchandising model.
3. Accessible, responsive, performant behavior with documented verification.
4. Clear seams for future backend, identity, inventory, tax, fulfillment, and payment integrations.

## In scope for v1

- Browse and discovery, product detail, variants, wishlist, cart, recipes, recipe-to-cart, simulated checkout, confirmation, and appropriate empty/error states.
- Demo-only local or mock persistence as approved in technical design.
- Original brand, interface, copy, structured data, and traceable generated assets.

## Out of scope for v1

- Live payment, real orders, authentication, inventory synchronization, shipping-provider integration, tax invoicing, admin/CMS, customer reviews, and unsupported compliance claims.
- Copying reference-site identity, content, images, or UI.

## Success measures

- All critical journeys pass agreed functional and responsive QA.
- Accessibility audit has no known critical/serious defects and all exceptions are documented.
- Catalog meets approved category, variant, price, and data-quality coverage.
- Build, type, lint, and critical automated tests pass.
- Every generated production asset appears in the Asset Manifest with provenance and usage.

## Operating principles

Artifacts precede downstream execution; decisions are explicit; assumptions remain visible; specialists stay within role boundaries; human approvals are reserved for material direction; each handoff is accepted against evidence.

## Assumptions (not approved decisions)

- The primary audience likely includes Indian home bakers, hobbyists, and micro-bakery operators; research must validate priority segments.
- Guest-first shopping is likely sufficient for the demo.
- Prices can be realistic demo prices, clearly non-transactional and captured with observation dates/sources.
- Recipe-to-cart may add default pack variants and expose substitutions or quantity adjustments.
- English is the initial interface language; localization needs remain open.
- The storefront is likely a curated multi-brand retailer, not a marketplace or manufacturer-owned single-brand shop.
- Product identities and pricing are likely original, realistic demo data rather than representations of named real products.
- GST, delivery promises, serviceable PIN codes, stock state, and discount behavior will be simulated only if explicitly approved.
- The named playbook attachment was not readable from the Phase 0 workspace; this governance model derives from the supplied operating instructions and must be reconciled if the source becomes available.

## Constraints

- First release is a portfolio/demo, not a live merchant service.
- No production implementation begins before upstream research, product, design, and architecture gates.
- Claims and market observations need source/evidence records and observation dates.
