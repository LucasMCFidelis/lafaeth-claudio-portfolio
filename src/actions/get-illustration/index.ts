"use server";

import getOneIllustrationById from "@/app/data/illustrations/get-one-illustration-by-id";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getIllustration = async ({
  illustrationId,
}: {
  illustrationId: string;
}): Promise<IllustrationDTO> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getOneIllustrationById({ illustrationId });
};
