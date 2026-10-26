import { PgTable } from "drizzle-orm/pg-core";

export type OrderByCondition<T extends PgTable> = {
  field: keyof T["$inferSelect"];
  type: "asc" | "desc";
};

/** Order used wherever a list is shown to visitors: the order saved in the admin. */
export const displayOrder = { field: "index", type: "asc" } as const;
