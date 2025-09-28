"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { memo, useRef, useState } from "react";

import { FlatDTO } from "@/app/data/flat/flat-dto";

interface FlatItemProps {
  flat: FlatDTO;
  children: React.ReactNode;
}

const FlatItem = memo(({ flat, children }: FlatItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividerX, setDividerX] = useState(50);
  const [dragging, setDragging] = useState(false);

  const startDrag = () => setDragging(true);
  const stopDrag = () => setDragging(false);

  const onDrag = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;

    if (newX >= 0 && newX <= (flat.horizontalPage ? 100 : 94)) {
      setDividerX(newX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      className={`relative flex mx-auto select-none ${
        flat.horizontalPage
          ? // horizontal
            "h-[200px] w-[311px] sm:h-[300px] sm:w-[466px] md:h-[400px] md:w-[622px] lg:h-[500px] lg:w-[777px] xl:h-[600px] xl:w-[933px]"
          : // vertical
            "h-[250px] w-[177px] sm:h-[350px] sm:w-[248px] md:h-[450px] md:w-[318px] lg:h-[600px] lg:w-[424px] xl:h-[750px] xl:w-[530px]"
      }`}
    >
      <div
        className="absolute top-0 bottom-0 z-30 w-px bg-primary"
        style={{ left: `${dividerX}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center size-5 md:size-10 rounded-full bg-primary/60 text-primary-foreground cursor-col-resize"
          onMouseDown={startDrag}
        >
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </div>
      </div>

      {children}

      {flat.frontImage?.imageUrl && (
        <div
          className="relative z-20 overflow-hidden"
          style={{ width: `${dividerX}%` }}
        >
          <Image
            src={flat.frontImage?.imageUrl}
            alt={`${flat.title} - line`}
            fill
            className={`object-cover object-left pointer-events-none`}
          />
        </div>
      )}
    </div>
  );
});

FlatItem.displayName = "FlatItem";

export default FlatItem;
