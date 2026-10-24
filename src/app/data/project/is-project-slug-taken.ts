import "server-only";

import { and, eq, ne } from "drizzle-orm";

import { db } from "@/db";
import { projectTable } from "@/db/schema";

const isProjectSlugTaken = async (slug: string, exceptId?: string) => {
  const project = await db.query.projectTable.findFirst({
    columns: { id: true },
    where: and(
      eq(projectTable.slug, slug),
      exceptId ? ne(projectTable.id, exceptId) : undefined
    ),
  });

  return Boolean(project);
};

export default isProjectSlugTaken;
