# Phase 5B preview index
- `asset_pf5b_product_contact_sheet_v1.png` — all 24 catalog parent primaries in catalog order.
- `asset_pf5b_variant_contact_sheet_v1.png` — all 38 exact-SKU media records, including quantity and dimension changes.
- `asset_pf5b_packaging_label_closeups_v1.png` — five manually composed label and product-form close-ups.
- `asset_pf5b_plp_thumbnail_grayscale_test_v1.png` — all 24 parent thumbnails at 120 px in grayscale for silhouette/recognition review.
- `asset_pf5b_editorial_contact_sheet_v1.png` — seven generated material-led department visuals followed by six generated recipe visuals, all from text-free approved sources.

Contact sheets are review aids and are not implementation assets. All five system sheets were manually inspected at original resolution after the targeted rework; engineering consumes only files listed in `Catalog_Asset_Manifest.json`.

## Deterministic placement evidence

- `placement_home_editorial_desktop_1440_v2.png` and `placement_home_editorial_mobile_390x844_v2.png` — opening and editorial discovery.
- `placement_departments_desktop_1440x1000_v2.png` — department atlas.
- `placement_plp_desktop_1440x1000_v2.png` and `placement_plp_mobile_390x844_v2.png` — product-listing density and thumbnail recognition.
- `placement_pdp_desktop_1440x1000_v2.png` and `placement_pdp_mobile_390x844_v2.png` — representative product detail and art-directed responsive placement.
- `placement_multivariant_pdp_desktop_1440x1000_v2.png` — visible pack changes and selector hierarchy.
- `placement_recipes_desktop_1440x1000_v2.png` — six-recipe editorial family.
- `placement_recipe_to_cart_desktop_1440x1000_v2.png` — recipe amount, selected pack and leftover hierarchy.
- `placement_all_assets_grayscale_1440x1000_v2.png` — live manifest-complete form and contrast view (150 derivatives).
- `placement_image_failure_mobile_390x844_v2.png` — image-disabled/failure equivalence.
- `placement_stress_320x720_text200_v2.png` — narrow 320 px and bounded 200% text stress.

All refreshed placement captures were manually opened after browser validation. The captured routes reported zero runtime errors, incomplete images and horizontal overflow.

## Canonical-truth correction

The placement set at commit `4fe3cbf15ada23b82802b0507fe3f737add4b83d` accurately demonstrated the visual assets but rendered stale hardcoded catalog values. Those captures are superseded as catalog-truth evidence. Refreshed truth-review screenshots are generated only after the browser bundle is rebuilt from canonical Phase 5B sources and exact harness reconciliation passes.

Reviewers must verify visible Fieldnote relationships, canonical titles/SKUs/INR fixtures and smallest-sufficient recipe pack choices in the refreshed PLP, products table, PDP, multi-variant PDP, recipe-to-cart, search/filter and 320 px stress captures. A screenshot command completing does not establish acceptance; each refreshed file must be manually opened and inspected.

The canonical-truth `v3` evidence set is:

- `placement_plp_desktop_1440x1000_v3.png` and `placement_plp_mobile_390x844_v3.png`;
- `placement_products_table_desktop_1440x1000_v3.png`;
- `placement_pdp_desktop_1440x1000_v3.png` and `placement_pdp_mobile_390x844_v3.png`;
- `placement_multivariant_pdp_desktop_1440x1000_v3.png`;
- `placement_recipe_to_cart_desktop_1440x1000_v3.png`;
- `placement_search_results_cocoa_desktop_1440x1000_v3.png`;
- `placement_stress_320x720_text200_v3.png`.

All nine files were manually opened after capture. The final clean-server matrix covered all 12 views at 1440, 768, 390 and 320 CSS px (48 checks) with zero runtime/console errors, broken images or horizontal overflow.
