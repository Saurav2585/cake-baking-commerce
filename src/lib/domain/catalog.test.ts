import { describe, expect, it } from "vitest";
import {
  catalog,
  recipes,
  recipeMappings,
  resolveMedia,
  variantsBySku,
} from "./catalog";

describe("canonical catalog projection", () => {
  it("joins every approved product and SKU", () => {
    expect(catalog).toHaveLength(24);
    expect(variantsBySku.size).toBe(38);
    expect(
      catalog.every(
        (product) =>
          product.variants.length > 0 && product.brandName && product.media.src,
      ),
    ).toBe(true);
  });

  it("preserves recipe and mapping counts", () => {
    expect(recipes).toHaveLength(6);
    expect(recipeMappings).toHaveLength(27);
  });

  it("resolves variant-owned media", () => {
    const variant = catalog.find((product) => product.variants.length > 1)!
      .variants[1];
    const variantMedia = resolveMedia(variant.parent_product_id, variant.id);
    expect(variantMedia.assetId).not.toBe(
      resolveMedia(variant.parent_product_id).assetId,
    );
    expect(variantMedia.assetId).toContain(
      variant.id.replace(/^var_/, "").replaceAll("_", "-"),
    );
  });
});
