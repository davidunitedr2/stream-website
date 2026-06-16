import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Stream Remarketing Services privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-stream-grey-700 sm:px-6">
          <p className="rounded-md border border-stream-lime/40 bg-stream-lime/10 p-4 text-sm">
            Placeholder. A fresh Privacy Policy will be drafted to Stream&rsquo;s actual data flows
            and reviewed by counsel before launch.
          </p>
        </div>
      </section>
    </>
  );
}
