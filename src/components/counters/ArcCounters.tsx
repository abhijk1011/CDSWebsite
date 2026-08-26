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
}: {
  eyebrow?: string;
  lines?: string[];
  intro?: string;
  showLink?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = categories.find((c) => c.id === openId) ?? null;

  return (
    <section className="relative flex h-[92svh] min-h-[560px] w-full flex-col overflow-hidden bg-cocoa text-cream md:h-[94svh] md:min-h-[680px]">
      <div className="shell shrink-0 pt-28 md:pt-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-on-dark-muted">{eyebrow}</p>
            <MaskReveal
              as="h2"
              className="mt-4 max-w-[18ch] font-display text-h2 text-cream display-wonk"
              lines={lines}
            />
          </div>

          {(intro || showLink) && (
            <div className="max-w-md lg:pb-2">
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
      </div>

      <CategoryDetail category={open} onClose={() => setOpenId(null)} />
    </section>
  );
}
