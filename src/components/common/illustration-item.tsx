import Image from "next/image";
import Link from "next/link";

import {
  gridImageSizes,
  imageLoadingProps,
  wideGridImageSizes,
} from "@/helpers/image-sizes";

import ArtworkCaption from "./artwork-caption";

interface IllustrationItemProps {
  imageId: string;
  imageUrl: string;
  title: string;
  horizontalIllustration: boolean;
  visibleInIllustrations?: boolean;
  disableLink?: boolean;
  /** Loads the image right away (first row of the grid). */
  priority?: boolean;
  children: React.ReactNode;
}

const IllustrationItem = ({
  imageId,
  imageUrl,
  title,
  visibleInIllustrations,
  horizontalIllustration,
  disableLink,
  priority,
  children,
}: IllustrationItemProps) => {
  const content = (
    <div
      className={`relative ${!visibleInIllustrations && "opacity-50"} ${
        horizontalIllustration ? "aspect-[29.5/21]" : "aspect-[21/29.5]"
      }`}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes={horizontalIllustration ? wideGridImageSizes : gridImageSizes}
        {...imageLoadingProps(priority)}
        className="object-contain"
      />
      <ArtworkCaption title={title} />
      {children}
    </div>
  );

  if (disableLink) return content;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return <Link href={`/gallery/ilustracoes?id=${imageId}`}>{content}</Link>;
};

export default IllustrationItem;
