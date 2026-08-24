"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export function ConfirmationView({ reference }: { reference: string }) {
  const [valid, setValid] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active)
        setValid(
          Boolean(
            sessionStorage.getItem(`pantryform:confirmation:${reference}`),
          ),
        );
    });
    return () => {
      active = false;
    };
  }, [reference]);
  if (valid === null) return <p>Checking local demo confirmation…</p>;
  return valid ? (
    <section className="confirmation">
      <p className="eyebrow">Simulation complete · no payment taken</p>
      <h1>A measured ending, not a real order.</h1>
      <p>
        Your local demo reference is <strong>{reference}</strong>.
      </p>
      <p>
        No paid order, delivery, customer account or fulfilment record was
        created.
      </p>
      <div>
        <Link className="button primary" href="/shop">
          Continue exploring
        </Link>
        <Link className="button" href="/recipes">
          Plan another recipe
        </Link>
      </div>
    </section>
  ) : (
    <div className="empty-state">
      <h1>This demo confirmation has expired.</h1>
      <p>
        Confirmation details live only in the browser session that completed the
        simulation.
      </p>
      <Link className="button primary" href="/shop">
        Return to shop
      </Link>
    </div>
  );
}
