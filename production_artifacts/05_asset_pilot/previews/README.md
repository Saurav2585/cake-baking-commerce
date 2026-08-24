# Phase 5A Review Evidence

## Contact sheets

- `asset_pf5a_selected_contact_sheet_v1.png` — final foundations, three-pack family, comparison, macro and fallback.
- `asset_pf5a_selected_contact_sheet_grayscale_v1.png` — information-resilience review without hue.

## Deterministic browser captures

Desktop 1440×1000: homepage, department, PLP, PDP, recipe, recipe bridge and failure. Mobile: homepage at both 390×844 and 320×844; PLP/PDP/recipe at 390×844; failure at 320×844. Special evidence: `placement_pdp_320_text200_v1.jpg` and `placement_pdp_image_disabled_320x844_v1.jpg`.

The homepage files were refreshed during targeted rework. The 1440×1000 evidence is captured losslessly from an isolated fresh desktop tab, manually inspected, then deterministically JPEG-encoded to avoid the browser capture encoder defect that corrupted the prior file. The mobile captures prove the `<picture>` source selects `asset_pf5a_home_cocoa_mobile_819x1024_v1.webp` at 390 and 320 CSS px.

All captures are viewport screenshots from `design_review/phase_5a/`; filenames encode route, viewport and version. They are review evidence, not production assets. Every image file in this directory is recorded in `Pilot_Asset_Manifest.json`.
