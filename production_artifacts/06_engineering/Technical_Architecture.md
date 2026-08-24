# Technical Architecture

**Phase:** 6 — Production Application Engineering  
**Status:** Implemented and independently verified; see `production_artifacts/09_qa/Phase_6_Verification_Report.md`  
**Authority:** D-002 through D-006, D-011 through D-013, D-015 through D-017, approved Phase 2B contracts, Phase 3 UX, Phase 4A visual system, Phase 4B motion system and canonical Phase 5B records

## Architecture decision

Pantryform will be a dependency-light Next.js App Router application using TypeScript strict mode, Tailwind CSS and GSAP. It is a static, local-data portfolio/demo storefront: no database, authentication, CMS, payment SDK, external tracker or server-owned order system is required. Server Components compose catalog and content by default; Client Components are limited to stateful discovery, variant selection, drawers, cart/wishlist, recipe review, checkout simulation and motion.

The production application lives at the repository root unless the implementation records a corrective decision before scaffolding. Framework versions are locked in the package lockfile and reported after installation; this document deliberately does not invent versions before dependencies exist.

## Layer boundaries

```text
Canonical Phase 5B JSON + asset manifest (immutable authored truth)
                         |
              deterministic validate/generate
                         v
Generated typed catalog projection (replaceable build derivative)
                         |
       domain modules and provider-neutral interfaces
       /              |               |             \
 discovery       recipe solver    cart/wishlist   demo checkout
       \              |               |             /
          route composition + accessible UI components
                         |
             local persistence / local analytics
```

| Layer | Responsibility | Must not do |
|---|---|---|
| `production_artifacts/05_catalog_production/` | Own canonical products, SKUs, content, recipes, mappings and asset relationships. | Depend on application code or accept UI-authored corrections. |
| `scripts/` | Validate source data and generate a deterministic typed derivative. | Maintain a second hand-edited catalog. |
| `src/data/` | Load generated records and expose indexed, read-only projections. | Invent fields, facts, prices, availability or media. |
| `src/domain/` | Own currency arithmetic, catalog joins, search/filter/sort, recipe pack selection, cart reconciliation and checkout simulation. | Import React, browser globals or GSAP. |
| `src/providers/` | Implement local catalog/content, persistence, checkout and analytics interfaces. | Leak storage/vendor shapes into domain or UI. |
| `src/components/` | Reusable semantic primitives and Pantryform compositions. | Duplicate canonical records or make animation own state. |
| `src/app/` | App Router layouts, metadata, route loading/error/not-found states and page composition. | Contain substantial domain calculations. |
| `src/motion/` | GSAP orchestration, motion tokens, cleanup and reduced-motion behavior. | Gate content, focus, navigation or mutation success. |
| `tests/` | Unit, integration and browser proof against public behavior. | Replace canonical validation or manual accessibility/visual review. |

Actual paths may use an equivalent grouping during scaffolding, but these dependency directions are binding.

## Rendering and routing

- Use App Router route segments and route-specific metadata. Catalog, department, PDP, recipe and utility content are statically renderable from local canonical data.
- URL search parameters own shareable query, department/filter and sort state. Interactive controls progressively enhance ordinary links/forms and preserve an accessible empty state.
- Stateful commerce is hydrated client-side from a validated local envelope; server output must remain structurally stable before hydration.
- Use `next/image` for raster assets with explicit dimensions and responsive `sizes`. Resolve sources only through manifest-backed projections; decorative imagery has empty alt text and factual/product imagery uses approved alt intent.
- Provide semantic `loading`, `error` and `not-found` behavior without removing the main heading or recovery navigation.
- Required inventory follows the Phase 3 sitemap, including home, shop, departments, search, PDP, recipes, recipe detail/review, wishlist, cart, simulated checkout/confirmation, information/utility routes and accessible 404.

## Domain invariants

