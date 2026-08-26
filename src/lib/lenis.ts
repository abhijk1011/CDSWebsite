import type Lenis from "lenis";

/**
 * Module level handle on the scroll instance so overlays can freeze the page
 * behind them. Setting `overflow: hidden` on the body is not enough once
 * Lenis owns the wheel.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const lockScroll = () => instance?.stop();
export const unlockScroll = () => instance?.start();
