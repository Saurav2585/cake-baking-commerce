# Product and Variant Data Model

**Phase:** 2B — Catalog, Commerce and Information Architecture  
**Owner:** Catalog/Commerce Architecture  
**Status:** Review-ready specialist input  
**Binding decisions:** D-003, D-012, D-013, D-015, D-017

## Modeling principles

- Parent products hold shared identity and factual content; sellable variants hold SKU-specific commerce facts.
- Fields are typed and family-scoped. There is no universal free-text size or colour field.
- Original fictional brands and demo prices/availability are explicitly identified as such.
- Critical unknowns are represented, displayed and queryable; absence never becomes a favourable claim.
- Quantities are stored canonically for comparison while retaining authored display values.
- This logical contract is provider-neutral and localization-ready; it does not prescribe a database or framework.

## Reusable value types

### Tri-state factual value

```text
Fact<T> =
  { status: "known", value: T, source_id: string, verified_on: ISODate }
  | { status: "information_not_provided" }
  | { status: "not_applicable" }
```

`information_not_provided` renders exactly **“Information not provided”** for critical ingredient, allergen and storage information (D-017). `not_applicable` is allowed only when the field genuinely cannot apply to that family. A bare `null`, empty string or omitted required fact is invalid. `source_id` identifies internal demo provenance; it does not imply external certification.

### Localized text

```text
LocalizedText = { locale: "en-IN", text: string }
```

V1 authors only `en-IN`; the structure permits later locales without placing translated strings inside IDs.

### Quantity and dimension

```text
MeasuredValue = {
  kind: "mass" | "volume" | "length" | "count";
  value: positive decimal;
  unit: "g" | "kg" | "ml" | "L" | "mm" | "cm" | "inch" | "count";
  canonical_value: positive decimal;
  canonical_unit: "g" | "ml" | "mm" | "count";
  display_label: string;
}
```

Exact conversions: `1 kg = 1000 g`; `1 L = 1000 ml`; `1 cm = 10 mm`; `1 inch = 25.4 mm`; count is integral and cannot convert to another kind. Decimal arithmetic must avoid binary floating-point drift. Original authored unit and label remain visible.

### Provenance

```text
Provenance = {
  status: "fictional_demo" | "source_verified" | "information_not_provided";
  source_id?: string;
  observed_or_authored_on: ISODate;
  notes?: string;
}
```

All fictional demo identities, prices and availability use `fictional_demo`. `source_verified` is permitted only with a retrievable source record.

## Parent product contract

| Field | Type | Requirement and rule |
|---|---|---|
| `id` | stable `prod_` ID | Required, immutable, unique. |
| `slug` | string | Required, unique, kebab-case; retain redirects after change. |
| `brand_id` | stable `brand_` ID | Required; resolves to an original fictional product brand, secondary to Pantryform. |
| `title` | `LocalizedText` | Required factual product name; must not embed a pack value represented by a variant axis. |
| `short_description` | `LocalizedText` | Required factual description; no certification, popularity, performance or food claim without evidence. |
| `department_id` | controlled ID | Required; exactly one approved department. |
| `category_id` | controlled ID | Required and must belong to department. |
| `subcategory_id` | ID or absent | Optional; must belong to category. |
| `product_family` | controlled enum | Required; selects family fields and allowed axes. |
| `variant_axes` | ordered axis definitions | Required, possibly empty for a single default variant; values still live on variants. |
| `applications` | controlled tag IDs[] | Optional discovery uses; not performance claims. |
| `media` | `Media[]` | Required primary image plus optional gallery; shared fallback media. |
| `critical_facts` | family-dependent facts | Required tri-state ingredient/allergen/storage facts for food families. |
| `family_attributes` | tagged family object | Required; schema must match `product_family`. |
| `provenance` | `Provenance` | Required. |
| `seo` | `SEOFields` | Required before publish. |
| `status` | `draft | published | archived` | Required lifecycle state. |

