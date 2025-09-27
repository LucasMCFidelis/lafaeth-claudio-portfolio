import "server-only";

import { eq, SQLWrapper } from "drizzle-orm";

import { db } from "@/db";
import { flatTable } from "@/db/schema";

import { FlatDTO } from "./flat-dto";
import mapToFlatDTO from "./map-to-flat-dto";

interface GetManyFlatsProps<WithImages extends boolean> {
  where?: {
    field: keyof typeof flatTable.$inferSelect;
    value: string | boolean | SQLWrapper;
  };
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
