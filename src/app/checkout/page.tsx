import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
export const metadata: Metadata = {
  title: "Simulated checkout",
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div>
          <p className="eyebrow">No payment · no real order</p>
          <h1>Simulated checkout.</h1>
        </div>
        <p>
          This safe portfolio flow uses only fixed fictional profiles and never
          requests personal or payment details.
        </p>
      </header>
      <CheckoutForm />
    </div>
  );
}
