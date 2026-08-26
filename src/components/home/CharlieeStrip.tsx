import { byId } from "@/content/categories";
import { Mark } from "@/components/marks";
import { Marquee } from "@/components/primitives/Marquee";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Button";
import Link from "next/link";

export function CharlieeStrip() {
  const charliee = byId("charliee");

  return (
    <section className="overflow-hidden bg-cream py-20 md:py-28">
      <Marquee speed={54} className="border-y border-[rgba(138,90,59,0.18)] py-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-cocoa display-wonk">
              Charliee
            </span>
            <Mark name="charliee" className="h-7 w-7 text-terracotta-600" />
          </span>
        ))}
      </Marquee>

      <div className="shell mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow">The house label</p>
          <MaskReveal
            as="h2"
            className="mt-5 font-display text-h2 text-cocoa display-wonk"
            lines={["Our name goes on", "last, not first."]}
          />
        </div>

        <Rise>
          <p className="text-[1.0625rem] leading-relaxed text-body">
            {charliee?.blurb} It is a slow way to build a label. A product has
            to outsell everything beside it on the shelf before we are willing
            to put Charliee on the front of the pack, and plenty never do.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {charliee?.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[rgba(138,90,59,0.18)] bg-clay/60 px-4 py-2 text-[0.875rem] text-cocoa"
              >
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2 text-[0.95rem] text-terracotta-700 underline decoration-[rgba(163,74,44,0.3)] decoration-1 underline-offset-[6px] transition-colors duration-200 hover:decoration-terracotta-700"
          >
            How we choose what to stock
            <Arrow />
          </Link>
        </Rise>
      </div>
    </section>
  );
}
