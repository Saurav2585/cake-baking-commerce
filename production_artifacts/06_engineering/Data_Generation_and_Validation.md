# Data Generation and Validation

**Phase:** 6 — Production Application Engineering  
**Status:** Binding production-data pipeline contract

## Source of truth

The application consumes only the canonical files indexed by `production_artifacts/05_catalog_production/data/Catalog_Data_Index.json`:

- `Product_Master_Data.json`
- `SKU_Variant_Data.json`
- `Product_Content_Records.json`
- `Recipe_Master_Data.json`
- `Recipe_Product_Mapping.json`
- `Catalog_Asset_Manifest.json`

The approved fictional brand registry supplies the brand-ID/name lookup where the canonical product record references it. Existing Phase 5B validators and their approved conclusions are preserved. React components, tests, route files and generated browser bundles are not catalog sources.

Acceptance counts remain 24 parents, 38 sellable SKUs, 24 content records, six recipes, 45 ingredient lines, 27 explicit mappings and 18 explicit unmapped lines.

## Pipeline

```text
canonical JSON + brand registry + manifest
              |
      source/schema validation
              |
 exact joins + semantic invariants + asset existence
              |
     deterministic projection generator
              |
 typed read-only application data + revision digest
              |
       generated drift/prohibition checks
```

1. Parse every source as data, never by executing it.
2. Validate source shape and semantic constraints before joining.
3. Join by stable IDs: product→brand/content/SKUs/assets and recipe→ingredients/mappings/assets.
4. Sort arrays by an explicit canonical order or stable ID so filesystem/order differences cannot change output.
5. Normalize only representational concerns required by the app (indexes, lookup maps, manifest-relative public paths and precomputed searchable text). Preserve canonical authored values.
6. Emit a typed/read-only derivative and a deterministic source revision digest. Do not copy it manually into components.
7. Format generated output deterministically and fail CI/local verification when regeneration changes committed output unexpectedly.

The generator must not rewrite canonical Phase 5B files. Generated output begins with a notice identifying its sources and generation command.

## Required validation

Validation fails with actionable source path and stable ID when any of the following occurs:

- invalid JSON, missing required field or unexpected critical fact state;
- duplicate product ID/slug, variant ID/SKU, recipe ID/slug, content owner or ingredient ID;
- unresolved parent, brand, content, recipe ingredient, mapping or asset relationship;
- parent/SKU axis mismatch or invalid/duplicate axis tuple;
- non-integer/negative INR minor price, invalid compare-at price or unsafe currency arithmetic input;
- non-positive/incompatible normalized quantities, invalid counts or inconsistent pack labels;
- unapproved availability/status values;
- missing required media ownership, missing file, mismatched manifest path/checksum or absent alt intent;
- recipe line/mapping-status disagreement, invalid compatible variant or unit-kind mismatch;
- failure of the approved smallest-sufficient-pack calculations/tie-break fixtures;
- changed acceptance totals or department distribution without an approved decision;
- product/catalog literals maintained independently in route/component code;
- external/hotlinked asset URLs or prohibited unsupported claims.

Continue invoking the approved Phase 5B validators. The production validator/generator adds application-boundary checks; it does not weaken or replace prior validation.

## Currency and measurement rules

- Retain `price_inr_minor` as a safe non-negative integer and calculate totals in integer paise. Convert to formatted INR text only for display.
- Retain canonical quantity kind/unit/value and authored display labels. Unit conversion is limited to explicitly approved exact conversions or mapping multipliers.
- Recipe scaling uses exact/decimal-safe arithmetic. Pack selection uses unrounded canonical requirements; display rounding never feeds back into the solver.
- The solver enumerates within the approved finite upper bound and ranks by purchased amount, leftover, pack count, distinct SKU count, demo price and stable variant IDs—in that order.

## Runtime consumption

The runtime loader exposes immutable indexes and returns typed results rather than `undefined` assumptions. UI receives presentation projections created from a resolved parent plus selected canonical SKU. It never overlays hand-authored price, brand, pack, availability or fact fallbacks.

Asset URLs resolve through a manifest-backed map to committed local files. A missing relationship is a build failure; runtime error presentation is recovery evidence, not permission to silently substitute a generic product image.

## Persistence reconciliation

Persist only stable SKU/product IDs, integer pack quantities, revision metadata, safe display snapshots required to explain stale entries and recipe attribution. On restore:

1. parse and validate the versioned bounded envelope;
2. reject unknown/newer versions safely;
3. resolve every SKU against current generated data;
4. mark price/availability/catalog changes for explicit review;
5. retain a safe snapshot for a missing SKU but block checkout;
6. discard impossible/hostile fields and announce recovery;
7. never infer a substitute or silently accept changed commerce state.

Wishlist restoration similarly keeps only known product IDs and requires an explicit valid SKU selection before cart addition.

## Commands and reproducibility

The implementation must expose:

```bash
npm run data:validate
npm run data:generate
npm run data:check
```

`data:check` must be suitable for the full verification gate and demonstrate that a clean regeneration is byte-stable. The canonical validator summary and generated revision/counts should be captured in Phase 6 review evidence.

## Test obligations

- Mutation fixtures prove duplicate IDs, broken joins, missing assets, invalid money and stale parallel catalog values fail.
- Golden/count tests cover all 24/38/24/6/45/27/18 canonical records.
- Recipe solver tests cover exact, undersized, repeated/mixed packs, ties, unavailable/unmapped/optional/pantry lines and overrides.
- Cart tests prove SKU-safe merging, integer totals, stale recovery, invalid-storage recovery and checkout blocking.
- Browser tests assert canonical names, brands, SKUs, prices, media, facts and recipe selections on representative routes.

## Change protocol

Canonical content changes require upstream authorization and Phase 5B validation; do not “fix” source truth in generated files. Generator/validator changes require exact diff review, fixture tests and regenerated evidence. Phase 6 may add application projections but may not change approved canonical commerce meaning.

## Assumptions (not confirmed decisions)

- The generated derivative is committed for auditable review and checked for drift; engineering may instead generate during build only if reproducibility and stale-data prevention remain equally testable.
- A content digest based on canonical file bytes is sufficient as a local catalog revision; it is not a public API version.
- Schema tooling is optional. Semantic cross-file validators remain necessary even if JSON Schema or a runtime schema library is added.

