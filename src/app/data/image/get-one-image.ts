import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable } from "@/db/schema";

import { WhereCondition } from "../where-condition";
import { ImageDTO } from "./image-dto";
import { mapToImageDTO } from "./map-to-image-dto";

interface GetOneImageProps {
  where: WhereCondition<typeof imagesTable>;
}

const getOneImage = async ({ where }: GetOneImageProps): Promise<ImageDTO> => {
  const image = await db.query.imagesTable.findFirst({
    where: eq(imagesTable[where.field], where.value),
  });

  if (!image)
    throw new Error(
      `Image with ${where.field} equals to ${where.value} not found`
    );

  return mapToImageDTO({ image });
};

export default getOneImage;
