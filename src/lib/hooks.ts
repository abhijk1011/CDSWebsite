"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Matches a media query.
 *
 * useSyncExternalStore rather than state plus an effect: the browser's
 * MediaQueryList is exactly the sort of external store it exists for, it
 * gives a correct server snapshot, and it avoids the cascading render that
 * a setState inside an effect body causes.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True only for a real pointer. Gates every hover only affordance. */
export const useHasPointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
