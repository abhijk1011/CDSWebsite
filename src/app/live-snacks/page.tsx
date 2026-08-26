import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { MenuBoard } from "@/components/live/MenuBoard";
import { OpenPill } from "@/components/home/OpenPill";
import { menu, pureVeg } from "@/content/live";
import { stores } from "@/content/site";
import { Button, Arrow } from "@/components/primitives/Button";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";

export const metadata: Metadata = {
  title: "Live snacks",
  description:
    "The live counter at CDS: pizza, sandwiches, chaat, pav bhaji, hot jalebi and the cold counter. Everything made after you order it.",
};

const count = menu.reduce((n, s) => n + s.items.length, 0);

export default function LiveSnacksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live snacks"
        lines={["The kitchen", "at the back."]}
        standfirst="Nothing on this board is made before you ask for it. The tawa runs all day, the fryer goes on at four and the jalebi comes out of the syrup while you are still paying for it."
        aside={
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <OpenPill />
            {pureVeg && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,90,59,0.3)] px-3.5 py-1.5 text-[0.75rem] tracking-[0.04em] text-cocoa">
                <span
                  aria-hidden="true"
                  className="flex h-3.5 w-3.5 items-center justify-center border border-[#4a7c3f]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4a7c3f]" />
                </span>
                Pure vegetarian kitchen
              </span>
            )}
            <span className="text-[0.8125rem] tnum text-caramel">
              {count} items on the board
            </span>
          </div>
        }
      />

      <MenuBoard />

      <section className="bg-cocoa py-20 text-cream md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <MaskReveal
            as="h2"
            className="max-w-[15ch] font-display text-h2 text-cream display-wonk"
            lines={["Prices live", "on the board,", "not on a website."]}
          />
          <Rise>
            <p className="text-[1.0625rem] leading-relaxed text-on-dark-muted">
              Ingredient costs move, and a page that quietly goes stale is worse
              than a page that never claimed to be current. The board above the
              counter is the real menu. Call either store and someone will read
              you today’s prices in about ten seconds.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {stores.map((s, i) => (
                <Button
                  key={s.slug}
                  href={`tel:${s.phoneDial}`}
                  variant={i === 0 ? "primary" : "onDark"}
                >
                  Call {s.city}
                  <Arrow />
                </Button>
              ))}
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
