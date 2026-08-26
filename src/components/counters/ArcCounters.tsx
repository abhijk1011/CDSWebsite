"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { categories } from "@/content/categories";
import { CategoryDetail } from "@/components/sell/CategoryDetail";
import { ArcCarousel, type ArcApi } from "./ArcCarousel";
import { MaskReveal } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Button";
import { ease } from "@/lib/motion";

/**
 * The fifteen counters, presented on the arc.
 *
 * Three real rows: the heading, the arc, and a bar. The controls live in the
 * bar rather than floating over the cards, which is what lets the cards take
 * every pixel of the middle row and never collide with anything.
 *
 * Cocoa rather than the near black of the reference, which sits outside this
 * palette and reads cold against the cream. This is the one dark feature band
 * on whichever page it appears.
 */
export function ArcCounters({
  eyebrow = "Fifteen counters",
  lines = ["Walk the shop,", "counter by counter."],
  intro,
  showLink = true,
}: {
  eyebrow?: string;
  lines?: string[];
  intro?: string;
  showLink?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const api = useRef<ArcApi | null>(null);

  const open = categories.find((c) => c.id === openId) ?? null;
  const onActiveChange = useCallback((i: number) => setActive(i), []);
  const current = categories[active] ?? categories[0];

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden bg-cocoa text-cream">
      <div className="shell shrink-0 pt-28 pb-8 md:pt-28 md:pb-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-on-dark-muted">{eyebrow}</p>
            <MaskReveal
              as="h2"
              className="mt-4 font-display text-h2 text-cream display-wonk"
              lines={lines}
            />
          </div>

          {(intro || showLink) && (
            <div className="lg:pb-1.5">
              {intro && (
                <p className="hidden text-[1.0625rem] leading-relaxed text-on-dark-muted lg:block">
                  {intro}
                </p>
              )}
              {showLink && (
                <Link
                  href="/what-we-sell"
                  className="group mt-5 inline-flex items-center gap-2 text-[0.95rem] text-cream underline decoration-[rgba(253,248,242,0.3)] decoration-1 underline-offset-[6px] transition-colors duration-200 hover:decoration-cream"
                >
                  See every counter in full
                  <Arrow />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <ArcCarousel
          items={categories}
          onSelect={setOpenId}
          onActiveChange={onActiveChange}
          apiRef={api}
        />
      </div>

      {/* The bar. Reading position on the left, controls on the right. */}
      <div className="shrink-0 border-t border-[rgba(253,248,242,0.14)] bg-smoke">
        <div className="shell flex items-center justify-between gap-6 py-3.5">
          <p className="flex min-w-0 flex-1 items-baseline gap-3">
            <span className="shrink-0 text-[0.8125rem] tnum text-on-dark-muted">
              {String(active + 1).padStart(2, "0")} / {categories.length}
            </span>
            <span className="relative block h-[1.6rem] min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.id}
                  className="absolute inset-0 truncate font-display text-[1.15rem] leading-[1.6rem] text-cream"
                  initial={{ opacity: 0, transform: "translateY(90%)" }}
                  animate={{ opacity: 1, transform: "translateY(0%)" }}
                  exit={{ opacity: 0, transform: "translateY(-90%)" }}
                  transition={{ duration: 0.32, ease: ease.out }}
                >
                  {current.name}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>

          <div className="flex shrink-0 items-center gap-2.5">
            <span className="hidden text-[0.7rem] tracking-[0.16em] text-on-dark-muted uppercase sm:block">
              Drag to explore
            </span>
            <Control label="Previous counter" onClick={() => api.current?.step(-1)}>
              <Chevron className="rotate-180" />
            </Control>
            <Control label="Next counter" onClick={() => api.current?.step(1)}>
              <Chevron />
            </Control>
          </div>
        </div>
      </div>

      <CategoryDetail category={open} onClose={() => setOpenId(null)} />
    </section>
  );
}

function Control({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(253,248,242,0.3)] text-cream transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[rgba(253,248,242,0.6)] hover:bg-[rgba(253,248,242,0.1)] active:scale-[0.94]"
    >
      {children}
    </button>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