`SEOFields` contains `title`, `description`, `canonical_slug`, optional `image_id`, and `indexing: index | noindex`. It cannot introduce claims absent from the factual product record.

`Media` contains immutable `id`, asset-manifest reference, type, source/provenance, width, height, alt-text intent, focal point and ordered role (`primary`, `gallery`, `variant`). Decorative images use an explicit empty-alt intent. Generated media is not publishable until recorded in the Asset Manifest.

## Sellable variant/SKU contract

| Field | Type | Requirement and rule |
|---|---|---|
| `id` | stable `var_` ID | Required, immutable, unique. |
| `parent_product_id` | `prod_` ID | Required. |
| `sku` | string | Required, immutable after commerce use, globally unique. |
| `axis_values` | typed map | Exactly one allowed value for every parent axis; no extra axes. |
| `price_inr_minor` | non-negative integer | Required demo price in paise; display as INR. |
| `compare_at_inr_minor` | integer or absent | Optional; when present must exceed current price and share currency. It does not prove a real discount history. |
| `normalized_sell_quantity` | `MeasuredValue` or dimension/set object | Required where meaningful; must agree with axes and label. |
| `unit_price` | derived value or not applicable | Computed from price and comparable canonical quantity; never authored independently. |
| `availability` | controlled enum | Required demo state: `available`, `low_demo_stock`, `unavailable`, `discontinued`. No live-inventory implication. |
| `variant_media_id` | media ID or absent | Optional; falls back to parent primary media. |
| `provenance` | `Provenance` | Required for price and availability. |
| `status` | `draft | published | archived` | Required. |

Unit price is meaningful for homogeneous consumables sold by mass/volume/count and comparable package units. It is `price_inr_minor / canonical_value`, displayed against an understandable basis (for example ₹/100 g, ₹/100 ml, ₹/count). It is `not_applicable` for sets with unlike components, dimensions alone, reusable tools and bakeware. Sort calculations use an unrounded decimal; display rounds currency to two decimal places.

## Typed variant axes

| Axis | Type | Appropriate use | Invalid use |
|---|---|---|---|
| `pack_quantity` | mass or volume `MeasuredValue` | Ingredients, chocolate, colours, flavours, fillings, fondant | Bakeware dimensions |
| `colour` | controlled colour ID + factual display name | Fondant, colour products, applicable decor/tools | Inferring material, flavour or suitability |
| `form` | controlled family enum | Block/buttons/chips; gel/liquid/powder; rolled/paste | Free-text marketing labels |
| `dimensions` | structured 1D/2D/3D measured values + shape | Pans, moulds, tools, boards, boxes | Net quantity for consumables |
| `set_count` | positive integer count | Multi-piece tools/bakeware sets | Packaging retail pack count |
| `cavity_count` | positive integer count | Multi-cavity mould/pan | Product pack count |
| `pack_count` | positive integer count | Boards, boxes, liners, bags, decor pieces | Net weight |

Axes are exposed only when the family uses them and at least one meaningful choice exists. A variant can combine axes, such as packaging `dimensions + pack_count`, provided every combination is explicitly modeled; impossible combinations are absent, not disabled phantom SKUs.

## Family-specific attribute contracts

All facts below are `Fact<T>` when their truth depends on product evidence. “Required” means the fact wrapper must exist; its status may be `information_not_provided` where allowed, never inferred.

