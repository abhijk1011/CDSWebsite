"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { menu, type MenuSection } from "@/content/live";
import { ease } from "@/lib/motion";
import { useReveal } from "@/components/primitives/Reveal";

export function MenuBoard() {
  const [active, setActive] = useState(menu[0].id);
  const refs = useRef(new Map<string, HTMLElement>());

  // Scroll spy for the section rail. Rootmargin biases toward whichever
  // section owns the upper third of the viewport, which is what a reader
  // considers "current".
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="shell grid gap-10 pb-24 md:pb-32 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <nav
        aria-label="Menu sections"
        className="sticky top-[4.5rem] z-30 h-max bg-cream/85 py-3 backdrop-blur-md md:top-20 lg:top-32 lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
      >
        <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-0 [&::-webkit-scrollbar]:hidden">
          {menu.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`relative flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.875rem] transition-colors duration-200 lg:rounded-none lg:px-0 lg:py-2.5 ${
                    on ? "text-cocoa" : "text-caramel hover:text-cocoa"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`hidden h-1.5 w-1.5 shrink-0 rounded-full transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] lg:block ${
                      on
                        ? "scale-100 bg-terracotta-600"
                        : "scale-75 bg-[rgba(138,90,59,0.35)]"
                    }`}
                  />
                  <span className="whitespace-nowrap">{s.name}</span>
                  {on && (
                    <motion.span
                      layoutId="menu-rail"
                      className="absolute inset-0 -z-10 rounded-full bg-clay lg:hidden"
                      transition={{ duration: 0.3, ease: ease.out }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-16 md:space-y-20">
        {menu.map((section) => (
          <Section
            key={section.id}
            section={section}
            register={(el) => el && refs.current.set(section.id, el)}
          />
        ))}
      </div>
    </div>
  );
}

function Section({
  section,
  register,
}: {
  section: MenuSection;
  register: (el: HTMLElement | null) => void;
}) {
  const reveal = useReveal();
  return (
    <section id={section.id} ref={register} className="scroll-mt-32">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[rgba(138,90,59,0.18)] pb-5">
        <div>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-tight text-cocoa display-wonk">
            {section.name}
          </h2>
          <p className="mt-1.5 text-[0.9375rem] text-caramel">
            {section.kicker}
          </p>
        </div>
        <p className="text-[0.8125rem] text-caramel tnum">{section.wait}</p>
      </div>

      <ul className="mt-2">
        {section.items.map((item, i) => (
          <motion.li
            key={item.name}
            variants={{
              hidden: { opacity: 0, transform: "translateY(10px)" },
              shown: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.5, ease: ease.out, delay: i * 0.035 },
              },
            }}
            {...reveal}
            className="flex items-baseline gap-4 border-b border-[rgba(138,90,59,0.12)] py-4 last:border-0"
          >
            <span className="font-display text-[1.15rem] text-cocoa md:text-[1.3rem]">
              {item.name}
            </span>

            {item.note && (
              <span className="text-[0.8125rem] text-caramel">{item.note}</span>
            )}

            <span
              aria-hidden="true"
              className="mx-1 h-px min-w-6 flex-1 self-center border-b border-dotted border-[rgba(138,90,59,0.3)]"
            />

            {item.hot ? (
              <span className="shrink-0 rounded-full bg-terracotta-100 px-3 py-1 text-[0.6875rem] tracking-[0.06em] text-cocoa">
                Counter favourite
              </span>
            ) : item.price ? (
              <span className="shrink-0 tnum text-[0.9375rem] text-cocoa">
                {item.price}
              </span>
            ) : (
              <span className="sr-only">Price on the board in store</span>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
