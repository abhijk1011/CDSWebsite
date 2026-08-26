"use client";

import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` makes Motion drop transform and layout animation
 * for anyone who asked for it, while leaving opacity alone. Reveals still
 * need to opt out of their hidden state separately, which they do in
 * Reveal.tsx, because an element that never animates in must never have
 * been hidden in the first place.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
