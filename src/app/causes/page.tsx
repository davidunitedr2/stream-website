import type { Metadata } from "next";
import { causes } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Causes",
  description:
    "Stream supports Memphis Athletic Ministries, the National Kidney Foundation, and Operation BBQ Relief.",
};

export default function CausesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Giving Back"
        title="Our Causes"
        intro="Stream and our Auto Be Grillin' BBQ team show up for our community, through fundraising, volunteering, and a whole lot of smoked barbecue."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6">
          {causes.map((c, i) => (
            <Reveal
              key={c.abbr}
              as="article"
              delay={i * 90}
              className="grid gap-6 rounded-xl border border-stream-grey-300 bg-stream-paper p-8 md:grid-cols-[8rem_1fr] md:items-start"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full brand-gradient">
                <span className="font-display text-2xl font-extrabold text-white">{c.abbr}</span>
              </div>
              <div>
                <h2 className="heading text-2xl text-stream-ink">{c.name}</h2>
                <p className="mt-3 leading-relaxed text-stream-grey-700">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
