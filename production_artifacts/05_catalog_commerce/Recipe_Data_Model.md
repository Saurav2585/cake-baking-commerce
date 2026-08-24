# Recipe Data Model

**Phase:** 2B — Catalog, Commerce and Information Architecture  
**Owner:** Catalog/Commerce Architecture  
**Status:** Review-ready specialist input  
**Binding decisions:** D-003, D-015, D-016, D-017

## Purpose

Define Pantryform recipes as structured editorial content that can scale servings and produce an auditable recipe-to-cart review. Recipes belong to the Recipes department, remain useful when products are unavailable, and never imply product endorsement.

## Recipe contract

| Field | Type | Rule |
|---|---|---|
| `id` | stable `recipe_` ID | Required, immutable, unique. |
| `slug` | string | Required, unique, kebab-case; published changes retain redirects. |
| `title` | localized text | Required, factual and original. |
| `summary` | localized text | Required; no health, popularity or outcome guarantee. |
| `status` | `draft | published | archived` | Required. |
| `recipe_category` | controlled ID | One Recipes category from the taxonomy. |
| `yield` | structured yield | Required: positive `base_servings` and a display label; optional item count/portion note. |
| `serving_bounds` | min, max, step | Required; positive integers with base within bounds. |
| `timings` | preparation/bake/cool/total minutes | Optional factual values; total must not be less than known components. |
| `difficulty` | controlled editorial enum or absent | Optional `beginner | intermediate | advanced`; descriptive, not a quality claim. |
| `ingredients` | ordered `RecipeIngredient[]` | Required, at least one non-optional ingredient. |
| `steps` | ordered `RecipeStep[]` | Required; stable IDs and non-empty instructions. |
| `tools` | ordered `RecipeTool[]` | Optional recommendations; never silently cart-selected. |
| `applications/tags` | controlled IDs[] | Optional discovery metadata. |
| `media` | media references | Required primary media before publish; Asset Manifest rules apply. |
| `related_product_ids` | typed relationships[] | Optional explicit editorial links; no endorsement implication. |
| `seo` | title, description, canonical slug, image | Required before publish; no unsupported claims. |
| `provenance` | authored/source metadata | Required; distinguishes original demo content from sourced facts. |

## Recipe ingredient contract

```text
RecipeIngredient = {
  id: stable ri_ ID;
  recipe_id: recipe_ ID;
  order: positive integer;
  group_id?: stable group ID;
  ingredient_concept_id: stable concept ID;
  display_name: LocalizedText;
  base_quantity?: RecipeQuantity;
  quantity_text?: string;
  scalable: boolean;
  optional: boolean;
  preparation_note?: LocalizedText;
  pantry_default: "assume_needed" | "suggest_owned";
  mapping_status: "mapped" | "unmapped";
  product_mappings: ProductMapping[];
  substitution_group_ids: stable substitution IDs[];
}
```

`RecipeQuantity` uses `kind: mass | volume | count`, a positive decimal value and canonical `g | ml | count`. Display units may include g, kg, ml, L and count; deterministic supported kitchen units may be added only with an approved conversion table. “Pinch,” “to taste,” or similar non-deterministic amounts use `quantity_text`, set `scalable: false`, and cannot auto-select a sellable pack.

An optional ingredient is never preselected in recipe-to-cart. `suggest_owned` means the review may initially deselect a common pantry item, clearly labeled; it does not assert that the customer owns it. Every selection remains reversible.

## Explicit product mapping

```text
ProductMapping = {
  product_id: prod_ ID;
  compatible_variant_ids?: var_ IDs[];
  conversion: {
    recipe_kind: "mass" | "volume" | "count";
    sell_kind: "mass" | "volume" | "count";
    multiplier: positive decimal;
    rationale: string;
  };
  priority: positive integer;
  status: "preferred" | "compatible" | "substitute";
  constraints?: controlled IDs[];
  provenance: Provenance;
}
```

