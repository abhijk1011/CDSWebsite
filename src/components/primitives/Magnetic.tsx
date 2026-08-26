"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { spring } from "@/lib/motion";
import { useHasPointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Pulls a control very slightly toward the cursor.
 *
 * Purely decorative, so it is gated twice: a real pointer must be present,
 * and the visitor must not have asked for reduced motion. The value is run
 * through a spring, because tying a transform straight to pointer position
 * has no momentum and reads as mechanical.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasPointer = useHasPointer();
  const reduced = usePrefersReducedMotion();
  const active = hasPointer && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.follow);
  const sy = useSpring(y, spring.follow);
  // Full transform string: the x/y shorthands are not hardware accelerated.
  const transform = useTransform(
    [sx, sy],
    ([a, b]: number[]) => `translate3d(${a}px, ${b}px, 0)`,
  );

  if (!active) {
    return <span className={`inline-flex ${className}`}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ transform }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
