// R2B1 real-catalog asset validator.
//
// Replaces the Phase 5A/5B validator, which hardcoded assumptions specific to the
// fictional, deterministically-generated SVG product catalog (fixed count of 24,
// required "PORTFOLIO DEMO"/"PANTRYFORM" baked-in label text, a single
// `deterministic_svg_pack_and_manual_label_composite` source method). Those checks do
// not apply to real, sourced product photography and have been removed. This
// validator instead enforces the R2B1 real-catalog rules: every product has exactly
// one real (or honestly-placeholdered) packshot record with resolvable relationships,
// a verifiable local file with a matching checksum and dimensions, non-empty alt
// text, and a provenance block — and no fictional catalog data leaks through.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const repoRoot = path.resolve(root, "..", "..");
const manifestPath = path.join(root, "Catalog_Asset_Manifest.json");
// Derivative paths are consumed by src/lib/domain/catalog.ts's publicAssetPath(),
// which strips a leading "exports/" (the Phase 5A/5B convention) and serves everything
// from public/assets/catalog/. New real-catalog paths already omit that prefix.
const resolveDerivativePath = (derivativePath) =>
  path.join(repoRoot, "public/assets/catalog", derivativePath.replace(/^exports\//, ""));
// Master paths are provenance-only (never served) — new real-catalog masters are
// repo-root-relative ("public/..."); kept Phase 5A/5B masters are relative to this
// production_artifacts/05_catalog_production/ directory ("masters/...").
const resolveMasterPath = (masterPath) =>
  masterPath.startsWith("public/") ? path.join(repoRoot, masterPath) : path.join(root, masterPath);
const fail = (m) => {
  throw new Error(m);
};
const hash = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");

function dimensions(p) {
  const b = fs.readFileSync(p);
  if (p.endsWith(".svg")) {
    const s = b.toString("utf8", 0, 500);
    const w = Number(s.match(/\bwidth="(\d+)"/)?.[1]);
    const h = Number(s.match(/\bheight="(\d+)"/)?.[1]);
    if (!w || !h) fail(`Unreadable SVG dimensions ${p}`);
    return { width: w, height: h };
  }
  if (p.endsWith(".png")) {
    if (b.toString("hex", 0, 8) !== "89504e470d0a1a0a") fail(`Invalid PNG ${p}`);
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  if (p.endsWith(".webp")) {
    if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP")
      fail(`Invalid WebP ${p}`);
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8 ") {
      const i = 20;
      return { width: b.readUInt16LE(i + 6) & 0x3fff, height: b.readUInt16LE(i + 8) & 0x3fff };
    }
    if (kind === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    fail(`Unsupported WebP chunk ${kind} ${p}`);
  }
  if (p.endsWith(".jpg") || p.endsWith(".jpeg")) {
    if (b.readUInt16BE(0) !== 0xffd8) fail(`Invalid JPEG ${p}`);
    let offset = 2;
    while (offset < b.length) {
      if (b[offset] !== 0xff) break;
      const marker = b[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }
      const segLength = b.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: b.readUInt16BE(offset + 7), height: b.readUInt16BE(offset + 5) };
      }
      offset += 2 + segLength;
    }
    fail(`Unreadable JPEG dimensions ${p}`);
  }
  fail(`Unsupported format ${p}`);
}

const FICTIONAL_BRAND_IDS = [
  "brand_measureloom",
  "brand_fieldnote",
  "brand_nibform",
  "brand_tintfold",
  "brand_fillmark",
  "brand_detailbench",
  "brand_formstead",
  "brand_packplane",
];
const isRemoteUrl = (value) => /^https?:\/\//i.test(value ?? "");

(async () => {
  const m = JSON.parse(fs.readFileSync(manifestPath));
  if (m.manifest_schema_version !== "1.0.0") fail("Unsupported manifest schema");

  const productData = JSON.parse(fs.readFileSync(path.join(root, "Product_Master_Data.json")));
  const skuData = JSON.parse(fs.readFileSync(path.join(root, "SKU_Variant_Data.json")));
  const recipeData = JSON.parse(fs.readFileSync(path.join(root, "Recipe_Master_Data.json")));
  const products = productData.products;
  const productIds = new Set(products.map((x) => x.id));
  const skus = new Set(skuData.variants.map((x) => x.sku));
  const recipeIds = new Set(recipeData.recipes.map((x) => x.id));

  // No stale fictional catalog leakage.
  for (const product of products) {
    if (FICTIONAL_BRAND_IDS.includes(product.brand_id))
      fail(`Stale fictional brand on ${product.id}: ${product.brand_id}`);
    if (!product.id.startsWith("prod_real_")) fail(`Non-real product ID in canonical catalog: ${product.id}`);
  }

  if (m.catalog_scope.product_count !== products.length)
    fail(`catalog_scope.product_count (${m.catalog_scope.product_count}) disagrees with product master (${products.length})`);

  const ids = new Set();
  const localPaths = new Set();
  const productPackshots = m.records.filter((r) => r.asset_family === "product_packshot");
  const editorial = m.records.filter((r) => r.asset_family === "recipe" || r.asset_family === "department");

  for (const r of m.records) {
    if (ids.has(r.asset_id)) fail(`Duplicate asset_id ${r.asset_id}`);
    ids.add(r.asset_id);
    if (
      r.relationships.product_ids.some((x) => !productIds.has(x)) ||
      r.relationships.skus.some((x) => !skus.has(x)) ||
      r.relationships.recipe_ids.some((x) => !recipeIds.has(x))
    )
      fail(`Unresolved data relationship on ${r.asset_id}`);
    if (!r.alt_text?.text?.trim()) fail(`Missing alt text on ${r.asset_id}`);

    for (const f of [r.master, ...r.derivatives]) {
      if (isRemoteUrl(f.path)) fail(`Hotlinked/remote production image URL on ${r.asset_id}: ${f.path}`);
    }
    const masterAbsolute = resolveMasterPath(r.master.path);
    if (!fs.existsSync(masterAbsolute)) fail(`Missing master for ${r.asset_id}: ${r.master.path}`);
    if (!r.master.checksum?.value) fail(`Missing source hash on ${r.asset_id} master`);
    if (hash(masterAbsolute) !== r.master.checksum.value) fail(`Master checksum drift ${r.master.path}`);
    for (const file of r.derivatives) {
      const absolute = resolveDerivativePath(file.path);
      if (!fs.existsSync(absolute)) fail(`Missing public asset for ${r.asset_id}: ${file.path}`);
      localPaths.add(absolute);
      if (!file.checksum?.value) fail(`Missing source hash on ${r.asset_id} derivative ${file.path}`);
      if (hash(absolute) !== file.checksum.value) fail(`Checksum drift ${file.path}`);
      const dims = dimensions(absolute);
      if (dims.width !== file.width || dims.height !== file.height) fail(`Dimension mismatch ${file.path}`);
    }
  }

  // Every product has exactly one primary packshot record, resolvable and provenanced.
  if (productPackshots.length !== products.length)
    fail(`Expected ${products.length} product packshot records, found ${productPackshots.length}`);
  for (const product of products) {
    const owned = productPackshots.filter(
      (r) => r.role === "primary" && r.relationships.product_ids.includes(product.id),
    );
    if (owned.length !== 1) fail(`${product.id} must resolve to exactly one primary packshot record`);
    const record = owned[0];
    if (!record.provenance) fail(`${record.asset_id} is missing a provenance block`);
    if (!record.provenance.confidence_status) fail(`${record.asset_id} is missing confidence_status`);
    if (record.status === "approved") {
      if (!record.provenance.source_url) fail(`${record.asset_id} is approved but missing source_url`);
      if (isRemoteUrl(record.master.path)) fail(`${record.asset_id} master must be a local file, not a remote URL`);
    } else if (record.status === "pending_sourcing") {
      if (!record.master.path.includes("_placeholder"))
        fail(`${record.asset_id} is pending_sourcing but does not use the honest placeholder asset`);
    } else {
      fail(`${record.asset_id} has an unsupported status: ${record.status}`);
    }
  }

  // Recipe and department editorial coverage, kept from the prior phases.
  const recipes = editorial.filter((r) => r.asset_family === "recipe");
  if (recipes.length !== recipeIds.size || recipes.some((r) => !["recipe_hero", "recipe_listing"].every((p) => r.derivatives.some((d) => d.purpose === p))))
    fail("Recipe crop gap");
  const depts = new Set(editorial.filter((r) => r.asset_family === "department").flatMap((r) => r.relationships.department_ids));
  if (depts.size !== 7) fail("Department relationship coverage gap");

  const sourcedCount = productPackshots.filter((r) => r.status === "approved").length;
  const missingCount = productPackshots.length - sourcedCount;

  console.log(
    JSON.stringify(
      {
        status: "PASS",
        records: m.records.length,
        productPackshots: productPackshots.length,
        productsSourced: sourcedCount,
        productsMissingImage: missingCount,
        editorialRecordsKept: editorial.length,
        localAssetFilesVerified: localPaths.size,
      },
      null,
      2,
    ),
  );
})().catch((e) => {
  console.error(`FAIL: ${e.message}`);
  process.exit(1);
});
