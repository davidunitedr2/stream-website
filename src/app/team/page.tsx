import type { Metadata } from "next";
import { team } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import { NetworkStar } from "@/components/NetworkStar";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "The people behind Stream Remarketing Services in Collierville, Tennessee.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our People"
        title="Meet the Team"
        intro="A deep bench of remarketing, operations, and title professionals, based in Collierville, Tennessee and connected to buyers nationwide."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-xl border border-stream-grey-300 bg-stream-paper p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stream-blue-100">
                  <NetworkStar color="var(--color-stream-blue)" className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-stream-ink">{p.name}</p>
                  <p className="text-sm text-stream-grey-700">{p.title}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <p className="mt-8 text-sm text-stream-grey-700">
            Headshots and bios coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
