import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = {
  title: "Contact demo",
  description: "Contact boundary for the Pantryform portfolio demo.",
};
export default function Page() {
  return (
    <InformationPage eyebrow="Portfolio boundary" title="Contact">
      <p>
        This demonstration does not operate customer support, fulfil orders or
        collect enquiries. No contact form is provided because no real business
        service exists.
      </p>
    </InformationPage>
  );
}
