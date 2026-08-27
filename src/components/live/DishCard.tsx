"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { MenuItem } from "@/content/live";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useReveal } from "@/components/primitives/Reveal";

/**
 * One photographed dish.
 *
 * The picture carries the card and the words sit on it, which is the only
 * arrangement that works on a phone: a photograph beside a caption wastes
 * half the width, and a photograph above a caption pushes the price below the
 * fold. Everything a customer needs to order sits in one glance.
 *
 * The picture drifts slightly against the scroll. That is decoration, so it
 * is the first thing to go when someone has asked for reduced motion, and it
 * never touches the row of prices further down the page: type a reader is
 * scanning for a number should hold still.
 */
export function DishCard({
  item,
  section,
  index,
  priority = false,
}: {
  item: MenuItem;
  section: string;
  index: number;
  /** The first card on the page loads eagerly. Everything else waits. */
  priority?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const reveal = useReveal();
  const ref = useRef<HTMLElement>(null);

  // Scroll progress across the card's own travel through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 8% of travel split either side of centre. The image is scaled to 1.12 in
  // CSS so the drift never exposes an edge. Composed into a full transform
  // string rather than Motion's `y` shorthand, which is not hardware
  // accelerated and drops frames while the page is still loading images.
  // The range is what gets neutralised for reduced motion, not the style
  // object. Dropping `style` on a later render leaves whatever transform
  // Motion last wrote sitting on the element, so the drift survives the very
  // preference meant to switch it off.
  const shift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-4, 4]);
  const drift = useMotionTemplate`translate3d(0, ${shift}%, 0)`;

  return (
    <motion.article
      ref={ref}
      // The site's own reveal, rather than a hand rolled reduced motion
      // branch. `whileInView` with `initial={false}` leaves a card that has
      // not been scrolled to yet with no resolved opacity, so a few of them
      // sat invisible for readers who had asked for less movement. useReveal
      // switches to a plain `animate` in that case, which cannot strand
      // anything.
      variants={{
        hidden: { opacity: 0, transform: "translateY(22px)" },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: {
            duration: 0.72,
            ease: ease.out,
            delay: Math.min(index, 3) * 0.06,
          },
        },
      }}
      {...reveal}
      className="group relative isolate overflow-hidden rounded-[1.25rem] bg-clay shadow-[0_2px_14px_rgba(58,35,26,0.08)]"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-square">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ transform: drift }}
        >
          {/* A plain img: the site is a static export with images.unoptimized,
              so next/image would add a wrapper and a loader and optimise
              nothing. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full scale-[1.12] object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover:scale-[1.17] motion-reduce:transition-none"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </motion.div>

        {/*
          Tuned, not eyeballed: the label was measured against every dish
          photograph and this is the lightest curve that clears AA, which
          leaves more of the food visible than a heavier one would.
        */}
        <span
          aria-hidden="true"
          className="absolute inset-0 block"
          style={{
            background:
              "linear-gradient(to top, rgba(58,35,26,0.82) 0%, rgba(58,35,26,0.64) 18%, rgba(58,35,26,0.34) 40%, rgba(58,35,26,0) 62%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5">
          <div className="min-w-0">
            <p className="text-[0.65rem] tracking-[0.16em] uppercase text-cream/85">
              {section}
            </p>
            <h3 className="mt-1 font-display text-[1.35rem] leading-[1.15] text-cream display-wonk sm:text-[1.5rem]">
              {item.name}
            </h3>
            {item.note && (
              <p className="mt-1 text-[0.75rem] text-cream/85">{item.note}</p>
            )}
          </div>

          {item.price && (
            <p className="shrink-0 font-display text-[1.35rem] leading-none text-cream tnum sm:text-[1.5rem]">
              <span aria-hidden="true">₹</span>
              <span className="sr-only">Rupees </span>
              {item.price}
            </p>
          )}
        </div>

        {item.code && (
          <p className="absolute top-4 left-4 z-10 rounded-full bg-[rgba(23,15,11,0.68)] px-2.5 py-1 text-[0.65rem] tracking-[0.08em] text-cream/90 backdrop-blur-sm tnum">
            <span className="sr-only">Counter code </span>
            {item.code}
          </p>
        )}
      </div>
    </motion.article>
  );
}
