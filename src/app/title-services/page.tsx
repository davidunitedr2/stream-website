import type { Metadata } from "next";
import { site, titleServices } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Title Services",
  description:
    "Stream Title Services delivers fast, accurate, concierge title work handled in-house so deals keep moving.",
};

export default function TitleServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stream Title Services"
        title="Titles never become the bottleneck."
        intro={titleServices.pitch}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          {/* concierge intro + services */}
          <Reveal className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="heading text-2xl text-stream-ink sm:text-3xl">
                A concierge title service.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stream-grey-700">
                {titleServices.blurb}
              </p>
            </div>
            <div className="rounded-xl border border-stream-grey-300 bg-stream-paper p-7">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-stream-ink">
                What we handle
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {titleServices.services.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-stream-grey-700">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-stream-lime" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* how it works (a real 4-step sequence) */}
          <Reveal className="mt-16">
            <h2 className="heading text-2xl text-stream-ink sm:text-3xl">How it works.</h2>
            <ol className="mt-6 grid gap-6 md:grid-cols-4">
              {titleServices.how.map((step, i) => (
                <li key={step.h} className="rounded-xl border border-stream-grey-300 p-6">
                  <span className="font-display text-3xl font-extrabold text-stream-blue-200">
                    0{i + 1}
                  </span>
                  <h3 className="heading mt-2 text-lg text-stream-ink">{step.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stream-grey-700">{step.p}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* portal CTA */}
          <Reveal as="div" className="mt-16 flex flex-col items-start gap-5 rounded-xl brand-gradient p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="heading text-2xl text-white">Visit Stream Title Services</h2>
              <p className="mt-2 max-w-lg text-stream-blue-100">
                Access the full Title Services site for resources, forms, and fee schedules.
              </p>
            </div>
            <a
              href={site.external.titleServices}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md bg-stream-lime px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-stream-ink transition-colors hover:bg-stream-lime-bright"
            >
              streamtitleservices.com →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
