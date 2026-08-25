// Generates Product_Master_Data.json, SKU_Variant_Data.json and
// Product_Content_Records.json from real_catalog_source.mjs — the R2B1 real-catalog
// migration. Run with: node tools/generate_real_catalog_data.mjs (from
// production_artifacts/05_catalog_production/).
import { writeFileSync } from "node:fs";
import { PRODUCTS } from "./real_catalog_source.mjs";

const products = PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  brand_id: p.brandId,
  title: p.title,
  department_id: p.dept,
  category_id: p.cat,
  subcategory_id: p.subcat,
  product_family: p.family,
  variant_axes: p.variants.length > 1 ? ["pack_quantity"] : [],
  applications: [],
}));

const variants = PRODUCTS.flatMap((p) =>
  p.variants.map((v, index) => ({
    id: `var_${p.id.replace(/^prod_real_/, "")}_${index}`,
    parent_product_id: p.id,
    sku: v.sku,
    axis_values: p.variants.length > 1 ? { pack_quantity: v.pack.label } : {},
    normalized_sell_quantity: {
      kind: v.pack.kind,
      value: v.pack.value,
      unit: v.pack.unit,
      canonical_value: v.pack.canonicalValue,
      canonical_unit: v.pack.canonicalUnit,
      display_label: v.pack.label,
    },
    price_inr_minor: Math.round(v.priceInr * 100),
    availability: v.availability,
  })),
);

const content = PRODUCTS.map((p) => ({
  product_id: p.id,
  short_description: p.description,
  family_attributes: {
    subcategory: {
      status: "known",
      value: p.subcategoryLabel,
      source_id: "r1_provenance_register",
      verified_on: "2026-08-25",
    },
    brand: {
      status: "known",
      value: p.brand,
      source_id: "r1_provenance_register",
      verified_on: "2026-08-25",
    },
  },
  critical_facts: {
    ingredients: { status: "information_not_provided" },
    allergens: { status: "information_not_provided" },
    storage: { status: "information_not_provided" },
  },
  provenance: {
    confidence_status: p.confidence,
    source_url: p.imageSourceUrl,
    source_type: p.imageSourceType,
    replacement_note: p.replacementNote ?? null,
  },
}));

const productMaster = {
  schema_version: "1.0.0",
  provenance: {
    status: "real_product_demo",
    observed_or_authored_on: "2026-08-25",
    register_reference:
      "design_review/recovery_r1/catalog/Product_Provenance_Register.md",
  },
  products,
};
const skuVariant = {
  schema_version: "1.0.0",
  currency: "INR",
  price_unit: "paise",
  fixture_disclosure:
    "Real, verified products with fictional demo pricing and availability; not a live offer or inventory signal.",
  variants,
  record_defaults: {
    compare_at_inr_minor: "absent",
    provenance: { status: "real_product_demo", observed_or_authored_on: "2026-08-25" },
    status: "published",
  },
};
const productContent = {
  schema_version: "1.0.0",
  locale: "en-IN",
  media_resolution:
    "For each product_id, resolve the approved primary whose Catalog Asset Manifest relationships.product_ids contains that ID.",
  fact_rendering: {
    information_not_provided: "Information not provided",
    not_applicable: "Not applicable",
  },
  records: content,
  record_defaults: {
    status: "published",
    provenance: { status: "real_product_demo", observed_or_authored_on: "2026-08-25" },
    seo_policy:
      "Use factual title plus Pantryform; canonical slug comes from product master; no additional claims.",
    media: {
      alt_text_intent:
        "State the factual product identity and visible form only.",
    },
  },
};

const root = new URL("..", import.meta.url).pathname;
writeFileSync(
  root + "Product_Master_Data.json",
  JSON.stringify(productMaster, null, 2) + "\n",
);
writeFileSync(
  root + "SKU_Variant_Data.json",
  JSON.stringify(skuVariant, null, 2) + "\n",
);
writeFileSync(
  root + "Product_Content_Records.json",
  JSON.stringify(productContent, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    { products: products.length, variants: variants.length, content: content.length },
    null,
    2,
  ),
);
