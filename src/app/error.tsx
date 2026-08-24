"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="page-shell">
      <div className="empty-state">
        <p className="eyebrow">Something slipped off the scale</p>
        <h1>We could not prepare this view.</h1>
        <button className="button primary" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
