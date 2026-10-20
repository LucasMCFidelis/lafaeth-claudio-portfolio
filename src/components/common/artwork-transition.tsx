import { ViewTransition } from "react";

/**
 * Same name on a grid thumbnail and on the gallery image makes the artwork
 * grow into the gallery (and shrink back) when navigating between them.
 * Names must be unique on a page, so only use it once per image.
 */
const ArtworkTransition = ({
  imageId,
  children,
}: {
  imageId: string;
  children: React.ReactNode;
}) => {
  return (
    <ViewTransition
      name={`artwork-${imageId}`}
      share="artwork-morph"
      default="none"
    >
      {children}
    </ViewTransition>
  );
};

export default ArtworkTransition;
