import { notFound } from "next/navigation";
import Link from "next/link";
import { catalog } from "@/lib/domain/catalog";
import { ProductGrid } from "@/components/product-grid";
import { departments } from "@/lib/shop-departments";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ department: string; category: string }>;
}) {
  const { department, category } = await params;
  const record = departments[department];
  if (!record) notFound();
  const departmentId = `dept_${department.replaceAll("-", "_")}`;
  const categoryId = `cat_${category.replaceAll("-", "_")}`;
  const rows = catalog.filter(
    (p) => p.department_id === departmentId && p.category_id === categoryId,
  );
  if (!rows.length) notFound();
  const departmentProducts = catalog.filter(
    (p) => p.department_id === departmentId,
  );
  const categories = Array.from(
    new Set(departmentProducts.map((p) => p.category_id)),
  )
    .sort()
    .map((id) => ({
      id,
      slug: id.replace("cat_", "").replaceAll("_", "-"),
      label: id.replace("cat_", "").replaceAll("_", " "),
    }));
  return (
    <section className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>·</li>
          <li>
            <Link href={`/shop/${department}`}>{record.title}</Link>
          </li>
          <li>·</li>
          <li aria-current="page">{category.replaceAll("-", " ")}</li>
        </ol>
      </nav>
      <div className="page-hero">
        <div>
          <p className="eyebrow">
            {record.title} · {rows.length} product
            {rows.length === 1 ? "" : "s"}
          </p>
          <h1>{category.replaceAll("-", " ")}</h1>
        </div>
        <p>{record.copy}</p>
      </div>
      {categories.length > 1 && (
        <nav className="category-chips" aria-label="Categories">
          <Link href={`/shop/${department}`} className="category-chip">
            All {record.title}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop/${department}/${c.slug}`}
              className="category-chip"
              aria-current={c.slug === category ? "page" : undefined}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      )}
      <ProductGrid products={rows} />
    </section>
  );
}
