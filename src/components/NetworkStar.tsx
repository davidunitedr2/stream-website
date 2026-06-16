// Stream's signature mark: a 5-node hub-and-spoke "network star" (from the logo).
// Reused as the brand glyph and, scaled up + faded, as a background motif.

const NODES: [number, number][] = [
  [50, 16],
  [82, 39],
  [70, 78],
  [30, 78],
  [18, 39],
];
const CENTER: [number, number] = [50, 50];

export function NetworkStar({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill={color}
      aria-hidden="true"
      role="presentation"
    >
      {NODES.map(([x, y], i) => (
        <line
          key={`l${i}`}
          x1={CENTER[0]}
          y1={CENTER[1]}
          x2={x}
          y2={y}
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />
      ))}
      <circle cx={CENTER[0]} cy={CENTER[1]} r={7.5} />
      {NODES.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r={9} />
      ))}
    </svg>
  );
}

// Faint, oversized network used as a section background. Pointer-events none.
export function NetworkBackground({
  className = "",
  color = "#ffffff",
  opacity = 0.08,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <NetworkStar
        color={color}
        className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rotate-12"
      />
      <NetworkStar
        color={color}
        className="absolute -bottom-32 -left-20 h-80 w-80 -rotate-6"
      />
    </div>
  );
}
