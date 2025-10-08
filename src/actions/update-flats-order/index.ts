"use server";

import { eq } from "drizzle-orm";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { db } from "@/db";
import { flatTable } from "@/db/schema";

export const updateFlatsOrder = async (flats: Array<FlatDTO>) => {
  await db.transaction(async (tx) => {
    for (const [index, flat] of flats.entries()) {
      const flatInPage = await tx.query.flatTable.findFirst({
        where: eq(flatTable.id, flat.id),
      });
      if (!flatInPage) throw new Error(`Flat ${flat.id} not found`);

      await tx
        .update(flatTable)
        .set({ indexInFlat: index })
        .where(eq(flatTable.id, flat.id));
    }
  });

  return { success: true };
};
