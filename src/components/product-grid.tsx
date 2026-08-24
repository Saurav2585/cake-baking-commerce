import type { CatalogProduct } from "@/lib/domain/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
