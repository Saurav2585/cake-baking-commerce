import type { Metadata, Viewport } from "next";
import "./globals.css";
import { catalog } from "@/lib/domain/catalog";
import { CommerceProvider } from "@/components/commerce-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pantryform.example"),
  title: {
    default: "Pantryform — Baking Ingredients & Supplies",
    template: "%s · Pantryform",
  },
  description:
    "A fictional portfolio ecommerce demo for measured baking ingredients, tools and recipes.",
  openGraph: {
    title: "Pantryform",
    description:
      "Measured baking ingredients, supplies and recipe planning — portfolio demo.",
    type: "website",
    images: [
      "/assets/catalog/asset_pf5b_recipe_demo-cocoa-celebration-cake_hero_1536x1024_v1.webp",
    ],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff8ed",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <CommerceProvider
          validSkus={catalog.flatMap((p) => p.variants.map((v) => v.sku))}
        >
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </CommerceProvider>
      </body>
    </html>
  );
}
