# Content Fit and Stress Test

**Phase:** 4A — Visual direction and design system
**Status:** Reconciled Phase 4A validation specification

## Method and pass definition

Run each case on the review prototype and later production UI with keyboard only and representative pointer input. A pass means content wraps/reflows without clipping, overlap, inaccessible truncation, hidden facts/actions, focus-order divergence, colour-only meaning, forced horizontal page scroll, or animation dependency. Genuine data tables may have a labelled internal scroll region; responsive commerce comparisons should become labelled cards before that is needed.

Test widths: **1440, 1280, 1024, 768, 430, 390, 360, and 320 CSS px**. Repeat critical routes at browser **200% zoom**, with increased text spacing, and with `prefers-reduced-motion: reduce`/animations disabled.

## Mandated content fixtures

Fixtures are stress strings/structures, not approved catalog claims.

| ID | Stress case / representative fixture | Surfaces | Pass criteria |
|---|---|---|---|
| CF-01 | Long product: “Professional Rectangular Adjustable Stainless-Steel Cake Levelling and Layering Guide” | Search suggestion, card, PDP, wishlist, cart | Full identity is available; card may line-wrap but not collide with price/action; no title-only tooltip dependency |
| CF-02 | Long variant: “Assorted geometric chocolate mould, 24 cavities, 29.5 × 17.5 × 2.2 cm” | Selector, purchase summary, cart | Label wraps; selected state and measurements remain associated; control target remains usable |
| CF-03 | Six pack sizes: 50 g, 100 g, 250 g, 500 g, 1 kg, 2.5 kg | PDP, recipe mapping | Selector reflows without tiny targets/horizontal page scroll; pack and price stay paired |
| CF-04 | Large INR: ₹1,24,999.00 and unit ₹12,499.90/kg | Card, PDP, cart/checkout totals | Indian grouping is intact; currency never overlaps quantity/actions; decimal support retained |
| CF-05 | Three unavailable variants among six, selected variant becomes unavailable | PDP, cart | Text/icon unavailable state; reason and recovery present; no colour-only/strikethrough-only meaning |
| CF-06 | Ingredients, Allergens, Storage each: **Information not provided** | PDP, recipe review | All required headings/fallbacks remain visible; no inferred “none” or collapse |
| CF-07 | Long filter: “Compatible with oil-soluble chocolate and compound coating applications” | PLP sidebar, chip, mobile drawer | Value/chip wraps; remove control keeps name and target; count/Apply remain reachable |
| CF-08 | Zero result: “No results for ‘oil-soluble midnight-blue food colour 500 ml’.” | Search, filtered PLP | Query wraps; Clear filters, departments, spelling guidance and Recipes remain reachable |
| CF-09 | Stale line: long product/variant plus old/current ₹ values and recipe source | Mini-cart, cart, checkout block | Warning precedes actions; both prices and effect are clear; issue-summary link focuses line |
| CF-10 | Recipe partial mapping: 12 ingredient rows—ready, pantry-owned, optional, substitute, unmapped, unavailable, stale—with multi-pack purchase | Recipe review/post-add | Every state stays visible; required/selected/purchased/leftover/price associations survive card transformation |
| CF-11 | Post-add summary: 8 added, 3 merged, 2 skipped, 2 unresolved | Recipe review/cart | Counts and recovery are readable and announced once; no toast-only facts |
| CF-12 | Long error and recovery: “Your demo cart changed while this page was open…” | Cart, checkout, dialogs | Error summary wraps, links focus targets, inputs/selections persist |

## Viewport and zoom protocol

### 320 CSS px

Verify header/menu/search, one-column cards, filter drawer, PDP variant/quantity/add, recipe mapping cards, cart lines, checkout disclosure/summary/action, error summary, footer, and all sticky regions. There must be no horizontal page scroll at 320px; sticky content must clear browser chrome/safe areas and never obscure focused controls. Long identity, pack, INR, warnings, and **Information not provided** may not be truncated.

### 200% zoom and text spacing

At a desktop viewport, zoom to 200% and execute search→PDP→cart→demo checkout plus recipe-to-cart. Apply WCAG text-spacing overrides (1.5 line height; paragraph spacing 2× font size; letter spacing 0.12×; word spacing 0.16×). Pass if content, labels, focus rings, drawers, dialogs, sticky actions and status messages remain available without overlap or lost function. Avoid fixed-height text containers.

### Reduced-motion/no-animation

Enable OS/browser reduced motion and separately block animation/GSAP. Drawers/dialogs appear immediately; filter/result updates, variant changes, recipe recalculation, cart mutation, route focus, loading completion, and checkout confirmation retain the same final state and announcement. Skeleton shimmer, parallax, scroll reveal, auto-rotation, smooth scrolling, and decorative transitions are removed. No content starts hidden awaiting animation.

## Colour and image stress

- Check every text/icon/control-boundary pair against `Colour_System.md`, including action hover, error, warning, unavailable, selected, disabled, and focus on canvas/raised/turmeric surfaces.
- Test grayscale and common colour-vision simulations: state remains identifiable through words, icon/shape, border, or control semantics.
- Disable images and trigger image failures: product identity, variant, facts, price, availability and actions remain complete; fallback does not create an untracked claim.
- Test a portrait pack, long tool, texture crop, and multi-variant image at all card/gallery aspect ratios. No crop may falsify pack count, dimensions, or included contents.

## Interaction and content-integrity checks

| Check | Expected result |
|---|---|
| Keyboard focus | Visible, logical, not clipped/obscured; modal focus contained and returned |
| Screen-reader status | One owner per search/variant/recipe/cart/checkout event; no duplicate toast/live-region speech |
| Touch targets | 44×44 CSS px goal; exceptions meet spacing/semantic requirements and are logged |
| Demo boundary | “Demo” qualifiers remain adjacent; no payment/PII inputs, real delivery promise, receipt/invoice, `purchase` event, or real-order language |
| Unsupported claims | No reviews, ratings, bestseller/popularity, scarcity, certification, dietary/health, heritage, expertise, sustainability, delivery, trust, quality, or performance claim without approved source |
| Phase 3 fidelity | Hierarchy, states, focus ownership, smallest-sufficient-pack review, and safe checkout behavior are unchanged |

## Evidence record template

For each prototype route record date/build, browser/OS, viewport and DPR, zoom/text-spacing/motion settings, fixture IDs, keyboard path, screenshots, console/overflow findings, contrast tool/output, pass/fail, defect owner, and retest link. Screenshot filenames should be deterministic, for example `pdp-mobile-320-cf01.png` and `recipe-review-desktop-200zoom-cf10.png`.

## Exit criteria

All CF-01–CF-12 cases pass at their surfaces; critical journeys pass at every required width; 320px, 200% zoom, increased text spacing, reduced/no motion, image failure, keyboard focus, live-region ownership and semantic non-colour states have evidence; remaining failures are explicit blocking risks rather than silently accepted design exceptions.
