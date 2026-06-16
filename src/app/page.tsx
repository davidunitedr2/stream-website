import Link from "next/link";
import Image from "next/image";
import { site, onlineChannels, physicalChannels, pillars, processSteps, simnFeatures } from "@/lib/site";
import { NetworkBackground } from "@/components/NetworkStar";
import { PlatformNetwork } from "@/components/PlatformNetwork";
import { Reveal } from "@/components/Reveal";

const trustPoints = [
  "Pioneering upstream remarketing since 2008",
  "An operating company of United Recovery and Remarketing",
  "A nationwide in-lane and online network",
  "A compliance-aware, lender-grade process",
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-stream-blue-900 text-white">
        <Image
          src="/images/hero-lot.jpg"
          alt="Vehicles staged in rows across an auction lot"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stream-blue-900/95 via-stream-blue-900/80 to-stream-blue/40" />
        <NetworkBackground opacity={0.12} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="heading text-5xl text-white sm:text-6xl lg:text-7xl">
              <span className="rise block" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>Inlane.</span>
              <span className="rise block" style={{ "--rise-delay": "110ms" } as React.CSSProperties}>Online.</span>
              <span className="rise block text-stream-lime" style={{ "--rise-delay": "220ms" } as React.CSSProperties}>
                Everywhere.
              </span>
            </h1>
            <p
              className="rise mt-6 max-w-xl text-lg leading-relaxed text-stream-blue-100 sm:text-xl"
              style={{ "--rise-delay": "360ms" } as React.CSSProperties}
            >
              Stream lists your vehicles in-lane and online at top auctions nationwide, bringing the
              best sellers together with the best buyers, anywhere and any time.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-4" style={{ "--rise-delay": "480ms" } as React.CSSProperties}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-stream-lime px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-stream-ink transition-colors hover:bg-stream-lime-bright"
              >
                Sell with Stream
              </Link>
              <Link
                href="/run-list"
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-stream-blue"
              >
                Browse the Run List
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────── */}
      <section className="border-b border-stream-grey-300 bg-stream-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ul className="flex flex-col divide-y divide-stream-grey-300 py-2 md:flex-row md:divide-x md:divide-y-0 md:py-0">
            {trustPoints.map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 py-4 text-sm font-medium text-stream-grey-700 md:flex-1 md:px-6 md:py-5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-stream-lime" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pitch ────────────────────────────────────────────── */}
      <section className="bg-white">
        <Reveal as="div" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="heading text-3xl text-stream-ink sm:text-4xl lg:text-[2.75rem]">
            One consignment, listed everywhere buyers already are. Stream is an in-lane and online
            brand built to move the best vehicles to the best buyers,{" "}
            <span className="text-stream-blue">anywhere and any time.</span>
          </p>
        </Reveal>
      </section>

      {/* ── Where Stream sells (the network) ─────────────────── */}
      <section className="relative overflow-hidden bg-stream-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="heading text-3xl text-stream-ink sm:text-4xl">
              Your vehicles, on every channel that matters.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stream-grey-700">
              Most sellers pick one lane. Stream lists across the full network, in-lane and online,
              so your inventory reaches the largest possible pool of qualified buyers.
            </p>
            <div className="mt-7 space-y-4">
              <ChannelGroup label="Online" items={onlineChannels} />
              <ChannelGroup label="In-lane" items={physicalChannels} />
            </div>
          </Reveal>
          <Reveal>
            <PlatformNetwork />
          </Reveal>
        </div>
      </section>

      {/* ── Why Stream is different (editorial feature list) ──── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <h2 className="heading text-3xl text-stream-ink sm:text-4xl">
              Not just another
              <br />
              remarketing company.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stream-grey-700">
              Stream controls vehicles from the repo yard all the way to liquidation, in-lane or
              online. That end-to-end control is where the savings live: fewer days to sell, fewer
              claims, lower transport cost.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex font-display text-sm font-bold uppercase tracking-wide text-stream-blue hover:text-stream-blue-bright"
            >
              Talk to the team →
            </Link>
          </Reveal>

          <Reveal className="grid gap-x-10 gap-y-px sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.h} className="border-t-2 border-stream-grey-300 py-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-bold tabular-nums text-stream-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-bold text-stream-ink">{p.h}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stream-grey-700">{p.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── The Stream process + SIMN ────────────────────────── */}
      <section className="bg-stream-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="heading text-3xl text-stream-ink sm:text-4xl">
              The Stream process, start to sold.
            </h2>
            <p className="mt-4 text-lg text-stream-grey-700">
              Four steps, one accountable partner, from the moment a vehicle is recovered.
            </p>
          </Reveal>
          <Reveal as="ol" className="mt-12 grid gap-6 md:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.n} className="relative rounded-xl bg-white p-6 shadow-sm">
                <span className="font-display text-3xl font-extrabold text-stream-blue-200">{s.n}</span>
                <h3 className="heading mt-2 text-lg text-stream-ink">{s.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stream-grey-700">{s.p}</p>
              </li>
            ))}
          </Reveal>

          {/* SIMN callout */}
          <Reveal as="div" className="mt-12 grid items-center gap-8 overflow-hidden rounded-2xl brand-gradient p-8 text-white sm:p-10 lg:grid-cols-2">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-stream-lime">
                Powered by SIMN
              </p>
              <h3 className="heading mt-3 text-2xl text-white sm:text-3xl">
                The Stream Inventory Management Network.
              </h3>
              <p className="mt-4 text-stream-blue-100">
                SIMN, pronounced &ldquo;Simon,&rdquo; is the proprietary system that connects your
                team, our team, the auctions, and the buyers, with real-time status and two-way
                communication on every vehicle.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {simnFeatures.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-white">
                  <span className="mt-0.5 text-stream-lime">▪</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Two front doors: Sellers + Buyers, then Title ────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal className="grid gap-6 lg:grid-cols-2">
            <FrontDoor
              kind="Sellers"
              title="For sellers"
              body="Consign once and reach buyers in-lane and across every major online marketplace. Stream pioneered selling repos directly from the lot, and we have been refining the playbook ever since."
              cta={{ label: "Sell with Stream", href: "/contact" }}
              tone="blue"
            />
            <FrontDoor
              kind="Buyers"
              title="For buyers"
              body="Find Stream inventory wherever you already buy, or browse the live Run List. Clean titles, straightforward arbitration, and a team that picks up the phone."
              cta={{ label: "Browse the Run List", href: "/run-list" }}
              tone="paper"
            />
          </Reveal>

          <Reveal as="div" className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-stream-grey-300 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="font-display text-lg font-bold text-stream-ink">Stream Title Services</h3>
              <p className="mt-1 max-w-xl text-sm text-stream-grey-700">
                Fast, accurate title work handled in-house, so titles never become the bottleneck.
              </p>
            </div>
            <Link
              href="/title-services"
              className="shrink-0 font-display text-sm font-bold uppercase tracking-wide text-stream-blue hover:text-stream-blue-bright"
            >
              Explore Title Services →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Innovator quote ──────────────────────────────────── */}
      <section className="relative overflow-hidden brand-gradient text-white">
        <NetworkBackground opacity={0.1} />
        <Reveal as="div" className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <blockquote className="heading text-2xl leading-snug sm:text-3xl">
            &ldquo;Stream is an innovator in our industry and was one of the first companies to sell
            repos directly from repo lots.&rdquo;
          </blockquote>
          <p className="mt-6 font-display text-sm font-bold uppercase tracking-widest text-stream-lime">
            Paul Rettenmaier
          </p>
          <p className="text-sm text-stream-blue-100">Chief Relationship Officer, Stream</p>
        </Reveal>
      </section>

      {/* ── Causes teaser ────────────────────────────────────── */}
      <section className="bg-white">
        <Reveal as="div" className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="heading text-2xl text-stream-ink sm:text-3xl">
              Memphis-proud, and proud to give back.
            </h2>
            <p className="mt-3 max-w-xl text-stream-grey-700">
              From Memphis Athletic Ministries to the National Kidney Foundation and Operation BBQ
              Relief, the Stream team shows up where it counts.
            </p>
          </div>
          <Link
            href="/causes"
            className="shrink-0 rounded-md bg-stream-blue px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-stream-blue-bright"
          >
            Our Causes
          </Link>
        </Reveal>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-stream-ink text-white">
        <Reveal as="div" className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <h2 className="heading text-3xl sm:text-4xl">Ready to move metal?</h2>
          <p className="mx-auto mt-4 max-w-xl text-stream-grey-300">
            Talk to the Stream team about consigning your vehicles, or reach out with a question
            about a unit on the Run List.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${site.phones.main.replace(/\D/g, "")}`}
              className="rounded-md bg-stream-lime px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-stream-ink transition-colors hover:bg-stream-lime-bright"
            >
              Call {site.phones.main}
            </a>
            <Link
              href="/contact"
              className="rounded-md border-2 border-white px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-stream-ink"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ChannelGroup({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-display text-xs font-bold uppercase tracking-widest text-stream-blue">
        {label}
      </span>
      {items.map((c) => (
        <span
          key={c}
          className="rounded-full border border-stream-grey-300 bg-white px-4 py-1.5 text-sm font-medium text-stream-grey-700"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function FrontDoor({
  kind,
  title,
  body,
  cta,
  tone,
}: {
  kind: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  tone: "blue" | "paper";
}) {
  const dark = tone === "blue";
  return (
    <div
      className={`flex flex-col justify-between gap-8 rounded-2xl p-8 sm:p-10 ${
        dark ? "brand-gradient text-white" : "border border-stream-grey-300 bg-stream-paper"
      }`}
    >
      <div>
        <span
          className={`font-display text-xs font-bold uppercase tracking-widest ${
            dark ? "text-stream-lime" : "text-stream-blue"
          }`}
        >
          {kind}
        </span>
        <h3 className={`heading mt-3 text-2xl sm:text-3xl ${dark ? "text-white" : "text-stream-ink"}`}>
          {title}
        </h3>
        <p className={`mt-4 leading-relaxed ${dark ? "text-stream-blue-100" : "text-stream-grey-700"}`}>
          {body}
        </p>
      </div>
      <Link
        href={cta.href}
        className={`inline-flex w-fit items-center justify-center rounded-md px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
          dark
            ? "bg-stream-lime text-stream-ink hover:bg-stream-lime-bright"
            : "bg-stream-blue text-white hover:bg-stream-blue-bright"
        }`}
      >
        {cta.label}
      </Link>
    </div>
  );
}
