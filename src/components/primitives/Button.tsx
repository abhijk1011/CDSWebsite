"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full " +
  "text-[0.9375rem] font-medium leading-none tracking-[-0.01em] " +
  "transition-[transform,background-color,border-color,color] duration-[160ms] " +
  "ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(190,95,60,0.28)]";

/**
 * Terracotta is the action colour and it has to stay scarce, so only one
 * primary button belongs in any viewport. Everything else is secondary.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta-700 text-cream px-7 py-4 hover:bg-terracotta-800 shadow-[0_2px_12px_rgba(58,35,26,0.06)] hover:shadow-[0_6px_20px_rgba(58,35,26,0.10)]",
  secondary:
    "border border-[rgba(138,90,59,0.4)] text-cocoa px-7 py-4 hover:bg-clay hover:border-caramel",
  ghost:
    "text-cocoa px-2 py-2 underline decoration-[rgba(138,90,59,0.35)] decoration-1 underline-offset-[5px] hover:decoration-terracotta-700",
  onDark:
    "border border-[rgba(253,248,242,0.28)] text-cream px-7 py-4 hover:bg-[rgba(253,248,242,0.08)] hover:border-[rgba(253,248,242,0.5)]",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
  magnetic?: boolean;
  /** Fills the row on narrow screens, sits to its natural width above sm. */
  fluid?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "ref">;

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  magnetic = true,
  fluid = false,
  ...rest
}: Props) {
  const width = fluid ? "w-full sm:w-auto" : "";
  const classes = `${base} ${variants[variant]} ${width} ${className}`;

  const inner = href ? (
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") ? (
      <a
        className={classes}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    ) : (
      <Link className={classes} href={href}>
        {children}
      </Link>
    )
  ) : (
    <button className={classes} {...rest}>
      {children}
    </button>
  );

  return magnetic ? (
    <Magnetic className={fluid ? "w-full sm:w-auto" : ""}>{inner}</Magnetic>
  ) : (
    inner
  );
}

/** The small arrow that leans forward on hover. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[3px] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
