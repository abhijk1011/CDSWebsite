"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { OpenPill } from "@/components/home/OpenPill";

/**
 * The top of the live snacks page.
 *
 * One photograph, full bleed, with the headline sitting on it. Not a
 * carousel: a hero that shuffles pictures asks the reader to wait and see
 * what else is coming, and the job here is to get them moving down the page
 * instead.
 *
 * The picture rises slowly as the page scrolls and the whole layer fades as
 * it leaves, so the section under it arrives on clean ground rather than
 * sliding over a hard edge.
 */
export function LiveHero({
  image,
  count,
  pictured,
  jain,
}: {
  image: string;
  count: number;
  pictured: number;
  jain: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Neutralise the ranges rather than the style object: dropping `style` on a
  // later render leaves Motion's last written transform in place, which is
  // exactly the movement reduced motion is asking us to stop.
  const rise = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -14]);
  const lift = useMotionTemplate`translate3d(0, ${rise}%, 0)`;
  const dim = useTransform(scrollYProgress, [0, 0.85], reduced ? [1, 1] : [1, 0]);

  return (
    <div
      ref={ref}
      className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden bg-cocoa"
    >
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: lift, opacity: dim }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="h-full w-full scale-[1.14] object-cover"
          fetchPriority="high"
          decoding="async"
        />
        {/*
          Two scrims, because they do different jobs. The first weights the
          bottom, where the headline sits. The second darkens the very top,
          where the site chrome floats over the photograph with nothing else
          behind it. A single gradient cannot serve both ends without
          flattening the middle, which is the part worth looking at.
        */}
        <span
          aria-hidden="true"
          className="absolute inset-0 block"
          style={{
            background:
              "linear-gradient(to top, rgba(28,17,12,0.95) 0%, rgba(28,17,12,0.88) 32%, rgba(28,17,12,0.76) 54%, rgba(28,17,12,0.38) 72%, rgba(28,17,12,0) 90%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 block h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,17,12,0.62) 0%, rgba(28,17,12,0.28) 55%, rgba(28,17,12,0) 100%)",
          }}
        />
      </motion.div>

      <div className="shell relative w-full pb-14 pt-32 md:pb-20 md:pt-40">
        <motion.div
          initial={reduced ? false : "hidden"}
          animate="shown"
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              shown: { opacity: 1, transition: { duration: 0.6, ease: ease.out } },
            }}
            className="text-[0.7rem] tracking-[0.2em] uppercase text-cream"
          >
            The live counter
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(2.9rem,13vw,7rem)] leading-[0.95] text-cream display-wonk">
            {["Made after", "you ask."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { transform: "translateY(105%)" },
                    shown: {
                      transform: "translateY(0%)",
                      transition: {
                        duration: 0.95,
                        ease: ease.out,
                        delay: i * 0.075,
                      },
                    },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, transform: "translateY(14px)" },
              shown: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.7, ease: ease.out },
              },
            }}
            className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-cream"
          >
            The tawa runs all day and the fryer goes on at four. Nothing on this
            board is cooked before you order it.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, transform: "translateY(14px)" },
              shown: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.7, ease: ease.out },
              },
            }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2.5"
          >
            <OpenPill />
            {jain && (
              <span className="rounded-full border border-[rgba(253,248,242,0.28)] px-3.5 py-1.5 text-[0.75rem] text-cream">
                No onion, no garlic, no potato
              </span>
            )}
            <span className="rounded-full border border-[rgba(253,248,242,0.28)] px-3.5 py-1.5 text-[0.75rem] text-cream tnum">
              {count} items · {pictured} pictured
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
