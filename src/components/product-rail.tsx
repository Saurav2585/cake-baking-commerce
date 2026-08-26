"use client";

import { useRef } from "react";
import type { CatalogProduct } from "@/lib/domain/types";
import { useGroupedReveal } from "@/motion/use-grouped-reveal";
import { ProductCard } from "./product-card";

/**
 * Homepage rail wrapper — renders the converged `ProductCard` in its
 * `variant="rail"` mode (replacing the old `real-product-card`/
 * `real-product-rail` pair) and wires Motion_3D_Specification.md §5
 * Storyboard B's grouped reveal for the rail as a single unit.
 *
 * The whole `.rp-rail` card grid is one `data-reveal-group` — never per
 * card — matching the spec's "never stagger result cards" rule. The ref
 * lives on an outer wrapper (not `.rp-rail` itself) so `useGroupedReveal`'s
 * `querySelectorAll` can find the group element as a descendant.
 */
export function ProductRail({
  products,
  ariaLabel,
  badge,
}: {
  products: CatalogProduct[];
  ariaLabel: string;
  badge?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  useGroupedReveal(railRef, { groupSelector: "[data-reveal-group]" });

  return (
    <div ref={railRef}>
      <div
        className="rp-rail"
        role="list"
        aria-label={ariaLabel}
        data-reveal-group
      >
        {products.map((product) => (
          <div role="listitem" key={product.id}>
            <ProductCard product={product} variant="rail" badge={badge} />
          </div>
        ))}
      </div>
    </div>
  );
}
