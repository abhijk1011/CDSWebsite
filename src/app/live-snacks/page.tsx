import type { Metadata } from "next";
import { menu, boardNotes, pricesAsOf, jain } from "@/content/live";
import { LiveHero } from "@/components/live/LiveHero";
import { SectionRail } from "@/components/live/SectionRail";
import { Chapter } from "@/components/live/Chapter";
import { DishCard } from "@/components/live/DishCard";
import { RestOfBoard } from "@/components/live/RestOfBoard";
import { OrderOut } from "@/components/live/OrderOut";

export const metadata: Metadata = {
  title: "Live snacks",
  description:
    "The live counter at CDS: chaat, burgers, sandwiches, frankies, dabeli, pizza and a cold counter of mojitos. Made after you order it, with no onion, garlic or potato.",
};

const count = menu.reduce((n, s) => n + s.items.length, 0);
const pictured = menu.reduce(
  (n, s) => n + s.items.filter((i) => i.image).length,
  0,
);

/** The hero takes the first photograph on the board. */
const heroImage = menu.flatMap((s) => s.items).find((i) => i.image)?.image ?? "";

export default function LiveSnacksPage() {
  let card = 0;

  return (
    <>
      <LiveHero
        image={heroImage}
        count={count}
        pictured={pictured}
        jain={jain}
      />

      <SectionRail />

      <div className="shell space-y-14 py-10 md:space-y-32 md:py-24">
        {menu.map((section, n) => {
          const shot = section.items.filter((i) => i.image);
          const rest = section.items.filter((i) => !i.image);

          return (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <Chapter section={section} n={n + 1} photographed={shot.length} />

              {shot.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4 lg:grid-cols-3">
                  {shot.map((item, i) => (
                    <DishCard
                      key={item.name}
                      item={item}
                      section={section.name}
                      index={i}
                      priority={card++ === 0}
                      wide={shot.length % 2 === 1 && i === shot.length - 1}
                    />
                  ))}
                </div>
              )}

              {rest.length > 0 && (
                <div className={shot.length > 0 ? "mt-8 md:mt-12" : "mt-5 md:mt-8"}>
                  <RestOfBoard items={rest} />
                </div>
              )}
            </section>
          );
        })}

        {/* The small print the real board ends on. */}
        <footer className="border-t border-[rgba(138,90,59,0.18)] pt-8">
          <ul className="space-y-2.5">
            {boardNotes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 text-[0.875rem] text-caramel"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-600"
                />
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.8125rem] text-caramel">
            Prices read off the counter board in {pricesAsOf}. The number beside
            each item is the code to give at the counter.
          </p>
        </footer>
      </div>

      <OrderOut />
    </>
  );
}
