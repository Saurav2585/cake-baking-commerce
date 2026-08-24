# Evidence Log

All observations were recorded on **2026-08-24 (Asia/Kolkata)**. “Live” means direct read-only browser inspection; “indexed” means search-indexed page content inspected because it offered relevant structured text. No screenshots are retained.

| ID | Class | Source and page | Mode | Paraphrased evidence | Confidence |
|---|---|---|---|---|---|
| E-001 | OBSERVATION | [BakIndia home](https://www.bakindia.in/) | Live desktop/mobile | Top-level links include Chocolates, Ingredients, Food Colors, edible/non-edible decoration and tools; other departments sit behind More. | High |
| E-002 | OBSERVATION | [BakIndia home](https://www.bakindia.in/) | Live desktop | Homepage uses category shortcuts and repeated new/latest/offer/best-selling product rails with INR prices. | High |
| E-003 | OBSERVATION | [BakIndia home](https://www.bakindia.in/) | Live | Search appears twice with placeholder text; several trust/promotion statements include free shipping over a threshold, continuous support and quality assurance. | High |
| E-004 | OBSERVATION | [BakIndia home](https://www.bakindia.in/) | Live mobile 390×844 | Page showed no horizontal overflow, but repeated quantity controls were about 22–30px wide/high and exposed empty accessible labels in the inspected DOM. | High |
| E-005 | OBSERVATION | [BakIndia chocolates](https://www.bakindia.in/categories/chocolates/335898000015251002) | Live | Sorting includes popularity, recency, price and alphabetic options; wishlist buttons and direct product actions are present. | High |
| E-006 | OBSERVATION | [BakIndia chocolates](https://www.bakindia.in/categories/chocolates/335898000015251002) | Live | Pack and key attributes are often embedded in separate product titles, including 500g/1kg versions and cocoa percentages. | High |
| E-007 | OBSERVATION | [BakIndia chocolate PDP](https://www.bakindia.in/products/callebaut-dark-couverture-chocolate-callets-811-500-gms/335898000002149052) | Live | PDP shows title, non-returnable marker, INR price, quantity controls and an ingredients section; inspected quantity buttons had no accessible label. | High |
| E-008 | OBSERVATION | [BakIndia home](https://www.bakindia.in/) | Live | Product families observed across rails/navigation include ingredients, chocolate, colours, decor, bakeware/tools and packaging. | High |
| E-009 | OBSERVATION | [Bakerykart home](https://www.bakerykart.com/) | Live desktop | Navigation exposes Chocolates, Ingredients, Bakeware, Display & Decoration, Disposable, Tools, Kitchenware, Equipment, Brands and Sellers. | High |
| E-010 | OBSERVATION | [Bakerykart home](https://www.bakerykart.com/) | Live | Product cards expose seller identity, INR prices and generic size/colour attributes; homepage also promotes categories and recipes. | High |
| E-011 | OBSERVATION | [Bakerykart home](https://www.bakerykart.com/) | Live mobile 390×844 | Page showed no horizontal overflow; visible banner buttons were about 24×20px, while search controls were larger. Main category navigation was not visible in the first rendered mobile state. | High |
| E-012 | OBSERVATION | [Bakerykart product directory](https://www.bakerykart.com/products) | Indexed | Nine broad master categories lead to detailed chocolate, ingredient, bakeware, decoration, disposable/packaging, tool, kitchenware and equipment subcategories. | High |
| E-013 | OBSERVATION | [Bakerykart chocolate category](https://www.bakerykart.com/products/chocolates) | Indexed | Facets include cocoa content, origin, weight, chocolate type, formation, fat content, application and fluidity. | High |
| E-014 | OBSERVATION | [Bakerykart food colours](https://www.bakerykart.com/products/ingredients/food-coloring) | Indexed | Colour forms include airbrush, oil, liquid, gel, lustre, powder and spray; filters include application, shelf life and colour base/medium. | High |
| E-015 | OBSERVATION | [Bakerykart ingredients](https://www.bakerykart.com/products/ingredients) | Indexed | Ingredient taxonomy includes flour, mixes, essentials, fillings, extracts/flavours, colours, fondant, glaze, sprinkles and dry fruits/nuts; facets include weight, application and fruit type. | High |
| E-016 | OBSERVATION | [Bakerykart couverture PDP](https://www.bakerykart.com/detail/couverture/equatoriale-noire-55-dark-chocolate) | Live | PDP exposes brand/seller, stock, size/colour/quantity selectors, wishlist, delivery-zone check, tax-inclusive price, structured detail/info/use/shipping/review sections and related products/recipes. | High |
| E-017 | OBSERVATION | [Bakerykart couverture PDP](https://www.bakerykart.com/detail/couverture/equatoriale-noire-55-dark-chocolate) | Live/indexed | Structured fields include shelf life, origin, ingredient information, formation and net/gross weight; review count was zero. | High |
| E-018 | OBSERVATION | [Bakerykart delivery](https://www.bakerykart.com/delivery) | Indexed | Delivery text explains seller fulfilment, possible split shipments, tracking, express eligibility and temperature-sensitive handling. These are competitor operations, not transferable promises. | High |
| E-019 | OBSERVATION | [Bakerykart policies](https://www.bakerykart.com/policies) | Indexed | Return windows vary by category; chocolate melt/leak handling and non-returnability are explicitly discussed. | High |
| E-020 | OBSERVATION | [Bakerykart Bundt recipe](https://www.bakerykart.com/recipes-detail/chocolate-cakes/chocolate-bundt-cake-recipe) | Live | Recipe presents prep/cook/servings, structured ingredients, tools, overview, steps, favourites/print controls and featured products. No recipe-to-cart control was observed. | High |
| E-021 | OBSERVATION | [Bakerykart home](https://www.bakerykart.com/) | Live | A ladyfinger product title showed 400g while the generic size field was previously observed as 300g; generic size/colour fields also appear on non-food categories. | Medium-High |
| E-022 | OBSERVATION | [Bakerykart packaging example](https://www.bakerykart.com/detail/cake-boxes/cake-packaging-box-10x10x5) | Indexed | Packaging fields include dimensions, pack count, material/GSM, weight, assembly and application. | High |
| E-023 | OBSERVATION | [Bakerykart fondant example](https://www.bakerykart.com/detail/gum-paste-icing-fondant/red-vizyon-sugar-paste-250-grms) | Indexed | Fondant example exposes size, colour, ingredients, shelf life, packaging and storage/use information. | High |
| E-024 | EXTERNAL FACT | [FSSAI Labelling and Display Regulations page](https://fssai.gov.in/food-law/regulations) | Official source | FSSAI publishes Labelling and Display Regulations for pre-packaged food. | High |
| E-025 | EXTERNAL FACT | [FSSAI Labelling and Display compendium](https://fssai.gov.in/upload/uploadfiles/files/Compendium_Labelling_Display_04_01_2022.pdf) | Official source | The cited compendium describes ingredient/allergen declarations, net quantity and storage instructions where applicable. Treat as a data-model prompt, not legal advice. | High |
| E-026 | INFERENCE | E-006, E-013, E-016, E-021 | Synthesis | A universal size/colour schema or separate pack-size products create comparison and data-consistency problems. | High |
| E-027 | HYPOTHESIS | Approved audience + E-006, E-013 | Synthesis | Home bakers may prefer smaller packs while micro-bakeries may value bulk sizes; demand preference is unvalidated. | Low |
| E-028 | RECOMMENDATION | E-004, E-011 | Synthesis | Later design must use named native controls, logical headings, visible focus, live status feedback and touch targets aiming at 44×44px. | High |
| E-029 | RECOMMENDATION | E-020, E-026 | Synthesis | Recipe-to-cart should map required quantity to variant/SKU, display required versus purchased amount and leftovers, and require review before adding. | High |
| E-030 | RECOMMENDATION | E-001, E-009, E-012 | Synthesis | Use a middle-depth task taxonomy rather than hiding major departments or exposing brands/sellers as primary navigation. | High |

## Evidence gaps

- Search suggestions, typo tolerance and zero-results recovery: not tested.
- Filter mutation, sort results, wishlist persistence, cart editing and checkout: not tested to avoid state changes.
- Keyboard order, focus restoration, screen-reader announcements, contrast and zoom: require later prototype/implementation testing.
- User preference and terminology comprehension: require primary research; current audience needs are hypotheses.
