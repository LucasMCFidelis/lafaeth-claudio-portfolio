import Link from "next/link";

import {
  gridImageSizes,
  imageLoadingProps,
  PRIORITY_ITEMS,
} from "@/helpers/image-sizes";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import ArtworkCaption from "./artwork-caption";
import ArtworkTransition from "./artwork-transition";
import FadeImage from "./fade-image";

interface ComicItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  visibleInComics?: boolean;
  disableLink?: boolean;
  /** Position in the grid: drives the entrance delay and eager loading. */
  index?: number;
  children: React.ReactNode;
}

const ComicItem = ({
  imageId,
  imageUrl,
  title,
  visibleInComics,
  disableLink,
  index = 0,
  children,
}: ComicItemProps) => {
  const media = (
    <div className="relative aspect-[21/29.5] overflow-hidden">
      <FadeImage
        src={imageUrl}
        alt={title || "Quadrinho"}
        fill
        sizes={gridImageSizes}
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
        staggerClassName,
        !visibleInComics && "opacity-50"
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

  return <Link href={`/gallery/quadrinhos?id=${imageId}`}>{card}</Link>;
};

export default ComicItem;
