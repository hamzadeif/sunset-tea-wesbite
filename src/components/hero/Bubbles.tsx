const BUBBLES: {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  soft?: boolean;
  opacity?: number;
}[] = [
  { left: "6%", top: "62%", size: 140, duration: 18, delay: 0, soft: true },
  { left: "18%", top: "28%", size: 72, duration: 14, delay: 1.5 },
  { left: "32%", top: "70%", size: 48, duration: 12, delay: 3.2 },
  { left: "58%", top: "18%", size: 110, duration: 16, delay: 0.8, soft: true },
  { left: "72%", top: "55%", size: 84, duration: 15, delay: 2.4 },
  { left: "84%", top: "30%", size: 56, duration: 13, delay: 4.1 },
  { left: "90%", top: "72%", size: 160, duration: 20, delay: 1.1, soft: true, opacity: 0.45 },
  { left: "44%", top: "42%", size: 36, duration: 11, delay: 5 },
  { left: "12%", top: "12%", size: 42, duration: 17, delay: 2.8 },
];

export function Bubbles({ density = "full" }: { density?: "full" | "light" }) {
  const items = density === "light" ? BUBBLES.slice(0, 5) : BUBBLES;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <span
          key={i}
          className={b.soft ? "bubble bubble--soft" : "bubble"}
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            opacity: b.opacity ?? 0.65,
            ["--duration" as string]: `${b.duration}s`,
            ["--delay" as string]: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
