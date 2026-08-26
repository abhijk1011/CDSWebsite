"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categories, type Category } from "@/content/categories";
import { Mark } from "@/components/marks";
import { Arrow } from "@/components/primitives/Button";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { useMediaQuery } from "@/lib/hooks";

/**
 * A walk past the counters.
 *
 * On a wide screen the page pins and the row travels sideways with the
 * scroll, which is the closest a browser gets to walking down an aisle.
 * On touch that would mean taking the scroll away from the finger, so the
 * same cards become an ordinary snapping carousel instead. Two behaviours,
 * one set of markup, and neither one is a compromise on its own device.
 */
export function CounterWalk() {
  const isWide = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="relative bg-cream py-20 md:py-28" id="counters">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Fifteen counters</p>
            <MaskReveal
              as="h2"
              className="mt-5 max-w-[16ch] font-display text-h2 text-cocoa display-wonk"
              lines={["Walk the shop", "without leaving your chair."]}
            />
          </div>
          <Rise className="max-w-md lg:pb-2">
            <p className="text-[1.0625rem] leading-relaxed text-body">
              Every counter has its own rhythm. The sweets go early, the farsan
              goes at four, and the live kitchen never really stops.
            </p>
            <Link
              href="/what-we-sell"
              className="group mt-5 inline-flex items-center gap-2 text-[0.95rem] text-terracotta-700 underline decoration-[rgba(163,74,44,0.3)] decoration-1 underline-offset-[6px] transition-colors duration-200 hover:decoration-terracotta-700"
            >
              See every counter
              <Arrow />
            </Link>
          </Rise>
        </div>
      </div>

      {isWide ? <PinnedRow /> : <SwipeRow />}
    </section>
  );
}

function PinnedRow() {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // The track is wider than the viewport by exactly this much, so that is
  // exactly how far it should travel. Measured, never guessed.
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 96));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start start", "end end"],
  });
  // A light spring takes the edge off a trackpad's jitter without adding lag.
  const eased = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.4,
  });
  const x = useTransform(eased, (v) => `translate3d(${-v * distance}px, 0, 0)`);

  return (
    <div
      ref={wrapper}
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative mt-14"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={track}
          className="flex gap-6 pl-[var(--spacing-gutter)] pr-24"
          style={{ transform: x }}
        >
          {categories.map((c, i) => (
            <CounterCard key={c.id} category={c} index={i} />
          ))}
          <EndCard />
        </motion.div>
      </div>

      <div className="pointer-events-none sticky bottom-10 z-10 mx-auto w-40">
        <div className="h-px w-full bg-[rgba(138,90,59,0.22)]">
          <motion.div
            className="h-px origin-left bg-terracotta-600"
            style={{ scaleX: eased }}
          />
        </div>
      </div>
    </div>
  );
}

function SwipeRow() {
  return (
    <div
      className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        paddingInline: "var(--spacing-gutter)",
        scrollPaddingInline: "var(--spacing-gutter)",
      }}
    >
      {categories.map((c, i) => (
        <div key={c.id} className="snap-start">
          <CounterCard category={c} index={i} />
        </div>
      ))}
      <div className="snap-start">
        <EndCard />
      </div>
    </div>
  );
}

function CounterCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  return (
    <Link
      href={`/what-we-sell#${category.id}`}
      className="group flex h-[24rem] w-[16rem] shrink-0 flex-col overflow-hidden rounded-[1.25rem] border border-[rgba(138,90,59,0.18)] bg-cream shadow-[0_2px_12px_rgba(58,35,26,0.06)] transition-[border-color,box-shadow,transform] duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-[rgba(138,90,59,0.3)] hover:shadow-[0_6px_20px_rgba(58,35,26,0.10)] sm:w-[18.5rem] lg:h-[27rem] lg:w-[21rem]"
    >
      <div className="relative flex flex-1 items-center justify-center bg-clay/70">
        <span className="absolute left-5 top-4 font-display text-[0.8125rem] tnum text-caramel">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Mark
          name={category.mark}
          className="h-24 w-24 text-caramel transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06] lg:h-28 lg:w-28"
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-[rgba(138,90,59,0.18)] p-5 lg:p-6">
        <h3 className="font-display text-[1.5rem] leading-tight text-cocoa lg:text-[1.75rem]">
          {category.name}
        </h3>
        <p className="text-[0.9rem] text-caramel">{category.tagline}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-[0.8125rem] text-terracotta-700">
          {category.items.length} lines
          <Arrow className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

function EndCard() {
  return (
    <Link
      href="/what-we-sell"
      className="group flex h-[24rem] w-[16rem] shrink-0 flex-col justify-between rounded-[1.25rem] bg-cocoa p-6 text-cream transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 sm:w-[18.5rem] lg:h-[27rem] lg:w-[21rem]"
    >
      <span className="eyebrow text-on-dark-muted">And the rest</span>
      <div>
        <p className="font-display text-[1.75rem] leading-tight display-wonk lg:text-[2.1rem]">
          Nine hundred products, one address.
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-on-dark-muted transition-colors duration-200 group-hover:text-cream">
          Open the full list
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