| Family | Required/conditional attributes | Explicitly prohibited inference |
|---|---|---|
| `ingredient_dry`, `ingredient_liquid` | ingredient list, allergen declaration, storage, form, shelf-life if provided, use/dilution if provided, packaging type | Free-from, vegetarian/vegan, certification, bake stability |
| `chocolate` | subtype, chocolate style (dark/milk/white), form, ingredients, allergens, storage, cocoa %, fat %, fluidity and tempering requirement when provided | Quality, origin prestige, heat resistance, suitability |
| `cocoa` | cocoa type, form, ingredients, allergens, storage, cocoa/fat values when provided | Purity, quality or alkalisation not evidenced |
| `chocolate_inclusion` | form, ingredients, allergens, storage, application when provided | Melt resistance or bake stability |
| `colour` | colour family/name, form/medium, base/carrier and compatible application when provided, ingredients, allergens, storage | “Edible,” natural, allergen-free or chocolate-safe |
| `flavour` | flavour profile, type (essence/extract/emulsion), carrier/solubility/use rate when provided, ingredients, allergens, storage | Strength, purity or natural origin |
| `filling` | flavour, texture/fluidity, ready-to-use/dilution, ingredients, allergens, storage/after-opening storage, bake/freeze stability when provided | Fruit percentage or stability |
| `fondant`, `decorating_consumable` | type, form, ingredients, allergens, storage, application/working guidance when provided | Dietary status, food contact, climate performance |
| `bakeware` | internal dimensions, material, finish, shape, cavity/set count where applicable, care, verified compatibility/temperature tolerance when provided | Oven/freezer/dishwasher safety, durability, warranty |
| `tool` | dimensions where relevant, material, set count, intended task, care, sharp/heat-use note when provided | Professional quality, durability, heat safety |
| `packaging` | internal dimensions, material, pack count/MOQ, colour/window, assembly form, GSM and compatibility when provided | Food-contact safety, capacity, grease resistance, sustainability |
| `presentation_material` | material, dimensions/count, intended presentation role and non-edible distinction | Edibility, food-contact safety or biodegradability |

Food-family `ingredients`, `allergens` and `storage` wrappers are always present. For a non-food family they use `not_applicable` only when genuinely irrelevant; safety/compatibility data that could matter uses `information_not_provided` rather than optimistic omission.

## Deterministic validation and publication blockers

1. **Identity:** IDs, slug and SKU are unique; every foreign key resolves; archived parents accept no new published variants.
2. **Taxonomy:** department/category/subcategory and family combinations match `Catalog_Taxonomy.md`.
3. **Axis completeness:** each variant has exactly the parent’s axes, typed values and a unique axis-value tuple.
4. **Quantity agreement:** parseable quantity/dimension tokens in a variant label or SKU display title must equal the typed axis and normalized quantity. A parent title must not contradict or freeze an axis value. Any mismatch blocks publication.
5. **Conversion:** canonical values equal the exact conversions above and must be positive; counts are integers.
6. **Commerce ownership:** price, compare-at, availability and variant image are read only from the selected variant, never shadowed on the parent.
7. **Price:** compare-at exceeds price; currency is INR; unit price is derived only for comparable quantity kinds.
8. **Critical truth:** required Fact wrappers exist. Unknown ingredients/allergens/storage render “Information not provided”; no fallback copy asserts absence or suitability.
9. **Media:** every referenced generated asset exists in the Asset Manifest; alt intent is present.
10. **Claims:** prohibited claims or certifications require a source and content approval; fictional provenance cannot support them.
11. **Demo disclosure:** published price and availability retain `fictional_demo`; customer-facing commerce surfaces disclose simulation.

## Example shape (illustrative, not seed data)

```text
Parent: prod_example_chocolate
  family: chocolate
  variant_axes: [pack_quantity, form]
Variants:
  var_example_500g_buttons: SKU DEMO-CHO-500-BTN, 500 g, buttons, ₹demo, available
  var_example_1kg_buttons:  SKU DEMO-CHO-1K-BTN, 1 kg, buttons, ₹demo, unavailable
```

The example demonstrates structure only; it is not a product, price or availability claim.

## Assumptions and unresolved implementation choices

- **Assumption:** INR minor units are paise even if v1 display prices are whole rupees.
- **Assumption:** availability states are fixture-driven and explicitly demo-only.
- Provider, persistence, validation-library and indexing choices remain engineering decisions after architecture approval.
- A later catalog coverage matrix must prove each record has the correct family contract and that the 24–30-product set spans the approved scope.

