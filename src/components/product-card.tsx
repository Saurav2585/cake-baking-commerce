"use client";

import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/domain/catalog";
import type { CatalogProduct } from "@/lib/domain/types";
import { useCommerce } from "./commerce-provider";

export function ProductCard({
  product,
  index,
}: {
  product: CatalogProduct;
  index?: number;
}) {
  const { wishlist, toggleWishlist } = useCommerce();
  const variant = product.variants[0];
  const saved = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="card-index">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </div>
      <Link className="product-image" href={`/products/${product.slug}`}>
        <Image
          src={product.media.thumbnailSrc}
          alt={product.media.alt}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 24vw"
        />
      </Link>
      <button
        className="wishlist-toggle"
        aria-pressed={saved}
        onClick={() => toggleWishlist(product.id, product.title)}
      >
        {saved ? "Saved" : "Save"}
      </button>
      <p className="eyebrow">
        {product.brandName} ·{" "}
        {product.category_id.replace("cat_", "").replaceAll("_", " ")}
      </p>
      <h2>
        <Link href={`/products/${product.slug}`}>{product.title}</Link>
      </h2>
      <div className="card-facts">
        <span>{variant.normalized_sell_quantity.display_label}</span>
        <strong>{formatINR(variant.price_inr_minor)}</strong>
      </div>
      <p className={`availability ${variant.availability}`}>
        {variant.availability.replaceAll("_", " ")} · demo fixture
      </p>
    </article>
  );
}
