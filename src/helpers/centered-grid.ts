import type { CSSProperties } from "react";

/**
 * Image grid whose incomplete rows are centered.
 *
 * CSS Grid cannot center a row that is not full, so the placement is computed
 * here. Each visual column is split in two tracks: an item that should be
 * centered can then start half a column to the right, while keeping the same
 * width it would have in a grid with whole columns (2 tracks + 1 gap).
 *
 * Mobile keeps the default single column; placement starts at `md`.
 */
export const centeredGridClassName = "grid gap-6 md:grid-cols-4 lg:grid-cols-6";

export const centeredGridItemClassName =
  "md:[grid-area:var(--grid-area-md)] lg:[grid-area:var(--grid-area-lg)]";

/**
 * Image box of a wide item (two columns, 29.5/21) on touch screens at `lg`,
 * where it shares a row with single-column items (21/29.5). By its own aspect
 * it would be a bit taller than them (it also spans the gap), which pushed its
 * caption below theirs. Here it gets their height: half its width without the
 * gap (`gap-6`), times 29.5/21. The card needs the `@container` class.
 */
export const wideItemMediaClassName =
  "touch:lg:h-[calc((100cqw_-_1.5rem)/2*29.5/21)]";

/** Visual columns at each breakpoint (same as `md:grid-cols-2 lg:grid-cols-3`). */
const COLUMNS = { md: 2, lg: 3 } as const;

/**
 * Places the items row by row, filling earlier gaps first (like
 * `grid-flow-dense`), and returns the `grid-area` of each one with its row
 * shifted to the center.
 */
const placeItems = (wide: boolean[], columns: number) => {
  const usedColumnsPerRow: number[] = [];

  const placements = wide.map((isWide) => {
    const span = isWide ? Math.min(2, columns) : 1;
    let row = usedColumnsPerRow.findIndex((used) => used + span <= columns);
    if (row === -1) row = usedColumnsPerRow.push(0) - 1;

    const column = usedColumnsPerRow[row];
    usedColumnsPerRow[row] += span;
    return { row, column, span };
  });

  return placements.map(({ row, column, span }) => {
    // Free columns in the row, counted in half-column tracks, split on both sides.
    const offset = columns - usedColumnsPerRow[row];
    const start = offset + column * 2 + 1;
    return `${row + 1} / ${start} / span 1 / span ${span * 2}`;
  });
};

/**
 * Inline style of each item, in the same order as `wide` (true for the items
 * that take two columns).
 */
export const centeredGridStyles = (wide: boolean[]): CSSProperties[] => {
  const md = placeItems(wide, COLUMNS.md);
  const lg = placeItems(wide, COLUMNS.lg);

  return wide.map(
    (_, index) =>
      ({
        "--grid-area-md": md[index],
        "--grid-area-lg": lg[index],
      }) as CSSProperties
  );
};
