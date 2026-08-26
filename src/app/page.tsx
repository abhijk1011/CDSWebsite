import { Hero } from "@/components/home/Hero";
import { ArcCounters } from "@/components/counters/ArcCounters";
import { LiveTeaser } from "@/components/home/LiveTeaser";
import { StatBand } from "@/components/home/StatBand";
import { CharlieeStrip } from "@/components/home/CharlieeStrip";
import { FranchiseTeaser } from "@/components/home/FranchiseTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ArcCounters
        intro="Every counter has its own rhythm. The sweets go early, the farsan goes at four, and the live kitchen never really stops. Drag through them, or open one to see what sits on it."
      />
      <LiveTeaser />
      <StatBand />
      <CharlieeStrip />
      <FranchiseTeaser />
    </>
  );
}
