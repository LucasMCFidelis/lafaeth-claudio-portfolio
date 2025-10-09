import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { flatTable } from "@/db/schema";

import { WhereCondition } from "../where-condition";
import { FlatDTO } from "./flat-dto";
import mapToFlatDTO from "./map-to-flat-dto";

interface GetManyFlatsProps<WithImages extends boolean> {
  where?: WhereCondition<typeof flatTable>;
  withImages: WithImages;
}

const getManyFlats = async <WithImages extends boolean>({
  where,
  withImages,
}: GetManyFlatsProps<WithImages>): Promise<Array<FlatDTO<WithImages>>> => {
  const flats = await db.query.flatTable.findMany({
    ...(where && { where: eq(flatTable[where.field], where.value) }),
    ...(withImages && { with: { backImage: true, frontImage: true } }),
  });

  return flats.map((flat) => mapToFlatDTO({ data: flat, withImages }));
};

export default getManyFlats;
