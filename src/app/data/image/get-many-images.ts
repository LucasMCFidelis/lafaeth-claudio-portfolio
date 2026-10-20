import "server-only";

import { db } from "@/db";
import { imagesTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { buildOrderBy, buildWhere } from "../query-builders";
import { WhereCondition } from "../where-condition";
import { ImageDTO } from "./image-dto";
import { mapToImageDTO } from "./map-to-image-dto";

interface GetManyImagesProps {
  where?: WhereCondition<typeof imagesTable>;
  orderBy?: OrderByCondition<typeof imagesTable>;
}

const getManyImages = async ({
  where,
  orderBy,
}: GetManyImagesProps): Promise<Array<ImageDTO>> => {
  const images = await db.query.imagesTable.findMany({
    where: buildWhere(imagesTable, where),
    orderBy: buildOrderBy(imagesTable, orderBy),
  });

  return images.map((image) => mapToImageDTO({ image }));
};

export default getManyImages;
