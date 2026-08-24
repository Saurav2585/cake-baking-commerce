# Phase 5B catalog asset review harness

Static, dependency-free review surface for Phase 5B catalog-scale asset and content-fit validation. This is not production UI and does not redefine approved commerce or UX behaviour.

## Serve

From repository root:

```sh
python3 -m http.server 4175
```

Open `http://127.0.0.1:4175/design_review/phase_5b/?view=contact`.

## Views and coverage

| Query | Review purpose |
|---|---|
| `?view=contact` | 24 product + 6 recipe contact sheet |
| `?view=departments` | eight-department visual differentiation |
| `?view=plp` | PLP/search density, live filtering and empty state |
| `?view=products` | full product/pack/price/SKU content audit |
| `?view=variants` | cocoa three-pack hierarchy and selector state |
| `?view=recipes` | six-recipe editorial family |
| `?view=mappings` | recipe-to-cart mapping hierarchy |
| `?view=states` | fallback, loading, unavailable and error patterns |
| `?view=stress` | long-name, dimensions, facts and narrow fit |

Add `&text=200` for the bounded 200% text stress mode or `&images=off` for the no-visual equivalent. Review at 1440, 768, 390 and 320 CSS px. `globalThis.__phase5bErrors` collects runtime/resource failures for browser inspection.

## Asset status

Every normal product, recipe, department, variant and recipe-mapping placement uses an approved derivative recorded in `production_artifacts/05_catalog_production/Catalog_Asset_Manifest.json` and stored in `production_artifacts/05_catalog_production/exports/`. The error-handler, `images=off` mode and Failure states view preserve names, pack facts and controls when imagery is unavailable. The recipes department uses an approved recipe derivative because its visual family is represented by six recipe assets rather than a separate department record.

All product identities, prices and availability are fictional demo content. Recipe imagery is illustrative and is not a guaranteed result. Critical unknown facts render “Information not provided.”

## Final validation

- Static validator: 24 products, six recipes, nine views and 49 manifest-backed placement derivatives; zero missing or unmanifested files.
- Browser matrix: all nine views at 1440, 768, 390 and 320 CSS px, plus 390/320 200% text and image-disabled stress cases (40 cases total).
- Result: zero failed requests, incomplete images, runtime/console errors or horizontal overflow.
