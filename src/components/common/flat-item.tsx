"use client";

import { imageLoadingProps } from "@/helpers/image-sizes";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import CompareSlider from "./compare-slider";
import FadeImage from "./fade-image";

interface FlatItemProps {
  horizontalPage?: boolean;
  visibleInFlat?: boolean;
  title: string;
  artist: string;
  screenwriter?: string;
  /** Line art, revealed on the left of the divider. */
  frontImageUrl?: string;
  /** Flat colors, shown on the right of the divider. */
  backImageUrl?: string;
  /** Smaller maximum size, used in the admin list next to the sidebar. */
  maxSizeItemsMd?: boolean;
  /** Position in the list: drives the entrance delay; the first loads eagerly. */
  index?: number;
  children?: React.ReactNode;
}

const FlatItem = ({
  horizontalPage,
  visibleInFlat,
  title,
  artist,
  screenwriter,
  frontImageUrl,
  backImageUrl,
  maxSizeItemsMd,
  index = 0,
  children,
}: FlatItemProps) => {
  // Same widths the fixed sizes used to reach, now fluid below them.
  const maxWidth = horizontalPage
    ? maxSizeItemsMd
      ? "max-w-[622px]"
      : "max-w-[933px]"
    : maxSizeItemsMd
      ? "max-w-[318px]"
      : "max-w-[530px]";
  const sizes = horizontalPage
    ? maxSizeItemsMd
      ? "(max-width: 768px) 100vw, 622px"
      : "(max-width: 1024px) 100vw, 933px"
    : maxSizeItemsMd
      ? "(max-width: 768px) 100vw, 318px"
      : "(max-width: 640px) 100vw, 530px";

  const imageProps = {
    fill: true,
    sizes,
    draggable: false,
    ...imageLoadingProps(index === 0),
    className: "object-contain pointer-events-none",
  };

  return (
    <CompareSlider
      label={`Comparar line e flat de ${title}`}
      style={staggerStyle(index)}
      className={cn(
        "w-full mx-auto",
        staggerClassName,
        maxWidth,
        horizontalPage ? "aspect-[29.5/21]" : "aspect-[21/29.5]",
        !visibleInFlat && "opacity-50"
      )}
      base={
        backImageUrl && (
          <FadeImage src={backImageUrl} alt={`${title} - flat`} {...imageProps} />
        )
      }
      overlay={
        frontImageUrl && (
          <FadeImage src={frontImageUrl} alt={`${title} - line`} {...imageProps} />
        )
      }
    >
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-between gap-2 text-[0.65rem] sm:text-xs text-primary-foreground pointer-events-none">
        {screenwriter && (
          <p className="bg-primary/70 px-2 py-0.5">Roteiro: {screenwriter}</p>
        )}
        <p className="ml-auto bg-primary/70 px-2 py-0.5">Arte: {artist}</p>
      </div>
      {children}
    </CompareSlider>
  );
};

export default FlatItem;
