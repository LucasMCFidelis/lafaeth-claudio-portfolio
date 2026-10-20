"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CompareSliderProps {
  /** Bottom layer, fully visible on the right side of the divider. */
  base: React.ReactNode;
  /** Top layer, revealed on the left side of the divider. */
  overlay: React.ReactNode;
  /** Accessible name of the divider, e.g. "Comparar line e flat". */
  label: string;
  className?: string;
  style?: React.CSSProperties;
  /** Extra content drawn above both layers (credits, admin buttons). */
  children?: React.ReactNode;
}

const KEYBOARD_STEP = 5;

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Before/after comparison. Works with mouse, touch and pen (pointer events)
 * and with the keyboard (arrow keys, Home, End) on the divider handle.
 */
const CompareSlider = ({
  base,
  overlay,
  label,
  className,
  style,
  children,
}: CompareSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const moveTo = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    // Let links and buttons drawn over the slider (admin actions) get the click.
    if ((e.target as HTMLElement).closest("a, button")) return;
    // Keeps the drag when the finger leaves the image. Best effort: the
    // slider still works within its area if the capture is refused.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setDragging(true);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) moveTo(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const next: Record<string, number> = {
      ArrowLeft: position - KEYBOARD_STEP,
      ArrowDown: position - KEYBOARD_STEP,
      ArrowRight: position + KEYBOARD_STEP,
      ArrowUp: position + KEYBOARD_STEP,
      Home: 0,
      End: 100,
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    setPosition(clamp(next[e.key]));
  };

  return (
    <div
      ref={containerRef}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      // Vertical swipes still scroll the page; horizontal ones move the divider.
      className={cn(
        "relative overflow-hidden select-none touch-pan-y",
        dragging ? "cursor-grabbing" : "cursor-col-resize",
        className
      )}
    >
      <div className="absolute inset-0">{base}</div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {overlay}
      </div>

      <div
        className="absolute inset-y-0 z-20 w-0.5 bg-primary/80 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-30 flex size-9 md:size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-md outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
        style={{ left: `${position}%` }}
      >
        <ChevronLeft className="size-4" />
        <ChevronRight className="size-4" />
      </div>

      {children}
    </div>
  );
};

export default CompareSlider;
