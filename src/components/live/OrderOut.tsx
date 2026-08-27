"use client";

import { motion } from "motion/react";
import { delivery, stores } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReveal } from "@/components/primitives/Reveal";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Button, Arrow } from "@/components/primitives/Button";

/**
 * Stand in marks for the delivery partners.
 *
 * These are NOT the official Zomato and Swiggy logos. The machine that built
 * this page cannot reach either brand's asset host, and a hand traced copy of
 * somebody's trademark is worse than an honest placeholder: it looks like the
 * real thing while being wrong.
 *
 * So each button carries the partner's own colour and its name set in type,
 * with a neutral glyph. Drop the official `zomato.svg` or `swiggy.svg` into
 * `public/brands` and the button uses it instead, with nothing to change here.
 */
function Glyph({ id, colour }: { id: string; colour: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
      style={{ backgroundColor: colour }}
    >
      {id === "zomato" ? (
        // A plate and a fork: generic delivery, not anybody's trademark.
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8.5v7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
          <circle cx="12" cy="10.5" r="2.2" />
        </svg>
      )}
    </span>
  );
}

function PartnerButton({
  id,
  label,
  href,
  colour,
  index,
}: {
  id: string;
  label: string;
  href: string;
  colour: string;
  index: number;
}) {
  const reveal = useReveal();
  return (
    <motion.a
      {...reveal}
      variants={{
        hidden: { opacity: 0, transform: "translateY(16px)" },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.6, ease: ease.out, delay: index * 0.07 },
        },
      }}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-1 items-center gap-3.5 rounded-2xl border border-[rgba(253,248,242,0.2)] bg-[rgba(253,248,242,0.05)] px-5 py-4 transition-[background-color,border-color,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[rgba(253,248,242,0.1)] hover:border-[rgba(253,248,242,0.42)] active:scale-[0.99] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(253,248,242,0.3)]"
    >
      <Glyph id={id} colour={colour} />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.7rem] tracking-[0.14em] uppercase text-on-dark-muted">
          Order on
        </span>
        <span className="block text-[1.0625rem] leading-tight text-cream">
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 text-cream transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </span>
    </motion.a>
  );
}

/** Closes the page: eat here, or have it sent. */
export function OrderOut() {
  return (
    <section className="relative overflow-hidden bg-cocoa py-20 text-cream md:py-28">
      <div className="shell relative">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-on-dark-muted">
            Hungry now
          </p>
          <MaskReveal
            as="h2"
            className="mt-5 font-display text-h2 text-cream display-wonk"
            lines={["Come to the counter,", "or have it sent."]}
            linesSm={["Come to the", "counter, or", "have it sent."]}
          />
          <Rise index={1}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-on-dark-muted">
              Everything is best about ninety seconds after it leaves the tawa,
              which is an argument for eating it here. When that is not the
              plan, both stores are on Zomato and Swiggy.
            </p>
          </Rise>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {delivery.map((d, i) => (
            <PartnerButton
              key={d.id}
              id={d.id}
              label={d.label}
              href={d.href}
              colour={d.colour}
              index={i}
            />
          ))}
        </div>

        <Rise index={2}>
          <div className="mt-12 border-t border-[rgba(253,248,242,0.16)] pt-10">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-on-dark-muted">
              Or walk in
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {stores.map((s) => (
                <div key={s.slug}>
                  <p className="font-display text-[1.25rem] text-cream">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-on-dark-muted">
                    {s.lines.join(", ")}
                  </p>
                  <div className="mt-4">
                    <Button href={`tel:${s.phoneDial}`} variant="onDark">
                      Call {s.city}
                      <Arrow />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
