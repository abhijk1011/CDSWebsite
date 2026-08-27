"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dish } from "@/components/home/LivePanel";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The live counter on a phone, as a reel rather than a caption beside a photo.
 *
 * Two ideas do the work.
 *
 * The first is that a change of dish is one object moving, not two objects
 * crossfading. The outgoing frame and the incoming frame travel together, at
 * the same velocity on the same curve, so the eye reads a strip advancing by
 * one frame. A crossfade reads as software; a strip reads as a thing.
 *
 * The second is that it answers to a thumb. Auto advance alone is a broadcast,
 * and the moment a finger lands on it the reel should belong to the finger
 * instead: it tracks one to one, it hands the release velocity to the spring
 * that finishes the throw, and it lands on whichever frame the throw was
 * actually going to reach rather than the nearest one.
 *
 * It runs sideways for a reason that has nothing to do with looks. The page
 * scrolls vertically, so a vertical drag here would swallow the very gesture a
 * reader uses to leave the section. Sideways is the axis the page is not
 * using, which is why every phone carousel worth the name picks it.
 *
 * Reduced motion drops both, to a plain cross fade with no auto advance, which
 * leaves a reader in charge of a still picture.
 */

/** Hold per frame. Short, because the pictures are the point. */
const HOLD_MS = 2400;

/** Back off auto advance for a moment after a touch, so it never fights one. */
const RESUME_MS = 4200;

/**
 * Where a throw would come to rest, using the exponential decay Apple ships in
 * its fluid interfaces sample rather than the physics textbook form. Landing
 * on the projected frame is what makes a flick feel thrown instead of nudged.
 */
const project = (velocity: number, deceleration = 0.9975) =>
  ((velocity / 1000) * deceleration) / (1 - deceleration);

export function LiveReel({ dishes }: { dishes: Dish[] }) {
  const reduced = usePrefersReducedMotion();
  const [[index, direction], setFrame] = useState<[number, number]>([0, 1]);
  const [held, setHeld] = useState(false);
  const resumeAt = useRef(0);
  const n = dishes.length;

  const step = useCallback(
    (by: number) => setFrame(([i]) => [(i + by + n) % n, by]),
    [n],
  );

  /*
    Warm the frames that are about to arrive, and remember which have finished
    decoding.

    Every frame mounts its own img, so without this the reel asks the browser
    for a picture at the exact moment it starts moving it. On a phone the
    request loses that race and the transition lands on an empty card.
  */
  const decoded = useRef<Set<string>>(new Set());

  const warm = useCallback((src?: string) => {
    if (!src || decoded.current.has(src)) return;
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
    // Either way it stops being something we wait for: a picture that will
    // never decode must not stall the reel for good.
    const settle = () => decoded.current.add(src);
    img.decode().then(settle, settle);
  }, []);

  useEffect(() => {
    if (n < 2) return;
    for (const ahead of [1, 2, 3]) warm(dishes[(index + ahead) % n]?.image);
  }, [index, dishes, n, warm]);

  /*
    Advance only onto a frame that can actually be drawn.

    Preloading alone is a bet that the network keeps up, and at this cadence a
    slow connection loses it: each picture is bigger than one hold is long. So
    the clock proposes and the cache decides. On a fast link nothing changes,
    and on a slow one the reel simply dwells rather than flashing an empty
    card, which is the failure worth avoiding.
  */
  useEffect(() => {
    if (reduced || n < 2) return;
    const id = setInterval(() => {
      if (held || Date.now() < resumeAt.current) return;
      setFrame((prev) => {
        const next = (prev[0] + 1) % n;
        const src = dishes[next]?.image;
        // Same reference, so React bails out and nothing re renders.
        if (src && !decoded.current.has(src)) return prev;
        return [next, 1];
      });
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduced, n, held, dishes]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setHeld(false);
    resumeAt.current = Date.now() + RESUME_MS;
    const travelled = info.offset.x + project(info.velocity.x);
    // A quarter of the card, or a throw that would carry that far.
    const trigger = 90;
    if (travelled < -trigger) step(1);
    else if (travelled > trigger) step(-1);
  };

  const dish = dishes[index] ?? dishes[0];
  if (!dish) return null;

  // Enters from the side it is travelling towards and leaves by the opposite
  // one, so forward and back retrace the same path.
  const enter = (d: number) => (d > 0 ? "100%" : "-100%");
  const leave = (d: number) => (d > 0 ? "-100%" : "100%");

  return (
    <div className="relative">
      <div className="relative aspect-4/5 w-full touch-pan-y overflow-hidden rounded-[1.25rem] bg-cocoa shadow-[0_10px_40px_rgba(58,35,26,0.16)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={dish.name}
            custom={direction}
            className="absolute inset-0 will-change-transform"
            variants={{
              enter: (d: number) =>
                reduced
                  ? { opacity: 0, transform: "translateX(0%)" }
                  : { opacity: 1, transform: `translateX(${enter(d)})` },
              centre: { opacity: 1, transform: "translateX(0%)" },
              leave: (d: number) =>
                reduced
                  ? { opacity: 0, transform: "translateX(0%)" }
                  : { opacity: 1, transform: `translateX(${leave(d)})` },
            }}
            initial="enter"
            animate="centre"
            exit="leave"
            // Critically damped: the frame arrives and stops. Bounce belongs
            // to a throw, and the throw is handled by the drag below.
            transition={
              reduced
                ? { duration: 0.25 }
                : { type: "spring", bounce: 0, duration: 0.46 }
            }
            drag={reduced || n < 2 ? false : "x"}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setHeld(true)}
            onDragEnd={onDragEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dish.image}
              alt={dish.name}
              className="pointer-events-none h-full w-full object-cover"
              draggable={false}
              loading="eager"
              decoding="async"
              onLoad={() => dish.image && decoded.current.add(dish.image)}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block"
              style={{
                background:
                  "linear-gradient(to top, rgba(28,17,12,0.88) 0%, rgba(28,17,12,0.62) 22%, rgba(28,17,12,0.2) 46%, rgba(28,17,12,0) 68%)",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
              <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-cream/85">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta-600 opacity-70 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta-700" />
                </span>
                {dish.section}
              </p>
              <p className="mt-2 font-display text-[2rem] leading-[1.05] text-cream display-wonk">
                {dish.name}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/*
          Pace, shown rather than guessed at. Keyed on the dish so it restarts
          with each frame, and it scales a full width bar instead of animating
          width, which would put layout on the critical path every frame.
        */}
        {!reduced && n > 1 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 block h-[2px] bg-[rgba(253,248,242,0.18)]"
          >
            <span
              key={`${dish.name}-${held}`}
              className="block h-full origin-left bg-cream/80"
              style={{
                animation: `cds-reel-fill ${HOLD_MS}ms linear forwards`,
                animationPlayState: held ? "paused" : "running",
              }}
            />
          </span>
        )}
      </div>

      {/* Position, as a row of ticks. Small enough to read as texture, exact
          enough to say how far along the board you are. */}
      {n > 1 && (
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center gap-[3px]"
        >
          {dishes.map((d, i) => (
            <span
              key={d.name}
              className={`h-[3px] rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                i === index
                  ? "w-4 bg-terracotta-700"
                  : "w-[3px] bg-[rgba(138,90,59,0.32)]"
              }`}
            />
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {dish.name}, from the {dish.section} counter
      </p>

      <style>{`
        @keyframes cds-reel-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
