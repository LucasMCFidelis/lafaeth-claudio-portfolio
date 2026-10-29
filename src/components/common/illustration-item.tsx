import Link from "next/link";

import { wideItemMediaClassName } from "@/helpers/centered-grid";
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
  horizontalPage: boolean;
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
  horizontalPage,
  disableLink,
  index = 0,
  children,
}: IllustrationItemProps) => {
  const media = (
    <div
      className={cn(
        "relative overflow-hidden",
        horizontalPage
          ? cn("aspect-[29.5/21]", wideItemMediaClassName)
          : "aspect-[21/29.5]"
      )}
    >
      <FadeImage
        src={imageUrl}
        alt={title}
        fill
        sizes={horizontalPage ? wideGridImageSizes : gridImageSizes}
        {...imageLoadingProps(index < PRIORITY_ITEMS)}
        className="object-cover group-hover:scale-[1.02]"
      />
    </div>
  );

  const card = (
    <div
      style={staggerStyle(index)}
      className={cn(
        "group relative overflow-hidden",
        horizontalPage && "@container",
        staggerClassName,
        !visibleInIllustrations && "opacity-50"
      )}
    >
      {disableLink ? (
        media
      ) : (
        <ArtworkTransition imageId={imageId}>{media}</ArtworkTransition>
      )}
      <ArtworkCaption title={title} />
      {children}
    </div>
  );

  if (disableLink) return card;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return <Link href={`/gallery/ilustracoes?id=${imageId}`}>{card}</Link>;
};

export default IllustrationItem;
