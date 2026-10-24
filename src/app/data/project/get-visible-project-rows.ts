import "server-only";

import { displayOrder } from "../order-by-condition";
import getManyProjects from "./get-many-projects";
import { ProjectRow } from "./map-to-project";

const getVisibleProjectRows = async (): Promise<ProjectRow[]> =>
  getManyProjects({
    where: { field: "visibleInProjects", value: true },
    orderBy: displayOrder,
  });

export default getVisibleProjectRows;
