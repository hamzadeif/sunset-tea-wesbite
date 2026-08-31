import { type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
  alt = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-14 sm:py-20 lg:py-28 ${alt ? "bg-section-alt" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  children,
  className = "",
  centered = true,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <Reveal variant="up" className={centered ? `mx-auto max-w-2xl text-center ${className}` : className}>
      {children}
    </Reveal>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
