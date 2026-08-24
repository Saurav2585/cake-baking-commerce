# Navigation and Discovery Specification

**Phase:** 3 — UX Definition
**Status:** Specialist draft for integration

## Global wayfinding

Every viewport provides access to Home, Shop, Recipes, Search, Wishlist and Cart. The seven merchandise departments live beneath Shop; Recipes is its peer and the eighth approved department. Brands remain a secondary filter or landing path when content depth warrants one.

Persistent page orientation consists of a skip link, labelled site header/navigation, page title and main landmark. Product and recipe detail pages include semantic breadcrumbs matching canonical hierarchy. Utility destinations—About, Contact, FAQ, Shipping & Returns, Privacy and Terms—belong in the footer rather than the primary task path.

## Desktop header behaviour

1. Logo/name links to Home and has an accessible name independent of artwork.
2. **Shop** is a button controlling a disclosure; it is not hover-only.
3. The disclosure presents:
   - Shop All first;
   - Ingredients;
   - Chocolate;
   - Colours & Flavours;
   - Fillings & Fondant;
   - Decorating;
   - Bakeware & Tools;
   - Packaging.
4. Each department may reveal category links from the approved taxonomy, without adding product family as a navigation tier.
5. Recipes is a top-level link outside the Shop disclosure.
6. Search, Wishlist and Cart have visible text or unambiguous accessible names; cart exposes current item count as text to assistive technology.

The disclosure opens by click/tap and keyboard activation, exposes `aria-expanded` and its controlled region, and closes on Escape or explicit dismissal. Opening it moves focus only when the chosen disclosure pattern requires it; it must not unexpectedly trap focus. Closing returns focus to Shop when focus would otherwise be lost. Pointer departure alone does not close it while focus is within.

## Mobile navigation

The labelled **Menu** control opens a modal navigation drawer. On open, focus moves to its heading or first logical control; the background is inert; focus remains within until dismissal. A visible Close control and Escape both dismiss and return focus to Menu.

- Shop expands/collapses as an accordion branch; one department branch is expanded at a time.
- Department and category destinations remain true links; expanding a branch does not replace its landing link.
- Recipes, Search, Wishlist and Cart remain directly reachable without expanding Shop.
- The current page/branch is identified in text/semantics, not colour alone.
- Drawer scroll does not move the obscured page; content remains usable at 320 CSS px and landscape mobile.

## Breadcrumbs and route changes

- Product: Home → Department → Category → optional Subcategory → Product.
- Recipe: Home → Recipes → Recipe.
- The current item is text with `aria-current="page"`; previous items are links.
- Mobile may visually condense earlier levels, but the accessible name/path remains understandable.
- After client-side navigation, focus moves to a page-start target and the document title/page heading is announced; browser Back restores prior list position when feasible.

## Search entry

A globally available search control has a clear text label. Desktop may expand it in place; mobile may open a dedicated search surface, but both use the same behaviour.

### Suggestions

- Suggestions begin after two normalised characters and are grouped: Products, Categories, Brands, Recipes.
- Maximum five per group and ten total; matched text and destination type are conveyed.
- Input uses combobox semantics with expanded state, named listbox and active descendant.
- Down/Up changes the active option; Enter selects; Escape closes without clearing; Tab exits without trapping.
- Pointer and keyboard selection are equivalent. Suggestions never navigate merely because an option becomes active.
- Loading, no-suggestion and error states remain associated with the search field. An error never prevents submitting the typed query.

Submitting a nonblank query navigates to `/search?q=…`; submitting blank opens `/shop`. Search is not executed as page navigation on every keystroke.

## Department and category discovery

Department landing pages establish scope with a factual heading, category paths and available products. Any editorial introduction is brief and cannot delay category access. Optional collections may supplement but never replace the controlled taxonomy or imply popularity.

Category and Shop All pages expose, in order of task importance: heading/context, exact result count, filter access, sort, applied filters and results. Brands appear within filters or a secondary discovery region, not as sellers.

## Cross-discovery

- Product → related recipes: only explicit relationships, labelled as usage inspiration rather than endorsement.
- Recipe → products: proceeds through recipe-to-cart review; no recipe detail action mutates cart silently.
- Product → category/department: breadcrumbs and factual metadata.
- Wishlist/cart → product: retains chosen variant context where valid.
- Editorial collections: identify their organising task or theme and retain each product’s canonical route.

Cross-links must not imply compatibility, safety, suitability, availability or performance beyond known structured data.

## Navigation states

| State | Behaviour | Recovery and accessibility |
|---|---|---|
| Navigation data loading | Core destinations remain; optional category expansion may show busy state | `aria-busy` on controlled region; no layout-dependent trap |
| Partial department data | Show available valid links and identify unavailable region | Retry only affected region; preserve global navigation |
| Invalid/deleted route | Real 404/410 where appropriate | Explain, then Search, Shop All and relevant department links |
| Unavailable product | Retain useful factual page at valid route | Show demo unavailability and available variants/related category without auto-substitution |
| Search suggestion failure | Keep query editable/submittable | Non-blocking message; Enter still reaches results |
| Persistence unavailable | Navigation remains unaffected | Wishlist/cart surfaces disclose limitation where relevant |

## Responsive acceptance criteria

- Desktop, tablet and mobile expose identical destinations and hierarchy.
- No critical navigation depends on hover, motion or image loading.
- Controls have visible focus and aim for 44×44 CSS px targets.
- Open drawers/disclosures do not obscure their own close controls at 200%/400% zoom.
- Route, disclosure and result updates are announced once, without chatty focus changes.

## Boundaries

This specification does not define header styling, menu animation, breakpoint values, final labels beyond controlled taxonomy, personalised navigation or a live inventory/fulfilment surface.
