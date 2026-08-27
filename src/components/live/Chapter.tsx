"use client";

import { motion } from "motion/react";
import type { MenuSection } from "@/content/live";
import { ease } from "@/lib/motion";
import { useReveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The opener for a run of dishes.
 *
 * Seven sections down one page need something that says "new chapter" without
 * another rule and another heading, so the name arrives from behind its own
 * edge while a hairline draws itself across the page. Both are one shot: they
 * play as the reader arrives and then stop, because a heading that keeps
 * moving while you read the list under it is just noise.
 */
export function Chapter({
  section,
  n,
  photographed,
}: {
  section: MenuSection;
  /** Position in the board, shown as a chapter number. */
  n: number;
  photographed: number;
}) {
  const reveal = useReveal();
  const reduced = usePrefersReducedMotion();

  return (
    <header className="relative">
      <motion.div
        {...reveal}
        className="flex items-baseline gap-3 sm:gap-6"
        transition={{ staggerChildren: 0.06 }}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            shown: { opacity: 1, transition: { duration: 0.5, ease: ease.out } },
          }}
          className="shrink-0 font-mono text-[0.7rem] tracking-[0.14em] text-caramel tnum"
        >
          {String(n).padStart(2, "0")}
        </motion.span>

        <h2 className="min-w-0 flex-1 font-display text-[clamp(2rem,8vw,3.75rem)] leading-[1.02] text-cocoa display-wonk">
          {/* The mask is a wrapper with overflow hidden; the line inside it
              travels its own height, so it works at any type size without a
              measured pixel value. */}
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              variants={{
                hidden: { transform: "translateY(105%)" },
                shown: {
                  transform: "translateY(0%)",
                  transition: { duration: 0.85, ease: ease.out },
                },
              }}
            >
              {section.name}
            </motion.span>
          </span>
        </h2>
      </motion.div>

      <motion.div
        {...reveal}
        className="mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-0.5 sm:mt-4 sm:gap-x-5"
        transition={{ staggerChildren: 0.05, delayChildren: 0.15 }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, transform: "translateY(8px)" },
            shown: {
              opacity: 1,
              transform: "translateY(0px)",
              transition: { duration: 0.6, ease: ease.out },
            },
          }}
          className="text-[0.875rem] text-caramel sm:text-[0.9375rem]"
        >
          {section.kicker}
        </motion.p>
        <motion.p
          variants={{
            hidden: { opacity: 0, transform: "translateY(8px)" },
            shown: {
              opacity: 1,
              transform: "translateY(0px)",
              transition: { duration: 0.6, ease: ease.out },
            },
          }}
          className="text-[0.8125rem] text-caramel tnum"
        >
          {section.wait} · {section.items.length} on the board
          {photographed > 0 && ` · ${photographed} pictured`}
        </motion.p>
      </motion.div>

      {/* Draws itself in from the left. Transform on a full width rule rather
          than an animated width, so it never triggers layout. */}
      <motion.span
        aria-hidden="true"
        className="mt-4 block h-px w-full origin-left bg-[rgba(138,90,59,0.28)] sm:mt-6"
        initial={reduced ? false : { transform: "scaleX(0)" }}
        whileInView={{ transform: "scaleX(1)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1, ease: ease.out, delay: 0.1 }}
      />
    </header>
  );
}
