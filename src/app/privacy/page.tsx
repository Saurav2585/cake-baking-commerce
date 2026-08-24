import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = { title: "Privacy" };
export default function Page() {
  return (
    <InformationPage eyebrow="Local-first demo" title="Privacy">
      <p>
        The demo stores cart and wishlist state in this browser. It uses a local
        provider-independent event log and does not add a third-party tracker.
        Clear site data in your browser to remove local state.
      </p>
    </InformationPage>
  );
}
