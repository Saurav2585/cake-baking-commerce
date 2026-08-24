# High-Fidelity Screen Specifications

**Phase:** 4A — Visual System and High-Fidelity Specification
**Status:** Reconciled Phase 4A recommendation; specifications only

## Shared composition rules

All screens use the approved global shell, one H1, warm canvas ground, porcelain/raised content surfaces, ink-aubergine structure and controlled semantic action emphasis from the companion colour/token specifications. Desktop compositions use wide measured grids; mobile compositions use a single source-ordered column with selective sticky actions. Every screen reserves space for status/errors, survives missing imagery and has an immediate reduced-motion equivalent.

Reference widths for design/QA: 1440, 1280, 1024, 768, 430, 390, 360 and 320 CSS px. Tablet behavior follows available width rather than device labels.

## 1. Homepage

**Desktop:** A contained editorial opening pairs a concise proposition/action group with one material-led making image; it must not consume the full first viewport. Follow with an eight-destination department grid, a horizontal task-led strip, four-product curated grid, recipe-to-supplies split feature, practical demo/selection cues and footer. Alternating dense and generous sections create measured abundance.

**Mobile:** Proposition and Shop/Recipes actions precede media. Department tiles form a two-column grid (one column at 320 px if labels wrap poorly); task and product cards scroll only when equivalent “View all” links exist, otherwise stack. Recipe bridge is image → copy → action. No content is hidden behind carousels.

**States:** opening-media failure uses texture field; empty curated/recipe modules collapse with section-specific fallback; partial modules isolate error; page-level error preserves navigation and department links.

## 2. Shop All

**Desktop:** Breadcrumb/H1 and short orientation sit above seven merchandise department panels. Each panel pairs a restrained material crop with category links and optional product count. A curated all-products grid follows with standard result controls.

**Mobile:** Department panels become full-width link cards with category disclosures; All products follows. Keep Recipes as a peer destination callout, not merchandise.

**States:** no featured products retains department navigation; count failure does not remove links; error preserves Shop/Recipes recovery.

## 3. Department landing

**Desktop:** Compact department masthead (title, factual intro, material crop), category-link grid, optional task collection, then products. Masthead avoids promotional hero scale.

**Mobile:** Breadcrumb, title/intro, image, horizontally compact category cards or stacked links, products. Product count/filter entry appears before grid.

**States:** missing image collapses cleanly; no products retains categories; partial/error is localized.

## 4. Category / PLP

**Desktop:** Breadcrumb and title row; result count/chips/sort above a two-column frame with 240–280 px filter rail and 3–4 column product grid. Pagination anchors below grid. Filter rail may be sticky below header without extending beyond viewport.

**Mobile:** Title/count, Filters with applied count, Sort and horizontally wrapping active chips precede a two-column product grid (one column at 320 px when content requires). Filter drawer owns staged changes and a fixed Apply/Cancel footer.

**States:** loading reserves card geometry; zero results preserves query/filter chips and prioritizes chip removal/Clear all; invalid URL notice precedes results; continuation failure is local with Retry.

## 5. Search results

**Desktop:** Large search field and H1 “Search results for …” lead; grouped recipe/category matches may form a narrow context band before the standard filter/grid composition.

**Mobile:** Query field stays visible, then exact result summary, filters/sort/chips and mixed result sections. Type labels distinguish product and recipe cards.

**States:** initial guidance offers departments/tasks; normalized query visibly shows what was searched; zero retains entered query and ordered recovery; provider error preserves input and Retry.

## 6. Search suggestions overlay

**Desktop:** Anchored raised-surface panel matches input width, up to a comfortable viewport height, with group headings and aligned product thumbnails. Footer action submits the full query.

**Mobile:** Search becomes a full-width top-layer sheet beneath a persistent input/header; virtual keyboard leaves active option and submit visible. Groups stack without nested scrolling where feasible.

**States:** idle closed; loading keeps query; active option has strong non-colour marker; no suggestions still offers full search; error offers submit/Retry; Escape/close returns focus.

## 7. Product detail

**Desktop:** Breadcrumb and identity precede a two-column area: 7-column gallery, 5-column purchase panel. Purchase panel may stick; details below span a readable 8 columns with fact groups and related recipes/products.

**Mobile:** Identity, gallery, purchase controls, status and factual sections remain in source order. Optional sticky Add mirror appears only when selection is valid and cannot cover focus/status. Facts use definition groups.

**States:** unselected axes show neutral prompts; resolved facts update in a reserved panel; unavailable/stale/price missing visibly disable Add; all unavailable retains content/wishlist; **Information not provided** is shown per critical row; add error is inline with Retry; media failure preserves frame.

## 8. Recipe listing

**Desktop:** Editorial title and compact category/filter row lead a balanced 3-column recipe grid. Cards use outcome/process crops plus yield/time facts, never ratings.

**Mobile:** Filters become a small disclosure/drawer; cards are full width or two-column only when copy remains legible.

**States:** empty/filter-zero preserve recipe categories and clear controls; media/partial failures stay local; total error offers Shop as secondary escape.

## 9. Recipe detail

**Desktop:** Editorial masthead pairs recipe identity/facts with a 4:3 process image. Below, a narrow sticky ingredient/servings column may accompany a wider method column; review action remains near ingredients and is repeated after the list only when not duplicate to assistive technology.

**Mobile:** Breadcrumb/title/facts, media, servings, ingredients, review action, method, tools and related content stack exactly in approved order. Numbered steps use strong rhythm.