- Money is an integer number of INR paise. Addition and multiplication remain integer operations; formatting occurs only at the presentation edge with `en-IN`/`INR`.
- Parent identity/content and SKU commerce fields remain separate. A variant switch atomically updates SKU, axes/pack, integer price, demo availability, variant-owned media and applicable facts.
- Critical fact states are `known`, `information_not_provided` or `not_applicable`; unknown critical facts render exactly **Information not provided**.
- Recipe-to-cart implements the approved exhaustive finite search and lexicographic tie-break rules. Optional, pantry-check and unresolved lines are never silently selected.
- Cart lines are keyed by SKU/variant-safe identity and merge only the same SKU. Checkout operates only on reconciled valid lines.
- The checkout provider returns a session-local simulated confirmation. It collects no identity, address or payment data and can never submit a real order.

## Browser state and persistence

Use two namespaced, versioned local-storage envelopes, for example `pantryform:cart:v1` and `pantryform:wishlist:v1`. Confirmation and checkout draft state are session-only. Every envelope has a literal schema version, timestamp and bounded payload.

Load is fail-closed: parse inside a guarded adapter; reject unknown versions, unexpected shapes, duplicate/unknown SKUs, non-integer or out-of-range quantities, invalid prices and oversized collections; then reconcile accepted IDs with the current canonical revision. Corrupt/stale state produces a recoverable notice and clean state, never an exception loop. Browser storage failure falls back to disclosed in-memory session state. No personal data enters browser persistence.

Mutations are pure reducer/domain operations with revision checks. Persistence runs after a successful mutation and emits accessible status independently of animation. Cross-tab storage events may trigger reconciliation but may not silently overwrite a newer in-memory revision.

## Motion and accessibility architecture

- Content, DOM order, controls, mutation results and focus targets exist independently of GSAP.
- Central motion utilities read `prefers-reduced-motion`, create scoped GSAP contexts, clean up on unmount/navigation and use transform/opacity where possible.
- Reduced motion removes non-essential travel/stagger and provides immediate equivalent states; no scroll hijacking.
- Shared primitives enforce skip link, landmarks, visible focus, labelled controls, live announcements, minimum target sizing, dialog/drawer focus containment and deterministic invoker restoration.
- Automated accessibility checks supplement keyboard, screen-reader-oriented semantic, zoom/text, contrast and responsive manual review; they do not establish conformance alone.

## Analytics and future seams

A local provider-independent adapter accepts only allow-listed semantic events and defaults to an in-memory/dev console sink. It transmits nothing. Event payloads exclude personal/free text and use `simulated_purchase_complete`, never `purchase`.

`CatalogProvider`, `ContentProvider`, `CartPersistence`, `CheckoutProvider` and `AnalyticsAdapter` boundaries allow a later approved service without changing domain meaning. Authentication, database, CMS, live inventory, payment and real order submission remain absent; a future live implementation requires new contracts and an approval decision.

## Quality gates

The Phase 6 handoff requires canonical validation, generated-data drift check, formatting, lint, strict type check, domain/unit tests, critical component/integration tests, end-to-end journeys, production build, browser console/network review, responsive evidence, keyboard/accessibility review and reduced-motion verification. A generated file that differs after regeneration, a broken join/asset, or a stale hardcoded catalog signature fails the gate.

## Assumptions (not confirmed decisions)

- A single root Next.js application is sufficient; no monorepo provides value for this bounded demo.
- Static local data is small enough for build-time indexing and exhaustive recipe combination search.
- `localStorage` is used for cart/wishlist and `sessionStorage` for confirmation, behind adapters; exact keys are implementation details.
- A lightweight runtime schema validator may be selected if it materially improves fail-closed parsing; otherwise explicit TypeScript-independent guards are required. Dependency selection is an engineering choice, not an approved product change.
- Hosting configuration is prepared only to the extent needed for a deployment-ready build; public deployment remains Phase 6 out of scope.

