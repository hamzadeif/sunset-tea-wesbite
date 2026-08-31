"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  /** Animate on mount (for above-the-fold hero content) */
  immediate?: boolean;
}

function useRevealOnScroll(threshold = 0.12, immediate = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, immediate]);

  return { ref, visible };
}

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  threshold = 0.12,
  immediate = false,
}: RevealProps) {
  const { ref, visible } = useRevealOnScroll(threshold, immediate);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
}

export function RevealStagger({
  children,
  className = "",
  stagger = 90,
  threshold = 0.1,
}: RevealStaggerProps) {
  const { ref, visible } = useRevealOnScroll(threshold);

  return (
    <div
      ref={ref}
      className={`reveal-stagger ${visible ? "reveal-stagger--visible" : ""} ${className}`}
      style={{ "--stagger": `${stagger}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
