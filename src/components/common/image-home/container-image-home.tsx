import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import ArtworkCaption from "../artwork-caption";
import ArtworkTransition from "../artwork-transition";

interface ContainerImageHomeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  imageId?: string;
  imageTitle?: string;
  disableLink?: boolean;
  /** Position in the home grid; when set, the card fades up in turn. */
  index?: number;
}

const ContainerImageHome = ({
  children,
  imageId,
  imageTitle,
  className,
  style,
  disableLink = false,
  index,
  ...rest
}: ContainerImageHomeProps) => {
  if (!disableLink && !imageId) {
    throw new Error("imageId is required with link enabled");
  }

  const media = (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-md dark:shadow-none dark:ring-1 dark:ring-white/5">
      {children}
    </div>
  );

  const content = (
    <div
      {...rest}
      style={index === undefined ? style : { ...staggerStyle(index), ...style }}
      className={cn(
        "group relative",
        index !== undefined && staggerClassName,
        className
      )}
    >
      {disableLink || !imageId ? (
        media
      ) : (
        <ArtworkTransition imageId={imageId}>{media}</ArtworkTransition>
      )}
      {imageTitle && (
        <ArtworkCaption title={imageTitle} className="rounded-xl touch:rounded-none" />
      )}
    </div>
  );

  if (disableLink) return content;

  return <Link href={`/gallery?id=${imageId}`}>{content}</Link>;
};

export default ContainerImageHome;
