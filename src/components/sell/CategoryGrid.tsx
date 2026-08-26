"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { categories, groups, type Category, type Group } from "@/content/categories";
import { Mark } from "@/components/marks";
import { CategoryDetail } from "./CategoryDetail";
import { ease } from "@/lib/motion";

type Filter = Group | "All counters";
const filters: Filter[] = ["All counters", ...groups];

export function CategoryGrid() {
  const [filter, setFilter] = useState<Filter>("All counters");
  const [openId, setOpenId] = useState<string | null>(null);

  const shown =
    filter === "All counters"
      ? categories
      : categories.filter((c) => c.group === filter);

  const open = categories.find((c) => c.id === openId) ?? null;

  return (
    <section className="shell pb-24 md:pb-32">
      <div
        role="tablist"
        aria-label="Filter counters"
        className="sticky top-[4.5rem] z-30 flex gap-2 overflow-x-auto bg-cream/85 py-4 backdrop-blur-md [scrollbar-width:none] md:top-20 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`relative shrink-0 rounded-full px-4 py-2.5 text-[0.875rem] transition-[color,border-color] duration-200 ${
                active
                  ? "text-cream"
                  : "border border-[rgba(138,90,59,0.3)] text-body hover:border-caramel hover:text-cocoa"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-cocoa"
                  transition={{ duration: 0.32, ease: ease.out }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>

      <motion.ul
        layout
        className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((c) => (
            <Tile key={c.id} category={c} onOpen={() => setOpenId(c.id)} />
          ))}
        </AnimatePresence>
      </motion.ul>

      <CategoryDetail category={open} onClose={() => setOpenId(null)} />
    </section>
  );
}

function Tile({
  category,
  onOpen,
}: {
  category: Category;
  onOpen: () => void;
}) {
  return (
    <motion.li
      layout
      id={category.id}
      initial={{ opacity: 0, transform: "scale(0.96)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.96)" }}
      transition={{ duration: 0.32, ease: ease.out }}
      className="scroll-mt-32"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group flex h-full w-full flex-col overflow-hidden rounded-[1.1rem] border border-[rgba(138,90,59,0.18)] bg-cream text-left shadow-[0_2px_12px_rgba(58,35,26,0.06)] transition-[border-color,box-shadow,transform] duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-[rgba(138,90,59,0.3)] hover:shadow-[0_6px_20px_rgba(58,35,26,0.10)] active:scale-[0.99]"
      >
        <span className="relative flex aspect-[4/3] items-center justify-center bg-clay/70">
          <motion.span layoutId={`mark-${category.id}`}>
            <Mark
              name={category.mark}
              className="h-[4.5rem] w-[4.5rem] text-caramel transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.07] md:h-24 md:w-24"
            />
          </motion.span>
          <span className="absolute right-3 top-3 rounded-full bg-cream/80 px-2.5 py-1 text-[0.6875rem] tnum text-caramel">
            {category.items.length}
          </span>
        </span>

        <span className="flex flex-1 flex-col gap-1 border-t border-[rgba(138,90,59,0.18)] p-4 md:p-5">
          <span className="font-display text-[1.15rem] leading-tight text-cocoa md:text-[1.35rem]">
            {category.name}
          </span>
          <span className="text-[0.8125rem] leading-snug text-caramel">
            {category.tagline}
          </span>
        </span>
      </button>
    </motion.li>
  );
}
