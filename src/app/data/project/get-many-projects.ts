import "server-only";

import { db } from "@/db";
import { projectTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { buildOrderBy, buildWhere } from "../query-builders";
import { WhereCondition } from "../where-condition";
import { ProjectRow } from "./map-to-project";

export interface GetManyProjectsProps {
  where?: WhereCondition<typeof projectTable>;
  orderBy?: OrderByCondition<typeof projectTable>;
}

const getManyProjects = async ({
  where,
  orderBy,
}: GetManyProjectsProps): Promise<ProjectRow[]> =>
  db.query.projectTable.findMany({
    where: buildWhere(projectTable, where),
    orderBy: buildOrderBy(projectTable, orderBy),
    with: { images: true },
  });

export default getManyProjects;
