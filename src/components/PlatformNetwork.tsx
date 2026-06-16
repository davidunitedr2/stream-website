import Image from "next/image";

// The hub-and-spoke "where Stream sells" graphic: Stream at the center, with
// spokes to the online channels (top) and the in-lane channels (bottom).
// Mirrors the channel lists in lib/site.ts; logos where we have them, labels otherwise.

const STAGE = { w: 600, h: 560 };
const HUB = { x: 300, y: 280 };

type Node = {
  name: string;
  group: "online" | "inlane";
  x: number;
  y: number;
  logo?: string;
  href?: string;
};

const NODES: Node[] = [
  // Online (top row)
  { name: "SmartAuction", group: "online", x: 130, y: 110, logo: "/logos/smartauction.png", href: "https://www.smartauction.com" },
  { name: "OVE", group: "online", x: 300, y: 110, logo: "/logos/ove.gif", href: "https://www.ove.com" },
  { name: "Carmigo", group: "online", x: 470, y: 110, logo: "/logos/carmigo.png", href: "https://carmigo.io" },
  // In-lane (bottom row)
  { name: "Manheim", group: "inlane", x: 130, y: 450, logo: "/logos/manheim.png", href: "https://www.manheim.com" },
  { name: "America's Auto Auction", group: "inlane", x: 300, y: 450, logo: "/logos/americas.png", href: "https://www.americasautoauction.com" },
  { name: "Independents", group: "inlane", x: 470, y: 450 },
];

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

export function PlatformNetwork() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      style={{ aspectRatio: `${STAGE.w} / ${STAGE.h}` }}
    >
      {/* spokes */}
      <svg viewBox={`0 0 ${STAGE.w} ${STAGE.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {NODES.map((n) => {
          const len = Math.round(Math.hypot(n.x - HUB.x, n.y - HUB.y));
          return (
            <line
              key={n.name}
              className="net-spoke"
              style={{ "--spoke-len": len } as React.CSSProperties}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="var(--color-stream-blue-bright)"
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.7}
            />
          );
        })}
      </svg>

      {/* group labels */}
      <span className="absolute left-1/2 top-0 -translate-x-1/2 font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-stream-blue">
        Online
      </span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-stream-grey-700">
        In-lane
      </span>

      {/* hub */}
      <div className="net-node absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-stream-blue/10 sm:h-28 sm:w-28">
        <Image src="/logos/stream-icon.png" alt="Stream" width={200} height={195} className="h-11 w-11 sm:h-12 sm:w-12" />
      </div>

      {/* channel nodes */}
      {NODES.map((n, i) => {
        const style = {
          left: pct(n.x, STAGE.w),
          top: pct(n.y, STAGE.h),
          "--node-delay": `${250 + i * 90}ms`,
        } as React.CSSProperties;
        const base =
          "net-node absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md sm:h-20 sm:w-20 lg:h-24 lg:w-24";
        const ring = n.group === "online" ? "border-stream-blue/25" : "border-stream-grey-300";

        const inner = n.logo ? (
          <Image
            src={n.logo}
            alt={n.name}
            width={200}
            height={80}
            className="max-h-8 w-auto object-contain px-1 lg:max-h-9"
            unoptimized={n.logo.endsWith(".gif")}
          />
        ) : (
          <span className="px-1 text-center font-display text-[10px] font-bold leading-tight text-stream-grey-700 sm:text-xs">
            {n.name}
          </span>
        );

        return n.href ? (
          <a
            key={n.name}
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            title={n.name}
            className={`${base} ${ring} transition-transform hover:scale-105`}
            style={style}
          >
            {inner}
          </a>
        ) : (
          <div key={n.name} className={`${base} ${ring}`} style={style} title={n.name}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
