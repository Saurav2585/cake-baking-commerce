/**
 * Recovery R2A/R2B1/R2B2 — homepage merchandising view over the canonical real catalog.
 *
 * This is not a second catalog: every field consumed by the homepage comes directly
 * off the 48-product canonical catalog in `src/lib/domain/catalog.ts`
 * (Product_Master_Data.json / SKU_Variant_Data.json / Catalog_Asset_Manifest.json).
 * This module only picks a representative subset of 12 products and attaches
 * homepage-only curatorial data (which merchandising rail/badge each one appears
 * under) that has no canonical home. Callers use the returned `CatalogProduct`
 * values directly (via `ProductCard`), so add-to-cart and wishlist use the real
 * canonical product/variant/SKU IDs — a line added from the homepage is the same
 * line a future PLP/PDP would add.
 */
import { catalog } from "@/lib/domain/catalog";
import type { CatalogProduct } from "@/lib/domain/types";

export type RealProductBadge = "bestseller" | "new" | "essential" | "tool";
export type RealProductDepartment =
  | "ingredients"
  | "chocolate"
  | "colours-flavours"
  | "fillings-fondant"
  | "decorating"
  | "bakeware-tools"
  | "packaging";

const HOMEPAGE_SELECTION: Record<
  string,
  { badges: RealProductBadge[]; note?: string }
> = {
  prod_real_callebaut_811: { badges: ["bestseller"] },
  prod_real_morde_dark_slab: { badges: ["essential"] },
  prod_real_weikfield_baking_powder: { badges: ["bestseller", "essential"] },
  prod_real_eagle_icing_sugar: { badges: ["essential"] },
  prod_real_magic_colours_gel: { badges: ["bestseller"] },
  prod_real_urban_platter_vanilla: { badges: ["new"] },
  prod_real_bakersville_vizyon_fondant: { badges: ["essential"] },
  prod_real_nutella_spread: { badges: ["new"] },
  prod_real_jvg_rainbow_sprinkles: {
    badges: ["new"],
    note: "R1's staged image for this line depicted rainbow sprinkles rather than the chocolate vermicelli variant originally registered; the listing was retitled to match the photographed product rather than the image being swapped.",
  },
  prod_real_wilton_decorating_bags: { badges: ["bestseller", "tool"] },
  prod_real_lukzer_decorating_kit: {
    badges: ["tool"],
    note: "Listing photographed a bundled decorating kit rather than a standalone turntable; carried forward from the R1 provenance correction.",
  },
  prod_real_eco_bags_cake_box: { badges: ["new", "tool"] },
};

export const homepageSelectedProducts: CatalogProduct[] = catalog.filter(
  (product) => Object.hasOwn(HOMEPAGE_SELECTION, product.id),
);

const homepageProductsById = new Map(
  homepageSelectedProducts.map((product) => [product.id, product]),
);

/** Looks up one homepage-curated product by canonical catalog id. Throws if the
 * id isn't in `HOMEPAGE_SELECTION` — every homepage caller passes a known id. */
export function getHomepageProduct(id: string): CatalogProduct {
  const product = homepageProductsById.get(id);
  if (!product) throw new Error(`Unmapped homepage product: ${id}`);
  return product;
}

export function homepageProductsByBadge(
  badge: RealProductBadge,
): CatalogProduct[] {
  return homepageSelectedProducts.filter((product) =>
    HOMEPAGE_SELECTION[product.id]!.badges.includes(badge),
  );
}

export const departmentDisplay: Record<
  RealProductDepartment,
  { title: string; blurb: string }
> = {
  ingredients: {
    title: "Ingredients",
    blurb: "Flours, sugars, leaveners and pantry add-ins",
  },
  chocolate: {
    title: "Chocolate",
    blurb: "Cocoa, compounds and inclusions",
  },
  "colours-flavours": {
    title: "Colours & Flavours",
    blurb: "Gels, powders, essences and emulsions",
  },
  "fillings-fondant": {
    title: "Fillings & Fondant",
    blurb: "Layer, glaze, cover and model",
  },
  decorating: {
    title: "Decorating",
    blurb: "Piping, sprinkles and finishing detail",
  },
  "bakeware-tools": {
    title: "Bakeware & Tools",
    blurb: "Shape, measure, mix and prepare",
  },
  packaging: {
    title: "Packaging",
    blurb: "Boxes, boards and bags",
  },
};

const DEPARTMENT_TILE_PRODUCT_ID: Record<RealProductDepartment, string> = {
  ingredients: "prod_real_eagle_icing_sugar",
  chocolate: "prod_real_callebaut_811",
  "colours-flavours": "prod_real_magic_colours_gel",
  "fillings-fondant": "prod_real_bakersville_vizyon_fondant",
  decorating: "prod_real_jvg_rainbow_sprinkles",
  "bakeware-tools": "prod_real_lukzer_decorating_kit",
  packaging: "prod_real_eco_bags_cake_box",
};

export const departmentTileImage: Record<
  RealProductDepartment,
  { src: string; alt: string }
> = Object.fromEntries(
  Object.entries(DEPARTMENT_TILE_PRODUCT_ID).map(([department, productId]) => {
    const product = getHomepageProduct(productId);
    return [department, { src: product.media.src, alt: product.media.alt }];
  }),
) as Record<RealProductDepartment, { src: string; alt: string }>;
