// Builds the real-product-photography records for Catalog_Asset_Manifest.json from
// .asset_build_output.json (written by normalize_real_assets.py) and
// real_catalog_source.mjs, merging them with the existing recipe/department editorial
// records (kept as-is) and replacing the old 24-product fictional product_packshot set.
import { readFileSync, writeFileSync } from "node:fs";
import { PRODUCTS } from "./real_catalog_source.mjs";

const root = new URL("..", import.meta.url).pathname;
const toolsDir = new URL(".", import.meta.url).pathname;

const buildOutput = JSON.parse(
  readFileSync(toolsDir + ".asset_build_output.json", "utf8"),
).records;
const buildByProductId = new Map(buildOutput.map((r) => [r.product_id, r]));

const existingManifest = JSON.parse(
  readFileSync(root + "Catalog_Asset_Manifest.json", "utf8"),
);
const keptRecords = existingManifest.records.filter(
  (r) => r.asset_family === "recipe" || r.asset_family === "department",
);

const skusByProduct = new Map(PRODUCTS.map((p) => [p.id, p.variants.map((v) => v.sku)]));

// resolveMedia() in src/lib/domain/catalog.ts turns a derivative `path` into a public
// URL via `/assets/catalog/${path.replace(/^exports\//, "")}` — so derivative paths here
// must be relative to public/assets/catalog/, not repo-root-relative.
const toPublicAssetRelativePath = (repoRelativePath) =>
  repoRelativePath.replace(/^public\/assets\/catalog\//, "");

const now = "2026-08-25T00:00:00.000Z";
const productRecords = PRODUCTS.map((p) => {
  const build = buildByProductId.get(p.id);
  if (!build) throw new Error(`No asset build output for ${p.id}`);
  const skus = skusByProduct.get(p.id);
  return {
    manifest_schema_version: "1.0.0",
    asset_id: `asset_real_${p.slug.replaceAll("-", "_")}`,
    version: 1,
    status: build.status === "sourced" ? "approved" : "pending_sourcing",
    title: `${p.brand} ${p.title}`,
    asset_family: "product_packshot",
    role: "primary",
    relationships: {
      product_ids: [p.id],
      variant_ids: [],
      skus,
      recipe_ids: [],
      department_ids: [p.dept],
    },
    source_method: build.status === "sourced" ? "real_product_photograph" : "missing_image_placeholder",
    creator: build.status === "sourced" ? "third_party_brand_or_retailer" : "pantryform_internal_placeholder",
    created_at: now,
    provenance: {
      confidence_status: p.confidence,
      source_url: p.imageSourceUrl,
      source_type: p.imageSourceType,
      source_access_date: "2026-08-25",
      replacement_note: p.replacementNote ?? null,
      usage_note:
        build.status === "sourced"
          ? "Third-party brand/manufacturer imagery used for portfolio/demo purposes only; not owned by Pantryform. No watermark removal, trademark alteration, or misleading packaging edit was made."
          : "No real photo has been sourced yet for this product. This is an honest placeholder graphic, not a fabricated or AI-recreated product image.",
    },
    master: {
      path: build.master.path,
      format: build.master.path.split(".").pop(),
      width: build.master.width,
      height: build.master.height,
      checksum: { algorithm: "sha256", value: build.master.sha256 },
    },
    derivatives: [
      {
        purpose: "primary",
        path: toPublicAssetRelativePath(build.primary.path),
        format: "webp",
        width: build.primary.width,
        height: build.primary.height,
        checksum: { algorithm: "sha256", value: build.primary.sha256 },
      },
      {
        purpose: "thumbnail",
        path: toPublicAssetRelativePath(build.thumbnail.path),
        format: "webp",
        width: build.thumbnail.width,
        height: build.thumbnail.height,
        checksum: { algorithm: "sha256", value: build.thumbnail.sha256 },
      },
    ],
    alt_text: {
      text:
        build.status === "sourced"
          ? `${p.brand} ${p.title}, ${p.subcategoryLabel}.`
          : `${p.brand} ${p.title} — product image not yet available.`,
    },
  };
});

const merged = {
  ...existingManifest,
  generated_at: now,
  catalog_scope: {
    product_count: PRODUCTS.length,
    variant_owned_media_count: 0,
    recipe_count: existingManifest.catalog_scope.recipe_count,
    department_visual_count: existingManifest.catalog_scope.department_visual_count,
    real_product_sourced_count: productRecords.filter((r) => r.status === "approved").length,
    real_product_missing_count: productRecords.filter((r) => r.status !== "approved").length,
  },
  records: [...keptRecords, ...productRecords],
};

writeFileSync(root + "Catalog_Asset_Manifest.json", JSON.stringify(merged, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      total_records: merged.records.length,
      kept_editorial: keptRecords.length,
      product_records: productRecords.length,
      sourced: merged.catalog_scope.real_product_sourced_count,
      missing: merged.catalog_scope.real_product_missing_count,
    },
    null,
    2,
  ),
);
