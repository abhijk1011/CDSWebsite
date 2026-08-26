"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, brand, stores } from "@/content/site";
import { Wordmark } from "@/components/marks";
import { Arrow } from "@/components/primitives/Button";
import { ease, duration } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/lenis";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? "border-b border-[rgba(138,90,59,0.18)] bg-[rgba(253,248,242,0.82)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link
            href="/"
            aria-label={`${brand.short}, home`}
            className="relative z-10 text-cocoa transition-opacity duration-200 hover:opacity-70"
          >
            <Wordmark className="h-7 w-auto md:h-[1.85rem]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2.5 text-[0.9rem] transition-colors duration-200 ${
                    active ? "text-cocoa" : "text-body hover:text-cocoa"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 bottom-1.5 h-px bg-terracotta-700"
                      transition={{ duration: 0.32, ease: ease.out }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${stores[0].phoneDial}`}
              className="group hidden items-center gap-2 rounded-full border border-[rgba(138,90,59,0.4)] px-5 py-2.5 text-[0.875rem] text-cocoa transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-caramel hover:bg-clay active:scale-[0.98] sm:inline-flex"
            >
              Call the counter
              <Arrow />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(138,90,59,0.4)] text-cocoa transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-clay active:scale-[0.97] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-[18px]">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-current"
                  animate={
                    open
                      ? { top: "6px", rotate: 45 }
                      : { top: "1px", rotate: 0 }
                  }
                  transition={{ duration: 0.24, ease: ease.out }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-current"
                  animate={
                    open
                      ? { top: "6px", rotate: -45 }
                      : { top: "11px", rotate: 0 }
                  }
                  transition={{ duration: 0.24, ease: ease.out }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-cocoa lg:hidden"
            data-lenis-prevent
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: duration.drawer, ease: ease.drawer }}
          >
            <div className="shell flex flex-1 flex-col justify-center gap-1 pt-24 pb-12">
              {nav.map((item, i) => (
                <span key={item.href} className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ transform: "translateY(105%)" }}
                    animate={{ transform: "translateY(0%)" }}
                    transition={{
                      duration: 0.55,
                      ease: ease.out,
                      delay: 0.06 + i * 0.05,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 font-display text-[clamp(2.25rem,10vw,3.5rem)] leading-[1.05] text-cream display-wonk"
                    >
                      {item.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.div
              className="border-t border-[rgba(253,248,242,0.14)] bg-smoke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24, duration: 0.4 }}
            >
              <div className="shell grid gap-5 py-7 sm:grid-cols-2">
                {stores.map((s) => (
                  <a
                    key={s.slug}
                    href={`tel:${s.phoneDial}`}
                    className="block text-cream"
                  >
                    <span className="eyebrow block text-on-dark-muted">
                      {s.city}
                    </span>
                    <span className="mt-1 block text-[1.05rem] tnum">
                      {s.phoneDisplay}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
