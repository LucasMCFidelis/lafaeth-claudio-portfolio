"use server";

import { updateTag } from "next/cache";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { illustrationsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateIllustrationsOrder = async (
  illustrations: Array<IllustrationDTO>
) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({
    items: illustrations,
    table: illustrationsTable,
  });

  updateTag(cacheTags.illustrations);

  return { success: true };
};
