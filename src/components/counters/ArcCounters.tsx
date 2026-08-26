"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/content/categories";
import { CategoryDetail } from "@/components/sell/CategoryDetail";
import { ArcCarousel } from "./ArcCarousel";
import { MaskReveal } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Button";

/**
 * The fifteen counters, presented on the arc.
 *
 * Cocoa rather than the near black the reference uses: black sits outside
 * this palette entirely and reads cold against the cream the rest of the site
 * is built on, whereas cocoa is already the darkest brand colour and gives
 * the same drama. This is the one dark feature band on whichever page it
 * appears, which is why StatBand moved off cocoa when it landed on the home
 * page.
 */
export function ArcCounters({
  eyebrow = "Fifteen counters",
  lines = ["Walk the shop,", "counter by counter."],
  intro,
  showLink = true,
  blendTo = "#F0DDCC",
}: {
  eyebrow?: string;
  lines?: string[];
  intro?: string;
  showLink?: boolean;
  /**
   * The background colour of whatever section follows. The bottom of the arc
   * resolves into it so the two sections meet on a gradient rather than on a
   * hard line straight through the cards.
   */
  blendTo?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = categories.find((c) => c.id === openId) ?? null;

  return (
    <section className="relative flex h-[92svh] min-h-[560px] w-full flex-col overflow-hidden bg-cocoa text-cream md:h-[94svh] md:min-h-[680px]">
      <div className="shell shrink-0 pt-28 md:pt-32">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-on-dark-muted">{eyebrow}</p>
            <MaskReveal
              as="h2"
              className="mt-5 font-display text-h2 text-cream display-wonk"
              lines={lines}
            />
          </div>

          {(intro || showLink) && (
            <div className="lg:pb-1.5">
              {/* The arc needs the vertical room on a phone far more than the
                  intro does, so the paragraph only appears once there is
                  space beside the heading rather than above the cards. */}
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
        <ArcCarousel items={categories} onSelect={setOpenId} />

        {/* Cards resolve down into cocoa, and cocoa resolves into the next
            section, so the join reads as one continuous surface. Sits above
            the cards but below the controls, which stay on the dark stretch. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1500] h-64"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, #3A231A 36%, #3A231A 64%, ${blendTo} 100%)`,
          }}
        />
      </div>

      <CategoryDetail category={open} onClose={() => setOpenId(null)} />
    </section>
  );
}
