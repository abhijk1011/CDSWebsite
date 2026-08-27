"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { menu } from "@/content/live";
import { ease } from "@/lib/motion";

/**
 * Sticky chapter rail.
 *
 * Seven sections and a page of photographs is a long scroll on a phone, so
 * the rail exists to answer "where am I" without one. The moving pill is
 * state indication, not decoration: it is the only thing on the page that
 * reports position, and a jump would read as a glitch rather than a change.
 *
 * The active pill is scrolled back into view when the spy moves it, because
 * a rail that scrolls off its own current item on a narrow screen is worse
 * than no rail at all.
 */
export function SectionRail() {
  const [active, setActive] = useState(menu[0].id);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = menu
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    // Biased to whatever owns the upper third, which is what a reader
    // considers current.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>(`[data-for="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Menu sections"
      className="sticky top-[3.75rem] z-30 border-b border-[rgba(138,90,59,0.16)] bg-cream/88 backdrop-blur-md md:top-[4.5rem]"
    >
      <ul
        ref={list}
        className="shell flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {menu.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                data-for={s.id}
                aria-current={on ? "true" : undefined}
                className={`relative block rounded-full px-3.5 py-1.5 text-[0.8125rem] whitespace-nowrap transition-colors duration-200 ${
                  on ? "text-cream" : "text-caramel hover:text-cocoa"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="live-rail"
                    className="absolute inset-0 -z-10 rounded-full bg-cocoa"
                    transition={{ duration: 0.32, ease: ease.out }}
                  />
                )}
                {s.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
