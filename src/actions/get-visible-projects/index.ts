"use server";

import getVisibleProjectsCached from "@/app/data/project/get-visible-projects";
import { ProjectSummaryDTO } from "@/app/data/project/project-dto";

export const getVisibleProjects = async (): Promise<ProjectSummaryDTO[]> =>
  getVisibleProjectsCached();
