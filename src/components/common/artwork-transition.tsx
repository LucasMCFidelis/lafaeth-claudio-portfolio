import { ViewTransition } from "react";

/**
 * Same name on a grid thumbnail and on the gallery image makes the artwork
 * grow into the gallery (and shrink back) when navigating between them.
 * Names must be unique on a page, so only use it once per image.
 *
 * The key remounts it when the image changes. Renaming a mounted
 * <ViewTransition> leaves the old name registered in React (dev only), and
 * the gallery is kept hidden after closing (Activity), so the home thumbnail
 * with that old name was reported as a duplicate.
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
      key={imageId}
      name={`artwork-${imageId}`}
      share="artwork-morph"
      default="none"
    >
      {children}
    </ViewTransition>
  );
};

export default ArtworkTransition;
