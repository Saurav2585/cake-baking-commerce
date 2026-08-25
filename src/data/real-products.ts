/**
 * Recovery R2A — representative real-product records for homepage merchandising only.
 *
 * Sourced from the R1 visual sample (`design_review/recovery_r1/product_board/`);
 * full provenance for every entry lives in
 * `design_review/recovery_r1/catalog/Product_Provenance_Register.md`.
 *
 * These are NOT part of the canonical fictional catalog that powers PLP/PDP/cart
 * persistence (`src/lib/domain/catalog.ts`) — that rebuild is out of scope for R2A.
 * Records here exist only to render believable homepage rails with real packshots,
 * and can still be added to the demo cart/wishlist via the shared commerce provider.
 */

export type RealProductBadge = "bestseller" | "new" | "essential" | "tool";
export type RealProductDepartment =
  | "ingredients"
  | "chocolate"
  | "colours-flavours"
  | "fillings-fondant"
  | "decorating"
  | "bakeware-tools"
  | "packaging";

export interface RealProduct {
  id: string;
  sku: string;
  brand: string;
  title: string;
  department: RealProductDepartment;
  packLabel: string;
  priceInr: number;
  image: { src: string; alt: string; width: number; height: number };
  badges: RealProductBadge[];
  note?: string;
}

export const realProducts: RealProduct[] = [
  {
    id: "rp_callebaut_811",
    sku: "DEMO-REAL-CALLEBAUT-811",
    brand: "Callebaut",
    title: "811 Dark Chocolate Callets",
    department: "chocolate",
    packLabel: "400 g",
    priceInr: 950,
    image: {
      src: "/real-products/callebaut-811-callets.png",
      alt: "Small round discs of Callebaut 811 dark chocolate callets in a pile",
      width: 1116,
      height: 1176,
    },
    badges: ["bestseller"],
  },
  {
    id: "rp_morde_compound_slab",
    sku: "DEMO-REAL-MORDE-SLAB",
    brand: "Morde",
    title: "Dark Compound Chocolate Slab",
    department: "chocolate",
    packLabel: "500 g",
    priceInr: 250,
    image: {
      src: "/real-products/morde-dark-compound-slab.jpg",
      alt: "Flat slab of Morde dark compound chocolate in its packaging",
      width: 679,
      height: 679,
    },
    badges: ["essential"],
  },
  {
    id: "rp_weikfield_baking_powder",
    sku: "DEMO-REAL-WEIKFIELD-BPOW",
    brand: "Weikfield",
    title: "Double Action Baking Powder",
    department: "ingredients",
    packLabel: "100 g",
    priceInr: 40,
    image: {
      src: "/real-products/weikfield-baking-powder.jpg",
      alt: "Weikfield double action baking powder in a poly jar",
      width: 679,
      height: 679,
    },
    badges: ["bestseller", "essential"],
  },
  {
    id: "rp_eagle_icing_sugar",
    sku: "DEMO-REAL-EAGLE-ICING",
    brand: "Eagle",
    title: "Icing Sugar",
    department: "ingredients",
    packLabel: "200 g",
    priceInr: 55,
    image: {
      src: "/real-products/eagle-icing-sugar.png",
      alt: "Eagle icing sugar in a 200 gram pouch",
      width: 800,
      height: 800,
    },
    badges: ["essential"],
  },
  {
    id: "rp_magic_colours_gel_red",
    sku: "DEMO-REAL-MAGICCOLOURS-RED",
    brand: "Magic Colours",
    title: "Spectral Gel Colour — Red",
    department: "colours-flavours",
    packLabel: "25 g",
    priceInr: 180,
    image: {
      src: "/real-products/magic-colours-gel-red.jpg",
      alt: "Bottle of Magic Colours Spectral gel food colour in red",
      width: 500,
      height: 500,
    },
    badges: ["bestseller"],
  },
  {
    id: "rp_urban_platter_vanilla",
    sku: "DEMO-REAL-URBANPLATTER-VANILLA",
    brand: "Urban Platter",
    title: "Premium Vanilla Extract",
    department: "colours-flavours",
    packLabel: "100 ml",
    priceInr: 280,
    image: {
      src: "/real-products/urban-platter-vanilla-extract.jpg",
      alt: "Bottle of Urban Platter premium vanilla extract",
      width: 2000,
      height: 2000,
    },
    badges: ["new"],
  },
  {
    id: "rp_bakersville_vizyon_fondant",
    sku: "DEMO-REAL-BAKERSVILLE-FONDANT",
    brand: "Bakersville",
    title: "Vizyon Sugar Paste — White",
    department: "fillings-fondant",
    packLabel: "1 kg",
    priceInr: 450,
    image: {
      src: "/real-products/bakersville-vizyon-fondant-white.jpg",
      alt: "Tub of Bakersville Vizyon white sugar paste fondant",
      width: 580,
      height: 580,
    },
    badges: ["essential"],
  },
  {
    id: "rp_nutella_spread",
    sku: "DEMO-REAL-NUTELLA-SPREAD",
    brand: "Nutella (Ferrero)",
    title: "Hazelnut Spread with Cocoa",
    department: "fillings-fondant",
    packLabel: "200 g",
    priceInr: 250,
    image: {
      src: "/real-products/nutella-hazelnut-spread.jpg",
      alt: "Jar of Nutella hazelnut spread with cocoa",
      width: 679,
      height: 679,
    },
    badges: ["new"],
  },
  {
    id: "rp_jvg_sprinkles",
    sku: "DEMO-REAL-JVG-SPRINKLES",
    brand: "JVG",
    title: "Rainbow Sprinkles",
    department: "decorating",
    packLabel: "1 kg",
    priceInr: 380,
    image: {
      src: "/real-products/jvg-rainbow-sprinkles.jpg",
      alt: "Close-up of loose JVG multi-coloured rainbow decoration sprinkles",
      width: 318,
      height: 500,
    },
    badges: ["new"],
    note: "R1's staged image for this line depicted rainbow sprinkles rather than the chocolate vermicelli variant originally registered; the listing was retitled to match the photographed product rather than the image being swapped.",
  },
  {
    id: "rp_wilton_decorating_bags",
    sku: "DEMO-REAL-WILTON-BAGS",
    brand: "Wilton",
    title: "16-Inch Disposable Decorating Bags",
    department: "bakeware-tools",
    packLabel: "12-pack",
    priceInr: 450,
    image: {
      src: "/real-products/wilton-decorating-bags.jpg",
      alt: "Box of Wilton 16-inch disposable decorating bags, 12-count",
      width: 679,
      height: 679,
    },
    badges: ["bestseller", "tool"],
  },
  {
    id: "rp_lukzer_decorating_kit",
    sku: "DEMO-REAL-LUKZER-KIT",
    brand: "Lukzer",
    title: "Cake Decorating Kit with Turntable",
    department: "bakeware-tools",
    packLabel: "46-piece kit (approx.)",
    priceInr: 650,
    image: {
      src: "/real-products/lukzer-cake-decorating-kit.jpg",
      alt: "Lukzer cake decorating kit with rotating turntable and tool set",
      width: 679,
      height: 667,
    },
    badges: ["tool"],
    note: "Listing photographed a bundled decorating kit rather than a standalone turntable; carried forward from the R1 provenance correction.",
  },
  {
    id: "rp_ecobags_cake_box",
    sku: "DEMO-REAL-ECOBAGS-BOX",
    brand: "Eco Bags India",
    title: "Cake Box with Window",
    department: "packaging",
    packLabel: "8×8×4 in · fits ~1 kg cake",
    priceInr: 28,
    image: {
      src: "/real-products/eco-bags-cake-box.jpg",
      alt: "Folded brown cake box with a display window",
      width: 600,
      height: 600,
    },
    badges: ["new", "tool"],
  },
];

