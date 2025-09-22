import "server-only";

import { eq, SQLWrapper } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable } from "@/db/schema";

import { ImageDTO } from "./image-dto";
import { mapToImageDTO } from "./map-to-image-dto";

interface GetManyImagesProps {
  where?: {
    field: keyof typeof imagesTable.$inferSelect;
    value: string | number | boolean | SQLWrapper;
  };
}

const getManyImages = async ({
  where,
}: GetManyImagesProps): Promise<Array<ImageDTO>> => {
  const imagesHome = await db.query.imagesTable.findMany({
    ...(where && { where: eq(imagesTable[where.field], where.value) }),
  });

  return imagesHome.map((image) => mapToImageDTO({ image }));
};

export default getManyImages;
