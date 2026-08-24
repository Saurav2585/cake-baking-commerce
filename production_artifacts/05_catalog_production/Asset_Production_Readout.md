# Phase 5B Asset Production Readout

## Outcome

The approved Measurefield visual direction and Phase 5A packaging grammar now scale across the complete 24-product, retailer-led multi-brand demo catalog without changing Phase 5A files. The targeted product rework contains 24 identifiable product-primary families with 480 px thumbnails and 38 exact-SKU variant-owned media records. Every sellable SKU now has atomic media, exceeding the minimum multi-option coverage so pack, volume, count and dimension facts never depend on an ambiguous parent image.

## Production method

- `tools/build_catalog_assets.js` is the source of truth for original procedural SVG masters, hand-composed labels and deterministic WebP derivatives.
- Thirteen approved, text-free generated editorial sources live in `masters/generated/`; the builder preserves that directory and creates deterministic wide/square or hero/listing WebP crops from those sources.
- `Editorial_Generation_Prompts.md` records the full shared direction and all thirteen subject prompts. Manifest records point back to the relevant prompt heading and disclose generated provenance.
- Product identity, form, exact visible quantity, SKU and portfolio disclosure are manually composed as editable SVG label text; no generated text or regulatory panel is used.
- Consumables expose a product-form cue—powder mound, sugar crystal, almond flake, raisin, compound block, chip, colour, filling/fondant/glaze or sprinkle—inside a coherent fictional pack family. Non-consumables use truthful object geometry and measurement cues.
- The product asset ID convention is `asset_pf5b_prod_<product-id-without-prefix>_primary`; recipe derivative IDs use `asset_pf5b_recipe_<recipe-id-without-prefix>_{hero|listing}`.
- Existing Phase 5A imagery and approved Measureloom cocoa family remain untouched. Phase 5B cocoa studies are implementation derivatives, not replacements for the pilot approvals.
- The catalog manifest records provenance, relationship IDs, alt decisions, dimensions, byte sizes, SHA-256 checksums, review states and limitations for every master and derivative.

## Coverage

| Family | Masters | Derivatives | Required use |
|---|---:|---:|---|
| Product parent | 24 | 48 | Primary 1200² and thumbnail 480² |
| Variant-owned | 38 | 76 | Every exact sellable SKU, including mass, volume, count and dimension states |
| Recipe editorial | 6 generated PNG | 12 | 1536×1024 hero and 800×600 listing |
| Department | 7 generated PNG | 14 | 1536×1024 masthead and intentional 800² crop |
| **Total** | **75** | **150** | **225 manifested files** |

## Truth and implementation boundaries

The system is intentionally illustrative, not commercial packaging photography. It contains no FSSAI number, nutrition panel, barcode, MRP, batch/date data, certification, dietary claim, origin claim, performance promise, review or guaranteed recipe result. Each visible label says “Portfolio prototype · not for sale”; commerce facts remain owned by the product and SKU data rather than inferred from imagery.

Variant-owned media is supplied for all 38 sellable SKUs. Engineering must map every `variant_media_id` explicitly and update product, price, availability and media atomically; the parent primary is a listing/default representation, not a substitute for a selected SKU.

## Review aids

- `previews/asset_pf5b_product_contact_sheet_v1.png`: all 24 product parent primaries.
- `previews/asset_pf5b_variant_contact_sheet_v1.png`: all 38 atomic SKU images.
- `previews/asset_pf5b_packaging_label_closeups_v1.png`: deterministic label evidence.
- `previews/asset_pf5b_plp_thumbnail_grayscale_test_v1.png`: 120 px grayscale recognition evidence.
- `previews/asset_pf5b_editorial_contact_sheet_v1.png`: seven department and six recipe families.
- `Asset_Production_QA_Report.md`: automated integrity and manual visual inspection evidence.

## Known limitations

- Procedural illustrations are production-ready for the portfolio demo, not cleared commercial product photography or packaging artwork.
- Formal legal/trade-dress, food-label and commercial licence review remains mandatory before real retail use.
- Product facts, prices and availability must continue to come from approved catalog fixtures; artwork is never the authoritative source.
