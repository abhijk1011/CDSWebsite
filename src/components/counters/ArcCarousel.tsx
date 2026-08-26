"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Category } from "@/content/categories";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ArcCard } from "./ArcCard";

/**
 * Cards riding the rim of a huge invisible circle whose centre sits far below
 * the viewport, so only the top of the arc is visible.
 *
 * Everything moves through one rAF loop that writes transforms straight onto
 * DOM nodes held in refs. React renders the cards once and is then out of the
 * way: a state update per frame across fifteen cards would drop frames on a
 * mid range phone and buy nothing.
 *
 * Built on pointer events rather than GSAP Draggable, whose inertia lives in
 * the paid Club InertiaPlugin. A throw with friction is twenty lines.
 */

const DEG = Math.PI / 180;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const clamp = (n: number, lo: number, hi: number) =>
  n < lo ? lo : n > hi ? hi : n;

export type ArcApi = { step: (by: number) => void };

type Config = {
  radius: number;
  gap: number; // radians between adjacent cards
  gapDeg: number;
  cardW: number;
  topPx: number;
  fadeStart: number;
  fadeEnd: number;
};

/**
 * Card size is derived from the height the arc actually has, not from the
 * screen width alone. A card sized only by width overflows a short laptop
 * window, and the first thing over the edge is the caption naming the counter.
 *
 * Spacing is expressed as a fraction of card width rather than a fixed number
 * of degrees. A fixed angle means bigger cards fly further apart and only
 * three ever fit on screen; holding the step proportional keeps the same fan
 * whatever size the cards end up.
 */
function readConfig(viewportH: number): Config {
  const w = window.innerWidth;
  const mobile = w < 768;

  const topPx = Math.round(viewportH * 0.035);
  const available = Math.max(200, viewportH - topPx - 24);

  const widthCap = mobile ? Math.min(w * 0.74, 360) : 440;
  // Cards are 3/4 portrait, so the height budget caps width at 0.75 of it.
  const cardW = Math.max(150, Math.min(widthCap, available * 0.75));

  const radius = cardW * (mobile ? 5 : 6.4);
  // Cards sit just clear of each other. Any tighter and the centre card hides
  // its neighbours' captions, which are the part naming the counter.
  const stepPx = cardW * (mobile ? 1.08 : 1.04);
  const gap = stepPx / radius;

  const halfW = w / 2;
  return {
    radius,
    gap,
    gapDeg: gap / DEG,
    cardW,
    topPx,
    fadeStart: halfW * 0.72,
    fadeEnd: halfW + cardW * 0.45,
  };
}

