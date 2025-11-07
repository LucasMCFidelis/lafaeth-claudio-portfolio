"use server";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import { illustrationsTable } from "@/db/schema";

export const updateIllustrationsOrder = async (
  illustrations: Array<IllustrationDTO>
) => {
  await updateDisplayOrderItems({
    items: illustrations,
    table: illustrationsTable,
  });

  return { success: true };
};
