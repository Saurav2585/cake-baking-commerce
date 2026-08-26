"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { emitAnalytics } from "@/lib/domain/analytics";
import { formatINR, resolveMedia } from "@/lib/domain/catalog";
import type { CatalogProduct } from "@/lib/domain/types";
import { useImageCrossfade } from "@/motion/use-image-crossfade";
import { useCommerce } from "./commerce-provider";

type Fact = { status?: string; value?: string };

/**
 * Tri-state critical-fact rendering (Route_UI_Specification.md §4.6/§4.7):
 * - `known` → plain text, no pill.
 * - `not_applicable` → muted solid pill.
 * - `information_not_provided` (the default/missing case) → a quiet
 *   designed empty state, refined again in R2B2F: non-italic small text,
 *   a quiet dot mark plus the existing left tick (CSS-only, see
 *   `.fact-not-provided` in globals.css), reading as a deliberate
 *   spec-sheet disclosure rather than an unfinished field. Deliberately
 *   NOT a pill, so it stays visually distinct from `not_applicable`'s
 *   solid pill. Never red/alarming, never a literal dash character in the
 *   markup, never fabricated. Copy stays the exact protected phrase
 *   ("Information not provided," D-017) — only the visual treatment has
 *   ever changed, not the wording.
 */
function FactValue({ fact }: { fact: Fact | undefined }) {
  if (fact?.status === "known") {
    return <span className="fact-value fact-known">{String(fact.value)}</span>;
  }
  if (fact?.status === "not_applicable") {
    return (
      <span className="fact-value fact-pill fact-not-applicable">
        Not applicable.
      </span>
    );
  }
  return (
    <span className="fact-value fact-not-provided">
      Information not provided
    </span>
  );
}

const clampQuantity = (n: number) => Math.max(1, Math.min(99, n));

/** Mirrors product-card.tsx's honest-placeholder detection (Route_UI_
 * Specification.md §1.4/§4.1): a real photo is missing when the resolved
 * asset's alt text carries this data-driven marker phrase. Currently 0/48
 * products hit this branch (48/48 real photography), kept for parity with
 * the shared PLP canvas contract if a future product ever lacks a photo. */
function isPlaceholderMedia(alt: string) {
  return alt.toLowerCase().includes("image not yet available");
}
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
  const primaryRegionRef = useRef<HTMLElement>(null);
  // Storyboard C (Motion_3D_Specification.md §6): coordinated crossfade of
  // the hero image + price/pack/availability fact panel on variant change.
  // `variant.id` (not media.src) is the activeKey so the 3 multi-variant,
  // shared-image products still play a confirming fade-through-same-image.
  useImageCrossfade(primaryRegionRef, variant.id);
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
      <section className="pdp-layout" ref={primaryRegionRef}>
        <div className="pdp-gallery">
          <div
            className={`pdp-primary product-image-canvas${
              isPlaceholderMedia(media.alt) ? " is-placeholder" : ""
            }`}
          >
            {isPlaceholderMedia(media.alt) ? (
              <span className="placeholder-copy">Image not yet available</span>
            ) : (
              <Image
                key={media.src}
                data-crossfade-image
                src={media.src}
                alt={media.alt}
                fill
                priority
                sizes="(max-width:768px) 100vw, 34rem"
              />
            )}
          </div>
        </div>
        <div className="buy-panel">
          <p className="eyebrow">{product.brandName} · demo listing</p>
          <h1>{product.title}</h1>
          <p className="pdp-description">{content.short_description}</p>
          <p className="pdp-price" data-crossfade-with>
            {formatINR(variant.price_inr_minor)} <small>demo price</small>
          </p>
          <p className="pdp-pack-meta" data-crossfade-with>
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
            {product.variants.map((v) => {
              const discontinued = v.availability === "discontinued";
              return (
                <span className="variant-option" key={v.id}>
                  <button
                    aria-pressed={v.id === variant.id}
                    disabled={discontinued}
                    onClick={() => {
                      // Synchronous with the click, never gated on the
                      // crossfade animation (Frontend_GSAP_Architecture.md
                      // §6 safety contract).
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
                  {discontinued && (
                    <span className="variant-unavailable-reason">
                      Unavailable in this demo
                    </span>
                  )}
                </span>
              );
            })}
          </fieldset>
          <p
            className={`availability ${variant.availability}`}
            role="status"
            data-crossfade-with
          >
            {variant.availability.replaceAll("_", " ")} · demo fixture
          </p>
          <div className="quantity-control">
            <span className="quantity-label" id="pdp-quantity-label">
              Quantity
            </span>
            <div className="quantity-stepper">
              <button
                type="button"
                className="quantity-step"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => clampQuantity(q - 1))}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="99"
                inputMode="numeric"
                aria-labelledby="pdp-quantity-label"
                value={quantity}
                onChange={(e) =>
                  setQuantity(clampQuantity(Number(e.target.value) || 1))
                }
              />
              <button
                type="button"
                className="quantity-step"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => clampQuantity(q + 1))}
              >
                +
              </button>
            </div>
          </div>
          <div
            className="purchase-actions"
            data-sticky-price={formatINR(variant.price_inr_minor)}
          >
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
          <p className="simulation-note pdp-attribution">
            {product.brandName} and other third-party names, trademarks and
            imagery referenced here belong to their respective owners.
            Pantryform is a fictional portfolio/demo project, not affiliated
            with, sponsored by, or endorsed by {product.brandName}.
          </p>
        </div>
      </section>
      <section className="facts-section">
        <header>
          <p className="eyebrow">Critical facts · never inferred</p>
          <h2>What the record knows.</h2>
        </header>
        <dl>
          <dt>Subcategory</dt>
          <dd>
            <FactValue fact={content.family_attributes?.subcategory} />
          </dd>
          <dt>Ingredients</dt>
          <dd>
            <FactValue fact={content.critical_facts?.ingredients} />
          </dd>
          <dt>Allergens</dt>
          <dd>
            <FactValue fact={content.critical_facts?.allergens} />
          </dd>
          <dt>Storage</dt>
          <dd>
            <FactValue fact={content.critical_facts?.storage} />
          </dd>
        </dl>
      </section>
    </>
  );
}
