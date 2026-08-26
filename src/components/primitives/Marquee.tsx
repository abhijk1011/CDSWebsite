"use client";

import type { ReactNode } from "react";

/**
 * Seamless ticker. Constant motion takes linear easing, and it runs as a CSS
 * animation so it keeps its frames while the main thread is busy. The track
 * is duplicated once and shifted by exactly half, which is what makes the
 * loop invisible. The copy is hidden from screen readers.
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className="flex shrink-0 items-center will-change-transform motion-reduce:animate-none"
        style={{
          animation: `cds-marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes cds-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
