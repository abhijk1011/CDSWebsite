"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { charlieeSlots, charlieeColumns } from "@/content/charliee";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useReveal } from "@/components/primitives/Reveal";

/**
 * The house label, as a wall of its own products.
 *
 * The old section argued for the label in a paragraph and then listed the
 * categories as pills, which is the most static way to say "we make things".
 * This says it by showing them.
 *
 * The name is set once, enormous, and the columns climb over it as the section
 * scrolls. At the top of the section the word is whole; by the bottom the
 * products have covered most of it. That is the layering doing the talking: a
 * label earns its place in front of the goods, so here the goods are literally
 * put in front of the name.
 *
 * Columns travel at four different rates. Equal rates would read as one slab
 * sliding, and it is the difference between them that makes a flat grid feel
 * like it has depth.
 */

/** Per column travel, as a percentage of the column's own height. */
const DRIFT = [-9, -15, -6, -18];

export function CharlieeMosaic() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Hooks cannot be called in a loop, so the four are written out. Each is
  // neutralised at the value rather than by dropping the style, which would
  // leave Motion's last transform behind exactly when it should stop.
  const d0 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, DRIFT[0]]);
  const d1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, DRIFT[1]]);
  const d2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, DRIFT[2]]);
  const d3 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, DRIFT[3]]);

  const t0 = useMotionTemplate`translate3d(0, ${d0}%, 0)`;
  const t1 = useMotionTemplate`translate3d(0, ${d1}%, 0)`;
  const t2 = useMotionTemplate`translate3d(0, ${d2}%, 0)`;
  const t3 = useMotionTemplate`translate3d(0, ${d3}%, 0)`;
  const drifts = [t0, t1, t2, t3];

  return (
    <div ref={ref} className="relative isolate mt-12 overflow-hidden md:mt-16">
      {/*
        The name, behind everything. Wider than the container on purpose: the
        letterforms should run past both edges so what shows between columns
        reads as a fragment of something large rather than a small word that
        happens to be cropped.
      */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-6%] top-0 -z-10 text-center font-display text-[clamp(3.5rem,21vw,15rem)] leading-[0.78] tracking-[-0.035em] text-cocoa display-wonk select-none"
      >
        Charliee
      </p>

      {/*
        The grid starts about two thirds of the way down the word, so the name
        is whole when the section arrives and the columns eat into it as they
        climb. Too little overlap and there is no layering to see; too much and
        the word never reads at all.
      */}
      <div className="shell relative pt-[clamp(4rem,10.5vw,9rem)] pb-10 md:pb-16">
        <div className="grid grid-cols-3 items-start gap-2.5 md:grid-cols-4 md:gap-4">
          {charlieeColumns.map((column, ci) => (
            <motion.div
              key={ci}
              style={{ transform: drifts[ci] }}
              className={`grid gap-2.5 will-change-transform md:gap-4 ${
                ci === 3 ? "hidden md:grid" : ""
              } ${["mt-0", "mt-10 md:mt-16", "mt-4 md:mt-6", "mt-14"][ci]}`}
            >
              {column.map((slot, si) => (
                <Tile key={slot} index={slot} order={ci + si} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tile({ index, order }: { index: number; order: number }) {
  const slot = charlieeSlots[index];
  // The site's own reveal. whileInView with no initial leaves a tile that has
  // not been reached yet with no resolved opacity, which stranded four of them
  // invisible for anyone who had asked for less movement.
  const reveal = useReveal();

  return (
    <motion.figure
      variants={{
        hidden: { opacity: 0, transform: "translateY(26px)" },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: {
            duration: 0.8,
            ease: ease.out,
            delay: Math.min(order, 5) * 0.055,
          },
        },
      }}
      {...reveal}
      className={`relative m-0 overflow-hidden rounded-[0.7rem] bg-clay shadow-[0_4px_18px_rgba(58,35,26,0.10)] md:rounded-[1rem] ${slot.ratio}`}
    >
      {/* A plain img: the site is a static export with images.unoptimized, so
          next/image would add a wrapper and a loader and optimise nothing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slot.src}
        alt={slot.alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </motion.figure>
  );
}
