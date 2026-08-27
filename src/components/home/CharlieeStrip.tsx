import Link from "next/link";
import { byId } from "@/content/categories";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Button";
import { CharlieeMosaic } from "@/components/home/CharlieeMosaic";

export function CharlieeStrip() {
  const charliee = byId("charliee");

  return (
    <section className="relative overflow-hidden bg-cream pt-20 md:pt-28">
      {/*
        Words first, briefly, then the wall of product. The claim only means
        anything once you have seen how much carries the name, so the reading
        is kept to two sentences and the mosaic below makes the rest of the
        case on its own.
      */}
      <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="eyebrow">The house label</p>
          <MaskReveal
            as="h2"
            className="mt-4 font-display text-h2 text-cocoa display-wonk sm:mt-5"
            lines={["Our name goes on", "last, not first."]}
            linesSm={["Our name goes", "on last,", "not first."]}
          />
        </div>

        <Rise>
          <p className="max-w-lg text-[1.0625rem] leading-relaxed text-body">
            {charliee?.blurb} A product has to outsell everything beside it on
            the shelf before we will put Charliee on the front of the pack, and
            plenty never do.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 text-[0.95rem] text-terracotta-700 underline decoration-[rgba(163,74,44,0.3)] decoration-1 underline-offset-[6px] transition-colors duration-200 hover:decoration-terracotta-700"
          >
            How we choose what to stock
            <Arrow />
          </Link>
        </Rise>
      </div>

      <CharlieeMosaic />
    </section>
  );
}
