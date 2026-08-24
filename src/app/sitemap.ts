import type { MetadataRoute } from "next";
import { catalog, recipes } from "@/lib/domain/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pantryform.example";
  return [
    "",
    "/shop",
    "/recipes",
    "/about",
    "/contact",
    "/faq",
    "/shipping-returns",
    "/privacy",
    "/terms",
    ...catalog.map((p) => `/products/${p.slug}`),
    ...recipes.map((r) => `/recipes/${r.slug}`),
  ].map((url) => ({ url: `${base}${url}`, changeFrequency: "weekly" }));
}
