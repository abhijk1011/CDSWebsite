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
 * way entirely: a state update per frame across fifteen cards would drop
 * frames on a mid range phone for no benefit.
 *
 * Built on pointer events rather than GSAP Draggable. Inertia there means the
 * InertiaPlugin, which is a paid Club GSAP plugin, and a throw with friction
 * is about twenty lines of arithmetic.
 */

const DEG = Math.PI / 180;

type Config = {
  radius: number;
  gap: number; // radians between adjacent cards
  cardW: number;
  /** Horizontal distance from centre, in px, where a card starts to fade. */
  fadeStart: number;
  /** Horizontal distance where it is fully gone. */
  fadeEnd: number;
};

/**
 * The fade is measured in pixels from the centre of the screen, not in
 * degrees of arc. Degrees look right at one viewport width and wrong at every
 * other one: a card can sit half faded in plain sight on a wide monitor and
 * read as a ghost. Tying it to the actual screen edge means a card only ever
 * fades once it has left, at any size.
 */
function readConfig(): Config {
  const w = window.innerWidth;
  const mobile = w < 768;
  const cardW = mobile ? Math.min(w * 0.68, 300) : 320;
  const halfW = w / 2;
  return {
    radius: mobile ? 1200 : 2100,
    gap: (mobile ? 16 : 10) * DEG,
    cardW,
    // Tuned so a card is well faded by the time only an unreadable sliver of
    // it is left on screen. A partly visible card reads as depth; a bright
    // wedge with no mark or caption in it reads as a rendering bug. Both
    // bounds scale with the viewport, so a wide monitor simply shows more
    // cards rather than needing its own numbers.
    fadeStart: halfW * 0.75,
    fadeEnd: halfW + cardW * 0.4,
  };
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export function ArcCarousel({
  items,
  onSelect,
}: {
  items: Category[];
  onSelect: (id: string) => void;
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
  const config = useRef<Config | null>(null);
  const engaged = useRef(false);
  const dragging = useRef(false);
  const dragDistance = useRef(0);

  const count = items.length;

  /** Centre a card. Used by keyboard nav and by focus. */
  const goTo = useCallback(
    (index: number) => {
      engaged.current = true;
      // Travel the short way round rather than unwinding the whole loop.
      let delta = index - (target.current % count);
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      target.current += delta;
      velocity.current = 0;
    },
    [count],
  );

  const step = useCallback(
    (by: number) => {
      engaged.current = true;
      target.current += by;
      velocity.current = 0;
    },
    [],
  );

  useEffect(() => {
    if (reduced) return;

    config.current = readConfig();
    playing.current = new Array(count).fill(false);

    const applySizing = () => {
      const cfg = config.current;
      if (!cfg) return;
      for (const el of cards.current) {
        if (!el) continue;
        el.style.width = `${cfg.cardW}px`;
        el.style.marginLeft = `${-cfg.cardW / 2}px`;
      }
    };

    const onResize = () => {
      config.current = readConfig();
      applySizing();
    };
    applySizing();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let running = false;
    let last = performance.now();

    const render = () => {
      const cfg = config.current;
      if (!cfg) return;
      const { radius, gap, fadeStart, fadeEnd } = cfg;
      const gapDeg = gap / DEG;
      const progress = current.current;

      for (let i = 0; i < count; i++) {
        const el = cards.current[i];
        if (!el) continue;

        // Wrap the offset into [-count/2, count/2) so cards recycle forever.
        let offset = i - progress;
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;

        const angle = offset * gap;
        const deg = offset * gapDeg;
        const absDeg = Math.abs(deg);

        const x = radius * Math.sin(angle);
        const y = radius * (1 - Math.cos(angle));
        const scale = 1 - absDeg * 0.006;
        const opacity =
          1 - clamp01((Math.abs(x) - fadeStart) / (fadeEnd - fadeStart));

        el.style.transform =
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) ` +
          `rotate(${deg.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(1000 - Math.round(absDeg * 10));
        // Fully faded cards must stay in the tab order, so they keep their
        // box and only stop swallowing clicks.
        el.style.pointerEvents = opacity < 0.06 ? "none" : "";

        const shade = shades.current[i];
        if (shade) {
          shade.style.opacity = (clamp01(absDeg / 34) * 0.62).toFixed(3);
        }

        // Only the cards near the centre are worth decoding.
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
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      if (!engaged.current) {
        // Idle drift, until someone touches it.
        target.current += dt * 0.00007;
      }

      if (!dragging.current && velocity.current !== 0) {
        target.current += velocity.current * dt;
        velocity.current *= Math.pow(0.935, dt / 16.667);
        if (Math.abs(velocity.current) < 0.00002) velocity.current = 0;
      }

      // Framerate independent lerp, so a 120Hz screen feels like a 60Hz one.
      const base = dragging.current ? 0.3 : 0.08;
      const k = 1 - Math.pow(1 - base, dt / 16.667);
      current.current += (target.current - current.current) * k;

      render();
      raf = requestAnimationFrame(frame);
    };

    // The loop is only worth running while the section is on screen. Idle
    // drift means it would otherwise turn frames forever behind whatever the
    // visitor is actually reading, which costs battery for nothing.
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
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );
    if (viewport.current) io.observe(viewport.current);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [count, reduced]);

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
    // follows onto this container, so a plain tap would never reach the
    // card button underneath and the counter would refuse to open.
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
    // Keep a running read of throw speed, smoothed so one stray frame
    // cannot define the release.
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
    // Only claim horizontal intent. Taking the vertical wheel would trap the
    // page inside this section, which is a worse sin than missing a gesture.
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--spacing-gutter)] pb-6"
        style={{ scrollPaddingInline: "var(--spacing-gutter)" }}
      >
        {items.map((item, i) => (
          <div key={item.id} className="w-[70vw] max-w-[320px] shrink-0 snap-start">
            <ArcCard
              item={item}
              index={i}
              onOpen={() => onSelect(item.id)}
              onFocus={() => {}}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
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
        className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="absolute left-1/2 top-[10%] will-change-transform md:top-[7%]"
            style={{ width: 320, marginLeft: -160 }}
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
                // A throw ends with a pointerup too, so only a still pointer
                // counts as a click.
                if (dragDistance.current > 6) return;
                onSelect(item.id);
              }}
              onFocus={() => goTo(i)}
            />
          </div>
        ))}
      </div>

      {/* Visible controls. A carousel with no affordance is a carousel most
          people never touch, and these give keyboard users a real target.
          The scrim keeps them legible where a card caption sits behind. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1999] h-32 bg-linear-to-t from-cocoa via-cocoa/85 to-transparent"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-[2000] flex items-center justify-center gap-3 md:bottom-7">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous counter"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(253,248,242,0.3)] text-cream transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[rgba(253,248,242,0.6)] hover:bg-[rgba(253,248,242,0.1)] active:scale-[0.95]"
        >
          <Chevron className="rotate-180" />
        </button>
        <span className="hidden text-[0.75rem] tracking-[0.16em] text-on-dark-muted uppercase sm:block">
          Drag to explore
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next counter"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(253,248,242,0.3)] text-cream transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[rgba(253,248,242,0.6)] hover:bg-[rgba(253,248,242,0.1)] active:scale-[0.95]"
        >
          <Chevron />
        </button>
      </div>
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
