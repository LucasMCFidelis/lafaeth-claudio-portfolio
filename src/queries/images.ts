import { queryOptions } from "@tanstack/react-query";

import { getAllImages } from "@/actions/get-all-images";
import { getHomeImages } from "@/actions/get-home-images";
import { getImage } from "@/actions/get-image";

import { cacheTags } from "./tags";

/** Query keys and options for images. See colorsQueries. */
export const imagesQueries = {
  tag: cacheTags.images,
  keys: {
    all: ["images"] as const,
    home: () => ["images", "home"] as const,
    list: () => ["images", "list"] as const,
    detail: (id: string) => ["images", "detail", id] as const,
  },
  /** Public: images shown on the home page, in display order. */
  home: () =>
    queryOptions({
      queryKey: imagesQueries.keys.home(),
      queryFn: () => getHomeImages(),
      staleTime: Infinity,
    }),
  /** Admin: every registered image. */
  list: () =>
    queryOptions({
      queryKey: imagesQueries.keys.list(),
      queryFn: () => getAllImages(),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: imagesQueries.keys.detail(id),
      queryFn: () => getImage({ imageId: id }),
    }),
};

/**
 * Root keys of every list that embeds image data; invalidate them all when an
 * image changes.
 */
export const imageDependentQueryKeys = [
  ["images"],
  ["colors"],
  ["comics"],
  ["flats"],
  ["illustrations"],
] as const;
