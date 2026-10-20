"use server";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { illustrationsTable } from "@/db/schema";

export const updateIllustrationsOrder = async (
  illustrations: Array<IllustrationDTO>
) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({
    items: illustrations,
    table: illustrationsTable,
  });

  return { success: true };
};
