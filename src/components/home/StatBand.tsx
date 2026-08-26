"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { about } from "@/content/pages";
import { MaskReveal, useReveal } from "@/components/primitives/Reveal";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The one dark feature band on this page. A third would make the scroll feel
 * heavy, so the footer takes the only other cocoa surface. Smoke gives this
 * block a second plane so it does not read as a flat slab.
 */
export function StatBand() {
  const reveal = useReveal();
  return (
    <section className="relative overflow-hidden bg-cocoa py-20 text-cream md:py-28">
      <div className="shell">
        <MaskReveal
          as="h2"
          className="max-w-[20ch] font-display text-h2 text-cream display-wonk"
          lines={["A shop is only", "as good as the day", "it is having."]}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[rgba(253,248,242,0.14)] sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((s, i) => (
            <div key={s.label} className="bg-smoke p-7 md:p-8">
              <Counter value={s.value} suffix={s.suffix} index={i} />
              <p className="mt-3 text-[0.9rem] leading-snug text-on-dark-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <motion.p
          className="mt-12 max-w-2xl text-[1.0625rem] leading-relaxed text-on-dark-muted"
          variants={{
            hidden: { opacity: 0 },
            shown: { opacity: 1, transition: { duration: 0.7, ease: ease.out } },
          }}
          {...reveal}
        >
          We would rather run out of something at eight in the evening than
          sell you a tray that was fried on Tuesday. Empty trays are a good
          sign, and our regulars know it.
        </motion.p>
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
      className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-none tnum text-cream display-wonk"
    >
      {reduced ? value : shown}
      {suffix}
    </p>
  );
}
