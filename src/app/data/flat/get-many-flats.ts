import "server-only";

import { db } from "@/db";
import { flatTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { buildOrderBy, buildWhere } from "../query-builders";
import { WhereCondition } from "../where-condition";
import { FlatDTO } from "./flat-dto";
import mapToFlatDTO from "./map-to-flat-dto";

interface GetManyFlatsProps<WithImages extends boolean> {
  where?: WhereCondition<typeof flatTable>;
  orderBy?: OrderByCondition<typeof flatTable>;
  withImages: WithImages;
}

const getManyFlats = async <WithImages extends boolean>({
  where,
  orderBy,
  withImages,
}: GetManyFlatsProps<WithImages>): Promise<Array<FlatDTO<WithImages>>> => {
  const flats = await db.query.flatTable.findMany({
    where: buildWhere(flatTable, where),
    orderBy: buildOrderBy(flatTable, orderBy),
    ...(withImages && { with: { backImage: true, frontImage: true } }),
  });

  return flats.map((flat) => mapToFlatDTO({ data: flat, withImages }));
};

export default getManyFlats;
