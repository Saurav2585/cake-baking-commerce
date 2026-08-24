# Asset Pilot QA Report

**Result:** PASS — ready for external review
**Date:** 2026-08-25 (Asia/Kolkata)
**Scope:** isolated Phase 5A assets and placement prototype only

## Factual and visual review

- All visible product copy matches `Pilot_Fact_Lock.md`: `prod_demo_baking_cocoa`, powder form, three exact weights/SKUs, Measureloom prototype relationship and explicit unknown Ingredients/Allergens/Storage.
- Text search found no certification, FSSAI, barcode, MRP, batch/date, manufacturer, origin, health, dietary, purity, performance, review or guarantee copy.
- All final packaging typography is deterministic SVG. Generated images are text-free editorial foundations and never supply label copy.
- The three packs share structure/camera/light and progress 72% / 84% / 100% in visible height. Weight, silhouette and one/two/four measure bars differentiate without colour alone.
- Full-resolution inspection found no broken seams, fake label text, wrong ingredient form or real-brand/competitor resemblance. Formal legal/trade-dress clearance remains outside this prototype review.

## Crop, placement and accessible behavior

| Check | Evidence / result |
|---|---|
| Desktop/mobile crops | Homepage 3:2/4:5, department 3:2/1:1 and recipe 3:2/4:3/process exports preserve required subjects; PASS |
| PLP/PDP at 320 px | Seven routes at 320 CSS px; zero horizontal overflow; pack facts stay HTML; PASS |
| 160 px / 96 px | PLP placement visibly tests both; small copy is not relied on; weight/silhouette and adjacent HTML survive; PASS |
| 200% text | All seven routes at 320 px via deterministic `text=200`; zero overflow; PASS |
| Image disabled | All seven routes via `images=off`; headings, facts, navigation and actions remain; zero overflow; PASS |
| Image failure | Dedicated fallback route and 320/1440 captures retain identity/facts/action; PASS |
| Grayscale | `previews/asset_pf5a_selected_contact_sheet_grayscale_v1.png`; size and bar-count differentiation remain; PASS |
| Colour-vision resilience | No fact/selection depends on hue; written weights, SKU and pressed state remain; PASS |
| Alt text | Contextual decisions are manifested; hero/fallback/redundant label views are decorative, department/recipe/pack studies informative; PASS |
| Variant ownership | Browser selected 1 kg and atomically resolved `ML-BCP-1000`, exact image and alt; PASS |

## Technical validation

- Browser matrix: 7 views × 4 widths (1440, 768, 390, 320) = 28 checks; all images loaded after corrected server root, every H1 present, zero final overflow.
- A syntax defect discovered before evidence capture was corrected; `node --check` passes final `app.js` and both asset tools.
- Browser interaction produced no page error state. The local-server log showed only the expected favicon miss; all final asset requests returned successfully.
- Exports are WebP at quality 82–84; masters remain editable SVG or full-resolution PNG. Every photographic derivative is native-size or smaller than its 1536×1024 foundation; no upscaling is used. Bulk production should generate larger source masters where a placement requires them.
- Manifest validation: `validate_manifest.js` passes every required field, file existence, unique ID/version, generated lineage, licence, alt decision, approval and SHA-256 checksum. All master/export/review images are manifested.
- Repository scan excludes secrets, `.env`, provider credentials, browser profiles and temporary generation files.

## Evidence

See `previews/README.md` for the selected contact sheets and fourteen deterministic browser placement captures. The generic-template test passes: measurement fields, graduated pack sizes, cocoa material studies and the recipe-to-pack transition remain baking-specific when brand and colour are disregarded.

## Limitations / release boundary

The pilot is approved only for external design review. Generated photo rights are recorded as original prototype assets with commercial clearance unassessed. The product/recipe records, pouch geometry and Measureloom name are proposals. No bulk generation, production application integration or commercial packaging is authorized.
