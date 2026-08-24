# Approved Implementation Brief

**Phase:** 6 — Production Application Engineering  
**Status:** Engineering input; preserves approved Phase 3, 4A and 4B conclusions  
**Companion:** `Route_and_Feature_Inventory.md`

## Authority and boundary

Build the production Next.js, TypeScript, Tailwind CSS and GSAP application from the approved canonical commerce data and manifested Phase 5 assets. Phase 3 owns behavior and information hierarchy; Phase 4A owns visual direction; Phase 4B owns motion. Review prototypes are composition and interaction evidence, not reusable production data or business logic. If a prototype conflicts with canonical data or approved UX, the canonical artifact wins.

V1 is an `en-IN`, INR portfolio simulation. It has no payment gateway, authentication, live inventory, fulfilment, reviews, testimonials, certifications or unsupported food/performance claims. Pantryform remains a prototype name pending formal legal clearance. Preserve provider-neutral boundaries and do not silently change taxonomy, mapping, pack selection, pricing, availability or tri-state facts.

## Experience outcome

The application must feel recognizably about raw ingredient → measurement → method → finished bake, while retaining Working Pantry precision. It must not collapse into generic Shopify section stacking, repetitive card grids, rounded SaaS panels or decorative effects unrelated to baking. Commerce facts and actions remain primary.

Implement the approved visual signatures:

1. **Measured ingredient opening:** an art-directed ingredient field resolves around a measurement axis; full copy and actions are present before enhancement.
2. **Irregular department atlas:** numbered 01–08 baking-supply organization in canonical DOM order, reflowed—not spatially reordered—on mobile.
3. **Controlled Ingredient Theatre:** raw texture, stable product pack and factual annotation coexist; facts never move or hide.
4. **Recipe-to-supplies transformation:** required → selected pack → purchased → leftover remains explicit before cart mutation.
5. **Variant-owned PDP pack study:** selected variant, SKU, media, demo price, unit price, availability and add eligibility change atomically.

The generic-template test is binding: without the Pantryform name, palette and images, structure and interaction must still communicate ingredients, measurement and making.

## Visual system contract

- Page canvas `#FFF8ED`; raised surface `#FFFFFF`; subtle surface `#F2ECE4`; primary ink `#2B1B2B`; secondary ink `#5B5860`.
- Primary action/link coral is `#C54731`; hover/pressed and error ink `#9B3027`. `#C84832` is decorative only and cannot carry normal text.
- Focus core `#175CD3`; success `#376348`; warning surface `#F6DCA5` with `#815100` or primary ink. `#D8D0C8` is decorative only; necessary control boundaries use `#767076`.
- Components consume semantic CSS custom properties/Tailwind aliases, never raw primitives. Light theme only in v1.
- Display/editorial family: Fraunces with Georgia/Times fallback. UI/facts: Inter with Arial/Helvetica fallback. Verify licensing, provenance, self-hosting and fallback metrics before shipping.
- Display sizes: XL 2.5rem mobile/4.5rem desktop; LG 2rem/3.5rem. H1 2rem/3rem; H2 1.625rem/2.25rem. Body remains 1rem/1.55; essential qualifiers never below 0.875rem.
- Use tabular numerals for prices, quantities, recipe mappings and totals. Format INR with Indian grouping; keep values with units and use `×` for dimensions/counts.
- Spacing uses the approved 4px scale; default control target is 44px and primary/mobile controls 52px. Radius is restrained (4/8/12/20px); pills are limited to chips/statuses.
- Links in body copy retain a non-colour affordance. Text never sits directly on variable image pixels without an opaque, contrast-tested surface.
- Product cards use factual hierarchy: imagery, fictional product brand, title, chosen/default pack, demo price/unit basis, availability and appropriate add/select-options action. Avoid claim-like badges.
- Manifested responsive assets, variant-owned media and image fallbacks are required; reserve intrinsic aspect ratio and never silently substitute a desktop crop for approved mobile art direction.

## Responsive composition

Validate at 320, 360, 390, 430, 768, 1024, 1280 and 1440 CSS px, plus landscape phone, 200%/400% zoom, text-spacing overrides and on-screen keyboard.

- 1440/1280: full header, bounded asymmetric/editorial grids and commerce columns.
- 1024: compact columns/gaps without smaller facts or targets.
- 768 and below: labelled modal navigation drawer; stack main/aside in DOM order; filters become a staged drawer.
- 430–320: predominantly one-column task flow. Two-column products are allowed only when full names, price, variant facts and targets fit.
- Product grids use minimum viable card width, not a fixed count. PLP sidebar becomes Apply/Cancel/Clear mobile filtering. Recipe mapping rows become labelled cards. Cart and checkout become logical single-column flows.
- Sticky controls are enhancements with an in-flow equivalent and may not obscure focus, content, errors, safe areas or the software keyboard.
- No horizontal overflow at the 320px floor; genuine data tables are the only permitted two-dimensional exception.

## Interaction and state contract

