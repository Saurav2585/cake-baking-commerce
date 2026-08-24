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
| `?view=home` | Homepage opening, ingredient discovery and editorial recipe bridge |
| `?view=contact` | 24 product + 6 recipe contact sheet |
| `?view=assets` | Every visual derivative loaded directly from the final manifest; add `&mode=grayscale` for silhouette review |
| `?view=departments` | eight-department visual differentiation |
| `?view=plp` | PLP/search density, live filtering and empty state |
| `?view=products` | full product/pack/price/SKU content audit |
| `?view=variants` | cocoa three-pack hierarchy and selector state |
| `?view=pdp` | Representative PDP desktop/mobile, pack thumbnails, variant facts and recipe connection |
| `?view=recipes` | six-recipe editorial family |
| `?view=mappings` | recipe-to-cart mapping hierarchy |
| `?view=states` | fallback, loading, unavailable and error patterns |
| `?view=stress` | long-name, dimensions, facts and narrow fit |

Add `&text=200` for the bounded 200% text stress mode, `&images=off` for the no-visual equivalent, or `&mode=grayscale` on the all-assets view for form/contrast evidence. Review at 1440, 768, 390 and 320 CSS px. `globalThis.__phase5bErrors` collects runtime/resource failures for browser inspection.

## Asset status

Every normal product, recipe, department, variant and recipe-mapping placement uses a derivative recorded in `production_artifacts/05_catalog_production/Catalog_Asset_Manifest.json` and stored in `production_artifacts/05_catalog_production/exports/`. The manifest-complete view loads every final visual derivative, including variant-owned media and deterministic label close-ups when present. The error-handler, `images=off` mode and Failure states view preserve names, pack facts and controls when imagery is unavailable. The recipes department uses an approved recipe derivative because its visual family is represented by six recipe assets rather than a separate department record.

All product identities, prices and availability are fictional demo content. Recipe imagery is illustrative and is not a guaranteed result. Critical unknown facts render “Information not provided.”

## Final validation

- Static validator: 24 products, six recipes, 12 views, 49 explicit placements and all 150 final manifest derivatives; zero missing or unmanifested files.
- Deterministic browser evidence: homepage/editorial, departments, PLP desktop/mobile, PDP desktop/mobile, multi-variant PDP, recipes, recipe-to-cart, manifest-complete grayscale, image failure, and 320 px/200% text.
- Browser result for the refreshed evidence set: zero failed requests, incomplete images, runtime/console errors or horizontal overflow.
- Every screenshot listed in the preview index was manually opened after capture. A completed automated command alone was not treated as visual approval.
