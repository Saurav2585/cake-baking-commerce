import { describe, expect, it } from "vitest";
import {
  BRAND_NAMES,
  catalog,
  recipes,
  recipeMappings,
  resolveMedia,
  variantsBySku,
} from "./catalog";

describe("canonical catalog projection", () => {
  it("joins every approved real product and SKU", () => {
    expect(catalog).toHaveLength(48);
    expect(variantsBySku.size).toBe(51);
    expect(
      catalog.every(
        (product) =>
          product.variants.length > 0 && product.brandName && product.media.src,
      ),
    ).toBe(true);
  });

  it("preserves recipe and mapping counts", () => {
    expect(recipes).toHaveLength(6);
    expect(recipeMappings).toHaveLength(18);
  });

  it("exposes no stale fictional brand", () => {
    const fictionalBrandIds = [
      "brand_measureloom",
      "brand_fieldnote",
      "brand_nibform",
      "brand_tintfold",
      "brand_fillmark",
      "brand_detailbench",
      "brand_formstead",
      "brand_packplane",
    ];
    for (const id of fictionalBrandIds) {
      expect(BRAND_NAMES[id]).toBeUndefined();
    }
    expect(
      catalog.every((product) => product.id.startsWith("prod_real_")),
    ).toBe(true);
  });

  it("resolves media for a product that shares one packshot across pack-size variants", () => {
    const product = catalog.find((p) => p.variants.length > 1)!;
    const [first, second] = product.variants;
    // Real photography intentionally reuses one packshot per product line unless
    // packaging genuinely differs between pack sizes — both variants resolve to the
    // same product-level image rather than a fabricated variant-specific photo.
    expect(resolveMedia(product.id, first.id).assetId).toBe(
      resolveMedia(product.id, second.id).assetId,
    );
  });
});
