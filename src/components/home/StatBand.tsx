"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { about } from "@/content/pages";
import { MaskReveal, useReveal } from "@/components/primitives/Reveal";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Cream, not cocoa. The arc carousel above is now the one dark feature band
 * on this page and the footer takes the other cocoa surface, so a third dark
 * block here would push the palette well past its allocation and make the
 * whole scroll feel heavy.
 */
export function StatBand() {
  const reveal = useReveal();
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <MaskReveal
            as="h2"
            className="font-display text-h2 text-cocoa display-wonk"
            lines={["A shop is only as good", "as the day it is having."]}
            linesSm={["A shop is only", "as good as the day", "it is having."]}
          />

          <motion.p
            className="text-[1.0625rem] leading-relaxed text-body lg:pb-1.5"
            variants={{
              hidden: { opacity: 0 },
              shown: {
                opacity: 1,
                transition: { duration: 0.7, ease: ease.out },
              },
            }}
            {...reveal}
          >
            We would rather run out of something at eight in the evening than
            sell you a tray that was fried on Tuesday. Empty trays are a good
            sign, and our regulars know it.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[rgba(138,90,59,0.18)] sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((s, i) => (
            <div key={s.label} className="bg-clay p-7 md:p-8">
              <Counter value={s.value} suffix={s.suffix} index={i} />
              <p className="mt-3 text-[0.9rem] leading-snug text-caramel">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  index,
}: {
  value: number;
  suffix: string;
  index: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.2,
      delay: index * 0.08,
      ease: ease.out,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, index]);

  return (
    <p
      ref={ref}
      className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-none tnum text-cocoa display-wonk"
    >
      {reduced ? value : shown}
      {suffix}
    </p>
  );
}
