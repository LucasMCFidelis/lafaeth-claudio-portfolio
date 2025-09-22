"use server";

import { eq } from "drizzle-orm";

import { ImageDTO } from "@/app/data/image/image-dto";
import { mapToImageDTO } from "@/app/data/image/map-to-image-dto";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const getHomeImages = async (): Promise<Array<ImageDTO>> => {
  const imagesHome = await db.query.imagesTable.findMany({
    where: eq(imagesTable.visibleInHome, true),
  });

  return imagesHome.map((image) => mapToImageDTO({ image }));
};
