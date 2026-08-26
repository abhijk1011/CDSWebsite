import type { SVGProps } from "react";

/**
 * Line marks for every counter.
 *
 * Drawn rather than photographed on purpose: a consistent set of marks holds
 * the page together far better than a mixed bag of stock photography, and it
 * leaves the real product shots free to land later without a redesign.
 *
 * All of them share a 48 unit grid, a 1.4 stroke and currentColor, so they
 * inherit type colour and stay legible from 20px up to 200px.
 */

type MarkProps = SVGProps<SVGSVGElement>;

const Frame = ({ children, ...rest }: MarkProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const Sweets = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M24 7 40 24 24 41 8 24Z" />
    <path d="M24 14.5 33.5 24 24 33.5 14.5 24Z" opacity={0.55} />
    <circle cx="24" cy="24" r="2.1" />
  </Frame>
);

const LiveSweets = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M8 27h32a16 16 0 0 1-32 0Z" />
    <circle cx="19" cy="23.5" r="4.6" />
    <circle cx="30" cy="24.5" r="3.6" opacity={0.65} />
    <path d="M18 15c2.6 2.4-2.6 4.4 0 6.8M29 12c2.6 2.4-2.6 4.4 0 6.8" opacity={0.7} />
  </Frame>
);

const Cakes = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M9 39V29c0-1.6 1.3-2.6 3-2.6h24c1.7 0 3 1 3 2.6v10Z" />
    <path d="M15 26.4v-5c0-1.5 1.2-2.4 2.8-2.4h12.4c1.6 0 2.8.9 2.8 2.4v5" />
    <path d="M24 19v-4" />
    <path d="M24 15c-1.7-1.6-.5-3 0-3.8.5.8 1.7 2.2 0 3.8Z" />
    <path d="M9 33h30" opacity={0.5} />
  </Frame>
);

const Bakery = (p: MarkProps) => (
  <Frame {...p}>
    <rect x="9" y="15" width="30" height="18" rx="2.4" />
    <path d="M9 21h30M9 27h30" opacity={0.55} />
    <path d="M14 33v3M24 33v3M34 33v3" opacity={0.5} />
  </Frame>
);

const Chocolate = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M11 12h20l6 6v18a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2Z" />
    <path d="M31 12v6h6" opacity={0.6} />
    <path d="M11 25h26M24 18v20" opacity={0.55} />
  </Frame>
);

const Namkeen = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M13 14h22L24.5 41Z" />
    <path d="M17 20c2.6 1.8 5.2-1.8 7.8 0s5.2-1.8 6.4-.6" opacity={0.7} />
    <path d="M19 27c2.2 1.6 4.4-1.6 6.6 0s3.6-1 4.4-.6" opacity={0.7} />
    <circle cx="17" cy="9.5" r="1.3" opacity={0.6} />
    <circle cx="26" cy="7.5" r="1.3" opacity={0.6} />
    <circle cx="34" cy="10" r="1.3" opacity={0.6} />
  </Frame>
);

const Khakhra = (p: MarkProps) => (
  <Frame {...p}>
    <circle cx="24" cy="24" r="15.5" />
    <circle cx="24" cy="24" r="11.5" opacity={0.4} />
    <path d="M19.5 17.6c1.1.9 2.3.9 3.4 0" opacity={0.7} />
    <path d="M27.4 21c1.1.9 2.3.9 3.4 0" opacity={0.7} />
    <path d="M17.6 26.4c1.1.9 2.3.9 3.4 0" opacity={0.7} />
    <path d="M25 29.8c1.1.9 2.3.9 3.4 0" opacity={0.7} />
    <circle cx="24.6" cy="23.4" r="0.9" opacity={0.6} />
  </Frame>
);

const BananaChips = (p: MarkProps) => (
  <Frame {...p}>
    <circle cx="18.5" cy="28" r="10" />
    <circle cx="30.5" cy="20.5" r="8.4" opacity={0.75} />
    <path d="M13.5 28h10M15.5 32.5h7" opacity={0.6} />
    <path d="M27 20.5h7" opacity={0.6} />
  </Frame>
);

const Makhana = (p: MarkProps) => (
  <Frame {...p}>
    <circle cx="17.5" cy="30" r="7.2" />
    <circle cx="30.5" cy="30" r="7.2" />
    <circle cx="24" cy="18.5" r="7.2" />
  </Frame>
);

