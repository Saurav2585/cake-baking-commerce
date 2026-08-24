export default function Loading() {
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
}
