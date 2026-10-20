import "server-only";

import { db } from "@/db";
import { colorizationTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { buildOrderBy, buildWhere } from "../query-builders";
import { WhereCondition } from "../where-condition";
import { ColorDTO } from "./colors-dto";
import mapToColorDTO from "./map-to-color";

export interface GetManyColorsProps<WithImage extends boolean> {
  where?: WhereCondition<typeof colorizationTable>;
  orderBy?: OrderByCondition<typeof colorizationTable>;
  withImage: WithImage;
}

const getManyColors = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyColorsProps<WithImage>): Promise<Array<ColorDTO<WithImage>>> => {
  const colors = await db.query.colorizationTable.findMany({
    where: buildWhere(colorizationTable, where),
    orderBy: buildOrderBy(colorizationTable, orderBy),
    ...(withImage && { with: { image: true } }),
  });

  return colors.map((color) => mapToColorDTO({ data: color, withImage }));
};

export default getManyColors;
