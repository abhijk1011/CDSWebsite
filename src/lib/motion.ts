import type { Transition, Variants } from "motion/react";

/**
 * Curves and durations, matched to the CSS custom properties in globals.css.
 * Nothing here is invented: the built in curves are too weak to read as
 * intentional, so every value comes from the same small set.
 */
export const ease = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
} as const;

/** UI stays under 300ms. Editorial reveals are allowed to breathe. */
export const duration = {
  press: 0.16,
  tooltip: 0.18,
  menu: 0.24,
  drawer: 0.42,
  reveal: 0.9,
  slow: 1.2,
} as const;

export const spring = {
  /** Interruptible, no bounce. For anything a pointer drives. */
  glide: { type: "spring", duration: 0.5, bounce: 0 },
  /** A touch of life. Reserve for rare, playful moments. */
  pop: { type: "spring", duration: 0.5, bounce: 0.22 },
  /** Heavy and slow, for cursor and parallax following. */
  follow: { type: "spring", stiffness: 220, damping: 28, mass: 0.6 },
} satisfies Record<string, Transition>;

/**
 * Fires once, as soon as the element's top clears 90% of the viewport.
 * Only the bottom edge is pulled in: shrinking the top edge as well creates
 * elements that scroll past without ever qualifying, which leaves content
 * stuck at opacity zero.
 */
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;

export const maskLine: Variants = {
  hidden: { transform: "translateY(105%)" },
  shown: (i: number = 0) => ({
    transform: "translateY(0%)",
    transition: { duration: duration.reveal, ease: ease.out, delay: i * 0.075 },
  }),
};

export const rise: Variants = {
  hidden: { opacity: 0, transform: "translateY(18px)" },
  shown: (i: number = 0) => ({
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.7, ease: ease.out, delay: i * 0.06 },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  shown: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: ease.out, delay: i * 0.06 },
  }),
};

export const stagger = (gap = 0.07): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: gap } },
});
