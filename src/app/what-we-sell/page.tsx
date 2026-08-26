import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { CategoryGrid } from "@/components/sell/CategoryGrid";
import { ArcCounters } from "@/components/counters/ArcCounters";
import { categories, groups } from "@/content/categories";
import { Marquee } from "@/components/primitives/Marquee";
import { Mark } from "@/components/marks";

export const metadata: Metadata = {
  title: "What we sell",
  description:
    "Fifteen counters at CDS: sweets, farsan, bakery, dry fruits, saffron, chocolate, the imported shelf and the Charliee house label.",
};

const total = categories.reduce((n, c) => n + c.items.length, 0);

export default function WhatWeSellPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we sell"
        lines={["Fifteen counters,", "one room."]}
        standfirst="Sweets set that morning, farsan fried the same afternoon, an imported aisle people drive in for and a gifting counter that carries most of October. Tap any counter to see what sits on it."
        aside={
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="eyebrow">Counters</dt>
              <dd className="mt-1 font-display text-[1.6rem] tnum text-cocoa">
                {categories.length}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Lines listed</dt>
              <dd className="mt-1 font-display text-[1.6rem] tnum text-cocoa">
                {total}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Groups</dt>
              <dd className="mt-1 font-display text-[1.6rem] tnum text-cocoa">
                {groups.length}
              </dd>
            </div>
          </dl>
        }
      />

      <ArcCounters
        eyebrow="The counters"
        lines={["Every counter,", "on one arc."]}
        intro="Drag through the whole shop. Open any counter to read what sits on it, or use the list below to jump straight to one."
        showLink={false}
      />

      <section className="shell pt-20 pb-4 md:pt-28">
        <p className="eyebrow">The full list</p>
        <h2 className="mt-5 max-w-[18ch] font-display text-h2 text-cocoa display-wonk">
          Or browse them the plain way.
        </h2>
      </section>

      <CategoryGrid />

      <section className="border-y border-[rgba(138,90,59,0.18)] bg-clay py-8">
        <Marquee speed={60}>
          {categories.map((c) => (
            <span key={c.id} className="flex items-center gap-3.5 px-6">
              <Mark name={c.mark} className="h-6 w-6 text-caramel" />
              <span className="whitespace-nowrap font-display text-[1.15rem] text-cocoa">
                {c.name}
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="shell max-w-3xl text-center">
          <p className="eyebrow">Not on the list</p>
          <h2 className="mt-5 font-display text-h2 text-cocoa display-wonk">
            Ask, and we will usually find it.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-body">
            Half of the imported aisle exists because a regular asked for
            something we did not carry. There is a request book by the till and
            somebody actually reads it.
          </p>
        </div>
      </section>
    </>
  );
}
