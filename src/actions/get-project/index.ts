"use server";

import getOneProjectById from "@/app/data/project/get-one-project-by-id";
import { ProjectAdminDTO } from "@/app/data/project/project-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getProject = async ({
  projectId,
}: {
  projectId: string;
}): Promise<ProjectAdminDTO> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getOneProjectById({ projectId });
};
