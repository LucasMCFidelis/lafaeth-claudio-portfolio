import Link from "next/link";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  gridImageSizes,
  imageLoadingProps,
  PRIORITY_ITEMS,
  wideGridImageSizes,
} from "@/helpers/image-sizes";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import ArtworkCaption from "./artwork-caption";
import ArtworkTransition from "./artwork-transition";
import FadeImage from "./fade-image";

interface ColorItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  credits?: Pick<ImageDTO, "artist" | "screenwriter" | "colorist">;
  observation?: string | null;
  visibleInColors?: boolean;
  horizontalPage: boolean;
  disableLink?: boolean;
  /** Position in the grid: drives the entrance delay and eager loading. */
  index?: number;
  children: React.ReactNode;
}

const ColorItem = ({
  imageId,
  imageUrl,
  title,
  credits,
  observation,
  visibleInColors,
  horizontalPage,
  disableLink,
  index = 0,
  children,
}: ColorItemProps) => {
  const card = (
    <div
      style={staggerStyle(index)}
      className={cn(
        "group relative overflow-hidden",
        staggerClassName,
        !visibleInColors && "opacity-50",
        horizontalPage ? "aspect-[29.5/21]" : "aspect-[21/29.5]"
      )}
    >
      <FadeImage
        src={imageUrl}
        alt={title}
        fill
        sizes={horizontalPage ? wideGridImageSizes : gridImageSizes}
        {...imageLoadingProps(index < PRIORITY_ITEMS)}
        className="object-contain group-hover:scale-[1.02]"
      />
      <ArtworkCaption title={title} credits={credits} observation={observation} />
      {children}
    </div>
  );

  if (disableLink) return card;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return (
    <Link href={`/gallery/cores?id=${imageId}`}>
      <ArtworkTransition imageId={imageId}>{card}</ArtworkTransition>
    </Link>
  );
};

export default ColorItem;
