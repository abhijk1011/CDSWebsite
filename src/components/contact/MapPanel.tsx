import type { Store } from "@/content/site";

/**
 * A drawn location panel rather than an embedded map.
 *
 * An iframe here would pull in third party cookies on page load, paint a
 * grey rectangle until it settles and fail to a broken frame icon on a poor
 * connection. This always renders, weighs nothing, and the Directions button
 * beside it opens the real map, which is what anyone actually wants.
 */
export function MapPanel({ store }: { store: Store }) {
  return (
    <div className="relative overflow-hidden bg-clay">
      <svg
        viewBox="0 0 800 300"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="rgba(138,90,59,0.22)" strokeWidth="1.2" fill="none">
          <path d="M-20 92h840M-20 196h840M-20 258h840" />
          <path d="M118 -20v340M296 -20v340M470 -20v340M648 -20v340" />
          <path d="M-20 40 L840 150" opacity="0.7" />
          <path d="M296 -20 L560 320" opacity="0.5" />
        </g>

        <g fill="rgba(138,90,59,0.09)">
          <rect x="128" y="102" width="158" height="84" rx="3" />
          <rect x="480" y="18" width="158" height="64" rx="3" />
          <rect x="306" y="206" width="154" height="42" rx="3" />
          <rect x="658" y="102" width="120" height="84" rx="3" />
        </g>

        <g stroke="rgba(190,95,60,0.45)" strokeWidth="2.6" fill="none">
          <path d="M-20 150h840" />
        </g>

        {/* The shop */}
        <circle cx="400" cy="150" r="34" fill="rgba(190,95,60,0.12)" />
        <circle cx="400" cy="150" r="20" fill="rgba(190,95,60,0.18)" />
        <path
          d="M400 128a13 13 0 0 0-13 13c0 9.8 13 23 13 23s13-13.2 13-23a13 13 0 0 0-13-13Zm0 17.6a4.6 4.6 0 1 1 0-9.2 4.6 4.6 0 0 1 0 9.2Z"
          fill="#a34a2c"
        />
      </svg>

      <span className="absolute bottom-4 left-5 rounded-full bg-cream/90 px-3.5 py-1.5 text-[0.75rem] tracking-[0.06em] text-cocoa">
        {store.city}
      </span>
    </div>
  );
}
