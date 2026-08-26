import { Hero } from "@/components/home/Hero";
import { CounterWalk } from "@/components/home/CounterWalk";
import { LiveTeaser } from "@/components/home/LiveTeaser";
import { StatBand } from "@/components/home/StatBand";
import { CharlieeStrip } from "@/components/home/CharlieeStrip";
import { FranchiseTeaser } from "@/components/home/FranchiseTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CounterWalk />
      <LiveTeaser />
      <StatBand />
      <CharlieeStrip />
      <FranchiseTeaser />
    </>
  );
}
