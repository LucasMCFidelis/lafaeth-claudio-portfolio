import Image from "next/image";
import Link from "next/link";

import {
  gridImageSizes,
  imageLoadingProps,
  wideGridImageSizes,
} from "@/helpers/image-sizes";

import ArtworkCaption from "./artwork-caption";

interface ColorItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  visibleInColors?: boolean;
  horizontalPage: boolean;
  disableLink?: boolean;
  /** Loads the image right away (first row of the grid). */
  priority?: boolean;
  children: React.ReactNode;
}

const ColorItem = ({
  imageId,
  imageUrl,
  title,
  visibleInColors,
  horizontalPage,
  disableLink,
  priority,
  children,
}: ColorItemProps) => {
  const content = (
    <div
      className={`relative ${!visibleInColors && "opacity-50"} ${
        horizontalPage ? "aspect-[29.5/21]" : "aspect-[21/29.5]"
      }`}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes={horizontalPage ? wideGridImageSizes : gridImageSizes}
        {...imageLoadingProps(priority)}
        className="object-contain"
      />
      <ArtworkCaption title={title} />
      {children}
    </div>
  );

  if (disableLink) return content;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return <Link href={`/gallery/cores?id=${imageId}`}>{content}</Link>;
};

export default ColorItem;
