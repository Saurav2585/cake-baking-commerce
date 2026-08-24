export type Availability =
  | "available"
  | "low_demo_stock"
  | "unavailable"
  | "discontinued";
export type MeasureKind = "mass" | "volume" | "length" | "count";

export type Money = Readonly<{ currency: "INR"; amountPaise: number }>;
export type Measure = Readonly<{
  kind: MeasureKind;
  value: number;
  unit: string;
}>;

export interface CanonicalProduct {
  id: string;
  slug: string;
  brand_id: string;
  title: string;
  department_id: string;
  category_id: string;
  subcategory_id: string;
  product_family: string;
  variant_axes: string[];
  applications: string[];
}

export interface CanonicalVariant {
  id: string;
  parent_product_id: string;
  sku: string;
  axis_values: Record<string, string>;
  normalized_sell_quantity: {
    kind: MeasureKind;
    value: number;
    unit: string;
    canonical_value: number;
    canonical_unit: string;
    display_label: string;
  };
  price_inr_minor: number;
  availability: Availability;
}

export interface CatalogMedia {
  assetId: string;
  src: string;
  thumbnailSrc: string;
  alt: string;
  width: number;
  height: number;
}

export interface CatalogProduct extends CanonicalProduct {
  brandName: string;
  variants: CanonicalVariant[];
  media: CatalogMedia;
  content: Record<string, unknown>;
}

export interface PackOption {
  variantId: string;
  sku: string;
  quantity: number;
  pricePaise: number;
}

export interface PackSelection {
  required: number;
  purchased: number;
  leftover: number;
  packCount: number;
  totalPricePaise: number;
  lines: Array<PackOption & { count: number }>;
}

export type CartLineSource =
  | { kind: "manual" }
  | {
      kind: "recipe";
      recipeId: string;
      recipeRevision: string;
      mappingId: string;
    };

export interface CartLine {
  sku: string;
  quantity: number;
  observedUnitPricePaise: number;
  productId: string;
  variantId: string;
  productTitle: string;
  variantLabel: string;
  brandName: string;
  sources: CartLineSource[];
}

export interface CartState {
  schemaVersion: 1;
  revision: number;
  lines: CartLine[];
}

export type CartAction =
  | { type: "add"; line: CartLine }
  | { type: "setQuantity"; sku: string; quantity: number }
  | { type: "remove"; sku: string }
  | { type: "clear" };
