import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = {
  title: "Our method",
  description:
    "How the fictional Pantryform portfolio demo connects ingredients, measurement and making.",
};
export default function Page() {
  return (
    <InformationPage
      eyebrow="Raw ingredient → measured method"
      title="A pantry built around making"
    >
      <p>
        Pantryform is a fictional portfolio concept for exploring baking
        ingredients and supplies with precise pack facts and recipe planning.
      </p>
      <h2>What this demo is</h2>
      <p>
        Every product, brand, price and availability state is fictional. The
        experience demonstrates ecommerce interaction and art direction; it is
        not an operating retailer.
      </p>
    </InformationPage>
  );
}
