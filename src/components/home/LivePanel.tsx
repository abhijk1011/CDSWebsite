"use client";

import { AnimatePresence, motion } from "motion/react";
import { ease } from "@/lib/motion";

export type Dish = { name: string; section: string; image?: string };

/**
 * The live panel: whatever the kitchen is making, changing on a slow cycle.
 *
 * The photograph and the name change together, so the panel reads as one
 * thing rather than a caption that happens to sit near a picture. Each frame
 * drifts very slightly while it is up, which keeps a still photograph from
 * looking like a stalled video.
 *
 * With no photograph the frame falls back to the dish name on a warm ground.
 * That is the current state of every item, and it is a deliberate design
 * rather than an empty slot, so the section is finished either way.
 */
export function LivePanel({
  dish,
  count,
  feather = false,
  className = "",
}: {
  dish: Dish;
  count: number;
  /**
   * Dissolve the left edge into whatever sits behind. The mask goes on the
   * picture layer only: masking the whole panel would fade the dish name too,
   * and the name is the point.
   */
  feather?: boolean;
  className?: string;
}) {
  const mask = feather
    ? "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 24%, #000 48%)"
    : undefined;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
      <AnimatePresence initial={false}>
        <motion.div
          key={dish.name}
          className="absolute inset-0"
          initial={{ opacity: 0, transform: "scale(1.08)" }}
          animate={{ opacity: 1, transform: "scale(1.015)" }}
          exit={{ opacity: 0, transform: "scale(1.015)" }}
          transition={{
            opacity: { duration: 0.85, ease: ease.out },
            transform: { duration: 3.4, ease: "linear" },
          }}
        >
          {dish.image ? (
            <>
              {/* A plain img on purpose. The site is a static export with
                  images.unoptimized set, so next/image would add a wrapper
                  and a loader without optimising anything. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dish.image}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Scrim only where a photograph needs it. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 block"
                style={{
                  background:
                    "linear-gradient(to top, rgba(58,35,26,0.72) 0%, rgba(58,35,26,0.15) 42%, rgba(58,35,26,0) 70%)",
                }}
              />
            </>
          ) : (
            <span
              aria-hidden="true"
              className="block h-full w-full"
              style={{
                background:
                  "radial-gradient(120% 95% at 62% 18%, #F8E9E0 0%, #E9CFB9 46%, #D2AE93 100%)",
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
      </div>

      {/* The word. Above every frame, and outside the mask, so it stays
          legible however far the picture behind it has dissolved. */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-9"
        style={feather ? { paddingLeft: "36%" } : undefined}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta-600 opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta-700" />
          </span>
          <span
            className={`text-[0.7rem] tracking-[0.16em] uppercase ${
              dish.image ? "text-on-dark-muted" : "text-caramel"
            }`}
          >
            {dish.section}
          </span>
        </div>

        <div className="relative mt-2 h-[clamp(2.6rem,6vw,4.4rem)] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={dish.name}
              className={`absolute inset-0 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.15] display-wonk ${
                dish.image ? "text-cream" : "text-cocoa"
              }`}
              initial={{ opacity: 0, transform: "translateY(75%)" }}
              animate={{ opacity: 1, transform: "translateY(0%)" }}
              exit={{ opacity: 0, transform: "translateY(-75%)" }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              {dish.name}
            </motion.p>
          </AnimatePresence>
        </div>

        <p
          className={`mt-3 text-[0.8125rem] tnum ${
            dish.image ? "text-on-dark-muted" : "text-caramel"
          }`}
        >
          {count} items on the board
        </p>
      </div>
    </div>
  );
}
