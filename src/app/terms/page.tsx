import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms",
  description: "Stream Remarketing Services terms of use.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-stream-grey-700 sm:px-6">
          <p className="rounded-md border border-stream-lime/40 bg-stream-lime/10 p-4 text-sm">
            Placeholder. Terms will be drafted (or ported from the existing entity, with
            predecessor-name checks) and reviewed by counsel before launch.
          </p>
        </div>
      </section>
    </>
  );
}
