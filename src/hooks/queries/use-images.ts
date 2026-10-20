"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { ImageDTO } from "@/app/data/image/image-dto";
import { imagesQueries } from "@/queries/images";

/** Images shown on the home page. Data usually comes from a PrefetchBoundary. */
export const useHomeImages = () => useSuspenseQuery(imagesQueries.home());

/**
 * Admin: every image. Not suspense-based because it is also used inside the
 * image picker dialog, which loads it on demand.
 */
export const useAllImages = () => useQuery(imagesQueries.list());

/** Loads an image by id; does nothing while `imageId` is empty (forms). */
export const useImage = (
  imageId: string | null | undefined,
  options?: { initialData?: ImageDTO }
) =>
  useQuery({
    ...imagesQueries.detail(imageId ?? ""),
    enabled: !!imageId,
    initialData: options?.initialData,
  });
