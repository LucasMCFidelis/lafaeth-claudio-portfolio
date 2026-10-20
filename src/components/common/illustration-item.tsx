import Link from "next/link";

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

interface IllustrationItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  horizontalIllustration: boolean;
  visibleInIllustrations?: boolean;
  disableLink?: boolean;
  /** Position in the grid: drives the entrance delay and eager loading. */
  index?: number;
  children: React.ReactNode;
}

const IllustrationItem = ({
  imageId,
  imageUrl,
  title,
  visibleInIllustrations,
  horizontalIllustration,
  disableLink,
  index = 0,
  children,
}: IllustrationItemProps) => {
  const card = (
    <div
      style={staggerStyle(index)}
      className={cn(
        "group relative overflow-hidden",
        staggerClassName,
        !visibleInIllustrations && "opacity-50",
        horizontalIllustration ? "aspect-[29.5/21]" : "aspect-[21/29.5]"
      )}
    >
      <FadeImage
        src={imageUrl}
        alt={title}
        fill
        sizes={horizontalIllustration ? wideGridImageSizes : gridImageSizes}
        {...imageLoadingProps(index < PRIORITY_ITEMS)}
        className="object-contain group-hover:scale-[1.02]"
      />
      <ArtworkCaption title={title} />
      {children}
    </div>
  );

  if (disableLink) return card;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return (
    <Link href={`/gallery/ilustracoes?id=${imageId}`}>
      <ArtworkTransition imageId={imageId}>{card}</ArtworkTransition>
    </Link>
  );
};

export default IllustrationItem;
