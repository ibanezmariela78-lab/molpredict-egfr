import { cn } from "@/lib/utils";

/**
 * Ilustración molecular abstracta (SVG decorativo).
 * No representa la estructura química real del SMILES ingresado.
 */
export function MoleculeArt({
  className,
  seed = 1,
  animated = false,
}: {
  className?: string;
  seed?: number;
  animated?: boolean;
}) {
  const nodos = [
    { x: 60, y: 100, r: 7 },
    { x: 95, y: 62, r: 6 },
    { x: 140, y: 70, r: 8 },
    { x: 168, y: 110, r: 6 },
    { x: 148, y: 152, r: 7 },
    { x: 100, y: 150, r: 6 },
    { x: 196, y: 68, r: 5 },
    { x: 30, y: 66, r: 5 },
    { x: 40, y: 146, r: 5 },
    { x: 186, y: 158, r: 5 },
  ];
  const enlaces: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [2, 6],
    [1, 7],
    [0, 8],
    [3, 9],
  ];

  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-label="Ilustración molecular abstracta"
      className={cn("h-full w-full", animated && "spin-slow", className)}
    >
      <defs>
        <linearGradient id={`molgrad-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--teal)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#molgrad-${seed})`} strokeWidth="1.8" opacity="0.75">
        {enlaces.map(([a, b], i) => (
          <line
            key={i}
            x1={nodos[a].x}
            y1={nodos[a].y}
            x2={nodos[b].x}
            y2={nodos[b].y}
          />
        ))}
      </g>
      <g>
        {nodos.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={`url(#molgrad-${seed})`}
            opacity={0.9 - i * 0.03}
          />
        ))}
      </g>
    </svg>
  );
}

/** Miniatura molecular abstracta para tarjetas y tablas. */
export function MoleculeThumb({ seed = 1, className }: { seed?: number; className?: string }) {
  const puntos = Array.from({ length: 6 }, (_, i) => {
    const ang = (Math.PI / 3) * i + seed * 0.35;
    return { x: 24 + Math.cos(ang) * 13, y: 24 + Math.sin(ang) * 13 };
  });
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("h-12 w-12 shrink-0", className)}
    >
      <polygon
        points={puntos.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="var(--teal)"
        strokeWidth="1.6"
        opacity="0.8"
      />
      {puntos.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i % 2 === 0 ? 2.6 : 1.8} fill="var(--primary)" />
      ))}
      <line
        x1={puntos[0].x}
        y1={puntos[0].y}
        x2={44}
        y2={12}
        stroke="var(--primary)"
        strokeWidth="1.4"
        opacity="0.6"
      />
      <circle cx="44" cy="12" r="2.4" fill="var(--teal)" />
    </svg>
  );
}
