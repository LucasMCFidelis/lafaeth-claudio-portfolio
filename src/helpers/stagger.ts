import { CSSProperties } from "react";

/** Grid items fade up one after the other; only the first ones are delayed. */
const STAGGER_STEP_MS = 60;
const STAGGER_MAX_ITEMS = 12;

export const staggerClassName =
  "animate-in fade-in slide-in-from-bottom-3 animation-duration-500 fill-mode-both motion-reduce:animate-none";

export const staggerStyle = (index = 0): CSSProperties =>
  ({
    "--tw-animation-delay": `${Math.min(index, STAGGER_MAX_ITEMS - 1) * STAGGER_STEP_MS}ms`,
  }) as CSSProperties;
