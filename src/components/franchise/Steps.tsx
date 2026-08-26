"use client";

import { motion } from "motion/react";
import { franchise } from "@/content/pages";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The five steps, stacked.
 *
 * Each card pins a little lower than the one before it, so scrolling deals
 * them into a pile rather than scrolling them away. The purpose is spatial:
 * the earlier steps stay visible at the top edge, which keeps the sequence
 * legible instead of asking anyone to remember step two by the time they
 * reach step five.
 */
export function Steps() {
  const reduced = usePrefersReducedMotion();
  return (
    <ol className="shell pb-24 md:pb-32">
      {franchise.steps.map((step, i) => (
        <li
          key={step.n}
          className="sticky"
          style={{ top: `calc(6.5rem + ${i * 1.5}rem)` }}
        >
          <motion.div
            className="mb-5 overflow-hidden rounded-[1.35rem] border border-[rgba(138,90,59,0.18)] bg-cream shadow-[0_6px_20px_rgba(58,35,26,0.10)]"
            initial={reduced ? false : { opacity: 0, transform: "translateY(28px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: ease.out }}
          >
            <div className="grid gap-6 p-7 md:grid-cols-[6rem_1fr_10rem] md:items-start md:gap-10 md:p-10">
              <span className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-clay display-wonk">
                {step.n}
              </span>

              <div>
                <h3 className="font-display text-[1.5rem] leading-snug text-cocoa md:text-[1.85rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-body">
                  {step.body}
                </p>
              </div>

              <span className="inline-flex h-max items-center rounded-full bg-clay px-4 py-2 text-[0.8125rem] text-cocoa md:justify-self-end">
                {step.detail}
              </span>
            </div>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
