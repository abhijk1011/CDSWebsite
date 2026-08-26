"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { maskLine, rise, fade, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The animation props every reveal shares.
 *
 * When someone has asked for reduced motion the hidden state is dropped
 * entirely rather than animated faster. An element that will never animate
 * in must never start hidden, otherwise a missed intersection leaves real
 * content at opacity zero with no way back.
 */
export function useReveal() {
  const reduced = usePrefersReducedMotion();
  return reduced
    ? ({ initial: false as const, animate: "shown" as const })
    : ({
        initial: "hidden" as const,
        whileInView: "shown" as const,
        viewport: viewportOnce,
      });
}

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Line by line mask reveal.
 *
 * Lines are authored rather than measured, which keeps the ragging under our
 * control and costs no layout thrash. A break that fills the measure on a
 * laptop rarely fills it on a phone, so `linesSm` takes a second set for
 * narrow screens. When both are given the visible text is duplicated, so the
 * accessible copy is lifted into a single screen reader only line and both
 * visual versions are hidden from assistive tech.
 */
export function MaskReveal({
  lines,
  linesSm,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  lines: string[];
  /** Optional break set for screens below the md breakpoint. */
  linesSm?: string[];
  as?: Tag;
  className?: string;
  delay?: number;
}) {
  const Component = motion[Tag];
  const reveal = useReveal();
  const responsive = Boolean(linesSm?.length);

  const stack = (set: string[], key: string) =>
    set.map((line, i) => (
      <span key={`${key}-${line}-${i}`} className="line-mask">
        <motion.span className="block" variants={maskLine} custom={i + delay}>
          {line}
        </motion.span>
      </span>
    ));

  return (
    <Component className={className} {...reveal}>
      {responsive && <span className="sr-only">{lines.join(" ")}</span>}
      {responsive && (
        <span aria-hidden="true" className="block md:hidden">
          {stack(linesSm!, "sm")}
        </span>
      )}
      <span
        aria-hidden={responsive || undefined}
        className={responsive ? "hidden md:block" : "block"}
      >
        {stack(lines, "lg")}
      </span>
    </Component>
  );
}

/** Fade and rise. The default for body copy and small blocks. */
export function Rise({
  children,
  className = "",
  index = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: Tag;
}) {
  const Component = motion[as];
  const reveal = useReveal();
  return (
    <Component
      className={className}
      variants={rise}
      custom={index}
      {...reveal}
    >
      {children}
    </Component>
  );
}

/** Opacity only. Use where movement would fight the layout. */
export function FadeIn({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const reveal = useReveal();
  return (
    <motion.div
      className={className}
      variants={fade}
      custom={index}
      {...reveal}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a list so children stagger. Pair with Rise or FadeIn children. */
export function Stagger({
  children,
  className = "",
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reveal = useReveal();
  return (
    <motion.div
      className={className}
      {...reveal}
      transition={{ staggerChildren: gap }}
    >
      {children}
    </motion.div>
  );
}
