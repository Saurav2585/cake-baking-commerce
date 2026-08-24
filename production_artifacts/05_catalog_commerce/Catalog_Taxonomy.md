# Catalog Taxonomy

**Phase:** 2B — Catalog, Commerce and Information Architecture  
**Owner:** Catalog/Commerce Architecture  
**Status:** Review-ready specialist input  
**Binding decisions:** D-012, D-013, D-015, D-017

## Purpose and boundaries

This taxonomy gives Pantryform, the approved prototype retailer direction, one clear catalog spine for a curated multi-brand demo. It covers approximately 24–30 products without pretending to be a marketplace, manufacturer catalog or exhaustive industry ontology. It does not define page layout, visual design, production data or code.

## Entity hierarchy

`department → category → subcategory (optional) → product family → parent product → sellable variant/SKU`

- **Department:** one of the eight approved customer-facing top-level destinations. A product has exactly one primary department.
- **Category:** stable browse grouping within a department. A product has exactly one primary category.
- **Subcategory:** optional third browse level used only when it improves a real selection decision; never a required empty wrapper.
- **Product family:** schema/behavior classification that selects relevant attributes, filters, validation and unit-price logic. It need not appear as another navigation level.
- **Parent product:** consolidated customer-facing product concept shared by related sellable variants.
- **Variant/SKU:** purchasable combination of typed axes with its own SKU, price, availability and optional media.
- **Fictional product brand:** secondary product metadata/filter. It is never a department, seller, fulfilment party or peer storefront.
- **Recipe:** Pantryform editorial entity in the Recipes department, related to ingredients and products but not itself sellable.

Maximum customer-facing browse depth is department/category/subcategory. Product family is a data classification; parent product and variant are product-selection levels. Empty, one-child or purely duplicative subcategories collapse into their parent category.

## Approved departments and controlled category map

| Department | Categories | Optional subcategories | Product families |
|---|---|---|---|
| Ingredients | Flours & Mixes; Sugars & Sweeteners; Leavening & Essentials; Nuts, Fruits & Add-ins | Flour; Cake mix; Sugar; Leavener; Binder; Dried fruit; Nut; Seed | `ingredient_dry`, `ingredient_liquid` |
| Chocolate | Baking Chocolate; Cocoa; Chips & Inclusions | Compound; Couverture; Cocoa powder; Chips; Callets; Decorations | `chocolate`, `cocoa`, `chocolate_inclusion` |
| Colours & Flavours | Food Colours; Flavours & Extracts | Gel; Liquid; Powder; Oil-based; Airbrush; Essence; Extract; Emulsion | `colour`, `flavour` |
| Fillings & Fondant | Fillings & Glazes; Fondant & Modelling; Icings & Pastes | Fruit filling; Chocolate filling; Glaze; Rolled fondant; Gum paste; Icing | `filling`, `fondant`, `decorating_consumable` |
| Decorating | Sprinkles & Edible Decor; Piping & Finishing; Presentation Decor | Sprinkles; Sugar decor; Piping tips; Bags; Scrapers; Toppers; Ribbons | `decorating_consumable`, `tool`, `presentation_material` |
| Bakeware & Tools | Pans & Moulds; Measuring & Mixing; Piping & Decorating Tools; Preparation Tools | Round pan; Loaf pan; Cupcake mould; Measuring; Spatula; Turntable; Cutter; Brush | `bakeware`, `tool` |
| Packaging | Boxes; Boards & Bases; Liners & Bags; Containers; Bake & Serve | Cake box; Cupcake box; Cake board; Liner; Pouch; Container; Baking mould | `packaging` |
| Recipes | Cakes; Cupcakes & Muffins; Cookies & Bars; Frostings, Fillings & Finishes | Optional technique or occasion collections, not permanent taxonomy without content depth | `recipe` |

Category labels are controlled values; singular/plural and spelling aliases belong to search normalization, not duplicate taxonomy nodes. The same sellable product is not duplicated across departments: secondary discovery uses `applications`, collections and recipe relationships.

