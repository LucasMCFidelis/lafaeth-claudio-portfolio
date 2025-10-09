"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getManyFlats from "@/app/data/flat/get-many-flats";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";

export const getFlats = async (
  where?: WhereCondition<typeof flatTable>
): Promise<Array<FlatDTO>> => {
  const flats = await getManyFlats({ where, withImages: true });

  return flats;
};
