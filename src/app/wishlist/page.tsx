import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist-view";
export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};
export default function WishlistPage() {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Local demo wishlist</p>
          <h1>Keep a measured shortlist.</h1>
        </div>
        <p>
          Saved product families persist only in this browser. Choose an exact
          variant before adding to cart.
        </p>
      </header>
      <WishlistView />
    </div>
  );
}
