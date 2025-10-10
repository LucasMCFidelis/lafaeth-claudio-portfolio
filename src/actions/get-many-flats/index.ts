"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getManyFlats from "@/app/data/flat/get-many-flats";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";

export interface GetFlatsProps {
  where?: WhereCondition<typeof flatTable>;
  orderBy?: OrderByCondition<typeof flatTable>;
}

export const getFlats = async ({where, orderBy}: GetFlatsProps
): Promise<Array<FlatDTO>> => {
  const flats = await getManyFlats({ where, orderBy, withImages: true });

  return flats;
};
