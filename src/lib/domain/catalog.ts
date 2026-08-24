import productsJson from "../../../production_artifacts/05_catalog_production/Product_Master_Data.json";
import variantsJson from "../../../production_artifacts/05_catalog_production/SKU_Variant_Data.json";
import contentJson from "../../../production_artifacts/05_catalog_production/Product_Content_Records.json";
import manifestJson from "../../../production_artifacts/05_catalog_production/Catalog_Asset_Manifest.json";
import recipesJson from "../../../production_artifacts/05_catalog_production/Recipe_Master_Data.json";
import mappingsJson from "../../../production_artifacts/05_catalog_production/Recipe_Product_Mapping.json";
import type {
  CanonicalProduct,
  CanonicalVariant,
  CatalogMedia,
  CatalogProduct,
} from "./types";

export const BRAND_NAMES: Readonly<Record<string, string>> = Object.freeze({
  brand_measureloom: "Measureloom",
  brand_fieldnote: "Fieldnote",
  brand_nibform: "Nibform",
  brand_tintfold: "Tintfold",
  brand_fillmark: "Fillmark",
  brand_detailbench: "Detailbench",
  brand_formstead: "Formstead",
  brand_packplane: "Packplane",
});

type AssetRecord = (typeof manifestJson.records)[number];
const products = productsJson.products as CanonicalProduct[];
const variants = variantsJson.variants as CanonicalVariant[];

function publicAssetPath(path: string): string {
  return `/assets/catalog/${path.replace(/^exports\//, "")}`;
}

function chooseAsset(
  productId: string,
  variantId?: string,
): AssetRecord | undefined {
  const records = manifestJson.records as AssetRecord[];
  if (variantId) {
    const owned = records.find((record) =>
      (record.relationships.variant_ids as readonly string[]).includes(
        variantId,
      ),
    );
    if (owned) return owned;
  }
  return records.find(
    (record) =>
      record.role === "primary" &&
      (record.relationships.product_ids as readonly string[]).includes(
        productId,
      ),
  );
}

export function resolveMedia(
  productId: string,
  variantId?: string,
): CatalogMedia {
  const record = chooseAsset(productId, variantId);
  if (!record)
    throw new Error(`Missing approved media for ${variantId ?? productId}`);
  const primary =
    record.derivatives.find((item) => item.purpose === "primary") ??
    record.derivatives[0];
  const thumbnail =
    record.derivatives.find((item) => item.purpose === "thumbnail") ?? primary;
  return {
    assetId: record.asset_id,
    src: publicAssetPath(primary.path),
    thumbnailSrc: publicAssetPath(thumbnail.path),
    alt: record.alt_text.text,
    width: primary.width,
    height: primary.height,
  };
}

export function resolveRecipeMedia(
  recipeId: string,
  purpose: "listing" | "hero" = "listing",
): CatalogMedia {
  const record = (manifestJson.records as AssetRecord[]).find((item) =>
    (item.relationships.recipe_ids as readonly string[]).includes(recipeId),
  );
  if (!record) throw new Error(`Missing approved recipe media for ${recipeId}`);
  const derivative =
    record.derivatives.find((item) => item.purpose === purpose) ??
    record.derivatives[0];
  return {
    assetId: record.asset_id,
    src: publicAssetPath(derivative.path),
    thumbnailSrc: publicAssetPath(derivative.path),
    alt: record.alt_text.text,
    width: derivative.width,
    height: derivative.height,
  };
}

export const catalog = products.map<CatalogProduct>((product) => {
  const productVariants = variants.filter(
    (variant) => variant.parent_product_id === product.id,
  );
  const content = contentJson.records.find(
    (record) => record.product_id === product.id,
  );
  if (!content || !productVariants.length)
    throw new Error(`Broken canonical product join: ${product.id}`);
  const brandName = BRAND_NAMES[product.brand_id];
  if (!brandName)
    throw new Error(`Unknown fictional brand: ${product.brand_id}`);
  return {
    ...product,
    brandName,
    variants: productVariants,
    media: resolveMedia(product.id),
    content,
  };
});

export const catalogBySlug = new Map(
  catalog.map((product) => [product.slug, product]),
);
export const variantsBySku = new Map(
  variants.map((variant) => [variant.sku, variant]),
);
export const variantsById = new Map(
  variants.map((variant) => [variant.id, variant]),
);
export const recipes = recipesJson.recipes;
export const recipeMappings = mappingsJson.mappings;
export const catalogRevision = `${productsJson.schema_version}:${variantsJson.schema_version}`;

export function formatINR(amountPaise: number): string {
  if (!Number.isSafeInteger(amountPaise) || amountPaise < 0)
    throw new Error("Invalid paise amount");
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}
