import { PgTable } from "drizzle-orm/pg-core";

export type OrderByCondition<T extends PgTable> = {
  field: keyof T["$inferSelect"];
  type: "asc" | "desc";
};
