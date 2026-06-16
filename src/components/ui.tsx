import { NetworkBackground } from "./NetworkStar";

// Eyebrow with the signature short lime rule.
export function Eyebrow({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`eyebrow ${light ? "text-white" : "text-stream-blue"} ${className}`}>
      <span className="inline-block h-[3px] w-7 rounded-full bg-stream-lime" />
      {children}
    </span>
  );
}

// Standard inner-page hero: gradient band, eyebrow + H1 + intro.
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden brand-gradient text-white">
      <NetworkBackground opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rise" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </div>
        <h1
          className="rise heading mt-4 max-w-3xl text-4xl text-white sm:text-5xl"
          style={{ "--rise-delay": "90ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="rise mt-5 max-w-2xl text-lg leading-relaxed text-stream-blue-100"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
