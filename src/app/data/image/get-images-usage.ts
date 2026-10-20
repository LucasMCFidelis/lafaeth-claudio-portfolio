import "server-only";

import { inArray, isNotNull } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";

import { db } from "@/db";
import {
  colorizationTable,
  comicsTable,
  flatTable,
  illustrationsTable,
  userTable,
} from "@/db/schema";

import { emptyImageUsage, ImageUsage } from "./image-usage-dto";

/**
 * Where each image is used, keyed by image id. Images that are not used are
 * left out. Pass ids to check only those images.
 */
const getImagesUsage = async (
  imageIds?: Array<string>
): Promise<Record<string, ImageUsage>> => {
  const filter = (column: AnyPgColumn) =>
    imageIds ? inArray(column, imageIds) : isNotNull(column);

  const [colors, comics, illustrations, flats, users] = await Promise.all([
    db
      .select({ imageId: colorizationTable.imageId })
      .from(colorizationTable)
      .where(filter(colorizationTable.imageId)),
    db
      .select({ imageId: comicsTable.imageId })
      .from(comicsTable)
      .where(filter(comicsTable.imageId)),
    db
      .select({ imageId: illustrationsTable.imageId })
      .from(illustrationsTable)
      .where(filter(illustrationsTable.imageId)),
    db
      .select({ front: flatTable.frontImageId, back: flatTable.backImageId })
      .from(flatTable),
    db
      .select({ imageId: userTable.bannerImageId })
      .from(userTable)
      .where(filter(userTable.bannerImageId)),
  ]);

  const usage: Record<string, ImageUsage> = {};
  const add = (imageId: string | null, key: keyof ImageUsage) => {
    if (!imageId || (imageIds && !imageIds.includes(imageId))) return;
    usage[imageId] ??= emptyImageUsage();
    usage[imageId][key] += 1;
  };

  colors.forEach((row) => add(row.imageId, "colors"));
  comics.forEach((row) => add(row.imageId, "comics"));
  illustrations.forEach((row) => add(row.imageId, "illustrations"));
  flats.forEach((row) => {
    add(row.front, "flats");
    // The same image on both sides counts once.
    if (row.back !== row.front) add(row.back, "flats");
  });
  users.forEach((row) => add(row.imageId, "banner"));

  return usage;
};

export default getImagesUsage;
