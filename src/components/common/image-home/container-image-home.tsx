import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import ArtworkTransition from "../artwork-transition";

interface ContainerImageHomeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  imageId?: string;
  disableLink?: boolean;
  /** Position in the home grid; when set, the card fades up in turn. */
  index?: number;
}

const ContainerImageHome = ({
  children,
  imageId,
  className,
  style,
  disableLink = false,
  index,
  ...rest
}: ContainerImageHomeProps) => {
  const content = (
    <div
      {...rest}
      style={index === undefined ? style : { ...staggerStyle(index), ...style }}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-xl bg-muted shadow-md",
        index !== undefined && staggerClassName,
        className
      )}
    >
      {children}
    </div>
  );

  if (disableLink) return content;
  if (!imageId) throw new Error("imageId is required with link enabled");

  return (
    <Link href={`/gallery?id=${imageId}`}>
      <ArtworkTransition imageId={imageId}>{content}</ArtworkTransition>
    </Link>
  );
};

export default ContainerImageHome;