export const realProductsById = new Map(realProducts.map((p) => [p.id, p]));

export function realProductsByBadge(badge: RealProductBadge): RealProduct[] {
  return realProducts.filter((product) => product.badges.includes(badge));
}

export function realProductsByDepartment(
  department: RealProductDepartment,
): RealProduct[] {
  return realProducts.filter((product) => product.department === department);
}

export const REAL_PRODUCT_SKUS = realProducts.map((p) => p.sku);

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

export const departmentTileImage: Record<
  RealProductDepartment,
  { src: string; alt: string }
> = {
  ingredients: {
    src: "/real-products/eagle-icing-sugar.png",
    alt: "Eagle icing sugar pouch representing the ingredients department",
  },
  chocolate: {
    src: "/real-products/callebaut-811-callets.png",
    alt: "Callebaut dark chocolate callets representing the chocolate department",
  },
  "colours-flavours": {
    src: "/real-products/magic-colours-gel-red.jpg",
    alt: "Magic Colours gel colour representing the colours and flavours department",
  },
  "fillings-fondant": {
    src: "/real-products/bakersville-vizyon-fondant-white.jpg",
    alt: "Bakersville fondant representing the fillings and fondant department",
  },
  decorating: {
    src: "/real-products/jvg-rainbow-sprinkles.jpg",
    alt: "JVG rainbow sprinkles representing the decorating department",
  },
  "bakeware-tools": {
    src: "/real-products/lukzer-cake-decorating-kit.jpg",
    alt: "Lukzer cake decorating kit representing the bakeware and tools department",
  },
  packaging: {
    src: "/real-products/eco-bags-cake-box.jpg",
    alt: "Cake box with window representing the packaging department",
  },
};
