"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { flatTable } from "@/db/schema";

export const updateFlatsOrder = async (flats: Array<FlatDTO>) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({
    items: flats,
    table: flatTable,
  });

  return { success: true };
};
