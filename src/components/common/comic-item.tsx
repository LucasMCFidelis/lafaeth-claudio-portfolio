import Image from "next/image";
import Link from "next/link";

import { gridImageSizes, imageLoadingProps } from "@/helpers/image-sizes";

import ArtworkCaption from "./artwork-caption";

interface ComicItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  visibleInComics?: boolean;
  disableLink?: boolean;
  /** Loads the image right away (first row of the grid). */
  priority?: boolean;
  children: React.ReactNode;
}

const ComicItem = ({
  imageId,
  imageUrl,
  title,
  visibleInComics,
  disableLink,
  priority,
  children,
}: ComicItemProps) => {
  const content = (
    <div
      className={`relative aspect-[21/29.5]  ${
        !visibleInComics && "opacity-50"
      }`}
    >
      <Image
        src={imageUrl}
        alt={title || "Quadrinho"}
        fill
        sizes={gridImageSizes}
        {...imageLoadingProps(priority)}
        className="object-cover"
      />
      <ArtworkCaption title={title} />
      {children}
    </div>
  );

  if (disableLink) return content;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return <Link href={`/gallery/quadrinhos?id=${imageId}`}>{content}</Link>;
};

export default ComicItem;
