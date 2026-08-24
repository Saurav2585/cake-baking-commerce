# UX Architecture Readout

**Phase:** 2B — Catalog, Commerce and IA Architecture
**Status:** Review ready

## Outcome

The IA gives Pantryform a middle-depth, task-led structure: seven merchandise departments plus first-class Recipes, with brands secondary. The architecture inventories all required pages, overlays and failure states and defines six critical flows without prescribing layouts.

## Binding structure

- Customer depth: department → category → optional subcategory → product.
- Global paths: Shop, Recipes, Search, Wishlist, Cart and demo Checkout.
- Recipe-to-cart is a separate review state before cart mutation.
- Checkout/confirmation are explicitly simulated and non-indexable.
- Mobile navigation and filters preserve the same destinations and meaning as desktop.

## Accessibility built into architecture

Semantic landmarks/headings, keyboard operation, accessible names, focus containment/return, status announcements, labelled errors, 44×44 target goal, 320px reflow, reduced motion and animation-independent content are acceptance inputs—not later enhancements.

## Traceability

- D-015: eight departments, brands secondary.
- D-016: smallest-sufficient-pack recipe mapping with visible quantities and override.
- D-017: explicit unknown critical product information.
- D-004/D-012: demo commerce and retailer—not marketplace—boundaries.
- Phase 1 F1–F6: middle-depth navigation, family fields, consolidated variants, factual confidence, recipe mapping and mobile/accessibility constraints.

## Gate

This architecture contains no wireframes or visual UI. Phase 3 UX Definition remains blocked until Phase 2B receives external approval and authorization.
