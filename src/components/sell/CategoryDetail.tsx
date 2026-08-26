"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Category } from "@/content/categories";
import { Mark } from "@/components/marks";
import { ease, duration } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/lenis";

/**
 * The counter, opened.
 *
 * The mark carries a shared layout id, so it travels from the tile into this
 * panel rather than cutting. A modal is not anchored to a trigger, so it
 * scales from its own centre, which is the one case where centre origin is
 * the correct choice.
 */
export function CategoryDetail({
  category,
  onClose,
}: {
  category: Category | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(category);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {category && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[rgba(58,35,26,0.55)] backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: ease.out }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="counter-title"
            data-lenis-prevent
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.5rem] bg-cream shadow-[0_18px_48px_rgba(58,35,26,0.14)] sm:rounded-[1.5rem]"
            initial={{ opacity: 0, transform: "scale(0.96) translateY(12px)" }}
            animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
            exit={{ opacity: 0, transform: "scale(0.97) translateY(8px)" }}
            transition={{ duration: duration.drawer, ease: ease.drawer }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-[rgba(138,90,59,0.18)] bg-clay/60 p-7 md:p-9">
              <div className="flex items-center gap-5">
                <motion.span layoutId={`mark-${category.id}`}>
                  <Mark
                    name={category.mark}
                    className="h-14 w-14 text-caramel md:h-16 md:w-16"
                  />
                </motion.span>
                <div>
                  <h2
                    id="counter-title"
                    className="font-display text-[1.75rem] leading-tight text-cocoa md:text-[2.15rem]"
                  >
                    {category.name}
                  </h2>
                  <p className="mt-1 text-[0.9rem] text-caramel">
                    {category.tagline}
                  </p>
                </div>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(138,90,59,0.3)] text-cocoa transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-cream active:scale-[0.97]"
              >
                <span className="sr-only">Close</span>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-7 md:p-9">
              <p className="max-w-prose text-[1.0625rem] leading-relaxed text-body">
                {category.blurb}
              </p>

              <h3 className="eyebrow mt-9">On this counter</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {category.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-[rgba(138,90,59,0.18)] py-3 text-[0.975rem] text-cocoa last:border-0"
                    initial={{ opacity: 0, transform: "translateY(6px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      duration: 0.35,
                      ease: ease.out,
                      delay: 0.12 + i * 0.025,
                    }}
                  >
                    <span className="text-[0.75rem] tnum text-caramel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <p className="mt-8 rounded-xl bg-clay/60 px-5 py-4 text-[0.875rem] leading-relaxed text-caramel">
                Stock moves with the season and the festival calendar. Call the
                counter before you travel for anything specific.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
