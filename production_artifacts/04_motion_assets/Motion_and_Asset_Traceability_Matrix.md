# Motion and Asset Traceability Matrix

**Phase:** 4B — Motion System and Asset Production Blueprint
**Status:** Reconciled Phase 4B traceability control

## Source key

- **P1:** Phase 1 findings F1–F6 in `Research_Synthesis.md`.
- **P2:** Phase 2 brand decisions/territories and catalog-commerce contracts; D-004, D-005, D-006, D-007, D-010, D-012, D-013, D-015, D-016, D-017, D-020, D-022.
- **P3:** Phase 3 UX principles, page/component specs, wireframes and accessibility requirements.
- **P4A:** Approved The Measured Pantry visual system and five signature moments.

## Traceability matrix

| Motion / asset decision | P1 basis | P2 basis | P3 contract | Approved P4A input | Accessibility requirement | Performance constraint | Risks controlled |
|---|---|---|---|---|---|---|---|
| Raw → measure → method → joyful make motion language | F4 confidence; F5 recipe differentiator | Measured Joy; Working Pantry; D-020 | UX Principles 2/5; Homepage hierarchy | Measured ingredient opening and raw→measured→made composition | Content complete without motion; reduced alternative | One bounded sequence; no LCP delay or continuous loop | R-005, R-017, R-019, R-032 |
| Editorial-to-transactional intensity gradient | F1 clarity; F6 accessible control | Premium-accessible clarity; D-005 | Page/state hierarchy; commerce specs | Visual expression quiets in dense utility | No action/status depends on effect | Cancel decorative work during interaction; limited concurrency | R-005, R-007, R-017, R-027 |
| Measured ingredient homepage opening asset | F4 factual confidence | Measured abundance; D-006/D-007 | Homepage hierarchy and image fallback | Signature 1; Ingredient Theatre boundary | Decorative layers empty-alt; proposition immediately readable | Responsive stills; reserved ratio; protect LCP | R-001, R-008, R-030, R-032 |
| Department-atlas motion and imagery | F1 middle-depth nav; F6 controls | D-015 eight departments | Navigation spec; keyboard/focus; wireframe 1 | Signature 2 irregular numbered atlas | All links and names persistent; no colour-only meaning | Direct-input effect only; no large simultaneous motion | R-003, R-013, R-027, R-032 |
| Ingredient Theatre product transition | F2/F3 product decision fields/variants; F4 facts | D-013/D-017; retailer hierarchy | Product cards/PDP facts and media fallback | Signature 3 controlled product study | Pack/facts continuously available; approved alt ownership | Crop/opacity only; static final pack; responsive sources | R-002, R-008, R-018, R-030 |
| Recipe-to-supplies transformation | F5 recipe review | D-016 deterministic mapping; D-017 unknowns | Recipe review: required/selected/purchased/leftover, explicit omissions | Signature 4 transformation rail | Textual quantities own meaning; no silent addition | Bounded local sequence; no scroll scrub | R-004, R-021, R-024, R-032 |
| Variant-owned PDP pack transition | F2/F3 family/pack variants | Product/variant model; D-013/D-017 | Atomic selection, focus/status owner, no auto-substitute | Signature 5 pack-size study | Focus retained; full facts announced once | Latest-state cancellation; reserved media dimensions | R-002, R-012, R-024, R-030 |
| PLP/search result transition | F1/F6 discovery | Search/filter/sort and URL contracts | Results status, focus/list restoration | Grid/card visual system | One results announcement; no per-option chatter | One region crossfade; no card cascade/layout animation | R-005, R-013, R-022, R-024 |
| Drawer/dialog spatial continuity | F6 accessible control | Commerce/provider boundaries unchanged | Focus containment/return, inert background, keyboard/safe area | Raised overlay and responsive grid | State/focus immediate; reduced/static open | Short transform/opacity; interruption safe | R-005, R-013, R-026 |
| Wishlist/cart feedback | F3 consolidated variants; F6 status | D-004/D-013; cart revision/merge contracts | Global status owner, deterministic removal focus | Calm commerce component language | No toast-only result; failure restores state | Local effect only after commit; no fly-to-cart | R-005, R-023, R-024 |
| Checkout/confirmation calmness | F4 confidence; F6 accessibility | D-004 simulation-only; D-013; analytics boundary | No PII/payment, error summary, simulated confirmation | Quiet transactional composition | Demo copy visible immediately; focus/status independent | Busy indicator only; no celebration/progress fiction | R-006, R-025, R-027 |
| Loading/static placeholders | F4 verified facts | D-006/D-007/D-017 | Busy-state and media-failure contracts | Neutral CSS placeholder direction | No simulated facts; static under reduced motion | Zero CLS; no large shimmer/GPU layers | R-002, R-005, R-008 |
| Error/unavailable/stale treatments | F4/F6 | D-013/D-017; fail-closed commerce | Persistent text/icon/error summary and recovery | Semantic status visual system | No shake/colour-only signal; immediate focus | Immediate render; no animation required | R-002, R-007, R-024, R-026 |
| Reduced/no-animation contract | F6 | D-005; no behavioral redefinition | Accessibility requirements; all 19 wireframes | Static prototype evidence and motion opportunity map | Same DOM/order/focus/status/content; no hidden initialization | No JS dependency; cancel on resize/low power | R-005, R-007, R-013, R-032 |
| Motion tokens and implementation boundary | F6 | Future-ready/provider-neutral boundary | Motion never owns business state | Semantic token system | Consistent, interruptible, preference-aware | Transform/opacity preference; semantic durations; cap concurrency | R-005, R-027, R-031 |
| Retailer logo/wordmark and fictional product-brand marks | F4 trust via clarity | D-012/D-013/D-018/D-022 | Retailer/product roles explicit | Retailer-led hierarchy | Text alternative/name remains; marks not sole ownership cue | SVG/static first; no logo animation requirement | R-015, R-018, R-019 |
| Packaging and label family | F2/F3 family facts and variants | Product model; D-006/D-013/D-017 | PDP/PLP pack basis and unknown-state rules | Variant-owned pack study | Weight/count/dimension readable; no colour-only variants | Thumbnail legibility; responsive raster/SVG budget | R-002, R-008, R-012, R-030 |
| Department and ingredient macro assets | F1/F4 | Measured abundance; D-006/D-007/D-015 | Department discovery and image fallback | Atlas + Ingredient Theatre direction | Destination text independent; factual/decorative alt intent | Responsive crops, lazy load below fold, reserved ratio | R-001, R-008, R-030, R-032 |
| Product packshots and variant crops | F2/F3/F4 | Product media/variant ownership | Cards/PDP/recipe/cart media states | Product imagery direction | Catalog owns factual alt; fallback retains identity | 1:1/4:3 responsive sources; optimized formats; no CLS | R-002, R-008, R-012, R-030 |
| Recipe imagery | F5 | Recipe data/provenance | Recipe readable without mapping/media | Editorial recipe direction | Outcome does not prove product result; alt by context | Responsive 3:2/4:3 crops; lazy load non-LCP | R-008, R-019, R-030 |
| Icons, illustrations and textures | F6 | D-005/D-006/D-007 | Text/icon non-colour states; empty/error recovery | Approved iconography/illustration direction | Decorative empty-alt; control icons named; no sole meaning | SVG/CSS first; no animated icon requirement | R-001, R-005, R-007, R-008 |
| Asset Manifest and provenance | F4 evidence boundaries | D-006/D-007/D-013/D-017 | Alt ownership and fallback contracts | Asset-manifest requirement | Alt, role and factual-claim review recorded | Dimensions/format/optimization/checksum recorded | R-001, R-002, R-008, R-030 |
| Phase 5 bounded asset pilot | F2–F5 | Retailer/catalog/recipe architecture | Home/PLP/PDP/recipe representative states | Validates all five signatures without full catalog | Desktop/mobile/static/reduced and alt review | Measure actual image weight/LCP/CLS before scale | R-008, R-029–R-032 |

