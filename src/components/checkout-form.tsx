"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cartSubtotalPaise } from "@/lib/domain/cart";
import { formatINR } from "@/lib/domain/catalog";
import { emitAnalytics } from "@/lib/domain/analytics";
import { useCommerce } from "./commerce-provider";
export function CheckoutForm() {
  const router = useRouter();
  const { cart, completeSimulation } = useCommerce();
  const [profile, setProfile] = useState("");
  const [ack, setAck] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  if (!cart.lines.length)
    return (
      <div className="empty-state">
        <h2>A demo checkout needs a cart.</h2>
        <p>No confirmation can be simulated from an empty basket.</p>
        <Link className="button primary" href="/shop">
          Return to shop
        </Link>
      </div>
    );
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = [];
    if (!profile) next.push("Choose a fictional demo profile.");
    if (!ack) next.push("Acknowledge that this checkout is simulated.");
    setErrors(next);
    if (next.length) return;
    emitAnalytics({
      name: "begin_checkout",
      cartRevision: cart.revision,
      valuePaise: cartSubtotalPaise(cart),
      mode: "demo",
    });
    const ref = completeSimulation();
    router.push(`/order-confirmation/${ref}`);
  };
  return (
    <form className="checkout-layout" onSubmit={submit}>
      {errors.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1}>
          <h2>Review the demo fields</h2>
          <ul>
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <section>
        <h2>Choose a fictional profile</h2>
        <p>No name, address, phone, email or payment details are collected.</p>
        <label className="profile-choice">
          <input
            type="radio"
            name="profile"
            value="home"
            checked={profile === "home"}
            onChange={(e) => setProfile(e.target.value)}
          />
          <span>
            <strong>Home baker demo</strong>
            <small>Fictional local planning scenario</small>
          </span>
        </label>
        <label className="profile-choice">
          <input
            type="radio"
            name="profile"
            value="studio"
            checked={profile === "studio"}
            onChange={(e) => setProfile(e.target.value)}
          />
          <span>
            <strong>Micro-bakery demo</strong>
            <small>Fictional repeat-baking scenario</small>
          </span>
        </label>
        <label className="acknowledgement">
          <input
            type="checkbox"
            checked={ack}
            onChange={(e) => setAck(e.target.checked)}
          />{" "}
          I understand this creates only a local demo confirmation. No payment,
          order, delivery or fulfilment occurs.
        </label>
      </section>
      <aside className="cart-summary">
        <p className="eyebrow">Simulated checkout</p>
        <h2>{formatINR(cartSubtotalPaise(cart))}</h2>
        <p>
          {cart.lines.length} variant-safe line
          {cart.lines.length === 1 ? "" : "s"}.
        </p>
        <button className="button coral" type="submit">
          Complete simulation
        </button>
      </aside>
    </form>
  );
}
