"use server";

import getProjectImagesByProject from "@/app/data/project/get-project-images";
import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getProjectImages = async ({
  projectId,
}: {
  projectId: string;
}): Promise<ProjectImageAdminDTO[]> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getProjectImagesByProject({ projectId });
};
