"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getManyFlats from "@/app/data/flat/get-many-flats";
import { OrderByCondition } from "@/app/data/order-by-condition";
import verifyUserLogged from "@/app/data/user/verify-user";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";

export interface GetFlatsProps {
  where?: WhereCondition<typeof flatTable>;
  orderBy?: OrderByCondition<typeof flatTable>;
}

/** Admin: any flat, including hidden ones. */
export const getFlats = async ({
  where,
  orderBy,
}: GetFlatsProps): Promise<Array<FlatDTO>> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getManyFlats({ where, orderBy, withImages: true });
};
