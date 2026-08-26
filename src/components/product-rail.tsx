"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { CatalogProduct } from "@/lib/domain/types";
import { useGroupedReveal } from "@/motion/use-grouped-reveal";
import { ProductCard } from "./product-card";

/**
 * Homepage rail wrapper — renders the converged `ProductCard` in its
 * `variant="rail"` mode and wires Motion_3D_Specification.md §5 Storyboard
 * B's grouped reveal for each section as a single settling unit.
 *
 * Remediation_Specification.md's "Homepage" section diagnoses the four
 * homepage rails as visually identical 4-up grids with only copy/data
 * varying, and prescribes four genuinely different structural patterns
 * instead. `pattern` selects one of those four; each renders different
 * markup/CSS (not just different products), while every card is still the
 * same, unmodified `ProductCard` — badge/wishlist/quick-add logic and the
 * `.product-card` contract are untouched everywhere below.
 *
 * The whole composition for a section is still one `data-reveal-group` (the
 * "never stagger result cards" rule from Motion_3D_Specification.md §5) —
 * only the *internal* layout differs per pattern, not the reveal wiring.
 */
export type RailPattern = "editorial" | "filmstrip" | "split" | "shelf";

export function ProductRail({
  products,
  ariaLabel,
  badge,
  pattern = "shelf",
  featureId,
  featureCaption,
  splitPanelId,
}: {
  products: CatalogProduct[];
  ariaLabel: string;
  badge?: string;
  /** Which of the four Remediation_Specification.md structural patterns to
   * render this section as. Defaults to the plain compact shelf. */
  pattern?: RailPattern;
  /** "editorial" only: canonical product id to feature as the large hero
   * pick; falls back to the first product if omitted/not found. */
  featureId?: string;
  /** "editorial" only: one short, factual descriptive line under the hero
   * pick (category/use, never an unverifiable sales or ratings claim). */
  featureCaption?: string;
  /** "split" only: canonical product id whose photo becomes the textured
   * category panel; the remaining products render as compact tiles. */
  splitPanelId?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  useGroupedReveal(railRef, { groupSelector: "[data-reveal-group]" });

  if (pattern === "editorial") {
    const feature =
      products.find((p) => p.id === featureId) ?? products[0] ?? null;
    const stack = feature
      ? products.filter((p) => p.id !== feature.id)
      : products;
    return (
      <div ref={railRef}>
        <div
          className="rail-editorial"
          aria-label={ariaLabel}
          data-reveal-group
        >
          {feature && (
            <div className="rail-editorial-feature">
              <ProductCard product={feature} variant="rail" badge={badge} />
              {featureCaption && (
                <p className="rail-feature-caption">{featureCaption}</p>
              )}
            </div>
          )}
          <div className="rail-editorial-stack">
            {stack.map((product) => (
              <div className="rail-editorial-row" key={product.id}>
                <ProductCard product={product} variant="rail" badge={badge} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pattern === "filmstrip") {
    return (
      <div ref={railRef}>
        <div className="rail-filmstrip-shell">
          <div
            className="rail-filmstrip"
            role="list"
            aria-label={ariaLabel}
            data-reveal-group
          >
            {products.map((product) => (
              <div
                className="rail-filmstrip-item"
                role="listitem"
                key={product.id}
              >
                <ProductCard product={product} variant="rail" badge={badge} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pattern === "split") {
    const panel =
      products.find((p) => p.id === splitPanelId) ?? products[0] ?? null;
    const tiles = panel ? products.filter((p) => p.id !== panel.id) : products;
    return (
      <div ref={railRef}>
        <div className="rail-split" aria-label={ariaLabel} data-reveal-group>
          {panel && (
            <Link
              href={`/products/${panel.slug}`}
              className="rail-split-panel promo-panel"
            >
              <div className="promo-image">
                <Image
                  src={panel.media.src}
                  alt={panel.media.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
              <p className="eyebrow">{panel.brandName}</p>
              <h3>{panel.title}</h3>
              <span className="text-link">View product →</span>
            </Link>
          )}
          <div className="rail-split-tiles">
            {tiles.map((product) => (
              <div className="rail-split-tile" key={product.id}>
                <ProductCard product={product} variant="rail" badge={badge} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={railRef}>
      <div
        className="rail-shelf"
        role="list"
        aria-label={ariaLabel}
        data-reveal-group
      >
        {products.map((product) => (
          <div className="rail-shelf-item" role="listitem" key={product.id}>
            <ProductCard product={product} variant="rail" badge={badge} />
          </div>
        ))}
      </div>
    </div>
  );
}
