import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-shell">
      <div className="empty-state">
        <p className="eyebrow">404 · Measure not found</p>
        <h1>This shelf is empty.</h1>
        <p>The page may have moved, but the measured pantry is still open.</p>
        <Link className="button primary" href="/shop">
          Browse all supplies
        </Link>
      </div>
    </section>
  );
}