- Mapping is explicit and reviewed; title similarity, category membership or tags alone never establishes compatibility.
- Same-kind mappings normally use multiplier `1`. Cross-kind mappings require an authored, sourced conversion; no density or piece-weight inference.
- `compatible_variant_ids` absent means all published variants with the required quantity kind are eligible. When present it is an allow-list.
- A preferred mapping determines the initial product candidate, subject to current demo availability. Priority ties resolve by stable product ID.
- Substitutions are explicit alternatives and must disclose conversion and any preparation difference. The model does not infer dietary, allergen, performance or equivalence claims.

## Substitution group

| Field | Rule |
|---|---|
| `id`, `label` | Stable identity and plain-language label. |
| `source_ingredient_id` | Ingredient requirement being replaced. |
| `options` | One or more explicit product/ingredient mappings with conversion and note. |
| `selection_mode` | `one_of`; v1 never combines substitutes automatically. |
| `default_option` | Optional; if absent, user action is required. |
| `risk_note` | Required when outcome, allergen or preparation may differ; must be factual and sourced. |

Choosing a substitution changes only that review line. The original remains visible and restorable. Allergen facts shown for the chosen product come from its tri-state product record, never from the recipe label.

## Recipe tools

```text
RecipeTool = {
  id: stable ID;
  display_name: LocalizedText;
  required_for_method: boolean;
  product_ids: prod_ ID[];
  note?: LocalizedText;
}
```

Tools are recommendations outside the ingredient purchase calculation. Required-for-method means the recipe calls for the tool; it does not authorize selection or addition. Product links are explicit and remain unselected until customer action.

## Scaling rules encoded by the model

`scale_factor = requested_servings / base_servings`.

- For `scalable: true`, `scaled_quantity = base_quantity × scale_factor` using decimal arithmetic and the original quantity kind.
- For `scalable: false`, display the authored amount and “Does not scale automatically”; do not calculate a pack.
- Requested servings must satisfy bounds and step. Invalid input is rejected, not clamped silently.
- Display rounding never changes the canonical requirement used for pack selection. Display at enough precision to distinguish the purchase decision and identify approximation explicitly.

## Relationships

| From | To | Cardinality | Behavior |
|---|---|---:|---|
| Recipe | Recipe ingredient | 1:N | Ordered and grouped. |
| Recipe ingredient | Ingredient concept | N:1 | Stable semantic requirement independent of merchandise. |
| Recipe ingredient | Parent product/variant | N:M | Explicit compatible mappings only. |
| Recipe ingredient | Substitution group | N:M | Optional explicit alternatives. |
| Recipe | Tool | 1:N | Editorial requirement/recommendation; no auto-add. |
| Parent product | Recipe | N:M | Reverse discovery through typed relation. |

## Validation and publication blockers

1. Stable IDs and slugs are unique; ingredient and step order values are unique within their scope.
2. Base servings and bounds are positive; base is in range; step can reach every allowed displayed selection deterministically.
3. Each scalable ingredient has a positive typed base quantity; each non-scalable ingredient has clear quantity text.
4. Every mapping resolves to a published family-compatible product and optional variant allow-list; units are convertible by explicit conversion.
5. Optional ingredients are flagged; no data default may cause automatic selection.
6. Tool records are separate from ingredient records and cannot participate in automatic ingredient selection.
7. Substitute mappings include conversion and disclosure; unsupported suitability/allergen/performance equivalence is blocked.
8. A published recipe may contain unmapped ingredients, but recipe-to-cart must represent them as `unmapped` and never silently omit them.
9. Ingredient, allergen and storage facts displayed for linked products obey the Product and Variant Data Model and D-017.
10. Recipe availability is independent of sellable stock; changing catalog availability cannot unpublish editorial content.

## Assumptions

- V1 serving scaling is linear; recipes requiring non-linear pan/time/process changes must mark affected ingredients non-scalable or supply separately approved scaling instructions.
- V1 mappings cover mass, volume and count only. Household measures require an explicit canonical conversion table before use.
- Recipe authorship and culinary validation are separate content responsibilities; this model does not certify results.

