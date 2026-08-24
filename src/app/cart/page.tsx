import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
export const metadata: Metadata = {
  title: "Demo cart",
  robots: { index: false },
};
export default function CartPage() {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Variant-safe local cart</p>
          <h1>Your measured basket.</h1>
        </div>
        <p>
          Stored in this browser for the portfolio demo. Invalid or stale SKUs
          are discarded safely on restore.
        </p>
      </header>
      <CartView />
    </div>
  );
}
