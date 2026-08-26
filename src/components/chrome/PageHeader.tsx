import type { ReactNode } from "react";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";

/**
 * The opening block on every inner page.
 *
 * The headline runs the full content width rather than sitting in a narrow
 * column beside the standfirst. A short heading capped at sixteen characters
 * inside a seven hundred pixel column leaves a hole in the middle of the page
 * that no amount of spacing fixes, so the headline takes the whole measure and
 * the supporting text sits underneath it, behind a rule.
 */
export function PageHeader({
  eyebrow,
  lines,
  linesSm,
  standfirst,
  aside,
}: {
  eyebrow: string;
  /** Authored breaks for laptop widths. Aim for lines that fill the measure. */
  lines: string[];
  /** Breaks for narrow screens, where the laptop set would overflow. */
  linesSm?: string[];
  standfirst: string;
  aside?: ReactNode;
}) {
  return (
    <header className="shell pt-36 pb-14 md:pt-44 md:pb-20">
      <p className="eyebrow">{eyebrow}</p>

      <MaskReveal
        as="h1"
        lines={lines}
        linesSm={linesSm}
        className="mt-6 font-display text-h1 text-cocoa display-wonk md:mt-8"
      />

      <div className="mt-10 grid gap-8 border-t border-[rgba(138,90,59,0.18)] pt-8 md:mt-14 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-16 md:pt-10">
        <Rise index={1}>
          <p className="text-lead leading-[1.55] text-body">{standfirst}</p>
        </Rise>
        {aside && <Rise index={2}>{aside}</Rise>}
      </div>
    </header>
  );
}
