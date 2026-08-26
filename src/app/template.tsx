"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Entry transition for every route. A template remounts on navigation, so
 * this runs on each page change without the exit choreography that App
 * Router makes unreliable. Short and mostly opacity, because the visitor is
 * waiting on content, not on us.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(8px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.45, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