**States:** invalid servings reserves last valid amounts with inline error; non-scalable text is explicit; missing mapping disables only review commerce, not reading; absent optional media uses fallback.

## 10. Recipe-to-cart review

**Desktop:** H1/context and summary ledger lead. Ingredient cards use a 12-column row: identity/status 3, pack math 5, product/actions 4. Optional/suggested-owned and tools occupy separate titled groups. Final omissions/acknowledgement and action form a sticky-capable right summary only if it does not detach from row errors.

**Mobile:** Each row stacks identity → inclusion → Required/Selected pack/Purchased/Left over 2×2 grid → product/facts → actions. Summary/action follows all groups; a sticky compact count/action may mirror valid state.

**States:** ready, pantry suggested, optional excluded, needs choice, unmapped, unavailable, invalid/stale, substitute and override each have distinct icon/text/border treatment. Calculating preserves last valid review. Price/revision conflict focuses linked error summary. None selected disables Add with reason. Atomic failure retains all choices. Success replaces action area with added/merged/skipped breakdown.

## 11. Wishlist

**Desktop:** H1/local-browser note and count precede two-column large cards or a comfortable list. Product identity, variant ambiguity, demo price/availability and visible remove/select/add actions remain aligned.

**Mobile:** One card per row; actions wrap into full-width buttons without hiding Remove.

**States:** empty uses a restrained making illustration/texture and Shop/Recipes paths; stale/unavailable stays visible; persistence error explains temporary state without blocking browsing.

## 12. Mini cart

**Desktop:** Right-side 400–460 px drawer with heading/count, scrollable lines, inline issues and fixed subtotal/View cart footer.

**Mobile:** Near-full-width or full-screen drawer with safe-area footer; line information remains readable above actions.

**States:** empty, populated, affected-line busy, stale price, unavailable, max quantity and failure. Full Cart remains the recovery destination. Overlay has clear close/scrim and no motion dependency.

## 13. Cart

**Desktop:** H1/demo disclosure and linked issue summary precede 8-column line list plus 4-column sticky summary. Lines align image, identity, quantity, price and actions.

**Mobile:** Issue summary, line cards and nonsticky ledger stack. Checkout action may stick only when no issue and without hiding content.

**States:** empty discovery; quantity pending/error; price changed with old/current neutral comparison; unavailable/removed/over-limit exclusion; persistence conflict; checkout-ready. Blocked action always has adjacent reason.

## 14. Simulated checkout

**Desktop:** Narrow 7-column form/document plus 5-column summary. Strong demo disclosure directly beneath H1; fixed fictional radio cards and acknowledgement form the only inputs.

**Mobile:** Disclosure, fixed choices, acknowledgement, summary and final action stack; demo statement repeats immediately before action. No payment visual vocabulary.

**States:** initial, inline/summary validation, changed cart, submitting, provider failure. Submitting preserves labels and prevents duplicate action; failure retains safe choices.

## 15. Demo confirmation

**Desktop:** Centered 8-column completion document: H1, no-payment/no-order statement, demo reference, item snapshot, totals and Shop/Recipes actions. A restrained celebratory material flourish is optional, never confetti or proof of fulfillment.

**Mobile:** Same order, full-width ledger and stacked actions.

**States:** valid, partial snapshot, expired/direct visit and creation error. Expired state contains no reconstructed order claim.

## 16. Mobile navigation drawer

Full-height raised surface, brand/close header, Shop disclosure with one expanded branch, Recipes peer link, account-free wishlist/cart utilities and service links. Current destination receives text plus marker. Footer does not trap essential links behind safe-area/viewport changes.

**States:** closed/open, branch expanded, long content, route loading and count failure. Background inert; focus return is deterministic.

## 17. Mobile filter drawer

Full-height surface with H2/current result estimate, scrollable filter groups and separated Clear/Cancel/Apply footer. Selected counts and staged chips are textual. Apply is visually primary; Cancel never looks destructive.

**States:** clean, staged, no staged result, applying, invalid value and error. Failed Apply retains staged controls. Virtual keyboard does not cover actions.

## 18. 404 / removed content

A contained, calm empty composition uses a measured ingredient/tool arrangement or texture, plain missing-page explanation, Search, Shop All and Recipes links. Global navigation remains. Removed content uses explicit removed wording rather than generic redirect.

## 19. Shared loading, empty and error compositions

- **Loading:** real heading/navigation plus reserved content frames; no false product facts.
- **Empty:** factual headline, retained context, one primary recovery and secondary relevant path.
- **Partial:** successful content remains visually normal; failed region uses bounded notice/Retry.
- **System error:** stable shell, concise explanation, Retry and escape path; sanitized reference only if useful.
- **Offline/persistence:** specify affected capability and retained state; never claim success.

## Cross-screen acceptance criteria

1. All nineteen approved screen/overlay blueprints have intentional desktop and mobile composition.
2. Every applicable loading, empty, partial, invalid, unavailable, stale, validation, mutation-failure and success state is visually accommodated.
3. Search, filters, variants, recipe review, wishlist, cart and checkout retain one clear status/error owner.
4. All critical facts, demo qualifications, selected quantities and recovery actions remain visible at 320 CSS px and zoom.
5. Imagery failure and reduced motion never remove the task, fact hierarchy or action.
6. The visual system contains no unsupported claim, review/rating device, real-payment cue or competitor-derived composition.
