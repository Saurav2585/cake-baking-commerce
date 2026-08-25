"use client";

import Image from "next/image";
import { formatINR } from "@/lib/domain/catalog";
import type { RealProduct, RealProductBadge } from "@/data/real-products";
import { useCommerce } from "./commerce-provider";

const BADGE_LABEL: Record<RealProductBadge, string> = {
  bestseller: "Bestseller",
  new: "New",
  essential: "Essential",
  tool: "Tool pick",
};
const BADGE_PRIORITY: RealProductBadge[] = [
  "bestseller",
  "new",
  "essential",
  "tool",
];

export function RealProductCard({
  product,
  priority = false,
}: {
  product: RealProduct;
  priority?: boolean;
}) {
  const { wishlist, toggleWishlist, addLine } = useCommerce();
  const saved = wishlist.includes(product.id);
  const badge = BADGE_PRIORITY.find((b) => product.badges.includes(b));
  const pricePaise = product.priceInr * 100;

  return (
    <article className="rp-card">
      {badge && <span className="rp-badge">{BADGE_LABEL[badge]}</span>}
      <button
        type="button"
        className="wishlist-toggle rp-wishlist"
        aria-pressed={saved}
        onClick={() => toggleWishlist(product.id, product.title)}
      >
        {saved ? "Saved" : "Save"}
      </button>
      <div className="rp-image">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 22vw"
        />
      </div>
      <p className="eyebrow">{product.brand}</p>
      <h3>{product.title}</h3>
      <div className="card-facts">
        <span>{product.packLabel}</span>
        <strong>{formatINR(pricePaise)}</strong>
      </div>
      <p className="availability available">In demo stock · demo fixture</p>
      <button
        type="button"
        className="button primary rp-add"
        onClick={() =>
          addLine({
            sku: product.sku,
            quantity: 1,
            observedUnitPricePaise: pricePaise,
            productId: product.id,
            variantId: `${product.id}_default`,
            productTitle: product.title,
            variantLabel: product.packLabel,
            brandName: product.brand,
            sources: [{ kind: "manual" }],
          })
        }
      >
        Quick add
      </button>
    </article>
  );
}
