"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { brand } from "@/content/site";
import { categories } from "@/content/categories";
import { Mark } from "@/components/marks";
import { Button, Arrow } from "@/components/primitives/Button";
import { OpenPill } from "@/components/home/OpenPill";
import { ease, duration } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:pt-32">
      <div className="shell flex flex-1 flex-col justify-center py-10">
        <motion.div
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: ease.out }}
        >
          <p className="eyebrow">{brand.region}</p>
          <OpenPill />
        </motion.div>

        <h1 className="mt-7 font-display text-display leading-[0.92] tracking-[-0.028em] text-cocoa display-wonk md:mt-9">
          <Line delay={0.08}>Where the everyday</Line>
          <Line delay={0.17}>
            feels like an{" "}
            <span className="relative inline-block whitespace-nowrap">
              occasion
              <Underline />
            </span>
            .
          </Line>
        </h1>

        <motion.div
          className="mt-9 flex max-w-2xl flex-col gap-8 md:mt-11"
          initial={{ opacity: 0, transform: "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.75, ease: ease.out, delay: 0.42 }}
        >
          <p className="text-lead leading-[1.55] text-body">
            {brand.name}. Fifteen counters under one roof in Valsad and Vapi,
            from the sweets set that morning to the live kitchen at the back.
            Everything weighed in front of you.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/what-we-sell" fluid>
              See what we sell
              <Arrow />
            </Button>
            <Button href="/live-snacks" variant="secondary" fluid>
              The live counter
            </Button>
          </div>
        </motion.div>
      </div>

      <Shelf />
      <ScrollCue />
    </section>
  );
}

/**
 * A drawn flourish under one word, not the whole line. The palette keeps
 * terracotta out of running text, so emphasis has to come from a mark like
 * this rather than from colouring the word itself.
 */
function Underline() {
  return (
    <svg
      className="absolute left-0 top-[0.92em] w-full text-terracotta-600"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      height="7"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M3 6.5C48 3 104 2.4 152 4.2c17 .6 32 1.6 45 2.9"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: ease.out, delay: 0.95 }}
      />
    </svg>
  );
}

/** One masked line of the headline. */
function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="line-mask">
      <motion.span
        className="block"
        initial={{ transform: "translateY(105%)" }}
        animate={{ transform: "translateY(0%)" }}
        transition={{ duration: duration.reveal, ease: ease.out, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The shelf. It drifts on its own, and scrolling pushes it along faster in
 * the direction you are travelling, so the page feels physically connected
 * to the wheel. Reduced motion gets a still shelf, which reads perfectly.
 */
function Shelf() {
  const reduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const factor = useTransform(smooth, [-1400, 0, 1400], [-4, 1, 4], {
    clamp: false,
  });

  const items = [...categories, ...categories];
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const f = factor.get();
    direction.current = f < 0 ? -1 : 1;
    // 50% is exactly one copy of the track, so the loop is seamless.
    let next = baseX.get() - (2.4 * delta * direction.current * Math.abs(f)) / 1000;
    next = ((next % 50) + 50) % 50;
    baseX.set(next - 50);
  });

  const x = useTransform(baseX, (v) => `translate3d(${v}%, 0, 0)`);

  return (
    <div
      className="relative border-y border-[rgba(138,90,59,0.18)] bg-clay/45"
      aria-hidden="true"
    >
      <div className="flex overflow-hidden py-5 md:py-6">
        <motion.div className="flex shrink-0" style={{ transform: x }}>
          {[...items, ...items].map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              className="flex shrink-0 items-center gap-3.5 px-5 md:gap-4 md:px-7"
            >
              <Mark
                name={c.mark}
                className="h-7 w-7 shrink-0 text-caramel md:h-8 md:w-8"
              />
              <span className="whitespace-nowrap font-display text-[1.05rem] text-cocoa md:text-[1.25rem]">
                {c.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-[6.5rem] right-[var(--spacing-gutter)] hidden items-center gap-3 lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.6 }}
    >
      <span className="eyebrow">Scroll</span>
      <span className="relative block h-10 w-px overflow-hidden bg-[rgba(138,90,59,0.3)]">
        <motion.span
          className="absolute inset-x-0 top-0 block h-4 bg-terracotta-600"
          animate={{ transform: ["translateY(-100%)", "translateY(250%)"] }}
          transition={{ duration: 1.9, ease: ease.inOut, repeat: Infinity }}
        />
      </span>
    </motion.div>
  );
}
