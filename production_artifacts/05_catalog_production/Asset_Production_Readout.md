# Phase 5B Asset Production Readout

## Outcome

The approved Measurefield visual direction and Phase 5A packaging grammar now scale across the complete 24-product, retailer-led multi-brand demo catalog without changing Phase 5A files. The implementation set contains 24 product-primary families with 480 px thumbnails, six exact-SKU variant-owned media studies for visibly different pack/dimension states, six recipe listing/hero families and seven department crop families.

## Production method

- `tools/build_catalog_assets.js` is the source of truth for original procedural SVG masters, hand-composed labels and deterministic WebP derivatives.
- Product identity, visible pack basis and prototype disclosure are composed as SVG text; no generated text or regulatory panel is used.
- The product asset ID convention is `asset_pf5b_prod_<product-id-without-prefix>_primary`; recipe derivative IDs use `asset_pf5b_recipe_<recipe-id-without-prefix>_{hero|listing}`.
- Existing Phase 5A imagery and approved Measureloom cocoa family remain untouched. Phase 5B cocoa studies are implementation derivatives, not replacements for the pilot approvals.
- The catalog manifest records provenance, relationship IDs, alt decisions, dimensions, byte sizes, SHA-256 checksums, review states and limitations for every master and derivative.

## Coverage

| Family | Masters | Derivatives | Required use |
|---|---:|---:|---|
| Product parent | 24 | 48 | Primary 1200² and thumbnail 480² |
| Variant-owned | 6 | 12 | Three cocoa weights, two pan diameters, one box dimension/count |
| Recipe editorial | 6 | 12 | 1536×1024 hero and 800×600 listing |
| Department | 7 | 14 | 1536×1024 masthead and 800² tile |
| **Total** | **43** | **86** | **129 manifested files** |

## Truth and implementation boundaries

The system is intentionally illustrative, not commercial packaging photography. It contains no FSSAI number, nutrition panel, barcode, MRP, batch/date data, certification, dietary claim, origin claim, performance promise, review or guaranteed recipe result. Each visible label says “Portfolio prototype · not for sale”; commerce facts remain owned by the product and SKU data rather than inferred from imagery.

Variant-owned media is supplied for the highest-risk visible-change sample and demonstrates the binding contract. Engineering must map every `variant_media_id` explicitly, update product/price/availability/media atomically and fall back to the parent primary only when the data contract permits it.

## Review aids

- `previews/asset_pf5b_product_contact_sheet_v1.png`: all 24 product parent primaries.
- `previews/asset_pf5b_editorial_contact_sheet_v1.png`: seven department and six recipe families.
- `Asset_Production_QA_Report.md`: automated integrity and manual visual inspection evidence.

## Known limitations

- Procedural illustrations are production-ready for the portfolio demo, not cleared commercial product photography or packaging artwork.
- Formal legal/trade-dress, food-label and commercial licence review remains mandatory before real retail use.
- Product facts, prices and availability must continue to come from approved catalog fixtures; artwork is never the authoritative source.
