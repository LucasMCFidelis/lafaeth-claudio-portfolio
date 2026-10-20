/**
 * `sizes` for next/image in the 1 / 2 / 3 column grids (md:grid-cols-2
 * lg:grid-cols-3). Without it the browser assumes 100vw and downloads
 * images much larger than they are shown.
 */
export const gridImageSizes =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

/** Items that span 2 columns from md up (horizontal pages). */
export const wideGridImageSizes = "(max-width: 768px) 100vw, 66vw";

/** How many items at the top of a grid load right away (first row). */
export const PRIORITY_ITEMS = 3;

/** next/image props for an image that is above the fold or not. */
export const imageLoadingProps = (priority?: boolean) =>
  priority
    ? ({ loading: "eager", fetchPriority: "high" } as const)
    : ({ loading: "lazy", fetchPriority: "auto" } as const);
