"use client";

import type { Category } from "@/content/categories";
import { Mark } from "@/components/marks";

/**
 * One card on the arc.
 *
 * Carries a muted looping clip when the counter has one. Until real footage
 * exists it falls back to the counter's drawn mark on clay, which is the same
 * treatment used everywhere else on the site, so the section reads as
 * finished rather than as a row of empty slots.
 */
export function ArcCard({
  item,
  index,
  videoRef,
  shadeRef,
  onOpen,
  onFocus,
}: {
  item: Category;
  index: number;
  videoRef?: (el: HTMLVideoElement | null) => void;
  shadeRef?: (el: HTMLSpanElement | null) => void;
  onOpen: () => void;
  onFocus: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onFocus={onFocus}
      aria-label={`${item.name}, ${item.tagline}. ${item.items.length} lines.`}
      className="group relative block aspect-3/4 w-full overflow-hidden rounded-[20px] bg-clay text-left shadow-[0_18px_48px_rgba(0,0,0,0.35)] outline-none focus-visible:ring-3 focus-visible:ring-terracotta-600"
    >
      {/* Media */}
      <span className="absolute inset-0 block">
        {item.video ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={item.video}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-linear-to-b from-clay to-terracotta-100">
            <Mark
              name={item.mark}
              className="h-[38%] w-[38%] text-caramel transition-transform duration-[520ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
            />
          </span>
        )}
      </span>

      <span className="absolute left-5 top-4 z-10 font-display text-[0.8125rem] tnum text-caramel">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Caption */}
      <span className="absolute inset-x-0 bottom-0 z-10 block border-t border-[rgba(138,90,59,0.18)] bg-cream px-5 py-4">
        <span className="block font-display text-[1.35rem] leading-tight text-cocoa">
          {item.name}
        </span>
        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-caramel">
          {item.tagline}
        </span>
      </span>

      {/* Edge darkening, driven from the rAF loop. */}
      <span
        ref={shadeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 block bg-cocoa"
        style={{ opacity: 0 }}
      />
    </button>
  );
}