## Product family assignment rules

1. Every parent product has exactly one `product_family` selected from the controlled list above.
2. Assignment follows the decision fields required to buy the item, not promotional wording. Example: cocoa powder is `cocoa`, not generic `ingredient_dry`; a piping tip is `tool`, not `decorating_consumable`.
3. An item that can be used for several tasks retains one primary taxonomy location and multiple controlled application tags.
4. Food and non-food presentation materials remain distinguishable. `presentation_material` cannot inherit edible, allergen or ingredient fields.
5. A bake-and-serve item stays `packaging` unless its primary sellable purpose is reusable bakeware.
6. New families require a schema change and review; content authors cannot create free-text families.

## Controlled relationships

| Relationship | Cardinality | Rule |
|---|---:|---|
| Department → category | 1:N | Category has one owning department. |
| Category → subcategory | 1:0..N | Optional; no deeper browse nodes. |
| Parent product → variant | 1:1..N | At least one publishable sellable variant. |
| Fictional brand → parent product | 1:N | Each product has one fictional brand; brand is secondary discovery metadata. |
| Parent product ↔ recipe | N:M | Typed as `used_in`, `recommended_for`, or `optional_for`; never implies endorsement or seller relationship. |
| Recipe → recipe ingredient | 1:N | Ordered ingredient requirements, including optional items. |
| Recipe ingredient → compatible product/variant | 1:0..N | Explicit mapping only; no name-only inference. |

## Slugs and stable identifiers

- Stable IDs are immutable opaque strings with type prefixes (`dept_`, `cat_`, `subcat_`, `family_`, `brand_`, `prod_`, `var_`, `recipe_`, `ri_`). Display labels and slugs may change without changing IDs.
- Slugs are lowercase ASCII kebab-case and unique within their route scope. Redirect history is retained after a published slug changes.
- SKU is a unique commerce identifier for a variant, not a route key and not derived from a mutable title.
- Taxonomy references use IDs; labels and breadcrumbs are resolved from the current taxonomy record.

## Discovery and merchandising rules

- Departments and categories are the primary browse structure; brands are filters or secondary brand landing routes only (D-015).
- Collections such as “Chocolate work” or “Small-batch essentials” are curated, non-taxonomic sets and cannot replace a product’s primary classification.
- Recipes form the eighth department and may surface related products through explicit mappings; product availability never determines whether a recipe remains published.
- Products may carry controlled `applications` such as `cake`, `cupcake`, `cookie`, `bread`, `chocolate_work`, `fondant_work`, `piping`, `gifting`, and `micro_bakery_batching`. These describe use/discovery, not verified performance.
- Dietary, certification, food-contact, temperature-safety, quality or popularity labels are not taxonomy nodes and cannot be inferred.

## Publication validation

A taxonomy/product record is blocked from publication when:

- a department/category pairing is outside the controlled map;
- a subcategory belongs to a different category;
- a parent product lacks a supported family or publishable variant;
- a variant appears as an independent duplicate parent merely because pack size differs;
- a food and a non-food item share an ambiguous family assignment;
- a title, variant axis and normalized quantity/dimension conflict;
- a brand is represented as a seller or marketplace storefront;
- a critical ingredient, allergen or storage field is absent instead of using the explicit tri-state representation in the data model.

## Traceability and assumptions

- D-015 fixes all eight department labels and keeps brands secondary.
- D-012 fixes retailer-led, non-marketplace structure; Phase 2A Brand Architecture fixes fictional brands below Pantryform.
- Phase 1 F1–F3 and `Catalog_Terminology_and_Attributes.md` support middle-depth navigation, family schemas and consolidated variants.
- D-017 controls unknown critical data.
- **Assumption:** the category breadth above is adequate for the 24–30-product demo; product coverage validation may collapse unused optional subcategories but may not change the approved departments without a new decision.

