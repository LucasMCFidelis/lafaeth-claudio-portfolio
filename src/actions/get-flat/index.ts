"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getOneFlat from "@/app/data/flat/get-one-flat";
import mapToFlatDTO from "@/app/data/flat/map-to-flat-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getFlat = async ({
  flatId,
}: {
  flatId: string;
}): Promise<FlatDTO> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const flat = await getOneFlat({
    where: { field: "id", value: flatId },
    withImages: true,
  });

  if (!flat) throw new Error(`Flat ${flatId} not found`);

  return mapToFlatDTO({ data: flat, withImages: true });
};
