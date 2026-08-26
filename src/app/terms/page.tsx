import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = { title: "Demo terms" };
export default function Page() {
  return (
    <InformationPage eyebrow="Not a retail offer" title="Demo terms">
      <p>
        Pantryform is a fictional, non-affiliated retailer. Products and brands
        shown are real, verified items; the INR prices, availability states,
        checkout and order references are simulated demonstration content.
        Completing checkout creates no payment, purchase, contract, delivery or
        fulfilment obligation.
      </p>
    </InformationPage>
  );
}
