"use client";

import { useEffect, useMemo, useState } from "react";
import { menu } from "@/content/live";
import { Button, Arrow } from "@/components/primitives/Button";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { OpenPill } from "@/components/home/OpenPill";
import { LivePanel, type Dish } from "@/components/home/LivePanel";
import { LiveReel } from "@/components/home/LiveReel";
import { usePrefersReducedMotion } from "@/lib/hooks";

const ROTATE_MS = 3200;

export function LiveTeaser() {
  const reduced = usePrefersReducedMotion();

  // Only dishes that have a picture take a turn. Photography arrives a few
  // dishes at a time, and the rotation should grow with it rather than cut to
  // a bare name whenever it reaches an item nobody has shot yet.
  const dishes = useMemo<Dish[]>(
    () =>
      menu.flatMap((section) =>
        section.items
          .filter((item) => item.image)
          .map((item) => ({
            name: item.name,
            section: section.name,
            image: item.image,
          })),
      ),
    [],
  );
  const count = useMemo(
    () => menu.reduce((n, s) => n + s.items.length, 0),
    [],
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % dishes.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduced, dishes.length]);

  const dish = dishes[i] ?? dishes[0];

  return (
    <section className="relative overflow-hidden border-y border-[rgba(138,90,59,0.18)] bg-clay">
      {/*
        The panel takes the right of the section and its left edge is masked
        away, so the photograph resolves into the clay behind the copy instead
        of meeting it on a seam. Sits behind the text and takes no pointer
        events, so nothing on the left becomes unclickable.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block"
      >
        <LivePanel dish={dish} count={count} feather />
      </div>

      <div className="shell relative py-14 md:py-28">
        <div className="lg:max-w-[46%]">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <p className="eyebrow">The live counter</p>
            <OpenPill />
          </div>

          <MaskReveal
            as="h2"
            className="mt-4 font-display text-h2 text-cocoa display-wonk sm:mt-6"
            lines={["Some things cannot", "wait on a shelf."]}
            linesSm={["Some things", "cannot wait", "on a shelf."]}
          />

          {/*
            The paragraph and the counter list are the argument for the live
            counter, and on a laptop they sit in a column beside the picture at
            no cost. On a phone they stack, and the section became two screens
            of reading before it showed a single dish. The pictures make the
            same case faster, so below lg the words step aside and the reel
            below does the talking.
          */}
          <Rise index={1} className="hidden lg:block">
            <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-body">
              A pani puri filled five minutes ago is a soggy thing, and a pizza
              that sat under a lamp is a different food to one that did not. The
              kitchen at the back runs through the day, and every one of the
              {" "}
              {count} items on this board is made after you order it.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {menu.map((s) => (
                <li
                  key={s.id}
                  className="rounded-full border border-[rgba(138,90,59,0.25)] bg-cream/70 px-3.5 py-1.5 text-[0.8125rem] text-cocoa"
                >
                  {s.name}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button href="/live-snacks" fluid>
                See the live menu
                <Arrow />
              </Button>
            </div>
          </Rise>
        </div>

        {/* Below lg the reel is the section: a strip of dishes that advances on
            its own and answers to a thumb. */}
        <Rise index={1} className="mt-7 lg:hidden">
          <LiveReel dishes={dishes} />

          <div className="mt-7">
            <Button href="/live-snacks" fluid>
              See the live menu
              <Arrow />
            </Button>
          </div>
        </Rise>
      </div>
    </section>
  );
}
