"use server";

import getManyProjects, {
  GetManyProjectsProps,
} from "@/app/data/project/get-many-projects";
import { mapToProjectSummary } from "@/app/data/project/map-to-project";
import { ProjectSummaryDTO } from "@/app/data/project/project-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getProjects = async ({
  where,
  orderBy,
}: GetManyProjectsProps): Promise<ProjectSummaryDTO[]> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const rows = await getManyProjects({ where, orderBy });
  return rows.map(mapToProjectSummary);
};
