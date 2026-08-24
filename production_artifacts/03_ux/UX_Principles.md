# UX Principles

**Phase:** 3 — UX Definition
**Owner:** UI/Product Design
**Status:** Approved and binding at Phase 3 commit `1b0c5fa60a0b50290cad6bf5bb3ec5de3ee55d01`
**Prototype identity:** Pantryform — portfolio/demo direction only; formal legal clearance pending

## Purpose

These principles translate the approved positioning, Measured Joy territory and Phase 2B architecture into testable interaction rules. They guide structure, hierarchy and behaviour; they do not prescribe visual styling, final copy, motion treatment or implementation.

## 1. Make the next useful choice obvious

Each surface prioritises the decision that advances the task: choose a department, narrow a list, select a variant, review a recipe mapping or recover from a blocked state. Supporting inspiration must never obscure product identity, factual fields, price, demo availability or the next action.

**Acceptance signals**

- One primary task is apparent from the page heading and first content region.
- Product cards distinguish **Add** from **Select options**; an ambiguous variant is never chosen silently.
- Every dead end offers a relevant recovery path without silently changing user criteria.

## 2. Pair warmth with exactness

Measured Joy appears through a calm sequence from idea to measured choice: inspiration introduces a task, precise information supports selection, and feedback confirms progress. Sensory cues may frame content but cannot replace weights, dimensions, form, compatibility or factual labels.

**Acceptance signals**

- Task-led entry points and recipe moments sit beside exact assortment cues.
- Quantity, variant, unit-price and availability information remains scannable at every viewport.
- Final copy may be warm and encouraging, but cannot introduce unsupported product or retailer claims.

## 3. Reveal specialist depth progressively

Start with familiar departments and categories, then expose family-specific facets and details only where they help. Preserve the approved maximum browse depth: department → category → optional subcategory → product. Product family is not an extra mandatory navigation layer.

**Acceptance signals**

- Home and global navigation use the eight approved destinations.
- PLPs omit irrelevant facets rather than showing disabled specialist controls.
- Advanced detail remains available without making first-time shoppers decode trade terminology to proceed.

## 4. Preserve context and control

User choices must survive navigation and remain visible. Search query, committed filters, sort and page are URL-backed. Mobile filter edits are staged until Apply. No interface silently substitutes products, clears constraints, changes variants or adds optional recipe items.

**Acceptance signals**

- Back, refresh and shared URLs restore committed discovery state.
- Active filters appear as removable text-labelled chips.
- Cancelled mobile filter edits do not mutate results.
- Recipe mapping changes remain reviewable before cart mutation.

## 5. State facts, unknowns and simulation plainly

Factual content, editorial guidance and demo state must remain distinguishable. Missing critical ingredient, allergen or storage data is rendered exactly as **Information not provided**. Demo availability, prices and checkout cannot imply live inventory, payment, fulfilment or a real order.

**Acceptance signals**

- Unknown critical facts are neither omitted nor converted into positive filters.
- Demo disclosures appear at the point where transactional expectations arise.
- No review, rating, certification, popularity, dietary, quality or result claim appears without approved evidence.

## 6. Design every state, not only the ideal path

Loading, partial, empty, zero-result, unavailable, invalid URL and error states retain orientation and safe content whenever possible. Recovery actions are specific to the failure and never blame the user.

**Acceptance signals**

- Loading preserves region names and prevents duplicate actions.
- Partial failures isolate the failed region.
- Zero-results retains the query and filters and offers ordered recovery.
- Errors explain what happened, what was preserved and what can be tried next.

## 7. Build accessibility into the interaction contract

WCAG 2.2 AA-oriented behaviour is part of each control and state, not a later audit. Native semantics are preferred. Motion, hover and colour are never required to discover content, understand state or complete a task.

**Acceptance signals**

- A skip link, labelled landmarks, one descriptive H1 and logical headings orient every page.
- All actions work by keyboard; focus is visible, deliberate and restored after modal dismissal.
- Touch targets aim for 44×44 CSS px; content reflows at 320 CSS px and 400% zoom.
- Dynamic results and mutations announce once through appropriate status regions.
- Reduced motion removes nonessential transitions without changing content or sequence.

## 8. Keep retailer, product brand and editorial roles clear

Pantryform is the prototype retailer layer. Fictional product brands are secondary metadata, not sellers or peer storefronts. Recipes are retailer editorial content and may connect to products only through explicit mappings.

**Acceptance signals**

- Departments and tasks lead discovery; brand never displaces them in primary navigation.
- Product presentation follows brand + factual product + selected variant.
- Related content does not imply endorsement, exclusivity or seller choice.

## Responsive continuity

Desktop may reveal navigation and filters inline; mobile may use drawers and staged controls. The destination set, information priority, selected state and recovery actions remain equivalent. Tablet follows available space rather than assuming desktop behaviour. Responsive changes cannot remove critical product facts, active filters, count, sort, wishlist, cart or demo disclosure.

## Decision traceability

- D-010: home bakers primary; micro-bakeries secondary.
- D-012/D-013: curated retailer and original fictional demo merchandise.
- D-015: eight departments with brands secondary.
- D-016: transparent smallest-sufficient-pack recipe mapping.
- D-017: explicit unknown critical information.
- D-020/D-022: approved Measured Joy strategy and prototype-only Pantryform identity.
- Phase 2B specifications remain authoritative for taxonomy, search, variants, URLs and simulation.

## Deferred

Final customer-facing copy, visual system, imagery, motion choreography, catalog records and implementation are downstream decisions. These principles do not validate audience hypotheses or make commercial claims.
