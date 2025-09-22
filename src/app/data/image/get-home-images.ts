import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable } from "@/db/schema";

import { ImageDTO } from "./image-dto";
import { mapToImageDTO } from "./map-to-image-dto";

const getHomeImages = async (): Promise<Array<ImageDTO>> => {
  const imagesHome = await db.query.imagesTable.findMany({
    where: eq(imagesTable.visibleInHome, true),
  });

  return imagesHome.map((image) => mapToImageDTO({ image }));
};

export default getHomeImages;
