"use client";

import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/domain/catalog";
import type { CatalogProduct } from "@/lib/domain/types";
import { useCommerce } from "./commerce-provider";

/** A real photo is missing when the resolved asset's alt text carries this
 * marker phrase (set by the catalog production pipeline for a genuine
 * sourcing gap) — data-driven, never a hardcoded product ID/brand. */
function isPlaceholderMedia(alt: string) {
  return alt.toLowerCase().includes("image not yet available");
}

/**
 * Converged product card for every catalog-driven surface:
 * - `variant="grid"` (default): PLP/category/search grid and PDP related
 *   products — the `.product-card` visual language from
 *   Route_UI_Specification.md §1.3.
 * - `variant="rail"`: the homepage's curated rails, reusing the existing
 *   `.rp-card` family of rules verbatim.
 * The root element always keeps `product-card` as its class (rail adds the
 * `product-card--rail` modifier) so `.product-card` selectors keep working
 * across both variants. `badge` is optional curatorial text (e.g.
 * "Bestseller") supplied by the caller — the canonical catalog has no
 * badge field of its own, so grid callers normally omit it.
 */
export function ProductCard({
  product,
  variant = "grid",
  badge,
}: {
  product: CatalogProduct;
  variant?: "grid" | "rail";
  badge?: string;
}) {
  const { wishlist, toggleWishlist, addLine } = useCommerce();
  const saved = wishlist.includes(product.id);
  const isRail = variant === "rail";
  const factsVariant = product.variants[0];
  const singleVariant =
    product.variants.length === 1 ? product.variants[0] : null;
  const placeholder = isPlaceholderMedia(product.media.alt);

  const handleQuickAdd = () => {
    if (!singleVariant) return;
    addLine({
      sku: singleVariant.sku,
      quantity: 1,
      observedUnitPricePaise: singleVariant.price_inr_minor,
      productId: product.id,
      variantId: singleVariant.id,
      productTitle: product.title,
      variantLabel: singleVariant.normalized_sell_quantity.display_label,
      brandName: product.brandName,
      sources: [{ kind: "manual" }],
    });
  };

  const wishlistButton = (
    <button
      type="button"
      className={`${isRail ? "rp-wishlist" : "product-wishlist"}${saved ? " is-saved" : ""}`}
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${product.title} from wishlist`
          : `Save ${product.title} to wishlist`
      }
      title={saved ? "Saved to wishlist" : "Save to wishlist"}
      onClick={() => toggleWishlist(product.id, product.title)}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="currentColor"
          d="M12 20.6 3.6 12.2C1.5 10 1.5 6.7 3.6 4.6c2-2 5.3-2 7.3.1L12 5.8l1.1-1.1c2-2.1 5.3-2.1 7.3-.1 2.1 2.1 2.1 5.4 0 7.6L12 20.6Z"
        />
      </svg>
    </button>
  );

  const factsBlock = (
    <>
      <div className="card-facts">
        <span>{factsVariant.normalized_sell_quantity.display_label}</span>
        <strong>{formatINR(factsVariant.price_inr_minor)}</strong>
      </div>
      <p className={`availability ${factsVariant.availability}`}>
        {factsVariant.availability.replaceAll("_", " ")} · demo fixture
      </p>
    </>
  );

  if (isRail) {
    return (
      <article className="product-card product-card--rail">
        {badge && <span className="rp-badge">{badge}</span>}
        {wishlistButton}
        <Link className="rp-image" href={`/products/${product.slug}`}>
          {placeholder ? (
            <span className="placeholder-copy">Image not yet available</span>
          ) : (
            <Image
              src={product.media.src}
              alt={product.media.alt}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 22vw"
            />
          )}
        </Link>
        <p className="eyebrow">{product.brandName}</p>
        <h3>
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>
        {factsBlock}
        {singleVariant ? (
          <button
            type="button"
            className="button primary rp-add"
            onClick={handleQuickAdd}
          >
            Quick add
          </button>
        ) : (
          <Link
            href={`/products/${product.slug}#variant-selector`}
            className="button rp-add"
          >
            Select options
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="product-card">
      {badge && <span className="product-badge">{badge}</span>}
      {wishlistButton}
      <Link
        className={`product-image-canvas${placeholder ? " is-placeholder" : ""}`}
        href={`/products/${product.slug}`}
      >
        {placeholder ? (
          <span className="placeholder-copy">Image not yet available</span>
        ) : (
          <Image
            src={product.media.thumbnailSrc}
            alt={product.media.alt}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          />
        )}
      </Link>
      <p className="eyebrow">
        {product.brandName} ·{" "}
        {product.category_id.replace("cat_", "").replaceAll("_", " ")}
      </p>
      <h2>
        <Link href={`/products/${product.slug}`}>{product.title}</Link>
      </h2>
      {factsBlock}
      {singleVariant ? (
        <button
          type="button"
          className="button primary product-add"
          onClick={handleQuickAdd}
        >
          <span className="label-full">Quick add</span>
          <span className="label-compact">Add</span>
        </button>
      ) : (
        <Link
          href={`/products/${product.slug}#variant-selector`}
          className="button product-add"
        >
          <span className="label-full">Select options</span>
          <span className="label-compact">Options</span>
        </Link>
      )}
    </article>
  );
}
