"use client";
import Link from "next/link";
import { catalog } from "@/lib/domain/catalog";
import { ProductGrid } from "./product-grid";
import { useCommerce } from "./commerce-provider";
export function WishlistView() {
  const { wishlist, ready } = useCommerce();
  const products = catalog.filter((p) => wishlist.includes(p.id));
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
  return products.length ? (
    <ProductGrid products={products} />
  ) : (
    <div className="empty-state">
      <h2>No saved pantry items yet.</h2>
      <p>
        Your wishlist is local to this browser and does not create an account.
      </p>
      <Link className="button primary" href="/shop">
        Find supplies
      </Link>
    </div>
  );
}
