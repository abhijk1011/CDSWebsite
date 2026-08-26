import type { ReactNode } from "react";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";

/**
 * The opening block on every inner page. Consistent rhythm across routes is
 * what makes a set of pages read as one site rather than six templates.
 */
export function PageHeader({
  eyebrow,
  lines,
  standfirst,
  aside,
}: {
  eyebrow: string;
  lines: string[];
  standfirst: string;
  aside?: ReactNode;
}) {
  return (
    <header className="shell pt-36 pb-14 md:pt-44 md:pb-20">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <MaskReveal
            as="h1"
            className="mt-5 max-w-[16ch] font-display text-h1 text-cocoa display-wonk"
            lines={lines}
          />
        </div>
        <Rise index={1} className="lg:pb-1.5">
          <p className="max-w-xl text-lead leading-[1.55] text-body">
            {standfirst}
          </p>
          {aside}
        </Rise>
      </div>
    </header>
  );
}