export function ArcCarousel({
  items,
  onSelect,
  onActiveChange,
  apiRef,
}: {
  items: Category[];
  onSelect: (id: string) => void;
  onActiveChange?: (index: number) => void;
  apiRef?: React.RefObject<ArcApi | null>;
}) {
  const reduced = usePrefersReducedMotion();

  const viewport = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const shades = useRef<(HTMLSpanElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const playing = useRef<boolean[]>([]);

  const current = useRef(0);
  const target = useRef(0);
  const velocity = useRef(0);
  const lean = useRef(0);
  const config = useRef<Config | null>(null);
  const engaged = useRef(false);
  const dragging = useRef(false);
  const dragDistance = useRef(0);
  const activeIndex = useRef(-1);
  const swept = useRef(false);

  const count = items.length;

  const step = useCallback(
    (by: number) => {
      engaged.current = true;
      target.current += by;
      velocity.current = 0;
    },
    [],
  );

  const goTo = useCallback(
    (index: number) => {
      engaged.current = true;
      let delta = index - (target.current % count);
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      target.current += delta;
      velocity.current = 0;
    },
    [count],
  );

  useEffect(() => {
    if (apiRef) apiRef.current = { step };
  }, [apiRef, step]);

  useEffect(() => {
    if (reduced) return;

    const measure = () => viewport.current?.clientHeight ?? window.innerHeight;
    config.current = readConfig(measure());
    playing.current = new Array(count).fill(false);

    const applySizing = () => {
      const cfg = config.current;
      if (!cfg) return;
      for (const el of cards.current) {
        if (!el) continue;
        el.style.width = `${cfg.cardW}px`;
        el.style.marginLeft = `${-cfg.cardW / 2}px`;
        el.style.top = `${cfg.topPx}px`;
        // The card sets its own root size and everything inside it is in em,
        // so a card that shrinks to fit keeps its proportions rather than
        // wearing type meant for a card half again as wide.
        el.style.fontSize = `${(cfg.cardW / 400) * 16}px`;
      }
    };

    const onResize = () => {
      config.current = readConfig(measure());
      applySizing();
    };
    applySizing();
    window.addEventListener("resize", onResize);

    const heightObserver = new ResizeObserver(onResize);
    if (viewport.current) heightObserver.observe(viewport.current);

    let raf = 0;
    let running = false;
    let last = performance.now();

    const render = () => {
      const cfg = config.current;
      if (!cfg) return;
      const { radius, gap, gapDeg, fadeStart, fadeEnd } = cfg;
      const progress = current.current;
      const leanDeg = lean.current;

      for (let i = 0; i < count; i++) {
        const el = cards.current[i];
        if (!el) continue;

        // Wrap the offset into a half open range so cards recycle forever.
        let offset = i - progress;
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;

        const angle = offset * gap;
        const deg = offset * gapDeg;
        const absDeg = Math.abs(deg);

        const x = radius * Math.sin(angle);
        const y = radius * (1 - Math.cos(angle));

        // The card nearest the centre lifts and grows a little, so the eye
        // is told where to look without anything having to flash.
        const centred = Math.max(0, 1 - absDeg / (gapDeg * 0.95));
        const lift = centred * 18;
        const scale = 1 - absDeg * 0.004 + centred * 0.04;

        const opacity =
          1 - clamp01((Math.abs(x) - fadeStart) / (fadeEnd - fadeStart));

        el.style.transform =
          `translate3d(${x.toFixed(2)}px, ${(y - lift).toFixed(2)}px, 0) ` +
          `rotate(${(deg + leanDeg).toFixed(3)}deg) scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(1000 - Math.round(absDeg * 10));
        // Faded cards stay in the tab order and only stop swallowing clicks.
        el.style.pointerEvents = opacity < 0.06 ? "none" : "";

        const shade = shades.current[i];
        if (shade) {
          shade.style.opacity = (clamp01(absDeg / 26) * 0.6).toFixed(3);
        }

        // Only cards near the centre are worth decoding.
        const video = videos.current[i];
        if (video) {
          const near = absDeg < gapDeg * 2.2;
          if (playing.current[i] !== near) {
            playing.current[i] = near;
            if (near) void video.play().catch(() => {});
            else video.pause();
          }
        }
      }

      const nextActive = ((Math.round(progress) % count) + count) % count;
      if (nextActive !== activeIndex.current) {
        activeIndex.current = nextActive;
        onActiveChange?.(nextActive);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      if (!engaged.current) target.current += dt * 0.00007;

      if (!dragging.current && velocity.current !== 0) {
        target.current += velocity.current * dt;
        velocity.current *= Math.pow(0.935, dt / 16.667);
        if (Math.abs(velocity.current) < 0.00002) velocity.current = 0;
      }

      // Framerate independent lerp, so 120Hz feels like 60Hz.
      const base = dragging.current ? 0.3 : 0.08;
      const k = 1 - Math.pow(1 - base, dt / 16.667);
      current.current += (target.current - current.current) * k;

      // The fan leans into whichever way it is travelling and rights itself
      // as it settles. Weight has to go somewhere when you throw something.
      const speed = (target.current - current.current) * 60;
      const leanTarget = clamp(speed * 2.6, -7, 7);
      lean.current += (leanTarget - lean.current) * (1 - Math.pow(0.88, dt / 16.667));

      render();
      raf = requestAnimationFrame(frame);
    };

    // Only worth running while the section is on screen. Idle drift would
    // otherwise turn frames forever behind whatever is actually being read.
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // First time in view, the fan sweeps into place rather than
          // being there already when you arrive.
          if (!swept.current) {
            swept.current = true;
            current.current = target.current - 1.6;
            lean.current = 5;
          }
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "200px" },
    );
    if (viewport.current) io.observe(viewport.current);
    start();

    return () => {
      stop();
      io.disconnect();
      heightObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [count, reduced, onActiveChange]);

  // ---- Pointer drag -------------------------------------------------------
  const pointerId = useRef<number | null>(null);
  const captured = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);

  const unitsPerPixel = () => {
    const cfg = config.current;
    if (!cfg) return 0.003;
    return 1 / (cfg.radius * cfg.gap);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced || e.button !== 0) return;
    pointerId.current = e.pointerId;
    dragging.current = true;
    engaged.current = true;
    dragDistance.current = 0;
    velocity.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    captured.current = false;
    // Capture is claimed lazily, in onPointerMove, once the gesture is
    // clearly a drag. Capturing on pointerdown retargets the click that
    // follows onto this container, so a tap would never reach the card.
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || e.pointerId !== pointerId.current) return;
    const dx = e.clientX - lastX.current;
    const now = performance.now();
    const dt = Math.max(now - lastT.current, 1);

    dragDistance.current += Math.abs(dx);
    if (!captured.current && dragDistance.current > 6) {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      captured.current = true;
    }

    const delta = -dx * unitsPerPixel();
    target.current += delta;
    velocity.current = velocity.current * 0.7 + (delta / dt) * 0.3;

    lastX.current = e.clientX;
    lastT.current = now;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (e.pointerId !== pointerId.current) return;
    dragging.current = false;
    pointerId.current = null;
    captured.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (reduced) return;
    // Only horizontal intent is claimed. Taking the vertical wheel would trap
    // the page inside this section, which is worse than missing a gesture.
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    engaged.current = true;
    velocity.current = 0;
    target.current += e.deltaX * unitsPerPixel();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  // ---- Reduced motion: a plain snapping row -------------------------------
  if (reduced) {
    return (
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="The counters at CDS"
        className="flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[var(--spacing-gutter)]"
        style={{ scrollPaddingInline: "var(--spacing-gutter)" }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="w-[74vw] max-w-[340px] shrink-0 snap-start"
          >
            <ArcCard item={item} index={i} onOpen={() => onSelect(item.id)} onFocus={() => {}} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={viewport}
      role="region"
      aria-roledescription="carousel"
      aria-label="The counters at CDS"
      tabIndex={-1}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      className="relative h-full w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => {
            cards.current[i] = el;
          }}
          className="absolute left-1/2 top-0 will-change-transform"
          style={{ width: 400, marginLeft: -200 }}
        >
          <ArcCard
            item={item}
            index={i}
            videoRef={(el) => {
              videos.current[i] = el;
            }}
            shadeRef={(el) => {
              shades.current[i] = el;
            }}
            onOpen={() => {
              // A throw ends in a pointerup too, so only a still pointer counts.
              if (dragDistance.current > 6) return;
              onSelect(item.id);
            }}
            onFocus={() => goTo(i)}
          />
        </div>
      ))}
    </div>
  );
}
