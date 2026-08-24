import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, catalogBySlug } from "@/lib/domain/catalog";
import { ProductDetail } from "@/components/product-detail";
import { ProductGrid } from "@/components/product-grid";
export function generateStaticParams() {
  return catalog.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = catalogBySlug.get(slug);
  return p
    ? {
        title: p.title,
        description: `${p.title} by ${p.brandName}. Fictional Pantryform demo product.`,
      }
    : { title: "Product not found" };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = catalogBySlug.get(slug);
  if (!product) notFound();
  const related = catalog
    .filter(
      (p) => p.department_id === product.department_id && p.id !== product.id,
    )
    .slice(0, 4);
  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            → <Link href="/shop">Shop</Link>
          </li>
          <li aria-current="page">→ {product.title}</li>
        </ol>
      </nav>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="related-section">
          <p className="eyebrow">Continue through the department</p>
          <h2>Measured companions.</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
