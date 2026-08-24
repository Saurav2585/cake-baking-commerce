# Search, Filter and Sort Specification

## Purpose and boundaries

This specification defines deterministic discovery behaviour for Pantryform’s local portfolio/demo catalog. It covers products and recipes, not live inventory, personalization, sponsored ranking, reviews, marketplace sellers or AI-generated answers. Brand is a secondary search and filter dimension; the eight departments in D-015 remain primary.

Inputs: D-010–D-017, Phase 1 findings F1–F6 and the approved Pantryform positioning. Search must help a home baker choose confidently while retaining the exact fields useful to a micro-bakery.

## Searchable document

Each published product parent contributes one document containing:

- parent title, fictional brand, department, category, subcategory and product family;
- factual short description, applications/use tags, form/medium, colour family and compatible-use values whose provenance is `known`;
- all published sellable-variant display labels, normalized quantity/dimension tokens and SKU;
- approved synonyms and spelling aliases; and
- document type `product`.

Each published recipe contributes title, factual summary, recipe category, occasion/use tags, ingredient display names, dietary labels only when source-verified, and document type `recipe`. Hidden, draft and invalid records are excluded. Unknown, not-applicable and prohibited inferred claims never become searchable positive terms.

## Query normalization

Apply in this order to both indexed aliases and queries: Unicode normalize; lowercase; trim; collapse whitespace; treat hyphens and punctuation as token boundaries except decimal points; normalize multiplication signs (`x`, `×`) between dimensions; then map controlled aliases. Preserve the raw query for on-page display only; analytics receives privacy-safe derived metrics unless a later privacy review explicitly approves otherwise.

Minimum aliases:

| Input | Canonical token |
|---|---|
| colour, color | colour |
| flavour, flavor | flavour |
| gram, grams, gm, gms | g |
| kilogram, kilograms, kgs | kg |
| millilitre, millilitres, milliliter, ml | ml |
| litre, litres, liter | l |
| inch, inches, `"` | in |
| centimetre, centimetres | cm |
| millimetre, millimetres | mm |
| pcs, pieces | count |

Normalize parseable quantities to a base comparison value without replacing the user-facing unit: kg→g, L→ml, cm/in→mm and packs→count. `1 kg`, `1000 g`, and `1000gm` may match the same normalized quantity. Do not convert volume to mass, outside to internal dimensions, or ambiguous phrases such as “large”.

Approved editorial aliases may map familiar terms to catalog terms (for example `choco chips` → `chocolate chips`), but must never imply compatibility, dietary suitability, certification, food-contact safety or performance. Version the alias dictionary and test every change.

## Matching and suggestions

Matching precedence is deterministic:

1. exact normalized SKU;
2. exact normalized title or recipe title;
3. exact prefix of title;
4. exact fictional brand, department, category, subcategory or product-family phrase;
5. all query tokens present across searchable fields;
6. approved alias match;
7. bounded spelling-tolerant match for tokens of at least five characters (maximum edit distance one).

Within the same tier, rank by number of exact field matches, then title match, then curated merchandising rank, then normalized title ascending, then stable ID ascending. No popularity, conversion or “best-selling” signal is permitted in v1.

Suggestions appear only after two normalized characters and are grouped in this order: Products, Categories, Brands, Recipes. Return at most five per group and ten total, with the matched text and destination type exposed to assistive technology. An exact SKU may appear first. Keyboard behaviour: Down/Up moves among options, Enter selects, Escape closes without clearing, Tab leaves the field, and focus is never trapped. The input uses combobox semantics with programmatic expanded state, active descendant and a named listbox. Selection navigates only after explicit Enter/click/tap.

Submitting a blank query opens Shop All rather than an empty search URL. A submitted nonblank query uses `/search?q=<encoded raw query>` and yields a stable result set. Search must not execute on every keystroke as a navigation action.

## Facets

Always eligible where populated: department, category, fictional brand, availability state, applications/use, and price range. Family-specific facets:

| Context | Eligible facets |
|---|---|
| Ingredients | form, pack quantity, application |
| Chocolate | subtype, verified cocoa band, form, pack quantity, application, verified fluidity |
| Colours | medium/base, form, colour family, application |
| Flavours | type, carrier/compatibility when known, volume, application |
| Fillings | flavour/fruit, texture/fluidity, pack quantity, verified use/stability |
| Fondant/decorating | type, colour, mass/count, intended use |
| Bakeware | internal dimension, shape, material, set/cavity count, verified compatibility |
| Tools | task, dimension, material, set count |
| Packaging | internal dimension, material, pack count, colour/window, assembly type |
| Recipes | recipe category, time band, difficulty only if editorially assigned, occasion/use |

Facet values are derived only from `known` typed fields. Never offer dietary/certification/allergen/safety/performance facets unless the catalog owner separately verifies complete provenance and approves them. `Information not provided` is content, not a positive safety facet.

