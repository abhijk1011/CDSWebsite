"use client";

import { motion } from "motion/react";
import type { MenuItem } from "@/content/live";
import { ease } from "@/lib/motion";
import { useReveal } from "@/components/primitives/Reveal";

/**
 * The items in a section that have no photograph yet.
 *
 * Deliberately the quietest thing on the page. A price is a number somebody
 * is scanning for, so these rows fade up once as they arrive and then hold
 * perfectly still: no parallax, no hover movement, nothing that shifts under
 * a reader comparing two numbers. The photographs carry the mood; this
 * carries the facts.
 */
export function RestOfBoard({ items }: { items: MenuItem[] }) {
  const reveal = useReveal();

  if (items.length === 0) return null;

  return (
    <motion.div {...reveal} transition={{ staggerChildren: 0.035 }}>
      <motion.p
        variants={{
          hidden: { opacity: 0 },
          shown: { opacity: 1, transition: { duration: 0.5, ease: ease.out } },
        }}
        className="text-[0.7rem] tracking-[0.16em] uppercase text-caramel"
      >
        Also on this board
      </motion.p>

      <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
        {items.map((item) => (
          <motion.li
            key={item.name}
            variants={{
              hidden: { opacity: 0, transform: "translateY(10px)" },
              shown: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.55, ease: ease.out },
              },
            }}
            className="flex items-baseline gap-3 border-b border-[rgba(138,90,59,0.14)] py-3.5 last:border-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-0"
          >
            {item.code && (
              <span className="shrink-0 font-mono text-[0.6875rem] text-[rgba(138,90,59,0.75)] tnum">
                <span className="sr-only">Counter code </span>
                {item.code}
              </span>
            )}

            <span className="font-display text-[1.0625rem] text-cocoa">
              {item.name}
            </span>

            {item.note && (
              <span className="text-[0.75rem] text-caramel">{item.note}</span>
            )}

            <span
              aria-hidden="true"
              className="mx-1 h-px min-w-4 flex-1 self-center border-b border-dotted border-[rgba(138,90,59,0.3)]"
            />

            {item.price && (
              <span className="shrink-0 text-[0.9375rem] text-cocoa tnum">
                <span aria-hidden="true">₹</span>
                <span className="sr-only">Rupees </span>
                {item.price}
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
