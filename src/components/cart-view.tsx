"use client";
import Image from "next/image";
import Link from "next/link";
import { cartSubtotalPaise } from "@/lib/domain/cart";
import {
  catalog,
  formatINR,
  resolveMedia,
  variantsBySku,
} from "@/lib/domain/catalog";
import { realProductsById } from "@/data/real-products";
import { useCommerce } from "./commerce-provider";
export function CartView() {
  const { cart, ready, setQuantity, removeLine } = useCommerce();
  if (!ready)
    return (
      <section
        className="page-shell"
        aria-busy="true"
        aria-label="Loading Pantryform"
      >
        <p className="eyebrow">Measuring the pantry…</p>
        <div className="loading-rule" />
      </section>
    );
  if (!cart.lines.length)
    return (
      <div className="empty-state">
        <h2>Your demo cart is empty.</h2>
        <p>Add an exact pack or review a recipe supply plan.</p>
        <Link className="button primary" href="/shop">
          Browse the pantry
        </Link>
      </div>
    );
  return (
    <div className="cart-layout">
      <div className="cart-lines">
        {cart.lines.map((line) => {
          const realProduct = realProductsById.get(line.productId);
          if (realProduct) {
            return (
              <article key={line.sku}>
                <Image
                  src={realProduct.image.src}
                  alt=""
                  width={140}
                  height={140}
                />
                <div>
                  <p className="eyebrow">{line.brandName}</p>
                  <h2>{line.productTitle}</h2>
                  <p>{line.variantLabel} · demo fixture</p>
                </div>
                <label>
                  Quantity{" "}
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={line.quantity}
                    onChange={(e) =>
                      setQuantity(line.sku, Number(e.target.value))
                    }
                  />
                </label>
                <strong>
                  {formatINR(line.observedUnitPricePaise * line.quantity)}
                </strong>
                <button onClick={() => removeLine(line.sku)}>Remove</button>
              </article>
            );
          }
          const product = catalog.find((p) => p.id === line.productId);
          const variant = variantsBySku.get(line.sku);
          if (!product || !variant) return null;
          const media = resolveMedia(product.id, variant.id);
          return (
            <article key={line.sku}>
              <Image src={media.thumbnailSrc} alt="" width={140} height={140} />
              <div>
                <p className="eyebrow">{line.brandName}</p>
                <h2>{line.productTitle}</h2>
                <p>
                  {line.variantLabel} · {line.sku}
                </p>
                {line.sources.some((s) => s.kind === "recipe") && (
                  <small>Added from recipe review</small>
                )}
              </div>
              <label>
                Quantity{" "}
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={line.quantity}
                  onChange={(e) =>
                    setQuantity(line.sku, Number(e.target.value))
                  }
                />
              </label>
              <strong>
                {formatINR(line.observedUnitPricePaise * line.quantity)}
              </strong>
              <button onClick={() => removeLine(line.sku)}>Remove</button>
            </article>
          );
        })}
      </div>
      <aside className="cart-summary">
        <p className="eyebrow">Demo summary</p>
        <h2>{formatINR(cartSubtotalPaise(cart))}</h2>
        <p>Items subtotal only. Shipping and tax are not calculated.</p>
        <p className="notice">
          Simulated commerce: no payment will be taken and no order will be
          fulfilled.
        </p>
        <Link className="button coral" href="/checkout">
          Begin simulated checkout
        </Link>
      </aside>
    </div>
  );
}
