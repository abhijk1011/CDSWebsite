import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { MenuBoard } from "@/components/live/MenuBoard";
import { OpenPill } from "@/components/home/OpenPill";
import { menu, pureVeg, jain } from "@/content/live";
import { stores } from "@/content/site";
import { Button, Arrow } from "@/components/primitives/Button";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";

export const metadata: Metadata = {
  title: "Live snacks",
  description:
    "The live counter at CDS: chaat, burgers, sandwiches, frankies, dabeli, pizza and a cold counter of mojitos. Made after you order it, with no onion, garlic or potato.",
};

const count = menu.reduce((n, s) => n + s.items.length, 0);

export default function LiveSnacksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live snacks"
        lines={["The kitchen at the back."]}
        linesSm={["The kitchen", "at the back."]}
        standfirst="Nothing on this board is made before you ask for it. The tawa runs all day, the fryer goes on at four, and the puris are filled while you stand there because a pani puri that waited is not a pani puri."
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
            {jain && (
              <span className="inline-flex items-center rounded-full border border-[rgba(138,90,59,0.3)] px-3.5 py-1.5 text-[0.75rem] tracking-[0.04em] text-cocoa">
                No onion, no garlic, no potato
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
            className="font-display text-h2 text-cream display-wonk"
            lines={["Ring ahead and it", "will still be hot."]}
            linesSm={["Ring ahead", "and it will", "still be hot."]}
          />
          <Rise>
            <p className="text-[1.0625rem] leading-relaxed text-on-dark-muted">
              A pizza takes about twelve minutes and a frankie about eight, which
              is a long time to stand in a shop on a Sunday. Call the counter,
              tell them when you are coming, and it goes on the tawa to meet you
              rather than to wait for you.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-on-dark-muted">
              One thing worth knowing before you call: once the counter starts an
              order it cannot be cancelled, because by then it is already cooking.
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
