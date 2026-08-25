import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "production_artifacts/05_catalog_production");
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(dataDir, name), "utf8"));
const products = read("Product_Master_Data.json").products;
const variants = read("SKU_Variant_Data.json").variants;
const mappings = read("Recipe_Product_Mapping.json").mappings;
const manifest = read("Catalog_Asset_Manifest.json").records;
const unique = (rows, key, label) => {
  const values = rows.map((row) => row[key]);
  if (new Set(values).size !== values.length)
    throw new Error(`Duplicate ${label}`);
};
unique(products, "id", "product id");
unique(products, "slug", "product slug");
unique(variants, "id", "variant id");
unique(variants, "sku", "SKU");
const productIds = new Set(products.map((row) => row.id));
for (const product of products)
  for (const key of [
    "id",
    "slug",
    "title",
    "brand_id",
    "department_id",
    "category_id",
  ])
    if (!product[key]) throw new Error(`${product.id}: missing ${key}`);
for (const variant of variants) {
  if (!productIds.has(variant.parent_product_id))
    throw new Error(`${variant.id}: broken parent join`);
  if (!Number.isSafeInteger(variant.price_inr_minor))
    throw new Error(`${variant.id}: unsafe price`);
}
for (const mapping of mappings)
  if (!productIds.has(mapping.product_id))
    throw new Error(`${mapping.recipe_ingredient_id}: invalid product mapping`);
for (const record of manifest)
  for (const derivative of record.derivatives) {
    const relative = derivative.path.replace(/^exports\//, "");
    if (!fs.existsSync(path.join(root, "public/assets/catalog", relative)))
      throw new Error(`Missing public asset: ${relative}`);
  }
if (products.length !== 48 || variants.length !== 51)
  throw new Error(
    `Expected 48 products/51 SKUs; found ${products.length}/${variants.length}`,
  );
console.log(
  `Production adapter validation passed: ${products.length} products, ${variants.length} SKUs, ${mappings.length} recipe mappings, ${manifest.length} asset records.`,
);
