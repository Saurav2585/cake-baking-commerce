# Recovery R2 — Proposed Homepage Merchandising Structure

**Status:** Proposal only — not implemented in R1. This is a structural outline to guide R2, informed by the Gap Audit (`design_review/recovery_r1/gap_audit/Gap_Audit.md`) and the real catalog proposal (`design_review/recovery_r1/catalog/Real_Catalog_Proposal.md`).

## Principle

Commerce clarity and product credibility dominate; editorial creativity is selective, not removed. The two signature moments the gap audit flagged as worth keeping — the department atlas and the recipe-to-supplies transformation rail — stay, repositioned around a denser, more conventional commerce spine.

## Proposed section order (top to bottom)

1. **Header** — logo lockup (selected from the R1 logo review board) + search bar (kept prominent, already a strength) + mega-menu navigation surfacing departments and subcategories directly on hover/tap, not hidden behind a generic "Menu" drawer on desktop. Cart/wishlist counts retained as-is.

2. **Real product-led hero or campaign banner** — replaces the current single editorial photo hero with a rotating/static banner built from actual product photography (e.g. a chocolate-and-cocoa or festive-baking campaign), carrying one clear CTA ("Shop the edit" / "Shop chocolate"). Editorial headline copy can stay, but the visual must be a real packshot composition, not illustration, per the gap audit's top finding.

3. **Trust/support strip** — a thin horizontal band directly under the hero: fictional-but-plausible delivery/dispatch promise, quality/sourcing note, and a support contact — mirrors both reference sites' free-shipping/trust strips, addresses the "Trust and delivery information" gap.

4. **Shop by category** — the existing department atlas, kept largely as-is (it already passes the project's own generic-template test) but each tile should show a real product thumbnail rather than a flat department illustration, and department count badges ("48 products across 7 departments") to signal depth.

5. **Popular brands** — a new row of brand chips/logos (Callebaut, Morde, Van Houten, etc. — the real brands from the R1 catalog), each linking to a brand-filtered PLP view. Directly addresses "Recognizable brands," currently the weakest area.

6. **Bestsellers** — a merchandised product rail (6–8 cards) using the existing `ProductCard` component plus a new badge slot ("Bestseller"). Clearly labelled as demo-curated, not real sales data.

7. **New arrivals** — a second rail using the same card, badge set to "New." Can reuse a subset of the 48-product catalog flagged as "recently added" in the demo data.

8. **Offers** — a rail or small grid of 3–4 products with a demo compare-at price and "% off" badge, explicitly disclosed as a simulated fixture (consistent with the existing "fictional demo pricing" language already used site-wide).

9. **Baking essentials** — a focused rail for the flour/sugar/leavening department, since this is the highest-frequency repeat-purchase category on both reference sites and deserves its own homepage real estate distinct from the general department grid.

10. **Tools and bakeware** — a second focused rail, giving the tools/bakeware/packaging departments (currently underrepresented) explicit homepage visibility.

11. **Recipe inspiration** — the existing recipe-to-supplies transformation rail, kept as the project's clearest differentiator; can be repositioned lower on the page now that commerce sections lead, but should not be cut.

12. **Newsletter / footer** — a new footer (currently absent) with: information links (already exist: FAQ, shipping, privacy, terms, contact), a simple demo newsletter signup (client-side only, no real email capture — or omitted if that reads as misleading), delivery/policy summary, and the persistent portfolio-demo disclosure, unchanged.

## What stays exactly as-is

- The demo-strip portfolio disclosure banner at the very top of every page.
- Header search prominence.
- The department atlas concept (visual refresh only, not restructuring).
- The recipe-to-cart transformation storytelling.
- The PDP critical-facts table and tri-state "Information not provided" pattern.
- Simulated-checkout messaging throughout.

## What changes

- Hero: illustration → real product photography.
- Product cards: add badge slot (New/Bestseller/%Off) and optional compare-at price.
- Navigation: flat 3-link nav + drawer → mega-menu with categories surfaced directly.
- Homepage section count: 4 sections today → roughly 10–12 sections above, closer to reference-site density.
- New footer with trust/delivery content.
- New "Popular brands" module — did not exist before.

## Explicitly out of scope for this outline

Full homepage implementation, final copy, exact rail product selections, and the actual PLP/PDP rebuild are R2+ work. This document is a structure to review and approve, not a build.
