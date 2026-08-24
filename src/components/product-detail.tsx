"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { emitAnalytics } from "@/lib/domain/analytics";
import { formatINR, resolveMedia } from "@/lib/domain/catalog";
import type { CatalogProduct } from "@/lib/domain/types";
import { useCommerce } from "./commerce-provider";
type Fact = { status?: string; value?: string };
const factText = (fact: Fact | undefined) =>
  fact?.status === "known"
    ? String(fact.value)
    : fact?.status === "not_applicable"
      ? "Not applicable"
      : "Information not provided";
export function ProductDetail({ product }: { product: CatalogProduct }) {
  const [selectedId, setSelectedId] = useState(
    product.variants.find((v) => v.availability === "available")?.id ??
      product.variants[0].id,
  );
  const [quantity, setQuantity] = useState(1);
  const { addLine, wishlist, toggleWishlist } = useCommerce();
  const variant = product.variants.find((v) => v.id === selectedId)!;
  const media = useMemo(
    () => resolveMedia(product.id, variant.id),
    [product.id, variant.id],
  );
  const content = product.content as {
    family_attributes?: Record<string, Fact>;
    critical_facts?: Record<string, Fact>;
    short_description?: string;
  };
  useEffect(
    () =>
      emitAnalytics({
        name: "product_view",
        productId: product.id,
        sku: variant.sku,
      }),
    [product.id, variant.sku],
  );
  const selectable = !["unavailable", "discontinued"].includes(
    variant.availability,
  );
  const add = () =>
    addLine({
      sku: variant.sku,
      quantity,
      observedUnitPricePaise: variant.price_inr_minor,
      productId: product.id,
      variantId: variant.id,
      productTitle: product.title,
      variantLabel: variant.normalized_sell_quantity.display_label,
      brandName: product.brandName,
      sources: [{ kind: "manual" }],
    });
  return (
    <>
      <section className="pdp-layout">
        <div className="pdp-gallery">
          <div className="pdp-primary">
            <Image
              key={media.src}
              src={media.src}
              alt={media.alt}
              fill
              priority
              sizes="(max-width:768px) 100vw, 58vw"
            />
          </div>
          <div className="variant-thumbs">
            {product.variants.map((v) => {
              const thumb = resolveMedia(product.id, v.id);
              return (
                <button
                  key={v.id}
                  aria-pressed={v.id === variant.id}
                  onClick={() => setSelectedId(v.id)}
                >
                  <Image
                    src={thumb.thumbnailSrc}
                    alt=""
                    width={140}
                    height={140}
                  />
                  <span>{v.normalized_sell_quantity.display_label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="buy-panel">
          <p className="eyebrow">
            {product.brandName} · fictional product label
          </p>
          <h1>{product.title}</h1>
          <p className="pdp-description">{content.short_description}</p>
          <p className="pdp-price">
            {formatINR(variant.price_inr_minor)} <small>demo price</small>
          </p>
          <p>
            <strong>{variant.normalized_sell_quantity.display_label}</strong> ·{" "}
            {variant.sku}
          </p>
          <fieldset className="variant-selector">
            <legend>
              Choose{" "}
              {product.variant_axes.length
                ? product.variant_axes.join(" and ").replaceAll("_", " ")
                : "available pack"}
            </legend>
            {product.variants.map((v) => (
              <button
                key={v.id}
                aria-pressed={v.id === variant.id}
                disabled={v.availability === "discontinued"}
                onClick={() => {
                  setSelectedId(v.id);
                  emitAnalytics({
                    name: "variant_selection",
                    productId: product.id,
                    sku: v.sku,
                  });
                }}
              >
                {v.normalized_sell_quantity.display_label}
                <small>{formatINR(v.price_inr_minor)}</small>
              </button>
            ))}
          </fieldset>
          <p className={`availability ${variant.availability}`} role="status">
            {variant.availability.replaceAll("_", " ")} · fictional demo state
          </p>
          <label className="quantity-control">
            Quantity{" "}
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(99, Number(e.target.value) || 1)),
                )
              }
            />
          </label>
          <div className="purchase-actions">
            <button
              className="button coral"
              onClick={add}
              disabled={!selectable}
            >
              {selectable
                ? "Add selected pack to demo cart"
                : "This demo pack is unavailable"}
            </button>
            <button
              className="button"
              aria-pressed={wishlist.includes(product.id)}
              onClick={() => toggleWishlist(product.id, product.title)}
            >
              {wishlist.includes(product.id)
                ? "Remove from wishlist"
                : "Save to wishlist"}
            </button>
          </div>
          <p className="simulation-note">
            No real stock, payment, delivery or order is represented.
          </p>
        </div>
      </section>
      <section className="facts-section">
        <header>
          <p className="eyebrow">Critical facts · never inferred</p>
          <h2>What the record knows.</h2>
        </header>
        <dl>
          <dt>Form</dt>
          <dd>{factText(content.family_attributes?.form)}</dd>
          <dt>Ingredients</dt>
          <dd>{factText(content.critical_facts?.ingredients)}</dd>
          <dt>Allergens</dt>
          <dd>{factText(content.critical_facts?.allergens)}</dd>
          <dt>Storage</dt>
          <dd>{factText(content.critical_facts?.storage)}</dd>
        </dl>
      </section>
    </>
  );
}