- Global access to Home, Shop, Recipes, Search, Wishlist and Cart. Shop is a click/tap/keyboard disclosure, never hover-only. Mobile drawer is named, focus-contained, Escape-dismissible, background-inert and returns focus.
- Search suggestions start after two normalized characters; group Products, Categories, Brands and Recipes; max five/group and ten total. Use combobox/listbox active-descendant semantics. Enter submits; Escape closes; Tab exits; blank submit reaches Shop.
- Filters/sort/query are URL-owned. Mobile filter edits are staged: Apply commits, Cancel preserves applied state, Clear is explicit. Browser Back restores URL state and list position where feasible.
- PDP requires an explicit valid variant. A variant commit updates control state, media, SKU, pack/dimensions, demo price, unit price, availability and add eligibility as one resolved unit. Never auto-substitute an unavailable SKU.
- Wishlist/cart are local demo persistence with stable product+SKU identity. Quantity is directly editable with limits; mutation failures restore or preserve safe state and provide recovery.
- Recipe-to-cart always opens review before mutation. Show requirement, selected pack, purchased quantity, leftover, price and include/pantry-owned/override state for each line. Preserve unmapped and unavailable lines visibly. Add selected items atomically/idempotently and report added, merged and skipped groups.
- Checkout uses fixed fictional demo profiles only; request no card, UPI, real address, phone or personal data. Require explicit simulation acknowledgement. Confirmation states no payment and no real order, and supports expired/direct visits.
- Every relevant route/component implements loading, empty/zero, partial/unknown, unavailable/stale, error and media-failure behavior. Missing ingredients, allergens or storage must display **Information not provided**; never infer absence.

## Accessibility contract

- Target WCAG 2.2 AA. First focus is a skip link to `main`; use named header/nav/main/footer landmarks, one descriptive H1, ordered headings, semantic breadcrumbs and unique titles.
- Route changes move focus to a page-start target/H1 and announce the title once. Controls retain visible names; links navigate and buttons mutate/disclose.
- Visible focus uses a 2px surface gap plus a 2px `#175CD3` core and is not obscured by sticky UI. Forced-colours mode uses system outlines/borders.
- One polite global commerce status owns nonblocking mutations; blocking submission errors use a linked error summary and focus. Do not duplicate announcements in toast/component/page regions.
- Status, availability, selection and errors use text plus programmatic/icon/border cues; never colour or motion alone.
- Image alt text identifies informative products; repeated/decorative imagery uses empty alt. Image failure preserves identity, facts and actions.
- Keyboard-only operation, focus order/return, 44×44 target intent, 320px reflow, zoom, text spacing, forced colours, screen-reader status ownership and reduced motion are release evidence—not assumptions.

## Motion and GSAP contract

Domain state, focus, announcements and final layouts exist independently of GSAP. Server HTML/CSS renders complete final states. Timelines are scoped, killable, reversal-safe and latest-state-wins; input, route change, resize, visibility loss or preference change resolves immediately to the correct final state.

- Durations: feedback 120ms, micro 160ms, local/atomic swap 220ms, overlay open 260ms (close 180ms), section 420ms, signature base 720ms, hard signature ceiling 900ms.
- Eases: standard `cubic-bezier(0.2,0,0,1)`, enter `cubic-bezier(0.16,1,0.3,1)`, exit `cubic-bezier(0.4,0,1,1)`, emphasis `cubic-bezier(0.22,1,0.36,1)`. Bounce/back/elastic are prohibited in commerce and critical paths.
- Maximum travel: 2px feedback, 6px local, 12px editorial, 20px signature; mobile halves/removes non-overlay travel. No document parallax, scroll hijack or pinned commerce task.
- Never stagger cards, recipe rows, errors, focusable controls or live status. Maximum animated elements: six desktop, three mobile. Motion-created CLS must be 0.000; animation-attributable tasks over 50ms are release-blocking.
- Homepage opening ≤820ms desktop/≤600ms mobile; department atlas entrance 420ms plus ≤105ms paired alignment; recipe entrance ≤720ms and recalculation 220ms; PDP atomic swap 220ms/≤260ms total.
- `prefers-reduced-motion` renders immediate complete final states with no travel, scale, parallax, reveal or scroll timeline. A none/test mode is zero animation. Constrained mode removes signatures, blur, springs, scroll links and stagger.
- LCP content is never opacity-zero or delayed for fonts/GSAP. Shared motion glue target is ≤12KiB gzip excluding a justified tree-shaken library. Use no autoplay video or frame sequences.

## Implementation order and acceptance

1. Establish typed canonical data adapters, semantic tokens, fonts/fallbacks, manifested asset resolution and accessible application shell.
2. Implement domain stores/services and deterministic commerce rules independently of presentation.
3. Build routes and complete state families from the companion inventory.
4. Apply approved responsive/visual compositions and five signature static structures.
5. Add GSAP progressively, then full/reduced/none/constrained verification.
6. Run type, lint, test and production build; unit-test pack/mapping/cart rules; component-test selection/status/error behavior; end-to-end test critical journeys.

Done requires canonical data joins and prices/brands/variants to remain exact; all required routes and states to work at approved widths; search/filter/sort, wishlist, cart, recipe-to-cart and simulated checkout to function; no broken assets/requests, overflow, unsupported claims or console errors; and accessibility, reduced-motion and performance evidence to pass. Do not start real payments, auth, fulfilment or Phase 7 release work through this brief.
