import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>PANTRYFORM</strong>
        <p>
          A fictional portfolio shop for measured baking ingredients and
          supplies.
        </p>
      </div>
      <nav aria-label="Information">
        <Link href="/faq">FAQ</Link>
        <Link href="/shipping-returns">Shipping &amp; returns</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <small>
        Prototype direction only—formal legal clearance pending. No real
        payment, inventory, fulfilment or order.
      </small>
    </footer>
  );
}
