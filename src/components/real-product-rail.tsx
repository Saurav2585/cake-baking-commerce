import type { RealProduct } from "@/data/real-products";
import { RealProductCard } from "./real-product-card";

export function RealProductRail({
  products,
  ariaLabel,
}: {
  products: RealProduct[];
  ariaLabel: string;
}) {
  return (
    <div className="rp-rail" role="list" aria-label={ariaLabel}>
      {products.map((product) => (
        <div role="listitem" key={product.id}>
          <RealProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
