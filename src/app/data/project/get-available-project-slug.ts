import "server-only";

import { like } from "drizzle-orm";

import { db } from "@/db";
import { projectTable } from "@/db/schema";

/** First free slug for a copy: "<slug>-copia", then "-copia-2", "-copia-3"... */
const getAvailableProjectSlug = async (slug: string) => {
  const base = `${slug}-copia`;
  const rows = await db
    .select({ slug: projectTable.slug })
    .from(projectTable)
    .where(like(projectTable.slug, `${base}%`));
  const taken = new Set(rows.map((row) => row.slug));

  if (!taken.has(base)) return base;
  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix++;
  return `${base}-${suffix}`;
};

export default getAvailableProjectSlug;
