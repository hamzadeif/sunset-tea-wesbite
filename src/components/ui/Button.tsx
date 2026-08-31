import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "soft";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-white hover:bg-ink shadow-[0_10px_30px_rgba(26,26,26,0.12)] hover:-translate-y-0.5",
  secondary:
    "bg-white/80 text-charcoal border border-border hover:bg-white hover:border-orange-accent/30 hover:-translate-y-0.5",
  ghost: "bg-transparent text-charcoal hover:bg-peach-100/70",
  soft: "bg-orange-accent text-white hover:bg-orange-deep shadow-[0_10px_28px_rgba(224,122,61,0.25)] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-5 py-2.5 text-sm sm:text-base rounded-full",
  lg: "px-7 py-3.5 text-base sm:text-lg rounded-full",
};

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100 hover:scale-[1.02] active:scale-[0.98]";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