## Coverage audit by required Phase 4B surface

| Required coverage | Motion artifact | Asset/visual dependency | Static/reduced evidence required later |
|---|---|---|---|
| Homepage | Page map + signature choreography | Ingredient composition, department atlas, recipe imagery | 1440/390/320 stills; reduced preference; JS disabled |
| PLP/search | Page map + component spec | Product/recipe thumbnails, placeholders | Results/focus/status unchanged; no grid cascade |
| PDP | Page map + variant/media components | Variant packshots and gallery crops | Atomic facts and selected state without transition |
| Recipe detail/to-cart | Page map + mapping components | Recipe image, mapped packshots | Complete quantity ledger and post-add summary static |
| Wishlist/mini-cart/cart | Page map + commerce components | Pack thumbnails/fallbacks | Mutation/reconciliation/focus equivalence |
| Checkout/confirmation | Page map + status/loading components | Optional static flourish only | No-payment/no-order copy present first frame |
| Navigation/filter drawers | Page map + drawer spec | No asset dependency | Immediate open/close, containment/return, safe area |
| Empty/error/unavailable | Page map + error/status components | Optional approved illustrations | Recovery and meaning complete with no effect/image |

## Verification obligations

- Trace every implemented motion to a semantic token, this matrix and an approved full/reduced/static behavior; untraced motion is rejected.
- Trace every generated, manual, licensed or derived file asset to the Asset Manifest schema before review/release; CSS-only decoration is documented by component/selector rather than falsely manifested as a file.
- Validate representative low/mid-tier mobile hardware, reduced motion, animation-disabled, no-JavaScript, 320 CSS px, 200%/400% zoom, orientation/resize, virtual keyboard, keyboard-only and screen-reader status ownership.
- Record frame stability, long tasks, CLS, LCP impact, asset transfer/decoded size, simultaneous timelines and cancellation defects against `Motion_Performance_Budget.md`.
- Any conflict with Phase 2 commerce truth or Phase 3 interaction behavior blocks motion/asset approval rather than being resolved through presentation.
