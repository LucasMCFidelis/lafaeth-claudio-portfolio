"use server";

import { eq } from "drizzle-orm";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import mapToFlatDTO from "@/app/data/flat/map-to-flat-dto";
import { db } from "@/db";
import { flatTable } from "@/db/schema";

export const getFlat = async ({
  flatId,
}: {
  flatId: string;
}): Promise<FlatDTO> => {
  const flat = await db.query.flatTable.findFirst({
    where: eq(flatTable.id, flatId),
    with: { frontImage: true, backImage: true },
  });

  if (!flat) throw new Error(`Flat ${flatId} not found`);

  return mapToFlatDTO({ data: flat, withImages: true });
};
