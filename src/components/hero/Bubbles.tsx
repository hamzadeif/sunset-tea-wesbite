const BUBBLES: {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  soft?: boolean;
  opacity?: number;
}[] = [
  { left: "4%", top: "8%", size: 108, duration: 9, delay: 0, soft: true, opacity: 0.95 },
  { left: "6%", top: "62%", size: 172, duration: 10.5, delay: 0, soft: true, opacity: 1 },
  { left: "18%", top: "22%", size: 96, duration: 8.5, delay: 1.2, opacity: 0.98 },
  { left: "32%", top: "70%", size: 64, duration: 7.5, delay: 2.8, opacity: 0.94 },
  { left: "58%", top: "12%", size: 140, duration: 9.5, delay: 0.5, soft: true, opacity: 1 },
  { left: "72%", top: "55%", size: 104, duration: 8.8, delay: 1.8, opacity: 0.97 },
  { left: "84%", top: "26%", size: 72, duration: 8, delay: 3.2, opacity: 0.95 },
  { left: "90%", top: "68%", size: 192, duration: 11, delay: 0.9, soft: true, opacity: 0.98 },
  { left: "44%", top: "38%", size: 56, duration: 7, delay: 4, opacity: 0.92 },
  { left: "24%", top: "5%", size: 60, duration: 7.8, delay: 2.2, opacity: 0.94 },
];

export function Bubbles({ density = "full" }: { density?: "full" | "light" }) {
  const items = density === "light" ? BUBBLES.slice(0, 6) : BUBBLES;

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
            opacity: b.opacity ?? 0.95,
            ["--duration" as string]: `${b.duration}s`,
            ["--delay" as string]: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
