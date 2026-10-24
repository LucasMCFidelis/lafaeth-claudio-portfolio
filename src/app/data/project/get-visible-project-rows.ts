import "server-only";

import { ProjectRow, sortProjects } from "./map-to-project";
import { mockProjects } from "./mock-projects";

const getVisibleProjectRows = async (): Promise<ProjectRow[]> =>
  sortProjects(mockProjects.filter((project) => project.visibleInProjects));

export default getVisibleProjectRows;