Within one facet, selected values use OR; across facets use AND. Range endpoints are inclusive. Counts reflect the current query and all other selected facets while ignoring the value’s own facet, so users can see viable alternatives. Zero-count values remain visible only when already selected and are disabled otherwise.

On product-family pages, irrelevant facets are absent rather than disabled. A mixed result set exposes only facets meaningful to at least one current result and labels family-specific scope clearly.

## Selected filters and URL state

Every applied query/facet appears as a removable, text-labelled chip above results. The accessible remove name includes facet and value. `Clear all` removes facets and price range but preserves the submitted search query; a separate “Clear search” removes the query. Either action resets pagination to page 1.

Canonical query keys use a fixed order: `q`, `department`, `category`, `brand`, family-specific keys alphabetically, `availability`, `price_min`, `price_max`, `sort`, `page`. Values are lowercase stable slugs, repeated values are alphabetically sorted comma-separated values, and defaults are omitted. URL state supports refresh, history and sharing. Invalid keys/values are ignored with a non-blocking status message and must not crash or broaden into unsupported claims.

## Sort rules

Default `relevance` is available when a query exists. Otherwise default `featured` uses explicit curated rank, then title and stable ID. Other options:

- Price: low to high / high to low — selected variant price if one is selected by URL; otherwise lowest available sellable variant price, falling back to lowest demo-price variant. Ties: title, stable ID.
- Unit price: low to high — only in contexts where all compared values share a convertible dimension (mass, volume or count). Records without meaningful unit price follow comparable records and are labelled “Unit price not available”. Never mix mass, volume and count.
- Name: A–Z — locale-aware English title, then stable ID.
- Newest — only if a factual demo publication date exists; descending date, title, stable ID. It must not be labelled “new” as a popularity/quality claim.

Changing sort resets page 1. Sorting never changes facet membership, selected variants or availability. Do not include popularity, rating, recommended or discount sorting without approved evidence and rules.

## Results and pagination

Show the exact result count and active query/filter summary. Result count updates only after committed filter application on mobile and immediately on desktop controls. Pagination is deterministic and preserves URL state; v1 should use numbered pagination or an accessible “Load more” that appends without moving focus unexpectedly. If “Load more” is used, announce the number added and new total and preserve a recoverable page URL.

Cards expose enough to choose the next action: brand, factual title, relevant pack/dimension, INR demo price, comparable unit price when meaningful, variant/demo availability and either Add or Select options. Direct Add is allowed only when one unambiguous available sellable variant exists; otherwise go to/select variant. Wishlist remains available without implying stock reservation.

## Mobile, keyboard and status behaviour

- Mobile filters open an explicitly named modal drawer. Focus moves to its heading, stays within while open, Escape and Close dismiss it, and focus returns to the trigger.
- Filter changes remain staged until “Show N results”; Cancel discards staged changes. Clear all is available inside. The trigger displays the applied-filter count.
- Desktop filter controls and all chips, sorting, pagination and suggestions are keyboard operable with visible focus; native checkbox/radio/select behaviour is preferred.
- Search result updates announce once through a polite status region: “18 products found” or “No products found”. Do not announce every checkbox focus or animation frame.
- Loading sets `aria-busy` on the results region without replacing its accessible name. Controls cannot appear active while their action is unresolved.
- Touch targets aim for at least 44×44 CSS px; layouts reflow at 320 CSS px and 400% zoom without two-dimensional scrolling except intrinsically dimensional content.
- Information and selected state never rely on colour alone. Results and controls are available without motion; reduced motion removes animated transitions.

## Zero-result recovery

State the query and active filters without blame. Offer, in order: remove individual filter chips, Clear all filters, spelling/alias suggestions only when deterministic, search departments/categories, and Shop All/Recipes links. Never silently remove filters, substitute a product, fabricate a “did you mean”, or show paid/promoted results. Log a zero-result search without recording personal data.

## Acceptance tests

1. Equivalent unit/spelling aliases return the same eligible set while preserving raw query display.
2. Same query, data version, facets and sort always produce the same stable order.
3. OR-within/AND-across facet rules and counts pass fixture tests.
4. Unit-price sort is absent across incompatible dimensions.
5. No unknown critical field creates a positive filter or searchable claim.
6. Refresh/back/share restore query, filters, sort and page.
7. Suggestions, drawer, chips and sort pass keyboard, focus and named-control checks.
8. Live regions announce committed count/empty/error changes once.
9. Zero-results never silently relax constraints.
10. Direct Add never chooses among ambiguous variants.

## Dependencies and unresolved risks

- Catalog taxonomy, typed family fields and stable slugs must be reconciled with this spec before implementation.
- Alias maintenance can create misleading compatibility matches; require catalog-owner review and regression fixtures.
- Curated rank can become covert promotional bias; keep it explicit, deterministic and free of unsupported popularity language.
- Price/unit sorting depends on valid normalized quantities and variant-level price; invalid records must fail catalog validation rather than distort results.
