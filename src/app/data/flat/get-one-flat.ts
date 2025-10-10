import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { flatTable } from "@/db/schema";

import { WhereCondition } from "../where-condition";
import { FlatDTO } from "./flat-dto";
import mapToFlatDTO from "./map-to-flat-dto";

interface GetOneFlatProps<WithImages extends boolean> {
  where: WhereCondition<typeof flatTable>;
  withImages: WithImages;
}

const getOneFlat = async <WithImages extends boolean>({
  where,
  withImages,
}: GetOneFlatProps<WithImages>): Promise<FlatDTO<WithImages>> => {
  const flat = await db.query.flatTable.findFirst({
    where: eq(flatTable[where.field], where.value),
    ...(withImages && { with: { backImage: true, frontImage: true } }),
  });

  if (!flat) throw new Error("Flat not found");

  return mapToFlatDTO({ data: flat, withImages });
};

export default getOneFlat;
