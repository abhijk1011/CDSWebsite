"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { menu } from "@/content/live";
import { Button, Arrow } from "@/components/primitives/Button";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { OpenPill } from "@/components/home/OpenPill";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const rotating = menu.flatMap((s) => s.items.slice(0, 3).map((i) => i.name));

export function LiveTeaser() {
  return (
    <section className="border-y border-[rgba(138,90,59,0.18)] bg-clay py-20 md:py-28">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <p className="eyebrow">The live counter</p>
            <OpenPill />
          </div>

          <MaskReveal
            as="h2"
            className="mt-6 max-w-[15ch] font-display text-h2 text-cocoa display-wonk"
            lines={["Some things", "cannot wait", "on a shelf."]}
          />

          <Rise index={1}>
            <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-body">
              Jalebi that has cooled is a different food. So is a pizza that sat
              under a lamp. The kitchen at the back runs through the day, and
              everything on this list is made after you order it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/live-snacks">
                See the live menu
                <Arrow />
              </Button>
            </div>
          </Rise>
        </div>

        <Rise index={2} className="lg:justify-self-end lg:w-full lg:max-w-[26rem]">
          <NowServing />
        </Rise>
      </div>
    </section>
  );
}

/**
 * A slow rotation through what the kitchen is making. Its purpose is state
 * indication: the counter is genuinely live, and a static list cannot say
 * that. Slow enough to read, and it stops entirely for reduced motion.
 */
function NowServing() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % rotating.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="rounded-[1.25rem] border border-[rgba(138,90,59,0.18)] bg-cream p-7 shadow-[0_2px_12px_rgba(58,35,26,0.06)] md:p-9">
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(138,90,59,0.18)] pb-4">
        <span className="eyebrow">On the counter</span>
        <span className="text-[0.75rem] tnum text-caramel">
          {menu.reduce((n, s) => n + s.items.length, 0)} items
        </span>
      </div>

      <div className="relative mt-6 h-[3.25rem] overflow-hidden md:h-[4rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={reduced ? "static" : i}
            className="absolute inset-0 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] leading-tight text-cocoa"
            initial={{ opacity: 0, transform: "translateY(70%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={{ opacity: 0, transform: "translateY(-70%)" }}
            transition={{ duration: 0.5, ease: ease.out }}
          >
            {reduced ? "Made after you order" : rotating[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-[rgba(138,90,59,0.18)] pt-6">
        {menu.map((s) => (
          <li
            key={s.id}
            className="rounded-full bg-clay px-3.5 py-1.5 text-[0.8125rem] text-cocoa"
          >
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