const DryFruits = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M19 8c7 6.5 7 20.5 0 30-7-9.5-7-23.5 0-30Z" />
    <path d="M19 13v20" opacity={0.5} />
    <path d="M31 18c5 3.5 5 12.5 0 17-4-2-5.5-6-5.5-8.5s1.5-6.5 5.5-8.5Z" opacity={0.75} />
  </Frame>
);

const Saffron = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M12 30h24a12 12 0 0 1-24 0Z" />
    <path d="M24 30c-1.5-6-4.5-10.5-9-13.5" />
    <path d="M24 30c0-7 .8-11.5 2.5-17" />
    <path d="M24 30c2-5.5 5-9.5 9.5-12" />
    <path d="M15 16.5c-1.6-.6-2.6-1.8-2.8-3.4M26.5 13c-1.2-1-1.6-2.4-1.3-4M33.5 18c.4-1.6 1.6-2.7 3.2-3.1" opacity={0.75} />
  </Frame>
);

const MouthFreshener = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M24 41C10.5 31 8.5 19.5 15.5 13.5c3.4-2.9 8.5.4 8.5 4.6 0-4.2 5.1-7.5 8.5-4.6C39.5 19.5 37.5 31 24 41Z" />
    <path d="M24 41V22" opacity={0.5} />
    <path d="M24 30l-5-4M24 25l5-4" opacity={0.45} />
  </Frame>
);

const Imported = (p: MarkProps) => (
  <Frame {...p}>
    <rect x="8.5" y="13" width="31" height="24" rx="2.2" />
    <path d="M24 13v24" opacity={0.55} />
    <path d="M8.5 21h31" opacity={0.55} />
    <path d="M18 13l3-5h6l3 5" opacity={0.7} />
    <circle cx="32" cy="29" r="3.4" opacity={0.8} />
    <path d="M30.4 29h3.2M32 27.4v3.2" opacity={0.8} />
  </Frame>
);

const Sodas = (p: MarkProps) => (
  <Frame {...p}>
    <path d="M20 8h8v4.5c0 3 3 4.5 3 9V38a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2V21.5c0-4.5 3-6 3-9Z" />
    <path d="M17.4 22.5h13.2" opacity={0.55} />
    <circle cx="22" cy="29" r="1.5" opacity={0.7} />
    <circle cx="27" cy="33" r="1.2" opacity={0.7} />
  </Frame>
);

const Charliee = (p: MarkProps) => (
  <Frame {...p}>
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="12.2" opacity={0.45} />
    <path d="M29 19.5a7 7 0 1 0 0 9" />
  </Frame>
);

export const marks = {
  sweets: Sweets,
  liveSweets: LiveSweets,
  cakes: Cakes,
  bakery: Bakery,
  chocolate: Chocolate,
  namkeen: Namkeen,
  khakhra: Khakhra,
  bananaChips: BananaChips,
  makhana: Makhana,
  dryFruits: DryFruits,
  saffron: Saffron,
  mouthFreshener: MouthFreshener,
  imported: Imported,
  sodas: Sodas,
  charliee: Charliee,
} as const;

export type MarkName = keyof typeof marks;

export function Mark({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Component = marks[name as MarkName] ?? Sweets;
  return <Component className={className} />;
}

/** The CDS wordmark seal, used in the header and footer. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 116 34" className={className} aria-hidden="true" fill="none">
      <text
        x="0"
        y="26"
        fill="currentColor"
        style={{
          font: '600 30px var(--font-display, Georgia), Georgia, serif',
          letterSpacing: "0.01em",
        }}
      >
        CDS
      </text>
      <circle cx="72" cy="17" r="2.4" fill="currentColor" opacity={0.55} />
      <text
        x="81"
        y="14"
        fill="currentColor"
        style={{ font: '500 8px var(--font-sans, system-ui), sans-serif', letterSpacing: "0.14em" }}
      >
        EST.
      </text>
      <text
        x="81"
        y="26"
        fill="currentColor"
        style={{ font: '500 8px var(--font-sans, system-ui), sans-serif', letterSpacing: "0.14em" }}
      >
        GUJ.
      </text>
    </svg>
  );
}
